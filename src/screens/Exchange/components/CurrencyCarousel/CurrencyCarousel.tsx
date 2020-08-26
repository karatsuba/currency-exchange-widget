import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { settings } from './settings';
import { Pockets } from '../../../../store/types';
import CurrencyCard from '../CurrencyCard';

interface CurrencyCarouselProps {
    pockets: Pockets;
    initialPocket: number;
    sign: string;
    inputValue: string;
    toCurrency: string;
    onSlideChange: (currency: string) => void;
    onInputChange: (value: string, fromCurrency: string, toCurrency: string) => void;
}

const CurrencyCarousel: React.FC<CurrencyCarouselProps> = (props: CurrencyCarouselProps) => {
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

    const handleSlideChange = (index: number) => {
        const pocket = props.pockets[index];
        props.onSlideChange(pocket.currency);
    };

    // console.log('Render CurrencyCarousel');
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
