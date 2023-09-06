import { ITamer } from './tamer.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TamerEntity } from './database/tamer.entity';
import { Repository } from 'typeorm';
import { hashSync, genSaltSync } from 'bcryptjs'
import { AppError } from '../errors/index';
import { EggEntity } from '../egg/database/egg.entity';
import { DigimonEntity } from '../digimons/database/digimon.entity';


@Injectable()
export class TamerService {
    constructor(
        @InjectRepository(TamerEntity) private tamerRepository: Repository<TamerEntity>,
        @InjectRepository(EggEntity) private eggRepository: Repository<EggEntity>,
        @InjectRepository(DigimonEntity) private digimonsRepository: Repository<DigimonEntity>
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

        const emailExist = await this.tamerRepository.findOne({ where: { email: tamer.email } });
        if (emailExist) {
            throw new AppError('Esse Email ja esta sendo usado', 409);
        }

        const tamerExist = await this.tamerRepository.findOne({ where: { name: tamer.name } });
        if (tamerExist) {
            throw new AppError('Esse Nome ja esta sendo usado', 409);
        }

        const salt = genSaltSync(10);
        tamer.password = hashSync(tamer.password, salt);

        await this.tamerRepository.save(tamer)

        const egg = this.eggRepository.create()
        egg.tamer = tamer

        const evolutions = await this.digimonsRepository.find({ where: { level: 1 } })
        const randomIndex = Math.floor(Math.random() * evolutions.length);
        const randomEvolution = evolutions[randomIndex];

        console.log(randomEvolution)

        egg.evolutions = [randomEvolution]

        await this.eggRepository.save(egg)




        const response = await this.tamerRepository.findOne({
            where: { id: tamer.id },
            relations: {
                digimons: true,
                bag: true,
            }
        })

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...res } = response
        res.digimons = [await this.eggRepository.findOne({
            where: { id: egg.id },
            relations: { evolutions: true }
        })]


        return res
    }

    async login(email: string, password: string): Promise<any> {
        const tamer = await this.tamerRepository.findOne({ where: { email: email } })

        console.log(tamer, password)

        return
    }


}
