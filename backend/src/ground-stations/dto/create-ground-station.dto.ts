import { ApiProperty } from '@nestjs/swagger';

export class CreateGroundStationDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  latitude: number;
  @ApiProperty()
  longitude: number;
  @ApiProperty()
  altitude: number;
  @ApiProperty({ required: false })
  horizonmask?: string;
}
