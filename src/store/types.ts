export interface Pocket {
    id: string;
    symbol: string;
    currency: string;
    balance: number;
}

export interface Pockets {
    [key: string]: Pocket;
}

export interface Rates {
    [currency: string]: number;
}

export interface ExchangeRates {
    rates: Rates;
    base: string;
    error: Error | null;
    loading: boolean;
}

export interface State {
    pockets: Pockets;
    exchangeRates: ExchangeRates;
}
