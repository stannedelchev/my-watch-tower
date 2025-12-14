import { ApiProperty } from '@nestjs/swagger';
import { PassEvent } from 'src/generated/prisma/browser';

export class PassEventEntity implements PassEvent {
  @ApiProperty()
  id: number;
  @ApiProperty()
  groundStationId: number;
  @ApiProperty()
  satelliteId: number;
  @ApiProperty()
  orbitNumber: number;
  @ApiProperty()
  aos: Date;
  @ApiProperty()
  los: Date;
  @ApiProperty()
  maxElevation: number;
  @ApiProperty()
  duration: number;
  @ApiProperty()
  visibleSegments: string;
  @ApiProperty()
  totalVisibleDuration: number;
  @ApiProperty()
  maxVisibleElevation: number;

  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
