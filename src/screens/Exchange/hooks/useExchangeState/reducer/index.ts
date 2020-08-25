import { ExchangeState } from '../types';
import { ExchangeStateActions, TYPES } from '../actions';
import { ExchangeFlow } from '../../../services/exchangeFlow';
// import { convertValue } from './helpers/convertValue';
import { convertWithFlow } from './helpers/convertWithFlow';
import { updateCurrencyWithFlow } from './helpers/updateCurrencyWithFlow';

export const exchangeReducer = (state: ExchangeState, action: ExchangeStateActions): ExchangeState => {
    console.log(action);

    switch (action.type) {
        case TYPES.INPUT_CHANGE: {
            const { value, fromCurrency, toCurrency, flow } = action.payload;
            return {
                ...state,
                ...convertWithFlow(flow, value, fromCurrency, toCurrency, state.rates)
            };
        }

        case TYPES.SLIDE_CHANGE: {
            const { currency, flow } = action.payload;
            return {
                ...state,
                ...updateCurrencyWithFlow(flow, currency, state)
            };
        }

        case TYPES.RATES_CHANGE: {
            const { rates } = action.payload;
            const { originValue, originCurrency, destinationCurrency } = state;
            return {
                ...state,
                ...convertWithFlow(ExchangeFlow.FORWARD, originValue, originCurrency, destinationCurrency, rates),
                rates
            };
        }

        default:
            return state;
    }
};
