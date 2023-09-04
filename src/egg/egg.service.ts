import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EggEntity } from './database/egg.entity';
import { Repository } from 'typeorm';
import { IDigiEgg } from './egg.interface';
import { DigimonEntity } from '../digimons/database/digimon.entity';
import { CronJob } from 'cron';
import { TamerEntity } from '../tamer/database/tamer.entity';

@Injectable()
export class EggService {
    private healthManagementJob: CronJob;
    private evoCostJob: CronJob;
    private restManagementJob: CronJob;

    constructor(
        @InjectRepository(EggEntity) private eggRepository: Repository<EggEntity>,
        @InjectRepository(DigimonEntity) private digimonRepository: Repository<DigimonEntity>,
        @InjectRepository(TamerEntity) private tamerRepository: Repository<TamerEntity>,
    ) {
        this.healthManagementJob = new CronJob('* * * * *', this.heathManagement.bind(this));
        this.healthManagementJob.start();

        this.evoCostJob = new CronJob('* * * * *', this.evoCost.bind(this));
        this.evoCostJob.start();

        this.restManagementJob = new CronJob('* * * * *', this.restManagement.bind(this));
        this.restManagementJob.start();
    }



    async findOne(id: string): Promise<IDigiEgg> {
        const egg = await this.eggRepository.findOne({
            where: { id },
            relations: {
                tamer: true,
                evolutions: true
            },
            order: { form: 'desc' }
        })
        return egg
    }

    async findAll(): Promise<IDigiEgg[]> {
        const eggs = await this.eggRepository.find()
        return eggs
    }

    async create(data: { id: string }): Promise<IDigiEgg> {

        const egg: IDigiEgg = await this.eggRepository.create()
        const tamer = await this.tamerRepository.findOne({ where: { id: data.id } })
        egg.tamer = tamer
        await this.eggRepository.save(egg)

        return egg
    }

    async update(id: string, data: IDigiEgg): Promise<IDigiEgg> {
        const egg = await this.eggRepository.findOne(
            {
                where: { id },
                relations: { evolutions: true },
                order: { form: 'ASC' }
            })

        if (data.evolutions && data.evolutions.length > 0) {
            const evolutionsToAdd = data.evolutions.filter((newEvo) => {
                return !egg.evolutions.some((existingEvo) => existingEvo.id === newEvo.id);
            });

            const newEvolution = await this.digimonRepository.findOne({ where: { id: evolutionsToAdd[0]?.id } })

            egg.evolutions = [...egg.evolutions, newEvolution];
        }

        const name = egg.evolutions.filter(evo => evo.level === egg.form)[0]?.name

        egg.hp = data.hp || egg.hp
        egg.mp = data.mp || egg.mp
        egg.defense = data.defense || egg.defense
        egg.speed = data.speed || egg.speed
        egg.love = data.love || egg.love
        egg.aptitude = data.aptitude || egg.aptitude
        egg.health = data.health || egg.health
        egg.name = name || egg.name

        return await this.eggRepository.save(egg)

    }


    async evolution(eggId: string, data: { evoId: string }): Promise<any> {
        const egg = await this.eggRepository.findOne(
            {
                where:
                    { id: eggId },
                relations: { evolutions: true }
            })

        const evolution = egg.evolutions.filter(evo => evo.id == data.evoId)
        const evolutions = egg.evolutions.filter(evo => evo.level <= evolution[0].level)


        egg.evolutionHp = evolutions.reduce((acc, ev) => acc + ev.hp, egg.hp)
        egg.evolutionMp = evolutions.reduce((acc, ev) => acc + ev.mp, egg.mp)
        egg.evolutionDefense = evolutions.reduce((acc, ev) => acc + ev.defense, egg.defense)
        egg.evolutionSpeed = evolutions.reduce((acc, ev) => acc + ev.speed, egg.speed)
        egg.evolutionAptitude = evolutions.reduce((acc, ev) => acc + ev.aptitude, egg.aptitude)
        egg.form = evolution[0].level
        egg.sprite = evolution[0].sprite
        egg.name = evolution[0].name


        await this.eggRepository.save(egg)

        return egg

    }

    async devolution(eggId: string, data: { evoId: string }): Promise<any> {
        const egg = await this.eggRepository.findOne(
            {
                where:
                    { id: eggId },
                relations: { evolutions: true }
            })

        const evolution = egg.evolutions.filter(evo => evo.id == data.evoId)
        const evolutions = egg.evolutions.filter(evo => evo.level <= evolution[0].level)


        egg.evolutionHp = evolutions.reduce((acc, ev) => acc + ev.hp, egg.hp)
        egg.evolutionDefense = evolutions.reduce((acc, ev) => acc + ev.defense, egg.defense)
        egg.evolutionSpeed = evolutions.reduce((acc, ev) => acc + ev.speed, egg.speed)
        egg.evolutionAptitude = evolutions.reduce((acc, ev) => acc + ev.aptitude, egg.aptitude)
        egg.form = evolution[0].level
        egg.sprite = evolution[0].sprite
        egg.name = evolution[0].name


        await this.eggRepository.save(egg)

        return egg

    }

    async heathManagement() {
        const eggs = await this.eggRepository.find()
        eggs.map(egg => {
            if (egg.health >= 2) {
                egg.health -= 1
                console.log(`${egg.name} está com ${egg.health} de saude`)
                this.eggRepository.save(egg)
            }
        })
    }

    async evoCost() {
        const eggs = await this.eggRepository.find({
            relations: {
                evolutions: true
            }
        })

        eggs.map(egg => {
            if (egg.form >= 3) {
                const evolution = egg.evolutions.filter(evolution => evolution.level == egg.form)
                egg.atualMp -= evolution[0].cost
                this.eggRepository.save(egg)

                console.log(`${egg.name} está com ${egg.atualMp} de mp`)

                if (egg.atualMp <= 0) {
                    const firstEvo = egg.evolutions.filter(evo => evo.level === 1)[0].id
                    const id = { evoId: firstEvo }

                    this.devolution(egg.id, id)
                    console.log(`${egg.name} Voltou a forma base`)
                }
            }
        })
    }

    async restManagement() {
        const eggs = await this.eggRepository.find()

        eggs.map((egg) => {
            if (egg.form <= 2 && egg.atualHp <= egg.evolutionHp) {
                egg.atualHp += Math.round(egg.evolutionHp * 0.1)
                this.eggRepository.save(egg)
            }

            if (egg.form <= 2 && egg.atualMp <= egg.evolutionMp) {
                egg.atualMp += Math.round(egg.evolutionMp * 0.1)
                this.eggRepository.save(egg)
            }

            console.log(`${egg.name} agora esta com ${egg.atualHp}Hp, ${egg.atualMp}Mp`)
        })
    }

}



// sua missão agora é fazer as alterações nescessarias para que os dados base do digimon sejam setados corretamente, depois disso, implemente a alimentação