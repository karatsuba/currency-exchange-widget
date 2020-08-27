import find from 'lodash/find';
import currency from 'currency.js';
import { Pockets } from '../../../../../../store/types';
import { ExchangeInputs } from '../../types';

export function isExchangeValid(pockets: Pockets, exchangeInputs: ExchangeInputs): boolean {
    if (exchangeInputs.originValue === '') {
        return false;
    }

    if (exchangeInputs.originCurrency === exchangeInputs.destinationCurrency) {
        return false;
    }

    const originPocket = find(pockets, { currency: exchangeInputs.originCurrency })!;
    return originPocket.balance >= currency(exchangeInputs.originValue).value;
}
