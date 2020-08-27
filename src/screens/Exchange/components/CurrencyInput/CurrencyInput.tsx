import React, { useRef } from 'react';
import { CurrencyInputContainer, ExchangeInfo, Input } from './style';

interface CurrencyInputProps {
    value: string;
    fromCurrency: string;
    sign: string;
    toCurrency: string;
    exchangeInfo: string;
    onInputChange: (value: string, fromCurrency: string, toCurrency: string) => void;
}

function valueWithoutSign(value: string) {
    return value.replace(/-|\+/, '');
}

function valueWithSign(value: string, sign: string) {
    if (value === '0' || value === '') {
        return value;
    }
    return `${sign}${value}`;
}

const CurrencyInput: React.FC<CurrencyInputProps> = (props: CurrencyInputProps) => {
    const inputElement = useRef<HTMLInputElement>(null);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // handle [digit][dot][two digit]
        const regex = /^(0|[1-9]\d*)(\.([0-9]{1,2})?)?$/;

        if (inputElement.current) {
            const nextValue = valueWithoutSign(inputElement.current.value) + event.key;
            if (!regex.test(nextValue)) {
                event.preventDefault();
            }
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextValue = valueWithoutSign(event.target.value);
        props.onInputChange(nextValue, props.fromCurrency, props.toCurrency);
    };

    const value = valueWithSign(props.value, props.sign);

    return (
        <CurrencyInputContainer>
            <Input
                type='text'
                aria-label='currency-input'
                value={value}
                ref={inputElement}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder={'0'}
            />
            <ExchangeInfo>{props.exchangeInfo}</ExchangeInfo>
        </CurrencyInputContainer>
    );
};

export default React.memo(CurrencyInput);
