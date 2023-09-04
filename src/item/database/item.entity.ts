import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class ItemEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    effect: string;
}
