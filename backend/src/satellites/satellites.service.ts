import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSatelliteDto } from './dto/update-satellite.dto';
import { Satellite } from 'src/generated/prisma/client';

@Injectable()
export class SatellitesService {
  constructor(private prisma: PrismaService) {}

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
}
