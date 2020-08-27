import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { settings } from './settings';
import { Pockets } from '../../../../store/types';
import CurrencyInput from '../CurrencyInput';
import CurrencyInfo from '../CurrencyInfo';
import CurrencyCard from '../CurrencyCard';

interface CurrencyCarouselProps {
    pockets: Pockets;
    initialPocket: number;
    sign: string;
    inputValue: string;
    toCurrency: string;
    exchangeInfo: string;
    onSlideChange: (currency: string) => void;
    onInputChange: (value: string, fromCurrency: string, toCurrency: string) => void;
}

const CurrencyCarousel: React.FC<CurrencyCarouselProps> = (props: CurrencyCarouselProps) => {
    const renderCurrencyCards = (pockets: Pockets) => {
        return Object.entries(pockets).map(([id, pocket]) => {
            return (
                <CurrencyCard key={id}>
                    <CurrencyInfo balance={pocket.balance} symbol={pocket.symbol} currency={pocket.currency} />
                    <CurrencyInput
                        value={props.inputValue}
                        fromCurrency={pocket.currency}
                        sign={props.sign}
                        toCurrency={props.toCurrency}
                        exchangeInfo={props.exchangeInfo}
                        onInputChange={props.onInputChange}
                    />
                </CurrencyCard>
            );
        });
    };

    const handleSlideChange = (index: number) => {
        const pocket = props.pockets[index];
        props.onSlideChange(pocket.currency);
    };

    const cards = renderCurrencyCards(props.pockets);

    return (
        <>
            <Slider {...settings} initialSlide={props.initialPocket} afterChange={handleSlideChange}>
                {cards}
            </Slider>
        </>
    );
};

export default React.memo(CurrencyCarousel);
