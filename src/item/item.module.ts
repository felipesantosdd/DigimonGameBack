import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from './database/item.entity';
import { EggEntity } from '../egg/database/egg.entity';
import { TamerEntity } from '../tamer/database/tamer.entity';
import { EggService } from '../egg/egg.service';
import { DigimonEntity } from '../digimons/database/digimon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity, EggEntity, TamerEntity, DigimonEntity])],
  controllers: [ItemController],
  providers: [ItemService, EggService]
})
export class ItemModule { }
