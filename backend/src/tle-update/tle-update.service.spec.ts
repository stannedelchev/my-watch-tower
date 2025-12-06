import { Test, TestingModule } from '@nestjs/testing';
import { TleUpdateService } from './tle-update.service';

describe('TleUpdateService', () => {
  let service: TleUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TleUpdateService],
    }).compile();

    service = module.get<TleUpdateService>(TleUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
