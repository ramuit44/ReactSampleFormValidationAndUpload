export const hasSelectedFile = val => Boolean(typeof val === 'object' && val.uploaded);

// Very basic regex validation, doesn't check day/month/year ranges
export const isDOB = val => (/^\d{2}\/\d{2}\/\d{4}$/.test(val));

export const isRequired = val => typeof val === 'string' ? val && val.length > 0 : Boolean(val);
