import { MissionsEntity } from '../../missions/database/missions.entity';
import { EggEntity } from '../../egg/database/egg.entity';
import { ItemEntity } from '../../item/database/item.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class TamerEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    name: string;

    @Column()
    nickname: string;

    @Column()
    email: string;

    @Column()
    password?: string;

    @Column({ default: 50 })
    maxEnergy: number;

    @Column({ default: 50 })
    atualEnergy: number

    @Column({ default: 0 })
    xp: number;

    @Column({ default: 'https://cdn-icons-png.flaticon.com/512/147/147142.png' })
    image: string;

    @Column({ default: false })
    inMission: boolean;

    @Column({ default: '0' })
    missionReturn: string;

    @ManyToMany(() => ItemEntity)
    @JoinTable()
    bag: ItemEntity[]

    @ManyToMany(() => MissionsEntity)
    @JoinTable()
    missions: MissionsEntity[];

    @OneToMany(() => EggEntity, (egg) => egg.tamer, { cascade: true })
    digimons: EggEntity[]



}
