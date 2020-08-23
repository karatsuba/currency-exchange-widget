import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { pocketsReducer } from './pockets/reducer';
import { State } from './types';
// import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    pockets: pocketsReducer
});

export const configureStore = (initialState: State) => {
    const middlewares = [sagaMiddleware];

    const store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middlewares))
    );
    // sagaMiddleware.run(rootSaga);

    return store;
};
