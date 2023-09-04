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
    core: string
    @Column()
    attribute: string
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
    // @Column()
    // techniques: ITechnique[]
}