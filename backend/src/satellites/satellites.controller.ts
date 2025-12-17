import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { SatellitesService } from './satellites.service';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  SatelliteEntity,
  SatelliteEntityResponse,
} from './entities/satellite.entity';
import { TrackSatelliteDto } from './dto/track-satellite.dto';
import { GetSatellitesDto } from './dto/get-satellites.dto';
import { SetTagsDto } from './dto/set-tags.dto';

@Controller('satellites')
export class SatellitesController {
  constructor(private satelliteService: SatellitesService) {}

  @Patch(':id/track')
  @ApiOperation({ operationId: 'trackSatellite' })
  @ApiOkResponse({ type: SatelliteEntity })
  setTrackSatellite(
    @Param('id') id: string,
    @Body() trackSatelliteDto: TrackSatelliteDto,
  ) {
    return this.satelliteService.setTracked(+id, {
      isTracked: trackSatelliteDto.isTracked,
    });
  }

  @Patch(':id/tags')
  @ApiOperation({ operationId: 'updateSatelliteTags' })
  @ApiOkResponse({ type: SatelliteEntity })
  async updateSatelliteTags(@Param('id') id: string, @Body() body: SetTagsDto) {
    return this.satelliteService.resetTags(+id, body.tagNames);
  }

  @Get()
  @ApiOperation({ operationId: 'getSatellites' })
  @ApiOkResponse({ type: SatelliteEntityResponse })
  async findAll(@Query() query: GetSatellitesDto) {
    return this.satelliteService.findAll({
      tracked: query?.tracked ? query.tracked === 'true' : undefined,
      tag: query?.tag,
      name: query?.name,
      frequencyFilters: query?.frequencyFilters,
      page: query?.page ? parseInt(query.page, 10) : undefined,
    });
  }
}
