import { getPockets } from '../selectors';
import { State } from '../../types';

it('should select pockets from state', () => {
    const state: State = {
        exchangeRates: {
            rates: {},
            base: '',
            error: null,
            loading: false
        },
        pockets: {
            '0': {
                balance: 125.68,
                currency: 'GBP',
                id: '0',
                symbol: '£'
            }
        }
    };

    expect(getPockets(state)).toEqual({
        '0': {
            balance: 125.68,
            currency: 'GBP',
            id: '0',
            symbol: '£'
        }
    });
});
