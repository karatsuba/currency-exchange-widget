import { Rates } from '../../../../../../store/types';
import { convertValue } from './convertValue';
import { ExchangeFlow } from '../../../../services/exchangeFlow';

export function convertWithFlow(flow: ExchangeFlow, value: string, from: string, to: string, rates: Rates) {
    if (flow === ExchangeFlow.FORWARD) {
        const destinationValue = convertValue(value, from, to, rates);
        return {
            destinationValue,
            destinationCurrency: to,
            originValue: value,
            originCurrency: from
        };
    }

    if (flow === ExchangeFlow.BACKWARD) {
        const originValue = convertValue(value, from, to, rates);
        return {
            destinationValue: value,
            destinationCurrency: from,
            originValue,
            originCurrency: to
        };
    }

    return {
        destinationValue: '',
        destinationCurrency: from,
        originValue: '',
        originCurrency: to
    };
}
