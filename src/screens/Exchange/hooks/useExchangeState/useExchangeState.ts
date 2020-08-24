import { useReducer, useCallback } from 'react';
import { ExchangeState } from './types';
import { exchangeReducer } from './reducer';
import { inputChange, slideChange } from './actions';
import { ExchangeFlow } from '../../services/exchangeFlow';

const initialState: ExchangeState = {
    originValue: '',
    originCurrency: '',
    destinationValue: '',
    destinationCurrency: ''
};

export const useExchangeState = () => {
    const [state, dispatch] = useReducer(exchangeReducer, initialState);

    const onInputChange = useCallback(
        (flow: ExchangeFlow) => (value: string, currency: string) => {
            dispatch(inputChange(value, currency, flow));
        },
        []
    );

    const onSlideChange = useCallback(
        (flow: ExchangeFlow) => (currency: string) => {
            dispatch(slideChange(currency, flow));
        },
        []
    );

    return {
        state,
        onInputChange,
        onSlideChange
    };
};
