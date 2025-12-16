import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { InjectQueue } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';

@Injectable()
export class PredictorService {
  private readonly logger = new Logger(PredictorService.name);
  constructor(
    private prisma: PrismaService,
    @InjectQueue('predictor') private predictorQueue: Queue,
  ) {}

  // async onModuleInit() {
  //   const dateStart = new Date();
  //   const dateEnd = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  //   await this.predictorQueue.add('processSatelliteOverGroundStation', {
  //     satelliteId: 29249, // MEO satelite
  //     groundStationId: 6,
  //     dateStart,
  //     dateEnd,
  //   });

  //   await this.predictorQueue.add('processSatelliteOverGroundStation', {
  //     satelliteId: 25544, // ISS
  //     groundStationId: 2, // Plovdiv
  //     dateStart,
  //     dateEnd,
  //   });
  // }

  async cleanupQueue() {
    this.logger.log('Cleaning up predictor queue...');
    await this.predictorQueue.drain();
    const jobs = await this.predictorQueue.getJobs([
      'waiting',
      'active',
      'delayed',
    ]);
    this.logger.log(`Removing ${jobs.length} jobs from the queue...`);
    await Promise.all(jobs.map((job) => job.remove()));
    this.logger.log('Predictor queue cleaned up.');
  }

  async bulkPredictor() {
    // get all tracked satellites and all ground stations
    // for each satellite and ground station pair, calculate passes for the next 7 days
    this.logger.log('Starting bulk prediction of satellite passes...');
    const satelliteIds = await this.prisma.satellite.findMany({
      where: { isTracked: true },
      select: { id: true },
    });
    const groundStationIds = await this.prisma.groundStation.findMany({
      select: { id: true },
    });
    const dateStart = new Date();
    const dateEnd = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days ahead

    const promises: Promise<Job>[] = [];
    for (const sat of satelliteIds) {
      for (const gs of groundStationIds) {
        // run in background Queue
        promises.push(
          this.predictorQueue.add('processSatelliteOverGroundStation', {
            satelliteId: sat.id,
            groundStationId: gs.id,
            dateStart,
            dateEnd,
          }),
        );
      }
    }
    const startTime = Date.now();
    await Promise.all(promises);
    this.logger.log(
      `Bulk prediction ${satelliteIds.length} sats x ${groundStationIds.length} station enqueued in ${Date.now() - startTime} ms`,
    );
  }

  async clearOldPassEvents() {
    // TODO: implement retention policy
  }
}
