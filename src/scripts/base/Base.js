import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// Components
import { Navigation } from 'components';
import { StepOne, StepTwo, Success } from 'containers';

// Styles
const Layout = styled.div`
    background-color: white;
    box-shadow: 0 0 20px rgba(0, 0, 0, .2);
    max-width: 100vw;
    padding: 20px;
    width: 500px;

    @media (min-width: 500px) {
        margin-top: 50px;
        margin-bottom: 50px;
        padding: 30px;
    }
`;

// Redux
const mapStateToProps = state => ({
    step: state.base.step,
});

class Base extends React.Component {

    static propTypes = {
        step: PropTypes.number.isRequired,
    };

    renderSteps() {
        if (this.props.step === 3) {
            return (
                <Success />
            );
        }

        if (this.props.step === 2) {
            return (
                <StepTwo />
            );
        }

        return (
            <StepOne />
        );
    }

    render() {
        return (
            <Layout>
                <Navigation />
                {this.renderSteps()}
            </Layout>
        );
    }
}

export default connect(mapStateToProps)(Base);
