import { Injectable, InjectionToken, Inject } from '@angular/core';

export interface IPasswordConfig {
  minLength?: number;
  minConstraints?: number;
  hasLowerCase?: boolean;
  hasUppercase?: boolean;
  hasDigit?: boolean;
  hasSpecialCaracter?: boolean;
}

export const APP_PASSWORD_CONFIG = new InjectionToken<string>(
  'AppPasswordConfig'
);

@Injectable({ providedIn: 'root' })
export class PasswordService {
  config: IPasswordConfig;

  constructor(@Inject(APP_PASSWORD_CONFIG) config: IPasswordConfig) {
    this.config = {
      minLength: 6,
      minConstraints: 3,
      hasDigit: true,
      hasLowerCase: true,
      hasUppercase: true,
      hasSpecialCaracter: true,
      ...config
    };
  }

  test(value: string) {
    if (this.config.minConstraints <= 0) {
      return true;
    }

    if (!value) {
      return false;
    }

    let satisfied = 0;
    const toVerify = [
      {
        attr: 'hasLowerCase',
        fn: this.lowerCaseExist
      },
      {
        attr: 'hasUppercase',
        fn: this.upperCaseExist
      },
      {
        attr: 'hasDigit',
        fn: this.hasDigit
      },
      {
        attr: 'hasSpecialCaracter',
        fn: this.hasSpecialCaracter
      }
    ];

    for (const v of toVerify) {
      if (this.config[v.attr] && v.fn(value)) {
        satisfied += 1;
      }
    }

    return (
      satisfied >= this.config.minConstraints - 1 &&
      value.length >= this.config.minLength
    );
  }

  isLongEnough = (value: string) => {
    return value && value.length >= this.config.minLength;
  }

  lowerCaseExist = (value: string) => {
    return /[a-z]/.test(value);
  }

  upperCaseExist = (value: string) => {
    return /[A-Z]/.test(value);
  }

  hasDigit = (value: string) => {
    return /[0-9]/.test(value);
  }

  hasSpecialCaracter = (value: string) => {
    return /[!@#$%^&*]/.test(value); // TODO Ajouter certains caractères spéciaux
  }
}
