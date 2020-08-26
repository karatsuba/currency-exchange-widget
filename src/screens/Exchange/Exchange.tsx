import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPockets } from '../../store/pockets/selectors';
import { getRates } from '../../store/rates/selectors';
import { State, Pockets, Rates } from '../../store/types';
import { exchangeCurrency, PocketsActions } from '../../store/pockets/actions';
import { ExchangeContainer, ExchangeNav } from './style';
import CurrencyCarousel from './components/CurrencyCarousel';
import { useExchangeState } from './hooks/useExchangeState';
import ExchangeButton from './components/ExchangeButton';
import Button from '../../components/Button';

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

    const renderExchangeInfo = (from: string, to: string, value: string) => {
        return `1 ${from} = ${value} ${to}`;
    };

    console.log(state);

    return (
        <ExchangeContainer>
            <ExchangeNav>
                <Link to='/'>
                    <Button>Cancel</Button>
                </Link>
                <ExchangeButton disabled={!state.isExchangeValid} onExchange={handleExchange} />
            </ExchangeNav>

            <br />

            <CurrencyCarousel
                pockets={pockets}
                initialPocket={0}
                sign={'-'}
                inputValue={state.originValue}
                toCurrency={state.destinationCurrency}
                exchangeInfo={renderExchangeInfo(
                    state.originCurrency,
                    state.destinationCurrency,
                    state.originExchangeValue
                )}
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
                exchangeInfo={renderExchangeInfo(
                    state.destinationCurrency,
                    state.originCurrency,
                    state.destinationExchangeValue
                )}
                onSlideChange={onSlideChangeBackward}
                onInputChange={onInputChangeBackward}
            />
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
