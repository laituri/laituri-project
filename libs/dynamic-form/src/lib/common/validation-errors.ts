import { ValidationErrors } from '@angular/forms';

export const errorMessages = {
  required: 'This field is required!',
  pattern: 'Invalid pattern!',
  email: 'Value is not a valid email address!',
  minlength: 'Answer is too short!',
  maxlength: 'Answer is too long!',
  min: '',
};

export const getErrorMessages = (errors: ValidationErrors): string | null => {
  if (!errors || !Object.keys(errors).length) {
    return null;
  }

  if (errors.required) {
    return errorMessages.required;
  }

  const errorKeys = Object.keys(errors);
  const activeErrorKey = errorKeys[0];

  if (activeErrorKey === 'message') {
    return errors[activeErrorKey];
  }

  const activeError =
    errorMessages[activeErrorKey] || 'This field has something wrong!';

  return activeError;
};
