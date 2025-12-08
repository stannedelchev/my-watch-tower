import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { SatellitesService } from './satellites.service';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiOkResponse } from '@nestjs/swagger';
import { SatelliteEntity } from './entities/satellite.entity';
import { TrackSatelliteDto } from './dto/track-satellite.dto';
import { GetSatellitesDto } from './dto/get-satellites.dto';

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
    return this.satelliteService.update(+id, {
      isTracked: trackSatelliteDto.isTracked,
    });
  }

  @Get()
  @ApiOperation({ operationId: 'getSatellites' })
  @ApiOkResponse({ type: [SatelliteEntity] })
  async findAll(@Query() query: GetSatellitesDto) {
    return this.satelliteService.findAll({
      tracked: query?.tracked ? query.tracked === 'true' : undefined,
      tag: query?.tag,
      search: query?.search,
      page: query?.page ? parseInt(query.page, 10) : undefined,
    });
  }
}
