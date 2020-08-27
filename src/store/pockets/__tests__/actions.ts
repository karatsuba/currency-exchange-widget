import { exchangeMoney } from '../actions';

it('should create exchange money action', () => {
    expect(exchangeMoney('USD', '100', 'GBP', '75.68')).toEqual({
        type: 'EXCHANGE_MONEY',
        payload: {
            destinationCurrency: 'GBP',
            destinationValue: '75.68',
            originCurrency: 'USD',
            originValue: '100'
        }
    });
});
