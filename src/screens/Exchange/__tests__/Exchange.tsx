import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import Exchange from '../index';
import { initialState as pockets } from '../../../store/pockets/initialState';
import { State } from '../../../store/types';

const mockStore = configureStore<State>([]);

let store: MockStoreEnhanced;
let getComponent: () => React.ReactElement;

beforeEach(() => {
    store = mockStore({
        pockets: pockets,
        exchangeRates: {
            rates: { EUR: 0.846112, GBP: 0.761287, USD: 1 },
            base: 'USD',
            loading: false,
            error: null
        }
    });

    store.dispatch = jest.fn();

    getComponent = function Component() {
        return (
            <Provider store={store}>
                <Router>
                    <Exchange />
                </Router>
            </Provider>
        );
    };
});

it('should render exchange screen with pockets and rates info', () => {
    const { getByText, getAllByText } = render(getComponent());

    expect(getByText(/Cancel ⬅️/i)).toBeInTheDocument();
    expect(getByText(/Exchange 🔄/i)).toBeInTheDocument();

    expect(getAllByText('GBP').length).toEqual(2);
    expect(getAllByText('You have £50').length).toEqual(2);

    expect(getAllByText('USD').length).toEqual(2);
    expect(getAllByText('You have $150').length).toEqual(2);

    expect(getAllByText('EUR').length).toEqual(2);
    expect(getAllByText('You have €550').length).toEqual(2);

    expect(getAllByText('1 GBP = 1.31 USD').length).toEqual(3);
    expect(getAllByText('1 USD = 0.76 GBP').length).toEqual(3);
});

it('should render exchange screen at origin value input change', () => {
    const { container } = render(getComponent());

    const [originInput, destinationInput] = Array.from(container.querySelectorAll('.slick-slide.slick-active input'));

    fireEvent.change(originInput, { target: { value: '30' } });

    expect(originInput.value).toEqual('-30');
    expect(destinationInput.value).toEqual('+39.41');
});

it('should render exchange screen at destination value input change', () => {
    const { container } = render(getComponent());

    const [originInput, destinationInput] = Array.from(container.querySelectorAll('.slick-slide.slick-active input'));

    fireEvent.change(destinationInput, { target: { value: '10' } });

    expect(destinationInput.value).toEqual('+10');
    expect(originInput.value).toEqual('-7.61');
});

it('should render exchange screen with disabled exchenge button', () => {
    const { container, getByText } = render(getComponent());

    const [originInput, destinationInput] = Array.from(container.querySelectorAll('.slick-slide.slick-active input'));

    fireEvent.change(originInput, { target: { value: '60' } });

    expect(originInput.value).toEqual('-60');
    expect(destinationInput.value).toEqual('+78.81');
    expect(getByText(/Exchange 🔄/i)).toBeDisabled();
});

it('should dispatch exchange handle action on exchange button click', () => {
    // store.dispatch
    const { container, getByText } = render(getComponent());

    const [originInput, destinationInput] = Array.from(container.querySelectorAll('.slick-slide.slick-active input'));
    const exchangeBtn = getByText(/Exchange 🔄/i);

    fireEvent.change(destinationInput, { target: { value: '10' } });

    expect(destinationInput.value).toEqual('+10');
    expect(originInput.value).toEqual('-7.61');
    expect(exchangeBtn).toBeEnabled();

    fireEvent.click(exchangeBtn);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
        payload: {
            destinationCurrency: 'USD',
            destinationValue: '10',
            originCurrency: 'GBP',
            originValue: '7.61'
        },
        type: 'EXCHANGE_MONEY'
    });
});
