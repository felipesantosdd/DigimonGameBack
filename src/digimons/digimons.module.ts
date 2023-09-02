import { Module } from '@nestjs/common';
import { DigimonsController } from './digimons.controller';
import { DigimonsService } from './digimons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DigimonEntity } from './database/digimon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DigimonEntity])],
  controllers: [DigimonsController],
  providers: [DigimonsService]
})
export class DigimonsModule { }
