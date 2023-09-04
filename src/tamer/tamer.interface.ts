import { IDigiEgg } from "../digimons/digimon.interface";
import { IItens } from "../item/items.interface";

export interface ITamer {
    id?: string;
    name: string
    password: string
    digimons: IDigiEgg[]
    bag: IItens[]
    image: string
    email: string
}

