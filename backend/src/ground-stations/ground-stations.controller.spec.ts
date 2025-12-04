import { Test, TestingModule } from '@nestjs/testing';
import { GroundStationsController } from './ground-stations.controller';

describe('GroundStationsController', () => {
  let controller: GroundStationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroundStationsController],
    }).compile();

    controller = module.get<GroundStationsController>(GroundStationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
