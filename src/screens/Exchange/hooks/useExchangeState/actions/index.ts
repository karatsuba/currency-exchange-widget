import { ExchangeFlow } from '../../../services/exchangeFlow';

export enum TYPES {
    INPUT_CHANGE = 'INPUT_CHANGE',
    SLIDE_CHANGE = 'SLIDE_CHANGE'
}

export const inputChange = (value: string, currency: string, flow: ExchangeFlow) => ({
    type: TYPES.INPUT_CHANGE as typeof TYPES.INPUT_CHANGE,
    payload: {
        value,
        currency,
        flow
    }
});

export const slideChange = (currency: string, flow: ExchangeFlow) => ({
    type: TYPES.SLIDE_CHANGE as typeof TYPES.SLIDE_CHANGE,
    payload: {
        currency,
        flow
    }
});

export type ExchangeStateActions = ReturnType<typeof inputChange> | ReturnType<typeof slideChange>;
