import styled from 'styled-components';

export default styled.button`
    padding: 10px;
    border: 1px solid black;
    vertical-align: middle;
    text-align: center;
    background-color: transparent;
    cursor: pointer;
    &:focus {
        outline: none;
    }
    &:disabled {
        opacity: 0.3;
    }
`;
