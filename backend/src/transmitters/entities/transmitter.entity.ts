import { ApiProperty } from '@nestjs/swagger';
import { Transmitter } from 'src/generated/prisma/client';

export class TransmitterEntity implements Transmitter {
  @ApiProperty({ type: Number })
  id: number;
  uuid: string;
  @ApiProperty({ type: String, nullable: true })
  description: string | null;
  @ApiProperty({ type: String, nullable: true })
  type: string | null;
  @ApiProperty({ type: String, nullable: true })
  status: string | null;
  @ApiProperty({ type: BigInt, nullable: true })
  uplinkLow: bigint | null;
  @ApiProperty({ type: BigInt, nullable: true })
  uplinkHigh: bigint | null;
  @ApiProperty({ type: BigInt, nullable: true })
  downlinkLow: bigint | null;
  @ApiProperty({ type: BigInt, nullable: true })
  downlinkHigh: bigint | null;
  @ApiProperty({ type: String, nullable: true })
  mode: string | null;
  @ApiProperty({ type: Number, nullable: true })
  baud: number | null;
  @ApiProperty({ type: Boolean })
  invert: boolean;
  @ApiProperty({ type: String, nullable: true })
  citation: string | null;
  updatedAt: Date;
  satelliteNoradId: number;
}
