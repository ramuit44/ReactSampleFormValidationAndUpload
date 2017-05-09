import React, { PropTypes } from 'react';
import styled from 'styled-components';

const Title = ({ children, level }) => {
    const StyledTitle = styled[`h${level}`]`
        font-size: ${0.8 + ((5 - level) * 0.2)}em;
        font-weight: normal;
        line-height: 1;
    `;

    return (
        <StyledTitle>
            {children}
        </StyledTitle>
    );
};

Title.propTypes = {
    children: PropTypes.node,
    level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
};

Title.defaultProps = {
    level: 2, // Should only have one h1 per page so default to h2 incase
};

export default Title;
