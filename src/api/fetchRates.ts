import fakeRates from './fakeRates.json';
import { Rates } from '../store/types';

export interface RatesResponse {
    disclaimer: string;
    license: string;
    timestamp: number;
    base: string;
    rates: Rates;
}

const API_BASE = 'https://openexchangerates.org/api/latest.json?app_id=';
const RATES_URL = `${API_BASE}${process.env.REACT_APP_EXCHANGE_APP_ID}`;

export const fetchRates = async (): Promise<RatesResponse> => {
    console.log(RATES_URL);

    // use real API only for production
    if (process.env.NODE_ENV === 'development') {
        return Promise.resolve(fakeRates);
    }

    try {
        const response = await fetch(RATES_URL);
        const json: Promise<RatesResponse> = response.json();
        return json;
    } catch (error) {
        throw error;
    }
};
