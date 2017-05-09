import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form } from 'react-redux-form';

import { Button, ColGroup, Column, FieldInput, FieldInputDOB } from 'components';
import { FORM_MODEL_DETAILS } from 'constants';
import { isDOB, isRequired } from 'helpers';

// Actions
import { nextStep } from 'base/actions';

const mapStateToProps = state => ({
    formState: state.forms.forms[FORM_MODEL_DETAILS].$form,
});

const mapDispatchToProps = dispatch => (bindActionCreators({
    nextStep,
}, dispatch));

class DetailsForm extends React.Component {

    static propTypes = {
        formState: PropTypes.object.isRequired,
        nextStep: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.model = `forms.${FORM_MODEL_DETAILS}`;
    }

    handleSubmit = () => {
        this.props.nextStep();
    }

    render() {
        const { formState } = this.props;

        return (
            <Form
                model={this.model}
                onSubmit={this.handleSubmit}
            >
                <FieldInput
                    label="First Name"
                    model={`${this.model}.firstName`}
                    errorMessages={{
                        isRequired: 'Please enter your first name',
                    }}
                    placeholder="John"
                    validators={{
                        isRequired,
                    }}
                />
                <FieldInput
                    label="Last Name"
                    model={`${this.model}.lastName`}
                    errorMessages={{
                        isRequired: 'Please enter your last name',
                    }}
                    placeholder="Smith"
                    validators={{
                        isRequired,
                    }}
                />
                <FieldInputDOB
                    label="Date of birth"
                    model={`${this.model}.dob`}
                    errorMessages={{
                        isDOB: 'Please enter your date of birth (dd/mm/yyyy)',
                    }}
                    validators={{
                        isDOB,
                    }}
                />
                <FieldInput
                    label="Address"
                    model={`${this.model}.address`}
                    errorMessages={{
                        isRequired: 'Please enter your address',
                    }}
                    placeholder="123 Fake Street"
                    validators={{
                        isRequired,
                    }}
                />
                <ColGroup>
                    <Column cols={6}>
                        <FieldInput
                            label="Suburb"
                            model={`${this.model}.suburb`}
                            errorMessages={{
                                isRequired: 'Please enter your suburb',
                            }}
                            placeholder="Springfield"
                            validators={{
                                isRequired,
                            }}
                        />
                    </Column>
                    <Column cols={6}>
                        <FieldInput
                            label="State"
                            model={`${this.model}.state`}
                            errorMessages={{
                                isRequired: 'Please enter your state',
                            }}
                            placeholder="NSW"
                            validators={{
                                isRequired,
                            }}
                        />
                    </Column>
                </ColGroup>
                <ColGroup>
                    <Column cols={6}>
                        <FieldInput
                            label="Postcode"
                            model={`${this.model}.postcode`}
                            errorMessages={{
                                isRequired: 'Please enter your postcode',
                            }}
                            placeholder="1234"
                            validators={{
                                isRequired,
                            }}
                        />
                    </Column>
                    <Column cols={6}>
                        <FieldInput
                            label="Country"
                            model={`${this.model}.country`}
                            errorMessages={{
                                isRequired: 'Please enter your country',
                            }}
                            placeholder="Australia"
                            validators={{
                                isRequired,
                            }}
                        />
                    </Column>
                </ColGroup>
                <FieldInput
                    label="Passport Number"
                    model={`${this.model}.passportNumber`}
                    errorMessages={{
                        isRequired: 'Please enter a valid passport number',
                    }}
                    placeholder="M1234567"
                    validators={{
                        isRequired,
                    }}
                />
                <Button
                    valid={formState.valid}
                    type="submit"
                >
                        Continue
                </Button>
            </Form>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsForm);
