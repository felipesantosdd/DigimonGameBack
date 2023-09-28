import { ApiProperty } from "@nestjs/swagger";

export class TrainingDto {
    @ApiProperty()
    id?: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    type: string

    @ApiProperty()
    points: number;

}