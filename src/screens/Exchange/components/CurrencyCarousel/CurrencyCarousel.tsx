import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { settings } from './settings';
import { Pockets } from '../../../../store/types';

import { CurrencyCard } from '../CurrencyCard';

interface CurrencyCarouselProps {
    pockets: Pockets;
    initialPocket: number;
    sign: string;
    inputValue: string;
    toCurrency: string;
    onSlideChange: (currency: string) => void;
    onInputChange: (value: string, fromCurrency: string, toCurrency: string) => void;
}

export const CurrencyCarousel: React.FC<CurrencyCarouselProps> = React.memo((props) => {
    const renderCurrencyCards = (pockets: Pockets) => {
        return Object.entries(pockets).map(([id, pocket]) => {
            const { currency, ...rest } = pocket;

            return (
                <CurrencyCard
                    key={id}
                    {...rest}
                    sign={props.sign}
                    inputValue={props.inputValue}
                    fromCurrency={currency}
                    toCurrency={props.toCurrency}
                    onInputChange={props.onInputChange}
                />
            );
        });
    };

    const handleSlideChange = (oldIndex: number, newIndex: number) => {
        const pocket = props.pockets[newIndex];
        props.onSlideChange(pocket.currency);
    };

    console.log('Render CurrencyCarousel');
    const cards = renderCurrencyCards(props.pockets);

    return (
        <>
            <Slider
                {...settings}
                initialSlide={props.initialPocket}
                beforeChange={handleSlideChange}
            >
                {cards}
            </Slider>
        </>
    );
});
