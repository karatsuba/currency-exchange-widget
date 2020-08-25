import { createSelector } from 'reselect';
import { State } from '../types';

const exchangeRatesSelector = (state: State) => state.exchangeRates;

export const getRates = createSelector(exchangeRatesSelector, (exchangeRates) => {
    return exchangeRates.rates;
});
