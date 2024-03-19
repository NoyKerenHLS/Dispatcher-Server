import { Controller, Get, Query } from '@nestjs/common';
import { TopHeadlinesService } from './top-headlines.service';

@Controller('top-headlines')
export class TopHeadlinesController {
  constructor(private readonly topHeadlinesService: TopHeadlinesService) {}

  @Get()
  async getTopHeadlines(
    @Query('filters') filters: string,
    @Query('pageParam') pageParam: number,
  ) {
    return this.topHeadlinesService.getArticles(filters, pageParam);
  }

  @Get('sources')
  async getSources() {
    return this.topHeadlinesService.getSources();
  }
}
