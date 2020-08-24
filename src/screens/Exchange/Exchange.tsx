import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPockets } from '../../store/pockets/selectors';
import { State, Pockets } from '../../store/types';
import { CurrencyInput } from './components/CurrencyInput';

export const Exchange: React.FC = () => {
    return (
        <div>
            <h3>Exchange screen</h3>

            <div>TODO: slider with currencies here</div>

            <CurrencyInput value={'123.23'} sign={'-'} focused />

            <br />

            <CurrencyInput value={'34.23'} sign={'+'} />

            <br />

            <Link to='/'>Cancel</Link>
        </div>
    );
};

const mapStateToProps = (state: State) => ({
    pockets: getPockets(state)
});

export default connect(mapStateToProps, {})(Exchange);
