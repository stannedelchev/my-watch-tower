import { ApiProperty } from '@nestjs/swagger';

export class GetSatellitesDto {
  @ApiProperty({ required: false })
  tracked?: string;
  @ApiProperty({ required: false })
  tag?: string;
  @ApiProperty({ required: false })
  search?: string;
  @ApiProperty({ required: false })
  page?: string;
}
