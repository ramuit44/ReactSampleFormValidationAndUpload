import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { DetailsList, Title } from 'components';
import { FORM_MODEL_DETAILS } from 'constants';

const StyledWelcomeMessage = styled.div`
    margin: 0 0 2em;
`;

const mapStateToProps = state => ({
    details: state.forms[FORM_MODEL_DETAILS],
});

const WelcomeMessage = ({ details }) => {
    const { firstName, lastName } = details;
    return (
        <StyledWelcomeMessage>
            <Title level={3}>Welcome {firstName} {lastName}!</Title>
            <strong>Your details</strong>
            <DetailsList />
        </StyledWelcomeMessage>
    );
};

WelcomeMessage.propTypes = {
    details: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(WelcomeMessage);
