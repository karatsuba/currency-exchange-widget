import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyInput from '../index';

const setup = (inputValue: string) => {
    const onInputChange = jest.fn();
    const utils = render(
        <CurrencyInput
            value={inputValue}
            sign={'-'}
            fromCurrency={'USD'}
            toCurrency={'GBP'}
            exchangeInfo={'1 USD = 0.8 GBP'}
            onInputChange={onInputChange}
        />
    );

    const btn = utils.getByLabelText('currency-input') as HTMLInputElement;
    return {
        ...utils,
        btn,
        onInputChange
    };
};

it('should render currency input field', () => {
    const { btn, getByText } = setup('100');
    expect(btn).toBeInTheDocument();
    expect(btn.value).toEqual('-100');
    expect(getByText('1 USD = 0.8 GBP')).toBeInTheDocument();
});

it('should should handle numbers at input', () => {
    const { btn, onInputChange } = setup('15');

    userEvent.type(btn, '1');
    expect(onInputChange).toHaveBeenCalledWith('151', 'USD', 'GBP');
});

it('should should handle numbers with dot at input', () => {
    const { btn, onInputChange } = setup('15.1');

    userEvent.type(btn, '1');
    expect(onInputChange).toHaveBeenCalledWith('15.11', 'USD', 'GBP');
});

it('should should not handle numbers with decimals more than 2', () => {
    const { btn, onInputChange } = setup('15.15');

    userEvent.type(btn, '5');
    expect(onInputChange).toHaveBeenCalledTimes(0);
});

it('should not handle chars at input', () => {
    const { btn, onInputChange } = setup('15');

    userEvent.type(btn, 'a');
    expect(onInputChange).toHaveBeenCalledTimes(0);
});

it('should handle dot input after number', () => {
    const { btn, onInputChange } = setup('15');

    userEvent.type(btn, '.');
    expect(onInputChange).toHaveBeenCalledWith('15.', 'USD', 'GBP');
});

it('should not handle dot input at the start', () => {
    const { btn, onInputChange } = setup('');

    userEvent.type(btn, '.');
    expect(onInputChange).toHaveBeenCalledTimes(0);
});

it('should handle zero dot input at the start', () => {
    const { btn, onInputChange } = setup('0');

    userEvent.type(btn, '.');
    expect(onInputChange).toHaveBeenCalledWith('0.', 'USD', 'GBP');
});
