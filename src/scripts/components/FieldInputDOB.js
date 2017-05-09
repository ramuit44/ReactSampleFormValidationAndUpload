import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, Control } from 'react-redux-form';
import styled from 'styled-components';

import { FieldError, FieldGroup, FieldLabel } from 'components';
import { FieldStyles } from 'styles';

const StyledInput = styled.input`
    ${FieldStyles}
    margin-right: .5em;
    text-align: center;
    width: ${props => 1.5 * props.inputWidth}em;
`;

const mapDispatchToProps = dispatch => bindActionCreators({
    change: actions.change,
    setTouched: actions.setTouched,
}, dispatch);

class FieldInputDOB extends React.Component {

    static propTypes = {
        change: PropTypes.func.isRequired,
        disabled: PropTypes.bool,
        errorMessages: PropTypes.object,
        label: PropTypes.string,
        model: PropTypes.string.isRequired,
        setTouched: PropTypes.func.isRequired,
        validators: PropTypes.object,
    };

    componentDidMount() {
        // Need to populate input fields with values from the controlled input
        // This only really happens if a user clicks back from screens 2 and 3.
        if (this.dobInput && this.dobInput.value) {
            const dob = this.dobInput.value.split('/');

            this.dateInput.value = dob[0];
            this.monthInput.value = dob[1];
            this.yearInput.value = dob[2];
        }
    }

    componentWillUnmount() {
        this.clearBlurTimeour();
    }

    clearBlurTimeour = () => {
        clearTimeout(this.timeout);
    }

    handleBlur = () => {
        // Place in a tiny timeout to stop validation happening when inputs are
        // blurred/focued as a result of the handleChange method;
        this.timeout = setTimeout(() => {
            // Trigger normal validation by setting touched to true
            this.props.setTouched(this.props.model, true);
        }, 16);
    }

    handleChange = (e) => {
        const date = this.dateInput.value.substring(0, 2);
        const month = this.monthInput.value.substring(0, 2);
        const year = this.yearInput.value.substring(0, 4);

        const dob = `${date}/${month}/${year}`;
        this.props.change(this.props.model, dob);

        // TODO: Handle delete to go back

        // Probably not the best method, but jump to next input
        if (e.target === this.dateInput && date.length >= 2) {
            this.monthInput.focus();
            this.clearBlurTimeour();
            return;
        }

        if (e.target === this.monthInput && month.length >= 2) {
            this.yearInput.focus();
            this.clearBlurTimeour();
        }
    }

    render() {
        const {
            disabled,
            errorMessages,
            label,
            model,
            validators,
        } = this.props;

        return (
            <FieldGroup>
                {label &&
                    <FieldLabel htmlFor={model}>{label}</FieldLabel>
                }
                <StyledInput
                    disabled={disabled}
                    innerRef={(input) => { this.dateInput = input; }}
                    inputWidth={2}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    placeholder="DD"
                    pattern="\d*"
                    validators={validators}
                />
                <StyledInput
                    disabled={disabled}
                    innerRef={(input) => { this.monthInput = input; }}
                    inputWidth={2}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    placeholder="MM"
                    pattern="\d*"
                    validators={validators}
                />
                <StyledInput
                    disabled={disabled}
                    innerRef={(input) => { this.yearInput = input; }}
                    inputWidth={3}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    placeholder="YYYY"
                    pattern="\d*"
                    validators={validators}
                />
                <Control
                    component={props => (
                        <input
                            ref={(input) => { this.dobInput = input; }}
                            type="hidden" {...props}
                        />
                    )}
                    id={model}
                    model={model}
                    validators={validators}
                />
                <FieldError
                    messages={errorMessages}
                    model={model}
                    show={{
                        touched: true,
                    }}
                    wrapper={wrapperProps => <div>{wrapperProps.children}</div>}
                />
            </FieldGroup>
        );
    }
}

export default connect(null, mapDispatchToProps)(FieldInputDOB);
