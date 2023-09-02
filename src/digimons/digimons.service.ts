import { Injectable } from '@nestjs/common';
import { IDigimon } from 'src/interfaces/digimon.interface';

@Injectable()
export class DigimonsService {
    private digimons: IDigimon[] = [];

    findAll(): IDigimon[] {
        return this.digimons
    }

    create(digimon: IDigimon): IDigimon {
        this.digimons.push(digimon);
        return digimon
    }
}
