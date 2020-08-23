export interface Pocket {
    id: string;
    currency: string;
    value: number;
}

export interface Pockets {
    [key: string]: Pocket;
}

export interface State {
    pockets: Pockets;
}
