import { convertValue } from './convertValue';
import { ExchangeFlow } from '../../../../services/exchangeFlow';
import { ExchangeState } from '../../types';

export function updateCurrencyWithFlow(flow: ExchangeFlow, currency: string, state: ExchangeState): ExchangeState {
    if (flow === ExchangeFlow.FORWARD) {
        const result = {
            originExchangeValue: convertValue('1', currency, state.destinationCurrency, state.rates),
            destinationExchangeValue: convertValue('1', state.destinationCurrency, currency, state.rates),
            originCurrency: currency
        };

        // update from destination to origin
        if (state.flow === ExchangeFlow.BACKWARD) {
            const originValue = convertValue(state.destinationValue, state.destinationCurrency, currency, state.rates);
            return {
                ...state,
                ...result,
                originValue
            };
        }

        // update from origin to destination
        return {
            ...state,
            ...result,
            destinationValue: convertValue(state.originValue, currency, state.destinationCurrency, state.rates)
        };
    }

    if (flow === ExchangeFlow.BACKWARD) {
        const result = {
            originExchangeValue: convertValue('1', state.originCurrency, currency, state.rates),
            destinationExchangeValue: convertValue('1', currency, state.originCurrency, state.rates),
            destinationCurrency: currency
        };

        // update from origin to destination
        if (state.flow === ExchangeFlow.FORWARD) {
            return {
                ...state,
                ...result,
                destinationValue: convertValue(state.originValue, state.originCurrency, currency, state.rates)
            };
        }

        // update from destination to origin
        return {
            ...state,
            ...result,
            originValue: convertValue(state.destinationValue, currency, state.originCurrency, state.rates)
        };
    }

    return state;
}
