import { Test, TestingModule } from '@nestjs/testing';
import { SatellitesController } from './satellites.controller';

describe('SatellitesController', () => {
  let controller: SatellitesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SatellitesController],
    }).compile();

    controller = module.get<SatellitesController>(SatellitesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
