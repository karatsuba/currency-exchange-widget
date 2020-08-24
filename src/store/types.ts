export interface Pocket {
    id: string;
    symbol: string;
    currency: string;
    balance: number;
}

export interface Pockets {
    [key: string]: Pocket;
}

export interface State {
    pockets: Pockets;
}
