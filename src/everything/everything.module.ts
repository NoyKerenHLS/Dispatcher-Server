import { Module } from '@nestjs/common';
import { EverythingController } from './everything.controller';
import { EverythingService } from './everything.service';

@Module({
  controllers: [EverythingController],
  providers: [EverythingService]
})
export class EverythingModule {}
