import { Test, TestingModule } from '@nestjs/testing';
import { TamerController } from './tamer.controller';

describe('TamerController', () => {
  let controller: TamerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TamerController],
    }).compile();

    controller = module.get<TamerController>(TamerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
