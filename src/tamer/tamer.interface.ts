import { IDigiEgg } from "../egg/egg.interface"
import { IItems } from "../item/items.interface";

export interface ITamer {
    id?: string;
    name: string
    password?: string
    digimons: IDigiEgg[]
    bag: IItems[]
    image: string
    email: string
    maxEnergy: number
    atualEnergy: number
    xp: number
    nickname: string
}
