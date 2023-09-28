import { Body, Controller, Get, Post } from '@nestjs/common';
import { IMissions } from './missions.interface';
import { MissionsService } from './missions.service';
import { ApiBody } from '@nestjs/swagger';
import { MissionsDTo } from './dto/missions.dto';

@Controller('missions')
export class MissionsController {

    constructor(private readonly missionsService: MissionsService) { }


    @Post()
    @ApiBody({ type: MissionsDTo })
    async create(@Body() mission: MissionsDTo): Promise<MissionsDTo> {
        return await this.missionsService.create(mission)
    }

    @Get()
    async findAll(): Promise<IMissions[]> {
        const missions = await this.missionsService.findAll()
        return missions
    }
}
