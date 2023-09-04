import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IDigimon } from './digimon.interface';
import { DigimonEntity } from './database/digimon.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DigimonsService {
    constructor(@InjectRepository(DigimonEntity) private digimonRepository: Repository<DigimonEntity>) { }

    async findOne(id: string): Promise<IDigimon> {
        const tamer = await this.digimonRepository.findOne(
            { where: { id: id }, });
        return tamer
    }

    async findAll(): Promise<IDigimon[]> {
        const digimons = await this.digimonRepository.find()
        return digimons
    }

    async create(digimon: IDigimon): Promise<IDigimon> {
        return await this.digimonRepository.save(digimon);

    }

    async update(id: string, data: IDigimon): Promise<IDigimon> {
        const digimon = await this.digimonRepository.findOne({ where: { id } })

        digimon.hp = data.hp || (digimon.hp)
        digimon.mp = data.mp || digimon.mp
        digimon.defense = data.defense || digimon.defense
        digimon.speed = data.speed || digimon.speed
        digimon.aptitude = data.aptitude || digimon.aptitude
        digimon.level = data.level || digimon.level

        return await this.digimonRepository.save(digimon)

    }
}
