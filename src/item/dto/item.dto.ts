import { ApiProperty } from "@nestjs/swagger";

export class ItemDto {
    @ApiProperty()
    id?: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    type: string;

    @ApiProperty()
    effect: number

    @ApiProperty()
    sprite: string
}