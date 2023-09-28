import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class DigimonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({ default: 0 })
    level: number

    @Column()
    species: string

    @Column()
    type: string

    @Column()
    attribute: string

    @Column()
    element: string

    @Column()
    hp: number

    @Column()
    mp: number

    @Column()
    attack: number

    @Column()
    defense: number

    @Column()
    speed: number

    @Column()
    aptitude: number

    @Column()
    cost: number

    @Column()
    sprite: string

    @Column()
    description: string

    @Column({ default: 'https://i.pinimg.com/564x/99/e1/49/99e149cc798d211ce77b518caf8cbde7.jpg' })
    image: string


    // @Column()
    // techniques: ITechnique[]
}