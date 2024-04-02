import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { articleSchema, sourceSchema } from './articles.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Article', schema: articleSchema },
      { name: 'Source', schema: sourceSchema },
    ]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
