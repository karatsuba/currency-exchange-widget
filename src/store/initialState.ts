import { State, Pocket } from './types';

const GBPPocket: Pocket = {
    id: '1',
    currency: 'GBP',
    value: 50
};

const USDPocket: Pocket = {
    id: '2',
    currency: 'USD',
    value: 150
};

const EURPocket: Pocket = {
    id: '3',
    currency: 'EUR',
    value: 550
};

export const initialState: State = {
    pockets: {
        [GBPPocket.id]: GBPPocket,
        [USDPocket.id]: USDPocket,
        [EURPocket.id]: EURPocket
    }
};
