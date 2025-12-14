import { ApiProperty } from '@nestjs/swagger';
import { Satellite } from 'src/generated/prisma/client';
import { TagEntity } from 'src/tags/entities/tag.entity';
import { TransmitterEntity } from 'src/transmitters/entities/transmitter.entity';

export class SatelliteEntity implements Satellite {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  noradId: number;
  @ApiProperty()
  catalogNumber: number;
  @ApiProperty()
  internationalDesignator: string;
  @ApiProperty()
  launchDate: Date;
  @ApiProperty()
  isTracked: boolean;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  line1: string;
  @ApiProperty()
  line2: string;
  @ApiProperty()
  sourceId: number;
  @ApiProperty({ type: [TagEntity] })
  tags: TagEntity[];
  @ApiProperty({ type: [TransmitterEntity] })
  transmitters: TransmitterEntity[];
}

export class SatelliteEntityResponse {
  @ApiProperty({ type: [SatelliteEntity] })
  items: SatelliteEntity[];
  @ApiProperty()
  total: number;
  @ApiProperty()
  page: number;
  @ApiProperty()
  pageCount: number;
}
