import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { AppConfigService } from 'src/app-config/app-config.service';
import { DEFAULT_TLE_SOURCES } from 'src/config/default-tle-sources';
import { PrismaService } from 'src/prisma/prisma.service';
import { SatellitesService } from 'src/satellites/satellites.service';
import { TransmittersService } from 'src/transmitters/transmitters.service';

@Injectable()
export class BootstrapService implements OnModuleInit {
  private readonly logger = new Logger(BootstrapService.name);

  constructor(
    private prisma: PrismaService,
    private appConfigService: AppConfigService,
    private satellitesService: SatellitesService,
    private transmittersService: TransmittersService,
  ) {}

  async onModuleInit() {
    this.logger.log('Running bootstrap tasks...');
    await this.seedTleSources();
    await this.updateSatnogsdbSatellites();
    await this.updateSatnogsdbTransmitters();
    this.logger.log('Bootstrap tasks completed.');
  }

  async seedTleSources() {
    const count = await this.prisma.tleSource.count();
    if (count > 0) {
      this.logger.log('TLE sources already seeded, skipping.');
      return;
    }
    await this.prisma.tleSource.createMany({
      data: DEFAULT_TLE_SOURCES,
      skipDuplicates: true,
    });
    this.logger.log(
      `Seeded ${DEFAULT_TLE_SOURCES.length} default TLE sources.`,
    );
  }

  async updateSatnogsdbSatellites() {
    const SATELLITES_STALE_HOURS = 24;

    const lastFetchTime = await this.appConfigService.get(
      'core.last_satnogsdb_satellite_update.time',
    );
    const now = new Date();
    if (lastFetchTime) {
      const lastFetchDate = new Date(lastFetchTime);
      const hoursSinceLastFetch =
        (now.getTime() - lastFetchDate.getTime()) / (1000 * 60 * 60);
      if (hoursSinceLastFetch < SATELLITES_STALE_HOURS) {
        this.logger.log(
          `SatNOGS DB satellites were updated ${hoursSinceLastFetch.toFixed(
            2,
          )} hours ago, skipping.`,
        );
        return;
      }
    }

    await this.satellitesService.updateFromSatnogsdb();
  }

  async updateSatnogsdbTransmitters() {
    const TRANSMITTERS_STALE_HOURS = 24;

    const lastFetchTime = await this.appConfigService.get(
      'core.last_satnogsdb_transmitter_update.time',
    );
    const now = new Date();
    if (lastFetchTime) {
      const lastFetchDate = new Date(lastFetchTime);
      const hoursSinceLastFetch =
        (now.getTime() - lastFetchDate.getTime()) / (1000 * 60 * 60);
      if (hoursSinceLastFetch < TRANSMITTERS_STALE_HOURS) {
        this.logger.log(
          `SatNOGS DB transmitters were updated ${hoursSinceLastFetch.toFixed(
            2,
          )} hours ago, skipping.`,
        );
        return;
      }
    }

    await this.transmittersService.updateTransmitters();
  }
}
