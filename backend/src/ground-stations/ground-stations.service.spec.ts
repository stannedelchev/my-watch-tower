import { Test, TestingModule } from '@nestjs/testing';
import { GroundStationsService } from './ground-stations.service';

describe('GroundStationsService', () => {
  let service: GroundStationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroundStationsService],
    }).compile();

    service = module.get<GroundStationsService>(GroundStationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
