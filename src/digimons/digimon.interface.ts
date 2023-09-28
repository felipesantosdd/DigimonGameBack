
export interface IDigimon {
    id: string
    name: string
    level: number
    species: string
    type: string
    attribute: string
    hp: number
    mp: number
    element: string
    attack: number
    defense: number
    speed: number
    aptitude: number
    cost: number
    sprite: string
    description: string
    techniques?: ITechnique[]
    image: string
}

export interface ITechnique {
    id: string
    name: string
    mpCost: number
    apCost: number
    status: IStatus
    type: string
}

export interface IStatus {
    id: string
    name: string
    effect: string
}


