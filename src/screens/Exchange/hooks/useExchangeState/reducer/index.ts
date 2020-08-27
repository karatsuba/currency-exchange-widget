import { ExchangeState } from '../types';
import { ExchangeStateActions, TYPES } from '../actions';
import { ExchangeFlow } from '../../../services/exchangeFlow';
import { convertValue } from './helpers/convertValue';
import { convertWithFlow } from './helpers/convertWithFlow';
import { updateCurrencyWithFlow } from './helpers/updateCurrencyWithFlow';
import { isExchangeValid } from './helpers/isExchangeValid';

export const exchangeReducer = (state: ExchangeState, action: ExchangeStateActions): ExchangeState => {
    switch (action.type) {
        case TYPES.INPUT_CHANGE: {
            const { value, fromCurrency, toCurrency, flow } = action.payload;
            const converted = convertWithFlow(flow, value, fromCurrency, toCurrency, state.rates);
            return {
                ...state,
                ...converted,
                isExchangeValid: isExchangeValid(state.pockets, converted.originValue, converted.originCurrency)
            };
        }

        case TYPES.SLIDE_CHANGE: {
            const { currency, flow } = action.payload;
            const updated = updateCurrencyWithFlow(flow, currency, state);
            return {
                ...state,
                ...updated,
                isExchangeValid: isExchangeValid(state.pockets, updated.originValue, updated.originCurrency)
            };
        }

        case TYPES.RATES_CHANGE: {
            const { rates } = action.payload;
            const { originValue, originCurrency, destinationCurrency } = state;
            const originExchangeValue = convertValue('1', originCurrency, destinationCurrency, rates);
            const destinationExchangeValue = convertValue('1', destinationCurrency, originCurrency, rates);
            return {
                ...state,
                ...convertWithFlow(ExchangeFlow.FORWARD, originValue, originCurrency, destinationCurrency, rates),
                rates,
                originExchangeValue,
                destinationExchangeValue
            };
        }

        default:
            return state;
    }
};
