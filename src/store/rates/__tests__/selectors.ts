import { getRates } from '../selectors';
import { State } from '../../types';

it('should select rates from state', () => {
    const state: State = {
        exchangeRates: {
            rates: { EUR: 0.846112, GBP: 0.761287, USD: 1 },
            base: 'USD',
            error: null,
            loading: false
        },
        pockets: {}
    };

    expect(getRates(state)).toEqual({ EUR: 0.846112, GBP: 0.761287, USD: 1 });
});
