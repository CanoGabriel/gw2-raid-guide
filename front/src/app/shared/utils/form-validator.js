// TODO unit test
/**
 * Generate a validator to check if value is not undefined
 * @returns {(value:any)=> boolean}
 */
const isNotUndefined = () => (value) => value !== undefined;

// TODO unit test
/**
 * Generate a validator to check if value is truthy
 * @returns {(value:any)=> boolean}
 */
const isTruthy = () => (value) => !!value;

// TODO unit test
/**
 * Generate a validator to check if value have a length less or equal to `max`
 * @returns {(value:any)=> boolean}
 */
const maxLength = (max) => (value) => {
  if (typeof value?.length === "number") {
    return value.length <= max;
  }
  return false;
};

// TODO unit test
/**
 * Generate a validator to check if value is validated by all provided validator.
 *
 * Validators are applied in the order they are provided.
 *
 * If no validator are provided the validator return `true`
 * @param {((value:any)=> boolean)[]}
 * @returns {(value:any)=> boolean}
 */
const composeValidator = (validators = []) => (value) => validators.reduce((result, validator) => result && validator(value), true);

// TODO unit test
/**
 * Return `true` if formError contains at least one truthy property
 * @param { {*: boolean}} formError
 */
const checkFormError = (formError) => Object.values(formError).some((isFieldError) => !!isFieldError);

export {
  isNotUndefined, isTruthy, maxLength, composeValidator, checkFormError,
};
