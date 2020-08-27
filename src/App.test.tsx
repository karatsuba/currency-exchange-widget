import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('should render Home screen with init state', () => {
    const { getByText } = render(<App />);

    expect(getByText(/💰 GBP 50/i)).toBeInTheDocument();
    expect(getByText(/💰 USD 150/i)).toBeInTheDocument();
    expect(getByText(/💰 EUR 550/i)).toBeInTheDocument();
    expect(getByText(/Exchange 🔄/i)).toBeInTheDocument();
});
