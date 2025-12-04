import { Controller, Get } from '@nestjs/common';
import { GroundStation } from './ground-stations.interfaces';
import { ApiOperation } from '@nestjs/swagger';

@Controller('ground-stations')
export class GroundStationsController {
  @Get()
  @ApiOperation({ operationId: 'getAllStations' })
  getAllGroundStations(): GroundStation[] {
    const mockData = [
      {
        id: 1,
        name: 'Ground Station Alpha',
        latitude: 34.05,
        longitude: -118.25,
      } as GroundStation,
      {
        id: 2,
        name: 'Ground Station Beta',
        latitude: 40.71,
        longitude: -74.01,
      } as GroundStation,
    ];
    return mockData;
  }
}
