import { RatesActions, TYPES } from './actions';
import { ExchangeRates } from '../types';
import { initialState } from './initialState';

export const exchangeRatesReducer = (state: ExchangeRates = initialState, action: RatesActions): ExchangeRates => {
    switch (action.type) {
        case TYPES.FETCH_RATES__REQUEST: {
            return {
                ...state,
                loading: true
            };
        }

        case TYPES.FETCH_RATES__SUCCESS: {
            return {
                ...state,
                rates: { ...action.payload.rates },
                base: action.payload.base,
                loading: false
            };
        }

        case TYPES.FETCH_RATES__FAILURE: {
            return {
                ...state,
                error: action.payload.error
            };
        }

        default:
            return state;
    }
};
