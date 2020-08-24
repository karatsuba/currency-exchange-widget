import React from 'react';
import { CurrencyInput } from '../CurrencyInput';
import { CurrencyInfo } from '../CurrencyInfo';
import { CurrencyCardContainer } from './style';

interface CurrencyCardProps {
    id: string;
    symbol: string;
    label: string;
    balance: number;
    sign: string;
    inputValue: string;
    inputCurrency: string;
    onInputChange: (value: string, currency: string) => void;
}

export const CurrencyCard: React.FC<CurrencyCardProps> = React.memo((props) => {
    console.log('Render CurrencyCard');

    return (
        <CurrencyCardContainer>
            <CurrencyInfo balance={props.balance} symbol={props.symbol} label={props.label} />
            <CurrencyInput
                value={props.inputValue}
                label={props.label}
                sign={props.sign}
                inputCurrency={props.inputCurrency}
                onInputChange={props.onInputChange}
            />
        </CurrencyCardContainer>
    );
});
