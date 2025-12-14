import { Test, TestingModule } from '@nestjs/testing';
import { PassEventsService } from './pass-events.service';

describe('PassEventsService', () => {
  let service: PassEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassEventsService],
    }).compile();

    service = module.get<PassEventsService>(PassEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
