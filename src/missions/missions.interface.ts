import { IDigimon } from "../digimons/digimon.interface";

export interface IMissions {
    id?: string;
    name: string;
    type: string;
    description: string;
    cost: number;
    time: number;
    points: number;
    target?: IDigimon;
}