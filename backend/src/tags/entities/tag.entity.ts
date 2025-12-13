import { ApiProperty } from '@nestjs/swagger';
import { Tag } from 'src/generated/prisma/client';

export class TagEntity implements Tag {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  color: string | null;
}
