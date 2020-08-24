import { ExchangeState } from '../types';
import { ExchangeStateActions, TYPES } from '../actions';

export const exchangeReducer = (
    state: ExchangeState,
    action: ExchangeStateActions
): ExchangeState => {
    console.log(action);

    switch (action.type) {
        case TYPES.INPUT_CHANGE: {
            const originValue = action.payload.value;

            // TODO: handle exchange here

            // handle with fixed rate
            const destinationValue =
                originValue !== '' ? (parseFloat(originValue) * 1.31).toFixed(2) : '';
            // console.log('destinationValue', destinationValue);
            return {
                ...state,
                originValue,
                originCurrency: 'GBP',
                destinationValue,
                destinationCurrency: 'USD'
            };
        }

        case TYPES.SLIDE_CHANGE: {
            return state;
        }

        default:
            return state;
    }

    // if (action.type === 'INPUT_CHANGE_BACKWARD') {
    //     const destinationValue = action.payload;
    //     const originValue =
    //         destinationValue !== '' ? (parseFloat(destinationValue) * 0.76).toFixed(2) : '';
    //     console.log('originValue', originValue);
    //     return {
    //         ...state,
    //         originValue,
    //         destinationValue
    //     };
    // }

    // if (action.type === 'SLIDE_CHANGE') {
    //     const currency = action.payload;
    //     const destinationValue =
    //         currency === state.originCurrency
    //             ? state.originValue
    //             : (parseFloat(state.originCurrency) * 0.76).toFixed(2);

    //     return {
    //         ...state,
    //         destinationValue
    //     };
    // }
};
