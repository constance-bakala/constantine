import {InjectionToken} from '@angular/core';
import {IAppConfig} from '@shared/interfaces/app.interfaces';

/**
 * Email regex RFC 2822
 * https://tools.ietf.org/html/rfc2822#section-3.4.1
 */
export const EMAIL_REGEX = new RegExp(
  [
    '(?:[a-zA-Z0-9!#$%&\'*+/=?^_`{|}~-]+(?:.[a-zA-Z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[',
    '\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e',
    '-\\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]',
    '*[a-zA-Z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2',
    '[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-',
    '\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])'
  ].join('')
);

/**
 * Injection token to configure the application time before savePrecisions request
 */
export const APP_CONFIG = new InjectionToken<IAppConfig>('AppConfig');
export const TECHNICAL_EXCEPTION_MSG = '[ERREUR] erreur technique, veuillez réessayer ultérieurement';
export const DEFAULT_LOCALE_ID = navigator.language.substr(0,2);
