import { css } from 'styled-components';

const FieldStyles = css`
    appearance: none;
    background-color: #f0f0f0
    border-radius: 0;
    border: 0;
    box-shadow: none;
    color: #666;
    font-size: 1em;
    line-height: 1.5em;
    outline: 0;
    padding: .5em;
    transition: color .3s;
    width: 100%;

    &:focus {
        color: black;
        box-shadow: inset 0 0 0 1px #e0e0e0;
    }

    &::placeholder {
        color: #ccc;
    }
`;

export default FieldStyles;
