import { Module } from '@nestjs/common';
import { TopHeadlinesController } from './top-headlines.controller';
import { TopHeadlinesService } from './top-headlines.service';

@Module({
  controllers: [TopHeadlinesController],
  providers: [TopHeadlinesService]
})
export class TopHeadlinesModule {}
