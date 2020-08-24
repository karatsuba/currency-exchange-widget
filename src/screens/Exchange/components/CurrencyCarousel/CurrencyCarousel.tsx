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
    inputCurrency: string;
    onSlideChange: (currency: string) => void;
    onInputChange: (value: string, currency: string) => void;
}

export const CurrencyCarousel: React.FC<CurrencyCarouselProps> = React.memo((props) => {
    const renderCurrencyCards = (pockets: Pockets) => {
        return Object.entries(pockets).map(([id, pocket]) => {
            return (
                <CurrencyCard
                    key={id}
                    {...pocket}
                    sign={props.sign}
                    inputValue={props.inputValue}
                    inputCurrency={props.inputCurrency}
                    onInputChange={props.onInputChange}
                />
            );
        });
    };

    const handleSlideChange = (oldIndex: number, newIndex: number) => {
        const pocket = props.pockets[newIndex];
        props.onSlideChange(pocket.label);
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
