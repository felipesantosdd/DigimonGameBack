import { IDigiEgg } from "./digimon.interface";
import { IItens } from "./itens.interface";

export interface ITamer {
    id?: string;
    name: string
    digimons: IDigiEgg[]
    bag: IItens[]
}