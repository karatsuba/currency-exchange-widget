import find from 'lodash/find';
import currency from 'currency.js';
import { Pockets } from '../../../../../../store/types';

export function isExchangeValid(pockets: Pockets, originValue: string, originCurrency: string): boolean {
    if (originValue === '') {
        return false;
    }

    const originPocket = find(pockets, { currency: originCurrency })!;
    return originPocket.balance >= currency(originValue).value;
}
