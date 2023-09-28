import { IDigimon } from "src/digimons/digimon.interface"
import { ITamer } from "../tamer/tamer.interface"

export interface IDigiEgg {
    id: string
    hp: number
    mp: number
    atualHp: number
    atualMp: number;
    form: number
    name: string
    defense: number
    speed: number
    aptitude: number
    sprite: string
    love: number
    health: number
    evolutions: IDigimon[]
    tamer: ITamer
    evolutionHp: number
    evolutionMp: number
    evolutionDefense: number
    evolutionSpeed: number
    evolutionAptitude: number
    evolutionAttack: number
    image: string
    points: number
}

export interface IEggMove {
    id: string;
    move: string
}
