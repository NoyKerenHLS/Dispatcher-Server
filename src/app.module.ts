import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TopHeadlinesModule } from './top-headlines/top-headlines.module';
import { EverythingModule } from './everything/everything.module';

@Module({
  imports: [TopHeadlinesModule, EverythingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
