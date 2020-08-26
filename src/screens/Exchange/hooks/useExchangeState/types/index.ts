import { Rates, Pockets } from '../../../../../store/types';

export interface ExchangeState extends ExchangeInputs {
    rates: Rates;
    pockets: Pockets;
    isExchangeValid: boolean;
    originExchangeValue: string;
    destinationExchangeValue: string;
}

export interface ExchangeInputs {
    originValue: string;
    originCurrency: string;
    destinationValue: string;
    destinationCurrency: string;
}
