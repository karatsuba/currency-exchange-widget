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
}

export const CurrencyCard: React.FC<CurrencyCardProps> = (props) => {
    return (
        <CurrencyCardContainer>
            <CurrencyInfo balance={props.balance} symbol={props.symbol} label={props.label} />
            <CurrencyInput value={''} sign={props.sign} />
        </CurrencyCardContainer>
    );
};
