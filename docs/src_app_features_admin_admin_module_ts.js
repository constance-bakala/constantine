"use strict";
(self["webpackChunkconstantine"] = self["webpackChunkconstantine"] || []).push([["src_app_features_admin_admin_module_ts"],{

/***/ 11349
/*!************************************************************************!*\
  !*** ./node_modules/@angular/cdk/fesm2022/_tree-key-manager-chunk.mjs ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TREE_KEY_MANAGER: () => (/* binding */ TREE_KEY_MANAGER),
/* harmony export */   TreeKeyManager: () => (/* binding */ TreeKeyManager)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 10819);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 2510);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 72551);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 59452);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 64334);
/* harmony import */ var _typeahead_chunk_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./_typeahead-chunk.mjs */ 21920);
/* harmony import */ var _coercion_private_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./coercion-private.mjs */ 86576);





class TreeKeyManager {
  _activeItemIndex = -1;
  _activeItem = null;
  _shouldActivationFollowFocus = false;
  _horizontalOrientation = 'ltr';
  _skipPredicateFn = _item => false;
  _trackByFn = item => item;
  _items = [];
  _typeahead;
  _typeaheadSubscription = rxjs__WEBPACK_IMPORTED_MODULE_3__.Subscription.EMPTY;
  _hasInitialFocused = false;
  _initializeFocus() {
    if (this._hasInitialFocused || this._items.length === 0) {
      return;
    }
    let activeIndex = 0;
    for (let i = 0; i < this._items.length; i++) {
      if (!this._skipPredicateFn(this._items[i]) && !this._isItemDisabled(this._items[i])) {
        activeIndex = i;
        break;
      }
    }
    const activeItem = this._items[activeIndex];
    if (activeItem.makeFocusable) {
      this._activeItem?.unfocus();
      this._activeItemIndex = activeIndex;
      this._activeItem = activeItem;
      this._typeahead?.setCurrentSelectedItemIndex(activeIndex);
      activeItem.makeFocusable();
    } else {
      this.focusItem(activeIndex);
    }
    this._hasInitialFocused = true;
  }
  constructor(items, config) {
    if (items instanceof _angular_core__WEBPACK_IMPORTED_MODULE_1__.QueryList) {
      this._items = items.toArray();
      items.changes.subscribe(newItems => {
        this._items = newItems.toArray();
        this._typeahead?.setItems(this._items);
        this._updateActiveItemIndex(this._items);
        this._initializeFocus();
      });
    } else if ((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.isObservable)(items)) {
      items.subscribe(newItems => {
        this._items = newItems;
        this._typeahead?.setItems(newItems);
        this._updateActiveItemIndex(newItems);
        this._initializeFocus();
      });
    } else {
      this._items = items;
      this._initializeFocus();
    }
    if (typeof config.shouldActivationFollowFocus === 'boolean') {
      this._shouldActivationFollowFocus = config.shouldActivationFollowFocus;
    }
    if (config.horizontalOrientation) {
      this._horizontalOrientation = config.horizontalOrientation;
    }
    if (config.skipPredicate) {
      this._skipPredicateFn = config.skipPredicate;
    }
    if (config.trackBy) {
      this._trackByFn = config.trackBy;
    }
    if (typeof config.typeAheadDebounceInterval !== 'undefined') {
      this._setTypeAhead(config.typeAheadDebounceInterval);
    }
  }
  change = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
  destroy() {
    this._typeaheadSubscription.unsubscribe();
    this._typeahead?.destroy();
    this.change.complete();
  }
  onKeydown(event) {
    const key = event.key;
    switch (key) {
      case 'Tab':
        return;
      case 'ArrowDown':
        this._focusNextItem();
        break;
      case 'ArrowUp':
        this._focusPreviousItem();
        break;
      case 'ArrowRight':
        this._horizontalOrientation === 'rtl' ? this._collapseCurrentItem() : this._expandCurrentItem();
        break;
      case 'ArrowLeft':
        this._horizontalOrientation === 'rtl' ? this._expandCurrentItem() : this._collapseCurrentItem();
        break;
      case 'Home':
        this._focusFirstItem();
        break;
      case 'End':
        this._focusLastItem();
        break;
      case 'Enter':
      case ' ':
        this._activateCurrentItem();
        break;
      default:
        if (event.key === '*') {
          this._expandAllItemsAtCurrentItemLevel();
          break;
        }
        this._typeahead?.handleKey(event);
        return;
    }
    this._typeahead?.reset();
    event.preventDefault();
  }
  getActiveItemIndex() {
    return this._activeItemIndex;
  }
  getActiveItem() {
    return this._activeItem;
  }
  _focusFirstItem() {
    this.focusItem(this._findNextAvailableItemIndex(-1));
  }
  _focusLastItem() {
    this.focusItem(this._findPreviousAvailableItemIndex(this._items.length));
  }
  _focusNextItem() {
    this.focusItem(this._findNextAvailableItemIndex(this._activeItemIndex));
  }
  _focusPreviousItem() {
    this.focusItem(this._findPreviousAvailableItemIndex(this._activeItemIndex));
  }
  focusItem(itemOrIndex, options = {}) {
    options.emitChangeEvent ??= true;
    let index = typeof itemOrIndex === 'number' ? itemOrIndex : this._items.findIndex(item => this._trackByFn(item) === this._trackByFn(itemOrIndex));
    if (index < 0 || index >= this._items.length) {
      return;
    }
    const activeItem = this._items[index];
    if (this._activeItem !== null && this._trackByFn(activeItem) === this._trackByFn(this._activeItem)) {
      return;
    }
    const previousActiveItem = this._activeItem;
    this._activeItem = activeItem ?? null;
    this._activeItemIndex = index;
    this._typeahead?.setCurrentSelectedItemIndex(index);
    this._activeItem?.focus();
    previousActiveItem?.unfocus();
    if (options.emitChangeEvent) {
      this.change.next(this._activeItem);
    }
    if (this._shouldActivationFollowFocus) {
      this._activateCurrentItem();
    }
  }
  _updateActiveItemIndex(newItems) {
    const activeItem = this._activeItem;
    if (!activeItem) {
      return;
    }
    const newIndex = newItems.findIndex(item => this._trackByFn(item) === this._trackByFn(activeItem));
    if (newIndex > -1 && newIndex !== this._activeItemIndex) {
      this._activeItemIndex = newIndex;
      this._typeahead?.setCurrentSelectedItemIndex(newIndex);
    }
  }
  _setTypeAhead(debounceInterval) {
    this._typeahead = new _typeahead_chunk_mjs__WEBPACK_IMPORTED_MODULE_7__.Typeahead(this._items, {
      debounceInterval: typeof debounceInterval === 'number' ? debounceInterval : undefined,
      skipPredicate: item => this._skipPredicateFn(item)
    });
    this._typeaheadSubscription = this._typeahead.selectedItem.subscribe(item => {
      this.focusItem(item);
    });
  }
  _findNextAvailableItemIndex(startingIndex) {
    for (let i = startingIndex + 1; i < this._items.length; i++) {
      if (!this._skipPredicateFn(this._items[i])) {
        return i;
      }
    }
    return startingIndex;
  }
  _findPreviousAvailableItemIndex(startingIndex) {
    for (let i = startingIndex - 1; i >= 0; i--) {
      if (!this._skipPredicateFn(this._items[i])) {
        return i;
      }
    }
    return startingIndex;
  }
  _collapseCurrentItem() {
    if (!this._activeItem) {
      return;
    }
    if (this._isCurrentItemExpanded()) {
      this._activeItem.collapse();
    } else {
      const parent = this._activeItem.getParent();
      if (!parent || this._skipPredicateFn(parent)) {
        return;
      }
      this.focusItem(parent);
    }
  }
  _expandCurrentItem() {
    if (!this._activeItem) {
      return;
    }
    if (!this._isCurrentItemExpanded()) {
      this._activeItem.expand();
    } else {
      (0,_coercion_private_mjs__WEBPACK_IMPORTED_MODULE_8__.coerceObservable)(this._activeItem.getChildren()).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.take)(1)).subscribe(children => {
        const firstChild = children.find(child => !this._skipPredicateFn(child));
        if (!firstChild) {
          return;
        }
        this.focusItem(firstChild);
      });
    }
  }
  _isCurrentItemExpanded() {
    if (!this._activeItem) {
      return false;
    }
    return typeof this._activeItem.isExpanded === 'boolean' ? this._activeItem.isExpanded : this._activeItem.isExpanded();
  }
  _isItemDisabled(item) {
    return typeof item.isDisabled === 'boolean' ? item.isDisabled : item.isDisabled?.();
  }
  _expandAllItemsAtCurrentItemLevel() {
    if (!this._activeItem) {
      return;
    }
    const parent = this._activeItem.getParent();
    let itemsToExpand;
    if (!parent) {
      itemsToExpand = (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(this._items.filter(item => item.getParent() === null));
    } else {
      itemsToExpand = (0,_coercion_private_mjs__WEBPACK_IMPORTED_MODULE_8__.coerceObservable)(parent.getChildren());
    }
    itemsToExpand.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.take)(1)).subscribe(items => {
      for (const item of items) {
        item.expand();
      }
    });
  }
  _activateCurrentItem() {
    this._activeItem?.activate();
  }
}
const TREE_KEY_MANAGER = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('tree-key-manager', {
  providedIn: 'root',
  factory: () => (items, options) => new TreeKeyManager(items, options)
});


/***/ },

/***/ 12041
/*!*******************************************************!*\
  !*** ./node_modules/ngx-quill/fesm2022/ngx-quill.mjs ***!
  \*******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QUILL_CONFIG_TOKEN: () => (/* reexport safe */ ngx_quill_config__WEBPACK_IMPORTED_MODULE_1__.QUILL_CONFIG_TOKEN),
/* harmony export */   QuillConfigModule: () => (/* reexport safe */ ngx_quill_config__WEBPACK_IMPORTED_MODULE_1__.QuillConfigModule),
/* harmony export */   QuillEditorBase: () => (/* binding */ QuillEditorBase),
/* harmony export */   QuillEditorComponent: () => (/* binding */ QuillEditorComponent),
/* harmony export */   QuillModule: () => (/* binding */ QuillModule),
/* harmony export */   QuillService: () => (/* binding */ QuillService),
/* harmony export */   QuillViewComponent: () => (/* binding */ QuillViewComponent),
/* harmony export */   QuillViewHTMLComponent: () => (/* binding */ QuillViewHTMLComponent),
/* harmony export */   defaultModules: () => (/* reexport safe */ ngx_quill_config__WEBPACK_IMPORTED_MODULE_1__.defaultModules),
/* harmony export */   provideQuillConfig: () => (/* reexport safe */ ngx_quill_config__WEBPACK_IMPORTED_MODULE_1__.provideQuillConfig)
/* harmony export */ });
/* harmony import */ var C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var ngx_quill_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-quill/config */ 68676);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 52260);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ 80436);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 49074);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 2510);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 72551);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 137);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 61873);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 18537);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 59452);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs */ 52575);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs/operators */ 13255);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs/operators */ 86301);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! rxjs/operators */ 98764);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/forms */ 34456);


const _c0 = [[["", "above-quill-editor-toolbar", ""]], [["", "quill-editor-toolbar", ""]], [["", "below-quill-editor-toolbar", ""]]];
const _c1 = ["[above-quill-editor-toolbar]", "[quill-editor-toolbar]", "[below-quill-editor-toolbar]"];
function QuillEditorComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdomElement"](0, "div", 0);
  }
}
function QuillEditorComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdomElement"](0, "div", 0);
  }
}









const getFormat = (format, configFormat) => {
  const passedFormat = format || configFormat;
  return passedFormat || 'html';
};
class QuillService {
  constructor() {
    var _this = this;
    this.config = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(ngx_quill_config__WEBPACK_IMPORTED_MODULE_1__.QUILL_CONFIG_TOKEN) || {
      modules: ngx_quill_config__WEBPACK_IMPORTED_MODULE_1__.defaultModules
    };
    this.quill$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.defer)(/*#__PURE__*/(0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this.Quill) {
        const {
          Quill
        } = yield __webpack_require__.e(/*! import() */ "node_modules_ngx-quill_fesm2022_ngx-quill-quill-CUw8Q_m0_mjs").then(__webpack_require__.bind(__webpack_require__, /*! ./ngx-quill-quill-CUw8Q_m0.mjs */ 84104));
        _this.Quill = Quill;
      }
      // Only register custom options and modules once
      _this.config.customOptions?.forEach(customOption => {
        const newCustomOption = _this.Quill.import(customOption.import);
        newCustomOption.whitelist = customOption.whitelist;
        _this.Quill.register(newCustomOption, true, _this.config.suppressGlobalRegisterWarning);
      });
      // Use `Promise` directly to avoid bundling `firstValueFrom`.
      return new Promise(resolve => {
        _this.registerCustomModules(_this.Quill, _this.config.customModules, _this.config.suppressGlobalRegisterWarning).subscribe(resolve);
      });
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_18__.shareReplay)({
      bufferSize: 1,
      refCount: false
    }));
    // A list of custom modules that have already been registered,
    // so we don’t need to await their implementation.
    this.registeredModules = new Set();
  }
  getQuill() {
    return this.quill$;
  }
  /** @internal */
  beforeRender(Quill, customModules, beforeRender = this.config.beforeRender) {
    // This function is called each time the editor needs to be rendered,
    // so it operates individually per component. If no custom module needs to be
    // registered and no `beforeRender` function is provided, it will emit
    // immediately and proceed with the rendering.
    const sources = [this.registerCustomModules(Quill, customModules)];
    if (beforeRender) {
      sources.push(beforeRender());
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.forkJoin)(sources).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)(() => Quill));
  }
  /** @internal */
  registerCustomModules(Quill, customModules, suppressGlobalRegisterWarning) {
    if (!Array.isArray(customModules)) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.of)(Quill);
    }
    const sources = [];
    for (const customModule of customModules) {
      const {
        path,
        implementation: maybeImplementation
      } = customModule;
      // If the module is already registered, proceed to the next module...
      if (this.registeredModules.has(path)) {
        continue;
      }
      this.registeredModules.add(path);
      if ((0,rxjs__WEBPACK_IMPORTED_MODULE_10__.isObservable)(maybeImplementation)) {
        // If the implementation is an observable, we will wait for it to load and
        // then register it with Quill. The caller will wait until the module is registered.
        sources.push(maybeImplementation.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_19__.tap)(implementation => {
          Quill.register(path, implementation, suppressGlobalRegisterWarning);
        })));
      } else {
        Quill.register(path, maybeImplementation, suppressGlobalRegisterWarning);
      }
    }
    return sources.length > 0 ? (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.forkJoin)(sources).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)(() => Quill)) : (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.of)(Quill);
  }
  static {
    this.ɵfac = function QuillService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || QuillService)();
    };
  }
  static {
    this.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
      token: QuillService,
      factory: QuillService.ɵfac,
      providedIn: 'root'
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__.setClassMetadata(QuillService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], null, null);
})();
class QuillEditorBase {
  constructor() {
    this.format = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(...(ngDevMode ? [undefined, {
      debugName: "format"
    }] : []));
    this.theme = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(...(ngDevMode ? [undefined, {
      debugName: "theme"
    }] : []));
    this.modules = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(...(ngDevMode ? [undefined, {
      debugName: "modules"
    }] : []));
    this.debug = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(false, ...(ngDevMode ? [{
      debugName: "debug"
    }] : []));
    this.readOnly = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(false, ...(ngDevMode ? [{
      debugName: "readOnly",
      transform: _angular_core__WEBPACK_IMPORTED_MODULE_4__.booleanAttribute
    }] : [{
      transform: _angular_core__WEBPACK_IMPORTED_MODULE_4__.booleanAttribute
    }]));
    this.placeholder = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(...(ngDevMode ? [undefined, {
      debugName: "placeholder"
    }] : []));
    this.maxLength = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(...(ngDevMode ? [undefined, {
      debugName: "maxLength"
    }] : []));
    this.minLength = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(...(ngDevMode ? [undefined, {
      debugName: "minLength"
    }] : []));
    this.required = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(false, ...(ngDevMode ? [{
      debugName: "required",
      transform: _angular_core__WEBPACK_IMPORTED_MODULE_4__.booleanAttribute
    }] : [{
      transform: _angular_core__WEBPACK_IMPORTED_MODULE_4__.booleanAttribute
    }]));
    this.formats = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(...(ngDevMode ? [undefined, {
      debugName: "formats"
    }] : []));
    this.customToolbarPosition = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)('top', ...(ngDevMode ? [{
      debugName: "customToolbarPosition"
    }] : []));
    this.sanitize = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(...(ngDevMode ? [undefined, {
      debugName: "sanitize"
    }] : []));
    this.beforeRender = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(...(ngDevMode ? [undefined, {
      debugName: "beforeRender"
    }] : []));
    this.styles = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(null, ...(ngDevMode ? [{
      debugName: "styles"
    }] : []));
    this.registry = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(...(ngDevMode ? [undefined, {
      debugName: "registry"
    }] : []));
    this.bounds = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(...(ngDevMode ? [undefined, {
      debugName: "bounds"
    }] : []));
    this.customOptions = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)([], ...(ngDevMode ? [{
      debugName: "customOptions"
    }] : []));
    this.customModules = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)([], ...(ngDevMode ? [{
      debugName: "customModules"
    }] : []));
    this.trackChanges = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(...(ngDevMode ? [undefined, {
      debugName: "trackChanges"
    }] : []));
    this.classes = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(...(ngDevMode ? [undefined, {
      debugName: "classes"
    }] : []));
    this.trimOnValidation = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(false, ...(ngDevMode ? [{
      debugName: "trimOnValidation",
      transform: _angular_core__WEBPACK_IMPORTED_MODULE_4__.booleanAttribute
    }] : [{
      transform: _angular_core__WEBPACK_IMPORTED_MODULE_4__.booleanAttribute
    }]));
    this.linkPlaceholder = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(...(ngDevMode ? [undefined, {
      debugName: "linkPlaceholder"
    }] : []));
    this.compareValues = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(false, ...(ngDevMode ? [{
      debugName: "compareValues",
      transform: _angular_core__WEBPACK_IMPORTED_MODULE_4__.booleanAttribute
    }] : [{
      transform: _angular_core__WEBPACK_IMPORTED_MODULE_4__.booleanAttribute
    }]));
    this.filterNull = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(false, ...(ngDevMode ? [{
      debugName: "filterNull",
      transform: _angular_core__WEBPACK_IMPORTED_MODULE_4__.booleanAttribute
    }] : [{
      transform: _angular_core__WEBPACK_IMPORTED_MODULE_4__.booleanAttribute
    }]));
    this.debounceTime = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(...(ngDevMode ? [undefined, {
      debugName: "debounceTime"
    }] : []));
    this.onlyFormatEventData = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(false, ...(ngDevMode ? [{
      debugName: "onlyFormatEventData"
    }] : []));
    /*
    https://github.com/KillerCodeMonkey/ngx-quill/issues/1257 - fix null value set
           provide default empty value
    by default null
           e.g. defaultEmptyValue="" - empty string
           <quill-editor
      defaultEmptyValue=""
      formControlName="message"
    ></quill-editor>
    */
    this.defaultEmptyValue = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(null, ...(ngDevMode ? [{
      debugName: "defaultEmptyValue"
    }] : []));
    this.onEditorCreated = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
    this.onEditorChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
    this.onContentChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
    this.onSelectionChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
    this.onFocus = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
    this.onBlur = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
    this.onNativeFocus = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
    this.onNativeBlur = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
    this.disabled = false; // used to store initial value before ViewInit
    this.toolbarPosition = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.signal)('top', ...(ngDevMode ? [{
      debugName: "toolbarPosition"
    }] : []));
    this.eventsSubscription = null;
    this.quillSubscription = null;
    this.elementRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_3__.ElementRef);
    this.domSanitizer = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__.DomSanitizer);
    this.platformId = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_3__.PLATFORM_ID);
    this.renderer = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_3__.Renderer2);
    this.service = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(QuillService);
    this.destroyRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_2__.DestroyRef);
    this.init = false;
    this.valueGetter = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(this.getter.bind(this), ...(ngDevMode ? [{
      debugName: "valueGetter"
    }] : []));
    this.valueSetter = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)((quillEditor, value) => {
      const format = getFormat(this.format(), this.service.config.format);
      if (format === 'html') {
        const sanitize = typeof this.sanitize() === 'boolean' ? this.sanitize() : this.service.config.sanitize || false;
        if (sanitize) {
          value = this.domSanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_3__.SecurityContext.HTML, value);
        }
        return quillEditor.clipboard.convert({
          html: value
        });
      } else if (format === 'json') {
        try {
          return JSON.parse(value);
        } catch {
          return [{
            insert: value
          }];
        }
      }
      return value;
    }, ...(ngDevMode ? [{
      debugName: "valueSetter"
    }] : []));
    this.selectionChangeHandler = (range, oldRange, source) => {
      const trackChanges = this.trackChanges() || this.service.config.trackChanges;
      const shouldTriggerOnModelTouched = !range && !!this.onModelTouched && (source === 'user' || trackChanges && trackChanges === 'all');
      // only emit changes when there's any listener
      if (!this.onBlur.observed && !this.onFocus.observed && !this.onSelectionChanged.observed && !shouldTriggerOnModelTouched) {
        return;
      }
      if (range === null) {
        this.onBlur.emit({
          editor: this.quillEditor,
          source
        });
      } else if (oldRange === null) {
        this.onFocus.emit({
          editor: this.quillEditor,
          source
        });
      }
      this.onSelectionChanged.emit({
        editor: this.quillEditor,
        oldRange,
        range,
        source
      });
      if (shouldTriggerOnModelTouched) {
        this.onModelTouched();
      }
    };
    this.textChangeHandler = (delta, oldDelta, source) => {
      const trackChanges = this.trackChanges() || this.service.config.trackChanges;
      const shouldTriggerOnModelChange = (source === 'user' || trackChanges && trackChanges === 'all') && !!this.onModelChange;
      // only emit changes when there's any listener
      if (!this.onContentChanged.observed && !shouldTriggerOnModelChange) {
        return;
      }
      const data = this.eventCallbackFormats();
      if (shouldTriggerOnModelChange) {
        this.onModelChange(
        // only call value getter again if not already done in eventCallbackFormats
        data.noFormat ? this.valueGetter()(this.quillEditor) : data[data.format]);
      }
      this.onContentChanged.emit({
        content: data.object,
        delta,
        editor: this.quillEditor,
        html: data.html,
        oldDelta,
        source,
        text: data.text
      });
    };
    this.editorChangeHandler = (event, current, old, source) => {
      // only emit changes when there's any listener
      if (!this.onEditorChanged.observed) {
        return;
      }
      // only emit changes emitted by user interactions
      if (event === 'text-change') {
        const data = this.eventCallbackFormats();
        this.onEditorChanged.emit({
          content: data.object,
          delta: current,
          editor: this.quillEditor,
          event,
          html: data.html,
          oldDelta: old,
          source,
          text: data.text
        });
      } else {
        this.onEditorChanged.emit({
          editor: this.quillEditor,
          event,
          oldRange: old,
          range: current,
          source
        });
      }
    };
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.afterNextRender)(() => {
      if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_6__.isPlatformServer)(this.platformId)) {
        return;
      }
      // The `quill-editor` component might be destroyed before the `quill` chunk is loaded and its code is executed
      // this will lead to runtime exceptions, since the code will be executed on DOM nodes that don't exist within the tree.
      this.quillSubscription = this.service.getQuill().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.mergeMap)(Quill => this.service.beforeRender(Quill, this.customModules(), this.beforeRender()))).subscribe(Quill => {
        this.editorElem = this.elementRef.nativeElement.querySelector('[quill-editor-element]');
        const toolbarElem = this.elementRef.nativeElement.querySelector('[quill-editor-toolbar]');
        const modules = Object.assign({}, this.modules() || this.service.config.modules);
        if (toolbarElem) {
          modules.toolbar = toolbarElem;
        } else if (modules.toolbar === undefined) {
          modules.toolbar = ngx_quill_config__WEBPACK_IMPORTED_MODULE_1__.defaultModules.toolbar;
        }
        let placeholder = this.placeholder() !== undefined ? this.placeholder() : this.service.config.placeholder;
        if (placeholder === undefined) {
          placeholder = 'Insert text here ...';
        }
        const styles = this.styles();
        if (styles) {
          this.previousStyles = styles;
          Object.keys(styles).forEach(key => {
            this.renderer.setStyle(this.editorElem, key, styles[key]);
          });
        }
        const previousClasses = this.classes();
        if (previousClasses) {
          this.previousClasses = previousClasses;
          this.addClasses(previousClasses);
        }
        this.customOptions().forEach(customOption => {
          const newCustomOption = Quill.import(customOption.import);
          newCustomOption.whitelist = customOption.whitelist;
          Quill.register(newCustomOption, true);
        });
        let bounds = this.bounds() && this.bounds() === 'self' ? this.editorElem : this.bounds();
        if (!bounds) {
          // Can use global `document` because we execute this only in the browser.
          bounds = this.service.config.bounds ? this.service.config.bounds : document.body;
        }
        let debug = this.debug();
        if (!debug && debug !== false && this.service.config.debug) {
          debug = this.service.config.debug;
        }
        let readOnly = this.readOnly();
        if (!readOnly && this.readOnly() !== false) {
          readOnly = this.service.config.readOnly !== undefined ? this.service.config.readOnly : false;
        }
        let formats = this.formats();
        if (!formats && formats === undefined) {
          formats = this.service.config.formats ? [...this.service.config.formats] : this.service.config.formats === null ? null : undefined;
        }
        this.quillEditor = new Quill(this.editorElem, {
          bounds,
          debug,
          formats,
          modules,
          placeholder,
          readOnly,
          registry: this.registry(),
          theme: this.theme() || (this.service.config.theme ? this.service.config.theme : 'snow')
        });
        if (this.onNativeBlur.observed) {
          // https://github.com/quilljs/quill/issues/2186#issuecomment-533401328
          (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.fromEvent)(this.quillEditor.scroll.domNode, 'blur').pipe((0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_8__.takeUntilDestroyed)(this.destroyRef)).subscribe(() => this.onNativeBlur.next({
            editor: this.quillEditor,
            source: 'dom'
          }));
          // https://github.com/quilljs/quill/issues/2186#issuecomment-803257538
          const toolbar = this.quillEditor.getModule('toolbar');
          if (toolbar.container) {
            (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.fromEvent)(toolbar.container, 'mousedown').pipe((0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_8__.takeUntilDestroyed)(this.destroyRef)).subscribe(e => e.preventDefault());
          }
        }
        if (this.onNativeFocus.observed) {
          (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.fromEvent)(this.quillEditor.scroll.domNode, 'focus').pipe((0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_8__.takeUntilDestroyed)(this.destroyRef)).subscribe(() => this.onNativeFocus.next({
            editor: this.quillEditor,
            source: 'dom'
          }));
        }
        // Set optional link placeholder, Quill has no native API for it so using workaround
        if (this.linkPlaceholder()) {
          const tooltip = this.quillEditor?.theme?.tooltip;
          const input = tooltip?.root?.querySelector('input[data-link]');
          if (input?.dataset) {
            input.dataset.link = this.linkPlaceholder();
          }
        }
        if (this.content) {
          const format = getFormat(this.format(), this.service.config.format);
          if (format === 'text') {
            this.quillEditor.setText(this.content, 'silent');
          } else {
            const valueSetter = this.valueSetter();
            const newValue = valueSetter(this.quillEditor, this.content);
            this.quillEditor.setContents(newValue, 'silent');
          }
          const history = this.quillEditor.getModule('history');
          history.clear();
        }
        // initialize disabled status based on this.disabled as default value
        this.setDisabledState();
        this.addQuillEventListeners();
        // listening to the `onEditorCreated` event inside the template, for instance `<quill-view (onEditorCreated)="...">`.
        if (!this.onEditorCreated.observed && !this.onValidatorChanged) {
          this.init = true;
          return;
        }
        if (this.onValidatorChanged) {
          this.onValidatorChanged();
        }
        this.onEditorCreated.emit(this.quillEditor);
        this.init = true;
      });
    });
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.effect)(() => {
      const customToolbarPosition = this.customToolbarPosition();
      if (this.init && this.toolbarPosition() !== customToolbarPosition) {
        this.toolbarPosition.set(customToolbarPosition);
      }
    });
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.effect)(() => {
      const readOnly = this.readOnly();
      if (this.init) {
        if (readOnly) {
          this.quillEditor?.disable();
        } else {
          this.quillEditor?.enable(true);
        }
      }
    });
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.effect)(() => {
      const placeholder = this.placeholder();
      if (this.init && this.quillEditor) {
        this.quillEditor.root.dataset.placeholder = placeholder;
      }
    });
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.effect)(() => {
      const styles = this.styles();
      if (!this.init || !this.editorElem) {
        return;
      }
      const currentStyling = styles;
      const previousStyling = this.previousStyles;
      if (previousStyling) {
        Object.keys(previousStyling).forEach(key => {
          this.renderer.removeStyle(this.editorElem, key);
        });
      }
      if (currentStyling) {
        Object.keys(currentStyling).forEach(key => {
          this.renderer.setStyle(this.editorElem, key, currentStyling[key]);
        });
      }
    });
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.effect)(() => {
      const classes = this.classes();
      if (!this.init || !this.quillEditor) {
        return;
      }
      const currentClasses = classes;
      const previousClasses = this.previousClasses;
      if (previousClasses) {
        this.removeClasses(previousClasses);
      }
      if (currentClasses) {
        this.addClasses(currentClasses);
      }
    });
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.effect)(() => {
      const debounceTime = this.debounceTime();
      if (!this.init || !this.quillEditor) {
        return;
      }
      if (debounceTime) {
        this.addQuillEventListeners();
      }
    });
    this.destroyRef.onDestroy(() => {
      this.dispose();
      this.quillSubscription?.unsubscribe();
      this.quillSubscription = null;
    });
  }
  static normalizeClassNames(classes) {
    const classList = classes.trim().split(' ');
    return classList.reduce((prev, cur) => {
      const trimmed = cur.trim();
      if (trimmed) {
        prev.push(trimmed);
      }
      return prev;
    }, []);
  }
  addClasses(classList) {
    QuillEditorBase.normalizeClassNames(classList).forEach(c => {
      this.renderer.addClass(this.editorElem, c);
    });
  }
  removeClasses(classList) {
    QuillEditorBase.normalizeClassNames(classList).forEach(c => {
      this.renderer.removeClass(this.editorElem, c);
    });
  }
  writeValue(currentValue) {
    // optional fix for https://github.com/angular/angular/issues/14988
    if (this.filterNull() && currentValue === null) {
      return;
    }
    this.content = currentValue;
    if (!this.quillEditor) {
      return;
    }
    const format = getFormat(this.format(), this.service.config.format);
    const valueSetter = this.valueSetter();
    const newValue = valueSetter(this.quillEditor, currentValue);
    if (this.compareValues()) {
      const currentEditorValue = this.quillEditor.getContents();
      if (JSON.stringify(currentEditorValue) === JSON.stringify(newValue)) {
        return;
      }
    }
    if (currentValue) {
      if (format === 'text') {
        this.quillEditor.setText(currentValue);
      } else {
        this.quillEditor.setContents(newValue);
      }
      return;
    }
    this.quillEditor.setText('');
  }
  setDisabledState(isDisabled = this.disabled) {
    // store initial value to set appropriate disabled status after ViewInit
    this.disabled = isDisabled;
    if (this.quillEditor) {
      if (isDisabled) {
        this.quillEditor.disable();
        this.renderer.setAttribute(this.elementRef.nativeElement, 'disabled', 'disabled');
      } else {
        if (!this.readOnly()) {
          this.quillEditor.enable();
        }
        this.renderer.removeAttribute(this.elementRef.nativeElement, 'disabled');
      }
    }
  }
  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }
  registerOnValidatorChange(fn) {
    this.onValidatorChanged = fn;
  }
  validate() {
    if (!this.quillEditor) {
      return null;
    }
    const err = {};
    let valid = true;
    const text = this.quillEditor.getText();
    // trim text if wanted + handle special case that an empty editor contains a new line
    const textLength = this.trimOnValidation() ? text.trim().length : text.length === 1 && text.trim().length === 0 ? 0 : text.length - 1;
    const deltaOperations = this.quillEditor.getContents().ops;
    const onlyEmptyOperation = !!deltaOperations && deltaOperations.length === 1 && ['\n', ''].includes(deltaOperations[0].insert?.toString() || '');
    const minLength = this.minLength();
    if (minLength && textLength && textLength < minLength) {
      err.minLengthError = {
        given: textLength,
        minLength
      };
      valid = false;
    }
    const maxLength = this.maxLength();
    if (maxLength && textLength > maxLength) {
      err.maxLengthError = {
        given: textLength,
        maxLength
      };
      valid = false;
    }
    if (this.required() && !textLength && onlyEmptyOperation) {
      err.requiredError = {
        empty: true
      };
      valid = false;
    }
    return valid ? null : err;
  }
  addQuillEventListeners() {
    this.dispose();
    this.eventsSubscription = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subscription();
    this.eventsSubscription.add(
    // mark model as touched if editor lost focus
    (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.fromEvent)(this.quillEditor, 'selection-change').subscribe(([range, oldRange, source]) => {
      this.selectionChangeHandler(range, oldRange, source);
    }));
    // The `fromEvent` supports passing JQuery-style event targets, the editor has `on` and `off` methods which
    // will be invoked upon subscription and teardown.
    let textChange$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.fromEvent)(this.quillEditor, 'text-change');
    let editorChange$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.fromEvent)(this.quillEditor, 'editor-change');
    const _debounceTime = this.debounceTime();
    if (typeof _debounceTime === 'number') {
      textChange$ = textChange$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_15__.debounceTime)(_debounceTime));
      editorChange$ = editorChange$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_15__.debounceTime)(_debounceTime));
    }
    this.eventsSubscription.add(
    // update model if text changes
    textChange$.subscribe(([delta, oldDelta, source]) => {
      this.textChangeHandler(delta, oldDelta, source);
    }));
    this.eventsSubscription.add(
    // triggered if selection or text changed
    editorChange$.subscribe(([event, current, old, source]) => {
      this.editorChangeHandler(event, current, old, source);
    }));
  }
  dispose() {
    this.eventsSubscription?.unsubscribe();
    this.eventsSubscription = null;
  }
  isEmptyValue(html) {
    return html === '<p></p>' || html === '<div></div>' || html === '<p><br></p>' || html === '<div><br></div>';
  }
  getter(quillEditor, forceFormat) {
    let modelValue = null;
    const format = forceFormat ?? getFormat(this.format(), this.service.config.format);
    if (format === 'html') {
      let html = quillEditor.getSemanticHTML();
      if (this.isEmptyValue(html)) {
        html = this.defaultEmptyValue();
      }
      modelValue = html;
    } else if (format === 'text') {
      modelValue = quillEditor.getText();
    } else if (format === 'object') {
      modelValue = quillEditor.getContents();
    } else if (format === 'json') {
      try {
        modelValue = JSON.stringify(quillEditor.getContents());
      } catch {
        modelValue = quillEditor.getText();
      }
    }
    return modelValue;
  }
  eventCallbackFormats() {
    const format = getFormat(this.format(), this.service.config.format);
    const onlyFormat = this.onlyFormatEventData() === true;
    const noFormat = this.onlyFormatEventData() === 'none';
    let text = null;
    let html = null;
    let object = null;
    let json = null;
    // do nothing if no formatted value needed
    if (noFormat) {
      return {
        format,
        onlyFormat,
        noFormat,
        text,
        object,
        json,
        html
      };
    }
    // use getter input to grab value
    const value = this.valueGetter()(this.quillEditor);
    if (format === 'text') {
      text = value;
    } else if (format === 'html') {
      html = value;
    } else if (format === 'object') {
      object = value;
      json = JSON.stringify(value);
    } else if (format === 'json') {
      json = value;
      object = JSON.parse(value);
    }
    // return current values, if only the editor format is needed
    if (onlyFormat) {
      return {
        format,
        onlyFormat,
        noFormat,
        text,
        json,
        html,
        object
      };
    }
    // return all format values
    return {
      format,
      onlyFormat,
      noFormat,
      // use internal getter to retrieve correct other values - this.valueGetter can be overwritten
      text: format === 'text' ? text : this.getter(this.quillEditor, 'text'),
      json: format === 'json' ? json : this.getter(this.quillEditor, 'json'),
      html: format === 'html' ? html : this.getter(this.quillEditor, 'html'),
      object: format === 'object' ? object : this.getter(this.quillEditor, 'object')
    };
  }
  static {
    this.ɵfac = function QuillEditorBase_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || QuillEditorBase)();
    };
  }
  static {
    this.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineDirective"]({
      type: QuillEditorBase,
      inputs: {
        format: [1, "format"],
        theme: [1, "theme"],
        modules: [1, "modules"],
        debug: [1, "debug"],
        readOnly: [1, "readOnly"],
        placeholder: [1, "placeholder"],
        maxLength: [1, "maxLength"],
        minLength: [1, "minLength"],
        required: [1, "required"],
        formats: [1, "formats"],
        customToolbarPosition: [1, "customToolbarPosition"],
        sanitize: [1, "sanitize"],
        beforeRender: [1, "beforeRender"],
        styles: [1, "styles"],
        registry: [1, "registry"],
        bounds: [1, "bounds"],
        customOptions: [1, "customOptions"],
        customModules: [1, "customModules"],
        trackChanges: [1, "trackChanges"],
        classes: [1, "classes"],
        trimOnValidation: [1, "trimOnValidation"],
        linkPlaceholder: [1, "linkPlaceholder"],
        compareValues: [1, "compareValues"],
        filterNull: [1, "filterNull"],
        debounceTime: [1, "debounceTime"],
        onlyFormatEventData: [1, "onlyFormatEventData"],
        defaultEmptyValue: [1, "defaultEmptyValue"],
        valueGetter: [1, "valueGetter"],
        valueSetter: [1, "valueSetter"]
      },
      outputs: {
        onEditorCreated: "onEditorCreated",
        onEditorChanged: "onEditorChanged",
        onContentChanged: "onContentChanged",
        onSelectionChanged: "onSelectionChanged",
        onFocus: "onFocus",
        onBlur: "onBlur",
        onNativeFocus: "onNativeFocus",
        onNativeBlur: "onNativeBlur"
      }
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__.setClassMetadata(QuillEditorBase, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Directive
  }], () => [], {
    format: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "format",
        required: false
      }]
    }],
    theme: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "theme",
        required: false
      }]
    }],
    modules: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "modules",
        required: false
      }]
    }],
    debug: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "debug",
        required: false
      }]
    }],
    readOnly: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "readOnly",
        required: false
      }]
    }],
    placeholder: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "placeholder",
        required: false
      }]
    }],
    maxLength: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "maxLength",
        required: false
      }]
    }],
    minLength: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "minLength",
        required: false
      }]
    }],
    required: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "required",
        required: false
      }]
    }],
    formats: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "formats",
        required: false
      }]
    }],
    customToolbarPosition: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "customToolbarPosition",
        required: false
      }]
    }],
    sanitize: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "sanitize",
        required: false
      }]
    }],
    beforeRender: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "beforeRender",
        required: false
      }]
    }],
    styles: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "styles",
        required: false
      }]
    }],
    registry: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "registry",
        required: false
      }]
    }],
    bounds: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "bounds",
        required: false
      }]
    }],
    customOptions: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "customOptions",
        required: false
      }]
    }],
    customModules: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "customModules",
        required: false
      }]
    }],
    trackChanges: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "trackChanges",
        required: false
      }]
    }],
    classes: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "classes",
        required: false
      }]
    }],
    trimOnValidation: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "trimOnValidation",
        required: false
      }]
    }],
    linkPlaceholder: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "linkPlaceholder",
        required: false
      }]
    }],
    compareValues: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "compareValues",
        required: false
      }]
    }],
    filterNull: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "filterNull",
        required: false
      }]
    }],
    debounceTime: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "debounceTime",
        required: false
      }]
    }],
    onlyFormatEventData: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "onlyFormatEventData",
        required: false
      }]
    }],
    defaultEmptyValue: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "defaultEmptyValue",
        required: false
      }]
    }],
    onEditorCreated: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Output
    }],
    onEditorChanged: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Output
    }],
    onContentChanged: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Output
    }],
    onSelectionChanged: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Output
    }],
    onFocus: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Output
    }],
    onBlur: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Output
    }],
    onNativeFocus: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Output
    }],
    onNativeBlur: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Output
    }],
    valueGetter: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "valueGetter",
        required: false
      }]
    }],
    valueSetter: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "valueSetter",
        required: false
      }]
    }]
  });
})();
class QuillEditorComponent extends QuillEditorBase {
  static {
    this.ɵfac = /* @__PURE__ */(() => {
      let ɵQuillEditorComponent_BaseFactory;
      return function QuillEditorComponent_Factory(__ngFactoryType__) {
        return (ɵQuillEditorComponent_BaseFactory || (ɵQuillEditorComponent_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetInheritedFactory"](QuillEditorComponent)))(__ngFactoryType__ || QuillEditorComponent);
      };
    })();
  }
  static {
    this.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: QuillEditorComponent,
      selectors: [["quill-editor"]],
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([{
        multi: true,
        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_20__.NG_VALUE_ACCESSOR,
        useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(() => QuillEditorComponent)
      }, {
        multi: true,
        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_20__.NG_VALIDATORS,
        useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(() => QuillEditorComponent)
      }]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]],
      ngContentSelectors: _c1,
      decls: 5,
      vars: 2,
      consts: [["quill-editor-element", ""]],
      template: function QuillEditorComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵprojectionDef"](_c0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵconditionalCreate"](0, QuillEditorComponent_Conditional_0_Template, 1, 0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵprojection"](1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵprojection"](2, 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵprojection"](3, 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵconditionalCreate"](4, QuillEditorComponent_Conditional_4_Template, 1, 0, "div", 0);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵconditional"](ctx.toolbarPosition() !== "top" ? 0 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵconditional"](ctx.toolbarPosition() === "top" ? 4 : -1);
        }
      },
      styles: ["[_nghost-%COMP%]{display:inline-block}"],
      changeDetection: 0
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__.setClassMetadata(QuillEditorComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Component,
    args: [{
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_3__.ViewEncapsulation.Emulated,
      providers: [{
        multi: true,
        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_20__.NG_VALUE_ACCESSOR,
        useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(() => QuillEditorComponent)
      }, {
        multi: true,
        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_20__.NG_VALIDATORS,
        useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(() => QuillEditorComponent)
      }],
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectionStrategy.OnPush,
      selector: 'quill-editor',
      template: `
    @if (toolbarPosition() !== 'top') {
        <div quill-editor-element></div>
    }

    <ng-content select="[above-quill-editor-toolbar]"></ng-content>
    <ng-content select="[quill-editor-toolbar]"></ng-content>
    <ng-content select="[below-quill-editor-toolbar]"></ng-content>

    @if (toolbarPosition() === 'top') {
        <div quill-editor-element></div>
    }
  `,
      styles: [":host{display:inline-block}\n"]
    }]
  }], null, null);
})();
class QuillViewHTMLComponent {
  constructor() {
    this.content = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)('', ...(ngDevMode ? [{
      debugName: "content"
    }] : []));
    this.theme = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(...(ngDevMode ? [undefined, {
      debugName: "theme"
    }] : []));
    this.sanitize = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(...(ngDevMode ? [undefined, {
      debugName: "sanitize"
    }] : []));
    this.innerHTML = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.computed)(() => {
      const sanitize = this.sanitize();
      const content = this.content();
      return (typeof sanitize === 'boolean' ? sanitize : this.service.config.sanitize || false) ? content : this.sanitizer.bypassSecurityTrustHtml(content);
    }, ...(ngDevMode ? [{
      debugName: "innerHTML"
    }] : []));
    this.themeClass = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.computed)(() => {
      const base = this.service.config.theme ? this.service.config.theme : 'snow';
      return `ql-${this.theme() || base} ngx-quill-view-html`;
    }, ...(ngDevMode ? [{
      debugName: "themeClass"
    }] : []));
    this.sanitizer = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__.DomSanitizer);
    this.service = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(QuillService);
  }
  static {
    this.ɵfac = function QuillViewHTMLComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || QuillViewHTMLComponent)();
    };
  }
  static {
    this.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: QuillViewHTMLComponent,
      selectors: [["quill-view-html"]],
      inputs: {
        content: [1, "content"],
        theme: [1, "theme"],
        sanitize: [1, "sanitize"]
      },
      decls: 2,
      vars: 3,
      consts: [[1, "ql-container"], [1, "ql-editor", 3, "innerHTML"]],
      template: function QuillViewHTMLComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdomElementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdomElement"](1, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdomElementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassMap"](ctx.themeClass());
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdomProperty"]("innerHTML", ctx.innerHTML(), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeHtml"]);
        }
      },
      styles: [".ql-container.ngx-quill-view-html{border:0}\n"],
      encapsulation: 2,
      changeDetection: 0
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__.setClassMetadata(QuillViewHTMLComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Component,
    args: [{
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectionStrategy.OnPush,
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_3__.ViewEncapsulation.None,
      selector: 'quill-view-html',
      template: `
  <div class="ql-container" [class]="themeClass()">
    <div class="ql-editor" [innerHTML]="innerHTML()">
    </div>
  </div>
`,
      styles: [".ql-container.ngx-quill-view-html{border:0}\n"]
    }]
  }], null, {
    content: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "content",
        required: false
      }]
    }],
    theme: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "theme",
        required: false
      }]
    }],
    sanitize: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "sanitize",
        required: false
      }]
    }]
  });
})();
class QuillViewComponent {
  constructor() {
    this.format = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(...(ngDevMode ? [undefined, {
      debugName: "format"
    }] : []));
    this.theme = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(...(ngDevMode ? [undefined, {
      debugName: "theme"
    }] : []));
    this.modules = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(...(ngDevMode ? [undefined, {
      debugName: "modules"
    }] : []));
    this.debug = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(false, ...(ngDevMode ? [{
      debugName: "debug"
    }] : []));
    this.formats = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(...(ngDevMode ? [undefined, {
      debugName: "formats"
    }] : []));
    this.sanitize = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(...(ngDevMode ? [undefined, {
      debugName: "sanitize"
    }] : []));
    this.beforeRender = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(...(ngDevMode ? [undefined, {
      debugName: "beforeRender"
    }] : []));
    this.strict = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(true, ...(ngDevMode ? [{
      debugName: "strict"
    }] : []));
    this.content = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)(...(ngDevMode ? [undefined, {
      debugName: "content"
    }] : []));
    this.customModules = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)([], ...(ngDevMode ? [{
      debugName: "customModules"
    }] : []));
    this.customOptions = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.input)([], ...(ngDevMode ? [{
      debugName: "customOptions"
    }] : []));
    this.onEditorCreated = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
    this.init = false;
    this.elementRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_3__.ElementRef);
    this.renderer = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_3__.Renderer2);
    this.service = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(QuillService);
    this.sanitizer = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__.DomSanitizer);
    this.platformId = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_3__.PLATFORM_ID);
    this.destroyRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_2__.DestroyRef);
    this.valueSetter = (quillEditor, value) => {
      const format = getFormat(this.format(), this.service.config.format);
      let content = value;
      if (format === 'text') {
        quillEditor.setText(content);
      } else {
        if (format === 'html') {
          const sanitize = typeof this.sanitize() === 'boolean' ? this.sanitize() : this.service.config.sanitize || false;
          if (sanitize) {
            value = this.sanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_3__.SecurityContext.HTML, value);
          }
          content = quillEditor.clipboard.convert({
            html: value
          });
        } else if (format === 'json') {
          try {
            content = JSON.parse(value);
          } catch {
            content = [{
              insert: value
            }];
          }
        }
        quillEditor.setContents(content);
      }
    };
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.afterNextRender)(() => {
      if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_6__.isPlatformServer)(this.platformId)) {
        return;
      }
      const quillSubscription = this.service.getQuill().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.mergeMap)(Quill => this.service.beforeRender(Quill, this.customModules(), this.beforeRender()))).subscribe(Quill => {
        const modules = Object.assign({}, this.modules() || this.service.config.modules);
        modules.toolbar = false;
        this.customOptions().forEach(customOption => {
          const newCustomOption = Quill.import(customOption.import);
          newCustomOption.whitelist = customOption.whitelist;
          Quill.register(newCustomOption, true);
        });
        let debug = this.debug();
        if (!debug && debug !== false && this.service.config.debug) {
          debug = this.service.config.debug;
        }
        let formats = this.formats();
        if (formats === undefined) {
          formats = this.service.config.formats ? [...this.service.config.formats] : this.service.config.formats === null ? null : undefined;
        }
        const theme = this.theme() || (this.service.config.theme ? this.service.config.theme : 'snow');
        this.editorElem = this.elementRef.nativeElement.querySelector('[quill-view-element]');
        this.quillEditor = new Quill(this.editorElem, {
          debug,
          formats,
          modules,
          readOnly: true,
          strict: this.strict(),
          theme
        });
        this.renderer.addClass(this.editorElem, 'ngx-quill-view');
        if (this.content()) {
          this.valueSetter(this.quillEditor, this.content());
        }
        // listening to the `onEditorCreated` event inside the template, for instance `<quill-view (onEditorCreated)="...">`.
        if (!this.onEditorCreated.observed) {
          this.init = true;
          return;
        }
        this.onEditorCreated.emit(this.quillEditor);
        this.init = true;
      });
      this.destroyRef.onDestroy(() => quillSubscription.unsubscribe());
    });
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.effect)(() => {
      const content = this.content();
      if (!this.quillEditor || !this.init) {
        return;
      }
      if (content) {
        this.valueSetter(this.quillEditor, content);
      }
    });
  }
  static {
    this.ɵfac = function QuillViewComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || QuillViewComponent)();
    };
  }
  static {
    this.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: QuillViewComponent,
      selectors: [["quill-view"]],
      inputs: {
        format: [1, "format"],
        theme: [1, "theme"],
        modules: [1, "modules"],
        debug: [1, "debug"],
        formats: [1, "formats"],
        sanitize: [1, "sanitize"],
        beforeRender: [1, "beforeRender"],
        strict: [1, "strict"],
        content: [1, "content"],
        customModules: [1, "customModules"],
        customOptions: [1, "customOptions"]
      },
      outputs: {
        onEditorCreated: "onEditorCreated"
      },
      decls: 1,
      vars: 0,
      consts: [["quill-view-element", ""]],
      template: function QuillViewComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdomElement"](0, "div", 0);
        }
      },
      styles: [".ql-container.ngx-quill-view{border:0}\n"],
      encapsulation: 2,
      changeDetection: 0
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__.setClassMetadata(QuillViewComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Component,
    args: [{
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectionStrategy.OnPush,
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_3__.ViewEncapsulation.None,
      selector: 'quill-view',
      template: `
  <div quill-view-element></div>
`,
      styles: [".ql-container.ngx-quill-view{border:0}\n"]
    }]
  }], () => [], {
    format: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "format",
        required: false
      }]
    }],
    theme: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "theme",
        required: false
      }]
    }],
    modules: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "modules",
        required: false
      }]
    }],
    debug: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "debug",
        required: false
      }]
    }],
    formats: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "formats",
        required: false
      }]
    }],
    sanitize: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "sanitize",
        required: false
      }]
    }],
    beforeRender: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "beforeRender",
        required: false
      }]
    }],
    strict: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "strict",
        required: false
      }]
    }],
    content: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "content",
        required: false
      }]
    }],
    customModules: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "customModules",
        required: false
      }]
    }],
    customOptions: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input,
      args: [{
        isSignal: true,
        alias: "customOptions",
        required: false
      }]
    }],
    onEditorCreated: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Output
    }]
  });
})();
class QuillModule {
  static forRoot(config) {
    return {
      ngModule: QuillModule,
      providers: [{
        provide: ngx_quill_config__WEBPACK_IMPORTED_MODULE_1__.QUILL_CONFIG_TOKEN,
        useValue: config
      }]
    };
  }
  static {
    this.ɵfac = function QuillModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || QuillModule)();
    };
  }
  static {
    this.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
      type: QuillModule
    });
  }
  static {
    this.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({});
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__.setClassMetadata(QuillModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule,
    args: [{
      imports: [QuillEditorComponent, QuillViewComponent, QuillViewHTMLComponent],
      exports: [QuillEditorComponent, QuillViewComponent, QuillViewHTMLComponent]
    }]
  }], null, null);
})();

/*
 * Public API Surface of ngx-quill
 */
// Re-export everything from the secondary entry-point so we can be backwards-compatible
// and don't introduce breaking changes for consumers.

/**
 * Generated bundle index. Do not edit.
 */



/***/ },

/***/ 15436
/*!********************************************************!*\
  !*** ./src/app/features/admin/admin-routing.module.ts ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminRoutingModule: () => (/* binding */ AdminRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ 46264);
/* harmony import */ var _admin_route_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./admin.route.model */ 16291);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 36124);




class AdminRoutingModule {
  static {
    this.ɵfac = function AdminRoutingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AdminRoutingModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
      type: AdminRoutingModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__.RouterModule.forChild(_admin_route_model__WEBPACK_IMPORTED_MODULE_1__.adminRoutes), _angular_router__WEBPACK_IMPORTED_MODULE_0__.RouterModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AdminRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__.RouterModule]
  });
})();

/***/ },

/***/ 15575
/*!********************************************************************!*\
  !*** ./node_modules/@angular/material/fesm2022/_tooltip-chunk.mjs ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAT_TOOLTIP_DEFAULT_OPTIONS: () => (/* binding */ MAT_TOOLTIP_DEFAULT_OPTIONS),
/* harmony export */   MAT_TOOLTIP_SCROLL_STRATEGY: () => (/* binding */ MAT_TOOLTIP_SCROLL_STRATEGY),
/* harmony export */   MatTooltip: () => (/* binding */ MatTooltip),
/* harmony export */   SCROLL_THROTTLE_MS: () => (/* binding */ SCROLL_THROTTLE_MS),
/* harmony export */   TOOLTIP_PANEL_CLASS: () => (/* binding */ TOOLTIP_PANEL_CLASS),
/* harmony export */   TooltipComponent: () => (/* binding */ TooltipComponent),
/* harmony export */   getMatTooltipInvalidPositionError: () => (/* binding */ getMatTooltipInvalidPositionError)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ 33900);
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/coercion */ 2814);
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/coercion */ 6075);
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/keycodes */ 74879);
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/keycodes */ 97552);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 79748);
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/platform */ 98508);
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/platform */ 82548);
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/cdk/a11y */ 72102);
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/cdk/a11y */ 76522);
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/cdk/bidi */ 43433);
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/cdk/overlay */ 92832);
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/cdk/overlay */ 79975);
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/cdk/portal */ 9168);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs */ 10819);
/* harmony import */ var _animation_chunk_mjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./_animation-chunk.mjs */ 87432);













const _c0 = ["tooltip"];
const SCROLL_THROTTLE_MS = 20;
function getMatTooltipInvalidPositionError(position) {
  return Error(`Tooltip position "${position}" is invalid.`);
}
const MAT_TOOLTIP_SCROLL_STRATEGY = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.InjectionToken('mat-tooltip-scroll-strategy', {
  providedIn: 'root',
  factory: () => {
    const injector = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injector);
    return () => (0,_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_14__.createRepositionScrollStrategy)(injector, {
      scrollThrottle: SCROLL_THROTTLE_MS
    });
  }
});
const MAT_TOOLTIP_DEFAULT_OPTIONS = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.InjectionToken('mat-tooltip-default-options', {
  providedIn: 'root',
  factory: () => ({
    showDelay: 0,
    hideDelay: 0,
    touchendHideDelay: 1500
  })
});
const TOOLTIP_PANEL_CLASS = 'mat-mdc-tooltip-panel';
const PANEL_CLASS = 'tooltip-panel';
const passiveListenerOptions = (0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_10__.normalizePassiveListenerOptions)({
  passive: true
});
const MIN_VIEWPORT_TOOLTIP_THRESHOLD = 8;
const UNBOUNDED_ANCHOR_GAP = 8;
const MIN_HEIGHT = 24;
const MAX_WIDTH = 200;
class MatTooltip {
  _elementRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef);
  _ngZone = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgZone);
  _platform = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.inject)(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_9__.Platform);
  _ariaDescriber = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.inject)(_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_11__.AriaDescriber);
  _focusMonitor = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.inject)(_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_12__.FocusMonitor);
  _dir = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.inject)(_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_13__.Directionality);
  _injector = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injector);
  _viewContainerRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_6__.ViewContainerRef);
  _animationsDisabled = (0,_animation_chunk_mjs__WEBPACK_IMPORTED_MODULE_18__._animationsDisabled)();
  _defaultOptions = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.inject)(MAT_TOOLTIP_DEFAULT_OPTIONS, {
    optional: true
  });
  _overlayRef;
  _tooltipInstance;
  _overlayPanelClass;
  _portal;
  _position = 'below';
  _positionAtOrigin = false;
  _disabled = false;
  _tooltipClass;
  _viewInitialized = false;
  _pointerExitEventsInitialized = false;
  _tooltipComponent = TooltipComponent;
  _viewportMargin = 8;
  _currentPosition;
  _cssClassPrefix = 'mat-mdc';
  _ariaDescriptionPending;
  _dirSubscribed = false;
  get position() {
    return this._position;
  }
  set position(value) {
    if (value !== this._position) {
      this._position = value;
      if (this._overlayRef) {
        this._updatePosition(this._overlayRef);
        this._tooltipInstance?.show(0);
        this._overlayRef.updatePosition();
      }
    }
  }
  get positionAtOrigin() {
    return this._positionAtOrigin;
  }
  set positionAtOrigin(value) {
    this._positionAtOrigin = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(value);
    this._detach();
    this._overlayRef = null;
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    const isDisabled = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.coerceBooleanProperty)(value);
    if (this._disabled !== isDisabled) {
      this._disabled = isDisabled;
      if (isDisabled) {
        this.hide(0);
      } else {
        this._setupPointerEnterEventsIfNeeded();
      }
      this._syncAriaDescription(this.message);
    }
  }
  get showDelay() {
    return this._showDelay;
  }
  set showDelay(value) {
    this._showDelay = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceNumberProperty)(value);
  }
  _showDelay;
  get hideDelay() {
    return this._hideDelay;
  }
  set hideDelay(value) {
    this._hideDelay = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__.coerceNumberProperty)(value);
    if (this._tooltipInstance) {
      this._tooltipInstance._mouseLeaveHideDelay = this._hideDelay;
    }
  }
  _hideDelay;
  touchGestures = 'auto';
  get message() {
    return this._message;
  }
  set message(value) {
    const oldMessage = this._message;
    this._message = value != null ? String(value).trim() : '';
    if (!this._message && this._isTooltipVisible()) {
      this.hide(0);
    } else {
      this._setupPointerEnterEventsIfNeeded();
      this._updateTooltipMessage();
    }
    this._syncAriaDescription(oldMessage);
  }
  _message = '';
  get tooltipClass() {
    return this._tooltipClass;
  }
  set tooltipClass(value) {
    this._tooltipClass = value;
    if (this._tooltipInstance) {
      this._setTooltipClass(this._tooltipClass);
    }
  }
  _passiveListeners = [];
  _touchstartTimeout = null;
  _destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_17__.Subject();
  _isDestroyed = false;
  constructor() {
    const defaultOptions = this._defaultOptions;
    if (defaultOptions) {
      this._showDelay = defaultOptions.showDelay;
      this._hideDelay = defaultOptions.hideDelay;
      if (defaultOptions.position) {
        this.position = defaultOptions.position;
      }
      if (defaultOptions.positionAtOrigin) {
        this.positionAtOrigin = defaultOptions.positionAtOrigin;
      }
      if (defaultOptions.touchGestures) {
        this.touchGestures = defaultOptions.touchGestures;
      }
      if (defaultOptions.tooltipClass) {
        this.tooltipClass = defaultOptions.tooltipClass;
      }
    }
    this._viewportMargin = MIN_VIEWPORT_TOOLTIP_THRESHOLD;
  }
  ngAfterViewInit() {
    this._viewInitialized = true;
    this._setupPointerEnterEventsIfNeeded();
    this._focusMonitor.monitor(this._elementRef).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.takeUntil)(this._destroyed)).subscribe(origin => {
      if (!origin) {
        this._ngZone.run(() => this.hide(0));
      } else if (origin === 'keyboard') {
        this._ngZone.run(() => this.show());
      }
    });
  }
  ngOnDestroy() {
    const nativeElement = this._elementRef.nativeElement;
    if (this._touchstartTimeout) {
      clearTimeout(this._touchstartTimeout);
    }
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._tooltipInstance = null;
    }
    this._passiveListeners.forEach(([event, listener]) => {
      nativeElement.removeEventListener(event, listener, passiveListenerOptions);
    });
    this._passiveListeners.length = 0;
    this._destroyed.next();
    this._destroyed.complete();
    this._isDestroyed = true;
    this._ariaDescriber.removeDescription(nativeElement, this.message, 'tooltip');
    this._focusMonitor.stopMonitoring(nativeElement);
  }
  show(delay = this.showDelay, origin) {
    if (this.disabled || !this.message || this._isTooltipVisible()) {
      this._tooltipInstance?._cancelPendingAnimations();
      return;
    }
    const overlayRef = this._createOverlay(origin);
    this._detach();
    this._portal = this._portal || new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_16__.ComponentPortal(this._tooltipComponent, this._viewContainerRef);
    const instance = this._tooltipInstance = overlayRef.attach(this._portal).instance;
    instance._triggerElement = this._elementRef.nativeElement;
    instance._mouseLeaveHideDelay = this._hideDelay;
    instance.afterHidden().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.takeUntil)(this._destroyed)).subscribe(() => this._detach());
    this._setTooltipClass(this._tooltipClass);
    this._updateTooltipMessage();
    instance.show(delay);
  }
  hide(delay = this.hideDelay) {
    const instance = this._tooltipInstance;
    if (instance) {
      if (instance.isVisible()) {
        instance.hide(delay);
      } else {
        instance._cancelPendingAnimations();
        this._detach();
      }
    }
  }
  toggle(origin) {
    this._isTooltipVisible() ? this.hide() : this.show(undefined, origin);
  }
  _isTooltipVisible() {
    return !!this._tooltipInstance && this._tooltipInstance.isVisible();
  }
  _createOverlay(origin) {
    if (this._overlayRef) {
      const existingStrategy = this._overlayRef.getConfig().positionStrategy;
      if ((!this.positionAtOrigin || !origin) && existingStrategy._origin instanceof _angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef) {
        return this._overlayRef;
      }
      this._detach();
    }
    const scrollableAncestors = this._injector.get(_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_15__.ScrollDispatcher).getAncestorScrollContainers(this._elementRef);
    const panelClass = `${this._cssClassPrefix}-${PANEL_CLASS}`;
    const strategy = (0,_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_14__.createFlexibleConnectedPositionStrategy)(this._injector, this.positionAtOrigin ? origin || this._elementRef : this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(false).withViewportMargin(this._viewportMargin).withScrollableContainers(scrollableAncestors).withPopoverLocation('global');
    strategy.positionChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.takeUntil)(this._destroyed)).subscribe(change => {
      this._updateCurrentPositionClass(change.connectionPair);
      if (this._tooltipInstance) {
        if (change.scrollableViewProperties.isOverlayClipped && this._tooltipInstance.isVisible()) {
          this._ngZone.run(() => this.hide(0));
        }
      }
    });
    this._overlayRef = (0,_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_14__.createOverlayRef)(this._injector, {
      direction: this._dir,
      positionStrategy: strategy,
      panelClass: this._overlayPanelClass ? [...this._overlayPanelClass, panelClass] : panelClass,
      scrollStrategy: this._injector.get(MAT_TOOLTIP_SCROLL_STRATEGY)(),
      disableAnimations: this._animationsDisabled
    });
    this._updatePosition(this._overlayRef);
    this._overlayRef.detachments().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.takeUntil)(this._destroyed)).subscribe(() => this._detach());
    this._overlayRef.outsidePointerEvents().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.takeUntil)(this._destroyed)).subscribe(() => this._tooltipInstance?._handleBodyInteraction());
    this._overlayRef.keydownEvents().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.takeUntil)(this._destroyed)).subscribe(event => {
      if (this._isTooltipVisible() && event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_4__.ESCAPE && !(0,_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__.hasModifierKey)(event)) {
        event.preventDefault();
        event.stopPropagation();
        this._ngZone.run(() => this.hide(0));
      }
    });
    if (this._defaultOptions?.disableTooltipInteractivity) {
      this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`);
    }
    if (!this._dirSubscribed) {
      this._dirSubscribed = true;
      this._dir.change.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.takeUntil)(this._destroyed)).subscribe(() => {
        if (this._overlayRef) {
          this._updatePosition(this._overlayRef);
        }
      });
    }
    return this._overlayRef;
  }
  _detach() {
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }
    this._tooltipInstance = null;
  }
  _updatePosition(overlayRef) {
    const position = overlayRef.getConfig().positionStrategy;
    const origin = this._getOrigin();
    const overlay = this._getOverlayPosition();
    position.withPositions([this._addOffset({
      ...origin.main,
      ...overlay.main
    }), this._addOffset({
      ...origin.fallback,
      ...overlay.fallback
    })]);
  }
  _addOffset(position) {
    const offset = UNBOUNDED_ANCHOR_GAP;
    const isLtr = !this._dir || this._dir.value == 'ltr';
    if (position.originY === 'top') {
      position.offsetY = -offset;
    } else if (position.originY === 'bottom') {
      position.offsetY = offset;
    } else if (position.originX === 'start') {
      position.offsetX = isLtr ? -offset : offset;
    } else if (position.originX === 'end') {
      position.offsetX = isLtr ? offset : -offset;
    }
    return position;
  }
  _getOrigin() {
    const isLtr = !this._dir || this._dir.value == 'ltr';
    const position = this.position;
    let originPosition;
    if (position == 'above' || position == 'below') {
      originPosition = {
        originX: 'center',
        originY: position == 'above' ? 'top' : 'bottom'
      };
    } else if (position == 'before' || position == 'left' && isLtr || position == 'right' && !isLtr) {
      originPosition = {
        originX: 'start',
        originY: 'center'
      };
    } else if (position == 'after' || position == 'right' && isLtr || position == 'left' && !isLtr) {
      originPosition = {
        originX: 'end',
        originY: 'center'
      };
    } else if (typeof ngDevMode === 'undefined' || ngDevMode) {
      throw getMatTooltipInvalidPositionError(position);
    }
    const {
      x,
      y
    } = this._invertPosition(originPosition.originX, originPosition.originY);
    return {
      main: originPosition,
      fallback: {
        originX: x,
        originY: y
      }
    };
  }
  _getOverlayPosition() {
    const isLtr = !this._dir || this._dir.value == 'ltr';
    const position = this.position;
    let overlayPosition;
    if (position == 'above') {
      overlayPosition = {
        overlayX: 'center',
        overlayY: 'bottom'
      };
    } else if (position == 'below') {
      overlayPosition = {
        overlayX: 'center',
        overlayY: 'top'
      };
    } else if (position == 'before' || position == 'left' && isLtr || position == 'right' && !isLtr) {
      overlayPosition = {
        overlayX: 'end',
        overlayY: 'center'
      };
    } else if (position == 'after' || position == 'right' && isLtr || position == 'left' && !isLtr) {
      overlayPosition = {
        overlayX: 'start',
        overlayY: 'center'
      };
    } else if (typeof ngDevMode === 'undefined' || ngDevMode) {
      throw getMatTooltipInvalidPositionError(position);
    }
    const {
      x,
      y
    } = this._invertPosition(overlayPosition.overlayX, overlayPosition.overlayY);
    return {
      main: overlayPosition,
      fallback: {
        overlayX: x,
        overlayY: y
      }
    };
  }
  _updateTooltipMessage() {
    if (this._tooltipInstance) {
      this._tooltipInstance.message = this.message;
      this._tooltipInstance._markForCheck();
      (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.afterNextRender)(() => {
        if (this._tooltipInstance) {
          this._overlayRef.updatePosition();
        }
      }, {
        injector: this._injector
      });
    }
  }
  _setTooltipClass(tooltipClass) {
    if (this._tooltipInstance) {
      this._tooltipInstance.tooltipClass = tooltipClass;
      this._tooltipInstance._markForCheck();
    }
  }
  _invertPosition(x, y) {
    if (this.position === 'above' || this.position === 'below') {
      if (y === 'top') {
        y = 'bottom';
      } else if (y === 'bottom') {
        y = 'top';
      }
    } else {
      if (x === 'end') {
        x = 'start';
      } else if (x === 'start') {
        x = 'end';
      }
    }
    return {
      x,
      y
    };
  }
  _updateCurrentPositionClass(connectionPair) {
    const {
      overlayY,
      originX,
      originY
    } = connectionPair;
    let newPosition;
    if (overlayY === 'center') {
      if (this._dir && this._dir.value === 'rtl') {
        newPosition = originX === 'end' ? 'left' : 'right';
      } else {
        newPosition = originX === 'start' ? 'left' : 'right';
      }
    } else {
      newPosition = overlayY === 'bottom' && originY === 'top' ? 'above' : 'below';
    }
    if (newPosition !== this._currentPosition) {
      const overlayRef = this._overlayRef;
      if (overlayRef) {
        const classPrefix = `${this._cssClassPrefix}-${PANEL_CLASS}-`;
        overlayRef.removePanelClass(classPrefix + this._currentPosition);
        overlayRef.addPanelClass(classPrefix + newPosition);
      }
      this._currentPosition = newPosition;
    }
  }
  _setupPointerEnterEventsIfNeeded() {
    if (this._disabled || !this.message || !this._viewInitialized || this._passiveListeners.length) {
      return;
    }
    if (this._platformSupportsMouseEvents()) {
      this._passiveListeners.push(['mouseenter', event => {
        this._setupPointerExitEventsIfNeeded();
        let point = undefined;
        if (event.x !== undefined && event.y !== undefined) {
          point = event;
        }
        this.show(undefined, point);
      }]);
    } else if (this.touchGestures !== 'off') {
      this._disableNativeGesturesIfNecessary();
      this._passiveListeners.push(['touchstart', event => {
        const touch = event.targetTouches?.[0];
        const origin = touch ? {
          x: touch.clientX,
          y: touch.clientY
        } : undefined;
        this._setupPointerExitEventsIfNeeded();
        if (this._touchstartTimeout) {
          clearTimeout(this._touchstartTimeout);
        }
        const DEFAULT_LONGPRESS_DELAY = 500;
        this._touchstartTimeout = setTimeout(() => {
          this._touchstartTimeout = null;
          this.show(undefined, origin);
        }, this._defaultOptions?.touchLongPressShowDelay ?? DEFAULT_LONGPRESS_DELAY);
      }]);
    }
    this._addListeners(this._passiveListeners);
  }
  _setupPointerExitEventsIfNeeded() {
    if (this._pointerExitEventsInitialized) {
      return;
    }
    this._pointerExitEventsInitialized = true;
    const exitListeners = [];
    if (this._platformSupportsMouseEvents()) {
      exitListeners.push(['mouseleave', event => {
        const newTarget = event.relatedTarget;
        if (!newTarget || !this._overlayRef?.overlayElement.contains(newTarget)) {
          this.hide();
        }
      }], ['wheel', event => this._wheelListener(event)]);
    } else if (this.touchGestures !== 'off') {
      this._disableNativeGesturesIfNecessary();
      const touchendListener = () => {
        if (this._touchstartTimeout) {
          clearTimeout(this._touchstartTimeout);
        }
        this.hide(this._defaultOptions?.touchendHideDelay);
      };
      exitListeners.push(['touchend', touchendListener], ['touchcancel', touchendListener]);
    }
    this._addListeners(exitListeners);
    this._passiveListeners.push(...exitListeners);
  }
  _addListeners(listeners) {
    listeners.forEach(([event, listener]) => {
      this._elementRef.nativeElement.addEventListener(event, listener, passiveListenerOptions);
    });
  }
  _platformSupportsMouseEvents() {
    return !this._platform.IOS && !this._platform.ANDROID;
  }
  _wheelListener(event) {
    if (this._isTooltipVisible()) {
      const elementUnderPointer = this._injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_5__.DOCUMENT).elementFromPoint(event.clientX, event.clientY);
      const element = this._elementRef.nativeElement;
      if (elementUnderPointer !== element && !element.contains(elementUnderPointer)) {
        this.hide();
      }
    }
  }
  _disableNativeGesturesIfNecessary() {
    const gestures = this.touchGestures;
    if (gestures !== 'off') {
      const element = this._elementRef.nativeElement;
      const style = element.style;
      if (gestures === 'on' || element.nodeName !== 'INPUT' && element.nodeName !== 'TEXTAREA') {
        style.userSelect = style.msUserSelect = style.webkitUserSelect = style.MozUserSelect = 'none';
      }
      if (gestures === 'on' || !element.draggable) {
        style.webkitUserDrag = 'none';
      }
      style.touchAction = 'none';
      style.webkitTapHighlightColor = 'transparent';
    }
  }
  _syncAriaDescription(oldMessage) {
    if (this._ariaDescriptionPending) {
      return;
    }
    this._ariaDescriptionPending = true;
    this._ariaDescriber.removeDescription(this._elementRef.nativeElement, oldMessage, 'tooltip');
    if (!this._isDestroyed) {
      (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.afterNextRender)({
        write: () => {
          this._ariaDescriptionPending = false;
          if (this.message && !this.disabled) {
            this._ariaDescriber.describe(this._elementRef.nativeElement, this.message, 'tooltip');
          }
        }
      }, {
        injector: this._injector
      });
    }
  }
  static ɵfac = function MatTooltip_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || MatTooltip)();
  };
  static ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineDirective"]({
    type: MatTooltip,
    selectors: [["", "matTooltip", ""]],
    hostAttrs: [1, "mat-mdc-tooltip-trigger"],
    hostVars: 2,
    hostBindings: function MatTooltip_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("mat-mdc-tooltip-disabled", ctx.disabled);
      }
    },
    inputs: {
      position: [0, "matTooltipPosition", "position"],
      positionAtOrigin: [0, "matTooltipPositionAtOrigin", "positionAtOrigin"],
      disabled: [0, "matTooltipDisabled", "disabled"],
      showDelay: [0, "matTooltipShowDelay", "showDelay"],
      hideDelay: [0, "matTooltipHideDelay", "hideDelay"],
      touchGestures: [0, "matTooltipTouchGestures", "touchGestures"],
      message: [0, "matTooltip", "message"],
      tooltipClass: [0, "matTooltipClass", "tooltipClass"]
    },
    exportAs: ["matTooltip"]
  });
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__.setClassMetadata(MatTooltip, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Directive,
    args: [{
      selector: '[matTooltip]',
      exportAs: 'matTooltip',
      host: {
        'class': 'mat-mdc-tooltip-trigger',
        '[class.mat-mdc-tooltip-disabled]': 'disabled'
      }
    }]
  }], () => [], {
    position: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Input,
      args: ['matTooltipPosition']
    }],
    positionAtOrigin: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Input,
      args: ['matTooltipPositionAtOrigin']
    }],
    disabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Input,
      args: ['matTooltipDisabled']
    }],
    showDelay: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Input,
      args: ['matTooltipShowDelay']
    }],
    hideDelay: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Input,
      args: ['matTooltipHideDelay']
    }],
    touchGestures: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Input,
      args: ['matTooltipTouchGestures']
    }],
    message: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Input,
      args: ['matTooltip']
    }],
    tooltipClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Input,
      args: ['matTooltipClass']
    }]
  });
})();
class TooltipComponent {
  _changeDetectorRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_7__.ChangeDetectorRef);
  _elementRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef);
  _isMultiline = false;
  message;
  tooltipClass;
  _showTimeoutId;
  _hideTimeoutId;
  _triggerElement;
  _mouseLeaveHideDelay;
  _animationsDisabled = (0,_animation_chunk_mjs__WEBPACK_IMPORTED_MODULE_18__._animationsDisabled)();
  _tooltip;
  _closeOnInteraction = false;
  _isVisible = false;
  _onHide = new rxjs__WEBPACK_IMPORTED_MODULE_17__.Subject();
  _showAnimation = 'mat-mdc-tooltip-show';
  _hideAnimation = 'mat-mdc-tooltip-hide';
  constructor() {}
  show(delay) {
    if (this._hideTimeoutId != null) {
      clearTimeout(this._hideTimeoutId);
    }
    this._showTimeoutId = setTimeout(() => {
      this._toggleVisibility(true);
      this._showTimeoutId = undefined;
    }, delay);
  }
  hide(delay) {
    if (this._showTimeoutId != null) {
      clearTimeout(this._showTimeoutId);
    }
    this._hideTimeoutId = setTimeout(() => {
      this._toggleVisibility(false);
      this._hideTimeoutId = undefined;
    }, delay);
  }
  afterHidden() {
    return this._onHide;
  }
  isVisible() {
    return this._isVisible;
  }
  ngOnDestroy() {
    this._cancelPendingAnimations();
    this._onHide.complete();
    this._triggerElement = null;
  }
  _handleBodyInteraction() {
    if (this._closeOnInteraction) {
      this.hide(0);
    }
  }
  _markForCheck() {
    this._changeDetectorRef.markForCheck();
  }
  _handleMouseLeave({
    relatedTarget
  }) {
    if (!relatedTarget || !this._triggerElement.contains(relatedTarget)) {
      if (this.isVisible()) {
        this.hide(this._mouseLeaveHideDelay);
      } else {
        this._finalizeAnimation(false);
      }
    }
  }
  _onShow() {
    this._isMultiline = this._isTooltipMultiline();
    this._markForCheck();
  }
  _isTooltipMultiline() {
    const rect = this._elementRef.nativeElement.getBoundingClientRect();
    return rect.height > MIN_HEIGHT && rect.width >= MAX_WIDTH;
  }
  _handleAnimationEnd({
    animationName
  }) {
    if (animationName === this._showAnimation || animationName === this._hideAnimation) {
      this._finalizeAnimation(animationName === this._showAnimation);
    }
  }
  _cancelPendingAnimations() {
    if (this._showTimeoutId != null) {
      clearTimeout(this._showTimeoutId);
    }
    if (this._hideTimeoutId != null) {
      clearTimeout(this._hideTimeoutId);
    }
    this._showTimeoutId = this._hideTimeoutId = undefined;
  }
  _finalizeAnimation(toVisible) {
    if (toVisible) {
      this._closeOnInteraction = true;
    } else if (!this.isVisible()) {
      this._onHide.next();
    }
  }
  _toggleVisibility(isVisible) {
    const tooltip = this._tooltip.nativeElement;
    const showClass = this._showAnimation;
    const hideClass = this._hideAnimation;
    tooltip.classList.remove(isVisible ? hideClass : showClass);
    tooltip.classList.add(isVisible ? showClass : hideClass);
    if (this._isVisible !== isVisible) {
      this._isVisible = isVisible;
      this._changeDetectorRef.markForCheck();
    }
    if (isVisible && !this._animationsDisabled && typeof getComputedStyle === 'function') {
      const styles = getComputedStyle(tooltip);
      if (styles.getPropertyValue('animation-duration') === '0s' || styles.getPropertyValue('animation-name') === 'none') {
        this._animationsDisabled = true;
      }
    }
    if (isVisible) {
      this._onShow();
    }
    if (this._animationsDisabled) {
      tooltip.classList.add('_mat-animation-noopable');
      this._finalizeAnimation(isVisible);
    }
  }
  static ɵfac = function TooltipComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || TooltipComponent)();
  };
  static ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: TooltipComponent,
    selectors: [["mat-tooltip-component"]],
    viewQuery: function TooltipComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_c0, 7);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx._tooltip = _t.first);
      }
    },
    hostAttrs: ["aria-hidden", "true"],
    hostBindings: function TooltipComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("mouseleave", function TooltipComponent_mouseleave_HostBindingHandler($event) {
          return ctx._handleMouseLeave($event);
        });
      }
    },
    decls: 4,
    vars: 4,
    consts: [["tooltip", ""], [1, "mdc-tooltip", "mat-mdc-tooltip", 3, "animationend", "ngClass"], [1, "mat-mdc-tooltip-surface", "mdc-tooltip__surface"]],
    template: function TooltipComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 1, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("animationend", function TooltipComponent_Template_div_animationend_0_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx._handleAnimationEnd($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("mdc-tooltip--multiline", ctx._isMultiline);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", ctx.tooltipClass);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx.message);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgClass],
    styles: [".mat-mdc-tooltip{position:relative;transform:scale(0);display:inline-flex}.mat-mdc-tooltip::before{content:\"\";top:0;right:0;bottom:0;left:0;z-index:-1;position:absolute}.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before{top:-8px}.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before{bottom:-8px}.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before{left:-8px}.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before{right:-8px}.mat-mdc-tooltip._mat-animation-noopable{animation:none;transform:scale(1)}.mat-mdc-tooltip-surface{word-break:normal;overflow-wrap:anywhere;padding:4px 8px;min-width:40px;max-width:200px;min-height:24px;max-height:40vh;box-sizing:border-box;overflow:hidden;text-align:center;will-change:transform,opacity;background-color:var(--mat-tooltip-container-color, var(--mat-sys-inverse-surface));color:var(--mat-tooltip-supporting-text-color, var(--mat-sys-inverse-on-surface));border-radius:var(--mat-tooltip-container-shape, var(--mat-sys-corner-extra-small));font-family:var(--mat-tooltip-supporting-text-font, var(--mat-sys-body-small-font));font-size:var(--mat-tooltip-supporting-text-size, var(--mat-sys-body-small-size));font-weight:var(--mat-tooltip-supporting-text-weight, var(--mat-sys-body-small-weight));line-height:var(--mat-tooltip-supporting-text-line-height, var(--mat-sys-body-small-line-height));letter-spacing:var(--mat-tooltip-supporting-text-tracking, var(--mat-sys-body-small-tracking))}.mat-mdc-tooltip-surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}.mdc-tooltip--multiline .mat-mdc-tooltip-surface{text-align:left}[dir=rtl] .mdc-tooltip--multiline .mat-mdc-tooltip-surface{text-align:right}.mat-mdc-tooltip-panel{line-height:normal}.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive{pointer-events:none}@keyframes mat-mdc-tooltip-show{0%{opacity:0;transform:scale(0.8)}100%{opacity:1;transform:scale(1)}}@keyframes mat-mdc-tooltip-hide{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0.8)}}.mat-mdc-tooltip-show{animation:mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards}.mat-mdc-tooltip-hide{animation:mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__.setClassMetadata(TooltipComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Component,
    args: [{
      selector: 'mat-tooltip-component',
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectionStrategy.OnPush,
      host: {
        '(mouseleave)': '_handleMouseLeave($event)',
        'aria-hidden': 'true'
      },
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgClass],
      template: "<div\n  #tooltip\n  class=\"mdc-tooltip mat-mdc-tooltip\"\n  [ngClass]=\"tooltipClass\"\n  (animationend)=\"_handleAnimationEnd($event)\"\n  [class.mdc-tooltip--multiline]=\"_isMultiline\">\n  <div class=\"mat-mdc-tooltip-surface mdc-tooltip__surface\">{{message}}</div>\n</div>\n",
      styles: [".mat-mdc-tooltip{position:relative;transform:scale(0);display:inline-flex}.mat-mdc-tooltip::before{content:\"\";top:0;right:0;bottom:0;left:0;z-index:-1;position:absolute}.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before{top:-8px}.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before{bottom:-8px}.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before{left:-8px}.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before{right:-8px}.mat-mdc-tooltip._mat-animation-noopable{animation:none;transform:scale(1)}.mat-mdc-tooltip-surface{word-break:normal;overflow-wrap:anywhere;padding:4px 8px;min-width:40px;max-width:200px;min-height:24px;max-height:40vh;box-sizing:border-box;overflow:hidden;text-align:center;will-change:transform,opacity;background-color:var(--mat-tooltip-container-color, var(--mat-sys-inverse-surface));color:var(--mat-tooltip-supporting-text-color, var(--mat-sys-inverse-on-surface));border-radius:var(--mat-tooltip-container-shape, var(--mat-sys-corner-extra-small));font-family:var(--mat-tooltip-supporting-text-font, var(--mat-sys-body-small-font));font-size:var(--mat-tooltip-supporting-text-size, var(--mat-sys-body-small-size));font-weight:var(--mat-tooltip-supporting-text-weight, var(--mat-sys-body-small-weight));line-height:var(--mat-tooltip-supporting-text-line-height, var(--mat-sys-body-small-line-height));letter-spacing:var(--mat-tooltip-supporting-text-tracking, var(--mat-sys-body-small-tracking))}.mat-mdc-tooltip-surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:\"\";pointer-events:none}.mdc-tooltip--multiline .mat-mdc-tooltip-surface{text-align:left}[dir=rtl] .mdc-tooltip--multiline .mat-mdc-tooltip-surface{text-align:right}.mat-mdc-tooltip-panel{line-height:normal}.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive{pointer-events:none}@keyframes mat-mdc-tooltip-show{0%{opacity:0;transform:scale(0.8)}100%{opacity:1;transform:scale(1)}}@keyframes mat-mdc-tooltip-hide{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0.8)}}.mat-mdc-tooltip-show{animation:mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards}.mat-mdc-tooltip-hide{animation:mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards}\n"]
    }]
  }], () => [], {
    _tooltip: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.ViewChild,
      args: ['tooltip', {
        static: true
      }]
    }]
  });
})();


/***/ },

/***/ 16291
/*!*****************************************************!*\
  !*** ./src/app/features/admin/admin.route.model.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   adminRoutes: () => (/* binding */ adminRoutes)
/* harmony export */ });
/* harmony import */ var _admin_dashboard_admin_dashboard_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./admin-dashboard/admin-dashboard.component */ 36330);

const adminRoutes = [{
  path: '',
  component: _admin_dashboard_admin_dashboard_component__WEBPACK_IMPORTED_MODULE_0__.AdminDashboardComponent
}];

/***/ },

/***/ 36269
/*!************************************************!*\
  !*** ./src/app/features/admin/admin.module.ts ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminModule: () => (/* binding */ AdminModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 79748);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-quill */ 12041);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ 12587);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 84175);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/tooltip */ 80640);
/* harmony import */ var _admin_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./admin-routing.module */ 15436);
/* harmony import */ var _admin_dashboard_admin_dashboard_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./admin-dashboard/admin-dashboard.component */ 36330);
/* harmony import */ var _admin_catalog_admin_catalog_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./admin-catalog/admin-catalog.component */ 71638);
/* harmony import */ var _admin_settings_admin_settings_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./admin-settings/admin-settings.component */ 58454);
/* harmony import */ var _confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./confirm-dialog/confirm-dialog.component */ 38830);
/* harmony import */ var _admin_promo_codes_admin_promo_codes_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./admin-promo-codes/admin-promo-codes.component */ 80922);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 36124);















class AdminModule {
  static {
    this.ɵfac = function AdminModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AdminModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineNgModule"]({
      type: AdminModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjector"]({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormsModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslateModule, _admin_routing_module__WEBPACK_IMPORTED_MODULE_7__.AdminRoutingModule, ngx_quill__WEBPACK_IMPORTED_MODULE_3__.QuillModule.forRoot(), _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_6__.MatTooltipModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵsetNgModuleScope"](AdminModule, {
    declarations: [_admin_dashboard_admin_dashboard_component__WEBPACK_IMPORTED_MODULE_8__.AdminDashboardComponent, _admin_catalog_admin_catalog_component__WEBPACK_IMPORTED_MODULE_9__.AdminCatalogComponent, _admin_settings_admin_settings_component__WEBPACK_IMPORTED_MODULE_10__.AdminSettingsComponent, _confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_11__.ConfirmDialogComponent, _admin_promo_codes_admin_promo_codes_component__WEBPACK_IMPORTED_MODULE_12__.AdminPromoCodesComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormsModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslateModule, _admin_routing_module__WEBPACK_IMPORTED_MODULE_7__.AdminRoutingModule, ngx_quill__WEBPACK_IMPORTED_MODULE_3__.QuillModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButtonModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_6__.MatTooltipModule]
  });
})();

/***/ },

/***/ 36330
/*!*****************************************************************************!*\
  !*** ./src/app/features/admin/admin-dashboard/admin-dashboard.component.ts ***!
  \*****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminDashboardComponent: () => (/* binding */ AdminDashboardComponent),
/* harmony export */   DELIVERY_MODE_LABELS: () => (/* binding */ DELIVERY_MODE_LABELS)
/* harmony export */ });
/* harmony import */ var C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/fire/database */ 41559);
/* harmony import */ var _angular_fire_functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/functions */ 55559);
/* harmony import */ var _confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../confirm-dialog/confirm-dialog.component */ 38830);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _shared_services_pricing_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/services/pricing.service */ 45212);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/dialog */ 12587);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 79748);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _admin_catalog_admin_catalog_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../admin-catalog/admin-catalog.component */ 71638);
/* harmony import */ var _admin_settings_admin_settings_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../admin-settings/admin-settings.component */ 58454);
/* harmony import */ var _admin_promo_codes_admin_promo_codes_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../admin-promo-codes/admin-promo-codes.component */ 80922);














function AdminDashboardComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "app-admin-catalog");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminDashboardComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "app-admin-settings");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminDashboardComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "app-admin-promo-codes");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminDashboardComponent_ng_container_16_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r0.error);
  }
}
function AdminDashboardComponent_ng_container_16_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Chargement des commandes\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminDashboardComponent_ng_container_16_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Aucune commande pour le moment.");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_4_tr_23_span_17_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const order_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", order_r4.pickupSubMode === "courier" ? "\uD83D\uDEF5 Coursier" : order_r4.pickupSubMode === "store" ? "\uD83C\uDFEA Magasin" : "\uD83C\uDFEA Retrait", " ");
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_4_tr_23_span_17_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "\u2708\uFE0F Exp\u00E9dition");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_4_tr_23_span_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, AdminDashboardComponent_ng_container_16_ng_container_4_tr_23_span_17_ng_container_1_Template, 2, 1, "ng-container", 5)(2, AdminDashboardComponent_ng_container_16_ng_container_4_tr_23_span_17_ng_container_2_Template, 2, 0, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const order_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("pickup", order_r4.deliveryMode === "pickup")("shipping", order_r4.deliveryMode === "shipping");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", order_r4.deliveryMode === "pickup");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", order_r4.deliveryMode !== "pickup");
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_4_tr_23_span_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "\u2014");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_4_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "tr", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_16_ng_container_4_tr_23_Template_tr_click_0_listener() {
      const order_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r3).$implicit;
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.selectOrder(order_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "td", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "td", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](6, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "td", 25)(8, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "td", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "td", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "td", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](17, AdminDashboardComponent_ng_container_16_ng_container_4_tr_23_span_17_Template, 3, 6, "span", 31)(18, AdminDashboardComponent_ng_container_16_ng_container_4_tr_23_span_18_Template, 2, 0, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "td", 32)(20, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const order_r4 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](3, 11, order_r4.createdAt, "dd/MM/yy HH:mm"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("#", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind3"](6, 14, order_r4.id, 0, 8));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](order_r4.customerName || "\u2014");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](order_r4.customerEmail);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r0.itemCount(order_r4));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r0.orderTotalTTC(order_r4));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", order_r4.deliveryMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !order_r4.deliveryMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleProp"]("background-color", ctx_r0.statusColors[order_r4.status]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r0.statusLabels[order_r4.status], " ");
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_4_nav_24_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_16_ng_container_4_nav_24_button_3_Template_button_click_0_listener() {
      const p_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6).$implicit;
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.goToOrdersPage(p_r7));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const p_r7 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("active", p_r7 === ctx_r0.ordersPage);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](p_r7);
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_4_nav_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "nav", 35)(1, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_16_ng_container_4_nav_24_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.goToOrdersPage(ctx_r0.ordersPage - 1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "\u2039");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, AdminDashboardComponent_ng_container_16_ng_container_4_nav_24_button_3_Template, 2, 3, "button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_16_ng_container_4_nav_24_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.goToOrdersPage(ctx_r0.ordersPage + 1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, "\u203A");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx_r0.ordersPage === 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r0.ordersPages);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx_r0.ordersPage === ctx_r0.ordersTotalPages);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate3"](" ", (ctx_r0.ordersPage - 1) * ctx_r0.ordersPageSize + 1, "\u2013", ctx_r0.minVal(ctx_r0.ordersPage * ctx_r0.ordersPageSize, ctx_r0.filteredOrders.length), " / ", ctx_r0.filteredOrders.length, " ");
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 14)(2, "input", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function AdminDashboardComponent_ng_container_16_ng_container_4_Template_input_ngModelChange_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r2);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx_r0.ordersFilter, $event) || (ctx_r0.ordersFilter = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function AdminDashboardComponent_ng_container_16_ng_container_4_Template_input_ngModelChange_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r2);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.onOrdersFilterChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "span", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "table", 17)(6, "thead")(7, "tr")(8, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9, "Date");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11, "R\u00E9f.");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](13, "Client");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "th", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](15, "Articles");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "th", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](17, "Total");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](19, "Livraison");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "th", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](21, "Statut");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](22, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](23, AdminDashboardComponent_ng_container_16_ng_container_4_tr_23_Template, 22, 18, "tr", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](24, AdminDashboardComponent_ng_container_16_ng_container_4_nav_24_Template, 8, 6, "nav", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx_r0.ordersFilter);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"](" ", ctx_r0.filteredOrders.length, " commande", ctx_r0.filteredOrders.length > 1 ? "s" : "", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r0.pagedOrders)("ngForTrackBy", ctx_r0.trackById);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.ordersTotalPages > 1);
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_div_22_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r0.selectedOrder.pickupSubMode === "courier" ? ctx_r0.deliveryModeLabels["pickup_courier"] : ctx_r0.selectedOrder.pickupSubMode === "store" ? ctx_r0.deliveryModeLabels["pickup_store"] : ctx_r0.deliveryModeLabels["pickup"], " ");
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_div_22_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r0.deliveryModeLabels[ctx_r0.selectedOrder.deliveryMode] || ctx_r0.selectedOrder.deliveryMode, " ");
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_div_22_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " \u2014 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "a", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("href", ctx_r0.selectedOrder.trackingUrl, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r0.selectedOrder.carrierName || "Suivi", " \u2192 ");
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_div_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 68)(1, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Livraison :");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, AdminDashboardComponent_ng_container_16_ng_container_5_div_22_ng_container_4_Template, 2, 1, "ng-container", 5)(5, AdminDashboardComponent_ng_container_16_ng_container_5_div_22_ng_container_5_Template, 2, 1, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](6, AdminDashboardComponent_ng_container_16_ng_container_5_div_22_span_6_Template, 4, 2, "span", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("pickup", ctx_r0.selectedOrder.deliveryMode === "pickup")("shipping", ctx_r0.selectedOrder.deliveryMode === "shipping");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.selectedOrder.deliveryMode === "pickup");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.selectedOrder.deliveryMode !== "pickup");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.selectedOrder.trackingUrl);
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_div_23_span_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r0.selectedOrder.shippingAddress.address2);
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_div_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 72)(1, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Adresse :");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "address", 73)(4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](6, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](8, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](9, AdminDashboardComponent_ng_container_16_ng_container_5_div_23_span_9_Template, 3, 1, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](11, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](13, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"]("", ctx_r0.selectedOrder.shippingAddress.firstName, " ", ctx_r0.selectedOrder.shippingAddress.lastName);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r0.selectedOrder.shippingAddress.address1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.selectedOrder.shippingAddress.address2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"](" ", ctx_r0.selectedOrder.shippingAddress.postalCode, " ", ctx_r0.selectedOrder.shippingAddress.city);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r0.selectedOrder.shippingAddress.country);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" T\u00E9l : ", ctx_r0.selectedOrder.shippingAddress.phone, " ");
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_div_25_img_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "img", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_16_ng_container_5_div_25_img_4_Template_img_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r11);
      const item_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      ctx_r0.openLightbox(item_r12.path || item_r12.coverUrl);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("src", item_r12.path || item_r12.coverUrl, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsanitizeUrl"])("alt", item_r12.reference || item_r12.title || "");
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_div_25_span_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("REF: ", item_r12.reference);
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_div_25_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r0.formatByOrderCurrency(item_r12.price * ((item_r12.basketInfos == null ? null : item_r12.basketInfos.selectedQuantity) ?? 1), ctx_r0.selectedOrder), " ");
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_div_25_div_9_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div")(1, "span", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Taille :");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", item_r12.basketInfos == null ? null : item_r12.basketInfos.selectedSize);
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_div_25_div_9_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div")(1, "span", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Mod\u00E8le :");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", item_r12.basketInfos == null ? null : item_r12.basketInfos.selectedModel);
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_div_25_div_9_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div")(1, "span", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Prix unitaire :");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2).$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r0.formatByOrderCurrency(item_r12.price, ctx_r0.selectedOrder));
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_div_25_div_9_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div")(1, "span", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Sous-total :");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2).$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r0.formatByOrderCurrency((item_r12.price || 0) * ((item_r12.basketInfos == null ? null : item_r12.basketInfos.selectedQuantity) ?? 1), ctx_r0.selectedOrder));
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_div_25_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 85)(1, "div", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, AdminDashboardComponent_ng_container_16_ng_container_5_div_25_div_9_div_2_Template, 4, 1, "div", 5)(3, AdminDashboardComponent_ng_container_16_ng_container_5_div_25_div_9_div_3_Template, 4, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div")(5, "span", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "Quantit\u00E9 :");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, AdminDashboardComponent_ng_container_16_ng_container_5_div_25_div_9_div_8_Template, 4, 1, "div", 5)(9, AdminDashboardComponent_ng_container_16_ng_container_5_div_25_div_9_div_9_Template, 4, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", item_r12.basketInfos == null ? null : item_r12.basketInfos.selectedSize);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", item_r12.basketInfos == null ? null : item_r12.basketInfos.selectedModel);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", (item_r12.basketInfos == null ? null : item_r12.basketInfos.selectedQuantity) ?? 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", item_r12.price);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", item_r12.price);
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_div_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 74)(1, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_16_ng_container_5_div_25_Template_div_click_1_listener() {
      const i_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r9).index;
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.toggleItem(ctx_r0.selectedOrder.id, i_r10));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "span", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, AdminDashboardComponent_ng_container_16_ng_container_5_div_25_img_4_Template, 1, 2, "img", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "span", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](7, AdminDashboardComponent_ng_container_16_ng_container_5_div_25_span_7_Template, 2, 1, "span", 79)(8, AdminDashboardComponent_ng_container_16_ng_container_5_div_25_span_8_Template, 2, 1, "span", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](9, AdminDashboardComponent_ng_container_16_ng_container_5_div_25_div_9_Template, 10, 5, "div", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r12 = ctx.$implicit;
    const i_r10 = ctx.index;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r0.isExpanded(ctx_r0.selectedOrder.id, i_r10) ? "\u25BE" : "\u25B8");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", item_r12.path || item_r12.coverUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](item_r12.title || item_r12.reference || "\u2014");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", item_r12.title && item_r12.reference);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", item_r12.price);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.isExpanded(ctx_r0.selectedOrder.id, i_r10));
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_div_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 54)(1, "span", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "TVA (10%) :");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "span", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const tva_r13 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](tva_r13);
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_div_32_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r0.selectedOrder.currency === "EUR" ? ctx_r0.formatEUR(ctx_r0.selectedOrder.shippingCost / ctx_r0.EUR_TO_XAF) : ctx_r0.formatXAF(ctx_r0.selectedOrder.shippingCost));
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_div_32_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "\u00C0 renseigner");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_div_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 54)(1, "span", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Frais de port :");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, AdminDashboardComponent_ng_container_16_ng_container_5_div_32_span_3_Template, 2, 1, "span", 88)(4, AdminDashboardComponent_ng_container_16_ng_container_5_div_32_span_4_Template, 2, 0, "span", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.selectedOrder.shippingCost != null);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.selectedOrder.shippingCost == null);
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_button_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_16_ng_container_5_button_41_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r14);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.setStatus(ctx_r0.selectedOrder, "ready"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx_r0.updatingOrderId === ctx_r0.selectedOrder.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r0.updatingOrderId === ctx_r0.selectedOrder.id ? "\u2026" : "Marquer comme pr\u00EAte", " ");
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_button_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_16_ng_container_5_button_42_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r15);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.openReadyForm(ctx_r0.selectedOrder.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " Marquer comme pr\u00EAte ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx_r0.updatingOrderId === ctx_r0.selectedOrder.id);
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_div_43_span_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Veuillez saisir un montant valide (\u2265 0).");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_div_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 92)(1, "p", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, " \u2708\uFE0F Exp\u00E9dition internationale \u2014 renseignez les frais de port (en \u20AC) avant de valider. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 94)(4, "label", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, "Frais de port (FCFA) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "span", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "input", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function AdminDashboardComponent_ng_container_16_ng_container_5_div_43_Template_input_ngModelChange_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r16);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx_r0.shippingCostInput, $event) || (ctx_r0.shippingCostInput = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](9, AdminDashboardComponent_ng_container_16_ng_container_5_div_43_span_9_Template, 2, 0, "span", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "div", 99)(11, "button", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_16_ng_container_5_div_43_Template_button_click_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r16);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.confirmReady(ctx_r0.selectedOrder));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "button", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_16_ng_container_5_div_43_Template_button_click_13_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r16);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.cancelReadyForm());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14, "Annuler");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("input-error", ctx_r0.shippingCostError);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx_r0.shippingCostInput);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.shippingCostError);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx_r0.updatingOrderId === ctx_r0.selectedOrder.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r0.updatingOrderId === ctx_r0.selectedOrder.id ? "\u2026" : "\u2713 Confirmer", " ");
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_button_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_16_ng_container_5_button_44_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r17);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.setStatus(ctx_r0.selectedOrder, "paid"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx_r0.updatingOrderId === ctx_r0.selectedOrder.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r0.updatingOrderId === ctx_r0.selectedOrder.id ? "\u2026" : "Marquer comme pay\u00E9e", " ");
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_button_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_16_ng_container_5_button_45_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r18);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.resendPaymentEmail(ctx_r0.selectedOrder));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx_r0.resendingEmailId === ctx_r0.selectedOrder.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r0.resendingEmailId === ctx_r0.selectedOrder.id ? "Envoi\u2026" : "\u2709 Renvoyer la demande de paiement", " ");
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_button_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_16_ng_container_5_button_46_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r19);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.openShippingForm(ctx_r0.selectedOrder.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " Marquer comme exp\u00E9di\u00E9e ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_div_47_span_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "L'URL de suivi est obligatoire.");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_div_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 92)(1, "div", 94)(2, "label", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "Transporteur ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "span", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, "(optionnel)");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "input", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function AdminDashboardComponent_ng_container_16_ng_container_5_div_47_Template_input_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r20);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx_r0.carrierName, $event) || (ctx_r0.carrierName = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "div", 94)(8, "label", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9, "URL de suivi ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "span", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "input", 107);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function AdminDashboardComponent_ng_container_16_ng_container_5_div_47_Template_input_ngModelChange_12_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r20);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx_r0.trackingUrl, $event) || (ctx_r0.trackingUrl = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](13, AdminDashboardComponent_ng_container_16_ng_container_5_div_47_span_13_Template, 2, 0, "span", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "div", 99)(15, "button", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_16_ng_container_5_div_47_Template_button_click_15_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r20);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.confirmShipped(ctx_r0.selectedOrder));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "button", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_16_ng_container_5_div_47_Template_button_click_17_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r20);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.cancelShippingForm());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](18, "Annuler");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx_r0.carrierName);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("input-error", ctx_r0.trackingUrlError);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx_r0.trackingUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.trackingUrlError);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx_r0.updatingOrderId === ctx_r0.selectedOrder.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r0.updatingOrderId === ctx_r0.selectedOrder.id ? "Envoi\u2026" : "\u2713 Confirmer l'exp\u00E9dition", " ");
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_span_48_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "\u2713 Exp\u00E9di\u00E9e");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_div_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 110)(1, "span", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "\u2717 Annul\u00E9e");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "button", 112);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_16_ng_container_5_div_49_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r21);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.deleteOrder(ctx_r0.selectedOrder));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx_r0.updatingOrderId === ctx_r0.selectedOrder.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r0.updatingOrderId === ctx_r0.selectedOrder.id ? "\u2026" : "Supprimer d\u00E9finitivement", " ");
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_button_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 112);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_16_ng_container_5_button_50_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r22);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.openCancelConfirm(ctx_r0.selectedOrder));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " Annuler la commande ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx_r0.updatingOrderId === ctx_r0.selectedOrder.id);
  }
}
function AdminDashboardComponent_ng_container_16_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 40)(2, "button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_16_ng_container_5_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r8);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.backToOrders());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "\u2190 Retour aux commandes");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 42)(5, "div", 43)(6, "span", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](11, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "div", 46)(15, "div", 47)(16, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](17, "Client :");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "a", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](22, AdminDashboardComponent_ng_container_16_ng_container_5_div_22_Template, 7, 7, "div", 50)(23, AdminDashboardComponent_ng_container_16_ng_container_5_div_23_Template, 15, 8, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](24, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](25, AdminDashboardComponent_ng_container_16_ng_container_5_div_25_Template, 10, 6, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](26, "div", 54)(27, "span", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](28, "Sous-total HT :");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](29, "span", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](31, AdminDashboardComponent_ng_container_16_ng_container_5_div_31_Template, 5, 1, "div", 57)(32, AdminDashboardComponent_ng_container_16_ng_container_5_div_32_Template, 5, 2, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](33, "div", 58)(34, "span", 55)(35, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](36, "Total TTC :");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](37, "span", 56)(38, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](39);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](40, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](41, AdminDashboardComponent_ng_container_16_ng_container_5_button_41_Template, 2, 2, "button", 60)(42, AdminDashboardComponent_ng_container_16_ng_container_5_button_42_Template, 2, 1, "button", 60)(43, AdminDashboardComponent_ng_container_16_ng_container_5_div_43_Template, 15, 6, "div", 61)(44, AdminDashboardComponent_ng_container_16_ng_container_5_button_44_Template, 2, 2, "button", 62)(45, AdminDashboardComponent_ng_container_16_ng_container_5_button_45_Template, 2, 2, "button", 63)(46, AdminDashboardComponent_ng_container_16_ng_container_5_button_46_Template, 2, 0, "button", 64)(47, AdminDashboardComponent_ng_container_16_ng_container_5_div_47_Template, 19, 7, "div", 61)(48, AdminDashboardComponent_ng_container_16_ng_container_5_span_48_Template, 2, 0, "span", 65)(49, AdminDashboardComponent_ng_container_16_ng_container_5_div_49_Template, 5, 2, "div", 66)(50, AdminDashboardComponent_ng_container_16_ng_container_5_button_50_Template, 2, 1, "button", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("Commande #", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind3"](8, 25, ctx_r0.selectedOrder.id, 0, 8));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](11, 29, ctx_r0.selectedOrder.createdAt, "dd/MM/yyyy HH:mm"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleProp"]("background-color", ctx_r0.statusColors[ctx_r0.selectedOrder.status]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r0.statusLabels[ctx_r0.selectedOrder.status], " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r0.selectedOrder.customerName || ctx_r0.selectedOrder.customerEmail);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("href", "mailto:" + ctx_r0.selectedOrder.customerEmail, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r0.selectedOrder.customerEmail);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.selectedOrder.deliveryMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.selectedOrder.shippingAddress);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r0.selectedOrder.items);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r0.orderTotal(ctx_r0.selectedOrder));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.orderTvaAmount(ctx_r0.selectedOrder));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.selectedOrder.deliveryMode === "shipping");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r0.orderTotalTTC(ctx_r0.selectedOrder));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.selectedOrder.status === "pending" && ctx_r0.selectedOrder.deliveryMode !== "shipping");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.selectedOrder.status === "pending" && ctx_r0.selectedOrder.deliveryMode === "shipping" && ctx_r0.readyFormOrderId !== ctx_r0.selectedOrder.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.selectedOrder.status === "pending" && ctx_r0.readyFormOrderId === ctx_r0.selectedOrder.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.selectedOrder.status === "ready");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.selectedOrder.status === "ready");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.selectedOrder.status === "paid" && ctx_r0.shippingFormOrderId !== ctx_r0.selectedOrder.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.selectedOrder.status === "paid" && ctx_r0.shippingFormOrderId === ctx_r0.selectedOrder.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.selectedOrder.status === "shipped");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.selectedOrder.status === "cancelled");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx_r0.selectedOrder.status || ctx_r0.selectedOrder.status === "pending" || ctx_r0.selectedOrder.status === "ready");
  }
}
function AdminDashboardComponent_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, AdminDashboardComponent_ng_container_16_div_1_Template, 2, 1, "div", 8)(2, AdminDashboardComponent_ng_container_16_div_2_Template, 2, 0, "div", 9)(3, AdminDashboardComponent_ng_container_16_div_3_Template, 2, 0, "div", 10)(4, AdminDashboardComponent_ng_container_16_ng_container_4_Template, 25, 6, "ng-container", 5)(5, AdminDashboardComponent_ng_container_16_ng_container_5_Template, 51, 32, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.error);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.loading);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx_r0.loading && ctx_r0.orders.length === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx_r0.loading && ctx_r0.orders.length > 0 && !ctx_r0.selectedOrder);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.selectedOrder);
  }
}
function AdminDashboardComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_div_17_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r23);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.closeLightbox());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "img", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_div_17_Template_img_click_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r23);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "button", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_div_17_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r23);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.closeLightbox());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("src", ctx_r0.lightboxSrc, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsanitizeUrl"]);
  }
}
const DELIVERY_MODE_LABELS = {
  pickup: '🏪 Retrait au Gabon',
  pickup_courier: '🛵 Payé à réception au livreur',
  pickup_store: '🏪 Récupération au magasin',
  shipping: '✈️ Expédition internationale'
};
class AdminDashboardComponent {
  get filteredOrders() {
    const q = this.ordersFilter.trim().toLowerCase();
    if (!q) return this.orders;
    return this.orders.filter(o => o.id.toLowerCase().includes(q) || (o.customerName ?? '').toLowerCase().includes(q) || (o.customerEmail ?? '').toLowerCase().includes(q));
  }
  get ordersTotalPages() {
    return Math.max(1, Math.ceil(this.filteredOrders.length / this.ordersPageSize));
  }
  get pagedOrders() {
    const start = (this.ordersPage - 1) * this.ordersPageSize;
    return this.filteredOrders.slice(start, start + this.ordersPageSize);
  }
  get ordersPages() {
    return Array.from({
      length: this.ordersTotalPages
    }, (_, i) => i + 1);
  }
  goToOrdersPage(page) {
    if (page < 1 || page > this.ordersTotalPages) return;
    this.ordersPage = page;
  }
  onOrdersFilterChange() {
    this.ordersPage = 1;
  }
  constructor(pricing, db, fns, dialog) {
    this.pricing = pricing;
    this.db = db;
    this.fns = fns;
    this.dialog = dialog;
    this.orders = [];
    this.loading = true;
    this.updatingOrderId = null;
    this.resendingEmailId = null;
    this.error = null;
    this.expandedItemKey = null;
    this.lightboxSrc = null;
    this.selectedOrder = null;
    // Formulaire d'expédition inline
    this.shippingFormOrderId = null;
    this.trackingUrl = '';
    this.carrierName = '';
    this.trackingUrlError = false;
    // Formulaire "prête" (frais de port pour expédition internationale)
    this.readyFormOrderId = null;
    this.shippingCostInput = null;
    this.shippingCostError = false;
    this.activeTab = 'orders';
    // ── Filtre + pagination commandes
    this.ordersFilter = '';
    this.ordersPageSize = 10;
    this.ordersPage = 1;
    this.ordersUnsubscribe = null;
    this.ordersRetryTimeout = null;
    this.statusLabels = {
      pending: 'En attente',
      ready: 'Prête',
      paid: 'Payée',
      shipped: 'Expédiée',
      cancelled: 'Annulée'
    };
    this.statusColors = {
      pending: '#e67e22',
      ready: '#148f77',
      paid: '#2c3e50',
      shipped: '#6c3483',
      cancelled: '#95a5a6'
    };
    this.deliveryModeLabels = DELIVERY_MODE_LABELS;
    this.EUR_TO_XAF = 655.96;
  }
  orderRawHT(order) {
    return (order.items ?? []).reduce((sum, item) => {
      const qty = item.basketInfos?.selectedQuantity ?? 1;
      return sum + (item.price ?? 0) * qty;
    }, 0);
  }
  toXAF(eur) {
    return Math.round(eur * this.EUR_TO_XAF / 100) * 100;
  }
  formatXAF(xaf) {
    return Math.round(xaf).toLocaleString('fr-FR') + ' FCFA';
  }
  formatEUR(eur) {
    return `${eur >= 1 ? Math.round(eur) : eur.toFixed(2)} €`;
  }
  formatByOrderCurrency(amountEur, order) {
    return order.currency === 'EUR' ? this.formatEUR(amountEur) : this.formatXAF(this.toXAF(amountEur));
  }
  orderTotal(order) {
    return this.formatByOrderCurrency(this.orderRawHT(order), order);
  }
  /** TVA 10% uniquement pour expédition internationale. */
  orderTvaAmount(order) {
    if (order.deliveryMode !== 'shipping') return null;
    return this.formatByOrderCurrency(this.orderRawHT(order) * 0.1, order);
  }
  orderTotalTTC(order) {
    const htEur = this.orderRawHT(order);
    const tvaEur = order.deliveryMode === 'shipping' ? htEur * 0.1 : 0;
    const shippingXAF = order.shippingCost ?? 0;
    if (order.currency === 'EUR') {
      const shippingEur = shippingXAF / this.EUR_TO_XAF;
      return this.formatEUR(htEur + tvaEur + shippingEur);
    }
    return this.formatXAF(this.toXAF(htEur) + this.toXAF(tvaEur) + shippingXAF);
  }
  toggleItem(orderId, index) {
    const key = `${orderId}-${index}`;
    this.expandedItemKey = this.expandedItemKey === key ? null : key;
  }
  openLightbox(src) {
    this.lightboxSrc = src;
  }
  closeLightbox() {
    this.lightboxSrc = null;
  }
  isExpanded(orderId, index) {
    return this.expandedItemKey === `${orderId}-${index}`;
  }
  ngOnInit() {
    this.subscribeToOrders();
  }
  subscribeToOrders() {
    this.ordersUnsubscribe?.();
    this.ordersUnsubscribe = (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.onValue)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.ref)(this.db, 'orders'), snap => {
      this.loading = false;
      this.error = null;
      if (!snap.exists()) {
        this.orders = [];
        return;
      }
      const raw = snap.val();
      this.orders = Object.entries(raw).map(([id, data]) => ({
        id,
        ...data
      })).sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
      if (this.selectedOrder) {
        this.selectedOrder = this.orders.find(o => o.id === this.selectedOrder.id) ?? null;
      }
    }, err => {
      this.loading = false;
      console.warn('[AdminDashboard] orders listener revoked, retrying in 3s…', err);
      // Réabonnement automatique après un court délai (token refresh transitoire)
      this.ordersRetryTimeout = setTimeout(() => this.subscribeToOrders(), 3000);
    });
  }
  ngOnDestroy() {
    this.ordersUnsubscribe?.();
    if (this.ordersRetryTimeout) clearTimeout(this.ordersRetryTimeout);
  }
  openShippingForm(orderId) {
    this.shippingFormOrderId = orderId;
    this.trackingUrl = '';
    this.carrierName = '';
    this.trackingUrlError = false;
    this.error = null;
  }
  cancelShippingForm() {
    this.shippingFormOrderId = null;
  }
  openReadyForm(orderId) {
    this.readyFormOrderId = orderId;
    this.shippingCostInput = null;
    this.shippingCostError = false;
    this.error = null;
  }
  cancelReadyForm() {
    this.readyFormOrderId = null;
  }
  openCancelConfirm(order) {
    const dialogRef = this.dialog.open(_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_3__.ConfirmDialogComponent, {
      width: '420px',
      data: {
        title: 'Annuler la commande',
        message: '⚠️ Confirmer l\'annulation ? Le stock sera restauré et le client ne verra plus cette commande.',
        confirmLabel: 'Annuler la commande',
        cancelLabel: 'Retour'
      }
    });
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) this.doCancel(order);
    });
  }
  doCancel(order) {
    var _this = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.updatingOrderId) return;
      _this.updatingOrderId = order.id;
      _this.error = null;
      try {
        // Suppression complète : orders + orderStatus + commends
        const removes = [(0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.remove)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.ref)(_this.db, `orders/${order.id}`))];
        if (order.uid) {
          removes.push((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.remove)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.ref)(_this.db, `users/${order.uid}/orderStatus/${order.id}`)));
          removes.push((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.remove)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.ref)(_this.db, `users/${order.uid}/commends`)));
        }
        yield Promise.all(removes);
        // Restauration du stock
        const items = Array.isArray(order.items) ? order.items : Object.values(order.items ?? {});
        yield Promise.all(items.map(item => {
          if (!item.reference) return Promise.resolve();
          const qty = item.basketInfos?.selectedQuantity ?? 1;
          return (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.runTransaction)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.ref)(_this.db, `stock/${item.reference}`), current => {
            if (current === null) return {
              available: qty
            };
            return {
              ...current,
              available: (current.available ?? 0) + qty
            };
          });
        }));
        _this.selectedOrder = null;
      } catch (err) {
        _this.error = err?.message ?? 'Erreur lors de l\'annulation.';
        console.error(err);
      } finally {
        _this.updatingOrderId = null;
      }
    })();
  }
  deleteOrder(order) {
    var _this2 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this2.updatingOrderId) return;
      _this2.updatingOrderId = order.id;
      _this2.error = null;
      try {
        const removes = [(0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.remove)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.ref)(_this2.db, `orders/${order.id}`))];
        if (order.uid) {
          removes.push((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.remove)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.ref)(_this2.db, `users/${order.uid}/orderStatus/${order.id}`)));
        }
        yield Promise.all(removes);
        _this2.selectedOrder = null;
      } catch (err) {
        _this2.error = err?.message ?? 'Erreur lors de la suppression.';
        console.error(err);
      } finally {
        _this2.updatingOrderId = null;
      }
    })();
  }
  confirmReady(order) {
    var _this3 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const cost = _this3.shippingCostInput;
      if (cost === null || cost < 0) {
        _this3.shippingCostError = true;
        return;
      }
      if (_this3.updatingOrderId) return;
      _this3.updatingOrderId = order.id;
      _this3.shippingCostError = false;
      _this3.error = null;
      try {
        yield (0,_angular_fire_functions__WEBPACK_IMPORTED_MODULE_2__.httpsCallable)(_this3.fns, 'updateOrderStatus')({
          orderId: order.id,
          status: 'ready',
          shippingCost: cost
        });
        // Écriture directe pour garantir la persistance de shippingCost
        // indépendamment de la version déployée de la cloud function.
        const writes = {
          [`orders/${order.id}/shippingCost`]: cost
        };
        if (order.uid) {
          writes[`users/${order.uid}/orderStatus/${order.id}/shippingCost`] = cost;
        }
        yield (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.update)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.ref)(_this3.db, '/'), writes);
        _this3.readyFormOrderId = null;
      } catch (err) {
        _this3.error = err?.message ?? 'Erreur lors de la mise à jour.';
        console.error(err);
      } finally {
        _this3.updatingOrderId = null;
      }
    })();
  }
  confirmShipped(order) {
    var _this4 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this4.trackingUrl.trim()) {
        _this4.trackingUrlError = true;
        return;
      }
      if (_this4.updatingOrderId) return;
      _this4.updatingOrderId = order.id;
      _this4.trackingUrlError = false;
      _this4.error = null;
      try {
        yield (0,_angular_fire_functions__WEBPACK_IMPORTED_MODULE_2__.httpsCallable)(_this4.fns, 'updateOrderStatus')({
          orderId: order.id,
          status: 'shipped',
          trackingUrl: _this4.trackingUrl.trim(),
          carrierName: _this4.carrierName.trim()
        });
        _this4.shippingFormOrderId = null;
      } catch (err) {
        _this4.error = err?.message ?? 'Erreur lors de l\'expédition.';
        console.error(err);
      } finally {
        _this4.updatingOrderId = null;
      }
    })();
  }
  setStatus(order, status) {
    var _this5 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this5.updatingOrderId) return;
      _this5.updatingOrderId = order.id;
      _this5.error = null;
      try {
        yield (0,_angular_fire_functions__WEBPACK_IMPORTED_MODULE_2__.httpsCallable)(_this5.fns, 'updateOrderStatus')({
          orderId: order.id,
          status
        });
      } catch (err) {
        _this5.error = err?.message ?? 'Erreur lors de la mise à jour.';
        console.error(err);
      } finally {
        _this5.updatingOrderId = null;
      }
    })();
  }
  resendPaymentEmail(order) {
    var _this6 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this6.resendingEmailId) return;
      _this6.resendingEmailId = order.id;
      _this6.error = null;
      try {
        yield (0,_angular_fire_functions__WEBPACK_IMPORTED_MODULE_2__.httpsCallable)(_this6.fns, 'resendPaymentEmail')({
          orderId: order.id
        });
      } catch (err) {
        _this6.error = err?.message ?? 'Erreur lors du renvoi de l\'email.';
        console.error(err);
      } finally {
        _this6.resendingEmailId = null;
      }
    })();
  }
  selectOrder(order) {
    this.selectedOrder = order;
    this.shippingFormOrderId = null;
    this.expandedItemKey = null;
  }
  backToOrders() {
    this.selectedOrder = null;
    this.shippingFormOrderId = null;
  }
  itemCount(order) {
    return (order.items ?? []).reduce((s, i) => s + (i.basketInfos?.selectedQuantity ?? 1), 0);
  }
  minVal(a, b) {
    return Math.min(a, b);
  }
  trackById(_, order) {
    return order.id;
  }
  static {
    this.ɵfac = function AdminDashboardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AdminDashboardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_shared_services_pricing_service__WEBPACK_IMPORTED_MODULE_6__.PricingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.Database), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_fire_functions__WEBPACK_IMPORTED_MODULE_2__.Functions), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__.MatDialog));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
      type: AdminDashboardComponent,
      selectors: [["app-admin-dashboard"]],
      standalone: false,
      decls: 18,
      vars: 13,
      consts: [[1, "admin-container"], [1, "admin-header"], [1, "admin-tabs"], [1, "tab-btn", 3, "click"], ["class", "catalog-tab-section", 4, "ngIf"], [4, "ngIf"], ["class", "lightbox-overlay", 3, "click", 4, "ngIf"], [1, "catalog-tab-section"], ["class", "error-banner", 4, "ngIf"], ["class", "loading", 4, "ngIf"], ["class", "empty", 4, "ngIf"], [1, "error-banner"], [1, "loading"], [1, "empty"], [1, "orders-filter-bar"], ["type", "search", "placeholder", "Filtrer par r\u00E9f., nom ou email\u2026", 1, "orders-filter-input", 3, "ngModelChange", "ngModel"], [1, "orders-filter-count"], [1, "orders-table"], [1, "text-center"], [1, "text-right"], ["class", "order-row", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "orders-pagination", 4, "ngIf"], [1, "order-row", 3, "click"], ["data-label", "Date", 1, "col-date"], ["data-label", "R\u00E9f.", 1, "col-ref"], ["data-label", "Client", 1, "col-customer"], [1, "customer-name"], [1, "customer-email"], ["data-label", "Articles", 1, "text-center", "col-qty"], ["data-label", "Total", 1, "text-right", "col-total"], ["data-label", "Livraison", 1, "col-delivery"], ["class", "delivery-badge", 3, "pickup", "shipping", 4, "ngIf"], ["data-label", "Statut", 1, "text-center", "col-status"], [1, "status-badge"], [1, "delivery-badge"], [1, "orders-pagination"], [1, "page-btn", 3, "click", "disabled"], ["class", "page-btn", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "page-info"], [1, "page-btn", 3, "click"], [1, "order-detail-header"], [1, "btn-back-orders", 3, "click"], [1, "order-detail-meta"], [1, "order-detail-title"], [1, "order-id"], [1, "order-date"], [1, "order-card"], [1, "customer-info"], [1, "label"], [1, "email-link", 3, "href"], ["class", "delivery-info", 4, "ngIf"], ["class", "shipping-address-block", 4, "ngIf"], [1, "items-list"], ["class", "item-row-wrapper", 4, "ngFor", "ngForOf"], [1, "order-total"], [1, "total-label"], [1, "total-amount"], ["class", "order-total", 4, "ngIf"], [1, "order-total", "order-total--ttc"], [1, "order-actions"], ["class", "btn btn-ready", 3, "disabled", "click", 4, "ngIf"], ["class", "shipping-form", 4, "ngIf"], ["class", "btn btn-paid", 3, "disabled", "click", 4, "ngIf"], ["class", "btn btn-resend", 3, "disabled", "click", 4, "ngIf"], ["class", "btn btn-shipped", 3, "click", 4, "ngIf"], ["class", "shipped-label", 4, "ngIf"], ["class", "cancelled-actions", 4, "ngIf"], ["class", "btn btn-cancel-order", 3, "disabled", "click", 4, "ngIf"], [1, "delivery-info"], ["class", "tracking-link-wrap", 4, "ngIf"], [1, "tracking-link-wrap"], ["target", "_blank", "rel", "noopener", 1, "tracking-link", 3, "href"], [1, "shipping-address-block"], [1, "shipping-address-detail"], [1, "item-row-wrapper"], [1, "item-row", 3, "click"], [1, "item-toggle"], ["class", "item-thumb-inline", 3, "src", "alt", "click", 4, "ngIf"], [1, "item-title"], ["class", "item-ref", 4, "ngIf"], ["class", "item-price", 4, "ngIf"], ["class", "item-detail-panel", 4, "ngIf"], [1, "item-thumb-inline", 3, "click", "src", "alt"], [1, "item-ref"], [1, "item-price"], [1, "item-detail-panel"], [1, "item-detail-info"], [1, "detail-label"], ["class", "total-amount", 4, "ngIf"], ["class", "total-amount shipping-pending-label", 4, "ngIf"], [1, "total-amount", "shipping-pending-label"], [1, "btn", "btn-ready", 3, "click", "disabled"], [1, "shipping-form"], [1, "shipping-form-info"], [1, "shipping-form-field"], [1, "shipping-label"], [1, "required"], ["type", "number", "min", "0", "step", "1", "placeholder", "ex : 15000", 1, "shipping-input", 3, "ngModelChange", "ngModel"], ["class", "field-error", 4, "ngIf"], [1, "shipping-form-actions"], [1, "btn", "btn-cancel", 3, "click"], [1, "field-error"], [1, "btn", "btn-paid", 3, "click", "disabled"], [1, "btn", "btn-resend", 3, "click", "disabled"], [1, "btn", "btn-shipped", 3, "click"], [1, "optional"], ["type", "text", "placeholder", "ex : DHL, FedEx\u2026", 1, "shipping-input", 3, "ngModelChange", "ngModel"], ["type", "url", "placeholder", "https://\u2026", 1, "shipping-input", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-shipped", 3, "click", "disabled"], [1, "shipped-label"], [1, "cancelled-actions"], [1, "cancelled-label"], [1, "btn", "btn-cancel-order", 3, "click", "disabled"], [1, "lightbox-overlay", 3, "click"], [1, "lightbox-img", 3, "click", "src"], [1, "lightbox-close", 3, "click"]],
      template: function AdminDashboardComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "header", 1)(2, "h1");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "Tableau de bord");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 2)(5, "button", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_Template_button_click_5_listener() {
            return ctx.activeTab = "orders";
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "Commandes");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "button", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_Template_button_click_7_listener() {
            return ctx.activeTab = "catalog";
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, "Catalogue");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "button", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_Template_button_click_9_listener() {
            return ctx.activeTab = "settings";
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10, "Param\u00E8tres");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "button", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_Template_button_click_11_listener() {
            return ctx.activeTab = "promos";
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12, "Promotions");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](13, AdminDashboardComponent_div_13_Template, 2, 0, "div", 4)(14, AdminDashboardComponent_div_14_Template, 2, 0, "div", 4)(15, AdminDashboardComponent_div_15_Template, 2, 0, "div", 4)(16, AdminDashboardComponent_ng_container_16_Template, 6, 5, "ng-container", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](17, AdminDashboardComponent_div_17_Template, 4, 1, "div", 6);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("active", ctx.activeTab === "orders");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("active", ctx.activeTab === "catalog");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("active", ctx.activeTab === "settings");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("active", ctx.activeTab === "promos");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.activeTab === "catalog");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.activeTab === "settings");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.activeTab === "promos");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.activeTab === "orders");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.lightboxSrc);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _admin_catalog_admin_catalog_component__WEBPACK_IMPORTED_MODULE_10__.AdminCatalogComponent, _admin_settings_admin_settings_component__WEBPACK_IMPORTED_MODULE_11__.AdminSettingsComponent, _admin_promo_codes_admin_promo_codes_component__WEBPACK_IMPORTED_MODULE_12__.AdminPromoCodesComponent, _angular_common__WEBPACK_IMPORTED_MODULE_8__.SlicePipe, _angular_common__WEBPACK_IMPORTED_MODULE_8__.DatePipe],
      styles: [".admin-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-top: 16px;\n}\n\n.tab-btn[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n  padding: 8px 20px;\n  border: 2px solid #148f77;\n  border-radius: 4px;\n  background: transparent;\n  color: #148f77;\n  font-family: \"Work Sans\", sans-serif;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.15s, color 0.15s;\n  text-align: center;\n}\n.tab-btn.active[_ngcontent-%COMP%] {\n  background: #148f77;\n  color: #fff;\n}\n\n.catalog-tab-section[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n\n.stock-section[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n\n.stock-search-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n\n.stock-search-input[_ngcontent-%COMP%] {\n  width: 280px;\n  padding: 8px 12px;\n  border: 2px solid #dfe6e9;\n  border-radius: 6px;\n  font-family: \"Work Sans\", sans-serif;\n  font-size: 14px;\n  color: #2c3e50;\n  outline: none;\n  transition: border-color 0.15s;\n}\n.stock-search-input[_ngcontent-%COMP%]:focus {\n  border-color: #148f77;\n}\n\n.stock-search-count[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #7f8c8d;\n}\n\n.stock-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  background: #fff;\n  border-radius: 6px;\n  overflow: hidden;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);\n}\n.stock-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #2c3e50;\n  color: #fff;\n  padding: 10px 14px;\n  font-family: \"Work Sans\", sans-serif;\n  font-size: 13px;\n  text-align: left;\n}\n.stock-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  border-bottom: 1px solid #ecf0f1;\n  font-size: 14px;\n  color: #2c3e50;\n  vertical-align: middle;\n}\n.stock-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.stock-table[_ngcontent-%COMP%]   tr.stock-zero[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: #fdf2f2;\n}\n\n.img-cell[_ngcontent-%COMP%] {\n  padding: 6px 10px !important;\n}\n\n.stock-thumb[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  object-fit: cover;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: transform 0.15s, box-shadow 0.15s;\n  display: block;\n}\n.stock-thumb[_ngcontent-%COMP%]:hover {\n  transform: scale(1.08);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);\n}\n\n.ref-cell[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-weight: 600;\n}\n\n.cat-cell[_ngcontent-%COMP%] {\n  color: #7f8c8d;\n  font-size: 12px;\n  text-transform: uppercase;\n}\n\n.stock-pagination[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 16px;\n  margin-top: 16px;\n}\n\n.page-btn[_ngcontent-%COMP%] {\n  padding: 6px 16px;\n  border: 1px solid #148f77;\n  border-radius: 4px;\n  background: transparent;\n  color: #148f77;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.15s, color 0.15s;\n}\n.page-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #148f77;\n  color: #fff;\n}\n.page-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n\n.page-info[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #2c3e50;\n  font-weight: 500;\n}\n\n.stock-value[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n  color: #148f77;\n}\n.stock-value.stock-empty[_ngcontent-%COMP%] {\n  color: #e74c3c;\n}\n\n.stock-input[_ngcontent-%COMP%] {\n  width: 70px;\n  padding: 4px 8px;\n  border: 2px solid #148f77;\n  border-radius: 4px;\n  text-align: center;\n  font-size: 16px;\n  font-weight: 700;\n}\n\n.actions-cell[_ngcontent-%COMP%] {\n  text-align: right;\n  white-space: nowrap;\n}\n.actions-cell[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    + button[_ngcontent-%COMP%] {\n  margin-left: 4px;\n}\n\n.price-input[_ngcontent-%COMP%] {\n  width: 90px;\n}\n\n.btn-price-edit[_ngcontent-%COMP%] {\n  border-color: #6c3483 !important;\n  color: #6c3483 !important;\n  margin-left: 4px;\n}\n.btn-price-edit[_ngcontent-%COMP%]:hover {\n  background: #6c3483 !important;\n  color: #fff !important;\n}\n\n.btn-stock-edit[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border: 1px solid #148f77;\n  border-radius: 4px;\n  background: transparent;\n  color: #148f77;\n  font-size: 13px;\n  cursor: pointer;\n}\n.btn-stock-edit[_ngcontent-%COMP%]:hover {\n  background: #148f77;\n  color: #fff;\n}\n\n.btn-stock-save[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border: none;\n  border-radius: 4px;\n  background: #148f77;\n  color: #fff;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  margin-right: 4px;\n}\n.btn-stock-save[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n}\n\n.btn-stock-cancel[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  border: 1px solid #bdc3c7;\n  border-radius: 4px;\n  background: transparent;\n  color: #7f8c8d;\n  font-size: 13px;\n  cursor: pointer;\n}\n\n.admin-container[_ngcontent-%COMP%] {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 90px 16px 24px;\n  font-family: \"Work Sans\", sans-serif;\n}\n\n.admin-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  border-bottom: 2px solid #148f77;\n  padding-bottom: 12px;\n}\n.admin-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  color: #2c3e50;\n  margin: 0;\n}\n\n.error-banner[_ngcontent-%COMP%] {\n  background-color: #fdecea;\n  color: #c0392b;\n  border: 1px solid #e74c3c;\n  border-radius: 4px;\n  padding: 12px 16px;\n  margin-bottom: 16px;\n  font-size: 14px;\n}\n\n.loading[_ngcontent-%COMP%], \n.empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #7f8c8d;\n  font-size: 15px;\n}\n\n.orders-filter-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n\n.orders-filter-input[_ngcontent-%COMP%] {\n  flex: 1;\n  max-width: 360px;\n  padding: 8px 12px;\n  border: 1px solid #dfe6e9;\n  border-radius: 6px;\n  font-size: 14px;\n  font-family: inherit;\n  color: #2c3e50;\n  outline: none;\n  transition: border-color 0.15s;\n}\n.orders-filter-input[_ngcontent-%COMP%]:focus {\n  border-color: #148f77;\n}\n\n.orders-filter-count[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #7f8c8d;\n}\n\n.orders-pagination[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  margin-top: 12px;\n  flex-wrap: wrap;\n}\n.orders-pagination[_ngcontent-%COMP%]   .page-btn[_ngcontent-%COMP%] {\n  min-width: 32px;\n  height: 32px;\n  padding: 0 8px;\n  border: 1px solid #ddd;\n  background: #fff;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 13px;\n  color: #2c3e50;\n  transition: background 0.15s, color 0.15s;\n}\n.orders-pagination[_ngcontent-%COMP%]   .page-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f0f0f0;\n}\n.orders-pagination[_ngcontent-%COMP%]   .page-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n.orders-pagination[_ngcontent-%COMP%]   .page-btn.active[_ngcontent-%COMP%] {\n  background: #148f77;\n  color: #fff;\n  border-color: #148f77;\n  font-weight: 600;\n}\n.orders-pagination[_ngcontent-%COMP%]   .page-info[_ngcontent-%COMP%] {\n  margin-left: 8px;\n  font-size: 12px;\n  color: #7f8c8d;\n}\n\n.orders-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  background: #fff;\n  border-radius: 6px;\n  overflow: hidden;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);\n}\n.orders-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #2c3e50;\n  color: #fff;\n  padding: 10px 12px;\n  font-size: 12px;\n  font-weight: 600;\n  text-align: left;\n  white-space: nowrap;\n}\n.orders-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  border-bottom: 1px solid #ecf0f1;\n  font-size: 13px;\n  color: #2c3e50;\n  vertical-align: middle;\n}\n.orders-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n\n.order-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background 0.12s;\n}\n.order-row[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: #f0faf7;\n}\n\n.col-date[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  color: #7f8c8d;\n  font-size: 12px;\n}\n\n.col-ref[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-weight: 600;\n  white-space: nowrap;\n}\n\n.col-customer[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n.col-customer[_ngcontent-%COMP%]   .customer-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.col-customer[_ngcontent-%COMP%]   .customer-email[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #7f8c8d;\n}\n\n.col-qty[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n\n.col-total[_ngcontent-%COMP%] {\n  font-weight: 700;\n  white-space: nowrap;\n}\n\n.col-delivery[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n\n.col-status[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n\n.text-right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n\n.text-center[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n.order-detail-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-bottom: 16px;\n}\n\n.order-detail-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n\n.btn-back-orders[_ngcontent-%COMP%] {\n  padding: 6px 14px;\n  border: 1px solid #148f77;\n  background: transparent;\n  color: #148f77;\n  border-radius: 4px;\n  font-weight: 600;\n  font-size: 13px;\n  cursor: pointer;\n  align-self: flex-start;\n}\n.btn-back-orders[_ngcontent-%COMP%]:hover {\n  background: #148f77;\n  color: #fff;\n}\n\n.order-detail-title[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  flex: 1;\n}\n\n.item-thumb-inline[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  object-fit: cover;\n  border-radius: 3px;\n  border: 1px solid #ecf0f1;\n  flex-shrink: 0;\n  cursor: zoom-in;\n  transition: transform 0.15s;\n}\n.item-thumb-inline[_ngcontent-%COMP%]:hover {\n  transform: scale(1.08);\n}\n\n.orders-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.order-card[_ngcontent-%COMP%] {\n  border: 1px solid #ecf0f1;\n  border-radius: 6px;\n  padding: 16px;\n  background: #fff;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);\n}\n.order-card[_ngcontent-%COMP%]   .order-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.order-card[_ngcontent-%COMP%]   .order-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.order-card[_ngcontent-%COMP%]   .order-id[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2c3e50;\n  font-size: 14px;\n  font-family: monospace;\n}\n.order-card[_ngcontent-%COMP%]   .order-date[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #7f8c8d;\n}\n\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 4px 12px;\n  border-radius: 12px;\n  color: #fff;\n  font-size: 12px;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n}\n\n.customer-info[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #2c3e50;\n  margin-bottom: 12px;\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.customer-info[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #7f8c8d;\n}\n.customer-info[_ngcontent-%COMP%]   .email-link[_ngcontent-%COMP%] {\n  color: #148f77;\n  text-decoration: none;\n  font-size: 13px;\n}\n.customer-info[_ngcontent-%COMP%]   .email-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n\n.delivery-info[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #2c3e50;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n\n.delivery-badge[_ngcontent-%COMP%] {\n  padding: 3px 10px;\n  border-radius: 10px;\n  font-size: 13px;\n  font-weight: 600;\n}\n.delivery-badge.pickup[_ngcontent-%COMP%] {\n  background: #eaf4fb;\n  color: #1a5276;\n}\n.delivery-badge.shipping[_ngcontent-%COMP%] {\n  background: #fdf2e9;\n  color: #784212;\n}\n\n.tracking-link-wrap[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #7f8c8d;\n}\n\n.tracking-link[_ngcontent-%COMP%] {\n  color: #6c3483;\n  font-weight: 600;\n  text-decoration: none;\n}\n.tracking-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n\n.shipping-address-block[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #2c3e50;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: flex-start;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n\n.shipping-address-detail[_ngcontent-%COMP%] {\n  font-style: normal;\n  background: #f0faf7;\n  border-left: 3px solid #148f77;\n  padding: 8px 12px;\n  border-radius: 0 4px 4px 0;\n  line-height: 1.6;\n  margin: 0;\n}\n\n.items-list[_ngcontent-%COMP%] {\n  border-top: 1px solid #ecf0f1;\n  padding-top: 10px;\n  margin-bottom: 8px;\n}\n\n.item-row-wrapper[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #f8f9fa;\n}\n.item-row-wrapper[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n.item-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  align-items: center;\n  padding: 8px 4px;\n  font-size: 14px;\n  cursor: pointer;\n  border-radius: 4px;\n  transition: background 0.12s;\n}\n.item-row[_ngcontent-%COMP%]:hover {\n  background: #f8fffe;\n}\n\n.item-toggle[_ngcontent-%COMP%] {\n  color: #148f77;\n  font-size: 13px;\n  width: 14px;\n  flex-shrink: 0;\n}\n\n.item-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2c3e50;\n  flex: 1 1 auto;\n}\n\n.item-ref[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #148f77;\n  font-family: monospace;\n  background: #f0faf7;\n  padding: 2px 6px;\n  border-radius: 3px;\n}\n\n.item-detail[_ngcontent-%COMP%] {\n  color: #7f8c8d;\n  font-size: 13px;\n}\n\n.item-qty[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #7f8c8d;\n}\n\n.item-price[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: #2c3e50;\n}\n\n.lightbox-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.85);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n  cursor: zoom-out;\n}\n\n.lightbox-img[_ngcontent-%COMP%] {\n  max-width: 90vw;\n  max-height: 90vh;\n  object-fit: contain;\n  border-radius: 4px;\n  cursor: default;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);\n}\n\n.lightbox-close[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 16px;\n  right: 20px;\n  background: transparent;\n  border: none;\n  color: #fff;\n  font-size: 28px;\n  cursor: pointer;\n  line-height: 1;\n  opacity: 0.8;\n}\n.lightbox-close[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n\n.item-detail-panel[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  padding: 12px 18px 14px;\n  background: #f8fffe;\n  border-radius: 4px;\n  margin-bottom: 4px;\n}\n.item-detail-panel[_ngcontent-%COMP%]   .item-img[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 100px;\n  object-fit: cover;\n  border-radius: 4px;\n  flex-shrink: 0;\n  border: 1px solid #ecf0f1;\n  cursor: zoom-in;\n}\n.item-detail-panel[_ngcontent-%COMP%]   .item-detail-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 13px;\n  color: #2c3e50;\n}\n.item-detail-panel[_ngcontent-%COMP%]   .detail-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #7f8c8d;\n  margin-right: 4px;\n}\n\n.order-total[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 4px;\n  border-top: 1px solid #ecf0f1;\n  margin-bottom: 12px;\n}\n.order-total[_ngcontent-%COMP%]   .total-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #7f8c8d;\n  font-weight: 600;\n}\n.order-total[_ngcontent-%COMP%]   .total-amount[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: #2c3e50;\n}\n.order-total--ttc[_ngcontent-%COMP%] {\n  border-top: 2px solid #2c3e50;\n  margin-top: 4px;\n}\n\n.order-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  align-items: center;\n}\n\n.btn[_ngcontent-%COMP%] {\n  padding: 8px 18px;\n  border: none;\n  border-radius: 4px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: opacity 0.15s;\n  font-family: inherit;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n\n.btn-ready[_ngcontent-%COMP%] {\n  background-color: #148f77;\n  color: #fff;\n}\n.btn-ready[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: 0.85;\n}\n\n.btn-paid[_ngcontent-%COMP%] {\n  background-color: #2c3e50;\n  color: #fff;\n}\n.btn-paid[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: 0.85;\n}\n\n.btn-resend[_ngcontent-%COMP%] {\n  background-color: transparent;\n  color: #148f77;\n  border: 1px solid #148f77;\n}\n.btn-resend[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #148f77;\n  color: #fff;\n}\n.btn-resend[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n}\n\n.paid-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #148f77;\n  font-weight: 600;\n}\n\n.btn-shipped[_ngcontent-%COMP%] {\n  background-color: #6c3483;\n  color: #fff;\n}\n.btn-shipped[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: 0.85;\n}\n\n.shipped-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #6c3483;\n  font-weight: 600;\n}\n\n.shipping-form[_ngcontent-%COMP%] {\n  width: 100%;\n  background: #faf5ff;\n  border: 1px solid #d7bde2;\n  border-radius: 6px;\n  padding: 16px;\n  margin-top: 8px;\n}\n\n.shipping-form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  margin-bottom: 12px;\n}\n\n.shipping-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: #2c3e50;\n}\n.shipping-label[_ngcontent-%COMP%]   .required[_ngcontent-%COMP%] {\n  color: #e74c3c;\n}\n.shipping-label[_ngcontent-%COMP%]   .optional[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: #7f8c8d;\n}\n\n.shipping-input[_ngcontent-%COMP%] {\n  padding: 8px 10px;\n  border: 1px solid #d7bde2;\n  border-radius: 4px;\n  font-size: 14px;\n  font-family: inherit;\n  outline: none;\n}\n.shipping-input[_ngcontent-%COMP%]:focus {\n  border-color: #6c3483;\n}\n.shipping-input.input-error[_ngcontent-%COMP%] {\n  border-color: #e74c3c;\n}\n\n.field-error[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #e74c3c;\n}\n\n.shipping-form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-top: 4px;\n}\n\n.btn-cancel[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #7f8c8d;\n  border: 1px solid #bdc3c7;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f8f9fa;\n}\n\n.shipping-pending-label[_ngcontent-%COMP%] {\n  color: #e67e22;\n  font-style: italic;\n}\n\n.cancelled-label[_ngcontent-%COMP%] {\n  color: #95a5a6;\n  font-weight: 600;\n}\n\n.btn-cancel-order[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #e74c3c;\n  border: 1px solid #e74c3c;\n  font-size: 13px;\n}\n.btn-cancel-order[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #fdf2f2;\n}\n\n.btn-cancel-order-confirm[_ngcontent-%COMP%] {\n  background: #e74c3c;\n  color: #fff;\n  border: none;\n}\n.btn-cancel-order-confirm[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #c0392b;\n}\n\n.cancel-confirm-block[_ngcontent-%COMP%] {\n  background: #fdf2f2;\n  border: 1px solid #f5b7b1;\n  border-radius: 6px;\n  padding: 12px 16px;\n  margin-top: 8px;\n  width: 100%;\n}\n\n.cancel-confirm-msg[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #922b21;\n  margin-bottom: 10px;\n}\n\n.shipping-form-info[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #6c3483;\n  background: #f5eef8;\n  border-radius: 4px;\n  padding: 8px 12px;\n  margin-bottom: 12px;\n}\n\n@media (max-width: 599px) {\n  .orders-table[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .orders-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .orders-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .orders-table[_ngcontent-%COMP%]   tr.order-row[_ngcontent-%COMP%] {\n    display: block;\n    border: 1px solid #ecf0f1;\n    border-radius: 6px;\n    margin-bottom: 10px;\n    padding: 4px 0;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);\n  }\n  .orders-table[_ngcontent-%COMP%]   tr.order-row[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .orders-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 7px 14px;\n    border-bottom: 1px solid #f3f4f5;\n    font-size: 13px;\n  }\n  .orders-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    border-bottom: none;\n  }\n  .orders-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]::before {\n    content: attr(data-label);\n    font-weight: 600;\n    color: #7f8c8d;\n    font-size: 11px;\n    text-transform: uppercase;\n    letter-spacing: 0.4px;\n    flex-shrink: 0;\n    margin-right: 8px;\n  }\n  .orders-table[_ngcontent-%COMP%]   .col-customer[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n    gap: 1px;\n  }\n  .orders-table[_ngcontent-%COMP%]   .col-customer[_ngcontent-%COMP%]::before {\n    margin-bottom: 2px;\n  }\n  .orders-filter-bar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .orders-filter-input[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n  .order-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .order-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    text-align: center;\n  }\n  .shipping-form-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvYWRtaW4vYWRtaW4tZGFzaGJvYXJkL2FkbWluLWRhc2hib2FyZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNFLGFBQUE7RUFDQSxlQUFBO0VBQ0EsUUFBQTtFQUNBLGdCQUFBO0FBQUY7O0FBR0E7RUFDRSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsdUJBQUE7RUFDQSxjQUFBO0VBQ0Esb0NBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSx5Q0FBQTtFQUNBLGtCQUFBO0FBQUY7QUFFRTtFQUNFLG1CQUFBO0VBQ0EsV0FBQTtBQUFKOztBQUtBO0VBQXVCLGVBQUE7QUFEdkI7O0FBSUE7RUFBaUIsZUFBQTtBQUFqQjs7QUFFQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUVBO0VBQ0UsWUFBQTtFQUNBLGlCQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtFQUNBLG9DQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0VBQ0EsOEJBQUE7QUFDRjtBQUNFO0VBQVUscUJBQUE7QUFFWjs7QUFDQTtFQUNFLGVBQUE7RUFDQSxjQUFBO0FBRUY7O0FBQ0E7RUFDRSxXQUFBO0VBQ0EseUJBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5Q0FBQTtBQUVGO0FBQUU7RUFDRSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLG9DQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FBRUo7QUFDRTtFQUNFLGtCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtFQUNBLHNCQUFBO0FBQ0o7QUFFRTtFQUFtQixtQkFBQTtBQUNyQjtBQUNFO0VBQW1CLG1CQUFBO0FBRXJCOztBQUNBO0VBQVksNEJBQUE7QUFHWjs7QUFEQTtFQUNFLFdBQUE7RUFD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SUFDQSxlQUFBO0lBQ0EseUJBQUE7SUFDQSxxQkFBQTtJQUNBLGNBQUE7SUFDQSxpQkFBQTtFQStFTjtFQTFFRTtJQUNFLHVCQUFBO0lBQ0Esc0JBQUE7SUFDQSxRQUFBO0VBNEVKO0VBMUVJO0lBQVksa0JBQUE7RUE2RWhCO0VBeEVBO0lBQXFCLHNCQUFBO0lBQXdCLG9CQUFBO0VBNEU3QztFQTNFQTtJQUF1QixlQUFBO0VBOEV2QjtFQTNFQTtJQUNFLHNCQUFBO0lBQ0Esb0JBQUE7RUE2RUY7RUEzRUU7SUFBTyxrQkFBQTtFQThFVDtFQTNFQTtJQUF5QixzQkFBQTtFQThFekI7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIMOiwpTCgMOiwpTCgCBPbmdsZXRzIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuLmFkbWluLXRhYnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGdhcDogOHB4O1xuICBtYXJnaW4tdG9wOiAxNnB4O1xufVxuXG4udGFiLWJ0biB7XG4gIGZsZXg6IDEgMSBhdXRvO1xuICBwYWRkaW5nOiA4cHggMjBweDtcbiAgYm9yZGVyOiAycHggc29saWQgIzE0OGY3NztcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICMxNDhmNzc7XG4gIGZvbnQtZmFtaWx5OiAnV29yayBTYW5zJywgc2Fucy1zZXJpZjtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMTVzLCBjb2xvciAwLjE1cztcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gICYuYWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiAjMTQ4Zjc3O1xuICAgIGNvbG9yOiAjZmZmO1xuICB9XG59XG5cbi8vIMOiwpTCgMOiwpTCgCBDYXRhbG9ndWUgdGFiIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuLmNhdGFsb2ctdGFiLXNlY3Rpb24geyBtYXJnaW4tdG9wOiA4cHg7IH1cblxuLy8gw6LClMKAw6LClMKAIFN0b2NrIHRhYmxlIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuLnN0b2NrLXNlY3Rpb24geyBtYXJnaW4tdG9wOiA4cHg7IH1cblxuLnN0b2NrLXNlYXJjaC1iYXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG59XG5cbi5zdG9jay1zZWFyY2gtaW5wdXQge1xuICB3aWR0aDogMjgwcHg7XG4gIHBhZGRpbmc6IDhweCAxMnB4O1xuICBib3JkZXI6IDJweCBzb2xpZCAjZGZlNmU5O1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIGZvbnQtZmFtaWx5OiAnV29yayBTYW5zJywgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogIzJjM2U1MDtcbiAgb3V0bGluZTogbm9uZTtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMTVzO1xuXG4gICY6Zm9jdXMgeyBib3JkZXItY29sb3I6ICMxNDhmNzc7IH1cbn1cblxuLnN0b2NrLXNlYXJjaC1jb3VudCB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgY29sb3I6ICM3ZjhjOGQ7XG59XG5cbi5zdG9jay10YWJsZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJveC1zaGFkb3c6IDAgMXB4IDRweCByZ2JhKDAsMCwwLDAuMDgpO1xuXG4gIHRoIHtcbiAgICBiYWNrZ3JvdW5kOiAjMmMzZTUwO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIHBhZGRpbmc6IDEwcHggMTRweDtcbiAgICBmb250LWZhbWlseTogJ1dvcmsgU2FucycsIHNhbnMtc2VyaWY7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gIH1cblxuICB0ZCB7XG4gICAgcGFkZGluZzogMTBweCAxNHB4O1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWNmMGYxO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBjb2xvcjogIzJjM2U1MDtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICB9XG5cbiAgdHI6bGFzdC1jaGlsZCB0ZCB7IGJvcmRlci1ib3R0b206IG5vbmU7IH1cblxuICB0ci5zdG9jay16ZXJvIHRkIHsgYmFja2dyb3VuZDogI2ZkZjJmMjsgfVxufVxuXG4uaW1nLWNlbGwgeyBwYWRkaW5nOiA2cHggMTBweCAhaW1wb3J0YW50OyB9XG5cbi5zdG9jay10aHVtYiB7XG4gIHdpZHRoOiA0OHB4O1xuICBoZWlnaHQ6IDQ4cHg7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMTVzLCBib3gtc2hhZG93IDAuMTVzO1xuICBkaXNwbGF5OiBibG9jaztcblxuICAmOmhvdmVyIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMDgpO1xuICAgIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsMCwwLDAuMjUpO1xuICB9XG59XG5cbi5yZWYtY2VsbCAgeyBmb250LWZhbWlseTogbW9ub3NwYWNlOyBmb250LXdlaWdodDogNjAwOyB9XG4uY2F0LWNlbGwgIHsgY29sb3I6ICM3ZjhjOGQ7IGZvbnQtc2l6ZTogMTJweDsgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsgfVxuXG4uc3RvY2stcGFnaW5hdGlvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBnYXA6IDE2cHg7XG4gIG1hcmdpbi10b3A6IDE2cHg7XG59XG5cbi5wYWdlLWJ0biB7XG4gIHBhZGRpbmc6IDZweCAxNnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjMTQ4Zjc3O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzE0OGY3NztcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMTVzLCBjb2xvciAwLjE1cztcblxuICAmOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHsgYmFja2dyb3VuZDogIzE0OGY3NzsgY29sb3I6ICNmZmY7IH1cbiAgJjpkaXNhYmxlZCB7IG9wYWNpdHk6IDAuNDsgY3Vyc29yOiBkZWZhdWx0OyB9XG59XG5cbi5wYWdlLWluZm8ge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOiAjMmMzZTUwO1xuICBmb250LXdlaWdodDogNTAwO1xufVxuXG4uc3RvY2stdmFsdWUge1xuICBmb250LXNpemU6IDE4cHg7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjMTQ4Zjc3O1xuXG4gICYuc3RvY2stZW1wdHkgeyBjb2xvcjogI2U3NGMzYzsgfVxufVxuXG4uc3RvY2staW5wdXQge1xuICB3aWR0aDogNzBweDtcbiAgcGFkZGluZzogNHB4IDhweDtcbiAgYm9yZGVyOiAycHggc29saWQgIzE0OGY3NztcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuLmFjdGlvbnMtY2VsbCB7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuXG4gIGJ1dHRvbiArIGJ1dHRvbiB7IG1hcmdpbi1sZWZ0OiA0cHg7IH1cbn1cblxuLnByaWNlLWlucHV0IHsgd2lkdGg6IDkwcHg7IH1cblxuLmJ0bi1wcmljZS1lZGl0IHtcbiAgYm9yZGVyLWNvbG9yOiAjNmMzNDgzICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjNmMzNDgzICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi1sZWZ0OiA0cHg7XG4gICY6aG92ZXIgeyBiYWNrZ3JvdW5kOiAjNmMzNDgzICFpbXBvcnRhbnQ7IGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7IH1cbn1cblxuLmJ0bi1zdG9jay1lZGl0IHtcbiAgcGFkZGluZzogNHB4IDEycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICMxNDhmNzc7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjMTQ4Zjc3O1xuICBmb250LXNpemU6IDEzcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgJjpob3ZlciB7IGJhY2tncm91bmQ6ICMxNDhmNzc7IGNvbG9yOiAjZmZmOyB9XG59XG5cbi5idG4tc3RvY2stc2F2ZSB7XG4gIHBhZGRpbmc6IDRweCAxMnB4O1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogIzE0OGY3NztcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBtYXJnaW4tcmlnaHQ6IDRweDtcbiAgJjpkaXNhYmxlZCB7IG9wYWNpdHk6IDAuNjsgfVxufVxuXG4uYnRuLXN0b2NrLWNhbmNlbCB7XG4gIHBhZGRpbmc6IDRweCAxMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjYmRjM2M3O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzdmOGM4ZDtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi8vIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuXG4uYWRtaW4tY29udGFpbmVyIHtcbiAgbWF4LXdpZHRoOiA5MDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIHBhZGRpbmc6IDkwcHggMTZweCAyNHB4O1xuICBmb250LWZhbWlseTogJ1dvcmsgU2FucycsIHNhbnMtc2VyaWY7XG59XG5cbi5hZG1pbi1oZWFkZXIge1xuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgIzE0OGY3NztcbiAgcGFkZGluZy1ib3R0b206IDEycHg7XG5cbiAgaDEge1xuICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIGNvbG9yOiAjMmMzZTUwO1xuICAgIG1hcmdpbjogMDtcbiAgfVxufVxuXG4uZXJyb3ItYmFubmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZkZWNlYTtcbiAgY29sb3I6ICNjMDM5MmI7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlNzRjM2M7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgcGFkZGluZzogMTJweCAxNnB4O1xuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuICBmb250LXNpemU6IDE0cHg7XG59XG5cbi5sb2FkaW5nLFxuLmVtcHR5IHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiA0MHB4O1xuICBjb2xvcjogIzdmOGM4ZDtcbiAgZm9udC1zaXplOiAxNXB4O1xufVxuXG4vLyDDosKUwoDDosKUwoAgRmlsdHJlICsgcGFnaW5hdGlvbiBjb21tYW5kZXMgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXG4ub3JkZXJzLWZpbHRlci1iYXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG59XG5cbi5vcmRlcnMtZmlsdGVyLWlucHV0IHtcbiAgZmxleDogMTtcbiAgbWF4LXdpZHRoOiAzNjBweDtcbiAgcGFkZGluZzogOHB4IDEycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZmU2ZTk7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgY29sb3I6ICMyYzNlNTA7XG4gIG91dGxpbmU6IG5vbmU7XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjE1cztcblxuICAmOmZvY3VzIHsgYm9yZGVyLWNvbG9yOiAjMTQ4Zjc3OyB9XG59XG5cbi5vcmRlcnMtZmlsdGVyLWNvdW50IHtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBjb2xvcjogIzdmOGM4ZDtcbn1cblxuLm9yZGVycy1wYWdpbmF0aW9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA0cHg7XG4gIG1hcmdpbi10b3A6IDEycHg7XG4gIGZsZXgtd3JhcDogd3JhcDtcblxuICAucGFnZS1idG4ge1xuICAgIG1pbi13aWR0aDogMzJweDtcbiAgICBoZWlnaHQ6IDMycHg7XG4gICAgcGFkZGluZzogMCA4cHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuICAgIGNvbG9yOiAjMmMzZTUwO1xuICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4xNXMsIGNvbG9yIDAuMTVzO1xuXG4gICAgJjpob3Zlcjpub3QoOmRpc2FibGVkKSB7IGJhY2tncm91bmQ6ICNmMGYwZjA7IH1cbiAgICAmOmRpc2FibGVkIHsgb3BhY2l0eTogMC40OyBjdXJzb3I6IGRlZmF1bHQ7IH1cbiAgICAmLmFjdGl2ZSB7IGJhY2tncm91bmQ6ICMxNDhmNzc7IGNvbG9yOiAjZmZmOyBib3JkZXItY29sb3I6ICMxNDhmNzc7IGZvbnQtd2VpZ2h0OiA2MDA7IH1cbiAgfVxuXG4gIC5wYWdlLWluZm8geyBtYXJnaW4tbGVmdDogOHB4OyBmb250LXNpemU6IDEycHg7IGNvbG9yOiAjN2Y4YzhkOyB9XG59XG5cbi8vIMOiwpTCgMOiwpTCgCBUYWJsZWF1IGNvbW1hbmRlcyDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcbi5vcmRlcnMtdGFibGUge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBib3gtc2hhZG93OiAwIDFweCA0cHggcmdiYSgwLDAsMCwuMDgpO1xuXG4gIHRoIHtcbiAgICBiYWNrZ3JvdW5kOiAjMmMzZTUwO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIHBhZGRpbmc6IDEwcHggMTJweDtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIH1cblxuICB0ZCB7XG4gICAgcGFkZGluZzogMTBweCAxMnB4O1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWNmMGYxO1xuICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICBjb2xvcjogIzJjM2U1MDtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICB9XG5cbiAgdHI6bGFzdC1jaGlsZCB0ZCB7IGJvcmRlci1ib3R0b206IG5vbmU7IH1cbn1cblxuLm9yZGVyLXJvdyB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjEycztcblxuICAmOmhvdmVyIHRkIHsgYmFja2dyb3VuZDogI2YwZmFmNzsgfVxufVxuXG4uY29sLWRhdGUgIHsgd2hpdGUtc3BhY2U6IG5vd3JhcDsgY29sb3I6ICM3ZjhjOGQ7IGZvbnQtc2l6ZTogMTJweDsgfVxuLmNvbC1yZWYgICB7IGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7IGZvbnQtd2VpZ2h0OiA2MDA7IHdoaXRlLXNwYWNlOiBub3dyYXA7IH1cbi5jb2wtY3VzdG9tZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDFweDtcbiAgLmN1c3RvbWVyLW5hbWUgIHsgZm9udC13ZWlnaHQ6IDYwMDsgfVxuICAuY3VzdG9tZXItZW1haWwgeyBmb250LXNpemU6IDExcHg7IGNvbG9yOiAjN2Y4YzhkOyB9XG59XG4uY29sLXF0eSAgICB7IGZvbnQtd2VpZ2h0OiA2MDA7IH1cbi5jb2wtdG90YWwgIHsgZm9udC13ZWlnaHQ6IDcwMDsgd2hpdGUtc3BhY2U6IG5vd3JhcDsgfVxuLmNvbC1kZWxpdmVyeSB7IHdoaXRlLXNwYWNlOiBub3dyYXA7IH1cbi5jb2wtc3RhdHVzIHsgd2hpdGUtc3BhY2U6IG5vd3JhcDsgfVxuLnRleHQtcmlnaHQgIHsgdGV4dC1hbGlnbjogcmlnaHQ7IH1cbi50ZXh0LWNlbnRlciB7IHRleHQtYWxpZ246IGNlbnRlcjsgfVxuXG4vLyDDosKUwoDDosKUwoAgRW4tdMODwqp0ZSB2dWUgZMODwql0YWlsIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuLm9yZGVyLWRldGFpbC1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDEwcHg7XG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XG59XG5cbi5vcmRlci1kZXRhaWwtbWV0YSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbiAgZmxleC13cmFwOiB3cmFwO1xufVxuXG4uYnRuLWJhY2stb3JkZXJzIHtcbiAgcGFkZGluZzogNnB4IDE0cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICMxNDhmNzc7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzE0OGY3NztcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBmb250LXNpemU6IDEzcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcblxuICAmOmhvdmVyIHsgYmFja2dyb3VuZDogIzE0OGY3NzsgY29sb3I6ICNmZmY7IH1cbn1cblxuLm9yZGVyLWRldGFpbC10aXRsZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMnB4O1xuICBmbGV4OiAxO1xufVxuXG4uaXRlbS10aHVtYi1pbmxpbmUge1xuICB3aWR0aDogNDBweDtcbiAgaGVpZ2h0OiA0MHB4O1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZWNmMGYxO1xuICBmbGV4LXNocmluazogMDtcbiAgY3Vyc29yOiB6b29tLWluO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4xNXM7XG5cbiAgJjpob3ZlciB7IHRyYW5zZm9ybTogc2NhbGUoMS4wOCk7IH1cbn1cblxuLm9yZGVycy1saXN0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAxNnB4O1xufVxuXG4ub3JkZXItY2FyZCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlY2YwZjE7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgcGFkZGluZzogMTZweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm94LXNoYWRvdzogMCAxcHggNHB4IHJnYmEoMCwwLDAsLjA2KTtcblxuICAub3JkZXItaGVhZGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gIH1cblxuICAub3JkZXItbWV0YSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGdhcDogMnB4O1xuICB9XG5cbiAgLm9yZGVyLWlkIHtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGNvbG9yOiAjMmMzZTUwO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xuICB9XG5cbiAgLm9yZGVyLWRhdGUge1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBjb2xvcjogIzdmOGM4ZDtcbiAgfVxufVxuXG4uc3RhdHVzLWJhZGdlIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwYWRkaW5nOiA0cHggMTJweDtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IC41cHg7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbi5jdXN0b21lci1pbmZvIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogIzJjM2U1MDtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBnYXA6IDZweDtcblxuICAubGFiZWwge1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6ICM3ZjhjOGQ7XG4gIH1cblxuICAuZW1haWwtbGluayB7XG4gICAgY29sb3I6ICMxNDhmNzc7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGZvbnQtc2l6ZTogMTNweDtcblxuICAgICY6aG92ZXIgeyB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgfVxuICB9XG59XG5cbi5kZWxpdmVyeS1pbmZvIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogIzJjM2U1MDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBnYXA6IDZweDtcbn1cblxuLmRlbGl2ZXJ5LWJhZGdlIHtcbiAgcGFkZGluZzogM3B4IDEwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcblxuICAmLnBpY2t1cCAgIHsgYmFja2dyb3VuZDogI2VhZjRmYjsgY29sb3I6ICMxYTUyNzY7IH1cbiAgJi5zaGlwcGluZyB7IGJhY2tncm91bmQ6ICNmZGYyZTk7IGNvbG9yOiAjNzg0MjEyOyB9XG59XG5cbi50cmFja2luZy1saW5rLXdyYXAgeyBmb250LXNpemU6IDEzcHg7IGNvbG9yOiAjN2Y4YzhkOyB9XG5cbi50cmFja2luZy1saW5rIHtcbiAgY29sb3I6ICM2YzM0ODM7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgJjpob3ZlciB7IHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyB9XG59XG5cbi5zaGlwcGluZy1hZGRyZXNzLWJsb2NrIHtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBjb2xvcjogIzJjM2U1MDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGdhcDogOHB4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG59XG5cbi5zaGlwcGluZy1hZGRyZXNzLWRldGFpbCB7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgYmFja2dyb3VuZDogI2YwZmFmNztcbiAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCAjMTQ4Zjc3O1xuICBwYWRkaW5nOiA4cHggMTJweDtcbiAgYm9yZGVyLXJhZGl1czogMCA0cHggNHB4IDA7XG4gIGxpbmUtaGVpZ2h0OiAxLjY7XG4gIG1hcmdpbjogMDtcbn1cblxuLml0ZW1zLWxpc3Qge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2VjZjBmMTtcbiAgcGFkZGluZy10b3A6IDEwcHg7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbn1cblxuLml0ZW0tcm93LXdyYXBwZXIge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Y4ZjlmYTtcblxuICAmOmxhc3QtY2hpbGQgeyBib3JkZXItYm90dG9tOiBub25lOyB9XG59XG5cbi5pdGVtLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgZ2FwOiA4cHg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDhweCA0cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgLjEycztcblxuICAmOmhvdmVyIHsgYmFja2dyb3VuZDogI2Y4ZmZmZTsgfVxufVxuXG4uaXRlbS10b2dnbGUge1xuICBjb2xvcjogIzE0OGY3NztcbiAgZm9udC1zaXplOiAxM3B4O1xuICB3aWR0aDogMTRweDtcbiAgZmxleC1zaHJpbms6IDA7XG59XG5cbi5pdGVtLXRpdGxlIHtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICMyYzNlNTA7XG4gIGZsZXg6IDEgMSBhdXRvO1xufVxuXG4uaXRlbS1yZWYge1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiAjMTQ4Zjc3O1xuICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xuICBiYWNrZ3JvdW5kOiAjZjBmYWY3O1xuICBwYWRkaW5nOiAycHggNnB4O1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG59XG5cbi5pdGVtLWRldGFpbCB7XG4gIGNvbG9yOiAjN2Y4YzhkO1xuICBmb250LXNpemU6IDEzcHg7XG59XG5cbi5pdGVtLXF0eSB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgY29sb3I6ICM3ZjhjOGQ7XG59XG5cbi5pdGVtLXByaWNlIHtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzJjM2U1MDtcbn1cblxuLmxpZ2h0Ym94LW92ZXJsYXkge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGluc2V0OiAwO1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIC44NSk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB6LWluZGV4OiA5OTk5O1xuICBjdXJzb3I6IHpvb20tb3V0O1xufVxuXG4ubGlnaHRib3gtaW1nIHtcbiAgbWF4LXdpZHRoOiA5MHZ3O1xuICBtYXgtaGVpZ2h0OiA5MHZoO1xuICBvYmplY3QtZml0OiBjb250YWluO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGN1cnNvcjogZGVmYXVsdDtcbiAgYm94LXNoYWRvdzogMCA4cHggMzJweCByZ2JhKDAsMCwwLC41KTtcbn1cblxuLmxpZ2h0Ym94LWNsb3NlIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDE2cHg7XG4gIHJpZ2h0OiAyMHB4O1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC1zaXplOiAyOHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBvcGFjaXR5OiAuODtcblxuICAmOmhvdmVyIHsgb3BhY2l0eTogMTsgfVxufVxuXG4uaXRlbS1kZXRhaWwtcGFuZWwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDE2cHg7XG4gIHBhZGRpbmc6IDEycHggMThweCAxNHB4O1xuICBiYWNrZ3JvdW5kOiAjZjhmZmZlO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIG1hcmdpbi1ib3R0b206IDRweDtcblxuICAuaXRlbS1pbWcge1xuICAgIHdpZHRoOiAxMDBweDtcbiAgICBoZWlnaHQ6IDEwMHB4O1xuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBmbGV4LXNocmluazogMDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZWNmMGYxO1xuICAgIGN1cnNvcjogem9vbS1pbjtcbiAgfVxuXG4gIC5pdGVtLWRldGFpbC1pbmZvIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZ2FwOiA0cHg7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuICAgIGNvbG9yOiAjMmMzZTUwO1xuICB9XG5cbiAgLmRldGFpbC1sYWJlbCB7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBjb2xvcjogIzdmOGM4ZDtcbiAgICBtYXJnaW4tcmlnaHQ6IDRweDtcbiAgfVxufVxuXG4ub3JkZXItdG90YWwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbiAgcGFkZGluZzogOHB4IDRweDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlY2YwZjE7XG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG5cbiAgLnRvdGFsLWxhYmVsIHtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gICAgY29sb3I6ICM3ZjhjOGQ7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgfVxuXG4gIC50b3RhbC1hbW91bnQge1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIGNvbG9yOiAjMmMzZTUwO1xuICB9XG5cbiAgJi0tdHRjIHtcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgIzJjM2U1MDtcbiAgICBtYXJnaW4tdG9wOiA0cHg7XG4gIH1cbn1cblxuLm9yZGVyLWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGdhcDogMTBweDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmJ0biB7XG4gIHBhZGRpbmc6IDhweCAxOHB4O1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgLjE1cztcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG5cbiAgJjpkaXNhYmxlZCB7XG4gICAgb3BhY2l0eTogLjY7XG4gICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgfVxufVxuXG4uYnRuLXJlYWR5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzE0OGY3NztcbiAgY29sb3I6ICNmZmY7XG5cbiAgJjpob3Zlcjpub3QoOmRpc2FibGVkKSB7IG9wYWNpdHk6IC44NTsgfVxufVxuXG4uYnRuLXBhaWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmMzZTUwO1xuICBjb2xvcjogI2ZmZjtcblxuICAmOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHsgb3BhY2l0eTogLjg1OyB9XG59XG5cbi5idG4tcmVzZW5kIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjMTQ4Zjc3O1xuICBib3JkZXI6IDFweCBzb2xpZCAjMTQ4Zjc3O1xuXG4gICY6aG92ZXI6bm90KDpkaXNhYmxlZCkge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMxNDhmNzc7XG4gICAgY29sb3I6ICNmZmY7XG4gIH1cbiAgJjpkaXNhYmxlZCB7IG9wYWNpdHk6IC42OyB9XG59XG5cbi5wYWlkLWxhYmVsIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogIzE0OGY3NztcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLmJ0bi1zaGlwcGVkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzZjMzQ4MztcbiAgY29sb3I6ICNmZmY7XG5cbiAgJjpob3Zlcjpub3QoOmRpc2FibGVkKSB7IG9wYWNpdHk6IC44NTsgfVxufVxuXG4uc2hpcHBlZC1sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY29sb3I6ICM2YzM0ODM7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5zaGlwcGluZy1mb3JtIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQ6ICNmYWY1ZmY7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkN2JkZTI7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgcGFkZGluZzogMTZweDtcbiAgbWFyZ2luLXRvcDogOHB4O1xufVxuXG4uc2hpcHBpbmctZm9ybS1maWVsZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogNHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xufVxuXG4uc2hpcHBpbmctbGFiZWwge1xuICBmb250LXNpemU6IDEzcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjMmMzZTUwO1xuXG4gIC5yZXF1aXJlZCB7IGNvbG9yOiAjZTc0YzNjOyB9XG4gIC5vcHRpb25hbCB7IGZvbnQtd2VpZ2h0OiA0MDA7IGNvbG9yOiAjN2Y4YzhkOyB9XG59XG5cbi5zaGlwcGluZy1pbnB1dCB7XG4gIHBhZGRpbmc6IDhweCAxMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZDdiZGUyO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIG91dGxpbmU6IG5vbmU7XG5cbiAgJjpmb2N1cyB7IGJvcmRlci1jb2xvcjogIzZjMzQ4MzsgfVxuICAmLmlucHV0LWVycm9yIHsgYm9yZGVyLWNvbG9yOiAjZTc0YzNjOyB9XG59XG5cbi5maWVsZC1lcnJvciB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgY29sb3I6ICNlNzRjM2M7XG59XG5cbi5zaGlwcGluZy1mb3JtLWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDEwcHg7XG4gIG1hcmdpbi10b3A6IDRweDtcbn1cblxuLmJ0bi1jYW5jZWwge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM3ZjhjOGQ7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNiZGMzYzc7XG5cbiAgJjpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gICAgYmFja2dyb3VuZDogI2Y4ZjlmYTtcbiAgfVxufVxuXG4uc2hpcHBpbmctcGVuZGluZy1sYWJlbCB7XG4gIGNvbG9yOiAjZTY3ZTIyO1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG59XG5cbi5jYW5jZWxsZWQtbGFiZWwge1xuICBjb2xvcjogIzk1YTVhNjtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLmJ0bi1jYW5jZWwtb3JkZXIge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICNlNzRjM2M7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlNzRjM2M7XG4gIGZvbnQtc2l6ZTogMTNweDtcblxuICAmOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHtcbiAgICBiYWNrZ3JvdW5kOiAjZmRmMmYyO1xuICB9XG59XG5cbi5idG4tY2FuY2VsLW9yZGVyLWNvbmZpcm0ge1xuICBiYWNrZ3JvdW5kOiAjZTc0YzNjO1xuICBjb2xvcjogI2ZmZjtcbiAgYm9yZGVyOiBub25lO1xuXG4gICY6aG92ZXI6bm90KDpkaXNhYmxlZCkge1xuICAgIGJhY2tncm91bmQ6ICNjMDM5MmI7XG4gIH1cbn1cblxuLmNhbmNlbC1jb25maXJtLWJsb2NrIHtcbiAgYmFja2dyb3VuZDogI2ZkZjJmMjtcbiAgYm9yZGVyOiAxcHggc29saWQgI2Y1YjdiMTtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5jYW5jZWwtY29uZmlybS1tc2cge1xuICBmb250LXNpemU6IDEzcHg7XG4gIGNvbG9yOiAjOTIyYjIxO1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4uc2hpcHBpbmctZm9ybS1pbmZvIHtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBjb2xvcjogIzZjMzQ4MztcbiAgYmFja2dyb3VuZDogI2Y1ZWVmODtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwYWRkaW5nOiA4cHggMTJweDtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbn1cblxuLy8gw6LClMKAw6LClMKAIFJlc3BvbnNpdmUgbW9iaWxlIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuQG1lZGlhIChtYXgtd2lkdGg6IDU5OXB4KSB7XG5cbiAgLy8gVGFibGVhdSDDosKGwpIgY2FydGVzIGVtcGlsw4PCqWVzXG4gIC5vcmRlcnMtdGFibGUge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuXG4gICAgdGhlYWQgeyBkaXNwbGF5OiBub25lOyB9XG5cbiAgICB0Ym9keSB7IGRpc3BsYXk6IGJsb2NrOyB9XG5cbiAgICB0ci5vcmRlci1yb3cge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZWNmMGYxO1xuICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICAgIHBhZGRpbmc6IDRweCAwO1xuICAgICAgYm94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEoMCwwLDAsLjA2KTtcblxuICAgICAgJjpob3ZlciB0ZCB7IGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyB9XG4gICAgfVxuXG4gICAgdGQge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBwYWRkaW5nOiA3cHggMTRweDtcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjNmNGY1O1xuICAgICAgZm9udC1zaXplOiAxM3B4O1xuXG4gICAgICAmOmxhc3QtY2hpbGQgeyBib3JkZXItYm90dG9tOiBub25lOyB9XG5cbiAgICAgIC8vIExpYmVsbMODwqkgZGUgY29sb25uZSBhZmZpY2jDg8KpIHZpYSBkYXRhLWxhYmVsXG4gICAgICAmOjpiZWZvcmUge1xuICAgICAgICBjb250ZW50OiBhdHRyKGRhdGEtbGFiZWwpO1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICBjb2xvcjogIzdmOGM4ZDtcbiAgICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICBsZXR0ZXItc3BhY2luZzogLjRweDtcbiAgICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgICAgIG1hcmdpbi1yaWdodDogOHB4O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIExhIGNvbG9ubmUgY2xpZW50IGVtcGlsZSBub20gKyBlbWFpbCBuYXR1cmVsbGVtZW50XG4gICAgLmNvbC1jdXN0b21lciB7XG4gICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBnYXA6IDFweDtcblxuICAgICAgJjo6YmVmb3JlIHsgbWFyZ2luLWJvdHRvbTogMnB4OyB9XG4gICAgfVxuICB9XG5cbiAgLy8gRmlsdHJlIDogaW5wdXQgcGxlaW5lIGxhcmdldXJcbiAgLm9yZGVycy1maWx0ZXItYmFyIHsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgYWxpZ24taXRlbXM6IHN0cmV0Y2g7IH1cbiAgLm9yZGVycy1maWx0ZXItaW5wdXQgeyBtYXgtd2lkdGg6IDEwMCU7IH1cblxuICAvLyBCb3V0b25zIGQnYWN0aW9uIHBsZWluZSBsYXJnZXVyIHN1ciBtb2JpbGVcbiAgLm9yZGVyLWFjdGlvbnMge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG5cbiAgICAuYnRuIHsgdGV4dC1hbGlnbjogY2VudGVyOyB9XG4gIH1cblxuICAuc2hpcHBpbmctZm9ybS1hY3Rpb25zIHsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ },

/***/ 38830
/*!***************************************************************************!*\
  !*** ./src/app/features/admin/confirm-dialog/confirm-dialog.component.ts ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConfirmDialogComponent: () => (/* binding */ ConfirmDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/dialog */ 12587);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ 84175);




class ConfirmDialogComponent {
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.data = data;
  }
  confirm() {
    this.dialogRef.close(true);
  }
  cancel() {
    this.dialogRef.close(false);
  }
  static {
    this.ɵfac = function ConfirmDialogComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ConfirmDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__.MAT_DIALOG_DATA));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: ConfirmDialogComponent,
      selectors: [["app-confirm-dialog"]],
      standalone: false,
      decls: 10,
      vars: 4,
      consts: [["mat-dialog-title", ""], ["align", "end"], ["mat-button", "", 3, "click"], ["mat-flat-button", "", "color", "warn", 3, "click"]],
      template: function ConfirmDialogComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h2", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-dialog-content")(3, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "mat-dialog-actions", 1)(6, "button", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ConfirmDialogComponent_Template_button_click_6_listener() {
            return ctx.cancel();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "button", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ConfirmDialogComponent_Template_button_click_8_listener() {
            return ctx.confirm();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.data.title);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.data.message);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.data.cancelLabel || "Annuler");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.data.confirmLabel || "Confirmer");
        }
      },
      dependencies: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__.MatDialogActions, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__.MatDialogContent, _angular_material_button__WEBPACK_IMPORTED_MODULE_2__.MatButton],
      encapsulation: 2
    });
  }
}

/***/ },

/***/ 58454
/*!***************************************************************************!*\
  !*** ./src/app/features/admin/admin-settings/admin-settings.component.ts ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminSettingsComponent: () => (/* binding */ AdminSettingsComponent)
/* harmony export */ });
/* harmony import */ var C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 2510);
/* harmony import */ var _app_core_firebase_app_config_repository__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @app/core/firebase/app-config.repository */ 190);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ 80436);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 79748);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 34456);









function AdminSettingsComponent_section_8_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "\uD83D\uDDBC Glissez des images ou cliquez");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminSettingsComponent_section_8_span_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Envoi en cours\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminSettingsComponent_section_8_p_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "p", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r1.carouselError);
  }
}
function AdminSettingsComponent_section_8_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " Aucune image \u2014 les images par d\u00E9faut du projet seront affich\u00E9es. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminSettingsComponent_section_8_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "img", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 20)(5, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminSettingsComponent_section_8_div_13_Template_button_click_5_listener() {
      const i_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4).index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.moveSlide(i_r5, -1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "\u2191");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminSettingsComponent_section_8_div_13_Template_button_click_7_listener() {
      const i_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4).index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.moveSlide(i_r5, 1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, "\u2193");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminSettingsComponent_section_8_div_13_Template_button_click_9_listener() {
      const i_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4).index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.removeSlide(i_r5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const slide_r6 = ctx.$implicit;
    const i_r5 = ctx.index;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("src", slide_r6.imageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsanitizeUrl"])("alt", slide_r6.alt || "");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](i_r5 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", i_r5 === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", i_r5 === ctx_r1.slides.length - 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx_r1.carouselSaving);
  }
}
function AdminSettingsComponent_section_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "section", 5)(1, "h3", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Photos du carrousel");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "p", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "Glissez des images pour les ajouter. Utilisez \u2191\u2193 pour r\u00E9ordonner.");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("dragover", function AdminSettingsComponent_section_8_Template_div_dragover_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.onCarouselDragOver($event));
    })("dragleave", function AdminSettingsComponent_section_8_Template_div_dragleave_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.onCarouselDragLeave());
    })("drop", function AdminSettingsComponent_section_8_Template_div_drop_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.onCarouselDrop($event));
    })("click", function AdminSettingsComponent_section_8_Template_div_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const carouselPicker_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](7);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](carouselPicker_r3.click());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "input", 9, 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("change", function AdminSettingsComponent_section_8_Template_input_change_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.onCarouselFilePick($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, AdminSettingsComponent_section_8_span_8_Template, 2, 0, "span", 10)(9, AdminSettingsComponent_section_8_span_9_Template, 2, 0, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](10, AdminSettingsComponent_section_8_p_10_Template, 2, 1, "p", 11)(11, AdminSettingsComponent_section_8_div_11_Template, 2, 0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](13, AdminSettingsComponent_section_8_div_13_Template, 11, 6, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("drag-over", ctx_r1.carouselDragOver);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx_r1.carouselUploading);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.carouselUploading);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.carouselError);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.slides.length === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r1.slides)("ngForTrackBy", ctx_r1.trackByIndex);
  }
}
function AdminSettingsComponent_section_9_p_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "p", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r1.translationsError);
  }
}
function AdminSettingsComponent_section_9_p_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "p", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "\u2713 Libell\u00E9s sauvegard\u00E9s");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminSettingsComponent_section_9_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 31)(1, "input", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function AdminSettingsComponent_section_9_div_11_Template_input_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx_r1.translationsFilter, $event) || (ctx_r1.translationsFilter = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.translationsFilter);
  }
}
function AdminSettingsComponent_section_9_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Chargement\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminSettingsComponent_section_9_table_13_tr_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "tr")(1, "td", 37)(2, "code");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "td", 38)(5, "textarea", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function AdminSettingsComponent_section_9_table_13_tr_10_Template_textarea_ngModelChange_5_listener($event) {
      const row_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r9).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](row_r10.fr, $event) || (row_r10.fr = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function AdminSettingsComponent_section_9_table_13_tr_10_Template_textarea_ngModelChange_5_listener() {
      const row_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r9).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.markDirty(row_r10));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "td", 40)(7, "textarea", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function AdminSettingsComponent_section_9_table_13_tr_10_Template_textarea_ngModelChange_7_listener($event) {
      const row_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r9).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](row_r10.en, $event) || (row_r10.en = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function AdminSettingsComponent_section_9_table_13_tr_10_Template_textarea_ngModelChange_7_listener() {
      const row_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r9).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.markDirty(row_r10));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const row_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("dirty-row", row_r10.dirty);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](row_r10.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", row_r10.fr);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", row_r10.en);
  }
}
function AdminSettingsComponent_section_9_table_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "table", 33)(1, "thead")(2, "tr")(3, "th", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "Cl\u00E9");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "th", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "\uD83C\uDDEB\uD83C\uDDF7 Fran\u00E7ais");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "th", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, "\uD83C\uDDEC\uD83C\uDDE7 English");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](10, AdminSettingsComponent_section_9_table_13_tr_10_Template, 8, 5, "tr", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r1.filteredRows)("ngForTrackBy", ctx_r1.trackByKey);
  }
}
function AdminSettingsComponent_section_9_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " Cliquez sur \u21BA Recharger pour charger les libell\u00E9s. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminSettingsComponent_section_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "section", 5)(1, "div", 23)(2, "h3", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "Libell\u00E9s");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 24)(5, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminSettingsComponent_section_9_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r7);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.loadTranslations());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminSettingsComponent_section_9_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r7);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.saveTranslations());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](9, AdminSettingsComponent_section_9_p_9_Template, 2, 1, "p", 11)(10, AdminSettingsComponent_section_9_p_10_Template, 2, 0, "p", 27)(11, AdminSettingsComponent_section_9_div_11_Template, 2, 1, "div", 28)(12, AdminSettingsComponent_section_9_div_12_Template, 2, 0, "div", 12)(13, AdminSettingsComponent_section_9_table_13_Template, 11, 2, "table", 29)(14, AdminSettingsComponent_section_9_div_14_Template, 2, 0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx_r1.translationsLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r1.translationsLoading ? "Chargement\u2026" : "\u21BA Recharger", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx_r1.translationsSaving || ctx_r1.dirtyCount === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r1.translationsSaving ? "Sauvegarde\u2026" : "Sauvegarder (" + ctx_r1.dirtyCount + ")", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.translationsError);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.translationsSuccess);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.translationRows.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.translationsLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx_r1.translationsLoading && ctx_r1.translationRows.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx_r1.translationsLoading && ctx_r1.translationRows.length === 0);
  }
}
function AdminSettingsComponent_section_10_p_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "p", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r1.titleError);
  }
}
function AdminSettingsComponent_section_10_p_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "p", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "\u2713 Titre mis \u00E0 jour");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminSettingsComponent_section_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "section", 5)(1, "h3", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Titre de l'application");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "p", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "S'affiche dans l'onglet du navigateur.");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 41)(6, "div", 42)(7, "label", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, "\uD83C\uDDEB\uD83C\uDDF7 Titre fran\u00E7ais");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "input", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function AdminSettingsComponent_section_10_Template_input_ngModelChange_9_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r11);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx_r1.appTitleFr, $event) || (ctx_r1.appTitleFr = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "div", 42)(11, "label", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12, "\uD83C\uDDEC\uD83C\uDDE7 English title");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "input", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function AdminSettingsComponent_section_10_Template_input_ngModelChange_13_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r11);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx_r1.appTitleEn, $event) || (ctx_r1.appTitleEn = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](14, AdminSettingsComponent_section_10_p_14_Template, 2, 1, "p", 11)(15, AdminSettingsComponent_section_10_p_15_Template, 2, 0, "p", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "button", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminSettingsComponent_section_10_Template_button_click_16_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r11);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.saveTitle());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.appTitleFr);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.appTitleEn);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.titleError);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.titleSuccess);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx_r1.titleSaving);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r1.titleSaving ? "\u2026" : "Enregistrer", " ");
  }
}
class AdminSettingsComponent {
  constructor(configRepo, cdr, titleService, translate) {
    this.configRepo = configRepo;
    this.cdr = cdr;
    this.titleService = titleService;
    this.translate = translate;
    this.activeSection = 'carousel';
    // ── Carousel
    this.slides = [];
    this.carouselSaving = false;
    this.carouselDragOver = false;
    this.carouselUploading = false;
    this.carouselError = '';
    // ── Traductions
    this.translationRows = [];
    this.translationsLoading = false;
    this.translationsSaving = false;
    this.translationsError = '';
    this.translationsSuccess = false;
    this.translationsFilter = '';
    // ── Titre
    this.appTitleFr = '';
    this.appTitleEn = '';
    this.titleSaving = false;
    this.titleSuccess = false;
    this.titleError = '';
    this.subs = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subscription();
  }
  ngOnInit() {
    this.subs.add(this.configRepo.watchCarousel().subscribe(slides => {
      this.slides = [...slides];
      this.cdr.markForCheck();
    }));
    this.subs.add(this.configRepo.watchAppTitle().subscribe(t => {
      this.appTitleFr = t.fr ?? '';
      this.appTitleEn = t.en ?? '';
      this.cdr.markForCheck();
    }));
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  // ── Carousel ──────────────────────────────────────────────────────────────
  onCarouselDragOver(e) {
    e.preventDefault();
    this.carouselDragOver = true;
  }
  onCarouselDragLeave() {
    this.carouselDragOver = false;
  }
  onCarouselDrop(e) {
    e.preventDefault();
    this.carouselDragOver = false;
    const files = Array.from(e.dataTransfer?.files ?? []).filter(f => f.type.startsWith('image/'));
    this.uploadCarouselFiles(files);
  }
  onCarouselFilePick(e) {
    const files = Array.from(e.target.files ?? []).filter(f => f.type.startsWith('image/'));
    e.target.value = '';
    this.uploadCarouselFiles(files);
  }
  uploadCarouselFiles(files) {
    var _this = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!files.length) return;
      _this.carouselUploading = true;
      _this.carouselError = '';
      _this.cdr.markForCheck();
      try {
        for (const file of files) {
          const slide = yield _this.configRepo.uploadCarouselImage(file);
          _this.slides = [..._this.slides, slide];
        }
        yield _this.configRepo.saveCarousel(_this.slides);
      } catch (e) {
        _this.carouselError = e?.message ?? 'Erreur lors de l\'upload.';
      } finally {
        _this.carouselUploading = false;
        _this.cdr.markForCheck();
      }
    })();
  }
  removeSlide(index) {
    var _this2 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const slide = _this2.slides[index];
      _this2.carouselSaving = true;
      _this2.cdr.markForCheck();
      try {
        yield _this2.configRepo.deleteCarouselImage(slide);
        _this2.slides = _this2.slides.filter((_, i) => i !== index);
        yield _this2.configRepo.saveCarousel(_this2.slides);
      } catch (e) {
        _this2.carouselError = e?.message ?? 'Erreur lors de la suppression.';
      } finally {
        _this2.carouselSaving = false;
        _this2.cdr.markForCheck();
      }
    })();
  }
  moveSlide(index, direction) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= this.slides.length) return;
    const arr = [...this.slides];
    [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
    this.slides = arr;
    this.configRepo.saveCarousel(this.slides).catch(console.error);
  }
  // ── Traductions ───────────────────────────────────────────────────────────
  loadTranslations() {
    var _this3 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this3.translationsLoading = true;
      _this3.translationsError = '';
      _this3.cdr.markForCheck();
      try {
        const [staticFr, staticEn, fbFr, fbEn] = yield Promise.all([_this3.configRepo.loadStaticTranslations('fr'), _this3.configRepo.loadStaticTranslations('en'), _this3.configRepo.getTranslationsOnce('fr'), _this3.configRepo.getTranslationsOnce('en')]);
        const effectiveFr = fbFr ? {
          ...(0,_app_core_firebase_app_config_repository__WEBPACK_IMPORTED_MODULE_2__.flattenTranslations)(staticFr),
          ...(0,_app_core_firebase_app_config_repository__WEBPACK_IMPORTED_MODULE_2__.flattenTranslations)(fbFr)
        } : (0,_app_core_firebase_app_config_repository__WEBPACK_IMPORTED_MODULE_2__.flattenTranslations)(staticFr);
        const effectiveEn = fbEn ? {
          ...(0,_app_core_firebase_app_config_repository__WEBPACK_IMPORTED_MODULE_2__.flattenTranslations)(staticEn),
          ...(0,_app_core_firebase_app_config_repository__WEBPACK_IMPORTED_MODULE_2__.flattenTranslations)(fbEn)
        } : (0,_app_core_firebase_app_config_repository__WEBPACK_IMPORTED_MODULE_2__.flattenTranslations)(staticEn);
        const allKeys = Array.from(new Set([...Object.keys(effectiveFr), ...Object.keys(effectiveEn)])).sort();
        _this3.translationRows = allKeys.map(key => ({
          key,
          fr: effectiveFr[key] ?? '',
          en: effectiveEn[key] ?? '',
          dirty: false
        }));
      } catch (e) {
        _this3.translationsError = e?.message ?? 'Erreur de chargement.';
      } finally {
        _this3.translationsLoading = false;
        _this3.cdr.markForCheck();
      }
    })();
  }
  markDirty(row) {
    row.dirty = true;
  }
  get filteredRows() {
    const q = this.translationsFilter.trim().toLowerCase();
    return q ? this.translationRows.filter(r => r.key.toLowerCase().includes(q) || r.fr.toLowerCase().includes(q) || r.en.toLowerCase().includes(q)) : this.translationRows;
  }
  get dirtyCount() {
    return this.translationRows.filter(r => r.dirty).length;
  }
  saveTranslations() {
    var _this4 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this4.translationsSaving = true;
      _this4.translationsError = '';
      _this4.translationsSuccess = false;
      _this4.cdr.markForCheck();
      try {
        const flatFr = {};
        const flatEn = {};
        for (const row of _this4.translationRows) {
          flatFr[row.key] = row.fr;
          flatEn[row.key] = row.en;
          row.dirty = false;
        }
        yield Promise.all([_this4.configRepo.saveTranslations('fr', (0,_app_core_firebase_app_config_repository__WEBPACK_IMPORTED_MODULE_2__.unflattenTranslations)(flatFr)), _this4.configRepo.saveTranslations('en', (0,_app_core_firebase_app_config_repository__WEBPACK_IMPORTED_MODULE_2__.unflattenTranslations)(flatEn))]);
        _this4.translationsSuccess = true;
        setTimeout(() => {
          _this4.translationsSuccess = false;
          _this4.cdr.markForCheck();
        }, 3000);
      } catch (e) {
        _this4.translationsError = e?.message ?? 'Erreur lors de la sauvegarde.';
      } finally {
        _this4.translationsSaving = false;
        _this4.cdr.markForCheck();
      }
    })();
  }
  // ── Titre ─────────────────────────────────────────────────────────────────
  saveTitle() {
    var _this5 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this5.titleSaving = true;
      _this5.titleSuccess = false;
      _this5.titleError = '';
      _this5.cdr.markForCheck();
      try {
        const fr = _this5.appTitleFr.trim();
        const en = _this5.appTitleEn.trim();
        yield _this5.configRepo.saveAppTitle(fr, en);
        const lang = _this5.translate.currentLang ?? 'fr';
        const newTitle = lang === 'en' ? en : fr;
        if (newTitle) _this5.titleService.setTitle(newTitle);
        _this5.titleSuccess = true;
        _this5.cdr.markForCheck();
        setTimeout(() => {
          _this5.titleSuccess = false;
          _this5.cdr.markForCheck();
        }, 3000);
      } catch (e) {
        _this5.titleError = e?.message ?? 'Erreur lors de la sauvegarde.';
        console.error('[settings] saveTitle', e);
      } finally {
        _this5.titleSaving = false;
        _this5.cdr.markForCheck();
      }
    })();
  }
  trackByKey(_, row) {
    return row.key;
  }
  trackByIndex(i) {
    return i;
  }
  static {
    this.ɵfac = function AdminSettingsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AdminSettingsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_app_core_firebase_app_config_repository__WEBPACK_IMPORTED_MODULE_2__.AppConfigRepository), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.Title), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
      type: AdminSettingsComponent,
      selectors: [["app-admin-settings"]],
      standalone: false,
      decls: 11,
      vars: 9,
      consts: [["carouselPicker", ""], [1, "settings-container"], [1, "settings-nav"], [1, "settings-nav-btn", 3, "click"], ["class", "settings-section", 4, "ngIf"], [1, "settings-section"], [1, "settings-title"], [1, "settings-hint"], [1, "drop-zone", 3, "dragover", "dragleave", "drop", "click"], ["type", "file", "multiple", "", "accept", "image/*", 2, "display", "none", 3, "change"], [4, "ngIf"], ["class", "settings-error", 4, "ngIf"], ["class", "settings-empty", 4, "ngIf"], [1, "slide-list"], ["class", "slide-row", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "settings-error"], [1, "settings-empty"], [1, "slide-row"], [1, "slide-thumb", 3, "src", "alt"], [1, "slide-index"], [1, "slide-actions"], [1, "btn-order", 3, "click", "disabled"], [1, "btn-delete-slide", 3, "click", "disabled"], [1, "translations-header"], [1, "translations-actions"], [1, "btn-reload", 3, "click", "disabled"], [1, "btn-save-translations", 3, "click", "disabled"], ["class", "settings-success", 4, "ngIf"], ["class", "translations-search", 4, "ngIf"], ["class", "translations-table", 4, "ngIf"], [1, "settings-success"], [1, "translations-search"], ["type", "search", "placeholder", "Filtrer par cl\u00E9 ou valeur\u2026", 1, "translations-filter-input", 3, "ngModelChange", "ngModel"], [1, "translations-table"], [1, "col-key"], [1, "col-lang"], [3, "dirty-row", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["data-label", "Cl\u00E9", 1, "col-key"], ["data-label", "\uD83C\uDDEB\uD83C\uDDF7 Fran\u00E7ais", 1, "col-lang"], ["rows", "2", 1, "translation-input", 3, "ngModelChange", "ngModel"], ["data-label", "\uD83C\uDDEC\uD83C\uDDE7 English", 1, "col-lang"], [1, "title-fields"], [1, "title-field"], [1, "title-label"], ["type", "text", "placeholder", "ex : D\u00E9lice \u00C9ternel", 1, "title-input", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "ex : Eternal Delight", 1, "title-input", 3, "ngModelChange", "ngModel"], [1, "btn-save-title", 3, "click", "disabled"]],
      template: function AdminSettingsComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "button", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminSettingsComponent_Template_button_click_2_listener() {
            return ctx.activeSection = "carousel";
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "\uD83D\uDDBC Carrousel");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "button", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminSettingsComponent_Template_button_click_4_listener() {
            ctx.activeSection = "translations";
            return ctx.translationRows.length === 0 && ctx.loadTranslations();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, "\uD83C\uDF10 Libell\u00E9s");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "button", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminSettingsComponent_Template_button_click_6_listener() {
            return ctx.activeSection = "title";
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7, "\uD83C\uDFF7 Titre");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, AdminSettingsComponent_section_8_Template, 14, 8, "section", 4)(9, AdminSettingsComponent_section_9_Template, 15, 10, "section", 4)(10, AdminSettingsComponent_section_10_Template, 18, 6, "section", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("active", ctx.activeSection === "carousel");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("active", ctx.activeSection === "translations");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("active", ctx.activeSection === "title");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.activeSection === "carousel");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.activeSection === "translations");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.activeSection === "title");
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel],
      styles: [".settings-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  max-width: 900px;\n}\n\n.settings-nav[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 1.5rem;\n  border-bottom: 2px solid #e0e0e0;\n  padding-bottom: 0.5rem;\n}\n\n.settings-nav-btn[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  font-size: 0.95rem;\n  border-radius: 4px 4px 0 0;\n  color: #555;\n  transition: background 0.15s, color 0.15s;\n}\n.settings-nav-btn[_ngcontent-%COMP%]:hover {\n  background: #f0f0f0;\n}\n.settings-nav-btn.active[_ngcontent-%COMP%] {\n  background: #fff;\n  color: #8b4513;\n  font-weight: 600;\n  border-bottom: 2px solid #8b4513;\n  margin-bottom: -2px;\n}\n\n.settings-section[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 8px;\n  padding: 1.5rem;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);\n}\n\n.settings-title[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #333;\n}\n\n.settings-hint[_ngcontent-%COMP%] {\n  color: #777;\n  font-size: 0.875rem;\n  margin-bottom: 1rem;\n}\n\n.settings-error[_ngcontent-%COMP%] {\n  color: #c0392b;\n  font-size: 0.875rem;\n  margin: 0.5rem 0;\n}\n\n.settings-success[_ngcontent-%COMP%] {\n  color: #27ae60;\n  font-size: 0.875rem;\n  margin: 0.5rem 0;\n}\n\n.settings-empty[_ngcontent-%COMP%] {\n  color: #999;\n  font-style: italic;\n  padding: 1rem 0;\n}\n\n.drop-zone[_ngcontent-%COMP%] {\n  border: 2px dashed #ccc;\n  border-radius: 8px;\n  padding: 2rem;\n  text-align: center;\n  cursor: pointer;\n  transition: border-color 0.2s, background 0.2s;\n  color: #777;\n  margin-bottom: 1rem;\n}\n.drop-zone[_ngcontent-%COMP%]:hover, .drop-zone.drag-over[_ngcontent-%COMP%] {\n  border-color: #8b4513;\n  background: #fdf5ee;\n  color: #8b4513;\n}\n\n.slide-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  margin-top: 0.75rem;\n}\n\n.slide-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.5rem;\n  border: 1px solid #eee;\n  border-radius: 6px;\n  background: #fafafa;\n}\n\n.slide-thumb[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 48px;\n  object-fit: cover;\n  border-radius: 4px;\n  border: 1px solid #ddd;\n}\n\n.slide-index[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #aaa;\n  width: 20px;\n  text-align: center;\n}\n\n.slide-actions[_ngcontent-%COMP%] {\n  margin-left: auto;\n  display: flex;\n  gap: 0.25rem;\n}\n\n.btn-order[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border: 1px solid #ccc;\n  background: #fff;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 0.85rem;\n  line-height: 1;\n}\n.btn-order[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f0e8df;\n  border-color: #8b4513;\n}\n.btn-order[_ngcontent-%COMP%]:disabled {\n  opacity: 0.35;\n  cursor: default;\n}\n\n.btn-delete-slide[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border: 1px solid #e74c3c;\n  background: #fff;\n  color: #e74c3c;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 0.85rem;\n  line-height: 1;\n}\n.btn-delete-slide[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #fdecea;\n}\n.btn-delete-slide[_ngcontent-%COMP%]:disabled {\n  opacity: 0.35;\n  cursor: default;\n}\n\n.translations-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 1rem;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n\n.translations-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n}\n\n.btn-reload[_ngcontent-%COMP%] {\n  padding: 0.4rem 0.9rem;\n  border: 1px solid #ccc;\n  background: #fff;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 0.875rem;\n}\n.btn-reload[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f5f5f5;\n}\n.btn-reload[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n\n.btn-save-translations[_ngcontent-%COMP%] {\n  padding: 0.4rem 0.9rem;\n  border: none;\n  background: #8b4513;\n  color: #fff;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 0.875rem;\n}\n.btn-save-translations[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #7a3b10;\n}\n.btn-save-translations[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n\n.translations-search[_ngcontent-%COMP%] {\n  margin-bottom: 0.75rem;\n}\n\n.translations-filter-input[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 360px;\n  padding: 0.4rem 0.7rem;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 0.875rem;\n}\n\n.translations-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.875rem;\n}\n.translations-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 0.5rem 0.75rem;\n  background: #f5f5f5;\n  border-bottom: 2px solid #ddd;\n  color: #555;\n  font-weight: 600;\n}\n.translations-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.35rem 0.75rem;\n  border-bottom: 1px solid #f0f0f0;\n  vertical-align: top;\n}\n.translations-table[_ngcontent-%COMP%]   tr.dirty-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: #fffbe6;\n}\n.translations-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: #fafafa;\n}\n\n.col-key[_ngcontent-%COMP%] {\n  width: 30%;\n}\n\n.col-lang[_ngcontent-%COMP%] {\n  width: 35%;\n}\n\n.translation-input[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #ddd;\n  border-radius: 3px;\n  padding: 0.25rem 0.4rem;\n  font-size: 0.8rem;\n  resize: vertical;\n  font-family: inherit;\n}\n.translation-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #8b4513;\n  box-shadow: 0 0 0 2px rgba(139, 69, 19, 0.15);\n}\n\n.title-fields[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n\n.title-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n\n.title-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #555;\n}\n\n.title-input[_ngcontent-%COMP%] {\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 0.95rem;\n  max-width: 400px;\n}\n.title-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #8b4513;\n  box-shadow: 0 0 0 2px rgba(139, 69, 19, 0.15);\n}\n\n.btn-save-title[_ngcontent-%COMP%] {\n  padding: 0.5rem 1.25rem;\n  border: none;\n  background: #8b4513;\n  color: #fff;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 0.9rem;\n}\n.btn-save-title[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #7a3b10;\n}\n.btn-save-title[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n\n@media (max-width: 599px) {\n  .settings-nav[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .settings-section[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .translations-table[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .translations-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .translations-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .translations-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    display: block;\n    border: 1px solid #e0e0e0;\n    border-radius: 6px;\n    margin-bottom: 10px;\n    background: #fff;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);\n    overflow: hidden;\n  }\n  .translations-table[_ngcontent-%COMP%]   tr.dirty-row[_ngcontent-%COMP%] {\n    background: #fffbe6;\n  }\n  .translations-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .translations-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    padding: 8px 12px;\n    border-bottom: 1px solid #f0f0f0;\n    vertical-align: top;\n  }\n  .translations-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    border-bottom: none;\n  }\n  .translations-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]::before {\n    content: attr(data-label);\n    font-weight: 600;\n    color: #777;\n    font-size: 11px;\n    text-transform: uppercase;\n    letter-spacing: 0.4px;\n    margin-bottom: 4px;\n  }\n  .translations-table[_ngcontent-%COMP%]   .col-key[_ngcontent-%COMP%] {\n    background: #f8f8f8;\n  }\n  .translations-table[_ngcontent-%COMP%]   .col-key[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n    font-size: 12px;\n    word-break: break-all;\n  }\n  .translations-table[_ngcontent-%COMP%]   .col-key[_ngcontent-%COMP%], \n   .translations-table[_ngcontent-%COMP%]   .col-lang[_ngcontent-%COMP%] {\n    width: auto;\n  }\n  .translations-table[_ngcontent-%COMP%]   .translation-input[_ngcontent-%COMP%] {\n    width: 100%;\n    box-sizing: border-box;\n  }\n  .translations-filter-input[_ngcontent-%COMP%] {\n    max-width: 100%;\n    width: 100%;\n    box-sizing: border-box;\n  }\n  .translations-actions[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n    width: 100%;\n  }\n  .translations-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1 1 auto;\n    text-align: center;\n  }\n  .translations-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvYWRtaW4vYWRtaW4tc2V0dGluZ3MvYWRtaW4tc2V0dGluZ3MuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7QUFDRjs7QUFHQTtFQUNFLGFBQUE7RUFDQSxXQUFBO0VBQ0EscUJBQUE7RUFDQSxnQ0FBQTtFQUNBLHNCQUFBO0FBQUY7O0FBR0E7RUFDRSxvQkFBQTtFQUNBLFlBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLDBCQUFBO0VBQ0EsV0FBQTtFQUNBLHlDQUFBO0FBQUY7QUFFRTtFQUFVLG1CQUFBO0FBQ1o7QUFBRTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxtQkFBQTtBQUVKOztBQUdBO0VBQ0UsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSx5Q0FBQTtBQUFGOztBQUdBO0VBQ0Usa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsV0FBQTtBQUFGOztBQUdBO0VBQ0UsV0FBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFBRjs7QUFHQTtFQUFvQixjQUFBO0VBQWdCLG1CQUFBO0VBQXFCLGdCQUFBO0FBR3pEOztBQUZBO0VBQW9CLGNBQUE7RUFBZ0IsbUJBQUE7RUFBcUIsZ0JBQUE7QUFRekQ7O0FBUEE7RUFBb0IsV0FBQTtFQUFhLGtCQUFBO0VBQW9CLGVBQUE7QUFhckQ7O0FBVkE7RUFDRSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLDhDQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0FBYUY7QUFYRTtFQUNFLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0FBYUo7O0FBUkE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7QUFXRjs7QUFSQTtFQUNFLGFB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QUFBO0FBK0IzQjtBQTlCRTtFQUFhLFlBQUE7RUFBYyxlQUFBO0FBa0M3Qjs7QUE5QkE7RUFFRTtJQUNFLGVBQUE7RUFnQ0Y7RUE3QkE7SUFDRSxhQUFBO0VBK0JGO0VBM0JBO0lBQ0UsY0FBQTtFQTZCRjtFQTNCRTtJQUFRLGFBQUE7RUE4QlY7RUE3QkU7SUFBUSxjQUFBO0VBZ0NWO0VBOUJFO0lBQ0UsY0FBQTtJQUNBLHlCQUFBO0lBQ0Esa0JBQUE7SUFDQSxtQkFBQTtJQUNBLGdCQUFBO0lBQ0EseUNBQUE7SUFDQSxnQkFBQTtFQWdDSjtFQTdCRTtJQUFlLG1CQUFBO0VBZ0NqQjtFQS9CRTtJQUFlLHVCQUFBO0VBa0NqQjtFQWhDRTtJQUNFLGFBQUE7SUFDQSxzQkFBQTtJQUNBLGlCQUFBO0lBQ0EsZ0NBQUE7SUFDQSxtQkFBQTtFQWtDSjtFQWhDSTtJQUFlLG1CQUFBO0VBbUNuQjtFQWpDSTtJQUNFLHlCQUFBO0lBQ0EsZ0JBQUE7SUFDQSxXQUFBO0lBQ0EsZUFBQTtJQUNBLHlCQUFBO0lBQ0EscUJBQUE7SUFDQSxrQkFBQTtFQW1DTjtFQTlCRTtJQUNFLG1CQUFBO0VBZ0NKO0VBL0JJO0lBQU8sZUFBQTtJQUFpQixxQkFBQTtFQW1DNUI7RUEvQkU7O0lBQ1ksV0FBQTtFQWtDZDtFQWhDRTtJQUNFLFdBQUE7SUFDQSxzQkFBQTtFQWtDSjtFQTdCQTtJQUNFLGVBQUE7SUFDQSxXQUFBO0lBQ0Esc0JBQUE7RUErQkY7RUEzQkE7SUFDRSxlQUFBO0lBQ0EsV0FBQTtFQTZCRjtFQTNCRTtJQUFTLGNBQUE7SUFBZ0Isa0JBQUE7RUErQjNCO0VBM0JBO0lBQ0Usc0JBQUE7SUFDQSx1QkFBQTtFQTZCRjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLnNldHRpbmdzLWNvbnRhaW5lciB7XG4gIHBhZGRpbmc6IDEuNXJlbTtcbiAgbWF4LXdpZHRoOiA5MDBweDtcbn1cblxuLy8gw6LClMKAw6LClMKAIE5hdmlnYXRpb25cbi5zZXR0aW5ncy1uYXYge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDAuNXJlbTtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgI2UwZTBlMDtcbiAgcGFkZGluZy1ib3R0b206IDAuNXJlbTtcbn1cblxuLnNldHRpbmdzLW5hdi1idG4ge1xuICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250LXNpemU6IDAuOTVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDRweCA0cHggMCAwO1xuICBjb2xvcjogIzU1NTtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjE1cywgY29sb3IgMC4xNXM7XG5cbiAgJjpob3ZlciB7IGJhY2tncm91bmQ6ICNmMGYwZjA7IH1cbiAgJi5hY3RpdmUge1xuICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgY29sb3I6ICM4YjQ1MTM7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgIzhiNDUxMztcbiAgICBtYXJnaW4tYm90dG9tOiAtMnB4O1xuICB9XG59XG5cbi8vIMOiwpTCgMOiwpTCgCBTZWN0aW9uXG4uc2V0dGluZ3Mtc2VjdGlvbiB7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgcGFkZGluZzogMS41cmVtO1xuICBib3gtc2hhZG93OiAwIDFweCA0cHggcmdiYSgwLDAsMCwuMDgpO1xufVxuXG4uc2V0dGluZ3MtdGl0bGUge1xuICBtYXJnaW46IDAgMCAwLjVyZW07XG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzMzMztcbn1cblxuLnNldHRpbmdzLWhpbnQge1xuICBjb2xvcjogIzc3NztcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cblxuLnNldHRpbmdzLWVycm9yICAgeyBjb2xvcjogI2MwMzkyYjsgZm9udC1zaXplOiAwLjg3NXJlbTsgbWFyZ2luOiAwLjVyZW0gMDsgfVxuLnNldHRpbmdzLXN1Y2Nlc3MgeyBjb2xvcjogIzI3YWU2MDsgZm9udC1zaXplOiAwLjg3NXJlbTsgbWFyZ2luOiAwLjVyZW0gMDsgfVxuLnNldHRpbmdzLWVtcHR5ICAgeyBjb2xvcjogIzk5OTsgZm9udC1zdHlsZTogaXRhbGljOyBwYWRkaW5nOiAxcmVtIDA7IH1cblxuLy8gw6LClMKAw6LClMKAIERyb3Agem9uZSAoY2Fyb3VzZWwpXG4uZHJvcC16b25lIHtcbiAgYm9yZGVyOiAycHggZGFzaGVkICNjY2M7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgcGFkZGluZzogMnJlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjJzLCBiYWNrZ3JvdW5kIDAuMnM7XG4gIGNvbG9yOiAjNzc3O1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuXG4gICY6aG92ZXIsICYuZHJhZy1vdmVyIHtcbiAgICBib3JkZXItY29sb3I6ICM4YjQ1MTM7XG4gICAgYmFja2dyb3VuZDogI2ZkZjVlZTtcbiAgICBjb2xvcjogIzhiNDUxMztcbiAgfVxufVxuXG4vLyDDosKUwoDDosKUwoAgU2xpZGUgbGlzdFxuLnNsaWRlLWxpc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDAuNXJlbTtcbiAgbWFyZ2luLXRvcDogMC43NXJlbTtcbn1cblxuLnNsaWRlLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMC43NXJlbTtcbiAgcGFkZGluZzogMC41cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZWVlO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIGJhY2tncm91bmQ6ICNmYWZhZmE7XG59XG5cbi5zbGlkZS10aHVtYiB7XG4gIHdpZHRoOiA2NHB4O1xuICBoZWlnaHQ6IDQ4cHg7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG59XG5cbi5zbGlkZS1pbmRleCB7XG4gIGZvbnQtc2l6ZTogMC44cmVtO1xuICBjb2xvcjogI2FhYTtcbiAgd2lkdGg6IDIwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnNsaWRlLWFjdGlvbnMge1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAwLjI1cmVtO1xufVxuXG4uYnRuLW9yZGVyIHtcbiAgd2lkdGg6IDI4cHg7XG4gIGhlaWdodDogMjhweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgbGluZS1oZWlnaHQ6IDE7XG5cbiAgJjpob3Zlcjpub3QoOmRpc2FibGVkKSB7IGJhY2tncm91bmQ6ICNmMGU4ZGY7IGJvcmRlci1jb2xvcjogIzhiNDUxMzsgfVxuICAmOmRpc2FibGVkIHsgb3BhY2l0eTogMC4zNTsgY3Vyc29yOiBkZWZhdWx0OyB9XG59XG5cbi5idG4tZGVsZXRlLXNsaWRlIHtcbiAgd2lkdGg6IDI4cHg7XG4gIGhlaWdodDogMjhweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2U3NGMzYztcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICNlNzRjM2M7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250LXNpemU6IDAuODVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxO1xuXG4gICY6aG92ZXI6bm90KDpkaXNhYmxlZCkgeyBiYWNrZ3JvdW5kOiAjZmRlY2VhOyB9XG4gICY6ZGlzYWJsZWQgeyBvcGFjaXR5OiAwLjM1OyBjdXJzb3I6IGRlZmF1bHQ7IH1cbn1cblxuLy8gw6LClMKAw6LClMKAIFRyYW5zbGF0aW9uc1xuLnRyYW5zbGF0aW9ucy1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgZ2FwOiAwLjVyZW07XG59XG5cbi50cmFuc2xhdGlvbnMtYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMC41cmVtO1xufVxuXG4uYnRuLXJlbG9hZCB7XG4gIHBhZGRpbmc6IDAuNHJlbSAwLjlyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuXG4gICY6aG92ZXI6bm90KDpkaXNhYmxlZCkgeyBiYWNrZ3JvdW5kOiAjZjVmNWY1OyB9XG4gICY6ZGlzYWJsZWQgeyBvcGFjaXR5OiAwLjU7IGN1cnNvcjogZGVmYXVsdDsgfVxufVxuXG4uYnRuLXNhdmUtdHJhbnNsYXRpb25zIHtcbiAgcGFkZGluZzogMC40cmVtIDAuOXJlbTtcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kOiAjOGI0NTEzO1xuICBjb2xvcjogI2ZmZjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG5cbiAgJjpob3Zlcjpub3QoOmRpc2FibGVkKSB7IGJhY2tncm91bmQ6ICM3YTNiMTA7IH1cbiAgJjpkaXNhYmxlZCB7IG9wYWNpdHk6IDAuNTsgY3Vyc29yOiBkZWZhdWx0OyB9XG59XG5cbi50cmFuc2xhdGlvbnMtc2VhcmNoIHtcbiAgbWFyZ2luLWJvdHRvbTogMC43NXJlbTtcbn1cblxuLnRyYW5zbGF0aW9ucy1maWx0ZXItaW5wdXQge1xuICB3aWR0aDogMTAwJTtcbiAgbWF4LXdpZHRoOiAzNjBweDtcbiAgcGFkZGluZzogMC40cmVtIDAuN3JlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDAuODc1cmVtO1xufVxuXG4udHJhbnNsYXRpb25zLXRhYmxlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG5cbiAgdGgge1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgcGFkZGluZzogMC41cmVtIDAuNzVyZW07XG4gICAgYmFja2dyb3VuZDogI2Y1ZjVmNTtcbiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgI2RkZDtcbiAgICBjb2xvcjogIzU1NTtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICB9XG5cbiAgdGQge1xuICAgIHBhZGRpbmc6IDAuMzVyZW0gMC43NXJlbTtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2YwZjBmMDtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICB9XG5cbiAgdHIuZGlydHktcm93IHRkIHsgYmFja2dyb3VuZDogI2ZmZmJlNjsgfVxuICB0cjpob3ZlciB0ZCB7IGJhY2tncm91bmQ6ICNmYWZhZmE7IH1cbn1cblxuLmNvbC1rZXkgICB7IHdpZHRoOiAzMCU7IH1cbi5jb2wtbGFuZyAgeyB3aWR0aDogMzUlOyB9XG5cbi50cmFuc2xhdGlvbi1pbnB1dCB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIHBhZGRpbmc6IDAuMjVyZW0gMC40cmVtO1xuICBmb250LXNpemU6IDAuOHJlbTtcbiAgcmVzaXplOiB2ZXJ0aWNhbDtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG5cbiAgJjpmb2N1cyB7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgICBib3JkZXItY29sb3I6ICM4YjQ1MTM7XG4gICAgYm94LXNoYWRvdzogMCAwIDAgMnB4IHJnYmEoMTM5LDY5LDE5LC4xNSk7XG4gIH1cbn1cblxuLy8gw6LClMKAw6LClMKAIFRpdGxlIHNlY3Rpb25cbi50aXRsZS1maWVsZHMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDFyZW07XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG5cbi50aXRsZS1maWVsZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMC4zNXJlbTtcbn1cblxuLnRpdGxlLWxhYmVsIHtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICM1NTU7XG59XG5cbi50aXRsZS1pbnB1dCB7XG4gIHBhZGRpbmc6IDAuNXJlbSAwLjc1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMC45NXJlbTtcbiAgbWF4LXdpZHRoOiA0MDBweDtcblxuICAmOmZvY3VzIHtcbiAgICBvdXRsaW5lOiBub25lO1xuICAgIGJvcmRlci1jb2xvcjogIzhiNDUxMztcbiAgICBib3gtc2hhZG93OiAwIDAgMCAycHggcmdiYSgxMzksNjksMTksLjE1KTtcbiAgfVxufVxuXG4uYnRuLXNhdmUtdGl0bGUge1xuICBwYWRkaW5nOiAwLjVyZW0gMS4yNXJlbTtcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kOiAjOGI0NTEzO1xuICBjb2xvcjogI2ZmZjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtc2l6ZTogMC45cmVtO1xuXG4gICY6aG92ZXI6bm90KDpkaXNhYmxlZCkgeyBiYWNrZ3JvdW5kOiAjN2EzYjEwOyB9XG4gICY6ZGlzYWJsZWQgeyBvcGFjaXR5OiAwLjU7IGN1cnNvcjogZGVmYXVsdDsgfVxufVxuXG4vLyDDosKUwoDDosKUwoAgUmVzcG9uc2l2ZSBtb2JpbGUgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXG5AbWVkaWEgKG1heC13aWR0aDogNTk5cHgpIHtcblxuICAuc2V0dGluZ3MtbmF2IHtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gIH1cblxuICAuc2V0dGluZ3Mtc2VjdGlvbiB7XG4gICAgcGFkZGluZzogMXJlbTtcbiAgfVxuXG4gIC8vIFRhYmxlYXUgbGliZWxsw4PCqXMgw6LChsKSIGNhcnRlcyBlbXBpbMODwqllc1xuICAudHJhbnNsYXRpb25zLXRhYmxlIHtcbiAgICBkaXNwbGF5OiBibG9jaztcblxuICAgIHRoZWFkIHsgZGlzcGxheTogbm9uZTsgfVxuICAgIHRib2R5IHsgZGlzcGxheTogYmxvY2s7IH1cblxuICAgIHRyIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2UwZTBlMDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgICAgYm94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEoMCwwLDAsLjA2KTtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgfVxuXG4gICAgdHIuZGlydHktcm93IHsgYmFja2dyb3VuZDogI2ZmZmJlNjsgfVxuICAgIHRyOmhvdmVyIHRkICB7IGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyB9XG5cbiAgICB0ZCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIHBhZGRpbmc6IDhweCAxMnB4O1xuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmMGYwZjA7XG4gICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuXG4gICAgICAmOmxhc3QtY2hpbGQgeyBib3JkZXItYm90dG9tOiBub25lOyB9XG5cbiAgICAgICY6OmJlZm9yZSB7XG4gICAgICAgIGNvbnRlbnQ6IGF0dHIoZGF0YS1sYWJlbCk7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgIGNvbG9yOiAjNzc3O1xuICAgICAgICBmb250LXNpemU6IDExcHg7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgIGxldHRlci1zcGFjaW5nOiAuNHB4O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2zDg8KpIDogZm9uZCBsw4PCqWfDg8KocmVtZW50IGdyaXMsIHBvbGljZSBtb25vXG4gICAgLmNvbC1rZXkge1xuICAgICAgYmFja2dyb3VuZDogI2Y4ZjhmODtcbiAgICAgIGNvZGUgeyBmb250LXNpemU6IDEycHg7IHdvcmQtYnJlYWs6IGJyZWFrLWFsbDsgfVxuICAgIH1cblxuICAgIC8vIExhcmdldXJzIGZpeGVzIGTDg8Kpc2FjdGl2w4PCqWVzIHN1ciBtb2JpbGVcbiAgICAuY29sLWtleSxcbiAgICAuY29sLWxhbmcgeyB3aWR0aDogYXV0bzsgfVxuXG4gICAgLnRyYW5zbGF0aW9uLWlucHV0IHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICB9XG4gIH1cblxuICAvLyBGaWx0cmUgcGxlaW5lIGxhcmdldXJcbiAgLnRyYW5zbGF0aW9ucy1maWx0ZXItaW5wdXQge1xuICAgIG1heC13aWR0aDogMTAwJTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB9XG5cbiAgLy8gQm91dG9ucyBkJ2FjdGlvbiA6IHdyYXBcbiAgLnRyYW5zbGF0aW9ucy1hY3Rpb25zIHtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgd2lkdGg6IDEwMCU7XG5cbiAgICBidXR0b24geyBmbGV4OiAxIDEgYXV0bzsgdGV4dC1hbGlnbjogY2VudGVyOyB9XG4gIH1cblxuICAvLyBFbi10w4PCqnRlIHNlY3Rpb24gbGliZWxsw4PCqXMgOiBlbXBpbMODwqlcbiAgLnRyYW5zbGF0aW9ucy1oZWFkZXIge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
      changeDetection: 0
    });
  }
}

/***/ },

/***/ 68676
/*!**************************************************************!*\
  !*** ./node_modules/ngx-quill/fesm2022/ngx-quill-config.mjs ***!
  \**************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QUILL_CONFIG_TOKEN: () => (/* binding */ QUILL_CONFIG_TOKEN),
/* harmony export */   QuillConfigModule: () => (/* binding */ QuillConfigModule),
/* harmony export */   defaultModules: () => (/* binding */ defaultModules),
/* harmony export */   provideQuillConfig: () => (/* binding */ provideQuillConfig)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 36124);


const defaultModules = {
  toolbar: [['bold', 'italic', 'underline', 'strike'],
  // toggled buttons
  ['blockquote', 'code-block'], [{
    header: 1
  }, {
    header: 2
  }],
  // custom button values
  [{
    list: 'ordered'
  }, {
    list: 'bullet'
  }], [{
    script: 'sub'
  }, {
    script: 'super'
  }],
  // superscript/subscript
  [{
    indent: '-1'
  }, {
    indent: '+1'
  }],
  // outdent/indent
  [{
    direction: 'rtl'
  }],
  // text direction
  [{
    size: ['small', false, 'large', 'huge']
  }],
  // custom dropdown
  [{
    header: [1, 2, 3, 4, 5, 6, false]
  }], [{
    color: []
  }, {
    background: []
  }],
  // dropdown with defaults from theme
  [{
    font: []
  }], [{
    align: []
  }], ['clean'],
  // remove formatting button
  ['link', 'image', 'video'],
  // link and image, video
  ['table']]
};
const QUILL_CONFIG_TOKEN = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('config', {
  providedIn: 'root',
  factory: () => ({
    modules: defaultModules
  })
});

/**
 * This `NgModule` provides a global Quill config on the root level, e.g., in `AppModule`.
 * But this eliminates the need to import the entire `ngx-quill` library into the main bundle.
 * The `quill-editor` itself may be rendered in any lazy-loaded module, but importing `QuillModule`
 * into the `AppModule` will bundle the `ngx-quill` into the vendor.
 */
class QuillConfigModule {
  static forRoot(config) {
    return {
      ngModule: QuillConfigModule,
      providers: [{
        provide: QUILL_CONFIG_TOKEN,
        useValue: config
      }]
    };
  }
  static {
    this.ɵfac = function QuillConfigModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || QuillConfigModule)();
    };
  }
  static {
    this.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
      type: QuillConfigModule
    });
  }
  static {
    this.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({});
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__.setClassMetadata(QuillConfigModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule
  }], null, null);
})();

/**
 * Provides Quill configuration at the root level:
 * ```ts
 * bootstrapApplication(AppComponent, {
 *   providers: [provideQuillConfig(...)]
 * });
 * ```
 */
const provideQuillConfig = config => (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.makeEnvironmentProviders)([{
  provide: QUILL_CONFIG_TOKEN,
  useValue: config
}]);

/*
 * Public API Surface of ngx-quill/config
 */

/**
 * Generated bundle index. Do not edit.
 */



/***/ },

/***/ 71638
/*!*************************************************************************!*\
  !*** ./src/app/features/admin/admin-catalog/admin-catalog.component.ts ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminCatalogComponent: () => (/* binding */ AdminCatalogComponent)
/* harmony export */ });
/* harmony import */ var C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/fire/database */ 41559);
/* harmony import */ var _angular_fire_functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/functions */ 55559);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 2510);
/* harmony import */ var _app_features_store_catalog_catalog_selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @app/features/store/catalog/catalog.selectors */ 90077);
/* harmony import */ var _confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../confirm-dialog/confirm-dialog.component */ 38830);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngrx/store */ 81383);
/* harmony import */ var _app_core_firebase_catalog_repository__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @app/core/firebase/catalog.repository */ 53521);
/* harmony import */ var _app_core_firebase_gemini_ai_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @app/core/firebase/gemini-ai.service */ 96605);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/dialog */ 12587);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 79748);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngx-quill */ 12041);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/tooltip */ 15575);

















function AdminCatalogComponent_ng_container_0_div_4_p_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "p", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r1.createError);
  }
}
function AdminCatalogComponent_ng_container_0_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 10)(1, "h3", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "Cr\u00E9er une cat\u00E9gorie");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "div", 12)(4, "label", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "Pr\u00E9fixe ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9, " \u2014 segment d'URI\u00A0: lettres minuscules, chiffres, tirets (ex\u00A0: bijoux, sac-femme)");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "input", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function AdminCatalogComponent_ng_container_0_div_4_Template_input_ngModelChange_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx_r1.newPrefix, $event) || (ctx_r1.newPrefix = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("input", function AdminCatalogComponent_ng_container_0_div_4_Template_input_input_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.onPrefixInput($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "div", 12)(12, "label", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](13, "Titre ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](15, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "input", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function AdminCatalogComponent_ng_container_0_div_4_Template_input_ngModelChange_16_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx_r1.newTitle, $event) || (ctx_r1.newTitle = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](17, "div", 12)(18, "label", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](19, "Description ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](20, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](21, "(optionnel)");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](22, "div", 19)(23, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_0_div_4_Template_button_click_23_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.descLang = "fr");
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](24, "\uD83C\uDDEB\uD83C\uDDF7 FR");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](25, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_0_div_4_Template_button_click_25_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.descLang = "en");
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](26, "\uD83C\uDDEC\uD83C\uDDE7 EN");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](27, "quill-editor", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("onContentChanged", function AdminCatalogComponent_ng_container_0_div_4_Template_quill_editor_onContentChanged_27_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.onNewDescChanged("fr", $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](28, "quill-editor", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("onContentChanged", function AdminCatalogComponent_ng_container_0_div_4_Template_quill_editor_onContentChanged_28_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.onNewDescChanged("en", $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](29, AdminCatalogComponent_ng_container_0_div_4_p_29_Template, 2, 1, "p", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](30, "div", 24)(31, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_0_div_4_Template_button_click_31_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.submitCreateCategory());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](32);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](33, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_0_div_4_Template_button_click_33_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.cancelCreate());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](34, "Annuler");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.newPrefix);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.newTitle);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("active", ctx_r1.descLang === "fr");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("active", ctx_r1.descLang === "en");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("hidden", ctx_r1.descLang !== "fr")("ngModel", ctx_r1.newDescription)("modules", ctx_r1.quillModules);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("hidden", ctx_r1.descLang !== "en")("ngModel", ctx_r1.newDescriptionEn)("modules", ctx_r1.quillModules);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.createError);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r1.creating);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r1.creating ? "\u2026" : "Cr\u00E9er", " ");
  }
}
function AdminCatalogComponent_ng_container_0_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " Aucune cat\u00E9gorie. Cr\u00E9ez-en une pour commencer. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function AdminCatalogComponent_ng_container_0_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 29)(1, "div", 30)(2, "div", 31)(3, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "div", 34)(8, "button", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_0_div_7_Template_button_click_8_listener() {
      const cat_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r4).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.toggleCategoryPublished(cat_r5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_0_div_7_Template_button_click_10_listener() {
      const cat_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r4).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.selectCategory(cat_r5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](11, "G\u00E9rer \u2192");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_0_div_7_Template_button_click_12_listener() {
      const cat_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r4).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.deleteCategory(cat_r5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](13, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const cat_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](cat_r5.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](cat_r5.prefix);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("published", cat_r5.published);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", cat_r5.published ? "\u2713 Publi\u00E9" : "Publier", " ");
  }
}
function AdminCatalogComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 4)(2, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_0_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.openCreateForm());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "+ Nouvelle cat\u00E9gorie");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, AdminCatalogComponent_ng_container_0_div_4_Template, 35, 15, "div", 6)(5, AdminCatalogComponent_ng_container_0_div_5_Template, 2, 0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, AdminCatalogComponent_ng_container_0_div_7_Template, 14, 5, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.showCreateForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.categories.length === 0 && !ctx_r1.showCreateForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r1.categories)("ngForTrackBy", ctx_r1.trackByPrefix);
  }
}
function AdminCatalogComponent_ng_container_1_button_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "button", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_button_15_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.openEditDesc(ctx_r1.selectedCategory));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "\u270E Modifier");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function AdminCatalogComponent_ng_container_1_ng_container_16_p_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "p", 70);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("innerHTML", ctx_r1.selectedCategory.description, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeHtml"]);
  }
}
function AdminCatalogComponent_ng_container_1_ng_container_16_p_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "p", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Aucune description FR.");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function AdminCatalogComponent_ng_container_1_ng_container_16_p_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "p", 72);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("innerHTML", ctx_r1.selectedCategory.descriptionEn, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeHtml"]);
  }
}
function AdminCatalogComponent_ng_container_1_ng_container_16_p_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "p", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Aucune description EN.");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function AdminCatalogComponent_ng_container_1_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, AdminCatalogComponent_ng_container_1_ng_container_16_p_1_Template, 1, 1, "p", 67)(2, AdminCatalogComponent_ng_container_1_ng_container_16_p_2_Template, 2, 0, "p", 68)(3, AdminCatalogComponent_ng_container_1_ng_container_16_p_3_Template, 1, 1, "p", 69)(4, AdminCatalogComponent_ng_container_1_ng_container_16_p_4_Template, 2, 0, "p", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.selectedCategory.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r1.selectedCategory.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.selectedCategory.descriptionEn);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r1.selectedCategory.descriptionEn);
  }
}
function AdminCatalogComponent_ng_container_1_ng_container_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 19)(2, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_ng_container_17_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.editDescLang = "fr");
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "\uD83C\uDDEB\uD83C\uDDF7 FR");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_ng_container_17_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.editDescLang = "en");
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "\uD83C\uDDEC\uD83C\uDDE7 EN");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "div", 73)(7, "div", 74)(8, "quill-editor", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("onContentChanged", function AdminCatalogComponent_ng_container_1_ng_container_17_Template_quill_editor_onContentChanged_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.onDescChanged("fr", $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "quill-editor", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("onContentChanged", function AdminCatalogComponent_ng_container_1_ng_container_17_Template_quill_editor_onContentChanged_9_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.onDescChanged("en", $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "div", 75)(11, "p", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](12, "Aper\u00E7u");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](13, "div", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "div", 78)(15, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_ng_container_17_Template_button_click_15_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.saveDesc());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](17, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_ng_container_17_Template_button_click_17_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.cancelEditDesc());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](18, "Annuler");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("active", ctx_r1.editDescLang === "fr");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("active", ctx_r1.editDescLang === "en");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("hidden", ctx_r1.editDescLang !== "fr")("ngModel", ctx_r1.editDescFr)("modules", ctx_r1.quillModules);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("hidden", ctx_r1.editDescLang !== "en")("ngModel", ctx_r1.editDescEn)("modules", ctx_r1.quillModules);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("innerHTML", ctx_r1.editDescLang === "fr" ? ctx_r1.editDescFr : ctx_r1.editDescEn, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r1.savingDesc);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r1.savingDesc ? "\u2026" : "Enregistrer", " ");
  }
}
function AdminCatalogComponent_ng_container_1_div_30_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "button", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_div_30_button_3_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r11);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.prepareMerge());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"](" Regrouper ", ctx_r1.selectedCount, " image", ctx_r1.selectedCount > 1 ? "s" : "", " ");
  }
}
function AdminCatalogComponent_ng_container_1_div_30_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " Cliquez sur les images \u00E0 regrouper ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function AdminCatalogComponent_ng_container_1_div_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 79)(1, "button", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_div_30_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r10);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.toggleSelectionMode());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, AdminCatalogComponent_ng_container_1_div_30_button_3_Template, 2, 2, "button", 81)(4, AdminCatalogComponent_ng_container_1_div_30_span_4_Template, 2, 0, "span", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("active", ctx_r1.selectionMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r1.selectionMode ? "\u2715 Annuler la s\u00E9lection" : "\u229E Mode regroupement", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.selectionMode && ctx_r1.selectedCount > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.selectionMode && ctx_r1.selectedCount === 0);
  }
}
function AdminCatalogComponent_ng_container_1_div_31_div_4_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Cover");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function AdminCatalogComponent_ng_container_1_div_31_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_div_31_div_4_Template_div_click_0_listener() {
      const i_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r13).index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.pendingMerge.coverIndex = i_r14);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "img", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, AdminCatalogComponent_ng_container_1_div_31_div_4_span_2_Template, 2, 0, "span", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const preview_r15 = ctx.$implicit;
    const i_r14 = ctx.index;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("is-cover", ctx_r1.pendingMerge.coverIndex === i_r14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("src", preview_r15, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.pendingMerge.coverIndex === i_r14);
  }
}
function AdminCatalogComponent_ng_container_1_div_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 85)(1, "p", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "Choisissez la photo de couverture");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "div", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, AdminCatalogComponent_ng_container_1_div_31_div_4_Template, 3, 4, "div", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "div", 89)(6, "button", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_div_31_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r12);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.confirmMerge());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7, "Confirmer le regroupement");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_div_31_Template_button_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r12);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.pendingMerge = null);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9, "Annuler");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r1.pendingMerge.previews);
  }
}
function AdminCatalogComponent_ng_container_1_div_32_div_1_div_7_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Cover");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function AdminCatalogComponent_ng_container_1_div_32_div_1_div_7_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 111)(1, "span", 112);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const fi_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().index;
    const gi_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().index;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("checked", ctx_r1.isImageSelected(gi_r17, fi_r19));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r1.isImageSelected(gi_r17, fi_r19) ? "\u2713" : "", " ");
  }
}
function AdminCatalogComponent_ng_container_1_div_32_div_1_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_div_32_div_1_div_7_Template_div_click_0_listener($event) {
      const fi_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r18).index;
      const gi_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.selectionMode ? ctx_r1.toggleImageSelection(gi_r17, fi_r19, $event) : ctx_r1.setCover(gi_r17, fi_r19));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "img", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, AdminCatalogComponent_ng_container_1_div_32_div_1_div_7_span_2_Template, 2, 0, "span", 93)(3, AdminCatalogComponent_ng_container_1_div_32_div_1_div_7_span_3_Template, 3, 3, "span", 110);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const preview_r20 = ctx.$implicit;
    const fi_r19 = ctx.index;
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    const group_r22 = ctx_r20.$implicit;
    const gi_r17 = ctx_r20.index;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("is-cover", group_r22.coverIndex === fi_r19 && !ctx_r1.selectionMode)("is-selected", ctx_r1.isImageSelected(gi_r17, fi_r19));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("src", preview_r20, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", group_r22.coverIndex === fi_r19 && !ctx_r1.selectionMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.selectionMode);
  }
}
function AdminCatalogComponent_ng_container_1_div_32_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 97)(1, "div", 98)(2, "span", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "button", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_div_32_div_1_Template_button_click_4_listener() {
      const gi_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r16).index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.removeGroup(gi_r17));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "div", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, AdminCatalogComponent_ng_container_1_div_32_div_1_div_7_Template, 4, 7, "div", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "div", 103)(9, "div", 104)(10, "label", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](11, "Prix (FCFA)");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "input", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function AdminCatalogComponent_ng_container_1_div_32_div_1_Template_input_ngModelChange_12_listener($event) {
      const group_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r16).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](group_r22.priceXAF, $event) || (group_r22.priceXAF = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "div", 104)(14, "label", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](15, "Stock");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "input", 107);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function AdminCatalogComponent_ng_container_1_div_32_div_1_Template_input_ngModelChange_16_listener($event) {
      const group_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r16).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](group_r22.stock, $event) || (group_r22.stock = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const group_r22 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("has-selection", ctx_r1.selectionMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](group_r22.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", group_r22.previews)("ngForTrackBy", ctx_r1.trackByIndex);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", group_r22.priceXAF);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", group_r22.stock);
  }
}
function AdminCatalogComponent_ng_container_1_div_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, AdminCatalogComponent_ng_container_1_div_32_div_1_Template, 17, 7, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r1.importGroups)("ngForTrackBy", ctx_r1.trackByIndex);
  }
}
function AdminCatalogComponent_ng_container_1_p_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "p", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r1.importError);
  }
}
function AdminCatalogComponent_ng_container_1_ng_container_38_ng_container_8_img_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "img", 124);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("src", ctx_r1.tryonModelPreview || ctx_r1.tryonModelUrl, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
  }
}
function AdminCatalogComponent_ng_container_1_ng_container_38_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 119)(2, "div", 120);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, AdminCatalogComponent_ng_container_1_ng_container_38_ng_container_8_img_3_Template, 1, 1, "img", 121);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "label", 122)(5, "input", 123);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function AdminCatalogComponent_ng_container_1_ng_container_38_ng_container_8_Template_input_change_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r24);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.onTryonModelPick($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.tryonModelPreview || ctx_r1.tryonModelUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("uploading", ctx_r1.tryonModelUploading);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r1.importing || ctx_r1.tryonModelUploading);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r1.tryonModelUploading ? "\u2026" : "\u270E", " ");
  }
}
function AdminCatalogComponent_ng_container_1_ng_container_38_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " \u26A0 Aucun mannequin \u2014 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "a", 126);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_ng_container_38_ng_template_9_Template_a_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r25);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.setAiTab("tryon"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "configurer dans Photos try-on");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
}
function AdminCatalogComponent_ng_container_1_ng_container_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "select", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function AdminCatalogComponent_ng_container_1_ng_container_38_Template_select_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r23);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx_r1.importTryonType, $event) || (ctx_r1.importTryonType = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "option", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "Robe");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "option", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "Haut");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "option", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7, "Bas");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](8, AdminCatalogComponent_ng_container_1_ng_container_38_ng_container_8_Template, 7, 5, "ng-container", 118)(9, AdminCatalogComponent_ng_container_1_ng_container_38_ng_template_9_Template, 4, 0, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const noModelWarning_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](10);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.importTryonType);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r1.importing);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.tryonModelUrl || ctx_r1.tryonModelUploading)("ngIfElse", noModelWarning_r26);
  }
}
function AdminCatalogComponent_ng_container_1_button_39_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("Importer ", ctx_r1.importGroups.length, " article(s)");
  }
}
function AdminCatalogComponent_ng_container_1_button_39_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Import en cours\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
}
function AdminCatalogComponent_ng_container_1_button_39_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"](" \u2728 Try-on ", ctx_r1.importTryonProgress.current, " / ", ctx_r1.importTryonProgress.total, "\u2026 ");
  }
}
function AdminCatalogComponent_ng_container_1_button_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "button", 127);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_button_39_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r27);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.importAll());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, AdminCatalogComponent_ng_container_1_button_39_ng_container_1_Template, 2, 1, "ng-container", 2)(2, AdminCatalogComponent_ng_container_1_button_39_ng_container_2_Template, 2, 0, "ng-container", 2)(3, AdminCatalogComponent_ng_container_1_button_39_ng_container_3_Template, 2, 2, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r1.importing);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r1.importing);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.importing && ctx_r1.importTryonProgress.total === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.importing && ctx_r1.importTryonProgress.total > 0);
  }
}
function AdminCatalogComponent_ng_container_1_div_45_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 135);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r1.itemsWithoutDescription.length);
  }
}
function AdminCatalogComponent_ng_container_1_div_45_div_9_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 142);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r1.bulkPriceError);
  }
}
function AdminCatalogComponent_ng_container_1_div_45_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 136)(1, "span", 137);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "Appliquer un prix unique \u00E0 toute la cat\u00E9gorie :");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "input", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function AdminCatalogComponent_ng_container_1_div_45_div_9_Template_input_ngModelChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r29);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx_r1.bulkPriceInput, $event) || (ctx_r1.bulkPriceInput = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("keyup.enter", function AdminCatalogComponent_ng_container_1_div_45_div_9_Template_input_keyup_enter_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r29);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.applyBulkPrice());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "span", 139);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "FCFA");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "button", 140);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_div_45_div_9_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r29);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.applyBulkPrice());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](8, AdminCatalogComponent_ng_container_1_div_45_div_9_span_8_Template, 2, 1, "span", 141);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("input-error", ctx_r1.bulkPriceError);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.bulkPriceInput);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r1.bulkPricing || !ctx_r1.bulkPriceInput);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r1.bulkPricing ? "\u2026" : "Appliquer \u00E0 tous", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.bulkPriceError);
  }
}
function AdminCatalogComponent_ng_container_1_div_45_div_10_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 142);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r1.bulkGenerateError);
  }
}
function AdminCatalogComponent_ng_container_1_div_45_div_10_span_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 148);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "\u2713 Termin\u00E9");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function AdminCatalogComponent_ng_container_1_div_45_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 143)(1, "span", 137)(2, "span", 144);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "button", 145);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_div_45_div_10_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r30);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.generateAllDescriptions());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "button", 146);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_div_45_div_10_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r30);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.clearAllDescriptions());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7, " \uD83D\uDDD1 Effacer les descriptions ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](8, AdminCatalogComponent_ng_container_1_div_45_div_10_span_8_Template, 2, 1, "span", 141)(9, AdminCatalogComponent_ng_container_1_div_45_div_10_span_9_Template, 2, 0, "span", 147);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"](" ", ctx_r1.itemsWithoutDescription.length, " article", ctx_r1.itemsWithoutDescription.length > 1 ? "s" : "", " sans description ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r1.bulkGenerating || ctx_r1.itemsWithoutDescription.length === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r1.bulkGenerating ? "\u2728 " + ctx_r1.bulkGenerateProgress.current + " / " + ctx_r1.bulkGenerateProgress.total + "\u2026" : "\u2728 G\u00E9n\u00E9rer les descriptions manquantes", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r1.bulkGenerating || ctx_r1.categoryItems.length === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.bulkGenerateError);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r1.bulkGenerating && ctx_r1.bulkGenerateProgress.total > 0 && ctx_r1.bulkGenerateProgress.current === ctx_r1.bulkGenerateProgress.total);
  }
}
function AdminCatalogComponent_ng_container_1_div_45_div_11_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 155)(1, "span", 156);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "\uD83D\uDC64");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "div", 157)(4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "Aucun mannequin configur\u00E9");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7, "Importez une photo de mannequin ci-dessous pour activer la g\u00E9n\u00E9ration try-on.");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "label", 158)(9, "input", 123);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function AdminCatalogComponent_ng_container_1_div_45_div_11_div_1_Template_input_change_9_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r32);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.onTryonModelPick($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](10, " + Importer un mannequin ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r1.isTryonRunning);
  }
}
function AdminCatalogComponent_ng_container_1_div_45_div_11_div_2_img_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "img", 168);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("src", ctx_r1.tryonModelPreview || ctx_r1.tryonModelUrl, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
  }
}
function AdminCatalogComponent_ng_container_1_div_45_div_11_div_2_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 169);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "\uD83D\uDC64");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function AdminCatalogComponent_ng_container_1_div_45_div_11_div_2_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 170);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function AdminCatalogComponent_ng_container_1_div_45_div_11_div_2_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Upload en cours\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
}
function AdminCatalogComponent_ng_container_1_div_45_div_11_div_2_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "\u2713 Enregistr\u00E9");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
}
function AdminCatalogComponent_ng_container_1_div_45_div_11_div_2_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Par d\u00E9faut");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
}
function AdminCatalogComponent_ng_container_1_div_45_div_11_div_2_span_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 171);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r1.tryonModelError);
  }
}
function AdminCatalogComponent_ng_container_1_div_45_div_11_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 159)(1, "div", 160);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, AdminCatalogComponent_ng_container_1_div_45_div_11_div_2_img_2_Template, 1, 1, "img", 161)(3, AdminCatalogComponent_ng_container_1_div_45_div_11_div_2_div_3_Template, 2, 0, "div", 162)(4, AdminCatalogComponent_ng_container_1_div_45_div_11_div_2_div_4_Template, 2, 0, "div", 163);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "div", 164)(6, "span", 165);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7, "Mannequin");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "span", 166);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](9, AdminCatalogComponent_ng_container_1_div_45_div_11_div_2_ng_container_9_Template, 2, 0, "ng-container", 2)(10, AdminCatalogComponent_ng_container_1_div_45_div_11_div_2_ng_container_10_Template, 2, 0, "ng-container", 2)(11, AdminCatalogComponent_ng_container_1_div_45_div_11_div_2_ng_container_11_Template, 2, 0, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "label", 158)(13, "input", 123);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function AdminCatalogComponent_ng_container_1_div_45_div_11_div_2_Template_input_change_13_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r33);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.onTryonModelPick($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](15, AdminCatalogComponent_ng_container_1_div_45_div_11_div_2_span_15_Template, 2, 1, "span", 167);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.tryonModelPreview || ctx_r1.tryonModelUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r1.tryonModelPreview && !ctx_r1.tryonModelUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.tryonModelUploading);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.tryonModelUploading);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r1.tryonModelUploading && ctx_r1.tryonModelUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r1.tryonModelUploading && !ctx_r1.tryonModelUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("uploading", ctx_r1.tryonModelUploading);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r1.isTryonRunning || ctx_r1.tryonModelUploading);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r1.tryonModelUploading ? "\u2026" : ctx_r1.tryonModelUrl ? "\u270E Changer" : "+ Ajouter", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.tryonModelError);
  }
}
function AdminCatalogComponent_ng_container_1_div_45_div_11_span_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 142);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r1.tryonError);
  }
}
function AdminCatalogComponent_ng_container_1_div_45_div_11_span_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 148);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "\u2713 Termin\u00E9");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function AdminCatalogComponent_ng_container_1_div_45_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 149);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, AdminCatalogComponent_ng_container_1_div_45_div_11_div_1_Template, 11, 1, "div", 150)(2, AdminCatalogComponent_ng_container_1_div_45_div_11_div_2_Template, 16, 11, "div", 151);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "div", 152)(4, "select", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function AdminCatalogComponent_ng_container_1_div_45_div_11_Template_select_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r31);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx_r1.tryonGarmentType, $event) || (ctx_r1.tryonGarmentType = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "option", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6, "Robe");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "option", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8, "Haut");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "option", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](10, "Bas");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "button", 153);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_div_45_div_11_Template_button_click_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r31);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.toggleSelectAllTryonItems());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "button", 154);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_div_45_div_11_Template_button_click_13_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r31);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.generateTryonBatch());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](15, AdminCatalogComponent_ng_container_1_div_45_div_11_span_15_Template, 2, 1, "span", 141)(16, AdminCatalogComponent_ng_container_1_div_45_div_11_span_16_Template, 2, 0, "span", 147);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r1.tryonModelUrl && !ctx_r1.tryonModelUploading);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.tryonModelUrl || ctx_r1.tryonModelUploading);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.tryonGarmentType);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r1.isTryonRunning);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r1.isTryonRunning || !ctx_r1.tryonModelUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r1.tryonSelectedCount === ctx_r1.categoryItems.length ? "Tout d\u00E9s\u00E9lectionner" : "Tout s\u00E9lectionner", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r1.isTryonRunning || ctx_r1.tryonSelectedCount === 0 || !ctx_r1.tryonModelUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r1.isTryonRunning ? "\u2728 " + ctx_r1.tryonProgress.current + " / " + ctx_r1.tryonProgress.total + "\u2026" : "\u2728 G\u00E9n\u00E9rer " + ctx_r1.tryonSelectedCount + " photo(s)", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.tryonError);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r1.isTryonRunning && ctx_r1.tryonProgress.total > 0 && ctx_r1.tryonProgress.current === ctx_r1.tryonProgress.total);
  }
}
function AdminCatalogComponent_ng_container_1_div_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 128)(1, "div", 129)(2, "a", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_div_45_Template_a_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r28);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.setAiTab("pricing"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, " Tarifs de cat\u00E9gorie ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "a", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_div_45_Template_a_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r28);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.setAiTab("descriptions"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, " Descriptions IA ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](6, AdminCatalogComponent_ng_container_1_div_45_span_6_Template, 2, 1, "span", 131);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "a", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_div_45_Template_a_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r28);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.setAiTab("tryon"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8, " Photos try-on ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](9, AdminCatalogComponent_ng_container_1_div_45_div_9_Template, 9, 6, "div", 132)(10, AdminCatalogComponent_ng_container_1_div_45_div_10_Template, 10, 7, "div", 133)(11, AdminCatalogComponent_ng_container_1_div_45_div_11_Template, 17, 10, "div", 134);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("ai-tab--active", ctx_r1.activeAiTab === "pricing");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("ai-tab--active", ctx_r1.activeAiTab === "descriptions");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.itemsWithoutDescription.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("ai-tab--active", ctx_r1.activeAiTab === "tryon");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.activeAiTab === "pricing");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.activeAiTab === "descriptions");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.activeAiTab === "tryon");
  }
}
function AdminCatalogComponent_ng_container_1_div_46_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " Aucun article. Importez des images ci-dessus. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_span_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 191);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "\u2728");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "span", 192);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "button", 193);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_ng_container_11_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r36);
      const item_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.startEdit(item_r35, "stock"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4, "\u270E");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const item_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("stock-zero", (ctx_r1.stockByRef[item_r35.reference] ?? item_r35.stock) === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r1.stockByRef[item_r35.reference] ?? item_r35.stock, " ");
  }
}
function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "input", 194);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_ng_container_12_Template_input_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r37);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx_r1.editing.value, $event) || (ctx_r1.editing.value = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("keyup.enter", function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_ng_container_12_Template_input_keyup_enter_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r37);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.saveEdit());
    })("keyup.escape", function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_ng_container_12_Template_input_keyup_escape_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r37);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.cancelEdit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "button", 195);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_ng_container_12_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r37);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.saveEdit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "button", 196);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_ng_container_12_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r37);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.cancelEdit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.editing.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r1.saving);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r1.saving ? "\u2026" : "OK", " ");
  }
}
function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_ng_container_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "span", 192);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "button", 197);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_ng_container_14_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r38);
      const item_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.startEdit(item_r35, "price"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4, "\u270E");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const item_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r1.formatPrice(item_r35.priceXAF));
  }
}
function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r39 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "input", 198);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_ng_container_15_Template_input_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r39);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx_r1.editing.value, $event) || (ctx_r1.editing.value = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("keyup.enter", function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_ng_container_15_Template_input_keyup_enter_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r39);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.saveEdit());
    })("keyup.escape", function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_ng_container_15_Template_input_keyup_escape_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r39);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.cancelEdit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "button", 195);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_ng_container_15_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r39);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.saveEdit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "button", 196);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_ng_container_15_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r39);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.cancelEdit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.editing.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r1.saving);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r1.saving ? "\u2026" : "OK", " ");
  }
}
function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_tr_26_p_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "p", 211);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r1.generateDescriptionError);
  }
}
function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_tr_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r40 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "tr", 199)(1, "td", 200)(2, "div", 201)(3, "div", 202)(4, "div", 203)(5, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6, "FR");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "textarea", 204);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_tr_26_Template_textarea_ngModelChange_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r40);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx_r1.editingDescription.fr, $event) || (ctx_r1.editingDescription.fr = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "div", 203)(9, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](10, "EN");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "textarea", 205);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_tr_26_Template_textarea_ngModelChange_11_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r40);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx_r1.editingDescription.en, $event) || (ctx_r1.editingDescription.en = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "div", 206);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](13, AdminCatalogComponent_ng_container_1_table_47_ng_container_14_tr_26_p_13_Template, 2, 1, "p", 207);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "button", 208);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_tr_26_Template_button_click_14_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r40);
      const item_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.generateDescription(item_r35));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "button", 209);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_tr_26_Template_button_click_16_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r40);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.saveDescription());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "button", 210);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_tr_26_Template_button_click_18_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r40);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.cancelDescriptionEdit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](19, "Annuler");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const item_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.editingDescription.fr);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.editingDescription.en);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.generateDescriptionError);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r1.generatingDescriptionForId === item_r35.id)("matTooltip", item_r35.descriptionFr ? "Reg\u00E9n\u00E9rer la description IA" : "G\u00E9n\u00E9rer une description IA");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r1.generatingDescriptionForId === item_r35.id ? "\u2026" : "\u2728 G\u00E9n\u00E9rer avec l'IA", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r1.savingDescription);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r1.savingDescription ? "\u2026" : "Sauvegarder", " ");
  }
}
function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "tr")(2, "td", 176)(3, "div", 177);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_Template_div_click_3_listener() {
      const item_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r34).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.tryonMode ? ctx_r1.toggleTryonItem(item_r35.id) : ctx_r1.openLightbox(item_r35.tryonUrl || item_r35.coverUrl));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "span", 178);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "\u2713");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](6, "img", 179);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, AdminCatalogComponent_ng_container_1_table_47_ng_container_14_span_7_Template, 2, 0, "span", 180);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "td", 181);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "td", 182);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](11, AdminCatalogComponent_ng_container_1_table_47_ng_container_14_ng_container_11_Template, 5, 3, "ng-container", 2)(12, AdminCatalogComponent_ng_container_1_table_47_ng_container_14_ng_container_12_Template, 6, 3, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "td", 183);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](14, AdminCatalogComponent_ng_container_1_table_47_ng_container_14_ng_container_14_Template, 5, 1, "ng-container", 2)(15, AdminCatalogComponent_ng_container_1_table_47_ng_container_14_ng_container_15_Template, 6, 3, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "td", 184)(17, "button", 185);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_Template_button_click_17_listener() {
      const item_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r34).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.toggleItemPublished(item_r35));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](19, "td", 186)(20, "button", 187);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_Template_button_click_20_listener($event) {
      const item_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r34).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      ctx_r1.toggleMobileRow(item_r35.id);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](22, "button", 188);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_Template_button_click_22_listener() {
      const item_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r34).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.deleteItem(item_r35));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](23, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](24, "button", 189);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_table_47_ng_container_14_Template_button_click_24_listener() {
      const item_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r34).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.toggleDescriptionEdit(item_r35));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](25, "T");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](26, AdminCatalogComponent_ng_container_1_table_47_ng_container_14_tr_26_Template, 20, 8, "tr", 190);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const item_r35 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("unpublished-row", !item_r35.published)("tryon-selected", ctx_r1.tryonSelectedIds.has(item_r35.id))("mobile-expanded", ctx_r1.mobileExpandedIds.has(item_r35.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("tryon-selectable", ctx_r1.tryonMode)("tryon-checked", ctx_r1.tryonSelectedIds.has(item_r35.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("has-tryon", !!item_r35.tryonUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("src", item_r35.tryonUrl || item_r35.coverUrl, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"])("alt", item_r35.reference);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", item_r35.tryonUrl && !ctx_r1.tryonMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](item_r35.reference);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", (ctx_r1.editing == null ? null : ctx_r1.editing.itemId) !== item_r35.id || (ctx_r1.editing == null ? null : ctx_r1.editing.field) !== "stock");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", (ctx_r1.editing == null ? null : ctx_r1.editing.itemId) === item_r35.id && (ctx_r1.editing == null ? null : ctx_r1.editing.field) === "stock");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", (ctx_r1.editing == null ? null : ctx_r1.editing.itemId) !== item_r35.id || (ctx_r1.editing == null ? null : ctx_r1.editing.field) !== "price");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", (ctx_r1.editing == null ? null : ctx_r1.editing.itemId) === item_r35.id && (ctx_r1.editing == null ? null : ctx_r1.editing.field) === "price");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("published", item_r35.published);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("matTooltip", item_r35.published ? "D\u00E9publier l'article" : "Publier l'article");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", item_r35.published ? "\u2713 Publi\u00E9" : "Brouillon", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵattribute"]("aria-expanded", ctx_r1.mobileExpandedIds.has(item_r35.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r1.mobileExpandedIds.has(item_r35.id) ? "\u22EF" : "\u22EE", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("active", (ctx_r1.editingDescription == null ? null : ctx_r1.editingDescription.itemId) === item_r35.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("matTooltip", (ctx_r1.editingDescription == null ? null : ctx_r1.editingDescription.itemId) === item_r35.id ? "Fermer la description" : item_r35.descriptionFr ? "Modifier la description" : "Saisir une description");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", (ctx_r1.editingDescription == null ? null : ctx_r1.editingDescription.itemId) === item_r35.id);
  }
}
function AdminCatalogComponent_ng_container_1_table_47_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "table", 172)(1, "thead")(2, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "th", 173);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "R\u00E9f\u00E9rence");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "th", 174);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7, "Stock");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "th", 174);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9, "Prix (FCFA)");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "th", 174);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](11, "Statut");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](12, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](14, AdminCatalogComponent_ng_container_1_table_47_ng_container_14_Template, 27, 30, "ng-container", 175);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r1.pagedItems)("ngForTrackBy", ctx_r1.trackById);
  }
}
function AdminCatalogComponent_ng_container_1_p_48_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "p", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r1.generateDescriptionError);
  }
}
function AdminCatalogComponent_ng_container_1_nav_49_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "button", 216);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_nav_49_button_3_Template_button_click_0_listener() {
      const p_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r42).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.goToPage(p_r43));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const p_r43 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("active", p_r43 === ctx_r1.currentPage);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](p_r43);
  }
}
function AdminCatalogComponent_ng_container_1_nav_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "nav", 212)(1, "button", 213);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_nav_49_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r41);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.goToPage(ctx_r1.currentPage - 1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "\u2039");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, AdminCatalogComponent_ng_container_1_nav_49_button_3_Template, 2, 3, "button", 214);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "button", 213);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_nav_49_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r41);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.goToPage(ctx_r1.currentPage + 1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "\u203A");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "span", 215);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r1.currentPage === 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r1.pages);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r1.currentPage === ctx_r1.totalPages);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate3"]("", (ctx_r1.currentPage - 1) * ctx_r1.pageSize + 1, "\u2013", ctx_r1.min(ctx_r1.currentPage * ctx_r1.pageSize, ctx_r1.categoryItems.length), " / ", ctx_r1.categoryItems.length);
  }
}
function AdminCatalogComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 38)(2, "button", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.backToList());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "\u2190 Retour");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "div", 40)(5, "h2", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "button", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_Template_button_click_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.toggleCategoryPublished(ctx_r1.selectedCategory));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "section", 43)(12, "div", 44)(13, "h3", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](14, "Description");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](15, AdminCatalogComponent_ng_container_1_button_15_Template, 2, 0, "button", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](16, AdminCatalogComponent_ng_container_1_ng_container_16_Template, 5, 4, "ng-container", 2)(17, AdminCatalogComponent_ng_container_1_ng_container_17_Template, 19, 13, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "section", 47)(19, "h3", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](20, "Importer des articles");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](21, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("dragover", function AdminCatalogComponent_ng_container_1_Template_div_dragover_21_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.onDragOver($event));
    })("dragleave", function AdminCatalogComponent_ng_container_1_Template_div_dragleave_21_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.onDragLeave());
    })("drop", function AdminCatalogComponent_ng_container_1_Template_div_drop_21_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.onDrop($event));
    })("click", function AdminCatalogComponent_ng_container_1_Template_div_click_21_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r6);
      const filePicker_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](23);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](filePicker_r9.click());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](22, "input", 49, 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function AdminCatalogComponent_ng_container_1_Template_input_change_22_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.onFilePick($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](24, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](25, "\uD83D\uDDBC");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](26, "span", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](27, "Glissez des images ici ou cliquez pour s\u00E9lectionner");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](28, "span", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](29, "PNG, JPEG, WebP \u2014 regroupement automatique par nom");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](30, AdminCatalogComponent_ng_container_1_div_30_Template, 5, 5, "div", 53)(31, AdminCatalogComponent_ng_container_1_div_31_Template, 10, 1, "div", 54)(32, AdminCatalogComponent_ng_container_1_div_32_Template, 2, 2, "div", 55)(33, AdminCatalogComponent_ng_container_1_p_33_Template, 2, 1, "p", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](34, "div", 57)(35, "button", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_Template_button_click_35_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.importWithTryon = !ctx_r1.importWithTryon);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](36, "span", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](37);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](38, AdminCatalogComponent_ng_container_1_ng_container_38_Template, 11, 4, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](39, AdminCatalogComponent_ng_container_1_button_39_Template, 4, 4, "button", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](40, "section", 61)(41, "h3", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](42, " Articles ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](43, "span", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](44);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](45, AdminCatalogComponent_ng_container_1_div_45_Template, 12, 10, "div", 63)(46, AdminCatalogComponent_ng_container_1_div_46_Template, 2, 0, "div", 7)(47, AdminCatalogComponent_ng_container_1_table_47_Template, 15, 2, "table", 64)(48, AdminCatalogComponent_ng_container_1_p_48_Template, 2, 1, "p", 56)(49, AdminCatalogComponent_ng_container_1_nav_49_Template, 8, 6, "nav", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r1.selectedCategory.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r1.selectedCategory.prefix);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("published", ctx_r1.selectedCategory.published);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r1.selectedCategory.published ? "\u2713 Publi\u00E9" : "Publier", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r1.editingDesc);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r1.editingDesc);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.editingDesc);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("drag-over", ctx_r1.dragOver);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.importGroups.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.pendingMerge);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.importGroups.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.importError);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("btn-tryon-toggle--on", ctx_r1.importWithTryon);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r1.importing);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r1.importWithTryon ? "\u2728 Try-on IA activ\u00E9" : "Try-on IA d\u00E9sactiv\u00E9", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.importWithTryon);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.importGroups.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("(", ctx_r1.categoryItems.length, ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.categoryItems.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.categoryItems.length === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.categoryItems.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.generateDescriptionError && !ctx_r1.editingDescription);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.totalPages > 1);
  }
}
function AdminCatalogComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r44 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 217);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_div_2_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r44);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.closeLightbox());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "img", 218);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_div_2_Template_img_click_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r44);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "button", 219);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AdminCatalogComponent_div_2_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r44);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.closeLightbox());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("src", ctx_r1.lightboxSrc, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
  }
}
// ── Helpers ───────────────────────────────────────────────────────────────────
/** Groupe les fichiers par item selon leur nom (ex: mask-1-cover.webp → "mask-1"). */
function groupByName(files) {
  const map = new Map();
  for (const f of files) {
    const noExt = f.name.replace(/\.[^.]+$/, '');
    const key = noExt.replace(/-cover$/i, '').replace(/-[a-eA-E]$/i, '');
    map.set(key, [...(map.get(key) ?? []), f]);
  }
  return Array.from(map.entries()).map(([key, grpFiles]) => ({
    key,
    files: grpFiles,
    previews: grpFiles.map(f => URL.createObjectURL(f)),
    coverIndex: Math.max(0, grpFiles.findIndex(f => /cover/i.test(f.name))),
    priceXAF: 0,
    stock: 1
  }));
}
// ── Component ─────────────────────────────────────────────────────────────────
class AdminCatalogComponent {
  get totalPages() {
    return Math.max(1, Math.ceil(this.categoryItems.length / this.pageSize));
  }
  get pagedItems() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.categoryItems.slice(start, start + this.pageSize);
  }
  get pages() {
    return Array.from({
      length: this.totalPages
    }, (_, i) => i + 1);
  }
  goToPage(page) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.cdr.markForCheck();
  }
  get itemsWithoutDescription() {
    return this.categoryItems.filter(item => !item.descriptionFr && !!item.coverUrl);
  }
  setAiTab(tab) {
    this.activeAiTab = tab;
    this.tryonMode = tab === 'tryon';
    if (tab !== 'tryon') {
      this.tryonSelectedIds.clear();
    }
    this.tryonSelectedIds.clear();
    this.tryonError = null;
    this.cdr.markForCheck();
  }
  get tryonSelectedCount() {
    return this.tryonSelectedIds.size;
  }
  constructor(store, repo, gemini, cdr, db, dialog, fns) {
    this.store = store;
    this.repo = repo;
    this.gemini = gemini;
    this.cdr = cdr;
    this.db = db;
    this.dialog = dialog;
    this.fns = fns;
    // ── State catégories
    this.categories = [];
    this.selectedCategory = null;
    this.categoryItems = [];
    // ── Quill config
    this.quillModules = {
      toolbar: [['bold', 'italic', 'underline'], [{
        list: 'ordered'
      }, {
        list: 'bullet'
      }], ['link'], ['clean']]
    };
    // ── Création catégorie
    this.showCreateForm = false;
    this.newPrefix = '';
    this.newTitle = '';
    this.newDescription = '';
    this.newDescriptionEn = '';
    this.descLang = 'fr';
    this.creating = false;
    this.createError = '';
    // ── Édition description catégorie
    this.editingDesc = false;
    this.editDescFr = '';
    this.editDescEn = '';
    this.editDescLang = 'fr';
    this.savingDesc = false;
    // ── Import images
    this.importGroups = [];
    this.importing = false;
    this.importError = '';
    this.importWithTryon = false;
    this.importTryonType = 'dresses';
    this.importTryonProgress = {
      current: 0,
      total: 0
    };
    this.dragOver = false;
    // ── Pagination articles
    this.pageSize = 10;
    this.currentPage = 1;
    // ── Édition inline items
    this.editing = null;
    this.saving = false;
    // ── Mise à jour prix en masse
    this.bulkPriceInput = null;
    this.bulkPricing = false;
    this.bulkPriceError = '';
    // ── Génération / édition description IA
    this.generatingDescriptionForId = null;
    this.generateDescriptionError = null;
    /** Panneau d'édition ouvert pour un article (null = fermé). */
    this.editingDescription = null;
    this.savingDescription = false;
    // ── Génération en masse
    this.bulkGenerating = false;
    this.bulkGenerateProgress = {
      current: 0,
      total: 0
    };
    this.bulkGenerateError = null;
    // ── Onglet IA actif
    this.activeAiTab = 'descriptions';
    // ── Virtual try-on (sélection + batch Replicate)
    this.tryonMode = false;
    this.tryonSelectedIds = new Set();
    this.tryonGarmentType = 'dresses';
    this.isTryonRunning = false;
    this.tryonProgress = {
      current: 0,
      total: 0
    };
    this.tryonError = null;
    // ── Modèle mannequin try-on
    this.tryonModelUrl = null;
    this.tryonModelPreview = null;
    this.tryonModelUploading = false;
    this.tryonModelError = null;
    // ── Lightbox
    this.lightboxSrc = null;
    /** Stock disponible réel : stock/$reference/available (décrémenté par les commandes) */
    this.stockByRef = {};
    this.subs = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subscription();
    // ── Expand mobile rows ────────────────────────────────────────────────────
    this.mobileExpandedIds = new Set();
    // ── Sélection pour regroupement ───────────────────────────────────────────
    this.selectionMode = false;
    this._selectedImages = new Set();
    /** Étape de confirmation : images candidates au regroupement */
    this.pendingMerge = null;
  }
  ngOnInit() {
    this.stockUnsubscribe = (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.onValue)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.ref)(this.db, 'stock'), snap => {
      const val = snap.val();
      const map = {};
      if (val) {
        Object.entries(val).forEach(([refKey, data]) => {
          map[refKey] = data?.available ?? 0;
        });
      }
      this.stockByRef = map;
      this.cdr.markForCheck();
    });
    (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.get)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.ref)(this.db, 'config/tryonModelUrl')).then(snap => {
      const url = snap.val();
      if (url) {
        this.tryonModelUrl = url;
        this.cdr.markForCheck();
      }
    });
    this.subs.add(this.store.select(_app_features_store_catalog_catalog_selectors__WEBPACK_IMPORTED_MODULE_4__.selectAllCategories).subscribe(cats => {
      this.categories = cats;
      if (this.selectedCategory) {
        const updated = cats.find(c => c.prefix === this.selectedCategory.prefix);
        if (updated) {
          this.selectedCategory = updated;
        } else {
          this.selectedCategory = null;
          this.categoryItems = [];
        }
      }
      this.cdr.markForCheck();
    }));
  }
  ngOnDestroy() {
    this.stockUnsubscribe?.();
    this.subs.unsubscribe();
    this.itemsSub?.unsubscribe();
    this.importGroups.forEach(g => g.previews.forEach(p => URL.revokeObjectURL(p)));
  }
  // ── Sélection catégorie ───────────────────────────────────────────────────
  selectCategory(cat) {
    this.selectedCategory = cat;
    this.importGroups = [];
    this.importError = '';
    this.editing = null;
    this.currentPage = 1;
    this.itemsSub?.unsubscribe();
    this.itemsSub = this.repo.watchAllItemsByCategory(cat.prefix).subscribe(items => {
      this.categoryItems = items;
      // Initialise stock/$ref/available pour les articles sans nœud stock
      this.repo.ensureStockNodes(items).catch(e => console.error('[catalog] ensureStockNodes', e));
      this.cdr.markForCheck();
    });
  }
  backToList() {
    this.selectedCategory = null;
    this.categoryItems = [];
    this.itemsSub?.unsubscribe();
  }
  // ── Création catégorie ────────────────────────────────────────────────────
  openCreateForm() {
    this.showCreateForm = true;
    this.newPrefix = '';
    this.newTitle = '';
    this.newDescription = '';
    this.newDescriptionEn = '';
    this.descLang = 'fr';
    this.createError = '';
  }
  cancelCreate() {
    this.showCreateForm = false;
  }
  /** Caractères valides pour un segment d'URI : lettres ASCII minuscules, chiffres, tirets. */
  static {
    this.URI_PATTERN = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;
  }
  /** Normalise la valeur saisie vers un préfixe URI-safe. */
  sanitizePrefix(value) {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // supprime les accents (é→e, à→a…)
    .toLowerCase().replace(/[^a-z0-9-]+/g, '-') // tout caractère invalide → tiret
    .replace(/-{2,}/g, '-') // tirets consécutifs → un seul
    .replace(/^-+|-+$/g, ''); // supprime les tirets en début/fin
  }
  onPrefixInput(event) {
    const input = event.target;
    const sanitized = this.sanitizePrefix(input.value);
    if (input.value !== sanitized) {
      this.newPrefix = sanitized;
      input.value = sanitized;
    }
  }
  submitCreateCategory() {
    var _this = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const prefix = _this.sanitizePrefix(_this.newPrefix.trim());
      const title = _this.newTitle.trim();
      if (!prefix) {
        _this.createError = 'Le préfixe est obligatoire.';
        _this.cdr.markForCheck();
        return;
      }
      if (!title) {
        _this.createError = 'Le titre est obligatoire.';
        _this.cdr.markForCheck();
        return;
      }
      if (!AdminCatalogComponent.URI_PATTERN.test(prefix)) {
        _this.createError = 'Le préfixe doit contenir uniquement des lettres (a-z), chiffres (0-9) et tirets, sans commencer ni finir par un tiret.';
        _this.cdr.markForCheck();
        return;
      }
      if (_this.categories.find(c => c.prefix === prefix)) {
        _this.createError = `Le préfixe "${prefix}" existe déjà.`;
        _this.cdr.markForCheck();
        return;
      }
      _this.creating = true;
      _this.createError = '';
      _this.cdr.markForCheck();
      try {
        const relatedCategories = _this.categories.filter(c => c.published).map(c => c.prefix);
        const description = (_this.newDescription ?? '').trim();
        const descriptionEn = (_this.newDescriptionEn ?? '').trim();
        yield _this.repo.createCategory(prefix, title, description, descriptionEn, relatedCategories);
        _this.showCreateForm = false;
        _this.newPrefix = '';
        _this.newTitle = '';
        _this.newDescription = '';
      } catch (e) {
        _this.createError = e?.message ?? 'Erreur lors de la création.';
      } finally {
        _this.creating = false;
        _this.cdr.detectChanges();
      }
    })();
  }
  // ── Édition description catégorie ────────────────────────────────────────
  openEditDesc(cat) {
    this.editDescFr = cat.description ?? '';
    this.editDescEn = cat.descriptionEn ?? '';
    this.editDescLang = 'fr';
    this.editingDesc = true;
  }
  cancelEditDesc() {
    this.editingDesc = false;
  }
  onDescChanged(lang, event) {
    if (lang === 'fr') this.editDescFr = event.html ?? '';else this.editDescEn = event.html ?? '';
    this.cdr.markForCheck();
  }
  onNewDescChanged(lang, event) {
    if (lang === 'fr') this.newDescription = event.html ?? '';else this.newDescriptionEn = event.html ?? '';
    this.cdr.markForCheck();
  }
  saveDesc() {
    var _this2 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this2.selectedCategory) return;
      _this2.savingDesc = true;
      _this2.cdr.markForCheck();
      try {
        yield _this2.repo.updateCategoryField(_this2.selectedCategory.prefix, 'description', (_this2.editDescFr ?? '').trim());
        yield _this2.repo.updateCategoryField(_this2.selectedCategory.prefix, 'descriptionEn', (_this2.editDescEn ?? '').trim());
        _this2.editingDesc = false;
      } catch (e) {
        console.error('[catalog] saveDesc', e);
      } finally {
        _this2.savingDesc = false;
        _this2.cdr.markForCheck();
      }
    })();
  }
  // ── Publier / Dépublier catégorie ─────────────────────────────────────────
  toggleCategoryPublished(cat) {
    var _this3 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        yield _this3.repo.updateCategoryField(cat.prefix, 'published', !cat.published);
      } catch (e) {
        console.error('[catalog] toggleCategoryPublished', e);
      }
    })();
  }
  // ── Supprimer catégorie ───────────────────────────────────────────────────
  deleteCategory(cat) {
    var _this4 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!confirm(`Supprimer la catégorie "${cat.title}" et tous ses articles ?`)) return;
      try {
        // Supprimer tous les items DB + leur Storage
        const snap = yield (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.get)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.query)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.ref)(_this4.db, 'catalog/items'), (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.orderByChild)('categoryId'), (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.equalTo)(cat.prefix)));
        const val = snap.val();
        if (val) {
          for (const [id] of Object.entries(val)) {
            yield _this4.repo.deleteStorageFolder(`catalog/${cat.prefix}/${id}`);
            yield _this4.repo.deleteItemFromDb(id);
          }
        }
        yield _this4.repo.deleteStorageFolder(`catalog/${cat.prefix}`);
        yield _this4.repo.deleteCategory(cat.prefix);
        if (_this4.selectedCategory?.prefix === cat.prefix) _this4.backToList();
      } catch (e) {
        console.error('[catalog] deleteCategory', e);
      }
    })();
  }
  // ── Import images ─────────────────────────────────────────────────────────
  onDragOver(e) {
    e.preventDefault();
    this.dragOver = true;
  }
  onDragLeave() {
    this.dragOver = false;
  }
  onDrop(e) {
    e.preventDefault();
    this.dragOver = false;
    const files = Array.from(e.dataTransfer?.files ?? []).filter(f => f.type.startsWith('image/'));
    this.addFiles(files);
  }
  onFilePick(e) {
    const files = Array.from(e.target.files ?? []).filter(f => f.type.startsWith('image/'));
    this.addFiles(files);
    e.target.value = '';
  }
  addFiles(files) {
    const newGroups = groupByName(files);
    this.importGroups = [...this.importGroups, ...newGroups];
    this.cdr.markForCheck();
  }
  removeGroup(index) {
    this.importGroups[index].previews.forEach(p => URL.revokeObjectURL(p));
    this.importGroups = this.importGroups.filter((_, i) => i !== index);
  }
  setCover(groupIndex, fileIndex) {
    this.importGroups[groupIndex].coverIndex = fileIndex;
  }
  importAll() {
    var _this5 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this5.selectedCategory || _this5.importGroups.length === 0) return;
      _this5.importing = true;
      _this5.importError = '';
      const categoryId = _this5.selectedCategory.prefix;
      try {
        let nextN = yield _this5.repo.getNextReferenceNumber(categoryId);
        const createdItemIds = [];
        for (const group of _this5.importGroups) {
          const itemRef = (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.push)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.ref)(_this5.db, 'catalog/items'));
          const itemId = itemRef.key;
          const reference = `${categoryId.toUpperCase()}-${nextN++}`;
          const basePath = `catalog/${categoryId}/${itemId}`;
          // Upload toutes les images du groupe
          const urls = [];
          for (let i = 0; i < group.files.length; i++) {
            const file = group.files[i];
            const ext = file.name.split('.').pop() ?? 'jpg';
            const path = `${basePath}/${i === group.coverIndex ? 'cover' : 'extra-' + i}.${ext}`;
            const url = yield _this5.repo.uploadFile(path, file);
            urls.push(url);
          }
          const coverUrl = urls[group.coverIndex] ?? urls[0];
          yield _this5.repo.createItemInDb(itemId, {
            categoryId,
            reference,
            priceXAF: group.priceXAF,
            stock: group.stock,
            published: false,
            createdAt: Date.now(),
            coverUrl,
            images: urls
          });
          // Initialise le stock disponible réel
          yield (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.set)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.ref)(_this5.db, `stock/${reference}/available`), group.stock);
          createdItemIds.push({
            itemId,
            coverUrl
          });
        }
        // Génération try-on IA optionnelle
        if (_this5.importWithTryon) {
          const callTryon = (0,_angular_fire_functions__WEBPACK_IMPORTED_MODULE_2__.httpsCallable)(_this5.fns, 'tryonVirtual');
          const createdItems = createdItemIds;
          _this5.importTryonProgress = {
            current: 0,
            total: createdItems.length
          };
          _this5.cdr.markForCheck();
          for (const {
            itemId,
            coverUrl
          } of createdItems) {
            try {
              yield callTryon({
                coverUrl,
                itemId,
                categoryId,
                garmentType: _this5.importTryonType,
                ...(_this5.tryonModelUrl ? {
                  modelImageUrl: _this5.tryonModelUrl
                } : {})
              });
            } catch {/* non bloquant */}
            _this5.importTryonProgress = {
              ..._this5.importTryonProgress,
              current: _this5.importTryonProgress.current + 1
            };
            _this5.cdr.markForCheck();
          }
        }
        // Nettoyer les groupes importés
        _this5.importGroups.forEach(g => g.previews.forEach(p => URL.revokeObjectURL(p)));
        _this5.importGroups = [];
        _this5.importTryonProgress = {
          current: 0,
          total: 0
        };
      } catch (e) {
        _this5.importError = e?.message ?? 'Erreur lors de l\'import.';
      } finally {
        _this5.importing = false;
        _this5.cdr.markForCheck();
      }
    })();
  }
  // ── Édition inline items ──────────────────────────────────────────────────
  startEdit(item, field) {
    this.editing = {
      itemId: item.id,
      field,
      value: field === 'stock' ? this.stockByRef[item.reference] ?? item.stock : item.priceXAF
    };
  }
  cancelEdit() {
    this.editing = null;
  }
  saveEdit() {
    var _this6 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this6.editing) return;
      _this6.saving = true;
      const {
        itemId,
        field,
        value
      } = _this6.editing;
      const dbField = field === 'price' ? 'priceXAF' : 'stock';
      const newValue = Math.max(0, Math.round(Number(value)));
      try {
        yield _this6.repo.updateItemField(itemId, dbField, newValue);
        // Synchronise aussi stock/$reference/available
        if (field === 'stock') {
          const item = _this6.categoryItems.find(i => i.id === itemId);
          if (item?.reference) {
            yield (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.set)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.ref)(_this6.db, `stock/${item.reference}/available`), newValue);
          }
        }
        _this6.editing = null;
      } catch (e) {
        console.error('[catalog] saveEdit', e);
      } finally {
        _this6.saving = false;
        _this6.cdr.markForCheck();
      }
    })();
  }
  applyBulkPrice() {
    var _this7 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const price = Math.round(Number(_this7.bulkPriceInput));
      if (!price || price <= 0) {
        _this7.bulkPriceError = 'Veuillez saisir un montant valide (> 0).';
        _this7.cdr.markForCheck();
        return;
      }
      if (!confirm(`Appliquer le prix ${price.toLocaleString('fr-FR')} FCFA à tous les ${_this7.categoryItems.length} articles de cette catégorie ?`)) return;
      _this7.bulkPricing = true;
      _this7.bulkPriceError = '';
      _this7.cdr.markForCheck();
      try {
        yield Promise.all(_this7.categoryItems.map(item => _this7.repo.updateItemField(item.id, 'priceXAF', price)));
        _this7.bulkPriceInput = null;
      } catch (e) {
        _this7.bulkPriceError = e?.message ?? 'Erreur lors de la mise à jour.';
      } finally {
        _this7.bulkPricing = false;
        _this7.cdr.markForCheck();
      }
    })();
  }
  toggleItemPublished(item) {
    var _this8 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        yield _this8.repo.updateItemField(item.id, 'published', !item.published);
      } catch (e) {
        console.error('[catalog] toggleItemPublished', e);
      }
    })();
  }
  deleteItem(item) {
    var _this9 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!confirm(`Supprimer l'article ${item.reference} ?`)) return;
      const categoryId = item.categoryId;
      try {
        yield _this9.repo.deleteStorageFolder(`catalog/${categoryId}/${item.id}`);
        yield _this9.repo.deleteItemFromDb(item.id);
      } catch (e) {
        console.error('[catalog] deleteItem', e);
      }
    })();
  }
  // ── Génération description IA ─────────────────────────────────────────────
  /**
   * Appelle Gemini Vision pour générer une description FR + EN à partir de
   * la photo de couverture de l'article, puis sauvegarde en Firebase.
   * Fonctionne sur un article déjà publié comme sur un brouillon.
   */
  generateDescription(item) {
    var _this0 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this0.generatingDescriptionForId) return;
      _this0.generatingDescriptionForId = item.id;
      _this0.generateDescriptionError = null;
      _this0.cdr.markForCheck();
      try {
        const categoryTitle = _this0.selectedCategory?.title ?? item.categoryId;
        const result = yield _this0.gemini.generateItemDescription(item.coverUrl, categoryTitle);
        _this0.editingDescription = {
          itemId: item.id,
          fr: result.fr,
          en: result.en
        };
        _this0.generateDescriptionError = null;
      } catch (e) {
        _this0.generateDescriptionError = e?.message ?? 'Erreur lors de la génération.';
      } finally {
        _this0.generatingDescriptionForId = null;
        _this0.cdr.markForCheck();
      }
    })();
  }
  toggleDescriptionEdit(item) {
    if (this.editingDescription?.itemId === item.id) {
      this.cancelDescriptionEdit();
    } else {
      this.editingDescription = {
        itemId: item.id,
        fr: item.descriptionFr ?? '',
        en: item.descriptionEn ?? ''
      };
      this.generateDescriptionError = null;
      this.cdr.markForCheck();
    }
  }
  saveDescription() {
    var _this1 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this1.editingDescription || _this1.savingDescription) return;
      _this1.savingDescription = true;
      _this1.cdr.markForCheck();
      try {
        yield _this1.repo.updateItemField(_this1.editingDescription.itemId, 'descriptionFr', _this1.editingDescription.fr.trim());
        yield _this1.repo.updateItemField(_this1.editingDescription.itemId, 'descriptionEn', _this1.editingDescription.en.trim());
        _this1.editingDescription = null;
        _this1.generateDescriptionError = null;
      } catch (e) {
        _this1.generateDescriptionError = e?.message ?? 'Erreur lors de la sauvegarde.';
      } finally {
        _this1.savingDescription = false;
        _this1.cdr.markForCheck();
      }
    })();
  }
  cancelDescriptionEdit() {
    this.editingDescription = null;
    this.generateDescriptionError = null;
    this.cdr.markForCheck();
  }
  clearAllDescriptions() {
    var _this10 = this;
    const total = this.categoryItems.filter(i => i.descriptionFr || i.descriptionEn).length;
    if (total === 0) return;
    const dialogRef = this.dialog.open(_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_5__.ConfirmDialogComponent, {
      width: '420px',
      data: {
        title: 'Effacer toutes les descriptions',
        message: `⚠️ Confirmer la suppression des descriptions de ${total} article(s) de cette catégorie ? Cette action est irréversible.`,
        confirmLabel: 'Effacer',
        cancelLabel: 'Annuler'
      }
    });
    dialogRef.afterClosed().subscribe(/*#__PURE__*/function () {
      var _ref = (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (confirmed) {
        if (!confirmed) return;
        yield Promise.all(_this10.categoryItems.filter(i => i.descriptionFr || i.descriptionEn).map(i => Promise.all([_this10.repo.updateItemField(i.id, 'descriptionFr', ''), _this10.repo.updateItemField(i.id, 'descriptionEn', '')])));
        _this10.bulkGenerateProgress = {
          current: 0,
          total: 0
        };
        _this10.bulkGenerateError = null;
        _this10.cdr.markForCheck();
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }
  generateAllDescriptions() {
    var _this11 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this11.bulkGenerating) return;
      const items = _this11.itemsWithoutDescription;
      if (items.length === 0) return;
      _this11.bulkGenerating = true;
      _this11.bulkGenerateProgress = {
        current: 0,
        total: items.length
      };
      _this11.bulkGenerateError = null;
      _this11.cdr.markForCheck();
      const categoryTitle = _this11.selectedCategory?.title ?? '';
      for (const item of items) {
        try {
          const result = yield _this11.gemini.generateItemDescription(item.coverUrl, categoryTitle);
          yield _this11.repo.updateItemField(item.id, 'descriptionFr', result.fr);
          yield _this11.repo.updateItemField(item.id, 'descriptionEn', result.en);
        } catch (e) {
          _this11.bulkGenerateError = `Erreur sur ${item.reference} : ${e?.message ?? 'inconnue'}`;
        }
        _this11.bulkGenerateProgress = {
          ..._this11.bulkGenerateProgress,
          current: _this11.bulkGenerateProgress.current + 1
        };
        _this11.cdr.markForCheck();
        // Délai entre requêtes pour respecter les rate limits Gemini
        yield new Promise(resolve => setTimeout(resolve, 1500));
      }
      _this11.bulkGenerating = false;
      _this11.cdr.markForCheck();
    })();
  }
  toggleMobileRow(id) {
    if (this.mobileExpandedIds.has(id)) {
      this.mobileExpandedIds.delete(id);
      if (this.editingDescription?.itemId === id) {
        this.cancelDescriptionEdit();
      }
    } else {
      this.mobileExpandedIds.add(id);
    }
    this.cdr.markForCheck();
  }
  // ── Lightbox ──────────────────────────────────────────────────────────────
  openLightbox(src) {
    this.lightboxSrc = src;
  }
  closeLightbox() {
    this.lightboxSrc = null;
  }
  get selectedCount() {
    return this._selectedImages.size;
  }
  toggleSelectionMode() {
    this.selectionMode = !this.selectionMode;
    this._selectedImages.clear();
    this.pendingMerge = null;
    this.cdr.markForCheck();
  }
  imageKey(gi, fi) {
    return `${gi}-${fi}`;
  }
  isImageSelected(gi, fi) {
    return this._selectedImages.has(this.imageKey(gi, fi));
  }
  toggleImageSelection(gi, fi, event) {
    event.stopPropagation();
    const key = this.imageKey(gi, fi);
    if (this._selectedImages.has(key)) {
      this._selectedImages.delete(key);
    } else {
      this._selectedImages.add(key);
    }
    this.cdr.markForCheck();
  }
  /** Étape 1 : affiche le panneau de choix de couverture. */
  prepareMerge() {
    if (this._selectedImages.size === 0) return;
    const selected = Array.from(this._selectedImages).map(key => {
      const [gi, fi] = key.split('-').map(Number);
      return {
        gi,
        fi
      };
    });
    const newFiles = selected.map(({
      gi,
      fi
    }) => this.importGroups[gi].files[fi]);
    const newPreviews = selected.map(({
      gi,
      fi
    }) => this.importGroups[gi].previews[fi]);
    this.pendingMerge = {
      files: newFiles,
      previews: newPreviews,
      coverIndex: 0
    };
    this.cdr.markForCheck();
  }
  /** Étape 2 : confirme le regroupement avec la couverture choisie. */
  confirmMerge() {
    if (!this.pendingMerge) return;
    const selected = Array.from(this._selectedImages).map(key => {
      const [gi, fi] = key.split('-').map(Number);
      return {
        gi,
        fi
      };
    });
    const firstPrice = this.importGroups[selected[0].gi].priceXAF;
    const firstStock = this.importGroups[selected[0].gi].stock;
    const groupsCopy = this.importGroups.map(g => ({
      ...g,
      files: [...g.files],
      previews: [...g.previews],
      coverIndex: g.coverIndex
    }));
    const byGroup = new Map();
    selected.forEach(({
      gi,
      fi
    }) => {
      const arr = byGroup.get(gi) ?? [];
      arr.push(fi);
      byGroup.set(gi, arr);
    });
    byGroup.forEach((fis, gi) => {
      fis.sort((a, b) => b - a);
      fis.forEach(fi => {
        if (groupsCopy[gi].coverIndex > fi) {
          groupsCopy[gi].coverIndex = Math.max(0, groupsCopy[gi].coverIndex - 1);
        } else if (groupsCopy[gi].coverIndex === fi) {
          groupsCopy[gi].coverIndex = 0;
        }
        groupsCopy[gi].files.splice(fi, 1);
        groupsCopy[gi].previews.splice(fi, 1);
      });
    });
    const filtered = groupsCopy.filter(g => g.files.length > 0);
    const newGroup = {
      key: `groupe-${Date.now()}`,
      files: this.pendingMerge.files,
      previews: this.pendingMerge.previews,
      coverIndex: this.pendingMerge.coverIndex,
      priceXAF: firstPrice,
      stock: firstStock
    };
    this.importGroups = [...filtered, newGroup];
    this._selectedImages.clear();
    this.pendingMerge = null;
    this.selectionMode = false;
    this.cdr.markForCheck();
  }
  // ── Virtual try-on ────────────────────────────────────────────────────────
  toggleTryonMode() {
    this.tryonMode = !this.tryonMode;
    this.tryonSelectedIds.clear();
    this.tryonError = null;
    this.cdr.detectChanges();
  }
  toggleTryonItem(itemId) {
    if (this.tryonSelectedIds.has(itemId)) {
      this.tryonSelectedIds.delete(itemId);
    } else {
      this.tryonSelectedIds.add(itemId);
    }
    this.cdr.markForCheck();
  }
  selectAllTryonItems() {
    this.categoryItems.forEach(i => this.tryonSelectedIds.add(i.id));
    this.cdr.markForCheck();
  }
  toggleSelectAllTryonItems() {
    if (this.tryonSelectedCount === this.categoryItems.length) {
      this.tryonSelectedIds.clear();
    } else {
      this.categoryItems.forEach(i => this.tryonSelectedIds.add(i.id));
    }
    this.cdr.markForCheck();
  }
  generateTryonBatch() {
    var _this12 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this12.isTryonRunning || _this12.tryonSelectedIds.size === 0 || !_this12.selectedCategory) return;
      const items = _this12.categoryItems.filter(i => _this12.tryonSelectedIds.has(i.id));
      _this12.isTryonRunning = true;
      _this12.tryonProgress = {
        current: 0,
        total: items.length
      };
      _this12.tryonError = null;
      _this12.cdr.markForCheck();
      const callTryon = (0,_angular_fire_functions__WEBPACK_IMPORTED_MODULE_2__.httpsCallable)(_this12.fns, 'tryonVirtual');
      for (const item of items) {
        try {
          yield callTryon({
            coverUrl: item.coverUrl,
            itemId: item.id,
            categoryId: _this12.selectedCategory.prefix,
            garmentType: _this12.tryonGarmentType,
            ...(_this12.tryonModelUrl ? {
              modelImageUrl: _this12.tryonModelUrl
            } : {})
          });
        } catch (err) {
          _this12.tryonError = `Erreur sur ${item.reference} : ${err?.message ?? 'inconnue'}`;
          _this12.cdr.markForCheck();
        }
        _this12.tryonProgress = {
          ..._this12.tryonProgress,
          current: _this12.tryonProgress.current + 1
        };
        _this12.cdr.markForCheck();
      }
      _this12.isTryonRunning = false;
      _this12.tryonSelectedIds.clear();
      _this12.cdr.markForCheck();
    })();
  }
  onTryonModelPick(event) {
    var _this13 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const file = event.target.files?.[0];
      if (!file) return;
      console.log('[tryonModel] Fichier sélectionné :', file.name, file.type, file.size, 'bytes');
      if (_this13.tryonModelPreview) URL.revokeObjectURL(_this13.tryonModelPreview);
      _this13.tryonModelPreview = URL.createObjectURL(file);
      _this13.tryonModelUploading = true;
      _this13.tryonModelError = null;
      _this13.cdr.markForCheck();
      try {
        const storagePath = 'config/tryon-model.jpg';
        console.log('[tryonModel] Upload Storage → path:', storagePath);
        const url = yield _this13.repo.uploadFile(storagePath, file);
        console.log('[tryonModel] Upload OK → URL:', url);
        console.log('[tryonModel] Écriture DB → config/tryonModelUrl');
        yield (0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.set)((0,_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.ref)(_this13.db, 'config/tryonModelUrl'), url);
        console.log('[tryonModel] DB OK');
        _this13.tryonModelUrl = url;
      } catch (err) {
        console.error('[tryonModel] ERREUR :', err?.code, err?.message, err);
        _this13.tryonModelError = `Erreur upload : ${err?.message ?? 'inconnue'}`;
      } finally {
        _this13.tryonModelUploading = false;
        _this13.cdr.markForCheck();
      }
    })();
  }
  // ── Helpers template ──────────────────────────────────────────────────────
  formatPrice(xaf) {
    return xaf > 0 ? xaf.toLocaleString('fr-FR') + ' FCFA' : '—';
  }
  min(a, b) {
    return Math.min(a, b);
  }
  trackByPrefix(_, cat) {
    return cat.prefix;
  }
  trackById(_, item) {
    return item.id;
  }
  trackByIndex(i) {
    return i;
  }
  static {
    this.ɵfac = function AdminCatalogComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AdminCatalogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_9__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_app_core_firebase_catalog_repository__WEBPACK_IMPORTED_MODULE_10__.CatalogRepository), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_app_core_firebase_gemini_ai_service__WEBPACK_IMPORTED_MODULE_11__.GeminiAiService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.Database), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_fire_functions__WEBPACK_IMPORTED_MODULE_2__.Functions));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
      type: AdminCatalogComponent,
      selectors: [["app-admin-catalog"]],
      standalone: false,
      decls: 3,
      vars: 3,
      consts: [["filePicker", ""], ["noModelWarning", ""], [4, "ngIf"], ["class", "lightbox-overlay", 3, "click", 4, "ngIf"], [1, "catalog-toolbar"], [1, "btn-catalog-new", 3, "click"], ["class", "create-form-card", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [1, "category-list"], ["class", "category-card", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "create-form-card"], [1, "form-title"], [1, "form-field"], [1, "form-label"], [1, "required"], [1, "hint"], ["type", "text", "placeholder", "ex : bijoux", "pattern", "[a-z0-9]([a-z0-9-]*[a-z0-9])?", "autocomplete", "off", 1, "form-input", 3, "ngModelChange", "input", "ngModel"], ["type", "text", "placeholder", "ex : Masques africains", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "optional"], [1, "lang-tabs"], ["type", "button", 1, "lang-tab", 3, "click"], ["format", "html", "placeholder", "Description en fran\u00E7ais\u2026", 1, "quill-desc", 3, "onContentChanged", "hidden", "ngModel", "modules"], ["format", "html", "placeholder", "Description in English\u2026", 1, "quill-desc", 3, "onContentChanged", "hidden", "ngModel", "modules"], ["class", "form-error", 4, "ngIf"], [1, "form-actions"], [1, "btn-save", 3, "click", "disabled"], [1, "btn-cancel", 3, "click"], [1, "form-error"], [1, "empty-state"], [1, "category-card"], [1, "category-card-header"], [1, "category-meta"], [1, "category-title"], [1, "category-prefix"], [1, "category-actions"], [1, "btn-publish", 3, "click"], [1, "btn-view", 3, "click"], [1, "btn-delete-cat", 3, "click"], [1, "detail-header"], [1, "btn-back", 3, "click"], [1, "detail-title-block"], [1, "detail-title"], [1, "detail-prefix"], [1, "desc-section"], [1, "desc-header"], [1, "section-title"], ["class", "btn-field-edit", 3, "click", 4, "ngIf"], [1, "import-section"], [1, "drop-zone", 3, "dragover", "dragleave", "drop", "click"], ["type", "file", "multiple", "", "accept", "image/*", 2, "display", "none", 3, "change"], [1, "drop-icon"], [1, "drop-text"], [1, "drop-hint"], ["class", "group-toolbar", 4, "ngIf"], ["class", "merge-cover-panel", 4, "ngIf"], ["class", "import-groups", 4, "ngIf"], ["class", "import-error", 4, "ngIf"], [1, "import-tryon-option"], [1, "btn-tryon-toggle", 3, "click", "disabled"], [1, "btn-tryon-toggle__dot"], ["class", "btn-import", 3, "disabled", "click", 4, "ngIf"], [1, "items-section"], [1, "items-count"], ["class", "ai-tabs-container", 4, "ngIf"], ["class", "items-table", 4, "ngIf"], ["class", "pagination-bar", 4, "ngIf"], [1, "btn-field-edit", 3, "click"], ["class", "desc-preview", 3, "innerHTML", 4, "ngIf"], ["class", "desc-empty", 4, "ngIf"], ["class", "desc-preview desc-en", 3, "innerHTML", 4, "ngIf"], [1, "desc-preview", 3, "innerHTML"], [1, "desc-empty"], [1, "desc-preview", "desc-en", 3, "innerHTML"], [1, "desc-edit-layout"], [1, "desc-edit-editor"], [1, "desc-edit-preview"], [1, "desc-preview-label"], [1, "desc-preview-content", 3, "innerHTML"], [1, "form-actions", 2, "margin-top", "8px"], [1, "group-toolbar"], [1, "btn-selection-mode", 3, "click"], ["class", "btn-merge", 3, "click", 4, "ngIf"], ["class", "selection-hint", 4, "ngIf"], [1, "btn-merge", 3, "click"], [1, "selection-hint"], [1, "merge-cover-panel"], [1, "merge-cover-title"], [1, "merge-cover-images"], ["class", "merge-cover-img-wrap", 3, "is-cover", "click", 4, "ngFor", "ngForOf"], [1, "merge-cover-actions"], [1, "btn-save", 3, "click"], [1, "merge-cover-img-wrap", 3, "click"], [1, "merge-cover-thumb", 3, "src"], ["class", "cover-badge", 4, "ngIf"], [1, "cover-badge"], [1, "import-groups"], ["class", "import-group-card", 3, "has-selection", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "import-group-card"], [1, "group-header"], [1, "group-key"], [1, "btn-remove-group", 3, "click"], [1, "group-images"], ["class", "group-img-wrap", 3, "is-cover", "is-selected", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "group-fields"], [1, "group-field"], [1, "group-label"], ["type", "number", "min", "0", 1, "group-input", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", 1, "group-input", "group-input-sm", 3, "ngModelChange", "ngModel"], [1, "group-img-wrap", 3, "click"], [1, "group-thumb", 3, "src"], ["class", "select-checkbox", 4, "ngIf"], [1, "select-checkbox"], [1, "checkbox-inner"], [1, "import-error"], [1, "tryon-type-select", 3, "ngModelChange", "ngModel", "disabled"], ["value", "dresses"], ["value", "upperbody"], ["value", "lowerbody"], [4, "ngIf", "ngIfElse"], ["matTooltip", "Mannequin utilis\u00E9 pour le try-on", 1, "import-model-preview"], [1, "import-model-thumb"], ["alt", "Mannequin", 3, "src", 4, "ngIf"], ["title", "Changer le mannequin", 1, "import-model-change"], ["type", "file", "accept", "image/*", 2, "display", "none", 3, "change", "disabled"], ["alt", "Mannequin", 3, "src"], [1, "import-no-model-warning"], [1, "import-no-model-link", 3, "click"], [1, "btn-import", 3, "click", "disabled"], [1, "ai-tabs-container"], [1, "ai-tabs-bar"], [1, "ai-tab", 3, "click"], ["class", "ai-tab-badge", 4, "ngIf"], ["class", "ai-tab-panel bulk-price-bar", 4, "ngIf"], ["class", "ai-tab-panel bulk-ai-bar", 4, "ngIf"], ["class", "ai-tab-panel tryon-panel", 4, "ngIf"], [1, "ai-tab-badge"], [1, "ai-tab-panel", "bulk-price-bar"], [1, "bulk-price-label"], ["type", "number", "min", "1", "step", "100", "placeholder", "ex : 15000", 1, "bulk-price-input", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "bulk-price-unit"], [1, "btn-bulk-price", 3, "click", "disabled"], ["class", "field-error", 4, "ngIf"], [1, "field-error"], [1, "ai-tab-panel", "bulk-ai-bar"], [1, "bulk-ai-count"], ["matTooltip", "G\u00E9n\u00E8re les descriptions manquantes de cette cat\u00E9gorie, un article \u00E0 la fois", 1, "btn-bulk-ai", 3, "click", "disabled"], ["matTooltip", "Efface toutes les descriptions de cette cat\u00E9gorie (confirmation requise)", 1, "btn-bulk-clear", 3, "click", "disabled"], ["class", "bulk-ai-done", 4, "ngIf"], [1, "bulk-ai-done"], [1, "ai-tab-panel", "tryon-panel"], ["class", "tryon-no-model-alert", 4, "ngIf"], ["class", "tryon-avatar-section", 4, "ngIf"], [1, "tryon-controls"], [1, "btn-tryon-all", 3, "click", "disabled"], [1, "btn-bulk-tryon", 3, "click", "disabled"], [1, "tryon-no-model-alert"], [1, "tryon-no-model-icon"], [1, "tryon-no-model-text"], [1, "btn-tryon-avatar-change"], [1, "tryon-avatar-section"], [1, "tryon-avatar-wrap"], ["class", "tryon-avatar-img", "alt", "Mannequin", 3, "src", 4, "ngIf"], ["class", "tryon-avatar-empty", 4, "ngIf"], ["class", "tryon-avatar-overlay", 4, "ngIf"], [1, "tryon-avatar-info"], [1, "tryon-avatar-label"], [1, "tryon-avatar-status"], ["class", "field-error mt-1", 4, "ngIf"], ["alt", "Mannequin", 1, "tryon-avatar-img", 3, "src"], [1, "tryon-avatar-empty"], [1, "tryon-avatar-overlay"], [1, "field-error", "mt-1"], [1, "items-table"], [2, "width", "56px"], [1, "text-center"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "img-cell"], [1, "thumb-wrapper", 3, "click"], [1, "tryon-check-mark"], [1, "item-thumb", 3, "src", "alt"], ["class", "tryon-badge", "title", "Photo try-on disponible", 4, "ngIf"], ["data-label", "R\u00E9f\u00E9rence", 1, "ref-cell"], ["data-label", "Stock", 1, "text-center"], ["data-label", "Prix", 1, "text-center"], ["data-label", "Statut", 1, "text-center"], [1, "btn-publish-item", 3, "click", "matTooltip"], [1, "actions-cell"], [1, "btn-mobile-expand", 3, "click"], ["matTooltip", "Supprimer l'article", 1, "btn-delete-item", 3, "click"], [1, "btn-text-edit", 3, "click", "matTooltip"], ["class", "desc-edit-row", 4, "ngIf"], ["title", "Photo try-on disponible", 1, "tryon-badge"], [1, "field-value"], ["matTooltip", "Modifier le stock", 1, "btn-field-edit", 3, "click"], ["type", "number", "min", "0", 1, "field-input", 3, "ngModelChange", "keyup.enter", "keyup.escape", "ngModel"], ["matTooltip", "Enregistrer", 1, "btn-field-save", 3, "click", "disabled"], ["matTooltip", "Annuler", 1, "btn-field-cancel", 3, "click"], ["matTooltip", "Modifier le prix", 1, "btn-field-edit", "btn-price-edit", 3, "click"], ["type", "number", "min", "0", 1, "field-input", "field-input-lg", 3, "ngModelChange", "keyup.enter", "keyup.escape", "ngModel"], [1, "desc-edit-row"], ["colspan", "6"], [1, "desc-edit-panel"], [1, "desc-edit-panel__fields"], [1, "desc-edit-panel__field"], ["rows", "3", "placeholder", "Description en fran\u00E7ais\u2026", 3, "ngModelChange", "ngModel"], ["rows", "3", "placeholder", "Description in English\u2026", 3, "ngModelChange", "ngModel"], [1, "desc-edit-panel__actions"], ["class", "import-error mb-0", 4, "ngIf"], [1, "btn-ai-desc", 3, "click", "disabled", "matTooltip"], ["matTooltip", "Sauvegarder la description", 1, "btn-field-save", 3, "click", "disabled"], ["matTooltip", "Fermer sans sauvegarder", 1, "btn-field-cancel", 3, "click"], [1, "import-error", "mb-0"], [1, "pagination-bar"], [1, "page-btn", 3, "click", "disabled"], ["class", "page-btn", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "page-info"], [1, "page-btn", 3, "click"], [1, "lightbox-overlay", 3, "click"], [1, "lightbox-img", 3, "click", "src"], [1, "lightbox-close", 3, "click"]],
      template: function AdminCatalogComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](0, AdminCatalogComponent_ng_container_0_Template, 8, 4, "ng-container", 2)(1, AdminCatalogComponent_ng_container_1_Template, 50, 26, "ng-container", 2)(2, AdminCatalogComponent_div_2_Template, 4, 1, "div", 3);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx.selectedCategory);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.selectedCategory);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.lightboxSrc);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_14__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_14__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.PatternValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgModel, ngx_quill__WEBPACK_IMPORTED_MODULE_15__.QuillEditorComponent, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_16__.MatTooltip],
      styles: [".ai-tabs-container[_ngcontent-%COMP%] {\n  margin-bottom: 14px;\n}\n\n.ai-tabs-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 2px;\n  border-bottom: 2px solid #ecf0f1;\n  margin-bottom: 0;\n}\n\n.ai-tab[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 16px;\n  border: none;\n  background: transparent;\n  color: #7f8c8d;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  border-bottom: 2px solid transparent;\n  margin-bottom: -2px;\n  border-radius: 4px 4px 0 0;\n  transition: color 0.15s, background 0.15s;\n  text-decoration: none;\n}\n.ai-tab[_ngcontent-%COMP%]:hover:not(.ai-tab--active) {\n  color: #2c3e50;\n  background: #ecf0f1;\n}\n.ai-tab--active[_ngcontent-%COMP%] {\n  color: #148f77;\n  border-bottom-color: #148f77;\n  background: #f0faf8;\n}\n\n.ai-tab-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 18px;\n  height: 18px;\n  padding: 0 5px;\n  border-radius: 9px;\n  background: #8e44ad;\n  color: #fff;\n  font-size: 11px;\n  font-weight: 700;\n  line-height: 1;\n}\n\n.ai-tab-panel[_ngcontent-%COMP%] {\n  border-radius: 0 0 5px 5px;\n  margin-bottom: 0;\n}\n\n.bulk-ai-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 10px;\n  padding: 10px 14px;\n  background: #f8f9fa;\n  border: 1px solid #ecf0f1;\n  border-left: 3px solid #148f77;\n  border-radius: 5px;\n}\n.bulk-ai-bar[_ngcontent-%COMP%]   .bulk-ai-count[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2c3e50;\n}\n.bulk-ai-bar[_ngcontent-%COMP%]   .bulk-ai-done[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #148f77;\n  font-weight: 600;\n}\n\n.btn-bulk-clear[_ngcontent-%COMP%] {\n  padding: 6px 14px;\n  border: 1px solid #c0392b;\n  border-radius: 5px;\n  background: transparent;\n  color: #c0392b;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.15s, color 0.15s;\n}\n.btn-bulk-clear[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #c0392b;\n  color: #fff;\n}\n.btn-bulk-clear[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n\n.btn-bulk-ai[_ngcontent-%COMP%] {\n  padding: 6px 14px;\n  border: 1px solid #148f77;\n  border-radius: 5px;\n  background: transparent;\n  color: #148f77;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.15s, color 0.15s;\n}\n.btn-bulk-ai[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #148f77;\n  color: #fff;\n}\n.btn-bulk-ai[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: default;\n}\n\n.bulk-tryon-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 10px;\n  padding: 10px 14px;\n  background: #f0faf8;\n  border: 1px solid #a8d8d0;\n  border-left: 3px solid #148f77;\n  border-radius: 5px;\n}\n\n.tryon-type-select[_ngcontent-%COMP%] {\n  padding: 5px 8px;\n  border: 1px solid #b2bec3;\n  border-radius: 5px;\n  font-size: 13px;\n  background: #fff;\n  cursor: pointer;\n}\n.tryon-type-select[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n\n.btn-tryon-mode[_ngcontent-%COMP%] {\n  padding: 6px 14px;\n  border: 1px solid #148f77;\n  border-radius: 5px;\n  background: transparent;\n  color: #148f77;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.15s, color 0.15s;\n}\n.btn-tryon-mode.active[_ngcontent-%COMP%] {\n  background: #fdecea;\n  border-color: #e74c3c;\n  color: #e74c3c;\n}\n.btn-tryon-mode[_ngcontent-%COMP%]:hover:not(:disabled):not(.active) {\n  background: #148f77;\n  color: #fff;\n}\n.btn-tryon-mode[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n\n.btn-tryon-all[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border: 1px solid #b2bec3;\n  border-radius: 5px;\n  background: #fff;\n  color: #2c3e50;\n  font-size: 12px;\n  cursor: pointer;\n}\n.btn-tryon-all[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: #148f77;\n  color: #148f77;\n}\n.btn-tryon-all[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n\n.btn-bulk-tryon[_ngcontent-%COMP%] {\n  padding: 6px 14px;\n  border: 1px solid #148f77;\n  border-radius: 5px;\n  background: transparent;\n  color: #148f77;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.15s, color 0.15s;\n}\n.btn-bulk-tryon[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #148f77;\n  color: #fff;\n}\n.btn-bulk-tryon[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: default;\n}\n\n.tryon-panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  padding: 12px 14px;\n  background: #f8f9fa;\n  border: 1px solid #ecf0f1;\n  border-left: 3px solid #148f77;\n  border-radius: 0 0 5px 5px;\n}\n\n.tryon-no-model-alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 14px;\n  background: #fff8e1;\n  border: 1px solid #ffe082;\n  border-left: 3px solid #f9a825;\n  border-radius: 5px;\n  flex-wrap: wrap;\n}\n\n.tryon-no-model-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  flex-shrink: 0;\n}\n\n.tryon-no-model-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  font-size: 13px;\n  flex: 1;\n}\n.tryon-no-model-text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #2c3e50;\n}\n.tryon-no-model-text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #7f8c8d;\n}\n\n.import-no-model-warning[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #7b4f12;\n  background: #fff8e1;\n  border: 1px solid #ffe082;\n  border-radius: 5px;\n  padding: 4px 10px;\n}\n\n.import-no-model-link[_ngcontent-%COMP%] {\n  color: #7b4f12;\n  font-weight: 700;\n  text-decoration: underline;\n  cursor: pointer;\n}\n.import-no-model-link[_ngcontent-%COMP%]:hover {\n  color: #2c3e50;\n}\n\n.tryon-avatar-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 14px;\n}\n\n.tryon-avatar-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  width: 72px;\n  height: 96px;\n  border-radius: 6px;\n  border: 2px solid #a8d8d0;\n  overflow: hidden;\n  background: #e8f6f3;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n\n.tryon-avatar-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n.tryon-avatar-empty[_ngcontent-%COMP%] {\n  font-size: 32px;\n  line-height: 1;\n  color: #a8d8d0;\n}\n\n.tryon-avatar-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background: rgba(255, 255, 255, 0.7);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 18px;\n  font-weight: 700;\n  color: #148f77;\n}\n\n.tryon-avatar-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  padding-top: 4px;\n}\n\n.tryon-avatar-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: #7f8c8d;\n}\n\n.tryon-avatar-status[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: #148f77;\n}\n\n.btn-tryon-avatar-change[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 5px 12px;\n  border-radius: 5px;\n  border: 1px solid #148f77;\n  background: transparent;\n  color: #148f77;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.15s, color 0.15s;\n  width: -moz-fit-content;\n  width: fit-content;\n  margin-top: 4px;\n}\n.btn-tryon-avatar-change[_ngcontent-%COMP%]:hover:not(.uploading) {\n  background: #148f77;\n  color: #fff;\n}\n.btn-tryon-avatar-change.uploading[_ngcontent-%COMP%] {\n  opacity: 0.6;\n  cursor: wait;\n}\n.btn-tryon-avatar-change[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.tryon-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n\n.mt-1[_ngcontent-%COMP%] {\n  margin-top: 4px;\n}\n\n.check-cell[_ngcontent-%COMP%] {\n  width: 36px;\n  transition: opacity 0.15s;\n}\n.check-cell--hidden[_ngcontent-%COMP%] {\n  visibility: hidden;\n  pointer-events: none;\n  opacity: 0;\n  width: 0;\n  padding: 0 !important;\n  overflow: hidden;\n}\n\n.tryon-selected[_ngcontent-%COMP%] {\n  background: #f0faf8;\n}\n\n.bulk-price-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 10px 14px;\n  margin-bottom: 14px;\n  background: #f8f9fa;\n  border: 1px solid #ecf0f1;\n  border-left: 3px solid #6c3483;\n  border-radius: 5px;\n}\n.bulk-price-bar[_ngcontent-%COMP%]   .bulk-price-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #2c3e50;\n  font-weight: 700;\n}\n.bulk-price-bar[_ngcontent-%COMP%]   .bulk-price-input[_ngcontent-%COMP%] {\n  width: 110px;\n  padding: 6px 10px;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  font-size: 14px;\n}\n.bulk-price-bar[_ngcontent-%COMP%]   .bulk-price-input.input-error[_ngcontent-%COMP%] {\n  border-color: #e74c3c;\n}\n.bulk-price-bar[_ngcontent-%COMP%]   .bulk-price-unit[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #7f8c8d;\n  font-weight: 600;\n}\n\n.btn-bulk-price[_ngcontent-%COMP%] {\n  padding: 7px 16px;\n  background: #6c3483;\n  color: #fff;\n  border: none;\n  border-radius: 4px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.btn-bulk-price[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n.btn-bulk-price[_ngcontent-%COMP%]:not(:disabled):hover {\n  background: rgb(83.9213114754, 40.406557377, 101.793442623);\n}\n\n.catalog-toolbar[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n\n.btn-catalog-new[_ngcontent-%COMP%] {\n  padding: 9px 20px;\n  background: #148f77;\n  color: #fff;\n  border: none;\n  border-radius: 5px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: \"Work Sans\", sans-serif;\n}\n.btn-catalog-new[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n\n.create-form-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #ecf0f1;\n  border-radius: 6px;\n  padding: 20px;\n  margin-bottom: 20px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);\n}\n\n.form-title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  color: #2c3e50;\n  margin: 0 0 16px;\n}\n\n.form-field[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n\n.form-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  font-weight: 600;\n  color: #2c3e50;\n  margin-bottom: 4px;\n}\n.form-label[_ngcontent-%COMP%]   .required[_ngcontent-%COMP%] {\n  color: #e74c3c;\n}\n.form-label[_ngcontent-%COMP%]   .hint[_ngcontent-%COMP%], .form-label[_ngcontent-%COMP%]   .optional[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: #7f8c8d;\n}\n\n.form-input[_ngcontent-%COMP%] {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 8px 10px;\n  border: 1px solid #d0d7de;\n  border-radius: 4px;\n  font-size: 14px;\n  font-family: \"Work Sans\", sans-serif;\n  outline: none;\n}\n.form-input[_ngcontent-%COMP%]:focus {\n  border-color: #148f77;\n}\n\n.form-textarea[_ngcontent-%COMP%] {\n  min-height: 64px;\n  resize: vertical;\n}\n\n.quill-desc[_ngcontent-%COMP%] {\n  display: block;\n}\n.quill-desc[_ngcontent-%COMP%]   .ql-toolbar[_ngcontent-%COMP%] {\n  border-color: #d0d7de;\n  border-radius: 4px 4px 0 0;\n  background: #f8f9fa;\n  font-family: \"Work Sans\", sans-serif;\n}\n.quill-desc[_ngcontent-%COMP%]   .ql-container[_ngcontent-%COMP%] {\n  border-color: #d0d7de;\n  border-radius: 0 0 4px 4px;\n  font-family: \"Work Sans\", sans-serif;\n  font-size: 14px;\n  min-height: 100px;\n}\n.quill-desc.ng-invalid.ng-touched[_ngcontent-%COMP%]   .ql-container[_ngcontent-%COMP%], .quill-desc.ng-invalid.ng-touched[_ngcontent-%COMP%]   .ql-toolbar[_ngcontent-%COMP%] {\n  border-color: #e74c3c;\n}\n\n.form-error[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #e74c3c;\n  margin: 8px 0 0;\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-top: 16px;\n}\n\n.btn-save[_ngcontent-%COMP%] {\n  padding: 8px 20px;\n  background: #148f77;\n  color: #fff;\n  border: none;\n  border-radius: 4px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.btn-save[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  background: transparent;\n  color: #7f8c8d;\n  border: 1px solid #bdc3c7;\n  border-radius: 4px;\n  font-size: 14px;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: #f8f9fa;\n}\n\n.category-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.category-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #ecf0f1;\n  border-radius: 6px;\n  padding: 14px 16px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);\n}\n\n.category-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n\n.category-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.category-title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: #2c3e50;\n}\n\n.category-prefix[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #7f8c8d;\n  font-family: monospace;\n  background: #f0faf7;\n  padding: 1px 6px;\n  border-radius: 3px;\n  align-self: flex-start;\n}\n\n.category-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  align-items: center;\n}\n\n.btn-publish[_ngcontent-%COMP%] {\n  padding: 5px 12px;\n  border: 1px solid #148f77;\n  border-radius: 4px;\n  background: transparent;\n  color: #148f77;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.15s, color 0.15s;\n}\n.btn-publish.published[_ngcontent-%COMP%] {\n  background: #148f77;\n  color: #fff;\n}\n.btn-publish[_ngcontent-%COMP%]:hover:not(.published) {\n  background: #e8f8f5;\n}\n\n.btn-view[_ngcontent-%COMP%] {\n  padding: 5px 12px;\n  border: 1px solid #2c3e50;\n  border-radius: 4px;\n  background: transparent;\n  color: #2c3e50;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.btn-view[_ngcontent-%COMP%]:hover {\n  background: #2c3e50;\n  color: #fff;\n}\n\n.btn-delete-cat[_ngcontent-%COMP%] {\n  padding: 5px 10px;\n  border: 1px solid #e74c3c;\n  border-radius: 4px;\n  background: transparent;\n  color: #e74c3c;\n  font-size: 13px;\n  cursor: pointer;\n}\n.btn-delete-cat[_ngcontent-%COMP%]:hover {\n  background: #e74c3c;\n  color: #fff;\n}\n\n.detail-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n\n.btn-back[_ngcontent-%COMP%] {\n  padding: 6px 14px;\n  border: 1px solid #ecf0f1;\n  border-radius: 4px;\n  background: transparent;\n  color: #2c3e50;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.btn-back[_ngcontent-%COMP%]:hover {\n  background: #f8f9fa;\n}\n\n.detail-title-block[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\n.detail-title[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n  color: #2c3e50;\n  margin: 0;\n}\n\n.detail-prefix[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #7f8c8d;\n  font-family: monospace;\n  background: #f0faf7;\n  padding: 2px 8px;\n  border-radius: 3px;\n}\n\n.section-title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: #2c3e50;\n  margin: 0 0 14px;\n  padding-bottom: 6px;\n  border-bottom: 2px solid #ecf0f1;\n}\n\n.pagination-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  margin-top: 12px;\n  flex-wrap: wrap;\n}\n\n.page-btn[_ngcontent-%COMP%] {\n  min-width: 32px;\n  height: 32px;\n  padding: 0 8px;\n  border: 1px solid #ecf0f1;\n  background: #fff;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 13px;\n  color: #2c3e50;\n  transition: background 0.15s, color 0.15s;\n}\n.page-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f0f0f0;\n}\n.page-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n.page-btn.active[_ngcontent-%COMP%] {\n  background: #148f77;\n  color: #fff;\n  border-color: #148f77;\n  font-weight: 600;\n}\n\n.page-info[_ngcontent-%COMP%] {\n  margin-left: 8px;\n  font-size: 12px;\n  color: #7f8c8d;\n}\n\n.import-section[_ngcontent-%COMP%], .items-section[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #ecf0f1;\n  border-radius: 6px;\n  padding: 18px;\n  margin-bottom: 16px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);\n}\n\n.drop-zone[_ngcontent-%COMP%] {\n  border: 2px dashed #b2d8d0;\n  border-radius: 8px;\n  padding: 32px;\n  text-align: center;\n  cursor: pointer;\n  transition: border-color 0.15s, background 0.15s;\n  background: #f9fefd;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n}\n.drop-zone.drag-over[_ngcontent-%COMP%] {\n  border-color: #148f77;\n  background: #e8f8f5;\n}\n.drop-zone[_ngcontent-%COMP%]:hover {\n  border-color: #148f77;\n}\n\n.drop-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n\n.drop-text[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #2c3e50;\n}\n\n.drop-hint[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #7f8c8d;\n}\n\n.import-groups[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 14px;\n  margin-top: 16px;\n}\n\n.import-group-card[_ngcontent-%COMP%] {\n  border: 1px solid #ecf0f1;\n  border-radius: 6px;\n  padding: 12px;\n  background: #fafafa;\n  min-width: 180px;\n  max-width: 240px;\n}\n\n.group-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 8px;\n}\n\n.group-key[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-family: monospace;\n  color: #2c3e50;\n  font-weight: 600;\n}\n\n.btn-remove-group[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  color: #7f8c8d;\n  cursor: pointer;\n  font-size: 14px;\n  padding: 0;\n}\n.btn-remove-group[_ngcontent-%COMP%]:hover {\n  color: #e74c3c;\n}\n\n.group-images[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n  margin-bottom: 10px;\n}\n\n.group-img-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  cursor: pointer;\n  border: 2px solid transparent;\n  border-radius: 4px;\n  overflow: hidden;\n  transition: border-color 0.15s;\n}\n.group-img-wrap.is-cover[_ngcontent-%COMP%] {\n  border-color: #148f77;\n}\n.group-img-wrap[_ngcontent-%COMP%]:hover {\n  border-color: #b2d8d0;\n}\n\n.group-thumb[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  object-fit: cover;\n  display: block;\n}\n\n.cover-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(20, 143, 119, 0.85);\n  color: #fff;\n  font-size: 9px;\n  font-weight: 700;\n  text-align: center;\n  padding: 1px 0;\n  text-transform: uppercase;\n}\n\n.group-fields[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n\n.group-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n  flex: 1;\n}\n\n.group-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #7f8c8d;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n}\n\n.group-input[_ngcontent-%COMP%] {\n  padding: 4px 6px;\n  border: 1px solid #d0d7de;\n  border-radius: 4px;\n  font-size: 13px;\n  width: 100%;\n  box-sizing: border-box;\n}\n.group-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #148f77;\n}\n\n.group-input-sm[_ngcontent-%COMP%] {\n  max-width: 60px;\n}\n\n.import-error[_ngcontent-%COMP%] {\n  color: #e74c3c;\n  font-size: 13px;\n  margin: 10px 0 0;\n}\n\n.import-tryon-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 12px;\n  flex-wrap: wrap;\n}\n\n.import-model-preview[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n\n.import-model-thumb[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 48px;\n  border-radius: 4px;\n  border: 1px solid #a8d8d0;\n  overflow: hidden;\n  background: #e8f6f3;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  font-size: 18px;\n}\n.import-model-thumb[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n.import-model-change[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  background: #148f77;\n  color: #fff;\n  font-size: 11px;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.import-model-change[_ngcontent-%COMP%]:hover:not(.uploading) {\n  background: rgb(14.9938650307, 107.2061349693, 89.2134969325);\n}\n.import-model-change.uploading[_ngcontent-%COMP%] {\n  opacity: 0.6;\n  cursor: wait;\n}\n.import-model-change[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.btn-tryon-toggle[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 14px;\n  border: 1px solid #b2bec3;\n  border-radius: 20px;\n  background: #fff;\n  color: #7f8c8d;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.btn-tryon-toggle--on[_ngcontent-%COMP%] {\n  border-color: #148f77;\n  background: #f0faf8;\n  color: #148f77;\n}\n.btn-tryon-toggle[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n.btn-tryon-toggle__dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #b2bec3;\n  transition: background 0.2s ease;\n}\n.btn-tryon-toggle--on[_ngcontent-%COMP%]   .btn-tryon-toggle__dot[_ngcontent-%COMP%] {\n  background: #148f77;\n}\n\n.btn-import[_ngcontent-%COMP%] {\n  margin-top: 14px;\n  padding: 9px 24px;\n  background: #148f77;\n  color: #fff;\n  border: none;\n  border-radius: 5px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  display: block;\n}\n.btn-import[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-import[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: 0.85;\n}\n\n.items-count[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: #7f8c8d;\n  font-size: 13px;\n}\n\n.items-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 14px;\n}\n.items-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #2c3e50;\n  color: #fff;\n  padding: 9px 12px;\n  text-align: left;\n  font-size: 12px;\n}\n.items-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 9px 12px;\n  border-bottom: 1px solid #ecf0f1;\n  vertical-align: middle;\n  color: #2c3e50;\n}\n.items-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.items-table[_ngcontent-%COMP%]   tr.unpublished-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: #fafafa;\n  color: #7f8c8d;\n}\n\n.img-cell[_ngcontent-%COMP%] {\n  padding: 6px 10px !important;\n  position: relative;\n}\n\n.thumb-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n}\n.thumb-wrapper[_ngcontent-%COMP%]   .tryon-check-mark[_ngcontent-%COMP%] {\n  display: none;\n}\n.thumb-wrapper.tryon-selectable[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.thumb-wrapper.tryon-selectable[_ngcontent-%COMP%]:hover {\n  outline: 2px solid #148f77;\n}\n.thumb-wrapper.tryon-checked[_ngcontent-%COMP%] {\n  outline: 3px solid #148f77 !important;\n}\n.thumb-wrapper.tryon-checked[_ngcontent-%COMP%]   .tryon-check-mark[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  top: 2px;\n  left: 2px;\n  width: 18px;\n  height: 18px;\n  background: #148f77;\n  color: #fff;\n  font-size: 12px;\n  font-weight: 700;\n  border-radius: 3px;\n  z-index: 10;\n  pointer-events: none;\n}\n.thumb-wrapper[_ngcontent-%COMP%]   .tryon-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 2px;\n  left: 2px;\n  font-size: 10px;\n  background: rgba(20, 143, 119, 0.85);\n  color: #fff;\n  border-radius: 3px;\n  padding: 1px 3px;\n  line-height: 1.2;\n  pointer-events: none;\n}\n.thumb-wrapper[_ngcontent-%COMP%]   .has-tryon[_ngcontent-%COMP%] {\n  outline: 2px solid #148f77;\n}\n\n.item-thumb[_ngcontent-%COMP%] {\n  width: 46px;\n  height: 46px;\n  object-fit: cover;\n  border-radius: 4px;\n  cursor: zoom-in;\n  display: block;\n  transition: transform 0.15s;\n}\n.item-thumb[_ngcontent-%COMP%]:hover {\n  transform: scale(1.08);\n}\n\n.ref-cell[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-weight: 600;\n}\n\n.text-center[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n.field-value[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #148f77;\n}\n.field-value.stock-zero[_ngcontent-%COMP%] {\n  color: #e74c3c;\n}\n\n.btn-field-edit[_ngcontent-%COMP%] {\n  margin-left: 6px;\n  border: none;\n  background: transparent;\n  color: #7f8c8d;\n  cursor: pointer;\n  font-size: 13px;\n  padding: 0;\n}\n.btn-field-edit[_ngcontent-%COMP%]:hover {\n  color: #2c3e50;\n}\n\n.btn-price-edit[_ngcontent-%COMP%] {\n  color: #6c3483;\n}\n.btn-price-edit[_ngcontent-%COMP%]:hover {\n  color: #4a2460;\n}\n\n.field-input[_ngcontent-%COMP%] {\n  width: 70px;\n  padding: 3px 6px;\n  border: 2px solid #148f77;\n  border-radius: 4px;\n  font-size: 13px;\n  font-weight: 600;\n  text-align: center;\n}\n\n.field-input-lg[_ngcontent-%COMP%] {\n  width: 100px;\n}\n\n.btn-field-save[_ngcontent-%COMP%] {\n  margin-left: 4px;\n  padding: 3px 10px;\n  background: #148f77;\n  color: #fff;\n  border: none;\n  border-radius: 4px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.btn-field-save[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n}\n\n.btn-field-cancel[_ngcontent-%COMP%] {\n  margin-left: 3px;\n  padding: 3px 8px;\n  border: 1px solid #bdc3c7;\n  border-radius: 4px;\n  background: transparent;\n  color: #7f8c8d;\n  font-size: 12px;\n  cursor: pointer;\n}\n\n.btn-publish-item[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  border: 1px solid #148f77;\n  border-radius: 10px;\n  background: transparent;\n  color: #148f77;\n  font-size: 11px;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.btn-publish-item.published[_ngcontent-%COMP%] {\n  background: #148f77;\n  color: #fff;\n}\n.btn-publish-item[_ngcontent-%COMP%]:hover:not(.published) {\n  background: #e8f8f5;\n}\n\n.actions-cell[_ngcontent-%COMP%] {\n  text-align: right;\n  white-space: nowrap;\n}\n\n.btn-mobile-expand[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.desc-edit-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0 !important;\n  border-top: none !important;\n}\n\n.desc-edit-panel[_ngcontent-%COMP%] {\n  background: #faf5ff;\n  border: 1px solid #8e44ad;\n  border-top: none;\n  padding: 12px 16px;\n}\n.desc-edit-panel__fields[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n@media (max-width: 768px) {\n  .desc-edit-panel__fields[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n.desc-edit-panel__field[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.desc-edit-panel__field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: #8e44ad;\n  text-transform: uppercase;\n}\n.desc-edit-panel__field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 8px 10px;\n  border: 1px solid #d4b8e0;\n  border-radius: 4px;\n  font-size: 13px;\n  line-height: 1.5;\n  resize: vertical;\n  font-family: inherit;\n}\n.desc-edit-panel__field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #8e44ad;\n}\n.desc-edit-panel__actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-top: 10px;\n}\n\n.btn-text-edit[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border: 1px solid #8e44ad;\n  border-radius: 4px;\n  background: transparent;\n  color: #8e44ad;\n  font-size: 12px;\n  font-weight: 700;\n  cursor: pointer;\n  margin-left: 4px;\n  transition: background 0.15s, color 0.15s;\n}\n.btn-text-edit[_ngcontent-%COMP%]:hover, .btn-text-edit.active[_ngcontent-%COMP%] {\n  background: #8e44ad;\n  color: #fff;\n}\n\n.btn-ai-desc[_ngcontent-%COMP%] {\n  padding: 4px 9px;\n  border: 1px solid #8e44ad;\n  border-radius: 4px;\n  background: transparent;\n  color: #8e44ad;\n  font-size: 14px;\n  cursor: pointer;\n  margin-right: 4px;\n  transition: background 0.15s, color 0.15s;\n}\n.btn-ai-desc[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #8e44ad;\n  color: #fff;\n}\n.btn-ai-desc[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n\n.btn-delete-item[_ngcontent-%COMP%] {\n  padding: 4px 9px;\n  border: 1px solid #e74c3c;\n  border-radius: 4px;\n  background: transparent;\n  color: #e74c3c;\n  font-size: 12px;\n  cursor: pointer;\n}\n.btn-delete-item[_ngcontent-%COMP%]:hover {\n  background: #e74c3c;\n  color: #fff;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 32px;\n  color: #7f8c8d;\n  font-size: 14px;\n}\n\n.lightbox-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.85);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n  cursor: zoom-out;\n}\n\n.lightbox-img[_ngcontent-%COMP%] {\n  max-width: 90vw;\n  max-height: 90vh;\n  object-fit: contain;\n  border-radius: 4px;\n  cursor: default;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);\n}\n\n.lightbox-close[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 16px;\n  right: 20px;\n  background: transparent;\n  border: none;\n  color: #fff;\n  font-size: 28px;\n  cursor: pointer;\n  opacity: 0.8;\n}\n.lightbox-close[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n\n.lang-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  margin-bottom: 8px;\n}\n\n.lang-tab[_ngcontent-%COMP%] {\n  padding: 4px 14px;\n  border: 1px solid #ecf0f1;\n  border-radius: 4px;\n  background: #fff;\n  color: #7f8c8d;\n  font-size: 13px;\n  cursor: pointer;\n  transition: background 0.15s, color 0.15s;\n}\n.lang-tab.active[_ngcontent-%COMP%] {\n  background: #148f77;\n  color: #fff;\n  border-color: #148f77;\n}\n.lang-tab[_ngcontent-%COMP%]:hover:not(.active) {\n  background: #f4f6f7;\n}\n\n.desc-section[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n  padding-bottom: 16px;\n  border-bottom: 1px solid #ecf0f1;\n}\n\n.desc-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 8px;\n}\n.desc-header[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.desc-preview[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #2c3e50;\n  margin: 4px 0;\n}\n\n  .desc-preview strong,   .desc-preview b {\n  font-weight: 700 !important;\n}\n  .desc-preview em,   .desc-preview i {\n  font-style: italic;\n}\n  .desc-preview u {\n  text-decoration: underline;\n}\n  .desc-preview p {\n  margin: 0 0 4px;\n}\n  .desc-preview ul,   .desc-preview ol {\n  padding-left: 1.5em;\n  margin: 0 0 4px;\n}\n\n.desc-en[_ngcontent-%COMP%] {\n  color: #7f8c8d;\n  font-style: italic;\n}\n\n.desc-empty[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #bdc3c7;\n  margin: 2px 0;\n}\n\n.desc-edit-layout[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: flex-start;\n}\n@media (max-width: 768px) {\n  .desc-edit-layout[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n\n.desc-edit-editor[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.desc-edit-preview[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  border: 1px solid #ecf0f1;\n  border-radius: 6px;\n  padding: 12px;\n  background: #fafafa;\n  min-height: 120px;\n}\n\n.desc-preview-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #7f8c8d;\n  margin: 0 0 8px;\n}\n\n.desc-preview-content[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #2c3e50;\n  line-height: 1.6;\n}\n\n  .desc-preview-content p {\n  margin: 0 0 6px;\n}\n  .desc-preview-content strong,   .desc-preview-content b {\n  font-weight: 700 !important;\n}\n  .desc-preview-content em,   .desc-preview-content i {\n  font-style: italic;\n}\n  .desc-preview-content u {\n  text-decoration: underline;\n}\n  .desc-preview-content ul,   .desc-preview-content ol {\n  padding-left: 1.5em;\n  margin: 0 0 6px;\n}\n\n.group-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 16px;\n  flex-wrap: wrap;\n}\n\n.btn-selection-mode[_ngcontent-%COMP%] {\n  padding: 6px 14px;\n  border: 1px solid #2c3e50;\n  border-radius: 4px;\n  background: transparent;\n  color: #2c3e50;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.15s, color 0.15s;\n}\n.btn-selection-mode.active[_ngcontent-%COMP%] {\n  background: #2c3e50;\n  color: #fff;\n}\n.btn-selection-mode[_ngcontent-%COMP%]:hover:not(.active) {\n  background: #f0f0f0;\n}\n\n.btn-merge[_ngcontent-%COMP%] {\n  padding: 6px 16px;\n  background: #6c3483;\n  color: #fff;\n  border: none;\n  border-radius: 4px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.btn-merge[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n\n.selection-hint[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #7f8c8d;\n  font-style: italic;\n}\n\n.import-group-card.has-selection[_ngcontent-%COMP%] {\n  border-color: #b2c2ce;\n}\n\n.group-img-wrap.is-selected[_ngcontent-%COMP%] {\n  border-color: #6c3483 !important;\n}\n\n.select-checkbox[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 2px;\n  right: 2px;\n  width: 18px;\n  height: 18px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.select-checkbox[_ngcontent-%COMP%]   .checkbox-inner[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border: 2px solid #fff;\n  border-radius: 3px;\n  background: rgba(0, 0, 0, 0.35);\n  color: #fff;\n  font-size: 10px;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: background 0.12s;\n}\n.select-checkbox[_ngcontent-%COMP%]   .checkbox-inner.checked[_ngcontent-%COMP%] {\n  background: #6c3483;\n  border-color: #6c3483;\n}\n\n@media (max-width: 599px) {\n  .items-table[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .items-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .items-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .items-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 58px 1fr 40px;\n    grid-template-rows: auto auto;\n    border: 1px solid #ecf0f1;\n    border-radius: 8px;\n    margin-bottom: 8px;\n    background: #fff;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n    overflow: hidden;\n  }\n  .items-table[_ngcontent-%COMP%]   tr.unpublished-row[_ngcontent-%COMP%] {\n    opacity: 0.75;\n  }\n  .items-table[_ngcontent-%COMP%]   tr.tryon-selected[_ngcontent-%COMP%] {\n    background: #f0faf8;\n  }\n  .items-table[_ngcontent-%COMP%]   .img-cell[_ngcontent-%COMP%] {\n    grid-column: 1;\n    grid-row: 1/3;\n    padding: 8px !important;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-right: 1px solid #f3f4f5;\n  }\n  .items-table[_ngcontent-%COMP%]   .ref-cell[_ngcontent-%COMP%] {\n    grid-column: 2;\n    grid-row: 1;\n    padding: 8px 10px 3px !important;\n    font-size: 12px;\n    display: flex;\n    align-items: flex-end;\n    border-bottom: none;\n  }\n  .items-table[_ngcontent-%COMP%]   .ref-cell[_ngcontent-%COMP%]::before {\n    display: none;\n  }\n  .items-table[_ngcontent-%COMP%]   td[data-label=Prix][_ngcontent-%COMP%] {\n    grid-column: 2;\n    grid-row: 2;\n    padding: 2px 10px 8px !important;\n    display: flex;\n    align-items: flex-start;\n    border-bottom: none;\n    text-align: left !important;\n  }\n  .items-table[_ngcontent-%COMP%]   td[data-label=Prix][_ngcontent-%COMP%]::before {\n    display: none;\n  }\n  .items-table[_ngcontent-%COMP%]   td[data-label=Prix][_ngcontent-%COMP%]   .field-value[_ngcontent-%COMP%] {\n    font-size: 14px;\n    font-weight: 700;\n    color: #2c3e50;\n  }\n  .items-table[_ngcontent-%COMP%]   td[data-label=Prix][_ngcontent-%COMP%]   .field-input[_ngcontent-%COMP%] {\n    width: 90px;\n  }\n  .items-table[_ngcontent-%COMP%]   td[data-label=Prix][_ngcontent-%COMP%]   .btn-field-save[_ngcontent-%COMP%], .items-table[_ngcontent-%COMP%]   td[data-label=Prix][_ngcontent-%COMP%]   .btn-field-cancel[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .items-table[_ngcontent-%COMP%]   td[data-label=Stock][_ngcontent-%COMP%], \n   .items-table[_ngcontent-%COMP%]   td[data-label=Statut][_ngcontent-%COMP%] {\n    display: none;\n    grid-column: 1/4;\n    padding: 7px 12px !important;\n    border-top: 1px solid #f3f4f5;\n    border-bottom: none;\n    font-size: 13px;\n    text-align: left !important;\n    align-items: center;\n    justify-content: space-between;\n  }\n  .items-table[_ngcontent-%COMP%]   td[data-label=Stock][_ngcontent-%COMP%]::before, \n   .items-table[_ngcontent-%COMP%]   td[data-label=Statut][_ngcontent-%COMP%]::before {\n    content: attr(data-label);\n    font-weight: 600;\n    color: #7f8c8d;\n    font-size: 11px;\n    text-transform: uppercase;\n    letter-spacing: 0.4px;\n    flex-shrink: 0;\n    margin-right: 10px;\n    min-width: 52px;\n  }\n  .items-table[_ngcontent-%COMP%]   .actions-cell[_ngcontent-%COMP%] {\n    grid-column: 3;\n    grid-row: 1/3;\n    display: flex !important;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    padding: 6px !important;\n    border-left: 1px solid #f3f4f5;\n    white-space: nowrap;\n    text-align: right;\n  }\n  .items-table[_ngcontent-%COMP%]   .actions-cell[_ngcontent-%COMP%]   .btn-delete-item[_ngcontent-%COMP%], \n   .items-table[_ngcontent-%COMP%]   .actions-cell[_ngcontent-%COMP%]   .btn-text-edit[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .items-table[_ngcontent-%COMP%]   tr.mobile-expanded[_ngcontent-%COMP%]   td[data-label=Stock][_ngcontent-%COMP%], \n   .items-table[_ngcontent-%COMP%]   tr.mobile-expanded[_ngcontent-%COMP%]   td[data-label=Statut][_ngcontent-%COMP%] {\n    display: flex;\n  }\n  .items-table[_ngcontent-%COMP%]   tr.mobile-expanded[_ngcontent-%COMP%]   .actions-cell[_ngcontent-%COMP%]   .btn-delete-item[_ngcontent-%COMP%], \n   .items-table[_ngcontent-%COMP%]   tr.mobile-expanded[_ngcontent-%COMP%]   .actions-cell[_ngcontent-%COMP%]   .btn-text-edit[_ngcontent-%COMP%] {\n    display: inline-flex;\n  }\n  .btn-mobile-expand[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 28px;\n    height: 28px;\n    border-radius: 50%;\n    border: none;\n    background: transparent;\n    color: #7f8c8d;\n    font-size: 20px;\n    line-height: 1;\n    cursor: pointer;\n    transition: background 0.12s, color 0.12s;\n  }\n  .btn-mobile-expand[_ngcontent-%COMP%]:hover {\n    background: #ecf0f1;\n    color: #2c3e50;\n  }\n  tr[_ngcontent-%COMP%]:not(.mobile-expanded)    + tr.desc-edit-row[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  tr.mobile-expanded[_ngcontent-%COMP%]    + tr.desc-edit-row[_ngcontent-%COMP%] {\n    display: block !important;\n  }\n  tr.mobile-expanded[_ngcontent-%COMP%]    + tr.desc-edit-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    display: block !important;\n    padding: 0 !important;\n    border-bottom: none !important;\n  }\n  tr.mobile-expanded[_ngcontent-%COMP%]    + tr.desc-edit-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]::before {\n    display: none;\n  }\n  .detail-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .ai-tab[_ngcontent-%COMP%] {\n    padding: 6px 10px;\n    font-size: 12px;\n  }\n  .bulk-price-bar[_ngcontent-%COMP%], \n   .bulk-ai-bar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .bulk-price-bar[_ngcontent-%COMP%]   .bulk-price-input[_ngcontent-%COMP%], \n   .bulk-ai-bar[_ngcontent-%COMP%]   .bulk-price-input[_ngcontent-%COMP%] {\n    width: 100%;\n    box-sizing: border-box;\n  }\n  .tryon-controls[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .import-group-card[_ngcontent-%COMP%] {\n    min-width: 0;\n    max-width: 100%;\n    width: 100%;\n  }\n  .import-groups[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .import-tryon-option[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .drop-zone[_ngcontent-%COMP%] {\n    padding: 20px 12px;\n  }\n}\n.merge-cover-panel[_ngcontent-%COMP%] {\n  margin: 12px 0;\n  padding: 16px;\n  background: #1a1a2e;\n  border: 1px solid #6c3483;\n  border-radius: 10px;\n}\n.merge-cover-panel[_ngcontent-%COMP%]   .merge-cover-title[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #c39bd3;\n  font-weight: 600;\n  margin: 0 0 12px;\n}\n.merge-cover-panel[_ngcontent-%COMP%]   .merge-cover-images[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  margin-bottom: 14px;\n}\n.merge-cover-panel[_ngcontent-%COMP%]   .merge-cover-img-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  cursor: pointer;\n  border-radius: 6px;\n  border: 2px solid transparent;\n  transition: border-color 0.15s;\n}\n.merge-cover-panel[_ngcontent-%COMP%]   .merge-cover-img-wrap.is-cover[_ngcontent-%COMP%] {\n  border-color: #6c3483;\n}\n.merge-cover-panel[_ngcontent-%COMP%]   .merge-cover-img-wrap[_ngcontent-%COMP%]   .merge-cover-thumb[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  object-fit: cover;\n  border-radius: 5px;\n  display: block;\n}\n.merge-cover-panel[_ngcontent-%COMP%]   .merge-cover-img-wrap[_ngcontent-%COMP%]   .cover-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 3px;\n  left: 50%;\n  transform: translateX(-50%);\n  background: #6c3483;\n  color: #fff;\n  font-size: 0.6rem;\n  font-weight: 700;\n  padding: 1px 5px;\n  border-radius: 3px;\n  white-space: nowrap;\n}\n.merge-cover-panel[_ngcontent-%COMP%]   .merge-cover-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvYWRtaW4vYWRtaW4tY2F0YWxvZy9hZG1pbi1jYXRhbG9nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVdBO0VBQ0UsbUJBQUE7QUFWRjs7QUFhQTtFQUNFLGFBQUE7RUFDQSxRQUFBO0VBQ0EsZ0NBQUE7RUFDQSxnQkFBQTtBQVZGOztBQWFBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtFQUNBLHVCQUFBO0VBQ0EsY0F2Qk87RUF3QlAsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLG9DQUFBO0VBQ0EsbUJBQUE7RUFDQSwwQkFBQTtFQUNBLHlDQUFBO0VBQ0EscUJBQUE7QUFWRjtBQVlFO0VBQ0UsY0FuQ0s7RUFvQ0wsbUJBbENLO0FBd0JUO0FBYUU7RUFDRSxjQTFDSztFQTJDTCw0QkEzQ0s7RUE0Q0wsbUJBQUE7QUFYSjs7QUFlQTtFQUNFLG9CQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQVpGOztBQWVBO0VBQ0UsMEJBQUE7RUFDQSxnQkFBQTtBQVpGOztBQWdCQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0EsOEJBQUE7RUFDQSxrQkFBQTtBQWJGO0FBZUU7RUFDRSxnQkFBQTtFQUNBLGNBaEZLO0FBbUVUO0FBZ0JFO0VBQ0UsZUFBQTtFQUNBLGNBdkZLO0VBd0ZMLGdCQUFBO0FBZEo7O0FBa0JBO0VBQ0UsaUJBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsdUJBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFB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QjtFQXhJQTtJQUNFLHNCQUFBO0lBQ0EsdUJBQUE7RUEwSUY7RUF0SUE7SUFDRSxpQkFBQTtJQUNBLGVBQUE7RUF3SUY7RUFwSUE7O0lBRUUsc0JBQUE7SUFDQSxvQkFBQTtFQXNJRjtFQXBJRTs7SUFBb0IsV0FBQTtJQUFhLHNCQUFBO0VBeUluQztFQXRJQTtJQUNFLHNCQUFBO0lBQ0Esb0JBQUE7RUF3SUY7RUFwSUE7SUFDRSxZQUFBO0lBQ0EsZUFBQTtJQUNBLFdBQUE7RUFzSUY7RUFuSUE7SUFDRSxzQkFBQTtFQXFJRjtFQWpJQTtJQUNFLHNCQUFBO0lBQ0EsdUJBQUE7RUFtSUY7RUEvSEE7SUFDRSxrQkFBQTtFQWlJRjtBQUNGO0FBN0hBO0VBQ0UsY0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0EsbUJBQUE7QUErSEY7QUE3SEU7RUFDRSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FBK0hKO0FBNUhFO0VBQ0UsYUFBQTtFQUNBLGVBQUE7RUFDQSxTQUFBO0VBQ0EsbUJBQUE7QUE4SEo7QUEzSEU7RUFDRSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLDZCQUFBO0VBQ0EsOEJBQUE7QUE2SEo7QUEzSEk7RUFDRSxxQkExcURHO0FBdXlEVDtBQTFISTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7QUE0SE47QUF6SEk7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxTQUFBO0VBQ0EsMkJBQUE7RUFDQSxtQkExckRHO0VBMnJESCxXQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtBQTJITjtBQXZIRTtFQUNFLGFBQUE7RUFDQSxRQUFBO0FBeUhKIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnc2Fzczpjb2xvcic7XG5cbi8vIMOiwpTCgMOiwpTCgCBWYXJpYWJsZXMgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXG4kZ3JlZW46ICAjMTQ4Zjc3O1xuJHB1cnBsZTogIzZjMzQ4MztcbiRkYXJrOiAgICMyYzNlNTA7XG4kZ3JleTogICAjN2Y4YzhkO1xuJGJvcmRlcjogI2VjZjBmMTtcbiRyZWQ6ICAgICNlNzRjM2M7XG5cbi8vIMOiwpTCgMOiwpTCgCBPbmdsZXRzIElBIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuLmFpLXRhYnMtY29udGFpbmVyIHtcbiAgbWFyZ2luLWJvdHRvbTogMTRweDtcbn1cblxuLmFpLXRhYnMtYmFyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAycHg7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAkYm9yZGVyO1xuICBtYXJnaW4tYm90dG9tOiAwO1xufVxuXG4uYWktdGFiIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA2cHg7XG4gIHBhZGRpbmc6IDhweCAxNnB4O1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogJGdyZXk7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgdHJhbnNwYXJlbnQ7XG4gIG1hcmdpbi1ib3R0b206IC0ycHg7XG4gIGJvcmRlci1yYWRpdXM6IDRweCA0cHggMCAwO1xuICB0cmFuc2l0aW9uOiBjb2xvciAwLjE1cywgYmFja2dyb3VuZCAwLjE1cztcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuXG4gICY6aG92ZXI6bm90KC5haS10YWItLWFjdGl2ZSkge1xuICAgIGNvbG9yOiAkZGFyaztcbiAgICBiYWNrZ3JvdW5kOiAkYm9yZGVyO1xuICB9XG5cbiAgJi0tYWN0aXZlIHtcbiAgICBjb2xvcjogJGdyZWVuO1xuICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICRncmVlbjtcbiAgICBiYWNrZ3JvdW5kOiAjZjBmYWY4O1xuICB9XG59XG5cbi5haS10YWItYmFkZ2Uge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIG1pbi13aWR0aDogMThweDtcbiAgaGVpZ2h0OiAxOHB4O1xuICBwYWRkaW5nOiAwIDVweDtcbiAgYm9yZGVyLXJhZGl1czogOXB4O1xuICBiYWNrZ3JvdW5kOiAjOGU0NGFkO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBmb250LXdlaWdodDogNzAwO1xuICBsaW5lLWhlaWdodDogMTtcbn1cblxuLmFpLXRhYi1wYW5lbCB7XG4gIGJvcmRlci1yYWRpdXM6IDAgMCA1cHggNXB4O1xuICBtYXJnaW4tYm90dG9tOiAwO1xufVxuXG4vLyDDosKUwoDDosKUwoAgUHJpeCBlbiBtYXNzZSDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcbi5idWxrLWFpLWJhciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgZ2FwOiAxMHB4O1xuICBwYWRkaW5nOiAxMHB4IDE0cHg7XG4gIGJhY2tncm91bmQ6ICNmOGY5ZmE7XG4gIGJvcmRlcjogMXB4IHNvbGlkICRib3JkZXI7XG4gIGJvcmRlci1sZWZ0OiAzcHggc29saWQgJGdyZWVuO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG5cbiAgLmJ1bGstYWktY291bnQge1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6ICRkYXJrO1xuICB9XG5cbiAgLmJ1bGstYWktZG9uZSB7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuICAgIGNvbG9yOiAkZ3JlZW47XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgfVxufVxuXG4uYnRuLWJ1bGstY2xlYXIge1xuICBwYWRkaW5nOiA2cHggMTRweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2MwMzkyYjtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICNjMDM5MmI7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMTVzLCBjb2xvciAwLjE1cztcblxuICAmOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHsgYmFja2dyb3VuZDogI2MwMzkyYjsgY29sb3I6ICNmZmY7IH1cbiAgJjpkaXNhYmxlZCB7IG9wYWNpdHk6IDAuNDsgY3Vyc29yOiBkZWZhdWx0OyB9XG59XG5cbi5idG4tYnVsay1haSB7XG4gIHBhZGRpbmc6IDZweCAxNHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAkZ3JlZW47XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAkZ3JlZW47XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMTVzLCBjb2xvciAwLjE1cztcblxuICAmOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHsgYmFja2dyb3VuZDogJGdyZWVuOyBjb2xvcjogI2ZmZjsgfVxuICAmOmRpc2FibGVkIHsgb3BhY2l0eTogMC42OyBjdXJzb3I6IGRlZmF1bHQ7IH1cbn1cblxuLy8gw6LClMKAw6LClMKAIFZpcnR1YWwgdHJ5LW9uIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuLmJ1bGstdHJ5b24tYmFyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBnYXA6IDEwcHg7XG4gIHBhZGRpbmc6IDEwcHggMTRweDtcbiAgYmFja2dyb3VuZDogI2YwZmFmODtcbiAgYm9yZGVyOiAxcHggc29saWQgI2E4ZDhkMDtcbiAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCAkZ3JlZW47XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLnRyeW9uLXR5cGUtc2VsZWN0IHtcbiAgcGFkZGluZzogNXB4IDhweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2IyYmVjMztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBmb250LXNpemU6IDEzcHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgJjpkaXNhYmxlZCB7IG9wYWNpdHk6IDAuNTsgY3Vyc29yOiBkZWZhdWx0OyB9XG59XG5cbi5idG4tdHJ5b24tbW9kZSB7XG4gIHBhZGRpbmc6IDZweCAxNHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAkZ3JlZW47XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAkZ3JlZW47XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMTVzLCBjb2xvciAwLjE1cztcblxuICAmLmFjdGl2ZSB7IGJhY2tncm91bmQ6ICNmZGVjZWE7IGJvcmRlci1jb2xvcjogJHJlZDsgY29sb3I6ICRyZWQ7IH1cbiAgJjpob3Zlcjpub3QoOmRpc2FibGVkKTpub3QoLmFjdGl2ZSkgeyBiYWNrZ3JvdW5kOiAkZ3JlZW47IGNvbG9yOiAjZmZmOyB9XG4gICY6ZGlzYWJsZWQgeyBvcGFjaXR5OiAwLjQ7IGN1cnNvcjogZGVmYXVsdDsgfVxufVxuXG4uYnRuLXRyeW9uLWFsbCB7XG4gIHBhZGRpbmc6IDZweCAxMnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjYjJiZWMzO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGNvbG9yOiAkZGFyaztcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gICY6aG92ZXI6bm90KDpkaXNhYmxlZCkgeyBib3JkZXItY29sb3I6ICRncmVlbjsgY29sb3I6ICRncmVlbjsgfVxuICAmOmRpc2FibGVkIHsgb3BhY2l0eTogMC40OyBjdXJzb3I6IGRlZmF1bHQ7IH1cbn1cblxuLmJ0bi1idWxrLXRyeW9uIHtcbiAgcGFkZGluZzogNnB4IDE0cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICRncmVlbjtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICRncmVlbjtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4xNXMsIGNvbG9yIDAuMTVzO1xuXG4gICY6aG92ZXI6bm90KDpkaXNhYmxlZCkgeyBiYWNrZ3JvdW5kOiAkZ3JlZW47IGNvbG9yOiAjZmZmOyB9XG4gICY6ZGlzYWJsZWQgeyBvcGFjaXR5OiAwLjY7IGN1cnNvcjogZGVmYXVsdDsgfVxufVxuXG4vLyDDosKUwoDDosKUwoAgVHJ5LW9uIHBhbmVsIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuLnRyeW9uLXBhbmVsIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAxMnB4O1xuICBwYWRkaW5nOiAxMnB4IDE0cHg7XG4gIGJhY2tncm91bmQ6ICNmOGY5ZmE7XG4gIGJvcmRlcjogMXB4IHNvbGlkICRib3JkZXI7XG4gIGJvcmRlci1sZWZ0OiAzcHggc29saWQgJGdyZWVuO1xuICBib3JkZXItcmFkaXVzOiAwIDAgNXB4IDVweDtcbn1cblxuLnRyeW9uLW5vLW1vZGVsLWFsZXJ0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBwYWRkaW5nOiAxMHB4IDE0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY4ZTE7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNmZmUwODI7XG4gIGJvcmRlci1sZWZ0OiAzcHggc29saWQgI2Y5YTgyNTtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG59XG5cbi50cnlvbi1uby1tb2RlbC1pY29uIHsgZm9udC1zaXplOiAyOHB4OyBmbGV4LXNocmluazogMDsgfVxuXG4udHJ5b24tbm8tbW9kZWwtdGV4dCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMnB4O1xuICBmb250LXNpemU6IDEzcHg7XG4gIGZsZXg6IDE7XG5cbiAgc3Ryb25nIHsgY29sb3I6ICRkYXJrOyB9XG4gIHNwYW4gICB7IGNvbG9yOiAkZ3JleTsgfVxufVxuXG4uaW1wb3J0LW5vLW1vZGVsLXdhcm5pbmcge1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiAjN2I0ZjEyO1xuICBiYWNrZ3JvdW5kOiAjZmZmOGUxO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZmZlMDgyO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHBhZGRpbmc6IDRweCAxMHB4O1xufVxuXG4uaW1wb3J0LW5vLW1vZGVsLWxpbmsge1xuICBjb2xvcjogIzdiNGYxMjtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgJjpob3ZlciB7IGNvbG9yOiAkZGFyazsgfVxufVxuXG4udHJ5b24tYXZhdGFyLXNlY3Rpb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgZ2FwOiAxNHB4O1xufVxuXG4udHJ5b24tYXZhdGFyLXdyYXAge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiA3MnB4O1xuICBoZWlnaHQ6IDk2cHg7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgYm9yZGVyOiAycHggc29saWQgI2E4ZDhkMDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYmFja2dyb3VuZDogI2U4ZjZmMztcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG4udHJ5b24tYXZhdGFyLWltZyB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xufVxuXG4udHJ5b24tYXZhdGFyLWVtcHR5IHtcbiAgZm9udC1zaXplOiAzMnB4O1xuICBsaW5lLWhlaWdodDogMTtcbiAgY29sb3I6ICNhOGQ4ZDA7XG59XG5cbi50cnlvbi1hdmF0YXItb3ZlcmxheSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgaW5zZXQ6IDA7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsMC43KTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICRncmVlbjtcbn1cblxuLnRyeW9uLWF2YXRhci1pbmZvIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiA0cHg7XG4gIHBhZGRpbmctdG9wOiA0cHg7XG59XG5cbi50cnlvbi1hdmF0YXItbGFiZWwge1xuICBmb250LXNpemU6IDExcHg7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGxldHRlci1zcGFjaW5nOiAwLjA2ZW07XG4gIGNvbG9yOiAkZ3JleTtcbn1cblxuLnRyeW9uLWF2YXRhci1zdGF0dXMge1xuICBmb250LXNpemU6IDEzcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAkZ3JlZW47XG59XG5cbi5idG4tdHJ5b24tYXZhdGFyLWNoYW5nZSB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiA1cHggMTJweDtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAkZ3JlZW47XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogJGdyZWVuO1xuICBmb250LXNpemU6IDEycHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjE1cywgY29sb3IgMC4xNXM7XG4gIHdpZHRoOiBmaXQtY29udGVudDtcbiAgbWFyZ2luLXRvcDogNHB4O1xuXG4gICY6aG92ZXI6bm90KC51cGxvYWRpbmcpIHsgYmFja2dyb3VuZDogJGdyZWVuOyBjb2xvcjogI2ZmZjsgfVxuICAmLnVwbG9hZGluZyB7IG9wYWNpdHk6IDAuNjsgY3Vyc29yOiB3YWl0OyB9XG5cbiAgaW5wdXQgeyBkaXNwbGF5OiBub25lOyB9XG59XG5cbi50cnlvbi1jb250cm9scyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgZ2FwOiAxMHB4O1xufVxuXG4ubXQtMSB7IG1hcmdpbi10b3A6IDRweDsgfVxuXG4uY2hlY2stY2VsbCB7XG4gIHdpZHRoOiAzNnB4O1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMTVzO1xuXG4gICYtLWhpZGRlbiB7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIG9wYWNpdHk6IDA7XG4gICAgd2lkdGg6IDA7XG4gICAgcGFkZGluZzogMCAhaW1wb3J0YW50O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gIH1cbn1cblxuLnRyeW9uLXNlbGVjdGVkIHsgYmFja2dyb3VuZDogI2YwZmFmODsgfVxuXG5cbi8vIMOiwpTCgMOiwpTCgCBQcml4IGVuIG1hc3NlIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuLmJ1bGstcHJpY2UtYmFyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBnYXA6IDhweDtcbiAgcGFkZGluZzogMTBweCAxNHB4O1xuICBtYXJnaW4tYm90dG9tOiAxNHB4O1xuICBiYWNrZ3JvdW5kOiAjZjhmOWZhO1xuICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyO1xuICBib3JkZXItbGVmdDogM3B4IHNvbGlkICRwdXJwbGU7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcblxuICAuYnVsay1wcmljZS1sYWJlbCB7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuICAgIGNvbG9yOiAkZGFyaztcbiAgICBmb250LXdlaWdodDogNzAwO1xuICB9XG5cbiAgLmJ1bGstcHJpY2UtaW5wdXQge1xuICAgIHdpZHRoOiAxMTBweDtcbiAgICBwYWRkaW5nOiA2cHggMTBweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgJi5pbnB1dC1lcnJvciB7IGJvcmRlci1jb2xvcjogJHJlZDsgfVxuICB9XG5cbiAgLmJ1bGstcHJpY2UtdW5pdCB7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuICAgIGNvbG9yOiAkZ3JleTtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICB9XG59XG5cbi5idG4tYnVsay1wcmljZSB7XG4gIHBhZGRpbmc6IDdweCAxNnB4O1xuICBiYWNrZ3JvdW5kOiAkcHVycGxlO1xuICBjb2xvcjogI2ZmZjtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICAmOmRpc2FibGVkIHsgb3BhY2l0eTogLjU7IGN1cnNvcjogZGVmYXVsdDsgfVxuICAmOm5vdCg6ZGlzYWJsZWQpOmhvdmVyIHsgYmFja2dyb3VuZDogY29sb3IuYWRqdXN0KCRwdXJwbGUsICRsaWdodG5lc3M6IC04JSk7IH1cbn1cblxuLy8gw6LClMKAw6LClMKAIFRvb2xiYXIgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXG4uY2F0YWxvZy10b29sYmFyIHtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbn1cblxuLmJ0bi1jYXRhbG9nLW5ldyB7XG4gIHBhZGRpbmc6IDlweCAyMHB4O1xuICBiYWNrZ3JvdW5kOiAkZ3JlZW47XG4gIGNvbG9yOiAjZmZmO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtZmFtaWx5OiAnV29yayBTYW5zJywgc2Fucy1zZXJpZjtcbiAgJjpob3ZlciB7IG9wYWNpdHk6IC44NTsgfVxufVxuXG4vLyDDosKUwoDDosKUwoAgRm9ybXVsYWlyZSBjcsODwqlhdGlvbiBjYXTDg8KpZ29yaWUgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXG4uY3JlYXRlLWZvcm0tY2FyZCB7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJvcmRlcjogMXB4IHNvbGlkICRib3JkZXI7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgcGFkZGluZzogMjBweDtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgYm94LXNoYWRvdzogMCAxcHggNHB4IHJnYmEoMCwwLDAsLjA3KTtcbn1cblxuLmZvcm0tdGl0bGUge1xuICBmb250LXNpemU6IDE2cHg7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAkZGFyaztcbiAgbWFyZ2luOiAwIDAgMTZweDtcbn1cblxuLmZvcm0tZmllbGQge1xuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xufVxuXG4uZm9ybS1sYWJlbCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmb250LXNpemU6IDEzcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAkZGFyaztcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xuXG4gIC5yZXF1aXJlZCB7IGNvbG9yOiAkcmVkOyB9XG4gIC5oaW50LCAub3B0aW9uYWwgeyBmb250LXdlaWdodDogNDAwOyBjb2xvcjogJGdyZXk7IH1cbn1cblxuLmZvcm0taW5wdXQge1xuICB3aWR0aDogMTAwJTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgcGFkZGluZzogOHB4IDEwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkMGQ3ZGU7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LWZhbWlseTogJ1dvcmsgU2FucycsIHNhbnMtc2VyaWY7XG4gIG91dGxpbmU6IG5vbmU7XG4gICY6Zm9jdXMgeyBib3JkZXItY29sb3I6ICRncmVlbjsgfVxufVxuXG4uZm9ybS10ZXh0YXJlYSB7IG1pbi1oZWlnaHQ6IDY0cHg7IHJlc2l6ZTogdmVydGljYWw7IH1cblxuLy8gw6LClMKAw6LClMKAIFF1aWxsIHJpY2ggdGV4dCDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcbi5xdWlsbC1kZXNjIHtcbiAgZGlzcGxheTogYmxvY2s7XG5cbiAgLnFsLXRvb2xiYXIge1xuICAgIGJvcmRlci1jb2xvcjogI2QwZDdkZTtcbiAgICBib3JkZXItcmFkaXVzOiA0cHggNHB4IDAgMDtcbiAgICBiYWNrZ3JvdW5kOiAjZjhmOWZhO1xuICAgIGZvbnQtZmFtaWx5OiAnV29yayBTYW5zJywgc2Fucy1zZXJpZjtcbiAgfVxuXG4gIC5xbC1jb250YWluZXIge1xuICAgIGJvcmRlci1jb2xvcjogI2QwZDdkZTtcbiAgICBib3JkZXItcmFkaXVzOiAwIDAgNHB4IDRweDtcbiAgICBmb250LWZhbWlseTogJ1dvcmsgU2FucycsIHNhbnMtc2VyaWY7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIG1pbi1oZWlnaHQ6IDEwMHB4O1xuICB9XG5cbiAgJi5uZy1pbnZhbGlkLm5nLXRvdWNoZWQgLnFsLWNvbnRhaW5lcixcbiAgJi5uZy1pbnZhbGlkLm5nLXRvdWNoZWQgLnFsLXRvb2xiYXIge1xuICAgIGJvcmRlci1jb2xvcjogJHJlZDtcbiAgfVxufVxuXG4uZm9ybS1lcnJvciB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgY29sb3I6ICRyZWQ7XG4gIG1hcmdpbjogOHB4IDAgMDtcbn1cblxuLmZvcm0tYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMTBweDtcbiAgbWFyZ2luLXRvcDogMTZweDtcbn1cblxuLmJ0bi1zYXZlIHtcbiAgcGFkZGluZzogOHB4IDIwcHg7XG4gIGJhY2tncm91bmQ6ICRncmVlbjtcbiAgY29sb3I6ICNmZmY7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgJjpkaXNhYmxlZCB7IG9wYWNpdHk6IC42OyBjdXJzb3I6IG5vdC1hbGxvd2VkOyB9XG59XG5cbi5idG4tY2FuY2VsIHtcbiAgcGFkZGluZzogOHB4IDE2cHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogJGdyZXk7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNiZGMzYzc7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gICY6aG92ZXIgeyBiYWNrZ3JvdW5kOiAjZjhmOWZhOyB9XG59XG5cbi8vIMOiwpTCgMOiwpTCgCBMaXN0ZSBjYXTDg8KpZ29yaWVzIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuLmNhdGVnb3J5LWxpc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDEwcHg7XG59XG5cbi5jYXRlZ29yeS1jYXJkIHtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm9yZGVyOiAxcHggc29saWQgJGJvcmRlcjtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBwYWRkaW5nOiAxNHB4IDE2cHg7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDNweCByZ2JhKDAsMCwwLC4wNik7XG59XG5cbi5jYXRlZ29yeS1jYXJkLWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBnYXA6IDEwcHg7XG59XG5cbi5jYXRlZ29yeS1tZXRhIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAycHg7XG59XG5cbi5jYXRlZ29yeS10aXRsZSB7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICRkYXJrO1xufVxuXG4uY2F0ZWdvcnktcHJlZml4IHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjb2xvcjogJGdyZXk7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XG4gIGJhY2tncm91bmQ6ICNmMGZhZjc7XG4gIHBhZGRpbmc6IDFweCA2cHg7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcbn1cblxuLmNhdGVnb3J5LWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDZweDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLy8gw6LClMKAw6LClMKAIEJvdXRvbnMgY29tbXVucyDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcbi5idG4tcHVibGlzaCB7XG4gIHBhZGRpbmc6IDVweCAxMnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAkZ3JlZW47XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAkZ3JlZW47XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIC4xNXMsIGNvbG9yIC4xNXM7XG5cbiAgJi5wdWJsaXNoZWQgeyBiYWNrZ3JvdW5kOiAkZ3JlZW47IGNvbG9yOiAjZmZmOyB9XG4gICY6aG92ZXI6bm90KC5wdWJsaXNoZWQpIHsgYmFja2dyb3VuZDogI2U4ZjhmNTsgfVxufVxuXG4uYnRuLXZpZXcge1xuICBwYWRkaW5nOiA1cHggMTJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgJGRhcms7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAkZGFyaztcbiAgZm9udC1zaXplOiAxMnB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gICY6aG92ZXIgeyBiYWNrZ3JvdW5kOiAkZGFyazsgY29sb3I6ICNmZmY7IH1cbn1cblxuLmJ0bi1kZWxldGUtY2F0IHtcbiAgcGFkZGluZzogNXB4IDEwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICRyZWQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAkcmVkO1xuICBmb250LXNpemU6IDEzcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgJjpob3ZlciB7IGJhY2tncm91bmQ6ICRyZWQ7IGNvbG9yOiAjZmZmOyB9XG59XG5cbi8vIMOiwpTCgMOiwpTCgCBEw4PCqXRhaWwgY2F0w4PCqWdvcmllIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuLmRldGFpbC1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLmJ0bi1iYWNrIHtcbiAgcGFkZGluZzogNnB4IDE0cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICRib3JkZXI7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAkZGFyaztcbiAgZm9udC1zaXplOiAxM3B4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICY6aG92ZXIgeyBiYWNrZ3JvdW5kOiAjZjhmOWZhOyB9XG59XG5cbi5kZXRhaWwtdGl0bGUtYmxvY2sge1xuICBmbGV4OiAxO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEwcHg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLmRldGFpbC10aXRsZSB7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICRkYXJrO1xuICBtYXJnaW46IDA7XG59XG5cbi5kZXRhaWwtcHJlZml4IHtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBjb2xvcjogJGdyZXk7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XG4gIGJhY2tncm91bmQ6ICNmMGZhZjc7XG4gIHBhZGRpbmc6IDJweCA4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbn1cblxuLy8gw6LClMKAw6LClMKAIFNlY3Rpb25zIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuLnNlY3Rpb24tdGl0bGUge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAkZGFyaztcbiAgbWFyZ2luOiAwIDAgMTRweDtcbiAgcGFkZGluZy1ib3R0b206IDZweDtcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICRib3JkZXI7XG59XG5cbi5wYWdpbmF0aW9uLWJhciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogNHB4O1xuICBtYXJnaW4tdG9wOiAxMnB4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG59XG5cbi5wYWdlLWJ0biB7XG4gIG1pbi13aWR0aDogMzJweDtcbiAgaGVpZ2h0OiAzMnB4O1xuICBwYWRkaW5nOiAwIDhweDtcbiAgYm9yZGVyOiAxcHggc29saWQgJGJvcmRlcjtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgY29sb3I6ICRkYXJrO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMTVzLCBjb2xvciAwLjE1cztcblxuICAmOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHsgYmFja2dyb3VuZDogI2YwZjBmMDsgfVxuICAmOmRpc2FibGVkIHsgb3BhY2l0eTogMC40OyBjdXJzb3I6IGRlZmF1bHQ7IH1cbiAgJi5hY3RpdmUge1xuICAgIGJhY2tncm91bmQ6ICRncmVlbjtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBib3JkZXItY29sb3I6ICRncmVlbjtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICB9XG59XG5cbi5wYWdlLWluZm8ge1xuICBtYXJnaW4tbGVmdDogOHB4O1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiAkZ3JleTtcbn1cblxuLmltcG9ydC1zZWN0aW9uLCAuaXRlbXMtc2VjdGlvbiB7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJvcmRlcjogMXB4IHNvbGlkICRib3JkZXI7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgcGFkZGluZzogMThweDtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgYm94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEoMCwwLDAsLjA2KTtcbn1cblxuLy8gw6LClMKAw6LClMKAIERyb3Agem9uZSDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcbi5kcm9wLXpvbmUge1xuICBib3JkZXI6IDJweCBkYXNoZWQgI2IyZDhkMDtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBwYWRkaW5nOiAzMnB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIC4xNXMsIGJhY2tncm91bmQgLjE1cztcbiAgYmFja2dyb3VuZDogI2Y5ZmVmZDtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDZweDtcblxuICAmLmRyYWctb3ZlciB7IGJvcmRlci1jb2xvcjogJGdyZWVuOyBiYWNrZ3JvdW5kOiAjZThmOGY1OyB9XG4gICY6aG92ZXIgeyBib3JkZXItY29sb3I6ICRncmVlbjsgfVxufVxuXG4uZHJvcC1pY29uIHsgZm9udC1zaXplOiAyOHB4OyB9XG4uZHJvcC10ZXh0IHsgZm9udC1zaXplOiAxNHB4OyBmb250LXdlaWdodDogNjAwOyBjb2xvcjogJGRhcms7IH1cbi5kcm9wLWhpbnQgeyBmb250LXNpemU6IDEycHg7IGNvbG9yOiAkZ3JleTsgfVxuXG4vLyDDosKUwoDDosKUwoAgR3JvdXBlcyBkJ2ltcG9ydCDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcbi5pbXBvcnQtZ3JvdXBzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBnYXA6IDE0cHg7XG4gIG1hcmdpbi10b3A6IDE2cHg7XG59XG5cbi5pbXBvcnQtZ3JvdXAtY2FyZCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICRib3JkZXI7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgcGFkZGluZzogMTJweDtcbiAgYmFja2dyb3VuZDogI2ZhZmFmYTtcbiAgbWluLXdpZHRoOiAxODBweDtcbiAgbWF4LXdpZHRoOiAyNDBweDtcbn1cblxuLmdyb3VwLWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xufVxuXG4uZ3JvdXAta2V5IHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xuICBjb2xvcjogJGRhcms7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5idG4tcmVtb3ZlLWdyb3VwIHtcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICRncmV5O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgcGFkZGluZzogMDtcbiAgJjpob3ZlciB7IGNvbG9yOiAkcmVkOyB9XG59XG5cbi5ncm91cC1pbWFnZXMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDZweDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4uZ3JvdXAtaW1nLXdyYXAge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYm9yZGVyOiAycHggc29saWQgdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIC4xNXM7XG5cbiAgJi5pcy1jb3ZlciB7IGJvcmRlci1jb2xvcjogJGdyZWVuOyB9XG4gICY6aG92ZXIgeyBib3JkZXItY29sb3I6ICNiMmQ4ZDA7IH1cbn1cblxuLmdyb3VwLXRodW1iIHtcbiAgd2lkdGg6IDU2cHg7XG4gIGhlaWdodDogNTZweDtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4uY292ZXItYmFkZ2Uge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJhY2tncm91bmQ6IHJnYmEoJGdyZWVuLCAuODUpO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC1zaXplOiA5cHg7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZzogMXB4IDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbi5ncm91cC1maWVsZHMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDhweDtcbn1cblxuLmdyb3VwLWZpZWxkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAzcHg7XG4gIGZsZXg6IDE7XG59XG5cbi5ncm91cC1sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgY29sb3I6ICRncmV5O1xuICBmb250LXdlaWdodDogNjAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBsZXR0ZXItc3BhY2luZzogLjRweDtcbn1cblxuLmdyb3VwLWlucHV0IHtcbiAgcGFkZGluZzogNHB4IDZweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2QwZDdkZTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDEzcHg7XG4gIHdpZHRoOiAxMDAlO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAmOmZvY3VzIHsgb3V0bGluZTogbm9uZTsgYm9yZGVyLWNvbG9yOiAkZ3JlZW47IH1cbn1cblxuLmdyb3VwLWlucHV0LXNtIHsgbWF4LXdpZHRoOiA2MHB4OyB9XG5cbi5pbXBvcnQtZXJyb3Ige1xuICBjb2xvcjogJHJlZDtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBtYXJnaW46IDEwcHggMCAwO1xufVxuXG4uaW1wb3J0LXRyeW9uLW9wdGlvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbiAgbWFyZ2luLXRvcDogMTJweDtcbiAgZmxleC13cmFwOiB3cmFwO1xufVxuXG4uaW1wb3J0LW1vZGVsLXByZXZpZXcge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDRweDtcbn1cblxuLmltcG9ydC1tb2RlbC10aHVtYiB7XG4gIHdpZHRoOiAzNnB4O1xuICBoZWlnaHQ6IDQ4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2E4ZDhkMDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYmFja2dyb3VuZDogI2U4ZjZmMztcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZsZXgtc2hyaW5rOiAwO1xuICBmb250LXNpemU6IDE4cHg7XG5cbiAgaW1nIHsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsgb2JqZWN0LWZpdDogY292ZXI7IH1cbn1cblxuLmltcG9ydC1tb2RlbC1jaGFuZ2Uge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDIwcHg7XG4gIGhlaWdodDogMjBweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBiYWNrZ3JvdW5kOiAkZ3JlZW47XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXNpemU6IDExcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjE1cztcblxuICAmOmhvdmVyOm5vdCgudXBsb2FkaW5nKSB7IGJhY2tncm91bmQ6IGNvbG9yLmFkanVzdCgkZ3JlZW4sICRsaWdodG5lc3M6IC04JSk7IH1cbiAgJi51cGxvYWRpbmcgeyBvcGFjaXR5OiAwLjY7IGN1cnNvcjogd2FpdDsgfVxuICBpbnB1dCB7IGRpc3BsYXk6IG5vbmU7IH1cbn1cblxuLmJ0bi10cnlvbi10b2dnbGUge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG4gIHBhZGRpbmc6IDZweCAxNHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjYjJiZWMzO1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogJGdyZXk7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xuXG4gICYtLW9uIHtcbiAgICBib3JkZXItY29sb3I6ICRncmVlbjtcbiAgICBiYWNrZ3JvdW5kOiAjZjBmYWY4O1xuICAgIGNvbG9yOiAkZ3JlZW47XG4gIH1cblxuICAmOmRpc2FibGVkIHsgb3BhY2l0eTogMC41OyBjdXJzb3I6IGRlZmF1bHQ7IH1cblxuICAmX19kb3Qge1xuICAgIHdpZHRoOiA4cHg7XG4gICAgaGVpZ2h0OiA4cHg7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGJhY2tncm91bmQ6ICNiMmJlYzM7XG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjJzIGVhc2U7XG4gIH1cblxuICAmLS1vbiAmX19kb3QgeyBiYWNrZ3JvdW5kOiAkZ3JlZW47IH1cbn1cblxuLmJ0bi1pbXBvcnQge1xuICBtYXJnaW4tdG9wOiAxNHB4O1xuICBwYWRkaW5nOiA5cHggMjRweDtcbiAgYmFja2dyb3VuZDogJGdyZWVuO1xuICBjb2xvcjogI2ZmZjtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBkaXNwbGF5OiBibG9jaztcbiAgJjpkaXNhYmxlZCB7IG9wYWNpdHk6IC42OyBjdXJzb3I6IG5vdC1hbGxvd2VkOyB9XG4gICY6aG92ZXI6bm90KDpkaXNhYmxlZCkgeyBvcGFjaXR5OiAuODU7IH1cbn1cblxuLy8gw6LClMKAw6LClMKAIFRhYmxlIGFydGljbGVzIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuLml0ZW1zLWNvdW50IHtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgY29sb3I6ICRncmV5O1xuICBmb250LXNpemU6IDEzcHg7XG59XG5cbi5pdGVtcy10YWJsZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICBmb250LXNpemU6IDE0cHg7XG5cbiAgdGgge1xuICAgIGJhY2tncm91bmQ6ICRkYXJrO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIHBhZGRpbmc6IDlweCAxMnB4O1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICB9XG5cbiAgdGQge1xuICAgIHBhZGRpbmc6IDlweCAxMnB4O1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAkYm9yZGVyO1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgY29sb3I6ICRkYXJrO1xuICB9XG5cbiAgdHI6bGFzdC1jaGlsZCB0ZCB7IGJvcmRlci1ib3R0b206IG5vbmU7IH1cbiAgdHIudW5wdWJsaXNoZWQtcm93IHRkIHsgYmFja2dyb3VuZDogI2ZhZmFmYTsgY29sb3I6ICRncmV5OyB9XG59XG5cbi5pbWctY2VsbCB7XG4gIHBhZGRpbmc6IDZweCAxMHB4ICFpbXBvcnRhbnQ7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLnRodW1iLXdyYXBwZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcblxuICAvLyBDb2NoZSBkZSBzw4PCqWxlY3Rpb24gw6LCgMKUIGNhY2jDg8KpZSBwYXIgZMODwqlmYXV0XG4gIC50cnlvbi1jaGVjay1tYXJrIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5cbiAgLy8gTW9kZSBzw4PCqWxlY3Rpb24gYWN0aWYgOiBjdXJzZXVyIHBvaW50ZXIgKyBib3JkdXJlIGF1IHN1cnZvbFxuICAmLnRyeW9uLXNlbGVjdGFibGUge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAmOmhvdmVyIHsgb3V0bGluZTogMnB4IHNvbGlkICRncmVlbjsgfVxuICB9XG5cbiAgLy8gQXJ0aWNsZSBzw4PCqWxlY3Rpb25uw4PCqSA6IGZvbmQgdmVydCArIGNvY2hlIHZpc2libGVcbiAgJi50cnlvbi1jaGVja2VkIHtcbiAgICBvdXRsaW5lOiAzcHggc29saWQgJGdyZWVuICFpbXBvcnRhbnQ7XG5cbiAgICAudHJ5b24tY2hlY2stbWFyayB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiAycHg7XG4gICAgICBsZWZ0OiAycHg7XG4gICAgICB3aWR0aDogMThweDtcbiAgICAgIGhlaWdodDogMThweDtcbiAgICAgIGJhY2tncm91bmQ6ICRncmVlbjtcbiAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAgIHotaW5kZXg6IDEwO1xuICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgfVxuICB9XG5cbiAgLnRyeW9uLWJhZGdlIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAycHg7XG4gICAgbGVmdDogMnB4O1xuICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDIwLCAxNDMsIDExOSwgMC44NSk7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgIHBhZGRpbmc6IDFweCAzcHg7XG4gICAgbGluZS1oZWlnaHQ6IDEuMjtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgfVxuXG4gIC5oYXMtdHJ5b24geyBvdXRsaW5lOiAycHggc29saWQgJGdyZWVuOyB9XG59XG5cbi5pdGVtLXRodW1iIHtcbiAgd2lkdGg6IDQ2cHg7XG4gIGhlaWdodDogNDZweDtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgY3Vyc29yOiB6b29tLWluO1xuICBkaXNwbGF5OiBibG9jaztcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIC4xNXM7XG4gICY6aG92ZXIgeyB0cmFuc2Zvcm06IHNjYWxlKDEuMDgpOyB9XG59XG5cbi5yZWYtY2VsbCB7IGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7IGZvbnQtd2VpZ2h0OiA2MDA7IH1cblxuLnRleHQtY2VudGVyIHsgdGV4dC1hbGlnbjogY2VudGVyOyB9XG5cbi8vIMODwolkaXRpb24gaW5saW5lXG4uZmllbGQtdmFsdWUge1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogJGdyZWVuO1xuXG4gICYuc3RvY2stemVybyB7XG4gICAgY29sb3I6ICNlNzRjM2M7XG4gIH1cbn1cblxuLmJ0bi1maWVsZC1lZGl0IHtcbiAgbWFyZ2luLWxlZnQ6IDZweDtcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICRncmV5O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgcGFkZGluZzogMDtcbiAgJjpob3ZlciB7IGNvbG9yOiAkZGFyazsgfVxufVxuXG4uYnRuLXByaWNlLWVkaXQgeyBjb2xvcjogJHB1cnBsZTsgJjpob3ZlciB7IGNvbG9yOiAjNGEyNDYwOyB9IH1cblxuLmZpZWxkLWlucHV0IHtcbiAgd2lkdGg6IDcwcHg7XG4gIHBhZGRpbmc6IDNweCA2cHg7XG4gIGJvcmRlcjogMnB4IHNvbGlkICRncmVlbjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDEzcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmZpZWxkLWlucHV0LWxnIHsgd2lkdGg6IDEwMHB4OyB9XG5cbi5idG4tZmllbGQtc2F2ZSB7XG4gIG1hcmdpbi1sZWZ0OiA0cHg7XG4gIHBhZGRpbmc6IDNweCAxMHB4O1xuICBiYWNrZ3JvdW5kOiAkZ3JlZW47XG4gIGNvbG9yOiAjZmZmO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gICY6ZGlzYWJsZWQgeyBvcGFjaXR5OiAuNjsgfVxufVxuXG4uYnRuLWZpZWxkLWNhbmNlbCB7XG4gIG1hcmdpbi1sZWZ0OiAzcHg7XG4gIHBhZGRpbmc6IDNweCA4cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNiZGMzYzc7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAkZ3JleTtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi8vIFB1YmxpZXIgaXRlbVxuLmJ0bi1wdWJsaXNoLWl0ZW0ge1xuICBwYWRkaW5nOiA0cHggMTBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgJGdyZWVuO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICRncmVlbjtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG5cbiAgJi5wdWJsaXNoZWQgeyBiYWNrZ3JvdW5kOiAkZ3JlZW47IGNvbG9yOiAjZmZmOyB9XG4gICY6aG92ZXI6bm90KC5wdWJsaXNoZWQpIHsgYmFja2dyb3VuZDogI2U4ZjhmNTsgfVxufVxuXG4uYWN0aW9ucy1jZWxsIHsgdGV4dC1hbGlnbjogcmlnaHQ7IHdoaXRlLXNwYWNlOiBub3dyYXA7IH1cblxuLmJ0bi1tb2JpbGUtZXhwYW5kIHsgZGlzcGxheTogbm9uZTsgfSAvLyB2aXNpYmxlIHVuaXF1ZW1lbnQgdmlhIGxlIGJsb2MgQG1lZGlhIG1vYmlsZVxuXG4uZGVzYy1lZGl0LXJvdyB0ZCB7XG4gIHBhZGRpbmc6IDAgIWltcG9ydGFudDtcbiAgYm9yZGVyLXRvcDogbm9uZSAhaW1wb3J0YW50O1xufVxuXG4uZGVzYy1lZGl0LXBhbmVsIHtcbiAgYmFja2dyb3VuZDogI2ZhZjVmZjtcbiAgYm9yZGVyOiAxcHggc29saWQgIzhlNDRhZDtcbiAgYm9yZGVyLXRvcDogbm9uZTtcbiAgcGFkZGluZzogMTJweCAxNnB4O1xuXG4gICZfX2ZpZWxkcyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBnYXA6IDE2cHg7XG5cbiAgICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgfVxuICB9XG5cbiAgJl9fZmllbGQge1xuICAgIGZsZXg6IDE7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGdhcDogNHB4O1xuXG4gICAgbGFiZWwge1xuICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIGNvbG9yOiAjOGU0NGFkO1xuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICB9XG5cbiAgICB0ZXh0YXJlYSB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIHBhZGRpbmc6IDhweCAxMHB4O1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2Q0YjhlMDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgICByZXNpemU6IHZlcnRpY2FsO1xuICAgICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG5cbiAgICAgICY6Zm9jdXMgeyBvdXRsaW5lOiBub25lOyBib3JkZXItY29sb3I6ICM4ZTQ0YWQ7IH1cbiAgICB9XG4gIH1cblxuICAmX19hY3Rpb25zIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA4cHg7XG4gICAgbWFyZ2luLXRvcDogMTBweDtcbiAgfVxufVxuXG4uYnRuLXRleHQtZWRpdCB7XG4gIHBhZGRpbmc6IDRweCA4cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM4ZTQ0YWQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjOGU0NGFkO1xuICBmb250LXNpemU6IDEycHg7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgbWFyZ2luLWxlZnQ6IDRweDtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjE1cywgY29sb3IgMC4xNXM7XG5cbiAgJjpob3ZlciwgJi5hY3RpdmUgeyBiYWNrZ3JvdW5kOiAjOGU0NGFkOyBjb2xvcjogI2ZmZjsgfVxufVxuXG4uYnRuLWFpLWRlc2Mge1xuICBwYWRkaW5nOiA0cHggOXB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjOGU0NGFkO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzhlNDRhZDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIG1hcmdpbi1yaWdodDogNHB4O1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMTVzLCBjb2xvciAwLjE1cztcblxuICAmOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHsgYmFja2dyb3VuZDogIzhlNDRhZDsgY29sb3I6ICNmZmY7IH1cbiAgJjpkaXNhYmxlZCB7IG9wYWNpdHk6IDAuNTsgY3Vyc29yOiBkZWZhdWx0OyB9XG59XG5cbi5idG4tZGVsZXRlLWl0ZW0ge1xuICBwYWRkaW5nOiA0cHggOXB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAkcmVkO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogJHJlZDtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gICY6aG92ZXIgeyBiYWNrZ3JvdW5kOiAkcmVkOyBjb2xvcjogI2ZmZjsgfVxufVxuXG4vLyDDosKUwoDDosKUwoAgw4PCiXRhdHMgdmlkZXMgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXG4uZW1wdHktc3RhdGUge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDMycHg7XG4gIGNvbG9yOiAkZ3JleTtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4vLyDDosKUwoDDosKUwoAgTGlnaHRib3ggw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXG4ubGlnaHRib3gtb3ZlcmxheSB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgaW5zZXQ6IDA7XG4gIGJhY2tncm91bmQ6IHJnYmEoMCwwLDAsLjg1KTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHotaW5kZXg6IDk5OTk7XG4gIGN1cnNvcjogem9vbS1vdXQ7XG59XG5cbi5saWdodGJveC1pbWcge1xuICBtYXgtd2lkdGg6IDkwdnc7XG4gIG1heC1oZWlnaHQ6IDkwdmg7XG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgY3Vyc29yOiBkZWZhdWx0O1xuICBib3gtc2hhZG93OiAwIDhweCAzMnB4IHJnYmEoMCwwLDAsLjUpO1xufVxuXG4ubGlnaHRib3gtY2xvc2Uge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMTZweDtcbiAgcmlnaHQ6IDIwcHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXNpemU6IDI4cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgb3BhY2l0eTogLjg7XG4gICY6aG92ZXIgeyBvcGFjaXR5OiAxOyB9XG59XG5cbi8vIMOiwpTCgMOiwpTCgCBPbmdsZXRzIGxhbmd1ZSBGUi9FTiDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcbi5sYW5nLXRhYnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDZweDtcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xufVxuXG4ubGFuZy10YWIge1xuICBwYWRkaW5nOiA0cHggMTRweDtcbiAgYm9yZGVyOiAxcHggc29saWQgJGJvcmRlcjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogJGdyZXk7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIC4xNXMsIGNvbG9yIC4xNXM7XG4gICYuYWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiAkZ3JlZW47XG4gICAgY29sb3I6ICNmZmY7XG4gICAgYm9yZGVyLWNvbG9yOiAkZ3JlZW47XG4gIH1cbiAgJjpob3Zlcjpub3QoLmFjdGl2ZSkgeyBiYWNrZ3JvdW5kOiAjZjRmNmY3OyB9XG59XG5cbi8vIMOiwpTCgMOiwpTCgCBTZWN0aW9uIGRlc2NyaXB0aW9uIGNhdMODwqlnb3JpZSAodnVlIGTDg8KpdGFpbCkgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXG4uZGVzYy1zZWN0aW9uIHtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgcGFkZGluZy1ib3R0b206IDE2cHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAkYm9yZGVyO1xufVxuXG4uZGVzYy1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbiAgLnNlY3Rpb24tdGl0bGUgeyBtYXJnaW46IDA7IH1cbn1cblxuLmRlc2MtcHJldmlldyB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY29sb3I6ICRkYXJrO1xuICBtYXJnaW46IDRweCAwO1xufVxuXG46Om5nLWRlZXAgLmRlc2MtcHJldmlldyB7XG4gIHN0cm9uZywgYiB7IGZvbnQtd2VpZ2h0OiA3MDAgIWltcG9ydGFudDsgfVxuICBlbSwgaSAgICAgeyBmb250LXN0eWxlOiBpdGFsaWM7IH1cbiAgdSAgICAgICAgIHsgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IH1cbiAgcCAgICAgICAgIHsgbWFyZ2luOiAwIDAgNHB4OyB9XG4gIHVsLCBvbCAgICB7IHBhZGRpbmctbGVmdDogMS41ZW07IG1hcmdpbjogMCAwIDRweDsgfVxufVxuXG4uZGVzYy1lbiB7XG4gIGNvbG9yOiAkZ3JleTtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xufVxuXG4uZGVzYy1lbXB0eSB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgY29sb3I6ICNiZGMzYzc7XG4gIG1hcmdpbjogMnB4IDA7XG59XG5cbi5kZXNjLWVkaXQtbGF5b3V0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAxNnB4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcblxuICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB9XG59XG5cbi5kZXNjLWVkaXQtZWRpdG9yIHtcbiAgZmxleDogMTtcbiAgbWluLXdpZHRoOiAwO1xufVxuXG4uZGVzYy1lZGl0LXByZXZpZXcge1xuICBmbGV4OiAxO1xuICBtaW4td2lkdGg6IDA7XG4gIGJvcmRlcjogMXB4IHNvbGlkICRib3JkZXI7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgcGFkZGluZzogMTJweDtcbiAgYmFja2dyb3VuZDogI2ZhZmFmYTtcbiAgbWluLWhlaWdodDogMTIwcHg7XG59XG5cbi5kZXNjLXByZXZpZXctbGFiZWwge1xuICBmb250LXNpemU6IDExcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGxldHRlci1zcGFjaW5nOiAwLjA1ZW07XG4gIGNvbG9yOiAkZ3JleTtcbiAgbWFyZ2luOiAwIDAgOHB4O1xufVxuXG4uZGVzYy1wcmV2aWV3LWNvbnRlbnQge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOiAkZGFyaztcbiAgbGluZS1oZWlnaHQ6IDEuNjtcbn1cblxuOjpuZy1kZWVwIC5kZXNjLXByZXZpZXctY29udGVudCB7XG4gIHAgICAgICB7IG1hcmdpbjogMCAwIDZweDsgfVxuICBzdHJvbmcsIGIgeyBmb250LXdlaWdodDogNzAwICFpbXBvcnRhbnQ7IH1cbiAgZW0sIGkgIHsgZm9udC1zdHlsZTogaXRhbGljOyB9XG4gIHUgICAgICB7IHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyB9XG4gIHVsLCBvbCB7IHBhZGRpbmctbGVmdDogMS41ZW07IG1hcmdpbjogMCAwIDZweDsgfVxufVxuXG4vLyDDosKUwoDDosKUwoAgUmVncm91cGVtZW50IGQnaW1hZ2VzIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuLmdyb3VwLXRvb2xiYXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEwcHg7XG4gIG1hcmdpbi10b3A6IDE2cHg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLmJ0bi1zZWxlY3Rpb24tbW9kZSB7XG4gIHBhZGRpbmc6IDZweCAxNHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAkZGFyaztcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICRkYXJrO1xuICBmb250LXNpemU6IDEzcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAuMTVzLCBjb2xvciAuMTVzO1xuXG4gICYuYWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiAkZGFyaztcbiAgICBjb2xvcjogI2ZmZjtcbiAgfVxuICAmOmhvdmVyOm5vdCguYWN0aXZlKSB7IGJhY2tncm91bmQ6ICNmMGYwZjA7IH1cbn1cblxuLmJ0bi1tZXJnZSB7XG4gIHBhZGRpbmc6IDZweCAxNnB4O1xuICBiYWNrZ3JvdW5kOiAkcHVycGxlO1xuICBjb2xvcjogI2ZmZjtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICAmOmhvdmVyIHsgb3BhY2l0eTogLjg1OyB9XG59XG5cbi5zZWxlY3Rpb24taGludCB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgY29sb3I6ICRncmV5O1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG59XG5cbi5pbXBvcnQtZ3JvdXAtY2FyZC5oYXMtc2VsZWN0aW9uIHtcbiAgYm9yZGVyLWNvbG9yOiAjYjJjMmNlO1xufVxuXG4uZ3JvdXAtaW1nLXdyYXAge1xuICAmLmlzLXNlbGVjdGVkIHtcbiAgICBib3JkZXItY29sb3I6ICRwdXJwbGUgIWltcG9ydGFudDtcbiAgfVxufVxuXG4uc2VsZWN0LWNoZWNrYm94IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDJweDtcbiAgcmlnaHQ6IDJweDtcbiAgd2lkdGg6IDE4cHg7XG4gIGhlaWdodDogMThweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cbiAgLmNoZWNrYm94LWlubmVyIHtcbiAgICB3aWR0aDogMTZweDtcbiAgICBoZWlnaHQ6IDE2cHg7XG4gICAgYm9yZGVyOiAycHggc29saWQgI2ZmZjtcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwuMzUpO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIC4xMnM7XG5cbiAgICAmLmNoZWNrZWQge1xuICAgICAgYmFja2dyb3VuZDogJHB1cnBsZTtcbiAgICAgIGJvcmRlci1jb2xvcjogJHB1cnBsZTtcbiAgICB9XG4gIH1cbn1cblxuLy8gw6LClMKAw6LClMKAIFJlc3BvbnNpdmUgbW9iaWxlIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuQG1lZGlhIChtYXgtd2lkdGg6IDU5OXB4KSB7XG5cbiAgLy8gVGFibGVhdSBhcnRpY2xlcyDDosKGwpIgZ3JpbGxlIDMgY29sb25uZXMgY29tcGFjdGVcbiAgLml0ZW1zLXRhYmxlIHtcbiAgICBkaXNwbGF5OiBibG9jaztcblxuICAgIHRoZWFkIHsgZGlzcGxheTogbm9uZTsgfVxuICAgIHRib2R5IHsgZGlzcGxheTogYmxvY2s7IH1cblxuICAgIC8vIENoYXF1ZSBsaWduZSA9IGdyaWxsZSBbaW1hZ2UgfCByZWYrcHJpeCB8IMOiwovCrl1cbiAgICB0ciB7XG4gICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA1OHB4IDFmciA0MHB4O1xuICAgICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIGF1dG87XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyO1xuICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICAgICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICAgIGJveC1zaGFkb3c6IDAgMXB4IDNweCByZ2JhKDAsMCwwLC4wNSk7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIH1cblxuICAgIHRyLnVucHVibGlzaGVkLXJvdyB7IG9wYWNpdHk6IDAuNzU7IH1cbiAgICB0ci50cnlvbi1zZWxlY3RlZCAgeyBiYWNrZ3JvdW5kOiAjZjBmYWY4OyB9XG5cbiAgICAvLyBDb2wgMSDDosKAwpQgaW1hZ2UgKHMnw4PCqXRlbmQgc3VyIGxlcyAyIGxpZ25lcylcbiAgICAuaW1nLWNlbGwge1xuICAgICAgZ3JpZC1jb2x1bW46IDE7XG4gICAgICBncmlkLXJvdzogMSAvIDM7XG4gICAgICBwYWRkaW5nOiA4cHggIWltcG9ydGFudDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZjNmNGY1O1xuICAgIH1cblxuICAgIC8vIENvbCAyLCBsaWduZSAxIMOiwoDClCByw4PCqWbDg8KpcmVuY2VcbiAgICAucmVmLWNlbGwge1xuICAgICAgZ3JpZC1jb2x1bW46IDI7XG4gICAgICBncmlkLXJvdzogMTtcbiAgICAgIHBhZGRpbmc6IDhweCAxMHB4IDNweCAhaW1wb3J0YW50O1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAgICAgIGJvcmRlci1ib3R0b206IG5vbmU7XG4gICAgICAmOjpiZWZvcmUgeyBkaXNwbGF5OiBub25lOyB9XG4gICAgfVxuXG4gICAgLy8gQ29sIDIsIGxpZ25lIDIgw6LCgMKUIHByaXggKHByb21pbmVudCwgc2FucyBsYWJlbClcbiAgICB0ZFtkYXRhLWxhYmVsPVwiUHJpeFwiXSB7XG4gICAgICBncmlkLWNvbHVtbjogMjtcbiAgICAgIGdyaWQtcm93OiAyO1xuICAgICAgcGFkZGluZzogMnB4IDEwcHggOHB4ICFpbXBvcnRhbnQ7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgICBib3JkZXItYm90dG9tOiBub25lO1xuICAgICAgdGV4dC1hbGlnbjogbGVmdCAhaW1wb3J0YW50O1xuICAgICAgJjo6YmVmb3JlIHsgZGlzcGxheTogbm9uZTsgfVxuICAgICAgLmZpZWxkLXZhbHVlIHsgZm9udC1zaXplOiAxNHB4OyBmb250LXdlaWdodDogNzAwOyBjb2xvcjogJGRhcms7IH1cbiAgICAgIC5maWVsZC1pbnB1dCAgeyB3aWR0aDogOTBweDsgfVxuICAgICAgLmJ0bi1maWVsZC1zYXZlLCAuYnRuLWZpZWxkLWNhbmNlbCB7IGZvbnQtc2l6ZTogMTFweDsgfVxuICAgIH1cblxuICAgIC8vIFN0b2NrICsgc3RhdHV0IMOiwoDClCBtYXNxdcODwqlzIHBhciBkw4PCqWZhdXRcbiAgICB0ZFtkYXRhLWxhYmVsPVwiU3RvY2tcIl0sXG4gICAgdGRbZGF0YS1sYWJlbD1cIlN0YXR1dFwiXSB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgZ3JpZC1jb2x1bW46IDEgLyA0O1xuICAgICAgcGFkZGluZzogN3B4IDEycHggIWltcG9ydGFudDtcbiAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZjNmNGY1O1xuICAgICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgIHRleHQtYWxpZ246IGxlZnQgIWltcG9ydGFudDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG5cbiAgICAgICY6OmJlZm9yZSB7XG4gICAgICAgIGNvbnRlbnQ6IGF0dHIoZGF0YS1sYWJlbCk7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgIGNvbG9yOiAkZ3JleTtcbiAgICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICBsZXR0ZXItc3BhY2luZzogLjRweDtcbiAgICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICAgICAgbWluLXdpZHRoOiA1MnB4O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENvbCAzIMOiwoDClCBib3V0b24gw6LCi8KuIC8gYWN0aW9ucyAocyfDg8KpdGVuZCBzdXIgMiBsaWduZXMpXG4gICAgLmFjdGlvbnMtY2VsbCB7XG4gICAgICBncmlkLWNvbHVtbjogMztcbiAgICAgIGdyaWQtcm93OiAxIC8gMztcbiAgICAgIGRpc3BsYXk6IGZsZXggIWltcG9ydGFudDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBwYWRkaW5nOiA2cHggIWltcG9ydGFudDtcbiAgICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2YzZjRmNTtcbiAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICB0ZXh0LWFsaWduOiByaWdodDtcblxuICAgICAgLy8gQm91dG9ucyBkZXNrdG9wIGNhY2jDg8KpcyBwYXIgZMODwqlmYXV0IHN1ciBtb2JpbGVcbiAgICAgIC5idG4tZGVsZXRlLWl0ZW0sXG4gICAgICAuYnRuLXRleHQtZWRpdCB7IGRpc3BsYXk6IG5vbmU7IH1cbiAgICB9XG5cbiAgICAvLyBMaWduZSBleHBhbnPDg8KpZSA6IHLDg8KpdsODwqhsZSBzdG9jaywgc3RhdHV0IGV0IGJvdXRvbnMgZCdhY3Rpb25cbiAgICB0ci5tb2JpbGUtZXhwYW5kZWQge1xuICAgICAgdGRbZGF0YS1sYWJlbD1cIlN0b2NrXCJdLFxuICAgICAgdGRbZGF0YS1sYWJlbD1cIlN0YXR1dFwiXSB7IGRpc3BsYXk6IGZsZXg7IH1cblxuICAgICAgLmFjdGlvbnMtY2VsbCB7XG4gICAgICAgIC5idG4tZGVsZXRlLWl0ZW0sXG4gICAgICAgIC5idG4tdGV4dC1lZGl0IHsgZGlzcGxheTogaW5saW5lLWZsZXg7IH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBCb3V0b24gw6LCi8KuIChtb2JpbGUgb25seSlcbiAgLmJ0bi1tb2JpbGUtZXhwYW5kIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgd2lkdGg6IDI4cHg7XG4gICAgaGVpZ2h0OiAyOHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgY29sb3I6ICRncmV5O1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICBsaW5lLWhlaWdodDogMTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAuMTJzLCBjb2xvciAuMTJzO1xuXG4gICAgJjpob3ZlciB7IGJhY2tncm91bmQ6ICRib3JkZXI7IGNvbG9yOiAkZGFyazsgfVxuICB9XG5cbiAgLy8gTGlnbmUgZGVzY3JpcHRpb24gOiBtYXNxdcODwqllIHNpIGxhIGxpZ25lIHBhcmVudGUgbidlc3QgcGFzIG91dmVydGVcbiAgdHI6bm90KC5tb2JpbGUtZXhwYW5kZWQpICsgdHIuZGVzYy1lZGl0LXJvdyB7XG4gICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuICB9XG5cbiAgLy8gTGlnbmUgZGVzY3JpcHRpb24gb3V2ZXJ0ZSA6IHBsZWluZSBsYXJnZXVyXG4gIHRyLm1vYmlsZS1leHBhbmRlZCArIHRyLmRlc2MtZWRpdC1yb3cge1xuICAgIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XG4gICAgdGQge1xuICAgICAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDtcbiAgICAgIHBhZGRpbmc6IDAgIWltcG9ydGFudDtcbiAgICAgIGJvcmRlci1ib3R0b206IG5vbmUgIWltcG9ydGFudDtcbiAgICAgICY6OmJlZm9yZSB7IGRpc3BsYXk6IG5vbmU7IH1cbiAgICB9XG4gIH1cblxuICAvLyBFbi10w4PCqnRlIGTDg8KpdGFpbCA6IGVtcGlsw4PCqVxuICAuZGV0YWlsLWhlYWRlciB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgfVxuXG4gIC8vIE9uZ2xldHMgSUEgOiB0YWlsbGUgcsODwqlkdWl0ZVxuICAuYWktdGFiIHtcbiAgICBwYWRkaW5nOiA2cHggMTBweDtcbiAgICBmb250LXNpemU6IDEycHg7XG4gIH1cblxuICAvLyBQYW5uZWF1eCBJQSA6IGVtcGlsw4PCqXNcbiAgLmJ1bGstcHJpY2UtYmFyLFxuICAuYnVsay1haS1iYXIge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG5cbiAgICAuYnVsay1wcmljZS1pbnB1dCB7IHdpZHRoOiAxMDAlOyBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XG4gIH1cblxuICAudHJ5b24tY29udHJvbHMge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gIH1cblxuICAvLyBHcm91cGVzIGltcG9ydCA6IHBsZWluZSBsYXJnZXVyXG4gIC5pbXBvcnQtZ3JvdXAtY2FyZCB7XG4gICAgbWluLXdpZHRoOiAwO1xuICAgIG1heC13aWR0aDogMTAwJTtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuXG4gIC5pbXBvcnQtZ3JvdXBzIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB9XG5cbiAgLy8gVHJ5LW9uIHRvZ2dsZSArIG9wdGlvbnMgOiBlbXBpbMODwqlzXG4gIC5pbXBvcnQtdHJ5b24tb3B0aW9uIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICB9XG5cbiAgLy8gRHJvcCB6b25lIDogcGFkZGluZyByw4PCqWR1aXRcbiAgLmRyb3Atem9uZSB7XG4gICAgcGFkZGluZzogMjBweCAxMnB4O1xuICB9XG59XG5cbi8vIMOiwpTCgMOiwpTCgCBQYW5uZWF1IGNob2l4IGRlIGNvdXZlcnR1cmUgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXG4ubWVyZ2UtY292ZXItcGFuZWwge1xuICBtYXJnaW46IDEycHggMDtcbiAgcGFkZGluZzogMTZweDtcbiAgYmFja2dyb3VuZDogIzFhMWEyZTtcbiAgYm9yZGVyOiAxcHggc29saWQgJHB1cnBsZTtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcblxuICAubWVyZ2UtY292ZXItdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogLjg1cmVtO1xuICAgIGNvbG9yOiAjYzM5YmQzO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgbWFyZ2luOiAwIDAgMTJweDtcbiAgfVxuXG4gIC5tZXJnZS1jb3Zlci1pbWFnZXMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIGdhcDogMTBweDtcbiAgICBtYXJnaW4tYm90dG9tOiAxNHB4O1xuICB9XG5cbiAgLm1lcmdlLWNvdmVyLWltZy13cmFwIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICBib3JkZXI6IDJweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgLjE1cztcblxuICAgICYuaXMtY292ZXIge1xuICAgICAgYm9yZGVyLWNvbG9yOiAkcHVycGxlO1xuICAgIH1cblxuICAgIC5tZXJnZS1jb3Zlci10aHVtYiB7XG4gICAgICB3aWR0aDogODBweDtcbiAgICAgIGhlaWdodDogODBweDtcbiAgICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxuXG4gICAgLmNvdmVyLWJhZGdlIHtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGJvdHRvbTogM3B4O1xuICAgICAgbGVmdDogNTAlO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xuICAgICAgYmFja2dyb3VuZDogJHB1cnBsZTtcbiAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgZm9udC1zaXplOiAuNnJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBwYWRkaW5nOiAxcHggNXB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICB9XG4gIH1cblxuICAubWVyZ2UtY292ZXItYWN0aW9ucyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBnYXA6IDhweDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
      changeDetection: 0
    });
  }
}

/***/ },

/***/ 72102
/*!*****************************************************!*\
  !*** ./node_modules/@angular/cdk/fesm2022/a11y.mjs ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A11yModule: () => (/* reexport safe */ _a11y_module_chunk_mjs__WEBPACK_IMPORTED_MODULE_1__.A11yModule),
/* harmony export */   ActiveDescendantKeyManager: () => (/* reexport safe */ _activedescendant_key_manager_chunk_mjs__WEBPACK_IMPORTED_MODULE_8__.ActiveDescendantKeyManager),
/* harmony export */   AriaDescriber: () => (/* binding */ AriaDescriber),
/* harmony export */   CDK_DESCRIBEDBY_HOST_ATTRIBUTE: () => (/* binding */ CDK_DESCRIBEDBY_HOST_ATTRIBUTE),
/* harmony export */   CDK_DESCRIBEDBY_ID_PREFIX: () => (/* binding */ CDK_DESCRIBEDBY_ID_PREFIX),
/* harmony export */   CdkAriaLive: () => (/* reexport safe */ _a11y_module_chunk_mjs__WEBPACK_IMPORTED_MODULE_1__.CdkAriaLive),
/* harmony export */   CdkMonitorFocus: () => (/* reexport safe */ _focus_monitor_chunk_mjs__WEBPACK_IMPORTED_MODULE_0__.CdkMonitorFocus),
/* harmony export */   CdkTrapFocus: () => (/* reexport safe */ _a11y_module_chunk_mjs__WEBPACK_IMPORTED_MODULE_1__.CdkTrapFocus),
/* harmony export */   ConfigurableFocusTrap: () => (/* binding */ ConfigurableFocusTrap),
/* harmony export */   ConfigurableFocusTrapFactory: () => (/* binding */ ConfigurableFocusTrapFactory),
/* harmony export */   EventListenerFocusTrapInertStrategy: () => (/* binding */ EventListenerFocusTrapInertStrategy),
/* harmony export */   FOCUS_MONITOR_DEFAULT_OPTIONS: () => (/* reexport safe */ _focus_monitor_chunk_mjs__WEBPACK_IMPORTED_MODULE_0__.FOCUS_MONITOR_DEFAULT_OPTIONS),
/* harmony export */   FOCUS_TRAP_INERT_STRATEGY: () => (/* binding */ FOCUS_TRAP_INERT_STRATEGY),
/* harmony export */   FocusKeyManager: () => (/* reexport safe */ _focus_key_manager_chunk_mjs__WEBPACK_IMPORTED_MODULE_9__.FocusKeyManager),
/* harmony export */   FocusMonitor: () => (/* reexport safe */ _focus_monitor_chunk_mjs__WEBPACK_IMPORTED_MODULE_0__.FocusMonitor),
/* harmony export */   FocusMonitorDetectionMode: () => (/* reexport safe */ _focus_monitor_chunk_mjs__WEBPACK_IMPORTED_MODULE_0__.FocusMonitorDetectionMode),
/* harmony export */   FocusTrap: () => (/* reexport safe */ _a11y_module_chunk_mjs__WEBPACK_IMPORTED_MODULE_1__.FocusTrap),
/* harmony export */   FocusTrapFactory: () => (/* reexport safe */ _a11y_module_chunk_mjs__WEBPACK_IMPORTED_MODULE_1__.FocusTrapFactory),
/* harmony export */   HighContrastMode: () => (/* reexport safe */ _a11y_module_chunk_mjs__WEBPACK_IMPORTED_MODULE_1__.HighContrastMode),
/* harmony export */   HighContrastModeDetector: () => (/* reexport safe */ _a11y_module_chunk_mjs__WEBPACK_IMPORTED_MODULE_1__.HighContrastModeDetector),
/* harmony export */   INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS: () => (/* reexport safe */ _focus_monitor_chunk_mjs__WEBPACK_IMPORTED_MODULE_0__.INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS),
/* harmony export */   INPUT_MODALITY_DETECTOR_OPTIONS: () => (/* reexport safe */ _focus_monitor_chunk_mjs__WEBPACK_IMPORTED_MODULE_0__.INPUT_MODALITY_DETECTOR_OPTIONS),
/* harmony export */   InputModalityDetector: () => (/* reexport safe */ _focus_monitor_chunk_mjs__WEBPACK_IMPORTED_MODULE_0__.InputModalityDetector),
/* harmony export */   InteractivityChecker: () => (/* reexport safe */ _a11y_module_chunk_mjs__WEBPACK_IMPORTED_MODULE_1__.InteractivityChecker),
/* harmony export */   IsFocusableConfig: () => (/* reexport safe */ _a11y_module_chunk_mjs__WEBPACK_IMPORTED_MODULE_1__.IsFocusableConfig),
/* harmony export */   LIVE_ANNOUNCER_DEFAULT_OPTIONS: () => (/* reexport safe */ _a11y_module_chunk_mjs__WEBPACK_IMPORTED_MODULE_1__.LIVE_ANNOUNCER_DEFAULT_OPTIONS),
/* harmony export */   LIVE_ANNOUNCER_ELEMENT_TOKEN: () => (/* reexport safe */ _a11y_module_chunk_mjs__WEBPACK_IMPORTED_MODULE_1__.LIVE_ANNOUNCER_ELEMENT_TOKEN),
/* harmony export */   ListKeyManager: () => (/* reexport safe */ _list_key_manager_chunk_mjs__WEBPACK_IMPORTED_MODULE_10__.ListKeyManager),
/* harmony export */   LiveAnnouncer: () => (/* reexport safe */ _a11y_module_chunk_mjs__WEBPACK_IMPORTED_MODULE_1__.LiveAnnouncer),
/* harmony export */   MESSAGES_CONTAINER_ID: () => (/* binding */ MESSAGES_CONTAINER_ID),
/* harmony export */   NOOP_TREE_KEY_MANAGER_FACTORY_PROVIDER: () => (/* binding */ NOOP_TREE_KEY_MANAGER_FACTORY_PROVIDER),
/* harmony export */   NoopTreeKeyManager: () => (/* binding */ NoopTreeKeyManager),
/* harmony export */   TREE_KEY_MANAGER: () => (/* reexport safe */ _tree_key_manager_chunk_mjs__WEBPACK_IMPORTED_MODULE_12__.TREE_KEY_MANAGER),
/* harmony export */   TreeKeyManager: () => (/* reexport safe */ _tree_key_manager_chunk_mjs__WEBPACK_IMPORTED_MODULE_12__.TreeKeyManager),
/* harmony export */   _IdGenerator: () => (/* reexport safe */ _id_generator_chunk_mjs__WEBPACK_IMPORTED_MODULE_2__._IdGenerator),
/* harmony export */   addAriaReferencedId: () => (/* binding */ addAriaReferencedId),
/* harmony export */   getAriaReferenceIds: () => (/* binding */ getAriaReferenceIds),
/* harmony export */   isFakeMousedownFromScreenReader: () => (/* reexport safe */ _fake_event_detection_chunk_mjs__WEBPACK_IMPORTED_MODULE_13__.isFakeMousedownFromScreenReader),
/* harmony export */   isFakeTouchstartFromScreenReader: () => (/* reexport safe */ _fake_event_detection_chunk_mjs__WEBPACK_IMPORTED_MODULE_13__.isFakeTouchstartFromScreenReader),
/* harmony export */   removeAriaReferencedId: () => (/* binding */ removeAriaReferencedId)
/* harmony export */ });
/* harmony import */ var _focus_monitor_chunk_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_focus-monitor-chunk.mjs */ 76522);
/* harmony import */ var _a11y_module_chunk_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_a11y-module-chunk.mjs */ 5642);
/* harmony import */ var _id_generator_chunk_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_id-generator-chunk.mjs */ 26306);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _platform_chunk_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_platform-chunk.mjs */ 98508);
/* harmony import */ var _style_loader_chunk_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_style-loader-chunk.mjs */ 59504);
/* harmony import */ var _visually_hidden_chunk_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./_visually-hidden-chunk.mjs */ 66329);
/* harmony import */ var _activedescendant_key_manager_chunk_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./_activedescendant-key-manager-chunk.mjs */ 77022);
/* harmony import */ var _focus_key_manager_chunk_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./_focus-key-manager-chunk.mjs */ 2903);
/* harmony import */ var _list_key_manager_chunk_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./_list-key-manager-chunk.mjs */ 47441);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 10819);
/* harmony import */ var _tree_key_manager_chunk_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./_tree-key-manager-chunk.mjs */ 11349);
/* harmony import */ var _fake_event_detection_chunk_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./_fake-event-detection-chunk.mjs */ 90603);




























const ID_DELIMITER = ' ';
function addAriaReferencedId(el, attr, id) {
  const ids = getAriaReferenceIds(el, attr);
  id = id.trim();
  if (ids.some(existingId => existingId.trim() === id)) {
    return;
  }
  ids.push(id);
  el.setAttribute(attr, ids.join(ID_DELIMITER));
}
function removeAriaReferencedId(el, attr, id) {
  const ids = getAriaReferenceIds(el, attr);
  id = id.trim();
  const filteredIds = ids.filter(val => val !== id);
  if (filteredIds.length) {
    el.setAttribute(attr, filteredIds.join(ID_DELIMITER));
  } else {
    el.removeAttribute(attr);
  }
}
function getAriaReferenceIds(el, attr) {
  const attrValue = el.getAttribute(attr);
  return attrValue?.match(/\S+/g) ?? [];
}
const MESSAGES_CONTAINER_ID = 'cdk-describedby-message-container';
const CDK_DESCRIBEDBY_ID_PREFIX = 'cdk-describedby-message';
const CDK_DESCRIBEDBY_HOST_ATTRIBUTE = 'cdk-describedby-host';
let nextId = 0;
class AriaDescriber {
  _platform = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_platform_chunk_mjs__WEBPACK_IMPORTED_MODULE_5__.Platform);
  _document = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_3__.DOCUMENT);
  _messageRegistry = new Map();
  _messagesContainer = null;
  _id = `${nextId++}`;
  constructor() {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_style_loader_chunk_mjs__WEBPACK_IMPORTED_MODULE_6__._CdkPrivateStyleLoader).load(_visually_hidden_chunk_mjs__WEBPACK_IMPORTED_MODULE_7__._VisuallyHiddenLoader);
    this._id = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_4__.APP_ID) + '-' + nextId++;
  }
  describe(hostElement, message, role) {
    if (!this._canBeDescribed(hostElement, message)) {
      return;
    }
    const key = getKey(message, role);
    if (typeof message !== 'string') {
      setMessageId(message, this._id);
      this._messageRegistry.set(key, {
        messageElement: message,
        referenceCount: 0
      });
    } else if (!this._messageRegistry.has(key)) {
      this._createMessageElement(message, role);
    }
    if (!this._isElementDescribedByMessage(hostElement, key)) {
      this._addMessageReference(hostElement, key);
    }
  }
  removeDescription(hostElement, message, role) {
    if (!message || !this._isElementNode(hostElement)) {
      return;
    }
    const key = getKey(message, role);
    if (this._isElementDescribedByMessage(hostElement, key)) {
      this._removeMessageReference(hostElement, key);
    }
    if (typeof message === 'string') {
      const registeredMessage = this._messageRegistry.get(key);
      if (registeredMessage && registeredMessage.referenceCount === 0) {
        this._deleteMessageElement(key);
      }
    }
    if (this._messagesContainer?.childNodes.length === 0) {
      this._messagesContainer.remove();
      this._messagesContainer = null;
    }
  }
  ngOnDestroy() {
    const describedElements = this._document.querySelectorAll(`[${CDK_DESCRIBEDBY_HOST_ATTRIBUTE}="${this._id}"]`);
    for (let i = 0; i < describedElements.length; i++) {
      this._removeCdkDescribedByReferenceIds(describedElements[i]);
      describedElements[i].removeAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
    }
    this._messagesContainer?.remove();
    this._messagesContainer = null;
    this._messageRegistry.clear();
  }
  _createMessageElement(message, role) {
    const messageElement = this._document.createElement('div');
    setMessageId(messageElement, this._id);
    messageElement.textContent = message;
    if (role) {
      messageElement.setAttribute('role', role);
    }
    this._createMessagesContainer();
    this._messagesContainer.appendChild(messageElement);
    this._messageRegistry.set(getKey(message, role), {
      messageElement,
      referenceCount: 0
    });
  }
  _deleteMessageElement(key) {
    this._messageRegistry.get(key)?.messageElement?.remove();
    this._messageRegistry.delete(key);
  }
  _createMessagesContainer() {
    if (this._messagesContainer) {
      return;
    }
    const containerClassName = 'cdk-describedby-message-container';
    const serverContainers = this._document.querySelectorAll(`.${containerClassName}[platform="server"]`);
    for (let i = 0; i < serverContainers.length; i++) {
      serverContainers[i].remove();
    }
    const messagesContainer = this._document.createElement('div');
    messagesContainer.style.visibility = 'hidden';
    messagesContainer.classList.add(containerClassName);
    messagesContainer.classList.add('cdk-visually-hidden');
    if (!this._platform.isBrowser) {
      messagesContainer.setAttribute('platform', 'server');
    }
    this._document.body.appendChild(messagesContainer);
    this._messagesContainer = messagesContainer;
  }
  _removeCdkDescribedByReferenceIds(element) {
    const originalReferenceIds = getAriaReferenceIds(element, 'aria-describedby').filter(id => id.indexOf(CDK_DESCRIBEDBY_ID_PREFIX) != 0);
    element.setAttribute('aria-describedby', originalReferenceIds.join(' '));
  }
  _addMessageReference(element, key) {
    const registeredMessage = this._messageRegistry.get(key);
    addAriaReferencedId(element, 'aria-describedby', registeredMessage.messageElement.id);
    element.setAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE, this._id);
    registeredMessage.referenceCount++;
  }
  _removeMessageReference(element, key) {
    const registeredMessage = this._messageRegistry.get(key);
    registeredMessage.referenceCount--;
    removeAriaReferencedId(element, 'aria-describedby', registeredMessage.messageElement.id);
    element.removeAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
  }
  _isElementDescribedByMessage(element, key) {
    const referenceIds = getAriaReferenceIds(element, 'aria-describedby');
    const registeredMessage = this._messageRegistry.get(key);
    const messageId = registeredMessage && registeredMessage.messageElement.id;
    return !!messageId && referenceIds.indexOf(messageId) != -1;
  }
  _canBeDescribed(element, message) {
    if (!this._isElementNode(element)) {
      return false;
    }
    if (message && typeof message === 'object') {
      return true;
    }
    const trimmedMessage = message == null ? '' : `${message}`.trim();
    const ariaLabel = element.getAttribute('aria-label');
    return trimmedMessage ? !ariaLabel || ariaLabel.trim() !== trimmedMessage : false;
  }
  _isElementNode(element) {
    return element.nodeType === this._document.ELEMENT_NODE;
  }
  static ɵfac = function AriaDescriber_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || AriaDescriber)();
  };
  static ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: AriaDescriber,
    factory: AriaDescriber.ɵfac,
    providedIn: 'root'
  });
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__.setClassMetadata(AriaDescriber, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], () => [], null);
})();
function getKey(message, role) {
  return typeof message === 'string' ? `${role || ''}/${message}` : message;
}
function setMessageId(element, serviceId) {
  if (!element.id) {
    element.id = `${CDK_DESCRIBEDBY_ID_PREFIX}-${serviceId}-${nextId++}`;
  }
}
class NoopTreeKeyManager {
  _isNoopTreeKeyManager = true;
  change = new rxjs__WEBPACK_IMPORTED_MODULE_11__.Subject();
  destroy() {
    this.change.complete();
  }
  onKeydown() {}
  getActiveItemIndex() {
    return null;
  }
  getActiveItem() {
    return null;
  }
  focusItem() {}
}
const NOOP_TREE_KEY_MANAGER_FACTORY_PROVIDER = {
  provide: _tree_key_manager_chunk_mjs__WEBPACK_IMPORTED_MODULE_12__.TREE_KEY_MANAGER,
  useFactory: () => () => new NoopTreeKeyManager()
};
class ConfigurableFocusTrap extends _a11y_module_chunk_mjs__WEBPACK_IMPORTED_MODULE_1__.FocusTrap {
  _focusTrapManager;
  _inertStrategy;
  get enabled() {
    return this._enabled;
  }
  set enabled(value) {
    this._enabled = value;
    if (this._enabled) {
      this._focusTrapManager.register(this);
    } else {
      this._focusTrapManager.deregister(this);
    }
  }
  constructor(_element, _checker, _ngZone, _document, _focusTrapManager, _inertStrategy, config, injector) {
    super(_element, _checker, _ngZone, _document, config.defer, injector);
    this._focusTrapManager = _focusTrapManager;
    this._inertStrategy = _inertStrategy;
    this._focusTrapManager.register(this);
  }
  destroy() {
    this._focusTrapManager.deregister(this);
    super.destroy();
  }
  _enable() {
    this._inertStrategy.preventFocus(this);
    this.toggleAnchors(true);
  }
  _disable() {
    this._inertStrategy.allowFocus(this);
    this.toggleAnchors(false);
  }
}
class EventListenerFocusTrapInertStrategy {
  _listener = null;
  preventFocus(focusTrap) {
    if (this._listener) {
      focusTrap._document.removeEventListener('focus', this._listener, true);
    }
    this._listener = e => this._trapFocus(focusTrap, e);
    focusTrap._ngZone.runOutsideAngular(() => {
      focusTrap._document.addEventListener('focus', this._listener, true);
    });
  }
  allowFocus(focusTrap) {
    if (!this._listener) {
      return;
    }
    focusTrap._document.removeEventListener('focus', this._listener, true);
    this._listener = null;
  }
  _trapFocus(focusTrap, event) {
    const target = event.target;
    const focusTrapRoot = focusTrap._element;
    if (target && !focusTrapRoot.contains(target) && !target.closest?.('div.cdk-overlay-pane')) {
      setTimeout(() => {
        if (focusTrap.enabled && !focusTrapRoot.contains(focusTrap._document.activeElement)) {
          focusTrap.focusFirstTabbableElement();
        }
      });
    }
  }
}
const FOCUS_TRAP_INERT_STRATEGY = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.InjectionToken('FOCUS_TRAP_INERT_STRATEGY');
class FocusTrapManager {
  _focusTrapStack = [];
  register(focusTrap) {
    this._focusTrapStack = this._focusTrapStack.filter(ft => ft !== focusTrap);
    let stack = this._focusTrapStack;
    if (stack.length) {
      stack[stack.length - 1]._disable();
    }
    stack.push(focusTrap);
    focusTrap._enable();
  }
  deregister(focusTrap) {
    focusTrap._disable();
    const stack = this._focusTrapStack;
    const i = stack.indexOf(focusTrap);
    if (i !== -1) {
      stack.splice(i, 1);
      if (stack.length) {
        stack[stack.length - 1]._enable();
      }
    }
  }
  static ɵfac = function FocusTrapManager_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || FocusTrapManager)();
  };
  static ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: FocusTrapManager,
    factory: FocusTrapManager.ɵfac,
    providedIn: 'root'
  });
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__.setClassMetadata(FocusTrapManager, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], null, null);
})();
class ConfigurableFocusTrapFactory {
  _checker = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_a11y_module_chunk_mjs__WEBPACK_IMPORTED_MODULE_1__.InteractivityChecker);
  _ngZone = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgZone);
  _focusTrapManager = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(FocusTrapManager);
  _document = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_3__.DOCUMENT);
  _inertStrategy;
  _injector = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injector);
  constructor() {
    const inertStrategy = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(FOCUS_TRAP_INERT_STRATEGY, {
      optional: true
    });
    this._inertStrategy = inertStrategy || new EventListenerFocusTrapInertStrategy();
  }
  create(element, config = {
    defer: false
  }) {
    let configObject;
    if (typeof config === 'boolean') {
      configObject = {
        defer: config
      };
    } else {
      configObject = config;
    }
    return new ConfigurableFocusTrap(element, this._checker, this._ngZone, this._document, this._focusTrapManager, this._inertStrategy, configObject, this._injector);
  }
  static ɵfac = function ConfigurableFocusTrapFactory_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || ConfigurableFocusTrapFactory)();
  };
  static ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: ConfigurableFocusTrapFactory,
    factory: ConfigurableFocusTrapFactory.ɵfac,
    providedIn: 'root'
  });
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__.setClassMetadata(ConfigurableFocusTrapFactory, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], () => [], null);
})();


/***/ },

/***/ 77022
/*!************************************************************************************!*\
  !*** ./node_modules/@angular/cdk/fesm2022/_activedescendant-key-manager-chunk.mjs ***!
  \************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActiveDescendantKeyManager: () => (/* binding */ ActiveDescendantKeyManager)
/* harmony export */ });
/* harmony import */ var _list_key_manager_chunk_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_list-key-manager-chunk.mjs */ 47441);

class ActiveDescendantKeyManager extends _list_key_manager_chunk_mjs__WEBPACK_IMPORTED_MODULE_0__.ListKeyManager {
  setActiveItem(index) {
    if (this.activeItem) {
      this.activeItem.setInactiveStyles();
    }
    super.setActiveItem(index);
    if (this.activeItem) {
      this.activeItem.setActiveStyles();
    }
  }
}


/***/ },

/***/ 80640
/*!*************************************************************!*\
  !*** ./node_modules/@angular/material/fesm2022/tooltip.mjs ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAT_TOOLTIP_DEFAULT_OPTIONS: () => (/* reexport safe */ _tooltip_chunk_mjs__WEBPACK_IMPORTED_MODULE_0__.MAT_TOOLTIP_DEFAULT_OPTIONS),
/* harmony export */   MAT_TOOLTIP_SCROLL_STRATEGY: () => (/* reexport safe */ _tooltip_chunk_mjs__WEBPACK_IMPORTED_MODULE_0__.MAT_TOOLTIP_SCROLL_STRATEGY),
/* harmony export */   MatTooltip: () => (/* reexport safe */ _tooltip_chunk_mjs__WEBPACK_IMPORTED_MODULE_0__.MatTooltip),
/* harmony export */   MatTooltipModule: () => (/* binding */ MatTooltipModule),
/* harmony export */   SCROLL_THROTTLE_MS: () => (/* reexport safe */ _tooltip_chunk_mjs__WEBPACK_IMPORTED_MODULE_0__.SCROLL_THROTTLE_MS),
/* harmony export */   TOOLTIP_PANEL_CLASS: () => (/* reexport safe */ _tooltip_chunk_mjs__WEBPACK_IMPORTED_MODULE_0__.TOOLTIP_PANEL_CLASS),
/* harmony export */   TooltipComponent: () => (/* reexport safe */ _tooltip_chunk_mjs__WEBPACK_IMPORTED_MODULE_0__.TooltipComponent),
/* harmony export */   getMatTooltipInvalidPositionError: () => (/* reexport safe */ _tooltip_chunk_mjs__WEBPACK_IMPORTED_MODULE_0__.getMatTooltipInvalidPositionError)
/* harmony export */ });
/* harmony import */ var _tooltip_chunk_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_tooltip-chunk.mjs */ 15575);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/a11y */ 5642);
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/bidi */ 63680);
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/overlay */ 92832);
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/scrolling */ 79975);

















class MatTooltipModule {
  static ɵfac = function MatTooltipModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || MatTooltipModule)();
  };
  static ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: MatTooltipModule
  });
  static ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__.A11yModule, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__.OverlayModule, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_4__.BidiModule, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_6__.CdkScrollableModule]
  });
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__.setClassMetadata(MatTooltipModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule,
    args: [{
      imports: [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__.A11yModule, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__.OverlayModule, _tooltip_chunk_mjs__WEBPACK_IMPORTED_MODULE_0__.MatTooltip, _tooltip_chunk_mjs__WEBPACK_IMPORTED_MODULE_0__.TooltipComponent],
      exports: [_tooltip_chunk_mjs__WEBPACK_IMPORTED_MODULE_0__.MatTooltip, _tooltip_chunk_mjs__WEBPACK_IMPORTED_MODULE_0__.TooltipComponent, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_4__.BidiModule, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_6__.CdkScrollableModule]
    }]
  }], null, null);
})();


/***/ },

/***/ 80922
/*!*********************************************************************************!*\
  !*** ./src/app/features/admin/admin-promo-codes/admin-promo-codes.component.ts ***!
  \*********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminPromoCodesComponent: () => (/* binding */ AdminPromoCodesComponent)
/* harmony export */ });
/* harmony import */ var C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 2510);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _app_core_firebase_promo_code_repository__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @app/core/firebase/promo-code.repository */ 77535);
/* harmony import */ var _app_core_firebase_catalog_repository__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @app/core/firebase/catalog.repository */ 53521);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 79748);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ 48503);








const _forTrack0 = ($index, $item) => $item.id;
function AdminPromoCodesComponent_option_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "option", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const cat_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", cat_r1.prefix);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](cat_r1.title);
  }
}
function AdminPromoCodesComponent_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "ADMIN_PROMO_EMPTY"));
  }
}
function AdminPromoCodesComponent_For_61_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](1, "translate");
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" \u25CF ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](1, 1, "ADMIN_PROMO_STATUS_ACTIVE"), " ");
  }
}
function AdminPromoCodesComponent_For_61_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](1, "translate");
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" \u25F7 ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](1, 1, "ADMIN_PROMO_STATUS_UPCOMING"), " ");
  }
}
function AdminPromoCodesComponent_For_61_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](1, "translate");
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" \u2715 ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](1, 1, "ADMIN_PROMO_STATUS_EXPIRED"), " ");
  }
}
function AdminPromoCodesComponent_For_61_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 29)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function AdminPromoCodesComponent_For_61_Conditional_16_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r2);
      const promo_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r3.confirmDelete(promo_r3.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function AdminPromoCodesComponent_For_61_Conditional_16_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r2);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r3.cancelDelete());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 3, "ADMIN_PROMO_DELETE_CONFIRM"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](6, 5, "ADMIN_PROMO_DELETE_YES"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](9, 7, "CANCEL"), " ");
  }
}
function AdminPromoCodesComponent_For_61_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function AdminPromoCodesComponent_For_61_Conditional_17_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r5);
      const promo_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r3.requestDelete(promo_r3.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "i", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](1, 1, "ADMIN_PROMO_DELETE_BTN"));
  }
}
function AdminPromoCodesComponent_For_61_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 22)(1, "div", 23)(2, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](10, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](11, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵconditionalCreate"](13, AdminPromoCodesComponent_For_61_Conditional_13_Template, 2, 3)(14, AdminPromoCodesComponent_For_61_Conditional_14_Template, 2, 3)(15, AdminPromoCodesComponent_For_61_Conditional_15_Template, 2, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵconditionalCreate"](16, AdminPromoCodesComponent_For_61_Conditional_16_Template, 10, 9, "div", 29)(17, AdminPromoCodesComponent_For_61_Conditional_17_Template, 3, 3, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const promo_r3 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("promo-row--active", ctx_r3.getPromoDisplayStatus(promo_r3) === "active")("promo-row--expired", ctx_r3.getPromoDisplayStatus(promo_r3) === "expired");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](promo_r3.code);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("\u2212", promo_r3.discountPercent, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r3.getCategoryTitle(promo_r3.categoryId));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](10, 17, promo_r3.startDate, "dd/MM/yy"), " \u2192 ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](11, 20, promo_r3.endDate, "dd/MM/yy"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("promo-status--active", ctx_r3.getPromoDisplayStatus(promo_r3) === "active")("promo-status--upcoming", ctx_r3.getPromoDisplayStatus(promo_r3) === "upcoming")("promo-status--expired", ctx_r3.getPromoDisplayStatus(promo_r3) === "expired");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵconditional"](ctx_r3.getPromoDisplayStatus(promo_r3) === "active" ? 13 : ctx_r3.getPromoDisplayStatus(promo_r3) === "upcoming" ? 14 : 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵconditional"](ctx_r3.pendingDeleteId === promo_r3.id ? 16 : 17);
  }
}
class AdminPromoCodesComponent {
  constructor(promoRepo, catalogRepo, cdr) {
    this.promoRepo = promoRepo;
    this.catalogRepo = catalogRepo;
    this.cdr = cdr;
    this.promoCodes = [];
    this.publishedCategories = [];
    this.isSaving = false;
    this.pendingDeleteId = null;
    this.newPromoForm = {
      code: '',
      discountPercent: 10,
      categoryId: '',
      startDate: '',
      endDate: ''
    };
    this.subs = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subscription();
  }
  ngOnInit() {
    // Écoute la liste des codes promo en temps réel
    this.subs.add(this.promoRepo.watchAll().subscribe(list => {
      this.promoCodes = list;
      this.cdr.markForCheck();
    }));
    // Charge les catégories publiées pour le select du formulaire
    this.subs.add(this.catalogRepo.watchCategories().subscribe(categories => {
      this.publishedCategories = categories.filter(c => c.published);
      // Pré-sélectionne la première catégorie si le champ est vide
      if (!this.newPromoForm.categoryId && this.publishedCategories.length) {
        this.newPromoForm.categoryId = this.publishedCategories[0].prefix;
      }
      this.cdr.markForCheck();
    }));
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  // ── Validation du formulaire ───────────────────────────────────────────────
  get isFormValid() {
    const {
      code,
      discountPercent,
      categoryId,
      startDate,
      endDate
    } = this.newPromoForm;
    return code.trim().length >= 3 && discountPercent >= 1 && discountPercent <= 100 && !!categoryId && !!startDate && !!endDate && new Date(startDate) <= new Date(endDate);
  }
  // ── Actions CRUD ───────────────────────────────────────────────────────────
  /** Crée le code promo dans Firebase et réinitialise le formulaire. */
  saveNewPromo() {
    var _this = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this.isFormValid || _this.isSaving) return;
      _this.isSaving = true;
      try {
        yield _this.promoRepo.create({
          code: _this.newPromoForm.code.trim().toUpperCase(),
          discountPercent: _this.newPromoForm.discountPercent,
          categoryId: _this.newPromoForm.categoryId,
          // La date de fin est inclusive : on force 23:59:59 pour couvrir toute la journée
          startDate: new Date(_this.newPromoForm.startDate).getTime(),
          endDate: new Date(_this.newPromoForm.endDate + 'T23:59:59').getTime(),
          createdAt: Date.now()
        });
        _this.newPromoForm = {
          code: '',
          discountPercent: 10,
          categoryId: _this.newPromoForm.categoryId,
          startDate: '',
          endDate: ''
        };
      } finally {
        _this.isSaving = false;
        _this.cdr.markForCheck();
      }
    })();
  }
  requestDelete(promoId) {
    this.pendingDeleteId = promoId;
    this.cdr.markForCheck();
  }
  cancelDelete() {
    this.pendingDeleteId = null;
    this.cdr.markForCheck();
  }
  confirmDelete(promoId) {
    var _this2 = this;
    return (0,C_Users_wylfr_Documents_travail_delice_eternel_gabon_constantine_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this2.promoRepo.delete(promoId);
      _this2.pendingDeleteId = null;
      _this2.cdr.markForCheck();
    })();
  }
  // ── Helpers d'affichage ────────────────────────────────────────────────────
  getPromoDisplayStatus(promo) {
    const now = Date.now();
    if (now < promo.startDate) return 'upcoming';
    if (now > promo.endDate) return 'expired';
    return 'active';
  }
  getCategoryTitle(categoryId) {
    return this.publishedCategories.find(c => c.prefix === categoryId)?.title ?? categoryId;
  }
  static {
    this.ɵfac = function AdminPromoCodesComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AdminPromoCodesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_app_core_firebase_promo_code_repository__WEBPACK_IMPORTED_MODULE_5__.PromoCodeRepository), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_app_core_firebase_catalog_repository__WEBPACK_IMPORTED_MODULE_6__.CatalogRepository), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ChangeDetectorRef));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
      type: AdminPromoCodesComponent,
      selectors: [["app-admin-promo-codes"]],
      standalone: false,
      decls: 62,
      vars: 43,
      consts: [[1, "promo-section"], [1, "promo-title"], [1, "promo-form-card"], [1, "promo-form-title"], [1, "promo-form-grid"], [1, "promo-field"], [1, "promo-label"], [1, "req"], ["type", "text", "maxlength", "20", 1, "promo-input", "promo-input--upper", 3, "ngModelChange", "ngModel", "placeholder"], ["type", "number", "min", "1", "max", "100", "step", "1", 1, "promo-input", 3, "ngModelChange", "ngModel"], [1, "promo-field", "promo-field--full"], [1, "promo-select", 3, "ngModelChange", "ngModel"], ["value", "", "disabled", ""], [3, "value", 4, "ngFor", "ngForOf"], ["type", "date", 1, "promo-input", 3, "ngModelChange", "ngModel"], [1, "promo-form-actions"], [1, "promo-btn", "promo-btn--save", 3, "click", "disabled"], [1, "fas", "fa-plus", "mr-1"], [1, "promo-list-card"], [1, "promo-empty"], [1, "promo-row", 3, "promo-row--active", "promo-row--expired"], [3, "value"], [1, "promo-row"], [1, "promo-row-main"], [1, "promo-code-badge"], [1, "promo-discount"], [1, "promo-cat"], [1, "promo-dates"], [1, "promo-status-badge"], [1, "promo-confirm-delete"], [1, "promo-btn", "promo-btn--delete", 3, "title"], [1, "promo-btn", "promo-btn--danger-sm", 3, "click"], [1, "promo-btn", "promo-btn--neutral-sm", 3, "click"], [1, "promo-btn", "promo-btn--delete", 3, "click", "title"], [1, "fas", "fa-trash-alt"]],
      template: function AdminPromoCodesComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "h2", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 2)(5, "h3", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](7, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 4)(9, "div", 5)(10, "label", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](12, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "span", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14, "*");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "input", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](16, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function AdminPromoCodesComponent_Template_input_ngModelChange_15_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx.newPromoForm.code, $event) || (ctx.newPromoForm.code = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "div", 5)(18, "label", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](19);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](20, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "span", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](22, "*");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](23, "input", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function AdminPromoCodesComponent_Template_input_ngModelChange_23_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx.newPromoForm.discountPercent, $event) || (ctx.newPromoForm.discountPercent = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](24, "div", 10)(25, "label", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](26);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](27, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](28, "span", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](29, "*");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](30, "select", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function AdminPromoCodesComponent_Template_select_ngModelChange_30_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx.newPromoForm.categoryId, $event) || (ctx.newPromoForm.categoryId = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](31, "option", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](32);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](33, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](34, AdminPromoCodesComponent_option_34_Template, 2, 2, "option", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](35, "div", 5)(36, "label", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](37);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](38, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](39, "span", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](40, "*");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](41, "input", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function AdminPromoCodesComponent_Template_input_ngModelChange_41_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx.newPromoForm.startDate, $event) || (ctx.newPromoForm.startDate = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](42, "div", 5)(43, "label", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](44);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](45, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](46, "span", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](47, "*");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](48, "input", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function AdminPromoCodesComponent_Template_input_ngModelChange_48_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx.newPromoForm.endDate, $event) || (ctx.newPromoForm.endDate = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](49, "div", 15)(50, "button", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function AdminPromoCodesComponent_Template_button_click_50_listener() {
            return ctx.saveNewPromo();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](51, "i", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](52);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](53, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](54, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](55, "div", 18)(56, "h3", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](57);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](58, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵconditionalCreate"](59, AdminPromoCodesComponent_Conditional_59_Template, 3, 3, "p", 19);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrepeaterCreate"](60, AdminPromoCodesComponent_For_61_Template, 18, 23, "div", 20, _forTrack0);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 19, "ADMIN_PROMO_TITLE"));
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](7, 21, "ADMIN_PROMO_NEW_TITLE"));
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](12, 23, "ADMIN_PROMO_CODE_LABEL"), " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx.newPromoForm.code);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](16, 25, "ADMIN_PROMO_CODE_PLACEHOLDER"));
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](20, 27, "ADMIN_PROMO_DISCOUNT_LABEL"), " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx.newPromoForm.discountPercent);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](27, 29, "ADMIN_PROMO_CATEGORY_LABEL"), " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx.newPromoForm.categoryId);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](33, 31, "ADMIN_PROMO_CATEGORY_PLACEHOLDER"));
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.publishedCategories);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](38, 33, "ADMIN_PROMO_START_DATE_LABEL"), " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx.newPromoForm.startDate);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](45, 35, "ADMIN_PROMO_END_DATE_LABEL"), " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx.newPromoForm.endDate);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", !ctx.isFormValid || ctx.isSaving);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx.isSaving ? _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](53, 37, "ADMIN_PROMO_SAVING") : _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](54, 39, "ADMIN_PROMO_CREATE_BTN"), " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](58, 41, "ADMIN_PROMO_LIST_TITLE"));
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵconditional"](ctx.promoCodes.length === 0 ? 59 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrepeater"](ctx.promoCodes);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.MaxValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_7__.DatePipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslatePipe],
      styles: [".promo-section[_ngcontent-%COMP%] {\n  padding: 24px 0;\n  max-width: 820px;\n}\n\n.promo-title[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 700;\n  color: #2c3e50;\n  margin-bottom: 20px;\n}\n\n.promo-form-card[_ngcontent-%COMP%], \n.promo-list-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e8edf2;\n  border-radius: 10px;\n  padding: 20px 24px;\n  margin-bottom: 20px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n}\n\n.promo-form-title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: #2c3e50;\n  margin: 0 0 16px;\n}\n\n.promo-form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n@media (max-width: 540px) {\n  .promo-form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n.promo-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.promo-field--full[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n\n.promo-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #2c3e50;\n}\n.promo-label[_ngcontent-%COMP%]   .req[_ngcontent-%COMP%] {\n  color: #e74c3c;\n}\n\n.promo-input[_ngcontent-%COMP%], \n.promo-select[_ngcontent-%COMP%] {\n  padding: 8px 10px;\n  border: 1px solid #ced4da;\n  border-radius: 6px;\n  font-size: 14px;\n  font-family: inherit;\n  outline: none;\n  background: #fff;\n  transition: border-color 0.15s;\n}\n.promo-input[_ngcontent-%COMP%]:focus, \n.promo-select[_ngcontent-%COMP%]:focus {\n  border-color: #148f77;\n}\n\n.promo-input--upper[_ngcontent-%COMP%] {\n  text-transform: uppercase;\n}\n\n.promo-form-actions[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  display: flex;\n  justify-content: flex-end;\n}\n\n.promo-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 8px 16px;\n  transition: background 0.15s;\n}\n.promo-btn--save[_ngcontent-%COMP%] {\n  background: #148f77;\n  color: #fff;\n}\n.promo-btn--save[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #117a65;\n}\n.promo-btn--save[_ngcontent-%COMP%]:disabled {\n  background: #b2bec3;\n  cursor: not-allowed;\n}\n.promo-btn--delete[_ngcontent-%COMP%] {\n  background: none;\n  border: 1px solid #e0e6ed;\n  color: #8a9ab0;\n  padding: 6px 10px;\n}\n.promo-btn--delete[_ngcontent-%COMP%]:hover {\n  border-color: #e74c3c;\n  color: #e74c3c;\n}\n.promo-btn--danger-sm[_ngcontent-%COMP%] {\n  background: #e74c3c;\n  color: #fff;\n  padding: 5px 12px;\n  font-size: 12px;\n}\n.promo-btn--danger-sm[_ngcontent-%COMP%]:hover {\n  background: #c0392b;\n}\n.promo-btn--neutral-sm[_ngcontent-%COMP%] {\n  background: #f0f2f5;\n  color: #2c3e50;\n  padding: 5px 12px;\n  font-size: 12px;\n}\n.promo-btn--neutral-sm[_ngcontent-%COMP%]:hover {\n  background: #dde1e7;\n}\n\n.promo-empty[_ngcontent-%COMP%] {\n  color: #8a9ab0;\n  font-size: 13px;\n  font-style: italic;\n}\n\n.promo-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 12px 0;\n  border-bottom: 1px solid #f0f2f5;\n  border-left: 3px solid #dee2e6;\n  padding-left: 12px;\n}\n.promo-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.promo-row--active[_ngcontent-%COMP%] {\n  border-left-color: #148f77;\n}\n.promo-row--expired[_ngcontent-%COMP%] {\n  border-left-color: #bdc3c7;\n  opacity: 0.65;\n}\n\n.promo-row-main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n  flex: 1;\n}\n\n.promo-code-badge[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-size: 14px;\n  font-weight: 700;\n  background: #f0faf7;\n  color: #0e6655;\n  padding: 2px 8px;\n  border-radius: 6px;\n  letter-spacing: 1px;\n}\n\n.promo-discount[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: #148f77;\n}\n\n.promo-cat[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #2c3e50;\n}\n\n.promo-dates[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #8a9ab0;\n}\n\n.promo-status-badge[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 10px;\n}\n.promo-status-badge.promo-status--active[_ngcontent-%COMP%] {\n  background: #e8f8f5;\n  color: #148f77;\n}\n.promo-status-badge.promo-status--upcoming[_ngcontent-%COMP%] {\n  background: #fef9e7;\n  color: #b7950b;\n}\n.promo-status-badge.promo-status--expired[_ngcontent-%COMP%] {\n  background: #f4f4f4;\n  color: #8a9ab0;\n}\n\n.promo-confirm-delete[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 12px;\n  color: #e74c3c;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvYWRtaW4vYWRtaW4tcHJvbW8tY29kZXMvYWRtaW4tcHJvbW8tY29kZXMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUlBOztFQUVFLGdCQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSx5Q0FBQTtBQURGOztBQUlBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0FBREY7O0FBTUE7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxTQUFBO0FBSEY7QUFLRTtFQUxGO0lBSzhCLDBCQUFBO0VBRDVCO0FBQ0Y7O0FBR0E7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxRQUFBO0FBQUY7QUFFRTtFQUFVLGlCQUFBO0FBQ1o7O0FBRUE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBQ0Y7QUFDRTtFQUFPLGNBQUE7QUFFVDs7QUFDQTs7RUFFRSxpQkFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0Esb0JBQUE7RUFDQSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSw4QkFBQTtBQUVGO0FBQUU7O0VBQVUscUJBQUE7QUFJWjs7QUFEQTtFQUFzQix5QkFBQTtBQUt0Qjs7QUFIQTtFQUNFLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLHlCQUFBO0FBTUY7O0FBREE7RUFDRSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLDRCQUFBO0FBSUY7QUFGRTtFQUNFLG1CQUFBO0VBQ0EsV0FBQTtBQUlKO0FBSEk7RUFBeUIsbUJBQUE7QUFNN0I7QUFMSTtFQUFhLG1CQUFBO0VBQXFCLG1CQUFBO0FBU3RDO0FBTkU7RUFDRSxnQkFBQTtFQUNBLHlCQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0FBUUo7QUFQSTtFQUFVLHFCQUFBO0VBQXVCLGNBQUE7QUFXckM7QUFSRTtFQUNFLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtBQVVKO0FBVEk7RUFBVSxtQkFBQTtBQVlkO0FBVEU7RUFDRSxtQkFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7QUFXSjtBQVZJO0VBQVUsbUJBQUE7QUFhZDs7QUFQQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUFVRjs7QUFQQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDhCQUFBO0VBQ0EsU0FBQTtFQUNBLGVBQUE7RUFDQSxnQ0FBQTtFQUNBLDhCQUFBO0VBQ0Esa0JBQUE7QUFVRjtBQVJFO0VBQWUsbUJBQUE7QUFXakI7QUFURTtFQUFZLDBCQUFBO0FBWWQ7QUFYRTtFQUFhLDBCQUFBO0VBQTRCLGFBQUE7QUFlM0M7O0FBWkE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsZUFBQTtFQUNBLE9BQUE7QUFlRjs7QUFaQTtFQUNFLHNCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FBZUY7O0FBWkE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBZUY7O0FBWkE7RUFDRSxlQUFBO0VBQ0EsY0FBQTtBQWVGOztBQVpBO0VBQ0UsZUFBQTtFQUNBLGNBQUE7QUFlRjs7QUFaQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFlRjtBQWJFO0VBQTJCLG1CQUFBO0VBQXFCLGNBQUE7QUFpQmxEO0FBaEJFO0VBQTJCLG1CQUFBO0VBQXFCLGNBQUE7QUFvQmxEO0FBbkJFO0VBQTJCLG1CQUFBO0VBQXFCLGNBQUE7QUF1QmxEOztBQXBCQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtBQXVCRiIsInNvdXJjZXNDb250ZW50IjpbIi5wcm9tby1zZWN0aW9uIHtcbiAgcGFkZGluZzogMjRweCAwO1xuICBtYXgtd2lkdGg6IDgyMHB4O1xufVxuXG4ucHJvbW8tdGl0bGUge1xuICBmb250LXNpemU6IDIwcHg7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjMmMzZTUwO1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuXG4vLyDDosKUwoDDosKUwoAgQ2FydGVzIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuXG4ucHJvbW8tZm9ybS1jYXJkLFxuLnByb21vLWxpc3QtY2FyZCB7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlOGVkZjI7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIHBhZGRpbmc6IDIwcHggMjRweDtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XG59XG5cbi5wcm9tby1mb3JtLXRpdGxlIHtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBmb250LXdlaWdodDogNzAwO1xuICBjb2xvcjogIzJjM2U1MDtcbiAgbWFyZ2luOiAwIDAgMTZweDtcbn1cblxuLy8gw6LClMKAw6LClMKAIEZvcm11bGFpcmUgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXG5cbi5wcm9tby1mb3JtLWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XG4gIGdhcDogMTRweDtcblxuICBAbWVkaWEgKG1heC13aWR0aDogNTQwcHgpIHsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7IH1cbn1cblxuLnByb21vLWZpZWxkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiA0cHg7XG5cbiAgJi0tZnVsbCB7IGdyaWQtY29sdW1uOiAxIC8gLTE7IH1cbn1cblxuLnByb21vLWxhYmVsIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzJjM2U1MDtcblxuICAucmVxIHsgY29sb3I6ICNlNzRjM2M7IH1cbn1cblxuLnByb21vLWlucHV0LFxuLnByb21vLXNlbGVjdCB7XG4gIHBhZGRpbmc6IDhweCAxMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2VkNGRhO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjE1cztcblxuICAmOmZvY3VzIHsgYm9yZGVyLWNvbG9yOiAjMTQ4Zjc3OyB9XG59XG5cbi5wcm9tby1pbnB1dC0tdXBwZXIgeyB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOyB9XG5cbi5wcm9tby1mb3JtLWFjdGlvbnMge1xuICBtYXJnaW4tdG9wOiAxNnB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xufVxuXG4vLyDDosKUwoDDosKUwoAgQm91dG9ucyDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcblxuLnByb21vLWJ0biB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDVweDtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nOiA4cHggMTZweDtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjE1cztcblxuICAmLS1zYXZlIHtcbiAgICBiYWNrZ3JvdW5kOiAjMTQ4Zjc3O1xuICAgIGNvbG9yOiAjZmZmO1xuICAgICY6aG92ZXI6bm90KDpkaXNhYmxlZCkgeyBiYWNrZ3JvdW5kOiAjMTE3YTY1OyB9XG4gICAgJjpkaXNhYmxlZCB7IGJhY2tncm91bmQ6ICNiMmJlYzM7IGN1cnNvcjogbm90LWFsbG93ZWQ7IH1cbiAgfVxuXG4gICYtLWRlbGV0ZSB7XG4gICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZTBlNmVkO1xuICAgIGNvbG9yOiAjOGE5YWIwO1xuICAgIHBhZGRpbmc6IDZweCAxMHB4O1xuICAgICY6aG92ZXIgeyBib3JkZXItY29sb3I6ICNlNzRjM2M7IGNvbG9yOiAjZTc0YzNjOyB9XG4gIH1cblxuICAmLS1kYW5nZXItc20ge1xuICAgIGJhY2tncm91bmQ6ICNlNzRjM2M7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgcGFkZGluZzogNXB4IDEycHg7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgICY6aG92ZXIgeyBiYWNrZ3JvdW5kOiAjYzAzOTJiOyB9XG4gIH1cblxuICAmLS1uZXV0cmFsLXNtIHtcbiAgICBiYWNrZ3JvdW5kOiAjZjBmMmY1O1xuICAgIGNvbG9yOiAjMmMzZTUwO1xuICAgIHBhZGRpbmc6IDVweCAxMnB4O1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAmOmhvdmVyIHsgYmFja2dyb3VuZDogI2RkZTFlNzsgfVxuICB9XG59XG5cbi8vIMOiwpTCgMOiwpTCgCBMaXN0ZSDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcblxuLnByb21vLWVtcHR5IHtcbiAgY29sb3I6ICM4YTlhYjA7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xufVxuXG4ucHJvbW8tcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDEycHg7XG4gIHBhZGRpbmc6IDEycHggMDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmMGYyZjU7XG4gIGJvcmRlci1sZWZ0OiAzcHggc29saWQgI2RlZTJlNjtcbiAgcGFkZGluZy1sZWZ0OiAxMnB4O1xuXG4gICY6bGFzdC1jaGlsZCB7IGJvcmRlci1ib3R0b206IG5vbmU7IH1cblxuICAmLS1hY3RpdmUgeyBib3JkZXItbGVmdC1jb2xvcjogIzE0OGY3NzsgfVxuICAmLS1leHBpcmVkIHsgYm9yZGVyLWxlZnQtY29sb3I6ICNiZGMzYzc7IG9wYWNpdHk6IDAuNjU7IH1cbn1cblxuLnByb21vLXJvdy1tYWluIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGZsZXg6IDE7XG59XG5cbi5wcm9tby1jb2RlLWJhZGdlIHtcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogNzAwO1xuICBiYWNrZ3JvdW5kOiAjZjBmYWY3O1xuICBjb2xvcjogIzBlNjY1NTtcbiAgcGFkZGluZzogMnB4IDhweDtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBsZXR0ZXItc3BhY2luZzogMXB4O1xufVxuXG4ucHJvbW8tZGlzY291bnQge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjMTQ4Zjc3O1xufVxuXG4ucHJvbW8tY2F0IHtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBjb2xvcjogIzJjM2U1MDtcbn1cblxuLnByb21vLWRhdGVzIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjb2xvcjogIzhhOWFiMDtcbn1cblxuLnByb21vLXN0YXR1cy1iYWRnZSB7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgcGFkZGluZzogMnB4IDhweDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcblxuICAmLnByb21vLXN0YXR1cy0tYWN0aXZlICAgeyBiYWNrZ3JvdW5kOiAjZThmOGY1OyBjb2xvcjogIzE0OGY3NzsgfVxuICAmLnByb21vLXN0YXR1cy0tdXBjb21pbmcgeyBiYWNrZ3JvdW5kOiAjZmVmOWU3OyBjb2xvcjogI2I3OTUwYjsgfVxuICAmLnByb21vLXN0YXR1cy0tZXhwaXJlZCAgeyBiYWNrZ3JvdW5kOiAjZjRmNGY0OyBjb2xvcjogIzhhOWFiMDsgfVxufVxuXG4ucHJvbW8tY29uZmlybS1kZWxldGUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjb2xvcjogI2U3NGMzYztcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
      changeDetection: 0
    });
  }
}

/***/ },

/***/ 86576
/*!*****************************************************************!*\
  !*** ./node_modules/@angular/cdk/fesm2022/coercion-private.mjs ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   coerceObservable: () => (/* binding */ coerceObservable)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 72551);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 59452);

function coerceObservable(data) {
  if (!(0,rxjs__WEBPACK_IMPORTED_MODULE_0__.isObservable)(data)) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(data);
  }
  return data;
}


/***/ }

}]);
//# sourceMappingURL=src_app_features_admin_admin_module_ts.js.map