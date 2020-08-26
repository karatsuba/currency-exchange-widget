import SagaTester from 'redux-saga-tester';
import { refreshRates, fetchRatesSaga } from '../sagas';
import { delay, call } from 'redux-saga/effects';
import { TYPES } from '../actions';
import { exchangeRatesReducer } from '../reducer';

import { initialState } from '../initialState';

beforeEach(() => {
    fetchMock.resetMocks();
});

it('should refsher rates every 10 sec', () => {
    const generator = refreshRates();
    expect(generator.next().value).toEqual(call(fetchRatesSaga));
    expect(generator.next().value).toEqual(delay(10000));
});

it('should fetch rates and update store', async () => {
    fetchMock.mockResponseOnce(
        JSON.stringify({
            base: 'USD',
            rates: {
                EUR: 0.846112,
                GBP: 0.761287,
                USD: 1
            }
        })
    );

    const state = {
        exchangeRates: initialState
    };

    const sagaTester = new SagaTester({ initialState: state, reducers: { exchangeRates: exchangeRatesReducer } });
    sagaTester.start(fetchRatesSaga);

    await sagaTester.waitFor(TYPES.FETCH_RATES__REQUEST);

    expect(sagaTester.getState()).toEqual({
        exchangeRates: { rates: {}, base: '', loading: true, error: null }
    });

    await sagaTester.waitFor(TYPES.FETCH_RATES__SUCCESS);

    expect(sagaTester.getState()).toEqual({
        exchangeRates: { rates: { EUR: 0.846112, GBP: 0.761287, USD: 1 }, base: 'USD', loading: false, error: null }
    });
});
