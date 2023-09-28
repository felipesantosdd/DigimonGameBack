import { ApiProperty } from "@nestjs/swagger";
import { IDigimon } from "../../digimons/digimon.interface";

export class MissionsDTo {
    @ApiProperty()
    id?: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    type: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    cost: number;

    @ApiProperty()
    time: number;

    @ApiProperty()
    points: number;

    @ApiProperty()
    target?: IDigimon;
}
