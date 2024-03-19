import { Test, TestingModule } from '@nestjs/testing';
import { EverythingController } from './everything.controller';

describe('EverythingController', () => {
  let controller: EverythingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EverythingController],
    }).compile();

    controller = module.get<EverythingController>(EverythingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
