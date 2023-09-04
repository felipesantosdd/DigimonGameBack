import { ApiProperty } from "@nestjs/swagger";

export class ItemDto {
    @ApiProperty()
    id?: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    effect: string;

    @ApiProperty()
    sprite: string
}