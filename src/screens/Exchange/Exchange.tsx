import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPockets } from '../../store/pockets/selectors';
import { getRates } from '../../store/rates/selectors';
import { State, Pockets, Rates } from '../../store/types';
import { exchangeCurrency, PocketsActions } from '../../store/pockets/actions';
import { ExchangeContainer } from './style';
import CurrencyCarousel from './components/CurrencyCarousel';
import { useExchangeState } from './hooks/useExchangeState';
import ExchangeButton from './components/ExchangeButton';

interface StateProps {
    pockets: Pockets;
    rates: Rates;
}

interface DispatchProps {
    exchangeCurrency: (
        originCurrency: string,
        originValue: string,
        destinationCurrency: string,
        destinationValue: string
    ) => PocketsActions;
}

type ExchangeProps = StateProps & DispatchProps;

const Exchange: React.FC<ExchangeProps> = ({ pockets, rates, exchangeCurrency }: ExchangeProps) => {
    const {
        state,
        onInputChangeForward,
        onInputChangeBackward,
        onSlideChangeForward,
        onSlideChangeBackward,
        onRatesChange
    } = useExchangeState(pockets);

    const handleExchange = useCallback(() => {
        exchangeCurrency(state.originCurrency, state.originValue, state.destinationCurrency, state.destinationValue);
    }, [state, exchangeCurrency]);

    useEffect(() => {
        onRatesChange(rates);
    }, [rates, onRatesChange]);

    console.log(state);

    return (
        <ExchangeContainer>
            <h3>Exchange screen</h3>

            <br />

            <ExchangeButton disabled={!state.isExchangeValid} onExchange={handleExchange} />

            <br />

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

const mapStateToProps = (state: State): StateProps => {
    return {
        pockets: getPockets(state),
        rates: getRates(state)
    };
};

export default connect(mapStateToProps, { exchangeCurrency })(Exchange);
