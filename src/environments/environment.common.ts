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
  firebaseConfig: {
    apiKey: "AIzaSyBLCfZxzkybYbWJSrJGllI3X9sYtS6VZgw",
    authDomain: "delice-eternel-gabon.firebaseapp.com",
    databaseURL: "https://delice-eternel-gabon.firebaseio.com",
    projectId: "delice-eternel-gabon",
    storageBucket: "delice-eternel-gabon.appspot.com",
    messagingSenderId: "528655916572",
    appId: "1:528655916572:web:73ef9aa553b17c49bdc9d9",
    measurementId: "G-ZWZRVSM0JL"
  },
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
