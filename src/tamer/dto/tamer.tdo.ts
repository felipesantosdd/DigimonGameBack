import { ApiProperty } from "@nestjs/swagger";
import { IDigiEgg } from "src/egg/egg.interface";
import { IItens } from "src/item/itens.interface";

export class TamerDto {
    @ApiProperty()
    id?: string;

    @ApiProperty()
    name: string

    @ApiProperty()
    email: string

    @ApiProperty()
    password: string

    @ApiProperty()
    digimons: IDigiEgg[]

    @ApiProperty()
    bag: IItens[]

    @ApiProperty()
    image: string

}