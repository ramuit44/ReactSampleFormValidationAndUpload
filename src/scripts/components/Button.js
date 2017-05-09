import { PropTypes } from 'react';
import styled from 'styled-components';

import { COLOR_PRIMARY } from 'constants';

const Button = styled.button`
    background-color: ${COLOR_PRIMARY};
    border-radius: 0;
    border: 2px solid ${COLOR_PRIMARY};
    color: white;
    cursor: pointer;
    display: inline-block;
    font-size: 1em;
    line-height: 1;
    opacity: ${props => props.valid ? 1 : 0.4}
    outline: 0;
    padding: 1em 2em;
    transition-duration: .3s;
    transition-property: color, background-color, border-color, opacity;
    transition-timing-function: ease-out;
`;

Button.propTypes = {
    children: PropTypes.node,
    valid: PropTypes.bool, // Use valid and not disabled to keep button clickable
    type: PropTypes.oneOf(['button', 'submit']),
};

Button.defaultProps = {
    type: 'button',
};

export default Button;
