import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { DetailsList, List, Title } from 'components';
import { FORM_MODEL_DETAILS, FORM_MODEL_DOCUMENTS } from 'constants';

// Actions
import { goToStep } from 'base/actions';

const StyledSuccess = styled.div`
    margin: 0 0 2em;
`;

const StyledChangeButton = styled.button`
    background: none;
    border: 0;
    color: #999;
    cursor: pointer;
    font-size: .6em;
    margin-left: 1em;
    outline: 0;
    padding: 0;
    transition: color .3s;

    &:hover {
        color: black;
    }
`;

const mapStateToProps = state => ({
    details: state.forms[FORM_MODEL_DETAILS],
    documents: state.forms[FORM_MODEL_DOCUMENTS],
});

const mapDispatchToProps = dispatch => (bindActionCreators({
    goToStep,
}, dispatch));

class Success extends React.Component {

    static propTypes = {
        details: PropTypes.object.isRequired,
        documents: PropTypes.object.isRequired,
        goToStep: PropTypes.func.isRequired,
    };

    goToDetails = () => this.props.goToStep(1);

    goToDocuments = () => this.props.goToStep(2);

    render() {
        const {
            firstName,
        } = this.props.details;

        const {
            mandatoryFile,
            mandatoryType,
            supportingFile,
            supportingType,
        } = this.props.documents;

        return (
            <StyledSuccess>
                <Title level={3}>Thanks {firstName}!</Title>
                <p>
                    <strong>Your details</strong>
                    <StyledChangeButton type="button" onClick={this.goToDetails}>
                        Change
                    </StyledChangeButton>
                </p>
                <DetailsList />
                <p>
                    <strong>Your documents</strong>
                    <StyledChangeButton type="button" onClick={this.goToDocuments}>
                        Change
                    </StyledChangeButton>
                </p>
                <List>
                    <li>{mandatoryType}: {mandatoryFile.name}</li>
                    {supportingFile &&
                        <li>{supportingType}: {supportingFile.name}</li>
                    }
                </List>
            </StyledSuccess>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Success);
