import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PassEventsService {
  private readonly logger = new Logger(PassEventsService.name);
  constructor(private prisma: PrismaService) {}

  async findAllByGroundStationId({
    groundStationId,
    page = 1,
  }: {
    groundStationId: number;
    page?: number;
  }) {
    const take = 10;
    const skip = (page - 1) * take;
    const where = { groundStationId };

    const [items, total] = await Promise.all([
      this.prisma.passEvent.findMany({
        where,
        orderBy: { aos: 'asc' },
        skip,
        take,
        omit: {
          visibleSegments: true,
        },
        include: {
          satellite: {
            include: {
              tags: true,
              transmitters: true,
            },
          },
        },
      }),
      this.prisma.passEvent.count({ where }),
    ]);
    return { items, total, page, pageCount: Math.ceil(total / take) };
  }
}
