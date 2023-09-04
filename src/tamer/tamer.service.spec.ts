import { Test, TestingModule } from '@nestjs/testing';
import { TamerService } from './tamer.service';

describe('TamerService', () => {
  let service: TamerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TamerService],
    }).compile();

    service = module.get<TamerService>(TamerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
