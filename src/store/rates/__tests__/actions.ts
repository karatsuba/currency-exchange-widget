import { fetchRatesRequest, fetchRatesSuccess, fetchRatesFailure } from '../actions';

it('should create fetch rates request action', () => {
    expect(fetchRatesRequest()).toEqual({
        type: 'FETCH_RATES__REQUEST'
    });
});

it('should create fetch rates success action', () => {
    expect(fetchRatesSuccess({ EUR: 0.846112, GBP: 0.761287, USD: 1 }, 'USD')).toEqual({
        payload: { base: 'USD', rates: { EUR: 0.846112, GBP: 0.761287, USD: 1 } },
        type: 'FETCH_RATES__SUCCESS'
    });
});

it('should create fetch rates failure action', () => {
    const error = new Error('Error message');
    expect(fetchRatesFailure(error)).toEqual({
        payload: { error },
        type: 'FETCH_RATES__FAILURE'
    });
});
