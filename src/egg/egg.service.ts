import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EggEntity } from './database/egg.entity';
import { Repository } from 'typeorm';
import { IDigiEgg } from './egg.interface';
import { CronJob } from 'cron';
import { DigimonEntity } from '../digimons/database/digimon.entity'
import { TamerEntity } from '../tamer/database/tamer.entity';
import { AppError } from '../errors';


@Injectable()
export class EggService {
    private healthManagementJob: CronJob;
    private evoCostJob: CronJob;
    private restManagementJob: CronJob;

    constructor(
        @InjectRepository(EggEntity) private eggRepository: Repository<EggEntity>,
        @InjectRepository(DigimonEntity) private digimonsRepository: Repository<DigimonEntity>,
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

        if (!egg) {
            throw new AppError("Digimon Não encontrado", 404)
        }
        return egg
    }

    async findAll(): Promise<IDigiEgg[]> {
        const eggs = await this.eggRepository.find()
        return eggs
    }

    async create(data: { id: string }): Promise<IDigiEgg> {

        if (!data.id) {
            throw new AppError('Não é possivel criar um novo digimon sem um Tamer', 400);
        }

        const tamer = await this.tamerRepository.findOne({
            where: { id: data.id }
        })

        if (!tamer) {
            throw new AppError("Tamer não encontrado", 404)
        }

        const egg: IDigiEgg = this.eggRepository.create()


        egg.tamer = tamer

        const evolutions = await this.digimonsRepository.find({ where: { level: 1 } })
        const randomIndex = Math.floor(Math.random() * evolutions.length);
        const randomEvolution = evolutions[randomIndex];

        egg.evolutions = [randomEvolution]

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


        if (!egg) {
            throw new AppError("Digimon Não encontrado", 404)
        }

        if (data.evolutions && data.evolutions.length > 0) {
            const evolutionsToAdd = data.evolutions.filter((newEvo) => {
                return !egg.evolutions.some((existingEvo) => existingEvo.id === newEvo.id);
            });

            const newEvolution = await this.digimonsRepository.findOne({ where: { id: evolutionsToAdd[0]?.id } })

            egg.evolutions.map((evo) => {
                if (evo.level === newEvolution.level) {

                    throw new AppError("Um digimmon não pode ter mais de uma evolução no mesmo estagio", 404)

                }
            })

            egg.evolutions = [...egg.evolutions, newEvolution];
        }

        const name = egg.evolutions.filter(evo => evo.level === egg.form)[0]?.name

        egg.hp = data.hp || egg.hp
        egg.mp = data.mp || egg.mp
        egg.defense = data.defense || egg.defense
        egg.speed = data.speed || egg.speed
        egg.love = data.love || egg.love
        egg.aptitude = data.aptitude || egg.aptitude
        egg.atualHp = data.atualHp || egg.atualHp
        egg.atualMp = data.atualMp || egg.atualMp
        egg.health = data.health || egg.health
        egg.name = name || egg.name

        return await this.eggRepository.save(egg)

    }


    async evolution(eggId: string, data: { evoId: string }): Promise<any> {
        const egg = await this.eggRepository.findOne(
            {
                where:
                    { id: eggId },
                relations: { evolutions: true, tamer: true }
            })


        const tamer = await this.tamerRepository.findOne({ where: { id: egg.tamer?.id } })


        const evolution = egg.evolutions.filter(evo => evo.id == data.evoId)
        const evolutions = egg.evolutions.filter(evo => evo?.level <= evolution[0]?.level)

        if (tamer.atualEnergy < evolution[0].cost && evolutions[0].level > 2) {
            throw new AppError('Voce não possui energia para esta evolução no momento', 400)
        }

        tamer.atualEnergy -= evolution[0].cost
        await this.tamerRepository.save(tamer)

        const Hp = Number((egg.atualHp / egg.evolutionHp).toFixed(2))
        const Mp = Number((egg.atualMp / egg.evolutionMp).toFixed(2))


        egg.evolutionHp = evolutions.reduce((acc, ev) => acc + ev.hp, egg.hp)
        egg.evolutionMp = evolutions.reduce((acc, ev) => acc + ev.mp, egg.mp)
        egg.evolutionDefense = evolutions.reduce((acc, ev) => acc + ev.defense, egg.defense)
        egg.evolutionSpeed = evolutions.reduce((acc, ev) => acc + ev.speed, egg.speed)
        egg.evolutionAptitude = evolutions.reduce((acc, ev) => acc + ev.aptitude, egg.aptitude)
        egg.form = evolution[0].level
        egg.sprite = evolution[0].sprite
        egg.name = evolution[0].name
        egg.image = evolution[0].image

        console.log("MaxHp:", egg.evolutionHp)
        egg.atualHp = Math.floor(egg.evolutionHp * Hp)
        egg.atualMp = Math.floor(egg.evolutionMp * Mp)


        await this.eggRepository.save(egg)

        return egg

    }

