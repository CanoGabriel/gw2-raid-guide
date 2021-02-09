import { composeValidator, isTruthy } from "../../../../../shared";

const validateSignupForm = (formValue) => {
  const { email, password, passwordConfirm } = formValue;

  const emailValidator = isTruthy();
  const passwordValidator = isTruthy();
  const passwordConfirmValidator = composeValidator([isTruthy(), (value) => value === password]);

  return {
    email: !emailValidator(email),
    password: !passwordValidator(password),
    passwordConfirm: !passwordConfirmValidator(passwordConfirm),
  };
};

const validateLoginForm = (formValue) => {
  const { email, password } = formValue;

  const emailValidator = isTruthy();
  const passwordValidator = isTruthy();

  return { email: !emailValidator(email), password: !passwordValidator(password) };
};

export { validateSignupForm, validateLoginForm };
