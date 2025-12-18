import { Controller, Get, Query } from '@nestjs/common';
import { PassEventsService } from './pass-events.service';
import { PassEventEntityResponse } from './entities/pass-event.entity';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { FindByGsDto } from './dto/find-by-gs.dto';

@Controller('pass-events')
export class PassEventsController {
  constructor(private passEventsService: PassEventsService) {}

  @Get()
  @ApiOperation({ operationId: 'getPassEventsByGroundStationId' })
  @ApiOkResponse({ type: PassEventEntityResponse })
  async findAllByGroundStationId(@Query() query: FindByGsDto) {
    return this.passEventsService.findAllByGroundStationId({
      groundStationId: parseInt(query.groundStationId, 10),
      satelliteFilters: {
        tag: query?.tag,
        name: query?.name,
        frequencyFilters: query?.frequencyFilters,
      },
      passEventFilters: {
        minVisibleDuration: query?.minVisibleDuration,
        minVisibleElevation: query?.minVisibleElevation,
        browserLocalTzOffsetMinutes: query?.browserLocalTzOffsetMinutes,
        timingFilters: query?.timingFilters,
      },
      page: query.page ? parseInt(query.page, 10) : undefined,
    });
  }
}
