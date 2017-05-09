import { BASE_STEP_CHANGE } from 'constants';

export function goToStep(newStep) {
    const step = parseInt(newStep, 10);

    // Type check, with early exit
    if (isNaN(step)) {
        return { type: null };
    }

    return {
        type: BASE_STEP_CHANGE,
        payload: {
            step,
        },
    };
}

export function nextStep() {
    return (dispatch, getState) => {
        // TODO: Limit steps
        const currentStep = getState().base.step;
        const step = currentStep + 1;

        return dispatch(goToStep(step));
    };
}

export function prevStep() {
    return (dispatch, getState) => {
        const currentStep = getState().base.step;
        const step = currentStep > 0 ? currentStep - 1 : 0;

        return dispatch(goToStep(step));
    };
}
