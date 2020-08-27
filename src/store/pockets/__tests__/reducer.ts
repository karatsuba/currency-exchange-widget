import { pocketsReducer } from '../reducer';
import { initialState } from '../initialState';
import { exchangeMoney } from '../actions';

it('should reduce pocket state on exchangeMoney action', () => {
    const action = exchangeMoney('USD', '100', 'GBP', '75.68');

    const state = pocketsReducer(initialState, action);

    expect(state).toEqual({
        '0': {
            balance: 125.68,
            currency: 'GBP',
            id: '0',
            symbol: '£'
        },
        '1': {
            balance: 50,
            currency: 'USD',
            id: '1',
            symbol: '$'
        },
        '2': {
            balance: 550,
            currency: 'EUR',
            id: '2',
            symbol: '€'
        }
    });
});
