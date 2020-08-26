import { delay, put, call } from 'redux-saga/effects';
import { fetchRates, RatesResponse } from '../../api/fetchRates';
import { fetchRatesRequest, fetchRatesSuccess, fetchRatesFailure } from './actions';

const TEN_SECONDS = 10 * 1000;

export function* fetchRatesSaga() {
    yield put(fetchRatesRequest());

    try {
        const ratesResponse: RatesResponse = yield call(fetchRates);
        yield put(fetchRatesSuccess(ratesResponse.rates, ratesResponse.base));
    } catch (error) {
        yield put(fetchRatesFailure(error));
    }
}

export function* refreshRates() {
    while (true) {
        yield call(fetchRatesSaga);
        yield delay(TEN_SECONDS);
    }
}
