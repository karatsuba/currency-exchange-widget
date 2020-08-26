import { exchangeRatesReducer } from '../reducer';
import { initialState } from '../initialState';
import { fetchRatesSuccess, fetchRatesRequest, fetchRatesFailure } from '../actions';

it('should reduce rates exchange state on fetchRatesRequest action', () => {
    const action = fetchRatesRequest();

    const state = exchangeRatesReducer(initialState, action);

    expect(state).toEqual({
        rates: {},
        base: '',
        loading: true,
        error: null
    });
});

it('should reduce rates exchange state on fetchRatesSuccess action', () => {
    const action = fetchRatesSuccess({ EUR: 0.846112, GBP: 0.761287, USD: 1 }, 'USD');

    const state = exchangeRatesReducer(initialState, action);

    expect(state).toEqual({
        rates: { EUR: 0.846112, GBP: 0.761287, USD: 1 },
        base: 'USD',
        loading: false,
        error: null
    });
});

it('should reduce rates exchange state on fetchRatesFailure action', () => {
    const error = new Error('Error message');
    const action = fetchRatesFailure(error);

    const state = exchangeRatesReducer(initialState, action);

    expect(state).toEqual({
        rates: {},
        base: '',
        loading: false,
        error: error
    });
});
