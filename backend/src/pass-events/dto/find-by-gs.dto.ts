import { ApiProperty } from '@nestjs/swagger';

export class FindByGsDto {
  @ApiProperty({ description: 'Ground Station ID' })
  groundStationId: string;
  @ApiProperty({ required: false })
  page?: string;
}
