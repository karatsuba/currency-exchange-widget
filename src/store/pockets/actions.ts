export enum TYPES {
    EXCHANGE_MONEY = 'EXCHANGE_MONEY'
}

export const exchangeMoney = (
    originCurrency: string,
    originValue: string,
    destinationCurrency: string,
    destinationValue: string
) => ({
    type: TYPES.EXCHANGE_MONEY as typeof TYPES.EXCHANGE_MONEY,
    payload: {
        originCurrency,
        originValue,
        destinationCurrency,
        destinationValue
    }
});

export type PocketsActions = ReturnType<typeof exchangeMoney>;
