import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { ItemService } from './item.service';
import { IItems } from './items.interface';
import { ApiBody } from '@nestjs/swagger';
import { ItemDto } from './dto/item.dto';
import { EggDto } from '../egg/tdo/egg.dto';
import { EggService } from '../egg/egg.service';

@Controller('item')
export class ItemController {

    constructor(
        private readonly itemService: ItemService,
        private readonly eggService: EggService
    ) { }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<IItems> {

        return await this.itemService.findOne(id)
    }

    @Get()
    async getAll(): Promise<IItems[]> {
        return await this.itemService.findAll()
    }

    @Post()
    @ApiBody({ type: ItemDto })
    async create(@Body() item: ItemDto): Promise<ItemDto> {
        return await this.itemService.create(item)
    }

    @Patch('use/:id')
    @ApiBody({ type: EggDto })
    async useItem(@Param('id') id: string, @Body() digiId: { id: string }): Promise<void> {
        const item = await this.itemService.findOne(id)
        switch (item.name) {
            case 'Curativo':
                await this.eggService.useCurativo(digiId.id)
                break
        }
        return
    }
}
