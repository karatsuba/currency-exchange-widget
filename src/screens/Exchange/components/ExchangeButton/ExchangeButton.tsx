import React from 'react';
import { useHistory } from 'react-router-dom';
import { SmallPrimaryButton } from './style';

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
        <SmallPrimaryButton disabled={props.disabled} onClick={handleExchange}>
            Exchange 🔄
        </SmallPrimaryButton>
    );
};

export default React.memo(ExchangeButton);
