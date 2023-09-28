import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DigimonsModule } from './digimons/digimons.module';
import { DatabaseModule } from './database/database.module';
import { TamerModule } from './tamer/tamer.module';
import { ItemModule } from './item/item.module';
import { EggModule } from './egg/egg.module';
import { SkillModule } from './skill/skill.module';
import { MissionsModule } from './missions/missions.module';
import { TrainingModule } from './training/training.module';


@Module({
  imports: [
    DigimonsModule,
    DatabaseModule,
    TamerModule,
    ItemModule,
    EggModule,
    SkillModule,
    MissionsModule,
    TrainingModule
  ],
  controllers: [AppController],
  providers: [AppService],


})
export class AppModule { }
