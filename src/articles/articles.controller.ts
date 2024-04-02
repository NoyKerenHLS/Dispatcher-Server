import { Body, Controller, Get, Post, Query, Scope } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Filters } from './articles.model';

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

  @Post('db')
  async fetchAndStore(@Body('country') country: string) {
    this.articlesService.fetchAndStore(country);
  }

  @Post('source/db')
  async fetchAndStoreSources(@Body('country') country: string) {
    this.articlesService.fetchAndStoreSources(country);
  }

  @Get('sources/db')
  async getAllSources() {
    const sources = await this.articlesService.getAllSources();
    console.log('sources:', sources);
    return sources;
  }

  @Get('db')
  async getFromDB(
    @Query('scope') scope: string,
    @Query('filters') filters: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    const params = new URLSearchParams(decodeURIComponent(filters));

    const newFilters: Filters = {
      country: params.get('Country') || '',
      category: params.get('Category') || '',
      sources: params.get('Sources') || '',
      q: params.get('q') || '',
      from: params.get('from') || '',
      to: params.get('to') || '',
      language: params.get('Language') || '',
      sortBy: params.get('SortBy') || '',
    };

    console.log(newFilters);

    const articles = await this.articlesService.getFromDB(
      scope,
      newFilters,
      page,
      pageSize,
    );
    console.log('articles:', articles);

    return articles;
  }

  @Get('sources')
  async getSources() {
    return this.articlesService.getSources();
  }
}
