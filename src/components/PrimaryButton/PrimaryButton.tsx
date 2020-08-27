import styled from 'styled-components';
import Button from '../Button';

interface PrimaryButtonProps {
    width?: string;
    fontSize?: string;
}

export default styled(Button)<PrimaryButtonProps>`
    border-radius: 10px;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    font-size: ${({ fontSize = '30px' }) => fontSize};
    width: ${({ width = 'auto' }) => width};
`;
