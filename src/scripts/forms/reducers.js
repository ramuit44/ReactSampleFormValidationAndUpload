import { combineForms } from 'react-redux-form';

import { FORM_MODEL_DETAILS, FORM_MODEL_DOCUMENTS } from 'constants';

// Form reducers
import detailsForm from './DetailsForm/reducers';
import documentsForm from './DocumentsForm/reducers';

export const formReducers = combineForms({
    [FORM_MODEL_DETAILS]: detailsForm,
    [FORM_MODEL_DOCUMENTS]: documentsForm,
}, 'forms');
