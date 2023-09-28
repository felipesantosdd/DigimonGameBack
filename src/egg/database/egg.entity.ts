import { DigimonEntity } from "../../digimons/database/digimon.entity";
import { TamerEntity } from "../../tamer/database/tamer.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EggEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: 0 })
    hp: number;

    @Column({ default: 'https://wikimon.net/images/thumb/5/57/Digitama_Herissmon.png/200px-Digitama_Herissmon.png' })
    sprite: string;

    @Column({ default: 'Digitama' })
    name: string

    @Column({ default: 1 })
    form: number

    @Column({ default: 0 })
    mp: number;

    @Column({ default: 0 })
    atualMp: number;

    @Column({ default: 0 })
    evolutionAttack: number

    @Column({ default: 0 })
    atualHp: number

    @Column({ default: 0 })
    defense: number;

    @Column({ default: 0 })
    speed: number;

    @Column({ default: 'https://i.pinimg.com/564x/99/e1/49/99e149cc798d211ce77b518caf8cbde7.jpg' })
    image: string

    @Column({ default: 0 })
    points: number

    @Column({ default: 0 })
    aptitude: number;

    @Column({ default: 10 })
    love: number;

    @Column({ default: 100 })
    health: number;

    @Column({ default: 0 })
    evolutionHp: number;

    @Column({ default: 0 })
    evolutionMp: number;

    @Column({ default: 0 })
    evolutionDefense: number;

    @Column({ default: 0 })
    evolutionSpeed: number;

    @Column({ default: 0 })
    evolutionAptitude: number;

    @Column({ default: false })
    inTraining: boolean

    @Column({ default: '' })
    trainingEnd: string

    @Column({ default: 0 })
    trainingPoints: number

    @Column({ default: 10 })
    nextPoints: number

    @ManyToOne(() => TamerEntity, (tamer) => tamer.digimons)
    tamer: TamerEntity;

    @ManyToMany(() => DigimonEntity)
    @JoinTable()
    evolutions: DigimonEntity[];

}