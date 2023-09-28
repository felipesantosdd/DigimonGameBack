import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TrainingEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    points: number;

    @Column()
    type: string;


}
