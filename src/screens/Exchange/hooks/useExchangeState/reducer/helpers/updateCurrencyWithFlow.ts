import { convertValue } from './convertValue';
import { ExchangeFlow } from '../../../../services/exchangeFlow';
import { ExchangeState } from '../../types';

export function updateCurrencyWithFlow(flow: ExchangeFlow, currency: string, state: ExchangeState): ExchangeState {
    if (flow === ExchangeFlow.FORWARD) {
        const destinationValue = convertValue(state.originValue, currency, state.destinationCurrency, state.rates);

        const originExchangeValue = convertValue('1', currency, state.destinationCurrency, state.rates);
        const destinationExchangeValue = convertValue('1', state.destinationCurrency, currency, state.rates);

        return {
            ...state,
            originCurrency: currency,
            destinationValue,
            originExchangeValue,
            destinationExchangeValue
        };
    }

    if (flow === ExchangeFlow.BACKWARD) {
        const originValue = convertValue(state.destinationValue, currency, state.originCurrency, state.rates);

        const originExchangeValue = convertValue('1', state.originCurrency, currency, state.rates);
        const destinationExchangeValue = convertValue('1', currency, state.originCurrency, state.rates);

        return {
            ...state,
            destinationCurrency: currency,
            originValue,
            originExchangeValue,
            destinationExchangeValue
        };
    }

    return state;
}
