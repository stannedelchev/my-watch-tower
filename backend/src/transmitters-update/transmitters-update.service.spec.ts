import { Test, TestingModule } from '@nestjs/testing';
import { TransmittersUpdateService } from './transmitters-update.service';

describe('TransmittersUpdateService', () => {
  let service: TransmittersUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransmittersUpdateService],
    }).compile();

    service = module.get<TransmittersUpdateService>(TransmittersUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
