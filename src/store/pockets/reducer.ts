import { PocketsActions, TYPES } from './actions';
import { Pockets } from '../types';
import { initialState } from './initialState';

export const pocketsReducer = (state: Pockets = initialState, action: PocketsActions) => {
    switch (action.type) {
        case TYPES.EXCHANGE_CURRENCY: {
            console.log('HANDLE EXCHANGE HERE');
            return state;
        }

        default:
            return state;
    }
};
