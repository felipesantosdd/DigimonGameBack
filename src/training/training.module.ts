import { Module } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingEntity } from './database/training.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingEntity])],
  providers: [TrainingService],
  controllers: [TrainingController]
})
export class TrainingModule { }
