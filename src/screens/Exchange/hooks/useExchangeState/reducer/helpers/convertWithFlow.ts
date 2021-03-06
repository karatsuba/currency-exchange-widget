import { Rates } from '../../../../../../store/types';
import { convertValue } from './convertValue';
import { ExchangeFlow } from '../../../../services/exchangeFlow';
import { ExchangeInputs } from '../../types/index';

export function convertWithFlow(
    flow: ExchangeFlow,
    value: string,
    from: string,
    to: string,
    rates: Rates
): ExchangeInputs {
    if (flow === ExchangeFlow.FORWARD) {
        const destinationValue = convertValue(value, from, to, rates);
        return {
            destinationValue,
            destinationCurrency: to,
            originValue: value,
            originCurrency: from,
            flow
        };
    }

    if (flow === ExchangeFlow.BACKWARD) {
        const originValue = convertValue(value, from, to, rates);
        return {
            destinationValue: value,
            destinationCurrency: from,
            originValue,
            originCurrency: to,
            flow
        };
    }

    return {
        destinationValue: '',
        destinationCurrency: from,
        originValue: '',
        originCurrency: to,
        flow
    };
}
