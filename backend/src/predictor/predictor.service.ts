import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as satellite from 'satellite.js';

type PassPoint = {
  time: Date;
  azimuth: number;
  elevation: number;
  rangeSat: number;
};

@Injectable()
export class PredictorService implements OnModuleInit {
  private readonly logger = new Logger(PredictorService.name);
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    // test prediction: TODO: remove
    const groundStationId = 2;
    const satelliteId = 59051;
    const dateStart = new Date();
    const dateEnd = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days ahead
    await this.calculatePasses({
      groundStationId,
      satelliteId,
      dateStart,
      dateEnd,
    });
  }

  async calculatePasses({
    groundStationId,
    satelliteId,
    dateStart,
    dateEnd,
  }: {
    groundStationId: number;
    satelliteId: number;
    dateStart: Date;
    dateEnd: Date;
  }) {
    const roughAngles = await this.calculateAngles({
      groundStationId,
      satelliteId,
      dateStart,
      // 7 days ahead
      dateEnd,
      stepSeconds: 60,
    });
    console.log(`Total predicted positions: ${roughAngles.length}`);

    // separate rough predictions into more refined passes (1s steps)
    const roughPassPoints: {
      startTime: Date;
      endTime: Date;
      highestElevation: number;
      points: PassPoint[];
    }[] = [];
    let currentStepIsCounted = false;
    let passStartTime: Date | null = null;
    let passEndTime: Date | null = null;
    let passPoints: PassPoint[] = [];
    let highestElevation = 0;
    for (let i = 0; i < roughAngles.length; i++) {
      // find start of pass
      if (roughAngles[i].elevation > 0 && !currentStepIsCounted) {
        currentStepIsCounted = true;
        passStartTime = roughAngles[i].time;
        passPoints = [roughAngles[i]];
        highestElevation = roughAngles[i].elevation;
      } else if (roughAngles[i].elevation > 0 && currentStepIsCounted) {
        // continue pass
        passPoints.push(roughAngles[i]);
        if (roughAngles[i].elevation > highestElevation) {
          highestElevation = roughAngles[i].elevation;
        }
      } else if (roughAngles[i].elevation <= 0 && currentStepIsCounted) {
        // end of pass
        passEndTime = roughAngles[i - 1].time;
        roughPassPoints.push({
          startTime: passStartTime!,
          endTime: passEndTime,
          highestElevation,
          points: passPoints,
        });
        currentStepIsCounted = false;
      }
    }
    console.log(`Total rough passes found: ${roughPassPoints.length}`);

    // create high-res predictions for each pass - begin 60 sec before and end 60 sec after
    const fineGrainPasses: {
      startTime: Date;
      endTime: Date;
      highestElevation: number;
      points: PassPoint[];
    }[] = [];
    for (const pass of roughPassPoints) {
      const highResPoints = await this.calculateAngles({
        groundStationId,
        satelliteId,
        dateStart: new Date(pass.startTime.getTime() - 60 * 1000),
        dateEnd: new Date(pass.endTime.getTime() + 60 * 1000),
        stepSeconds: 1,
      });
      // filter out below-horizon points
      const filteredHighResPoints = highResPoints.filter(
        (pt) => pt.elevation > 0,
      );
      const maxElevation = Math.max(
        ...filteredHighResPoints.map((pt) => pt.elevation),
      );
      const startingPoint = filteredHighResPoints[0];
      const endingPoint =
        filteredHighResPoints[filteredHighResPoints.length - 1];
      fineGrainPasses.push({
        startTime: new Date(startingPoint.time.getTime() - 60 * 1000),
        endTime: new Date(endingPoint.time.getTime() + 60 * 1000),
        highestElevation: maxElevation,
        points: filteredHighResPoints,
      });
    }
    // debug
    for (const rp of fineGrainPasses) {
      console.log(
        `Pass from ${rp.startTime.toISOString()} to ${rp.endTime.toISOString()} (max ${rp.highestElevation.toFixed(2)}°, ${rp.points.length} rough points)`,
      );
    }
  }

  async calculateAngles({
    groundStationId,
    satelliteId,
    dateStart,
    dateEnd,
    stepSeconds = 60,
  }: {
    groundStationId: number;
    satelliteId: number;
    dateStart: Date;
    dateEnd: Date;
    stepSeconds?: number;
  }) {
    const groundStation = await this.prisma.groundStation.findUnique({
      where: { id: groundStationId },
    });
    const ourSatellite = await this.prisma.satellite.findUnique({
      where: { id: satelliteId },
    });
    if (!groundStation || !ourSatellite) {
      throw new Error('Ground station or satellite not found');
    }

    const satrec = satellite.twoline2satrec(
      ourSatellite.line1,
      ourSatellite.line2,
    );

    const passPoints: PassPoint[] = [];
    const now = new Date();
    let cnt = 0;
    for (
      let time = dateStart.getTime();
      time <= dateEnd.getTime();
      time += stepSeconds * 1000
    ) {
      cnt++;
      const positionAndVelocity = satellite.propagate(satrec, new Date(time));
      if (positionAndVelocity === null) {
        this.logger.error(
          `Failed to propagate satellite (${satelliteId}) position: ${satrec.error}}`,
        );
        continue;
      }
      const positionEci = positionAndVelocity.position;
      // const velocityEci = positionAndVelocity.velocity;

      const observerGd = {
        longitude: satellite.degreesToRadians(groundStation.longitude),
        latitude: satellite.degreesToRadians(groundStation.latitude),
        height: groundStation.altitude / 1000, // meters to km
      };

      const gmst = satellite.gstime(new Date(time));

      const positionEcf = satellite.eciToEcf(positionEci, gmst),
        // observerEcf = satellite.geodeticToEcf(observerGd),
        // positionGd = satellite.eciToGeodetic(positionEci, gmst),
        lookAngles = satellite.ecfToLookAngles(observerGd, positionEcf);
      // dopplerFactor = satellite.dopplerFactor(
      //   observerCoordsEcf,
      //   positionEcf,
      //   velocityEcf,
      // );

      const azimuth = lookAngles.azimuth,
        elevation = lookAngles.elevation,
        rangeSat = lookAngles.rangeSat;

      // if (elevation < 0) {
      //   // satellite is below horizon
      //   continue;
      // }
      passPoints.push({
        time: new Date(time),
        azimuth: satellite.radiansToDegrees(azimuth),
        elevation: satellite.radiansToDegrees(elevation),
        rangeSat,
      });
    }
    console.log(
      `Predicted ${cnt} positions for sat ${satelliteId} in ${
        Date.now() - now.getTime()
      } ms`,
    );
    return passPoints;
  }
}
