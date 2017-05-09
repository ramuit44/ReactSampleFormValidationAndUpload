import { BASE_STEP_CHANGE } from 'constants';

const defaultState = {
    step: 1,
};

export default function base(state = defaultState, action) {
    switch (action.type) {
    case BASE_STEP_CHANGE:
        return Object.assign({}, state, { step: action.payload.step });
    default:
        return state;
    }
}
