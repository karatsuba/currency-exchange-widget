import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { pocketsReducer } from './pockets/reducer';
import { rootSaga } from './rootSaga';
import { exchangeRatesReducer } from './rates/reducer';

const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
    pockets: pocketsReducer,
    exchangeRates: exchangeRatesReducer
});

export const configureStore = () => {
    const middlewares = [sagaMiddleware];

    const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(...middlewares)));

    sagaMiddleware.run(rootSaga);

    return store;
};
