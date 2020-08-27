import { ExchangeState } from '../../types';
import { Rates } from '../../../../../../store/types';

export const areRatesEqual = (state: ExchangeState, newRates: Rates): boolean => {
    const { originCurrency, destinationCurrency, rates: oldRates } = state;

    return (
        oldRates[originCurrency] === newRates[originCurrency] &&
        oldRates[destinationCurrency] === newRates[destinationCurrency]
    );
};
