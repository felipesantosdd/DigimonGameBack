import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IMissions } from './missions.interface';
import { MissionsEntity } from './database/missions.entity';

@Injectable()
export class MissionsService {
    constructor(
        @InjectRepository(MissionsEntity) private missionsRepository: Repository<MissionsEntity>
    ) { }

    async create(data: IMissions): Promise<IMissions> {
        const mission = await this.missionsRepository.save(data);
        return mission;
    }

    async findAll(): Promise<IMissions[]> {
        const missions = await this.missionsRepository.find()
        return missions
    }

}
