export enum TYPES {
    EXCHANGE_CURRENCY = 'EXCHANGE_CURRENCY'
}

export const exchangeCurrency = (fromPocketId: string, toPocketId: string, value: number, rate: number) => ({
    type: TYPES.EXCHANGE_CURRENCY as typeof TYPES.EXCHANGE_CURRENCY,
    payload: {
        fromPocketId,
        toPocketId,
        value,
        rate
    }
});

export type PocketsActions = ReturnType<typeof exchangeCurrency>;
