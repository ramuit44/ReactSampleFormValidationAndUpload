import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, Control } from 'react-redux-form';
import styled from 'styled-components';

import { FieldError, FieldGroup } from 'components';
import { FieldStyles } from 'styles';
import { DOCUMENT_FILE_FORMATS, COLOR_PRIMARY } from 'constants';

// Simulate upload service
import uploadFile from 'services/uploadFile';

const UPLOAD_SHOULD_FAIL = false;

const StyledLabel = styled.label`
    ${FieldStyles}
    color: ${props => props.loading ? 'rgba(255, 255, 255, 0.4)' : 'inherit'};
    cursor: pointer;
    float: left;
    overflow: hidden;
    padding-left: 2em;
    padding-right: 2em;
    position: relative;
    width: auto;

    &::before {
        background-color: ${COLOR_PRIMARY};
        content: '';
        height: 100%;
        left: 0;
        opacity: ${props => props.loading ? 1 : 0};
        position: absolute;
        top: 0;
        transform: ${props => `scaleX(${props.progress || 0})`};
        transition-duration: .2s;
        transform-origin: left;
        transition-property: opacity, transform;
        transition-timing-function: ease-in-out;
        width: 100%;
        z-index: 1;
    }
`;

const StyledLabelText = styled.span`
    display: block;
    max-width: calc(55vw);
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    z-index: 2;
`;

const StyledClear = styled.button`
    background: none;
    border: 0;
    cursor: pointer;
    float: left;
    height: 1.5em;
    margin: 1em 0 0 1em;
    opacity: .5;
    outline: 0;
    padding: 0;
    position: relative;
    transition: opacity .3s;
    width: 1.5em;

    &:hover {
        opacity: 1;
    }

    &::before,
    &::after {
        background-color: red;
        content: '';
        height: 2px;
        left: 0;
        position: absolute;
        transform: rotateZ(-45deg);
        width: 100%;
    }

    &::after {
        transform: rotateZ(45deg);
    }
`;

const StyledInput = styled(Control.file)`
    height: 1px;
    left: 0;
    opacity: 0;
    outline: 0;
    position: absolute;
    top: 0;
    width: 1px;

    &:focus {
        outline: 0;
    }
`;

const StyledError = styled.p`
    clear: both;
    font-size: .8em;
    margin: .5em 0;
`;

const mapDispatchToProps = dispatch => bindActionCreators({
    change: actions.change,
    reset: actions.reset,
}, dispatch);

class FieldUpload extends React.Component {

    constructor(props) {
        super(props);

        this.uploader = uploadFile();
    }

    componentWillUnmount() {
        // Doesn't stop upload, but destroys timeouts & intervals
        this.uploader.destroy();
    }

    clearInput = () => {
        this.props.reset(this.props.model);
    }

    handleInputChange = (e) => {
        const files = e.target.files;

        if (!files || !files.length) {
            return;
        }

        const fileToUpload = files[0];

        this.uploader.onProgress = (progress) => {
            this.props.change(this.props.model, {
                loading: true,
                name: fileToUpload.name,
                progress,
            });
        };

        this.uploader.upload(fileToUpload, UPLOAD_SHOULD_FAIL)
        .then((res) => {
            this.props.change(this.props.model, {
                loading: false,
                name: res.name,
                progress: 1,
                size: res.size,
                type: res.type,
                uploaded: true,
            });
        })
        .catch((err) => {
            // TODO: Show error message somewhere
            this.props.change(this.props.model, {
                error: err.message,
                loading: false,
            });
        });
    }

    render() {
        const {
            disabled,
            error,
            errorMessages,
            hasFile,
            label,
            loading,
            model,
            placeholder,
            progress,
            validators,
        } = this.props;

        return (
            <FieldGroup>
                <StyledLabel
                    htmlFor={model}
                    loading={loading}
                    progress={progress}
                >
                    <StyledLabelText>
                        {label}
                    </StyledLabelText>
                    <StyledInput
                        accept={DOCUMENT_FILE_FORMATS.join()}
                        disabled={disabled}
                        id={model}
                        model={model}
                        onChange={this.handleInputChange}
                        placeholder={placeholder}
                        validators={validators}
                    />
                </StyledLabel>
                {hasFile &&
                    <StyledClear onClick={this.clearInput} />
                }
                {error &&
                    <StyledError>{error}</StyledError>
                }
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

FieldUpload.propTypes = {
    change: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    errorMessages: PropTypes.object,
    hasFile: PropTypes.bool,
    label: PropTypes.string,
    loading: PropTypes.bool,
    model: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    progress: PropTypes.number,
    reset: PropTypes.func.isRequired,
    validators: PropTypes.object,
};

export default connect(null, mapDispatchToProps)(FieldUpload);
