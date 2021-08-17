import { ValidationErrors } from '@angular/forms';
import { ErrorMessages } from '../dynamic-form.types';

export const defaultErrorMessages: ErrorMessages = {
  required: 'This field is required!',
  conditionalRequired: 'This field is required!',
  pattern: 'Current input has invalid pattern!',
  email: 'Value is not a valid email address!',
  url: 'Value is not a valid url!',
  tel: 'Value is not a phone number!',
  minLength: 'Answer is too short!',
  maxLength: 'Answer is too long!',
  min: 'Value is too low!',
  max: 'Value is too high!',
  number: 'Value is not a number!',
};

export const getErrorMessages = (
  errors: ValidationErrors,
  customErrorMessages?: ErrorMessages,
): string | null => {
  if (!errors || !Object.keys(errors).length) {
    return null;
  }

  const errorMessages = customErrorMessages
    ? {
        ...defaultErrorMessages,
        ...customErrorMessages,
      }
    : defaultErrorMessages;

  if (errors.required) {
    return errorMessages.required;
  }

  const errorKeys = Object.keys(errors);
  const activeErrorKey = errorKeys[0];

  if (activeErrorKey === 'message') {
    return errors[activeErrorKey];
  }

  const activeError = errorMessages[activeErrorKey] || 'This field is invalid!';

  if (!errorMessages[activeErrorKey]) {
    console.log('No error message for ', activeErrorKey);
  }

  return activeError;
};
