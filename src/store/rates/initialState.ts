import { ExchangeRates } from '../types';

export const initialState: ExchangeRates = {
    rates: {},
    base: '',
    loading: false,
    error: null
};
