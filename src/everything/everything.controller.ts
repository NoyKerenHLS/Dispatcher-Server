import { Controller, Get, Query } from '@nestjs/common';
import axios from 'axios';
import { EverythingService } from './everything.service';

@Controller('everything')
export class EverythingController {
  constructor(private readonly everythingService: EverythingService) {}

  @Get()
  async getEverything(
    @Query('filters') filters: string,
    @Query('pageParam') pageParam: number,
  ) {
    return this.everythingService.getArticles(filters, pageParam);
  }
}
