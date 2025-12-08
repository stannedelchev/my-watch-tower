import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSatelliteDto } from './dto/update-satellite.dto';
import { Satellite } from 'src/generated/prisma/client';
import { AppConfigService } from 'src/app-config/app-config.service';
import axios from 'axios';
import { SatnogsdbSatellite } from './satellites.interfaces';

@Injectable()
export class SatellitesService {
  private readonly logger = new Logger(SatellitesService.name);
  constructor(
    private prisma: PrismaService,
    private appConfigService: AppConfigService,
  ) {}

  async update(
    id: number,
    updateSatelliteDto: UpdateSatelliteDto,
  ): Promise<Satellite> {
    const item = await this.prisma.satellite.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException('Satellite not found');
    }
    return await this.prisma.satellite.update({
      where: { id },
      data: updateSatelliteDto,
    });
  }

  async updateFromSatnogsdb() {
    const URL =
      'https://db.satnogs.org/api/satellites/?format=json&status=alive&in_orbit=true';
    this.logger.log(`Fetching satellites from ${URL}`);

    const satellitesData: SatnogsdbSatellite[] = [];
    try {
      const response = await axios.get<SatnogsdbSatellite[]>(URL);
      satellitesData.push(...response.data);
    } catch (error) {
      this.logger.error(`Failed to fetch satellites from ${URL}: ${error}`);
      return;
    }

    this.logger.log(`Fetched ${satellitesData.length} satellites.`);
    const timeStart = Date.now();
    for (const satData of satellitesData) {
      const noradId = satData.norad_cat_id;
      if (!noradId) {
        continue;
      }

      const satelliteData = {
        name: satData.name,
      };
      await this.prisma.satellite.upsert({
        where: { id: noradId },
        update: satelliteData,
        create: {
          id: noradId,
          ...satelliteData,
          line1: '',
          line2: '',
        },
      });
    }
    const timeEnd = Date.now();
    this.logger.log(
      `Updated/created ${satellitesData.length} satellites from SatNOGS DB in ${
        (timeEnd - timeStart) / 1000
      } seconds.`,
    );

    await this.appConfigService.set(
      'core.last_satnogsdb_satellite_update.time',
      new Date().toISOString(),
    );
  }
}
