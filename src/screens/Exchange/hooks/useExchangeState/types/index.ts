import { Rates, Pockets } from '../../../../../store/types';
import { ExchangeFlow } from '../../../services/exchangeFlow';

export interface ExchangeInputs {
    originValue: string;
    originCurrency: string;
    destinationValue: string;
    destinationCurrency: string;
    flow: ExchangeFlow;
}

export interface ExchangeState extends ExchangeInputs {
    rates: Rates;
    pockets: Pockets;
    isExchangeValid: boolean;
    originExchangeValue: string;
    destinationExchangeValue: string;
}
