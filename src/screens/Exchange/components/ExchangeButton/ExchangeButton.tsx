import React from 'react';
import { useHistory } from 'react-router-dom';
import PrimaryButton from '../../../../components/PrimaryButton';

interface ExchangeButtonProps {
    onExchange: () => void;
    disabled: boolean;
}

const ExchangeButton: React.FC<ExchangeButtonProps> = (props: ExchangeButtonProps) => {
    const history = useHistory();

    const handleExchange = () => {
        props.onExchange();
        history.push('/');
    };

    return (
        <PrimaryButton fontSize={'20px'} disabled={props.disabled} onClick={handleExchange}>
            Exchange 🔄
        </PrimaryButton>
    );
};

export default React.memo(ExchangeButton);
