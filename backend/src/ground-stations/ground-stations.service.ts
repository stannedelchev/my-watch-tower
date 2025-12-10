import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroundStationDto } from './dto/create-ground-station.dto';
import { UpdateGroundStationDto } from './dto/update-ground-station.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GroundStation } from 'src/generated/prisma/client';
// import { GroundStationCreateInput } from 'src/generated/prisma/models';

@Injectable()
export class GroundStationsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateGroundStationDto): Promise<GroundStation> {
    return this.prisma.groundStation.create({
      data,
    });
  }

  async findAll(): Promise<GroundStation[]> {
    return await this.prisma.groundStation.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number): Promise<GroundStation | null> {
    const item = await this.prisma.groundStation.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException('Ground station not found');
    }
    return item;
  }

  async update(
    id: number,
    data: UpdateGroundStationDto,
  ): Promise<GroundStation> {
    const item = await this.prisma.groundStation.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException('Ground station not found');
    }
    return await this.prisma.groundStation.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<GroundStation> {
    const item = await this.prisma.groundStation.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException('Ground station not found');
    }
    return await this.prisma.groundStation.delete({
      where: { id },
    });
  }
}
