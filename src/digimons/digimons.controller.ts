import { DigimonsService } from './digimons.service';
import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { IDigimon } from 'src/digimons/digimon.interface';
import { DigimonDto } from './dto/digimons.dto';

@Controller('digimons')
export class DigimonsController {

    constructor(private readonly digimonsService: DigimonsService) { }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<IDigimon> {
        const digimon = await this.digimonsService.findOne(id)
        return digimon
    }

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

    @Patch(':id')
    @ApiBody({ type: DigimonDto })
    async update(@Param('id') id: string, @Body() data: IDigimon): Promise<IDigimon> {
        return this.digimonsService.update(id, data)
    }
}
