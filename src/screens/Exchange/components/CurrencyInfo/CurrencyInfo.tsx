import React from 'react';
import { CurrencyInfoContainer, CurrencyInfoBody, CurrencyInfoFooter } from './style';

interface CurrencyInfoProps {
    currency: string;
    symbol: string;
    balance: number;
}

export const CurrencyInfo: React.FC<CurrencyInfoProps> = React.memo(
    ({ currency, symbol, balance }) => {
        return (
            <CurrencyInfoContainer>
                <CurrencyInfoBody>{currency}</CurrencyInfoBody>
                <CurrencyInfoFooter>{`You have ${symbol}${balance}`}</CurrencyInfoFooter>
            </CurrencyInfoContainer>
        );
    }
);
