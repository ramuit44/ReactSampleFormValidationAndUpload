export const APP_ENV = process.env.NODE_ENV;

// Forms
export const FORM_MODEL_DETAILS = 'details';
export const FORM_MODEL_DOCUMENTS = 'documents';
export const PASSPORT_ROTW_TYPE = 'Passport (Rest of the world)';
export const DOCUMENT_TYPES_MANDAORY = [
    'Lease',
    'License',
    'Passport (Australian)',
    PASSPORT_ROTW_TYPE,
];
export const DOCUMENT_TYPES_SUPPORTING = [
    'Utility Bill',
    'Rent Receipt',
];
export const DOCUMENT_FILE_FORMATS = ['.pdf', '.jpg', '.jpeg', '.png'];

// Base
export const BASE_STEPS_TOTAL = 3;
export const BASE_STEP_CHANGE = 'step/change';

// Styles
export const COLOR_PRIMARY = 'rgba(40, 188, 209, 1)';
export const COL_SPACING = '10px';
