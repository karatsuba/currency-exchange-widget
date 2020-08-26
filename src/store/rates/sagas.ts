import { delay, put, call } from 'redux-saga/effects';
import { fetchRates, RatesResponse } from '../../api/fetchRates';
import { fetchRatesRequest, fetchRatesSuccess, fetchRatesFailure } from './actions';

// TODO: remove later
import fakeResponse from './fakeResponse.json';
const TEN_SECONDS = 10 * 1000;
// const DEBUG_SEC = TEN_SECONDS * 100;

function* fetchRatesSaga() {
    yield put(fetchRatesRequest());

    try {
        // const ratesResponse: RatesResponse = yield call(fetchRates);
        const ratesResponse: RatesResponse = fakeResponse;
        yield put(fetchRatesSuccess(ratesResponse.rates, ratesResponse.base));
    } catch (error) {
        yield put(fetchRatesFailure(error));
    }
}

export function* refreshRates() {
    while (true) {
        yield fetchRatesSaga();
        yield delay(TEN_SECONDS);
        // yield delay(DEBUG_SEC);
    }
}
