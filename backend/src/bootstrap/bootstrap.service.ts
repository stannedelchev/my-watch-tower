import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DEFAULT_TLE_SOURCES } from 'src/config/default-tle-sources';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BootstrapService implements OnModuleInit {
  private readonly logger = new Logger(BootstrapService.name);

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    this.logger.log('Running bootstrap tasks...');
    await this.seedTleSources();
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
}
