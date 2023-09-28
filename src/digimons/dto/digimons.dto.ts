import { ApiProperty } from "@nestjs/swagger"
import { ITechnique } from "src/digimons/digimon.interface"

export class DigimonDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    name: string

    @ApiProperty({ default: 0 })
    level: number

    @ApiProperty()
    element: string

    @ApiProperty()
    species: string

    @ApiProperty()
    type: string

    @ApiProperty()
    attribute: string

    @ApiProperty()
    hp: number

    @ApiProperty()
    mp: number

    @ApiProperty()
    image: string

    @ApiProperty()
    attack: number

    @ApiProperty()
    defense: number

    @ApiProperty()
    speed: number

    @ApiProperty()
    aptitude: number

    @ApiProperty()
    cost: number

    @ApiProperty()
    sprite: string

    @ApiProperty()
    description: string

    @ApiProperty()
    techniques?: ITechnique[]

}