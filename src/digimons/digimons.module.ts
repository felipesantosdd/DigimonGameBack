import { Module } from '@nestjs/common';
import { DigimonsController } from './digimons.controller';
import { DigimonsService } from './digimons.service';

@Module({
  controllers: [DigimonsController],
  providers: [DigimonsService]
})
export class DigimonsModule {}
