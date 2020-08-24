import React, { useRef, useState, useEffect } from 'react';
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
}

export const CurrencyCarousel: React.FC<CurrencyCarouselProps> = (props) => {
    const renderCurrencyCards = (pockets: Pockets) => {
        return Object.entries(pockets).map(([id, pocket]) => {
            return <CurrencyCard key={id} {...pocket} sign={props.sign} />;
        });
    };

    return (
        <>
            <Slider {...settings} initialSlide={props.initialPocket}>
                {renderCurrencyCards(props.pockets)}
            </Slider>
        </>
    );
};
