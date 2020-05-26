import {ENV_TYPES, environment as env, URLS} from './environment.common';


export const environment = {
  ...env,
  envName: ENV_TYPES.PROD,
  production: true,
  urls: URLS
};
