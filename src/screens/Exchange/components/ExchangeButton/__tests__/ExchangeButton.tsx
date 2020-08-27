import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ExchangeButton from '../index';
import { Router } from 'react-router-dom';

const setup = (disabled: boolean) => {
    const onExchange = jest.fn();
    const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

    const utils = render(
        <Router history={historyMock as any}>
            <ExchangeButton disabled={disabled} onExchange={onExchange} />
        </Router>
    );

    const btn = utils.getByText(/Exchange 🔄/i);
    return {
        btn,
        onExchange,
        historyMock,
        ...utils
    };
};

it('should render exchange btn', () => {
    const { btn } = setup(false);

    expect(btn).toBeInTheDocument();
    expect(btn).toBeEnabled();
});

it('should render disabled exchange btn', () => {
    const { btn } = setup(true);
    expect(btn).toBeDisabled();
});

it('should render exchange btn and handle click and redirect to HOME screen', () => {
    const { btn, onExchange, historyMock } = setup(false);

    fireEvent.click(btn);

    expect(historyMock.push).toHaveBeenCalledWith('/');
    expect(historyMock.push).toHaveBeenCalledTimes(1);
    expect(onExchange).toHaveBeenCalledTimes(1);
});