    // async devolution(eggId: string, data: { evoId: string }): Promise<IDigiEgg> {
    //     const egg = await this.eggRepository.findOne(
    //         {
    //             where:
    //                 { id: eggId },
    //             relations:
    //                 { evolutions: true }
    //         })

    //     const evolution = egg.evolutions.filter(evo => evo.id == data.evoId)
    //     const evolutions = egg.evolutions.filter(evo => evo.level <= evolution[0].level)



    //     egg.evolutionHp = evolutions.reduce((acc, ev) => acc + ev.hp, egg.hp)
    //     egg.evolutionDefense = evolutions.reduce((acc, ev) => acc + ev.defense, egg.defense)
    //     egg.evolutionSpeed = evolutions.reduce((acc, ev) => acc + ev.speed, egg.speed)
    //     egg.evolutionAptitude = evolutions.reduce((acc, ev) => acc + ev.aptitude, egg.aptitude)
    //     egg.form = evolution[0].level
    //     egg.sprite = evolution[0].sprite
    //     egg.name = evolution[0].name




    //     await this.eggRepository.save(egg)

    //     return egg

    // }

    async heathManagement() {
        const eggs = await this.eggRepository.find()
        eggs.map(egg => {
            if (egg.health <= 1) {
                egg.health -= 1
                this.eggRepository.save(egg)
            }

        })
    }

    async evoCost() {
        // Busca todos os eggs
        const eggs = await this.eggRepository.find({
            relations: {
                evolutions: true,
                tamer: true
            }
        });


        eggs.map(async (egg) => {
            if (egg.form > 2) {
                const evolution = egg.evolutions.filter(evolution => evolution.level === egg.form);
                const tamer = await this.tamerRepository.findOne({ where: { id: egg.tamer?.id } });
                if (!tamer) {
                    throw new AppError("tamer não encontrado", 404)
                }
                tamer.atualEnergy = tamer.atualEnergy - evolution[0].cost;
                await this.tamerRepository.save(tamer);

                if (tamer.atualEnergy <= 0) {
                    const firstEvo = egg.evolutions.find(evo => evo.level === 1);
                    tamer.atualEnergy = 0
                    this.tamerRepository.save(tamer)
                    if (firstEvo) {
                        const id = { evoId: firstEvo.id };
                        await this.evolution(egg.id, id);
                        console.log(`${egg.name} devoluiu`)
                    }
                }
            }
        })
    }

    // async balttle(digi1: IEggMove, digi2: IEggMove) {
    //     const egg1 = await this.eggRepository.findOne({ where: { id: digi1.id } })
    //     const hability1 = await 

    //     const egg2 = await this.eggRepository.findOne({ where: { id: digi2.id } })
    // }



    async restManagement() {
        const eggs = await this.eggRepository.find()

        eggs.map((egg) => {
            if (egg.atualHp <= egg.evolutionHp) {
                egg.atualHp += Math.round(egg.evolutionHp * 0.01)
                if (egg.atualHp > egg.evolutionHp) {
                    egg.atualHp = egg.evolutionHp
                }

                this.eggRepository.save(egg)
            }


            if (egg.atualMp <= egg.evolutionMp) {
                egg.atualMp += Math.round(egg.evolutionMp * 0.01)
                if (egg.atualMp > egg.evolutionMp) {
                    egg.atualMp = egg.evolutionMp
                }
                this.eggRepository.save(egg)
            }
        })
    }

    async recoverHp(id: string, value: number) {
        try {
            const egg = await this.eggRepository.findOne({ where: { id } });

            if (!egg) {
                throw new Error("Ovo não encontrado");
            }

            if (egg.atualHp < egg.evolutionHp) {
                egg.atualHp += value;
                await this.eggRepository.save(egg);
                console.log("Saúde recuperada");
            } else {
                console.log("Saúde já está cheia")
            }
        } catch (error) {
            console.error(error.message);
            return "Erro ao usar o curativo";
        }

    }


}

