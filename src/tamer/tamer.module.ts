import { Module } from '@nestjs/common';
import { TamerService } from './tamer.service';
import { TamerController } from './tamer.controller';
import { TamerEntity } from './database/tamer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TamerEntity])],
  providers: [TamerService],
  controllers: [TamerController]
})
export class TamerModule { }
