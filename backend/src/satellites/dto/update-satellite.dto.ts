import { ApiProperty } from '@nestjs/swagger';

export class UpdateSatelliteDto {
  @ApiProperty({ required: false })
  isTracked?: boolean;
  @ApiProperty({ required: false })
  tagIds?: number[];
}
