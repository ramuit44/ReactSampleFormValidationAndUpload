import React, { PropTypes } from 'react';
import { Control } from 'react-redux-form';
import styled from 'styled-components';

import { FieldError, FieldGroup, FieldLabel } from 'components';
import { FieldStyles } from 'styles';

const StyledSelect = styled(Control.select)`
    ${FieldStyles}
    
    &::-ms-expand {
        display: none;
    }
`;

const SelectWrap = styled.div`
    position: relative;

    &::after {
        border-color: black;
        border-style: solid;
        border-width: 0 0 2px 2px;
        content: '';
        height: .5em;
        position: absolute;
        right: 1em;
        top: 50%;
        transform: translateY(-50%) rotateZ(-45deg);
        width: .5em;
    }
`;

const FieldSelect = ({
    disabled,
    errorMessages,
    label,
    model,
    options,
    placeholder,
    validators,
}) => {
    const selectOptions = options && options.map(option => (
        <option key={`${model}-${option}`} value={option}>
            {option}
        </option>
    ));

    return (
        <FieldGroup>
            {label &&
                <FieldLabel htmlFor={model}>{label}</FieldLabel>
            }
            <SelectWrap>
                <StyledSelect
                    disabled={disabled}
                    id={model}
                    model={model}
                    placeholder={placeholder}
                    validators={validators}
                >
                    {placeholder &&
                        <option value="">
                            {placeholder}
                        </option>
                    }
                    {selectOptions}
                </StyledSelect>
            </SelectWrap>
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

FieldSelect.propTypes = {
    disabled: PropTypes.bool,
    errorMessages: PropTypes.object,
    label: PropTypes.string,
    model: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
    validators: PropTypes.object,
};

export default FieldSelect;
