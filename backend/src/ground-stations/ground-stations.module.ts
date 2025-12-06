import { Module } from '@nestjs/common';
import { GroundStationsService } from './ground-stations.service';
import { GroundStationsController } from './ground-stations.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [GroundStationsController],
  providers: [GroundStationsService, PrismaService],
})
export class GroundStationsModule {}
