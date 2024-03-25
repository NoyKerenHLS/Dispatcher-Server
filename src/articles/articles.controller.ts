import { Controller, Get, Query, Scope } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async get(
    @Query('scope') scope: string,
    @Query('filters') filters: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.articlesService.get(scope, filters, page, pageSize);
  }

  @Get('sources')
  async getSources() {
    return this.articlesService.getSources();
  }
}
