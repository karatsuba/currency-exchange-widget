import { all } from 'redux-saga/effects';
import { refreshRates } from './rates/sagas';

export function* rootSaga() {
    yield all([refreshRates()]);
}
