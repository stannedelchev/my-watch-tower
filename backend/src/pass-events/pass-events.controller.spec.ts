import { Test, TestingModule } from '@nestjs/testing';
import { PassEventsController } from './pass-events.controller';

describe('PassEventsController', () => {
  let controller: PassEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassEventsController],
    }).compile();

    controller = module.get<PassEventsController>(PassEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
