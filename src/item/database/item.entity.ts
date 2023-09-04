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

    @Column({ default: 'https://www.grindosaur.com/img/games/digimon-world-next-order/icons/special-item-icon.png' })
    sprite: string
}
