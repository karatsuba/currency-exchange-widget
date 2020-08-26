import { convert } from 'cashify';
import currency from 'currency.js';
import { Rates } from '../../../../../../store/types';

export const convertValue = (value: string, from: string, to: string, rates: Rates) => {
    if (value === '') {
        return '';
    }

    const result = convert(currency(value).value, {
        from,
        to,
        base: 'USD',
        rates
    });

    return currency(result).format({ symbol: '', separator: '' });
};
