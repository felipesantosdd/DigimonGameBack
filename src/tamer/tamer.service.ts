import { ITamer } from './tamer.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TamerEntity } from './database/tamer.entity';
import { Repository } from 'typeorm';
import { hashSync, genSaltSync } from 'bcryptjs'
import { AppError } from '../errors/index';
import { EggEntity } from '../egg/database/egg.entity';
import { DigimonEntity } from '../digimons/database/digimon.entity';
import { CronJob } from 'cron';
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";


@Injectable()
export class TamerService {

    private energyRechargeJob: CronJob

    constructor(
        @InjectRepository(TamerEntity) private tamerRepository: Repository<TamerEntity>,
        @InjectRepository(EggEntity) private eggRepository: Repository<EggEntity>,
        @InjectRepository(DigimonEntity) private digimonsRepository: Repository<DigimonEntity>
    ) {
        this.energyRechargeJob = new CronJob('* * * * *', this.energyRecharge.bind(this))
    }

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
        const tamers = await this.tamerRepository.find()

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

        const nickExist = await this.tamerRepository.findOne({ where: { nickname: tamer.nickname } });
        if (nickExist) {
            throw new AppError('Esse Nickname ja esta sendo usado', 409);
        }

        const salt = genSaltSync(10);
        tamer.password = hashSync(tamer.password, salt);

        await this.tamerRepository.save(tamer)

        const egg = this.eggRepository.create()
        egg.tamer = tamer

        const evolutions = await this.digimonsRepository.find({ where: { level: 1 } })
        const randomIndex = Math.floor(Math.random() * evolutions.length);
        const randomEvolution = evolutions[randomIndex];


        egg.hp = randomEvolution.hp
        egg.sprite = randomEvolution.sprite
        egg.name = randomEvolution.name
        egg.form = randomEvolution.level
        egg.mp = randomEvolution.mp
        egg.atualHp = randomEvolution.hp
        egg.defense = randomEvolution.defense
        egg.speed = randomEvolution.speed
        egg.aptitude = randomEvolution.aptitude
        egg.evolutionHp = randomEvolution.hp
        egg.evolutionMp = randomEvolution.mp
        egg.evolutionDefense = randomEvolution.defense
        egg.evolutionSpeed = randomEvolution.speed
        egg.evolutionAptitude = randomEvolution.aptitude
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

    async login(nick: string, pass: string): Promise<object> {

        console.log(nick, pass)

        const tamer = await this.tamerRepository.findOne({
            where: { nickname: nick },
            relations: {
                bag: true,
                digimons: true
            }
        })

        if (!tamer) {
            throw new AppError('Usuario ou Password invalido ', 401)
        }

        const passMatch = await compare(pass, tamer.password)

        if (!passMatch) {
            throw new AppError('Usuario ou Password incorrecto', 401)
        }

        const token = sign(
            { email: tamer.email }, String(process.env.SECRET_KEY),
            { expiresIn: '30days', subject: String(tamer.id) }
        )

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...response } = tamer

        return ({ token: token, user: response })
    }

    async energyRecharge(): Promise<void> {
        const tamers = await this.tamerRepository.find()

        tamers.map((tamer) => {
            if (tamer.atualEnergy < tamer.maxEnergy) {
                tamer.atualEnergy += (tamer.maxEnergy * 0.1)
                this.tamerRepository.save(tamer)
            } else if (tamer.atualEnergy >= tamer.maxEnergy) {
                tamer.atualEnergy = tamer.maxEnergy
                this.tamerRepository.save(tamer)
                console.log(`${tamer.name} Restaurou toda a sua energia.`)
            }
        })
    }


}
