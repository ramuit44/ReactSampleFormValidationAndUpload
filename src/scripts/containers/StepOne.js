import React from 'react';

import { Title } from 'components';
import { DetailsForm } from 'forms';

const StepOne = () => (
    <div>
        <Title>Hello</Title>
        <p>
            Please fill out all the fields below, then click continue to upload any required
            documents.
        </p>
        <DetailsForm />
    </div>
);

export default StepOne;
