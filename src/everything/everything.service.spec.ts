import { Test, TestingModule } from '@nestjs/testing';
import { EverythingService } from './everything.service';

describe('EverythingService', () => {
  let service: EverythingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EverythingService],
    }).compile();

    service = module.get<EverythingService>(EverythingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
