import React, { useRef } from 'react';
import { CurrencyInputContainer, Input } from './style';

interface CurrencyInputProps {
    value: string;
    label: string;
    sign: string;
    inputCurrency: string;
    onInputChange: (value: string, currency: string) => void;
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

export const CurrencyInput: React.FC<CurrencyInputProps> = React.memo((props) => {
    const inputElement = useRef<HTMLInputElement>(null);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const regex = /^[0-9]+(\.([0-9]{1,2})?)?$/;
        const nextValue = valueWithoutSign(inputElement.current?.value!) + event.key;
        if (!regex.test(nextValue)) {
            event.preventDefault();
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextValue = valueWithoutSign(event.target.value);
        if (nextValue !== props.value) {
            props.onInputChange(nextValue, props.label);
        }
    };

    console.log('Render CurrencyInput');

    const value = valueWithSign(props.value, props.sign);

    return (
        <CurrencyInputContainer>
            <Input
                type='text'
                value={value}
                ref={inputElement}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
        </CurrencyInputContainer>
    );
});
