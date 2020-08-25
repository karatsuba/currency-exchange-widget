import { createSelector } from 'reselect';
import { State } from '../types';

const pocketsSelector = (state: State) => state.pockets;

export const getPockets = createSelector(pocketsSelector, (pockets) => {
    return pockets;
});
