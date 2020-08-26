import styled from 'styled-components';

export const CurrencyInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
`;

export const ExchangeInfo = styled.div`
    font-size: 15px;
    text-align: right;
`;

export const Input = styled.input`
    width: 100%;
    font-size: 30px;
    text-align: right;
    border: none;

    &:focus {
        outline: none;
    }
`;
