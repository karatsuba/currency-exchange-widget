import { convertValue } from './convertValue';
import { ExchangeFlow } from '../../../../services/exchangeFlow';
import { ExchangeState } from '../../types';

export function updateCurrencyWithFlow(flow: ExchangeFlow, currency: string, state: ExchangeState): ExchangeState {
    if (flow === ExchangeFlow.FORWARD) {
        const destinationValue = convertValue(state.originValue, currency, state.destinationCurrency, state.rates);
        return {
            ...state,
            originCurrency: currency,
            destinationValue
        };
    }

    if (flow === ExchangeFlow.BACKWARD) {
        const originValue = convertValue(state.destinationValue, currency, state.originCurrency, state.rates);
        return {
            ...state,
            destinationCurrency: currency,
            originValue
        };
    }

    return state;
}
