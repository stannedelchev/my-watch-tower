import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagsService {
  private readonly logger = new Logger(TagsService.name);
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.tag.findMany({
      orderBy: { name: 'asc' },
    });
  }
}
