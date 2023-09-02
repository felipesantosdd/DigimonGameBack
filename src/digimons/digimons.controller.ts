import { DigimonsService } from './digimons.service';
import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { IDigimon } from 'src/interfaces/digimon.interface';
import { DigimonDto } from './dto/digimons.dto';

@Controller('digimons')
export class DigimonsController {

    constructor(private readonly digimonsService: DigimonsService) { }

    @Get()
    async index(): Promise<IDigimon[]> {
        const digimons = await this.digimonsService.findAll()
        return digimons
    }

    @Post()
    @ApiBody({ type: DigimonDto })
    async create(@Body() digimon: DigimonDto): Promise<DigimonDto> {
        return this.digimonsService.create(digimon);
    }
}
