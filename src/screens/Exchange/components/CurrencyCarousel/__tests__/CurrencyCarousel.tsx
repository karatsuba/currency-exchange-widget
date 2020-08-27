import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyCarousel from '../index';

const setup = (inputValue: string) => {
    const pockets = {
        '0': {
            balance: 125.68,
            currency: 'GBP',
            id: '0',
            symbol: '£'
        },
        '1': {
            balance: 50,
            currency: 'USD',
            id: '1',
            symbol: '$'
        }
    };

    const sign = '-';
    const initialPocket = 0;
    const exchangeInfo = '1 GBP = 1.25 USD';
    const toCurrency = 'USD';

    const onSlideChange = jest.fn();
    const onInputChange = jest.fn();

    const utils = render(
        <CurrencyCarousel
            inputValue={inputValue}
            onInputChange={onInputChange}
            onSlideChange={onSlideChange}
            exchangeInfo={exchangeInfo}
            toCurrency={toCurrency}
            sign={sign}
            pockets={pockets}
            initialPocket={initialPocket}
        />
    );

    const activeSlide = utils.container.querySelector('.slick-slide.slick-active');
    const currencyInput = activeSlide?.querySelector('input');

    return {
        ...utils,
        activeSlide,
        currencyInput,
        onSlideChange,
        onInputChange
    };
};

it('should render currency carousel', () => {
    const { getAllByText, getByText, currencyInput } = setup('100');

    expect(getByText('GBP')).toBeInTheDocument();
    expect(getByText('You have £125.68')).toBeInTheDocument();
    expect(getByText('USD')).toBeInTheDocument();
    expect(getByText('You have $50')).toBeInTheDocument();
    expect(currencyInput?.value).toEqual('-100');
    expect(getAllByText('1 GBP = 1.25 USD').length).toEqual(2);
});

it('should handle currency input', () => {
    const { currencyInput, onInputChange } = setup('100');

    userEvent.type(currencyInput!, '1');
    expect(onInputChange).toHaveBeenCalledWith('1001', 'GBP', 'USD');
});

xit('should handle slide change ', () => {
    const { container, onSlideChange } = setup('100');

    const nextButton = container.querySelector('.slick-arrow.slick-next') as HTMLElement;
    // TODO: not able to change slide pragmatically, fireEvent doesn't trigger slide change
    fireEvent.click(nextButton!);

    expect(onSlideChange).toHaveBeenCalledWith('1001', 'GBP', 'USD');
});
