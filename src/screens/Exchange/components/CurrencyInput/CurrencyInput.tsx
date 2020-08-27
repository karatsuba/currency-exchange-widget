import React, { useRef } from 'react';
import { CurrencyInputContainer, ExchangeInfo, Input } from './style';
import * as utils from './utils';

interface CurrencyInputProps {
    value: string;
    fromCurrency: string;
    sign: string;
    toCurrency: string;
    exchangeInfo: string;
    onInputChange: (value: string, fromCurrency: string, toCurrency: string) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = (props: CurrencyInputProps) => {
    const inputElement = useRef<HTMLInputElement>(null);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (inputElement.current) {
            const nextValue = utils.insertChatAtPosition(
                inputElement.current.value,
                inputElement.current.selectionStart!,
                event.key
            );

            if (utils.validateNextValue(nextValue)) {
                event.preventDefault();
            }
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextValue = utils.valueWithoutSign(event.target.value);
        props.onInputChange(nextValue, props.fromCurrency, props.toCurrency);
    };

    const handlePaste = (event: React.ClipboardEvent) => {
        event.preventDefault();
    };

    const value = utils.valueWithSign(props.value, props.sign);

    return (
        <CurrencyInputContainer>
            <Input
                type='text'
                aria-label='currency-input'
                value={value}
                ref={inputElement}
                onPaste={handlePaste}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder={'0'}
            />
            <ExchangeInfo>{props.exchangeInfo}</ExchangeInfo>
        </CurrencyInputContainer>
    );
};

export default React.memo(CurrencyInput);
