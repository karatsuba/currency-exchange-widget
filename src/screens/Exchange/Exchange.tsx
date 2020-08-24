import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPockets } from '../../store/pockets/selectors';
import { State, Pockets } from '../../store/types';
import { ExchangeContainer } from './style';
import { CurrencyCarousel } from './components/CurrencyCarousel';
import { useExchangeState } from './hooks/useExchangeState';
import { ExchangeFlow } from './services/exchangeFlow';

interface ExchangeProps {
    pockets: Pockets;
}

const Exchange: React.FC<ExchangeProps> = ({ pockets }) => {
    // todo: on componen mount start rates fetching
    const { state, onInputChange, onSlideChange } = useExchangeState();

    return (
        <ExchangeContainer>
            <h3>Exchange screen</h3>

            <CurrencyCarousel
                pockets={pockets}
                initialPocket={0}
                sign={'-'}
                inputValue={state.originValue}
                inputCurrency={state.originCurrency}
                onSlideChange={onSlideChange(ExchangeFlow.FORWARD)}
                onInputChange={onInputChange(ExchangeFlow.FORWARD)}
            />

            <br />
            <br />

            <CurrencyCarousel
                pockets={pockets}
                initialPocket={1}
                sign={'+'}
                inputValue={state.destinationValue}
                inputCurrency={state.destinationCurrency}
                onSlideChange={onSlideChange(ExchangeFlow.FORWARD)}
                onInputChange={onInputChange(ExchangeFlow.BACKWARD)}
            />

            <br />

            <Link to='/'>Cancel</Link>
        </ExchangeContainer>
    );
};

const mapStateToProps = (state: State) => ({
    pockets: getPockets(state)
});

export default connect(mapStateToProps, {})(Exchange);
