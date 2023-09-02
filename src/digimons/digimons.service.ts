import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IDigimon } from 'src/interfaces/digimon.interface';
import { DigimonEntity } from './database/digimon.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DigimonsService {
    constructor(@InjectRepository(DigimonEntity) private digimonRepository: Repository<DigimonEntity>) { }

    async findAll(): Promise<IDigimon[]> {
        const digimons = await this.digimonRepository.find()
        return digimons
    }

    async create(digimon: IDigimon): Promise<IDigimon> {
        return await this.digimonRepository.save(digimon);

    }
}
