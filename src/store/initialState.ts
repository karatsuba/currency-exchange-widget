import { State, Pocket } from './types';

const GBPPocket: Pocket = {
    id: '0',
    currency: 'GBP',
    symbol: '£',
    balance: 50
};

const USDPocket: Pocket = {
    id: '1',
    currency: 'USD',
    symbol: '$',
    balance: 150
};

// const EURPocket: Pocket = {
//     id: '3',
//     currency: 'EUR',
//     symbol: '€',
//     balance: 550
// };

export const initialState: State = {
    pockets: {
        [GBPPocket.id]: GBPPocket,
        [USDPocket.id]: USDPocket
        // [EURPocket.id]: EURPocket
    }
};
