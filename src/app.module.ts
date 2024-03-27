import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ArticlesModule,
    MongooseModule.forRoot(
      `mongodb+srv://noyk:${process.env.DB_PASSWORD}@news-data-dispatcher.zzv07lp.mongodb.net/articles?retryWrites=true&w=majority&appName=News-data-Dispatcher`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
