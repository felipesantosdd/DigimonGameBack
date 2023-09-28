import { DigimonEntity } from '../../digimons/database/digimon.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinTable } from 'typeorm';

@Entity()
export class MissionsEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    description: string;

    @Column()
    cost: number;

    @Column()
    time: number;

    @Column()
    points: number;

    @ManyToOne(() => DigimonEntity)
    @JoinTable()
    target?: DigimonEntity;

}