import React from 'react';
import Button from '../../../../components/Button';
import { useHistory } from 'react-router-dom';

interface ExchangeButtonProps {
    onExchange: () => void;
    disabled: boolean;
}

const ExchangeButton: React.FC<ExchangeButtonProps> = (props: ExchangeButtonProps) => {
    const history = useHistory();

    console.log('RENDER ExchangeButton');

    const handleExchange = () => {
        props.onExchange();
        history.push('/');
    };

    return (
        <Button disabled={props.disabled} onClick={handleExchange}>
            Exchange
        </Button>
    );
};

export default React.memo(ExchangeButton);
