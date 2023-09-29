import { ApiProperty } from "@nestjs/swagger";
import { IDigimon } from "src/digimons/digimon.interface";
import { IMissions } from "src/missions/missions.interface";
export class EggDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    hp: number

    @ApiProperty()
    mp: number

    @ApiProperty()
    name: string

    @ApiProperty()
    sprite: string;

    @ApiProperty()
    atualHp: number

    @ApiProperty()
    atualMp: number;

    @ApiProperty()
    form: number

    @ApiProperty()
    defense: number

    @ApiProperty()
    speed: number

    @ApiProperty()
    aptitude: number

    @ApiProperty()
    love: number

    @ApiProperty()
    image: string

    @ApiProperty()
    health: number

    @ApiProperty()
    evolutions: IDigimon[]

    @ApiProperty()
    evolutionHp: number

    @ApiProperty()
    evolutionMp: number

    @ApiProperty()
    evolutionAttack: number

    @ApiProperty()
    evolutionDefense: number

    @ApiProperty()
    evolutionSpeed: number

    @ApiProperty()
    evolutionAptitude: number

    @ApiProperty()
    trainingIntensity: number

    @ApiProperty()
    inTraining: boolean

    @ApiProperty()
    trainingEnd: string

    @ApiProperty()
    trainingPoints: number

    @ApiProperty()
    nextPoints: number

    @ApiProperty()
    missions: IMissions[]

    @ApiProperty()
    inMission: boolean

    @ApiProperty()
    missionReturn: string

    @ApiProperty()
    points: number

}
