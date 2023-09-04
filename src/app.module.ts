import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DigimonsModule } from './digimons/digimons.module';
import { DatabaseModule } from './database/database.module';
import { TamerModule } from './tamer/tamer.module';
import { ItemModule } from './item/item.module';
import { EggModule } from './egg/egg.module';

@Module({
  imports: [
    DigimonsModule,
    DatabaseModule,
    TamerModule,
    ItemModule,
    EggModule
  ],
  controllers: [AppController],
  providers: [AppService],


})
export class AppModule { }
