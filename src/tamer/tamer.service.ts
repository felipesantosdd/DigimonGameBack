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
import { sign, verify } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { ItemEntity } from '../item/database/item.entity';
import { IItems } from '../item/items.interface';



@Injectable()
export class TamerService {

    private energyRechargeJob: CronJob;
    private evoCostJob: CronJob


    constructor(
        @InjectRepository(TamerEntity) private tamerRepository: Repository<TamerEntity>,
        @InjectRepository(EggEntity) private eggRepository: Repository<EggEntity>,
        @InjectRepository(DigimonEntity) private digimonsRepository: Repository<DigimonEntity>,
        @InjectRepository(ItemEntity) private itemRepository: Repository<ItemEntity>,

    ) {
        this.energyRechargeJob = new CronJob('* * * * *', this.energyRecharge.bind(this))
        this.energyRechargeJob.start()

        this.evoCostJob = new CronJob('* * * * *', this.evoCost.bind(this))
        this.evoCostJob.start()

    }

    async findOne(id: string): Promise<ITamer> {
        const tamer = await this.tamerRepository.findOne(
            {
                where: { id: id },
                relations: {
                    digimons: true,
                    bag: true,
                }
            }
        );
        return tamer
    }

    async evoCost(): Promise<void> {
        const tamers = await this.tamerRepository.find({ relations: { digimons: true } })

        tamers.map(async (tamer) => {
            if (tamer.digimons[0]?.form > 2) {
                const evolution = await this.digimonsRepository.findOne({ where: { name: tamer.digimons[0].name } })
                tamer.atualEnergy = Number(tamer.atualEnergy - evolution.cost)
                this.tamerRepository.save(tamer)
                console.log(`o Tamer: ${tamer.name} esta com ${tamer.atualEnergy} de energia`)
            } else if (tamer.atualEnergy < 0) {
                tamer.atualEnergy = 0
                this.tamerRepository.save(tamer)
            }

        })
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

        const nickExist = await this.tamerRepository.findOne({ where: { nickname: tamer.nickname } });
        if (nickExist) {
            throw new AppError('Esse Nickname ja esta sendo usado', 409);
        }

        const salt = genSaltSync(10);
        tamer.password = hashSync(tamer.password, salt);

        await this.tamerRepository.save(tamer)

        const egg = this.eggRepository.create()
        egg.tamer = tamer

        const evolutions = await this.digimonsRepository.find({ where: { level: 0 } })
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

    async update(id: string, data: ITamer): Promise<ITamer> {

        const tamer = await this.tamerRepository.findOne({
            where: { id: id },
            relations: { bag: true }
        })

        if (!tamer) {
            throw new AppError("Tamer não encontrado", 404)
        }

        const newBag = []

        if (data.bag && data.bag.length > 0) {
            await Promise.all(data.bag.map(async (item) => {
                const newItem = await this.itemRepository.findOne({ where: { id: item.id } });
                console.log(newItem);
                if (newItem) {
                    newBag.push(newItem);
                }
            }));
        }

        tamer.bag = [...tamer.bag, ...newBag]

        tamer.image = data.image || tamer.image
        tamer.nickname = data.nickname || tamer.nickname

        this.tamerRepository.save(tamer)

        return tamer

    }

    async useItem(tamerId: string, itemId: string, digimonId: string): Promise<ITamer> {
        const tamer = await this.tamerRepository.findOne({
            where: { id: tamerId },
            relations: { bag: true, digimons: true }
        })
        if (!tamer) {
            throw new AppError('Tamer não encontrado', 404)
        }

        const item: IItems | undefined = tamer.bag.find(item => item.id === itemId);
        if (!item) {
            throw new AppError('Esse tamer não possui esse item', 404)
        }

        const egg = await this.eggRepository.findOne({ where: { id: digimonId } })
        if (!egg) {
            throw new AppError("Digimon não encontrado.", 404)
        }

        switch (item.type) {
            case 'HP':
                if (egg.atualHp < egg.evolutionHp) {
                    egg.atualHp += item.effect

                    console.log("Saúde recuperada");
                    tamer.bag = tamer.bag.filter(bagItem => bagItem.id !== itemId);
                } else {
                    console.log("Saúde já está cheia")
                }
                break
            case 'MP':
                if (egg.atualMp < egg.evolutionMp) {
                    egg.atualMp += item.effect

                    console.log("MP recuperado");
                    tamer.bag = tamer.bag.filter(bagItem => bagItem.id !== itemId);
                } else {
                    console.log("MP já está cheio")
                }
                break
            case 'Food':
                if (egg.health < 100) {
                    console.log(item.effect)
                    egg.health = egg.health + item.effect
                    console.log(egg.health)


                    console.log("Fome saciada");
                    tamer.bag = tamer.bag.filter(bagItem => bagItem.id !== itemId);
                } else {
                    console.log("Seu digimon já está cheio")
                }
                break
        }

        await this.eggRepository.save(egg);

        return tamer
    }


    async authTamer(authToken: string): Promise<ITamer | any> {

        if (!authToken) {
            throw new AppError('Usuario sem autenticação', 401)
        }

        const token: string = authToken.split(' ')[1];

        return new Promise((resolve, reject) => {
            verify(token, String(process.env.SECRET_KEY), async (error: any, decoded: any) => {
                if (error) {
                    reject(new AppError(error.message, 401));
                } else {
                    const foundUser = await this.tamerRepository.findOne({ where: { email: decoded.email }, relations: { digimons: true, bag: true } });
                    resolve(foundUser);
                }
            });
        });
    }

    async energyRecharge(): Promise<void> {
        const tamers = await this.tamerRepository.find()

        tamers.map((tamer) => {
            if (tamer.atualEnergy < tamer.maxEnergy) {
                tamer.atualEnergy += Number((tamer.maxEnergy * 0.01).toFixed())
                this.tamerRepository.save(tamer)
                console.log(`O Tamer ${tamer.name} Recuperou ${Number((tamer.maxEnergy * 0.01).toFixed())} de energia`)
            } else if (tamer.atualEnergy >= tamer.maxEnergy) {
                tamer.atualEnergy = tamer.maxEnergy
                this.tamerRepository.save(tamer)
            }
        })
    }



}
