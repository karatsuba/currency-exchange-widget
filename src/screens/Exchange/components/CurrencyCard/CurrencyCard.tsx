import React from 'react';
import { CurrencyCardContainer } from './style';

interface CurrencyCardProps {
    children: React.ReactNode;
}

const CurrencyCard: React.FC<CurrencyCardProps> = (props: CurrencyCardProps) => {
    return <CurrencyCardContainer>{props.children}</CurrencyCardContainer>;
};

export default React.memo(CurrencyCard);
