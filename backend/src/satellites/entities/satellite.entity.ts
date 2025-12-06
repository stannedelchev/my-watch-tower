import { ApiProperty } from '@nestjs/swagger';
import { Satellite } from 'src/generated/prisma/client';

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
}
