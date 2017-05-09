import styled from 'styled-components';

import { COL_SPACING } from 'constants';

const ColGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-left: -${COL_SPACING};
    margin-right: -${COL_SPACING};
`;

export default ColGroup;
