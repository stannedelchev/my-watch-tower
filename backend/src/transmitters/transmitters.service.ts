import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { SatnogsdbTransmitter } from './transmitters.interfaces';
import { AppConfigService } from 'src/app-config/app-config.service';

@Injectable()
export class TransmittersService implements OnModuleInit {
  private readonly logger = new Logger(TransmittersService.name);

  constructor(
    private prisma: PrismaService,
    private appConfigService: AppConfigService,
  ) {}

  onModuleInit() {
    this.logger.log('Starting transmitters update on module init.');
    // await this.updateTransmitters();
    // we need some sort of scheduling here
  }

  async updateTransmitters() {
    const FETCH_URL = 'https://db.satnogs.org/api/transmitters/?format=json';
    this.logger.log(`Fetching transmitters from ${FETCH_URL}`);

    const transmittersData: SatnogsdbTransmitter[] = [];
    try {
      const response = await axios.get<SatnogsdbTransmitter[]>(FETCH_URL);
      transmittersData.push(...response.data);
    } catch (error) {
      this.logger.error(
        `Failed to fetch transmitters from ${FETCH_URL}: ${error}`,
      );
      return;
    }

    this.logger.log(`Fetched ${transmittersData.length} transmitters.`);
    const timeStart = Date.now();
    let cntr = 0;
    for (const transmitter of transmittersData) {
      cntr++;
      if (cntr % 100 === 0) {
        const timeNow = Date.now();
        this.logger.debug(
          `Processing transmitter ${cntr}/${transmittersData.length} - elapsed time: ${timeNow - timeStart} ms`,
        );
      }
      const satelliteExists = await this.prisma.satellite.findUnique({
        where: { id: transmitter.norad_cat_id },
      });
      if (!satelliteExists) {
        continue;
      }

      const partialSat = {
        description: transmitter.description,
        type: transmitter.type,
        status: transmitter.status,
        uplinkLow: transmitter.uplink_low
          ? transmitter.uplink_low.toString()
          : null,
        uplinkHigh: transmitter.uplink_high
          ? transmitter.uplink_high.toString()
          : null,
        downlinkLow: transmitter.downlink_low
          ? transmitter.downlink_low.toString()
          : null,
        downlinkHigh: transmitter.downlink_high
          ? transmitter.downlink_high.toString()
          : null,
        mode: transmitter.mode,
        baud: transmitter.baud,
        invert: transmitter.invert,
        citation: transmitter.citation,
      };

      await this.prisma.transmitter.upsert({
        where: { uuid: transmitter.uuid },
        update: partialSat,
        create: {
          uuid: transmitter.uuid,
          ...partialSat,
          satelliteNoradId: transmitter.norad_cat_id,
        },
      });

      // auto assign Tags to this particular Satellite
      const tagName = transmitter.service ?? 'Unknown';
      const existings = await this.prisma.satellite.count({
        where: {
          id: transmitter.norad_cat_id,
          tags: {
            some: {
              name: tagName,
            },
          },
        },
      });
      if (existings === 0) {
        // create the Tag and link to Satellite
        await this.prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: {
            name: tagName,
          },
        });
        await this.prisma.satellite.update({
          where: { id: transmitter.norad_cat_id },
          data: {
            tags: {
              connect: { name: tagName },
            },
          },
        });
      }
    }
    const timeEnd = Date.now();
    this.logger.debug(
      `Transmitters update completed in ${timeEnd - timeStart} ms.`,
    );

    await this.appConfigService.set(
      'core.last_satnogsdb_transmitter_update.time',
      new Date().toISOString(),
    );
  }
}
