import { Module } from '@nestjs/common';
import { MissionsController } from './missions.controller';
import { MissionsService } from './missions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TamerEntity } from '../tamer/database/tamer.entity';
import { DigimonEntity } from '../digimons/database/digimon.entity';
import { MissionsEntity } from './database/missions.entity';
import { EggEntity } from '../egg/database/egg.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MissionsEntity, TamerEntity, DigimonEntity, EggEntity])],
  controllers: [MissionsController],
  providers: [MissionsService]
})
export class MissionsModule { }
