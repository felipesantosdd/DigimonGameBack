import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemEntity } from './database/item.entity';
import { Repository } from 'typeorm';
import { IItems } from './items.interface';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(ItemEntity) private itemRepository: Repository<ItemEntity>,
    ) { }

    async findOne(id: string): Promise<IItems> {
        const item = await this.itemRepository.findOne({
            where: { id: id }
        })

        return item
    }

    async findAll(): Promise<IItems[]> {
        const items = await this.itemRepository.find()
        return items
    }

    async create(data: IItems): Promise<IItems> {
        console.log(data)
        const item = await this.itemRepository.save(data)
        return item
    }

}

