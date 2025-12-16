import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSatelliteDto } from './dto/update-satellite.dto';
import { Prisma, Satellite } from 'src/generated/prisma/client';
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

  async findAll(params: {
    tracked?: boolean;
    tag?: string;
    name?: string;
    frequencyFilters?: string;
    page?: number;
  }) {
    const { tracked, tag, name, frequencyFilters, page = 1 } = params;
    const take = 10;
    const skip = (page - 1) * take;

    let frequencyFiltersParsed: {
      min: number;
      max: number;
      direction: 'downlink' | 'uplink';
    }[] = [];
    if (frequencyFilters) {
      frequencyFiltersParsed = JSON.parse(frequencyFilters) as {
        min: number;
        max: number;
        direction: 'downlink' | 'uplink';
      }[];
    }

    const where: Prisma.SatelliteWhereInput = {
      ...(tracked !== undefined && { isTracked: tracked }),
      ...(name &&
        !isNaN(Number(name)) && {
          OR: [
            { name: { contains: name, mode: 'insensitive' } },
            { id: isNaN(Number(name)) ? undefined : Number(name) },
          ],
        }),
      ...(name &&
        isNaN(Number(name)) && {
          name: { contains: name, mode: 'insensitive' },
        }),
      ...(frequencyFiltersParsed &&
        frequencyFiltersParsed.length > 0 &&
        (() => {
          return {
            transmitters: {
              some: {
                OR: frequencyFiltersParsed.map((filter) => {
                  // there is also uplinkHigh/downlinkHigh, but it is rarely used and for simplicity we skip it here
                  const field =
                    filter.direction === 'downlink'
                      ? 'downlinkLow'
                      : 'uplinkLow';
                  return {
                    [field]: {
                      gte: filter.min,
                      lte: filter.max,
                    },
                  };
                }),
              },
            },
          };
        })()),
      ...(tag && {
        tags: {
          some: {
            name: tag,
          },
        },
      }),
    };

    const [items, total] = await Promise.all([
      this.prisma.satellite.findMany({
        where,
        take,
        skip,
        include: { tags: true, transmitters: true },
        orderBy: { name: 'asc' },
      }),
      this.prisma.satellite.count({ where }),
    ]);

    return { items, total, page, pageCount: Math.ceil(total / take) };
  }

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
      include: { tags: true, transmitters: true },
    });
  }

  async resetTags(id: number, tagNames: string[]) {
    const item = await this.prisma.satellite.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException('Satellite not found');
    }

    // create any new tags, if needed
    const tags = await this.prisma.tag.findMany({
      where: { name: { in: tagNames } },
    });
    const existingTagNames = tags.map((t) => t.name);
    const newTagNames = tagNames.filter(
      (name) => !existingTagNames.includes(name),
    );

    const newTags = await Promise.all(
      newTagNames.map((name) =>
        this.prisma.tag.create({
          data: { name },
        }),
      ),
    );

    const allTags = [...tags, ...newTags];

    // attach tags to satellite
    return this.prisma.satellite.update({
      where: { id },
      data: {
        tags: {
          set: [],
          connect: allTags.map((tag) => ({ id: tag.id })),
        },
      },
      include: { tags: true, transmitters: true },
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
