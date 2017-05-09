import React, { PropTypes } from 'react';
import { Control } from 'react-redux-form';
import styled from 'styled-components';

import { FieldError, FieldGroup, FieldLabel } from 'components';
import { FieldStyles } from 'styles';

const StyledInput = styled(Control.text)`
    ${FieldStyles}
`;

const FieldInput = ({
    disabled,
    errorMessages,
    label,
    model,
    type,
    placeholder,
    validators,
}) => {
    return (
        <FieldGroup>
            {label &&
                <FieldLabel htmlFor={model}>{label}</FieldLabel>
            }
            <StyledInput
                disabled={disabled}
                id={model}
                model={model}
                placeholder={placeholder}
                type={type}
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
};

FieldInput.propTypes = {
    disabled: PropTypes.bool,
    errorMessages: PropTypes.object,
    label: PropTypes.string,
    model: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(['text', 'search', 'email', 'tel', 'password']),
    validators: PropTypes.object,
};

FieldInput.defaultProps = {
    type: 'text',
};

export default FieldInput;
