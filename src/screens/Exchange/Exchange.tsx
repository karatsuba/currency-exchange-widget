import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPockets } from '../../store/pockets/selectors';
import { State, Pockets } from '../../store/types';
import { CurrencyCard } from './components/CurrencyCard';
import { ExchangeContainer } from './style';
import { CurrencyCarousel } from './components/CurrencyCarousel';

interface ExchangeProps {
    pockets: Pockets;
}

const Exchange: React.FC<ExchangeProps> = ({ pockets }) => {
    // todo: on componen mount start rates fetching
    return (
        <ExchangeContainer>
            <h3>Exchange screen</h3>

            <CurrencyCarousel pockets={pockets} initialPocket={0} sign={'-'} />

            <br />
            <br />

            <CurrencyCarousel pockets={pockets} initialPocket={1} sign={'+'} />

            <br />

            <Link to='/'>Cancel</Link>
        </ExchangeContainer>
    );
};

const mapStateToProps = (state: State) => ({
    pockets: getPockets(state)
});

export default connect(mapStateToProps, {})(Exchange);
