import React, { useRef, useState, useEffect } from 'react';
import { CurrencyInfoContainer, CurrencyInfoBody, CurrencyInfoFooter } from './style';

interface CurrencyInfoProps {
    label: string;
    symbol: string;
    balance: number;
}

export const CurrencyInfo: React.FC<CurrencyInfoProps> = ({ label, symbol, balance }) => {
    return (
        <CurrencyInfoContainer>
            <CurrencyInfoBody>{label}</CurrencyInfoBody>
            <CurrencyInfoFooter>{`You have ${symbol}${balance}`}</CurrencyInfoFooter>
        </CurrencyInfoContainer>
    );
};
