import React from 'react';
import { CurrencyInput } from '../CurrencyInput';
import { CurrencyInfo } from '../CurrencyInfo';
import { CurrencyCardContainer } from './style';

interface CurrencyCardProps {
    id: string;
    symbol: string;
    fromCurrency: string;
    toCurrency: string;
    balance: number;
    sign: string;
    inputValue: string;
    onInputChange: (value: string, fromCurrency: string, toCurrency: string) => void;
}

export const CurrencyCard: React.FC<CurrencyCardProps> = React.memo((props) => {
    console.log('Render CurrencyCard');

    return (
        <CurrencyCardContainer>
            <CurrencyInfo
                balance={props.balance}
                symbol={props.symbol}
                currency={props.fromCurrency}
            />
            <CurrencyInput
                value={props.inputValue}
                fromCurrency={props.fromCurrency}
                sign={props.sign}
                toCurrency={props.toCurrency}
                onInputChange={props.onInputChange}
            />
        </CurrencyCardContainer>
    );
});