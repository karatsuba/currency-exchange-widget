import { ExchangeFlow } from '../../../services/exchangeFlow';
import { Rates } from '../../../../../store/types';

export enum TYPES {
    INPUT_CHANGE = 'INPUT_CHANGE',
    SLIDE_CHANGE = 'SLIDE_CHANGE',
    RATES_CHANGE = 'RATES_CHANGE'
}

export const inputChange = (value: string, fromCurrency: string, toCurrency: string, flow: ExchangeFlow) => ({
    type: TYPES.INPUT_CHANGE as typeof TYPES.INPUT_CHANGE,
    payload: {
        value,
        fromCurrency,
        toCurrency,
        flow
    }
});

export const slideChange = (currency: string, flow: ExchangeFlow) => ({
    type: TYPES.SLIDE_CHANGE as typeof TYPES.SLIDE_CHANGE,
    payload: {
        currency,
        flow
    }
});

export const ratesChange = (rates: Rates) => ({
    type: TYPES.RATES_CHANGE as typeof TYPES.RATES_CHANGE,
    payload: {
        rates
    }
});

export type ExchangeStateActions =
    | ReturnType<typeof inputChange>
    | ReturnType<typeof slideChange>
    | ReturnType<typeof ratesChange>;
