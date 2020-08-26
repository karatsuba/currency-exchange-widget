import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Exchange from '../index';
import { initialState as pockets } from '../../../store/pockets/initialState';

const mockStore = configureStore([]);

it('renders home screen with pockets', () => {
    const store = mockStore({
        pockets: pockets,
        exchangeRates: {
            rates: { EUR: 0.846112, GBP: 0.761287, USD: 1 },
            base: 'USD',
            loading: false,
            error: null
        }
    });

    const { getByText } = render(
        <Provider store={store}>
            <Router>
                <Exchange />
            </Router>
        </Provider>
    );

    expect(getByText(/Cancel ⬅️/i)).toBeInTheDocument();
    expect(getByText(/Exchange 🔄/i)).toBeInTheDocument();
    // expect(getByText(/💰 EUR 550/i)).toBeInTheDocument();
    // expect(getByText(/Exchange 🔄/i)).toBeInTheDocument();
});
