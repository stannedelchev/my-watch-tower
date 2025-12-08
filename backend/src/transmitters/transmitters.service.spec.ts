import { Test, TestingModule } from '@nestjs/testing';
import { TransmittersService } from './transmitters.service';

describe('TransmittersUpdateService', () => {
  let service: TransmittersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransmittersService],
    }).compile();

    service = module.get<TransmittersService>(TransmittersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
