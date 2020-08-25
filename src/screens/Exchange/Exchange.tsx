import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPockets } from '../../store/pockets/selectors';
import { getRates } from '../../store/rates/selectors';
import { State, Pockets, Rates } from '../../store/types';
import { ExchangeContainer } from './style';
import CurrencyCarousel from './components/CurrencyCarousel';
import { useExchangeState } from './hooks/useExchangeState';

interface ExchangeProps {
    pockets: Pockets;
    rates: Rates;
}

const Exchange: React.FC<ExchangeProps> = ({ pockets, rates }: ExchangeProps) => {
    const {
        state,
        onInputChangeForward,
        onInputChangeBackward,
        onSlideChangeForward,
        onSlideChangeBackward,
        onRatesChange
    } = useExchangeState();

    useEffect(() => {
        onRatesChange(rates);
    }, [rates, onRatesChange]);

    console.log(state);

    return (
        <ExchangeContainer>
            <h3>Exchange screen</h3>

            <CurrencyCarousel
                pockets={pockets}
                initialPocket={0}
                sign={'-'}
                inputValue={state.originValue}
                toCurrency={state.destinationCurrency}
                onSlideChange={onSlideChangeForward}
                onInputChange={onInputChangeForward}
            />

            <br />
            <br />

            <CurrencyCarousel
                pockets={pockets}
                initialPocket={1}
                sign={'+'}
                inputValue={state.destinationValue}
                toCurrency={state.originCurrency}
                onSlideChange={onSlideChangeBackward}
                onInputChange={onInputChangeBackward}
            />

            <br />

            <Link to='/'>Cancel</Link>
        </ExchangeContainer>
    );
};

const mapStateToProps = (state: State) => {
    return {
        pockets: getPockets(state),
        rates: getRates(state)
    };
};

export default connect(mapStateToProps, {})(Exchange);
