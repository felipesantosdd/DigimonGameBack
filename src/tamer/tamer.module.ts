import { Module } from '@nestjs/common';
import { TamerService } from './tamer.service';
import { TamerController } from './tamer.controller';
import { TamerEntity } from './database/tamer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EggEntity } from '../egg/database/egg.entity';
import { DigimonEntity } from '../digimons/database/digimon.entity';
import { ItemEntity } from '../item/database/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TamerEntity, EggEntity, DigimonEntity, ItemEntity])],
  providers: [TamerService],
  controllers: [TamerController]
})
export class TamerModule { }
