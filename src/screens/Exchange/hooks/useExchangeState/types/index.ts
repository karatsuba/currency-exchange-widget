import { Rates, Pockets } from '../../../../../store/types';

export interface ExchangeInputs {
    originValue: string;
    originCurrency: string;
    destinationValue: string;
    destinationCurrency: string;
}

export interface ExchangeState extends ExchangeInputs {
    rates: Rates;
    pockets: Pockets;
    isExchangeValid: boolean;
    originExchangeValue: string;
    destinationExchangeValue: string;
}
