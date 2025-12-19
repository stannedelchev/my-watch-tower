import { ApiProperty } from '@nestjs/swagger';
import { PassEvent } from 'src/generated/prisma/browser';
import { GroundStationEntity } from 'src/ground-stations/entities/ground-station.entity';
import { SatelliteEntity } from 'src/satellites/entities/satellite.entity';

export class PassEventEntity implements PassEvent {
  @ApiProperty()
  id: number;
  @ApiProperty()
  groundStationId: number;
  @ApiProperty()
  satelliteId: number;
  @ApiProperty({ type: SatelliteEntity })
  satellite: SatelliteEntity;
  @ApiProperty({ type: GroundStationEntity })
  groundStation: GroundStationEntity;
  @ApiProperty()
  orbitNumber: number;
  @ApiProperty()
  aos: Date;
  @ApiProperty()
  aosTime: string;
  @ApiProperty()
  aosDow: string;
  @ApiProperty()
  losTime: string;
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

export class PassEventEntityResponse {
  @ApiProperty({ type: [PassEventEntity] })
  items: PassEventEntity[];
  @ApiProperty()
  total: number;
  @ApiProperty()
  page: number;
  @ApiProperty()
  pageCount: number;
}
