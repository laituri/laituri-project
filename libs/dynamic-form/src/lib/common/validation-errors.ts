import { ValidationErrors } from '@angular/forms';

export const errorMessages = {
  required: 'This field is required!',
  pattern: 'Current input has invalid pattern!',
  email: 'Value is not a valid email address!',
  url: 'Value is not a valid url!',
  tel: 'Value is not a phone number!',
  minlength: 'Answer is too short!',
  maxlength: 'Answer is too long!',
  min: 'Value is too low!',
  max: 'Value is too hight!',
  number: 'Value is not a number!',
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
