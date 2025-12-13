import { ApiProperty } from '@nestjs/swagger';

export class SetTagsDto {
  @ApiProperty()
  tagNames: string[];
}
