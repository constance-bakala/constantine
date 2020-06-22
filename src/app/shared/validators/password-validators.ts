import {FormControl, FormGroup} from '@angular/forms';

export class PasswordValidators {
  static minLength = 8;

  static passwordShouldBeMinimumChars(control: FormControl) {
    if (control.value.length < PasswordValidators.minLength) {
      return {passwordShouldBeMinimumChars: true};
    }

    return null;
  }

  static passwordsShouldMatch(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    if (password === '' || confirmPassword === '') {
      return null;
    }

    if (password !== confirmPassword) {
      return {passwordsShouldMatch: true};
    }

    return null;
  }

  static passwordShouldHaveAtLeastOneLowerCaseLetter(control: FormControl) {
    if (/[a-z]/.test(control.value)) {
      return null;
    }
    return {passwordShouldHaveAtLeastOneLowerCaseLetter: true};
  }

  static passwordShouldHaveAtLeastOneUpperCaseLetter(control: FormControl) {
    if (/[A-Z]/.test(control.value)) {
      return null;
    }

    return {passwordShouldHaveAtLeastOneUpperCaseLetter: true};
  }

  static passwordShouldHaveAtLeastOneDigit(control: FormControl) {
    if (/[0-9]/.test(control.value)) {
      return null;
    }

    return {passwordShouldHaveAtLeastOneDigit: true};
  }

  static passwordShouldHaveAtLeastOneSpecialCharacter(control: FormControl) {
    if (/[!@#$%^&*]/.test(control.value)) {
      return null;
    }

    return {passwordShouldHaveAtLeastOneSpecialCharacter: true};
  }

  static passwordMatchAtLeastThreeConditions(control: FormControl) {
    const oneLowerCaseLetter = PasswordValidators.passwordShouldHaveAtLeastOneLowerCaseLetter(
      control
    );
    const oneUpperCaseLetter = PasswordValidators.passwordShouldHaveAtLeastOneUpperCaseLetter(
      control
    );
    const oneDigit = PasswordValidators.passwordShouldHaveAtLeastOneDigit(
      control
    );
    const oneSpecialCharacter = PasswordValidators.passwordShouldHaveAtLeastOneSpecialCharacter(
      control
    );

    const errors = {
      ...oneLowerCaseLetter,
      ...oneUpperCaseLetter,
      ...oneDigit,
      ...oneSpecialCharacter
    };

    if (Object.keys(errors).length <= 1) {
      return null;
    }

    return errors;
  }
}
