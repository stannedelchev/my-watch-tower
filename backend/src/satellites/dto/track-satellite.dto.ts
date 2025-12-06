import { ApiProperty } from '@nestjs/swagger';

export class TrackSatelliteDto {
  @ApiProperty()
  isTracked: boolean;
}
