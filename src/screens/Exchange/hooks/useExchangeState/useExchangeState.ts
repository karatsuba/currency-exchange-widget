import { useReducer, useCallback } from 'react';
import { ExchangeState } from './types';
import { exchangeReducer } from './reducer';
import { inputChange, slideChange, ratesChange } from './actions';
import { ExchangeFlow } from '../../services/exchangeFlow';
import { Rates } from '../../../../store/types';

const initialState: ExchangeState = {
    originValue: '',
    originCurrency: 'GBP',
    destinationValue: '',
    destinationCurrency: 'USD',
    rates: {}
};

export const useExchangeState = () => {
    const [state, dispatch] = useReducer(exchangeReducer, initialState);

    const onRatesChange = useCallback((rates: Rates) => {
        dispatch(ratesChange(rates));
    }, []);

    const onInputChangeForward = useCallback((value: string, fromCurrency: string, toCurrency: string) => {
        dispatch(inputChange(value, fromCurrency, toCurrency, ExchangeFlow.FORWARD));
    }, []);

    const onInputChangeBackward = useCallback((value: string, fromCurrency: string, toCurrency: string) => {
        dispatch(inputChange(value, fromCurrency, toCurrency, ExchangeFlow.BACKWARD));
    }, []);

    const onSlideChangeForward = useCallback((currency: string) => {
        dispatch(slideChange(currency, ExchangeFlow.FORWARD));
    }, []);

    const onSlideChangeBackward = useCallback((currency: string) => {
        dispatch(slideChange(currency, ExchangeFlow.BACKWARD));
    }, []);

    return {
        state,
        onInputChangeForward,
        onInputChangeBackward,
        onSlideChangeForward,
        onSlideChangeBackward,
        onRatesChange
    };
};
