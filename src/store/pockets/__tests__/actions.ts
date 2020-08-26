import { exchangeCurrency } from '../actions';

it('should create exchange currency action', () => {
    expect(exchangeCurrency('USD', '100', 'GBP', '75.68')).toEqual({
        type: 'EXCHANGE_CURRENCY',
        payload: {
            destinationCurrency: 'GBP',
            destinationValue: '75.68',
            originCurrency: 'USD',
            originValue: '100'
        }
    });
});
