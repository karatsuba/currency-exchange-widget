import { ExchangeState } from '../types';
import { ExchangeStateActions, TYPES } from '../actions';
import { ExchangeFlow } from '../../../services/exchangeFlow';

import { convert } from 'cashify';

const rates = {
    GBP: 0.9,
    EUR: 1.0,
    USD: 1.18
};

function convertValue(value: string, from: string, to: string) {
    // TODO: use lib for formate
    return value !== ''
        ? convert(parseFloat(value), {
              from,
              to,
              base: 'EUR',
              rates
          }).toFixed(2)
        : '';
}

function convertWithFlow(
    flow: ExchangeFlow,
    value: string,
    from: string,
    to: string,
    state: ExchangeState
): ExchangeState {
    if (flow === ExchangeFlow.FORWARD) {
        const destinationValue = convertValue(value, from, to);
        return {
            ...state,
            destinationValue,
            destinationCurrency: to,
            originValue: value,
            originCurrency: from
        };
    }

    if (flow === ExchangeFlow.BACKWARD) {
        const originValue = convertValue(value, from, to);
        return {
            ...state,
            destinationValue: value,
            destinationCurrency: from,
            originValue,
            originCurrency: to
        };
    }

    return state;
}

function updateCurrencyWithFlow(flow: ExchangeFlow, currency: string, state: ExchangeState) {
    if (flow === ExchangeFlow.FORWARD) {
        const destinationValue = convertValue(
            state.originValue,
            currency,
            state.destinationCurrency
        );
        return {
            ...state,
            destinationValue
        };
    }

    if (flow === ExchangeFlow.BACKWARD) {
        const originValue = convertValue(state.destinationValue, currency, state.originCurrency);
        return {
            ...state,
            originValue
        };
    }

    return state;
}

export const exchangeReducer = (
    state: ExchangeState,
    action: ExchangeStateActions
): ExchangeState => {
    console.log(action);

    switch (action.type) {
        case TYPES.INPUT_CHANGE: {
            const { value, fromCurrency, toCurrency, flow } = action.payload;
            return convertWithFlow(flow, value, fromCurrency, toCurrency, state);
        }

        case TYPES.SLIDE_CHANGE: {
            const { currency, flow } = action.payload;
            return updateCurrencyWithFlow(flow, currency, state);
        }

        default:
            return state;
    }
};
