import { PropTypes } from 'react';
import styled from 'styled-components';

const NavigationButton = styled.button`
    background: none;
    border-radius: 0;
    border: 0;
    color: #999;
    cursor: pointer;
    display: inline-block;
    font-size: 1em;
    line-height: 1;
    outline: 0;
    padding: 0;
    transition-duration: .3s;
    transition-property: color;
    transition-timing-function: ease-out;

    &:hover {
        color: black;
    }
`;

NavigationButton.propTypes = {
    children: PropTypes.node,
    type: PropTypes.string,
};

NavigationButton.defaultProps = {
    type: 'button',
};

export default NavigationButton;
