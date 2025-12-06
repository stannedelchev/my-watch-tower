import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroundStationsService } from './ground-stations.service';
import { CreateGroundStationDto } from './dto/create-ground-station.dto';
import { UpdateGroundStationDto } from './dto/update-ground-station.dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { GroundStationEntity } from './entities/ground-station.entity';

@Controller('ground-stations')
export class GroundStationsController {
  constructor(private readonly groundStationsService: GroundStationsService) {}

  @Post()
  @ApiOperation({ operationId: 'createGroundStation' })
  @ApiOkResponse({ type: GroundStationEntity })
  create(@Body() createGroundStationDto: CreateGroundStationDto) {
    return this.groundStationsService.create(createGroundStationDto);
  }

  @Get()
  @ApiOperation({ operationId: 'getAllGroundStations' })
  @ApiOkResponse({ type: [GroundStationEntity] })
  findAll() {
    return this.groundStationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ operationId: 'getGroundStationById' })
  @ApiOkResponse({ type: GroundStationEntity })
  @ApiNotFoundResponse()
  findOne(@Param('id') id: string) {
    return this.groundStationsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ operationId: 'updateGroundStation' })
  @ApiOkResponse({ type: GroundStationEntity })
  @ApiNotFoundResponse()
  update(
    @Param('id') id: string,
    @Body() updateGroundStationDto: UpdateGroundStationDto,
  ) {
    return this.groundStationsService.update(+id, updateGroundStationDto);
  }

  @Delete(':id')
  @ApiOperation({ operationId: 'removeGroundStation' })
  @ApiOkResponse({ type: GroundStationEntity })
  @ApiNotFoundResponse()
  remove(@Param('id') id: string) {
    return this.groundStationsService.remove(+id);
  }
}
