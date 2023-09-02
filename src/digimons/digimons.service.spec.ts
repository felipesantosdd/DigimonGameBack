import { Test, TestingModule } from '@nestjs/testing';
import { DigimonsService } from './digimons.service';

describe('DigimonsService', () => {
  let service: DigimonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DigimonsService],
    }).compile();

    service = module.get<DigimonsService>(DigimonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
