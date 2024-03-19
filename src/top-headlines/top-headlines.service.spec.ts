import { Test, TestingModule } from '@nestjs/testing';
import { TopHeadlinesService } from './top-headlines.service';

describe('TopHeadlinesService', () => {
  let service: TopHeadlinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopHeadlinesService],
    }).compile();

    service = module.get<TopHeadlinesService>(TopHeadlinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
