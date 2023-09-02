import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DigimonsModule } from './digimons/digimons.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DigimonsModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],


})
export class AppModule { }
