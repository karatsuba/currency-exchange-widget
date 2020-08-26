import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Home from '../index';
import { initialState } from '../../../store/pockets/initialState';

const mockStore = configureStore([]);

it('renders home screen with pockets', () => {
    const store = mockStore({
        pockets: initialState
    });

    const { getByText } = render(
        <Provider store={store}>
            <Router>
                <Home />
            </Router>
        </Provider>
    );

    expect(getByText(/💰 GBP 50/i)).toBeInTheDocument();
    expect(getByText(/💰 USD 150/i)).toBeInTheDocument();
    expect(getByText(/💰 EUR 550/i)).toBeInTheDocument();
    expect(getByText(/Exchange 🔄/i)).toBeInTheDocument();
});
