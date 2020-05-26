const packageJson = require('../../package.json');

export const enum ENV_TYPES {
  DEV = 'DEV',
  PROD = 'PROD',
}

export const URLS = {
  DEVENIR_PARTENAIRE: '/static/redirect?key=DEVENIR_PARTENAIRE&path=',
};

export const environment = {
  appName: 'Délice éternel',
  envName: 'COMMON',
  production: false,
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript']
  },
  redux: {
    log: true
  },
  urls: URLS
};
