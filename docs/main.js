"use strict";
(self["webpackChunkconstantine"] = self["webpackChunkconstantine"] || []).push([["main"],{

/***/ 190
/*!********************************************************!*\
  !*** ./src/app/core/firebase/app-config.repository.ts ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppConfigRepository: () => (/* binding */ AppConfigRepository),
/* harmony export */   flattenTranslations: () => (/* binding */ flattenTranslations),
/* harmony export */   mergeDeep: () => (/* binding */ mergeDeep),
/* harmony export */   unflattenTranslations: () => (/* binding */ unflattenTranslations)
/* harmony export */ });
/* harmony import */ var C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 43942);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 59452);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 61318);
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/database */ 41559);
/* harmony import */ var _angular_fire_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/fire/storage */ 38335);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 56196);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 50698);










// ── Deep merge (firebase values override static, missing keys kept from static)
function mergeDeep(target, ...sources) {
  for (const source of sources) {
    if (!source) continue;
    for (const key of Object.keys(source)) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!target[key]) target[key] = {};
        mergeDeep(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}
// ── Flatten nested object to dot-notation keys
function flattenTranslations(obj, prefix = '') {
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof val === 'string') {
      result[fullKey] = val;
    } else if (val && typeof val === 'object') {
      Object.assign(result, flattenTranslations(val, fullKey));
    }
  }
  return result;
}
// ── Unflatten dot-notation keys back to nested object
function unflattenTranslations(flat) {
  const result = {};
  for (const [key, val] of Object.entries(flat)) {
    const parts = key.split('.');
    let current = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = val;
  }
  return result;
}
class AppConfigRepository {
  constructor(db, storage, http) {
    this.db = db;
    this.storage = storage;
    this.http = http;
  }
  // ── Translations ───────────────────────────────────────────────────────────
  getTranslationsOnce(lang) {
    return (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_4__.get)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_4__.ref)(this.db, `config/i18n/${lang}`)).then(snap => snap.val());
  }
  saveTranslations(lang, translations) {
    return (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_4__.set)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_4__.ref)(this.db, `config/i18n/${lang}`), translations);
  }
  /** Charge les traductions statiques JSON (source de vérité initiale). */
  loadStaticTranslations(lang) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.firstValueFrom)(this.http.get(`./assets/i18n/${lang}.json`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)({}))));
  }
  // ── Carousel ──────────────────────────────────────────────────────────────
  watchCarousel() {
    return new rxjs__WEBPACK_IMPORTED_MODULE_1__.Observable(observer => {
      const unsubscribe = (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_4__.onValue)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_4__.ref)(this.db, 'config/carousel'), snap => {
        const val = snap.val();
        if (!val) {
          observer.next([]);
          return;
        }
        const slides = Array.isArray(val) ? val.filter(Boolean) : Object.values(val).filter(Boolean);
        observer.next(slides);
      }, err => observer.error(err));
      return () => unsubscribe();
    });
  }
  saveCarousel(slides) {
    return (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_4__.set)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_4__.ref)(this.db, 'config/carousel'), slides);
  }
  uploadCarouselImage(file) {
    var _this = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const path = `config/carousel/${Date.now()}_${file.name}`;
      const sRef = (0,_angular_fire_storage__WEBPACK_IMPORTED_MODULE_5__.ref)(_this.storage, path);
      yield (0,_angular_fire_storage__WEBPACK_IMPORTED_MODULE_5__.uploadBytes)(sRef, file);
      const imageUrl = yield (0,_angular_fire_storage__WEBPACK_IMPORTED_MODULE_5__.getDownloadURL)(sRef);
      return {
        imageUrl,
        storagePath: path
      };
    })();
  }
  deleteCarouselImage(slide) {
    var _this2 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (slide.storagePath) {
        try {
          yield (0,_angular_fire_storage__WEBPACK_IMPORTED_MODULE_5__.deleteObject)((0,_angular_fire_storage__WEBPACK_IMPORTED_MODULE_5__.ref)(_this2.storage, slide.storagePath));
        } catch {/* ignoré si déjà supprimé */}
      }
    })();
  }
  // ── App title ─────────────────────────────────────────────────────────────
  watchAppTitle() {
    return new rxjs__WEBPACK_IMPORTED_MODULE_1__.Observable(observer => {
      const unsubscribe = (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_4__.onValue)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_4__.ref)(this.db, 'config/appTitle'), snap => {
        const val = snap.val();
        observer.next(val ?? {
          fr: 'Délice Éternel',
          en: 'Délice Éternel'
        });
      }, err => observer.error(err));
      return () => unsubscribe();
    });
  }
  saveAppTitle(fr, en) {
    return (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_4__.set)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_4__.ref)(this.db, 'config/appTitle'), {
      fr,
      en
    });
  }
  static {
    this.ɵfac = function AppConfigRepository_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AppConfigRepository)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_fire_database__WEBPACK_IMPORTED_MODULE_4__.Database), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_fire_storage__WEBPACK_IMPORTED_MODULE_5__.Storage), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
      token: AppConfigRepository,
      factory: AppConfigRepository.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 1900
/*!***************************************!*\
  !*** ./src/app/shared/pipes/index.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PatternTransformPipe: () => (/* reexport safe */ _pattern_transform_pattern_transform_pipe__WEBPACK_IMPORTED_MODULE_2__.PatternTransformPipe),
/* harmony export */   ReduceStringPipe: () => (/* reexport safe */ _reduce_string_reduce_string_pipe__WEBPACK_IMPORTED_MODULE_1__.ReduceStringPipe),
/* harmony export */   TextTransformPipe: () => (/* reexport safe */ _text_transform_text_transform_pipe__WEBPACK_IMPORTED_MODULE_0__.TextTransformPipe)
/* harmony export */ });
/* harmony import */ var _text_transform_text_transform_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text-transform/text-transform.pipe */ 82375);
/* harmony import */ var _reduce_string_reduce_string_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reduce-string/reduce-string.pipe */ 63357);
/* harmony import */ var _pattern_transform_pattern_transform_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pattern-transform/pattern-transform.pipe */ 40449);




/***/ },

/***/ 2520
/*!********************************************!*\
  !*** ./src/app/auth/store/auth.actions.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActionAuthLoggedIn: () => (/* binding */ ActionAuthLoggedIn),
/* harmony export */   ActionAuthLoggedOut: () => (/* binding */ ActionAuthLoggedOut),
/* harmony export */   ActionAuthLogin: () => (/* binding */ ActionAuthLogin),
/* harmony export */   ActionAuthLogout: () => (/* binding */ ActionAuthLogout),
/* harmony export */   ActionAuthSetError: () => (/* binding */ ActionAuthSetError),
/* harmony export */   ActionSetIsAdmin: () => (/* binding */ ActionSetIsAdmin),
/* harmony export */   AuthActionTypes: () => (/* binding */ AuthActionTypes),
/* harmony export */   AuthRefreshUserToken: () => (/* binding */ AuthRefreshUserToken),
/* harmony export */   AuthRefreshUserTokenSuccess: () => (/* binding */ AuthRefreshUserTokenSuccess),
/* harmony export */   AuthSignup: () => (/* binding */ AuthSignup),
/* harmony export */   AuthSignupError: () => (/* binding */ AuthSignupError),
/* harmony export */   AuthSignupSuccess: () => (/* binding */ AuthSignupSuccess)
/* harmony export */ });
var AuthActionTypes;
(function (AuthActionTypes) {
  AuthActionTypes["LOGIN"] = "[core:auth] Login";
  AuthActionTypes["LOGGED_IN"] = "[core:auth] Logged in successfully";
  AuthActionTypes["LOGOUT"] = "[core:auth] Logout";
  AuthActionTypes["LOGGED_OUT"] = "[core:auth] Logged out successfully";
  AuthActionTypes["SET_IS_ADMIN"] = "[core:auth] Set isAdmin";
  AuthActionTypes["LOGIN_ERROR"] = "[core:auth] Login Error";
  AuthActionTypes["AUTH_SIGNUP"] = "[auth - signup] Signup a new user";
  AuthActionTypes["AUTH_SIGNUP_INIT"] = "[auth- signup] Init signup state";
  AuthActionTypes["AUTH_SIGNUP_SUCCESS"] = "[auth- signup] User signed up successfully";
  AuthActionTypes["AUTH_SIGNUP_ERROR"] = "[auth- signup] Error while signing up a user";
  AuthActionTypes["AUTH_REFRESH_USER_TOKEN"] = "[auth- user state] check current user state";
  AuthActionTypes["AUTH_REFRESH_USER_TOKEN_SUCCESS"] = "[auth- user state] checked current user state successfully";
})(AuthActionTypes || (AuthActionTypes = {}));
class AuthRefreshUserToken {
  constructor() {
    this.type = AuthActionTypes.AUTH_REFRESH_USER_TOKEN;
  }
}
class AuthRefreshUserTokenSuccess {
  constructor(payload) {
    this.payload = payload;
    this.type = AuthActionTypes.AUTH_REFRESH_USER_TOKEN_SUCCESS;
  }
}
class AuthSignup {
  constructor(payload) {
    this.payload = payload;
    this.type = AuthActionTypes.AUTH_SIGNUP;
  }
}
class AuthSignupSuccess {
  constructor(payload) {
    this.payload = payload;
    this.type = AuthActionTypes.AUTH_SIGNUP_SUCCESS;
  }
}
class AuthSignupError {
  constructor(payload) {
    this.payload = payload;
    this.type = AuthActionTypes.AUTH_SIGNUP_ERROR;
  }
}
class ActionAuthLogin {
  constructor(payload) {
    this.payload = payload;
    this.type = AuthActionTypes.LOGIN;
  }
}
class ActionAuthLogout {
  constructor() {
    this.type = AuthActionTypes.LOGOUT;
  }
}
class ActionAuthLoggedOut {
  constructor() {
    this.type = AuthActionTypes.LOGGED_OUT;
  }
}
class ActionAuthLoggedIn {
  constructor(payload) {
    this.payload = payload;
    this.type = AuthActionTypes.LOGGED_IN;
  }
}
class ActionAuthSetError {
  constructor(payload) {
    this.payload = payload;
    this.type = AuthActionTypes.LOGIN_ERROR;
  }
}
class ActionSetIsAdmin {
  constructor(isAdmin = false) {
    this.isAdmin = isAdmin;
    this.type = AuthActionTypes.SET_IS_ADMIN;
  }
}

/***/ },

/***/ 2981
/*!**********************************************!*\
  !*** ./src/app/auth/store/auth.selectors.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   selectError: () => (/* binding */ selectError),
/* harmony export */   selectLoading: () => (/* binding */ selectLoading),
/* harmony export */   selectUser: () => (/* binding */ selectUser),
/* harmony export */   selectorAuth: () => (/* binding */ selectorAuth),
/* harmony export */   selectorAuthSignup: () => (/* binding */ selectorAuthSignup),
/* harmony export */   selectorConnectedUser: () => (/* binding */ selectorConnectedUser)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ 81383);

const selectorAuth = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createFeatureSelector)('auth');
const selectUser = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectorAuth, authState => {
  return authState.user;
});
const selectLoading = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectorAuth, authState => authState.loading);
const selectError = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectorAuth, authState => authState.error);
// Backward compatibility aliases
const selectorAuthSignup = selectorAuth;
const selectorConnectedUser = selectUser;

/***/ },

/***/ 3547
/*!******************************************************************************!*\
  !*** ./src/app/shared/components/modal/portfolio15/portfolio15.component.ts ***!
  \******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Portfolio15Component: () => (/* binding */ Portfolio15Component)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _icone_divider_icone_divider_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../icone-divider/icone-divider.component */ 99905);


class Portfolio15Component {
  constructor() {}
  ngOnInit() {}
  static {
    this.ɵfac = function Portfolio15Component_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || Portfolio15Component)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: Portfolio15Component,
      selectors: [["app-portfolio15"]],
      standalone: false,
      decls: 19,
      vars: 0,
      consts: [["id", "portfolioModal5", "tabindex", "-1", "role", "dialog", "aria-labelledby", "#portfolioModal5Label", "aria-hidden", "true", 1, "portfolio-modal", "modal", "fade"], ["role", "document", 1, "modal-dialog", "modal-xl"], [1, "modal-content"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", 1, "close"], ["aria-hidden", "true"], [1, "fas", "fa-times"], [1, "modal-body", "text-center"], [1, "container"], [1, "row", "justify-content-center"], [1, "col-lg-8"], [1, "portfolio-modal-title", "text-secondary", "mb-0"], ["src", "assets/portfolio/safe.png", "alt", "Locked Safe", 1, "img-fluid", "rounded", "mb-5"], [1, "mb-5"], ["href", "#", "data-dismiss", "modal", 1, "btn", "btn-primary"], [1, "fas", "fa-times", "fa-fw"]],
      template: function Portfolio15Component_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "button", 3)(4, "span", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "i", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 6)(7, "div", 7)(8, "div", 8)(9, "div", 9)(10, "h2", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Locked Safe");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "app-icone-divider")(13, "img", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "p", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam.");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "button", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "i", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Close Window");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()()()();
        }
      },
      dependencies: [_icone_divider_icone_divider_component__WEBPACK_IMPORTED_MODULE_1__.IconeDividerComponent],
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 4245
/*!*********************************************!*\
  !*** ./src/app/shared/helpers/constants.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   APP_CONFIG: () => (/* binding */ APP_CONFIG),
/* harmony export */   DEFAULT_LOCALE_ID: () => (/* binding */ DEFAULT_LOCALE_ID),
/* harmony export */   EMAIL_REGEX: () => (/* binding */ EMAIL_REGEX),
/* harmony export */   TECHNICAL_EXCEPTION_MSG: () => (/* binding */ TECHNICAL_EXCEPTION_MSG)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 11817);

/**
 * Email regex RFC 2822
 * https://tools.ietf.org/html/rfc2822#section-3.4.1
 */
const EMAIL_REGEX = new RegExp(['(?:[a-zA-Z0-9!#$%&\'*+/=?^_`{|}~-]+(?:.[a-zA-Z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[', '\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e', '-\\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]', '*[a-zA-Z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2', '[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-', '\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])'].join(''));
/**
 * Injection token to configure the application time before savePrecisions request
 */
const APP_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('AppConfig');
const TECHNICAL_EXCEPTION_MSG = '[ERREUR] erreur technique, veuillez réessayer ultérieurement';
const DEFAULT_LOCALE_ID = navigator.language.substr(0, 2);

/***/ },

/***/ 4301
/*!****************************************************************!*\
  !*** ./src/app/features/shopping-cart/shopping-cart.module.ts ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShoppingCartModule: () => (/* binding */ ShoppingCartModule)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _cart_items_cart_items_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cart-items/cart-items.component */ 76204);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/shared.module */ 93887);
/* harmony import */ var _app_features_shopping_cart_shopping_cart_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @app/features/shopping-cart/shopping-cart.routing.module */ 12709);
/* harmony import */ var _app_auth_auth_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @app/auth/auth.module */ 60841);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 36124);






class ShoppingCartModule {
  static {
    this.ɵfac = function ShoppingCartModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ShoppingCartModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
      type: ShoppingCartModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
      imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule, _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormsModule, _app_features_shopping_cart_shopping_cart_routing_module__WEBPACK_IMPORTED_MODULE_3__.ShoppingCartRoutingModule, _app_auth_auth_module__WEBPACK_IMPORTED_MODULE_4__.AuthModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](ShoppingCartModule, {
    declarations: [_cart_items_cart_items_component__WEBPACK_IMPORTED_MODULE_1__.CartItemsComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule, _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormsModule, _app_features_shopping_cart_shopping_cart_routing_module__WEBPACK_IMPORTED_MODULE_3__.ShoppingCartRoutingModule, _app_auth_auth_module__WEBPACK_IMPORTED_MODULE_4__.AuthModule]
  });
})();

/***/ },

/***/ 4906
/*!***************************************************!*\
  !*** ./src/app/features/store/items.selectors.ts ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   selectChosenItems: () => (/* binding */ selectChosenItems),
/* harmony export */   selectExistingCategory: () => (/* binding */ selectExistingCategory),
/* harmony export */   selectItemsState: () => (/* binding */ selectItemsState),
/* harmony export */   selectNbChosenItems: () => (/* binding */ selectNbChosenItems)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ 81383);

function selectItemsState(state) {
  return state.constantine;
}
const selectNbChosenItems = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectItemsState, state => {
  return Object.values(state.categories).flatMap(cat => cat.items.filter(item => item.selected)).reduce((sum, item) => sum + (item.basketInfos?.selectedQuantity ?? 1), 0);
});
const selectChosenItems = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectItemsState, state => {
  return Object.values(state.categories).flatMap(cat => cat.items.filter(item => item.selected));
});
const selectExistingCategory = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectItemsState, state => {
  return Object.fromEntries(Object.entries(state.categories).map(([key, cat]) => [key, {
    name: cat.name,
    title: cat.title
  }]));
});

/***/ },

/***/ 6084
/*!******************************************!*\
  !*** ./src/app/core/store/ui.reducer.ts ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   uiReducer: () => (/* binding */ uiReducer)
/* harmony export */ });
/* harmony import */ var _ui_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui.actions */ 7303);

function initialCurrency() {
  const saved = localStorage.getItem('currency');
  if (saved === 'EUR' || saved === 'XAF') return saved;
  const lang = localStorage.getItem('lang') ?? 'fr';
  return lang === 'fr' ? 'XAF' : 'EUR';
}
const initialState = {
  currency: initialCurrency()
};
function uiReducer(state = initialState, action) {
  switch (action.type) {
    case _ui_actions__WEBPACK_IMPORTED_MODULE_0__.UiActionTypes.SET_CURRENCY:
      return {
        ...state,
        currency: action.payload.currency
      };
    default:
      return state;
  }
}

/***/ },

/***/ 6098
/*!*************************************************!*\
  !*** ./src/app/features/store/catalog/index.ts ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CatalogActionTypes: () => (/* reexport safe */ _catalog_actions__WEBPACK_IMPORTED_MODULE_0__.CatalogActionTypes),
/* harmony export */   CatalogEffects: () => (/* reexport safe */ _catalog_effects__WEBPACK_IMPORTED_MODULE_3__.CatalogEffects),
/* harmony export */   CatalogLoadCategories: () => (/* reexport safe */ _catalog_actions__WEBPACK_IMPORTED_MODULE_0__.CatalogLoadCategories),
/* harmony export */   CatalogLoadCategoriesError: () => (/* reexport safe */ _catalog_actions__WEBPACK_IMPORTED_MODULE_0__.CatalogLoadCategoriesError),
/* harmony export */   CatalogLoadCategoriesSuccess: () => (/* reexport safe */ _catalog_actions__WEBPACK_IMPORTED_MODULE_0__.CatalogLoadCategoriesSuccess),
/* harmony export */   CatalogLoadItemsForCategory: () => (/* reexport safe */ _catalog_actions__WEBPACK_IMPORTED_MODULE_0__.CatalogLoadItemsForCategory),
/* harmony export */   CatalogLoadItemsForCategoryError: () => (/* reexport safe */ _catalog_actions__WEBPACK_IMPORTED_MODULE_0__.CatalogLoadItemsForCategoryError),
/* harmony export */   CatalogLoadItemsForCategorySuccess: () => (/* reexport safe */ _catalog_actions__WEBPACK_IMPORTED_MODULE_0__.CatalogLoadItemsForCategorySuccess),
/* harmony export */   catalogReducer: () => (/* reexport safe */ _catalog_reducer__WEBPACK_IMPORTED_MODULE_1__.catalogReducer),
/* harmony export */   selectAllCategories: () => (/* reexport safe */ _catalog_selectors__WEBPACK_IMPORTED_MODULE_2__.selectAllCategories),
/* harmony export */   selectCatalogLoaded: () => (/* reexport safe */ _catalog_selectors__WEBPACK_IMPORTED_MODULE_2__.selectCatalogLoaded),
/* harmony export */   selectCatalogLoading: () => (/* reexport safe */ _catalog_selectors__WEBPACK_IMPORTED_MODULE_2__.selectCatalogLoading),
/* harmony export */   selectCatalogState: () => (/* reexport safe */ _catalog_selectors__WEBPACK_IMPORTED_MODULE_2__.selectCatalogState),
/* harmony export */   selectHasCatalogItemsFor: () => (/* reexport safe */ _catalog_selectors__WEBPACK_IMPORTED_MODULE_2__.selectHasCatalogItemsFor),
/* harmony export */   selectItemsByCategory: () => (/* reexport safe */ _catalog_selectors__WEBPACK_IMPORTED_MODULE_2__.selectItemsByCategory),
/* harmony export */   selectPublishedCategories: () => (/* reexport safe */ _catalog_selectors__WEBPACK_IMPORTED_MODULE_2__.selectPublishedCategories)
/* harmony export */ });
/* harmony import */ var _catalog_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./catalog.actions */ 95168);
/* harmony import */ var _catalog_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog.reducer */ 13767);
/* harmony import */ var _catalog_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./catalog.selectors */ 90077);
/* harmony import */ var _catalog_effects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./catalog.effects */ 83173);





/***/ },

/***/ 6965
/*!************************************************!*\
  !*** ./src/environments/environment.common.ts ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   URLS: () => (/* binding */ URLS),
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../package.json */ 8330);

const URLS = {
  DEVENIR_PARTENAIRE: '/static/redirect?key=DEVENIR_PARTENAIRE&path='
};
const environment = {
  appName: 'Délice éternel',
  envName: 'COMMON',
  production: false,
  appId: _package_json__WEBPACK_IMPORTED_MODULE_0__.name,
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
    app: _package_json__WEBPACK_IMPORTED_MODULE_0__.version,
    angular: _package_json__WEBPACK_IMPORTED_MODULE_0__.dependencies['@angular/core'],
    ngrx: _package_json__WEBPACK_IMPORTED_MODULE_0__.dependencies['@ngrx/store'],
    material: _package_json__WEBPACK_IMPORTED_MODULE_0__.dependencies['@angular/material'],
    bootstrap: _package_json__WEBPACK_IMPORTED_MODULE_0__.dependencies.bootstrap,
    rxjs: _package_json__WEBPACK_IMPORTED_MODULE_0__.dependencies.rxjs,
    angularCli: _package_json__WEBPACK_IMPORTED_MODULE_0__.devDependencies['@angular/cli'],
    typescript: _package_json__WEBPACK_IMPORTED_MODULE_0__.devDependencies['typescript']
  },
  redux: {
    log: true
  },
  urls: URLS
};

/***/ },

/***/ 7303
/*!******************************************!*\
  !*** ./src/app/core/store/ui.actions.ts ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActionSetCurrency: () => (/* binding */ ActionSetCurrency),
/* harmony export */   UiActionTypes: () => (/* binding */ UiActionTypes)
/* harmony export */ });
var UiActionTypes;
(function (UiActionTypes) {
  UiActionTypes["SET_CURRENCY"] = "[UI] Set currency";
})(UiActionTypes || (UiActionTypes = {}));
class ActionSetCurrency {
  constructor(payload) {
    this.payload = payload;
    this.type = UiActionTypes.SET_CURRENCY;
  }
}

/***/ },

/***/ 7565
/*!***********************************************!*\
  !*** ./src/app/shared/services/roles/list.ts ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ROLES: () => (/* binding */ ROLES)
/* harmony export */ });
const ROLES = {
  ROLE_ADMINISTRATEUR: {
    index: 1,
    value: 'Administrateur'
  },
  ROLE_CONNECTED_USER: {
    index: 2,
    value: 'Connected user'
  },
  ROLE_ANONYMOUSE_USER: {
    index: 3,
    value: 'Anonymouse user'
  }
};

/***/ },

/***/ 7957
/*!****************************************************************!*\
  !*** ./src/app/shared/components/contact/contact.component.ts ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContactComponent: () => (/* binding */ ContactComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _icone_divider_icone_divider_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../icone-divider/icone-divider.component */ 99905);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ 48503);



class ContactComponent {
  constructor() {}
  ngOnInit() {}
  static {
    this.ɵfac = function ContactComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ContactComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: ContactComponent,
      selectors: [["app-contact"]],
      standalone: false,
      decls: 31,
      vars: 9,
      consts: [["id", "contact", 1, "page-section"], [1, "container"], [1, "text-center"], [1, "page-section-heading", "text-secondary", "d-inline-block", "mb-0"], [1, "row", "justify-content-center"], [1, "col-lg-4"], [1, "d-flex", "flex-column", "align-items-center"], [1, "icon-contact", "mb-3"], [1, "fas", "fa-mobile-alt"], [1, "text-muted"], [1, "lead", "font-weight-bold"], [1, "far", "fa-envelope"], ["href", "mailto:delice.eternel.gabon@gmail.com", 1, "lead", "font-weight-bold"], [1, "d-flex", "flex-column", "align-items-center", "social-share"], [1, "sharethis-inline-share-buttons"], [1, "smaller"]],
      template: function ContactComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "app-icone-divider");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 4)(8, "div", 5)(9, "div", 6)(10, "div", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "i", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](14, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "(+241)77601044");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 5)(18, "div", 6)(19, "div", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "i", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](23, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "a", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "delice.eternel.gabon@gmail.com");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 5)(27, "div", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "div", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "app-icone-divider");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "div", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](5, 3, "CONTACT_US"));
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](14, 5, "TELEPHONE"));
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](23, 7, "EMAIL"));
        }
      },
      dependencies: [_icone_divider_icone_divider_component__WEBPACK_IMPORTED_MODULE_1__.IconeDividerComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslatePipe],
      styles: [".social-share[_ngcontent-%COMP%] {\n  padding: 4em;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvY29udGFjdC9jb250YWN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBQTtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLnNvY2lhbC1zaGFyZSB7XG4gICAgcGFkZGluZzogNGVtO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 8197
/*!**************************************************************************!*\
  !*** ./src/app/shared/components/map-template/map-template.component.ts ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MapTemplateComponent: () => (/* binding */ MapTemplateComponent)
/* harmony export */ });
/* harmony import */ var _angular_google_maps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/google-maps */ 33428);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 36124);



const _c0 = ["infoTemplate"];
function MapTemplateComponent_Conditional_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "map-marker", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("mapClick", function MapTemplateComponent_Conditional_0_For_2_Template_map_marker_mapClick_0_listener() {
      const marker_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.openInfo(marker_r2, marker_r2.info));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const marker_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("position", marker_r2.position)("label", marker_r2.label)("title", marker_r2.title)("options", marker_r2.options);
  }
}
function MapTemplateComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "google-map", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrepeaterCreate"](1, MapTemplateComponent_Conditional_0_For_2_Template, 1, 4, "map-marker", 1, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrepeaterTrackByIdentity"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "map-info-window");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("height", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinterpolate"](ctx_r2.mapConfig.size.height))("width", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinterpolate"](ctx_r2.mapConfig.size.width))("zoom", ctx_r2.mapConfig.zoom.initialValue)("center", ctx_r2.center)("options", ctx_r2.options);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrepeater"](ctx_r2.markers);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r2.infoContent);
  }
}
class MapTemplateComponent {
  constructor() {
    this.markers = [];
    this.infoContent = '';
    this.isGoogleMapsLoaded = typeof window['google'] !== 'undefined';
  }
  ngOnInit() {
    if (!this.isGoogleMapsLoaded) return;
    this.options = {
      zoomControl: true,
      scrollwheel: true,
      disableDoubleClickZoom: false,
      // mapTypeId: 'hybrid',
      maxZoom: this.mapConfig.zoom.maxZoom,
      minZoom: this.mapConfig.zoom.minZoom
    };
    navigator.geolocation.getCurrentPosition(() => {
      this.center = {
        lat: this.mapConfig.lat,
        lng: this.mapConfig.lng
      };
    });
    this.addMarker();
  }
  //-- set label(label: string | google.maps.MarkerLabel); --
  addMarker() {
    if (!this.isGoogleMapsLoaded) return;
    this.markers.push({
      position: {
        lat: this.mapConfig.lat,
        lng: this.mapConfig.lng
      },
      label: {
        color: this.mapConfig.companyMarkerColor,
        fontWeight: 'bold',
        text: 'Délice éternel'
      },
      title: this.mapConfig.companyTitle,
      info: 'Prêt à porter, Vente de masques anti covid-19, Bijoux de fantaisie',
      options: {
        animation: window['google'].maps.Animation.BOUNCE,
        opacity: 0.8,
        zIndex: 300
      }
    });
  }
  openInfo(marker, content) {
    this.infoContent = content;
    this.info.open(marker);
  }
  ngAfterViewInit() {
    // this.markers[0].info = this.details.elementRef.nativeElement;
  }
  static {
    this.ɵfac = function MapTemplateComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || MapTemplateComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: MapTemplateComponent,
      selectors: [["app-map-template"]],
      viewQuery: function MapTemplateComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_angular_google_maps__WEBPACK_IMPORTED_MODULE_0__.GoogleMap, 5)(_angular_google_maps__WEBPACK_IMPORTED_MODULE_0__.MapInfoWindow, 5)(_c0, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.map = _t.first);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.info = _t.first);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.details = _t.first);
        }
      },
      inputs: {
        mapConfig: "mapConfig"
      },
      standalone: false,
      decls: 1,
      vars: 1,
      consts: [[3, "height", "width", "zoom", "center", "options"], [3, "position", "label", "title", "options"], [3, "mapClick", "position", "label", "title", "options"]],
      template: function MapTemplateComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵconditionalCreate"](0, MapTemplateComponent_Conditional_0_Template, 5, 8, "google-map", 0);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵconditional"](ctx.isGoogleMapsLoaded ? 0 : -1);
        }
      },
      dependencies: [_angular_google_maps__WEBPACK_IMPORTED_MODULE_0__.GoogleMap, _angular_google_maps__WEBPACK_IMPORTED_MODULE_0__.MapInfoWindow, _angular_google_maps__WEBPACK_IMPORTED_MODULE_0__.MapMarker],
      styles: [".labels[_ngcontent-%COMP%] {\n  color: red;\n  font-weight: bold;\n  margin-left: 10px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvbWFwLXRlbXBsYXRlL21hcC10ZW1wbGF0ZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFVBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIubGFiZWxzIHtcbiAgY29sb3I6IHJlZDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 8330
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"name":"constantine","version":"2.0.7","scripts":{"ng":"ng","generate-groups":"node generate-groups.js","start":"ng serve","build":"ng build","build:prod":"npx standard-version && ng build --configuration production --output-path docs --base-href .","build:firebase":"MSYS_NO_PATHCONV=1 ng build --configuration production --output-path docs --base-href /","build:github":"ng build --configuration production --output-path docs --base-href ./","test":"ng test","lint":"ng lint","test:ci":"ng test --watch false","test:noscourcemap":"ng run test:ci  --reporters spec --sourcemaps=false","lint:fix":"tslint -p src/tsconfig.app.json --fix","clean":"npx rimraf docs","server":"cd docs && http-server","prod":"npm run clean && npm run build:prod && npm run server","ci":"npm run clean && npm run prettier:ci && ng lint && ng test --browser ChromeTravisCi --reporters spec --environment prod && ng e2e && npm run build:travisci","release:master":"npx standard-version && git push --follow-tags origin master","release:integ":"npx standard-version && git push --follow-tags origin integration","prettier":"prettier --single-quote --parser typescript --write \\"./src/**/*.ts\\" && prettier --single-quote --parser scss --write \\"./src/**/*.scss\\"","prettier:ci":"prettier --single-quote --parser typescript --list-different \\"./src/**/*.ts\\" && prettier --single-quote --parser scss --list-different \\"./src/**/*.scss\\"","analyze":"npm run clean && npm run build:prod && npx webpack-bundle-analyzer ./public/stats.json","cloc":"cloc ./src","git:count":"git rev-list --all --count"},"private":true,"dependencies":{"@angular/animations":"^21.0.6","@angular/cdk":"^21.0.5","@angular/common":"^21.0.6","@angular/compiler":"^21.0.6","@angular/core":"^21.0.6","@angular/fire":"^20.0.1","@angular/forms":"^21.0.6","@angular/google-maps":"^20.2.14","@angular/localize":"^21.0.6","@angular/material":"^21.0.5","@angular/platform-browser":"^21.0.6","@angular/platform-browser-dynamic":"^21.0.6","@angular/router":"^21.0.6","@fortawesome/angular-fontawesome":"^0.10.2","@fortawesome/fontawesome-free":"^7.1.0","@ng-bootstrap/ng-bootstrap":"^19.0.1","@ngrx/effects":"^21.0.1","@ngrx/store":"^21.0.1","@ngrx/store-devtools":"^21.0.1","@ngx-translate/core":"^17.0.0","@ngx-translate/http-loader":"^17.0.0","@popperjs/core":"~2.11.8","@types/chart.js":"~2.9.32","animate.css":"~4.1.1","bootstrap":"~5.3.8","chart.js":"~3.3.0","core-js":"~2.6.12","firebase":"^10.14.1","firebaseui":"~4.8.0","hammerjs":"~2.0.8","intl-tel-input":"~17.0.12","jquery":"~3.6.0","jquery.easing":"~1.4.1","lodash":"~4.17.21","log4js":"~6.3.0","ngx-mask":"~17.1.8","ngx-quill":"^30.0.1","postcss":"^8.4.33","quill":"^2.0.3","rxjs":"~7.8.2","tslib":"~2.0.0","typescript-collections":"~1.3.3","zone.js":"~0.15.1"},"devDependencies":{"@angular-devkit/architect":"^0.2100.4","@angular-devkit/build-angular":"^21.0.4","@angular/cli":"^21.0.4","@angular/compiler-cli":"^21.0.6","@angular/language-service":"^21.0.6","@babel/core":"~7.14.3","@ngrx/schematics":"^21.0.1","@types/jasmine":"~3.7.4","@types/jasminewd2":"~2.0.9","@types/lodash":"^4.14.168","@types/node":"^17.0.45","chromedriver":"~91.0.1","cloc":"~2.8.0","concurrently":"~3.5.1","firebase-tools":"^14.27.0","fuzzy":"~0.1.3","husky":"~6.0.0","inquirer":"~6.2.2","inquirer-autocomplete-prompt":"~1.3.0","jasmine-core":"~3.7.1","jasmine-spec-reporter":"~5.0.2","karma":"^6.4.4","karma-chrome-launcher":"~3.1.0","karma-coverage-istanbul-reporter":"~3.0.3","karma-jasmine":"~4.0.0","karma-jasmine-html-reporter":"~1.6.0","prettier":"~2.3.0","sharp":"^0.34.5","standard-version":"~9.3.0","ts-node":"~9.1.1","typescript":"~5.9.3","typescript-string-operations":"~1.4.1"},"husky":{"hooks":{"pre-commit":"npm run lint","pre-push":"npm run test:ci"}}}');

/***/ },

/***/ 8557
/*!************************************************************************************************!*\
  !*** ./src/app/shared/components/advertisements/details/hero-job-add/hero-job-ad.component.ts ***!
  \************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeroJobAdComponent: () => (/* binding */ HeroJobAdComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _ad_header_ad_header_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ad-header/ad-header.component */ 43137);


class HeroJobAdComponent {
  constructor() {}
  ngOnInit() {}
  static {
    this.ɵfac = function HeroJobAdComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || HeroJobAdComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: HeroJobAdComponent,
      selectors: [["app-hero-job-add"]],
      inputs: {
        data: "data"
      },
      standalone: false,
      decls: 1,
      vars: 1,
      consts: [[3, "data"]],
      template: function HeroJobAdComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-ad-header", 0);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", ctx.data);
        }
      },
      dependencies: [_ad_header_ad_header_component__WEBPACK_IMPORTED_MODULE_1__.AdHeaderComponent],
      styles: ["\n\nh1[_ngcontent-%COMP%] {\n  color: #369;\n  font-family: Arial, Helvetica, sans-serif;\n  font-size: 250%;\n}\n\nh2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%] {\n  color: #444;\n  font-family: Arial, Helvetica, sans-serif;\n  font-weight: lighter;\n}\n\nbody[_ngcontent-%COMP%] {\n  margin: 2em;\n}\n\nbody[_ngcontent-%COMP%], input[text][_ngcontent-%COMP%], button[_ngcontent-%COMP%] {\n  color: #333;\n  font-family: Cambria, Georgia;\n}\n\na[_ngcontent-%COMP%] {\n  cursor: pointer;\n  cursor: hand;\n}\n\nbutton[_ngcontent-%COMP%] {\n  font-family: Arial;\n  background-color: #eee;\n  border: none;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer;\n  cursor: hand;\n}\n\nbutton[_ngcontent-%COMP%]:hover {\n  background-color: #cfd8dc;\n}\n\nbutton[_ngcontent-%COMP%]:disabled {\n  background-color: #eee;\n  color: #aaa;\n  cursor: auto;\n}\n\n\n\nnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  padding: 5px 10px;\n  text-decoration: none;\n  margin-right: 10px;\n  margin-top: 10px;\n  display: inline-block;\n  background-color: #eee;\n  border-radius: 4px;\n}\n\nnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:visited, a[_ngcontent-%COMP%]:link {\n  color: #607D8B;\n}\n\nnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #039be5;\n  background-color: #CFD8DC;\n}\n\nnav[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%] {\n  color: #039be5;\n}\n\n\n\n*[_ngcontent-%COMP%] {\n  font-family: Arial, Helvetica, sans-serif;\n}\n\n\n\n\n\n\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvYWR2ZXJ0aXNlbWVudHMvZGV0YWlscy9oZXJvLWpvYi1hZGQvaGVyby1qb2ItYWQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0JBQUE7QUFDQTtFQUNFLFdBQUE7RUFDQSx5Q0FBQTtFQUNBLGVBQUE7QUFDRjs7QUFDQTtFQUNFLFdBQUE7RUFDQSx5Q0FBQTtFQUNBLG9CQUFBO0FBRUY7O0FBQUE7RUFDRSxXQUFBO0FBR0Y7O0FBREE7RUFDRSxXQUFBO0VBQ0EsNkJBQUE7QUFJRjs7QUFGQTtFQUNFLGVBQUE7RUFDQSxZQUFBO0FBS0Y7O0FBSEE7RUFDRSxrQkFBQTtFQUNBLHNCQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtBQU1GOztBQUpBO0VBQ0UseUJBQUE7QUFPRjs7QUFMQTtFQUNFLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFRRjs7QUFMQSwyQkFBQTtBQUNBO0VBQ0UsaUJBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7QUFRRjs7QUFOQTtFQUNFLGNBQUE7QUFTRjs7QUFQQTtFQUNFLGNBQUE7RUFDQSx5QkFBQTtBQVVGOztBQVJBO0VBQ0UsY0FBQTtBQVdGOztBQVJBLG9CQUFBO0FBQ0E7RUFDRSx5Q0FBQTtBQVdGOztBQVBBOzs7O0NBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBHbG9iYWwgU3R5bGVzICovXG5oMSB7XG4gIGNvbG9yOiAjMzY5O1xuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAyNTAlO1xufVxuaDIsIGgzIHtcbiAgY29sb3I6ICM0NDQ7XG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xuICBmb250LXdlaWdodDogbGlnaHRlcjtcbn1cbmJvZHkge1xuICBtYXJnaW46IDJlbTtcbn1cbmJvZHksIGlucHV0W3RleHRdLCBidXR0b24ge1xuICBjb2xvcjogIzMzMztcbiAgZm9udC1mYW1pbHk6IENhbWJyaWEsIEdlb3JnaWE7XG59XG5hIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBjdXJzb3I6IGhhbmQ7XG59XG5idXR0b24ge1xuICBmb250LWZhbWlseTogQXJpYWw7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG4gIGJvcmRlcjogbm9uZTtcbiAgcGFkZGluZzogNXB4IDEwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBjdXJzb3I6IGhhbmQ7XG59XG5idXR0b246aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2ZkOGRjO1xufVxuYnV0dG9uOmRpc2FibGVkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcbiAgY29sb3I6ICNhYWE7XG4gIGN1cnNvcjogYXV0bztcbn1cblxuLyogTmF2aWdhdGlvbiBsaW5rIHN0eWxlcyAqL1xubmF2IGEge1xuICBwYWRkaW5nOiA1cHggMTBweDtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xufVxubmF2IGE6dmlzaXRlZCwgYTpsaW5rIHtcbiAgY29sb3I6ICM2MDdEOEI7XG59XG5uYXYgYTpob3ZlciB7XG4gIGNvbG9yOiAjMDM5YmU1O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQ0ZEOERDO1xufVxubmF2IGEuYWN0aXZlIHtcbiAgY29sb3I6ICMwMzliZTU7XG59XG5cbi8qIGV2ZXJ5d2hlcmUgZWxzZSAqL1xuKiB7XG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xufVxuXG5cbi8qXG5Db3B5cmlnaHQgR29vZ2xlIExMQy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXRcbmNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHA6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiovXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ },

/***/ 12687
/*!***************************************************!*\
  !*** ./src/app/shared/directives/ad.directive.ts ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdDirective: () => (/* binding */ AdDirective)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 36124);

class AdDirective {
  constructor(viewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }
  static {
    this.ɵfac = function AdDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AdDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef));
    };
  }
  static {
    this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
      type: AdDirective,
      selectors: [["", "ad-host", ""]],
      standalone: false
    });
  }
}

/***/ },

/***/ 12709
/*!************************************************************************!*\
  !*** ./src/app/features/shopping-cart/shopping-cart.routing.module.ts ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShoppingCartRoutingModule: () => (/* binding */ ShoppingCartRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 79748);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 46264);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 48418);
/* harmony import */ var _app_features_shopping_cart_shopping_cart_route_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @app/features/shopping-cart/shopping-cart.route.model */ 65891);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 36124);







class ShoppingCartRoutingModule {
  static {
    this.ɵfac = function ShoppingCartRoutingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ShoppingCartRoutingModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
      type: ShoppingCartRoutingModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
      imports: [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbModule, _angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormsModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(_app_features_shopping_cart_shopping_cart_route_model__WEBPACK_IMPORTED_MODULE_4__.shoppingCartRoutes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](ShoppingCartRoutingModule, {
    imports: [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbModule, _angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormsModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ },

/***/ 13767
/*!***********************************************************!*\
  !*** ./src/app/features/store/catalog/catalog.reducer.ts ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   catalogReducer: () => (/* binding */ catalogReducer)
/* harmony export */ });
/* harmony import */ var _catalog_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./catalog.actions */ 95168);

const initialState = {
  categories: [],
  itemsByCategory: {},
  loading: false,
  loaded: false
};
function catalogReducer(state = initialState, action) {
  switch (action.type) {
    case _catalog_actions__WEBPACK_IMPORTED_MODULE_0__.CatalogActionTypes.LOAD_CATEGORIES:
      return {
        ...state,
        loading: true
      };
    case _catalog_actions__WEBPACK_IMPORTED_MODULE_0__.CatalogActionTypes.LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        categories: action.payload
      };
    case _catalog_actions__WEBPACK_IMPORTED_MODULE_0__.CatalogActionTypes.LOAD_CATEGORIES_ERROR:
      return {
        ...state,
        loading: false
      };
    case _catalog_actions__WEBPACK_IMPORTED_MODULE_0__.CatalogActionTypes.LOAD_ITEMS_FOR_CATEGORY_SUCCESS:
      return {
        ...state,
        itemsByCategory: {
          ...state.itemsByCategory,
          [action.payload.categoryId]: action.payload.items
        }
      };
    default:
      return state;
  }
}

/***/ },

/***/ 13775
/*!*********************************************!*\
  !*** ./src/app/features/features.module.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FeaturesModule: () => (/* binding */ FeaturesModule)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ 81383);
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/effects */ 70347);
/* harmony import */ var _app_features_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @app/features/store */ 85730);
/* harmony import */ var _app_features_shopping_cart_shopping_cart_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @app/features/shopping-cart/shopping-cart.module */ 4301);
/* harmony import */ var _app_features_store_catalog_catalog_reducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @app/features/store/catalog/catalog.reducer */ 13767);
/* harmony import */ var _app_features_store_catalog_catalog_effects__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @app/features/store/catalog/catalog.effects */ 83173);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 36124);









class FeaturesModule {
  static {
    this.ɵfac = function FeaturesModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || FeaturesModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({
      type: FeaturesModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
      imports: [_app_features_shopping_cart_shopping_cart_module__WEBPACK_IMPORTED_MODULE_3__.ShoppingCartModule, _ngrx_store__WEBPACK_IMPORTED_MODULE_0__.StoreModule.forFeature('constantine', _app_features_store__WEBPACK_IMPORTED_MODULE_2__.itemsReducer), _ngrx_store__WEBPACK_IMPORTED_MODULE_0__.StoreModule.forFeature('catalog', _app_features_store_catalog_catalog_reducer__WEBPACK_IMPORTED_MODULE_4__.catalogReducer), _ngrx_effects__WEBPACK_IMPORTED_MODULE_1__.EffectsModule.forFeature([_app_features_store__WEBPACK_IMPORTED_MODULE_2__.ItemsEffects, _app_features_store_catalog_catalog_effects__WEBPACK_IMPORTED_MODULE_5__.CatalogEffects])]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](FeaturesModule, {
    imports: [_app_features_shopping_cart_shopping_cart_module__WEBPACK_IMPORTED_MODULE_3__.ShoppingCartModule, _ngrx_store__WEBPACK_IMPORTED_MODULE_0__.StoreFeatureModule, _ngrx_store__WEBPACK_IMPORTED_MODULE_0__.StoreFeatureModule, _ngrx_effects__WEBPACK_IMPORTED_MODULE_1__.EffectsFeatureModule]
  });
})();

/***/ },

/***/ 14687
/*!****************************************************************!*\
  !*** ./src/app/shared/interfaces/advertissement.interfaces.ts ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);


/***/ },

/***/ 18168
/*!****************************************************!*\
  !*** ./src/app/shared/interfaces/currency.type.ts ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);


/***/ },

/***/ 18351
/*!*****************************************************!*\
  !*** ./src/app/shared/interfaces/map.interfaces.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);


/***/ },

/***/ 18675
/*!**************************************************************************!*\
  !*** ./src/app/shared/components/item-details/item-details.component.ts ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ItemDetailsComponent: () => (/* binding */ ItemDetailsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _shared_interfaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/interfaces */ 40787);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 52575);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 91817);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ 12587);
/* harmony import */ var _shared_components_snack_alert_snack_alert_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/components/snack-alert/snack-alert.component */ 22785);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _shared_services_pricing_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @shared/services/pricing.service */ 45212);
/* harmony import */ var _shared_services_stock_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @shared/services/stock.service */ 81676);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/snack-bar */ 3347);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 79748);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngx-translate/core */ 48503);















function ItemDetailsComponent_Conditional_3_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ItemDetailsComponent_Conditional_3_Conditional_5_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.prevImage());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "\u2039");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ItemDetailsComponent_Conditional_3_Conditional_5_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.nextImage());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, "\u203A");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
function ItemDetailsComponent_Conditional_3_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "img", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ItemDetailsComponent_Conditional_3_Conditional_6_For_2_Template_img_click_0_listener() {
      const ɵ$index_28_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4).$index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.selectImage(ɵ$index_28_r5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const img_r6 = ctx.$implicit;
    const ɵ$index_28_r5 = ctx.$index;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵclassProp"]("gallery-thumb--active", ɵ$index_28_r5 === ctx_r1.selectedImageIndex);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("src", img_r6, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsanitizeUrl"])("alt", "Vue " + (ɵ$index_28_r5 + 1));
  }
}
function ItemDetailsComponent_Conditional_3_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrepeaterCreate"](1, ItemDetailsComponent_Conditional_3_Conditional_6_For_2_Template, 1, 4, "img", 32, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrepeaterTrackByIdentity"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrepeater"](ctx_r1.images);
  }
}
function ItemDetailsComponent_Conditional_3_p_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "p", 14)(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](3, 2, "PRODUCTS.CATEGORY"), ":");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("\u00A0 ", (tmp_3_0 = ctx_r1.itemGroup.get("category")) == null ? null : tmp_3_0.value, " ");
  }
}
function ItemDetailsComponent_Conditional_3_For_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "option", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const s_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", s_r7.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](s_r7.label);
  }
}
function ItemDetailsComponent_Conditional_3_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "i", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](3, 1, "REMOVE_FROM_CART"));
  }
}
function ItemDetailsComponent_Conditional_3_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "i", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](3, 1, "OUT_OF_STOCK"));
  }
}
function ItemDetailsComponent_Conditional_3_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "i", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](3, 1, "ADD_TO_CART"));
  }
}
function ItemDetailsComponent_Conditional_3_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "small", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("", ctx_r1.pricing.format(ctx_r1.data.price), " / unit\u00E9");
  }
}
function ItemDetailsComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 1)(1, "div", 3)(2, "div", 4)(3, "div", 5)(4, "img", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ItemDetailsComponent_Conditional_3_Template_img_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.openLightbox());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵconditionalCreate"](5, ItemDetailsComponent_Conditional_3_Conditional_5_Template, 4, 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵconditionalCreate"](6, ItemDetailsComponent_Conditional_3_Conditional_6_Template, 3, 0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "div", 8)(8, "div")(9, "div", 9)(10, "div")(11, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](13, ItemDetailsComponent_Conditional_3_p_13_Template, 5, 4, "p", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](14, "p", 11)(15, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](18, "\u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](19, "select", 12)(20, "option", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](22, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](23, "p", 14)(24, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](26, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](27, "\u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](28, "select", 15)(29, "option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](30);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](31, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrepeaterCreate"](32, ItemDetailsComponent_Conditional_3_For_33_Template, 2, 2, "option", 17, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrepeaterTrackByIdentity"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](34, "div", 18)(35, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ItemDetailsComponent_Conditional_3_Template_button_click_35_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.stepDown());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](36, "input", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](37, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ItemDetailsComponent_Conditional_3_Template_button_click_37_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.stepUp());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](38, "div", 22)(39, "div")(40, "a", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ItemDetailsComponent_Conditional_3_Template_a_click_40_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](!ctx_r1.isOutOfStock || ctx_r1.selected ? ctx_r1.toogleSelect() : null);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵconditionalCreate"](41, ItemDetailsComponent_Conditional_3_Conditional_41_Template, 4, 3)(42, ItemDetailsComponent_Conditional_3_Conditional_42_Template, 4, 3)(43, ItemDetailsComponent_Conditional_3_Conditional_43_Template, 4, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](44, "a", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ItemDetailsComponent_Conditional_3_Template_a_click_44_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.close());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](45, "i", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](46);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](47, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](48, "div", 26)(49, "p", 27)(50, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](51);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵconditionalCreate"](52, ItemDetailsComponent_Conditional_3_Conditional_52_Template, 2, 1, "small", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](53, "hr", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_19_0;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("formGroup", ctx_r1.itemGroup);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("src", ctx_r1.currentImage, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsanitizeUrl"])("alt", (tmp_3_0 = ctx_r1.itemGroup.get("reference")) == null ? null : tmp_3_0.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵconditional"](ctx_r1.images.length > 1 ? 5 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵconditional"](ctx_r1.images.length > 1 ? 6 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"]((tmp_6_0 = ctx_r1.itemGroup.get("reference")) == null ? null : tmp_6_0.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ((tmp_7_0 = ctx_r1.itemGroup.get("category")) == null ? null : tmp_7_0.value) !== "UNKNOWN");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](17, 21, "PRODUCTS.MODEL"), ":");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](22, 23, "PRODUCTS.UNIQUE_MODEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](26, 25, "PRODUCTS.SIZES"), ":");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](31, 27, "CHOOSE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrepeater"](ctx_r1.sizes);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵclassMap"](ctx_r1.selected ? "card-link-secondary small text-uppercase btn btn-remove-cart" : "card-link-secondary small text-uppercase btn btn-add-cart");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵstyleProp"]("opacity", ctx_r1.isOutOfStock && !ctx_r1.selected ? "0.4" : "1")("cursor", ctx_r1.isOutOfStock && !ctx_r1.selected ? "not-allowed" : "pointer");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵconditional"](ctx_r1.selected ? 41 : ctx_r1.isOutOfStock ? 42 : 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](47, 29, "CLOSE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx_r1.totalPrice);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵconditional"]((((tmp_19_0 = ctx_r1.itemGroup.get("basketInfos.selectedQuantity")) == null ? null : tmp_19_0.value) || 1) > 1 ? 52 : -1);
  }
}
function ItemDetailsComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ItemDetailsComponent_Conditional_4_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.closeLightbox());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "img", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ItemDetailsComponent_Conditional_4_Template_img_click_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "button", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ItemDetailsComponent_Conditional_4_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r1.closeLightbox());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("src", ctx_r1.lightboxSrc, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsanitizeUrl"]);
  }
}
class ItemDetailsComponent {
  get isOutOfStock() {
    return this.stock.isOutOfStock(this.data.reference);
  }
  get currentImage() {
    return this.images[this.selectedImageIndex];
  }
  get totalPrice() {
    const qty = this.itemGroup?.get('basketInfos.selectedQuantity')?.value || 1;
    return this.pricing.format(this.data.price * qty);
  }
  constructor(fb, dialogRef, data, pricing, stock, snackBar) {
    this.fb = fb;
    this.dialogRef = dialogRef;
    this.data = data;
    this.pricing = pricing;
    this.stock = stock;
    this.snackBar = snackBar;
    this.sizes = _shared_interfaces__WEBPACK_IMPORTED_MODULE_2__.ITEM_SIZES;
    this.images = [];
    this.selectedImageIndex = 0;
    this.lightboxSrc = null;
    this.updateBasketItem = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.selected = false;
    this.images = (data.images?.length ?? 0) > 0 ? data.images : [data.path];
    this.initForm(data);
  }
  selectImage(index) {
    this.selectedImageIndex = index;
  }
  prevImage() {
    this.selectedImageIndex = (this.selectedImageIndex - 1 + this.images.length) % this.images.length;
  }
  nextImage() {
    this.selectedImageIndex = (this.selectedImageIndex + 1) % this.images.length;
  }
  initForm(infos) {
    this.selected = infos.selected;
    this.itemGroup = this.fb.group({
      path: [infos.path],
      selected: [infos.selected],
      reference: [infos.reference],
      index: [infos.index],
      category: [infos.category],
      loading: [false],
      basketInfos: this.fb.group({
        selectedQuantity: [infos.basketInfos?.selectedQuantity, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required],
        selectedSize: [infos.basketInfos?.selectedSize ?? _shared_interfaces__WEBPACK_IMPORTED_MODULE_2__.ItemSizeEnum.M, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required],
        selectedModel: [infos.basketInfos?.selectedModel ?? '', _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required]
      })
    });
    this.itemGroup.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.debounceTime)(200), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.distinctUntilChanged)((a, b) => JSON.stringify(a) === JSON.stringify(b))).subscribe(() => {
      this.selected = false;
    });
  }
  stepUp() {
    this.stock.fetchAvailable(this.data.reference).subscribe(available => {
      const currentQty = this.itemGroup.get('basketInfos.selectedQuantity')?.value || 0;
      if (available > currentQty) {
        this.itemGroup.get('basketInfos.selectedQuantity').setValue(currentQty + 1);
      } else {
        this.snackBar.openFromComponent(_shared_components_snack_alert_snack_alert_component__WEBPACK_IMPORTED_MODULE_6__.SnackAlertComponent, {
          duration: 3000,
          data: {
            message: 'Stock insuffisant — quantité maximale atteinte.',
            type: 'error'
          },
          politeness: 'assertive'
        });
      }
    });
  }
  stepDown() {
    const value = this.itemGroup.get('basketInfos.selectedQuantity')?.value || 0;
    if (value > 1) {
      this.itemGroup.get('basketInfos.selectedQuantity').setValue(value - 1);
    }
  }
  toogleSelect() {
    this.selected = !this.selected;
    if (this.selected) {
      this.updateBasketItem.emit({
        ...this.itemGroup.getRawValue(),
        selected: true
      });
    } else {
      this.updateBasketItem.emit({
        ...this.data,
        selected: false
      });
    }
  }
  openLightbox() {
    this.lightboxSrc = this.currentImage;
  }
  closeLightbox() {
    this.lightboxSrc = null;
  }
  close() {
    this.dialogRef.close();
  }
  static {
    this.ɵfac = function ItemDetailsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ItemDetailsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__.UntypedFormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MAT_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_pricing_service__WEBPACK_IMPORTED_MODULE_8__.PricingService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_stock_service__WEBPACK_IMPORTED_MODULE_9__.StockService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_10__.MatSnackBar));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
      type: ItemDetailsComponent,
      selectors: [["app-item-details"]],
      outputs: {
        updateBasketItem: "updateBasketItem"
      },
      standalone: false,
      decls: 5,
      vars: 2,
      consts: [[1, "container"], [1, "card-body", 3, "formGroup"], [1, "lightbox-overlay"], [1, "row", "mb-lg-12"], [1, "col-md-7", "col-lg-5", "col-xl-5"], [1, "view", "zoom", "overlay", "z-depth-1", "rounded", "mb-2", "position-relative"], [1, "img-fluid", "w-100", 2, "cursor", "zoom-in", 3, "click", "src", "alt"], [1, "gallery-thumbnails"], ["formGroupName", "basketInfos", 1, "col-md-5", "col-lg-7", "col-xl-7"], [1, "d-flex", "justify-content-between"], ["class", "mb-3 text-muted text-uppercase small", 4, "ngIf"], [1, "mb-2", "text-muted", "text-uppercase", "small"], ["type", "text", "id", "selectedModel", "name", "selectedModel", "formControlName", "selectedModel", 1, "form-control"], ["value", "MODEL_UNIQUE", "selected", ""], [1, "mb-3", "text-muted", "text-uppercase", "small"], ["id", "selectedSize", "name", "selectedSize", "formControlName", "selectedSize", "tabindex", "2", 1, "form-control"], ["disabled", "", "selected", "", "value", ""], [3, "value"], [1, "def-number-input", "number-input", "safari_only", "mb-0"], [1, "minus", 3, "click"], ["name", "selectedQuantity", "value", "1", "type", "number", "formControlName", "selectedQuantity", 1, "quantity"], [1, "plus", 3, "click"], [1, "d-flex", "justify-content-between", "align-items-center"], ["type", "button", 3, "click"], ["type", "button", 1, "card-link-secondary", "small", "text-uppercase", "btn", "btn-close-detail", 3, "click"], [1, "fas", "fa-times-circle", "mr-1"], [1, "text-right"], [1, "mb-0"], [1, "text-muted"], [1, "mb-4"], ["type", "button", 1, "gallery-nav", "gallery-nav--prev", 3, "click"], ["type", "button", 1, "gallery-nav", "gallery-nav--next", 3, "click"], ["loading", "lazy", 1, "gallery-thumb", 3, "gallery-thumb--active", "src", "alt"], ["loading", "lazy", 1, "gallery-thumb", 3, "click", "src", "alt"], [1, "fas", "fa-trash-alt", "mr-1"], [1, "fas", "fa-ban", "mr-1"], [1, "fas", "fa-shopping-cart", "mr-1"], [1, "lightbox-overlay", 3, "click"], [1, "lightbox-img", 3, "click", "src"], [1, "lightbox-close", 3, "click"]],
      template: function ItemDetailsComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "main")(1, "div", 0)(2, "section");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵconditionalCreate"](3, ItemDetailsComponent_Conditional_3_Template, 54, 31, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵconditionalCreate"](4, ItemDetailsComponent_Conditional_4_Template, 4, 1, "div", 2);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵconditional"](ctx.itemGroup ? 3 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵconditional"](ctx.lightboxSrc ? 4 : -1);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroupName, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslatePipe],
      styles: [".gallery-thumbnails[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n  margin-bottom: 12px;\n}\n\n.gallery-thumb[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  object-fit: cover;\n  border-radius: 4px;\n  cursor: pointer;\n  border: 2px solid transparent;\n  opacity: 0.7;\n  transition: opacity 0.2s, border-color 0.2s;\n}\n.gallery-thumb[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n.gallery-thumb--active[_ngcontent-%COMP%] {\n  border-color: #c8a96e;\n  opacity: 1;\n}\n\n.gallery-nav[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  background: rgba(0, 0, 0, 0.45);\n  color: #fff;\n  border: none;\n  border-radius: 50%;\n  width: 32px;\n  height: 32px;\n  font-size: 1.4rem;\n  line-height: 1;\n  cursor: pointer;\n  z-index: 10;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.gallery-nav--prev[_ngcontent-%COMP%] {\n  left: 6px;\n}\n.gallery-nav--next[_ngcontent-%COMP%] {\n  right: 6px;\n}\n.gallery-nav[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 0, 0, 0.7);\n}\n\n.btn-add-cart[_ngcontent-%COMP%] {\n  background-color: #f5c400;\n  color: #000;\n  border: none;\n  font-weight: 600;\n}\n.btn-add-cart[_ngcontent-%COMP%]:hover {\n  background-color: #e0b300;\n  color: #000;\n}\n\n.btn-remove-cart[_ngcontent-%COMP%] {\n  background-color: #f8d7da;\n  color: #721c24;\n  border: none;\n  font-weight: 600;\n}\n.btn-remove-cart[_ngcontent-%COMP%]:hover {\n  background-color: #f1aeb5;\n  color: #721c24;\n}\n\n.close[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  color: #333;\n  opacity: 1;\n}\n.close[_ngcontent-%COMP%]:hover {\n  color: #000;\n}\n\n.btn-close-detail[_ngcontent-%COMP%] {\n  background-color: #fff !important;\n  color: #000 !important;\n  border: 1px solid #ccc !important;\n  font-weight: 500;\n}\n.btn-close-detail[_ngcontent-%COMP%]:hover {\n  background-color: #f0f0f0 !important;\n  color: #000 !important;\n}\n\n.number-input[_ngcontent-%COMP%] {\n  height: 35px !important;\n}\n\n.container[_ngcontent-%COMP%] {\n  min-width: 320px;\n}\n\n.btn[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n}\n\n@media (max-width: 690px) {\n  .d-flex[_ngcontent-%COMP%] {\n    display: block !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    font-size: 0.7rem;\n  }\n  .container[_ngcontent-%COMP%] {\n    max-width: 520px;\n    padding-left: 0;\n    padding-right: 0;\n  }\n  .col-md-7[_ngcontent-%COMP%] {\n    padding-left: 0 !important;\n    padding-right: 0 !important;\n  }\n  .view[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    width: 100% !important;\n    max-width: 100% !important;\n    height: auto;\n    display: block;\n    object-fit: contain;\n  }\n}\n@media (min-width: 691px) {\n  .container[_ngcontent-%COMP%] {\n    min-width: 832px;\n  }\n}\n.lightbox-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.88);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n  cursor: zoom-out;\n}\n\n.lightbox-img[_ngcontent-%COMP%] {\n  max-width: 90vw;\n  max-height: 90vh;\n  object-fit: contain;\n  border-radius: 4px;\n  cursor: default;\n}\n\n.lightbox-close[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 16px;\n  right: 20px;\n  background: transparent;\n  border: none;\n  color: #fff;\n  font-size: 2rem;\n  cursor: pointer;\n  line-height: 1;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvaXRlbS1kZXRhaWxzL2l0ZW0tZGV0YWlscy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxRQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsNkJBQUE7RUFDQSxZQUFBO0VBQ0EsMkNBQUE7QUFDRjtBQUNFO0VBQVUsVUFBQTtBQUVaO0FBQUU7RUFDRSxxQkFBQTtFQUNBLFVBQUE7QUFFSjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLDJCQUFBO0VBQ0EsK0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBQ0Y7QUFDRTtFQUFVLFNBQUE7QUFFWjtBQURFO0VBQVUsVUFBQTtBQUlaO0FBRkU7RUFBVSw4QkFBQTtBQUtaOztBQUZBO0VBQ0UseUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FBS0Y7QUFIRTtFQUNFLHlCQUFBO0VBQ0EsV0FBQTtBQUtKOztBQURBO0VBQ0UseUJBQUE7RUFDQSxjQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FBSUY7QUFGRTtFQUNFLHlCQUFBO0VBQ0EsY0FBQTtBQUlKOztBQUFBO0VBQ0UsaUJBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtBQUdGO0FBREU7RUFBVSxXQUFBO0FBSVo7O0FBREE7RUFDRSxpQ0FBQTtFQUNBLHNCQUFBO0VBQ0EsaUNBQUE7RUFDQSxnQkFBQTtBQUlGO0FBRkU7RUFDRSxvQ0FBQTtFQUNBLHNCQUFBO0FBSUo7O0FBQUE7RUFDRSx1QkFBQTtBQUdGOztBQUFBO0VBQ0UsZ0JBQUE7QUFHRjs7QUFBQTtFQUNFLGlCQUFBO0FBR0Y7O0FBQUE7RUFDRTtJQUNFLHlCQUFBO0VBR0Y7RUFEQTtJQUNFLGlCQUFBO0VBR0Y7RUFEQTtJQUNFLGdCQUFBO0lBQ0EsZUFBQTtJQUNBLGdCQUFBO0VBR0Y7RUFEQTtJQUNFLDBCQUFBO0lBQ0EsMkJBQUE7RUFHRjtFQURBO0lBQ0Usc0JBQUE7SUFDQSwwQkFBQTtJQUNBLFlBQUE7SUFDQSxjQUFBO0lBQ0EsbUJBQUE7RUFHRjtBQUNGO0FBQUE7RUFDRTtJQUNFLGdCQUFBO0VBRUY7QUFDRjtBQUNBO0VBQ0UsZUFBQTtFQUNBLFFBQUE7RUFDQSwrQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtBQUNGOztBQUVBO0VBQ0UsZUFBQTtFQUNBLFNBQUE7RUFDQSxXQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLmdhbGxlcnktdGh1bWJuYWlscyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogNnB4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG59XG5cbi5nYWxsZXJ5LXRodW1iIHtcbiAgd2lkdGg6IDU2cHg7XG4gIGhlaWdodDogNTZweDtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBib3JkZXI6IDJweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgb3BhY2l0eTogMC43O1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnMsIGJvcmRlci1jb2xvciAwLjJzO1xuXG4gICY6aG92ZXIgeyBvcGFjaXR5OiAxOyB9XG5cbiAgJi0tYWN0aXZlIHtcbiAgICBib3JkZXItY29sb3I6ICNjOGE5NmU7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxufVxuXG4uZ2FsbGVyeS1uYXYge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNTAlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC40NSk7XG4gIGNvbG9yOiAjZmZmO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgd2lkdGg6IDMycHg7XG4gIGhlaWdodDogMzJweDtcbiAgZm9udC1zaXplOiAxLjRyZW07XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHotaW5kZXg6IDEwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblxuICAmLS1wcmV2IHsgbGVmdDogNnB4OyB9XG4gICYtLW5leHQgeyByaWdodDogNnB4OyB9XG5cbiAgJjpob3ZlciB7IGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC43KTsgfVxufVxuXG4uYnRuLWFkZC1jYXJ0IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1YzQwMDtcbiAgY29sb3I6ICMwMDA7XG4gIGJvcmRlcjogbm9uZTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcblxuICAmOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTBiMzAwO1xuICAgIGNvbG9yOiAjMDAwO1xuICB9XG59XG5cbi5idG4tcmVtb3ZlLWNhcnQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhkN2RhO1xuICBjb2xvcjogIzcyMWMyNDtcbiAgYm9yZGVyOiBub25lO1xuICBmb250LXdlaWdodDogNjAwO1xuXG4gICY6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmMWFlYjU7XG4gICAgY29sb3I6ICM3MjFjMjQ7XG4gIH1cbn1cblxuLmNsb3NlIHtcbiAgZm9udC1zaXplOiAxLjJyZW07XG4gIGNvbG9yOiAjMzMzO1xuICBvcGFjaXR5OiAxO1xuXG4gICY6aG92ZXIgeyBjb2xvcjogIzAwMDsgfVxufVxuXG4uYnRuLWNsb3NlLWRldGFpbCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmYgIWltcG9ydGFudDtcbiAgY29sb3I6ICMwMDAgIWltcG9ydGFudDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYyAhaW1wb3J0YW50O1xuICBmb250LXdlaWdodDogNTAwO1xuXG4gICY6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmMGYwZjAgIWltcG9ydGFudDtcbiAgICBjb2xvcjogIzAwMCAhaW1wb3J0YW50O1xuICB9XG59XG5cbi5udW1iZXItaW5wdXQge1xuICBoZWlnaHQ6IDM1cHghaW1wb3J0YW50O1xufVxuXG4uY29udGFpbmVyIHtcbiAgbWluLXdpZHRoOiAzMjBweFxufVxuXG4uYnRuIHtcbiAgZm9udC1zaXplOiAwLjdyZW07XG59XG5cbkBtZWRpYShtYXgtd2lkdGg6IDY5MHB4KSB7XG4gIC5kLWZsZXgge1xuICAgIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XG4gIH1cbiAgLmJ0biB7XG4gICAgZm9udC1zaXplOiAwLjdyZW07XG4gIH1cbiAgLmNvbnRhaW5lciB7XG4gICAgbWF4LXdpZHRoOiA1MjBweDtcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gICAgcGFkZGluZy1yaWdodDogMDtcbiAgfVxuICAuY29sLW1kLTcge1xuICAgIHBhZGRpbmctbGVmdDogMCAhaW1wb3J0YW50O1xuICAgIHBhZGRpbmctcmlnaHQ6IDAgIWltcG9ydGFudDtcbiAgfVxuICAudmlldyBpbWcge1xuICAgIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG4gICAgbWF4LXdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG4gICAgaGVpZ2h0OiBhdXRvO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gIH1cbn1cblxuQG1lZGlhKG1pbi13aWR0aDogNjkxcHgpIHtcbiAgLmNvbnRhaW5lciB7XG4gICAgbWluLXdpZHRoOiA4MzJweDtcbiAgfVxufVxuXG4ubGlnaHRib3gtb3ZlcmxheSB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgaW5zZXQ6IDA7XG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC44OCk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB6LWluZGV4OiA5OTk5O1xuICBjdXJzb3I6IHpvb20tb3V0O1xufVxuXG4ubGlnaHRib3gtaW1nIHtcbiAgbWF4LXdpZHRoOiA5MHZ3O1xuICBtYXgtaGVpZ2h0OiA5MHZoO1xuICBvYmplY3QtZml0OiBjb250YWluO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGN1cnNvcjogZGVmYXVsdDtcbn1cblxuLmxpZ2h0Ym94LWNsb3NlIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDE2cHg7XG4gIHJpZ2h0OiAyMHB4O1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC1zaXplOiAycmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGxpbmUtaGVpZ2h0OiAxO1xufVxuXG5cblxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 20092
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _app_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @app/core */ 48672);
/* harmony import */ var _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @app/auth/store/auth.actions */ 2520);
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/compat/app */ 3602);
/* harmony import */ var firebase_compat_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/compat/auth */ 12043);
/* harmony import */ var firebase_compat_database__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase/compat/database */ 36994);
/* harmony import */ var _env_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @env/environment */ 45312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 83305);
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/fire/auth */ 99082);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngrx/store */ 81383);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _shared_services_seo_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @shared/services/seo.service */ 42375);
/* harmony import */ var _shared_components_contact_contact_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./shared/components/contact/contact.component */ 7957);
/* harmony import */ var _shared_components_about_about_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./shared/components/about/about.component */ 49949);
/* harmony import */ var _shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./shared/components/header/header.component */ 89381);
/* harmony import */ var _shared_components_footer_footer_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./shared/components/footer/footer.component */ 71765);
/* harmony import */ var _shared_components_navigation_navigation_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./shared/components/navigation/navigation.component */ 75839);

















class AppComponent {
  constructor(router, auth, store, translate, seo) {
    this.router = router;
    this.auth = auth;
    this.store = store;
    this.translate = translate;
    this.title = 'Délice éternel';
    seo.init();
    if (!firebase_compat_app__WEBPACK_IMPORTED_MODULE_2__["default"].apps.length) {
      firebase_compat_app__WEBPACK_IMPORTED_MODULE_2__["default"].initializeApp(_env_environment__WEBPACK_IMPORTED_MODULE_5__.environment.firebaseConfig);
    }
    this.translate.addLangs(['fr', 'en']);
    this.translate.setDefaultLang('fr');
    this.translate.use(localStorage.getItem('lang') || 'fr');
  }
  ngOnInit() {
    this.store.dispatch(new _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthRefreshUserToken());
  }
  static {
    this.ɵfac = function AppComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_fire_auth__WEBPACK_IMPORTED_MODULE_8__.Auth), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_9__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_shared_services_seo_service__WEBPACK_IMPORTED_MODULE_11__.SeoService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
      type: AppComponent,
      selectors: [["app-root"]],
      standalone: false,
      decls: 6,
      vars: 0,
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "app-navigation")(1, "app-header")(2, "router-outlet")(3, "app-about")(4, "app-contact")(5, "app-footer");
        }
      },
      dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterOutlet, _shared_components_contact_contact_component__WEBPACK_IMPORTED_MODULE_12__.ContactComponent, _shared_components_about_about_component__WEBPACK_IMPORTED_MODULE_13__.AboutComponent, _shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_14__.HeaderComponent, _shared_components_footer_footer_component__WEBPACK_IMPORTED_MODULE_15__.FooterComponent, _shared_components_navigation_navigation_component__WEBPACK_IMPORTED_MODULE_16__.NavigationComponent],
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"],
      data: {
        animation: [_app_core__WEBPACK_IMPORTED_MODULE_0__.routerTransition]
      }
    });
  }
}

/***/ },

/***/ 22785
/*!************************************************************************!*\
  !*** ./src/app/shared/components/snack-alert/snack-alert.component.ts ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SnackAlertComponent: () => (/* binding */ SnackAlertComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/snack-bar */ 3347);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ 48503);



class SnackAlertComponent {
  constructor(data) {
    this.message = data?.message ?? 'COMMAND_SENT_MSG';
    this.type = data?.type ?? 'success';
  }
  static {
    this.ɵfac = function SnackAlertComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || SnackAlertComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_0__.MAT_SNACK_BAR_DATA, 8));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: SnackAlertComponent,
      selectors: [["app-snack-alert"]],
      standalone: false,
      decls: 5,
      vars: 5,
      consts: [["role", "alert", "aria-live", "assertive", "aria-atomic", "true", 1, "snack-alert"], ["src", "assets/style-sauvage_only_logo-removebg.png", "height", "40px", "alt", "logo"]],
      template: function SnackAlertComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "img", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "strong");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("snack-alert--error", ctx.type === "error");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.type === "success" ? _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](4, 3, ctx.message) : ctx.message);
        }
      },
      dependencies: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslatePipe],
      styles: [".snack-alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n\n.snack-alert[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #fff;\n  font-size: 14px;\n}\n\n.snack-alert--error[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #ff6b6b;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvc25hY2stYWxlcnQvc25hY2stYWxlcnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsU0FBUztBQUNYOztBQUVBO0VBQ0UsV0FBVztFQUNYLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCIiwic291cmNlc0NvbnRlbnQiOlsiLnNuYWNrLWFsZXJ0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xufVxuXG4uc25hY2stYWxlcnQgc3Ryb25nIHtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuLnNuYWNrLWFsZXJ0LS1lcnJvciBzdHJvbmcge1xuICBjb2xvcjogI2ZmNmI2Yjtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ },

/***/ 25708
/*!**********************************************!*\
  !*** ./src/app/shared/helpers/misc.class.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Misc: () => (/* binding */ Misc)
/* harmony export */ });
class Misc {
  // Compare two items
  static compare(item1, item2) {
    // Get the object type
    const itemType = Object.prototype.toString.call(item1);
    // If an object or array, compare recursively
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
      if (!this.isEqual(item1, item2)) {
        return false;
      }
    } else {
      // If the two items are not the same type, return false
      if (itemType !== Object.prototype.toString.call(item2)) {
        return false;
      }
      // Else if it's a function, convert to a string and compare
      // Otherwise, just compare
      if (itemType === '[object Function]') {
        if (item1.toString() !== item2.toString()) {
          return false;
        }
      } else {
        if (item1 !== item2) {
          return false;
        }
      }
    }
    return true;
  }
  static isEqual(value, other) {
    // Get the value type
    const type = Object.prototype.toString.call(value);
    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other)) {
      return false;
    }
    // If items are not an object or array, return false
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) {
      return false;
    }
    // Compare the length of the length of the two items
    const valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
    const otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) {
      return false;
    }
    // Compare properties
    if (type === '[object Array]') {
      for (let i = 0; i < valueLen; i++) {
        if (this.compare(value[i], other[i]) === false) {
          return false;
        }
      }
    } else {
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
          if (this.compare(value[key], other[key]) === false) {
            return false;
          }
        }
      }
    }
    // If nothing failed, return true
    return true;
  }
  static toCapitalize(value) {
    if (value === 'undefined' || value.length === 0) {
      return '';
    }
    const v = value.slice(1);
    return value.charAt(0).toUpperCase() + (v ? v.toLowerCase() : '');
  }
  /**
   * Method used to remove spaces in a string
   * @param {string} value The value
   * @returns {string} The values without spaces
   */
  static removeSpaces(value) {
    return value.replace(/ /g, '');
  }
}

/***/ },

/***/ 26003
/*!*****************************************************************************!*\
  !*** ./src/app/core/meta-reducers/init-state-from-local-storage.reducer.ts ***!
  \*****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initStateFromLocalStorage: () => (/* binding */ initStateFromLocalStorage)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ 81383);
/* harmony import */ var _local_storage_local_storage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../local-storage/local-storage.service */ 92570);


function initStateFromLocalStorage(reducer) {
  return function (state, action) {
    const newState = reducer(state, action);
    if ([_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.INIT.toString(), _ngrx_store__WEBPACK_IMPORTED_MODULE_0__.UPDATE.toString()].includes(action.type)) {
      return {
        ...newState,
        ..._local_storage_local_storage_service__WEBPACK_IMPORTED_MODULE_1__.LocalStorageService.loadInitialState()
      };
    }
    return newState;
  };
}

/***/ },

/***/ 26497
/*!*****************************************************!*\
  !*** ./src/app/shared/services/api/auth.service.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthService: () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ 81383);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 91817);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var _app_auth_store_auth_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @app/auth/store/auth.selectors */ 2981);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 50698);







class AuthService {
  constructor(http, store) {
    this.http = http;
    this.store = store;
    this.current = null;
    this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.select)(_app_auth_store_auth_selectors__WEBPACK_IMPORTED_MODULE_3__.selectUser), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.filter)(user => !!user), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.distinctUntilChanged)()).subscribe(user => {
      this.current = user ?? null;
    });
  }
  /**
   * Authentifier un utilisateur
   * @param username Nom d'utilisateur
   * @param password Mot de passe
   */
  login(username, password) {
    return this.http.post('/login', {
      email: username,
      password: 'CryptoJS.SHA512(password).toString(CryptoJS.enc.Base64)'
    });
  }
  /**
   * Se déconnecter de l'application
   */
  logout() {
    return this.http.post('/logout', {});
  }
  static {
    this.ɵfac = function AuthService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.Store));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
      token: AuthService,
      factory: AuthService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 27584
/*!************************************************!*\
  !*** ./src/app/features/store/itemsReducer.ts ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   itemsReducer: () => (/* binding */ itemsReducer)
/* harmony export */ });
/* harmony import */ var _app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @app/features/store/items.actions */ 70671);
/* harmony import */ var _helpers_store_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @helpers/store.utils */ 95874);
/* harmony import */ var _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @app/auth/store/auth.actions */ 2520);



const initialState = {
  categories: {}
};
function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_2__.AuthActionTypes.LOGOUT:
    case _app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_0__.ItemsActionTypes.CLEAR_BASKET:
      return {
        categories: Object.fromEntries(Object.entries(state.categories).map(([key, cat]) => [key, {
          ...cat,
          items: cat.items.map(i => ({
            ...i,
            selected: false
          }))
        }]))
      };
    case _app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_0__.ItemsActionTypes.TOOGLE_SELECT_ITEM_NOT_SELECTED:
      return (0,_helpers_store_utils__WEBPACK_IMPORTED_MODULE_1__.toogleSelectItem)(state, action.payload, true);
    case _app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_0__.ItemsActionTypes.TOOGLE_SELECT_ITEM:
      return (0,_helpers_store_utils__WEBPACK_IMPORTED_MODULE_1__.toogleSelectItem)(state, action.payload);
    case _app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_0__.ItemsActionTypes.RETRIEVE_ITEMS_SUCCESS:
      return (0,_helpers_store_utils__WEBPACK_IMPORTED_MODULE_1__.updateItemState)(state, action.payload, false);
    case _app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_0__.ItemsActionTypes.UPDATE_BASKET_ITEM:
    case _app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_0__.ItemsActionTypes.RESTORE_BASKET_ITEM:
      return (0,_helpers_store_utils__WEBPACK_IMPORTED_MODULE_1__.updateItemBasketInfos)(state, action.payload);
    default:
      return state;
  }
}

/***/ },

/***/ 28379
/*!**********************************************************************************!*\
  !*** ./src/app/shared/components/category-buttons/category-buttons.component.ts ***!
  \**********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CategoryButtonsComponent: () => (/* binding */ CategoryButtonsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ 48503);



function CategoryButtonsComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CategoryButtonsComponent_For_6_Template_button_click_0_listener() {
      const categoryDesc_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r2.gotoTarget(categoryDesc_r2.name));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "i", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const categoryDesc_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](4, 1, categoryDesc_r2.title));
  }
}
class CategoryButtonsComponent {
  set categoryInfos(categories) {
    this._otherCategories = this.getOtherLinks(this.categoryToAvoid, categories);
  }
  constructor() {
    this.navigateAway = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
  }
  ngOnInit() {}
  getOtherLinks(name, categoryInfos) {
    return Object.keys(categoryInfos).filter(key => key !== name).map(key => categoryInfos[key]).filter(Boolean);
  }
  gotoTarget(name) {
    this.navigateAway.emit(name);
  }
  fbshareCurrentPage() {
    window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(window.location.href) + "&t=" + document.title, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=auto');
    return false;
  }
  twshareCurrentPage() {
    window.open("https://twitter.com/share?url=" + encodeURIComponent(window.location.href) + "&text=" + document.title, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=auto');
    return false;
  }
  static {
    this.ɵfac = function CategoryButtonsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CategoryButtonsComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: CategoryButtonsComponent,
      selectors: [["app-category-buttons"]],
      inputs: {
        categoryToAvoid: "categoryToAvoid",
        categoryInfos: "categoryInfos"
      },
      outputs: {
        navigateAway: "navigateAway"
      },
      standalone: false,
      decls: 16,
      vars: 6,
      consts: [[1, "align-buttons"], [1, "d-flex", "flex-wrap", "align-items-center", "justify-content-end", "gap-2"], [1, "small", "text-muted", "text-uppercase"], ["type", "button", 1, "btn", "btn-light", "btn-sm", "py-0", "px-2"], [1, "text-muted", "mx-1"], [1, "custom-btn", "btn-social", 3, "click"], [1, "fab", "fa-fw", "fa-facebook-f"], [1, "custom-btn", "btn-social", "twiter-color", 3, "click"], [1, "fab", "fa-fw", "fa-twitter"], ["type", "button", 1, "btn", "btn-light", "btn-sm", "py-0", "px-2", 3, "click"], [1, "fas", "fa-shopping-cart", "pr-1"]],
      template: function CategoryButtonsComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "span", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrepeaterCreate"](5, CategoryButtonsComponent_For_6_Template, 5, 3, "button", 3, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrepeaterTrackByIdentity"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "span", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "|");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "span", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](11, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "a", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CategoryButtonsComponent_Template_a_click_12_listener() {
            return ctx.fbshareCurrentPage();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](13, "i", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "a", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CategoryButtonsComponent_Template_a_click_14_listener() {
            return ctx.twshareCurrentPage();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](15, "i", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](4, 2, "SEE_ALSO"), "\u00A0:");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrepeater"](ctx._otherCategories);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](11, 4, "SHARE"), "\u00A0:");
        }
      },
      dependencies: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslatePipe],
      styles: [".custom-btn[_ngcontent-%COMP%] {\n  cursor: pointer;\n  font-size: 1.2rem;\n  line-height: 1;\n  width: 1.4rem;\n  height: 1.4rem;\n  vertical-align: middle;\n}\n\n.fb-color[_ngcontent-%COMP%] {\n  color: #3578e5 !important;\n}\n\n.twiter-color[_ngcontent-%COMP%] {\n  color: rgb(29, 161, 242) !important;\n}\n\n.align-buttons[_ngcontent-%COMP%] {\n  padding: 4px 0;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvY2F0ZWdvcnktYnV0dG9ucy9jYXRlZ29yeS1idXR0b25zLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0VBQ0Esc0JBQUE7QUFDRjs7QUFFQTtFQUNFLHlCQUFBO0FBQ0Y7O0FBQ0E7RUFDRSxtQ0FBQTtBQUVGOztBQUNBO0VBQ0UsY0FBQTtBQUVGIiwic291cmNlc0NvbnRlbnQiOlsiLmN1c3RvbS1idG4ge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICBsaW5lLWhlaWdodDogMTtcbiAgd2lkdGg6IDEuNHJlbTtcbiAgaGVpZ2h0OiAxLjRyZW07XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG59XG5cbi5mYi1jb2xvciB7XG4gIGNvbG9yOiAjMzU3OGU1ICFpbXBvcnRhbnQ7XG59XG4udHdpdGVyLWNvbG9yIHtcbiAgY29sb3I6IHJnYmEoMjksMTYxLDI0MiwxLjAwKSAhaW1wb3J0YW50O1xufVxuXG4uYWxpZ24tYnV0dG9ucyB7XG4gIHBhZGRpbmc6IDRweCAwO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
      changeDetection: 0
    });
  }
}

/***/ },

/***/ 28519
/*!***********************************************!*\
  !*** ./src/app/shared/services/ad.service.ts ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdService: () => (/* binding */ AdService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 11817);

class AdService {
  getRandomNumber() {
    return Math.floor(Math.random() * 10);
  }
  getAds() {
    return [
      /*new AdItemComponent2(HeroProfileComponent, {name: 'Bombasto', bio: 'Brave as they come', headerImg: 'assets/dresses/dress-'+ this.getRandomNumber()+'.jpeg'}),
         new AdItemComponent2(HeroProfileComponent, {name: 'Dr IQ', bio: 'Smart as they come', headerImg: 'assets/jewellery/jewellery-'+ this.getRandomNumber()+'.jpeg'}),
         new AdItemComponent2(HeroJobAdComponent,   {headline: 'Hiring for several positions', headerImg: 'assets/masks/mask-'+ this.getRandomNumber()+'.jpeg',
        body: 'Submit your resume today!'}),
          */
    ];
  }
  static {
    this.ɵfac = function AdService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AdService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: AdService,
      factory: AdService.ɵfac
    });
  }
}

/***/ },

/***/ 28880
/*!*******************************************************************!*\
  !*** ./src/app/shared/services/permissions/permission.service.ts ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PermissionService: () => (/* binding */ PermissionService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ 81383);


class PermissionService {
  constructor(store) {}
  /**
   * @private
   * Renvoi `true` si la liste des permission est vide
   * Utile afin d'éviter les exceptions
   */
  isPermissionsListEmpty() {
    return true;
  }
  /**
   * @private
   * Tester si l'utilisateur a une habilitation donnée
   * @param p L'habilitation à tester
   */
  has(p) {
    if (this.isPermissionsListEmpty()) {
      return false;
    }
    return true;
    /*return (
      PERMISSIONS[p] &&
      this.user.userHabilitations.lastIndexOf(PERMISSIONS[p].index) >= 0
    );
    */
  }
  static {
    this.ɵfac = function PermissionService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || PermissionService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.Store));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: PermissionService,
      factory: PermissionService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 28935
/*!*********************************************!*\
  !*** ./src/app/auth/main/main.component.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MainComponent: () => (/* binding */ MainComponent)
/* harmony export */ });
/* harmony import */ var _env_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @env/environment */ 45312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 83305);



class MainComponent {
  constructor() {
    // logoFondClair = require('../../../assets/portfolio/boucle_oreille_sans_arriere_plan.png');
    // logoGroup = require('../../../assets/portfolio/photo_maman2-removebg-preview.png');
    this.envName = _env_environment__WEBPACK_IMPORTED_MODULE_0__.environment.envName;
    this.version = _env_environment__WEBPACK_IMPORTED_MODULE_0__.environment.versions.app;
    this.isProd = _env_environment__WEBPACK_IMPORTED_MODULE_0__.environment.production;
  }
  ngOnInit() {}
  static {
    this.ɵfac = function MainComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || MainComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: MainComponent,
      selectors: [["app-main"]],
      standalone: false,
      decls: 5,
      vars: 0,
      consts: [[1, "row", "app-auth-page"], [1, "col-form", "col-md-12", "d-flex", "justify-content-center", "align-items-center"], [1, "app-auth-container"]],
      template: function MainComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "section")(1, "div", 0)(2, "div", 1)(3, "div", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "router-outlet");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
        }
      },
      dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterOutlet],
      styles: [".app-auth-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  align-items: center;\n  margin: 0;\n}\n.app-auth-page[_ngcontent-%COMP%]   .col-form[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  padding: 32px;\n}\n.app-auth-page[_ngcontent-%COMP%]   .col-form[_ngcontent-%COMP%]   .app-auth-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 436px;\n}\n.app-auth-page[_ngcontent-%COMP%]   .col-form[_ngcontent-%COMP%]   .app-auth-container[_ngcontent-%COMP%]   .app-logo[_ngcontent-%COMP%] {\n  margin-bottom: 32px;\n  height: 56px;\n}\n.app-auth-page[_ngcontent-%COMP%]   .col-form[_ngcontent-%COMP%]   .app-auth-container[_ngcontent-%COMP%]   .app-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 250px;\n  cursor: pointer;\n}\n.app-auth-page[_ngcontent-%COMP%]   .col-form[_ngcontent-%COMP%]   .app-auth-container[_ngcontent-%COMP%]   .app-auth-footer[_ngcontent-%COMP%] {\n  margin-top: 48px;\n}\n.app-auth-page[_ngcontent-%COMP%]   .col-form[_ngcontent-%COMP%]   .app-auth-container[_ngcontent-%COMP%]   .app-auth-footer[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 128px;\n  margin-bottom: 8px;\n}\n.app-auth-page[_ngcontent-%COMP%]   .col-form[_ngcontent-%COMP%]   .app-auth-container[_ngcontent-%COMP%]   .app-auth-footer[_ngcontent-%COMP%]   .app-version[_ngcontent-%COMP%] {\n  color: grey;\n  font-size: x-small;\n  line-height: 12px;\n}\n.app-auth-page[_ngcontent-%COMP%]   .app-carousel-container[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  right: 0;\n}\n.app-auth-page[_ngcontent-%COMP%]   .app-carousel-container[_ngcontent-%COMP%]   ngb-carousel[_ngcontent-%COMP%]    .carousel-indicators {\n  display: none;\n}\n.app-auth-page[_ngcontent-%COMP%]   .app-carousel-container[_ngcontent-%COMP%]   ngb-carousel[_ngcontent-%COMP%]   .carousel-bg[_ngcontent-%COMP%] {\n  background-repeat: no-repeat;\n  background-position: bottom center;\n  background-size: cover;\n}\n.app-auth-page[_ngcontent-%COMP%]   .app-carousel-container[_ngcontent-%COMP%]   ngb-carousel[_ngcontent-%COMP%]   .carousel-bg.img-1[_ngcontent-%COMP%] {\n  background-color: deepskyblue;\n  background-image: url(\"/assets/presentation_bijoux.jpg\");\n}\n.app-auth-page[_ngcontent-%COMP%]   .app-carousel-container[_ngcontent-%COMP%]   ngb-carousel[_ngcontent-%COMP%]   .carousel-bg.img-2[_ngcontent-%COMP%] {\n  background-color: dimgrey;\n  background-image: url(\"/assets/presentation_masks.jpg\");\n}\n.app-auth-page[_ngcontent-%COMP%]   .app-carousel-container[_ngcontent-%COMP%]   ngb-carousel[_ngcontent-%COMP%]   .carousel-bg.img-3[_ngcontent-%COMP%] {\n  background-color: yellowgreen;\n  background-image: url(\"/assets/presentation_robes.jpg\");\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXV0aC9tYWluL21haW4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtBQUNGO0FBQ0U7RUFDRSxpQkFBQTtFQUNBLGFBQUE7QUFDSjtBQUNJO0VBQ0UsV0FBQTtFQUNBLGdCQUFBO0FBQ047QUFDTTtFQUNFLG1CQUFBO0VBQ0EsWUFBQTtBQUNSO0FBQ1E7RUFDRSxZQUFBO0VBQ0EsZUFBQTtBQUNWO0FBR007RUFDRSxnQkFBQTtBQURSO0FBR1E7RUFDRSxZQUFBO0VBQ0Esa0JBQUE7QUFEVjtBQUlRO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7QUFGVjtBQVdFO0VBQ0UsZUFBQTtFQUNBLE1BQUE7RUFDQSxRQUFBO0FBVEo7QUFhTTtFQUNFLGFBQUE7QUFYUjtBQWNNO0VBQ0UsNEJBQUE7RUFDQSxrQ0FBQTtFQUNBLHNCQUFBO0FBWlI7QUFjUTtFQUNFLDZCQUFBO0VBQ0Esd0RBQUE7QUFaVjtBQWVRO0VBQ0UseUJBQUE7RUFDQSx1REFBQTtBQWJWO0FBZ0JRO0VBQ0UsNkJBQUE7RUFDQSx1REFBQTtBQWRWIiwic291cmNlc0NvbnRlbnQiOlsiLmFwcC1hdXRoLXBhZ2Uge1xuICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWFyZ2luOiAwO1xuXG4gIC5jb2wtZm9ybSB7XG4gICAgbWluLWhlaWdodDogMTAwdmg7XG4gICAgcGFkZGluZzogMzJweDtcblxuICAgIC5hcHAtYXV0aC1jb250YWluZXIge1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBtYXgtd2lkdGg6IDQzNnB4O1xuXG4gICAgICAuYXBwLWxvZ28ge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAzMnB4O1xuICAgICAgICBoZWlnaHQ6IDU2cHg7XG5cbiAgICAgICAgaW1nIHtcbiAgICAgICAgICB3aWR0aDogMjUwcHg7XG4gICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC5hcHAtYXV0aC1mb290ZXIge1xuICAgICAgICBtYXJnaW4tdG9wOiA0OHB4O1xuXG4gICAgICAgIGltZyB7XG4gICAgICAgICAgd2lkdGg6IDEyOHB4O1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5hcHAtdmVyc2lvbiB7XG4gICAgICAgICAgY29sb3I6IGdyZXk7XG4gICAgICAgICAgZm9udC1zaXplOiB4LXNtYWxsO1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxMnB4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuXG5cbiAgLmFwcC1jYXJvdXNlbC1jb250YWluZXIge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB0b3A6IDA7XG4gICAgcmlnaHQ6IDA7XG5cbiAgICBuZ2ItY2Fyb3VzZWwge1xuXG4gICAgICA6Om5nLWRlZXAuY2Fyb3VzZWwtaW5kaWNhdG9ycyB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIC5jYXJvdXNlbC1iZyB7XG4gICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGJvdHRvbSBjZW50ZXI7XG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG5cbiAgICAgICAgJi5pbWctMSB7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogZGVlcHNreWJsdWU7XG4gICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiL2Fzc2V0cy9wcmVzZW50YXRpb25fYmlqb3V4LmpwZ1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgICYuaW1nLTIge1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IGRpbWdyZXk7XG4gICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiL2Fzc2V0cy9wcmVzZW50YXRpb25fbWFza3MuanBnXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgJi5pbWctMyB7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogeWVsbG93Z3JlZW47XG4gICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiL2Fzc2V0cy9wcmVzZW50YXRpb25fcm9iZXMuanBnXCIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ },

/***/ 29365
/*!**************************************************************!*\
  !*** ./src/app/shared/services/password/password.service.ts ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   APP_PASSWORD_CONFIG: () => (/* binding */ APP_PASSWORD_CONFIG),
/* harmony export */   PasswordService: () => (/* binding */ PasswordService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 11817);


const APP_PASSWORD_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('AppPasswordConfig');
class PasswordService {
  constructor(config) {
    this.isLongEnough = value => {
      return value && value.length >= this.config.minLength;
    };
    this.lowerCaseExist = value => {
      return /[a-z]/.test(value);
    };
    this.upperCaseExist = value => {
      return /[A-Z]/.test(value);
    };
    this.hasDigit = value => {
      return /[0-9]/.test(value);
    };
    this.hasSpecialCaracter = value => {
      return /[!@#$%^&*]/.test(value); // TODO Ajouter certains caractères spéciaux
    };
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
  test(value) {
    if (this.config.minConstraints <= 0) {
      return true;
    }
    if (!value) {
      return false;
    }
    let satisfied = 0;
    const toVerify = [{
      attr: 'hasLowerCase',
      fn: this.lowerCaseExist
    }, {
      attr: 'hasUppercase',
      fn: this.upperCaseExist
    }, {
      attr: 'hasDigit',
      fn: this.hasDigit
    }, {
      attr: 'hasSpecialCaracter',
      fn: this.hasSpecialCaracter
    }];
    for (const v of toVerify) {
      if (this.config[v.attr] && v.fn(value)) {
        satisfied += 1;
      }
    }
    return satisfied >= this.config.minConstraints - 1 && value.length >= this.config.minLength;
  }
  static {
    this.ɵfac = function PasswordService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || PasswordService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](APP_PASSWORD_CONFIG));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: PasswordService,
      factory: PasswordService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 29477
/*!************************************************************************************!*\
  !*** ./src/app/shared/components/currency-selector/currency-selector.component.ts ***!
  \************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurrencySelectorComponent: () => (/* binding */ CurrencySelectorComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 2510);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _shared_services_pricing_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shared/services/pricing.service */ 45212);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);





function CurrencySelectorComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "label", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "select", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function CurrencySelectorComponent_Conditional_0_Template_select_change_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.onCurrencyChange($event.target.value));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "option", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Euro (\u20AC)");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "option", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "Franc CFA (FCFA)");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](3, 3, "PRODUCTS.CURRENCY"), "\u00A0:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("selected", ctx_r1.currentCurrency === "EUR");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("selected", ctx_r1.currentCurrency === "XAF");
  }
}
class CurrencySelectorComponent {
  constructor(pricing, translate) {
    this.pricing = pricing;
    this.translate = translate;
    this.currentCurrency = this.pricing.currency;
    this.subs = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subscription();
  }
  ngOnInit() {
    this.subs.add(this.pricing.currency$.subscribe(c => {
      this.currentCurrency = c;
    }));
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  get isFrench() {
    return (this.translate.currentLang ?? 'fr') === 'fr';
  }
  onCurrencyChange(value) {
    this.pricing.setCurrency(value);
  }
  static {
    this.ɵfac = function CurrencySelectorComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CurrencySelectorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_shared_services_pricing_service__WEBPACK_IMPORTED_MODULE_3__.PricingService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslateService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: CurrencySelectorComponent,
      selectors: [["app-currency-selector"]],
      standalone: false,
      decls: 1,
      vars: 1,
      consts: [[1, "d-flex", "align-items-center", "gap-2"], [1, "mb-0", "small", "text-muted", "text-uppercase"], [1, "form-control", "form-control-sm", "w-auto", 3, "change"], ["value", "EUR", 3, "selected"], ["value", "XAF", 3, "selected"]],
      template: function CurrencySelectorComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵconditionalCreate"](0, CurrencySelectorComponent_Conditional_0_Template, 9, 5, "div", 0);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵconditional"](ctx.isFrench ? 0 : -1);
        }
      },
      dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgSelectMultipleOption"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslatePipe],
      encapsulation: 2
    });
  }
}

/***/ },

/***/ 30309
/*!*************************************************!*\
  !*** ./src/app/auth/signin/signin.component.ts ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SigninComponent: () => (/* binding */ SigninComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 10819);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ 81383);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 33900);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _app_auth_store_auth_selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @app/auth/store/auth.selectors */ 2981);
/* harmony import */ var _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @app/auth/store/auth.actions */ 2520);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! firebase/auth */ 92630);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/fire/auth */ 99082);
/* harmony import */ var _angular_fire_functions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/fire/functions */ 55559);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 46264);
/* harmony import */ var _app_auth_login_login_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @app/auth/login/login.component */ 66539);














function SigninComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " Connexion ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", !ctx_r0.logging.valid);
  }
}
function SigninComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "i", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function SigninComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r0.error.message || ctx_r0.error);
  }
}
class SigninComponent {
  constructor(store, _fb, auth, ngZone,
  // Gardé si tu appelles des Cloud Functions plus tard
  fun) {
    this.store = store;
    this._fb = _fb;
    this.auth = auth;
    this.ngZone = ngZone;
    this.fun = fun;
    this.loading = false;
    this.unsubscribe$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
    this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.select)(_app_auth_store_auth_selectors__WEBPACK_IMPORTED_MODULE_4__.selectorAuth), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this.unsubscribe$)).subscribe(state => {
      if (!state) return;
      if (state.error) {
        switch (state.error.status) {
          case 504:
          case 500:
            this.error = {
              message: 'L\'authentification est indisponible pour le moment, veuillez réessayez'
            };
            break;
          default:
            this.error = state.error.error;
            break;
        }
      }
      this.loading = state.loading;
    });
  }
  ngOnInit() {
    this.logging = this._fb.group({
      username: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.email]],
      password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]
    });
  }
  signIn() {
    this.loading = true;
    (0,firebase_auth__WEBPACK_IMPORTED_MODULE_6__.signInWithEmailAndPassword)(this.auth, (this.logging.value.username || '').trim(), this.logging.value.password).then(result => {
      this.loading = false;
      this.ngZone.run(() => {
        this.store.dispatch(new _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_5__.ActionAuthLoggedIn({
          ssoToken: result?.user?.refreshToken,
          token: result?.user?.refreshToken,
          userHabilitations: [],
          indexRole: -1,
          isAnonymous: result.user?.isAnonymous,
          credential: result.credential,
          actions: {},
          additionalInfos: {
            uid: result.user?.uid,
            providerId: (0,firebase_auth__WEBPACK_IMPORTED_MODULE_6__.getAdditionalUserInfo)(result)?.providerId ?? undefined,
            picture: result.user?.photoURL ?? undefined,
            nom: result.user?.displayName ?? undefined,
            prenom: '',
            email: result.user?.email ?? undefined
          }
        }));
      });
    }).catch(error => {
      this.loading = false;
      this.error = error;
    });
  }
  sendEmailVerification() {
    const user = this.auth.currentUser;
    if (!user) return;
    (0,firebase_auth__WEBPACK_IMPORTED_MODULE_6__.sendEmailVerification)(user, {
      url: ''
    }).catch(console.error);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  close() {}
  static {
    this.ɵfac = function SigninComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || SigninComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__.UntypedFormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_fire_auth__WEBPACK_IMPORTED_MODULE_9__.Auth), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_fire_functions__WEBPACK_IMPORTED_MODULE_10__.Functions));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
      type: SigninComponent,
      selectors: [["app-signin"]],
      standalone: false,
      decls: 31,
      vars: 4,
      consts: [[1, "rouded-form"], [3, "ngSubmit", "formGroup"], ["type", "button", 1, "close", 3, "click"], ["aria-hidden", "true", "id", "closeAlert"], [1, "dsicon-close"], [1, "form-group"], ["for", "email"], ["aria-describedby", "emailHelp", "formControlName", "username", "id", "email", "type", "email", 1, "form-control"], [1, "bar"], ["for", "password"], ["autocomplete", "email", "formControlName", "password", "id", "password", "type", "password", 1, "form-control"], [1, "wrapper-mdp"], ["routerLink", "/auth/forgot_password", "tabindex", "-1", 1, "app-link"], ["id", "connextionButton", "type", "submit", 1, "btn-connexion", "btn-primaire-h40", 3, "disabled"], ["disabled", "", "type", "button", 1, "btn-spinner", "btn-primaire-h40"], [1, "app-auth-error"], [1, "app-auth-divider"], [1, "fa", "fa-spinner", "animate", "rotation"]],
      template: function SigninComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0)(1, "form", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngSubmit", function SigninComponent_Template_form_ngSubmit_1_listener() {
            return ctx.signIn();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "button", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function SigninComponent_Template_button_click_2_listener() {
            return ctx.close();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "span", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](4, "i", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6, "Bienvenue");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "h5");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8, "Veuillez vous identifier");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "div", 5)(10, "label", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](11, " Adresse e-mail ");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](12, "input", 7)(13, "i", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "div", 5)(15, "label", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](16, " Mot de passe ");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](17, "input", 10)(18, "i", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](19, "div", 11)(20, "a", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](21, " Mot de passe oubli\u00E9 ? ");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵconditionalCreate"](22, SigninComponent_Conditional_22_Template, 2, 1, "button", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵconditionalCreate"](23, SigninComponent_Conditional_23_Template, 2, 0, "button", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵconditionalCreate"](24, SigninComponent_Conditional_24_Template, 2, 1, "span", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](25, "div", 16)(26, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](27, "ou");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](28, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](29, "Utilisez les liens propos\u00E9s. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](30, "social-login");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formGroup", ctx.logging);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](21);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵconditional"](!ctx.loading ? 22 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵconditional"](ctx.loading ? 23 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵconditional"](ctx.error ? 24 : -1);
        }
      },
      dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, _angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterLink, _app_auth_login_login_component__WEBPACK_IMPORTED_MODULE_12__.LoginComponent],
      styles: ["button.btn[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 16px 0;\n}\n\nh3[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n  font-size: 28px;\n  line-height: 38px;\n  color: #ff4b33;\n}\n\nh5[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #222222;\n  margin-bottom: 32px;\n}\n\nform[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 100%;\n}\nform[_ngcontent-%COMP%]   button.btn-connexion[_ngcontent-%COMP%], form[_ngcontent-%COMP%]   button.btn-spinner[_ngcontent-%COMP%], form[_ngcontent-%COMP%]   button.btn-suivant[_ngcontent-%COMP%], form[_ngcontent-%COMP%]   button.btn-envoyer[_ngcontent-%COMP%] {\n  margin-top: 32px;\n  margin-bottom: 16px;\n}\n\n.mx-auto[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.btn-enregistrement[_ngcontent-%COMP%], \n.btn-creercompte[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 16px;\n}\n\n.app-error-link[_ngcontent-%COMP%], \n.app-link[_ngcontent-%COMP%] {\n  text-decoration: underline;\n  cursor: pointer;\n}\n\n.app-error-link[_ngcontent-%COMP%] {\n  font-weight: bold;\n  color: #eb0000;\n}\n\n.wrapper-mdp[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n}\n.wrapper-mdp[_ngcontent-%COMP%]   .app-link[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-top: 8px;\n  color: #ff4b33;\n  font-size: large;\n  line-height: 22px;\n}\n\n.app-auth-error[_ngcontent-%COMP%], .app-auth-success[_ngcontent-%COMP%] {\n  display: block;\n  font-size: medium;\n  line-height: 19px;\n  margin-bottom: 16px;\n  text-align: center;\n}\n\n.app-auth-error[_ngcontent-%COMP%] {\n  color: #eb0000;\n}\n\n.app-auth-success[_ngcontent-%COMP%] {\n  color: #222222;\n}\n\n.app-auth-divider[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  width: 50%;\n  margin: auto;\n  text-align: center;\n}\n.app-auth-divider[_ngcontent-%COMP%]:after, .app-auth-divider[_ngcontent-%COMP%]:before {\n  height: 2px;\n  content: \"\";\n  position: absolute;\n  top: 45%;\n  width: 50%;\n  z-index: -1;\n}\n.app-auth-divider[_ngcontent-%COMP%]:after {\n  background-image: linear-gradient(to left, #ffffff, #dddddd);\n  right: 0;\n}\n.app-auth-divider[_ngcontent-%COMP%]:before {\n  background-image: linear-gradient(to right, #ffffff, #dddddd);\n  left: 0;\n}\n.app-auth-divider[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background: #ffffff;\n  padding: 0 16px;\n  font-size: medium;\n}\n\n.pwd-check[_ngcontent-%COMP%] {\n  display: none;\n  margin: 16px 0;\n  padding: 24px;\n  background-color: #e0ebf7;\n}\n.pwd-check[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n  font-size: medium;\n  line-height: 19px;\n  color: #3175c9;\n}\n.pwd-check[_ngcontent-%COMP%]   .bullet[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin: 0 8px 0 0;\n  border-radius: 100%;\n  width: 4px;\n  height: 4px;\n  background-color: #3175c9;\n}\n.pwd-check[_ngcontent-%COMP%]   .criteria[_ngcontent-%COMP%] {\n  padding: 0 0 5px;\n  color: #3175c9;\n  font-size: 11px;\n  font-weight: 400;\n}\n\n#password[_ngcontent-%COMP%]:focus    ~ .pwd-check[_ngcontent-%COMP%], \n#password[_ngcontent-%COMP%]:active    ~ .pwd-check[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.show-secret[_ngcontent-%COMP%] {\n  position: relative;\n  right: 10px;\n  top: 36px;\n  cursor: pointer;\n  margin: 0;\n}\n\ninput.ng-invalid.ng-touched[_ngcontent-%COMP%]    ~ i.bar[_ngcontent-%COMP%], \nselect.ng-invalid.ng-touched[_ngcontent-%COMP%]    ~ i.bar[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #ff4b33;\n}\ninput[_ngcontent-%COMP%]    ~ .error[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%]    ~ div[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%]    ~ .error[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%]    ~ div[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%] {\n  display: block;\n  padding-top: 7px;\n  padding-left: 16px;\n}\n\n.error[_ngcontent-%COMP%] {\n  padding-left: 8px;\n  font-size: small;\n  line-height: 17px;\n  color: #ff4b33;\n}\n\nbutton.btn[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 16px 0;\n}\n\nh3[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n  font-size: 28px;\n  line-height: 38px;\n  color: #0056b3;\n}\n\nh5[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: black;\n  margin-bottom: 32px;\n}\n\nform[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 100%;\n}\nform[_ngcontent-%COMP%]   button.btn-connexion[_ngcontent-%COMP%], form[_ngcontent-%COMP%]   button.btn-spinner[_ngcontent-%COMP%], form[_ngcontent-%COMP%]   button.btn-suivant[_ngcontent-%COMP%], form[_ngcontent-%COMP%]   button.btn-envoyer[_ngcontent-%COMP%] {\n  margin-top: 32px;\n  margin-bottom: 16px;\n}\n\n.mx-auto[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.btn-enregistrement[_ngcontent-%COMP%], \n.btn-creercompte[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 16px;\n}\n\n.app-error-link[_ngcontent-%COMP%], \n.app-link[_ngcontent-%COMP%] {\n  text-decoration: underline;\n  cursor: pointer;\n}\n\n.app-error-link[_ngcontent-%COMP%] {\n  font-weight: bold;\n  color: red;\n}\n\n.wrapper-mdp[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n}\n.wrapper-mdp[_ngcontent-%COMP%]   .app-link[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-top: 8px;\n  font-size: large;\n  line-height: 22px;\n}\n\n.app-auth-error[_ngcontent-%COMP%], .app-auth-success[_ngcontent-%COMP%] {\n  display: block;\n  font-size: medium;\n  line-height: 19px;\n  margin-bottom: 16px;\n  text-align: center;\n}\n\n.app-auth-error[_ngcontent-%COMP%] {\n  color: red;\n}\n\n.app-auth-success[_ngcontent-%COMP%] {\n  color: black;\n}\n\n.app-auth-divider[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  width: 50%;\n  margin: auto;\n  text-align: center;\n}\n.app-auth-divider[_ngcontent-%COMP%]:after, .app-auth-divider[_ngcontent-%COMP%]:before {\n  height: 2px;\n  content: \"\";\n  position: absolute;\n  top: 45%;\n  width: 50%;\n  z-index: -1;\n}\n.app-auth-divider[_ngcontent-%COMP%]:after {\n  background-image: linear-gradient(to left, white, grey);\n  right: 0;\n}\n.app-auth-divider[_ngcontent-%COMP%]:before {\n  background-image: linear-gradient(to right, white, grey);\n  left: 0;\n}\n.app-auth-divider[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background: white;\n  padding: 0 16px;\n  font-size: medium;\n}\n\n.pwd-check[_ngcontent-%COMP%] {\n  display: none;\n  margin: 16px 0;\n  padding: 24px;\n  background-color: #e0ebf7;\n}\n.pwd-check[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n  font-size: medium;\n  line-height: 19px;\n  color: #0056b3;\n}\n.pwd-check[_ngcontent-%COMP%]   .bullet[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin: 0 8px 0 0;\n  border-radius: 100%;\n  width: 4px;\n  height: 4px;\n  background-color: #0056b3;\n}\n.pwd-check[_ngcontent-%COMP%]   .criteria[_ngcontent-%COMP%] {\n  padding: 0 0 5px;\n  color: #0056b3;\n  font-size: 11px;\n  font-weight: 400;\n}\n\n#password[_ngcontent-%COMP%]:focus    ~ .pwd-check[_ngcontent-%COMP%], \n#password[_ngcontent-%COMP%]:active    ~ .pwd-check[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.show-secret[_ngcontent-%COMP%] {\n  position: relative;\n  right: 10px;\n  top: 36px;\n  cursor: pointer;\n  margin: 0;\n}\n\n.btn-floating.btn-sm[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  line-height: 46.15385px;\n}\n\n.btn-floating[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: inherit;\n  color: #fff;\n  text-align: center;\n}\n\n.btn-floating[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  line-height: 47px;\n}\n\n.fa[_ngcontent-%COMP%], .fab[_ngcontent-%COMP%], .fad[_ngcontent-%COMP%], .fal[_ngcontent-%COMP%], .far[_ngcontent-%COMP%], .fas[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-style: normal;\n  font-variant: normal;\n  text-rendering: auto;\n  line-height: 1;\n}\n\nbutton[_ngcontent-%COMP%]:not(:disabled), [type=button][_ngcontent-%COMP%]:not(:disabled), [type=reset][_ngcontent-%COMP%]:not(:disabled), [type=submit][_ngcontent-%COMP%]:not(:disabled) {\n  cursor: pointer;\n}\n\n.fa-facebook-f[_ngcontent-%COMP%]:before {\n  content: \"\\f39e\";\n}\n\n*[_ngcontent-%COMP%], *[_ngcontent-%COMP%]::before, *[_ngcontent-%COMP%]::after {\n  box-sizing: border-box;\n}\n\n.btn-floating[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: inline-block;\n  padding: 0;\n  margin: 10px;\n  overflow: hidden;\n  vertical-align: middle;\n  cursor: pointer;\n  border-radius: 50%;\n  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);\n  transition: all 0.2s ease-in-out;\n  width: 47px;\n  height: 47px;\n}\n\na.waves-effect[_ngcontent-%COMP%], a.waves-light[_ngcontent-%COMP%] {\n  display: inline-block;\n}\n\n.fa-github[_ngcontent-%COMP%]:before {\n  content: \"\\f09b\";\n}\n\n.fa-facebook-f[_ngcontent-%COMP%]:before {\n  content: \"\\f39e\";\n}\n\n.btn-fb[_ngcontent-%COMP%] {\n  color: #fff !important;\n  background-color: #3b5998 !important;\n}\n\n.btn-tw[_ngcontent-%COMP%] {\n  color: #fff !important;\n  background-color: #55acee !important;\n}\n\n.btn-git[_ngcontent-%COMP%] {\n  color: #fff !important;\n  background-color: #333 !important;\n}\n\n.btn-tw[_ngcontent-%COMP%] {\n  color: #fff !important;\n  background-color: #55acee !important;\n}\n\n.waves-effect[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  cursor: pointer;\n  -webkit-user-select: none;\n          user-select: none;\n}\n\n.text-center[_ngcontent-%COMP%] {\n  text-align: center !important;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXV0aC9jb21tb24uc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXV0aC9zaWduaW4vc2lnbmluLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLGNBQUE7QUNDRjs7QURFQTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtBQ0NGOztBREVBO0VBQ0UsZUFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtBQ0NGOztBREdFO0VBQ0UsV0FBQTtBQ0FKO0FERUk7RUFJRSxnQkFBQTtFQUNBLG1CQUFBO0FDSE47O0FEUUE7RUFDRSxXQUFBO0FDTEY7O0FEUUE7O0VBRUUsV0FBQTtFQUNBLGdCQUFBO0FDTEY7O0FEUUE7O0VBRUUsMEJBQUE7RUFDQSxlQUFBO0FDTEY7O0FEUUE7RUFDRSxpQkFBQTtFQUNBLGNBQUE7QUNMRjs7QURRQTtFQUNFLGFBQUE7RUFDQSx5QkFBQTtBQ0xGO0FET0U7RUFDRSxxQkFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtBQ0xKOztBRFNBO0VBQ0UsY0FBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FDTkY7O0FEU0E7RUFDRSxjQUFBO0FDTkY7O0FEU0E7RUFDRSxjQUFBO0FDTkY7O0FEU0E7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FDTkY7QURRRTtFQUNFLFdBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7QUNOSjtBRFNFO0VBQ0UsNERBQUE7RUFDQSxRQUFBO0FDUEo7QURVRTtFQUNFLDZEQUFBO0VBQ0EsT0FBQTtBQ1JKO0FEV0U7RUFDRSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQ1RKOztBRGNBO0VBQ0UsYUFBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0VBQ0EseUJBQUE7QUNYRjtBRGFFO0VBQ0Usa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtBQ1hKO0FEY0U7RUFDRSxxQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLHlCQUFBO0FDWko7QURlRTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQ2JKOztBRGlCQTs7RUFFRSxjQUFBO0FDZEY7O0FEa0JBO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtFQUNBLGVBQUE7RUFDQSxTQUFBO0FDZkY7O0FEdUJNOztFQUNFLGdDQUFBO0FDbkJSO0FEd0JFOzs7O0VBRUUsY0FBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUNwQko7O0FEd0JBO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtBQ3JCRjs7QUFoS0E7RUFDRSxXQUFBO0VBQ0EsY0FBQTtBQW1LRjs7QUFoS0E7RUFDRSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7QUFtS0Y7O0FBaEtBO0VBQ0UsZUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtBQW1LRjs7QUEvSkU7RUFDRSxXQUFBO0FBa0tKO0FBaEtJO0VBSUUsZ0JBQUE7RUFDQSxtQkFBQTtBQStKTjs7QUExSkE7RUFDRSxXQUFBO0FBNkpGOztBQTFKQTs7RUFFRSxXQUFBO0VBQ0EsZ0JBQUE7QUE2SkY7O0FBMUpBOztFQUVFLDBCQUFBO0VBQ0EsZUFBQTtBQTZKRjs7QUExSkE7RUFDRSxpQkFBQTtFQUNBLFVBQUE7QUE2SkY7O0FBMUpBO0VBQ0UsYUFBQTtFQUNBLHlCQUFBO0FBNkpGO0FBM0pFO0VBQ0UscUJBQUE7RUFDQSxlQUFBO0VBRUEsZ0JBQUE7RUFDQSxpQkFBQTtBQTRKSjs7QUF4SkE7RUFDRSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7QUEySkY7O0FBeEpBO0VBQ0UsVUFBQTtBQTJKRjs7QUF4SkE7RUFDRSxZQUFBO0FBMkpGOztBQXhKQTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFVBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QUEySkY7QUF6SkU7RUFDRSxXQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0FBMkpKO0FBeEpFO0VBQ0UsdURBQUE7RUFDQSxRQUFBO0FBMEpKO0FBdkpFO0VBQ0Usd0RBQUE7RUFDQSxPQUFBO0FBeUpKO0FBdEpFO0VBQ0UsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUF3Sko7O0FBbkpBO0VBQ0UsYUFBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0VBQ0EseUJBQUE7QUFzSkY7QUFwSkU7RUFDRSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0FBc0pKO0FBbkpFO0VBQ0UscUJBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSx5QkFBQTtBQXFKSjtBQWxKRTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQW9KSjs7QUFoSkE7O0VBRUUsY0FBQTtBQW1KRjs7QUE5SUE7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxTQUFBO0VBQ0EsZUFBQTtFQUNBLFNBQUE7QUFpSkY7O0FBN0lBO0VBQ0UsdUJBQUE7QUFnSkY7O0FBN0lBO0VBQ0UscUJBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0FBZ0pGOztBQTlJQTtFQUNFLGtCQUFBO0VBQ0EsaUJBQUE7QUFpSkY7O0FBL0lBO0VBQ0UscUJBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0Esb0JBQUE7RUFDQSxjQUFBO0FBa0pGOztBQS9JQTtFQUNFLGVBQUE7QUFrSkY7O0FBL0lBO0VBQ0UsZ0JBQUE7QUFrSkY7O0FBL0lBO0VBQ0Usc0JBQUE7QUFrSkY7O0FBL0lBO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0VBQ0EscUJBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSw4RUFBQTtFQUNBLGdDQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFrSkY7O0FBL0lBO0VBQ0UscUJBQUE7QUFrSkY7O0FBL0lBO0VBQ0UsZ0JBQUE7QUFrSkY7O0FBL0lBO0VBQ0UsZ0JBQUE7QUFrSkY7O0FBL0lBO0VBQ0Usc0JBQUE7RUFDQSxvQ0FBQTtBQWtKRjs7QUFoSkE7RUFDRSxzQkFBQTtFQUNBLG9DQUFBO0FBbUpGOztBQWhKQTtFQUNFLHNCQUFBO0VBQ0EsaUNBQUE7QUFtSkY7O0FBaEpBO0VBQ0Usc0JBQUE7RUFDQSxvQ0FBQTtBQW1KRjs7QUFoSkE7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO1VBQUEsaUJBQUE7QUFtSkY7O0FBaEpBO0VBQ0UsNkJBQUE7QUFtSkYiLCJzb3VyY2VzQ29udGVudCI6WyJidXR0b24uYnRuIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogMTZweCAwO1xufVxuXG5oMyB7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbiAgZm9udC1zaXplOiAyOHB4O1xuICBsaW5lLWhlaWdodDogMzhweDtcbiAgY29sb3I6ICNmZjRiMzM7XG59XG5cbmg1IHtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBjb2xvcjogIzIyMjIyMjtcbiAgbWFyZ2luLWJvdHRvbTogMzJweDtcbn1cblxuZm9ybSB7XG4gIGJ1dHRvbiB7XG4gICAgd2lkdGg6IDEwMCU7XG5cbiAgICAmLmJ0bi1jb25uZXhpb24sXG4gICAgJi5idG4tc3Bpbm5lcixcbiAgICAmLmJ0bi1zdWl2YW50LFxuICAgICYuYnRuLWVudm95ZXIge1xuICAgICAgbWFyZ2luLXRvcDogMzJweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gICAgfVxuICB9XG59XG5cbi5teC1hdXRvIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5idG4tZW5yZWdpc3RyZW1lbnQsXG4uYnRuLWNyZWVyY29tcHRlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi10b3A6IDE2cHg7XG59XG5cbi5hcHAtZXJyb3ItbGluayxcbi5hcHAtbGluayB7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hcHAtZXJyb3ItbGluayB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogI2ViMDAwMDtcbn1cblxuLndyYXBwZXItbWRwIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcblxuICAuYXBwLWxpbmsge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBtYXJnaW4tdG9wOiA4cHg7XG4gICAgY29sb3I6ICNmZjRiMzM7XG4gICAgZm9udC1zaXplOiBsYXJnZTtcbiAgICBsaW5lLWhlaWdodDogMjJweDtcbiAgfVxufVxuXG4uYXBwLWF1dGgtZXJyb3IsIC5hcHAtYXV0aC1zdWNjZXNzIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZvbnQtc2l6ZTogbWVkaXVtO1xuICBsaW5lLWhlaWdodDogMTlweDtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uYXBwLWF1dGgtZXJyb3Ige1xuICBjb2xvcjogI2ViMDAwMDtcbn1cblxuLmFwcC1hdXRoLXN1Y2Nlc3Mge1xuICBjb2xvcjogIzIyMjIyMjtcbn1cblxuLmFwcC1hdXRoLWRpdmlkZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDE7XG4gIHdpZHRoOiA1MCU7XG4gIG1hcmdpbjogYXV0bztcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gICY6YWZ0ZXIsICY6YmVmb3JlIHtcbiAgICBoZWlnaHQ6IDJweDtcbiAgICBjb250ZW50OiBcIlwiO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDQ1JTtcbiAgICB3aWR0aDogNTAlO1xuICAgIHotaW5kZXg6IC0xO1xuICB9XG5cbiAgJjphZnRlciB7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIGxlZnQsICNmZmZmZmYsICNkZGRkZGQpO1xuICAgIHJpZ2h0OiAwO1xuICB9XG5cbiAgJjpiZWZvcmUge1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgI2ZmZmZmZiwgI2RkZGRkZCk7XG4gICAgbGVmdDogMDtcbiAgfVxuXG4gIHNwYW4ge1xuICAgIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gICAgcGFkZGluZzogMCAxNnB4O1xuICAgIGZvbnQtc2l6ZTogbWVkaXVtO1xuICB9XG59XG5cbi8vZW5jYXJ0IGFwcGFyYWlzc2FudCBzb3VzIGwnaW5wdXQgZGUgbWRwIGxvcnNxdSdpbCBlc3QgZm9jdXMgb3UgYWN0aXZlXG4ucHdkLWNoZWNrIHtcbiAgZGlzcGxheTogbm9uZTtcbiAgbWFyZ2luOiAxNnB4IDA7XG4gIHBhZGRpbmc6IDI0cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlMGViZjc7IC8vIzMxNzVjOSBlbiBvcGFjaXTDg8KpIDAuMTVcblxuICAudGl0bGUge1xuICAgIG1hcmdpbjogMCAwIDE2cHggMDtcbiAgICBmb250LXNpemU6IG1lZGl1bTtcbiAgICBsaW5lLWhlaWdodDogMTlweDtcbiAgICBjb2xvcjogIzMxNzVjOTtcbiAgfVxuXG4gIC5idWxsZXQge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBtYXJnaW46IDAgOHB4IDAgMDtcbiAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgIHdpZHRoOiA0cHg7XG4gICAgaGVpZ2h0OiA0cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMxNzVjOTtcbiAgfVxuXG4gIC5jcml0ZXJpYSB7XG4gICAgcGFkZGluZzogMCAwIDVweDtcbiAgICBjb2xvcjogIzMxNzVjOTtcbiAgICBmb250LXNpemU6IDExcHg7XG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgfVxufVxuXG4jcGFzc3dvcmQ6Zm9jdXMgfiAucHdkLWNoZWNrLFxuI3Bhc3N3b3JkOmFjdGl2ZSB+IC5wd2QtY2hlY2sge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuXG4uc2hvdy1zZWNyZXQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHJpZ2h0OiAxMHB4O1xuICB0b3A6IDM2cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgbWFyZ2luOiAwO1xufVxuXG4vL2VycmV1cnNcbmlucHV0LFxuc2VsZWN0IHtcbiAgJi5uZy1pbnZhbGlkIHtcbiAgICAmLm5nLXRvdWNoZWQge1xuICAgICAgfiBpLmJhciB7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZmY0YjMzO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIH4gLmVycm9yLFxuICB+IGRpdiAuZXJyb3Ige1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHBhZGRpbmctdG9wOiA3cHg7XG4gICAgcGFkZGluZy1sZWZ0OiAxNnB4O1xuICB9XG59XG5cbi5lcnJvciB7XG4gIHBhZGRpbmctbGVmdDogOHB4O1xuICBmb250LXNpemU6IHNtYWxsO1xuICBsaW5lLWhlaWdodDogMTdweDtcbiAgY29sb3I6ICNmZjRiMzM7XG59XG4iLCJAdXNlICcuLi9jb21tb24uc2Nzcyc7XG5cbmJ1dHRvbi5idG4ge1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luOiAxNnB4IDA7XG59XG5cbmgzIHtcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICBmb250LXNpemU6IDI4cHg7XG4gIGxpbmUtaGVpZ2h0OiAzOHB4O1xuICBjb2xvcjogIzAwNTZiMztcbn1cblxuaDUge1xuICBmb250LXNpemU6IDE2cHg7XG4gIGNvbG9yOiBibGFjaztcbiAgbWFyZ2luLWJvdHRvbTogMzJweDtcbn1cblxuZm9ybSB7XG4gIGJ1dHRvbiB7XG4gICAgd2lkdGg6IDEwMCU7XG5cbiAgICAmLmJ0bi1jb25uZXhpb24sXG4gICAgJi5idG4tc3Bpbm5lcixcbiAgICAmLmJ0bi1zdWl2YW50LFxuICAgICYuYnRuLWVudm95ZXIge1xuICAgICAgbWFyZ2luLXRvcDogMzJweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gICAgfVxuICB9XG59XG5cbi5teC1hdXRvIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5idG4tZW5yZWdpc3RyZW1lbnQsXG4uYnRuLWNyZWVyY29tcHRlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi10b3A6IDE2cHg7XG59XG5cbi5hcHAtZXJyb3ItbGluayxcbi5hcHAtbGluayB7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hcHAtZXJyb3ItbGluayB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogcmVkO1xufVxuXG4ud3JhcHBlci1tZHAge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuXG4gIC5hcHAtbGluayB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIG1hcmdpbi10b3A6IDhweDtcbiAgICAvL2NvbG9yOiAjMDA1NmIzO1xuICAgIGZvbnQtc2l6ZTogbGFyZ2U7XG4gICAgbGluZS1oZWlnaHQ6IDIycHg7XG4gIH1cbn1cblxuLmFwcC1hdXRoLWVycm9yLCAuYXBwLWF1dGgtc3VjY2VzcyB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmb250LXNpemU6IG1lZGl1bTtcbiAgbGluZS1oZWlnaHQ6IDE5cHg7XG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmFwcC1hdXRoLWVycm9yIHtcbiAgY29sb3I6IHJlZDtcbn1cblxuLmFwcC1hdXRoLXN1Y2Nlc3Mge1xuICBjb2xvcjogYmxhY2s7XG59XG5cbi5hcHAtYXV0aC1kaXZpZGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB6LWluZGV4OiAxO1xuICB3aWR0aDogNTAlO1xuICBtYXJnaW46IGF1dG87XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICAmOmFmdGVyLCAmOmJlZm9yZSB7XG4gICAgaGVpZ2h0OiAycHg7XG4gICAgY29udGVudDogXCJcIjtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA0NSU7XG4gICAgd2lkdGg6IDUwJTtcbiAgICB6LWluZGV4OiAtMTtcbiAgfVxuXG4gICY6YWZ0ZXIge1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byBsZWZ0LCB3aGl0ZSwgZ3JleSk7XG4gICAgcmlnaHQ6IDA7XG4gIH1cblxuICAmOmJlZm9yZSB7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCB3aGl0ZSwgZ3JleSk7XG4gICAgbGVmdDogMDtcbiAgfVxuXG4gIHNwYW4ge1xuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgIHBhZGRpbmc6IDAgMTZweDtcbiAgICBmb250LXNpemU6IG1lZGl1bTtcbiAgfVxufVxuXG4vL2VuY2FydCBhcHBhcmFpc3NhbnQgc291cyBsJ2lucHV0IGRlIG1kcCBsb3JzcXUnaWwgZXN0IGZvY3VzIG91IGFjdGl2ZVxuLnB3ZC1jaGVjayB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIG1hcmdpbjogMTZweCAwO1xuICBwYWRkaW5nOiAyNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTBlYmY3OzsgLy8jMDA1NmIzIGVuIG9wYWNpdMODwqkgMC4xNVxuXG4gIC50aXRsZSB7XG4gICAgbWFyZ2luOiAwIDAgMTZweCAwO1xuICAgIGZvbnQtc2l6ZTogbWVkaXVtO1xuICAgIGxpbmUtaGVpZ2h0OiAxOXB4O1xuICAgIGNvbG9yOiAjMDA1NmIzO1xuICB9XG5cbiAgLmJ1bGxldCB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIG1hcmdpbjogMCA4cHggMCAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgd2lkdGg6IDRweDtcbiAgICBoZWlnaHQ6IDRweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA1NmIzO1xuICB9XG5cbiAgLmNyaXRlcmlhIHtcbiAgICBwYWRkaW5nOiAwIDAgNXB4O1xuICAgIGNvbG9yOiAjMDA1NmIzO1xuICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICBmb250LXdlaWdodDogNDAwO1xuICB9XG59XG5cbiNwYXNzd29yZDpmb2N1cyB+IC5wd2QtY2hlY2ssXG4jcGFzc3dvcmQ6YWN0aXZlIH4gLnB3ZC1jaGVjayB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG5cblxuLnNob3ctc2VjcmV0IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICByaWdodDogMTBweDtcbiAgdG9wOiAzNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIG1hcmdpbjogMDtcbn1cblxuXG4uYnRuLWZsb2F0aW5nLmJ0bi1zbSBpIHtcbiAgbGluZS1oZWlnaHQ6IDQ2LjE1Mzg1cHg7XG59XG5cbi5idG4tZmxvYXRpbmcgaSB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2lkdGg6IGluaGVyaXQ7XG4gIGNvbG9yOiAjZmZmO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uYnRuLWZsb2F0aW5nIGkge1xuICBmb250LXNpemU6IDEuMjVyZW07XG4gIGxpbmUtaGVpZ2h0OiA0N3B4O1xufVxuLmZhLCAuZmFiLCAuZmFkLCAuZmFsLCAuZmFyLCAuZmFzIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtdmFyaWFudDogbm9ybWFsO1xuICB0ZXh0LXJlbmRlcmluZzogYXV0bztcbiAgbGluZS1oZWlnaHQ6IDE7XG59XG5cbmJ1dHRvbjpub3QoOmRpc2FibGVkKSwgW3R5cGU9XCJidXR0b25cIl06bm90KDpkaXNhYmxlZCksIFt0eXBlPVwicmVzZXRcIl06bm90KDpkaXNhYmxlZCksIFt0eXBlPVwic3VibWl0XCJdOm5vdCg6ZGlzYWJsZWQpIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uZmEtZmFjZWJvb2stZjpiZWZvcmUge1xuICBjb250ZW50OiBcIlxcZjM5ZVwiO1xufVxuXG4qLCAqOjpiZWZvcmUsICo6OmFmdGVyIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuLmJ0bi1mbG9hdGluZyB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgei1pbmRleDogMTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDEwcHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBib3gtc2hhZG93OiAwIDVweCAxMXB4IDAgcmdiYSgwLDAsMCwwLjE4KSwgMCA0cHggMTVweCAwIHJnYmEoMCwwLDAsMC4xNSk7XG4gIHRyYW5zaXRpb246IGFsbCAuMnMgZWFzZS1pbi1vdXQ7XG4gIHdpZHRoOiA0N3B4O1xuICBoZWlnaHQ6IDQ3cHg7XG59XG5cbmEud2F2ZXMtZWZmZWN0LCBhLndhdmVzLWxpZ2h0IHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuXG4uZmEtZ2l0aHViOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXFxmMDliXCI7XG59XG5cbi5mYS1mYWNlYm9vay1mOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXFxmMzllXCI7XG59XG5cbi5idG4tZmIge1xuICBjb2xvcjogI2ZmZiAhaW1wb3J0YW50OztcbiAgYmFja2dyb3VuZC1jb2xvcjogIzNiNTk5OCAhaW1wb3J0YW50O1xufVxuLmJ0bi10dyB7XG4gIGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTVhY2VlICFpbXBvcnRhbnQ7XG59XG5cbi5idG4tZ2l0IHtcbiAgY29sb3I6ICNmZmYgIWltcG9ydGFudDs7XG4gIGJhY2tncm91bmQtY29sb3I6ICMzMzMgIWltcG9ydGFudDtcbn1cblxuLmJ0bi10dyB7XG4gIGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTVhY2VlICFpbXBvcnRhbnQ7XG59XG5cbi53YXZlcy1lZmZlY3Qge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG59XG5cbi50ZXh0LWNlbnRlciB7XG4gIHRleHQtYWxpZ246IGNlbnRlciAhaW1wb3J0YW50O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 30850
/*!**********************************************!*\
  !*** ./src/app/auth/store/errors.reducer.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActionDisplayFunctionalErrors: () => (/* binding */ ActionDisplayFunctionalErrors),
/* harmony export */   ActionHideFunctionalErrors: () => (/* binding */ ActionHideFunctionalErrors),
/* harmony export */   ErrorsActionTypes: () => (/* binding */ ErrorsActionTypes),
/* harmony export */   errorsInitialState: () => (/* binding */ errorsInitialState),
/* harmony export */   functionalErrorsReducer: () => (/* binding */ functionalErrorsReducer),
/* harmony export */   mergeFunctionalErrors: () => (/* binding */ mergeFunctionalErrors),
/* harmony export */   selectorFunctionalErrors: () => (/* binding */ selectorFunctionalErrors)
/* harmony export */ });
var ErrorsActionTypes;
(function (ErrorsActionTypes) {
  ErrorsActionTypes["HIDE_FUNCTIONAL_ERRORS"] = "[FUNCTIONAL ERROR] Hide functional errors";
  ErrorsActionTypes["DISPLAY_FUNCTIONAL_ERRORS"] = "[FUNCTIONAL ERROR] Display functional errors";
})(ErrorsActionTypes || (ErrorsActionTypes = {}));
class ActionHideFunctionalErrors {
  constructor() {
    this.type = ErrorsActionTypes.HIDE_FUNCTIONAL_ERRORS;
  }
}
class ActionDisplayFunctionalErrors {
  constructor(payload) {
    this.payload = payload;
    this.type = ErrorsActionTypes.DISPLAY_FUNCTIONAL_ERRORS;
  }
}
const errorsInitialState = {
  displayErrors: false,
  functionalErrors: []
};
function mergeFunctionalErrors(existingFunctionalErrors, newFunctionalErrors) {
  const result = [...existingFunctionalErrors];
  newFunctionalErrors.forEach(anError => {
    if (!result.includes(anError)) {
      result.push(anError);
    }
  });
  return result;
}
const selectorFunctionalErrors = state => state.functionalErrors;
function functionalErrorsReducer(state = errorsInitialState, action) {
  switch (action.type) {
    case ErrorsActionTypes.HIDE_FUNCTIONAL_ERRORS:
      return {
        ...state,
        displayErrors: false,
        functionalErrors: []
      };
    case ErrorsActionTypes.DISPLAY_FUNCTIONAL_ERRORS:
      return {
        ...state,
        displayErrors: true,
        functionalErrors: mergeFunctionalErrors(state.functionalErrors, action.payload.functionalErrors)
      };
    default:
      return state;
  }
}

/***/ },

/***/ 32795
/*!*********************************************************!*\
  !*** ./src/app/shared/interfaces/pattern.interfaces.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IRegExpPattern: () => (/* binding */ IRegExpPattern)
/* harmony export */ });
var IRegExpPattern;
(function (IRegExpPattern) {
  IRegExpPattern["NUMERIC"] = "numeric";
  IRegExpPattern["ALPHANUMERIC"] = "alphanumeric";
  IRegExpPattern["POSTAL_CODE"] = "code postal";
  IRegExpPattern["PHONE_NUMBER"] = "num\u00E9ro de t\u00E9l\u00E9phone";
  IRegExpPattern["EMAIL"] = "email";
})(IRegExpPattern || (IRegExpPattern = {}));

/***/ },

/***/ 32943
/*!********************************************!*\
  !*** ./src/app/auth/store/auth.reducer.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AUTH_KEY: () => (/* binding */ AUTH_KEY),
/* harmony export */   authInitialState: () => (/* binding */ authInitialState),
/* harmony export */   authReducer: () => (/* binding */ authReducer),
/* harmony export */   clearState: () => (/* binding */ clearState)
/* harmony export */ });
/* harmony import */ var _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @app/auth/store/auth.actions */ 2520);

const AUTH_KEY = 'CORE:AUTH:CONSTANTINE';
const authInitialState = {
  loading: false,
  user: undefined,
  error: undefined
};
function authReducer(state = authInitialState, action) {
  switch (action.type) {
    case _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActionTypes.AUTH_SIGNUP:
      return {
        ...state,
        loading: true,
        error: undefined
      };
    case _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActionTypes.AUTH_SIGNUP_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActionTypes.AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: undefined,
        user: action.payload
      };
    case _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActionTypes.LOGGED_IN:
      return {
        error: undefined,
        loading: false,
        user: action.payload
      };
    case _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActionTypes.LOGIN:
      return {
        ...authInitialState,
        loading: true,
        error: undefined
      };
    case _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActionTypes.LOGOUT:
      return authInitialState;
    case _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActionTypes.LOGGED_OUT:
      return {
        ...state,
        loading: false
      };
    case _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActionTypes.AUTH_REFRESH_USER_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
/**
 * Method used for clearing state/reset store on logout
 * @param reducer
 */
function clearState(reducer) {
  return function (state, action) {
    if (action.type === _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActionTypes.LOGOUT) {
      state = authInitialState;
    }
    return reducer(state, action);
  };
}

/***/ },

/***/ 33163
/*!**********************************************!*\
  !*** ./src/app/auth/store/router.actions.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BACK: () => (/* binding */ BACK),
/* harmony export */   FORWARD: () => (/* binding */ FORWARD),
/* harmony export */   GO: () => (/* binding */ GO),
/* harmony export */   Go: () => (/* binding */ Go)
/* harmony export */ });
const GO = '[Router] Go';
const BACK = '[Router] Back';
const FORWARD = '[Router] Forward';
class Go {
  constructor(payload) {
    this.payload = payload;
    this.type = GO;
  }
}

/***/ },

/***/ 34406
/*!*************************************************!*\
  !*** ./src/app/features/store/items.effects.ts ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ItemsEffects: () => (/* binding */ ItemsEffects)
/* harmony export */ });
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/effects */ 70347);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 59452);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 61318);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 52575);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 13255);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 36647);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 64334);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 98764);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 15842);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngrx/store */ 81383);
/* harmony import */ var _app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @app/features/store/items.actions */ 70671);
/* harmony import */ var _shared_interfaces__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @shared/interfaces */ 40787);
/* harmony import */ var _app_features_store_items_selectors__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @app/features/store/items.selectors */ 4906);
/* harmony import */ var _app_auth_store_auth_selectors__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @app/auth/store/auth.selectors */ 2981);
/* harmony import */ var _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @app/auth/store/auth.actions */ 2520);
/* harmony import */ var _app_features_store_catalog_catalog_actions__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @app/features/store/catalog/catalog.actions */ 95168);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _app_core_firebase_catalog_repository__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @app/core/firebase/catalog.repository */ 53521);
/* harmony import */ var _app_core_firebase_users_repository__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @app/core/firebase/users.repository */ 67848);















const EUR_TO_XAF = 655.96;
function catalogItemsToCategory(categoryMeta, items, prefix) {
  return {
    name: prefix,
    title: categoryMeta.title,
    summary: categoryMeta.description ?? '',
    summaryEn: categoryMeta.descriptionEn ?? '',
    items: items.map((item, index) => new _shared_interfaces__WEBPACK_IMPORTED_MODULE_12__.ItemInfos(item.coverUrl, false, item.reference, index, prefix, false, {
      selectedQuantity: 1,
      selectedSize: _shared_interfaces__WEBPACK_IMPORTED_MODULE_12__.ItemSizeEnum.M,
      selectedModel: 'MODEL_UNIQUE'
    }, item.images?.length ? item.images : [item.coverUrl], Math.round(item.priceXAF / EUR_TO_XAF * 100) / 100))
  };
}
const BASKET_STORAGE_KEY = 'delice-basket';
class ItemsEffects {
  constructor(actions$, catalogRepository, store, usersRepository) {
    this.actions$ = actions$;
    this.catalogRepository = catalogRepository;
    this.store = store;
    this.usersRepository = usersRepository;
    // Quand le catalogue charge ses catégories, on dispatch ActionItemsRetrieve pour chacune.
    this.loadAllCategories$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.ofType)(_app_features_store_catalog_catalog_actions__WEBPACK_IMPORTED_MODULE_16__.CatalogActionTypes.LOAD_CATEGORIES_SUCCESS), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.mergeMap)(action => action.payload.filter(cat => cat.published).map(cat => new _app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_11__.ActionItemsRetrieve({
      category: cat.prefix
    })))));
    this.retriveAll$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.ofType)(_app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_11__.ItemsActionTypes.RETRIEVE_ITEMS), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.mergeMap)(action => {
      const prefix = action.payload.category;
      return this.catalogRepository.watchPublishedItemsByCategory(prefix).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.switchMap)(items => this.catalogRepository.getCategoryOnce(prefix).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(categoryMeta => {
        const meta = categoryMeta ?? {
          prefix,
          title: prefix,
          published: true,
          createdAt: 0
        };
        return new _app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_11__.ActionItemsRetrieveSuccess(catalogItemsToCategory(meta, items, prefix));
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.catchError)(error => (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(new _app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_11__.ActionItemsRetrieveError({
        error
      }))))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.catchError)(error => (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(new _app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_11__.ActionItemsRetrieveError({
        error
      }))));
    })));
    this.toogleSelectOneItem$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.ofType)(_app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_11__.ItemsActionTypes.TOOGLE_SELECT_ITEM), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(action => new _app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_11__.ActionItemToogleSelectSuccess(action.payload))));
    this.saveBasket$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.ofType)(_app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_11__.ItemsActionTypes.TOOGLE_SELECT_ITEM_SUCCESS, _app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_11__.ItemsActionTypes.UPDATE_BASKET_ITEM), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.debounceTime)(300), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.switchMap)(() => this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_10__.select)(_app_features_store_items_selectors__WEBPACK_IMPORTED_MODULE_13__.selectChosenItems), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.take)(1))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.withLatestFrom)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_10__.select)(_app_auth_store_auth_selectors__WEBPACK_IMPORTED_MODULE_14__.selectorConnectedUser))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.tap)(([selectedItems, connectedUser]) => {
      const uid = connectedUser?.additionalInfos?.uid;
      if (selectedItems.length === 0) {
        localStorage.removeItem(BASKET_STORAGE_KEY);
        this.initialBasket = [];
        if (uid) this.usersRepository.saveBasket(uid, []).catch(e => console.error('[basket clear firebase]', e));
        return;
      }
      const toSave = selectedItems.map(item => ({
        reference: item.reference,
        category: item.category,
        index: item.index,
        selected: true,
        basketInfos: {
          selectedQuantity: Math.max(1, item.basketInfos?.selectedQuantity ?? 1),
          selectedSize: item.basketInfos?.selectedSize ?? 'M',
          selectedModel: item.basketInfos?.selectedModel ?? 'MODEL_UNIQUE'
        }
      }));
      localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(toSave));
      this.initialBasket = toSave;
      if (uid) this.usersRepository.saveBasket(uid, toSave).catch(e => console.error('[basket save firebase]', e));
    })), {
      dispatch: false
    });
    this.restoreBasket$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.ofType)(_app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_11__.ItemsActionTypes.RETRIEVE_ITEMS_SUCCESS), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.mergeMap)(action => {
      return this.initialBasket.filter(entry => entry.category === action.payload.name).map(entry => new _app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_11__.ActionRestoreBasketItem(entry));
    })));
    this.clearBasketOnLogout$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.ofType)(_app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_15__.AuthActionTypes.LOGOUT), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.tap)(() => {
      this.initialBasket = [];
    })), {
      dispatch: false
    });
    if (localStorage.getItem('basketCleared')) {
      localStorage.removeItem('basketCleared');
      localStorage.removeItem(BASKET_STORAGE_KEY);
      this.initialBasket = [];
    } else {
      const savedRaw = localStorage.getItem(BASKET_STORAGE_KEY);
      try {
        this.initialBasket = savedRaw ? JSON.parse(savedRaw) : [];
      } catch {
        this.initialBasket = [];
      }
    }
  }
  static {
    this.ɵfac = function ItemsEffects_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ItemsEffects)(_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵinject"](_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.Actions), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵinject"](_app_core_firebase_catalog_repository__WEBPACK_IMPORTED_MODULE_18__.CatalogRepository), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵinject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_10__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵinject"](_app_core_firebase_users_repository__WEBPACK_IMPORTED_MODULE_19__.UsersRepository));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineInjectable"]({
      token: ItemsEffects,
      factory: ItemsEffects.ɵfac
    });
  }
}

/***/ },

/***/ 36340
/*!********************************!*\
  !*** ./src/app/route.model.ts ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   routes: () => (/* binding */ routes)
/* harmony export */ });
/* harmony import */ var _shared_components_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/components/not-found/not-found.component */ 90013);
/* harmony import */ var _features_welcome_welcome_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./features/welcome/welcome.component */ 61810);
/* harmony import */ var _core_guards_admin_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/guards/admin.guard */ 97823);



const routes = [{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
}, {
  path: 'home',
  component: _features_welcome_welcome_component__WEBPACK_IMPORTED_MODULE_1__.WelcomeComponent,
  data: {
    seoTitle: 'Délice Éternel – Couturière & Mode Africaine | Robes, Bijoux, Pagnes | Libreville Gabon',
    seoDesc: 'Couturière-esthéticienne à Libreville, Gabon. Robes africaines sur mesure, pagnes wax, bijoux artisanaux, vêtements pour homme, femme et enfant. Commandez en ligne, livraison mondiale.'
  }
}, {
  path: 'portfolio',
  redirectTo: 'home'
}, {
  path: '404',
  component: _shared_components_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_0__.NotFoundComponent
}, {
  path: 'shopping-cart',
  loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./features/shopping-cart/shopping-cart.module */ 4301)).then(m => m.ShoppingCartModule),
  data: {
    seoTitle: 'Votre Panier – Délice Éternel',
    seoDesc: 'Finalisez votre commande de créations artisanales africaines Délice Éternel.'
  }
}, {
  path: 'auth',
  loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! @app/auth/auth.module */ 60841)).then(m => m.AuthModule)
}, {
  path: 'category',
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_features_category_category_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./features/category/category.module */ 11947)).then(m => m.CategoryModule)
}, {
  path: 'order-history',
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_features_order-history_order-history_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./features/order-history/order-history.module */ 57973)).then(m => m.OrderHistoryModule)
}, {
  path: 'admin',
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_features_admin_admin_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./features/admin/admin.module */ 36269)).then(m => m.AdminModule),
  canActivate: [_core_guards_admin_guard__WEBPACK_IMPORTED_MODULE_2__.AdminGuard]
}, {
  path: '**',
  redirectTo: 'home'
}];

/***/ },

/***/ 36764
/*!******************************************************!*\
  !*** ./src/app/core/animations/router.transition.ts ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ANIMATE_ON_ROUTE_ENTER: () => (/* binding */ ANIMATE_ON_ROUTE_ENTER),
/* harmony export */   routerTransition: () => (/* binding */ routerTransition)
/* harmony export */ });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ 98130);

const ANIMATE_ON_ROUTE_ENTER = 'route-enter-staggered';
const routerTransition = (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('routerTransition', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('* <=> *', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.query)(':enter > *', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  opacity: 0,
  position: 'fixed'
}), {
  optional: true
}), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.query)(':enter .' + ANIMATE_ON_ROUTE_ENTER, (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  opacity: 0
}), {
  optional: true
}), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.sequence)([(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.query)(':leave > *', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  transform: 'translateY(0%)',
  opacity: 1
}), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('0.2s ease-in-out', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  transform: 'translateY(-3%)',
  opacity: 0
})), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  position: 'fixed'
})], {
  optional: true
}), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.query)(':enter > *', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  transform: 'translateY(-3%)',
  opacity: 0,
  position: 'static'
}), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('0.5s ease-in-out', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  transform: 'translateY(0%)',
  opacity: 1
}))], {
  optional: true
})]), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.query)(':enter .' + ANIMATE_ON_ROUTE_ENTER, (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.stagger)(100, [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  transform: 'translateY(15%)',
  opacity: 0
}), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('0.5s ease-in-out', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  transform: 'translateY(0%)',
  opacity: 1
}))]), {
  optional: true
})])]);

/***/ },

/***/ 37314
/*!**********************************************!*\
  !*** ./src/app/auth/store/router.effects.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RouterEffects: () => (/* binding */ RouterEffects)
/* harmony export */ });
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/effects */ 70347);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 98764);
/* harmony import */ var _router_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./router.actions */ 33163);
/* harmony import */ var _app_auth_store_errors_reducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @app/auth/store/errors.reducer */ 30850);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 83305);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 66223);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngrx/store */ 81383);









class RouterEffects {
  constructor(actions$, router, location, store) {
    this.actions$ = actions$;
    this.router = router;
    this.location = location;
    this.store = store;
    this.navigate$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.ofType)(_router_actions__WEBPACK_IMPORTED_MODULE_3__.GO), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(action => action.payload), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => {
      this.store.dispatch(new _app_auth_store_errors_reducer__WEBPACK_IMPORTED_MODULE_4__.ActionHideFunctionalErrors());
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(({
      path,
      query: queryParams,
      extras
    }) => {
      this.router.navigate(path, {
        queryParams,
        ...extras
      });
    })), {
      dispatch: false
    });
    this.navigateBack$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.ofType)(_router_actions__WEBPACK_IMPORTED_MODULE_3__.BACK), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.location.back())), {
      dispatch: false
    });
    this.navigateForward$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.ofType)(_router_actions__WEBPACK_IMPORTED_MODULE_3__.FORWARD), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.location.forward())), {
      dispatch: false
    });
  }
  static {
    this.ɵfac = function RouterEffects_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || RouterEffects)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.Actions), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_7__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_8__.Store));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
      token: RouterEffects,
      factory: RouterEffects.ɵfac
    });
  }
}

/***/ },

/***/ 39665
/*!***********************************************************************!*\
  !*** ./src/app/shared/directives/text-transform/TransformTypeEnum.ts ***!
  \***********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TransformTypeEnum: () => (/* binding */ TransformTypeEnum)
/* harmony export */ });
var TransformTypeEnum;
(function (TransformTypeEnum) {
  TransformTypeEnum["UPPERCASE"] = "uppercase";
  TransformTypeEnum["LOWERCASE"] = "lowercase";
  TransformTypeEnum["CAMELCASE"] = "camelcase";
  TransformTypeEnum["CAPITALIZE"] = "capitalize";
})(TransformTypeEnum || (TransformTypeEnum = {}));

/***/ },

/***/ 40449
/*!**************************************************************************!*\
  !*** ./src/app/shared/pipes/pattern-transform/pattern-transform.pipe.ts ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PatternTransformPipe: () => (/* binding */ PatternTransformPipe)
/* harmony export */ });
/* harmony import */ var _shared_interfaces_pattern_interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/interfaces/pattern.interfaces */ 32795);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 36124);


class PatternTransformPipe {
  static transformText(value, type = '') {
    if (!value || typeof value !== 'string') {
      return '';
    }
    switch (type) {
      case _shared_interfaces_pattern_interfaces__WEBPACK_IMPORTED_MODULE_0__.IRegExpPattern.NUMERIC:
        return value.replace(/[^0-9]/, '');
      case _shared_interfaces_pattern_interfaces__WEBPACK_IMPORTED_MODULE_0__.IRegExpPattern.ALPHANUMERIC:
        return value.replace(/[^a-zA-Z0-9]/, '');
      case _shared_interfaces_pattern_interfaces__WEBPACK_IMPORTED_MODULE_0__.IRegExpPattern.POSTAL_CODE:
        return value.replace(/^[0-9]{5,5}/, '');
      case _shared_interfaces_pattern_interfaces__WEBPACK_IMPORTED_MODULE_0__.IRegExpPattern.PHONE_NUMBER:
        return value.replace(/^(\d\d\s){4}(\d\d)/, '');
      case _shared_interfaces_pattern_interfaces__WEBPACK_IMPORTED_MODULE_0__.IRegExpPattern.EMAIL:
        return value.replace(/^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}/, '');
      default:
        return value;
    }
  }
  transform(value, type = '') {
    return PatternTransformPipe.transformText(value, type);
  }
  static {
    this.ɵfac = function PatternTransformPipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || PatternTransformPipe)();
    };
  }
  static {
    this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({
      name: "patternTransform",
      type: PatternTransformPipe,
      pure: true,
      standalone: false
    });
  }
}

/***/ },

/***/ 40497
/*!************************************************************************!*\
  !*** ./src/app/shared/directives/number-only/number-only.directive.ts ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NumberOnlyDirective: () => (/* binding */ NumberOnlyDirective)
/* harmony export */ });
/* harmony import */ var _shared_helpers_keys_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/helpers/keys.helpers */ 54849);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 36124);


class NumberOnlyDirective {
  onKeyDown(event) {
    const e = event;
    const min = event.target.getAttribute('appMin');
    const max = event.target.getAttribute('appMax');
    const v = event.target.value;
    if (e.key === 'ArrowDown' && typeof min !== 'undefined' && +v <= +min) {
      return e.preventDefault();
    }
    if (e.key === 'ArrowUp' && typeof max !== 'undefined' && +v >= +max) {
      return e.preventDefault();
    }
    if (e.key === '-' && typeof min !== 'undefined' && !isNaN(min) && +min >= 0) {
      return e.preventDefault();
    }
    if ((0,_shared_helpers_keys_helpers__WEBPACK_IMPORTED_MODULE_0__.isMetaKey)(e)) {
      return;
    }
    if (/^\d*$/.test(e.key)) {
      return;
    } else {
      e.preventDefault();
    }
  }
  onKeyUp(event) {
    const e = event;
    const t = e.currentTarget;
    if (t.value && isNaN(+t.value)) {
      t.value = '';
    }
  }
  onMouseWheel(event) {
    const e = event;
    const v = event.target.value;
    const max = event.target.getAttribute('appMax');
    const min = event.target.getAttribute('appMin') !== null ? event.target.getAttribute('appMin') : 0;
    if (event.deltaY < 0 && max !== null && +v >= +max || event.deltaY > 0 && min !== null && +v <= +min) {
      return e.preventDefault();
    }
  }
  static {
    this.ɵfac = function NumberOnlyDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || NumberOnlyDirective)();
    };
  }
  static {
    this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: NumberOnlyDirective,
      selectors: [["", "appNumberOnly", ""]],
      hostBindings: function NumberOnlyDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("keydown", function NumberOnlyDirective_keydown_HostBindingHandler($event) {
            return ctx.onKeyDown($event);
          })("keyup", function NumberOnlyDirective_keyup_HostBindingHandler($event) {
            return ctx.onKeyUp($event);
          })("wheel", function NumberOnlyDirective_wheel_HostBindingHandler($event) {
            return ctx.onMouseWheel($event);
          });
        }
      },
      standalone: false
    });
  }
}

/***/ },

/***/ 40508
/*!***********************************************************************************!*\
  !*** ./src/app/shared/components/advertisements/ad-banner/ad-banner.component.ts ***!
  \***********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdBannerComponent: () => (/* binding */ AdBannerComponent)
/* harmony export */ });
/* harmony import */ var _directives_ad_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../directives/ad.directive */ 12687);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 36124);



function AdBannerComponent_ng_template_3_Template(rf, ctx) {}
class AdBannerComponent {
  constructor(componentFactoryResolver) {
    this.componentFactoryResolver = componentFactoryResolver;
    this.currentAdIndex = -1;
  }
  ngOnInit() {
    this.loadComponent();
    this.getAds();
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
  loadComponent() {
    /*this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const adItem = this.ads[this.currentAdIndex];
         const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
         const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
         const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
    *
     */
  }
  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }
  static {
    this.ɵfac = function AdBannerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AdBannerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ComponentFactoryResolver));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: AdBannerComponent,
      selectors: [["app-ad-banner"]],
      viewQuery: function AdBannerComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_directives_ad_directive__WEBPACK_IMPORTED_MODULE_0__.AdDirective, 7);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.adHost = _t.first);
        }
      },
      inputs: {
        ads: "ads"
      },
      standalone: false,
      decls: 4,
      vars: 0,
      consts: [[1, "ad-banner-example"], ["ad-host", ""]],
      template: function AdBannerComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Advertisements");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, AdBannerComponent_ng_template_3_Template, 0, 0, "ng-template", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      },
      dependencies: [_directives_ad_directive__WEBPACK_IMPORTED_MODULE_0__.AdDirective],
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 40787
/*!********************************************!*\
  !*** ./src/app/shared/interfaces/index.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Category: () => (/* reexport safe */ _image_interfaces__WEBPACK_IMPORTED_MODULE_1__.Category),
/* harmony export */   CategoryInfos: () => (/* reexport safe */ _image_interfaces__WEBPACK_IMPORTED_MODULE_1__.CategoryInfos),
/* harmony export */   ITEM_SIZES: () => (/* reexport safe */ _image_interfaces__WEBPACK_IMPORTED_MODULE_1__.ITEM_SIZES),
/* harmony export */   ItemInfos: () => (/* reexport safe */ _image_interfaces__WEBPACK_IMPORTED_MODULE_1__.ItemInfos),
/* harmony export */   ItemSizeEnum: () => (/* reexport safe */ _image_interfaces__WEBPACK_IMPORTED_MODULE_1__.ItemSizeEnum)
/* harmony export */ });
/* harmony import */ var _currency_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./currency.type */ 18168);
/* harmony import */ var _image_interfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image.interfaces */ 60766);
/* harmony import */ var _map_interfaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map.interfaces */ 18351);
/* harmony import */ var _portfolio_interfaces__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./portfolio.interfaces */ 40953);
/* harmony import */ var _advertissement_interfaces__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./advertissement.interfaces */ 14687);
/* harmony import */ var _auth_interfaces__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth.interfaces */ 56771);







/***/ },

/***/ 40887
/*!******************************************************************************!*\
  !*** ./src/app/shared/components/portfolio-item/portfolio-item.component.ts ***!
  \******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PortfolioItemComponent: () => (/* binding */ PortfolioItemComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 46264);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ 48503);



const _c0 = a0 => [a0];
class PortfolioItemComponent {
  ngOnInit() {
    const urls = this.data.imageUrls?.length ? this.data.imageUrls : [this.data.coverImageUrl];
    // Démarrer à un index aléatoire
    let index = Math.floor(Math.random() * urls.length);
    this.currentImageUrl = urls[index];
    if (urls.length > 1) {
      this.intervalId = setInterval(() => {
        index = (index + 1) % urls.length;
        this.currentImageUrl = urls[index];
      }, 3000);
    }
  }
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  static {
    this.ɵfac = function PortfolioItemComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || PortfolioItemComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: PortfolioItemComponent,
      selectors: [["app-portfolio-item"]],
      inputs: {
        data: "data"
      },
      standalone: false,
      decls: 21,
      vars: 17,
      consts: [[1, "row"], [1, "col-md-12", "mb-12"], [1, ""], [1, "view", "zoom", "overlay", "z-depth-1", "rounded", "mb-3", "mb-md-0", 2, "cursor", "pointer"], ["loading", "lazy", 1, "img-fluid", "w-100", 2, "cursor", "pointer", 3, "src", "alt"], [3, "routerLink"], [1, "mask", "waves-effect", "waves-light"], ["loading", "lazy", 1, "img-fluid", "w-100", 3, "src"], [1, "mask", "rgba-black-slight"], [1, "text-center", "pt-4", "portfolio-item", "mx-auto", 2, "cursor", "pointer", 3, "routerLink"], [1, "portfolio-item-caption", "d-flex", "align-items-center", "justify-content-center", "h-100", "w-100"], [1, "portfolio-item-caption-content", "text-center", "text-white"], [1, "fas", "fa-plus", "fa-3x"], [1, "mb-2", "text-muted", "text-uppercase", "small"]],
      template: function PortfolioItemComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section")(1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "img", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](6, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 5)(8, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "img", 7)(10, "div", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 9)(12, "h5");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](14, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 10)(16, "div", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "i", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "p", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](20, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.currentImageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"])("alt", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](6, 7, ctx.data.portfolioName));
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](13, _c0, ctx.data.portfolioLink));
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.currentImageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](15, _c0, ctx.data.portfolioLink));
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](14, 9, ctx.data.portfolioName));
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](20, 11, "PRODUCTS.MORE"));
        }
      },
      dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterLink, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslatePipe],
      styles: ["p[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n\n.displayed[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n.img-fluid[_ngcontent-%COMP%], .img-thumbnail[_ngcontent-%COMP%] {\n  max-width: 100%;\n  height: 350px;\n  object-fit: contain;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvcG9ydGZvbGlvLWl0ZW0vcG9ydGZvbGlvLWl0ZW0uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbInAge1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmRpc3BsYXllZCB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmltZy1mbHVpZCwgLmltZy10aHVtYm5haWwge1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMzUwcHg7XG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ },

/***/ 40953
/*!***********************************************************!*\
  !*** ./src/app/shared/interfaces/portfolio.interfaces.ts ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);


/***/ },

/***/ 42375
/*!************************************************!*\
  !*** ./src/app/shared/services/seo.service.ts ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SeoService: () => (/* binding */ SeoService)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ 83305);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ 80436);





const SITE_URL = 'https://delice-eternel-gabon.web.app';
const DEFAULT_TITLE = 'Délice Éternel – Couturière & Mode Africaine | Robes, Bijoux, Pagnes | Libreville Gabon';
const DEFAULT_DESC = 'Couturière à Libreville, Gabon. Robes africaines sur mesure, pagnes wax, bijoux artisanaux, vêtements homme femme enfant. Livraison mondiale.';
class SeoService {
  constructor(titleService, meta, router, activatedRoute) {
    this.titleService = titleService;
    this.meta = meta;
    this.router = router;
    this.activatedRoute = activatedRoute;
  }
  init() {
    this.router.events.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(e => e instanceof _angular_router__WEBPACK_IMPORTED_MODULE_0__.NavigationEnd), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(() => {
      let route = this.activatedRoute;
      while (route.firstChild) {
        route = route.firstChild;
      }
      return route.snapshot.data;
    })).subscribe(data => {
      const title = data['seoTitle'] || DEFAULT_TITLE;
      const desc = data['seoDesc'] || DEFAULT_DESC;
      const url = SITE_URL + this.router.url;
      this.titleService.setTitle(title);
      this.meta.updateTag({
        name: 'description',
        content: desc
      });
      this.meta.updateTag({
        property: 'og:title',
        content: title
      });
      this.meta.updateTag({
        property: 'og:description',
        content: desc
      });
      this.meta.updateTag({
        property: 'og:url',
        content: url
      });
    });
  }
  static {
    this.ɵfac = function SeoService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || SeoService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.Title), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.Meta), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_0__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_0__.ActivatedRoute));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
      token: SeoService,
      factory: SeoService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 42815
/*!******************************************!*\
  !*** ./src/app/shared/services/index.ts ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   APP_PASSWORD_CONFIG: () => (/* reexport safe */ _password_password_service__WEBPACK_IMPORTED_MODULE_4__.APP_PASSWORD_CONFIG),
/* harmony export */   AuthService: () => (/* reexport safe */ _api_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService),
/* harmony export */   CacheService: () => (/* reexport safe */ _cache_cache_service__WEBPACK_IMPORTED_MODULE_5__.CacheService),
/* harmony export */   PasswordService: () => (/* reexport safe */ _password_password_service__WEBPACK_IMPORTED_MODULE_4__.PasswordService),
/* harmony export */   PermissionService: () => (/* reexport safe */ _permissions_permission_service__WEBPACK_IMPORTED_MODULE_1__.PermissionService),
/* harmony export */   ROLES: () => (/* reexport safe */ _roles_list__WEBPACK_IMPORTED_MODULE_2__.ROLES),
/* harmony export */   RolesService: () => (/* reexport safe */ _roles_roles_service__WEBPACK_IMPORTED_MODULE_3__.RolesService)
/* harmony export */ });
/* harmony import */ var _api_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api/auth.service */ 26497);
/* harmony import */ var _permissions_permission_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./permissions/permission.service */ 28880);
/* harmony import */ var _roles_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./roles/list */ 7565);
/* harmony import */ var _roles_roles_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./roles/roles.service */ 69321);
/* harmony import */ var _password_password_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./password/password.service */ 29365);
/* harmony import */ var _cache_cache_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cache/cache.service */ 55801);







/***/ },

/***/ 43137
/*!*******************************************************************************************!*\
  !*** ./src/app/shared/components/advertisements/details/ad-header/ad-header.component.ts ***!
  \*******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdHeaderComponent: () => (/* binding */ AdHeaderComponent)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ 83305);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 33900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 10819);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 79748);
/* harmony import */ var _icone_divider_icone_divider_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../icone-divider/icone-divider.component */ 99905);







const _c0 = (a0, a1) => ({
  "masthead": a0,
  "adjust": a1
});
function AdHeaderComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "img", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "h1", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "app-icone-divider");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinterpolate"](ctx_r0.data.headerImg), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r0.data.headline);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r0.data.body, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r0.data.footer);
  }
}
class AdHeaderComponent {
  constructor(router) {
    this.router = router;
    this.displayHtml = true;
    this.unsubscribe$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
  }
  ngOnInit() {
    this.router.events.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this.unsubscribe$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_0__.ActivationEnd)).subscribe(event => {
      this.displayHtml = (event.snapshot.routeConfig?.path?.indexOf('home') ?? -1) >= 0;
    });
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  static {
    this.ɵfac = function AdHeaderComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AdHeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_0__.Router));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
      type: AdHeaderComponent,
      selectors: [["app-ad-header"]],
      inputs: {
        data: "data"
      },
      standalone: false,
      decls: 2,
      vars: 5,
      consts: [[1, "bg-primary", "text-white", "text-center", 3, "ngClass"], ["id", "headerId", 1, "container", "d-flex", "align-items-center", "flex-column"], ["alt", "", 1, "masthead-avatar", "mb-5", 3, "src"], [1, "masthead-heading", "mb-0", "slogan"], [1, "pre-wrap", "masthead-subheading", "font-weight-light", "mb-0"], [1, "atelier"]],
      template: function AdHeaderComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "header", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵconditionalCreate"](1, AdHeaderComponent_Conditional_1_Template, 9, 5, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction2"](2, _c0, ctx.displayHtml, !ctx.displayHtml));
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵconditional"](ctx.displayHtml ? 1 : -1);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgClass, _icone_divider_icone_divider_component__WEBPACK_IMPORTED_MODULE_6__.IconeDividerComponent],
      styles: [".adjust[_ngcontent-%COMP%] {\n  margin-top: 70px;\n}\n\n.bg-primary[_ngcontent-%COMP%] {\n  background-image: url(\"/assets/mask-3-removebg-preview.png\");\n  background-color: #17a2b8 !important;\n  background-repeat: no-repeat;\n  background-size: contain;\n  background-position: 50% 50%;\n}\n\n.masthead[_ngcontent-%COMP%]   .masthead-avatar[_ngcontent-%COMP%] {\n  width: 13rem;\n}\n\n.atelier[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-style: italic;\n}\n\n.masthead[_ngcontent-%COMP%]   .masthead-heading[_ngcontent-%COMP%] {\n  font-size: 1.55rem;\n}\n\n.slogan[_ngcontent-%COMP%] {\n  position: relative;\n  bottom: 0;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvYWR2ZXJ0aXNlbWVudHMvZGV0YWlscy9hZC1oZWFkZXIvYWQtaGVhZGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLDREQUFBO0VBQ0Esb0NBQUE7RUFDQSw0QkFBQTtFQUNBLHdCQUFBO0VBQ0EsNEJBQUE7QUFDRjs7QUFFQTtFQUNFLFlBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLmFkanVzdCB7XG4gIG1hcmdpbi10b3A6IDcwcHggO1xufVxuXG4uYmctcHJpbWFyeSB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9tYXNrLTMtcmVtb3ZlYmctcHJldmlldy5wbmcnKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzE3YTJiOCAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gIGJhY2tncm91bmQtcG9zaXRpb246IDUwJSA1MCU7XG59XG5cbi5tYXN0aGVhZCAubWFzdGhlYWQtYXZhdGFyIHtcbiAgd2lkdGg6IDEzcmVtO1xufVxuXG4uYXRlbGllciB7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xufVxuXG4ubWFzdGhlYWQgLm1hc3RoZWFkLWhlYWRpbmcge1xuICBmb250LXNpemU6IDEuNTVyZW07XG59XG5cbi5zbG9nYW4ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJvdHRvbTogMDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ },

/***/ 44605
/*!************************************************************!*\
  !*** ./src/app/shared/components/alert/alert.component.ts ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlertComponent: () => (/* binding */ AlertComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/dialog */ 12587);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ 48503);




class AlertComponent {
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.data = data;
    this._data = data;
  }
  closed() {}
  closeModal() {
    this.dialogRef.close();
  }
  static {
    this.ɵfac = function AlertComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AlertComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__.MAT_DIALOG_DATA));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: AlertComponent,
      selectors: [["app-alert"]],
      standalone: false,
      decls: 13,
      vars: 4,
      consts: [["role", "alert", "aria-live", "assertive", "aria-atomic", "true", "data-autohide", "false"], [1, "toast-header"], ["_ngcontent-wtx-c240", "", "src", "assets/style-sauvage_only_logo-removebg.png", "height", "40px"], [1, "mr-auto"], ["type", "button", "data-dismiss", "toast", "aria-label", "Close", 1, "ml-2", "mb-1", "close", 3, "click"], ["aria-hidden", "true"], [1, "toast-body"]],
      template: function AlertComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "img", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "strong", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Ooops !!");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "small");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](7, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "button", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AlertComponent_Template_button_click_8_listener() {
            return ctx.closeModal();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "span", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "\u00D7");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](7, 2, ctx._data.title));
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx._data.message, " ");
        }
      },
      dependencies: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslatePipe],
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 45212
/*!****************************************************!*\
  !*** ./src/app/shared/services/pricing.service.ts ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PricingService: () => (/* binding */ PricingService)
/* harmony export */ });
/* harmony import */ var _app_core_store_ui_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @app/core/store/ui.actions */ 7303);
/* harmony import */ var _app_core_store_ui_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @app/core/store/ui.selectors */ 82802);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ 81383);
/* harmony import */ var _app_core_firebase_catalog_repository__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @app/core/firebase/catalog.repository */ 53521);






/**
 * PricingService
 *
 * Responsabilités :
 *  - Fournir la devise active et formater les prix selon la langue.
 *  - Les prix des articles viennent directement des items Firebase (priceXAF / EUR).
 *
 * Devises supportées :
 *  - EUR (€)    : langue 'fr' ou 'en'
 *  - XAF (FCFA) : langue 'fr' uniquement, taux fixe 1 EUR = 655.957 FCFA
 */
class PricingService {
  constructor(translate, store, catalogRepository) {
    this.translate = translate;
    this.store = store;
    this.catalogRepository = catalogRepository;
    /** Snapshot synchrone utilisé dans format() et tvaRate. */
    this._currency = 'XAF';
    /** Langue active (snapshot synchrone). */
    this._lang = 'fr';
    this.EUR_TO_XAF = 655.96;
    this.RATES = {
      fr: 1,
      en: 1.08
    };
    this.SYMBOLS = {
      fr: '€',
      en: '$'
    };
    /** Surcharges de prix (nœud prices/ Firebase — conservé pour compatibilité ascendante). */
    this.priceOverridesXAF = {};
    this.currency$ = this.store.select(_app_core_store_ui_selectors__WEBPACK_IMPORTED_MODULE_1__.selectCurrency);
    this.currency$.subscribe(c => {
      this._currency = c;
    });
    this.catalogRepository.watchPriceOverrides().subscribe(overrides => {
      this.priceOverridesXAF = overrides;
    });
    this.translate.onLangChange.subscribe(({
      lang
    }) => {
      this._lang = lang;
      if (lang !== 'fr') {
        localStorage.removeItem('currency');
        this.setCurrency('EUR');
      }
    });
  }
  get currency() {
    return this._currency;
  }
  get eurToXaf() {
    return this.EUR_TO_XAF;
  }
  /**
   * Retourne le prix effectif en EUR.
   * Si une surcharge Firebase existe (prices/ node), elle prend le dessus sur defaultEur.
   */
  getEffectiveEur(reference, defaultEur) {
    const xaf = this.priceOverridesXAF[reference];
    return xaf != null ? Math.round(xaf / this.EUR_TO_XAF * 100) / 100 : defaultEur;
  }
  /** Prix en FCFA effectif pour affichage. */
  getEffectiveXAF(reference, defaultEur) {
    const xaf = this.priceOverridesXAF[reference];
    return xaf != null ? xaf : Math.round(defaultEur * this.EUR_TO_XAF);
  }
  /** TVA applicable : 0% en FCFA, 10% en EUR. */
  get tvaRate() {
    return this._currency === 'XAF' ? 0 : 0.10;
  }
  /** Change la devise : persiste en localStorage et dispatche une action NgRx. */
  setCurrency(currency) {
    localStorage.setItem('currency', currency);
    this.store.dispatch(new _app_core_store_ui_actions__WEBPACK_IMPORTED_MODULE_0__.ActionSetCurrency({
      currency
    }));
  }
  /** Formate un prix en EUR selon la langue et la devise actives. */
  format(priceEur) {
    return this.formatAmount(this.formatRaw(priceEur));
  }
  /**
   * Retourne la valeur numérique dans la devise d'affichage (arrondie),
   * sans le suffixe. Utile pour sommer des montants item par item
   * avant d'afficher le total, afin d'éviter les écarts d'arrondi.
   */
  formatRaw(priceEur) {
    if (this._currency === 'XAF') {
      return Math.round(priceEur * this.EUR_TO_XAF / 100) * 100;
    }
    const rate = this.RATES[this._lang] ?? 1;
    const raw = priceEur * rate;
    return raw >= 1 ? Math.round(raw) : parseFloat(raw.toFixed(2));
  }
  /** Formate un montant déjà exprimé dans la devise d'affichage (sans conversion). */
  formatAmount(amount) {
    if (this._currency === 'XAF') {
      return `${amount.toLocaleString('fr-FR')} FCFA`;
    }
    const lang = this._lang;
    const symbol = this.SYMBOLS[lang] ?? '€';
    const value = amount >= 1 ? Math.round(amount).toString() : amount.toFixed(2);
    return lang === 'en' ? `${symbol}${value}` : `${value} ${symbol}`;
  }
  static {
    this.ɵfac = function PricingService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || PricingService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_4__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_app_core_firebase_catalog_repository__WEBPACK_IMPORTED_MODULE_5__.CatalogRepository));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
      token: PricingService,
      factory: PricingService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 45312
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
/* harmony import */ var _environment_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./environment.common */ 6965);
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const environment = {
  ..._environment_common__WEBPACK_IMPORTED_MODULE_0__.environment,
  appName: `${_environment_common__WEBPACK_IMPORTED_MODULE_0__.environment.appName} - DEV`,
  envName: "DEV" /* ENV_TYPES.DEV */,
  useEmulators: false,
  redux: {
    log: true
  }
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

/***/ },

/***/ 47160
/*!******************************************************************************************!*\
  !*** ./src/app/shared/components/advertisements/ad-item/ad-item-component2.component.ts ***!
  \******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdItemComponent2: () => (/* binding */ AdItemComponent2)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 36124);

class AdItemComponent2 {
  //constructor(public component: Type<any>, public data: any) { }
  // constructor(public component: any, public data: any) { }
  ngOnInit() {}
  static {
    this.ɵfac = function AdItemComponent2_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AdItemComponent2)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: AdItemComponent2,
      selectors: [["app-ad-item"]],
      standalone: false,
      decls: 2,
      vars: 0,
      template: function AdItemComponent2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "ad-item works!");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      },
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 48239
/*!******************************************************************************!*\
  !*** ./src/app/shared/components/modal/portfolio16/portfolio16.component.ts ***!
  \******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Portfolio16Component: () => (/* binding */ Portfolio16Component)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _icone_divider_icone_divider_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../icone-divider/icone-divider.component */ 99905);


class Portfolio16Component {
  constructor() {}
  ngOnInit() {}
  static {
    this.ɵfac = function Portfolio16Component_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || Portfolio16Component)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: Portfolio16Component,
      selectors: [["app-portfolio16"]],
      standalone: false,
      decls: 19,
      vars: 0,
      consts: [["id", "portfolioModal6", "tabindex", "-1", "role", "dialog", "aria-labelledby", "#portfolioModal6Label", "aria-hidden", "true", 1, "portfolio-modal", "modal", "fade"], ["role", "document", 1, "modal-dialog", "modal-xl"], [1, "modal-content"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", 1, "close"], ["aria-hidden", "true"], [1, "fas", "fa-times"], [1, "modal-body", "text-center"], [1, "container"], [1, "row", "justify-content-center"], [1, "col-lg-8"], [1, "portfolio-modal-title", "text-secondary", "mb-0"], ["src", "assets/image.svg", "alt", "New Image", 1, "img-fluid", "rounded", "mb-5"], [1, "mb-5"], ["href", "#", "data-dismiss", "modal", 1, "btn", "btn-primary"], [1, "fas", "fa-times", "fa-fw"]],
      template: function Portfolio16Component_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "button", 3)(4, "span", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "i", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 6)(7, "div", 7)(8, "div", 8)(9, "div", 9)(10, "h2", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "New Image");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "app-icone-divider")(13, "img", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "p", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "New Image Description");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "button", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "i", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Close Window");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()()()();
        }
      },
      dependencies: [_icone_divider_icone_divider_component__WEBPACK_IMPORTED_MODULE_1__.IconeDividerComponent],
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 48423
/*!*************************************!*\
  !*** ./src/app/core/core.module.ts ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CoreModule: () => (/* binding */ CoreModule),
/* harmony export */   metaReducers: () => (/* binding */ metaReducers)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 79748);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 50698);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ 81383);
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/effects */ 70347);
/* harmony import */ var _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store-devtools */ 11925);
/* harmony import */ var ngx_mask__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-mask */ 86769);
/* harmony import */ var _env_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @env/environment */ 45312);
/* harmony import */ var _shared_services_api_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/services/api/auth.service */ 26497);
/* harmony import */ var _meta_reducers_debug_reducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./meta-reducers/debug.reducer */ 52039);
/* harmony import */ var _meta_reducers_init_state_from_local_storage_reducer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./meta-reducers/init-state-from-local-storage.reducer */ 26003);
/* harmony import */ var _local_storage_local_storage_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./local-storage/local-storage.service */ 92570);
/* harmony import */ var _app_core_interceptors__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @app/core/interceptors */ 79057);
/* harmony import */ var _app_core_interceptors_assets_interceptor__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @app/core/interceptors/assets.interceptor */ 60593);
/* harmony import */ var _app_auth_store__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @app/auth/store */ 83575);
/* harmony import */ var _store_ui_reducer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./store/ui.reducer */ 6084);
/* harmony import */ var _app_auth_store_errors_reducer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @app/auth/store/errors.reducer */ 30850);
/* harmony import */ var _shared_services__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @shared/services */ 42815);
/* harmony import */ var _helpers_constants__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @helpers/constants */ 4245);
/* harmony import */ var _app_core_firebase_firebase_repositories_module__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @app/core/firebase/firebase-repositories.module */ 64992);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/core */ 36124);























const metaReducers = [_meta_reducers_init_state_from_local_storage_reducer__WEBPACK_IMPORTED_MODULE_9__.initStateFromLocalStorage];
if (!_env_environment__WEBPACK_IMPORTED_MODULE_6__.environment.production) {
  metaReducers.unshift(_meta_reducers_debug_reducer__WEBPACK_IMPORTED_MODULE_8__.debug);
}
class CoreModule {
  constructor(parentModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
  static {
    this.ɵfac = function CoreModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CoreModule)(_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵinject"](CoreModule, 12));
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineNgModule"]({
      type: CoreModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdefineInjector"]({
      providers: [_shared_services__WEBPACK_IMPORTED_MODULE_16__.CacheService, {
        provide: _helpers_constants__WEBPACK_IMPORTED_MODULE_17__.APP_CONFIG,
        useValue: {
          debounceTime: 600,
          snackDuration: 5000
        }
      }, _local_storage_local_storage_service__WEBPACK_IMPORTED_MODULE_10__.LocalStorageService, _shared_services_api_auth_service__WEBPACK_IMPORTED_MODULE_7__.AuthService,
      // ngx-mask (Angular 16+)
      (0,ngx_mask__WEBPACK_IMPORTED_MODULE_5__.provideNgxMask)(), {
        provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HTTP_INTERCEPTORS,
        useClass: _app_core_interceptors__WEBPACK_IMPORTED_MODULE_11__.XTokenInterceptor,
        multi: true
      }, {
        provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HTTP_INTERCEPTORS,
        useClass: _app_core_interceptors_assets_interceptor__WEBPACK_IMPORTED_MODULE_12__.AssetsInterceptor,
        multi: true
      }, (0,_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.provideHttpClient)((0,_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.withInterceptorsFromDi)())],
      imports: [
      // angular
      _angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule,
      // ngrx
      _ngrx_store__WEBPACK_IMPORTED_MODULE_2__.StoreModule.forRoot({
        'core:auth:constantine': _app_auth_store__WEBPACK_IMPORTED_MODULE_13__.authReducer,
        meta: _app_auth_store__WEBPACK_IMPORTED_MODULE_13__.metaReducer,
        functionalErrors: _app_auth_store_errors_reducer__WEBPACK_IMPORTED_MODULE_15__.functionalErrorsReducer,
        ui: _store_ui_reducer__WEBPACK_IMPORTED_MODULE_14__.uiReducer
      }, {
        metaReducers,
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
          strictStateSerializability: false,
          strictActionSerializability: false,
          strictActionWithinNgZone: false
        }
      }), _ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.EffectsModule.forRoot([_app_auth_store__WEBPACK_IMPORTED_MODULE_13__.AuthEffects, _app_auth_store__WEBPACK_IMPORTED_MODULE_13__.RouterEffects]), _app_core_firebase_firebase_repositories_module__WEBPACK_IMPORTED_MODULE_18__.FirebaseRepositoriesModule,
      // Instrumentation must be imported after importing StoreModule
      _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_4__.StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: _env_environment__WEBPACK_IMPORTED_MODULE_6__.environment.production
      })]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵsetNgModuleScope"](CoreModule, {
    imports: [
    // angular
    _angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _ngrx_store__WEBPACK_IMPORTED_MODULE_2__.StoreRootModule, _ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.EffectsRootModule, _app_core_firebase_firebase_repositories_module__WEBPACK_IMPORTED_MODULE_18__.FirebaseRepositoriesModule, _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_4__.StoreDevtoolsModule]
  });
})();

/***/ },

/***/ 48672
/*!*******************************!*\
  !*** ./src/app/core/index.ts ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ANIMATE_ON_ROUTE_ENTER: () => (/* reexport safe */ _animations_router_transition__WEBPACK_IMPORTED_MODULE_1__.ANIMATE_ON_ROUTE_ENTER),
/* harmony export */   CoreModule: () => (/* reexport safe */ _core_module__WEBPACK_IMPORTED_MODULE_2__.CoreModule),
/* harmony export */   LocalStorageService: () => (/* reexport safe */ _local_storage_local_storage_service__WEBPACK_IMPORTED_MODULE_0__.LocalStorageService),
/* harmony export */   XTokenInterceptor: () => (/* reexport safe */ _interceptors__WEBPACK_IMPORTED_MODULE_3__.XTokenInterceptor),
/* harmony export */   metaReducers: () => (/* reexport safe */ _core_module__WEBPACK_IMPORTED_MODULE_2__.metaReducers),
/* harmony export */   routerTransition: () => (/* reexport safe */ _animations_router_transition__WEBPACK_IMPORTED_MODULE_1__.routerTransition)
/* harmony export */ });
/* harmony import */ var _local_storage_local_storage_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./local-storage/local-storage.service */ 92570);
/* harmony import */ var _animations_router_transition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./animations/router.transition */ 36764);
/* harmony import */ var _core_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core.module */ 48423);
/* harmony import */ var _interceptors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interceptors */ 79057);





/***/ },

/***/ 49949
/*!************************************************************!*\
  !*** ./src/app/shared/components/about/about.component.ts ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AboutComponent: () => (/* binding */ AboutComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _icone_divider_icone_divider_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../icone-divider/icone-divider.component */ 99905);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ 48503);



class AboutComponent {
  constructor() {}
  ngOnInit() {}
  static {
    this.ɵfac = function AboutComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AboutComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: AboutComponent,
      selectors: [["app-about"]],
      standalone: false,
      decls: 16,
      vars: 9,
      consts: [["id", "about", 1, "page-section", "bg-primary", "text-white", "mb-0"], [1, "container"], [1, "text-center"], [1, "page-section-heading", "d-inline-block", "text-white"], [1, "row", "text-justify"], [1, "col-lg-4", "ml-auto"], [1, "pre-wrap", "lead"], [1, "col-lg-4", "mr-auto"]],
      template: function AboutComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "app-icone-divider");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 4)(8, "div", 5)(9, "p", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](11, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 7)(13, "p", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](15, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](5, 3, "ABOUT"));
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](11, 5, "ABOUT_MY_APPLICATION"));
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](15, 7, "ABOUT_WEBDESIGNER"));
        }
      },
      dependencies: [_icone_divider_icone_divider_component__WEBPACK_IMPORTED_MODULE_1__.IconeDividerComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslatePipe],
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 50635
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule),
/* harmony export */   FirebaseTranslateLoaderFactory: () => (/* binding */ FirebaseTranslateLoaderFactory)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ 94967);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser/animations */ 43835);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 50698);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 95429);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 59452);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 61318);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 36647);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app.component */ 20092);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app-routing.module */ 94114);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../environments/environment */ 45312);
/* harmony import */ var _angular_fire_app__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/fire/app */ 82945);
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/fire/auth */ 99082);
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/fire/firestore */ 31159);
/* harmony import */ var _angular_fire_functions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/fire/functions */ 55559);
/* harmony import */ var _angular_fire_storage__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/fire/storage */ 38335);
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/fire/database */ 41559);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @shared/shared.module */ 93887);
/* harmony import */ var _app_auth_auth_module__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @app/auth/auth.module */ 60841);
/* harmony import */ var _app_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @app/core */ 48672);
/* harmony import */ var _app_features_features_module__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @app/features/features.module */ 13775);
/* harmony import */ var _app_features_welcome_welcome_module__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @app/features/welcome/welcome.module */ 55765);
/* harmony import */ var _app_core_firebase_app_config_repository__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @app/core/firebase/app-config.repository */ 190);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/core */ 36124);








// AngularFire






// ngx-translate









/**
 * FirebaseTranslateLoader
 *
 * Charge d'abord le JSON statique (source de vérité), puis fusionne
 * les surcharges stockées dans Firebase (config/i18n/{lang}).
 * Si Firebase est vide ou inaccessible, le JSON statique est utilisé tel quel.
 */
class FirebaseTranslateLoader {
  constructor(http, db) {
    this.http = http;
    this.db = db;
  }
  getTranslation(lang) {
    return this.http.get(`./assets/i18n/${lang}.json`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.switchMap)(staticData => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.from)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_16__.get)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_16__.ref)(this.db, `config/i18n/${lang}`))).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(snap => {
      const firebaseData = snap.val();
      if (!firebaseData) return staticData;
      return (0,_app_core_firebase_app_config_repository__WEBPACK_IMPORTED_MODULE_23__.mergeDeep)({}, staticData, firebaseData);
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(staticData)))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)({})));
  }
}
function FirebaseTranslateLoaderFactory(http, db) {
  return new FirebaseTranslateLoader(http, db);
}
class AppModule {
  static {
    this.ɵfac = function AppModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AppModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵdefineNgModule"]({
      type: AppModule,
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_8__.AppComponent]
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdefineInjector"]({
      providers: [(0,_angular_fire_app__WEBPACK_IMPORTED_MODULE_11__.provideFirebaseApp)(() => (0,_angular_fire_app__WEBPACK_IMPORTED_MODULE_11__.initializeApp)(_environments_environment__WEBPACK_IMPORTED_MODULE_10__.environment.firebaseConfig)), (0,_angular_fire_auth__WEBPACK_IMPORTED_MODULE_12__.provideAuth)(() => (0,_angular_fire_auth__WEBPACK_IMPORTED_MODULE_12__.getAuth)()), (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_13__.provideFirestore)(() => (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_13__.getFirestore)()), (0,_angular_fire_functions__WEBPACK_IMPORTED_MODULE_14__.provideFunctions)(() => (0,_angular_fire_functions__WEBPACK_IMPORTED_MODULE_14__.getFunctions)()), (0,_angular_fire_storage__WEBPACK_IMPORTED_MODULE_15__.provideStorage)(() => (0,_angular_fire_storage__WEBPACK_IMPORTED_MODULE_15__.getStorage)()), (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_16__.provideDatabase)(() => (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_16__.getDatabase)())],
      imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__.BrowserAnimationsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClientModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_9__.AppRoutingModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_18__.SharedModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__.TranslateModule.forRoot({
        loader: {
          provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__.TranslateLoader,
          useFactory: FirebaseTranslateLoaderFactory,
          deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient, _angular_fire_database__WEBPACK_IMPORTED_MODULE_16__.Database]
        }
      }), _app_auth_auth_module__WEBPACK_IMPORTED_MODULE_19__.AuthModule, _app_core__WEBPACK_IMPORTED_MODULE_20__.CoreModule, _app_features_features_module__WEBPACK_IMPORTED_MODULE_21__.FeaturesModule, _app_features_welcome_welcome_module__WEBPACK_IMPORTED_MODULE_22__.WelcomeModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_8__.AppComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__.BrowserAnimationsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClientModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_9__.AppRoutingModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_18__.SharedModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__.TranslateModule, _app_auth_auth_module__WEBPACK_IMPORTED_MODULE_19__.AuthModule, _app_core__WEBPACK_IMPORTED_MODULE_20__.CoreModule, _app_features_features_module__WEBPACK_IMPORTED_MODULE_21__.FeaturesModule, _app_features_welcome_welcome_module__WEBPACK_IMPORTED_MODULE_22__.WelcomeModule]
  });
})();

/***/ },

/***/ 52039
/*!*****************************************************!*\
  !*** ./src/app/core/meta-reducers/debug.reducer.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debug: () => (/* binding */ debug)
/* harmony export */ });
/* harmony import */ var _env_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @env/environment */ 45312);

const shouldLog = !!(_env_environment__WEBPACK_IMPORTED_MODULE_0__.environment.redux && _env_environment__WEBPACK_IMPORTED_MODULE_0__.environment.redux.log);
// Optionnel : whitelist d’actions (vide = tout loguer)
const whitelist = [];
/**
 * Meta-reducer de debug : log les actions et le state.
 * Compatible NgRx 13+ (et au-delà), sans dépendance externe.
 */
function debug(reducer) {
  if (!shouldLog) {
    return reducer;
  }
  return (state, action) => {
    // Filtrage optionnel
    if (whitelist.length && !whitelist.includes(action.type)) {
      return reducer(state, action);
    }
    // Groupe pour un affichage propre dans la console
    // eslint-disable-next-line no-console
    console.groupCollapsed(`[NgRx] ${action.type}`);
    // eslint-disable-next-line no-console
    console.log('action', action);
    // eslint-disable-next-line no-console
    console.log('prev state', state);
    const nextState = reducer(state, action);
    // eslint-disable-next-line no-console
    console.log('next state', nextState);
    // eslint-disable-next-line no-console
    console.groupEnd();
    return nextState;
  };
}

/***/ },

/***/ 53203
/*!**********************************************************!*\
  !*** ./src/app/shared/validators/password-validators.ts ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PasswordValidators: () => (/* binding */ PasswordValidators)
/* harmony export */ });
class PasswordValidators {
  static {
    this.minLength = 8;
  }
  static passwordShouldBeMinimumChars(control) {
    if (control.value.length < PasswordValidators.minLength) {
      return {
        passwordShouldBeMinimumChars: true
      };
    }
    return null;
  }
  static passwordsShouldMatch(group) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password === '' || confirmPassword === '') {
      return null;
    }
    if (password !== confirmPassword) {
      return {
        passwordsShouldMatch: true
      };
    }
    return null;
  }
  static passwordShouldHaveAtLeastOneLowerCaseLetter(control) {
    if (/[a-z]/.test(control.value)) {
      return null;
    }
    return {
      passwordShouldHaveAtLeastOneLowerCaseLetter: true
    };
  }
  static passwordShouldHaveAtLeastOneUpperCaseLetter(control) {
    if (/[A-Z]/.test(control.value)) {
      return null;
    }
    return {
      passwordShouldHaveAtLeastOneUpperCaseLetter: true
    };
  }
  static passwordShouldHaveAtLeastOneDigit(control) {
    if (/[0-9]/.test(control.value)) {
      return null;
    }
    return {
      passwordShouldHaveAtLeastOneDigit: true
    };
  }
  static passwordShouldHaveAtLeastOneSpecialCharacter(control) {
    if (/[!@#$%^&*]/.test(control.value)) {
      return null;
    }
    return {
      passwordShouldHaveAtLeastOneSpecialCharacter: true
    };
  }
  static passwordMatchAtLeastThreeConditions(control) {
    const oneLowerCaseLetter = PasswordValidators.passwordShouldHaveAtLeastOneLowerCaseLetter(control);
    const oneUpperCaseLetter = PasswordValidators.passwordShouldHaveAtLeastOneUpperCaseLetter(control);
    const oneDigit = PasswordValidators.passwordShouldHaveAtLeastOneDigit(control);
    const oneSpecialCharacter = PasswordValidators.passwordShouldHaveAtLeastOneSpecialCharacter(control);
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

/***/ },

/***/ 53521
/*!*****************************************************!*\
  !*** ./src/app/core/firebase/catalog.repository.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CatalogRepository: () => (/* binding */ CatalogRepository)
/* harmony export */ });
/* harmony import */ var C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 43942);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/database */ 41559);
/* harmony import */ var _angular_fire_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/storage */ 38335);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 11817);








class CatalogRepository {
  constructor(db, storage) {
    this.db = db;
    this.storage = storage;
  }
  // ── Legacy prices/ ────────────────────────────────────────────────────────
  watchPriceOverrides() {
    return new rxjs__WEBPACK_IMPORTED_MODULE_1__.Observable(observer => {
      const pricesRef = (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.ref)(this.db, 'prices');
      const unsubscribe = (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.onValue)(pricesRef, snap => {
        const val = snap.val();
        const overrides = {};
        if (val) {
          Object.entries(val).forEach(([key, data]) => {
            if (data?.priceXAF != null) overrides[key] = data.priceXAF;
          });
        }
        observer.next(overrides);
      }, error => observer.error(error));
      return () => unsubscribe();
    });
  }
  // ── catalog/categories/ — Lectures ───────────────────────────────────────
  watchCategories() {
    return new rxjs__WEBPACK_IMPORTED_MODULE_1__.Observable(observer => {
      const categoriesRef = (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.ref)(this.db, 'catalog/categories');
      const unsubscribe = (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.onValue)(categoriesRef, snap => {
        const val = snap.val();
        if (!val) {
          observer.next([]);
          return;
        }
        const categories = Object.entries(val).map(([prefix, data]) => ({
          prefix,
          ...data
        })).sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0));
        observer.next(categories);
      }, error => observer.error(error));
      return () => unsubscribe();
    });
  }
  watchAllItemsByCategory(categoryId) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_1__.Observable(observer => {
      const itemsQuery = (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.query)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.ref)(this.db, 'catalog/items'), (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.orderByChild)('categoryId'), (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.equalTo)(categoryId));
      const unsubscribe = (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.onValue)(itemsQuery, snap => {
        const val = snap.val();
        if (!val) {
          observer.next([]);
          return;
        }
        const items = Object.entries(val).map(([id, data]) => ({
          id,
          ...data
        })).sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0));
        observer.next(items);
      }, error => observer.error(error));
      return () => unsubscribe();
    });
  }
  watchPublishedItemsByCategory(categoryId) {
    return this.watchAllItemsByCategory(categoryId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(items => items.filter(i => i.published)));
  }
  getCategoryOnce(prefix) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_1__.Observable(observer => {
      (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.get)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.ref)(this.db, `catalog/categories/${prefix}`)).then(snap => {
        const val = snap.val();
        observer.next(val ? {
          prefix,
          ...val
        } : null);
        observer.complete();
      }).catch(err => observer.error(err));
    });
  }
  // ── catalog/categories/ — Écritures admin ────────────────────────────────
  createCategory(prefix, title, description, descriptionEn, relatedCategories) {
    var _this = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.set)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.ref)(_this.db, `catalog/categories/${prefix}`), {
        prefix,
        title,
        description,
        descriptionEn,
        published: false,
        createdAt: Date.now(),
        relatedCategories
      });
    })();
  }
  updateCategoryField(prefix, field, value) {
    var _this2 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.update)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.ref)(_this2.db, `catalog/categories/${prefix}`), {
        [field]: value
      });
    })();
  }
  deleteCategory(prefix) {
    var _this3 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.remove)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.ref)(_this3.db, `catalog/categories/${prefix}`));
    })();
  }
  // ── catalog/items/ — Écritures admin ─────────────────────────────────────
  createItemInDb(itemId, data) {
    var _this4 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.set)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.ref)(_this4.db, `catalog/items/${itemId}`), data);
    })();
  }
  updateItemField(itemId, field, value) {
    var _this5 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.update)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.ref)(_this5.db, `catalog/items/${itemId}`), {
        [field]: value
      });
    })();
  }
  deleteItemFromDb(itemId) {
    var _this6 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.remove)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.ref)(_this6.db, `catalog/items/${itemId}`));
    })();
  }
  /**
   * Pour les articles qui n'ont pas encore de nœud stock/ Firebase
   * (importés avant l'initialisation automatique), crée le nœud
   * stock/$reference/available avec le stock du catalogue.
   * N'écrase jamais un nœud existant.
   */
  ensureStockNodes(items) {
    var _this7 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!items.length) return;
      const stockSnap = yield (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.get)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.ref)(_this7.db, 'stock'));
      const existing = stockSnap.val() ?? {};
      const writes = [];
      for (const item of items) {
        if (!(item.reference in existing) && item.stock > 0) {
          writes.push((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.set)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.ref)(_this7.db, `stock/${item.reference}/available`), item.stock));
        }
      }
      if (writes.length) yield Promise.all(writes);
    })();
  }
  getNextReferenceNumber(categoryId) {
    var _this8 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const snap = yield (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.get)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.query)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.ref)(_this8.db, 'catalog/items'), (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.orderByChild)('categoryId'), (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.equalTo)(categoryId)));
      const val = snap.val();
      if (!val) return 1;
      const max = Object.values(val).reduce((m, item) => {
        const match = String(item.reference ?? '').match(/-(\d+)$/);
        const n = match ? parseInt(match[1], 10) : 0;
        return Math.max(m, n);
      }, 0);
      return max + 1;
    })();
  }
  // ── Firebase Storage ──────────────────────────────────────────────────────
  uploadFile(path, file) {
    var _this9 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const storageRef = (0,_angular_fire_storage__WEBPACK_IMPORTED_MODULE_4__.ref)(_this9.storage, path);
      yield (0,_angular_fire_storage__WEBPACK_IMPORTED_MODULE_4__.uploadBytes)(storageRef, file);
      return (0,_angular_fire_storage__WEBPACK_IMPORTED_MODULE_4__.getDownloadURL)(storageRef);
    })();
  }
  deleteFile(path) {
    var _this0 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield (0,_angular_fire_storage__WEBPACK_IMPORTED_MODULE_4__.deleteObject)((0,_angular_fire_storage__WEBPACK_IMPORTED_MODULE_4__.ref)(_this0.storage, path));
    })();
  }
  deleteStorageFolder(folderPath) {
    var _this1 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const folderRef = (0,_angular_fire_storage__WEBPACK_IMPORTED_MODULE_4__.ref)(_this1.storage, folderPath);
      try {
        const list = yield (0,_angular_fire_storage__WEBPACK_IMPORTED_MODULE_4__.listAll)(folderRef);
        yield Promise.all(list.items.map(item => (0,_angular_fire_storage__WEBPACK_IMPORTED_MODULE_4__.deleteObject)(item)));
      } catch {
        // Dossier inexistant ou déjà vide
      }
    })();
  }
  static {
    this.ɵfac = function CatalogRepository_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CatalogRepository)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.Database), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_fire_storage__WEBPACK_IMPORTED_MODULE_4__.Storage));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
      token: CatalogRepository,
      factory: CatalogRepository.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 53610
/*!*************************************************************!*\
  !*** ./src/app/shared/pipes/truncate-pipe/truncate.pipe.ts ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TruncatePipe: () => (/* binding */ TruncatePipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 36124);

class TruncatePipe {
  transform(value, args) {
    const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
    const trail = args.length > 1 ? args[1] : '...';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
  static {
    this.ɵfac = function TruncatePipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || TruncatePipe)();
    };
  }
  static {
    this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
      name: "truncate",
      type: TruncatePipe,
      pure: true,
      standalone: false
    });
  }
}

/***/ },

/***/ 54849
/*!************************************************!*\
  !*** ./src/app/shared/helpers/keys.helpers.ts ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isMetaKey: () => (/* binding */ isMetaKey)
/* harmony export */ });
function isMetaKey(e) {
  if (e.metaKey || e.ctrlKey) {
    switch (e.key.toLocaleLowerCase()) {
      case 'c':
      case 'x':
      case 'a':
      case 'v':
        return true;
    }
  }
  switch (e.key) {
    case 'Backspace':
    case 'ArrowLeft':
    case 'ArrowRight':
    case 'ArrowUp':
    case 'ArrowDown':
    case 'Tab':
    case 'Enter':
    case '-':
    case 'Control':
      return true;
  }
  return false;
}

/***/ },

/***/ 55765
/*!****************************************************!*\
  !*** ./src/app/features/welcome/welcome.module.ts ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WelcomeModule: () => (/* binding */ WelcomeModule)
/* harmony export */ });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/shared.module */ 93887);
/* harmony import */ var _app_features_welcome_welcome_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @app/features/welcome/welcome.component */ 61810);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 36124);



class WelcomeModule {
  static {
    this.ɵfac = function WelcomeModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || WelcomeModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
      type: WelcomeModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
      imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](WelcomeModule, {
    declarations: [_app_features_welcome_welcome_component__WEBPACK_IMPORTED_MODULE_1__.WelcomeComponent],
    imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule]
  });
})();

/***/ },

/***/ 55801
/*!********************************************************!*\
  !*** ./src/app/shared/services/cache/cache.service.ts ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CacheService: () => (/* binding */ CacheService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 43942);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 10819);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 59452);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 77919);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 61318);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 98764);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! debug */ 4877);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 11817);


// @ts-ignore - No types available for debug module


const log = debug__WEBPACK_IMPORTED_MODULE_6__('app:cache');
/**
 * Cache Service is an observables based in-memory cache implementation
 * Keeps track of in-flight observables and sets a default expiry for cached values
 * @export
 * @class CacheService
 */
class CacheService {
  constructor() {
    this.cache = new Map();
    this.inFlightObservables = new Map();
    this.DEFAULT_MAX_AGE = 3600000;
  }
  /**
   * Gets the value from cache if the key is provided.
   * If no value exists in cache, then check if the same call exists
   * in flight, if so return the subject. If not create a new
   * Subject inFlightObservable and return the source observable.
   */
  get(key, fallback, maxAge) {
    if (this.hasValidCachedValue(key)) {
      log(`%cGetting from cache ${key}`, 'color: green');
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(this.cache.get(key).value);
    }
    if (!maxAge) {
      maxAge = this.DEFAULT_MAX_AGE;
    }
    if (this.inFlightObservables.has(key)) {
      return this.inFlightObservables.get(key);
    } else if (fallback && fallback instanceof rxjs__WEBPACK_IMPORTED_MODULE_0__.Observable) {
      this.inFlightObservables.set(key, new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject());
      log(`%c Calling api for ${key}`, 'color: purple');
      return fallback.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(value => {
        this.set(key, value, maxAge);
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(err => {
        this.inFlightObservables.delete(key);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.throwError)(err);
      }));
    } else {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.throwError)('Requested key is not available in Cache');
    }
  }
  /**
   * Sets the values with key in the cache
   * Notifies all observers of the new values
   */
  set(key, value, maxAge = this.DEFAULT_MAX_AGE) {
    this.cache.set(key, {
      value: value,
      expiry: Date.now() + maxAge
    });
    this.notifyInFlightObservers(key, value);
  }
  /**
   * Checks if the a key exists in cache
   */
  has(key) {
    return this.cache.has(key);
  }
  /**
   * Publishes the value to all observers of the given
   * in progress observables if observers exist.
   */
  notifyInFlightObservers(key, value) {
    if (this.inFlightObservables.has(key)) {
      const inFlight = this.inFlightObservables.get(key);
      const observersCount = inFlight.observers.length;
      if (observersCount) {
        log(`%cNotifying ${inFlight.observers.length} flight subscribers for ${key}`, 'color: blue');
        inFlight.next(value);
      }
      inFlight.complete();
      this.inFlightObservables.delete(key);
    }
  }
  /**
   * Checks if the key exists and   has not expired.
   */
  hasValidCachedValue(key) {
    if (this.cache.has(key)) {
      if (this.cache.get(key).expiry < Date.now()) {
        this.cache.delete(key);
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
  /**
   * clear cache
   */
  clearAll() {
    this.cache.clear();
  }
  static {
    this.ɵfac = function CacheService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CacheService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
      token: CacheService,
      factory: CacheService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 56771
/*!******************************************************!*\
  !*** ./src/app/shared/interfaces/auth.interfaces.ts ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var firebase_compat_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/compat/auth */ 12043);


/***/ },

/***/ 60315
/*!**************************************************************************!*\
  !*** ./src/app/shared/components/modal/portfolio/portfolio.component.ts ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PortfolioComponent: () => (/* binding */ PortfolioComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _icone_divider_icone_divider_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../icone-divider/icone-divider.component */ 99905);


class PortfolioComponent {
  constructor() {}
  ngOnInit() {}
  static {
    this.ɵfac = function PortfolioComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || PortfolioComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: PortfolioComponent,
      selectors: [["app-portfolio"]],
      standalone: false,
      decls: 19,
      vars: 0,
      consts: [["id", "portfolioModal7", "tabindex", "-1", "role", "dialog", "aria-labelledby", "#portfolioModal7Label", "aria-hidden", "true", 1, "portfolio-modal", "modal", "fade"], ["role", "document", 1, "modal-dialog", "modal-xl"], [1, "modal-content"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", 1, "close"], ["aria-hidden", "true"], [1, "fas", "fa-times"], [1, "modal-body", "text-center"], [1, "container"], [1, "row", "justify-content-center"], [1, "col-lg-8"], [1, "portfolio-modal-title", "text-secondary", "mb-0"], ["src", "assets/img/image.svg", "alt", "New Image", 1, "img-fluid", "rounded", "mb-5"], [1, "mb-5"], ["href", "#", "data-dismiss", "modal", 1, "btn", "btn-primary"], [1, "fas", "fa-times", "fa-fw"]],
      template: function PortfolioComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "button", 3)(4, "span", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "i", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 6)(7, "div", 7)(8, "div", 8)(9, "div", 9)(10, "h2", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "New Image");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "app-icone-divider")(13, "img", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "p", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "New Image Description");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "button", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "i", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Close Window");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()()()();
        }
      },
      dependencies: [_icone_divider_icone_divider_component__WEBPACK_IMPORTED_MODULE_1__.IconeDividerComponent],
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 60593
/*!*********************************************************!*\
  !*** ./src/app/core/interceptors/assets.interceptor.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssetsInterceptor: () => (/* binding */ AssetsInterceptor)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 11817);

class AssetsInterceptor {
  constructor() {}
  /**
   * Method used to intercept the http query and remove the prefix (/api/) used for other pages navigation
   * @param req
   * @param next
   */
  intercept(req, next) {
    const newUrl = req.url.includes('assets/i18n') ? req.url.replace('/api', '') : req.url;
    req = req.clone({
      url: newUrl
    });
    return next.handle(req);
  }
  static {
    this.ɵfac = function AssetsInterceptor_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AssetsInterceptor)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: AssetsInterceptor,
      factory: AssetsInterceptor.ɵfac
    });
  }
}

/***/ },

/***/ 60766
/*!*******************************************************!*\
  !*** ./src/app/shared/interfaces/image.interfaces.ts ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Category: () => (/* binding */ Category),
/* harmony export */   CategoryInfos: () => (/* binding */ CategoryInfos),
/* harmony export */   ITEM_SIZES: () => (/* binding */ ITEM_SIZES),
/* harmony export */   ItemInfos: () => (/* binding */ ItemInfos),
/* harmony export */   ItemSizeEnum: () => (/* binding */ ItemSizeEnum)
/* harmony export */ });
class Category {}
class CategoryInfos {}
var ItemSizeEnum;
(function (ItemSizeEnum) {
  ItemSizeEnum["S"] = "S";
  ItemSizeEnum["M"] = "M";
  ItemSizeEnum["L"] = "L";
  ItemSizeEnum["XL"] = "XL";
  ItemSizeEnum["O"] = "O";
})(ItemSizeEnum || (ItemSizeEnum = {}));
const ITEM_SIZES = [{
  value: ItemSizeEnum.S,
  label: 'S'
}, {
  value: ItemSizeEnum.M,
  label: 'M'
}, {
  value: ItemSizeEnum.L,
  label: 'L'
}, {
  value: ItemSizeEnum.XL,
  label: 'XL'
}];
class ItemInfos {
  constructor(path, selected, reference, index, category, loading, basketInfos, images = [], price = 0) {
    this.path = path;
    this.selected = selected;
    this.reference = reference;
    this.index = index;
    this.category = category;
    this.loading = loading;
    this.basketInfos = basketInfos;
    this.images = images;
    this.price = price;
  }
}

/***/ },

/***/ 60841
/*!*************************************!*\
  !*** ./src/app/auth/auth.module.ts ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthModule: () => (/* binding */ AuthModule)
/* harmony export */ });
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/effects */ 70347);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ 81383);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 79748);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 48418);
/* harmony import */ var _shared_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/services */ 42815);
/* harmony import */ var _signin_signin_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./signin/signin.component */ 30309);
/* harmony import */ var _auth_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./auth-routing.module */ 80600);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @app/auth/store */ 83575);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @shared/shared.module */ 93887);
/* harmony import */ var _app_auth_main_main_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @app/auth/main/main.component */ 28935);
/* harmony import */ var _signup_signup_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./signup/signup.component */ 66101);
/* harmony import */ var _app_auth_login_login_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @app/auth/login/login.component */ 66539);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 36124);

















class AuthModule {
  static {
    this.ɵfac = function AuthModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AuthModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineNgModule"]({
      type: AuthModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjector"]({
      providers: [{
        provide: _shared_services__WEBPACK_IMPORTED_MODULE_4__.APP_PASSWORD_CONFIG,
        useValue: {
          minLength: 8,
          minConstraints: 3
        }
      }],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__.SharedModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule, _auth_routing_module__WEBPACK_IMPORTED_MODULE_6__.AuthRoutingModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbModule, _ngrx_store__WEBPACK_IMPORTED_MODULE_1__.StoreModule.forFeature('auth', _store__WEBPACK_IMPORTED_MODULE_8__.authReducer, {
        metaReducers: [_store__WEBPACK_IMPORTED_MODULE_8__.clearState]
      }), _ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.EffectsModule.forFeature([_store__WEBPACK_IMPORTED_MODULE_8__.AuthEffects])]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵsetNgModuleScope"](AuthModule, {
    declarations: [_app_auth_main_main_component__WEBPACK_IMPORTED_MODULE_10__.MainComponent, _signin_signin_component__WEBPACK_IMPORTED_MODULE_5__.SigninComponent, _signup_signup_component__WEBPACK_IMPORTED_MODULE_11__.SignupComponent, _app_auth_login_login_component__WEBPACK_IMPORTED_MODULE_12__.LoginComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__.SharedModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule, _auth_routing_module__WEBPACK_IMPORTED_MODULE_6__.AuthRoutingModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbModule, _ngrx_store__WEBPACK_IMPORTED_MODULE_1__.StoreFeatureModule, _ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.EffectsFeatureModule],
    exports: [_app_auth_login_login_component__WEBPACK_IMPORTED_MODULE_12__.LoginComponent]
  });
})();

/***/ },

/***/ 61362
/*!*********************************************************!*\
  !*** ./src/app/shared/helpers/common.services.utils.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlertTypeEnum: () => (/* binding */ AlertTypeEnum),
/* harmony export */   initLoginPayload: () => (/* binding */ initLoginPayload),
/* harmony export */   isNonEmptyString: () => (/* binding */ isNonEmptyString)
/* harmony export */ });
/* harmony import */ var _helpers_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @helpers/constants */ 4245);

function initLoginPayload(result) {
  const user = result?.user ?? result;
  const profile = result?.additionalUserInfo?.profile ?? {};
  const uid = user?.uid ?? result?.uid ?? profile?.id ?? profile?.sub;
  const email = user?.email ?? profile?.email ?? result?.email;
  const picture = profile?.picture?.data?.url ?? profile?.picture ?? user?.photoURL;
  const prenom = profile?.given_name ?? user?.displayName?.split(' ')?.[0];
  const nom = profile?.family_name ?? user?.displayName?.split(' ')?.slice(1)?.join(' ');
  return {
    ssoToken: result?.credential?.idToken ?? result?.refreshToken ?? user?.refreshToken,
    token: result?.credential?.accessToken ?? result?.refreshToken ?? user?.refreshToken,
    userHabilitations: [],
    indexRole: -1,
    actions: {},
    isAnonymous: user?.isAnonymous ?? result?.isAnonymous,
    credential: result?.credential,
    additionalInfos: {
      uid,
      providerId: result?.additionalUserInfo?.providerId ?? user?.providerData?.[0]?.providerId,
      local: profile?.locale ?? _helpers_constants__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_LOCALE_ID,
      picture,
      nom,
      prenom,
      gender: profile?.gender,
      email
    }
  };
}
var AlertTypeEnum;
(function (AlertTypeEnum) {
  AlertTypeEnum["WARNING"] = "warning";
  AlertTypeEnum["INFO"] = "info";
  AlertTypeEnum["STATUS"] = "status";
  AlertTypeEnum["VALID"] = "valid";
  AlertTypeEnum["ERROR"] = "error";
  AlertTypeEnum["FUNCTIONAL_ERROR"] = "functionalError";
})(AlertTypeEnum || (AlertTypeEnum = {}));
function isNonEmptyString(str) {
  return !!str && str.trim().length > 0;
}

/***/ },

/***/ 61810
/*!*******************************************************!*\
  !*** ./src/app/features/welcome/welcome.component.ts ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WelcomeComponent: () => (/* binding */ WelcomeComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 2510);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 19999);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 91817);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _store_catalog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../store/catalog */ 6098);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngrx/store */ 81383);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 79748);
/* harmony import */ var _shared_components_portfolio_item_portfolio_item_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/components/portfolio-item/portfolio-item.component */ 40887);







function WelcomeComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "app-portfolio-item", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassMap"](ctx_r1.disposition);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("data", item_r1);
  }
}
const DEFAULT_COVER = 'assets/style-sauvage_only_logo-removebg.png';
class WelcomeComponent {
  constructor(store) {
    this.store = store;
    this.disposition = 'col-md-6 col-lg-4 mb-5';
    this.subs = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subscription();
  }
  ngOnInit() {
    // Déclencher le chargement des items pour chaque catégorie publiée (une seule fois par liste)
    this.subs.add(this.store.select(_store_catalog__WEBPACK_IMPORTED_MODULE_5__.selectPublishedCategories).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.filter)(cats => cats.length > 0), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.distinctUntilChanged)((a, b) => a.map(c => c.prefix).join(',') === b.map(c => c.prefix).join(','))).subscribe(categories => {
      categories.forEach(cat => this.store.dispatch(new _store_catalog__WEBPACK_IMPORTED_MODULE_5__.CatalogLoadItemsForCategory({
        categoryId: cat.prefix
      })));
    }));
    // Construire les cartes portfolio à partir du catalog store
    this.portfolioItems$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.combineLatest)([this.store.select(_store_catalog__WEBPACK_IMPORTED_MODULE_5__.selectCatalogLoaded), this.store.select(_store_catalog__WEBPACK_IMPORTED_MODULE_5__.selectPublishedCategories), this.store.select(_store_catalog__WEBPACK_IMPORTED_MODULE_5__.selectCatalogState)]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(([loaded, categories, catalogState]) => {
      if (!loaded) return [];
      return categories.map(cat => {
        const items = catalogState.itemsByCategory[cat.prefix] ?? [];
        const imageUrls = items.map(i => i.coverUrl).filter(Boolean);
        return {
          portfolioLink: `/category/${cat.prefix}`,
          coverImageUrl: imageUrls[0] ?? DEFAULT_COVER,
          portfolioName: cat.title,
          imageUrls: imageUrls.length > 0 ? imageUrls : [DEFAULT_COVER]
        };
      });
    }));
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  static {
    this.ɵfac = function WelcomeComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || WelcomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_7__.Store));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
      type: WelcomeComponent,
      selectors: [["app-welcome"]],
      standalone: false,
      decls: 5,
      vars: 3,
      consts: [["id", "portfolio", 1, "page-section", "portfolio"], [1, "container"], [1, "row", "justify-content-center", "text-center"], [3, "class", 4, "ngFor", "ngForOf"], [3, "data"]],
      template: function WelcomeComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "section", 0)(1, "div", 1)(2, "div", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, WelcomeComponent_div_3_Template, 2, 3, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](4, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](4, 1, ctx.portfolioItems$));
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _shared_components_portfolio_item_portfolio_item_component__WEBPACK_IMPORTED_MODULE_9__.PortfolioItemComponent, _angular_common__WEBPACK_IMPORTED_MODULE_8__.AsyncPipe],
      styles: ["p[_ngcontent-%COMP%] {\n  font-weight: bold;\n  margin-left: 121px;\n}\n\n.skin-light[_ngcontent-%COMP%]   .badge-news[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  left: 10px;\n}\n\n\n\n.page-section[_ngcontent-%COMP%] {\n  padding-top: 1rem !important;\n  padding-bottom: 1rem !important;\n}\n\n\n\n.row[_ngcontent-%COMP%]    > [class*=\"col-\"][_ngcontent-%COMP%] {\n  margin-bottom: 1rem !important;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvd2VsY29tZS93ZWxjb21lLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBaUI7RUFDakIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFNBQVM7RUFDVCxVQUFVO0FBQ1o7O0FBRUEsOENBQThDO0FBQzlDO0VBQ0UsNEJBQTRCO0VBQzVCLCtCQUErQjtBQUNqQzs7QUFFQSw0REFBNEQ7QUFDNUQ7RUFDRSw4QkFBOEI7QUFDaEMiLCJzb3VyY2VzQ29udGVudCI6WyJwIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIG1hcmdpbi1sZWZ0OiAxMjFweDtcbn1cblxuLnNraW4tbGlnaHQgLmJhZGdlLW5ld3Mge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMTBweDtcbiAgbGVmdDogMTBweDtcbn1cblxuLyogUsODwqlkdWl0IGxlIHBhZGRpbmcgZGUgbGEgc2VjdGlvbiBwb3J0Zm9saW8gKi9cbi5wYWdlLXNlY3Rpb24ge1xuICBwYWRkaW5nLXRvcDogMXJlbSAhaW1wb3J0YW50O1xuICBwYWRkaW5nLWJvdHRvbTogMXJlbSAhaW1wb3J0YW50O1xufVxuXG4vKiBSw4PCqWR1aXQgbCdlc3BhY2UgZW50cmUgbGVzIGNhcnRlcyAocmVtcGxhY2UgbWItNSA9IDNyZW0pICovXG4ucm93ID4gW2NsYXNzKj1cImNvbC1cIl0ge1xuICBtYXJnaW4tYm90dG9tOiAxcmVtICFpbXBvcnRhbnQ7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ },

/***/ 63029
/*!******************************************************************************!*\
  !*** ./src/app/shared/components/portfolio-list/portfolio-list.component.ts ***!
  \******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PortfolioListComponent: () => (/* binding */ PortfolioListComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _shared_components_item_details_item_details_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/components/item-details/item-details.component */ 18675);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 2510);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ 12587);
/* harmony import */ var _shared_services_pricing_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/services/pricing.service */ 45212);
/* harmony import */ var _shared_services_stock_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/services/stock.service */ 81676);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ 48503);








function PortfolioListComponent_For_18_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "i", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function PortfolioListComponent_For_18_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "\u00C9puis\u00E9");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function PortfolioListComponent_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 12)(1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function PortfolioListComponent_For_18_Template_div_click_1_listener() {
      const item_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r2.openChoices(item_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "img", 16)(4, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵconditionalCreate"](5, PortfolioListComponent_For_18_Conditional_5_Template, 2, 0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵconditionalCreate"](6, PortfolioListComponent_For_18_Conditional_6_Template, 2, 0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "div", 20)(8, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", item_r2.selected ? "selected" : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("item-out-of-stock", ctx_r2.stock.isOutOfStock(item_r2.reference) && !item_r2.selected);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("src", item_r2.path, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeUrl"])("alt", item_r2.reference);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵconditional"](item_r2.selected ? 5 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵconditional"](ctx_r2.stock.isOutOfStock(item_r2.reference) && !item_r2.selected ? 6 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("REF: ", item_r2.reference);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r2.pricing.format(item_r2.price));
  }
}
function PortfolioListComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function PortfolioListComponent_div_19_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r2.closeLightbox());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "img", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function PortfolioListComponent_div_19_Template_img_click_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function PortfolioListComponent_div_19_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r2.closeLightbox());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("src", ctx_r2.lightboxSrc, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeUrl"]);
  }
}
class PortfolioListComponent {
  constructor(dialog, pricing, stock, translate, cdr) {
    this.dialog = dialog;
    this.pricing = pricing;
    this.stock = stock;
    this.translate = translate;
    this.cdr = cdr;
    this.navigateAway = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.onToogleSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.updateBasketItem = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.currentEncodedUri = '';
    this.currentLang = 'fr';
    this.lightboxSrc = null;
    this.subs = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subscription();
  }
  ngOnInit() {
    this.currentEncodedUri = encodeURIComponent(window.location.href);
    this.currentLang = this.translate.currentLang ?? 'fr';
    this.subs.add(this.pricing.currency$.subscribe(() => this.cdr.markForCheck()));
    this.subs.add(this.translate.onLangChange.subscribe(({
      lang
    }) => {
      this.currentLang = lang;
      this.cdr.markForCheck();
    }));
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  get summary() {
    if (this.currentLang === 'en' && this.category.summaryEn) {
      return this.category.summaryEn;
    }
    return this.category.summary ?? '';
  }
  toogleSelect(selectedImage) {
    this.onToogleSelect.emit(selectedImage);
  }
  gotoTarget(name) {
    this.navigateAway.emit(name);
  }
  openChoices(item) {
    const dialogRef = this.dialog.open(_shared_components_item_details_item_details_component__WEBPACK_IMPORTED_MODULE_1__.ItemDetailsComponent, {
      panelClass: 'signin-dialog',
      maxHeight: '85vh',
      disableClose: false,
      autoFocus: true,
      data: item
    });
    dialogRef.componentInstance.updateBasketItem.subscribe(result => {
      this.onToogleSelect.emit(result);
      this.updateBasketItem.emit(result);
    });
  }
  closeLightbox() {
    this.lightboxSrc = null;
    this.cdr.markForCheck();
  }
  static {
    this.ɵfac = function PortfolioListComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || PortfolioListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_shared_services_pricing_service__WEBPACK_IMPORTED_MODULE_6__.PricingService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_shared_services_stock_service__WEBPACK_IMPORTED_MODULE_7__.StockService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectorRef));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
      type: PortfolioListComponent,
      selectors: [["app-portfolio-list"]],
      inputs: {
        category: "category",
        categoryInfos: "categoryInfos"
      },
      outputs: {
        navigateAway: "navigateAway",
        onToogleSelect: "onToogleSelect",
        updateBasketItem: "updateBasketItem"
      },
      standalone: false,
      decls: 20,
      vars: 7,
      consts: [[1, "jumbotron", "color-grey-light", "mt-70"], [1, "d-flex", "align-items-center", "h-100"], [1, "container", "text-center"], [1, "mb-0"], [1, "mb-2", "text-muted", 2, "text-align", "left", 3, "innerHTML"], [1, "d-flex", "justify-content-between", "align-items-center", "flex-wrap", "gap-3", "mt-2"], [3, "navigateAway", "categoryToAvoid", "categoryInfos"], [1, "container", "fixed-sn", "skin-light", "mdb-skin-custom"], [2, "padding-left", "0"], [1, "container-fluid", "mt-0"], [1, "row", "justify-content-center", "text-center"], [1, "row"], [1, "col-md-4", "mb-4", "col-sm-auto", 3, "ngClass"], ["class", "portfolio-lightbox-overlay", 3, "click", 4, "ngIf"], [1, "item-card", 3, "click"], [1, "view", "zoom", "overlay", "z-depth-2", "rounded", "image-wrapper"], ["loading", "lazy", 1, "img-fluid", "centered-img", 3, "src", "alt"], [1, "mask", "rgba-black-slight"], [1, "cart-badge"], [1, "out-of-stock-overlay"], [1, "text-center", "pt-2", "pb-2"], [1, "item-ref"], [1, "item-price"], [1, "fas", "fa-shopping-cart"], [1, "portfolio-lightbox-overlay", 3, "click"], [1, "portfolio-lightbox-img", 3, "click", "src"], [1, "portfolio-lightbox-close", 3, "click"]],
      template: function PortfolioListComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "header")(1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "h3", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](6, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](7, "p", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](9, "app-currency-selector");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "app-category-buttons", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("navigateAway", function PortfolioListComponent_Template_app_category_buttons_navigateAway_10_listener($event) {
            return ctx.gotoTarget($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "div", 7)(12, "main", 8)(13, "div", 9)(14, "div", 10)(15, "section")(16, "div", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrepeaterCreate"](17, PortfolioListComponent_For_18_Template, 12, 9, "div", 12, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrepeaterTrackByIdentity"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](19, PortfolioListComponent_div_19_Template, 4, 1, "div", 13);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](6, 5, ctx.category.title), " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("innerHTML", ctx.summary, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeHtml"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("categoryToAvoid", ctx.category.name)("categoryInfos", ctx.categoryInfos);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrepeater"](ctx.category.items);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.lightboxSrc);
        }
      },
      styles: ["img.displayed[_ngcontent-%COMP%] {\n  display: block;\n  margin: 0 auto;\n}\n\n.img-fluid[_ngcontent-%COMP%], .img-thumbnail[_ngcontent-%COMP%] {\n  width: auto;\n  max-width: 40%;\n  max-height: 100%;\n}\n\n.display[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n}\n\n.item-card[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n\n.item-ref[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.75rem;\n  color: #888;\n}\n\n.item-price[_ngcontent-%COMP%] {\n  display: block;\n  font-weight: 600;\n  font-size: 1rem;\n  color: #333;\n}\n\n.image-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  cursor: pointer;\n}\n.image-wrapper[_ngcontent-%COMP%]   .mask[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n\n.cart-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  background: #c8a96e;\n  color: #fff;\n  border-radius: 50%;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.85rem;\n  z-index: 10;\n}\n\n.centered-img[_ngcontent-%COMP%] {\n  display: block;\n  margin: 0 auto;\n  width: auto;\n  max-width: 40%;\n  height: auto;\n}\n\n.click-mask[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  cursor: pointer;\n}\n\n.img-centered[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  max-width: 40%;\n  max-height: 100%;\n  width: auto;\n  height: auto;\n}\n\n.image-wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-width: 40%;\n  max-height: 100%;\n  width: auto;\n}\n\n.item-out-of-stock[_ngcontent-%COMP%] {\n  cursor: not-allowed;\n  opacity: 0.7;\n}\n\n.out-of-stock-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.55);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  font-size: 1.1rem;\n  font-weight: 700;\n  letter-spacing: 0.05em;\n  border-radius: inherit;\n  pointer-events: none;\n}\n\n.portfolio-lightbox-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.85);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n  cursor: zoom-out;\n}\n\n.portfolio-lightbox-img[_ngcontent-%COMP%] {\n  max-width: 90vw;\n  max-height: 90vh;\n  object-fit: contain;\n  border-radius: 4px;\n  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.6);\n  cursor: default;\n}\n\n.portfolio-lightbox-close[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 16px;\n  right: 20px;\n  background: none;\n  border: none;\n  color: #fff;\n  font-size: 2rem;\n  cursor: pointer;\n  line-height: 1;\n  opacity: 0.8;\n}\n.portfolio-lightbox-close[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvcG9ydGZvbGlvLWxpc3QvcG9ydGZvbGlvLWxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0UsV0FBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0FBQ0Y7QUFDRTtFQUNFLGVBQUE7QUFDSjs7QUFHQTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFVBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7QUFBRjs7QUFHQTtFQUNFLGNBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0FBQUY7O0FBR0E7RUFDRSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxlQUFBO0FBQUY7O0FBS0E7RUFDRSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsZ0NBQUE7RUFFQSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQUhGOztBQU1BO0VBQ0UsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsV0FBQTtBQUhGOztBQVNBO0VBQ0UsbUJBQUE7RUFDQSxZQUFBO0FBTkY7O0FBU0E7RUFDRSxrQkFBQTtFQUNBLFFBQUE7RUFDQSwrQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLHNCQUFBO0VBQ0Esb0JBQUE7QUFORjs7QUFXQTtFQUNFLGVBQUE7RUFDQSxRQUFBO0VBQ0EsK0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtBQVJGOztBQVdBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLHlDQUFBO0VBQ0EsZUFBQTtBQVJGOztBQVdBO0VBQ0UsZUFBQTtFQUNBLFNBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUE7QUFSRjtBQVVFO0VBQVUsVUFBQTtBQVBaIiwic291cmNlc0NvbnRlbnQiOlsiaW1nLmRpc3BsYXllZHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbjowIGF1dG87XG59XG5cbi5pbWctZmx1aWQsIC5pbWctdGh1bWJuYWlsIHtcbiAgd2lkdGg6IGF1dG87XG4gIG1heC13aWR0aDogNDAlO1xuICBtYXgtaGVpZ2h0OiAxMDAlO1xufVxuXG4uZGlzcGxheSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uaXRlbS1jYXJkIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uaXRlbS1yZWYge1xuICBkaXNwbGF5OiBibG9jaztcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBjb2xvcjogIzg4ODtcbn1cblxuLml0ZW0tcHJpY2Uge1xuICBkaXNwbGF5OiBibG9jaztcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBjb2xvcjogIzMzMztcbn1cblxuLmltYWdlLXdyYXBwZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGN1cnNvcjogcG9pbnRlcjtcblxuICAubWFzayB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG59XG5cbi5jYXJ0LWJhZGdlIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDhweDtcbiAgcmlnaHQ6IDhweDtcbiAgYmFja2dyb3VuZDogI2M4YTk2ZTtcbiAgY29sb3I6ICNmZmY7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgd2lkdGg6IDMycHg7XG4gIGhlaWdodDogMzJweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgei1pbmRleDogMTA7XG59XG5cbi5jZW50ZXJlZC1pbWcge1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luOiAwIGF1dG87ICAgICAgLy8gY2VudHJlIGhvcml6b250YWxlbWVudFxuICB3aWR0aDogYXV0bzsgICAgICAgICAvLyBnYXJkZSBsZSByYXRpb1xuICBtYXgtd2lkdGg6IDQwJTsgICAgICAvLyB0b24gYmVzb2luXG4gIGhlaWdodDogYXV0bztcbn1cblxuLmNsaWNrLW1hc2sge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGluc2V0OiAwOyAgICAgICAgICAgIC8vIHRvcC9yaWdodC9ib3R0b20vbGVmdDogMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICAvLyBwYXMgZGUgZGlzcGxheSBxdWkgcGVydHVyYmUgbGEgbWlzZSBlbiBwYWdlXG59XG5cblxuLmltZy1jZW50ZXJlZCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG5cbiAgbWF4LXdpZHRoOiA0MCU7XG4gIG1heC1oZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiBhdXRvO1xuICBoZWlnaHQ6IGF1dG87XG59XG5cbi5pbWFnZS13cmFwcGVyIGltZyB7XG4gIG1heC13aWR0aDogNDAlO1xuICBtYXgtaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogYXV0bztcbn1cblxuXG4vLyDDosKUwoDDosKUwoAgU3RvY2sgw4PCqXB1aXPDg8KpIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuXG4uaXRlbS1vdXQtb2Ytc3RvY2sge1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xuICBvcGFjaXR5OiAwLjc7XG59XG5cbi5vdXQtb2Ytc3RvY2stb3ZlcmxheSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgaW5zZXQ6IDA7XG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC41NSk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC1zaXplOiAxLjFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGxldHRlci1zcGFjaW5nOiAwLjA1ZW07XG4gIGJvcmRlci1yYWRpdXM6IGluaGVyaXQ7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuXG4vLyDDosKUwoDDosKUwoAgTGlnaHRib3ggYXJ0aWNsZSDDg8KpcHVpc8ODwqkgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXG5cbi5wb3J0Zm9saW8tbGlnaHRib3gtb3ZlcmxheSB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgaW5zZXQ6IDA7XG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC44NSk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB6LWluZGV4OiA5OTk5O1xuICBjdXJzb3I6IHpvb20tb3V0O1xufVxuXG4ucG9ydGZvbGlvLWxpZ2h0Ym94LWltZyB7XG4gIG1heC13aWR0aDogOTB2dztcbiAgbWF4LWhlaWdodDogOTB2aDtcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBib3gtc2hhZG93OiAwIDhweCA0MHB4IHJnYmEoMCwgMCwgMCwgMC42KTtcbiAgY3Vyc29yOiBkZWZhdWx0O1xufVxuXG4ucG9ydGZvbGlvLWxpZ2h0Ym94LWNsb3NlIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDE2cHg7XG4gIHJpZ2h0OiAyMHB4O1xuICBiYWNrZ3JvdW5kOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXNpemU6IDJyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIG9wYWNpdHk6IDAuODtcblxuICAmOmhvdmVyIHsgb3BhY2l0eTogMTsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
      changeDetection: 0
    });
  }
}

/***/ },

/***/ 63357
/*!******************************************************************!*\
  !*** ./src/app/shared/pipes/reduce-string/reduce-string.pipe.ts ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReduceStringPipe: () => (/* binding */ ReduceStringPipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 36124);

class ReduceStringPipe {
  transform(initiate) {
    let dot = '';
    if (initiate.length > 16) {
      dot = '...';
    }
    return initiate.substring(0, 16) + dot;
  }
  static {
    this.ɵfac = function ReduceStringPipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ReduceStringPipe)();
    };
  }
  static {
    this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
      name: "reduceString",
      type: ReduceStringPipe,
      pure: true
    });
  }
}

/***/ },

/***/ 64992
/*!***************************************************************!*\
  !*** ./src/app/core/firebase/firebase-repositories.module.ts ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FirebaseRepositoriesModule: () => (/* binding */ FirebaseRepositoriesModule)
/* harmony export */ });
/* harmony import */ var _catalog_repository__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./catalog.repository */ 53521);
/* harmony import */ var _orders_repository__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./orders.repository */ 84757);
/* harmony import */ var _users_repository__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./users.repository */ 67848);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 36124);




/**
 * FirebaseRepositoriesModule
 * Regroupe les repositories Firebase. Importé par CoreModule.
 * Les repositories sont providedIn: 'root' — ce module sert de point d'entrée déclaratif.
 */
class FirebaseRepositoriesModule {
  static {
    this.ɵfac = function FirebaseRepositoriesModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || FirebaseRepositoriesModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
      type: FirebaseRepositoriesModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
      providers: [_catalog_repository__WEBPACK_IMPORTED_MODULE_0__.CatalogRepository, _orders_repository__WEBPACK_IMPORTED_MODULE_1__.OrdersRepository, _users_repository__WEBPACK_IMPORTED_MODULE_2__.UsersRepository]
    });
  }
}

/***/ },

/***/ 65891
/*!*********************************************************************!*\
  !*** ./src/app/features/shopping-cart/shopping-cart.route.model.ts ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   shoppingCartRoutes: () => (/* binding */ shoppingCartRoutes)
/* harmony export */ });
/* harmony import */ var _app_features_shopping_cart_cart_items_cart_items_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @app/features/shopping-cart/cart-items/cart-items.component */ 76204);

const shoppingCartRoutes = [{
  path: '',
  component: _app_features_shopping_cart_cart_items_cart_items_component__WEBPACK_IMPORTED_MODULE_0__.CartItemsComponent
}];

/***/ },

/***/ 66101
/*!*************************************************!*\
  !*** ./src/app/auth/signup/signup.component.ts ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SignupComponent: () => (/* binding */ SignupComponent)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 33900);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ 81383);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 10819);
/* harmony import */ var _env_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @env/environment */ 45312);
/* harmony import */ var _shared_helpers_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/helpers/constants */ 4245);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _shared_validators_password_validators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @shared/validators/password-validators */ 53203);
/* harmony import */ var _helpers_misc_class__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @helpers/misc.class */ 25708);
/* harmony import */ var _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @app/auth/store/auth.actions */ 2520);
/* harmony import */ var _app_auth_store_auth_selectors__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @app/auth/store/auth.selectors */ 2981);
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/fire/auth */ 99082);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! firebase/auth */ 92630);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 83305);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/router */ 46264);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ngx-translate/core */ 48503);


















function SignupComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"]("", ctx_r0.requiredAlert, " nom.");
  }
}
function SignupComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"]("", ctx_r0.requiredAlert, " pr\u00E9nom.");
  }
}
function SignupComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"]("", ctx_r0.requiredAlert, "e adresse mail valide");
  }
}
function SignupComponent_Conditional_41_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 2)(1, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](2, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](3, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](4, "8 caract\u00E8res minimum");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()();
  }
}
function SignupComponent_Conditional_41_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](1, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](2, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](3, "1 lettre minuscule");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
  }
}
function SignupComponent_Conditional_41_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](1, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](2, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](3, "1 chiffre");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
  }
}
function SignupComponent_Conditional_41_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](1, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](2, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](3, "1 lettre majuscule");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
  }
}
function SignupComponent_Conditional_41_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](1, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](2, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](3, "1 caract\u00E8re sp\u00E9cial");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
  }
}
function SignupComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 22)(1, "div", 2)(2, "div", 33)(3, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](4, "Votre mot de passe doit contenir:");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditionalCreate"](5, SignupComponent_Conditional_41_Conditional_5_Template, 5, 0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](6, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditionalCreate"](7, SignupComponent_Conditional_41_Conditional_7_Template, 4, 0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditionalCreate"](8, SignupComponent_Conditional_41_Conditional_8_Template, 4, 0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](9, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditionalCreate"](10, SignupComponent_Conditional_41_Conditional_10_Template, 4, 0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditionalCreate"](11, SignupComponent_Conditional_41_Conditional_11_Template, 4, 0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditional"](!!ctx_r0.password.errors.passwordShouldBeMinimumChars ? 5 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditional"](!!ctx_r0.password.errors.passwordShouldHaveAtLeastOneLowerCaseLetter ? 7 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditional"](!!ctx_r0.password.errors.passwordShouldHaveAtLeastOneDigit ? 8 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditional"](!!ctx_r0.password.errors.passwordShouldHaveAtLeastOneUpperCaseLetter ? 10 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditional"](!!ctx_r0.password.errors.passwordShouldHaveAtLeastOneSpecialCharacter ? 11 : -1);
  }
}
function SignupComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", ctx_r0.requiredAlert, " mot de passe valide. Votre mot de passe est trop faible. ");
  }
}
function SignupComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](1, " Veuillez confirmer votre mot de passe. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
  }
}
function SignupComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](1, " Les mots de passe ne sont pas identiques. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
  }
}
function SignupComponent_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("disabled", ctx_r0.sendButtonState());
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", ctx_r0.submitButtonText, " ");
  }
}
function SignupComponent_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](1, "i", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
  }
}
function SignupComponent_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 29)(1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](2, " Une erreur est survenue lors de la r\u00E9cup\u00E9ration de l'utilisateur. Veuillez contacter votre administrateur. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
  }
}
function SignupComponent_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 30)(1, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](2, " Nous venons de vous envoyer un e-mail avec un lien de confirmation. Merci de v\u00E9rifier votre boite mail et de cliquer sur le lien. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
  }
}
class SignupComponent {
  constructor(route, fb, store, auth) {
    this.route = route;
    this.fb = fb;
    this.store = store;
    this.auth = auth;
    this.title = 'Créer un compte';
    this.subtitle = 'Compléter les informations ci-dessous :';
    this.submitButtonText = 'Suivant';
    this.submittingButtonText = 'Création en cours...';
    this.isValidation = false;
    this.requiredAlert = 'Veuillez renseigner un';
    this.env = _env_environment__WEBPACK_IMPORTED_MODULE_5__.environment;
    this.loading = false;
    this.showSecretResp = false;
    this.questions = [];
    this.success = false;
    this.unsubscribe$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
    this.isFirstLoad = true;
    this.signInOptions = [firebase_auth__WEBPACK_IMPORTED_MODULE_13__.EmailAuthProvider.PROVIDER_ID];
    this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_3__.select)(_app_auth_store_auth_selectors__WEBPACK_IMPORTED_MODULE_11__.selectorAuthSignup), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this.unsubscribe$)).subscribe(state => {
      if (state) {
        this.loading = state.loading;
        if (this.isFirstLoad) {
          this.updateForm();
        }
        if (state.error) {
          this.error = state.error.error;
        } else {
          this.error = undefined;
        }
      }
    });
  }
  get gender() {
    return this.userForm.get('gender');
  }
  get nom() {
    return this.userForm.get('nom');
  }
  get prenom() {
    return this.userForm.get('prenom');
  }
  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }
  get confirmPassword() {
    return this.userForm.get('confirmPassword');
  }
  ngOnInit() {
    this.route.params.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this.unsubscribe$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(params => params.token), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.filter)(token => token !== 'new')).subscribe(token => {
      this.token = token;
      this.title = 'Création de compte';
      this.subtitle = 'Les champs ci-dessous sont obligatoires :';
      this.submitButtonText = 'Créer mon compte';
      this.submittingButtonText = 'Création en cours...';
      this.isValidation = true;
    });
    this.userForm = this.fb.group({
      gender: [1, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required],
      nom: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required],
      prenom: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required],
      email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.email, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.pattern(_shared_helpers_constants__WEBPACK_IMPORTED_MODULE_6__.EMAIL_REGEX)])],
      password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required, _shared_validators_password_validators__WEBPACK_IMPORTED_MODULE_8__.PasswordValidators.passwordMatchAtLeastThreeConditions, _shared_validators_password_validators__WEBPACK_IMPORTED_MODULE_8__.PasswordValidators.passwordShouldBeMinimumChars])],
      confirmPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required]
    }, {
      validator: _shared_validators_password_validators__WEBPACK_IMPORTED_MODULE_8__.PasswordValidators.passwordsShouldMatch
    });
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  updateForm() {
    this.userForm = this.fb.group({
      gender: [this.user.gender, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required],
      nom: [this.user.nom, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required],
      prenom: [this.user.prenom, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required],
      email: [{
        value: this.user.email,
        disabled: true
      }],
      password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required, _shared_validators_password_validators__WEBPACK_IMPORTED_MODULE_8__.PasswordValidators.passwordMatchAtLeastThreeConditions, _shared_validators_password_validators__WEBPACK_IMPORTED_MODULE_8__.PasswordValidators.passwordShouldBeMinimumChars])],
      confirmPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required]
    }, {
      validator: _shared_validators_password_validators__WEBPACK_IMPORTED_MODULE_8__.PasswordValidators.passwordsShouldMatch
    });
  }
  sendButtonState() {
    return this.userForm.invalid || this.password.value !== this.confirmPassword.value;
  }
  submit() {
    this.isFirstLoad = false;
    (0,_angular_fire_auth__WEBPACK_IMPORTED_MODULE_12__.createUserWithEmailAndPassword)(this.auth, this.email.value, this.password.value).then(result => {
      console.log(result);
    }).catch(error => {
      console.log(error);
    });
    this.store.dispatch(new _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_10__.AuthSignup(this.buildSignupUser()));
  }
  buildSignupUser() {
    return {
      gender: this.gender.value,
      nom: this.nom.value.toUpperCase(),
      prenom: _helpers_misc_class__WEBPACK_IMPORTED_MODULE_9__.Misc.toCapitalize(this.prenom.value),
      email: this.email.value,
      password: this.password.value
    };
  }
  static {
    this.ɵfac = function SignupComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || SignupComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_15__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_7__.UntypedFormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_3__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_angular_fire_auth__WEBPACK_IMPORTED_MODULE_12__.Auth));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineComponent"]({
      type: SignupComponent,
      selectors: [["app-signup"]],
      standalone: false,
      decls: 66,
      vars: 25,
      consts: [[1, "rouded-form"], ["autocomplete", "off", 3, "ngSubmit", "formGroup"], [1, "row"], [1, "form-group", "col-5"], ["for", "gender", 1, "required"], [1, "form-group-select"], ["id", "gender", "name", "gender", 1, "form-control", 3, "formControl"], ["selected", "", 3, "ngValue"], [3, "ngValue"], [1, "bar"], [1, "dsicon-chevron-bas"], [1, "form-group", "col-7", "form-nom"], ["for", "nom", 1, "required"], ["type", "text", "id", "nom", "name", "nom", "appTextTransform", "", "text-uppercase", "", 1, "form-control", 3, "formControl"], [1, "error"], [1, "form-group", "col-12"], ["for", "prenom", 1, "required"], ["type", "text", "id", "prenom", "name", "prenom", "appTextTransform", "", 1, "form-control", 3, "formControl"], ["for", "email", 1, "required"], ["type", "email", "id", "email", "name", "email", "autocomplete", "off", 1, "form-control", 3, "formControl"], ["for", "password", 1, "required"], ["type", "password", "id", "password", "name", "password", 1, "form-control", 3, "formControl"], [1, "container-fluid", "pwd-check", "radius-4"], ["for", "confirmPassword", 1, "required"], ["type", "password", "id", "confirmPassword", "name", "confirmPassword", 1, "form-control", 3, "formControl"], [1, "content-mentions"], ["href", "mailto:delice.eternel.gabon@gmail.com"], ["type", "submit", 1, "btn-suivant", "btn-primaire-h40", "col-md-12", 3, "disabled"], ["disabled", "", "type", "button", 1, "btn-spinner", "btn-primaire-h40", "col-md-12"], [1, "error-alert"], [1, "success-alert"], [1, "app-auth-divider"], ["routerLink", "/auth/signin", 1, "btn-seconnecter", "btn-secondaire-h40"], [1, "col"], [1, "title"], [1, "col-md"], [1, "bullet"], [1, "criteria"], [1, "fa", "fa-spinner", "animate", "rotation"], [1, "alert", "alert-danger"], [1, "alert", "alert-success"]],
      template: function SignupComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 0)(1, "form", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("ngSubmit", function SignupComponent_Template_form_ngSubmit_1_listener() {
            return ctx.submit();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](2, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](4, "h5");
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](6, "div", 2)(7, "div", 3)(8, "label", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](9, "Civilit\u00E9");
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](10, "div", 5)(11, "select", 6)(12, "option", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](13, "M.");
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](14, "option", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](15, "Mme");
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](16, "i", 9)(17, "i", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](18, "div", 11)(19, "label", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](20, "Nom");
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](21, "input", 13)(22, "i", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditionalCreate"](23, SignupComponent_Conditional_23_Template, 2, 1, "span", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](24, "div", 15)(25, "label", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](26, "Pr\u00E9nom");
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](27, "input", 17)(28, "i", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditionalCreate"](29, SignupComponent_Conditional_29_Template, 2, 1, "span", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](30, "div", 15)(31, "label", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](32, "Email");
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](33, "input", 19)(34, "i", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditionalCreate"](35, SignupComponent_Conditional_35_Template, 2, 1, "span", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](36, "div", 15)(37, "label", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](38, "Mot de passe");
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](39, "input", 21)(40, "i", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditionalCreate"](41, SignupComponent_Conditional_41_Template, 12, 5, "div", 22);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditionalCreate"](42, SignupComponent_Conditional_42_Template, 2, 1, "span", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](43, "div", 15)(44, "label", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](45, "Confirmer votre mot de passe");
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](46, "input", 24)(47, "i", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditionalCreate"](48, SignupComponent_Conditional_48_Template, 2, 0, "span", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditionalCreate"](49, SignupComponent_Conditional_49_Template, 2, 0, "span", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](50, "div", 25)(51, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](52);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](53, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](54, "a", 26);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](55, "delice.eternel.gabon@gmail.com");
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](56, " ou juste nous laisser un message sur le site ");
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditionalCreate"](57, SignupComponent_Conditional_57_Template, 2, 2, "button", 27);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditionalCreate"](58, SignupComponent_Conditional_58_Template, 2, 0, "button", 28);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditionalCreate"](59, SignupComponent_Conditional_59_Template, 3, 0, "div", 29);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditionalCreate"](60, SignupComponent_Conditional_60_Template, 3, 0, "div", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](61, "div", 31)(62, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](63, "D\u00E9j\u00E0 client?");
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](64, "button", 32);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](65, " Se connecter ");
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("formGroup", ctx.userForm);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](ctx.title);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](ctx.subtitle);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("formControl", ctx.gender);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngValue", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngValue", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("formControl", ctx.nom);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditional"](ctx.nom.invalid && (ctx.nom.dirty || ctx.nom.touched) ? 23 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("formControl", ctx.prenom);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditional"](ctx.prenom.invalid && (ctx.prenom.dirty || ctx.prenom.touched) ? 29 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("formControl", ctx.email);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditional"](ctx.email.invalid && (ctx.email.dirty || ctx.email.touched) ? 35 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("formControl", ctx.password);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditional"](ctx.password.errors ? 41 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditional"](ctx.password.invalid && (ctx.password.dirty || ctx.password.touched) ? 42 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("formControl", ctx.confirmPassword);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditional"](ctx.confirmPassword.invalid && (ctx.confirmPassword.dirty || ctx.confirmPassword.touched) ? 48 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditional"](ctx.confirmPassword.value !== ctx.password.value && (ctx.confirmPassword.dirty || ctx.confirmPassword.touched) ? 49 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" Les informations portant un ast\u00E9risque (*) sont obligatoires sur D\u00E9lice \u00E9ternel ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](53, 23, "COMPANY.NAME"), ", responsable de traitement, pour r\u00E9pondre \u00E0 votre demande. En application de la loi Informatique et Libert\u00E9s du 6 janvier 1978 modifi\u00E9e, vous disposez d\u2019un droit d\u2019acc\u00E8s, de rectification ou d\u2019effacement des donn\u00E9es vous concernant, et de d\u00E9cider du sort de celles-ci, post-mortem. Vous disposez \u00E9galement d\u2019un droit de vous opposer au traitement pour motifs l\u00E9gitimes, de limiter le traitement dont vous faites l\u2019objet et d\u2019un droit \u00E0 la portabilit\u00E9 des donn\u00E9es personnelles dans les limites fix\u00E9es par la loi. Vous disposez enfin de la possibilit\u00E9 de vous opposer, \u00E0 tout moment et sans frais, \u00E0 la prospection commerciale, y compris lorsque celle-ci est r\u00E9alis\u00E9e de mani\u00E8re cibl\u00E9e. Ces droits peuvent \u00EAtre exerc\u00E9s, en justifiant de votre identit\u00E9, par mail \u00E0 ");
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditional"](!ctx.loading ? 57 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditional"](ctx.loading ? 58 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditional"](ctx.retrieveUserError ? 59 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵconditional"](ctx.success ? 60 : -1);
        }
      },
      dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControlDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormGroupDirective, _angular_router__WEBPACK_IMPORTED_MODULE_16__.RouterLink, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__.TranslatePipe],
      styles: ["button.btn[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 16px 0;\n}\n\nh3[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n  font-size: 28px;\n  line-height: 38px;\n  color: #ff4b33;\n}\n\nh5[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #222222;\n  margin-bottom: 32px;\n}\n\nform[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 100%;\n}\nform[_ngcontent-%COMP%]   button.btn-connexion[_ngcontent-%COMP%], form[_ngcontent-%COMP%]   button.btn-spinner[_ngcontent-%COMP%], form[_ngcontent-%COMP%]   button.btn-suivant[_ngcontent-%COMP%], form[_ngcontent-%COMP%]   button.btn-envoyer[_ngcontent-%COMP%] {\n  margin-top: 32px;\n  margin-bottom: 16px;\n}\n\n.mx-auto[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.btn-enregistrement[_ngcontent-%COMP%], \n.btn-creercompte[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 16px;\n}\n\n.app-error-link[_ngcontent-%COMP%], \n.app-link[_ngcontent-%COMP%] {\n  text-decoration: underline;\n  cursor: pointer;\n}\n\n.app-error-link[_ngcontent-%COMP%] {\n  font-weight: bold;\n  color: #eb0000;\n}\n\n.wrapper-mdp[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n}\n.wrapper-mdp[_ngcontent-%COMP%]   .app-link[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-top: 8px;\n  color: #ff4b33;\n  font-size: large;\n  line-height: 22px;\n}\n\n.app-auth-error[_ngcontent-%COMP%], .app-auth-success[_ngcontent-%COMP%] {\n  display: block;\n  font-size: medium;\n  line-height: 19px;\n  margin-bottom: 16px;\n  text-align: center;\n}\n\n.app-auth-error[_ngcontent-%COMP%] {\n  color: #eb0000;\n}\n\n.app-auth-success[_ngcontent-%COMP%] {\n  color: #222222;\n}\n\n.app-auth-divider[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  width: 50%;\n  margin: auto;\n  text-align: center;\n}\n.app-auth-divider[_ngcontent-%COMP%]:after, .app-auth-divider[_ngcontent-%COMP%]:before {\n  height: 2px;\n  content: \"\";\n  position: absolute;\n  top: 45%;\n  width: 50%;\n  z-index: -1;\n}\n.app-auth-divider[_ngcontent-%COMP%]:after {\n  background-image: linear-gradient(to left, #ffffff, #dddddd);\n  right: 0;\n}\n.app-auth-divider[_ngcontent-%COMP%]:before {\n  background-image: linear-gradient(to right, #ffffff, #dddddd);\n  left: 0;\n}\n.app-auth-divider[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background: #ffffff;\n  padding: 0 16px;\n  font-size: medium;\n}\n\n.pwd-check[_ngcontent-%COMP%] {\n  display: none;\n  margin: 16px 0;\n  padding: 24px;\n  background-color: #e0ebf7;\n}\n.pwd-check[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n  font-size: medium;\n  line-height: 19px;\n  color: #3175c9;\n}\n.pwd-check[_ngcontent-%COMP%]   .bullet[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin: 0 8px 0 0;\n  border-radius: 100%;\n  width: 4px;\n  height: 4px;\n  background-color: #3175c9;\n}\n.pwd-check[_ngcontent-%COMP%]   .criteria[_ngcontent-%COMP%] {\n  padding: 0 0 5px;\n  color: #3175c9;\n  font-size: 11px;\n  font-weight: 400;\n}\n\n#password[_ngcontent-%COMP%]:focus    ~ .pwd-check[_ngcontent-%COMP%], \n#password[_ngcontent-%COMP%]:active    ~ .pwd-check[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.show-secret[_ngcontent-%COMP%] {\n  position: relative;\n  right: 10px;\n  top: 36px;\n  cursor: pointer;\n  margin: 0;\n}\n\ninput.ng-invalid.ng-touched[_ngcontent-%COMP%]    ~ i.bar[_ngcontent-%COMP%], \nselect.ng-invalid.ng-touched[_ngcontent-%COMP%]    ~ i.bar[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #ff4b33;\n}\ninput[_ngcontent-%COMP%]    ~ .error[_ngcontent-%COMP%], \ninput[_ngcontent-%COMP%]    ~ div[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%]    ~ .error[_ngcontent-%COMP%], \nselect[_ngcontent-%COMP%]    ~ div[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%] {\n  display: block;\n  padding-top: 7px;\n  padding-left: 16px;\n}\n\n.error[_ngcontent-%COMP%] {\n  padding-left: 8px;\n  font-size: small;\n  line-height: 17px;\n  color: #ff4b33;\n}\n\n.margin-5[_ngcontent-%COMP%] {\n  margin-bottom: 5px;\n}\n\n.error-alert[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  border-radius: 4px;\n  background-color: #fcd9d9;\n}\n.error-alert[_ngcontent-%COMP%]   .alert[_ngcontent-%COMP%] {\n  padding: 24px;\n  text-align: center;\n  color: #eb0000;\n  font-size: large;\n  line-height: 22px;\n  border: none;\n}\n.error-alert[_ngcontent-%COMP%]   .alert[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #eb0000;\n  text-decoration: underline;\n}\n\n.success-alert[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  border-radius: 4px;\n  background-color: rgba(35, 133, 0, 0.15);\n}\n.success-alert[_ngcontent-%COMP%]   .alert[_ngcontent-%COMP%] {\n  padding: 24px;\n  text-align: center;\n  color: #238500;\n  font-size: large;\n  line-height: 22px;\n  border: none;\n}\n\n.info-siren[_ngcontent-%COMP%] {\n  margin-left: 4px;\n  height: 0;\n  width: 0;\n  font-size: small;\n  color: #3175c9;\n}\n\nlabel[_ngcontent-%COMP%]:not(.required)::after {\n  content: \"(facultatif)\";\n  color: #757575;\n  padding-left: 4px;\n}\n\n.content-mentions[_ngcontent-%COMP%] {\n  padding-top: 24px;\n}\n.content-mentions[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #757575;\n  font-size: x-small;\n  line-height: 14px;\n}\n.content-mentions[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #757575 !important;\n  font-size: x-small;\n  line-height: 14px;\n  text-decoration: underline;\n}\n\n.btn-seconnecter[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 16px;\n}\n\n.form-nom[_ngcontent-%COMP%] {\n  padding-left: 16px;\n}\n\nh3[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n  font-size: 28px;\n  line-height: 38px;\n  color: #0056b3;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXV0aC9jb21tb24uc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXV0aC9zaWdudXAvc2lnbnVwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLGNBQUE7QUNDRjs7QURFQTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtBQ0NGOztBREVBO0VBQ0UsZUFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtBQ0NGOztBREdFO0VBQ0UsV0FBQTtBQ0FKO0FERUk7RUFJRSxnQkFBQTtFQUNBLG1CQUFBO0FDSE47O0FEUUE7RUFDRSxXQUFBO0FDTEY7O0FEUUE7O0VBRUUsV0FBQTtFQUNBLGdCQUFBO0FDTEY7O0FEUUE7O0VBRUUsMEJBQUE7RUFDQSxlQUFBO0FDTEY7O0FEUUE7RUFDRSxpQkFBQTtFQUNBLGNBQUE7QUNMRjs7QURRQTtFQUNFLGFBQUE7RUFDQSx5QkFBQTtBQ0xGO0FET0U7RUFDRSxxQkFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtBQ0xKOztBRFNBO0VBQ0UsY0FBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FDTkY7O0FEU0E7RUFDRSxjQUFBO0FDTkY7O0FEU0E7RUFDRSxjQUFBO0FDTkY7O0FEU0E7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FDTkY7QURRRTtFQUNFLFdBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7QUNOSjtBRFNFO0VBQ0UsNERBQUE7RUFDQSxRQUFBO0FDUEo7QURVRTtFQUNFLDZEQUFBO0VBQ0EsT0FBQTtBQ1JKO0FEV0U7RUFDRSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQ1RKOztBRGNBO0VBQ0UsYUFBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0VBQ0EseUJBQUE7QUNYRjtBRGFFO0VBQ0Usa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtBQ1hKO0FEY0U7RUFDRSxxQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLHlCQUFBO0FDWko7QURlRTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQ2JKOztBRGlCQTs7RUFFRSxjQUFBO0FDZEY7O0FEa0JBO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtFQUNBLGVBQUE7RUFDQSxTQUFBO0FDZkY7O0FEdUJNOztFQUNFLGdDQUFBO0FDbkJSO0FEd0JFOzs7O0VBRUUsY0FBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUNwQko7O0FEd0JBO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtBQ3JCRjs7QUFoS0E7RUFDRSxrQkFBQTtBQW1LRjs7QUFoS0E7RUFDRSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7QUFtS0Y7QUFqS0U7RUFDRSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLFlBQUE7QUFtS0o7QUFqS0k7RUFDRSxjQUFBO0VBQ0EsMEJBQUE7QUFtS047O0FBOUpBO0VBQ0UsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLHdDQUFBO0FBaUtGO0FBL0pFO0VBQ0UsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0FBaUtKOztBQTdKQTtFQUNFLGdCQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFnS0Y7O0FBN0pBO0VBQ0UsdUJBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7QUFnS0Y7O0FBN0pBO0VBQ0UsaUJBQUE7QUFnS0Y7QUE5SkU7RUFDRSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBQWdLSjtBQTlKSTtFQUNFLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLDBCQUFBO0FBZ0tOOztBQTNKQTtFQUNFLFdBQUE7RUFDQSxnQkFBQTtBQThKRjs7QUEzSkE7RUFDRSxrQkFBQTtBQThKRjs7QUEzSkE7RUFDRSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7QUE4SkYiLCJzb3VyY2VzQ29udGVudCI6WyJidXR0b24uYnRuIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogMTZweCAwO1xufVxuXG5oMyB7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbiAgZm9udC1zaXplOiAyOHB4O1xuICBsaW5lLWhlaWdodDogMzhweDtcbiAgY29sb3I6ICNmZjRiMzM7XG59XG5cbmg1IHtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBjb2xvcjogIzIyMjIyMjtcbiAgbWFyZ2luLWJvdHRvbTogMzJweDtcbn1cblxuZm9ybSB7XG4gIGJ1dHRvbiB7XG4gICAgd2lkdGg6IDEwMCU7XG5cbiAgICAmLmJ0bi1jb25uZXhpb24sXG4gICAgJi5idG4tc3Bpbm5lcixcbiAgICAmLmJ0bi1zdWl2YW50LFxuICAgICYuYnRuLWVudm95ZXIge1xuICAgICAgbWFyZ2luLXRvcDogMzJweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gICAgfVxuICB9XG59XG5cbi5teC1hdXRvIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5idG4tZW5yZWdpc3RyZW1lbnQsXG4uYnRuLWNyZWVyY29tcHRlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi10b3A6IDE2cHg7XG59XG5cbi5hcHAtZXJyb3ItbGluayxcbi5hcHAtbGluayB7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hcHAtZXJyb3ItbGluayB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogI2ViMDAwMDtcbn1cblxuLndyYXBwZXItbWRwIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcblxuICAuYXBwLWxpbmsge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBtYXJnaW4tdG9wOiA4cHg7XG4gICAgY29sb3I6ICNmZjRiMzM7XG4gICAgZm9udC1zaXplOiBsYXJnZTtcbiAgICBsaW5lLWhlaWdodDogMjJweDtcbiAgfVxufVxuXG4uYXBwLWF1dGgtZXJyb3IsIC5hcHAtYXV0aC1zdWNjZXNzIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZvbnQtc2l6ZTogbWVkaXVtO1xuICBsaW5lLWhlaWdodDogMTlweDtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uYXBwLWF1dGgtZXJyb3Ige1xuICBjb2xvcjogI2ViMDAwMDtcbn1cblxuLmFwcC1hdXRoLXN1Y2Nlc3Mge1xuICBjb2xvcjogIzIyMjIyMjtcbn1cblxuLmFwcC1hdXRoLWRpdmlkZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDE7XG4gIHdpZHRoOiA1MCU7XG4gIG1hcmdpbjogYXV0bztcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gICY6YWZ0ZXIsICY6YmVmb3JlIHtcbiAgICBoZWlnaHQ6IDJweDtcbiAgICBjb250ZW50OiBcIlwiO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDQ1JTtcbiAgICB3aWR0aDogNTAlO1xuICAgIHotaW5kZXg6IC0xO1xuICB9XG5cbiAgJjphZnRlciB7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIGxlZnQsICNmZmZmZmYsICNkZGRkZGQpO1xuICAgIHJpZ2h0OiAwO1xuICB9XG5cbiAgJjpiZWZvcmUge1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgI2ZmZmZmZiwgI2RkZGRkZCk7XG4gICAgbGVmdDogMDtcbiAgfVxuXG4gIHNwYW4ge1xuICAgIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gICAgcGFkZGluZzogMCAxNnB4O1xuICAgIGZvbnQtc2l6ZTogbWVkaXVtO1xuICB9XG59XG5cbi8vZW5jYXJ0IGFwcGFyYWlzc2FudCBzb3VzIGwnaW5wdXQgZGUgbWRwIGxvcnNxdSdpbCBlc3QgZm9jdXMgb3UgYWN0aXZlXG4ucHdkLWNoZWNrIHtcbiAgZGlzcGxheTogbm9uZTtcbiAgbWFyZ2luOiAxNnB4IDA7XG4gIHBhZGRpbmc6IDI0cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlMGViZjc7IC8vIzMxNzVjOSBlbiBvcGFjaXTDg8KpIDAuMTVcblxuICAudGl0bGUge1xuICAgIG1hcmdpbjogMCAwIDE2cHggMDtcbiAgICBmb250LXNpemU6IG1lZGl1bTtcbiAgICBsaW5lLWhlaWdodDogMTlweDtcbiAgICBjb2xvcjogIzMxNzVjOTtcbiAgfVxuXG4gIC5idWxsZXQge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBtYXJnaW46IDAgOHB4IDAgMDtcbiAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgIHdpZHRoOiA0cHg7XG4gICAgaGVpZ2h0OiA0cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMxNzVjOTtcbiAgfVxuXG4gIC5jcml0ZXJpYSB7XG4gICAgcGFkZGluZzogMCAwIDVweDtcbiAgICBjb2xvcjogIzMxNzVjOTtcbiAgICBmb250LXNpemU6IDExcHg7XG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgfVxufVxuXG4jcGFzc3dvcmQ6Zm9jdXMgfiAucHdkLWNoZWNrLFxuI3Bhc3N3b3JkOmFjdGl2ZSB+IC5wd2QtY2hlY2sge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuXG4uc2hvdy1zZWNyZXQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHJpZ2h0OiAxMHB4O1xuICB0b3A6IDM2cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgbWFyZ2luOiAwO1xufVxuXG4vL2VycmV1cnNcbmlucHV0LFxuc2VsZWN0IHtcbiAgJi5uZy1pbnZhbGlkIHtcbiAgICAmLm5nLXRvdWNoZWQge1xuICAgICAgfiBpLmJhciB7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZmY0YjMzO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIH4gLmVycm9yLFxuICB+IGRpdiAuZXJyb3Ige1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHBhZGRpbmctdG9wOiA3cHg7XG4gICAgcGFkZGluZy1sZWZ0OiAxNnB4O1xuICB9XG59XG5cbi5lcnJvciB7XG4gIHBhZGRpbmctbGVmdDogOHB4O1xuICBmb250LXNpemU6IHNtYWxsO1xuICBsaW5lLWhlaWdodDogMTdweDtcbiAgY29sb3I6ICNmZjRiMzM7XG59XG4iLCJAdXNlICcuLi9jb21tb24uc2Nzcyc7XG5cbi5tYXJnaW4tNSB7XG4gIG1hcmdpbi1ib3R0b206IDVweDtcbn1cblxuLmVycm9yLWFsZXJ0IHtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmNkOWQ5O1xuXG4gIC5hbGVydCB7XG4gICAgcGFkZGluZzogMjRweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgY29sb3I6ICNlYjAwMDA7XG4gICAgZm9udC1zaXplOiBsYXJnZTtcbiAgICBsaW5lLWhlaWdodDogMjJweDtcbiAgICBib3JkZXI6IG5vbmU7XG5cbiAgICBhIHtcbiAgICAgIGNvbG9yOiAjZWIwMDAwO1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgfVxuICB9XG59XG5cbi5zdWNjZXNzLWFsZXJ0IHtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDM1LCAxMzMsIDAsIDAuMTUpO1xuXG4gIC5hbGVydCB7XG4gICAgcGFkZGluZzogMjRweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgY29sb3I6ICMyMzg1MDA7XG4gICAgZm9udC1zaXplOiBsYXJnZTtcbiAgICBsaW5lLWhlaWdodDogMjJweDtcbiAgICBib3JkZXI6IG5vbmU7XG4gIH1cbn1cblxuLmluZm8tc2lyZW4ge1xuICBtYXJnaW4tbGVmdDogNHB4O1xuICBoZWlnaHQ6IDA7XG4gIHdpZHRoOiAwO1xuICBmb250LXNpemU6IHNtYWxsO1xuICBjb2xvcjogIzMxNzVjOTtcbn1cblxubGFiZWw6bm90KC5yZXF1aXJlZCk6OmFmdGVyIHtcbiAgY29udGVudDogXCIoZmFjdWx0YXRpZilcIjtcbiAgY29sb3I6ICM3NTc1NzU7XG4gIHBhZGRpbmctbGVmdDogNHB4O1xufVxuXG4uY29udGVudC1tZW50aW9ucyB7XG4gIHBhZGRpbmctdG9wOiAyNHB4O1xuXG4gIHAge1xuICAgIGNvbG9yOiAjNzU3NTc1O1xuICAgIGZvbnQtc2l6ZTogeC1zbWFsbDtcbiAgICBsaW5lLWhlaWdodDogMTRweDtcblxuICAgIGEge1xuICAgICAgY29sb3I6ICM3NTc1NzUgIWltcG9ydGFudDtcbiAgICAgIGZvbnQtc2l6ZTogeC1zbWFsbDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxNHB4O1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgfVxuICB9XG59XG5cbi5idG4tc2Vjb25uZWN0ZXIge1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luLXRvcDogMTZweDtcbn1cblxuLmZvcm0tbm9tIHtcbiAgcGFkZGluZy1sZWZ0OiAxNnB4O1xufVxuXG5oMyB7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbiAgZm9udC1zaXplOiAyOHB4O1xuICBsaW5lLWhlaWdodDogMzhweDtcbiAgY29sb3I6ICMwMDU2YjM7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ },

/***/ 66539
/*!***********************************************!*\
  !*** ./src/app/auth/login/login.component.ts ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginComponent: () => (/* binding */ LoginComponent)
/* harmony export */ });
/* harmony import */ var C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/compat/app */ 3602);
/* harmony import */ var firebase_compat_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/compat/auth */ 12043);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ 45312);
/* harmony import */ var _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @app/auth/store/auth.actions */ 2520);
/* harmony import */ var _helpers_common_services_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @helpers/common.services.utils */ 61362);
/* harmony import */ var _helpers_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @helpers/constants */ 4245);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngrx/store */ 81383);



 // <-- ajuste le chemin si besoin





class LoginComponent {
  constructor(ngZone, store) {
    this.ngZone = ngZone;
    this.store = store;
    this.signInOptions = [{
      provider: firebase_compat_app__WEBPACK_IMPORTED_MODULE_1__["default"].auth.GoogleAuthProvider.PROVIDER_ID,
      customParameters: {
        locale: _helpers_constants__WEBPACK_IMPORTED_MODULE_6__.DEFAULT_LOCALE_ID
      }
    }, {
      provider: firebase_compat_app__WEBPACK_IMPORTED_MODULE_1__["default"].auth.FacebookAuthProvider.PROVIDER_ID,
      customParameters: {
        locale: _helpers_constants__WEBPACK_IMPORTED_MODULE_6__.DEFAULT_LOCALE_ID
      }
    }, {
      provider: firebase_compat_app__WEBPACK_IMPORTED_MODULE_1__["default"].auth.EmailAuthProvider.PROVIDER_ID,
      customParameters: {
        locale: _helpers_constants__WEBPACK_IMPORTED_MODULE_6__.DEFAULT_LOCALE_ID
      }
    }, {
      provider: firebase_compat_app__WEBPACK_IMPORTED_MODULE_1__["default"].auth.TwitterAuthProvider.PROVIDER_ID,
      customParameters: {
        locale: _helpers_constants__WEBPACK_IMPORTED_MODULE_6__.DEFAULT_LOCALE_ID
      }
    }];
  }
  ngOnInit() {
    var _this = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // ✅ IMPORTANT : init Firebase COMPAT (FirebaseUI dépend de compat)
      if (!firebase_compat_app__WEBPACK_IMPORTED_MODULE_1__["default"].apps?.length) {
        firebase_compat_app__WEBPACK_IMPORTED_MODULE_1__["default"].initializeApp(_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.firebaseConfig);
      }
      window.firebase = firebase_compat_app__WEBPACK_IMPORTED_MODULE_1__["default"];
      firebase_compat_app__WEBPACK_IMPORTED_MODULE_1__["default"].auth().languageCode = _helpers_constants__WEBPACK_IMPORTED_MODULE_6__.DEFAULT_LOCALE_ID;
      yield firebase_compat_app__WEBPACK_IMPORTED_MODULE_1__["default"].auth().setPersistence(firebase_compat_app__WEBPACK_IMPORTED_MODULE_1__["default"].auth.Auth.Persistence.LOCAL);
      _this.centerOAuthPopup();
      _this.startFirebaseUi('popup');
    })();
  }
  /** Intercepte window.open pour centrer la fenêtre OAuth sur l'écran. */
  centerOAuthPopup() {
    const original = window.open.bind(window);
    window.open = function (url, target, _features) {
      const w = 500;
      const h = 600;
      const left = Math.round((screen.width - w) / 2);
      const top = Math.round((screen.height - h) / 2);
      const centered = `width=${w},height=${h},left=${left},top=${top},scrollbars=yes,resizable=yes`;
      return original(url, target ?? '_blank', centered);
    };
  }
  ngOnDestroy() {
    if (this.ui?.delete) {
      this.ui.delete();
    }
  }
  startFirebaseUi(flow) {
    const uiConfig = {
      signInFlow: flow,
      signInOptions: this.signInOptions,
      callbacks: {
        signInSuccessWithAuthResult: authResult => {
          this.dispatchLoggedIn(authResult);
          return false; // navigation gérée par l'effet NgRx
        },
        signInFailure: error => {
          console.error('[FirebaseUI] failure', error);
          return Promise.resolve();
        }
      }
    };
    try {
      const existing = firebaseui.auth.AuthUI.getInstance();
      this.ui = existing ?? new firebaseui.auth.AuthUI(firebase_compat_app__WEBPACK_IMPORTED_MODULE_1__["default"].auth());
    } catch {
      this.ui = new firebaseui.auth.AuthUI(firebase_compat_app__WEBPACK_IMPORTED_MODULE_1__["default"].auth());
    }
    this.ui.start('#firebaseui-auth-container', uiConfig);
  }
  dispatchLoggedIn(resultLike) {
    const payload = (0,_helpers_common_services_utils__WEBPACK_IMPORTED_MODULE_5__.initLoginPayload)(resultLike);
    this.ngZone.run(() => {
      this.store.dispatch(new _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_4__.ActionAuthLoggedIn(payload));
    });
  }
  static {
    this.ɵfac = function LoginComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_9__.Store));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
      type: LoginComponent,
      selectors: [["social-login"]],
      standalone: false,
      decls: 1,
      vars: 0,
      consts: [["id", "firebaseui-auth-container", 1, "auth-container"]],
      template: function LoginComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "div", 0);
        }
      },
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 67848
/*!***************************************************!*\
  !*** ./src/app/core/firebase/users.repository.ts ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UsersRepository: () => (/* binding */ UsersRepository)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 43942);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 95429);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/database */ 41559);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 11817);





/**
 * UsersRepository
 * Seule classe autorisée à lire/écrire le nœud Firebase `users/`.
 * Appelé exclusivement depuis les NgRx Effects.
 */
class UsersRepository {
  constructor(db) {
    this.db = db;
  }
  watchCommands(uid) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_0__.Observable(observer => {
      const dbRef = (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.ref)(this.db, `users/${uid}/commends`);
      const unsubscribe = (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.onValue)(dbRef, snap => {
        const val = snap.val();
        if (val) {
          const firstCommend = Object.values(val)[0];
          observer.next(firstCommend);
        }
      }, error => observer.error(error));
      return () => unsubscribe();
    });
  }
  getOrderStatus(uid) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.from)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.get)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.ref)(this.db, `users/${uid}/orderStatus`))).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(snap => snap.val()));
  }
  saveBasket(uid, items) {
    return (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.set)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.ref)(this.db, `users/${uid}/basket`), items.length > 0 ? items : null);
  }
  getBasket(uid) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.from)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.get)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.ref)(this.db, `users/${uid}/basket`))).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(snap => {
      const val = snap.val();
      if (!val) return null;
      const raw = Array.isArray(val) ? val : Object.values(val);
      return raw.filter(Boolean);
    }));
  }
  static {
    this.ɵfac = function UsersRepository_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || UsersRepository)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_fire_database__WEBPACK_IMPORTED_MODULE_3__.Database));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
      token: UsersRepository,
      factory: UsersRepository.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 69321
/*!********************************************************!*\
  !*** ./src/app/shared/services/roles/roles.service.ts ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RolesService: () => (/* binding */ RolesService)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ 81383);
/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list */ 7565);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var _app_auth_store_auth_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @app/auth/store/auth.selectors */ 2981);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 11817);






class RolesService {
  constructor(store) {
    this.store = store;
    this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.select)(_app_auth_store_auth_selectors__WEBPACK_IMPORTED_MODULE_3__.selectorAuth), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.filter)(state => !!state)).subscribe(state => this.current = state.user);
  }
  is(user, role) {
    if (user === undefined) {
      return false;
    }
    return user && user.indexRole === role.index;
  }
  getRole(user) {
    const targetUser = user ?? this.current;
    if (targetUser === undefined) {
      return 'NO_ROLE';
    }
    switch (targetUser.indexRole) {
      case _list__WEBPACK_IMPORTED_MODULE_1__.ROLES.ROLE_CONNECTED_USER.index:
        return _list__WEBPACK_IMPORTED_MODULE_1__.ROLES.ROLE_CONNECTED_USER.value;
      case _list__WEBPACK_IMPORTED_MODULE_1__.ROLES.ROLE_ADMINISTRATEUR.index:
        return _list__WEBPACK_IMPORTED_MODULE_1__.ROLES.ROLE_ADMINISTRATEUR.value;
      case _list__WEBPACK_IMPORTED_MODULE_1__.ROLES.ROLE_ANONYMOUSE_USER.index:
        return _list__WEBPACK_IMPORTED_MODULE_1__.ROLES.ROLE_ANONYMOUSE_USER.value;
    }
    return 'NO_ROLE';
  }
  isAdmin(user) {
    return this.is(user ?? this.current, _list__WEBPACK_IMPORTED_MODULE_1__.ROLES.ROLE_ADMINISTRATEUR);
  }
  isAnonymouse(user) {
    return this.is(user ?? this.current, _list__WEBPACK_IMPORTED_MODULE_1__.ROLES.ROLE_ANONYMOUSE_USER);
  }
  isUser(user) {
    return this.is(user ?? this.current, _list__WEBPACK_IMPORTED_MODULE_1__.ROLES.ROLE_CONNECTED_USER);
  }
  canEdit(user = this.current) {
    return this.isAdmin(user) || this.isUser(user);
  }
  static {
    this.ɵfac = function RolesService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || RolesService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.Store));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
      token: RolesService,
      factory: RolesService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 70671
/*!*************************************************!*\
  !*** ./src/app/features/store/items.actions.ts ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActionClearBasket: () => (/* binding */ ActionClearBasket),
/* harmony export */   ActionItemAdd: () => (/* binding */ ActionItemAdd),
/* harmony export */   ActionItemAddSuccess: () => (/* binding */ ActionItemAddSuccess),
/* harmony export */   ActionItemAddleError: () => (/* binding */ ActionItemAddleError),
/* harmony export */   ActionItemToogleNotSelected: () => (/* binding */ ActionItemToogleNotSelected),
/* harmony export */   ActionItemToogleSelect: () => (/* binding */ ActionItemToogleSelect),
/* harmony export */   ActionItemToogleSelectError: () => (/* binding */ ActionItemToogleSelectError),
/* harmony export */   ActionItemToogleSelectSuccess: () => (/* binding */ ActionItemToogleSelectSuccess),
/* harmony export */   ActionItemsRetrieve: () => (/* binding */ ActionItemsRetrieve),
/* harmony export */   ActionItemsRetrieveError: () => (/* binding */ ActionItemsRetrieveError),
/* harmony export */   ActionItemsRetrieveSuccess: () => (/* binding */ ActionItemsRetrieveSuccess),
/* harmony export */   ActionRestoreBasketItem: () => (/* binding */ ActionRestoreBasketItem),
/* harmony export */   ActionUpdateBasketItem: () => (/* binding */ ActionUpdateBasketItem),
/* harmony export */   ItemsActionTypes: () => (/* binding */ ItemsActionTypes)
/* harmony export */ });
var ItemsActionTypes;
(function (ItemsActionTypes) {
  ItemsActionTypes["RETRIEVE_ITEMS"] = "[PORTFOLIO] Retrieve items";
  ItemsActionTypes["RETRIEVE_ITEMS_SUCCESS"] = "[PORTFOLIO] Retrieved items successfully";
  ItemsActionTypes["RETRIEVE_ITEMS_ERROR"] = "[PORTFOLIO] Fail retrieving items";
  ItemsActionTypes["ADD"] = "[PORTFOLIO] Add";
  ItemsActionTypes["ADD_SUCCESS"] = "[PORTFOLIO] Item ddded successfully";
  ItemsActionTypes["ADD_ERROR"] = "[PORTFOLIO] Fail adding item";
  ItemsActionTypes["TOOGLE_SELECT_ITEM"] = "[PORTFOLIO] Select item";
  ItemsActionTypes["TOOGLE_SELECT_ITEM_SUCCESS"] = "[PORTFOLIO] Item selected successfully";
  ItemsActionTypes["TOOGLE_SELECT_ITEM_ERROR"] = "[PORTFOLIO] Fail selected item";
  ItemsActionTypes["TOOGLE_SELECT_ITEM_NOT_SELECTED"] = "[PORTFOLIO] Toogle not selected item from firebase";
  ItemsActionTypes["UPDATE_BASKET_ITEM"] = "[BASKET] Changing basket item";
  ItemsActionTypes["RESTORE_BASKET_ITEM"] = "[BASKET] Restoring basket item from storage";
  ItemsActionTypes["CLEAR_BASKET"] = "[BASKET] Clear basket";
})(ItemsActionTypes || (ItemsActionTypes = {}));
class ActionUpdateBasketItem {
  constructor(payload) {
    this.payload = payload;
    this.type = ItemsActionTypes.UPDATE_BASKET_ITEM;
  }
}
/** Restaure un item depuis le localStorage vers le store NgRx.
 *  N'est PAS écouté par saveBasket$ pour éviter d'écraser le localStorage pendant le restore. */
class ActionRestoreBasketItem {
  constructor(payload) {
    this.payload = payload;
    this.type = ItemsActionTypes.RESTORE_BASKET_ITEM;
  }
}
///////////////////////// RETRIEVE OPERATION ///////////////////
class ActionItemsRetrieve {
  constructor(payload) {
    this.payload = payload;
    this.type = ItemsActionTypes.RETRIEVE_ITEMS;
  }
}
class ActionItemsRetrieveSuccess {
  constructor(payload) {
    this.payload = payload;
    this.type = ItemsActionTypes.RETRIEVE_ITEMS_SUCCESS;
  }
}
class ActionItemsRetrieveError {
  constructor(payload) {
    this.payload = payload;
    this.type = ItemsActionTypes.RETRIEVE_ITEMS_ERROR;
  }
}
///////////////////////// TOOGLE SELECT ITEM ///////////////////
class ActionItemToogleNotSelected {
  constructor(payload) {
    this.payload = payload;
    this.type = ItemsActionTypes.TOOGLE_SELECT_ITEM_NOT_SELECTED;
  }
}
class ActionItemToogleSelect {
  constructor(payload) {
    this.payload = payload;
    this.type = ItemsActionTypes.TOOGLE_SELECT_ITEM;
  }
}
class ActionItemToogleSelectSuccess {
  constructor(payload) {
    this.payload = payload;
    this.type = ItemsActionTypes.TOOGLE_SELECT_ITEM_SUCCESS;
  }
}
class ActionItemToogleSelectError {
  constructor(payload) {
    this.payload = payload;
    this.type = ItemsActionTypes.TOOGLE_SELECT_ITEM_ERROR;
  }
}
///////////////////////// ADD OPERATION ///////////////////
class ActionItemAdd {
  constructor(payload) {
    this.payload = payload;
    this.type = ItemsActionTypes.ADD;
  }
}
class ActionItemAddSuccess {
  constructor(payload) {
    this.payload = payload;
    this.type = ItemsActionTypes.ADD_SUCCESS;
  }
}
class ActionItemAddleError {
  constructor(payload) {
    this.payload = payload;
    this.type = ItemsActionTypes.ADD_ERROR;
  }
}
class ActionClearBasket {
  constructor() {
    this.type = ItemsActionTypes.CLEAR_BASKET;
  }
}

/***/ },

/***/ 71765
/*!**************************************************************!*\
  !*** ./src/app/shared/components/footer/footer.component.ts ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FooterComponent: () => (/* binding */ FooterComponent)
/* harmony export */ });
/* harmony import */ var _env_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @env/environment */ 45312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _map_template_map_template_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../map-template/map-template.component */ 8197);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ 48503);




class FooterComponent {
  constructor() {
    this.envName = _env_environment__WEBPACK_IMPORTED_MODULE_0__.environment.envName;
    this.version = _env_environment__WEBPACK_IMPORTED_MODULE_0__.environment.versions.app;
    this.isProd = _env_environment__WEBPACK_IMPORTED_MODULE_0__.environment.production;
  }
  ngOnInit() {
    this.mapConfig = {
      lat: 0.388537,
      lng: 9.447901,
      zoom: {
        initialValue: 17,
        maxZoom: 18,
        minZoom: 4
      },
      companyMarkerColor: 'red',
      companyTitle: 'Délice éternel',
      companyInfo: 'Prêt à porter, vente de bijoux, masques grand public, robes ...  ',
      size: {
        height: 400,
        width: 400
      }
    };
  }
  static {
    this.ɵfac = function FooterComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || FooterComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: FooterComponent,
      selectors: [["app-footer"]],
      standalone: false,
      decls: 44,
      vars: 20,
      consts: [[1, "footer"], [1, "container"], [1, "row"], [1, "col-lg-4", "mb-5", "mb-lg-0", "text-center"], [1, "mb-4"], [1, "pre-wrap", "lead", "mb-0"], [1, "d-flex", "flex-column", "align-items-center", "ajust-botom"], [3, "mapConfig"], [1, "block-infos-msg"], [1, "col-lg-4", "mb-5", "mb-lg-0", "ajust-botom"], ["href", "https://www.facebook.com/constance.bakala", 1, "btn", "btn-outline-light", "btn-social", "mx-1"], [1, "fab", "fa-fw", "fa-facebook-f"], ["href", "https://www.twitter.com/BakalaConstance", 1, "btn", "btn-outline-light", "btn-social", "mx-1"], [1, "fab", "fa-fw", "fa-twitter"], [1, "col-lg-4"], [1, "mb-4", "text-center"], [1, "pre-wrap", "lead", "mb-0", "text-justify"], [1, "copyright", "py-4", "text-center", "text-white"], [1, "app-auth-footer"], [1, "text-center", "app-version"], [1, "pre-wrap"], [3, "innerHTML"], [1, "scroll-to-top", "d-lg-none", "position-fixed"], ["href", "#page-top", 1, "js-scroll-trigger", "d-block", "text-center", "text-white", "rounded"], [1, "fa", "fa-chevron-up"]],
      template: function FooterComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "footer", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h4", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](6, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "p", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](9, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](12, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](13, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, " APIP : 004-15503GUI du 04/09/2008");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 6)(16, "app-map-template", 7)(17, "div", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, " - ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 9)(20, "h4", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](22, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "a", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](24, "i", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "a", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](26, "i", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "div", 14)(28, "h4", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](29);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](30, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "p", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](32);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](33, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "section", 17)(35, "div", 1)(36, "div", 18)(37, "div", 19)(38, "small", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](39, "Copyright \u00A9 D\u00E9lice-\u00C9ternel 2020 ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](40, "span", 21);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](41, "div", 22)(42, "a", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](43, "i", 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](6, 8, "LOCALIZATION"));
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](9, 10, "NOMBAKELE"), " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](12, 12, "LOCALIZATION_DESCRIPTION"), " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("mapConfig", ctx.mapConfig);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](22, 14, "ON_INTERNET"));
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](30, 16, "ABOUT_ME"));
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](33, 18, "ABOUT_CONSTANCE"));
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("innerHTML", "v" + ctx.version + (ctx.isProd ? "" : "\u00A0[" + ctx.envName + "]"), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeHtml"]);
        }
      },
      dependencies: [_map_template_map_template_component__WEBPACK_IMPORTED_MODULE_2__.MapTemplateComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslatePipe],
      styles: [".btn[_ngcontent-%COMP%] {\n  font-size: 1.81rem;\n}\n\n.mb-lg-0[_ngcontent-%COMP%], .my-lg-0[_ngcontent-%COMP%] {\n  margin-bottom: 0 !important;\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0FBQ0Y7O0FBRUE7RUFDRSwyQkFBQTtFQUNBLGtCQUFBO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuYnRuIHtcbiAgZm9udC1zaXplOiAxLjgxcmVtO1xufVxuXG4ubWItbGctMCwgLm15LWxnLTAge1xuICBtYXJnaW4tYm90dG9tOiAwICFpbXBvcnRhbnQ7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ },

/***/ 75577
/*!******************************************************************!*\
  !*** ./src/app/shared/pipes/enum-to-array/enum-to-array.pipe.ts ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EnumToArrayPipe: () => (/* binding */ EnumToArrayPipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 36124);

class EnumToArrayPipe {
  transform(data) {
    return data ? Object.keys(data) : undefined;
  }
  static {
    this.ɵfac = function EnumToArrayPipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || EnumToArrayPipe)();
    };
  }
  static {
    this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
      name: "enumToArray",
      type: EnumToArrayPipe,
      pure: true,
      standalone: false
    });
  }
}

/***/ },

/***/ 75839
/*!**********************************************************************!*\
  !*** ./src/app/shared/components/navigation/navigation.component.ts ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NavigationComponent: () => (/* binding */ NavigationComponent)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ 81383);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 2510);
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/auth */ 99082);
/* harmony import */ var _app_features_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @app/features/store */ 85730);
/* harmony import */ var _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @app/auth/store/auth.actions */ 2520);
/* harmony import */ var _helpers_common_services_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @helpers/common.services.utils */ 61362);
/* harmony import */ var _helpers_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @helpers/constants */ 4245);
/* harmony import */ var _helpers_nav_scroll_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @helpers/nav-scroll.utils */ 81608);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _app_core_firebase_app_config_repository__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @app/core/firebase/app-config.repository */ 190);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 79748);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 46264);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ 93840);

















const _c0 = () => ["/shopping-cart"];
const _c1 = () => ["/auth/signin"];
const _c2 = () => ["/order-history"];
function NavigationComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "option", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const language_r3 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", language_r3)("selected", language_r3 === ctx_r3.translate.currentLang);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", language_r3, " ");
  }
}
function NavigationComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "li", 13)(1, "a", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function NavigationComponent_Conditional_29_Template_a_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r5);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r3.disconnect());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "div", 3)(3, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4, "exit_to_app");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](7, 2, "DISCONNECT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx.email);
  }
}
function NavigationComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "li", 13)(1, "a", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function NavigationComponent_Conditional_31_Template_a_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r6);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r3.closeMenu());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3, "account_circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction0"](4, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](6, 2, "CONNECT"));
  }
}
function NavigationComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "li", 13)(1, "a", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function NavigationComponent_Conditional_32_Template_a_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r7);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r3.closeMenu());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3, "history");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction0"](1, _c2));
  }
}
function NavigationComponent_ng_container_41_li_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "li", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "img", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const user_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("src", user_r8.photoURL, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsanitizeUrl"]);
  }
}
function NavigationComponent_ng_container_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, NavigationComponent_ng_container_41_li_1_Template, 2, 1, "li", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const user_r8 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", user_r8.photoURL);
  }
}
class NavigationComponent {
  constructor(store, ngZone, auth, translate, configRepo) {
    this.store = store;
    this.ngZone = ngZone;
    this.auth = auth;
    this.translate = translate;
    this.configRepo = configRepo;
    this.subs = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subscription();
    this.appTitle = '';
    this.appTitleFr = '';
    this.appTitleEn = '';
    this.user$ = (0,_angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__.user)(this.auth);
    this.translate.addLangs(['fr', 'en']);
    this.translate.setDefaultLang('fr');
    const supportedLangs = ['fr', 'en'];
    const savedLang = localStorage.getItem('lang');
    const browserLang = _helpers_constants__WEBPACK_IMPORTED_MODULE_6__.DEFAULT_LOCALE_ID;
    this.translate.use(supportedLangs.includes(savedLang) ? savedLang : supportedLangs.includes(browserLang) ? browserLang : 'fr');
  }
  ngOnInit() {
    this.nbSelectedItems$ = this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.select)(_app_features_store__WEBPACK_IMPORTED_MODULE_3__.selectNbChosenItems));
    this.subs.add((0,_angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__.user)(this.auth).subscribe(firebaseUser => {
      if (firebaseUser) {
        this.store.dispatch(new _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_4__.ActionAuthLoggedIn((0,_helpers_common_services_utils__WEBPACK_IMPORTED_MODULE_5__.initLoginPayload)(firebaseUser)));
      }
    }));
    this.subs.add(this.configRepo.watchAppTitle().subscribe(t => {
      this.appTitleFr = t.fr ?? '';
      this.appTitleEn = t.en ?? '';
      this.updateAppTitle(this.translate.currentLang ?? 'fr');
    }));
    this.subs.add(this.translate.onLangChange.subscribe(({
      lang
    }) => this.updateAppTitle(lang)));
    this.destroyNavScroll = (0,_helpers_nav_scroll_utils__WEBPACK_IMPORTED_MODULE_7__.initNavScroll)();
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
    this.destroyNavScroll?.();
  }
  updateAppTitle(lang) {
    const title = lang === 'en' ? this.appTitleEn : this.appTitleFr;
    this.appTitle = title || 'DÉLICE ÉTERNEL';
  }
  switchLang(lang) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
  closeMenu() {
    const navbar = document.getElementById('navbarResponsive');
    if (navbar && navbar.classList.contains('show')) {
      navbar.classList.remove('show');
      const toggler = document.querySelector('.navbar-toggler');
      if (toggler) toggler.setAttribute('aria-expanded', 'false');
    }
  }
  disconnect() {
    this.closeMenu();
    this.ngZone.run(() => {
      (0,_angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__.signOut)(this.auth).then(() => this.store.dispatch(new _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_4__.ActionAuthLogout()));
    });
  }
  static {
    this.ɵfac = function NavigationComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || NavigationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__.Auth), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_app_core_firebase_app_config_repository__WEBPACK_IMPORTED_MODULE_11__.AppConfigRepository));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
      type: NavigationComponent,
      selectors: [["app-navigation"]],
      standalone: false,
      decls: 44,
      vars: 18,
      consts: [["selectedLang", ""], ["id", "mainNav", 1, "navbar", "navbar-expand-lg", "bg-secondary", "fixed-top"], [1, "container"], [1, "d-flex", "align-items-center"], ["href", "#page-top", 1, "navbar-brand", "js-scroll-trigger"], ["src", "assets/style-sauvage_only_logo-removebg.png", "height", "40px"], [1, "ml-3"], [1, "form-control", "form-control-sm", "nav-lang-select", 3, "change"], [3, "value", "selected"], ["type", "button", "data-bs-toggle", "collapse", "data-bs-target", "#navbarResponsive", "aria-controls", "navbarResponsive", "aria-expanded", "false", "aria-label", "Toggle navigation", 1, "navbar-toggler", "navbar-toggler-right", "font-weight-bold", "bg-primary", "text-white", "rounded"], [1, "fas", "fa-bars"], ["id", "navbarResponsive", 1, "collapse", "navbar-collapse"], [1, "navbar-nav", "ml-auto", "smooth-scroll"], [1, "nav-item", "mx-0", "mx-lg-1"], ["href", "#portfolio", 1, "nav-link", "py-3", "px-0", "px-lg-3", "rounded", "js-scroll-trigger", "active", 3, "click"], ["href", "#about", 1, "nav-link", "py-3", "px-0", "px-lg-3", "rounded", "js-scroll-trigger", 3, "click"], ["href", "#contact", 1, "nav-link", "py-3", "px-0", "px-lg-3", "rounded", "js-scroll-trigger", 3, "click"], [1, "ajust"], ["aria-label", "Toggle navigation", 1, "nav-link", "py-3", "px-0", "px-lg-3", "rounded", 3, "click", "routerLink"], [1, "badge", "badge-pill", "red"], [4, "ngIf"], [1, "filler"], [1, "nav-link", "py-3", "px-0", "px-lg-3", "rounded", "d-flex", "flex-column", "align-items-start", 3, "click"], [1, "ml-2", "ajust"], [1, "small", "text-muted"], [1, "nav-link", "py-3", "px-0", "px-lg-3", "rounded", 3, "click", "routerLink"], ["aria-label", "Historique commandes", 1, "nav-link", "py-3", "px-0", "px-lg-3", "rounded", 3, "click", "routerLink"], ["class", "nav-item mx-0 mx-lg-1", 4, "ngIf"], ["alt", "User avatar", "loading", "lazy", 1, "user-avatar", 3, "src"]],
      template: function NavigationComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "nav", 1)(1, "div", 2)(2, "div", 3)(3, "a", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](4, "img", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "div", 6)(7, "select", 7, 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("change", function NavigationComponent_Template_select_change_7_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
            const selectedLang_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](8);
            return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx.switchLang(selectedLang_r2.value));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrepeaterCreate"](9, NavigationComponent_For_10_Template, 2, 3, "option", 8, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrepeaterTrackByIdentity"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](11, "button", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](12, " Menu ");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](13, "i", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](14, "div", 11)(15, "ul", 12)(16, "li", 13)(17, "a", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function NavigationComponent_Template_a_click_17_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx.closeMenu());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](18, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](19, "PORTFOLIO");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](20, "li", 13)(21, "a", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function NavigationComponent_Template_a_click_21_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx.closeMenu());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](22, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](23);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](24, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](25, "li", 13)(26, "a", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function NavigationComponent_Template_a_click_26_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx.closeMenu());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](27, "span", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](28, "CONTACT");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵconditionalCreate"](29, NavigationComponent_Conditional_29_Template, 10, 4, "li", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](30, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵconditionalBranchCreate"](31, NavigationComponent_Conditional_31_Template, 7, 5, "li", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵconditionalCreate"](32, NavigationComponent_Conditional_32_Template, 4, 2, "li", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](33, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](34, "li", 13)(35, "a", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function NavigationComponent_Template_a_click_35_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx.closeMenu());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](36, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](37, "shopping_cart");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](38, "span", 19);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](39);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](40, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](41, NavigationComponent_ng_container_41_Template, 2, 1, "ng-container", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](42, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](43, "div", 21);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          let tmp_4_0;
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", ctx.appTitle, " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrepeater"](ctx.translate.getLangs());
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](14);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](24, 7, "ABOUT"));
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵconditional"]((tmp_4_0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](30, 9, ctx.user$)) ? 29 : 31, tmp_4_0);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵconditional"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](33, 11, ctx.user$) ? 32 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction0"](17, _c0));
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](40, 13, ctx.nbSelectedItems$), " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](42, 15, ctx.user$));
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["ɵNgSelectMultipleOption"], _angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterLink, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIcon, _angular_common__WEBPACK_IMPORTED_MODULE_12__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslatePipe],
      styles: [".nbItems[_ngcontent-%COMP%] {\n  margin-left: 10px;\n  color: greenyellow;\n}\n\n#mainNav[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   li.nav-item[_ngcontent-%COMP%]   a.nav-link[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  vertical-align: top;\n  font-weight: 500;\n}\n\n#mainNav[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   li.nav-item[_ngcontent-%COMP%]   a.nav-link[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n\n.form-control[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: calc(1em + 1rem);\n  padding: 0.2rem 0.5rem;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #495057;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 0.125rem solid #ced4da;\n  border-radius: 0.5rem;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n\n.navbar-brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n\n.navbar-brand[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  margin-right: 0.5rem;\n}\n\n.nav-lang-select[_ngcontent-%COMP%] {\n  height: 32px;\n  line-height: 32px;\n  padding: 0 0.5rem;\n  min-width: 115px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtBQUNGOztBQU1BO0VBQ0UsbUJBQUE7RUFDQSxnQkFBQTtBQUhGOztBQU1BO0VBQ0UsbUJBQUE7QUFIRjs7QUFNQTtFQUNFLGNBQUE7RUFDQSxXQUFBO0VBQ0Esd0JBQUE7RUFDQSxzQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLHNCQUFBO0VBQ0EsNEJBQUE7RUFDQSw4QkFBQTtFQUNBLHFCQUFBO0VBQ0Esd0VBQUE7QUFIRjs7QUFNQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtBQUhGOztBQU1BO0VBQ0Usb0JBQUE7QUFIRjs7QUFNQTtFQUNFLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7QUFIRiIsInNvdXJjZXNDb250ZW50IjpbIi5uYkl0ZW1zIHtcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gIGNvbG9yOiBncmVlbnllbGxvdztcbn1cblxuYS5uYXYtbGluayBzcGFuIHtcbiAgLy9kaXNwbGF5OiBibG9jaztcbn1cblxuI21haW5OYXYgLm5hdmJhci1uYXYgbGkubmF2LWl0ZW0gYS5uYXYtbGluayBzcGFuIHtcbiAgdmVydGljYWwtYWxpZ246IHRvcDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cblxuI21haW5OYXYgLm5hdmJhci1uYXYgbGkubmF2LWl0ZW0gYS5uYXYtbGluayB7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5cbi5mb3JtLWNvbnRyb2wge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogY2FsYygxZW0gKyAxcmVtKTtcbiAgcGFkZGluZzogMC4ycmVtIDAuNXJlbTtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBmb250LXdlaWdodDogNDAwO1xuICBsaW5lLWhlaWdodDogMS41O1xuICBjb2xvcjogIzQ5NTA1NztcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jbGlwOiBwYWRkaW5nLWJveDtcbiAgYm9yZGVyOiAwLjEyNXJlbSBzb2xpZCAjY2VkNGRhO1xuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjE1cyBlYXNlLWluLW91dCwgYm94LXNoYWRvdyAwLjE1cyBlYXNlLWluLW91dDtcbn1cblxuLm5hdmJhci1icmFuZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5uYXZiYXItYnJhbmQgaW1nIHtcbiAgbWFyZ2luLXJpZ2h0OiAwLjVyZW07XG59XG5cbi5uYXYtbGFuZy1zZWxlY3Qge1xuICBoZWlnaHQ6IDMycHg7XG4gIGxpbmUtaGVpZ2h0OiAzMnB4O1xuICBwYWRkaW5nOiAwIDAuNXJlbTtcbiAgbWluLXdpZHRoOiAxMTVweDtcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ },

/***/ 76204
/*!***************************************************************************!*\
  !*** ./src/app/features/shopping-cart/cart-items/cart-items.component.ts ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CartItemsComponent: () => (/* binding */ CartItemsComponent)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ 46227);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ 81383);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 43942);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 2510);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 19999);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 95429);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 52575);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 91817);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _app_features_store__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @app/features/store */ 85730);
/* harmony import */ var _shared_interfaces__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @shared/interfaces */ 40787);
/* harmony import */ var _angular_fire_functions__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/fire/functions */ 55559);
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! firebase/compat/app */ 3602);
/* harmony import */ var firebase_compat_auth__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! firebase/compat/auth */ 12043);
/* harmony import */ var firebase_compat_database__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! firebase/compat/database */ 36994);
/* harmony import */ var _app_auth_store__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @app/auth/store */ 83575);
/* harmony import */ var _shared_components_alert_alert_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @shared/components/alert/alert.component */ 44605);
/* harmony import */ var _helpers_compare_objects_utils__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @helpers/compare.objects.utils */ 84566);
/* harmony import */ var _helpers_constants__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @helpers/constants */ 4245);
/* harmony import */ var _shared_components_snack_alert_snack_alert_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @shared/components/snack-alert/snack-alert.component */ 22785);
/* harmony import */ var _app_auth_store_auth_selectors__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @app/auth/store/auth.selectors */ 2981);
/* harmony import */ var _env_environment__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @env/environment */ 45312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/dialog */ 12587);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/snack-bar */ 3347);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _shared_services_pricing_service__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @shared/services/pricing.service */ 45212);
/* harmony import */ var _shared_services_stock_service__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @shared/services/stock.service */ 81676);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/common */ 79748);
/* harmony import */ var _shared_components_category_buttons_category_buttons_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../../../shared/components/category-buttons/category-buttons.component */ 28379);
/* harmony import */ var _shared_components_currency_selector_currency_selector_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../../../shared/components/currency-selector/currency-selector.component */ 29477);






























function CartItemsComponent_app_category_buttons_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "app-category-buttons", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵlistener"]("navigateAway", function CartItemsComponent_app_category_buttons_8_Template_app_category_buttons_navigateAway_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r1.gotoTarget($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const categoryInfos_r3 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("categoryToAvoid", "")("categoryInfos", categoryInfos_r3);
  }
}
function CartItemsComponent_Conditional_16_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](1, "\u00A0article");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
}
function CartItemsComponent_Conditional_16_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](1, "\u00A0articles");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
}
function CartItemsComponent_Conditional_16_For_14_span_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "span", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](1, "\u00C9puis\u00E9");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
}
function CartItemsComponent_Conditional_16_For_14_For_38_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "option", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const s_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("value", s_r6.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](s_r6.label);
  }
}
function CartItemsComponent_Conditional_16_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "div", 59)(1, "div", 61)(2, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵlistener"]("click", function CartItemsComponent_Conditional_16_For_14_Template_div_click_2_listener() {
      let tmp_13_0;
      const itemGroup_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r4).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r1.openLightbox((tmp_13_0 = itemGroup_r5.get("path")) == null ? null : tmp_13_0.value));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](3, "img", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](4, "div", 64)(5, "span", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](6, "\uD83D\uDD0D");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](7, "div", 66)(8, "div")(9, "div", 67)(10, "div")(11, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](13, CartItemsComponent_Conditional_16_For_14_span_13_Template, 2, 0, "span", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](14, "p", 69)(15, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](19, "p", 70)(20, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](22, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](23, "\u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](24, "select", 71)(25, "option", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](27, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](28, "p", 69)(29, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](30);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](31, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](32, "\u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](33, "select", 73)(34, "option", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](35);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](36, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵrepeaterCreate"](37, CartItemsComponent_Conditional_16_For_14_For_38_Template, 2, 2, "option", 75, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵrepeaterTrackByIdentity"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](39, "div")(40, "div", 76)(41, "button", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵlistener"]("click", function CartItemsComponent_Conditional_16_For_14_Template_button_click_41_listener() {
      const ɵ$index_56_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r4).$index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r1.stepDown(ɵ$index_56_r7));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](42, "input", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](43, "button", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵlistener"]("click", function CartItemsComponent_Conditional_16_For_14_Template_button_click_43_listener() {
      const ɵ$index_56_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r4).$index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r1.stepUp(ɵ$index_56_r7));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](44, "div", 80)(45, "div")(46, "a", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵlistener"]("click", function CartItemsComponent_Conditional_16_For_14_Template_a_click_46_listener() {
      const itemGroup_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r4).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r1.onToogleSelect(itemGroup_r5.value));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](47, "i", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](48);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](49, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](50, "p", 3)(51, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](52);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](53, "hr", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    let tmp_13_0;
    let tmp_14_0;
    let tmp_15_0;
    let tmp_16_0;
    let tmp_18_0;
    const itemGroup_r5 = ctx.$implicit;
    const ɵ$index_56_r7 = ctx.$index;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("formGroupName", ɵ$index_56_r7);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵinterpolate"]((tmp_13_0 = itemGroup_r5.get("path")) == null ? null : tmp_13_0.value), _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵsanitizeUrl"])("alt", _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵinterpolate"]((tmp_14_0 = itemGroup_r5.get("reference")) == null ? null : tmp_14_0.value));
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"](" ", (tmp_15_0 = itemGroup_r5.get("reference")) == null ? null : tmp_15_0.value, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", ctx_r1.isItemOutOfStock((tmp_16_0 = itemGroup_r5.get("reference")) == null ? null : tmp_16_0.value));
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](17, 24, "PRODUCTS.CATEGORY"), ":");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"]("\u00A0 ", (tmp_18_0 = itemGroup_r5.get("category")) == null ? null : tmp_18_0.value, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](22, 26, "PRODUCTS.MODEL"), ":");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("id", _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵinterpolate1"]("model", ɵ$index_56_r7))("name", _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵinterpolate1"]("model", ɵ$index_56_r7));
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("value", "MODEL_UNIQUE");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](27, 28, "PRODUCTS.UNIQUE_MODEL"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](31, 30, "PRODUCTS.SIZES"), ":");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("id", _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵinterpolate1"]("size", ɵ$index_56_r7))("name", _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵinterpolate1"]("size", ɵ$index_56_r7));
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](36, 32, "CHOOSE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵrepeater"](ctx_r1.sizes);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](49, 34, "PRODUCTS.REMOVE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](ctx_r1.getItemTotal(ɵ$index_56_r7));
  }
}
function CartItemsComponent_Conditional_16_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "p", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](1, "i", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](3, 1, "DO_NOT_HESITATE"), " ");
  }
}
function CartItemsComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "div", 9)(1, "h5", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](6, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵconditionalCreate"](7, CartItemsComponent_Conditional_16_Conditional_7_Template, 2, 0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](8, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵconditionalCreate"](9, CartItemsComponent_Conditional_16_Conditional_9_Template, 2, 0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](10, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](11, ") ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementContainerStart"](12, 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵrepeaterCreate"](13, CartItemsComponent_Conditional_16_For_14_Template, 54, 36, "div", 59, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵrepeaterTrackByIdentity"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵconditionalCreate"](15, CartItemsComponent_Conditional_16_Conditional_15_Template, 4, 3, "p", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("formGroup", ctx_r1.basketFormGroup);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](3, 6, "PRODUCTS.CART"), " (");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](6, 8, ctx_r1.nbSelectedItems$));
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵconditional"]((_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](8, 10, ctx_r1.nbSelectedItems$) ?? 0) === 1 ? 7 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵconditional"]((_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](10, 12, ctx_r1.nbSelectedItems$) ?? 0) > 1 ? 9 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵrepeater"](ctx_r1.basketItemsArray["controls"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵconditional"](ctx_r1.basketItemsArray["controls"].length == 0 ? 15 : -1);
  }
}
function CartItemsComponent_Conditional_33_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "div", 87)(1, "label", 90)(2, "input", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayListener"]("ngModelChange", function CartItemsComponent_Conditional_33_Conditional_14_Template_input_ngModelChange_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r9);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayBindingSet"](ctx_r1.courierAgreementChecked, $event) || (ctx_r1.courierAgreementChecked = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](4, "Je m'engage \u00E0 payer la somme r\u00E9clam\u00E9e par le livreur \u00E0 la r\u00E9ception de ma commande (entre 2 000 et 5 000 FCFA).");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.courierAgreementChecked);
  }
}
function CartItemsComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "div", 19)(1, "label", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵlistener"]("click", function CartItemsComponent_Conditional_33_Template_label_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
      ctx_r1.pickupSubMode = "courier";
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r1.courierAgreementChecked = false);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](2, "input", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](3, "div", 15)(4, "p", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](5, "\uD83D\uDEF5 Livraison \u00E0 domicile par coursier");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](6, "p", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](7, " Le vendeur vous envoie votre commande via un livreur ind\u00E9pendant. Vous payez directement le livreur \u00E0 la r\u00E9ception (entre ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](8, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](9, "2 000");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](10, " et ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](11, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](12, "5 000 FCFA");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](13, "). Cette somme ne transite pas par le site. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵconditionalCreate"](14, CartItemsComponent_Conditional_33_Conditional_14_Template, 5, 1, "div", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](15, "label", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵlistener"]("click", function CartItemsComponent_Conditional_33_Template_label_click_15_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r1.pickupSubMode = "store");
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](16, "input", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](17, "div", 15)(18, "p", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](19, "\uD83C\uDFEA R\u00E9cup\u00E9ration au magasin");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](20, "p", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](21, " Venez r\u00E9cup\u00E9rer votre commande directement \u00E0 notre boutique \u00E0 Libreville. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵclassProp"]("selected", ctx_r1.pickupSubMode === "courier");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("checked", ctx_r1.pickupSubMode === "courier");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵconditional"](ctx_r1.pickupSubMode === "courier" ? 14 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵclassProp"]("selected", ctx_r1.pickupSubMode === "store");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("checked", ctx_r1.pickupSubMode === "store");
  }
}
function CartItemsComponent_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "div", 23)(1, "p", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](2, "i", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](3, "Adresse de livraison ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](4, "div", 94)(5, "div", 95)(6, "label", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](7, "Pr\u00E9nom ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](8, "span", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](9, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](10, "input", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayListener"]("ngModelChange", function CartItemsComponent_Conditional_55_Template_input_ngModelChange_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r10);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayBindingSet"](ctx_r1.shippingAddress.firstName, $event) || (ctx_r1.shippingAddress.firstName = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](11, "div", 95)(12, "label", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](13, "Nom ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](14, "span", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](15, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](16, "input", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayListener"]("ngModelChange", function CartItemsComponent_Conditional_55_Template_input_ngModelChange_16_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r10);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayBindingSet"](ctx_r1.shippingAddress.lastName, $event) || (ctx_r1.shippingAddress.lastName = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](17, "div", 95)(18, "label", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](19, "Adresse ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](20, "span", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](21, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](22, "input", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayListener"]("ngModelChange", function CartItemsComponent_Conditional_55_Template_input_ngModelChange_22_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r10);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayBindingSet"](ctx_r1.shippingAddress.address1, $event) || (ctx_r1.shippingAddress.address1 = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](23, "div", 95)(24, "label", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](25, "Compl\u00E9ment d'adresse");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](26, "input", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayListener"]("ngModelChange", function CartItemsComponent_Conditional_55_Template_input_ngModelChange_26_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r10);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayBindingSet"](ctx_r1.shippingAddress.address2, $event) || (ctx_r1.shippingAddress.address2 = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](27, "div", 94)(28, "div", 102)(29, "label", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](30, "Code postal ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](31, "span", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](32, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](33, "input", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayListener"]("ngModelChange", function CartItemsComponent_Conditional_55_Template_input_ngModelChange_33_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r10);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayBindingSet"](ctx_r1.shippingAddress.postalCode, $event) || (ctx_r1.shippingAddress.postalCode = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](34, "div", 95)(35, "label", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](36, "Ville ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](37, "span", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](38, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](39, "input", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayListener"]("ngModelChange", function CartItemsComponent_Conditional_55_Template_input_ngModelChange_39_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r10);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayBindingSet"](ctx_r1.shippingAddress.city, $event) || (ctx_r1.shippingAddress.city = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](40, "div", 95)(41, "label", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](42, "Pays ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](43, "span", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](44, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](45, "input", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayListener"]("ngModelChange", function CartItemsComponent_Conditional_55_Template_input_ngModelChange_45_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r10);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayBindingSet"](ctx_r1.shippingAddress.country, $event) || (ctx_r1.shippingAddress.country = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](46, "div", 95)(47, "label", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](48, "T\u00E9l\u00E9phone ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](49, "span", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](50, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](51, "input", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayListener"]("ngModelChange", function CartItemsComponent_Conditional_55_Template_input_ngModelChange_51_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r10);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayBindingSet"](ctx_r1.shippingAddress.phone, $event) || (ctx_r1.shippingAddress.phone = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](52, "p", 107)(53, "span", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](54, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](55, " Champs obligatoires");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.shippingAddress.firstName);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.shippingAddress.lastName);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.shippingAddress.address1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.shippingAddress.address2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.shippingAddress.postalCode);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.shippingAddress.city);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.shippingAddress.country);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.shippingAddress.phone);
  }
}
function CartItemsComponent_Conditional_112_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](1, "\u00A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](2, "h5", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](3, "Article");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
  }
}
function CartItemsComponent_Conditional_114_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](1, "\u00A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](2, "h5", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](3, "Articles");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
  }
}
function CartItemsComponent_For_120_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "li", 37)(1, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    let tmp_11_0;
    let tmp_12_0;
    const itemGroup_r11 = ctx.$implicit;
    const ɵ$index_462_r12 = ctx.$index;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"]((tmp_11_0 = itemGroup_r11.get("reference")) == null ? null : tmp_11_0.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"](" \u00D7 ", (tmp_12_0 = itemGroup_r11.get("quantity")) == null ? null : tmp_12_0.value, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](ctx_r1.getItemTotal(ɵ$index_462_r12));
  }
}
function CartItemsComponent_span_124_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "span", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](1, "\uD83D\uDEF5 Pay\u00E9 au livreur");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
}
function CartItemsComponent_span_125_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "span", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](1, "\uD83C\uDFEA Au magasin");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
}
function CartItemsComponent_span_126_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](2, 1, "PRODUCTS.GRATIS"));
  }
}
function CartItemsComponent_span_127_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](2, 1, "PRODUCTS.GRATIS"));
  }
}
function CartItemsComponent_span_128_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](ctx_r1.pricing.format(ctx_r1.shippingCostEur));
  }
}
function CartItemsComponent_span_129_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "span", 110);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](2, 1, "SHIPPING_PENDING"), " ");
  }
}
function CartItemsComponent_li_130_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "li", 111)(1, "small", 112);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](2, "i", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](3, " Les frais de port seront communiqu\u00E9s d\u00E8s que votre commande sera pr\u00EAte. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
  }
}
function CartItemsComponent_Conditional_131_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "li", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](1, " TVA (10%) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](ctx_r1.cartTva);
  }
}
function CartItemsComponent_p_149_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "p", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](1, " Un ou plusieurs articles sont \u00E9puis\u00E9s. Retirez-les pour pouvoir envoyer la commande. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
}
function CartItemsComponent_p_150_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "p", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](1, "i", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](2, "Veuillez choisir un mode de livraison pour continuer. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
}
function CartItemsComponent_p_152_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "p", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](1, "i", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](2, "Veuillez choisir entre livraison par coursier ou r\u00E9cup\u00E9ration au magasin. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
}
function CartItemsComponent_p_153_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "p", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](1, "i", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](2, "Veuillez cocher la case d'engagement avant de valider. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
}
function CartItemsComponent_p_154_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "p", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](1, " Remplissez tous les champs obligatoires de l'adresse de livraison. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
}
function CartItemsComponent_div_155_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "div", 118)(1, "div", 119)(2, "div")(3, "span", 120);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](5, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](6, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](7, "span", 120);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](9, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](10, "span", 121);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const orderStatus_r13 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"]("#", _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind3"](5, 5, orderStatus_r13.id, 0, 8));
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind2"](9, 9, orderStatus_r13.createdAt, "dd/MM/yyyy \u00E0 HH:mm"));
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵstyleProp"]("background-color", ctx_r1.statusColors[orderStatus_r13.status] || "#7f8c8d");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"](" ", ctx_r1.statusLabels[orderStatus_r13.status] || orderStatus_r13.status, " ");
  }
}
function CartItemsComponent_div_155_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "div", 10)(1, "div", 11)(2, "h6", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](5, CartItemsComponent_div_155_div_5_Template, 12, 12, "div", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](4, 2, "MY_ORDERS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngForOf", ctx_r1.orderStatuses);
  }
}
function CartItemsComponent_div_167_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "div", 122);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵlistener"]("click", function CartItemsComponent_div_167_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r14);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r1.closeLightbox());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](1, "img", 123);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵlistener"]("click", function CartItemsComponent_div_167_Template_img_click_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r14);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](2, "button", 124);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵlistener"]("click", function CartItemsComponent_div_167_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r14);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r1.closeLightbox());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](3, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("src", ctx_r1.lightboxSrc, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵsanitizeUrl"]);
  }
}
class CartItemsComponent {
  get activeOrder() {
    return this.orderStatuses.length > 0 ? this.orderStatuses[0] : null;
  }
  get hasOutOfStockItems() {
    // Si l'utilisateur met à jour une commande existante, le stock a déjà été
    // décrémenté par lui lors de sa commande initiale : ne pas le bloquer.
    if (this.activeOrder) return false;
    return this.items.some(item => (this.stockByRef[item.reference] ?? 1) <= 0);
  }
  isItemOutOfStock(reference) {
    // Même logique : pas "épuisé" pour le propriétaire de la commande active
    if (this.activeOrder) return false;
    return (this.stockByRef[reference] ?? 1) <= 0;
  }
  get isShippingAddressValid() {
    const a = this.shippingAddress;
    return !!(a.firstName.trim() && a.lastName.trim() && a.address1.trim() && a.postalCode.trim() && a.city.trim() && a.country.trim() && a.phone.trim());
  }
  get isBasketUnchanged() {
    if (!this.activeOrder || !this.firebaseBasketSnapshot.length) return false;
    if (this.firebaseBasketSnapshot.length !== this.items.length) return false;
    return this.basketItemsArray.controls.every((group, i) => {
      const ref = this.items[i]?.reference;
      const snap = this.firebaseBasketSnapshot.find(s => s.reference === ref);
      if (!snap) return false;
      return snap.qty === (Number(group.get('quantity')?.value) || 1) && snap.size === group.get('size')?.value && snap.model === group.get('model')?.value;
    });
  }
  get canSend() {
    if (this.activeOrder && this.isBasketUnchanged) return false;
    if (this.deliveryMode === 'shipping') return this.isShippingAddressValid;
    if (this.deliveryMode === 'pickup') {
      if (this.pickupSubMode === 'courier') return this.courierAgreementChecked;
      return this.pickupSubMode === 'store';
    }
    return false;
  }
  constructor(store, fb, fun, dialog, snackBar, translateService, pricing, stockService, appConfig) {
    this.store = store;
    this.fb = fb;
    this.fun = fun;
    this.dialog = dialog;
    this.snackBar = snackBar;
    this.translateService = translateService;
    this.pricing = pricing;
    this.stockService = stockService;
    this.sizes = _shared_interfaces__WEBPACK_IMPORTED_MODULE_12__.ITEM_SIZES;
    this.items = [];
    this.commendAllreadySent = false;
    this.deliveryMode = null;
    this.pickupSubMode = null;
    this.courierAgreementChecked = false;
    this.shippingAddress = {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      postalCode: '',
      city: '',
      country: '',
      phone: ''
    };
    this.orderStatuses = [];
    this.stockByRef = {};
    this.lightboxSrc = null;
    this.statusLabels = {
      pending: 'En attente',
      ready: 'Prête — consultez votre email',
      paid: 'Payée',
      shipped: 'Expédiée'
    };
    this.statusColors = {
      pending: '#e67e22',
      ready: '#148f77',
      paid: '#2c3e50',
      shipped: '#6c3483'
    };
    this.subs = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subscription();
    this.formSubs = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subscription();
    this.firebaseBasketSnapshot = [];
    this.snapshotOrderId = null;
    this.snackDuration = appConfig.snackDuration;
  }
  ngOnInit() {
    this.nbSelectedItems$ = this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.select)(_app_features_store__WEBPACK_IMPORTED_MODULE_11__.selectNbChosenItems));
    this.categoryInfos$ = this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.select)(_app_features_store__WEBPACK_IMPORTED_MODULE_11__.selectExistingCategory));
    // Écoute le stock en temps réel via StockService (singleton partagé)
    this.subs.add(this.stockService.stockByRef$.subscribe(map => {
      this.stockByRef = map;
    }));
    // Form init
    this.basketFormGroup = this.fb.group({
      basketItems: this.fb.array([])
    });
    // Items store -> form
    // distinctUntilChanged avec comparaison profonde : évite de reconstruire le form
    // si Firebase basket renvoie un contenu identique à l'état courant.
    this.subs.add(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.select)(_app_features_store__WEBPACK_IMPORTED_MODULE_11__.selectChosenItems), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.distinctUntilChanged)((a, b) => JSON.stringify(a) === JSON.stringify(b))).subscribe(items => {
      if (items) {
        const sameStructure = this.items.length === items.length && this.items.every((item, i) => item.reference === items[i].reference);
        this.items = items;
        if (!sameStructure) {
          this.initFormArray(items);
        }
      }
    }));
    // Connexion user (store) + authState (firebase)
    const authState$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Observable(subscriber => {
      const unsubscribe = firebase_compat_app__WEBPACK_IMPORTED_MODULE_14__["default"].auth().onAuthStateChanged(u => subscriber.next(u), err => subscriber.error(err));
      return {
        unsubscribe
      };
    });
    this.subs.add((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.combineLatest)([this.store.select(_app_auth_store_auth_selectors__WEBPACK_IMPORTED_MODULE_22__.selectorConnectedUser), authState$]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.filter)(([oldUser, newUser]) => !!oldUser && !!newUser), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.map)(([oldUser, newUser]) => [oldUser, newUser]), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.distinctUntilChanged)(([aOld, aNew], [bOld, bNew]) => {
      return aOld?.additionalInfos?.uid === bOld?.additionalInfos?.uid && aNew?.uid === bNew?.uid;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.map)(([oldUser, newUser]) => {
      if (!newUser?.uid) return;
      // Écoute en temps réel le statut des commandes de l'utilisateur
      if (this.orderStatusRef) this.orderStatusRef.off();
      this.orderStatusRef = firebase_compat_app__WEBPACK_IMPORTED_MODULE_14__["default"].database().ref(`users/${newUser.uid}/orderStatus`);
      this.orderStatusRef.on('value', snap => {
        // Détecter la suppression d'un order actif AVANT le return anticipé :
        // si snap est vide et qu'on avait des orders actifs, ils ont été supprimés.
        const raw = snap.exists() ? snap.val() : {};
        const prevActiveIds = this.orderStatuses.map(o => o.id);
        const wasDeleted = prevActiveIds.some(id => !raw[id]);
        if (wasDeleted) {
          localStorage.removeItem('delice-basket');
          localStorage.setItem('basketCleared', '1');
          this.store.dispatch(new _app_features_store__WEBPACK_IMPORTED_MODULE_11__.ActionClearBasket());
          this.commendAllreadySent = false;
        }
        if (!snap.exists()) {
          this.orderStatuses = [];
          return;
        }
        this.orderStatuses = Object.entries(raw).map(([id, data]) => ({
          id,
          status: data.status ?? 'pending',
          createdAt: data.createdAt ?? 0,
          deliveryMode: data.deliveryMode,
          pickupSubMode: data.pickupSubMode,
          shippingAddress: data.shippingAddress,
          shippingCost: typeof data.shippingCost === 'number' ? data.shippingCost : undefined
        })).filter(o => o.status !== 'shipped' && o.status !== 'cancelled').sort((a, b) => b.createdAt - a.createdAt);
        // Pré-remplir le mode de livraison depuis la commande active (si pas encore choisi)
        const active = this.orderStatuses[0];
        if (!this.deliveryMode && active) {
          // Fallback 'pickup' si le champ n'existe pas (anciennes commandes)
          this.deliveryMode = active.deliveryMode || 'pickup';
          if (active.deliveryMode === 'pickup' && active.pickupSubMode) {
            this.pickupSubMode = active.pickupSubMode;
            if (active.pickupSubMode === 'courier') this.courierAgreementChecked = true;
          }
          if (active.deliveryMode === 'shipping' && active.shippingAddress) {
            this.shippingAddress = {
              ...active.shippingAddress
            };
          }
        }
        // Capturer le snapshot depuis les items DE LA COMMANDE (orderStatus),
        // pas depuis le panier — le panier peut déjà contenir de nouveaux articles
        // non encore commandés, ce qui fausserait isBasketUnchanged.
        if (active && active.id !== this.snapshotOrderId) {
          this.snapshotOrderId = active.id;
          const orderItems = raw[active.id]?.items;
          const itemsArray = Array.isArray(orderItems) ? orderItems : orderItems && typeof orderItems === 'object' ? Object.values(orderItems) : [];
          this.firebaseBasketSnapshot = itemsArray.map(item => ({
            reference: item.reference,
            qty: Math.max(1, item.basketInfos?.selectedQuantity ?? 1),
            size: item.basketInfos?.selectedSize ?? 'M',
            model: item.basketInfos?.selectedModel ?? 'MODEL_UNIQUE'
          }));
        }
      });
      if (newUser.uid && oldUser?.additionalInfos?.uid && newUser.uid !== oldUser.additionalInfos.uid && oldUser?.isAnonymous && oldUser?.credential) {
        firebase_compat_app__WEBPACK_IMPORTED_MODULE_14__["default"].auth().currentUser?.linkWithCredential(oldUser.credential).then(userCred => console.log('[linkWithCredential]', userCred)).catch(e => console.error('[linkWithCredential]', e));
      }
    })).subscribe());
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
    this.formSubs.unsubscribe();
    this.detachCommendsListener();
    if (this.orderStatusRef) {
      this.orderStatusRef.off();
      this.orderStatusRef = undefined;
    }
  }
  detachCommendsListener() {
    if (this.commendsRef) {
      this.commendsRef.off();
      this.commendsRef = undefined;
    }
  }
  getExistingItemsFromSnapShot(snap) {
    let savedItems = undefined;
    const val = snap.val();
    if (val) {
      // val peut être { pushId: items } -> on prend le 1er
      savedItems = Object.values(val)[0];
      if (savedItems && !(savedItems instanceof Array)) {
        savedItems = [savedItems];
      }
    }
    return savedItems;
  }
  get basketItemsArray() {
    return this.basketFormGroup.get('basketItems');
  }
  initFormArray(items) {
    this.formSubs.unsubscribe();
    this.formSubs = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subscription();
    this.basketFormGroup.setControl('basketItems', this.fb.array([]));
    const basketItems = this.basketItemsArray;
    items.forEach(item => basketItems.push(this.initBasketItemGroup(item)));
  }
  initBasketItemGroup(itemInfos) {
    const group = this.fb.group({
      size: [itemInfos.basketInfos?.selectedSize ?? _app_features_store__WEBPACK_IMPORTED_MODULE_11__.ItemSizeEnum.M, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required],
      quantity: [itemInfos.basketInfos?.selectedQuantity ?? 1, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.min(1)]],
      model: [itemInfos.basketInfos?.selectedModel ?? '', _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required],
      path: [itemInfos.path, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required],
      selected: [itemInfos.selected, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required],
      reference: [itemInfos.reference, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required],
      index: [itemInfos.index, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required],
      category: [itemInfos.category, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required]
    });
    this.formSubs.add(group.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.debounceTime)(200), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.distinctUntilChanged)((a, b) => JSON.stringify(a) === JSON.stringify(b))).subscribe(() => {
      const updated = {
        ...group.getRawValue(),
        basketInfos: {
          selectedQuantity: group.get('quantity')?.value,
          selectedSize: group.get('size')?.value,
          selectedModel: group.get('model')?.value
        }
      };
      delete updated.size;
      delete updated.quantity;
      delete updated.model;
      this.store.dispatch(new _app_features_store__WEBPACK_IMPORTED_MODULE_11__.ActionUpdateBasketItem(updated));
    }));
    return group;
  }
  onToogleSelect(item) {
    this.store.dispatch(new _app_features_store__WEBPACK_IMPORTED_MODULE_11__.ActionItemToogleSelect(item));
  }
  stepDown(index) {
    const value = Number(this.getItemQuantity(index).value);
    this.getItemQuantity(index).patchValue(Math.max(1, value - 1));
  }
  stepUp(index) {
    const itemRef = this.items[index]?.reference;
    this.stockService.fetchAvailable(itemRef).subscribe(available => {
      const currentQty = Number(this.getItemQuantity(index).value) || 0;
      if (available > currentQty) {
        this.getItemQuantity(index).patchValue(currentQty + 1);
      } else {
        this.snackBar.openFromComponent(_shared_components_snack_alert_snack_alert_component__WEBPACK_IMPORTED_MODULE_21__.SnackAlertComponent, {
          duration: 3000,
          data: {
            message: 'Stock insuffisant — quantité maximale atteinte.',
            type: 'error'
          },
          politeness: 'assertive'
        });
      }
    });
  }
  getItemQuantity(index) {
    return this.basketItemsArray.controls[index].get('quantity');
  }
  selectDeliveryMode(mode) {
    if (this.deliveryMode !== mode) {
      this.pickupSubMode = null;
      this.courierAgreementChecked = false;
    }
    this.deliveryMode = mode;
    if (mode !== 'shipping') return;
    // Pré-remplir seulement si le formulaire est encore vierge
    const a = this.shippingAddress;
    if (a.firstName || a.lastName || a.phone) return;
    const user = firebase_compat_app__WEBPACK_IMPORTED_MODULE_14__["default"].auth().currentUser;
    if (!user) return;
    const displayName = user.displayName?.trim() ?? '';
    const spaceIdx = displayName.indexOf(' ');
    if (spaceIdx > 0) {
      a.firstName = displayName.slice(0, spaceIdx);
      a.lastName = displayName.slice(spaceIdx + 1);
    } else {
      a.firstName = displayName;
    }
    if (user.phoneNumber) {
      a.phone = user.phoneNumber;
    }
  }
  getItemTotal(index) {
    const item = this.items[index];
    const price = this.pricing.getEffectiveEur(item.reference, item.price ?? 0);
    const qty = Number(this.getItemQuantity(index)?.value) || 1;
    return this.pricing.format(price * qty);
  }
  get rawTotalHT() {
    return this.items.reduce((sum, item, i) => {
      const price = this.pricing.getEffectiveEur(item.reference, item.price ?? 0);
      const qty = Number(this.getItemQuantity(i)?.value) || 1;
      return sum + price * qty;
    }, 0);
  }
  /** Frais de port stockés en XAF, convertis en EUR pour pricing.format(). */
  get shippingCostEur() {
    if (this.deliveryMode !== 'shipping') return null;
    const costXAF = this.activeOrder?.shippingCost;
    if (typeof costXAF !== 'number') return null;
    return costXAF / this.pricing.eurToXaf;
  }
  get cartTva() {
    return this.pricing.format(this.rawTotalHT * this.pricing.tvaRate);
  }
  get cartTotal() {
    // Sommer les montants affichés par item (après arrondi) pour éviter les
    // écarts d'arrondi entre somme_format(items) et format(somme_items).
    const itemsDisplay = this.items.reduce((sum, item, i) => {
      const price = this.pricing.getEffectiveEur(item.reference, item.price ?? 0);
      const qty = Number(this.getItemQuantity(i)?.value) || 1;
      return sum + this.pricing.formatRaw(price * qty);
    }, 0);
    const tvaDisplay = this.pricing.formatRaw(this.rawTotalHT * this.pricing.tvaRate);
    const shippingDisplay = this.pricing.formatRaw(this.shippingCostEur ?? 0);
    return this.pricing.formatAmount(itemsDisplay + tvaDisplay + shippingDisplay);
  }
  sendCommand() {
    const currentUser = firebase_compat_app__WEBPACK_IMPORTED_MODULE_14__["default"].auth().currentUser;
    if (currentUser?.uid) {
      const commendsPath = `users/${currentUser.uid}/commends`;
      const ref = firebase_compat_app__WEBPACK_IMPORTED_MODULE_14__["default"].database().ref(commendsPath);
      // ✅ Lecture unique : évite d'empiler des listeners à chaque clic
      ref.once('value').then(snap => {
        if (this.commendAllreadySent) return;
        // Lire les quantités directement depuis le formulaire pour éviter le délai du debounce :
        // si l'utilisateur vient de modifier une quantité et clique immédiatement sur Envoyer,
        // this.items peut encore avoir l'ancienne valeur (ActionUpdateBasketItem pas encore dispatché).
        const itemsToSend = this.basketItemsArray.controls.map((group, i) => ({
          ...this.items[i],
          price: this.pricing.getEffectiveEur(this.items[i].reference, this.items[i].price ?? 0),
          basketInfos: {
            selectedQuantity: Number(group.get('quantity')?.value) || 1,
            selectedSize: group.get('size')?.value,
            selectedModel: group.get('model')?.value
          }
        }));
        if (!itemsToSend || itemsToSend.length < 1) {
          this.alertCommandNotSent(this.translateService.instant('COMMAND_ALREADY_EXIST'));
          return;
        }
        if (!this.deliveryMode) {
          this.alertCommandNotSent('Veuillez choisir un mode de livraison avant d\'envoyer votre commande.');
          return;
        }
        const existingOrderId = this.activeOrder?.id ?? null;
        // Vérification "déjà envoyé" seulement pour une nouvelle commande
        if (!existingOrderId) {
          const existingCommands = this.getExistingItemsFromSnapShot(snap);
          if (existingCommands && (0,_helpers_compare_objects_utils__WEBPACK_IMPORTED_MODULE_19__.compareObjects)(existingCommands, itemsToSend)) {
            this.alertCommandNotSent(this.translateService.instant('COMMAND_ALREADY_EXIST'));
            return;
          }
        }
        this.commendAllreadySent = true;
        const orderKey = existingOrderId ?? firebase_compat_app__WEBPACK_IMPORTED_MODULE_14__["default"].database().ref().push().key;
        const payload = {};
        payload[orderKey] = itemsToSend;
        return ref.set(payload).then(() => {
          if (!currentUser.isAnonymous) {
            const shippingAddress = this.deliveryMode === 'shipping' ? {
              ...this.shippingAddress
            } : null;
            const pickupSubModeValue = this.deliveryMode === 'pickup' ? this.pickupSubMode ?? null : null;
            if (existingOrderId) {
              // Mise à jour de la commande existante (status inchangé)
              firebase_compat_app__WEBPACK_IMPORTED_MODULE_14__["default"].database().ref(`orders/${existingOrderId}`).update({
                items: itemsToSend,
                deliveryMode: this.deliveryMode,
                pickupSubMode: pickupSubModeValue,
                updatedAt: Date.now(),
                shippingAddress: shippingAddress ?? null
              }).catch(e => console.error('[orders] update error', e));
              firebase_compat_app__WEBPACK_IMPORTED_MODULE_14__["default"].database().ref(`users/${currentUser.uid}/orderStatus/${existingOrderId}`).update({
                items: itemsToSend,
                deliveryMode: this.deliveryMode,
                pickupSubMode: pickupSubModeValue,
                shippingAddress: shippingAddress ?? null
              }).catch(e => console.error('[orderStatus] update error', e));
              // Permet une nouvelle mise à jour ultérieure
              this.commendAllreadySent = false;
            } else {
              // Nouvelle commande
              const orderCreatedAt = Date.now();
              firebase_compat_app__WEBPACK_IMPORTED_MODULE_14__["default"].database().ref(`orders/${orderKey}`).set({
                status: 'pending',
                uid: currentUser.uid,
                createdAt: orderCreatedAt,
                customerEmail: currentUser.email ?? '',
                customerName: currentUser.displayName ?? currentUser.email ?? '',
                items: itemsToSend,
                deliveryMode: this.deliveryMode,
                ...(pickupSubModeValue ? {
                  pickupSubMode: pickupSubModeValue
                } : {}),
                ...(shippingAddress ? {
                  shippingAddress
                } : {})
              }).catch(e => console.error('[orders] double-write error', e));
              firebase_compat_app__WEBPACK_IMPORTED_MODULE_14__["default"].database().ref(`users/${currentUser.uid}/orderStatus/${orderKey}`).set({
                status: 'pending',
                createdAt: orderCreatedAt,
                items: itemsToSend,
                deliveryMode: this.deliveryMode,
                ...(pickupSubModeValue ? {
                  pickupSubMode: pickupSubModeValue
                } : {}),
                ...(shippingAddress ? {
                  shippingAddress
                } : {})
              }).catch(e => console.error('[orderStatus] write error', e));
            }
            // Mise à jour du stock pour chaque article (transaction atomique)
            // Pour une modification de commande : delta = newQty - oldQty
            // Pour une nouvelle commande : delta = newQty (décrémentation complète)
            const oldItemsMap = {};
            if (existingOrderId) {
              const snapVal = snap.val();
              const rawOldItems = snapVal?.[existingOrderId];
              // Firebase peut retourner un tableau ou un objet ({ "0": item, "1": item })
              const oldItems = Array.isArray(rawOldItems) ? rawOldItems : rawOldItems && typeof rawOldItems === 'object' ? Object.values(rawOldItems) : [];
              oldItems.forEach(old => {
                if (old?.reference) {
                  oldItemsMap[old.reference] = old.basketInfos?.selectedQuantity ?? 1;
                }
              });
            }
            // Articles toujours présents : appliquer le delta newQty - oldQty
            itemsToSend.forEach(item => {
              const newQty = item.basketInfos?.selectedQuantity ?? 1;
              const oldQty = oldItemsMap[item.reference] ?? 0;
              const delta = newQty - oldQty;
              if (delta === 0) return;
              const knownAvailable = this.stockByRef[item.reference] ?? 0;
              firebase_compat_app__WEBPACK_IMPORTED_MODULE_14__["default"].database().ref(`stock/${item.reference}`).transaction(current => {
                if (current === null) return {
                  available: Math.max(0, knownAvailable - delta)
                };
                return {
                  ...current,
                  available: Math.max(0, (current.available ?? knownAvailable) - delta)
                };
              }).catch(e => console.error('[stock delta]', e));
            });
            // Articles supprimés de la commande : libérer intégralement leur stock
            Object.entries(oldItemsMap).forEach(([reference, oldQty]) => {
              if (itemsToSend.some(item => item.reference === reference)) return;
              const knownAvailable = this.stockByRef[reference] ?? 0;
              firebase_compat_app__WEBPACK_IMPORTED_MODULE_14__["default"].database().ref(`stock/${reference}`).transaction(current => {
                if (current === null) return {
                  available: knownAvailable + oldQty
                };
                return {
                  ...current,
                  available: (current.available ?? knownAvailable) + oldQty
                };
              }).catch(e => console.error('[stock release]', e));
            });
            if (!existingOrderId) {
              this.sendCommendNotificationMails(currentUser, false, orderKey);
            }
            // Mettre à jour le snapshot pour refléter le nouvel état Firebase
            this.firebaseBasketSnapshot = this.basketItemsArray.controls.map((group, i) => ({
              reference: this.items[i]?.reference,
              qty: Number(group.get('quantity')?.value) || 1,
              size: group.get('size')?.value,
              model: group.get('model')?.value
            }));
            this.snackBar.openFromComponent(_shared_components_snack_alert_snack_alert_component__WEBPACK_IMPORTED_MODULE_21__.SnackAlertComponent, {
              duration: this.snackDuration,
              data: {
                message: 'COMMAND_SENT_MSG',
                type: 'success'
              },
              politeness: 'polite'
            });
          } else {
            this.alertCommandNotSent(this.translateService.instant('AUTHENTICATION_REQUIRED'));
          }
        });
      }).catch(e => {
        console.error(e);
        this.commendAllreadySent = false;
      });
    } else {
      firebase_compat_app__WEBPACK_IMPORTED_MODULE_14__["default"].auth().signInAnonymously().then(userCred => {
        if (userCred?.user) {
          this.sendCommand();
        } else {
          this.store.dispatch(new _app_auth_store__WEBPACK_IMPORTED_MODULE_17__.Go({
            path: ['/auth/signin']
          }));
        }
      }).catch(e => console.error(e));
    }
  }
  alertCommandNotSent(message) {
    let dialogRef = this.dialog.open(_shared_components_alert_alert_component__WEBPACK_IMPORTED_MODULE_18__.AlertComponent, {
      panelClass: 'signin-dialog',
      disableClose: false,
      minWidth: 300,
      autoFocus: true,
      data: {
        disableClose: false,
        title: this.translateService.instant('COMMAND_NOT_SENT'),
        message
      }
    });
    this.subs.add(dialogRef.afterClosed().subscribe(() => {
      dialogRef = undefined;
    }));
  }
  sendCommendNotificationMails(user, isUpdate = false, orderId) {
    const protocol = window.location.protocol;
    let prefix = protocol + '//' + window.location.host;
    if (prefix.indexOf('github') > 0) {
      prefix = prefix + '/' + _env_environment__WEBPACK_IMPORTED_MODULE_23__.environment.appId;
    }
    const currency = this.pricing.currency;
    const currencySymbol = currency === 'XAF' ? 'FCFA' : '€';
    const tvaRate = this.pricing.tvaRate;
    const hasTva = tvaRate > 0;
    const emailData = lodash__WEBPACK_IMPORTED_MODULE_0___default().cloneDeep(this.basketItemsArray.controls).map((group, i) => {
      const item = lodash__WEBPACK_IMPORTED_MODULE_0___default().cloneDeep(this.items[i]);
      const qty = Number(group.get('quantity')?.value) || 1;
      // Si l'URL est déjà absolue (Firebase Storage), l'utiliser directement
      if (item.path.startsWith('http')) {
        item.path = item.path.replace('cover.webp', 'cover.jpeg');
      } else {
        item.path = prefix + '/' + item.path.replace(/cover\.webp$/, 'cover.jpeg');
      }
      item.basketInfos = {
        selectedQuantity: qty,
        selectedSize: group.get('size')?.value,
        selectedModel: group.get('model')?.value
      };
      delete item.loading;
      delete item.selected;
      delete item.index;
      item.unitPriceFormatted = this.pricing.format(item.price ?? 0);
      item.linePriceFormatted = this.pricing.format((item.price ?? 0) * qty);
      return item;
    });
    // Calcul des totaux dans la devise d'affichage (formatRaw convertit EUR→XAF si besoin)
    const rawTotalHT = emailData.reduce((sum, item) => sum + this.pricing.formatRaw(item.price ?? 0) * (item.basketInfos?.selectedQuantity ?? 1), 0);
    const rawTva = hasTva ? Math.round(rawTotalHT * tvaRate) : 0;
    const rawTotalTTC = rawTotalHT + rawTva;
    const deliveryModeLabel = this.deliveryMode === 'pickup' ? this.pickupSubMode === 'courier' ? 'Payé à réception au livreur (2 000–5 000 FCFA)' : this.pickupSubMode === 'store' ? 'Récupération au magasin — Libreville' : 'Retrait en magasin — Libreville' : this.deliveryMode === 'shipping' ? 'Expédition internationale' : '';
    const sa = this.shippingAddress;
    const shippingAddressFormatted = this.deliveryMode === 'shipping' ? [`${sa.firstName} ${sa.lastName}`, sa.address1, sa.address2 ? sa.address2 : null, `${sa.postalCode} ${sa.city}`, sa.country, `Tél : ${sa.phone}`].filter(Boolean).join('\n') : '';
    const data = {
      shoppingCardLink: prefix + '/#/shopping-cart',
      uid: user.uid,
      orderId,
      subject: isUpdate ? `[MODIFICATION] ${this.translateService.instant('NEW_ORDER_TITLE')}` : this.translateService.instant('NEW_ORDER_TITLE'),
      items: emailData,
      displayName: user.displayName,
      currency,
      currencySymbol,
      hasTva,
      totalHT: rawTotalHT,
      tva: rawTva,
      totalTTC: rawTotalTTC,
      deliveryMode: this.deliveryMode,
      deliveryModeLabel,
      shippingAddress: this.deliveryMode === 'shipping' ? {
        ...this.shippingAddress
      } : null,
      shippingAddressFormatted
    };
    console.log('Sending email with data', data);
    const callable = (0,_angular_fire_functions__WEBPACK_IMPORTED_MODULE_13__.httpsCallable)(this.fun, 'genericBrevoEmail');
    (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.from)(callable(data)).subscribe({
      next: result => console.log(result),
      error: error => console.log(error)
    });
  }
  openLightbox(src) {
    this.lightboxSrc = src;
  }
  closeLightbox() {
    this.lightboxSrc = null;
  }
  gotoTarget(name) {
    this.store.dispatch(new _app_auth_store__WEBPACK_IMPORTED_MODULE_17__.Go({
      path: ['/' + name]
    }));
  }
  reload() {
    window.location.reload();
  }
  static {
    this.ɵfac = function CartItemsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CartItemsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__.UntypedFormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵdirectiveInject"](_angular_fire_functions__WEBPACK_IMPORTED_MODULE_13__.Functions), _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_26__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_27__.MatSnackBar), _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_28__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵdirectiveInject"](_shared_services_pricing_service__WEBPACK_IMPORTED_MODULE_29__.PricingService), _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵdirectiveInject"](_shared_services_stock_service__WEBPACK_IMPORTED_MODULE_30__.StockService), _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵdirectiveInject"](_helpers_constants__WEBPACK_IMPORTED_MODULE_20__.APP_CONFIG));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵdefineComponent"]({
      type: CartItemsComponent,
      selectors: [["app-cart-items"]],
      inputs: {
        categoryInfos$: "categoryInfos$"
      },
      standalone: false,
      decls: 168,
      vars: 80,
      consts: [[1, "jumbotron", "color-grey-light", "mt-50"], [1, "d-flex", "align-items-center", "h-100"], [1, "container", "text-center"], [1, "mb-0"], [3, "categoryToAvoid", "categoryInfos", "navigateAway", 4, "ngIf"], [1, "container"], [1, "row"], [1, "col-lg-8"], [1, "card", "wish-list", "mb-4"], [1, "card-body", 3, "formGroup"], [1, "card", "mb-4"], [1, "card-body"], [1, "mb-4"], [1, "delivery-option", 3, "click"], ["type", "radio", "name", "deliveryMode", "value", "pickup", 1, "delivery-radio", 3, "checked"], [1, "delivery-content"], [1, "payment-block-title"], [1, "fas", "fa-store", "mr-2"], [1, "payment-block-detail"], [1, "pickup-sub-options", "mt-3"], [1, "delivery-option", "mt-2", 3, "click"], ["type", "radio", "name", "deliveryMode", "value", "shipping", 1, "delivery-radio", 3, "checked"], [1, "fas", "fa-shipping-fast", "mr-2"], [1, "shipping-address-form", "mt-3"], [1, "mb-3", "redInfos", "text-center"], [1, "payment-block", "mb-3"], [1, "fas", "fa-mobile-alt", "mr-2"], ["href", "https://www.airtel.ga/airtelmoney/Offers", "target", "_blank", "rel", "noopener"], ["href", "https://www.moov-africa.ga/particulier/mobile/Moov-Money/services/Pages/Transfert.aspx", "target", "_blank", "rel", "noopener"], [1, "payment-block"], [1, "fas", "fa-globe", "mr-2"], ["href", "https://www.remitly.com/fr/fr/gabon", "target", "_blank", "rel", "noopener"], ["href", "https://www.westernunion.com/fr/fr/home.html", "target", "_blank", "rel", "noopener"], [1, "mt-3", "mb-0", "text-center", "small", "text-muted"], [1, "col-lg-4"], [1, "mb-3"], [1, "list-group", "list-group-flush"], [1, "list-group-item", "d-flex", "justify-content-between", "align-items-center", "border-0", "px-0", "pb-0"], [1, "list-group-item", "d-flex", "justify-content-between", "align-items-center", "px-0"], ["class", "text-right", "style", "font-size:12px; color:#5d4037; font-weight:500;", 4, "ngIf"], ["class", "text-right", "style", "font-size:12px; color:#148f77; font-weight:500;", 4, "ngIf"], [4, "ngIf"], ["class", "shipping-pending-text", 4, "ngIf"], ["class", "list-group-item border-0 px-0 pb-0", 4, "ngIf"], [1, "list-group-item", "d-flex", "justify-content-between", "align-items-center", "border-0", "px-0", "mb-3"], ["type", "button", 1, "btn", "btn-primary", "btn-block", "waves-effect", "waves-light", 3, "click", "disabled"], ["class", "small text-danger text-center mt-2", 4, "ngIf"], ["class", "small text-center mt-2", "style", "color: #e67e22; font-weight: 500;", 4, "ngIf"], ["class", "small text-muted text-center mt-2", 4, "ngIf"], ["class", "card mb-4", 4, "ngIf"], ["data-toggle", "collapse", "href", "#collapseExample", "aria-expanded", "false", "aria-controls", "collapseExample", 1, "dark-grey-text", "d-flex", "justify-content-between"], [1, "fas", "fa-chevron-down", "pt-1"], ["id", "collapseExample", 1, "collapse"], [1, "mt-3"], [1, "md-form", "md-outline", "mb-0"], ["type", "text", "id", "discount-code", "placeholder", "Enter discount code", 1, "form-control", "font-weight-light"], ["class", "cart-lightbox-overlay", 3, "click", 4, "ngIf"], [3, "navigateAway", "categoryToAvoid", "categoryInfos"], ["formArrayName", "basketItems"], [1, "row", "mb-4", 3, "formGroupName"], [1, "text-primary", "mb-0"], [1, "col-md-5", "col-lg-3", "col-xl-3"], [1, "view", "zoom", "overlay", "z-depth-1", "rounded", "mb-3", "mb-md-0", "cart-img-wrapper", 2, "cursor", "zoom-in", 3, "click"], [1, "img-fluid", "w-100", 3, "src", "alt"], [1, "mask", "rgba-black-slight", "cart-img-overlay"], [1, "cart-img-zoom-icon"], [1, "col-md-7", "col-lg-9", "col-xl-9"], [1, "d-flex", "justify-content-between"], ["class", "badge-out-of-stock", 4, "ngIf"], [1, "mb-3", "text-muted", "text-uppercase", "small"], [1, "mb-2", "text-muted", "text-uppercase", "small"], ["formControlName", "model", 1, "form-control", 3, "id", "name"], ["selected", "", 3, "value"], ["formControlName", "size", "tabindex", "2", 1, "form-control", 3, "id", "name"], ["disabled", "", "selected", "", "value", ""], [3, "value"], [1, "def-number-input", "number-input", "safari_only", "mb-0"], ["type", "button", 1, "minus", 3, "click"], ["name", "quantity", "value", "1", "type", "number", "formControlName", "quantity", 1, "quantity"], ["type", "button", 1, "plus", 3, "click"], [1, "d-flex", "justify-content-between", "align-items-center"], ["type", "button", 1, "card-link-secondary", "small", "text-uppercase", "btn", "btn-light", 3, "click"], [1, "fas", "fa-trash-alt", "mr-1"], [1, "badge-out-of-stock"], [1, "fas", "fa-info-circle", "mr-1"], [1, "delivery-sub-option", 3, "click"], ["type", "radio", "name", "pickupSubMode", "value", "courier", 1, "delivery-radio", 3, "checked"], [1, "courier-agreement"], [1, "delivery-sub-option", "mt-2", 3, "click"], ["type", "radio", "name", "pickupSubMode", "value", "store", 1, "delivery-radio", 3, "checked"], [1, "courier-checkbox-label"], ["type", "checkbox", 1, "courier-checkbox", 3, "ngModelChange", "ngModel"], [1, "shipping-address-title"], [1, "fas", "fa-map-marker-alt", "mr-2"], [1, "addr-row"], [1, "addr-field"], [1, "addr-label"], [1, "required"], ["type", "text", "placeholder", "Pr\u00E9nom", "autocomplete", "given-name", 1, "addr-input", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "Nom de famille", "autocomplete", "family-name", 1, "addr-input", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "Num\u00E9ro et nom de rue", "autocomplete", "address-line1", 1, "addr-input", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "Appartement, b\u00E2timent, etc. (optionnel)", "autocomplete", "address-line2", 1, "addr-input", 3, "ngModelChange", "ngModel"], [1, "addr-field", "addr-field--short"], ["type", "text", "placeholder", "75001", "autocomplete", "postal-code", 1, "addr-input", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "Paris", "autocomplete", "address-level2", 1, "addr-input", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "France", "autocomplete", "country-name", 1, "addr-input", 3, "ngModelChange", "ngModel"], ["type", "tel", "placeholder", "+33 6 12 34 56 78", "autocomplete", "tel", 1, "addr-input", 3, "ngModelChange", "ngModel"], [1, "addr-required-note"], [1, "text-right", 2, "font-size", "12px", "color", "#5d4037", "font-weight", "500"], [1, "text-right", 2, "font-size", "12px", "color", "#148f77", "font-weight", "500"], [1, "shipping-pending-text"], [1, "list-group-item", "border-0", "px-0", "pb-0"], [1, "text-muted"], [1, "small", "text-danger", "text-center", "mt-2"], [1, "small", "text-center", "mt-2", 2, "color", "#e67e22", "font-weight", "500"], [1, "fas", "fa-exclamation-circle", "mr-1"], [1, "small", "text-muted", "text-center", "mt-2"], ["class", "order-status-row", 4, "ngFor", "ngForOf"], [1, "order-status-row"], [1, "d-flex", "justify-content-between", "align-items-center", "py-2", "border-bottom"], [1, "small", "text-muted"], [1, "order-status-badge"], [1, "cart-lightbox-overlay", 3, "click"], [1, "cart-lightbox-img", 3, "click", "src"], [1, "cart-lightbox-close", 3, "click"]],
      template: function CartItemsComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "div")(1, "header")(2, "div", 0)(3, "div", 1)(4, "div", 2)(5, "h3", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](7, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](8, CartItemsComponent_app_category_buttons_8_Template, 1, 2, "app-category-buttons", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](9, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](10, "main")(11, "div", 5)(12, "section")(13, "div", 6)(14, "div", 7)(15, "div", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵconditionalCreate"](16, CartItemsComponent_Conditional_16_Template, 16, 14, "div", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](17, "div", 10)(18, "div", 11)(19, "h5", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](20);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](21, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](22, "div", 3)(23, "label", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵlistener"]("click", function CartItemsComponent_Template_label_click_23_listener() {
            return ctx.selectDeliveryMode("pickup");
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](24, "input", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](25, "div", 15)(26, "p", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](27, "i", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](28);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](29, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](30, "p", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](31);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](32, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵconditionalCreate"](33, CartItemsComponent_Conditional_33_Template, 22, 7, "div", 19);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](34, "label", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵlistener"]("click", function CartItemsComponent_Template_label_click_34_listener() {
            return ctx.selectDeliveryMode("shipping");
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](35, "input", 21);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](36, "div", 15)(37, "p", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](38, "i", 22);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](39);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](40, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](41, "p", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](42, " Votre commande sera exp\u00E9di\u00E9e ");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](43, "strong");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](44, "d\u00E8s r\u00E9ception de votre paiement");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](45, " via ");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](46, "strong");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](47, "DHL");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](48, ", ");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](49, "strong");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](50, "FedEx");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](51, " ou un autre transporteur. Vous recevrez un email avec le ");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](52, "strong");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](53, "lien de suivi");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](54, " d\u00E8s l'exp\u00E9dition. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵconditionalCreate"](55, CartItemsComponent_Conditional_55_Template, 56, 8, "div", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](56, "div", 10)(57, "div", 11)(58, "p", 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](59);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](60, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](61, "div", 25)(62, "p", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](63, "i", 26);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](64, "Au Gabon \u2014 Mobile Money");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](65, "p", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](66, " R\u00E9glez via ");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](67, "a", 27);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](68, "Airtel Money");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](69, " ou ");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](70, "a", 28);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](71, "Moov Money");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](72, " au num\u00E9ro ");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](73, "strong");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](74, "+241 77 60 10 44");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](75, ".");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](76, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](77, " Indiquez votre nom en r\u00E9f\u00E9rence du transfert. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](78, "div", 29)(79, "p", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](80, "i", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](81, "Depuis l'\u00E9tranger (ex : France)");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](82, "p", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](83, " Via ");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](84, "a", 31)(85, "strong");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](86, "Remitly");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](87, " en envoyant directement vers le num\u00E9ro ");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](88, "strong");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](89, "Airtel Money +241 77 60 10 44");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](90, " \u2014 rapide et sans d\u00E9placement.");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](91, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](92, " Ou via ");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](93, "a", 32)(94, "strong");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](95, "Western Union");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](96, " en ligne, sans d\u00E9placement, au nom du b\u00E9n\u00E9ficiaire communiqu\u00E9 par email.");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](97, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](98, " Les frais de transfert sont \u00E0 la charge de l'acheteur. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](99, "p", 33);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](100, " Envoyez votre commande \u2014 nous vous confirmons les d\u00E9tails de paiement par email. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](101, "hr", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](102, "div", 34)(103, "div", 10)(104, "div", 11)(105, "h5", 35);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](106);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](107, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](108, "div", 35);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](109, "app-currency-selector");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](110, "ul", 36)(111, "li", 37);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵconditionalCreate"](112, CartItemsComponent_Conditional_112_Template, 4, 0, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](113, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵconditionalCreate"](114, CartItemsComponent_Conditional_114_Template, 4, 0, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](115, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](116, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](117);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](118, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵrepeaterCreate"](119, CartItemsComponent_For_120_Template, 6, 3, "li", 37, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵrepeaterTrackByIdentity"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](121, "li", 38);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](122);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](123, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](124, CartItemsComponent_span_124_Template, 2, 0, "span", 39)(125, CartItemsComponent_span_125_Template, 2, 0, "span", 40)(126, CartItemsComponent_span_126_Template, 3, 3, "span", 41)(127, CartItemsComponent_span_127_Template, 3, 3, "span", 41)(128, CartItemsComponent_span_128_Template, 2, 1, "span", 41)(129, CartItemsComponent_span_129_Template, 3, 3, "span", 42);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](130, CartItemsComponent_li_130_Template, 4, 0, "li", 43);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵconditionalCreate"](131, CartItemsComponent_Conditional_131_Template, 4, 1, "li", 38);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](132, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](133, "li", 44)(134, "div")(135, "strong");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](136);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](137, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](138, "strong")(139, "p", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](140);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](141, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](142, "span")(143, "strong");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](144);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](145, "button", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](146, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵlistener"]("click", function CartItemsComponent_Template_button_click_145_listener() {
            return ctx.sendCommand();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](147);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](148, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](149, CartItemsComponent_p_149_Template, 2, 0, "p", 46)(150, CartItemsComponent_p_150_Template, 3, 0, "p", 47);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](151, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](152, CartItemsComponent_p_152_Template, 3, 0, "p", 47)(153, CartItemsComponent_p_153_Template, 3, 0, "p", 47)(154, CartItemsComponent_p_154_Template, 2, 0, "p", 48);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](155, CartItemsComponent_div_155_Template, 6, 4, "div", 49);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](156, "div", 10)(157, "div", 11)(158, "a", 50);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](159);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipe"](160, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](161, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](162, "i", 51);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](163, "div", 52)(164, "div", 53)(165, "div", 54);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](166, "input", 55);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()()()()()()()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](167, CartItemsComponent_div_167_Template, 4, 1, "div", 56);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](7, 42, "PRODUCTS.BASKET"));
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](9, 44, ctx.categoryInfos$));
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵconditional"](ctx.basketFormGroup ? 16 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](21, 46, "PRODUCTS.DELIVERY_TIME"));
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵclassProp"]("selected", ctx.deliveryMode === "pickup");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("checked", ctx.deliveryMode === "pickup");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](29, 48, "PRODUCTS.DELIVERY_PICKUP"));
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](32, 50, "PRODUCTS.HOW_TO_GET_DELIVERED_FROM_LBV"));
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵconditional"](ctx.deliveryMode === "pickup" ? 33 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵclassProp"]("selected", ctx.deliveryMode === "shipping");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("checked", ctx.deliveryMode === "shipping");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](40, 52, "PRODUCTS.DELIVERY_SHIPPING"));
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](16);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵconditional"](ctx.deliveryMode === "shipping" ? 55 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](60, 54, "PRODUCTS.PAYMENTS_MEANS"));
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](47);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](107, 56, "PRODUCTS.SUMMARY"));
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵconditional"]((_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](113, 58, ctx.nbSelectedItems$) ?? 0) <= 1 ? 112 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵconditional"]((_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](115, 60, ctx.nbSelectedItems$) ?? 0) > 1 ? 114 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](118, 62, "PRODUCTS.AMOUNT_WITHOUT_VAT"));
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵrepeater"](ctx.basketItemsArray["controls"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](123, 64, "PRODUCTS.SHIPPING"), " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", ctx.deliveryMode === "pickup" && ctx.pickupSubMode === "courier");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", ctx.deliveryMode === "pickup" && ctx.pickupSubMode === "store");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", ctx.deliveryMode === "pickup" && !ctx.pickupSubMode);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", !ctx.deliveryMode);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", ctx.deliveryMode === "shipping" && ctx.shippingCostEur !== null);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", ctx.deliveryMode === "shipping" && ctx.shippingCostEur === null);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", ctx.deliveryMode === "shipping" && ctx.shippingCostEur === null);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵconditional"](_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](132, 66, ctx.pricing.currency$) !== "XAF" ? 131 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](137, 68, "PRODUCTS.TOTAL_WITH_VAT"));
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](141, 70, "PRODUCTS.WITH_VAT"));
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](ctx.cartTotal);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("disabled", (_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](146, 72, ctx.nbSelectedItems$) ?? 0) < 1 || ctx.commendAllreadySent || !ctx.canSend);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"](" ", ctx.activeOrder ? "Modifier la commande" : _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](148, 74, "PRODUCTS.SEND_COMMAND"), " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", ctx.hasOutOfStockItems);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", (_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](151, 76, ctx.nbSelectedItems$) ?? 0) >= 1 && !ctx.deliveryMode && !ctx.hasOutOfStockItems);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", ctx.deliveryMode === "pickup" && !ctx.pickupSubMode);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", ctx.deliveryMode === "pickup" && ctx.pickupSubMode === "courier" && !ctx.courierAgreementChecked);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", ctx.deliveryMode === "shipping" && !ctx.isShippingAddressValid);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", ctx.orderStatuses.length > 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpipeBind1"](160, 78, "PRODUCTS.DISCOUNT_CODE"), " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", ctx.lightboxSrc);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_31__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_31__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupName, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormArrayName, _shared_components_category_buttons_category_buttons_component__WEBPACK_IMPORTED_MODULE_32__.CategoryButtonsComponent, _shared_components_currency_selector_currency_selector_component__WEBPACK_IMPORTED_MODULE_33__.CurrencySelectorComponent, _angular_common__WEBPACK_IMPORTED_MODULE_31__.AsyncPipe, _angular_common__WEBPACK_IMPORTED_MODULE_31__.SlicePipe, _angular_common__WEBPACK_IMPORTED_MODULE_31__.DatePipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_28__.TranslatePipe],
      styles: [".badge-out-of-stock[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px 8px;\n  border-radius: 10px;\n  background-color: #e74c3c;\n  color: #fff;\n  font-size: 11px;\n  font-weight: 700;\n  vertical-align: middle;\n  margin-left: 6px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.redInfos[_ngcontent-%COMP%] {\n  color: red;\n  font-weight: bold;\n}\n\n.shipping-pending-text[_ngcontent-%COMP%] {\n  color: #e67e22;\n  font-style: italic;\n  font-size: 0.85rem;\n}\n\n.order-status-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 4px 10px;\n  border-radius: 12px;\n  color: #fff;\n  font-size: 12px;\n  font-weight: 600;\n  white-space: nowrap;\n}\n\n.delivery-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  background-color: #f8f9fa;\n  border: 2px solid #dee2e6;\n  border-radius: 6px;\n  padding: 12px 16px;\n  cursor: pointer;\n  transition: border-color 0.15s, background-color 0.15s;\n  width: 100%;\n  margin-bottom: 0;\n}\n.delivery-option.selected[_ngcontent-%COMP%] {\n  border-color: #148f77;\n  background-color: #f0faf7;\n}\n.delivery-option[_ngcontent-%COMP%]:hover:not(.selected) {\n  border-color: #adb5bd;\n}\n\n.shipping-address-form[_ngcontent-%COMP%] {\n  background: #f8fffe;\n  border: 1px solid #b2dfdb;\n  border-radius: 6px;\n  padding: 16px;\n}\n\n.shipping-address-title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #148f77;\n  font-size: 14px;\n  margin-bottom: 14px;\n}\n\n.addr-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n@media (max-width: 480px) {\n  .addr-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0;\n  }\n}\n\n.addr-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  margin-bottom: 10px;\n}\n.addr-field--short[_ngcontent-%COMP%] {\n  flex: 0 0 120px;\n}\n\n.addr-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #2c3e50;\n  margin-bottom: 4px;\n}\n.addr-label[_ngcontent-%COMP%]   .required[_ngcontent-%COMP%] {\n  color: #e74c3c;\n}\n\n.addr-input[_ngcontent-%COMP%] {\n  padding: 8px 10px;\n  border: 1px solid #ced4da;\n  border-radius: 4px;\n  font-size: 14px;\n  font-family: inherit;\n  outline: none;\n  transition: border-color 0.15s;\n}\n.addr-input[_ngcontent-%COMP%]:focus {\n  border-color: #148f77;\n}\n\n.addr-required-note[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #7f8c8d;\n  margin: 4px 0 0;\n}\n.addr-required-note[_ngcontent-%COMP%]   .required[_ngcontent-%COMP%] {\n  color: #e74c3c;\n}\n\n.required[_ngcontent-%COMP%] {\n  color: #e74c3c;\n}\n\n.delivery-radio[_ngcontent-%COMP%] {\n  margin-top: 3px;\n  flex-shrink: 0;\n  accent-color: #148f77;\n  width: 16px;\n  height: 16px;\n  cursor: pointer;\n}\n\n.delivery-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.payment-block[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border-left: 3px solid #148f77;\n  padding: 12px 16px;\n  border-radius: 0 4px 4px 0;\n  margin-bottom: 10px;\n}\n\n.payment-block-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2c3e50;\n  margin-bottom: 4px;\n  font-size: 14px;\n}\n\n.payment-block-detail[_ngcontent-%COMP%] {\n  color: #555;\n  font-size: 13px;\n  margin-bottom: 0;\n  line-height: 1.5;\n}\n\n.greenInfos[_ngcontent-%COMP%] {\n  color: #1266f1;\n  font-weight: bold;\n}\n\n.signin-dialog[_ngcontent-%COMP%] {\n  z-index: 1500;\n}\n\n.social-container[_ngcontent-%COMP%] {\n  height: 5px;\n}\n\nh3[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: black;\n}\n\n.pickup-sub-options[_ngcontent-%COMP%] {\n  background: #f0faf7;\n  border: 1px solid #b2dfdb;\n  border-radius: 6px;\n  padding: 14px;\n}\n\n.delivery-sub-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  background-color: #fff;\n  border: 2px solid #dee2e6;\n  border-radius: 6px;\n  padding: 10px 14px;\n  cursor: pointer;\n  transition: border-color 0.15s, background-color 0.15s;\n  width: 100%;\n  margin-bottom: 0;\n}\n.delivery-sub-option.selected[_ngcontent-%COMP%] {\n  border-color: #148f77;\n  background-color: #f0faf7;\n}\n.delivery-sub-option[_ngcontent-%COMP%]:hover:not(.selected) {\n  border-color: #adb5bd;\n}\n\n.courier-agreement[_ngcontent-%COMP%] {\n  background: #fff8e1;\n  border: 1px solid #ffe082;\n  border-radius: 6px;\n  padding: 10px 14px;\n  margin: 8px 0;\n}\n\n.courier-checkbox-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  cursor: pointer;\n  font-size: 13px;\n  color: #5d4037;\n  margin-bottom: 0;\n  font-weight: 500;\n  line-height: 1.5;\n}\n\n.courier-checkbox[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  margin-top: 2px;\n  width: 16px;\n  height: 16px;\n  accent-color: #e67e22;\n  cursor: pointer;\n}\n\n.cart-img-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n}\n.cart-img-wrapper[_ngcontent-%COMP%]   .cart-img-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  opacity: 0;\n  transition: opacity 0.2s ease;\n  background: rgba(0, 0, 0, 0.3);\n  border-radius: inherit;\n}\n.cart-img-wrapper[_ngcontent-%COMP%]:hover   .cart-img-overlay[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.cart-img-wrapper[_ngcontent-%COMP%]   .cart-img-zoom-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  color: #fff;\n  line-height: 1;\n}\n\n.cart-lightbox-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.85);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n  cursor: zoom-out;\n}\n\n.cart-lightbox-img[_ngcontent-%COMP%] {\n  max-width: 90vw;\n  max-height: 90vh;\n  object-fit: contain;\n  border-radius: 4px;\n  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.6);\n  cursor: default;\n}\n\n.cart-lightbox-close[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 16px;\n  right: 20px;\n  background: none;\n  border: none;\n  color: #fff;\n  font-size: 2rem;\n  cursor: pointer;\n  line-height: 1;\n  opacity: 0.8;\n}\n.cart-lightbox-close[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvc2hvcHBpbmctY2FydC9jYXJ0LWl0ZW1zL2NhcnQtaXRlbXMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxxQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSx5QkFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtBQUNGOztBQUVBO0VBQ0UsVUFBQTtFQUNBLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtBQUNGOztBQUVBO0VBQ0UscUJBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxTQUFBO0VBQ0EseUJBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0Esc0RBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7QUFDRjtBQUNFO0VBQ0UscUJBQUE7RUFDQSx5QkFBQTtBQUNKO0FBRUU7RUFDRSxxQkFBQTtBQUFKOztBQUlBO0VBQ0UsbUJBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtBQURGOztBQUlBO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0FBREY7O0FBSUE7RUFDRSxhQUFBO0VBQ0EsU0FBQTtBQURGO0FBR0U7RUFKRjtJQUk4QixzQkFBQTtJQUF3QixNQUFBO0VBRXBEO0FBQ0Y7O0FBQUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxPQUFBO0VBQ0EsbUJBQUE7QUFHRjtBQURFO0VBQVcsZUFBQTtBQUliOztBQURBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0FBSUY7QUFGRTtFQUFZLGNBQUE7QUFLZDs7QUFGQTtFQUNFLGlCQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxvQkFBQTtFQUNBLGFBQUE7RUFDQSw4QkFBQTtBQUtGO0FBSEU7RUFBVSxxQkFBQTtBQU1aOztBQUhBO0VBQ0UsZUFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0FBTUY7QUFKRTtFQUFZLGNBQUE7QUFPZDs7QUFKQTtFQUFZLGNBQUE7QUFRWjs7QUFOQTtFQUNFLGVBQUE7RUFDQSxjQUFBO0VBQ0EscUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7QUFTRjs7QUFOQTtFQUNFLE9BQUE7QUFTRjs7QUFOQTtFQUNFLHlCQUFBO0VBQ0EsOEJBQUE7RUFDQSxrQkFBQTtFQUNBLDBCQUFBO0VBQ0EsbUJBQUE7QUFTRjs7QUFOQTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtBQVNGOztBQU5BO0VBQ0UsV0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FBU0Y7O0FBTkE7RUFDRSxjQUFBO0VBQ0EsaUJBQUE7QUFTRjs7QUFMQTtFQUNFLGFBQUE7QUFRRjs7QUFMQTtFQUNFLFdBQUE7QUFRRjs7QUFMQTtFQUNFLFlBQUE7QUFRRjs7QUFEQTtFQUNFLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7QUFJRjs7QUFEQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLFNBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxzREFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtBQUlGO0FBRkU7RUFDRSxxQkFBQTtFQUNBLHlCQUFBO0FBSUo7QUFERTtFQUNFLHFCQUFBO0FBR0o7O0FBQ0E7RUFDRSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7QUFFRjs7QUFDQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLFNBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUFFRjs7QUFDQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxxQkFBQTtFQUNBLGVBQUE7QUFFRjs7QUFHQTtFQUNFLGtCQUFBO0FBQUY7QUFFRTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLDZCQUFBO0VBQ0EsOEJBQUE7RUFDQSxzQkFBQTtBQUFKO0FBR0U7RUFDRSxVQUFBO0FBREo7QUFJRTtFQUNFLGVBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtBQUZKOztBQU1BO0VBQ0UsZUFBQTtFQUNBLFFBQUE7RUFDQSwrQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0FBSEY7O0FBTUE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUNBQUE7RUFDQSxlQUFBO0FBSEY7O0FBTUE7RUFDRSxlQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0VBQ0EsWUFBQTtBQUhGO0FBS0U7RUFBVSxVQUFBO0FBRloiLCJzb3VyY2VzQ29udGVudCI6WyIuYmFkZ2Utb3V0LW9mLXN0b2NrIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwYWRkaW5nOiAycHggOHB4O1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTc0YzNjO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBmb250LXdlaWdodDogNzAwO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBtYXJnaW4tbGVmdDogNnB4O1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBsZXR0ZXItc3BhY2luZzogMC41cHg7XG59XG5cbi5yZWRJbmZvcyB7XG4gIGNvbG9yOiByZWQ7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4uc2hpcHBpbmctcGVuZGluZy10ZXh0IHtcbiAgY29sb3I6ICNlNjdlMjI7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgZm9udC1zaXplOiAwLjg1cmVtO1xufVxuXG4ub3JkZXItc3RhdHVzLWJhZGdlIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwYWRkaW5nOiA0cHggMTBweDtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cblxuLmRlbGl2ZXJ5LW9wdGlvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBnYXA6IDEycHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmOGY5ZmE7XG4gIGJvcmRlcjogMnB4IHNvbGlkICNkZWUyZTY7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgcGFkZGluZzogMTJweCAxNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAuMTVzLCBiYWNrZ3JvdW5kLWNvbG9yIC4xNXM7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW4tYm90dG9tOiAwO1xuXG4gICYuc2VsZWN0ZWQge1xuICAgIGJvcmRlci1jb2xvcjogIzE0OGY3NztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBmYWY3O1xuICB9XG5cbiAgJjpob3Zlcjpub3QoLnNlbGVjdGVkKSB7XG4gICAgYm9yZGVyLWNvbG9yOiAjYWRiNWJkO1xuICB9XG59XG5cbi5zaGlwcGluZy1hZGRyZXNzLWZvcm0ge1xuICBiYWNrZ3JvdW5kOiAjZjhmZmZlO1xuICBib3JkZXI6IDFweCBzb2xpZCAjYjJkZmRiO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIHBhZGRpbmc6IDE2cHg7XG59XG5cbi5zaGlwcGluZy1hZGRyZXNzLXRpdGxlIHtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICMxNDhmNzc7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbWFyZ2luLWJvdHRvbTogMTRweDtcbn1cblxuLmFkZHItcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAxMnB4O1xuXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA0ODBweCkgeyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBnYXA6IDA7IH1cbn1cblxuLmFkZHItZmllbGQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBmbGV4OiAxO1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuXG4gICYtLXNob3J0IHsgZmxleDogMCAwIDEyMHB4OyB9XG59XG5cbi5hZGRyLWxhYmVsIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzJjM2U1MDtcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xuXG4gIC5yZXF1aXJlZCB7IGNvbG9yOiAjZTc0YzNjOyB9XG59XG5cbi5hZGRyLWlucHV0IHtcbiAgcGFkZGluZzogOHB4IDEwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjZWQ0ZGE7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgb3V0bGluZTogbm9uZTtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIC4xNXM7XG5cbiAgJjpmb2N1cyB7IGJvcmRlci1jb2xvcjogIzE0OGY3NzsgfVxufVxuXG4uYWRkci1yZXF1aXJlZC1ub3RlIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjb2xvcjogIzdmOGM4ZDtcbiAgbWFyZ2luOiA0cHggMCAwO1xuXG4gIC5yZXF1aXJlZCB7IGNvbG9yOiAjZTc0YzNjOyB9XG59XG5cbi5yZXF1aXJlZCB7IGNvbG9yOiAjZTc0YzNjOyB9XG5cbi5kZWxpdmVyeS1yYWRpbyB7XG4gIG1hcmdpbi10b3A6IDNweDtcbiAgZmxleC1zaHJpbms6IDA7XG4gIGFjY2VudC1jb2xvcjogIzE0OGY3NztcbiAgd2lkdGg6IDE2cHg7XG4gIGhlaWdodDogMTZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uZGVsaXZlcnktY29udGVudCB7XG4gIGZsZXg6IDE7XG59XG5cbi5wYXltZW50LWJsb2NrIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjlmYTtcbiAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCAjMTQ4Zjc3O1xuICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gIGJvcmRlci1yYWRpdXM6IDAgNHB4IDRweCAwO1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4ucGF5bWVudC1ibG9jay10aXRsZSB7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjMmMzZTUwO1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuLnBheW1lbnQtYmxvY2stZGV0YWlsIHtcbiAgY29sb3I6ICM1NTU7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbn1cblxuLmdyZWVuSW5mb3Mge1xuICBjb2xvcjogIzEyNjZmMTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cblxuLnNpZ25pbi1kaWFsb2cge1xuICB6LWluZGV4OiAxNTAwO1xufVxuXG4uc29jaWFsLWNvbnRhaW5lciB7XG4gIGhlaWdodDogNXB4O1xufVxuXG5oMyBzcGFuIGkge1xuICBjb2xvcjogYmxhY2s7XG59XG5cblxuXG4vLyDDosKUwoDDosKUwoAgU291cy1vcHRpb25zIHJldHJhaXQgZW4gbWFnYXNpbiDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcblxuLnBpY2t1cC1zdWItb3B0aW9ucyB7XG4gIGJhY2tncm91bmQ6ICNmMGZhZjc7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNiMmRmZGI7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgcGFkZGluZzogMTRweDtcbn1cblxuLmRlbGl2ZXJ5LXN1Yi1vcHRpb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgZ2FwOiAxMnB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBib3JkZXI6IDJweCBzb2xpZCAjZGVlMmU2O1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIHBhZGRpbmc6IDEwcHggMTRweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgLjE1cywgYmFja2dyb3VuZC1jb2xvciAuMTVzO1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luLWJvdHRvbTogMDtcblxuICAmLnNlbGVjdGVkIHtcbiAgICBib3JkZXItY29sb3I6ICMxNDhmNzc7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YwZmFmNztcbiAgfVxuXG4gICY6aG92ZXI6bm90KC5zZWxlY3RlZCkge1xuICAgIGJvcmRlci1jb2xvcjogI2FkYjViZDtcbiAgfVxufVxuXG4uY291cmllci1hZ3JlZW1lbnQge1xuICBiYWNrZ3JvdW5kOiAjZmZmOGUxO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZmZlMDgyO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIHBhZGRpbmc6IDEwcHggMTRweDtcbiAgbWFyZ2luOiA4cHggMDtcbn1cblxuLmNvdXJpZXItY2hlY2tib3gtbGFiZWwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgZ2FwOiAxMHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgY29sb3I6ICM1ZDQwMzc7XG4gIG1hcmdpbi1ib3R0b206IDA7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG59XG5cbi5jb3VyaWVyLWNoZWNrYm94IHtcbiAgZmxleC1zaHJpbms6IDA7XG4gIG1hcmdpbi10b3A6IDJweDtcbiAgd2lkdGg6IDE2cHg7XG4gIGhlaWdodDogMTZweDtcbiAgYWNjZW50LWNvbG9yOiAjZTY3ZTIyO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi8vIMOiwpTCgMOiwpTCgCBMaWdodGJveCBwYW5pZXIgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXG5cbi5jYXJ0LWltZy13cmFwcGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gIC5jYXJ0LWltZy1vdmVybGF5IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaW5zZXQ6IDA7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIGVhc2U7XG4gICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjMpO1xuICAgIGJvcmRlci1yYWRpdXM6IGluaGVyaXQ7XG4gIH1cblxuICAmOmhvdmVyIC5jYXJ0LWltZy1vdmVybGF5IHtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG5cbiAgLmNhcnQtaW1nLXpvb20taWNvbiB7XG4gICAgZm9udC1zaXplOiAycmVtO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIGxpbmUtaGVpZ2h0OiAxO1xuICB9XG59XG5cbi5jYXJ0LWxpZ2h0Ym94LW92ZXJsYXkge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGluc2V0OiAwO1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuODUpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgei1pbmRleDogOTk5OTtcbiAgY3Vyc29yOiB6b29tLW91dDtcbn1cblxuLmNhcnQtbGlnaHRib3gtaW1nIHtcbiAgbWF4LXdpZHRoOiA5MHZ3O1xuICBtYXgtaGVpZ2h0OiA5MHZoO1xuICBvYmplY3QtZml0OiBjb250YWluO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJveC1zaGFkb3c6IDAgOHB4IDQwcHggcmdiYSgwLCAwLCAwLCAwLjYpO1xuICBjdXJzb3I6IGRlZmF1bHQ7XG59XG5cbi5jYXJ0LWxpZ2h0Ym94LWNsb3NlIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDE2cHg7XG4gIHJpZ2h0OiAyMHB4O1xuICBiYWNrZ3JvdW5kOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXNpemU6IDJyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIG9wYWNpdHk6IDAuODtcblxuICAmOmhvdmVyIHsgb3BhY2l0eTogMTsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 78983
/*!*************************************************************************************************!*\
  !*** ./src/app/shared/components/advertisements/details/hero-profile/hero-profile.component.ts ***!
  \*************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeroProfileComponent: () => (/* binding */ HeroProfileComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _ad_header_ad_header_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ad-header/ad-header.component */ 43137);


class HeroProfileComponent {
  constructor() {}
  ngOnInit() {}
  static {
    this.ɵfac = function HeroProfileComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || HeroProfileComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: HeroProfileComponent,
      selectors: [["app-hero-profile"]],
      inputs: {
        data: "data"
      },
      standalone: false,
      decls: 1,
      vars: 1,
      consts: [[3, "data"]],
      template: function HeroProfileComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-ad-header", 0);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", ctx.data);
        }
      },
      dependencies: [_ad_header_ad_header_component__WEBPACK_IMPORTED_MODULE_1__.AdHeaderComponent],
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 79057
/*!********************************************!*\
  !*** ./src/app/core/interceptors/index.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   XTokenInterceptor: () => (/* reexport safe */ _api_interceptor__WEBPACK_IMPORTED_MODULE_0__.XTokenInterceptor)
/* harmony export */ });
/* harmony import */ var _api_interceptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.interceptor */ 94896);


/***/ },

/***/ 80600
/*!*********************************************!*\
  !*** ./src/app/auth/auth-routing.module.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthRoutingModule: () => (/* binding */ AuthRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ 46264);
/* harmony import */ var _app_auth_signin_signin_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @app/auth/signin/signin.component */ 30309);
/* harmony import */ var _app_auth_main_main_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @app/auth/main/main.component */ 28935);
/* harmony import */ var _app_auth_signup_signup_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @app/auth/signup/signup.component */ 66101);
/* harmony import */ var _app_auth_login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @app/auth/login/login.component */ 66539);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 36124);







const routes = [{
  path: '',
  component: _app_auth_main_main_component__WEBPACK_IMPORTED_MODULE_2__.MainComponent,
  children: [{
    path: 'signin',
    component: _app_auth_signin_signin_component__WEBPACK_IMPORTED_MODULE_1__.SigninComponent
  }, {
    path: 'signup',
    component: _app_auth_signup_signup_component__WEBPACK_IMPORTED_MODULE_3__.SignupComponent
  }, {
    path: 'login',
    component: _app_auth_login_login_component__WEBPACK_IMPORTED_MODULE_4__.LoginComponent
  }, {
    path: '**',
    component: _app_auth_main_main_component__WEBPACK_IMPORTED_MODULE_2__.MainComponent
  }]
}];
class AuthRoutingModule {
  static {
    this.ɵfac = function AuthRoutingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AuthRoutingModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
      type: AuthRoutingModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_0__.RouterModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](AuthRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__.RouterModule]
  });
})();

/***/ },

/***/ 81608
/*!****************************************************!*\
  !*** ./src/app/shared/helpers/nav-scroll.utils.ts ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initNavScroll: () => (/* binding */ initNavScroll)
/* harmony export */ });
const NAV_SECTIONS = ['#portfolio', '#about', '#contact'];
const NAV_OFFSET = 81;
function updateActiveLink() {
  const scrollPos = window.scrollY + NAV_OFFSET;
  const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  let activeSection = NAV_SECTIONS[0];
  if (atBottom) {
    activeSection = NAV_SECTIONS[NAV_SECTIONS.length - 1];
  } else {
    NAV_SECTIONS.forEach(id => {
      const el = document.querySelector(id);
      if (el && el.offsetTop <= scrollPos) {
        activeSection = id;
      }
    });
  }
  document.querySelectorAll('.navbar-nav .nav-link').forEach(el => el.classList.remove('active'));
  document.querySelector(`.navbar-nav .nav-link[href="${activeSection}"]`)?.classList.add('active');
}
function initNavScroll() {
  // Neutralise les ancres "#/route" (hash-routing Angular) pour éviter les crashs querySelector
  document.querySelectorAll('a[href^="#/"]').forEach(a => a.setAttribute('href', '#'));
  const hasInPageAnchors = !!document.querySelector('a[href^="#"]:not([href="#"]):not([href^="#/"])');
  if (hasInPageAnchors) {
    window.addEventListener('scroll', updateActiveLink);
    setTimeout(updateActiveLink, 0);
    document.querySelectorAll('a.js-scroll-trigger[href^="#"]:not([href="#"]):not([href^="#/"])').forEach(a => {
      a.addEventListener('click', event => {
        const targetHash = event.currentTarget.getAttribute('href');
        if (!targetHash) return;
        const targetEl = document.querySelector(targetHash);
        if (targetEl) {
          event.preventDefault();
          const top = targetEl.offsetTop - 80;
          window.scrollTo({
            top,
            behavior: 'smooth'
          });
        }
        // Ferme le menu responsive (Bootstrap jQuery plugin)
        $('.navbar-collapse').collapse('hide');
      });
    });
  } else {
    document.querySelectorAll('.js-scroll-trigger').forEach(el => {
      el.addEventListener('click', () => {
        $('.navbar-collapse').collapse('hide');
      });
    });
  }
  return () => window.removeEventListener('scroll', updateActiveLink);
}

/***/ },

/***/ 81676
/*!**************************************************!*\
  !*** ./src/app/shared/services/stock.service.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StockService: () => (/* binding */ StockService)
/* harmony export */ });
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/fire/database */ 41559);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 75797);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 95429);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 11817);





class StockService {
  constructor(db) {
    this.db = db;
    this.stockByRef = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject({});
    this.stockByRef$ = this.stockByRef.asObservable();
    this.unsubscribe = (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_0__.onValue)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_0__.ref)(this.db, 'stock'), snap => {
      const val = snap.val();
      const map = {};
      if (val) {
        Object.entries(val).forEach(([refKey, data]) => {
          map[refKey] = data?.available ?? 0;
        });
      }
      this.stockByRef.next(map);
    });
  }
  ngOnDestroy() {
    this.unsubscribe?.();
  }
  /** Stock disponible depuis le cache temps réel. Retourne Infinity si le nœud n'existe pas. */
  getAvailable(reference) {
    const val = this.stockByRef.getValue()[reference];
    return val === undefined ? Infinity : val;
  }
  isOutOfStock(reference) {
    const val = this.stockByRef.getValue()[reference];
    return val !== undefined && val <= 0;
  }
  /**
   * Lit le stock directement depuis Firebase, met à jour le BehaviorSubject,
   * et retourne la valeur disponible.
   * À utiliser au clic sur "+" pour avoir la valeur la plus fraîche.
   */
  fetchAvailable(reference) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.from)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_0__.get)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_0__.ref)(this.db, `stock/${reference}`))).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(snap => {
      const val = snap.val();
      const available = val?.available;
      const current = this.stockByRef.getValue();
      if (available !== undefined) {
        this.stockByRef.next({
          ...current,
          [reference]: available
        });
      }
      return available === undefined ? Infinity : available;
    }));
  }
  static {
    this.ɵfac = function StockService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || StockService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_fire_database__WEBPACK_IMPORTED_MODULE_0__.Database));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
      token: StockService,
      factory: StockService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 82375
/*!********************************************************************!*\
  !*** ./src/app/shared/pipes/text-transform/text-transform.pipe.ts ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextTransformPipe: () => (/* binding */ TextTransformPipe)
/* harmony export */ });
/* harmony import */ var _shared_directives_text_transform_TransformTypeEnum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/directives/text-transform/TransformTypeEnum */ 39665);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 36124);


class TextTransformPipe {
  static transformText(value, type = '') {
    if (!value || typeof value !== 'string') {
      return '';
    }
    switch (type) {
      case _shared_directives_text_transform_TransformTypeEnum__WEBPACK_IMPORTED_MODULE_0__.TransformTypeEnum.UPPERCASE:
        return value.toUpperCase();
      case _shared_directives_text_transform_TransformTypeEnum__WEBPACK_IMPORTED_MODULE_0__.TransformTypeEnum.LOWERCASE:
        return value.toLowerCase();
      case _shared_directives_text_transform_TransformTypeEnum__WEBPACK_IMPORTED_MODULE_0__.TransformTypeEnum.CAPITALIZE:
        return value.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      default:
        const v = value.slice(1);
        return value.charAt(0).toUpperCase() + (v ? v.toLowerCase() : '');
    }
  }
  transform(value, type = '') {
    return TextTransformPipe.transformText(value, type);
  }
  static {
    this.ɵfac = function TextTransformPipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || TextTransformPipe)();
    };
  }
  static {
    this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({
      name: "textTransform",
      type: TextTransformPipe,
      pure: true,
      standalone: false
    });
  }
}

/***/ },

/***/ 82802
/*!********************************************!*\
  !*** ./src/app/core/store/ui.selectors.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   selectCurrency: () => (/* binding */ selectCurrency)
/* harmony export */ });
function selectCurrency(state) {
  return state.ui?.currency ?? 'XAF';
}

/***/ },

/***/ 83173
/*!***********************************************************!*\
  !*** ./src/app/features/store/catalog/catalog.effects.ts ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CatalogEffects: () => (/* binding */ CatalogEffects)
/* harmony export */ });
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/effects */ 70347);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 137);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 59452);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 61318);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 13255);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 98764);
/* harmony import */ var _catalog_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./catalog.actions */ 95168);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _app_core_firebase_catalog_repository__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @app/core/firebase/catalog.repository */ 53521);







class CatalogEffects {
  constructor(actions$, catalogRepository) {
    this.actions$ = actions$;
    this.catalogRepository = catalogRepository;
    /**
     * Souscription temps réel aux catégories Firebase dès l'enregistrement de l'effet.
     * defer() garantit que la souscription se fait après l'initialisation NgRx,
     * évitant la race condition de of(action) synchrone.
     */
    this.loadCategories$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.createEffect)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.defer)(() => {
      console.log('[CatalogEffects] démarrage watchCategories');
      return this.catalogRepository.watchCategories().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.tap)(cats => console.log('[CatalogEffects] catégories reçues:', cats.length, cats)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(categories => new _catalog_actions__WEBPACK_IMPORTED_MODULE_7__.CatalogLoadCategoriesSuccess(categories)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.catchError)(error => {
        console.error('[CatalogEffects] erreur watchCategories:', error);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(new _catalog_actions__WEBPACK_IMPORTED_MODULE_7__.CatalogLoadCategoriesError({
          error
        }));
      }));
    }));
    this.loadItemsForCategory$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.ofType)(_catalog_actions__WEBPACK_IMPORTED_MODULE_7__.CatalogActionTypes.LOAD_ITEMS_FOR_CATEGORY), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.mergeMap)(action => this.catalogRepository.watchPublishedItemsByCategory(action.payload.categoryId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(items => new _catalog_actions__WEBPACK_IMPORTED_MODULE_7__.CatalogLoadItemsForCategorySuccess({
      categoryId: action.payload.categoryId,
      items
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.catchError)(error => (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(new _catalog_actions__WEBPACK_IMPORTED_MODULE_7__.CatalogLoadItemsForCategoryError({
      categoryId: action.payload.categoryId,
      error
    })))))));
  }
  static {
    this.ɵfac = function CatalogEffects_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CatalogEffects)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.Actions), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_app_core_firebase_catalog_repository__WEBPACK_IMPORTED_MODULE_9__.CatalogRepository));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
      token: CatalogEffects,
      factory: CatalogEffects.ɵfac
    });
  }
}

/***/ },

/***/ 83575
/*!*************************************!*\
  !*** ./src/app/auth/store/index.ts ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AUTH_KEY: () => (/* reexport safe */ _auth_reducer__WEBPACK_IMPORTED_MODULE_0__.AUTH_KEY),
/* harmony export */   ActionDisplayFooter: () => (/* reexport safe */ _meta_reducer__WEBPACK_IMPORTED_MODULE_2__.ActionDisplayFooter),
/* harmony export */   ActionDisplayWrapper: () => (/* reexport safe */ _meta_reducer__WEBPACK_IMPORTED_MODULE_2__.ActionDisplayWrapper),
/* harmony export */   ActionHideFooter: () => (/* reexport safe */ _meta_reducer__WEBPACK_IMPORTED_MODULE_2__.ActionHideFooter),
/* harmony export */   ActionHideWrapper: () => (/* reexport safe */ _meta_reducer__WEBPACK_IMPORTED_MODULE_2__.ActionHideWrapper),
/* harmony export */   AuthEffects: () => (/* reexport safe */ _auth_effects__WEBPACK_IMPORTED_MODULE_1__.AuthEffects),
/* harmony export */   BACK: () => (/* reexport safe */ _router_actions__WEBPACK_IMPORTED_MODULE_3__.BACK),
/* harmony export */   FORWARD: () => (/* reexport safe */ _router_actions__WEBPACK_IMPORTED_MODULE_3__.FORWARD),
/* harmony export */   GO: () => (/* reexport safe */ _router_actions__WEBPACK_IMPORTED_MODULE_3__.GO),
/* harmony export */   Go: () => (/* reexport safe */ _router_actions__WEBPACK_IMPORTED_MODULE_3__.Go),
/* harmony export */   MetaActionTypes: () => (/* reexport safe */ _meta_reducer__WEBPACK_IMPORTED_MODULE_2__.MetaActionTypes),
/* harmony export */   RouterEffects: () => (/* reexport safe */ _router_effects__WEBPACK_IMPORTED_MODULE_4__.RouterEffects),
/* harmony export */   authInitialState: () => (/* reexport safe */ _auth_reducer__WEBPACK_IMPORTED_MODULE_0__.authInitialState),
/* harmony export */   authReducer: () => (/* reexport safe */ _auth_reducer__WEBPACK_IMPORTED_MODULE_0__.authReducer),
/* harmony export */   clearState: () => (/* reexport safe */ _auth_reducer__WEBPACK_IMPORTED_MODULE_0__.clearState),
/* harmony export */   metaInitialState: () => (/* reexport safe */ _meta_reducer__WEBPACK_IMPORTED_MODULE_2__.metaInitialState),
/* harmony export */   metaReducer: () => (/* reexport safe */ _meta_reducer__WEBPACK_IMPORTED_MODULE_2__.metaReducer),
/* harmony export */   selectorMeta: () => (/* reexport safe */ _meta_reducer__WEBPACK_IMPORTED_MODULE_2__.selectorMeta)
/* harmony export */ });
/* harmony import */ var _auth_reducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.reducer */ 32943);
/* harmony import */ var _auth_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.effects */ 87533);
/* harmony import */ var _meta_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./meta.reducer */ 87268);
/* harmony import */ var _router_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./router.actions */ 33163);
/* harmony import */ var _router_effects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./router.effects */ 37314);






/***/ },

/***/ 84429
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ 94967);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ 50635);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ 45312);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.production) {
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__.AppModule, {
  applicationProviders: [(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.provideZoneChangeDetection)()]
}).catch(err => console.error(err));

/***/ },

/***/ 84566
/*!*********************************************************!*\
  !*** ./src/app/shared/helpers/compare.objects.utils.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   compareObjects: () => (/* binding */ compareObjects)
/* harmony export */ });
function compareObjects(o, p) {
  var i,
    keysO = Object.keys(o).sort(),
    keysP = Object.keys(p).sort();
  if (keysO.length !== keysP.length) return false; //not the same nr of keys
  if (keysO.join('') !== keysP.join('')) return false; //different keys
  for (i = 0; i < keysO.length; ++i) {
    if (o[keysO[i]] instanceof Array) {
      if (!(p[keysO[i]] instanceof Array)) return false;
      //if (compareObjects(o[keysO[i]], p[keysO[i]] === false) return false
      //would work, too, and perhaps is a better fit, still, this is easy, too
      if (p[keysO[i]].sort().join('') !== o[keysO[i]].sort().join('')) return false;
    } else if (o[keysO[i]] instanceof Date) {
      if (!(p[keysO[i]] instanceof Date)) return false;
      if ('' + o[keysO[i]] !== '' + p[keysO[i]]) return false;
    } else if (o[keysO[i]] instanceof Function) {
      if (!(p[keysO[i]] instanceof Function)) return false;
      //ignore functions, or check them regardless?
    } else if (o[keysO[i]] instanceof Object) {
      if (!(p[keysO[i]] instanceof Object)) return false;
      if (o[keysO[i]] === o) {
        //self reference?
        if (p[keysO[i]] !== p) return false;
      } else if (compareObjects(o[keysO[i]], p[keysO[i]]) === false) return false; //WARNING: does not deal with circular refs other than ^^
    }
    if (o[keysO[i]] !== p[keysO[i]]) {
      //change !== to != for loose comparison
      if (o[keysO[i]] instanceof Array || o[keysO[i]] instanceof Object || o[keysO[i]] instanceof Function || o[keysO[i]] instanceof Date) {
        return compareObjects(o[keysO[i]], p[keysO[i]]);
      }
      return false; //not the same value
    }
  }
  return true;
}

/***/ },

/***/ 84757
/*!****************************************************!*\
  !*** ./src/app/core/firebase/orders.repository.ts ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrdersRepository: () => (/* binding */ OrdersRepository)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 11817);

/**
 * OrdersRepository
 * Seule classe autorisée à lire/écrire le nœud Firebase `orders/`.
 * Appelé exclusivement depuis les NgRx Effects.
 *
 * Phase 2 : stub — le composant AdminDashboard accède encore directement à orders/
 *           via firebase.database() et les Firebase Functions.
 * Phase 4 : ce repository sera complété lors de la refacto de l'UI admin catalogue.
 */
class OrdersRepository {
  static {
    this.ɵfac = function OrdersRepository_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || OrdersRepository)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: OrdersRepository,
      factory: OrdersRepository.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 85730
/*!*****************************************!*\
  !*** ./src/app/features/store/index.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActionClearBasket: () => (/* reexport safe */ _items_actions__WEBPACK_IMPORTED_MODULE_2__.ActionClearBasket),
/* harmony export */   ActionItemAdd: () => (/* reexport safe */ _items_actions__WEBPACK_IMPORTED_MODULE_2__.ActionItemAdd),
/* harmony export */   ActionItemAddSuccess: () => (/* reexport safe */ _items_actions__WEBPACK_IMPORTED_MODULE_2__.ActionItemAddSuccess),
/* harmony export */   ActionItemAddleError: () => (/* reexport safe */ _items_actions__WEBPACK_IMPORTED_MODULE_2__.ActionItemAddleError),
/* harmony export */   ActionItemToogleNotSelected: () => (/* reexport safe */ _items_actions__WEBPACK_IMPORTED_MODULE_2__.ActionItemToogleNotSelected),
/* harmony export */   ActionItemToogleSelect: () => (/* reexport safe */ _items_actions__WEBPACK_IMPORTED_MODULE_2__.ActionItemToogleSelect),
/* harmony export */   ActionItemToogleSelectError: () => (/* reexport safe */ _items_actions__WEBPACK_IMPORTED_MODULE_2__.ActionItemToogleSelectError),
/* harmony export */   ActionItemToogleSelectSuccess: () => (/* reexport safe */ _items_actions__WEBPACK_IMPORTED_MODULE_2__.ActionItemToogleSelectSuccess),
/* harmony export */   ActionItemsRetrieve: () => (/* reexport safe */ _items_actions__WEBPACK_IMPORTED_MODULE_2__.ActionItemsRetrieve),
/* harmony export */   ActionItemsRetrieveError: () => (/* reexport safe */ _items_actions__WEBPACK_IMPORTED_MODULE_2__.ActionItemsRetrieveError),
/* harmony export */   ActionItemsRetrieveSuccess: () => (/* reexport safe */ _items_actions__WEBPACK_IMPORTED_MODULE_2__.ActionItemsRetrieveSuccess),
/* harmony export */   ActionRestoreBasketItem: () => (/* reexport safe */ _items_actions__WEBPACK_IMPORTED_MODULE_2__.ActionRestoreBasketItem),
/* harmony export */   ActionUpdateBasketItem: () => (/* reexport safe */ _items_actions__WEBPACK_IMPORTED_MODULE_2__.ActionUpdateBasketItem),
/* harmony export */   ItemSizeEnum: () => (/* reexport safe */ _shared_interfaces__WEBPACK_IMPORTED_MODULE_4__.ItemSizeEnum),
/* harmony export */   ItemsActionTypes: () => (/* reexport safe */ _items_actions__WEBPACK_IMPORTED_MODULE_2__.ItemsActionTypes),
/* harmony export */   ItemsEffects: () => (/* reexport safe */ _items_effects__WEBPACK_IMPORTED_MODULE_1__.ItemsEffects),
/* harmony export */   itemsReducer: () => (/* reexport safe */ _itemsReducer__WEBPACK_IMPORTED_MODULE_0__.itemsReducer),
/* harmony export */   selectChosenItems: () => (/* reexport safe */ _items_selectors__WEBPACK_IMPORTED_MODULE_3__.selectChosenItems),
/* harmony export */   selectExistingCategory: () => (/* reexport safe */ _items_selectors__WEBPACK_IMPORTED_MODULE_3__.selectExistingCategory),
/* harmony export */   selectItemsState: () => (/* reexport safe */ _items_selectors__WEBPACK_IMPORTED_MODULE_3__.selectItemsState),
/* harmony export */   selectNbChosenItems: () => (/* reexport safe */ _items_selectors__WEBPACK_IMPORTED_MODULE_3__.selectNbChosenItems)
/* harmony export */ });
/* harmony import */ var _itemsReducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./itemsReducer */ 27584);
/* harmony import */ var _items_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./items.effects */ 34406);
/* harmony import */ var _items_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./items.actions */ 70671);
/* harmony import */ var _items_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./items.selectors */ 4906);
/* harmony import */ var _shared_interfaces__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/interfaces */ 40787);






/***/ },

/***/ 87268
/*!********************************************!*\
  !*** ./src/app/auth/store/meta.reducer.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActionDisplayFooter: () => (/* binding */ ActionDisplayFooter),
/* harmony export */   ActionDisplayWrapper: () => (/* binding */ ActionDisplayWrapper),
/* harmony export */   ActionHideFooter: () => (/* binding */ ActionHideFooter),
/* harmony export */   ActionHideWrapper: () => (/* binding */ ActionHideWrapper),
/* harmony export */   MetaActionTypes: () => (/* binding */ MetaActionTypes),
/* harmony export */   metaInitialState: () => (/* binding */ metaInitialState),
/* harmony export */   metaReducer: () => (/* binding */ metaReducer),
/* harmony export */   selectorMeta: () => (/* binding */ selectorMeta)
/* harmony export */ });
var MetaActionTypes;
(function (MetaActionTypes) {
  MetaActionTypes["HIDE_WRAPPER"] = "[Meta] Hide wrapper";
  MetaActionTypes["DISPLAY_WRAPPER"] = "[Meta] Display wrapper";
  MetaActionTypes["HIDE_FOOTER"] = "[Meta] Hide footer";
  MetaActionTypes["DISPLAY_FOOTER"] = "[Meta] Display footer";
})(MetaActionTypes || (MetaActionTypes = {}));
class ActionHideWrapper {
  constructor() {
    this.type = MetaActionTypes.HIDE_WRAPPER;
  }
}
class ActionDisplayWrapper {
  constructor() {
    this.type = MetaActionTypes.DISPLAY_WRAPPER;
  }
}
class ActionHideFooter {
  constructor() {
    this.type = MetaActionTypes.HIDE_FOOTER;
  }
}
class ActionDisplayFooter {
  constructor() {
    this.type = MetaActionTypes.DISPLAY_FOOTER;
  }
}
const metaInitialState = {
  isWrapper: true,
  isFooter: true
};
const selectorMeta = state => state.meta;
function metaReducer(state = metaInitialState, action) {
  switch (action.type) {
    case MetaActionTypes.HIDE_WRAPPER:
      return {
        ...state,
        isWrapper: false
      };
    case MetaActionTypes.DISPLAY_WRAPPER:
      return {
        ...state,
        isWrapper: true
      };
    case MetaActionTypes.HIDE_FOOTER:
      return {
        ...state,
        isFooter: false
      };
    case MetaActionTypes.DISPLAY_FOOTER:
      return {
        ...state,
        isFooter: true
      };
    default:
      return state;
  }
}

/***/ },

/***/ 87533
/*!********************************************!*\
  !*** ./src/app/auth/store/auth.effects.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthEffects: () => (/* binding */ AuthEffects)
/* harmony export */ });
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/effects */ 70347);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 75797);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 59452);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 59400);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 61318);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 36647);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 64334);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 98764);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 15842);
/* harmony import */ var _auth_actions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./auth.actions */ 2520);
/* harmony import */ var _router_actions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./router.actions */ 33163);
/* harmony import */ var _app_auth_store_auth_selectors__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @app/auth/store/auth.selectors */ 2981);
/* harmony import */ var _app_auth_store_auth_reducer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @app/auth/store/auth.reducer */ 32943);
/* harmony import */ var _app_features_store__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @app/features/store */ 85730);
/* harmony import */ var _app_features_store_catalog_catalog_actions__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @app/features/store/catalog/catalog.actions */ 95168);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ngrx/store */ 81383);
/* harmony import */ var _shared_services__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @shared/services */ 42815);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/router */ 83305);
/* harmony import */ var _core_local_storage_local_storage_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../core/local-storage/local-storage.service */ 92570);
/* harmony import */ var _shared_services_cache_cache_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @shared/services/cache/cache.service */ 55801);
/* harmony import */ var _app_core_firebase_users_repository__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @app/core/firebase/users.repository */ 67848);

















class AuthEffects {
  constructor(actions$, store$, service, router, localStorageService, cache, usersRepository) {
    this.actions$ = actions$;
    this.store$ = store$;
    this.service = service;
    this.router = router;
    this.localStorageService = localStorageService;
    this.cache = cache;
    this.usersRepository = usersRepository;
    /** Prefixes publiés reçus via CatalogLoadCategoriesSuccess */
    this.expectedCategories = new Set();
    /** Prefixes ayant reçu RETRIEVE_ITEMS_SUCCESS */
    this.loadedCategories = new Set();
    this.allCategoriesLoaded$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(false);
    this.logout$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.ofType)(_auth_actions__WEBPACK_IMPORTED_MODULE_11__.AuthActionTypes.LOGOUT), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(action => {
      this.localStorageService.setItem(_app_auth_store_auth_reducer__WEBPACK_IMPORTED_MODULE_14__.AUTH_KEY, undefined);
      this.localStorageService.clearAll();
      localStorage.removeItem('delice-basket');
      // this.cache.clearAll();
      return new _auth_actions__WEBPACK_IMPORTED_MODULE_11__.ActionAuthLoggedOut();
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(new _auth_actions__WEBPACK_IMPORTED_MODULE_11__.ActionAuthSetError(error)))));
    this.loggedOut$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.ofType)(_auth_actions__WEBPACK_IMPORTED_MODULE_11__.AuthActionTypes.LOGGED_OUT), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.tap)(() => {
      this.store$.dispatch(new _router_actions__WEBPACK_IMPORTED_MODULE_12__.Go({
        path: ['/']
      }));
    })), {
      dispatch: false
    });
    this.refrechUserToken$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.ofType)(_auth_actions__WEBPACK_IMPORTED_MODULE_11__.AuthActionTypes.AUTH_REFRESH_USER_TOKEN), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.switchMap)(() => {
      const currentUser = this.localStorageService.getItem(_app_auth_store_auth_reducer__WEBPACK_IMPORTED_MODULE_14__.AUTH_KEY);
      if (!currentUser) return rxjs__WEBPACK_IMPORTED_MODULE_3__.EMPTY;
      this.store$.dispatch(new _auth_actions__WEBPACK_IMPORTED_MODULE_11__.ActionAuthLoggedIn(currentUser));
      return this.usersRepository.watchCommands(currentUser.uid).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.tap)(items => items.forEach(item => this.store$.dispatch(new _app_features_store__WEBPACK_IMPORTED_MODULE_15__.ActionItemToogleNotSelected(item)))));
    })), {
      dispatch: false
    });
    this.toggleLoggedIn$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.ofType)(_auth_actions__WEBPACK_IMPORTED_MODULE_11__.AuthActionTypes.LOGGED_IN), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.withLatestFrom)(this.store$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(([action, state]) => {
      // (techniquement action ne devrait jamais être falsy ici, mais on garde ta sécurité)
      if (!action) {
        return new _router_actions__WEBPACK_IMPORTED_MODULE_12__.Go({
          path: ['/']
        });
      }
      if (state && !!state['core:auth:constantine']) {
        this.localStorageService.setItem(_app_auth_store_auth_reducer__WEBPACK_IMPORTED_MODULE_14__.AUTH_KEY, action.payload);
        const authState = (0,_app_auth_store_auth_selectors__WEBPACK_IMPORTED_MODULE_13__.selectorConnectedUser)(state);
        if (/^\/auth/.test(this.router.url)) {
          return new _router_actions__WEBPACK_IMPORTED_MODULE_12__.Go({
            path: ['/']
          });
        } else if (!!authState) {
          return null;
        }
      }
      return null;
    }),
    // ✅ IMPORTANT: ne laisse passer que de vraies actions
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.filter)(a => a != null)));
    this.restoreBasketOnLogin$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.ofType)(_auth_actions__WEBPACK_IMPORTED_MODULE_11__.AuthActionTypes.LOGGED_IN), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.switchMap)(action => {
      const uid = action.payload?.additionalInfos?.uid;
      if (!uid) return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(null);
      // Ne pas restaurer seulement si TOUTES les commandes existantes sont expédiées
      return this.usersRepository.getOrderStatus(uid).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.switchMap)(statusVal => {
        const orders = statusVal ? Object.values(statusVal) : [];
        // Firebase est source de vérité UNIQUEMENT s'il y a une commande active (non expédiée).
        // Pas de commande active → on garde le panier localStorage tel quel.
        const hasActiveOrder = orders.some(o => o?.status !== 'shipped');
        if (!hasActiveOrder) return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(null);
        return this.usersRepository.getBasket(uid).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.switchMap)(items => {
          if (!items?.length) return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(null);
          // Attend que les 3 catégories soient chargées.
          // allCategoriesLoaded$ est un BehaviorSubject alimenté depuis le
          // constructeur → émet true immédiatement si déjà chargées, sinon attend.
          return this.allCategoriesLoaded$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.filter)(loaded => loaded), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.tap)(() => items.forEach(item => this.store$.dispatch(new _app_features_store__WEBPACK_IMPORTED_MODULE_15__.ActionUpdateBasketItem(item)))));
        }));
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(e => {
        console.error('[basket restore on login]', e);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(null);
      }));
    })), {
      dispatch: false
    });
    // Écoute les catégories publiées pour connaître le nombre attendu
    this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.ofType)(_app_features_store_catalog_catalog_actions__WEBPACK_IMPORTED_MODULE_16__.CatalogActionTypes.LOAD_CATEGORIES_SUCCESS)).subscribe(action => {
      action.payload.filter(c => c.published).forEach(c => this.expectedCategories.add(c.prefix));
      this.checkAllLoaded();
    });
    // Écoute les RETRIEVE_ITEMS_SUCCESS pour compter les catégories chargées
    this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.ofType)(_app_features_store__WEBPACK_IMPORTED_MODULE_15__.ItemsActionTypes.RETRIEVE_ITEMS_SUCCESS)).subscribe(action => {
      this.loadedCategories.add(action.payload.name);
      this.checkAllLoaded();
    });
  }
  checkAllLoaded() {
    if (this.expectedCategories.size > 0 && [...this.expectedCategories].every(prefix => this.loadedCategories.has(prefix))) {
      this.allCategoriesLoaded$.next(true);
    }
  }
  static {
    this.ɵfac = function AuthEffects_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AuthEffects)(_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵinject"](_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__.Actions), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵinject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_18__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵinject"](_shared_services__WEBPACK_IMPORTED_MODULE_19__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_20__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵinject"](_core_local_storage_local_storage_service__WEBPACK_IMPORTED_MODULE_21__.LocalStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵinject"](_shared_services_cache_cache_service__WEBPACK_IMPORTED_MODULE_22__.CacheService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵinject"](_app_core_firebase_users_repository__WEBPACK_IMPORTED_MODULE_23__.UsersRepository));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineInjectable"]({
      token: AuthEffects,
      factory: AuthEffects.ɵfac
    });
  }
}

/***/ },

/***/ 89381
/*!**************************************************************!*\
  !*** ./src/app/shared/components/header/header.component.ts ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeaderComponent: () => (/* binding */ HeaderComponent)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ 83305);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 33900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 10819);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 2510);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ 80436);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _app_core_firebase_app_config_repository__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @app/core/firebase/app-config.repository */ 190);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 79748);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 48418);










const _c0 = (a0, a1) => ({
  "masthead": a0,
  "adjust": a1
});
function HeaderComponent_Conditional_1_Conditional_1_1_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "img", 7);
  }
  if (rf & 2) {
    const slide_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("src", slide_r1.imageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsanitizeUrl"])("alt", slide_r1.alt || "");
  }
}
function HeaderComponent_Conditional_1_Conditional_1_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](0, HeaderComponent_Conditional_1_Conditional_1_1_ng_template_0_Template, 1, 2, "ng-template", 6);
  }
}
function HeaderComponent_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ngb-carousel", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, HeaderComponent_Conditional_1_Conditional_1_1_Template, 1, 0, null, 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("interval", 4000)("wrap", true)("animation", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r1.slides);
  }
}
function HeaderComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵconditionalCreate"](1, HeaderComponent_Conditional_1_Conditional_1_Template, 2, 4, "ngb-carousel", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "p", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](5, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵconditional"](ctx_r1.displayHtml ? 1 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](4, 3, "PRESENTATION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 5, "BUILD_PLACE"));
  }
}
const DEFAULT_SLIDE = [{
  imageUrl: 'assets/style-sauvage_only_logo-removebg.png',
  alt: 'Délice Éternel'
}];
class HeaderComponent {
  constructor(router, titleService, translate, configRepo) {
    this.router = router;
    this.titleService = titleService;
    this.translate = translate;
    this.configRepo = configRepo;
    this.displayHtml = true;
    this.slides = DEFAULT_SLIDE;
    this.unsubscribe$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
    this.subs = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subscription();
  }
  ngOnInit() {
    this.router.events.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this.unsubscribe$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_0__.ActivationEnd)).subscribe(event => {
      this.displayHtml = (event.snapshot.routeConfig?.path?.indexOf('home') ?? -1) >= 0;
    });
    // Carousel dynamique depuis Firebase (fallback statique si vide)
    this.subs.add(this.configRepo.watchCarousel().subscribe(firebaseSlides => {
      this.slides = firebaseSlides.length > 0 ? firebaseSlides : DEFAULT_SLIDE;
    }));
    // Titre de la page (onglet navigateur)
    this.subs.add(this.configRepo.watchAppTitle().subscribe(appTitle => {
      const lang = this.translate.currentLang ?? 'fr';
      const title = lang === 'en' ? appTitle.en : appTitle.fr;
      if (title) this.titleService.setTitle(title);
    }));
    this.subs.add(this.translate.onLangChange.subscribe(({
      lang
    }) => {
      this.configRepo.watchAppTitle().subscribe(appTitle => {
        const title = lang === 'en' ? appTitle.en : appTitle.fr;
        if (title) this.titleService.setTitle(title);
      });
    }));
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.subs.unsubscribe();
  }
  static {
    this.ɵfac = function HeaderComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_0__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.Title), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_app_core_firebase_app_config_repository__WEBPACK_IMPORTED_MODULE_8__.AppConfigRepository));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
      type: HeaderComponent,
      selectors: [["app-header"]],
      standalone: false,
      decls: 2,
      vars: 5,
      consts: [[1, "bg-primary", "text-white", "text-center", 3, "ngClass"], ["id", "headerId", 1, "container", "d-flex", "align-items-center", "flex-column"], [1, "hero-carousel", "carousel-fade", 3, "interval", "wrap", "animation"], [1, "pre-wrap", "masthead-subheading", "font-weight-light", "mb-0"], [1, "atelier"], [4, "ngFor", "ngForOf"], ["ngbSlide", ""], [1, "hero-img", 3, "src", "alt"]],
      template: function HeaderComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "header", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵconditionalCreate"](1, HeaderComponent_Conditional_1_Template, 9, 7, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction2"](2, _c0, ctx.displayHtml, !ctx.displayHtml));
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵconditional"](ctx.displayHtml ? 1 : -1);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_10__.NgbCarousel, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_10__.NgbSlide, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslatePipe],
      styles: [".adjust[_ngcontent-%COMP%] {\n  margin-top: 100px;\n}\n\n.bg-primary[_ngcontent-%COMP%] {\n  background-color: #17a2b8 !important;\n  background-repeat: no-repeat;\n  background-position: 50% 50%;\n}\n\n.masthead[_ngcontent-%COMP%]   .masthead-avatar[_ngcontent-%COMP%] {\n  width: 13rem;\n}\n\n.atelier[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-style: italic;\n}\n\n.masthead[_ngcontent-%COMP%] {\n  padding-top: calc(4rem + 74px) !important;\n  padding-bottom: 6rem !important;\n}\n\n@media (max-width: 768px) {\n  .masthead[_ngcontent-%COMP%] {\n    padding-top: calc(1rem + 56px) !important;\n    padding-bottom: 1rem !important;\n  }\n}\n\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0Usb0NBQW9DO0VBQ3BDLDRCQUE0QjtFQUM1Qiw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxlQUFlO0VBQ2Ysa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UseUNBQXlDO0VBQ3pDLCtCQUErQjtBQUNqQzs7QUFFQTtFQUNFO0lBQ0UseUNBQXlDO0lBQ3pDLCtCQUErQjtFQUNqQztBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLmFkanVzdCB7XG4gIG1hcmdpbi10b3A6IDEwMHB4O1xufVxuXG4uYmctcHJpbWFyeSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxN2EyYjggIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogNTAlIDUwJTtcbn1cblxuLm1hc3RoZWFkIC5tYXN0aGVhZC1hdmF0YXIge1xuICB3aWR0aDogMTNyZW07XG59XG5cbi5hdGVsaWVyIHtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG59XG5cbi5tYXN0aGVhZCB7XG4gIHBhZGRpbmctdG9wOiBjYWxjKDRyZW0gKyA3NHB4KSAhaW1wb3J0YW50O1xuICBwYWRkaW5nLWJvdHRvbTogNnJlbSAhaW1wb3J0YW50O1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLm1hc3RoZWFkIHtcbiAgICBwYWRkaW5nLXRvcDogY2FsYygxcmVtICsgNTZweCkgIWltcG9ydGFudDtcbiAgICBwYWRkaW5nLWJvdHRvbTogMXJlbSAhaW1wb3J0YW50O1xuICB9XG59XG5cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ },

/***/ 90013
/*!********************************************************************!*\
  !*** ./src/app/shared/components/not-found/not-found.component.ts ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NotFoundComponent: () => (/* binding */ NotFoundComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 36124);

class NotFoundComponent {
  constructor() {}
  ngOnInit() {}
  static {
    this.ɵfac = function NotFoundComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || NotFoundComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: NotFoundComponent,
      selectors: [["app-not-found"]],
      standalone: false,
      decls: 12,
      vars: 0,
      consts: [[1, "not-found"], ["id", "title"], [1, "circles"], [1, "circle", "big"], [1, "circle", "med"], [1, "circle", "small"]],
      template: function NotFoundComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0)(1, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Page non trouv\u00E9e");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2)(4, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "404");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "small");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "CONTENU NON TROUVE");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "span", 3)(10, "span", 4)(11, "span", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        }
      },
      styles: ["@import url(https://fonts.googleapis.com/css?family=Raleway:300,700);.not-found[_ngcontent-%COMP%] {\n  min-height: 1000px;\n background: #ebaa26;\n font-weight: 300;\n margin-top: -40px;\n padding-top: 40px;\n margin-bottom: -20px;\n}\n\n#title[_ngcontent-%COMP%] {\n  text-align:center;\n  font-size:40px;\n  margin-top:40px;\n  margin-bottom:-40px;\n  position:relative;\n  color:#fff;\n  z-index: 1;\n}\n\n.circles[_ngcontent-%COMP%]:after {\n  content:'';\n  display:inline-block;\n  width:100%;\n  height:100px;\n  background:#fff;\n  position:absolute;\n  top:-50px;\n  left:0;\n  transform:skewY(-4deg);\n  -webkit-transform:skewY(-4deg);\n}\n\n.circles[_ngcontent-%COMP%] {\n\tbackground:#fff;\n\ttext-align: center;\n\tposition: relative;\n  margin-top: 210px;\n  box-shadow:inset -1px -4px 4px rgba(0,0,0,0.2);\n}\n\n.circles[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n\tfont-size: 240px;\n\tcolor: #fff;\n\tpadding-top: 60px;\n\tposition: relative;\n  z-index: 9;\n  line-height: 100%;\n}\n\n.circles[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 40px;\n  line-height: 100%;\n  vertical-align: top;\n}\n\n.circles[_ngcontent-%COMP%]   .circle.small[_ngcontent-%COMP%] {\n\twidth: 140px;\n\theight: 140px;\n\tborder-radius: 50%;\n\tbackground: #ebaa26;\n\tposition: absolute;\n\tz-index: 1;\n\ttop: 80px;\n\tleft: 50%;\n\tanimation: 7s _ngcontent-%COMP%_smallmove infinite cubic-bezier(1,.22,.71,.98);\n\t-webkit-animation: 7s _ngcontent-%COMP%_smallmove infinite cubic-bezier(1,.22,.71,.98);\n\tanimation-delay: 1.2s;\n\t-webkit-animation-delay: 1.2s;\n}\n\n.circles[_ngcontent-%COMP%]   .circle.med[_ngcontent-%COMP%] {\n\twidth: 200px;\n\theight: 200px;\n\tborder-radius: 50%;\n\tbackground: #ebaa26;\n\tposition: absolute;\n\tz-index: 1;\n\ttop: 0;\n\tleft: 10%;\n\tanimation: 7s _ngcontent-%COMP%_medmove infinite cubic-bezier(.32,.04,.15,.75);\n\t-webkit-animation: 7s _ngcontent-%COMP%_medmove infinite cubic-bezier(.32,.04,.15,.75);\n\tanimation-delay: 0.4s;\n\t-webkit-animation-delay: 0.4s;\n}\n\n.circles[_ngcontent-%COMP%]   .circle.big[_ngcontent-%COMP%] {\n\twidth: 400px;\n\theight: 400px;\n\tborder-radius: 50%;\n\tbackground: #ebaa26;\n\tposition: absolute;\n\tz-index: 1;\n\ttop: 200px;\n\tright: 0;\n\tanimation: 8s _ngcontent-%COMP%_bigmove infinite;\n\t-webkit-animation: 8s _ngcontent-%COMP%_bigmove infinite;\n\tanimation-delay: 3s;\n\t-webkit-animation-delay: 1s;\n}\n@keyframes _ngcontent-%COMP%_smallmove {\n\t0% { top: 10px; left: 45%; opacity: 1; }\n\t25% { top: 300px; left: 40%; opacity:0.7; }\n\t50% { top: 240px; left: 55%; opacity:0.4; }\n\t75% { top: 100px; left: 40%;  opacity:0.6; }\n\t100% { top: 10px; left: 45%; opacity: 1; }\n}\n\n@keyframes _ngcontent-%COMP%_medmove {\n\t0% { top: 0px; left: 20%; opacity: 1; }\n\t25% { top: 300px; left: 80%; opacity:0.7; }\n\t50% { top: 240px; left: 55%; opacity:0.4; }\n\t75% { top: 100px; left: 40%;  opacity:0.6; }\n\t100% { top: 0px; left: 20%; opacity: 1; }\n}\n@keyframes _ngcontent-%COMP%_bigmove {\n\t0% { top: 0px; right: 4%; opacity: 0.5; }\n\t25% { top: 100px; right: 40%; opacity:0.4; }\n\t50% { top: 240px; right: 45%; opacity:0.8; }\n\t75% { top: 100px; right: 35%;  opacity:0.6; }\n\t100% { top: 0px; right: 4%; opacity: 0.5; }\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvbm90LWZvdW5kL25vdC1mb3VuZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0Usa0JBQWtCO0NBQ25CLG1CQUFtQjtDQUNuQixnQkFBZ0I7Q0FDaEIsaUJBQWlCO0NBQ2pCLGlCQUFpQjtDQUNqQixvQkFBb0I7QUFDckI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsY0FBYztFQUNkLGVBQWU7RUFDZixtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLFVBQVU7RUFDVixVQUFVO0FBQ1o7O0FBRUE7RUFDRSxVQUFVO0VBQ1Ysb0JBQW9CO0VBQ3BCLFVBQVU7RUFDVixZQUFZO0VBQ1osZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixTQUFTO0VBQ1QsTUFBTTtFQUNOLHNCQUFzQjtFQUN0Qiw4QkFBOEI7QUFDaEM7O0FBRUE7Q0FDQyxlQUFlO0NBQ2Ysa0JBQWtCO0NBQ2xCLGtCQUFrQjtFQUNqQixpQkFBaUI7RUFDakIsOENBQThDO0FBQ2hEOztBQUVBO0NBQ0MsZ0JBQWdCO0NBQ2hCLFdBQVc7Q0FDWCxpQkFBaUI7Q0FDakIsa0JBQWtCO0VBQ2pCLFVBQVU7RUFDVixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLG1CQUFtQjtBQUNyQjs7QUFFQTtDQUNDLFlBQVk7Q0FDWixhQUFhO0NBQ2Isa0JBQWtCO0NBQ2xCLG1CQUFtQjtDQUNuQixrQkFBa0I7Q0FDbEIsVUFBVTtDQUNWLFNBQVM7Q0FDVCxTQUFTO0NBQ1QsNERBQTREO0NBQzVELG9FQUFvRTtDQUNwRSxxQkFBcUI7Q0FDckIsNkJBQTZCO0FBQzlCOztBQUVBO0NBQ0MsWUFBWTtDQUNaLGFBQWE7Q0FDYixrQkFBa0I7Q0FDbEIsbUJBQW1CO0NBQ25CLGtCQUFrQjtDQUNsQixVQUFVO0NBQ1YsTUFBTTtDQUNOLFNBQVM7Q0FDVCw0REFBNEQ7Q0FDNUQsb0VBQW9FO0NBQ3BFLHFCQUFxQjtDQUNyQiw2QkFBNkI7QUFDOUI7O0FBRUE7Q0FDQyxZQUFZO0NBQ1osYUFBYTtDQUNiLGtCQUFrQjtDQUNsQixtQkFBbUI7Q0FDbkIsa0JBQWtCO0NBQ2xCLFVBQVU7Q0FDVixVQUFVO0NBQ1YsUUFBUTtDQUNSLDhCQUE4QjtDQUM5QixzQ0FBc0M7Q0FDdEMsbUJBQW1CO0NBQ25CLDJCQUEyQjtBQUM1QjtBQVNBO0NBQ0MsS0FBSyxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRTtDQUN2QyxNQUFNLFVBQVUsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFO0NBQzFDLE1BQU0sVUFBVSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUU7Q0FDMUMsTUFBTSxVQUFVLEVBQUUsU0FBUyxHQUFHLFdBQVcsRUFBRTtDQUMzQyxPQUFPLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFO0FBQzFDOztBQVVBO0NBQ0MsS0FBSyxRQUFRLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRTtDQUN0QyxNQUFNLFVBQVUsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFO0NBQzFDLE1BQU0sVUFBVSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUU7Q0FDMUMsTUFBTSxVQUFVLEVBQUUsU0FBUyxHQUFHLFdBQVcsRUFBRTtDQUMzQyxPQUFPLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFO0FBQ3pDO0FBU0E7Q0FDQyxLQUFLLFFBQVEsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFO0NBQ3hDLE1BQU0sVUFBVSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7Q0FDM0MsTUFBTSxVQUFVLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtDQUMzQyxNQUFNLFVBQVUsRUFBRSxVQUFVLEdBQUcsV0FBVyxFQUFFO0NBQzVDLE9BQU8sUUFBUSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUU7QUFDM0MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9UmFsZXdheTozMDAsNzAwKTtcclxuXHJcbi5ub3QtZm91bmQge1xyXG4gIG1pbi1oZWlnaHQ6IDEwMDBweDtcclxuIGJhY2tncm91bmQ6ICNlYmFhMjY7XHJcbiBmb250LXdlaWdodDogMzAwO1xyXG4gbWFyZ2luLXRvcDogLTQwcHg7XHJcbiBwYWRkaW5nLXRvcDogNDBweDtcclxuIG1hcmdpbi1ib3R0b206IC0yMHB4O1xyXG59XHJcblxyXG4jdGl0bGUge1xyXG4gIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gIGZvbnQtc2l6ZTo0MHB4O1xyXG4gIG1hcmdpbi10b3A6NDBweDtcclxuICBtYXJnaW4tYm90dG9tOi00MHB4O1xyXG4gIHBvc2l0aW9uOnJlbGF0aXZlO1xyXG4gIGNvbG9yOiNmZmY7XHJcbiAgei1pbmRleDogMTtcclxufVxyXG5cclxuLmNpcmNsZXM6YWZ0ZXIge1xyXG4gIGNvbnRlbnQ6Jyc7XHJcbiAgZGlzcGxheTppbmxpbmUtYmxvY2s7XHJcbiAgd2lkdGg6MTAwJTtcclxuICBoZWlnaHQ6MTAwcHg7XHJcbiAgYmFja2dyb3VuZDojZmZmO1xyXG4gIHBvc2l0aW9uOmFic29sdXRlO1xyXG4gIHRvcDotNTBweDtcclxuICBsZWZ0OjA7XHJcbiAgdHJhbnNmb3JtOnNrZXdZKC00ZGVnKTtcclxuICAtd2Via2l0LXRyYW5zZm9ybTpza2V3WSgtNGRlZyk7XHJcbn1cclxuXHJcbi5jaXJjbGVzIHtcclxuXHRiYWNrZ3JvdW5kOiNmZmY7XHJcblx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBtYXJnaW4tdG9wOiAyMTBweDtcclxuICBib3gtc2hhZG93Omluc2V0IC0xcHggLTRweCA0cHggcmdiYSgwLDAsMCwwLjIpO1xyXG59XHJcblxyXG4uY2lyY2xlcyBwIHtcclxuXHRmb250LXNpemU6IDI0MHB4O1xyXG5cdGNvbG9yOiAjZmZmO1xyXG5cdHBhZGRpbmctdG9wOiA2MHB4O1xyXG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB6LWluZGV4OiA5O1xyXG4gIGxpbmUtaGVpZ2h0OiAxMDAlO1xyXG59XHJcblxyXG4uY2lyY2xlcyBwIHNtYWxsIHtcclxuICBmb250LXNpemU6IDQwcHg7XHJcbiAgbGluZS1oZWlnaHQ6IDEwMCU7XHJcbiAgdmVydGljYWwtYWxpZ246IHRvcDtcclxufVxyXG5cclxuLmNpcmNsZXMgLmNpcmNsZS5zbWFsbCB7XHJcblx0d2lkdGg6IDE0MHB4O1xyXG5cdGhlaWdodDogMTQwcHg7XHJcblx0Ym9yZGVyLXJhZGl1czogNTAlO1xyXG5cdGJhY2tncm91bmQ6ICNlYmFhMjY7XHJcblx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdHotaW5kZXg6IDE7XHJcblx0dG9wOiA4MHB4O1xyXG5cdGxlZnQ6IDUwJTtcclxuXHRhbmltYXRpb246IDdzIHNtYWxsbW92ZSBpbmZpbml0ZSBjdWJpYy1iZXppZXIoMSwuMjIsLjcxLC45OCk7XHJcblx0LXdlYmtpdC1hbmltYXRpb246IDdzIHNtYWxsbW92ZSBpbmZpbml0ZSBjdWJpYy1iZXppZXIoMSwuMjIsLjcxLC45OCk7XHJcblx0YW5pbWF0aW9uLWRlbGF5OiAxLjJzO1xyXG5cdC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAxLjJzO1xyXG59XHJcblxyXG4uY2lyY2xlcyAuY2lyY2xlLm1lZCB7XHJcblx0d2lkdGg6IDIwMHB4O1xyXG5cdGhlaWdodDogMjAwcHg7XHJcblx0Ym9yZGVyLXJhZGl1czogNTAlO1xyXG5cdGJhY2tncm91bmQ6ICNlYmFhMjY7XHJcblx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdHotaW5kZXg6IDE7XHJcblx0dG9wOiAwO1xyXG5cdGxlZnQ6IDEwJTtcclxuXHRhbmltYXRpb246IDdzIG1lZG1vdmUgaW5maW5pdGUgY3ViaWMtYmV6aWVyKC4zMiwuMDQsLjE1LC43NSk7XHJcblx0LXdlYmtpdC1hbmltYXRpb246IDdzIG1lZG1vdmUgaW5maW5pdGUgY3ViaWMtYmV6aWVyKC4zMiwuMDQsLjE1LC43NSk7XHJcblx0YW5pbWF0aW9uLWRlbGF5OiAwLjRzO1xyXG5cdC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwLjRzO1xyXG59XHJcblxyXG4uY2lyY2xlcyAuY2lyY2xlLmJpZyB7XHJcblx0d2lkdGg6IDQwMHB4O1xyXG5cdGhlaWdodDogNDAwcHg7XHJcblx0Ym9yZGVyLXJhZGl1czogNTAlO1xyXG5cdGJhY2tncm91bmQ6ICNlYmFhMjY7XHJcblx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdHotaW5kZXg6IDE7XHJcblx0dG9wOiAyMDBweDtcclxuXHRyaWdodDogMDtcclxuXHRhbmltYXRpb246IDhzIGJpZ21vdmUgaW5maW5pdGU7XHJcblx0LXdlYmtpdC1hbmltYXRpb246IDhzIGJpZ21vdmUgaW5maW5pdGU7XHJcblx0YW5pbWF0aW9uLWRlbGF5OiAzcztcclxuXHQtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMXM7XHJcbn1cclxuXHJcbkAtd2Via2l0LWtleWZyYW1lcyBzbWFsbG1vdmUge1xyXG5cdDAlIHsgdG9wOiAxMHB4OyBsZWZ0OiA0NSU7IG9wYWNpdHk6IDE7IH1cclxuXHQyNSUgeyB0b3A6IDMwMHB4OyBsZWZ0OiA0MCU7IG9wYWNpdHk6MC43OyB9XHJcblx0NTAlIHsgdG9wOiAyNDBweDsgbGVmdDogNTUlOyBvcGFjaXR5OjAuNDsgfVxyXG5cdDc1JSB7IHRvcDogMTAwcHg7IGxlZnQ6IDQwJTsgIG9wYWNpdHk6MC42OyB9XHJcblx0MTAwJSB7IHRvcDogMTBweDsgbGVmdDogNDUlOyBvcGFjaXR5OiAxOyB9XHJcbn1cclxuQGtleWZyYW1lcyBzbWFsbG1vdmUge1xyXG5cdDAlIHsgdG9wOiAxMHB4OyBsZWZ0OiA0NSU7IG9wYWNpdHk6IDE7IH1cclxuXHQyNSUgeyB0b3A6IDMwMHB4OyBsZWZ0OiA0MCU7IG9wYWNpdHk6MC43OyB9XHJcblx0NTAlIHsgdG9wOiAyNDBweDsgbGVmdDogNTUlOyBvcGFjaXR5OjAuNDsgfVxyXG5cdDc1JSB7IHRvcDogMTAwcHg7IGxlZnQ6IDQwJTsgIG9wYWNpdHk6MC42OyB9XHJcblx0MTAwJSB7IHRvcDogMTBweDsgbGVmdDogNDUlOyBvcGFjaXR5OiAxOyB9XHJcbn1cclxuXHJcbkAtd2Via2l0LWtleWZyYW1lcyBtZWRtb3ZlIHtcclxuXHQwJSB7IHRvcDogMHB4OyBsZWZ0OiAyMCU7IG9wYWNpdHk6IDE7IH1cclxuXHQyNSUgeyB0b3A6IDMwMHB4OyBsZWZ0OiA4MCU7IG9wYWNpdHk6MC43OyB9XHJcblx0NTAlIHsgdG9wOiAyNDBweDsgbGVmdDogNTUlOyBvcGFjaXR5OjAuNDsgfVxyXG5cdDc1JSB7IHRvcDogMTAwcHg7IGxlZnQ6IDQwJTsgIG9wYWNpdHk6MC42OyB9XHJcblx0MTAwJSB7IHRvcDogMHB4OyBsZWZ0OiAyMCU7IG9wYWNpdHk6IDE7IH1cclxufVxyXG5cclxuQGtleWZyYW1lcyBtZWRtb3ZlIHtcclxuXHQwJSB7IHRvcDogMHB4OyBsZWZ0OiAyMCU7IG9wYWNpdHk6IDE7IH1cclxuXHQyNSUgeyB0b3A6IDMwMHB4OyBsZWZ0OiA4MCU7IG9wYWNpdHk6MC43OyB9XHJcblx0NTAlIHsgdG9wOiAyNDBweDsgbGVmdDogNTUlOyBvcGFjaXR5OjAuNDsgfVxyXG5cdDc1JSB7IHRvcDogMTAwcHg7IGxlZnQ6IDQwJTsgIG9wYWNpdHk6MC42OyB9XHJcblx0MTAwJSB7IHRvcDogMHB4OyBsZWZ0OiAyMCU7IG9wYWNpdHk6IDE7IH1cclxufVxyXG5cclxuQC13ZWJraXQta2V5ZnJhbWVzIGJpZ21vdmUge1xyXG5cdDAlIHsgdG9wOiAwcHg7IHJpZ2h0OiA0JTsgb3BhY2l0eTogMC41OyB9XHJcblx0MjUlIHsgdG9wOiAxMDBweDsgcmlnaHQ6IDQwJTsgb3BhY2l0eTowLjQ7IH1cclxuXHQ1MCUgeyB0b3A6IDI0MHB4OyByaWdodDogNDUlOyBvcGFjaXR5OjAuODsgfVxyXG5cdDc1JSB7IHRvcDogMTAwcHg7IHJpZ2h0OiAzNSU7ICBvcGFjaXR5OjAuNjsgfVxyXG5cdDEwMCUgeyB0b3A6IDBweDsgcmlnaHQ6IDQlOyBvcGFjaXR5OiAwLjU7IH1cclxufVxyXG5Aa2V5ZnJhbWVzIGJpZ21vdmUge1xyXG5cdDAlIHsgdG9wOiAwcHg7IHJpZ2h0OiA0JTsgb3BhY2l0eTogMC41OyB9XHJcblx0MjUlIHsgdG9wOiAxMDBweDsgcmlnaHQ6IDQwJTsgb3BhY2l0eTowLjQ7IH1cclxuXHQ1MCUgeyB0b3A6IDI0MHB4OyByaWdodDogNDUlOyBvcGFjaXR5OjAuODsgfVxyXG5cdDc1JSB7IHRvcDogMTAwcHg7IHJpZ2h0OiAzNSU7ICBvcGFjaXR5OjAuNjsgfVxyXG5cdDEwMCUgeyB0b3A6IDBweDsgcmlnaHQ6IDQlOyBvcGFjaXR5OiAwLjU7IH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ },

/***/ 90077
/*!*************************************************************!*\
  !*** ./src/app/features/store/catalog/catalog.selectors.ts ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   selectAllCategories: () => (/* binding */ selectAllCategories),
/* harmony export */   selectCatalogLoaded: () => (/* binding */ selectCatalogLoaded),
/* harmony export */   selectCatalogLoading: () => (/* binding */ selectCatalogLoading),
/* harmony export */   selectCatalogState: () => (/* binding */ selectCatalogState),
/* harmony export */   selectHasCatalogItemsFor: () => (/* binding */ selectHasCatalogItemsFor),
/* harmony export */   selectItemsByCategory: () => (/* binding */ selectItemsByCategory),
/* harmony export */   selectPublishedCategories: () => (/* binding */ selectPublishedCategories)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ 81383);

function selectCatalogState(state) {
  return state.catalog;
}
const selectAllCategories = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectCatalogState, catalog => catalog.categories);
const selectPublishedCategories = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectAllCategories, categories => categories.filter(c => c.published));
const selectCatalogLoaded = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectCatalogState, catalog => catalog.loaded);
const selectCatalogLoading = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectCatalogState, catalog => catalog.loading);
const selectItemsByCategory = categoryId => (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectCatalogState, catalog => catalog.itemsByCategory[categoryId] ?? []);
/** Retourne true si le catalog Firebase contient au moins un item publié pour cette catégorie. */
const selectHasCatalogItemsFor = categoryId => (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectCatalogState, catalog => (catalog.itemsByCategory[categoryId]?.length ?? 0) > 0);

/***/ },

/***/ 92570
/*!*************************************************************!*\
  !*** ./src/app/core/local-storage/local-storage.service.ts ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LocalStorageService: () => (/* binding */ LocalStorageService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 11817);

const APP_PREFIX = 'app-';
class LocalStorageService {
  constructor() {}
  static loadInitialState() {
    return Object.keys(localStorage).reduce((state, storageKey) => {
      if (storageKey.includes(APP_PREFIX)) {
        state = state || {};
        const stateKey = storageKey.replace(APP_PREFIX, '').toLowerCase().split('.');
        let currentStateRef = state;
        stateKey.forEach((key, index) => {
          if (index === stateKey.length - 1) {
            try {
              const storedValue = localStorage.getItem(storageKey);
              if (storedValue !== null) {
                currentStateRef[key] = JSON.parse(storedValue);
              }
            } catch (e) {}
            return;
          }
          currentStateRef[key] = currentStateRef[key] || {};
          currentStateRef = currentStateRef[key];
        });
      }
      return state;
    }, undefined);
  }
  setItem(key, value) {
    if (typeof value !== 'undefined') {
      localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }
  getItem(key) {
    const storedValue = localStorage.getItem(`${APP_PREFIX}${key}`);
    return storedValue ? JSON.parse(storedValue) : null;
  }
  clearAll() {
    localStorage.clear();
  }
  static {
    this.ɵfac = function LocalStorageService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || LocalStorageService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: LocalStorageService,
      factory: LocalStorageService.ɵfac
    });
  }
}

/***/ },

/***/ 92829
/*!************************************************************!*\
  !*** ./src/app/shared/components/flags/flags.component.ts ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FlagsComponent: () => (/* binding */ FlagsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 36124);

class FlagsComponent {
  constructor() {}
  ngOnInit() {}
  static {
    this.ɵfac = function FlagsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || FlagsComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: FlagsComponent,
      selectors: [["app-flags"]],
      standalone: false,
      decls: 46,
      vars: 0,
      consts: [["aria-labelledby", "dropdownMenu1", 1, "dropdown-menu", "text-left"], ["href", "#", "data-value", "action"], [1, "ml-2", "label", "label-default"], [1, "flag-icon", "flag-icon-gr"], ["href", "#", "data-value", "another action"], [1, "ml-2", "flag-icon", "flag-icon-fr"], ["href", "#", "data-value", "something else here"], [1, "ml-2", "flag-icon", "flag-icon-us"], ["href", "#", "data-value", "separated link"], [1, "ml-2", "flag-icon", "flag-icon-es"], ["id", "navbar2SupportedContent", 1, "container-fluid", "navbar-nav", "js-signin-modal-trigger", "justify-content-end", "list-unstyled"], [1, "dropdown"], ["type", "button", "id", "dropdownMenu1", "data-toggle", "dropdown", "aria-haspopup", "true", "aria-expanded", "true", 1, "bg-light", "btn", "btn-default", "dropdown-toggle", "mx-0"]],
      template: function FlagsComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ul", 0)(1, "li")(2, "a", 1)(3, "span", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "span", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Greece");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "li")(7, "a", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "span", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "France");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "li")(12, "a", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "span", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "United States");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "li")(17, "a", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "span", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, " Espa\u00F1a");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "ul", 10)(22, "li", 11)(23, "a", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "span", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "ul", 0)(26, "li")(27, "a", 1)(28, "span", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "span", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Greece");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "li")(32, "a", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "span", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "France");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "li")(37, "a", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "span", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "United States");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "li")(42, "a", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](43, "span", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, " Espa\u00F1a");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()();
        }
      },
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 93887
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SharedModule: () => (/* binding */ SharedModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 79748);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 46264);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 48418);
/* harmony import */ var _angular_google_maps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/google-maps */ 33428);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/checkbox */ 97024);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 93840);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/sidenav */ 17049);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/list */ 20943);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/toolbar */ 39552);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/dialog */ 12587);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/snack-bar */ 3347);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _components_contact_contact_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/contact/contact.component */ 7957);
/* harmony import */ var _components_about_about_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/about/about.component */ 49949);
/* harmony import */ var _components_modal_portfolio16_portfolio16_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/modal/portfolio16/portfolio16.component */ 48239);
/* harmony import */ var _components_modal_portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/modal/portfolio/portfolio.component */ 60315);
/* harmony import */ var _components_modal_portfolio15_portfolio15_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/modal/portfolio15/portfolio15.component */ 3547);
/* harmony import */ var _components_header_header_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/header/header.component */ 89381);
/* harmony import */ var _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/footer/footer.component */ 71765);
/* harmony import */ var _components_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/not-found/not-found.component */ 90013);
/* harmony import */ var _components_portfolio_list_portfolio_list_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/portfolio-list/portfolio-list.component */ 63029);
/* harmony import */ var _components_portfolio_item_portfolio_item_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/portfolio-item/portfolio-item.component */ 40887);
/* harmony import */ var _components_map_template_map_template_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./components/map-template/map-template.component */ 8197);
/* harmony import */ var _components_advertisements_ad_banner_ad_banner_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components/advertisements/ad-banner/ad-banner.component */ 40508);
/* harmony import */ var _components_advertisements_details_hero_job_add_hero_job_ad_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/advertisements/details/hero-job-add/hero-job-ad.component */ 8557);
/* harmony import */ var _components_advertisements_details_hero_profile_hero_profile_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components/advertisements/details/hero-profile/hero-profile.component */ 78983);
/* harmony import */ var _components_advertisements_details_ad_header_ad_header_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/advertisements/details/ad-header/ad-header.component */ 43137);
/* harmony import */ var _components_advertisements_ad_item_ad_item_component2_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./components/advertisements/ad-item/ad-item-component2.component */ 47160);
/* harmony import */ var _components_icone_divider_icone_divider_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./components/icone-divider/icone-divider.component */ 99905);
/* harmony import */ var _components_navigation_navigation_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./components/navigation/navigation.component */ 75839);
/* harmony import */ var _components_alert_alert_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./components/alert/alert.component */ 44605);
/* harmony import */ var _components_snack_alert_snack_alert_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./components/snack-alert/snack-alert.component */ 22785);
/* harmony import */ var _components_category_buttons_category_buttons_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./components/category-buttons/category-buttons.component */ 28379);
/* harmony import */ var _components_item_details_item_details_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./components/item-details/item-details.component */ 18675);
/* harmony import */ var _components_flags_flags_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./components/flags/flags.component */ 92829);
/* harmony import */ var _components_currency_selector_currency_selector_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./components/currency-selector/currency-selector.component */ 29477);
/* harmony import */ var _directives_ad_directive__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./directives/ad.directive */ 12687);
/* harmony import */ var _shared_directives_number_only_number_only_directive__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @shared/directives/number-only/number-only.directive */ 40497);
/* harmony import */ var _shared_pipes_enum_to_array_enum_to_array_pipe__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @shared/pipes/enum-to-array/enum-to-array.pipe */ 75577);
/* harmony import */ var _shared_pipes__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @shared/pipes */ 1900);
/* harmony import */ var _shared_pipes_truncate_pipe_truncate_pipe__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @shared/pipes/truncate-pipe/truncate.pipe */ 53610);
/* harmony import */ var _services_ad_service__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./services/ad.service */ 28519);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! @angular/core */ 36124);














































class SharedModule {
  static {
    this.ɵfac = function SharedModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || SharedModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_44__["ɵɵdefineNgModule"]({
      type: SharedModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_43__["ɵɵdefineInjector"]({
      providers: [_services_ad_service__WEBPACK_IMPORTED_MODULE_42__.AdService],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.ReactiveFormsModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule,
      // UI libs
      _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbTooltipModule, _angular_google_maps__WEBPACK_IMPORTED_MODULE_4__.GoogleMapsModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbCarouselModule,
      // Material
      _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__.MatCheckboxModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIconModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_7__.MatSidenavModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_8__.MatListModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__.MatToolbarModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__.MatDialogModule, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_11__.MatSnackBarModule,
      // i18n
      _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslateModule, _angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule,
      // Angular
      _angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.ReactiveFormsModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule,
      // UI libs
      _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbTooltipModule, _angular_google_maps__WEBPACK_IMPORTED_MODULE_4__.GoogleMapsModule,
      // Material (export seulement si utilisé ailleurs)
      _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__.MatCheckboxModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIconModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_7__.MatSidenavModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_8__.MatListModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__.MatToolbarModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__.MatDialogModule, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_11__.MatSnackBarModule,
      // i18n
      _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslateModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_44__["ɵɵsetNgModuleScope"](SharedModule, {
    declarations: [
    // Components
    _components_contact_contact_component__WEBPACK_IMPORTED_MODULE_13__.ContactComponent, _components_about_about_component__WEBPACK_IMPORTED_MODULE_14__.AboutComponent, _components_modal_portfolio16_portfolio16_component__WEBPACK_IMPORTED_MODULE_15__.Portfolio16Component, _components_modal_portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_16__.PortfolioComponent, _components_modal_portfolio15_portfolio15_component__WEBPACK_IMPORTED_MODULE_17__.Portfolio15Component, _components_header_header_component__WEBPACK_IMPORTED_MODULE_18__.HeaderComponent, _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_19__.FooterComponent, _components_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_20__.NotFoundComponent, _components_portfolio_list_portfolio_list_component__WEBPACK_IMPORTED_MODULE_21__.PortfolioListComponent, _components_portfolio_item_portfolio_item_component__WEBPACK_IMPORTED_MODULE_22__.PortfolioItemComponent, _components_map_template_map_template_component__WEBPACK_IMPORTED_MODULE_23__.MapTemplateComponent, _components_advertisements_ad_banner_ad_banner_component__WEBPACK_IMPORTED_MODULE_24__.AdBannerComponent, _directives_ad_directive__WEBPACK_IMPORTED_MODULE_37__.AdDirective, _components_advertisements_details_hero_job_add_hero_job_ad_component__WEBPACK_IMPORTED_MODULE_25__.HeroJobAdComponent, _components_advertisements_details_hero_profile_hero_profile_component__WEBPACK_IMPORTED_MODULE_26__.HeroProfileComponent, _components_advertisements_details_ad_header_ad_header_component__WEBPACK_IMPORTED_MODULE_27__.AdHeaderComponent, _components_advertisements_ad_item_ad_item_component2_component__WEBPACK_IMPORTED_MODULE_28__.AdItemComponent2, _components_icone_divider_icone_divider_component__WEBPACK_IMPORTED_MODULE_29__.IconeDividerComponent, _components_navigation_navigation_component__WEBPACK_IMPORTED_MODULE_30__.NavigationComponent, _components_alert_alert_component__WEBPACK_IMPORTED_MODULE_31__.AlertComponent, _components_snack_alert_snack_alert_component__WEBPACK_IMPORTED_MODULE_32__.SnackAlertComponent, _components_category_buttons_category_buttons_component__WEBPACK_IMPORTED_MODULE_33__.CategoryButtonsComponent, _components_item_details_item_details_component__WEBPACK_IMPORTED_MODULE_34__.ItemDetailsComponent, _components_flags_flags_component__WEBPACK_IMPORTED_MODULE_35__.FlagsComponent, _components_currency_selector_currency_selector_component__WEBPACK_IMPORTED_MODULE_36__.CurrencySelectorComponent,
    // Pipes & directives
    _shared_pipes_enum_to_array_enum_to_array_pipe__WEBPACK_IMPORTED_MODULE_39__.EnumToArrayPipe, _shared_pipes__WEBPACK_IMPORTED_MODULE_40__.PatternTransformPipe, _shared_pipes__WEBPACK_IMPORTED_MODULE_40__.TextTransformPipe, _shared_pipes_truncate_pipe_truncate_pipe__WEBPACK_IMPORTED_MODULE_41__.TruncatePipe, _shared_directives_number_only_number_only_directive__WEBPACK_IMPORTED_MODULE_38__.NumberOnlyDirective],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.ReactiveFormsModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule,
    // UI libs
    _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbTooltipModule, _angular_google_maps__WEBPACK_IMPORTED_MODULE_4__.GoogleMapsModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbCarouselModule,
    // Material
    _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__.MatCheckboxModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIconModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_7__.MatSidenavModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_8__.MatListModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__.MatToolbarModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__.MatDialogModule, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_11__.MatSnackBarModule,
    // i18n
    _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslateModule, _angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule],
    exports: [
    // Angular
    _angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.ReactiveFormsModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule,
    // UI libs
    _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbTooltipModule, _angular_google_maps__WEBPACK_IMPORTED_MODULE_4__.GoogleMapsModule,
    // Material (export seulement si utilisé ailleurs)
    _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__.MatCheckboxModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIconModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_7__.MatSidenavModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_8__.MatListModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__.MatToolbarModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__.MatDialogModule, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_11__.MatSnackBarModule,
    // i18n
    _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslateModule,
    // Components to reuse
    _components_contact_contact_component__WEBPACK_IMPORTED_MODULE_13__.ContactComponent, _components_about_about_component__WEBPACK_IMPORTED_MODULE_14__.AboutComponent, _components_modal_portfolio16_portfolio16_component__WEBPACK_IMPORTED_MODULE_15__.Portfolio16Component, _components_modal_portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_16__.PortfolioComponent, _components_modal_portfolio15_portfolio15_component__WEBPACK_IMPORTED_MODULE_17__.Portfolio15Component, _components_header_header_component__WEBPACK_IMPORTED_MODULE_18__.HeaderComponent, _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_19__.FooterComponent, _components_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_20__.NotFoundComponent, _components_portfolio_list_portfolio_list_component__WEBPACK_IMPORTED_MODULE_21__.PortfolioListComponent, _components_portfolio_item_portfolio_item_component__WEBPACK_IMPORTED_MODULE_22__.PortfolioItemComponent, _components_map_template_map_template_component__WEBPACK_IMPORTED_MODULE_23__.MapTemplateComponent, _components_advertisements_ad_banner_ad_banner_component__WEBPACK_IMPORTED_MODULE_24__.AdBannerComponent, _directives_ad_directive__WEBPACK_IMPORTED_MODULE_37__.AdDirective, _components_advertisements_details_hero_job_add_hero_job_ad_component__WEBPACK_IMPORTED_MODULE_25__.HeroJobAdComponent, _components_advertisements_details_hero_profile_hero_profile_component__WEBPACK_IMPORTED_MODULE_26__.HeroProfileComponent, _components_advertisements_details_ad_header_ad_header_component__WEBPACK_IMPORTED_MODULE_27__.AdHeaderComponent, _components_advertisements_ad_item_ad_item_component2_component__WEBPACK_IMPORTED_MODULE_28__.AdItemComponent2, _components_icone_divider_icone_divider_component__WEBPACK_IMPORTED_MODULE_29__.IconeDividerComponent, _components_navigation_navigation_component__WEBPACK_IMPORTED_MODULE_30__.NavigationComponent, _components_alert_alert_component__WEBPACK_IMPORTED_MODULE_31__.AlertComponent, _components_snack_alert_snack_alert_component__WEBPACK_IMPORTED_MODULE_32__.SnackAlertComponent, _components_category_buttons_category_buttons_component__WEBPACK_IMPORTED_MODULE_33__.CategoryButtonsComponent, _components_item_details_item_details_component__WEBPACK_IMPORTED_MODULE_34__.ItemDetailsComponent, _components_flags_flags_component__WEBPACK_IMPORTED_MODULE_35__.FlagsComponent, _components_currency_selector_currency_selector_component__WEBPACK_IMPORTED_MODULE_36__.CurrencySelectorComponent,
    // Pipes & directives to reuse
    _shared_pipes_enum_to_array_enum_to_array_pipe__WEBPACK_IMPORTED_MODULE_39__.EnumToArrayPipe, _shared_pipes__WEBPACK_IMPORTED_MODULE_40__.PatternTransformPipe, _shared_pipes__WEBPACK_IMPORTED_MODULE_40__.TextTransformPipe, _shared_pipes_truncate_pipe_truncate_pipe__WEBPACK_IMPORTED_MODULE_41__.TruncatePipe, _shared_directives_number_only_number_only_directive__WEBPACK_IMPORTED_MODULE_38__.NumberOnlyDirective]
  });
})();
_angular_core__WEBPACK_IMPORTED_MODULE_44__["ɵɵsetComponentScope"](_components_portfolio_list_portfolio_list_component__WEBPACK_IMPORTED_MODULE_21__.PortfolioListComponent, [_angular_common__WEBPACK_IMPORTED_MODULE_0__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_0__.NgIf, _components_category_buttons_category_buttons_component__WEBPACK_IMPORTED_MODULE_33__.CategoryButtonsComponent, _components_currency_selector_currency_selector_component__WEBPACK_IMPORTED_MODULE_36__.CurrencySelectorComponent], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslatePipe]);

/***/ },

/***/ 94114
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppRoutingModule: () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 79748);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 46264);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 48418);
/* harmony import */ var _route_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./route.model */ 36340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 36124);







class AppRoutingModule {
  static {
    this.ɵfac = function AppRoutingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AppRoutingModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
      type: AppRoutingModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
      imports: [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbModule, _angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormsModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forRoot(_route_model__WEBPACK_IMPORTED_MODULE_4__.routes, {
        initialNavigation: 'enabledBlocking',
        scrollPositionRestoration: 'top'
      }), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](AppRoutingModule, {
    imports: [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbModule, _angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormsModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ },

/***/ 94896
/*!******************************************************!*\
  !*** ./src/app/core/interceptors/api.interceptor.ts ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   XTokenInterceptor: () => (/* binding */ XTokenInterceptor)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ 81383);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 50698);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 98764);
/* harmony import */ var _env_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @env/environment */ 45312);
/* harmony import */ var _helpers_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @helpers/constants */ 4245);
/* harmony import */ var _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @app/auth/store/auth.actions */ 2520);
/* harmony import */ var _app_auth_store_auth_selectors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @app/auth/store/auth.selectors */ 2981);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/snack-bar */ 3347);










class XTokenInterceptor {
  constructor(store, snackbar, appConfig) {
    this.store = store;
    this.snackbar = snackbar;
    this.X_TOKEN = undefined;
    this.API_PREFIX = '/api';
    this.snackBarDuration = appConfig.snackDuration;
    this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.select)(_app_auth_store_auth_selectors__WEBPACK_IMPORTED_MODULE_6__.selectorAuth)).subscribe(state => {
      if (state) {
        this.X_TOKEN = state?.user?.token;
      } else {
        this.X_TOKEN = undefined;
      }
    });
  }
  intercept(req, next) {
    const headers = {};
    if (this.X_TOKEN) {
      headers['X-AUTH-TOKEN'] = this.X_TOKEN;
    }
    return next.handle(req.clone({
      url: `${this.API_PREFIX}${req.url}`,
      setHeaders: headers
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => {}, err => {
      if (err instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpErrorResponse) {
        switch (err.status) {
          case 401:
            this.store.dispatch(new _app_auth_store_auth_actions__WEBPACK_IMPORTED_MODULE_5__.ActionAuthLoggedOut());
            break;
          case 500:
            if (_env_environment__WEBPACK_IMPORTED_MODULE_3__.environment && _env_environment__WEBPACK_IMPORTED_MODULE_3__.environment.envName !== "PROD" /* ENV_TYPES.PROD */) {
              this.snackbar.open(_helpers_constants__WEBPACK_IMPORTED_MODULE_4__.TECHNICAL_EXCEPTION_MSG, '', {
                duration: this.snackBarDuration
              });
            }
            break;
        }
      }
    }));
  }
  static {
    this.ɵfac = function XTokenInterceptor_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || XTokenInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_8__.MatSnackBar), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_helpers_constants__WEBPACK_IMPORTED_MODULE_4__.APP_CONFIG));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
      token: XTokenInterceptor,
      factory: XTokenInterceptor.ɵfac
    });
  }
}

/***/ },

/***/ 95168
/*!***********************************************************!*\
  !*** ./src/app/features/store/catalog/catalog.actions.ts ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CatalogActionTypes: () => (/* binding */ CatalogActionTypes),
/* harmony export */   CatalogLoadCategories: () => (/* binding */ CatalogLoadCategories),
/* harmony export */   CatalogLoadCategoriesError: () => (/* binding */ CatalogLoadCategoriesError),
/* harmony export */   CatalogLoadCategoriesSuccess: () => (/* binding */ CatalogLoadCategoriesSuccess),
/* harmony export */   CatalogLoadItemsForCategory: () => (/* binding */ CatalogLoadItemsForCategory),
/* harmony export */   CatalogLoadItemsForCategoryError: () => (/* binding */ CatalogLoadItemsForCategoryError),
/* harmony export */   CatalogLoadItemsForCategorySuccess: () => (/* binding */ CatalogLoadItemsForCategorySuccess)
/* harmony export */ });
var CatalogActionTypes;
(function (CatalogActionTypes) {
  CatalogActionTypes["LOAD_CATEGORIES"] = "[CATALOG] Load categories";
  CatalogActionTypes["LOAD_CATEGORIES_SUCCESS"] = "[CATALOG] Load categories success";
  CatalogActionTypes["LOAD_CATEGORIES_ERROR"] = "[CATALOG] Load categories error";
  CatalogActionTypes["LOAD_ITEMS_FOR_CATEGORY"] = "[CATALOG] Load items for category";
  CatalogActionTypes["LOAD_ITEMS_FOR_CATEGORY_SUCCESS"] = "[CATALOG] Load items for category success";
  CatalogActionTypes["LOAD_ITEMS_FOR_CATEGORY_ERROR"] = "[CATALOG] Load items for category error";
})(CatalogActionTypes || (CatalogActionTypes = {}));
class CatalogLoadCategories {
  constructor() {
    this.type = CatalogActionTypes.LOAD_CATEGORIES;
  }
}
class CatalogLoadCategoriesSuccess {
  constructor(payload) {
    this.payload = payload;
    this.type = CatalogActionTypes.LOAD_CATEGORIES_SUCCESS;
  }
}
class CatalogLoadCategoriesError {
  constructor(payload) {
    this.payload = payload;
    this.type = CatalogActionTypes.LOAD_CATEGORIES_ERROR;
  }
}
class CatalogLoadItemsForCategory {
  constructor(payload) {
    this.payload = payload;
    this.type = CatalogActionTypes.LOAD_ITEMS_FOR_CATEGORY;
  }
}
class CatalogLoadItemsForCategorySuccess {
  constructor(payload) {
    this.payload = payload;
    this.type = CatalogActionTypes.LOAD_ITEMS_FOR_CATEGORY_SUCCESS;
  }
}
class CatalogLoadItemsForCategoryError {
  constructor(payload) {
    this.payload = payload;
    this.type = CatalogActionTypes.LOAD_ITEMS_FOR_CATEGORY_ERROR;
  }
}

/***/ },

/***/ 95874
/*!***********************************************!*\
  !*** ./src/app/shared/helpers/store.utils.ts ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findItemByReference: () => (/* binding */ findItemByReference),
/* harmony export */   toogleSelectItem: () => (/* binding */ toogleSelectItem),
/* harmony export */   updateItemBasketInfos: () => (/* binding */ updateItemBasketInfos),
/* harmony export */   updateItemState: () => (/* binding */ updateItemState)
/* harmony export */ });
/* harmony import */ var _shared_interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/interfaces */ 40787);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ 46227);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);


function findItemByReference(items, reference) {
  return items.find(e => e.reference === reference);
}
function updateItemBasketInfos(state, itemToUpdateRawValue) {
  const stateCopy = lodash__WEBPACK_IMPORTED_MODULE_1__.cloneDeep(state);
  const key = itemToUpdateRawValue.category?.toLowerCase?.() ?? '';
  let category = stateCopy.categories[key];
  if (!category) {
    // Catégorie non trouvée par clé : cherche l'item par référence dans toutes les catégories
    for (const cat of Object.values(stateCopy.categories)) {
      const found = cat.items.find(i => i.reference === itemToUpdateRawValue.reference);
      if (found) {
        category = cat;
        break;
      }
    }
  }
  if (!category) return state;
  const foundItem = category.items.find(item => item.reference === itemToUpdateRawValue.reference);
  if (foundItem) {
    foundItem.basketInfos.selectedQuantity = Math.max(1, itemToUpdateRawValue.basketInfos?.selectedQuantity ?? 1);
    foundItem.basketInfos.selectedModel = itemToUpdateRawValue.basketInfos.selectedModel;
    foundItem.basketInfos.selectedSize = _shared_interfaces__WEBPACK_IMPORTED_MODULE_0__.ItemSizeEnum[itemToUpdateRawValue.basketInfos.selectedSize] ?? itemToUpdateRawValue.basketInfos.selectedSize;
    foundItem.selected = itemToUpdateRawValue?.selected ?? true;
  }
  return stateCopy;
}
function toogleSelectItem(state, anItem, forceSelect) {
  const key = anItem.category?.toLowerCase?.() ?? '';
  let category;
  if (state.categories[key]) {
    category = lodash__WEBPACK_IMPORTED_MODULE_1__.cloneDeep(state.categories[key]);
  } else {
    // Catégorie non trouvée : cherche par référence dans toutes les catégories
    for (const [, cat] of Object.entries(state.categories)) {
      if (cat.items.find(i => i.reference === anItem.reference)) {
        category = lodash__WEBPACK_IMPORTED_MODULE_1__.cloneDeep(cat);
        break;
      }
    }
  }
  if (!category) return state;
  const foundItem = findItemByReference(category.items || [], anItem.reference);
  if (foundItem) {
    foundItem.selected = forceSelect ? true : !foundItem.selected;
  }
  return updateItemState(state, category);
}
function updateItemState(state, category, overrideExisting = true) {
  if (!category) return state;
  const key = category.name;
  const existing = state.categories[key];
  if (existing && existing.items.length > 0 && !overrideExisting) {
    return state;
  }
  return {
    categories: {
      ...state.categories,
      [key]: category
    }
  };
}

/***/ },

/***/ 97823
/*!********************************************!*\
  !*** ./src/app/core/guards/admin.guard.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminGuard: () => (/* binding */ AdminGuard)
/* harmony export */ });
/* harmony import */ var C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/fire/auth */ 99082);
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/database */ 41559);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 56196);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 64334);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 83305);









/**
 * Guard qui vérifie que l'utilisateur connecté est présent dans admins/{uid}.
 * Utilise le SDK Firebase modular (même instance que le reste de l'app).
 */
class AdminGuard {
  constructor(router, auth, db) {
    this.router = router;
    this.auth = auth;
    this.db = db;
  }
  canActivate(_next, _state) {
    var _this = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const user = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.firstValueFrom)((0,_angular_fire_auth__WEBPACK_IMPORTED_MODULE_1__.authState)(_this.auth).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.filter)(u => u !== undefined), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.take)(1)));
      if (!user) {
        _this.router.navigateByUrl('/auth/signin');
        return false;
      }
      try {
        const snap = yield (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_2__.get)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_2__.ref)(_this.db, `admins/${user.uid}`));
        if (snap.exists()) return true;
        _this.router.navigateByUrl('/home');
        return false;
      } catch (e) {
        console.error('[AdminGuard] Erreur lecture DB:', e);
        _this.router.navigateByUrl('/home');
        return false;
      }
    })();
  }
  static {
    this.ɵfac = function AdminGuard_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AdminGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_fire_auth__WEBPACK_IMPORTED_MODULE_1__.Auth), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_fire_database__WEBPACK_IMPORTED_MODULE_2__.Database));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
      token: AdminGuard,
      factory: AdminGuard.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ },

/***/ 99905
/*!****************************************************************************!*\
  !*** ./src/app/shared/components/icone-divider/icone-divider.component.ts ***!
  \****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconeDividerComponent: () => (/* binding */ IconeDividerComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 36124);

class IconeDividerComponent {
  constructor() {}
  ngOnInit() {}
  static {
    this.ɵfac = function IconeDividerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || IconeDividerComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: IconeDividerComponent,
      selectors: [["app-icone-divider"]],
      standalone: false,
      decls: 5,
      vars: 0,
      consts: [[1, "divider-custom", "divider-light"], [1, "divider-custom-line"], [1, "divider-custom-icon"], [1, "fas", "fa-star"]],
      template: function IconeDividerComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "i", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      },
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(84429)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map