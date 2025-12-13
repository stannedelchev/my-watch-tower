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
      'JSON stringified array of frequency filter objects: [ {"frequency": number, "mode": "le" | "ge", "direction": "downlink" | "uplink" } ]',
    example:
      '[{"frequency": 145000000, "mode": "le", "direction": "downlink"}, {"frequency": 143000000, "mode": "ge", "direction": "downlink"}]',
  })
  frequencyFilters?: string; // [ {"frequency": number, "mode": "le" | "ge", "direction": "downlink" | "uplink" } ]
  @ApiProperty({ required: false })
  page?: string;
}
