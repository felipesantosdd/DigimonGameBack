import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingEntity } from './database/training.entity';
import { Repository } from 'typeorm';
import { ITraining } from './training.interface';

@Injectable()
export class TrainingService {
    constructor(
        @InjectRepository(TrainingEntity) private trainingRepository: Repository<TrainingEntity>
    ) { }

    async create(data: ITraining): Promise<ITraining> {
        return await this.trainingRepository.save(data);
    }

    async getAll(): Promise<ITraining[]> {
        return await this.trainingRepository.find();
    }
}


