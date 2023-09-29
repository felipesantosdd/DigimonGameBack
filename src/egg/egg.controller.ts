import { Controller, Get, Param, NotFoundException, Post, Body, Patch, Delete } from '@nestjs/common';
import { EggService } from './egg.service';
import { IDigiEgg } from './egg.interface';
import { ApiBody } from '@nestjs/swagger';
import { EggDto } from './tdo/egg.dto';

@Controller('egg')
export class EggController {

    constructor(private readonly eggService: EggService) { }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<IDigiEgg> {
        const egg = await this.eggService.findOne(id);

        if (!egg) {
            throw new NotFoundException(`O DigiEgg ${id} não existe`)
        }

        return egg
    }

    @Get()
    async getAll(): Promise<IDigiEgg[]> {
        const eggs = await this.eggService.findAll()
        return eggs
    }

    @Delete(':id')
    async deleteById(@Param('id') eggId: string): Promise<void> {
        return await this.eggService.delete(eggId)
    }

    @Post()
    @ApiBody({ type: EggDto })
    async create(@Body() data: { id: string }): Promise<IDigiEgg> {
        return this.eggService.create(data)
    }

    @Patch(':id')
    @ApiBody({ type: EggDto })
    async update(@Param('id') id: string, @Body() data: IDigiEgg): Promise<IDigiEgg> {
        return this.eggService.update(id, data)
    }

    @Patch('evolution/:id')
    @ApiBody({ type: EggDto })
    async evolution(@Param('id') id: string, @Body() data: { evoId: string }): Promise<IDigiEgg> {
        return this.eggService.evolution(id, data)
    }

    @Post('training/:eggId/:intensity')
    @ApiBody({ type: EggDto })
    async trainingStart(@Param('eggId') eggId: string, @Param('intensity') intensity: number): Promise<IDigiEgg> {
        return this.eggService.trainingStart(eggId, intensity)
    }

    @Post('mission/:eggId')
    @ApiBody({ type: String }) // Usei String como tipo para missionId
    async startMission(@Param('eggId') eggId: string, @Body() data: { missionId: string }): Promise<IDigiEgg> {
        return this.eggService.startMission(eggId, data.missionId);
    }



}
