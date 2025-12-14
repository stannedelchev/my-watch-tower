import { ApiProperty } from '@nestjs/swagger';
import { Transmitter } from 'src/generated/prisma/client';

export class TransmitterEntity implements Transmitter {
  @ApiProperty()
  id: number;
  uuid: string;
  @ApiProperty()
  description: string | null;
  @ApiProperty()
  type: string | null;
  @ApiProperty()
  status: string | null;
  @ApiProperty()
  uplinkLow: bigint | null;
  @ApiProperty()
  uplinkHigh: bigint | null;
  @ApiProperty()
  downlinkLow: bigint | null;
  @ApiProperty()
  downlinkHigh: bigint | null;
  @ApiProperty()
  mode: string | null;
  @ApiProperty()
  baud: number | null;
  @ApiProperty()
  invert: boolean;
  @ApiProperty()
  citation: string | null;
  updatedAt: Date;
  satelliteNoradId: number;
}
