import { Module } from '@nestjs/common';
import { EggController } from './egg.controller';
import { EggService } from './egg.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EggEntity } from './database/egg.entity';
import { DigimonEntity } from '../digimons/database/digimon.entity';
import { TamerEntity } from '../tamer/database/tamer.entity';
import { MissionsEntity } from '../missions/database/missions.entity';





@Module({
  imports: [TypeOrmModule.forFeature([EggEntity, DigimonEntity, TamerEntity, MissionsEntity])],
  controllers: [EggController],
  providers: [EggService]
})
export class EggModule { }
