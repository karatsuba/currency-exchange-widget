import { Rates } from '../../../../../store/types';

export interface ExchangeState {
    originValue: string;
    originCurrency: string;
    destinationValue: string;
    destinationCurrency: string;
    rates: Rates;
}
