import { DigimonsService } from './digimons.service';
import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { IDigimon } from 'src/interfaces/digimon.interface';
import { DigimonDto } from './dto/digimons.dto';

@Controller('digimons')
export class DigimonsController {

    constructor(private readonly digimonsService: DigimonsService) { }

    @Get()
    index(): IDigimon[] {
        return this.digimonsService.findAll()
    }

    @Post()
    @ApiBody({ type: DigimonDto })
    create(@Body() digimon: DigimonDto): DigimonDto {
        return this.digimonsService.create(digimon);
    }
}
