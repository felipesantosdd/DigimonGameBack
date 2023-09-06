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
    email: string;

    @Column()
    password?: string;

    @Column({ default: 'https://cdn-icons-png.flaticon.com/512/147/147142.png' })
    image: string;

    @ManyToMany(() => ItemEntity)
    @JoinTable()
    bag: ItemEntity[]

    @OneToMany(() => EggEntity, (egg) => egg.tamer)
    digimons: EggEntity[]

}
