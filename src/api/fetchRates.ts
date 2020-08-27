import fakeRates from './fakeRates.json';
import { Rates } from '../store/types';

export interface RatesResponse {
    disclaimer: string;
    license: string;
    timestamp: number;
    base: string;
    rates: Rates;
    error?: boolean;
}

const API_BASE = 'https://openexchangerates.org/api/latest.json?app_id=';
const RATES_URL = `${API_BASE}${process.env.REACT_APP_EXCHANGE_APP_ID}`;

export const fetchRates = async (): Promise<RatesResponse> => {
    // use real API only for production due to limitation (1000 requests/month)
    if (process.env.NODE_ENV === 'development') {
        return fakeRates;
    }

    try {
        const response = await fetch(RATES_URL);
        const json: RatesResponse = await response.json();

        if (json.error) {
            // if API calls overuse happened or other api related issues, return fake rates
            return fakeRates;
        }
        return json;
    } catch (error) {
        throw error;
    }
};
