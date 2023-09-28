import { ApiProperty } from "@nestjs/swagger";
import { IDigiEgg } from "src/egg/egg.interface";
import { IItems } from "src/item/items.interface";
import { IMissions } from "src/missions/missions.interface";


export class TamerDto {
    @ApiProperty()
    id?: string;

    @ApiProperty()
    name: string

    @ApiProperty()
    nickname: string

    @ApiProperty()
    email: string

    @ApiProperty()
    password?: string

    @ApiProperty()
    digimons: IDigiEgg[]

    @ApiProperty()
    bag: IItems[]

    @ApiProperty()
    image: string

    @ApiProperty()
    maxEnergy: number

    @ApiProperty()
    atualEnergy: number

    @ApiProperty()
    xp: number

    @ApiProperty()
    missions: IMissions[]

    @ApiProperty()
    inMission: boolean

    @ApiProperty()
    missionReturn: string
}