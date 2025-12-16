import { ApiProperty } from '@nestjs/swagger';

export class GetSatellitesDto {
  @ApiProperty({
    required: false,
    description: 'Fetch only tracked satellites?',
    example: 'true',
  })
  tracked?: string;
  @ApiProperty({
    required: false,
    description: 'Filter by tag name',
    example: 'Amateur',
  })
  tag?: string;
  @ApiProperty({
    required: false,
    description: 'Filter by (part of) satellite name, case insensitive',
    example: 'meteor',
  })
  name?: string;
  @ApiProperty({
    required: false,
    description:
      'JSON stringified array of frequency filter objects: [ {"min": number, "max": number, "direction": "downlink" | "uplink" } ]',
    example:
      '[{"min": 145000000, "max": 146000000, "direction": "downlink"}, {"min": 143000000, "max": 144000000, "direction": "downlink"}]',
  })
  frequencyFilters?: string; // [ {"min": number, "max": number, "direction": "downlink" | "uplink" } ]
  @ApiProperty({ required: false })
  page?: string;
}
