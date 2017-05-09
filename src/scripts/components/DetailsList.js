import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { List } from 'components';
import { FORM_MODEL_DETAILS } from 'constants';

const StyledDetailsList = styled.div`
    margin: 0 0 2em;
`;

const mapStateToProps = state => ({
    details: state.forms[FORM_MODEL_DETAILS],
});

const DetailsList = ({ details }) => {
    const {
        address,
        country,
        dob,
        firstName,
        lastName,
        passportNumber,
        postcode,
        state,
        suburb,
    } = details;

    return (
        <StyledDetailsList>
            <List>
                <li>
                    <span>Name:</span>
                    <span>{firstName} {lastName}</span>
                </li>
                <li>
                    <span>Date of birth:</span>
                    <span>{dob}</span>
                </li>
                <li>
                    <span>Address:</span>
                    <span>{address} {suburb}<br />{state} {postcode}<br />{country}</span>
                </li>
                <li>
                    <span>Passport Number:</span>
                    <span>{passportNumber}</span>
                </li>
            </List>
        </StyledDetailsList>
    );
};

DetailsList.propTypes = {
    details: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(DetailsList);
