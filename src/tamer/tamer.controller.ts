import { Body, Controller, Get, Post, Param, NotFoundException, Req } from '@nestjs/common';
import { TamerService } from './tamer.service';
import { ITamer } from 'src/tamer/tamer.interface';
import { ApiBody } from '@nestjs/swagger';
import { TamerDto } from './dto/tamer.tdo';
import { Request } from 'express';

@Controller('tamer')
export class TamerController {

    constructor(private readonly tamerService: TamerService) { }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<ITamer> {
        const tamer = await this.tamerService.findOne(id);

        if (!tamer) {
            throw new NotFoundException(`O Digimon ${id} não existe`);
        }

        return tamer;
    }

    @Get()
    async getAll(): Promise<ITamer[]> {
        const tamers = await this.tamerService.findAll()
        return tamers
    }

    @Post()
    @ApiBody({ type: TamerDto })
    async create(@Body() tamer: TamerDto): Promise<TamerDto> {
        return this.tamerService.create(tamer)
    }

    @Post('login')
    async login(@Body() data: { nick: string, password: string }) {
        return this.tamerService.login(data.nick, data.password);
    }

    @Post('auth')
    async autoLogin(@Req() req: Request) {
        const authToken = req.headers.authorization;
        return this.tamerService.authTamer(authToken)
    }

}
