import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TopHeadlinesModule } from './top-headlines/top-headlines.module';
import { EverythingModule } from './everything/everything.module';

@Module({
  imports: [ConfigModule.forRoot(), TopHeadlinesModule, EverythingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
