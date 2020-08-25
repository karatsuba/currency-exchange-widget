import { Rates } from '../types';

export enum TYPES {
    FETCH_RATES__REQUEST = 'FETCH_RATES__REQUEST',
    FETCH_RATES__SUCCESS = 'FETCH_RATES__SUCCESS',
    FETCH_RATES__FAILURE = 'FETCH_RATES__FAILURE'
}

export const fetchRatesRequest = () => ({
    type: TYPES.FETCH_RATES__REQUEST as typeof TYPES.FETCH_RATES__REQUEST
});

export const fetchRatesSuccess = (rates: Rates, base: string) => ({
    type: TYPES.FETCH_RATES__SUCCESS as typeof TYPES.FETCH_RATES__SUCCESS,
    payload: {
        rates,
        base
    }
});

export const fetchRatesFailure = (error: Error) => ({
    type: TYPES.FETCH_RATES__FAILURE as typeof TYPES.FETCH_RATES__FAILURE,
    payload: {
        error
    }
});

export type RatesActions =
    | ReturnType<typeof fetchRatesRequest>
    | ReturnType<typeof fetchRatesSuccess>
    | ReturnType<typeof fetchRatesFailure>;
