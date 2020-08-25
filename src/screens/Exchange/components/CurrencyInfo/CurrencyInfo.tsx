import React from 'react';
import { CurrencyInfoContainer, CurrencyInfoBody, CurrencyInfoFooter } from './style';

interface CurrencyInfoProps {
    currency: string;
    symbol: string;
    balance: number;
}

const CurrencyInfo: React.FC<CurrencyInfoProps> = ({ currency, symbol, balance }: CurrencyInfoProps) => {
    return (
        <CurrencyInfoContainer>
            <CurrencyInfoBody>{currency}</CurrencyInfoBody>
            <CurrencyInfoFooter>{`You have ${symbol}${balance}`}</CurrencyInfoFooter>
        </CurrencyInfoContainer>
    );
};

export default React.memo(CurrencyInfo);
