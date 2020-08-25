import { Rates } from '../store/types';

export interface RatesResponse {
    disclaimer: string;
    license: string;
    timestamp: number;
    base: string;
    rates: Rates;
}

const API_BASE = 'https://openexchangerates.org/api/latest.json';

export const fetchRates = async (): Promise<RatesResponse> => {
    // TODO: better store app_id in .env file
    const RATES_URL = `${API_BASE}?app_id=ae35238898fe461c901be3b02a5c4a67`;

    try {
        const response = await fetch(RATES_URL);
        const json: Promise<RatesResponse> = response.json();
        return json;
    } catch (error) {
        throw error;
    }
};
