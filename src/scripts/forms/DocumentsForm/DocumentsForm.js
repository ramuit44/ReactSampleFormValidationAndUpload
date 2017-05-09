import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form } from 'react-redux-form';

import { Button, FieldSelect, FieldUpload } from 'components';
import {
    DOCUMENT_TYPES_MANDAORY,
    DOCUMENT_TYPES_SUPPORTING,
    FORM_MODEL_DOCUMENTS,
    PASSPORT_ROTW_TYPE,
} from 'constants';
import { hasSelectedFile, isRequired } from 'helpers';

// Actions
import { nextStep } from 'base/actions';

const mapStateToProps = state => ({
    formState: state.forms.forms[FORM_MODEL_DOCUMENTS].$form,
    formValues: state.forms[FORM_MODEL_DOCUMENTS],
});

const mapDispatchToProps = dispatch => (bindActionCreators({
    nextStep,
}, dispatch));

class DocumentsForm extends React.Component {

    static propTypes = {
        formState: PropTypes.object.isRequired,
        formValues: PropTypes.object.isRequired,
        nextStep: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.model = `forms.${FORM_MODEL_DOCUMENTS}`;
    }

    getFormValidators = () => {
        const mandatoryRequired = {
            mandatoryFile: {
                isRequired,
            },
            mandatoryType: {
                isRequired,
            },
        };

        const supportingRequired = {
            supportingFile: {
                isRequired,
            },
            supportingType: {
                isRequired,
            },
        };

        if (this.supportingIsRequired()) {
            return Object.assign({}, mandatoryRequired, supportingRequired);
        }

        return mandatoryRequired;
    }

    supportingIsRequired = () => this.props.formValues.mandatoryType === PASSPORT_ROTW_TYPE;

    handleSubmit = () => {
        this.props.nextStep();
    }

    render() {
        const { formState, formValues } = this.props;

        return (
            <Form
                model={this.model}
                onSubmit={this.handleSubmit}
            >
                <FieldSelect
                    label="Document Type"
                    model={`${this.model}.mandatoryType`}
                    options={DOCUMENT_TYPES_MANDAORY}
                    placeholder="Please select..."
                    errorMessages={{
                        isRequired: 'Please select the document type',
                    }}
                    validators={{
                        isRequired,
                    }}
                />
                <FieldUpload
                    label={`${formValues.mandatoryFile.name ?
                        formValues.mandatoryFile.name : 'Select a file'}`
                    }
                    model={`${this.model}.mandatoryFile`}
                    error={formValues.mandatoryFile.error}
                    hasFile={formValues.mandatoryFile.uploaded}
                    loading={formValues.mandatoryFile.loading}
                    progress={formValues.mandatoryFile.progress}
                    errorMessages={{
                        hasSelectedFile: 'Please upload your document',
                    }}
                    validators={{
                        hasSelectedFile,
                    }}
                />
                {this.supportingIsRequired() && (
                    <div>
                        <p>Please upload a supporting document.</p>
                        <FieldSelect
                            label="Document Type"
                            model={`${this.model}.supportingType`}
                            options={DOCUMENT_TYPES_SUPPORTING}
                            placeholder="Please select..."
                            errorMessages={{
                                isRequired: 'Please select the document type',
                            }}
                            validators={{
                                isRequired,
                            }}
                        />
                        <FieldUpload
                            label={`${formValues.supportingFile.name ?
                                formValues.supportingFile.name : 'Select a file'}`
                            }
                            model={`${this.model}.supportingFile`}
                            error={formValues.supportingFile.error}
                            hasFile={formValues.supportingFile.uploaded}
                            loading={formValues.supportingFile.loading}
                            progress={formValues.supportingFile.progress}
                            errorMessages={{
                                hasSelectedFile: 'Please upload your document',
                            }}
                            validators={{
                                hasSelectedFile,
                            }}
                        />
                    </div>
                )}
                <Button
                    valid={formState.valid}
                    type="submit"
                >
                        Submit
                </Button>
            </Form>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsForm);
