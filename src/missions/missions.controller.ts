import { Body, Controller, Get, Post } from '@nestjs/common';
import { IMissions } from './missions.interface';
import { MissionsService } from './missions.service';
import { ApiBody } from '@nestjs/swagger';
import { MissionsDto } from './dto/missions.dto';

@Controller('missions')
export class MissionsController {

    constructor(private readonly missionsService: MissionsService) { }


    @Post()
    @ApiBody({ type: MissionsDto })
    async create(@Body() mission: MissionsDto): Promise<MissionsDto> {
        return await this.missionsService.create(mission)
    }

    @Get()
    async findAll(): Promise<IMissions[]> {
        const missions = await this.missionsService.findAll()
        return missions
    }
}
