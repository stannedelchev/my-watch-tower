import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import axios, { AxiosResponse } from 'axios';
import { getCatalogNumber } from 'tle.js';
import { Satellite, TleSource } from 'src/generated/prisma/client';

// refetch every X hours
const REFETCH_INTERVAL_HOURS = 24;

@Injectable()
export class TleUpdateService implements OnModuleInit {
  private readonly logger = new Logger(TleUpdateService.name);

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    // // test try the first source from the database
    // const firstSource = await this.prisma.tleSource.findFirst();
    // if (firstSource) {
    //   await this.updateSource(firstSource);
    // }
    this.logger.log(
      `Scheduling TLE updates every ${REFETCH_INTERVAL_HOURS} hours.`,
    );
    // not using cron on set time to avoid thundering herd
    await this.updateStaleSources();
    setInterval(
      () => {
        void this.updateStaleSources();
      },
      REFETCH_INTERVAL_HOURS * 60 * 60 * 1000,
    );
  }

  async updateStaleSources() {
    this.logger.log('Checking for stale TLE sources to update...');
    const STALE_TIMEOUT_HOURS = 3; // swich to -1 to trigger immediate refresh
    const staleDate = new Date(
      Date.now() - STALE_TIMEOUT_HOURS * 60 * 60 * 1000,
    );
    const staleSources = await this.prisma.tleSource.findMany({
      where: {
        updatedAt: { lt: staleDate },
      },
    });
    this.logger.log(`Found ${staleSources.length} stale sources to update.`);
    for (const source of staleSources) {
      await this.updateSource(source);
      await this.prisma.tleSource.update({
        where: { id: source.id },
        data: { updatedAt: new Date() },
      });
    }

    // TODO: trigger transmitters update
  }

  async updateAllSources() {
    this.logger.log('Starting TLE update for all sources...');
    const sources = await this.prisma.tleSource.findMany();
    for (const source of sources) {
      await this.updateSource(source);
      await this.prisma.tleSource.update({
        where: { id: source.id },
        data: { updatedAt: new Date() },
      });
    }
    this.logger.log('Completed TLE update for all sources.');
    // TODO: trigger transmitters update
  }

  async updateSource(source: TleSource) {
    this.logger.debug(`Updating TLE source from URL: ${source.url}`);

    let response: AxiosResponse<string>;
    try {
      response = await axios.get<string>(source.url, { responseType: 'text' });
    } catch (error) {
      this.logger.error(
        `Failed to fetch TLE data from ${source.url}: ${error}`,
      );
      return;
    }
    const tleData = response.data;
    if (source.parser === 'rawText') {
      await this.processRawTextTleData(tleData, source);
    } else {
      this.logger.error(
        `Unknown parser "${source.parser}" for TLE source ${source.name}. Skipping.`,
      );
    }
  }

  async processRawTextTleData(tleData: string, source: TleSource) {
    const lines = tleData.split(/\r?\n/).filter((line) => line.length > 0);
    const satellites: Partial<Satellite>[] = [];

    for (let i = 0; i < lines.length; i += 3) {
      const name = lines[i].trim();
      const line1 = lines[i + 1]?.trim();
      const line2 = lines[i + 2]?.trim();
      const id = getCatalogNumber(`${name}\n${line1}\n${line2}`);

      if (line1 && line2) {
        satellites.push({
          id,
          name,
          line1,
          line2,
          updatedAt: new Date(),
        });
      }
    }

    this.logger.log(
      `Fetched ${satellites.length} satellites from ${source.url}. Updating DB...`,
    );

    // chunk in batches of 100
    const chunkSize = 100;
    for (let i = 0; i < satellites.length; i += chunkSize) {
      const chunk = satellites.slice(i, i + chunkSize);
      const upsertPromises = chunk.map((sat) =>
        this.prisma.satellite.upsert({
          where: { id: sat.id! },
          update: {
            name: sat.name,
            line1: sat.line1,
            line2: sat.line2,
          },
          // create requires full type
          create: {
            id: sat.id!,
            name: sat.name!,
            line1: sat.line1!,
            line2: sat.line2!,
          },
        }),
      );
      await Promise.all(upsertPromises);
    }

    this.logger.log(
      `Updated ${satellites.length} satellites from source ${source.name}.`,
    );
  }
}
