import {Injectable} from '@angular/core';

const APP_PREFIX = 'app-';

@Injectable()
export class LocalStorageService {
  constructor() {
  }

  static loadInitialState() {
    return Object.keys(localStorage).reduce((state: any, storageKey) => {
      if (storageKey.includes(APP_PREFIX)) {
        state = state || {};
        const stateKey = storageKey
          .replace(APP_PREFIX, '')
          .toLowerCase()
          .split('.');
        let currentStateRef = state;
        stateKey.forEach((key, index) => {
          if (index === stateKey.length - 1) {
            try {
              currentStateRef[key] = JSON.parse(
                localStorage.getItem(storageKey)
              );
            } catch (e) {
            }
            return;
          }
          currentStateRef[key] = currentStateRef[key] || {};
          currentStateRef = currentStateRef[key];
        });
      }
      return state;
    }, undefined);
  }

  setItem(key: string, value: any) {
    if (typeof value !== 'undefined') {
      localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }

  getItem(key: string) {
    return JSON.parse(localStorage.getItem(`${APP_PREFIX}${key}`));
  }

  clearAll() {
    localStorage.clear();
  }
}
