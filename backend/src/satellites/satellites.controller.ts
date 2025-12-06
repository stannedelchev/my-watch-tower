import { Body, Controller, Param, Patch } from '@nestjs/common';
import { SatellitesService } from './satellites.service';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiOkResponse } from '@nestjs/swagger';
import { SatelliteEntity } from './entities/satellite.entity';
import { TrackSatelliteDto } from './dto/track-satellite.dto';

@Controller('satellites')
export class SatellitesController {
  constructor(private satelliteService: SatellitesService) {}

  @Patch(':id/track')
  @ApiOperation({ operationId: 'trackSatellite' })
  @ApiOkResponse({ type: SatelliteEntity })
  trackSatellite(
    @Param('id') id: string,
    @Body() trackSatelliteDto: TrackSatelliteDto,
  ) {
    return this.satelliteService.update(+id, {
      isTracked: trackSatelliteDto.isTracked,
    });
  }
}
