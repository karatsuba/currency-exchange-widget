import { inputChange, ratesChange, slideChange } from '../actions';
import { exchangeReducer } from '../reducer';
import { ExchangeFlow } from '../../../services/exchangeFlow';

const initialState = {
    originValue: '7.61',
    originCurrency: 'GBP',
    originExchangeValue: '1.31',
    destinationValue: '10',
    destinationCurrency: 'USD',
    destinationExchangeValue: '0.76',
    flow: ExchangeFlow.FORWARD,
    rates: { EUR: 0.846112, GBP: 0.761287, USD: 1 },
    pockets: {
        '0': { id: '0', currency: 'GBP', symbol: '£', balance: 50 },
        '1': { id: '1', currency: 'USD', symbol: '$', balance: 150 },
        '2': { id: '2', currency: 'EUR', symbol: '€', balance: 550 }
    },
    isExchangeValid: true
};

it('should reduce exchange state on input forward change action', () => {
    const action = inputChange('50', 'GBP', 'USD', ExchangeFlow.FORWARD);

    const state = exchangeReducer(initialState, action);

    expect(state).toEqual({
        ...state,
        destinationCurrency: 'USD',
        destinationExchangeValue: '0.76',
        destinationValue: '65.68',
        isExchangeValid: true,
        originCurrency: 'GBP',
        originExchangeValue: '1.31',
        originValue: '50'
    });
});

it('should reduce exchange state on input backward change action', () => {
    const action = inputChange('70', 'GBP', 'USD', ExchangeFlow.BACKWARD);

    const state = exchangeReducer(initialState, action);

    expect(state).toEqual({
        ...state,
        destinationCurrency: 'GBP',
        destinationExchangeValue: '0.76',
        destinationValue: '70',
        isExchangeValid: true,
        originCurrency: 'USD',
        originExchangeValue: '1.31',
        originValue: '91.95'
    });
});

it('should reduce exchange state on rates change action', () => {
    const action = ratesChange({ EUR: 0.5, GBP: 0.2, USD: 1 });

    const state = exchangeReducer(initialState, action);

    expect(state).toEqual({
        ...state,
        destinationCurrency: 'USD',
        destinationExchangeValue: '0.20',
        destinationValue: '38.05',
        isExchangeValid: true,
        originCurrency: 'GBP',
        originExchangeValue: '5.00',
        originValue: '7.61',
        rates: { EUR: 0.5, GBP: 0.2, USD: 1 }
    });
});

it('should reduce exchange origin state on slide forward change action', () => {
    const action = slideChange('EUR', ExchangeFlow.FORWARD);

    const state = exchangeReducer(initialState, action);

    expect(state).toEqual({
        ...state,
        destinationCurrency: 'USD',
        destinationExchangeValue: '0.85',
        destinationValue: '8.99',
        originCurrency: 'EUR',
        originExchangeValue: '1.18',
        originValue: '7.61',
        isExchangeValid: true
    });
});

it('should reduce exchange destination state on slide forward change action', () => {
    const action = slideChange('EUR', ExchangeFlow.FORWARD);

    const state = exchangeReducer({ ...initialState, flow: ExchangeFlow.BACKWARD }, action);

    expect(state).toEqual({
        ...state,
        destinationCurrency: 'USD',
        destinationExchangeValue: '0.85',
        destinationValue: '10',
        originCurrency: 'EUR',
        originExchangeValue: '1.18',
        originValue: '8.46',
        isExchangeValid: true
    });
});

it('should reduce exchange origin state on slide backward change action', () => {
    const action = slideChange('EUR', ExchangeFlow.BACKWARD);

    const state = exchangeReducer(initialState, action);

    expect(state).toEqual({
        ...state,
        destinationCurrency: 'EUR',
        destinationExchangeValue: '0.90',
        destinationValue: '8.46',
        originCurrency: 'GBP',
        originExchangeValue: '1.11',
        originValue: '7.61',
        isExchangeValid: true
    });
});

it('should reduce exchange destination state on slide backward change action', () => {
    const action = slideChange('EUR', ExchangeFlow.BACKWARD);

    const state = exchangeReducer({ ...initialState, flow: ExchangeFlow.BACKWARD }, action);

    expect(state).toEqual({
        ...state,
        destinationCurrency: 'EUR',
        destinationExchangeValue: '0.90',
        destinationValue: '10',
        originCurrency: 'GBP',
        originExchangeValue: '1.11',
        originValue: '9.00',
        isExchangeValid: true
    });
});
