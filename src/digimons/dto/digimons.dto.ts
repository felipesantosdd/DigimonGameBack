import { ApiProperty } from "@nestjs/swagger"
import { ITechnique } from "src/interfaces/digimon.interface"

export class DigimonDto {
    @ApiProperty()
    id: string
    @ApiProperty()
    name: string
    @ApiProperty()
    level: string
    @ApiProperty()
    species: string
    @ApiProperty()
    type: string
    @ApiProperty()
    core: string
    @ApiProperty()
    attribute: string
    @ApiProperty()
    hp: number
    @ApiProperty()
    mp: number
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