import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPockets } from '../../store/pockets/selectors';
import { State, Pockets } from '../../store/types';

interface HomeProps {
    pockets: Pockets;
}

export const Home: React.FC<HomeProps> = (props) => {
    console.log('RENDER');
    const pockets = Object.entries(props.pockets).map(([id, pocket]) => {
        return (
            <div key={pocket.id}>
                {pocket.currency}
                {pocket.value}
            </div>
        );
    });

    return (
        <>
            <h3>HOME SCREEN</h3>

            <div>{pockets}</div>

            <br />
            <Link to='/exchange'>Exchange</Link>
        </>
    );
};

const mapStateToProps = (state: State) => ({
    pockets: getPockets(state)
});

export default connect(mapStateToProps, {})(Home);
