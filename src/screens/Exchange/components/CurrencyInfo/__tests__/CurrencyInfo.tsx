import React from 'react';
import { render } from '@testing-library/react';
import CurrencyInfo from '../index';

const setup = (currency: string, symbol: string, balance: number) => {
    const utils = render(<CurrencyInfo currency={currency} symbol={symbol} balance={balance} />);
    return {
        ...utils
    };
};

it('should render currency info', () => {
    const { getByText } = setup('USD', '$', 550);
    expect(getByText('USD')).toBeInTheDocument();
    expect(getByText('You have $550')).toBeInTheDocument();
});
