import { Test, TestingModule } from '@nestjs/testing';
import { TopHeadlinesController } from './top-headlines.controller';

describe('TopHeadlinesController', () => {
  let controller: TopHeadlinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopHeadlinesController],
    }).compile();

    controller = module.get<TopHeadlinesController>(TopHeadlinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
