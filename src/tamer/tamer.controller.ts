import { Body, Controller, Get, Post, Param, NotFoundException, Req, Patch } from '@nestjs/common';
import { TamerService } from './tamer.service';
import { ITamer } from 'src/tamer/tamer.interface';
import { ApiBody } from '@nestjs/swagger';
import { TamerDto } from './dto/tamer.tdo';
import { Request } from 'express';
import { AppError } from '../errors';

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

    @Patch('update/:id')
    @ApiBody({ type: TamerDto })
    async update(@Param('id') id: string, @Body() data: TamerDto): Promise<ITamer> {
        if (!id) {
            throw new AppError("Forneça o id do usuario", 401)
        }

        const tamer = await this.tamerService.update(id, data)
        return tamer
    }

    @Patch('/useItem/:id')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                itemId: { type: 'string' },
                eggId: { type: 'string' },
            },
        },
    })
    async useItem(@Param('id') tamerId: string, @Body() data: { itemId: string, eggId: string }): Promise<ITamer> {
        if (!tamerId) {
            throw new AppError("ID do Tamer não fornecido.", 400);
        }
        if (!data.eggId) {
            throw new AppError("ID do Digimon não fornecido.", 400);
        }
        if (!data.itemId) {
            throw new AppError("ID do item não fornecido.", 400);
        }

        const tamer = await this.tamerService.useItem(tamerId, data.itemId, data.eggId);
        return tamer;
    }



}
