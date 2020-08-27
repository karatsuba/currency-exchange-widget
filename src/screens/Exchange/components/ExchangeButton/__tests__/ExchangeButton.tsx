import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ExchangeButton from '../index';
import { Router } from 'react-router-dom';

it('should render exchange btn', () => {
    const onExchange = jest.fn();
    const { getByText } = render(<ExchangeButton disabled={false} onExchange={onExchange} />);

    const btn = getByText(/Exchange 🔄/i);
    expect(btn).toBeInTheDocument();
    expect(btn).toBeEnabled();
});

it('should render disabled exchange btn', () => {
    const onExchange = jest.fn();
    const { getByText } = render(<ExchangeButton disabled={true} onExchange={onExchange} />);

    const btn = getByText(/Exchange 🔄/i);
    expect(btn).toBeDisabled();
});

it('should render exchange btn and handle click and redirect to HOME screen', () => {
    const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    const onExchange = jest.fn();

    const { getByText } = render(
        <Router history={historyMock as any}>
            <ExchangeButton disabled={false} onExchange={onExchange} />
        </Router>
    );

    const btn = getByText(/Exchange 🔄/i);

    fireEvent.click(btn);

    expect(historyMock.push).toHaveBeenCalledWith('/');
    expect(historyMock.push).toHaveBeenCalledTimes(1);
    expect(onExchange).toHaveBeenCalledTimes(1);
});
