import React from 'react';
import { Errors } from 'react-redux-form';
import styled from 'styled-components';

// Weird issue which won't let styled(Errors) work
// so create a wrapping styled div instead

const StyledError = styled.div`
    clear: both;
    color: red;
    display: block;
    font-size: .7em;
    margin: .5em 0;
`;

const FieldError = props => (
    <StyledError>
        <Errors {...props} />
    </StyledError>
);

export default FieldError;
