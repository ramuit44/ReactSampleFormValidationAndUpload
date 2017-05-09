import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { NavigationButton } from 'components';

import { BASE_STEPS_TOTAL } from 'constants';

// Actions
import { prevStep } from 'base/actions';

const mapStateToProps = state => ({
    step: state.base.step,
});

const mapDispatchToProps = dispatch => (bindActionCreators({
    prevStep,
}, dispatch));

const StyledNavigation = styled.nav`
    border-bottom: 1px solid #f0f0f0;
    color: #999;
    display: flex;
    justify-content: space-between;
    font-size: .8em;
    margin-bottom: 1em;
    padding-bottom: 1em;
    text-align: right;
`;

const StepIndicator = styled.span`
    margin-left: auto;
`;

const Navigation = props => (
    <StyledNavigation>
        {props.step > 1 &&
            <NavigationButton
                type="button"
                onClick={props.prevStep}
            >
                Back
            </NavigationButton>
        }
        <StepIndicator>
            {props.step} / {BASE_STEPS_TOTAL}
        </StepIndicator>
    </StyledNavigation>
);

Navigation.propTypes = {
    step: PropTypes.number.isRequired,
    prevStep: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
