import { Body, Controller, Get, Query } from '@nestjs/common';
import axios from 'axios';
import { TopHeadlinesService } from './top-headlines.service';

const END_POINT = 'https://newsapi.org/v2/top-headlines';
const API_KRY = '?apiKey=1ab54f6161084c749f2dcd1a00f84f22';
const PAGE_SIZE = '20';

@Controller('top-headlines')
export class TopHeadlinesController {
  //constructor(private readonly topHeadlinesService: TopHeadlinesService) {}

  @Get()
  async getTopHeadlines(
    @Query('filters') filters: string,
    @Query('pageParam') pageParam: number,
  ) {
    // return this.topHeadlinesService.get(filters, page);

    const pages = `&page=${pageParam}&pageSize=${PAGE_SIZE}`;

    const url = END_POINT + API_KRY + filters + pages;

    console.log(url);

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  @Get('sources')
  async getSources() {
    const url = END_POINT + '/sources' + API_KRY;
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      return error;
    }
  }
}
