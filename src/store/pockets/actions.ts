import { Rates } from '../../store/types';

export enum TYPES {
    EXCHANGE_CURRENCY = 'EXCHANGE_CURRENCY'
}

export const exchangeCurrency = (
    originCurrency: string,
    originValue: string,
    destinationCurrency: string,
    destinationValue: string
) => ({
    type: TYPES.EXCHANGE_CURRENCY as typeof TYPES.EXCHANGE_CURRENCY,
    payload: {
        originCurrency,
        originValue,
        destinationCurrency,
        destinationValue
    }
});

export type PocketsActions = ReturnType<typeof exchangeCurrency>;
