import { PocketsActions, TYPES } from './actions';
import { Pockets } from '../types';
import { initialState } from './initialState';
import currency from 'currency.js';
import find from 'lodash/find';

export const pocketsReducer = (state: Pockets = initialState, action: PocketsActions): Pockets => {
    switch (action.type) {
        case TYPES.EXCHANGE_MONEY: {
            const { originCurrency, originValue, destinationCurrency, destinationValue } = action.payload;

            const originPocket = find(state, { currency: originCurrency })!;
            const destinationPocket = find(state, { currency: destinationCurrency })!;
            const originBalanse = currency(originPocket.balance).subtract(originValue).value;
            const destinationBalance = currency(destinationPocket.balance).add(destinationValue).value;

            return {
                ...state,
                [originPocket.id]: {
                    ...originPocket,
                    balance: originBalanse
                },
                [destinationPocket.id]: {
                    ...destinationPocket,
                    balance: destinationBalance
                }
            };
        }

        default:
            return state;
    }
};
