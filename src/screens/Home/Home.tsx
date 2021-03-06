import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPockets } from '../../store/pockets/selectors';
import { State, Pockets } from '../../store/types';
import { Pocket, PocketsContainer } from './style';
import PrimaryButton from '../../components/PrimaryButton';

interface HomeProps {
    pockets: Pockets;
}

export const Home: React.FC<HomeProps> = (props: HomeProps) => {
    const pockets = Object.entries(props.pockets).map(([id, pocket]) => {
        return (
            <Pocket key={id}>
                <span>
                    💰 {pocket.currency} {pocket.balance}
                </span>
            </Pocket>
        );
    });

    return (
        <>
            <PocketsContainer>{pockets}</PocketsContainer>

            <Link to='/exchange'>
                <PrimaryButton>Go to exchange 🔄</PrimaryButton>
            </Link>
        </>
    );
};

const mapStateToProps = (state: State) => ({
    pockets: getPockets(state)
});

export default connect(mapStateToProps, {})(Home);
