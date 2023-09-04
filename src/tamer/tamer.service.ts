import { ITamer } from './tamer.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TamerEntity } from './database/tamer.entity';
import { Repository } from 'typeorm';


@Injectable()
export class TamerService {
    constructor(
        @InjectRepository(TamerEntity) private tamerRepository: Repository<TamerEntity>
    ) { }

    async findOne(id: string): Promise<ITamer> {
        const tamer = await this.tamerRepository.findOne(
            {
                where: { id: id },
                relations: {
                    digimons: true,
                    bag: true
                }
            }
        );
        return tamer
    }


    async findAll(): Promise<ITamer[]> {
        const tamers = await this.tamerRepository.find({
            relations: {
                digimons: true,
                bag: true
            }
        })
        return tamers
    }

    async create(tamer: ITamer): Promise<ITamer> {
        const newTamer = await this.tamerRepository.save(tamer);

        return newTamer
    }

}
