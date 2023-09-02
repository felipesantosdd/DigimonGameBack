import { Test, TestingModule } from '@nestjs/testing';
import { DigimonsController } from './digimons.controller';

describe('DigimonsController', () => {
  let controller: DigimonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DigimonsController],
    }).compile();

    controller = module.get<DigimonsController>(DigimonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
