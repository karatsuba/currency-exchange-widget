import React, { useRef, useState, useEffect } from 'react';
import { Input } from './style';

interface CurrencyInputProps {
    value: string;
    focused?: boolean; // todo: do I need to autofocus
    sign: string;
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

export const CurrencyInput: React.FC<CurrencyInputProps> = (props) => {
    const inputElement = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState(valueWithSign(props.value, props.sign));

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const regex = /^[0-9]+(\.([0-9]{1,2})?)?$/;
        const nextValue = valueWithoutSign(inputElement.current?.value!) + event.key;
        if (!regex.test(nextValue)) {
            event.preventDefault();
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // const value = ;
        setValue(valueWithSign(valueWithoutSign(event.target.value), props.sign));
    };

    // todo: use separate hook
    // useEffect(() => {
    //     if (props.focused) {
    //         inputElement.current?.focus();
    //     }
    // }, []);

    useEffect(() => {
        console.log('VALUE CHANGED', value);
        // DISPATCH VALUE CHANGE TO LOCAL REDUCER
    }, [value]);

    return (
        <Input
            type='text'
            value={value}
            ref={inputElement}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            autoFocus={props.focused}
        />
    );
};
