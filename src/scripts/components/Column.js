import { PropTypes } from 'react';
import styled from 'styled-components';

import { COL_SPACING } from 'constants';

// Very simple column component with only one breakpoint
const Column = styled.div`
    padding-left: ${COL_SPACING};
    padding-right: ${COL_SPACING};

    ${props => props.breakpoint ? `
        width: 100%;

        @media (min-width: ${props.breakpoint}) {
            width: ${100 * (props.cols / 12)}%;
        }
    ` : `
        width: ${100 * (props.cols / 12)}%;
    `}
`;

Column.propTypes = {
    cols: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).isRequired,
    breakpoint: PropTypes.string,
};

export default Column;
