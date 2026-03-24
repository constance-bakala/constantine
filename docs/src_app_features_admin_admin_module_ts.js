"use strict";
(self["webpackChunkconstantine"] = self["webpackChunkconstantine"] || []).push([["src_app_features_admin_admin_module_ts"],{

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
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-quill */ 12041);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ 12587);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 84175);
/* harmony import */ var _admin_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./admin-routing.module */ 15436);
/* harmony import */ var _admin_dashboard_admin_dashboard_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin-dashboard/admin-dashboard.component */ 36330);
/* harmony import */ var _admin_catalog_admin_catalog_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./admin-catalog/admin-catalog.component */ 71638);
/* harmony import */ var _admin_settings_admin_settings_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./admin-settings/admin-settings.component */ 58454);
/* harmony import */ var _confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./confirm-dialog/confirm-dialog.component */ 38830);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 36124);












class AdminModule {
  static {
    this.ɵfac = function AdminModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AdminModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineNgModule"]({
      type: AdminModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjector"]({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormsModule, _admin_routing_module__WEBPACK_IMPORTED_MODULE_5__.AdminRoutingModule, ngx_quill__WEBPACK_IMPORTED_MODULE_2__.QuillModule.forRoot(), _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButtonModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsetNgModuleScope"](AdminModule, {
    declarations: [_admin_dashboard_admin_dashboard_component__WEBPACK_IMPORTED_MODULE_6__.AdminDashboardComponent, _admin_catalog_admin_catalog_component__WEBPACK_IMPORTED_MODULE_7__.AdminCatalogComponent, _admin_settings_admin_settings_component__WEBPACK_IMPORTED_MODULE_8__.AdminSettingsComponent, _confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_9__.ConfirmDialogComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormsModule, _admin_routing_module__WEBPACK_IMPORTED_MODULE_5__.AdminRoutingModule, ngx_quill__WEBPACK_IMPORTED_MODULE_2__.QuillModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButtonModule]
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













function AdminDashboardComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "app-admin-catalog");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminDashboardComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "app-admin-settings");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminDashboardComponent_ng_container_13_div_1_Template(rf, ctx) {
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
function AdminDashboardComponent_ng_container_13_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Chargement des commandes\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminDashboardComponent_ng_container_13_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Aucune commande pour le moment.");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminDashboardComponent_ng_container_13_ng_container_4_tr_23_span_17_ng_container_1_Template(rf, ctx) {
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
function AdminDashboardComponent_ng_container_13_ng_container_4_tr_23_span_17_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "\u2708\uFE0F Exp\u00E9dition");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
  }
}
function AdminDashboardComponent_ng_container_13_ng_container_4_tr_23_span_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, AdminDashboardComponent_ng_container_13_ng_container_4_tr_23_span_17_ng_container_1_Template, 2, 1, "ng-container", 5)(2, AdminDashboardComponent_ng_container_13_ng_container_4_tr_23_span_17_ng_container_2_Template, 2, 0, "ng-container", 5);
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
function AdminDashboardComponent_ng_container_13_ng_container_4_tr_23_span_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "\u2014");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminDashboardComponent_ng_container_13_ng_container_4_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "tr", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_13_ng_container_4_tr_23_Template_tr_click_0_listener() {
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
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](17, AdminDashboardComponent_ng_container_13_ng_container_4_tr_23_span_17_Template, 3, 6, "span", 31)(18, AdminDashboardComponent_ng_container_13_ng_container_4_tr_23_span_18_Template, 2, 0, "span", 5);
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
function AdminDashboardComponent_ng_container_13_ng_container_4_nav_24_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_13_ng_container_4_nav_24_button_3_Template_button_click_0_listener() {
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
function AdminDashboardComponent_ng_container_13_ng_container_4_nav_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "nav", 35)(1, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_13_ng_container_4_nav_24_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.goToOrdersPage(ctx_r0.ordersPage - 1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "\u2039");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, AdminDashboardComponent_ng_container_13_ng_container_4_nav_24_button_3_Template, 2, 3, "button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_13_ng_container_4_nav_24_Template_button_click_4_listener() {
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
function AdminDashboardComponent_ng_container_13_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 14)(2, "input", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function AdminDashboardComponent_ng_container_13_ng_container_4_Template_input_ngModelChange_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r2);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx_r0.ordersFilter, $event) || (ctx_r0.ordersFilter = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function AdminDashboardComponent_ng_container_13_ng_container_4_Template_input_ngModelChange_2_listener() {
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
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](23, AdminDashboardComponent_ng_container_13_ng_container_4_tr_23_Template, 22, 18, "tr", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](24, AdminDashboardComponent_ng_container_13_ng_container_4_nav_24_Template, 8, 6, "nav", 21);
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
function AdminDashboardComponent_ng_container_13_ng_container_5_div_22_ng_container_4_Template(rf, ctx) {
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
function AdminDashboardComponent_ng_container_13_ng_container_5_div_22_ng_container_5_Template(rf, ctx) {
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
function AdminDashboardComponent_ng_container_13_ng_container_5_div_22_span_6_Template(rf, ctx) {
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
function AdminDashboardComponent_ng_container_13_ng_container_5_div_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 68)(1, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Livraison :");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, AdminDashboardComponent_ng_container_13_ng_container_5_div_22_ng_container_4_Template, 2, 1, "ng-container", 5)(5, AdminDashboardComponent_ng_container_13_ng_container_5_div_22_ng_container_5_Template, 2, 1, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](6, AdminDashboardComponent_ng_container_13_ng_container_5_div_22_span_6_Template, 4, 2, "span", 69);
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
function AdminDashboardComponent_ng_container_13_ng_container_5_div_23_span_9_Template(rf, ctx) {
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
function AdminDashboardComponent_ng_container_13_ng_container_5_div_23_Template(rf, ctx) {
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
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](9, AdminDashboardComponent_ng_container_13_ng_container_5_div_23_span_9_Template, 3, 1, "span", 5);
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
function AdminDashboardComponent_ng_container_13_ng_container_5_div_25_img_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "img", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_13_ng_container_5_div_25_img_4_Template_img_click_0_listener($event) {
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
function AdminDashboardComponent_ng_container_13_ng_container_5_div_25_span_7_Template(rf, ctx) {
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
function AdminDashboardComponent_ng_container_13_ng_container_5_div_25_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r0.pricing.format(item_r12.price * ((item_r12.basketInfos == null ? null : item_r12.basketInfos.selectedQuantity) ?? 1)), " ");
  }
}
function AdminDashboardComponent_ng_container_13_ng_container_5_div_25_div_9_div_2_Template(rf, ctx) {
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
function AdminDashboardComponent_ng_container_13_ng_container_5_div_25_div_9_div_3_Template(rf, ctx) {
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
function AdminDashboardComponent_ng_container_13_ng_container_5_div_25_div_9_div_8_Template(rf, ctx) {
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
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r0.pricing.format(item_r12.price));
  }
}
function AdminDashboardComponent_ng_container_13_ng_container_5_div_25_div_9_div_9_Template(rf, ctx) {
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
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r0.pricing.format((item_r12.price || 0) * ((item_r12.basketInfos == null ? null : item_r12.basketInfos.selectedQuantity) ?? 1)));
  }
}
function AdminDashboardComponent_ng_container_13_ng_container_5_div_25_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 85)(1, "div", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, AdminDashboardComponent_ng_container_13_ng_container_5_div_25_div_9_div_2_Template, 4, 1, "div", 5)(3, AdminDashboardComponent_ng_container_13_ng_container_5_div_25_div_9_div_3_Template, 4, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div")(5, "span", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "Quantit\u00E9 :");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, AdminDashboardComponent_ng_container_13_ng_container_5_div_25_div_9_div_8_Template, 4, 1, "div", 5)(9, AdminDashboardComponent_ng_container_13_ng_container_5_div_25_div_9_div_9_Template, 4, 1, "div", 5);
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
function AdminDashboardComponent_ng_container_13_ng_container_5_div_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 74)(1, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_13_ng_container_5_div_25_Template_div_click_1_listener() {
      const i_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r9).index;
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.toggleItem(ctx_r0.selectedOrder.id, i_r10));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "span", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, AdminDashboardComponent_ng_container_13_ng_container_5_div_25_img_4_Template, 1, 2, "img", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "span", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](7, AdminDashboardComponent_ng_container_13_ng_container_5_div_25_span_7_Template, 2, 1, "span", 79)(8, AdminDashboardComponent_ng_container_13_ng_container_5_div_25_span_8_Template, 2, 1, "span", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](9, AdminDashboardComponent_ng_container_13_ng_container_5_div_25_div_9_Template, 10, 5, "div", 81);
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
function AdminDashboardComponent_ng_container_13_ng_container_5_div_31_Template(rf, ctx) {
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
function AdminDashboardComponent_ng_container_13_ng_container_5_div_32_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r0.formatXAF(ctx_r0.selectedOrder.shippingCost));
  }
}
function AdminDashboardComponent_ng_container_13_ng_container_5_div_32_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "\u00C0 renseigner");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminDashboardComponent_ng_container_13_ng_container_5_div_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 54)(1, "span", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Frais de port :");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, AdminDashboardComponent_ng_container_13_ng_container_5_div_32_span_3_Template, 2, 1, "span", 88)(4, AdminDashboardComponent_ng_container_13_ng_container_5_div_32_span_4_Template, 2, 0, "span", 89);
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
function AdminDashboardComponent_ng_container_13_ng_container_5_button_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_13_ng_container_5_button_41_Template_button_click_0_listener() {
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
function AdminDashboardComponent_ng_container_13_ng_container_5_button_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_13_ng_container_5_button_42_Template_button_click_0_listener() {
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
function AdminDashboardComponent_ng_container_13_ng_container_5_div_43_span_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Veuillez saisir un montant valide (\u2265 0).");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminDashboardComponent_ng_container_13_ng_container_5_div_43_Template(rf, ctx) {
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
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function AdminDashboardComponent_ng_container_13_ng_container_5_div_43_Template_input_ngModelChange_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r16);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx_r0.shippingCostInput, $event) || (ctx_r0.shippingCostInput = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](9, AdminDashboardComponent_ng_container_13_ng_container_5_div_43_span_9_Template, 2, 0, "span", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "div", 99)(11, "button", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_13_ng_container_5_div_43_Template_button_click_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r16);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.confirmReady(ctx_r0.selectedOrder));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "button", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_13_ng_container_5_div_43_Template_button_click_13_listener() {
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
function AdminDashboardComponent_ng_container_13_ng_container_5_button_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_13_ng_container_5_button_44_Template_button_click_0_listener() {
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
function AdminDashboardComponent_ng_container_13_ng_container_5_button_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_13_ng_container_5_button_45_Template_button_click_0_listener() {
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
function AdminDashboardComponent_ng_container_13_ng_container_5_button_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_13_ng_container_5_button_46_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r19);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.openShippingForm(ctx_r0.selectedOrder.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " Marquer comme exp\u00E9di\u00E9e ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminDashboardComponent_ng_container_13_ng_container_5_div_47_span_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "L'URL de suivi est obligatoire.");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminDashboardComponent_ng_container_13_ng_container_5_div_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 92)(1, "div", 94)(2, "label", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "Transporteur ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "span", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, "(optionnel)");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "input", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function AdminDashboardComponent_ng_container_13_ng_container_5_div_47_Template_input_ngModelChange_6_listener($event) {
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
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function AdminDashboardComponent_ng_container_13_ng_container_5_div_47_Template_input_ngModelChange_12_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r20);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx_r0.trackingUrl, $event) || (ctx_r0.trackingUrl = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](13, AdminDashboardComponent_ng_container_13_ng_container_5_div_47_span_13_Template, 2, 0, "span", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "div", 99)(15, "button", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_13_ng_container_5_div_47_Template_button_click_15_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r20);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.confirmShipped(ctx_r0.selectedOrder));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "button", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_13_ng_container_5_div_47_Template_button_click_17_listener() {
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
function AdminDashboardComponent_ng_container_13_ng_container_5_span_48_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "\u2713 Exp\u00E9di\u00E9e");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AdminDashboardComponent_ng_container_13_ng_container_5_div_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 110)(1, "span", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "\u2717 Annul\u00E9e");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "button", 112);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_13_ng_container_5_div_49_Template_button_click_3_listener() {
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
function AdminDashboardComponent_ng_container_13_ng_container_5_button_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 112);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_13_ng_container_5_button_50_Template_button_click_0_listener() {
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
function AdminDashboardComponent_ng_container_13_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 40)(2, "button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_ng_container_13_ng_container_5_Template_button_click_2_listener() {
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
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](22, AdminDashboardComponent_ng_container_13_ng_container_5_div_22_Template, 7, 7, "div", 50)(23, AdminDashboardComponent_ng_container_13_ng_container_5_div_23_Template, 15, 8, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](24, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](25, AdminDashboardComponent_ng_container_13_ng_container_5_div_25_Template, 10, 6, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](26, "div", 54)(27, "span", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](28, "Sous-total HT :");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](29, "span", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](31, AdminDashboardComponent_ng_container_13_ng_container_5_div_31_Template, 5, 1, "div", 57)(32, AdminDashboardComponent_ng_container_13_ng_container_5_div_32_Template, 5, 2, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](33, "div", 58)(34, "span", 55)(35, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](36, "Total TTC :");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](37, "span", 56)(38, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](39);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](40, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](41, AdminDashboardComponent_ng_container_13_ng_container_5_button_41_Template, 2, 2, "button", 60)(42, AdminDashboardComponent_ng_container_13_ng_container_5_button_42_Template, 2, 1, "button", 60)(43, AdminDashboardComponent_ng_container_13_ng_container_5_div_43_Template, 15, 6, "div", 61)(44, AdminDashboardComponent_ng_container_13_ng_container_5_button_44_Template, 2, 2, "button", 62)(45, AdminDashboardComponent_ng_container_13_ng_container_5_button_45_Template, 2, 2, "button", 63)(46, AdminDashboardComponent_ng_container_13_ng_container_5_button_46_Template, 2, 0, "button", 64)(47, AdminDashboardComponent_ng_container_13_ng_container_5_div_47_Template, 19, 7, "div", 61)(48, AdminDashboardComponent_ng_container_13_ng_container_5_span_48_Template, 2, 0, "span", 65)(49, AdminDashboardComponent_ng_container_13_ng_container_5_div_49_Template, 5, 2, "div", 66)(50, AdminDashboardComponent_ng_container_13_ng_container_5_button_50_Template, 2, 1, "button", 67);
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
function AdminDashboardComponent_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, AdminDashboardComponent_ng_container_13_div_1_Template, 2, 1, "div", 8)(2, AdminDashboardComponent_ng_container_13_div_2_Template, 2, 0, "div", 9)(3, AdminDashboardComponent_ng_container_13_div_3_Template, 2, 0, "div", 10)(4, AdminDashboardComponent_ng_container_13_ng_container_4_Template, 25, 6, "ng-container", 5)(5, AdminDashboardComponent_ng_container_13_ng_container_5_Template, 51, 32, "ng-container", 5);
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
function AdminDashboardComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_div_14_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r23);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r0.closeLightbox());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "img", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_div_14_Template_img_click_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r23);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "button", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AdminDashboardComponent_div_14_Template_button_click_2_listener() {
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
  pickup: '🏪 Retrait en magasin — Libreville',
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
  orderTotal(order) {
    return this.formatXAF(this.toXAF(this.orderRawHT(order)));
  }
  /** TVA 10% uniquement pour expédition internationale. */
  orderTvaAmount(order) {
    if (order.deliveryMode !== 'shipping') return null;
    return this.formatXAF(this.toXAF(this.orderRawHT(order) * 0.1));
  }
  orderTotalTTC(order) {
    const htXAF = this.toXAF(this.orderRawHT(order));
    const tvaXAF = order.deliveryMode === 'shipping' ? this.toXAF(this.orderRawHT(order) * 0.1) : 0;
    const shippingXAF = order.shippingCost ?? 0;
    return this.formatXAF(htXAF + tvaXAF + shippingXAF);
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
      decls: 15,
      vars: 10,
      consts: [[1, "admin-container"], [1, "admin-header"], [1, "admin-tabs"], [1, "tab-btn", 3, "click"], ["class", "catalog-tab-section", 4, "ngIf"], [4, "ngIf"], ["class", "lightbox-overlay", 3, "click", 4, "ngIf"], [1, "catalog-tab-section"], ["class", "error-banner", 4, "ngIf"], ["class", "loading", 4, "ngIf"], ["class", "empty", 4, "ngIf"], [1, "error-banner"], [1, "loading"], [1, "empty"], [1, "orders-filter-bar"], ["type", "search", "placeholder", "Filtrer par r\u00E9f., nom ou email\u2026", 1, "orders-filter-input", 3, "ngModelChange", "ngModel"], [1, "orders-filter-count"], [1, "orders-table"], [1, "text-center"], [1, "text-right"], ["class", "order-row", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "orders-pagination", 4, "ngIf"], [1, "order-row", 3, "click"], [1, "col-date"], [1, "col-ref"], [1, "col-customer"], [1, "customer-name"], [1, "customer-email"], [1, "text-center", "col-qty"], [1, "text-right", "col-total"], [1, "col-delivery"], ["class", "delivery-badge", 3, "pickup", "shipping", 4, "ngIf"], [1, "text-center", "col-status"], [1, "status-badge"], [1, "delivery-badge"], [1, "orders-pagination"], [1, "page-btn", 3, "click", "disabled"], ["class", "page-btn", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "page-info"], [1, "page-btn", 3, "click"], [1, "order-detail-header"], [1, "btn-back-orders", 3, "click"], [1, "order-detail-meta"], [1, "order-detail-title"], [1, "order-id"], [1, "order-date"], [1, "order-card"], [1, "customer-info"], [1, "label"], [1, "email-link", 3, "href"], ["class", "delivery-info", 4, "ngIf"], ["class", "shipping-address-block", 4, "ngIf"], [1, "items-list"], ["class", "item-row-wrapper", 4, "ngFor", "ngForOf"], [1, "order-total"], [1, "total-label"], [1, "total-amount"], ["class", "order-total", 4, "ngIf"], [1, "order-total", "order-total--ttc"], [1, "order-actions"], ["class", "btn btn-ready", 3, "disabled", "click", 4, "ngIf"], ["class", "shipping-form", 4, "ngIf"], ["class", "btn btn-paid", 3, "disabled", "click", 4, "ngIf"], ["class", "btn btn-resend", 3, "disabled", "click", 4, "ngIf"], ["class", "btn btn-shipped", 3, "click", 4, "ngIf"], ["class", "shipped-label", 4, "ngIf"], ["class", "cancelled-actions", 4, "ngIf"], ["class", "btn btn-cancel-order", 3, "disabled", "click", 4, "ngIf"], [1, "delivery-info"], ["class", "tracking-link-wrap", 4, "ngIf"], [1, "tracking-link-wrap"], ["target", "_blank", "rel", "noopener", 1, "tracking-link", 3, "href"], [1, "shipping-address-block"], [1, "shipping-address-detail"], [1, "item-row-wrapper"], [1, "item-row", 3, "click"], [1, "item-toggle"], ["class", "item-thumb-inline", 3, "src", "alt", "click", 4, "ngIf"], [1, "item-title"], ["class", "item-ref", 4, "ngIf"], ["class", "item-price", 4, "ngIf"], ["class", "item-detail-panel", 4, "ngIf"], [1, "item-thumb-inline", 3, "click", "src", "alt"], [1, "item-ref"], [1, "item-price"], [1, "item-detail-panel"], [1, "item-detail-info"], [1, "detail-label"], ["class", "total-amount", 4, "ngIf"], ["class", "total-amount shipping-pending-label", 4, "ngIf"], [1, "total-amount", "shipping-pending-label"], [1, "btn", "btn-ready", 3, "click", "disabled"], [1, "shipping-form"], [1, "shipping-form-info"], [1, "shipping-form-field"], [1, "shipping-label"], [1, "required"], ["type", "number", "min", "0", "step", "1", "placeholder", "ex : 15000", 1, "shipping-input", 3, "ngModelChange", "ngModel"], ["class", "field-error", 4, "ngIf"], [1, "shipping-form-actions"], [1, "btn", "btn-cancel", 3, "click"], [1, "field-error"], [1, "btn", "btn-paid", 3, "click", "disabled"], [1, "btn", "btn-resend", 3, "click", "disabled"], [1, "btn", "btn-shipped", 3, "click"], [1, "optional"], ["type", "text", "placeholder", "ex : DHL, FedEx\u2026", 1, "shipping-input", 3, "ngModelChange", "ngModel"], ["type", "url", "placeholder", "https://\u2026", 1, "shipping-input", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-shipped", 3, "click", "disabled"], [1, "shipped-label"], [1, "cancelled-actions"], [1, "cancelled-label"], [1, "btn", "btn-cancel-order", 3, "click", "disabled"], [1, "lightbox-overlay", 3, "click"], [1, "lightbox-img", 3, "click", "src"], [1, "lightbox-close", 3, "click"]],
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
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](11, AdminDashboardComponent_div_11_Template, 2, 0, "div", 4)(12, AdminDashboardComponent_div_12_Template, 2, 0, "div", 4)(13, AdminDashboardComponent_ng_container_13_Template, 6, 5, "ng-container", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](14, AdminDashboardComponent_div_14_Template, 4, 1, "div", 6);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("active", ctx.activeTab === "orders");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("active", ctx.activeTab === "catalog");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("active", ctx.activeTab === "settings");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.activeTab === "catalog");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.activeTab === "settings");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.activeTab === "orders");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.lightboxSrc);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _admin_catalog_admin_catalog_component__WEBPACK_IMPORTED_MODULE_10__.AdminCatalogComponent, _admin_settings_admin_settings_component__WEBPACK_IMPORTED_MODULE_11__.AdminSettingsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_8__.SlicePipe, _angular_common__WEBPACK_IMPORTED_MODULE_8__.DatePipe],
      styles: [".admin-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-top: 16px;\n}\n\n.tab-btn[_ngcontent-%COMP%] {\n  padding: 8px 20px;\n  border: 2px solid #148f77;\n  border-radius: 4px;\n  background: transparent;\n  color: #148f77;\n  font-family: \"Work Sans\", sans-serif;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.15s, color 0.15s;\n}\n.tab-btn.active[_ngcontent-%COMP%] {\n  background: #148f77;\n  color: #fff;\n}\n\n.catalog-tab-section[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n\n.stock-section[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n\n.stock-search-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n\n.stock-search-input[_ngcontent-%COMP%] {\n  width: 280px;\n  padding: 8px 12px;\n  border: 2px solid #dfe6e9;\n  border-radius: 6px;\n  font-family: \"Work Sans\", sans-serif;\n  font-size: 14px;\n  color: #2c3e50;\n  outline: none;\n  transition: border-color 0.15s;\n}\n.stock-search-input[_ngcontent-%COMP%]:focus {\n  border-color: #148f77;\n}\n\n.stock-search-count[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #7f8c8d;\n}\n\n.stock-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  background: #fff;\n  border-radius: 6px;\n  overflow: hidden;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);\n}\n.stock-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #2c3e50;\n  color: #fff;\n  padding: 10px 14px;\n  font-family: \"Work Sans\", sans-serif;\n  font-size: 13px;\n  text-align: left;\n}\n.stock-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  border-bottom: 1px solid #ecf0f1;\n  font-size: 14px;\n  color: #2c3e50;\n  vertical-align: middle;\n}\n.stock-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.stock-table[_ngcontent-%COMP%]   tr.stock-zero[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: #fdf2f2;\n}\n\n.img-cell[_ngcontent-%COMP%] {\n  padding: 6px 10px !important;\n}\n\n.stock-thumb[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  object-fit: cover;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: transform 0.15s, box-shadow 0.15s;\n  display: block;\n}\n.stock-thumb[_ngcontent-%COMP%]:hover {\n  transform: scale(1.08);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);\n}\n\n.ref-cell[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-weight: 600;\n}\n\n.cat-cell[_ngcontent-%COMP%] {\n  color: #7f8c8d;\n  font-size: 12px;\n  text-transform: uppercase;\n}\n\n.stock-pagination[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 16px;\n  margin-top: 16px;\n}\n\n.page-btn[_ngcontent-%COMP%] {\n  padding: 6px 16px;\n  border: 1px solid #148f77;\n  border-radius: 4px;\n  background: transparent;\n  color: #148f77;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.15s, color 0.15s;\n}\n.page-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #148f77;\n  color: #fff;\n}\n.page-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n\n.page-info[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #2c3e50;\n  font-weight: 500;\n}\n\n.stock-value[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n  color: #148f77;\n}\n.stock-value.stock-empty[_ngcontent-%COMP%] {\n  color: #e74c3c;\n}\n\n.stock-input[_ngcontent-%COMP%] {\n  width: 70px;\n  padding: 4px 8px;\n  border: 2px solid #148f77;\n  border-radius: 4px;\n  text-align: center;\n  font-size: 16px;\n  font-weight: 700;\n}\n\n.actions-cell[_ngcontent-%COMP%] {\n  text-align: right;\n  white-space: nowrap;\n}\n.actions-cell[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    + button[_ngcontent-%COMP%] {\n  margin-left: 4px;\n}\n\n.price-input[_ngcontent-%COMP%] {\n  width: 90px;\n}\n\n.btn-price-edit[_ngcontent-%COMP%] {\n  border-color: #6c3483 !important;\n  color: #6c3483 !important;\n  margin-left: 4px;\n}\n.btn-price-edit[_ngcontent-%COMP%]:hover {\n  background: #6c3483 !important;\n  color: #fff !important;\n}\n\n.btn-stock-edit[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border: 1px solid #148f77;\n  border-radius: 4px;\n  background: transparent;\n  color: #148f77;\n  font-size: 13px;\n  cursor: pointer;\n}\n.btn-stock-edit[_ngcontent-%COMP%]:hover {\n  background: #148f77;\n  color: #fff;\n}\n\n.btn-stock-save[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border: none;\n  border-radius: 4px;\n  background: #148f77;\n  color: #fff;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  margin-right: 4px;\n}\n.btn-stock-save[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n}\n\n.btn-stock-cancel[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  border: 1px solid #bdc3c7;\n  border-radius: 4px;\n  background: transparent;\n  color: #7f8c8d;\n  font-size: 13px;\n  cursor: pointer;\n}\n\n.admin-container[_ngcontent-%COMP%] {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 90px 16px 24px;\n  font-family: \"Work Sans\", sans-serif;\n}\n\n.admin-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  border-bottom: 2px solid #148f77;\n  padding-bottom: 12px;\n}\n.admin-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  color: #2c3e50;\n  margin: 0;\n}\n\n.error-banner[_ngcontent-%COMP%] {\n  background-color: #fdecea;\n  color: #c0392b;\n  border: 1px solid #e74c3c;\n  border-radius: 4px;\n  padding: 12px 16px;\n  margin-bottom: 16px;\n  font-size: 14px;\n}\n\n.loading[_ngcontent-%COMP%], \n.empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #7f8c8d;\n  font-size: 15px;\n}\n\n.orders-filter-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n\n.orders-filter-input[_ngcontent-%COMP%] {\n  flex: 1;\n  max-width: 360px;\n  padding: 8px 12px;\n  border: 1px solid #dfe6e9;\n  border-radius: 6px;\n  font-size: 14px;\n  font-family: inherit;\n  color: #2c3e50;\n  outline: none;\n  transition: border-color 0.15s;\n}\n.orders-filter-input[_ngcontent-%COMP%]:focus {\n  border-color: #148f77;\n}\n\n.orders-filter-count[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #7f8c8d;\n}\n\n.orders-pagination[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  margin-top: 12px;\n  flex-wrap: wrap;\n}\n.orders-pagination[_ngcontent-%COMP%]   .page-btn[_ngcontent-%COMP%] {\n  min-width: 32px;\n  height: 32px;\n  padding: 0 8px;\n  border: 1px solid #ddd;\n  background: #fff;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 13px;\n  color: #2c3e50;\n  transition: background 0.15s, color 0.15s;\n}\n.orders-pagination[_ngcontent-%COMP%]   .page-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f0f0f0;\n}\n.orders-pagination[_ngcontent-%COMP%]   .page-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n.orders-pagination[_ngcontent-%COMP%]   .page-btn.active[_ngcontent-%COMP%] {\n  background: #148f77;\n  color: #fff;\n  border-color: #148f77;\n  font-weight: 600;\n}\n.orders-pagination[_ngcontent-%COMP%]   .page-info[_ngcontent-%COMP%] {\n  margin-left: 8px;\n  font-size: 12px;\n  color: #7f8c8d;\n}\n\n.orders-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  background: #fff;\n  border-radius: 6px;\n  overflow: hidden;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);\n}\n.orders-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #2c3e50;\n  color: #fff;\n  padding: 10px 12px;\n  font-size: 12px;\n  font-weight: 600;\n  text-align: left;\n  white-space: nowrap;\n}\n.orders-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  border-bottom: 1px solid #ecf0f1;\n  font-size: 13px;\n  color: #2c3e50;\n  vertical-align: middle;\n}\n.orders-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n\n.order-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background 0.12s;\n}\n.order-row[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: #f0faf7;\n}\n\n.col-date[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  color: #7f8c8d;\n  font-size: 12px;\n}\n\n.col-ref[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-weight: 600;\n  white-space: nowrap;\n}\n\n.col-customer[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n.col-customer[_ngcontent-%COMP%]   .customer-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.col-customer[_ngcontent-%COMP%]   .customer-email[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #7f8c8d;\n}\n\n.col-qty[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n\n.col-total[_ngcontent-%COMP%] {\n  font-weight: 700;\n  white-space: nowrap;\n}\n\n.col-delivery[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n\n.col-status[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n\n.text-right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n\n.text-center[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n.order-detail-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-bottom: 16px;\n}\n\n.order-detail-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n\n.btn-back-orders[_ngcontent-%COMP%] {\n  padding: 6px 14px;\n  border: 1px solid #148f77;\n  background: transparent;\n  color: #148f77;\n  border-radius: 4px;\n  font-weight: 600;\n  font-size: 13px;\n  cursor: pointer;\n  align-self: flex-start;\n}\n.btn-back-orders[_ngcontent-%COMP%]:hover {\n  background: #148f77;\n  color: #fff;\n}\n\n.order-detail-title[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  flex: 1;\n}\n\n.item-thumb-inline[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  object-fit: cover;\n  border-radius: 3px;\n  border: 1px solid #ecf0f1;\n  flex-shrink: 0;\n  cursor: zoom-in;\n  transition: transform 0.15s;\n}\n.item-thumb-inline[_ngcontent-%COMP%]:hover {\n  transform: scale(1.08);\n}\n\n.orders-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.order-card[_ngcontent-%COMP%] {\n  border: 1px solid #ecf0f1;\n  border-radius: 6px;\n  padding: 16px;\n  background: #fff;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);\n}\n.order-card[_ngcontent-%COMP%]   .order-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.order-card[_ngcontent-%COMP%]   .order-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.order-card[_ngcontent-%COMP%]   .order-id[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2c3e50;\n  font-size: 14px;\n  font-family: monospace;\n}\n.order-card[_ngcontent-%COMP%]   .order-date[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #7f8c8d;\n}\n\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 4px 12px;\n  border-radius: 12px;\n  color: #fff;\n  font-size: 12px;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n}\n\n.customer-info[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #2c3e50;\n  margin-bottom: 12px;\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.customer-info[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #7f8c8d;\n}\n.customer-info[_ngcontent-%COMP%]   .email-link[_ngcontent-%COMP%] {\n  color: #148f77;\n  text-decoration: none;\n  font-size: 13px;\n}\n.customer-info[_ngcontent-%COMP%]   .email-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n\n.delivery-info[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #2c3e50;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n\n.delivery-badge[_ngcontent-%COMP%] {\n  padding: 3px 10px;\n  border-radius: 10px;\n  font-size: 13px;\n  font-weight: 600;\n}\n.delivery-badge.pickup[_ngcontent-%COMP%] {\n  background: #eaf4fb;\n  color: #1a5276;\n}\n.delivery-badge.shipping[_ngcontent-%COMP%] {\n  background: #fdf2e9;\n  color: #784212;\n}\n\n.tracking-link-wrap[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #7f8c8d;\n}\n\n.tracking-link[_ngcontent-%COMP%] {\n  color: #6c3483;\n  font-weight: 600;\n  text-decoration: none;\n}\n.tracking-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n\n.shipping-address-block[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #2c3e50;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: flex-start;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n\n.shipping-address-detail[_ngcontent-%COMP%] {\n  font-style: normal;\n  background: #f0faf7;\n  border-left: 3px solid #148f77;\n  padding: 8px 12px;\n  border-radius: 0 4px 4px 0;\n  line-height: 1.6;\n  margin: 0;\n}\n\n.items-list[_ngcontent-%COMP%] {\n  border-top: 1px solid #ecf0f1;\n  padding-top: 10px;\n  margin-bottom: 8px;\n}\n\n.item-row-wrapper[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #f8f9fa;\n}\n.item-row-wrapper[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n.item-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  align-items: center;\n  padding: 8px 4px;\n  font-size: 14px;\n  cursor: pointer;\n  border-radius: 4px;\n  transition: background 0.12s;\n}\n.item-row[_ngcontent-%COMP%]:hover {\n  background: #f8fffe;\n}\n\n.item-toggle[_ngcontent-%COMP%] {\n  color: #148f77;\n  font-size: 13px;\n  width: 14px;\n  flex-shrink: 0;\n}\n\n.item-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2c3e50;\n  flex: 1 1 auto;\n}\n\n.item-ref[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #148f77;\n  font-family: monospace;\n  background: #f0faf7;\n  padding: 2px 6px;\n  border-radius: 3px;\n}\n\n.item-detail[_ngcontent-%COMP%] {\n  color: #7f8c8d;\n  font-size: 13px;\n}\n\n.item-qty[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #7f8c8d;\n}\n\n.item-price[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: #2c3e50;\n}\n\n.lightbox-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.85);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n  cursor: zoom-out;\n}\n\n.lightbox-img[_ngcontent-%COMP%] {\n  max-width: 90vw;\n  max-height: 90vh;\n  object-fit: contain;\n  border-radius: 4px;\n  cursor: default;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);\n}\n\n.lightbox-close[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 16px;\n  right: 20px;\n  background: transparent;\n  border: none;\n  color: #fff;\n  font-size: 28px;\n  cursor: pointer;\n  line-height: 1;\n  opacity: 0.8;\n}\n.lightbox-close[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n\n.item-detail-panel[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  padding: 12px 18px 14px;\n  background: #f8fffe;\n  border-radius: 4px;\n  margin-bottom: 4px;\n}\n.item-detail-panel[_ngcontent-%COMP%]   .item-img[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 100px;\n  object-fit: cover;\n  border-radius: 4px;\n  flex-shrink: 0;\n  border: 1px solid #ecf0f1;\n  cursor: zoom-in;\n}\n.item-detail-panel[_ngcontent-%COMP%]   .item-detail-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 13px;\n  color: #2c3e50;\n}\n.item-detail-panel[_ngcontent-%COMP%]   .detail-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #7f8c8d;\n  margin-right: 4px;\n}\n\n.order-total[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 4px;\n  border-top: 1px solid #ecf0f1;\n  margin-bottom: 12px;\n}\n.order-total[_ngcontent-%COMP%]   .total-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #7f8c8d;\n  font-weight: 600;\n}\n.order-total[_ngcontent-%COMP%]   .total-amount[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: #2c3e50;\n}\n.order-total--ttc[_ngcontent-%COMP%] {\n  border-top: 2px solid #2c3e50;\n  margin-top: 4px;\n}\n\n.order-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n}\n\n.btn[_ngcontent-%COMP%] {\n  padding: 8px 18px;\n  border: none;\n  border-radius: 4px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: opacity 0.15s;\n  font-family: inherit;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n\n.btn-ready[_ngcontent-%COMP%] {\n  background-color: #148f77;\n  color: #fff;\n}\n.btn-ready[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: 0.85;\n}\n\n.btn-paid[_ngcontent-%COMP%] {\n  background-color: #2c3e50;\n  color: #fff;\n}\n.btn-paid[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: 0.85;\n}\n\n.btn-resend[_ngcontent-%COMP%] {\n  background-color: transparent;\n  color: #148f77;\n  border: 1px solid #148f77;\n}\n.btn-resend[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #148f77;\n  color: #fff;\n}\n.btn-resend[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n}\n\n.paid-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #148f77;\n  font-weight: 600;\n}\n\n.btn-shipped[_ngcontent-%COMP%] {\n  background-color: #6c3483;\n  color: #fff;\n}\n.btn-shipped[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: 0.85;\n}\n\n.shipped-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #6c3483;\n  font-weight: 600;\n}\n\n.shipping-form[_ngcontent-%COMP%] {\n  width: 100%;\n  background: #faf5ff;\n  border: 1px solid #d7bde2;\n  border-radius: 6px;\n  padding: 16px;\n  margin-top: 8px;\n}\n\n.shipping-form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  margin-bottom: 12px;\n}\n\n.shipping-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: #2c3e50;\n}\n.shipping-label[_ngcontent-%COMP%]   .required[_ngcontent-%COMP%] {\n  color: #e74c3c;\n}\n.shipping-label[_ngcontent-%COMP%]   .optional[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: #7f8c8d;\n}\n\n.shipping-input[_ngcontent-%COMP%] {\n  padding: 8px 10px;\n  border: 1px solid #d7bde2;\n  border-radius: 4px;\n  font-size: 14px;\n  font-family: inherit;\n  outline: none;\n}\n.shipping-input[_ngcontent-%COMP%]:focus {\n  border-color: #6c3483;\n}\n.shipping-input.input-error[_ngcontent-%COMP%] {\n  border-color: #e74c3c;\n}\n\n.field-error[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #e74c3c;\n}\n\n.shipping-form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-top: 4px;\n}\n\n.btn-cancel[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #7f8c8d;\n  border: 1px solid #bdc3c7;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f8f9fa;\n}\n\n.shipping-pending-label[_ngcontent-%COMP%] {\n  color: #e67e22;\n  font-style: italic;\n}\n\n.cancelled-label[_ngcontent-%COMP%] {\n  color: #95a5a6;\n  font-weight: 600;\n}\n\n.btn-cancel-order[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #e74c3c;\n  border: 1px solid #e74c3c;\n  font-size: 13px;\n}\n.btn-cancel-order[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #fdf2f2;\n}\n\n.btn-cancel-order-confirm[_ngcontent-%COMP%] {\n  background: #e74c3c;\n  color: #fff;\n  border: none;\n}\n.btn-cancel-order-confirm[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #c0392b;\n}\n\n.cancel-confirm-block[_ngcontent-%COMP%] {\n  background: #fdf2f2;\n  border: 1px solid #f5b7b1;\n  border-radius: 6px;\n  padding: 12px 16px;\n  margin-top: 8px;\n  width: 100%;\n}\n\n.cancel-confirm-msg[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #922b21;\n  margin-bottom: 10px;\n}\n\n.shipping-form-info[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #6c3483;\n  background: #f5eef8;\n  border-radius: 4px;\n  padding: 8px 12px;\n  margin-bottom: 12px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvYWRtaW4vYWRtaW4tZGFzaGJvYXJkL2FkbWluLWRhc2hib2FyZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNFLGFBQUE7RUFDQSxRQUFBO0VBQ0EsZ0JBQUE7QUFBRjs7QUFHQTtFQUNFLGlCQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtFQUNBLHVCQUFBO0VBQ0EsY0FBQTtFQUNBLG9DQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EseUNBQUE7QUFBRjtBQUVFO0VBQ0UsbUJBQUE7RUFDQSxXQUFBO0FBQUo7O0FBS0E7RUFBdUIsZUFBQTtBQUR2Qjs7QUFJQTtFQUFpQixlQUFBO0FBQWpCOztBQUVBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0Esb0NBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtFQUNBLGFBQUE7RUFDQSw4QkFBQTtBQUNGO0FBQ0U7RUFBVSxxQkFBQTtBQUVaOztBQUNBO0VBQ0UsZUFBQTtFQUNBLGNBQUE7QUFFRjs7QUFDQTtFQUNFLFdBQUE7RUFDQSx5QkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHlDQUFBO0FBRUY7QUFBRTtFQUNFLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0Esb0NBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUFFSjtBQUNFO0VBQ0Usa0JBQUE7RUFDQSxnQ0FBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0VBQ0Esc0JBQUE7QUFDSjtBQUVFO0VBQW1CLG1CQUFBO0FBQ3JCO0FBQ0U7RUFBbUIsbUJBQUE7QUFFckI7O0FBQ0E7RUFBWSw0QkFBQTtBQUdaOztBQURBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VB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O0VBQ0UsZUFBQTtFQUNBLGNBQUE7QUFtRkY7O0FBaEZBO0VBQ0UsYUFBQTtFQUNBLFNBQUE7RUFDQSxlQUFBO0FBbUZGOztBQWhGQTtFQUNFLHVCQUFBO0VBQ0EsY0FBQTtFQUNBLHlCQUFBO0FBbUZGO0FBakZFO0VBQ0UsbUJBQUE7QUFtRko7O0FBL0VBO0VBQ0UsY0FBQTtFQUNBLGtCQUFBO0FBa0ZGOztBQS9FQTtFQUNFLGNBQUE7RUFDQSxnQkFBQTtBQWtGRjs7QUEvRUE7RUFDRSx1QkFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtFQUNBLGVBQUE7QUFrRkY7QUFoRkU7RUFDRSxtQkFBQTtBQWtGSjs7QUE5RUE7RUFDRSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBaUZGO0FBL0VFO0VBQ0UsbUJBQUE7QUFpRko7O0FBN0VBO0VBQ0UsbUJBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtBQWdGRjs7QUE3RUE7RUFDRSxlQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0FBZ0ZGOztBQTdFQTtFQUNFLGVBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7QUFnRkYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDDosKUwoDDosKUwoAgT25nbGV0cyDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcbi5hZG1pbi10YWJzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiA4cHg7XG4gIG1hcmdpbi10b3A6IDE2cHg7XG59XG5cbi50YWItYnRuIHtcbiAgcGFkZGluZzogOHB4IDIwcHg7XG4gIGJvcmRlcjogMnB4IHNvbGlkICMxNDhmNzc7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjMTQ4Zjc3O1xuICBmb250LWZhbWlseTogJ1dvcmsgU2FucycsIHNhbnMtc2VyaWY7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjE1cywgY29sb3IgMC4xNXM7XG5cbiAgJi5hY3RpdmUge1xuICAgIGJhY2tncm91bmQ6ICMxNDhmNzc7XG4gICAgY29sb3I6ICNmZmY7XG4gIH1cbn1cblxuLy8gw6LClMKAw6LClMKAIENhdGFsb2d1ZSB0YWIgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXG4uY2F0YWxvZy10YWItc2VjdGlvbiB7IG1hcmdpbi10b3A6IDhweDsgfVxuXG4vLyDDosKUwoDDosKUwoAgU3RvY2sgdGFibGUgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXG4uc3RvY2stc2VjdGlvbiB7IG1hcmdpbi10b3A6IDhweDsgfVxuXG4uc3RvY2stc2VhcmNoLWJhciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbn1cblxuLnN0b2NrLXNlYXJjaC1pbnB1dCB7XG4gIHdpZHRoOiAyODBweDtcbiAgcGFkZGluZzogOHB4IDEycHg7XG4gIGJvcmRlcjogMnB4IHNvbGlkICNkZmU2ZTk7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgZm9udC1mYW1pbHk6ICdXb3JrIFNhbnMnLCBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOiAjMmMzZTUwO1xuICBvdXRsaW5lOiBub25lO1xuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4xNXM7XG5cbiAgJjpmb2N1cyB7IGJvcmRlci1jb2xvcjogIzE0OGY3NzsgfVxufVxuXG4uc3RvY2stc2VhcmNoLWNvdW50IHtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBjb2xvcjogIzdmOGM4ZDtcbn1cblxuLnN0b2NrLXRhYmxlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYm94LXNoYWRvdzogMCAxcHggNHB4IHJnYmEoMCwwLDAsMC4wOCk7XG5cbiAgdGgge1xuICAgIGJhY2tncm91bmQ6ICMyYzNlNTA7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgcGFkZGluZzogMTBweCAxNHB4O1xuICAgIGZvbnQtZmFtaWx5OiAnV29yayBTYW5zJywgc2Fucy1zZXJpZjtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgfVxuXG4gIHRkIHtcbiAgICBwYWRkaW5nOiAxMHB4IDE0cHg7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlY2YwZjE7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGNvbG9yOiAjMmMzZTUwO1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIH1cblxuICB0cjpsYXN0LWNoaWxkIHRkIHsgYm9yZGVyLWJvdHRvbTogbm9uZTsgfVxuXG4gIHRyLnN0b2NrLXplcm8gdGQgeyBiYWNrZ3JvdW5kOiAjZmRmMmYyOyB9XG59XG5cbi5pbWctY2VsbCB7IHBhZGRpbmc6IDZweCAxMHB4ICFpbXBvcnRhbnQ7IH1cblxuLnN0b2NrLXRodW1iIHtcbiAgd2lkdGg6IDQ4cHg7XG4gIGhlaWdodDogNDhweDtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4xNXMsIGJveC1zaGFkb3cgMC4xNXM7XG4gIGRpc3BsYXk6IGJsb2NrO1xuXG4gICY6aG92ZXIge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wOCk7XG4gICAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwwLDAsMC4yNSk7XG4gIH1cbn1cblxuLnJlZi1jZWxsICB7IGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7IGZvbnQtd2VpZ2h0OiA2MDA7IH1cbi5jYXQtY2VsbCAgeyBjb2xvcjogIzdmOGM4ZDsgZm9udC1zaXplOiAxMnB4OyB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOyB9XG5cbi5zdG9jay1wYWdpbmF0aW9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogMTZweDtcbiAgbWFyZ2luLXRvcDogMTZweDtcbn1cblxuLnBhZ2UtYnRuIHtcbiAgcGFkZGluZzogNnB4IDE2cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICMxNDhmNzc7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjMTQ4Zjc3O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4xNXMsIGNvbG9yIDAuMTVzO1xuXG4gICY6aG92ZXI6bm90KDpkaXNhYmxlZCkgeyBiYWNrZ3JvdW5kOiAjMTQ4Zjc3OyBjb2xvcjogI2ZmZjsgfVxuICAmOmRpc2FibGVkIHsgb3BhY2l0eTogMC40OyBjdXJzb3I6IGRlZmF1bHQ7IH1cbn1cblxuLnBhZ2UtaW5mbyB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY29sb3I6ICMyYzNlNTA7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi5zdG9jay12YWx1ZSB7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICMxNDhmNzc7XG5cbiAgJi5zdG9jay1lbXB0eSB7IGNvbG9yOiAjZTc0YzNjOyB9XG59XG5cbi5zdG9jay1pbnB1dCB7XG4gIHdpZHRoOiA3MHB4O1xuICBwYWRkaW5nOiA0cHggOHB4O1xuICBib3JkZXI6IDJweCBzb2xpZCAjMTQ4Zjc3O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4uYWN0aW9ucy1jZWxsIHtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG5cbiAgYnV0dG9uICsgYnV0dG9uIHsgbWFyZ2luLWxlZnQ6IDRweDsgfVxufVxuXG4ucHJpY2UtaW5wdXQgeyB3aWR0aDogOTBweDsgfVxuXG4uYnRuLXByaWNlLWVkaXQge1xuICBib3JkZXItY29sb3I6ICM2YzM0ODMgIWltcG9ydGFudDtcbiAgY29sb3I6ICM2YzM0ODMgIWltcG9ydGFudDtcbiAgbWFyZ2luLWxlZnQ6IDRweDtcbiAgJjpob3ZlciB7IGJhY2tncm91bmQ6ICM2YzM0ODMgIWltcG9ydGFudDsgY29sb3I6ICNmZmYgIWltcG9ydGFudDsgfVxufVxuXG4uYnRuLXN0b2NrLWVkaXQge1xuICBwYWRkaW5nOiA0cHggMTJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgIzE0OGY3NztcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICMxNDhmNzc7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICAmOmhvdmVyIHsgYmFja2dyb3VuZDogIzE0OGY3NzsgY29sb3I6ICNmZmY7IH1cbn1cblxuLmJ0bi1zdG9jay1zYXZlIHtcbiAgcGFkZGluZzogNHB4IDEycHg7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiAjMTQ4Zjc3O1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIG1hcmdpbi1yaWdodDogNHB4O1xuICAmOmRpc2FibGVkIHsgb3BhY2l0eTogMC42OyB9XG59XG5cbi5idG4tc3RvY2stY2FuY2VsIHtcbiAgcGFkZGluZzogNHB4IDEwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNiZGMzYzc7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjN2Y4YzhkO1xuICBmb250LXNpemU6IDEzcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLy8gw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXG5cbi5hZG1pbi1jb250YWluZXIge1xuICBtYXgtd2lkdGg6IDkwMHB4O1xuICBtYXJnaW46IDAgYXV0bztcbiAgcGFkZGluZzogOTBweCAxNnB4IDI0cHg7XG4gIGZvbnQtZmFtaWx5OiAnV29yayBTYW5zJywgc2Fucy1zZXJpZjtcbn1cblxuLmFkbWluLWhlYWRlciB7XG4gIG1hcmdpbi1ib3R0b206IDI0cHg7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjMTQ4Zjc3O1xuICBwYWRkaW5nLWJvdHRvbTogMTJweDtcblxuICBoMSB7XG4gICAgZm9udC1zaXplOiAyMnB4O1xuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgY29sb3I6ICMyYzNlNTA7XG4gICAgbWFyZ2luOiAwO1xuICB9XG59XG5cbi5lcnJvci1iYW5uZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmRlY2VhO1xuICBjb2xvcjogI2MwMzkyYjtcbiAgYm9yZGVyOiAxcHggc29saWQgI2U3NGMzYztcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuLmxvYWRpbmcsXG4uZW1wdHkge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDQwcHg7XG4gIGNvbG9yOiAjN2Y4YzhkO1xuICBmb250LXNpemU6IDE1cHg7XG59XG5cbi8vIMOiwpTCgMOiwpTCgCBGaWx0cmUgKyBwYWdpbmF0aW9uIGNvbW1hbmRlcyDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcbi5vcmRlcnMtZmlsdGVyLWJhciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbn1cblxuLm9yZGVycy1maWx0ZXItaW5wdXQge1xuICBmbGV4OiAxO1xuICBtYXgtd2lkdGg6IDM2MHB4O1xuICBwYWRkaW5nOiA4cHggMTJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RmZTZlOTtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICBjb2xvcjogIzJjM2U1MDtcbiAgb3V0bGluZTogbm9uZTtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMTVzO1xuXG4gICY6Zm9jdXMgeyBib3JkZXItY29sb3I6ICMxNDhmNzc7IH1cbn1cblxuLm9yZGVycy1maWx0ZXItY291bnQge1xuICBmb250LXNpemU6IDEzcHg7XG4gIGNvbG9yOiAjN2Y4YzhkO1xufVxuXG4ub3JkZXJzLXBhZ2luYXRpb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDRweDtcbiAgbWFyZ2luLXRvcDogMTJweDtcbiAgZmxleC13cmFwOiB3cmFwO1xuXG4gIC5wYWdlLWJ0biB7XG4gICAgbWluLXdpZHRoOiAzMnB4O1xuICAgIGhlaWdodDogMzJweDtcbiAgICBwYWRkaW5nOiAwIDhweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gICAgY29sb3I6ICMyYzNlNTA7XG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjE1cywgY29sb3IgMC4xNXM7XG5cbiAgICAmOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHsgYmFja2dyb3VuZDogI2YwZjBmMDsgfVxuICAgICY6ZGlzYWJsZWQgeyBvcGFjaXR5OiAwLjQ7IGN1cnNvcjogZGVmYXVsdDsgfVxuICAgICYuYWN0aXZlIHsgYmFja2dyb3VuZDogIzE0OGY3NzsgY29sb3I6ICNmZmY7IGJvcmRlci1jb2xvcjogIzE0OGY3NzsgZm9udC13ZWlnaHQ6IDYwMDsgfVxuICB9XG5cbiAgLnBhZ2UtaW5mbyB7IG1hcmdpbi1sZWZ0OiA4cHg7IGZvbnQtc2l6ZTogMTJweDsgY29sb3I6ICM3ZjhjOGQ7IH1cbn1cblxuLy8gw6LClMKAw6LClMKAIFRhYmxlYXUgY29tbWFuZGVzIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuLm9yZGVycy10YWJsZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJveC1zaGFkb3c6IDAgMXB4IDRweCByZ2JhKDAsMCwwLC4wOCk7XG5cbiAgdGgge1xuICAgIGJhY2tncm91bmQ6ICMyYzNlNTA7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgcGFkZGluZzogMTBweCAxMnB4O1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgfVxuXG4gIHRkIHtcbiAgICBwYWRkaW5nOiAxMHB4IDEycHg7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlY2YwZjE7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuICAgIGNvbG9yOiAjMmMzZTUwO1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIH1cblxuICB0cjpsYXN0LWNoaWxkIHRkIHsgYm9yZGVyLWJvdHRvbTogbm9uZTsgfVxufVxuXG4ub3JkZXItcm93IHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMTJzO1xuXG4gICY6aG92ZXIgdGQgeyBiYWNrZ3JvdW5kOiAjZjBmYWY3OyB9XG59XG5cbi5jb2wtZGF0ZSAgeyB3aGl0ZS1zcGFjZTogbm93cmFwOyBjb2xvcjogIzdmOGM4ZDsgZm9udC1zaXplOiAxMnB4OyB9XG4uY29sLXJlZiAgIHsgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTsgZm9udC13ZWlnaHQ6IDYwMDsgd2hpdGUtc3BhY2U6IG5vd3JhcDsgfVxuLmNvbC1jdXN0b21lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMXB4O1xuICAuY3VzdG9tZXItbmFtZSAgeyBmb250LXdlaWdodDogNjAwOyB9XG4gIC5jdXN0b21lci1lbWFpbCB7IGZvbnQtc2l6ZTogMTFweDsgY29sb3I6ICM3ZjhjOGQ7IH1cbn1cbi5jb2wtcXR5ICAgIHsgZm9udC13ZWlnaHQ6IDYwMDsgfVxuLmNvbC10b3RhbCAgeyBmb250LXdlaWdodDogNzAwOyB3aGl0ZS1zcGFjZTogbm93cmFwOyB9XG4uY29sLWRlbGl2ZXJ5IHsgd2hpdGUtc3BhY2U6IG5vd3JhcDsgfVxuLmNvbC1zdGF0dXMgeyB3aGl0ZS1zcGFjZTogbm93cmFwOyB9XG4udGV4dC1yaWdodCAgeyB0ZXh0LWFsaWduOiByaWdodDsgfVxuLnRleHQtY2VudGVyIHsgdGV4dC1hbGlnbjogY2VudGVyOyB9XG5cbi8vIMOiwpTCgMOiwpTCgCBFbi10w4PCqnRlIHZ1ZSBkw4PCqXRhaWwgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXG4ub3JkZXItZGV0YWlsLWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMTBweDtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbn1cblxuLm9yZGVyLWRldGFpbC1tZXRhIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG59XG5cbi5idG4tYmFjay1vcmRlcnMge1xuICBwYWRkaW5nOiA2cHggMTRweDtcbiAgYm9yZGVyOiAxcHggc29saWQgIzE0OGY3NztcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjMTQ4Zjc3O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xuXG4gICY6aG92ZXIgeyBiYWNrZ3JvdW5kOiAjMTQ4Zjc3OyBjb2xvcjogI2ZmZjsgfVxufVxuXG4ub3JkZXItZGV0YWlsLXRpdGxlIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAycHg7XG4gIGZsZXg6IDE7XG59XG5cbi5pdGVtLXRodW1iLWlubGluZSB7XG4gIHdpZHRoOiA0MHB4O1xuICBoZWlnaHQ6IDQwcHg7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlY2YwZjE7XG4gIGZsZXgtc2hyaW5rOiAwO1xuICBjdXJzb3I6IHpvb20taW47XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjE1cztcblxuICAmOmhvdmVyIHsgdHJhbnNmb3JtOiBzY2FsZSgxLjA4KTsgfVxufVxuXG4ub3JkZXJzLWxpc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDE2cHg7XG59XG5cbi5vcmRlci1jYXJkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2VjZjBmMTtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBwYWRkaW5nOiAxNnB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBib3gtc2hhZG93OiAwIDFweCA0cHggcmdiYSgwLDAsMCwuMDYpO1xuXG4gIC5vcmRlci1oZWFkZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgfVxuXG4gIC5vcmRlci1tZXRhIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZ2FwOiAycHg7XG4gIH1cblxuICAub3JkZXItaWQge1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6ICMyYzNlNTA7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XG4gIH1cblxuICAub3JkZXItZGF0ZSB7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGNvbG9yOiAjN2Y4YzhkO1xuICB9XG59XG5cbi5zdGF0dXMtYmFkZ2Uge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHBhZGRpbmc6IDRweCAxMnB4O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBsZXR0ZXItc3BhY2luZzogLjVweDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cblxuLmN1c3RvbWVyLWluZm8ge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOiAjMmMzZTUwO1xuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGdhcDogNnB4O1xuXG4gIC5sYWJlbCB7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBjb2xvcjogIzdmOGM4ZDtcbiAgfVxuXG4gIC5lbWFpbC1saW5rIHtcbiAgICBjb2xvcjogIzE0OGY3NztcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuXG4gICAgJjpob3ZlciB7IHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyB9XG4gIH1cbn1cblxuLmRlbGl2ZXJ5LWluZm8ge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOiAjMmMzZTUwO1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGdhcDogNnB4O1xufVxuXG4uZGVsaXZlcnktYmFkZ2Uge1xuICBwYWRkaW5nOiAzcHggMTBweDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBmb250LXdlaWdodDogNjAwO1xuXG4gICYucGlja3VwICAgeyBiYWNrZ3JvdW5kOiAjZWFmNGZiOyBjb2xvcjogIzFhNTI3NjsgfVxuICAmLnNoaXBwaW5nIHsgYmFja2dyb3VuZDogI2ZkZjJlOTsgY29sb3I6ICM3ODQyMTI7IH1cbn1cblxuLnRyYWNraW5nLWxpbmstd3JhcCB7IGZvbnQtc2l6ZTogMTNweDsgY29sb3I6ICM3ZjhjOGQ7IH1cblxuLnRyYWNraW5nLWxpbmsge1xuICBjb2xvcjogIzZjMzQ4MztcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAmOmhvdmVyIHsgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IH1cbn1cblxuLnNoaXBwaW5nLWFkZHJlc3MtYmxvY2sge1xuICBmb250LXNpemU6IDEzcHg7XG4gIGNvbG9yOiAjMmMzZTUwO1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgZ2FwOiA4cHg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLnNoaXBwaW5nLWFkZHJlc3MtZGV0YWlsIHtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBiYWNrZ3JvdW5kOiAjZjBmYWY3O1xuICBib3JkZXItbGVmdDogM3B4IHNvbGlkICMxNDhmNzc7XG4gIHBhZGRpbmc6IDhweCAxMnB4O1xuICBib3JkZXItcmFkaXVzOiAwIDRweCA0cHggMDtcbiAgbGluZS1oZWlnaHQ6IDEuNjtcbiAgbWFyZ2luOiAwO1xufVxuXG4uaXRlbXMtbGlzdCB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZWNmMGYxO1xuICBwYWRkaW5nLXRvcDogMTBweDtcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xufVxuXG4uaXRlbS1yb3ctd3JhcHBlciB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjhmOWZhO1xuXG4gICY6bGFzdC1jaGlsZCB7IGJvcmRlci1ib3R0b206IG5vbmU7IH1cbn1cblxuLml0ZW0tcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBnYXA6IDhweDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZzogOHB4IDRweDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAuMTJzO1xuXG4gICY6aG92ZXIgeyBiYWNrZ3JvdW5kOiAjZjhmZmZlOyB9XG59XG5cbi5pdGVtLXRvZ2dsZSB7XG4gIGNvbG9yOiAjMTQ4Zjc3O1xuICBmb250LXNpemU6IDEzcHg7XG4gIHdpZHRoOiAxNHB4O1xuICBmbGV4LXNocmluazogMDtcbn1cblxuLml0ZW0tdGl0bGUge1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzJjM2U1MDtcbiAgZmxleDogMSAxIGF1dG87XG59XG5cbi5pdGVtLXJlZiB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgY29sb3I6ICMxNDhmNzc7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XG4gIGJhY2tncm91bmQ6ICNmMGZhZjc7XG4gIHBhZGRpbmc6IDJweCA2cHg7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbn1cblxuLml0ZW0tZGV0YWlsIHtcbiAgY29sb3I6ICM3ZjhjOGQ7XG4gIGZvbnQtc2l6ZTogMTNweDtcbn1cblxuLml0ZW0tcXR5IHtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBjb2xvcjogIzdmOGM4ZDtcbn1cblxuLml0ZW0tcHJpY2Uge1xuICBmb250LXNpemU6IDEzcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjMmMzZTUwO1xufVxuXG4ubGlnaHRib3gtb3ZlcmxheSB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgaW5zZXQ6IDA7XG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgLjg1KTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHotaW5kZXg6IDk5OTk7XG4gIGN1cnNvcjogem9vbS1vdXQ7XG59XG5cbi5saWdodGJveC1pbWcge1xuICBtYXgtd2lkdGg6IDkwdnc7XG4gIG1heC1oZWlnaHQ6IDkwdmg7XG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgY3Vyc29yOiBkZWZhdWx0O1xuICBib3gtc2hhZG93OiAwIDhweCAzMnB4IHJnYmEoMCwwLDAsLjUpO1xufVxuXG4ubGlnaHRib3gtY2xvc2Uge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMTZweDtcbiAgcmlnaHQ6IDIwcHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXNpemU6IDI4cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIG9wYWNpdHk6IC44O1xuXG4gICY6aG92ZXIgeyBvcGFjaXR5OiAxOyB9XG59XG5cbi5pdGVtLWRldGFpbC1wYW5lbCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMTZweDtcbiAgcGFkZGluZzogMTJweCAxOHB4IDE0cHg7XG4gIGJhY2tncm91bmQ6ICNmOGZmZmU7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xuXG4gIC5pdGVtLWltZyB7XG4gICAgd2lkdGg6IDEwMHB4O1xuICAgIGhlaWdodDogMTAwcHg7XG4gICAgb2JqZWN0LWZpdDogY292ZXI7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNlY2YwZjE7XG4gICAgY3Vyc29yOiB6b29tLWluO1xuICB9XG5cbiAgLml0ZW0tZGV0YWlsLWluZm8ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBnYXA6IDRweDtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gICAgY29sb3I6ICMyYzNlNTA7XG4gIH1cblxuICAuZGV0YWlsLWxhYmVsIHtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGNvbG9yOiAjN2Y4YzhkO1xuICAgIG1hcmdpbi1yaWdodDogNHB4O1xuICB9XG59XG5cbi5vcmRlci10b3RhbCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBwYWRkaW5nOiA4cHggNHB4O1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2VjZjBmMTtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcblxuICAudG90YWwtbGFiZWwge1xuICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICBjb2xvcjogIzdmOGM4ZDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICB9XG5cbiAgLnRvdGFsLWFtb3VudCB7XG4gICAgZm9udC1zaXplOiAxNXB4O1xuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgY29sb3I6ICMyYzNlNTA7XG4gIH1cblxuICAmLS10dGMge1xuICAgIGJvcmRlci10b3A6IDJweCBzb2xpZCAjMmMzZTUwO1xuICAgIG1hcmdpbi10b3A6IDRweDtcbiAgfVxufVxuXG4ub3JkZXItYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMTBweDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmJ0biB7XG4gIHBhZGRpbmc6IDhweCAxOHB4O1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgLjE1cztcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG5cbiAgJjpkaXNhYmxlZCB7XG4gICAgb3BhY2l0eTogLjY7XG4gICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgfVxufVxuXG4uYnRuLXJlYWR5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzE0OGY3NztcbiAgY29sb3I6ICNmZmY7XG5cbiAgJjpob3Zlcjpub3QoOmRpc2FibGVkKSB7IG9wYWNpdHk6IC44NTsgfVxufVxuXG4uYnRuLXBhaWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmMzZTUwO1xuICBjb2xvcjogI2ZmZjtcblxuICAmOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHsgb3BhY2l0eTogLjg1OyB9XG59XG5cbi5idG4tcmVzZW5kIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjMTQ4Zjc3O1xuICBib3JkZXI6IDFweCBzb2xpZCAjMTQ4Zjc3O1xuXG4gICY6aG92ZXI6bm90KDpkaXNhYmxlZCkge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMxNDhmNzc7XG4gICAgY29sb3I6ICNmZmY7XG4gIH1cbiAgJjpkaXNhYmxlZCB7IG9wYWNpdHk6IC42OyB9XG59XG5cbi5wYWlkLWxhYmVsIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogIzE0OGY3NztcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLmJ0bi1zaGlwcGVkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzZjMzQ4MztcbiAgY29sb3I6ICNmZmY7XG5cbiAgJjpob3Zlcjpub3QoOmRpc2FibGVkKSB7IG9wYWNpdHk6IC44NTsgfVxufVxuXG4uc2hpcHBlZC1sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY29sb3I6ICM2YzM0ODM7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5zaGlwcGluZy1mb3JtIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQ6ICNmYWY1ZmY7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkN2JkZTI7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgcGFkZGluZzogMTZweDtcbiAgbWFyZ2luLXRvcDogOHB4O1xufVxuXG4uc2hpcHBpbmctZm9ybS1maWVsZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogNHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xufVxuXG4uc2hpcHBpbmctbGFiZWwge1xuICBmb250LXNpemU6IDEzcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjMmMzZTUwO1xuXG4gIC5yZXF1aXJlZCB7IGNvbG9yOiAjZTc0YzNjOyB9XG4gIC5vcHRpb25hbCB7IGZvbnQtd2VpZ2h0OiA0MDA7IGNvbG9yOiAjN2Y4YzhkOyB9XG59XG5cbi5zaGlwcGluZy1pbnB1dCB7XG4gIHBhZGRpbmc6IDhweCAxMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZDdiZGUyO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIG91dGxpbmU6IG5vbmU7XG5cbiAgJjpmb2N1cyB7IGJvcmRlci1jb2xvcjogIzZjMzQ4MzsgfVxuICAmLmlucHV0LWVycm9yIHsgYm9yZGVyLWNvbG9yOiAjZTc0YzNjOyB9XG59XG5cbi5maWVsZC1lcnJvciB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgY29sb3I6ICNlNzRjM2M7XG59XG5cbi5zaGlwcGluZy1mb3JtLWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDEwcHg7XG4gIG1hcmdpbi10b3A6IDRweDtcbn1cblxuLmJ0bi1jYW5jZWwge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICM3ZjhjOGQ7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNiZGMzYzc7XG5cbiAgJjpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gICAgYmFja2dyb3VuZDogI2Y4ZjlmYTtcbiAgfVxufVxuXG4uc2hpcHBpbmctcGVuZGluZy1sYWJlbCB7XG4gIGNvbG9yOiAjZTY3ZTIyO1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG59XG5cbi5jYW5jZWxsZWQtbGFiZWwge1xuICBjb2xvcjogIzk1YTVhNjtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLmJ0bi1jYW5jZWwtb3JkZXIge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICNlNzRjM2M7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlNzRjM2M7XG4gIGZvbnQtc2l6ZTogMTNweDtcblxuICAmOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHtcbiAgICBiYWNrZ3JvdW5kOiAjZmRmMmYyO1xuICB9XG59XG5cbi5idG4tY2FuY2VsLW9yZGVyLWNvbmZpcm0ge1xuICBiYWNrZ3JvdW5kOiAjZTc0YzNjO1xuICBjb2xvcjogI2ZmZjtcbiAgYm9yZGVyOiBub25lO1xuXG4gICY6aG92ZXI6bm90KDpkaXNhYmxlZCkge1xuICAgIGJhY2tncm91bmQ6ICNjMDM5MmI7XG4gIH1cbn1cblxuLmNhbmNlbC1jb25maXJtLWJsb2NrIHtcbiAgYmFja2dyb3VuZDogI2ZkZjJmMjtcbiAgYm9yZGVyOiAxcHggc29saWQgI2Y1YjdiMTtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5jYW5jZWwtY29uZmlybS1tc2cge1xuICBmb250LXNpemU6IDEzcHg7XG4gIGNvbG9yOiAjOTIyYjIxO1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4uc2hpcHBpbmctZm9ybS1pbmZvIHtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBjb2xvcjogIzZjMzQ4MztcbiAgYmFja2dyb3VuZDogI2Y1ZWVmODtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwYWRkaW5nOiA4cHggMTJweDtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
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
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "tr")(1, "td", 34)(2, "code");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "td", 35)(5, "textarea", 37);
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
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "td", 35)(7, "textarea", 37);
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
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 38)(6, "div", 39)(7, "label", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, "\uD83C\uDDEB\uD83C\uDDF7 Titre fran\u00E7ais");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "input", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function AdminSettingsComponent_section_10_Template_input_ngModelChange_9_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r11);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx_r1.appTitleFr, $event) || (ctx_r1.appTitleFr = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "div", 39)(11, "label", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12, "\uD83C\uDDEC\uD83C\uDDE7 English title");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "input", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function AdminSettingsComponent_section_10_Template_input_ngModelChange_13_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r11);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx_r1.appTitleEn, $event) || (ctx_r1.appTitleEn = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](14, AdminSettingsComponent_section_10_p_14_Template, 2, 1, "p", 11)(15, AdminSettingsComponent_section_10_p_15_Template, 2, 0, "p", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "button", 43);
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
      consts: [["carouselPicker", ""], [1, "settings-container"], [1, "settings-nav"], [1, "settings-nav-btn", 3, "click"], ["class", "settings-section", 4, "ngIf"], [1, "settings-section"], [1, "settings-title"], [1, "settings-hint"], [1, "drop-zone", 3, "dragover", "dragleave", "drop", "click"], ["type", "file", "multiple", "", "accept", "image/*", 2, "display", "none", 3, "change"], [4, "ngIf"], ["class", "settings-error", 4, "ngIf"], ["class", "settings-empty", 4, "ngIf"], [1, "slide-list"], ["class", "slide-row", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "settings-error"], [1, "settings-empty"], [1, "slide-row"], [1, "slide-thumb", 3, "src", "alt"], [1, "slide-index"], [1, "slide-actions"], [1, "btn-order", 3, "click", "disabled"], [1, "btn-delete-slide", 3, "click", "disabled"], [1, "translations-header"], [1, "translations-actions"], [1, "btn-reload", 3, "click", "disabled"], [1, "btn-save-translations", 3, "click", "disabled"], ["class", "settings-success", 4, "ngIf"], ["class", "translations-search", 4, "ngIf"], ["class", "translations-table", 4, "ngIf"], [1, "settings-success"], [1, "translations-search"], ["type", "search", "placeholder", "Filtrer par cl\u00E9 ou valeur\u2026", 1, "translations-filter-input", 3, "ngModelChange", "ngModel"], [1, "translations-table"], [1, "col-key"], [1, "col-lang"], [3, "dirty-row", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["rows", "2", 1, "translation-input", 3, "ngModelChange", "ngModel"], [1, "title-fields"], [1, "title-field"], [1, "title-label"], ["type", "text", "placeholder", "ex : D\u00E9lice \u00C9ternel", 1, "title-input", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "ex : Eternal Delight", 1, "title-input", 3, "ngModelChange", "ngModel"], [1, "btn-save-title", 3, "click", "disabled"]],
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
      styles: [".settings-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  max-width: 900px;\n}\n\n.settings-nav[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 1.5rem;\n  border-bottom: 2px solid #e0e0e0;\n  padding-bottom: 0.5rem;\n}\n\n.settings-nav-btn[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  font-size: 0.95rem;\n  border-radius: 4px 4px 0 0;\n  color: #555;\n  transition: background 0.15s, color 0.15s;\n}\n.settings-nav-btn[_ngcontent-%COMP%]:hover {\n  background: #f0f0f0;\n}\n.settings-nav-btn.active[_ngcontent-%COMP%] {\n  background: #fff;\n  color: #8b4513;\n  font-weight: 600;\n  border-bottom: 2px solid #8b4513;\n  margin-bottom: -2px;\n}\n\n.settings-section[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 8px;\n  padding: 1.5rem;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);\n}\n\n.settings-title[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #333;\n}\n\n.settings-hint[_ngcontent-%COMP%] {\n  color: #777;\n  font-size: 0.875rem;\n  margin-bottom: 1rem;\n}\n\n.settings-error[_ngcontent-%COMP%] {\n  color: #c0392b;\n  font-size: 0.875rem;\n  margin: 0.5rem 0;\n}\n\n.settings-success[_ngcontent-%COMP%] {\n  color: #27ae60;\n  font-size: 0.875rem;\n  margin: 0.5rem 0;\n}\n\n.settings-empty[_ngcontent-%COMP%] {\n  color: #999;\n  font-style: italic;\n  padding: 1rem 0;\n}\n\n.drop-zone[_ngcontent-%COMP%] {\n  border: 2px dashed #ccc;\n  border-radius: 8px;\n  padding: 2rem;\n  text-align: center;\n  cursor: pointer;\n  transition: border-color 0.2s, background 0.2s;\n  color: #777;\n  margin-bottom: 1rem;\n}\n.drop-zone[_ngcontent-%COMP%]:hover, .drop-zone.drag-over[_ngcontent-%COMP%] {\n  border-color: #8b4513;\n  background: #fdf5ee;\n  color: #8b4513;\n}\n\n.slide-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  margin-top: 0.75rem;\n}\n\n.slide-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.5rem;\n  border: 1px solid #eee;\n  border-radius: 6px;\n  background: #fafafa;\n}\n\n.slide-thumb[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 48px;\n  object-fit: cover;\n  border-radius: 4px;\n  border: 1px solid #ddd;\n}\n\n.slide-index[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #aaa;\n  width: 20px;\n  text-align: center;\n}\n\n.slide-actions[_ngcontent-%COMP%] {\n  margin-left: auto;\n  display: flex;\n  gap: 0.25rem;\n}\n\n.btn-order[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border: 1px solid #ccc;\n  background: #fff;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 0.85rem;\n  line-height: 1;\n}\n.btn-order[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f0e8df;\n  border-color: #8b4513;\n}\n.btn-order[_ngcontent-%COMP%]:disabled {\n  opacity: 0.35;\n  cursor: default;\n}\n\n.btn-delete-slide[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border: 1px solid #e74c3c;\n  background: #fff;\n  color: #e74c3c;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 0.85rem;\n  line-height: 1;\n}\n.btn-delete-slide[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #fdecea;\n}\n.btn-delete-slide[_ngcontent-%COMP%]:disabled {\n  opacity: 0.35;\n  cursor: default;\n}\n\n.translations-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 1rem;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n\n.translations-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n}\n\n.btn-reload[_ngcontent-%COMP%] {\n  padding: 0.4rem 0.9rem;\n  border: 1px solid #ccc;\n  background: #fff;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 0.875rem;\n}\n.btn-reload[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f5f5f5;\n}\n.btn-reload[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n\n.btn-save-translations[_ngcontent-%COMP%] {\n  padding: 0.4rem 0.9rem;\n  border: none;\n  background: #8b4513;\n  color: #fff;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 0.875rem;\n}\n.btn-save-translations[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #7a3b10;\n}\n.btn-save-translations[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n\n.translations-search[_ngcontent-%COMP%] {\n  margin-bottom: 0.75rem;\n}\n\n.translations-filter-input[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 360px;\n  padding: 0.4rem 0.7rem;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 0.875rem;\n}\n\n.translations-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.875rem;\n}\n.translations-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 0.5rem 0.75rem;\n  background: #f5f5f5;\n  border-bottom: 2px solid #ddd;\n  color: #555;\n  font-weight: 600;\n}\n.translations-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.35rem 0.75rem;\n  border-bottom: 1px solid #f0f0f0;\n  vertical-align: top;\n}\n.translations-table[_ngcontent-%COMP%]   tr.dirty-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: #fffbe6;\n}\n.translations-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: #fafafa;\n}\n\n.col-key[_ngcontent-%COMP%] {\n  width: 30%;\n}\n\n.col-lang[_ngcontent-%COMP%] {\n  width: 35%;\n}\n\n.translation-input[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #ddd;\n  border-radius: 3px;\n  padding: 0.25rem 0.4rem;\n  font-size: 0.8rem;\n  resize: vertical;\n  font-family: inherit;\n}\n.translation-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #8b4513;\n  box-shadow: 0 0 0 2px rgba(139, 69, 19, 0.15);\n}\n\n.title-fields[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n\n.title-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n\n.title-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #555;\n}\n\n.title-input[_ngcontent-%COMP%] {\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 0.95rem;\n  max-width: 400px;\n}\n.title-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #8b4513;\n  box-shadow: 0 0 0 2px rgba(139, 69, 19, 0.15);\n}\n\n.btn-save-title[_ngcontent-%COMP%] {\n  padding: 0.5rem 1.25rem;\n  border: none;\n  background: #8b4513;\n  color: #fff;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 0.9rem;\n}\n.btn-save-title[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #7a3b10;\n}\n.btn-save-title[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvYWRtaW4vYWRtaW4tc2V0dGluZ3MvYWRtaW4tc2V0dGluZ3MuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7QUFDRjs7QUFHQTtFQUNFLGFBQUE7RUFDQSxXQUFBO0VBQ0EscUJBQUE7RUFDQSxnQ0FBQTtFQUNBLHNCQUFBO0FBQUY7O0FBR0E7RUFDRSxvQkFBQTtFQUNBLFlBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLDBCQUFBO0VBQ0EsV0FBQTtFQUNBLHlDQUFBO0FBQUY7QUFFRTtFQUFVLG1CQUFBO0FBQ1o7QUFBRTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxtQkFBQTtBQUVKOztBQUdBO0VBQ0UsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSx5Q0FBQTtBQUFGOztBQUdBO0VBQ0Usa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsV0FBQTtBQUFGOztBQUdBO0VBQ0UsV0FBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFBRjs7QUFHQTtFQUFvQixjQUFBO0VBQWdCLG1CQUFBO0VBQXFCLGdCQUFBO0FBR3pEOztBQUZBO0VBQW9CLGNBQUE7RUFBZ0IsbUJBQUE7RUFBcUIsZ0JBQUE7QUFRekQ7O0FBUEE7RUFBb0IsV0FBQTtFQUFhLGtCQUFBO0VBQW9CLGVBQUE7QUFhckQ7O0FBVkE7RUFDRSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLDhDQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0FBYUY7QUFYRTtFQUNFLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0FBYUo7O0FBUkE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7QUFXRjs7QUFSQTtFQUNFLGFB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QUFBO0FBK0IzQjtBQTlCRTtFQUFhLFlBQUE7RUFBYyxlQUFBO0FBa0M3QiIsInNvdXJjZXNDb250ZW50IjpbIi5zZXR0aW5ncy1jb250YWluZXIge1xuICBwYWRkaW5nOiAxLjVyZW07XG4gIG1heC13aWR0aDogOTAwcHg7XG59XG5cbi8vIMOiwpTCgMOiwpTCgCBOYXZpZ2F0aW9uXG4uc2V0dGluZ3MtbmF2IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAwLjVyZW07XG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNlMGUwZTA7XG4gIHBhZGRpbmctYm90dG9tOiAwLjVyZW07XG59XG5cbi5zZXR0aW5ncy1uYXYtYnRuIHtcbiAgcGFkZGluZzogMC41cmVtIDFyZW07XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC1zaXplOiAwLjk1cmVtO1xuICBib3JkZXItcmFkaXVzOiA0cHggNHB4IDAgMDtcbiAgY29sb3I6ICM1NTU7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4xNXMsIGNvbG9yIDAuMTVzO1xuXG4gICY6aG92ZXIgeyBiYWNrZ3JvdW5kOiAjZjBmMGYwOyB9XG4gICYuYWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgIGNvbG9yOiAjOGI0NTEzO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICM4YjQ1MTM7XG4gICAgbWFyZ2luLWJvdHRvbTogLTJweDtcbiAgfVxufVxuXG4vLyDDosKUwoDDosKUwoAgU2VjdGlvblxuLnNldHRpbmdzLXNlY3Rpb24ge1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIHBhZGRpbmc6IDEuNXJlbTtcbiAgYm94LXNoYWRvdzogMCAxcHggNHB4IHJnYmEoMCwwLDAsLjA4KTtcbn1cblxuLnNldHRpbmdzLXRpdGxlIHtcbiAgbWFyZ2luOiAwIDAgMC41cmVtO1xuICBmb250LXNpemU6IDEuMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICMzMzM7XG59XG5cbi5zZXR0aW5ncy1oaW50IHtcbiAgY29sb3I6ICM3Nzc7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG5cbi5zZXR0aW5ncy1lcnJvciAgIHsgY29sb3I6ICNjMDM5MmI7IGZvbnQtc2l6ZTogMC44NzVyZW07IG1hcmdpbjogMC41cmVtIDA7IH1cbi5zZXR0aW5ncy1zdWNjZXNzIHsgY29sb3I6ICMyN2FlNjA7IGZvbnQtc2l6ZTogMC44NzVyZW07IG1hcmdpbjogMC41cmVtIDA7IH1cbi5zZXR0aW5ncy1lbXB0eSAgIHsgY29sb3I6ICM5OTk7IGZvbnQtc3R5bGU6IGl0YWxpYzsgcGFkZGluZzogMXJlbSAwOyB9XG5cbi8vIMOiwpTCgMOiwpTCgCBEcm9wIHpvbmUgKGNhcm91c2VsKVxuLmRyb3Atem9uZSB7XG4gIGJvcmRlcjogMnB4IGRhc2hlZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIHBhZGRpbmc6IDJyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4ycywgYmFja2dyb3VuZCAwLjJzO1xuICBjb2xvcjogIzc3NztcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcblxuICAmOmhvdmVyLCAmLmRyYWctb3ZlciB7XG4gICAgYm9yZGVyLWNvbG9yOiAjOGI0NTEzO1xuICAgIGJhY2tncm91bmQ6ICNmZGY1ZWU7XG4gICAgY29sb3I6ICM4YjQ1MTM7XG4gIH1cbn1cblxuLy8gw6LClMKAw6LClMKAIFNsaWRlIGxpc3Rcbi5zbGlkZS1saXN0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAwLjVyZW07XG4gIG1hcmdpbi10b3A6IDAuNzVyZW07XG59XG5cbi5zbGlkZS1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDAuNzVyZW07XG4gIHBhZGRpbmc6IDAuNXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2VlZTtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBiYWNrZ3JvdW5kOiAjZmFmYWZhO1xufVxuXG4uc2xpZGUtdGh1bWIge1xuICB3aWR0aDogNjRweDtcbiAgaGVpZ2h0OiA0OHB4O1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xufVxuXG4uc2xpZGUtaW5kZXgge1xuICBmb250LXNpemU6IDAuOHJlbTtcbiAgY29sb3I6ICNhYWE7XG4gIHdpZHRoOiAyMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5zbGlkZS1hY3Rpb25zIHtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMC4yNXJlbTtcbn1cblxuLmJ0bi1vcmRlciB7XG4gIHdpZHRoOiAyOHB4O1xuICBoZWlnaHQ6IDI4cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250LXNpemU6IDAuODVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxO1xuXG4gICY6aG92ZXI6bm90KDpkaXNhYmxlZCkgeyBiYWNrZ3JvdW5kOiAjZjBlOGRmOyBib3JkZXItY29sb3I6ICM4YjQ1MTM7IH1cbiAgJjpkaXNhYmxlZCB7IG9wYWNpdHk6IDAuMzU7IGN1cnNvcjogZGVmYXVsdDsgfVxufVxuXG4uYnRuLWRlbGV0ZS1zbGlkZSB7XG4gIHdpZHRoOiAyOHB4O1xuICBoZWlnaHQ6IDI4cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlNzRjM2M7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGNvbG9yOiAjZTc0YzNjO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC1zaXplOiAwLjg1cmVtO1xuICBsaW5lLWhlaWdodDogMTtcblxuICAmOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHsgYmFja2dyb3VuZDogI2ZkZWNlYTsgfVxuICAmOmRpc2FibGVkIHsgb3BhY2l0eTogMC4zNTsgY3Vyc29yOiBkZWZhdWx0OyB9XG59XG5cbi8vIMOiwpTCgMOiwpTCgCBUcmFuc2xhdGlvbnNcbi50cmFuc2xhdGlvbnMtaGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGdhcDogMC41cmVtO1xufVxuXG4udHJhbnNsYXRpb25zLWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDAuNXJlbTtcbn1cblxuLmJ0bi1yZWxvYWQge1xuICBwYWRkaW5nOiAwLjRyZW0gMC45cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcblxuICAmOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHsgYmFja2dyb3VuZDogI2Y1ZjVmNTsgfVxuICAmOmRpc2FibGVkIHsgb3BhY2l0eTogMC41OyBjdXJzb3I6IGRlZmF1bHQ7IH1cbn1cblxuLmJ0bi1zYXZlLXRyYW5zbGF0aW9ucyB7XG4gIHBhZGRpbmc6IDAuNHJlbSAwLjlyZW07XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZDogIzhiNDUxMztcbiAgY29sb3I6ICNmZmY7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuXG4gICY6aG92ZXI6bm90KDpkaXNhYmxlZCkgeyBiYWNrZ3JvdW5kOiAjN2EzYjEwOyB9XG4gICY6ZGlzYWJsZWQgeyBvcGFjaXR5OiAwLjU7IGN1cnNvcjogZGVmYXVsdDsgfVxufVxuXG4udHJhbnNsYXRpb25zLXNlYXJjaCB7XG4gIG1hcmdpbi1ib3R0b206IDAuNzVyZW07XG59XG5cbi50cmFuc2xhdGlvbnMtZmlsdGVyLWlucHV0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC13aWR0aDogMzYwcHg7XG4gIHBhZGRpbmc6IDAuNHJlbSAwLjdyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbn1cblxuLnRyYW5zbGF0aW9ucy10YWJsZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuXG4gIHRoIHtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgIHBhZGRpbmc6IDAuNXJlbSAwLjc1cmVtO1xuICAgIGJhY2tncm91bmQ6ICNmNWY1ZjU7XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNkZGQ7XG4gICAgY29sb3I6ICM1NTU7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgfVxuXG4gIHRkIHtcbiAgICBwYWRkaW5nOiAwLjM1cmVtIDAuNzVyZW07XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmMGYwZjA7XG4gICAgdmVydGljYWwtYWxpZ246IHRvcDtcbiAgfVxuXG4gIHRyLmRpcnR5LXJvdyB0ZCB7IGJhY2tncm91bmQ6ICNmZmZiZTY7IH1cbiAgdHI6aG92ZXIgdGQgeyBiYWNrZ3JvdW5kOiAjZmFmYWZhOyB9XG59XG5cbi5jb2wta2V5ICAgeyB3aWR0aDogMzAlOyB9XG4uY29sLWxhbmcgIHsgd2lkdGg6IDM1JTsgfVxuXG4udHJhbnNsYXRpb24taW5wdXQge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBwYWRkaW5nOiAwLjI1cmVtIDAuNHJlbTtcbiAgZm9udC1zaXplOiAwLjhyZW07XG4gIHJlc2l6ZTogdmVydGljYWw7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuXG4gICY6Zm9jdXMge1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgYm9yZGVyLWNvbG9yOiAjOGI0NTEzO1xuICAgIGJveC1zaGFkb3c6IDAgMCAwIDJweCByZ2JhKDEzOSw2OSwxOSwuMTUpO1xuICB9XG59XG5cbi8vIMOiwpTCgMOiwpTCgCBUaXRsZSBzZWN0aW9uXG4udGl0bGUtZmllbGRzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAxcmVtO1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xufVxuXG4udGl0bGUtZmllbGQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDAuMzVyZW07XG59XG5cbi50aXRsZS1sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjNTU1O1xufVxuXG4udGl0bGUtaW5wdXQge1xuICBwYWRkaW5nOiAwLjVyZW0gMC43NXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDAuOTVyZW07XG4gIG1heC13aWR0aDogNDAwcHg7XG5cbiAgJjpmb2N1cyB7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgICBib3JkZXItY29sb3I6ICM4YjQ1MTM7XG4gICAgYm94LXNoYWRvdzogMCAwIDAgMnB4IHJnYmEoMTM5LDY5LDE5LC4xNSk7XG4gIH1cbn1cblxuLmJ0bi1zYXZlLXRpdGxlIHtcbiAgcGFkZGluZzogMC41cmVtIDEuMjVyZW07XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZDogIzhiNDUxMztcbiAgY29sb3I6ICNmZmY7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250LXNpemU6IDAuOXJlbTtcblxuICAmOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHsgYmFja2dyb3VuZDogIzdhM2IxMDsgfVxuICAmOmRpc2FibGVkIHsgb3BhY2l0eTogMC41OyBjdXJzb3I6IGRlZmF1bHQ7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
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
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 2510);
/* harmony import */ var _app_features_store_catalog_catalog_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @app/features/store/catalog/catalog.selectors */ 90077);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngrx/store */ 81383);
/* harmony import */ var _app_core_firebase_catalog_repository__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @app/core/firebase/catalog.repository */ 53521);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 79748);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-quill */ 12041);











function AdminCatalogComponent_ng_container_0_div_4_p_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r1.createError);
  }
}
function AdminCatalogComponent_ng_container_0_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 9)(1, "h3", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "Cr\u00E9er une cat\u00E9gorie");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 11)(4, "label", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "Pr\u00E9fixe ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9, " \u2014 segment d'URI\u00A0: lettres minuscules, chiffres, tirets (ex\u00A0: bijoux, sac-femme)");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "input", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayListener"]("ngModelChange", function AdminCatalogComponent_ng_container_0_div_4_Template_input_ngModelChange_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayBindingSet"](ctx_r1.newPrefix, $event) || (ctx_r1.newPrefix = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("input", function AdminCatalogComponent_ng_container_0_div_4_Template_input_input_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.onPrefixInput($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "div", 11)(12, "label", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](13, "Titre ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](15, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "input", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayListener"]("ngModelChange", function AdminCatalogComponent_ng_container_0_div_4_Template_input_ngModelChange_16_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayBindingSet"](ctx_r1.newTitle, $event) || (ctx_r1.newTitle = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "div", 11)(18, "label", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](19, "Description ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](21, "(optionnel)");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "div", 18)(23, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_0_div_4_Template_button_click_23_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.descLang = "fr");
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](24, "\uD83C\uDDEB\uD83C\uDDF7 FR");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](25, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_0_div_4_Template_button_click_25_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.descLang = "en");
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](26, "\uD83C\uDDEC\uD83C\uDDE7 EN");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](27, "quill-editor", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("onContentChanged", function AdminCatalogComponent_ng_container_0_div_4_Template_quill_editor_onContentChanged_27_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.onNewDescChanged("fr", $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](28, "quill-editor", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("onContentChanged", function AdminCatalogComponent_ng_container_0_div_4_Template_quill_editor_onContentChanged_28_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.onNewDescChanged("en", $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](29, AdminCatalogComponent_ng_container_0_div_4_p_29_Template, 2, 1, "p", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](30, "div", 23)(31, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_0_div_4_Template_button_click_31_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.submitCreateCategory());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](33, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_0_div_4_Template_button_click_33_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.cancelCreate());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](34, "Annuler");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.newPrefix);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.newTitle);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("active", ctx_r1.descLang === "fr");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("active", ctx_r1.descLang === "en");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("hidden", ctx_r1.descLang !== "fr")("ngModel", ctx_r1.newDescription)("modules", ctx_r1.quillModules);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("hidden", ctx_r1.descLang !== "en")("ngModel", ctx_r1.newDescriptionEn)("modules", ctx_r1.quillModules);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.createError);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r1.creating);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r1.creating ? "\u2026" : "Cr\u00E9er", " ");
  }
}
function AdminCatalogComponent_ng_container_0_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " Aucune cat\u00E9gorie. Cr\u00E9ez-en une pour commencer. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function AdminCatalogComponent_ng_container_0_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 28)(1, "div", 29)(2, "div", 30)(3, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "div", 33)(8, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_0_div_7_Template_button_click_8_listener() {
      const cat_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r4).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.toggleCategoryPublished(cat_r5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "button", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_0_div_7_Template_button_click_10_listener() {
      const cat_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r4).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.selectCategory(cat_r5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, "G\u00E9rer \u2192");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_0_div_7_Template_button_click_12_listener() {
      const cat_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r4).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.deleteCategory(cat_r5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](13, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const cat_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](cat_r5.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](cat_r5.prefix);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("published", cat_r5.published);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", cat_r5.published ? "\u2713 Publi\u00E9" : "Publier", " ");
  }
}
function AdminCatalogComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 3)(2, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_0_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.openCreateForm());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "+ Nouvelle cat\u00E9gorie");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, AdminCatalogComponent_ng_container_0_div_4_Template, 35, 15, "div", 5)(5, AdminCatalogComponent_ng_container_0_div_5_Template, 2, 0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, AdminCatalogComponent_ng_container_0_div_7_Template, 14, 5, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.showCreateForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.categories.length === 0 && !ctx_r1.showCreateForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r1.categories)("ngForTrackBy", ctx_r1.trackByPrefix);
  }
}
function AdminCatalogComponent_ng_container_1_button_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_button_15_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.openEditDesc(ctx_r1.selectedCategory));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "\u270E Modifier");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function AdminCatalogComponent_ng_container_1_ng_container_16_p_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "p", 66);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("innerHTML", ctx_r1.selectedCategory.description, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeHtml"]);
  }
}
function AdminCatalogComponent_ng_container_1_ng_container_16_p_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Aucune description FR.");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function AdminCatalogComponent_ng_container_1_ng_container_16_p_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "p", 68);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("innerHTML", ctx_r1.selectedCategory.descriptionEn, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeHtml"]);
  }
}
function AdminCatalogComponent_ng_container_1_ng_container_16_p_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Aucune description EN.");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function AdminCatalogComponent_ng_container_1_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, AdminCatalogComponent_ng_container_1_ng_container_16_p_1_Template, 1, 1, "p", 63)(2, AdminCatalogComponent_ng_container_1_ng_container_16_p_2_Template, 2, 0, "p", 64)(3, AdminCatalogComponent_ng_container_1_ng_container_16_p_3_Template, 1, 1, "p", 65)(4, AdminCatalogComponent_ng_container_1_ng_container_16_p_4_Template, 2, 0, "p", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.selectedCategory.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r1.selectedCategory.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.selectedCategory.descriptionEn);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r1.selectedCategory.descriptionEn);
  }
}
function AdminCatalogComponent_ng_container_1_ng_container_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 18)(2, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_ng_container_17_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.editDescLang = "fr");
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "\uD83C\uDDEB\uD83C\uDDF7 FR");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_ng_container_17_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.editDescLang = "en");
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "\uD83C\uDDEC\uD83C\uDDE7 EN");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 69)(7, "div", 70)(8, "quill-editor", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("onContentChanged", function AdminCatalogComponent_ng_container_1_ng_container_17_Template_quill_editor_onContentChanged_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.onDescChanged("fr", $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "quill-editor", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("onContentChanged", function AdminCatalogComponent_ng_container_1_ng_container_17_Template_quill_editor_onContentChanged_9_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.onDescChanged("en", $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "div", 71)(11, "p", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](12, "Aper\u00E7u");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](13, "div", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "div", 74)(15, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_ng_container_17_Template_button_click_15_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.saveDesc());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_ng_container_17_Template_button_click_17_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.cancelEditDesc());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](18, "Annuler");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("active", ctx_r1.editDescLang === "fr");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("active", ctx_r1.editDescLang === "en");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("hidden", ctx_r1.editDescLang !== "fr")("ngModel", ctx_r1.editDescFr)("modules", ctx_r1.quillModules);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("hidden", ctx_r1.editDescLang !== "en")("ngModel", ctx_r1.editDescEn)("modules", ctx_r1.quillModules);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("innerHTML", ctx_r1.editDescLang === "fr" ? ctx_r1.editDescFr : ctx_r1.editDescEn, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r1.savingDesc);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r1.savingDesc ? "\u2026" : "Enregistrer", " ");
  }
}
function AdminCatalogComponent_ng_container_1_div_30_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_div_30_button_3_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r11);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.prepareMerge());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"](" Regrouper ", ctx_r1.selectedCount, " image", ctx_r1.selectedCount > 1 ? "s" : "", " ");
  }
}
function AdminCatalogComponent_ng_container_1_div_30_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " Cliquez sur les images \u00E0 regrouper ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function AdminCatalogComponent_ng_container_1_div_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 75)(1, "button", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_div_30_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r10);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.toggleSelectionMode());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, AdminCatalogComponent_ng_container_1_div_30_button_3_Template, 2, 2, "button", 77)(4, AdminCatalogComponent_ng_container_1_div_30_span_4_Template, 2, 0, "span", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("active", ctx_r1.selectionMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r1.selectionMode ? "\u2715 Annuler la s\u00E9lection" : "\u229E Mode regroupement", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.selectionMode && ctx_r1.selectedCount > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.selectionMode && ctx_r1.selectedCount === 0);
  }
}
function AdminCatalogComponent_ng_container_1_div_31_div_4_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Cover");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function AdminCatalogComponent_ng_container_1_div_31_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_div_31_div_4_Template_div_click_0_listener() {
      const i_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r13).index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.pendingMerge.coverIndex = i_r14);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "img", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, AdminCatalogComponent_ng_container_1_div_31_div_4_span_2_Template, 2, 0, "span", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const preview_r15 = ctx.$implicit;
    const i_r14 = ctx.index;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("is-cover", ctx_r1.pendingMerge.coverIndex === i_r14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("src", preview_r15, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.pendingMerge.coverIndex === i_r14);
  }
}
function AdminCatalogComponent_ng_container_1_div_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 81)(1, "p", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "Choisissez la photo de couverture");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, AdminCatalogComponent_ng_container_1_div_31_div_4_Template, 3, 4, "div", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 85)(6, "button", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_div_31_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r12);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.confirmMerge());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7, "Confirmer le regroupement");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_div_31_Template_button_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r12);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.pendingMerge = null);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9, "Annuler");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r1.pendingMerge.previews);
  }
}
function AdminCatalogComponent_ng_container_1_div_32_div_1_div_7_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Cover");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function AdminCatalogComponent_ng_container_1_div_32_div_1_div_7_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 107)(1, "span", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const fi_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().index;
    const gi_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().index;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("checked", ctx_r1.isImageSelected(gi_r17, fi_r19));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r1.isImageSelected(gi_r17, fi_r19) ? "\u2713" : "", " ");
  }
}
function AdminCatalogComponent_ng_container_1_div_32_div_1_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_div_32_div_1_div_7_Template_div_click_0_listener($event) {
      const fi_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r18).index;
      const gi_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.selectionMode ? ctx_r1.toggleImageSelection(gi_r17, fi_r19, $event) : ctx_r1.setCover(gi_r17, fi_r19));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "img", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, AdminCatalogComponent_ng_container_1_div_32_div_1_div_7_span_2_Template, 2, 0, "span", 89)(3, AdminCatalogComponent_ng_container_1_div_32_div_1_div_7_span_3_Template, 3, 3, "span", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const preview_r20 = ctx.$implicit;
    const fi_r19 = ctx.index;
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    const group_r22 = ctx_r20.$implicit;
    const gi_r17 = ctx_r20.index;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("is-cover", group_r22.coverIndex === fi_r19 && !ctx_r1.selectionMode)("is-selected", ctx_r1.isImageSelected(gi_r17, fi_r19));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("src", preview_r20, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", group_r22.coverIndex === fi_r19 && !ctx_r1.selectionMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.selectionMode);
  }
}
function AdminCatalogComponent_ng_container_1_div_32_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 93)(1, "div", 94)(2, "span", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "button", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_div_32_div_1_Template_button_click_4_listener() {
      const gi_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r16).index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.removeGroup(gi_r17));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, AdminCatalogComponent_ng_container_1_div_32_div_1_div_7_Template, 4, 7, "div", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "div", 99)(9, "div", 100)(10, "label", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, "Prix (FCFA)");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "input", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayListener"]("ngModelChange", function AdminCatalogComponent_ng_container_1_div_32_div_1_Template_input_ngModelChange_12_listener($event) {
      const group_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r16).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayBindingSet"](group_r22.priceXAF, $event) || (group_r22.priceXAF = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "div", 100)(14, "label", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](15, "Stock");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "input", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayListener"]("ngModelChange", function AdminCatalogComponent_ng_container_1_div_32_div_1_Template_input_ngModelChange_16_listener($event) {
      const group_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r16).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayBindingSet"](group_r22.stock, $event) || (group_r22.stock = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const group_r22 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("has-selection", ctx_r1.selectionMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](group_r22.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", group_r22.previews)("ngForTrackBy", ctx_r1.trackByIndex);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayProperty"]("ngModel", group_r22.priceXAF);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayProperty"]("ngModel", group_r22.stock);
  }
}
function AdminCatalogComponent_ng_container_1_div_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, AdminCatalogComponent_ng_container_1_div_32_div_1_Template, 17, 7, "div", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r1.importGroups)("ngForTrackBy", ctx_r1.trackByIndex);
  }
}
function AdminCatalogComponent_ng_container_1_p_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r1.importError);
  }
}
function AdminCatalogComponent_ng_container_1_button_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 110);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_button_34_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r23);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.importAll());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r1.importing);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r1.importing ? "Import en cours\u2026" : "Importer " + ctx_r1.importGroups.length + " article(s)", " ");
  }
}
function AdminCatalogComponent_ng_container_1_div_40_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r1.bulkPriceError);
  }
}
function AdminCatalogComponent_ng_container_1_div_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 111)(1, "span", 112);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "Appliquer un prix unique \u00E0 toute la cat\u00E9gorie :");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "input", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayListener"]("ngModelChange", function AdminCatalogComponent_ng_container_1_div_40_Template_input_ngModelChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r24);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayBindingSet"](ctx_r1.bulkPriceInput, $event) || (ctx_r1.bulkPriceInput = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("keyup.enter", function AdminCatalogComponent_ng_container_1_div_40_Template_input_keyup_enter_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r24);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.applyBulkPrice());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "span", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "FCFA");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "button", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_div_40_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r24);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.applyBulkPrice());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, AdminCatalogComponent_ng_container_1_div_40_span_8_Template, 2, 1, "span", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("input-error", ctx_r1.bulkPriceError);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.bulkPriceInput);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r1.bulkPricing || !ctx_r1.bulkPriceInput);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r1.bulkPricing ? "\u2026" : "Appliquer \u00E0 tous", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.bulkPriceError);
  }
}
function AdminCatalogComponent_ng_container_1_div_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " Aucun article. Importez des images ci-dessus. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function AdminCatalogComponent_ng_container_1_table_42_tr_14_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "span", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "button", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_table_42_tr_14_ng_container_6_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r27);
      const item_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.startEdit(item_r26, "stock"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "\u270E");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const item_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("stock-zero", (ctx_r1.stockByRef[item_r26.reference] ?? item_r26.stock) === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r1.stockByRef[item_r26.reference] ?? item_r26.stock, " ");
  }
}
function AdminCatalogComponent_ng_container_1_table_42_tr_14_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "input", 129);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayListener"]("ngModelChange", function AdminCatalogComponent_ng_container_1_table_42_tr_14_ng_container_7_Template_input_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r28);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayBindingSet"](ctx_r1.editing.value, $event) || (ctx_r1.editing.value = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("keyup.enter", function AdminCatalogComponent_ng_container_1_table_42_tr_14_ng_container_7_Template_input_keyup_enter_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r28);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.saveEdit());
    })("keyup.escape", function AdminCatalogComponent_ng_container_1_table_42_tr_14_ng_container_7_Template_input_keyup_escape_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r28);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.cancelEdit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "button", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_table_42_tr_14_ng_container_7_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r28);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.saveEdit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "button", 131);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_table_42_tr_14_ng_container_7_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r28);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.cancelEdit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.editing.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r1.saving);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r1.saving ? "\u2026" : "OK", " ");
  }
}
function AdminCatalogComponent_ng_container_1_table_42_tr_14_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "span", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "button", 132);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_table_42_tr_14_ng_container_9_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r29);
      const item_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.startEdit(item_r26, "price"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "\u270E");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const item_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r1.formatPrice(item_r26.priceXAF));
  }
}
function AdminCatalogComponent_ng_container_1_table_42_tr_14_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "input", 133);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayListener"]("ngModelChange", function AdminCatalogComponent_ng_container_1_table_42_tr_14_ng_container_10_Template_input_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r30);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayBindingSet"](ctx_r1.editing.value, $event) || (ctx_r1.editing.value = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("keyup.enter", function AdminCatalogComponent_ng_container_1_table_42_tr_14_ng_container_10_Template_input_keyup_enter_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r30);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.saveEdit());
    })("keyup.escape", function AdminCatalogComponent_ng_container_1_table_42_tr_14_ng_container_10_Template_input_keyup_escape_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r30);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.cancelEdit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "button", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_table_42_tr_14_ng_container_10_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r30);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.saveEdit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "button", 131);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_table_42_tr_14_ng_container_10_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r30);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.cancelEdit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.editing.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r1.saving);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r1.saving ? "\u2026" : "OK", " ");
  }
}
function AdminCatalogComponent_ng_container_1_table_42_tr_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "tr")(1, "td", 122)(2, "img", 123);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_table_42_tr_14_Template_img_click_2_listener() {
      const item_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r25).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.openLightbox(item_r26.coverUrl));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "td", 124);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "td", 120);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, AdminCatalogComponent_ng_container_1_table_42_tr_14_ng_container_6_Template, 5, 3, "ng-container", 1)(7, AdminCatalogComponent_ng_container_1_table_42_tr_14_ng_container_7_Template, 6, 3, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "td", 120);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, AdminCatalogComponent_ng_container_1_table_42_tr_14_ng_container_9_Template, 5, 1, "ng-container", 1)(10, AdminCatalogComponent_ng_container_1_table_42_tr_14_ng_container_10_Template, 6, 3, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "td", 120)(12, "button", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_table_42_tr_14_Template_button_click_12_listener() {
      const item_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r25).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.toggleItemPublished(item_r26));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "td", 126)(15, "button", 127);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_table_42_tr_14_Template_button_click_15_listener() {
      const item_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r25).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.deleteItem(item_r26));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](16, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const item_r26 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("unpublished-row", !item_r26.published);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("src", item_r26.coverUrl, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"])("alt", item_r26.reference);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r26.reference);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", (ctx_r1.editing == null ? null : ctx_r1.editing.itemId) !== item_r26.id || (ctx_r1.editing == null ? null : ctx_r1.editing.field) !== "stock");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", (ctx_r1.editing == null ? null : ctx_r1.editing.itemId) === item_r26.id && (ctx_r1.editing == null ? null : ctx_r1.editing.field) === "stock");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", (ctx_r1.editing == null ? null : ctx_r1.editing.itemId) !== item_r26.id || (ctx_r1.editing == null ? null : ctx_r1.editing.field) !== "price");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", (ctx_r1.editing == null ? null : ctx_r1.editing.itemId) === item_r26.id && (ctx_r1.editing == null ? null : ctx_r1.editing.field) === "price");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("published", item_r26.published);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", item_r26.published ? "\u2713 Publi\u00E9" : "Brouillon", " ");
  }
}
function AdminCatalogComponent_ng_container_1_table_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "table", 118)(1, "thead")(2, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "th", 119);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "R\u00E9f\u00E9rence");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "th", 120);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7, "Stock");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "th", 120);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9, "Prix (FCFA)");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "th", 120);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, "Statut");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](12, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](14, AdminCatalogComponent_ng_container_1_table_42_tr_14_Template, 17, 12, "tr", 121);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r1.pagedItems)("ngForTrackBy", ctx_r1.trackById);
  }
}
function AdminCatalogComponent_ng_container_1_nav_43_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_nav_43_button_3_Template_button_click_0_listener() {
      const p_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r32).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.goToPage(p_r33));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const p_r33 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("active", p_r33 === ctx_r1.currentPage);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](p_r33);
  }
}
function AdminCatalogComponent_ng_container_1_nav_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "nav", 134)(1, "button", 135);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_nav_43_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r31);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.goToPage(ctx_r1.currentPage - 1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "\u2039");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, AdminCatalogComponent_ng_container_1_nav_43_button_3_Template, 2, 3, "button", 136);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "button", 135);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_nav_43_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r31);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.goToPage(ctx_r1.currentPage + 1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "\u203A");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "span", 137);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r1.currentPage === 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r1.pages);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r1.currentPage === ctx_r1.totalPages);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate3"]("", (ctx_r1.currentPage - 1) * ctx_r1.pageSize + 1, "\u2013", ctx_r1.min(ctx_r1.currentPage * ctx_r1.pageSize, ctx_r1.categoryItems.length), " / ", ctx_r1.categoryItems.length);
  }
}
function AdminCatalogComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 37)(2, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.backToList());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "\u2190 Retour");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 39)(5, "h2", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_ng_container_1_Template_button_click_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.toggleCategoryPublished(ctx_r1.selectedCategory));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "section", 42)(12, "div", 43)(13, "h3", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14, "Description");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](15, AdminCatalogComponent_ng_container_1_button_15_Template, 2, 0, "button", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](16, AdminCatalogComponent_ng_container_1_ng_container_16_Template, 5, 4, "ng-container", 1)(17, AdminCatalogComponent_ng_container_1_ng_container_17_Template, 19, 13, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](18, "section", 46)(19, "h3", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](20, "Importer des articles");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](21, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("dragover", function AdminCatalogComponent_ng_container_1_Template_div_dragover_21_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.onDragOver($event));
    })("dragleave", function AdminCatalogComponent_ng_container_1_Template_div_dragleave_21_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.onDragLeave());
    })("drop", function AdminCatalogComponent_ng_container_1_Template_div_drop_21_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.onDrop($event));
    })("click", function AdminCatalogComponent_ng_container_1_Template_div_click_21_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r6);
      const filePicker_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](23);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](filePicker_r9.click());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "input", 48, 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("change", function AdminCatalogComponent_ng_container_1_Template_input_change_22_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.onFilePick($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](24, "span", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](25, "\uD83D\uDDBC");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](26, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](27, "Glissez des images ici ou cliquez pour s\u00E9lectionner");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](28, "span", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](29, "PNG, JPEG, WebP \u2014 regroupement automatique par nom");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](30, AdminCatalogComponent_ng_container_1_div_30_Template, 5, 5, "div", 52)(31, AdminCatalogComponent_ng_container_1_div_31_Template, 10, 1, "div", 53)(32, AdminCatalogComponent_ng_container_1_div_32_Template, 2, 2, "div", 54)(33, AdminCatalogComponent_ng_container_1_p_33_Template, 2, 1, "p", 55)(34, AdminCatalogComponent_ng_container_1_button_34_Template, 2, 2, "button", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](35, "section", 57)(36, "h3", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](37, " Articles ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](38, "span", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](40, AdminCatalogComponent_ng_container_1_div_40_Template, 9, 6, "div", 59)(41, AdminCatalogComponent_ng_container_1_div_41_Template, 2, 0, "div", 6)(42, AdminCatalogComponent_ng_container_1_table_42_Template, 15, 2, "table", 60)(43, AdminCatalogComponent_ng_container_1_nav_43_Template, 8, 6, "nav", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r1.selectedCategory.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r1.selectedCategory.prefix);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("published", ctx_r1.selectedCategory.published);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r1.selectedCategory.published ? "\u2713 Publi\u00E9" : "Publier", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r1.editingDesc);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r1.editingDesc);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.editingDesc);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("drag-over", ctx_r1.dragOver);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.importGroups.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.pendingMerge);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.importGroups.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.importError);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.importGroups.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("(", ctx_r1.categoryItems.length, ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.categoryItems.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.categoryItems.length === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.categoryItems.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.totalPages > 1);
  }
}
function AdminCatalogComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 139);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_div_2_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r34);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.closeLightbox());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "img", 140);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_div_2_Template_img_click_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r34);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "button", 141);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AdminCatalogComponent_div_2_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r34);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.closeLightbox());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("src", ctx_r1.lightboxSrc, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);
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
  constructor(store, repo, cdr, db) {
    this.store = store;
    this.repo = repo;
    this.cdr = cdr;
    this.db = db;
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
    // ── Lightbox
    this.lightboxSrc = null;
    /** Stock disponible réel : stock/$reference/available (décrémenté par les commandes) */
    this.stockByRef = {};
    this.subs = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subscription();
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
    this.subs.add(this.store.select(_app_features_store_catalog_catalog_selectors__WEBPACK_IMPORTED_MODULE_3__.selectAllCategories).subscribe(cats => {
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
        }
        // Nettoyer les groupes importés
        _this5.importGroups.forEach(g => g.previews.forEach(p => URL.revokeObjectURL(p)));
        _this5.importGroups = [];
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
      return new (__ngFactoryType__ || AdminCatalogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_7__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_app_core_firebase_catalog_repository__WEBPACK_IMPORTED_MODULE_8__.CatalogRepository), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__.Database));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
      type: AdminCatalogComponent,
      selectors: [["app-admin-catalog"]],
      standalone: false,
      decls: 3,
      vars: 3,
      consts: [["filePicker", ""], [4, "ngIf"], ["class", "lightbox-overlay", 3, "click", 4, "ngIf"], [1, "catalog-toolbar"], [1, "btn-catalog-new", 3, "click"], ["class", "create-form-card", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [1, "category-list"], ["class", "category-card", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "create-form-card"], [1, "form-title"], [1, "form-field"], [1, "form-label"], [1, "required"], [1, "hint"], ["type", "text", "placeholder", "ex : bijoux", "pattern", "[a-z0-9]([a-z0-9-]*[a-z0-9])?", "autocomplete", "off", 1, "form-input", 3, "ngModelChange", "input", "ngModel"], ["type", "text", "placeholder", "ex : Masques africains", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "optional"], [1, "lang-tabs"], ["type", "button", 1, "lang-tab", 3, "click"], ["format", "html", "placeholder", "Description en fran\u00E7ais\u2026", 1, "quill-desc", 3, "onContentChanged", "hidden", "ngModel", "modules"], ["format", "html", "placeholder", "Description in English\u2026", 1, "quill-desc", 3, "onContentChanged", "hidden", "ngModel", "modules"], ["class", "form-error", 4, "ngIf"], [1, "form-actions"], [1, "btn-save", 3, "click", "disabled"], [1, "btn-cancel", 3, "click"], [1, "form-error"], [1, "empty-state"], [1, "category-card"], [1, "category-card-header"], [1, "category-meta"], [1, "category-title"], [1, "category-prefix"], [1, "category-actions"], [1, "btn-publish", 3, "click"], [1, "btn-view", 3, "click"], [1, "btn-delete-cat", 3, "click"], [1, "detail-header"], [1, "btn-back", 3, "click"], [1, "detail-title-block"], [1, "detail-title"], [1, "detail-prefix"], [1, "desc-section"], [1, "desc-header"], [1, "section-title"], ["class", "btn-field-edit", 3, "click", 4, "ngIf"], [1, "import-section"], [1, "drop-zone", 3, "dragover", "dragleave", "drop", "click"], ["type", "file", "multiple", "", "accept", "image/*", 2, "display", "none", 3, "change"], [1, "drop-icon"], [1, "drop-text"], [1, "drop-hint"], ["class", "group-toolbar", 4, "ngIf"], ["class", "merge-cover-panel", 4, "ngIf"], ["class", "import-groups", 4, "ngIf"], ["class", "import-error", 4, "ngIf"], ["class", "btn-import", 3, "disabled", "click", 4, "ngIf"], [1, "items-section"], [1, "items-count"], ["class", "bulk-price-bar", 4, "ngIf"], ["class", "items-table", 4, "ngIf"], ["class", "pagination-bar", 4, "ngIf"], [1, "btn-field-edit", 3, "click"], ["class", "desc-preview", 3, "innerHTML", 4, "ngIf"], ["class", "desc-empty", 4, "ngIf"], ["class", "desc-preview desc-en", 3, "innerHTML", 4, "ngIf"], [1, "desc-preview", 3, "innerHTML"], [1, "desc-empty"], [1, "desc-preview", "desc-en", 3, "innerHTML"], [1, "desc-edit-layout"], [1, "desc-edit-editor"], [1, "desc-edit-preview"], [1, "desc-preview-label"], [1, "desc-preview-content", 3, "innerHTML"], [1, "form-actions", 2, "margin-top", "8px"], [1, "group-toolbar"], [1, "btn-selection-mode", 3, "click"], ["class", "btn-merge", 3, "click", 4, "ngIf"], ["class", "selection-hint", 4, "ngIf"], [1, "btn-merge", 3, "click"], [1, "selection-hint"], [1, "merge-cover-panel"], [1, "merge-cover-title"], [1, "merge-cover-images"], ["class", "merge-cover-img-wrap", 3, "is-cover", "click", 4, "ngFor", "ngForOf"], [1, "merge-cover-actions"], [1, "btn-save", 3, "click"], [1, "merge-cover-img-wrap", 3, "click"], [1, "merge-cover-thumb", 3, "src"], ["class", "cover-badge", 4, "ngIf"], [1, "cover-badge"], [1, "import-groups"], ["class", "import-group-card", 3, "has-selection", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "import-group-card"], [1, "group-header"], [1, "group-key"], [1, "btn-remove-group", 3, "click"], [1, "group-images"], ["class", "group-img-wrap", 3, "is-cover", "is-selected", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "group-fields"], [1, "group-field"], [1, "group-label"], ["type", "number", "min", "0", 1, "group-input", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", 1, "group-input", "group-input-sm", 3, "ngModelChange", "ngModel"], [1, "group-img-wrap", 3, "click"], [1, "group-thumb", 3, "src"], ["class", "select-checkbox", 4, "ngIf"], [1, "select-checkbox"], [1, "checkbox-inner"], [1, "import-error"], [1, "btn-import", 3, "click", "disabled"], [1, "bulk-price-bar"], [1, "bulk-price-label"], ["type", "number", "min", "1", "step", "100", "placeholder", "ex : 15000", 1, "bulk-price-input", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "bulk-price-unit"], [1, "btn-bulk-price", 3, "click", "disabled"], ["class", "field-error", 4, "ngIf"], [1, "field-error"], [1, "items-table"], [2, "width", "56px"], [1, "text-center"], [3, "unpublished-row", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "img-cell"], [1, "item-thumb", 3, "click", "src", "alt"], [1, "ref-cell"], [1, "btn-publish-item", 3, "click"], [1, "actions-cell"], [1, "btn-delete-item", 3, "click"], [1, "field-value"], ["type", "number", "min", "0", 1, "field-input", 3, "ngModelChange", "keyup.enter", "keyup.escape", "ngModel"], [1, "btn-field-save", 3, "click", "disabled"], [1, "btn-field-cancel", 3, "click"], [1, "btn-field-edit", "btn-price-edit", 3, "click"], ["type", "number", "min", "0", 1, "field-input", "field-input-lg", 3, "ngModelChange", "keyup.enter", "keyup.escape", "ngModel"], [1, "pagination-bar"], [1, "page-btn", 3, "click", "disabled"], ["class", "page-btn", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "page-info"], [1, "page-btn", 3, "click"], [1, "lightbox-overlay", 3, "click"], [1, "lightbox-img", 3, "click", "src"], [1, "lightbox-close", 3, "click"]],
      template: function AdminCatalogComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, AdminCatalogComponent_ng_container_0_Template, 8, 4, "ng-container", 1)(1, AdminCatalogComponent_ng_container_1_Template, 44, 20, "ng-container", 1)(2, AdminCatalogComponent_div_2_Template, 4, 1, "div", 2);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.selectedCategory);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.selectedCategory);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.lightboxSrc);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.PatternValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgModel, ngx_quill__WEBPACK_IMPORTED_MODULE_11__.QuillEditorComponent],
      styles: [".bulk-price-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 10px 14px;\n  margin-bottom: 14px;\n  background: #f8f9fa;\n  border: 1px solid #ecf0f1;\n  border-left: 3px solid #6c3483;\n  border-radius: 5px;\n}\n.bulk-price-bar[_ngcontent-%COMP%]   .bulk-price-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #2c3e50;\n  font-weight: 500;\n}\n.bulk-price-bar[_ngcontent-%COMP%]   .bulk-price-input[_ngcontent-%COMP%] {\n  width: 110px;\n  padding: 6px 10px;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  font-size: 14px;\n}\n.bulk-price-bar[_ngcontent-%COMP%]   .bulk-price-input.input-error[_ngcontent-%COMP%] {\n  border-color: #e74c3c;\n}\n.bulk-price-bar[_ngcontent-%COMP%]   .bulk-price-unit[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #7f8c8d;\n  font-weight: 600;\n}\n\n.btn-bulk-price[_ngcontent-%COMP%] {\n  padding: 7px 16px;\n  background: #6c3483;\n  color: #fff;\n  border: none;\n  border-radius: 4px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.btn-bulk-price[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n.btn-bulk-price[_ngcontent-%COMP%]:not(:disabled):hover {\n  background: rgb(83.9213114754, 40.406557377, 101.793442623);\n}\n\n.catalog-toolbar[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n\n.btn-catalog-new[_ngcontent-%COMP%] {\n  padding: 9px 20px;\n  background: #148f77;\n  color: #fff;\n  border: none;\n  border-radius: 5px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: \"Work Sans\", sans-serif;\n}\n.btn-catalog-new[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n\n.create-form-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #ecf0f1;\n  border-radius: 6px;\n  padding: 20px;\n  margin-bottom: 20px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);\n}\n\n.form-title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  color: #2c3e50;\n  margin: 0 0 16px;\n}\n\n.form-field[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n\n.form-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  font-weight: 600;\n  color: #2c3e50;\n  margin-bottom: 4px;\n}\n.form-label[_ngcontent-%COMP%]   .required[_ngcontent-%COMP%] {\n  color: #e74c3c;\n}\n.form-label[_ngcontent-%COMP%]   .hint[_ngcontent-%COMP%], .form-label[_ngcontent-%COMP%]   .optional[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: #7f8c8d;\n}\n\n.form-input[_ngcontent-%COMP%] {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 8px 10px;\n  border: 1px solid #d0d7de;\n  border-radius: 4px;\n  font-size: 14px;\n  font-family: \"Work Sans\", sans-serif;\n  outline: none;\n}\n.form-input[_ngcontent-%COMP%]:focus {\n  border-color: #148f77;\n}\n\n.form-textarea[_ngcontent-%COMP%] {\n  min-height: 64px;\n  resize: vertical;\n}\n\n.quill-desc[_ngcontent-%COMP%] {\n  display: block;\n}\n.quill-desc[_ngcontent-%COMP%]   .ql-toolbar[_ngcontent-%COMP%] {\n  border-color: #d0d7de;\n  border-radius: 4px 4px 0 0;\n  background: #f8f9fa;\n  font-family: \"Work Sans\", sans-serif;\n}\n.quill-desc[_ngcontent-%COMP%]   .ql-container[_ngcontent-%COMP%] {\n  border-color: #d0d7de;\n  border-radius: 0 0 4px 4px;\n  font-family: \"Work Sans\", sans-serif;\n  font-size: 14px;\n  min-height: 100px;\n}\n.quill-desc.ng-invalid.ng-touched[_ngcontent-%COMP%]   .ql-container[_ngcontent-%COMP%], .quill-desc.ng-invalid.ng-touched[_ngcontent-%COMP%]   .ql-toolbar[_ngcontent-%COMP%] {\n  border-color: #e74c3c;\n}\n\n.form-error[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #e74c3c;\n  margin: 8px 0 0;\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-top: 16px;\n}\n\n.btn-save[_ngcontent-%COMP%] {\n  padding: 8px 20px;\n  background: #148f77;\n  color: #fff;\n  border: none;\n  border-radius: 4px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.btn-save[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  background: transparent;\n  color: #7f8c8d;\n  border: 1px solid #bdc3c7;\n  border-radius: 4px;\n  font-size: 14px;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: #f8f9fa;\n}\n\n.category-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.category-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #ecf0f1;\n  border-radius: 6px;\n  padding: 14px 16px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);\n}\n\n.category-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n\n.category-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.category-title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: #2c3e50;\n}\n\n.category-prefix[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #7f8c8d;\n  font-family: monospace;\n  background: #f0faf7;\n  padding: 1px 6px;\n  border-radius: 3px;\n  align-self: flex-start;\n}\n\n.category-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  align-items: center;\n}\n\n.btn-publish[_ngcontent-%COMP%] {\n  padding: 5px 12px;\n  border: 1px solid #148f77;\n  border-radius: 4px;\n  background: transparent;\n  color: #148f77;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.15s, color 0.15s;\n}\n.btn-publish.published[_ngcontent-%COMP%] {\n  background: #148f77;\n  color: #fff;\n}\n.btn-publish[_ngcontent-%COMP%]:hover:not(.published) {\n  background: #e8f8f5;\n}\n\n.btn-view[_ngcontent-%COMP%] {\n  padding: 5px 12px;\n  border: 1px solid #2c3e50;\n  border-radius: 4px;\n  background: transparent;\n  color: #2c3e50;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.btn-view[_ngcontent-%COMP%]:hover {\n  background: #2c3e50;\n  color: #fff;\n}\n\n.btn-delete-cat[_ngcontent-%COMP%] {\n  padding: 5px 10px;\n  border: 1px solid #e74c3c;\n  border-radius: 4px;\n  background: transparent;\n  color: #e74c3c;\n  font-size: 13px;\n  cursor: pointer;\n}\n.btn-delete-cat[_ngcontent-%COMP%]:hover {\n  background: #e74c3c;\n  color: #fff;\n}\n\n.detail-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n\n.btn-back[_ngcontent-%COMP%] {\n  padding: 6px 14px;\n  border: 1px solid #ecf0f1;\n  border-radius: 4px;\n  background: transparent;\n  color: #2c3e50;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.btn-back[_ngcontent-%COMP%]:hover {\n  background: #f8f9fa;\n}\n\n.detail-title-block[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\n.detail-title[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n  color: #2c3e50;\n  margin: 0;\n}\n\n.detail-prefix[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #7f8c8d;\n  font-family: monospace;\n  background: #f0faf7;\n  padding: 2px 8px;\n  border-radius: 3px;\n}\n\n.section-title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: #2c3e50;\n  margin: 0 0 14px;\n  padding-bottom: 6px;\n  border-bottom: 2px solid #ecf0f1;\n}\n\n.pagination-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  margin-top: 12px;\n  flex-wrap: wrap;\n}\n\n.page-btn[_ngcontent-%COMP%] {\n  min-width: 32px;\n  height: 32px;\n  padding: 0 8px;\n  border: 1px solid #ecf0f1;\n  background: #fff;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 13px;\n  color: #2c3e50;\n  transition: background 0.15s, color 0.15s;\n}\n.page-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f0f0f0;\n}\n.page-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n.page-btn.active[_ngcontent-%COMP%] {\n  background: #148f77;\n  color: #fff;\n  border-color: #148f77;\n  font-weight: 600;\n}\n\n.page-info[_ngcontent-%COMP%] {\n  margin-left: 8px;\n  font-size: 12px;\n  color: #7f8c8d;\n}\n\n.import-section[_ngcontent-%COMP%], .items-section[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #ecf0f1;\n  border-radius: 6px;\n  padding: 18px;\n  margin-bottom: 16px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);\n}\n\n.drop-zone[_ngcontent-%COMP%] {\n  border: 2px dashed #b2d8d0;\n  border-radius: 8px;\n  padding: 32px;\n  text-align: center;\n  cursor: pointer;\n  transition: border-color 0.15s, background 0.15s;\n  background: #f9fefd;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n}\n.drop-zone.drag-over[_ngcontent-%COMP%] {\n  border-color: #148f77;\n  background: #e8f8f5;\n}\n.drop-zone[_ngcontent-%COMP%]:hover {\n  border-color: #148f77;\n}\n\n.drop-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n\n.drop-text[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #2c3e50;\n}\n\n.drop-hint[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #7f8c8d;\n}\n\n.import-groups[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 14px;\n  margin-top: 16px;\n}\n\n.import-group-card[_ngcontent-%COMP%] {\n  border: 1px solid #ecf0f1;\n  border-radius: 6px;\n  padding: 12px;\n  background: #fafafa;\n  min-width: 180px;\n  max-width: 240px;\n}\n\n.group-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 8px;\n}\n\n.group-key[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-family: monospace;\n  color: #2c3e50;\n  font-weight: 600;\n}\n\n.btn-remove-group[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  color: #7f8c8d;\n  cursor: pointer;\n  font-size: 14px;\n  padding: 0;\n}\n.btn-remove-group[_ngcontent-%COMP%]:hover {\n  color: #e74c3c;\n}\n\n.group-images[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n  margin-bottom: 10px;\n}\n\n.group-img-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  cursor: pointer;\n  border: 2px solid transparent;\n  border-radius: 4px;\n  overflow: hidden;\n  transition: border-color 0.15s;\n}\n.group-img-wrap.is-cover[_ngcontent-%COMP%] {\n  border-color: #148f77;\n}\n.group-img-wrap[_ngcontent-%COMP%]:hover {\n  border-color: #b2d8d0;\n}\n\n.group-thumb[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  object-fit: cover;\n  display: block;\n}\n\n.cover-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(20, 143, 119, 0.85);\n  color: #fff;\n  font-size: 9px;\n  font-weight: 700;\n  text-align: center;\n  padding: 1px 0;\n  text-transform: uppercase;\n}\n\n.group-fields[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n\n.group-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n  flex: 1;\n}\n\n.group-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #7f8c8d;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n}\n\n.group-input[_ngcontent-%COMP%] {\n  padding: 4px 6px;\n  border: 1px solid #d0d7de;\n  border-radius: 4px;\n  font-size: 13px;\n  width: 100%;\n  box-sizing: border-box;\n}\n.group-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #148f77;\n}\n\n.group-input-sm[_ngcontent-%COMP%] {\n  max-width: 60px;\n}\n\n.import-error[_ngcontent-%COMP%] {\n  color: #e74c3c;\n  font-size: 13px;\n  margin: 10px 0 0;\n}\n\n.btn-import[_ngcontent-%COMP%] {\n  margin-top: 14px;\n  padding: 9px 24px;\n  background: #148f77;\n  color: #fff;\n  border: none;\n  border-radius: 5px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  display: block;\n}\n.btn-import[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-import[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: 0.85;\n}\n\n.items-count[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: #7f8c8d;\n  font-size: 13px;\n}\n\n.items-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 14px;\n}\n.items-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #2c3e50;\n  color: #fff;\n  padding: 9px 12px;\n  text-align: left;\n  font-size: 12px;\n}\n.items-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 9px 12px;\n  border-bottom: 1px solid #ecf0f1;\n  vertical-align: middle;\n  color: #2c3e50;\n}\n.items-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.items-table[_ngcontent-%COMP%]   tr.unpublished-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: #fafafa;\n  color: #7f8c8d;\n}\n\n.img-cell[_ngcontent-%COMP%] {\n  padding: 6px 10px !important;\n}\n\n.item-thumb[_ngcontent-%COMP%] {\n  width: 46px;\n  height: 46px;\n  object-fit: cover;\n  border-radius: 4px;\n  cursor: zoom-in;\n  display: block;\n  transition: transform 0.15s;\n}\n.item-thumb[_ngcontent-%COMP%]:hover {\n  transform: scale(1.08);\n}\n\n.ref-cell[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-weight: 600;\n}\n\n.text-center[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n.field-value[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #148f77;\n}\n.field-value.stock-zero[_ngcontent-%COMP%] {\n  color: #e74c3c;\n}\n\n.btn-field-edit[_ngcontent-%COMP%] {\n  margin-left: 6px;\n  border: none;\n  background: transparent;\n  color: #7f8c8d;\n  cursor: pointer;\n  font-size: 13px;\n  padding: 0;\n}\n.btn-field-edit[_ngcontent-%COMP%]:hover {\n  color: #2c3e50;\n}\n\n.btn-price-edit[_ngcontent-%COMP%] {\n  color: #6c3483;\n}\n.btn-price-edit[_ngcontent-%COMP%]:hover {\n  color: #4a2460;\n}\n\n.field-input[_ngcontent-%COMP%] {\n  width: 70px;\n  padding: 3px 6px;\n  border: 2px solid #148f77;\n  border-radius: 4px;\n  font-size: 13px;\n  font-weight: 600;\n  text-align: center;\n}\n\n.field-input-lg[_ngcontent-%COMP%] {\n  width: 100px;\n}\n\n.btn-field-save[_ngcontent-%COMP%] {\n  margin-left: 4px;\n  padding: 3px 10px;\n  background: #148f77;\n  color: #fff;\n  border: none;\n  border-radius: 4px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.btn-field-save[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n}\n\n.btn-field-cancel[_ngcontent-%COMP%] {\n  margin-left: 3px;\n  padding: 3px 8px;\n  border: 1px solid #bdc3c7;\n  border-radius: 4px;\n  background: transparent;\n  color: #7f8c8d;\n  font-size: 12px;\n  cursor: pointer;\n}\n\n.btn-publish-item[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  border: 1px solid #148f77;\n  border-radius: 10px;\n  background: transparent;\n  color: #148f77;\n  font-size: 11px;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.btn-publish-item.published[_ngcontent-%COMP%] {\n  background: #148f77;\n  color: #fff;\n}\n.btn-publish-item[_ngcontent-%COMP%]:hover:not(.published) {\n  background: #e8f8f5;\n}\n\n.actions-cell[_ngcontent-%COMP%] {\n  text-align: right;\n}\n\n.btn-delete-item[_ngcontent-%COMP%] {\n  padding: 4px 9px;\n  border: 1px solid #e74c3c;\n  border-radius: 4px;\n  background: transparent;\n  color: #e74c3c;\n  font-size: 12px;\n  cursor: pointer;\n}\n.btn-delete-item[_ngcontent-%COMP%]:hover {\n  background: #e74c3c;\n  color: #fff;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 32px;\n  color: #7f8c8d;\n  font-size: 14px;\n}\n\n.lightbox-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.85);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n  cursor: zoom-out;\n}\n\n.lightbox-img[_ngcontent-%COMP%] {\n  max-width: 90vw;\n  max-height: 90vh;\n  object-fit: contain;\n  border-radius: 4px;\n  cursor: default;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);\n}\n\n.lightbox-close[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 16px;\n  right: 20px;\n  background: transparent;\n  border: none;\n  color: #fff;\n  font-size: 28px;\n  cursor: pointer;\n  opacity: 0.8;\n}\n.lightbox-close[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n\n.lang-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  margin-bottom: 8px;\n}\n\n.lang-tab[_ngcontent-%COMP%] {\n  padding: 4px 14px;\n  border: 1px solid #ecf0f1;\n  border-radius: 4px;\n  background: #fff;\n  color: #7f8c8d;\n  font-size: 13px;\n  cursor: pointer;\n  transition: background 0.15s, color 0.15s;\n}\n.lang-tab.active[_ngcontent-%COMP%] {\n  background: #148f77;\n  color: #fff;\n  border-color: #148f77;\n}\n.lang-tab[_ngcontent-%COMP%]:hover:not(.active) {\n  background: #f4f6f7;\n}\n\n.desc-section[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n  padding-bottom: 16px;\n  border-bottom: 1px solid #ecf0f1;\n}\n\n.desc-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 8px;\n}\n.desc-header[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.desc-preview[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #2c3e50;\n  margin: 4px 0;\n}\n\n  .desc-preview strong,   .desc-preview b {\n  font-weight: 700 !important;\n}\n  .desc-preview em,   .desc-preview i {\n  font-style: italic;\n}\n  .desc-preview u {\n  text-decoration: underline;\n}\n  .desc-preview p {\n  margin: 0 0 4px;\n}\n  .desc-preview ul,   .desc-preview ol {\n  padding-left: 1.5em;\n  margin: 0 0 4px;\n}\n\n.desc-en[_ngcontent-%COMP%] {\n  color: #7f8c8d;\n  font-style: italic;\n}\n\n.desc-empty[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #bdc3c7;\n  margin: 2px 0;\n}\n\n.desc-edit-layout[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: flex-start;\n}\n@media (max-width: 768px) {\n  .desc-edit-layout[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n\n.desc-edit-editor[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.desc-edit-preview[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  border: 1px solid #ecf0f1;\n  border-radius: 6px;\n  padding: 12px;\n  background: #fafafa;\n  min-height: 120px;\n}\n\n.desc-preview-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #7f8c8d;\n  margin: 0 0 8px;\n}\n\n.desc-preview-content[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #2c3e50;\n  line-height: 1.6;\n}\n\n  .desc-preview-content p {\n  margin: 0 0 6px;\n}\n  .desc-preview-content strong,   .desc-preview-content b {\n  font-weight: 700 !important;\n}\n  .desc-preview-content em,   .desc-preview-content i {\n  font-style: italic;\n}\n  .desc-preview-content u {\n  text-decoration: underline;\n}\n  .desc-preview-content ul,   .desc-preview-content ol {\n  padding-left: 1.5em;\n  margin: 0 0 6px;\n}\n\n.group-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 16px;\n  flex-wrap: wrap;\n}\n\n.btn-selection-mode[_ngcontent-%COMP%] {\n  padding: 6px 14px;\n  border: 1px solid #2c3e50;\n  border-radius: 4px;\n  background: transparent;\n  color: #2c3e50;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.15s, color 0.15s;\n}\n.btn-selection-mode.active[_ngcontent-%COMP%] {\n  background: #2c3e50;\n  color: #fff;\n}\n.btn-selection-mode[_ngcontent-%COMP%]:hover:not(.active) {\n  background: #f0f0f0;\n}\n\n.btn-merge[_ngcontent-%COMP%] {\n  padding: 6px 16px;\n  background: #6c3483;\n  color: #fff;\n  border: none;\n  border-radius: 4px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.btn-merge[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n\n.selection-hint[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #7f8c8d;\n  font-style: italic;\n}\n\n.import-group-card.has-selection[_ngcontent-%COMP%] {\n  border-color: #b2c2ce;\n}\n\n.group-img-wrap.is-selected[_ngcontent-%COMP%] {\n  border-color: #6c3483 !important;\n}\n\n.select-checkbox[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 2px;\n  right: 2px;\n  width: 18px;\n  height: 18px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.select-checkbox[_ngcontent-%COMP%]   .checkbox-inner[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border: 2px solid #fff;\n  border-radius: 3px;\n  background: rgba(0, 0, 0, 0.35);\n  color: #fff;\n  font-size: 10px;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: background 0.12s;\n}\n.select-checkbox[_ngcontent-%COMP%]   .checkbox-inner.checked[_ngcontent-%COMP%] {\n  background: #6c3483;\n  border-color: #6c3483;\n}\n\n.merge-cover-panel[_ngcontent-%COMP%] {\n  margin: 12px 0;\n  padding: 16px;\n  background: #1a1a2e;\n  border: 1px solid #6c3483;\n  border-radius: 10px;\n}\n.merge-cover-panel[_ngcontent-%COMP%]   .merge-cover-title[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #c39bd3;\n  font-weight: 600;\n  margin: 0 0 12px;\n}\n.merge-cover-panel[_ngcontent-%COMP%]   .merge-cover-images[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  margin-bottom: 14px;\n}\n.merge-cover-panel[_ngcontent-%COMP%]   .merge-cover-img-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  cursor: pointer;\n  border-radius: 6px;\n  border: 2px solid transparent;\n  transition: border-color 0.15s;\n}\n.merge-cover-panel[_ngcontent-%COMP%]   .merge-cover-img-wrap.is-cover[_ngcontent-%COMP%] {\n  border-color: #6c3483;\n}\n.merge-cover-panel[_ngcontent-%COMP%]   .merge-cover-img-wrap[_ngcontent-%COMP%]   .merge-cover-thumb[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  object-fit: cover;\n  border-radius: 5px;\n  display: block;\n}\n.merge-cover-panel[_ngcontent-%COMP%]   .merge-cover-img-wrap[_ngcontent-%COMP%]   .cover-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 3px;\n  left: 50%;\n  transform: translateX(-50%);\n  background: #6c3483;\n  color: #fff;\n  font-size: 0.6rem;\n  font-weight: 700;\n  padding: 1px 5px;\n  border-radius: 3px;\n  white-space: nowrap;\n}\n.merge-cover-panel[_ngcontent-%COMP%]   .merge-cover-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvYWRtaW4vYWRtaW4tY2F0YWxvZy9hZG1pbi1jYXRhbG9nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVdBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLFFBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSx5QkFBQTtFQUNBLDhCQUFBO0VBQ0Esa0JBQUE7QUFWRjtBQVlFO0VBQ0UsZUFBQTtFQUNBLGNBcEJLO0VBcUJMLGdCQUFBO0FBVko7QUFhRTtFQUNFLFlBQUE7RUFDQSxpQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FBWEo7QUFZSTtFQUFnQixxQkEzQlg7QUFrQlQ7QUFZRTtFQUNFLGVBQUE7RUFDQSxjQWxDSztFQW1DTCxnQkFBQTtBQVZKOztBQWNBO0VBQ0UsaUJBQUE7RUFDQSxtQkEzQ087RUE0Q1AsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7QUFYRjtBQVlFO0VBQWEsWUFBQTtFQUFhLGVBQUE7QUFSNUI7QUFTRTtFQUF5QiwyREFBQTtBQU4zQjs7QUFVQTtFQUNFLG1CQUFBO0FBUEY7O0FBVUE7RUFDRSxpQkFBQTtFQUNBLG1CQTlETztFQStEUCxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLG9DQUFBO0FBUEY7QUFRRTtFQUFVLGFBQUE7QUFMWjs7QUFTQTtFQUNFLGdCQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHlDQUFBO0FBTkY7O0FBU0E7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQXBGTztFQXFGUCxnQkFBQTtBQU5GOztBQVNBO0VBQ0UsbUJBQUE7QUFORjs7QUFTQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VB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LGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBMEZGO0FBeEZFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsK0JBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSw0QkFBQTtBQTBGSjtBQXhGSTtFQUNFLG1CQWg0Qkc7RUFpNEJILHFCQWo0Qkc7QUEyOUJUOztBQXBGQTtFQUNFLGNBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0FBdUZGO0FBckZFO0VBQ0Usa0JBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtBQXVGSjtBQXBGRTtFQUNFLGFBQUE7RUFDQSxlQUFBO0VBQ0EsU0FBQTtFQUNBLG1CQUFBO0FBc0ZKO0FBbkZFO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSw2QkFBQTtFQUNBLDhCQUFBO0FBcUZKO0FBbkZJO0VBQ0UscUJBcDZCRztBQXkvQlQ7QUFsRkk7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FBb0ZOO0FBakZJO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtFQUNBLDJCQUFBO0VBQ0EsbUJBcDdCRztFQXE3QkgsV0FBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUFtRk47QUEvRUU7RUFDRSxhQUFBO0VBQ0EsUUFBQTtBQWlGSiIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgJ3Nhc3M6Y29sb3InO1xuXG4vLyDDosKUwoDDosKUwoAgVmFyaWFibGVzIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuJGdyZWVuOiAgIzE0OGY3NztcbiRwdXJwbGU6ICM2YzM0ODM7XG4kZGFyazogICAjMmMzZTUwO1xuJGdyZXk6ICAgIzdmOGM4ZDtcbiRib3JkZXI6ICNlY2YwZjE7XG4kcmVkOiAgICAjZTc0YzNjO1xuXG4vLyDDosKUwoDDosKUwoAgUHJpeCBlbiBtYXNzZSDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcbi5idWxrLXByaWNlLWJhciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgZ2FwOiA4cHg7XG4gIHBhZGRpbmc6IDEwcHggMTRweDtcbiAgbWFyZ2luLWJvdHRvbTogMTRweDtcbiAgYmFja2dyb3VuZDogI2Y4ZjlmYTtcbiAgYm9yZGVyOiAxcHggc29saWQgJGJvcmRlcjtcbiAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCAkcHVycGxlO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG5cbiAgLmJ1bGstcHJpY2UtbGFiZWwge1xuICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICBjb2xvcjogJGRhcms7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgfVxuXG4gIC5idWxrLXByaWNlLWlucHV0IHtcbiAgICB3aWR0aDogMTEwcHg7XG4gICAgcGFkZGluZzogNnB4IDEwcHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgICYuaW5wdXQtZXJyb3IgeyBib3JkZXItY29sb3I6ICRyZWQ7IH1cbiAgfVxuXG4gIC5idWxrLXByaWNlLXVuaXQge1xuICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICBjb2xvcjogJGdyZXk7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgfVxufVxuXG4uYnRuLWJ1bGstcHJpY2Uge1xuICBwYWRkaW5nOiA3cHggMTZweDtcbiAgYmFja2dyb3VuZDogJHB1cnBsZTtcbiAgY29sb3I6ICNmZmY7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDEzcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgJjpkaXNhYmxlZCB7IG9wYWNpdHk6IC41OyBjdXJzb3I6IGRlZmF1bHQ7IH1cbiAgJjpub3QoOmRpc2FibGVkKTpob3ZlciB7IGJhY2tncm91bmQ6IGNvbG9yLmFkanVzdCgkcHVycGxlLCAkbGlnaHRuZXNzOiAtOCUpOyB9XG59XG5cbi8vIMOiwpTCgMOiwpTCgCBUb29sYmFyIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuLmNhdGFsb2ctdG9vbGJhciB7XG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XG59XG5cbi5idG4tY2F0YWxvZy1uZXcge1xuICBwYWRkaW5nOiA5cHggMjBweDtcbiAgYmFja2dyb3VuZDogJGdyZWVuO1xuICBjb2xvcjogI2ZmZjtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250LWZhbWlseTogJ1dvcmsgU2FucycsIHNhbnMtc2VyaWY7XG4gICY6aG92ZXIgeyBvcGFjaXR5OiAuODU7IH1cbn1cblxuLy8gw6LClMKAw6LClMKAIEZvcm11bGFpcmUgY3LDg8KpYXRpb24gY2F0w4PCqWdvcmllIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuLmNyZWF0ZS1mb3JtLWNhcmQge1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIHBhZGRpbmc6IDIwcHg7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDRweCByZ2JhKDAsMCwwLC4wNyk7XG59XG5cbi5mb3JtLXRpdGxlIHtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBmb250LXdlaWdodDogNzAwO1xuICBjb2xvcjogJGRhcms7XG4gIG1hcmdpbjogMCAwIDE2cHg7XG59XG5cbi5mb3JtLWZpZWxkIHtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbn1cblxuLmZvcm0tbGFiZWwge1xuICBkaXNwbGF5OiBibG9jaztcbiAgZm9udC1zaXplOiAxM3B4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogJGRhcms7XG4gIG1hcmdpbi1ib3R0b206IDRweDtcblxuICAucmVxdWlyZWQgeyBjb2xvcjogJHJlZDsgfVxuICAuaGludCwgLm9wdGlvbmFsIHsgZm9udC13ZWlnaHQ6IDQwMDsgY29sb3I6ICRncmV5OyB9XG59XG5cbi5mb3JtLWlucHV0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIHBhZGRpbmc6IDhweCAxMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZDBkN2RlO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC1mYW1pbHk6ICdXb3JrIFNhbnMnLCBzYW5zLXNlcmlmO1xuICBvdXRsaW5lOiBub25lO1xuICAmOmZvY3VzIHsgYm9yZGVyLWNvbG9yOiAkZ3JlZW47IH1cbn1cblxuLmZvcm0tdGV4dGFyZWEgeyBtaW4taGVpZ2h0OiA2NHB4OyByZXNpemU6IHZlcnRpY2FsOyB9XG5cbi8vIMOiwpTCgMOiwpTCgCBRdWlsbCByaWNoIHRleHQgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXG4ucXVpbGwtZGVzYyB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuXG4gIC5xbC10b29sYmFyIHtcbiAgICBib3JkZXItY29sb3I6ICNkMGQ3ZGU7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4IDRweCAwIDA7XG4gICAgYmFja2dyb3VuZDogI2Y4ZjlmYTtcbiAgICBmb250LWZhbWlseTogJ1dvcmsgU2FucycsIHNhbnMtc2VyaWY7XG4gIH1cblxuICAucWwtY29udGFpbmVyIHtcbiAgICBib3JkZXItY29sb3I6ICNkMGQ3ZGU7XG4gICAgYm9yZGVyLXJhZGl1czogMCAwIDRweCA0cHg7XG4gICAgZm9udC1mYW1pbHk6ICdXb3JrIFNhbnMnLCBzYW5zLXNlcmlmO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBtaW4taGVpZ2h0OiAxMDBweDtcbiAgfVxuXG4gICYubmctaW52YWxpZC5uZy10b3VjaGVkIC5xbC1jb250YWluZXIsXG4gICYubmctaW52YWxpZC5uZy10b3VjaGVkIC5xbC10b29sYmFyIHtcbiAgICBib3JkZXItY29sb3I6ICRyZWQ7XG4gIH1cbn1cblxuLmZvcm0tZXJyb3Ige1xuICBmb250LXNpemU6IDEzcHg7XG4gIGNvbG9yOiAkcmVkO1xuICBtYXJnaW46IDhweCAwIDA7XG59XG5cbi5mb3JtLWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDEwcHg7XG4gIG1hcmdpbi10b3A6IDE2cHg7XG59XG5cbi5idG4tc2F2ZSB7XG4gIHBhZGRpbmc6IDhweCAyMHB4O1xuICBiYWNrZ3JvdW5kOiAkZ3JlZW47XG4gIGNvbG9yOiAjZmZmO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gICY6ZGlzYWJsZWQgeyBvcGFjaXR5OiAuNjsgY3Vyc29yOiBub3QtYWxsb3dlZDsgfVxufVxuXG4uYnRuLWNhbmNlbCB7XG4gIHBhZGRpbmc6IDhweCAxNnB4O1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICRncmV5O1xuICBib3JkZXI6IDFweCBzb2xpZCAjYmRjM2M3O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICAmOmhvdmVyIHsgYmFja2dyb3VuZDogI2Y4ZjlmYTsgfVxufVxuXG4vLyDDosKUwoDDosKUwoAgTGlzdGUgY2F0w4PCqWdvcmllcyDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcbi5jYXRlZ29yeS1saXN0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAxMHB4O1xufVxuXG4uY2F0ZWdvcnktY2FyZCB7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJvcmRlcjogMXB4IHNvbGlkICRib3JkZXI7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgcGFkZGluZzogMTRweCAxNnB4O1xuICBib3gtc2hhZG93OiAwIDFweCAzcHggcmdiYSgwLDAsMCwuMDYpO1xufVxuXG4uY2F0ZWdvcnktY2FyZC1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgZ2FwOiAxMHB4O1xufVxuXG4uY2F0ZWdvcnktbWV0YSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMnB4O1xufVxuXG4uY2F0ZWdvcnktdGl0bGUge1xuICBmb250LXNpemU6IDE1cHg7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAkZGFyaztcbn1cblxuLmNhdGVnb3J5LXByZWZpeCB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgY29sb3I6ICRncmV5O1xuICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xuICBiYWNrZ3JvdW5kOiAjZjBmYWY3O1xuICBwYWRkaW5nOiAxcHggNnB4O1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XG59XG5cbi5jYXRlZ29yeS1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiA2cHg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi8vIMOiwpTCgMOiwpTCgCBCb3V0b25zIGNvbW11bnMgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXG4uYnRuLXB1Ymxpc2gge1xuICBwYWRkaW5nOiA1cHggMTJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgJGdyZWVuO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogJGdyZWVuO1xuICBmb250LXNpemU6IDEycHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAuMTVzLCBjb2xvciAuMTVzO1xuXG4gICYucHVibGlzaGVkIHsgYmFja2dyb3VuZDogJGdyZWVuOyBjb2xvcjogI2ZmZjsgfVxuICAmOmhvdmVyOm5vdCgucHVibGlzaGVkKSB7IGJhY2tncm91bmQ6ICNlOGY4ZjU7IH1cbn1cblxuLmJ0bi12aWV3IHtcbiAgcGFkZGluZzogNXB4IDEycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICRkYXJrO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogJGRhcms7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICAmOmhvdmVyIHsgYmFja2dyb3VuZDogJGRhcms7IGNvbG9yOiAjZmZmOyB9XG59XG5cbi5idG4tZGVsZXRlLWNhdCB7XG4gIHBhZGRpbmc6IDVweCAxMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAkcmVkO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogJHJlZDtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gICY6aG92ZXIgeyBiYWNrZ3JvdW5kOiAkcmVkOyBjb2xvcjogI2ZmZjsgfVxufVxuXG4vLyDDosKUwoDDosKUwoAgRMODwql0YWlsIGNhdMODwqlnb3JpZSDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcbi5kZXRhaWwtaGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG59XG5cbi5idG4tYmFjayB7XG4gIHBhZGRpbmc6IDZweCAxNHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogJGRhcms7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAmOmhvdmVyIHsgYmFja2dyb3VuZDogI2Y4ZjlmYTsgfVxufVxuXG4uZGV0YWlsLXRpdGxlLWJsb2NrIHtcbiAgZmxleDogMTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMHB4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG59XG5cbi5kZXRhaWwtdGl0bGUge1xuICBmb250LXNpemU6IDE4cHg7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAkZGFyaztcbiAgbWFyZ2luOiAwO1xufVxuXG4uZGV0YWlsLXByZWZpeCB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgY29sb3I6ICRncmV5O1xuICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xuICBiYWNrZ3JvdW5kOiAjZjBmYWY3O1xuICBwYWRkaW5nOiAycHggOHB4O1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG59XG5cbi8vIMOiwpTCgMOiwpTCgCBTZWN0aW9ucyDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcbi5zZWN0aW9uLXRpdGxlIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogNzAwO1xuICBjb2xvcjogJGRhcms7XG4gIG1hcmdpbjogMCAwIDE0cHg7XG4gIHBhZGRpbmctYm90dG9tOiA2cHg7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAkYm9yZGVyO1xufVxuXG4ucGFnaW5hdGlvbi1iYXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDRweDtcbiAgbWFyZ2luLXRvcDogMTJweDtcbiAgZmxleC13cmFwOiB3cmFwO1xufVxuXG4ucGFnZS1idG4ge1xuICBtaW4td2lkdGg6IDMycHg7XG4gIGhlaWdodDogMzJweDtcbiAgcGFkZGluZzogMCA4cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICRib3JkZXI7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250LXNpemU6IDEzcHg7XG4gIGNvbG9yOiAkZGFyaztcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjE1cywgY29sb3IgMC4xNXM7XG5cbiAgJjpob3Zlcjpub3QoOmRpc2FibGVkKSB7IGJhY2tncm91bmQ6ICNmMGYwZjA7IH1cbiAgJjpkaXNhYmxlZCB7IG9wYWNpdHk6IDAuNDsgY3Vyc29yOiBkZWZhdWx0OyB9XG4gICYuYWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiAkZ3JlZW47XG4gICAgY29sb3I6ICNmZmY7XG4gICAgYm9yZGVyLWNvbG9yOiAkZ3JlZW47XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgfVxufVxuXG4ucGFnZS1pbmZvIHtcbiAgbWFyZ2luLWxlZnQ6IDhweDtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjb2xvcjogJGdyZXk7XG59XG5cbi5pbXBvcnQtc2VjdGlvbiwgLml0ZW1zLXNlY3Rpb24ge1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIHBhZGRpbmc6IDE4cHg7XG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDNweCByZ2JhKDAsMCwwLC4wNik7XG59XG5cbi8vIMOiwpTCgMOiwpTCgCBEcm9wIHpvbmUgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXG4uZHJvcC16b25lIHtcbiAgYm9yZGVyOiAycHggZGFzaGVkICNiMmQ4ZDA7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgcGFkZGluZzogMzJweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAuMTVzLCBiYWNrZ3JvdW5kIC4xNXM7XG4gIGJhY2tncm91bmQ6ICNmOWZlZmQ7XG5cbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA2cHg7XG5cbiAgJi5kcmFnLW92ZXIgeyBib3JkZXItY29sb3I6ICRncmVlbjsgYmFja2dyb3VuZDogI2U4ZjhmNTsgfVxuICAmOmhvdmVyIHsgYm9yZGVyLWNvbG9yOiAkZ3JlZW47IH1cbn1cblxuLmRyb3AtaWNvbiB7IGZvbnQtc2l6ZTogMjhweDsgfVxuLmRyb3AtdGV4dCB7IGZvbnQtc2l6ZTogMTRweDsgZm9udC13ZWlnaHQ6IDYwMDsgY29sb3I6ICRkYXJrOyB9XG4uZHJvcC1oaW50IHsgZm9udC1zaXplOiAxMnB4OyBjb2xvcjogJGdyZXk7IH1cblxuLy8gw6LClMKAw6LClMKAIEdyb3VwZXMgZCdpbXBvcnQgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXG4uaW1wb3J0LWdyb3VwcyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgZ2FwOiAxNHB4O1xuICBtYXJnaW4tdG9wOiAxNnB4O1xufVxuXG4uaW1wb3J0LWdyb3VwLWNhcmQge1xuICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIHBhZGRpbmc6IDEycHg7XG4gIGJhY2tncm91bmQ6ICNmYWZhZmE7XG4gIG1pbi13aWR0aDogMTgwcHg7XG4gIG1heC13aWR0aDogMjQwcHg7XG59XG5cbi5ncm91cC1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbn1cblxuLmdyb3VwLWtleSB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcbiAgY29sb3I6ICRkYXJrO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4uYnRuLXJlbW92ZS1ncm91cCB7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAkZ3JleTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250LXNpemU6IDE0cHg7XG4gIHBhZGRpbmc6IDA7XG4gICY6aG92ZXIgeyBjb2xvcjogJHJlZDsgfVxufVxuXG4uZ3JvdXAtaW1hZ2VzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiA2cHg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuLmdyb3VwLWltZy13cmFwIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJvcmRlcjogMnB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAuMTVzO1xuXG4gICYuaXMtY292ZXIgeyBib3JkZXItY29sb3I6ICRncmVlbjsgfVxuICAmOmhvdmVyIHsgYm9yZGVyLWNvbG9yOiAjYjJkOGQwOyB9XG59XG5cbi5ncm91cC10aHVtYiB7XG4gIHdpZHRoOiA1NnB4O1xuICBoZWlnaHQ6IDU2cHg7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLmNvdmVyLWJhZGdlIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBiYWNrZ3JvdW5kOiByZ2JhKCRncmVlbiwgLjg1KTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtc2l6ZTogOXB4O1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDFweCAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuXG4uZ3JvdXAtZmllbGRzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiA4cHg7XG59XG5cbi5ncm91cC1maWVsZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogM3B4O1xuICBmbGV4OiAxO1xufVxuXG4uZ3JvdXAtbGFiZWwge1xuICBmb250LXNpemU6IDExcHg7XG4gIGNvbG9yOiAkZ3JleTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgbGV0dGVyLXNwYWNpbmc6IC40cHg7XG59XG5cbi5ncm91cC1pbnB1dCB7XG4gIHBhZGRpbmc6IDRweCA2cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkMGQ3ZGU7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAxM3B4O1xuICB3aWR0aDogMTAwJTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgJjpmb2N1cyB7IG91dGxpbmU6IG5vbmU7IGJvcmRlci1jb2xvcjogJGdyZWVuOyB9XG59XG5cbi5ncm91cC1pbnB1dC1zbSB7IG1heC13aWR0aDogNjBweDsgfVxuXG4uaW1wb3J0LWVycm9yIHtcbiAgY29sb3I6ICRyZWQ7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgbWFyZ2luOiAxMHB4IDAgMDtcbn1cblxuLmJ0bi1pbXBvcnQge1xuICBtYXJnaW4tdG9wOiAxNHB4O1xuICBwYWRkaW5nOiA5cHggMjRweDtcbiAgYmFja2dyb3VuZDogJGdyZWVuO1xuICBjb2xvcjogI2ZmZjtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBkaXNwbGF5OiBibG9jaztcbiAgJjpkaXNhYmxlZCB7IG9wYWNpdHk6IC42OyBjdXJzb3I6IG5vdC1hbGxvd2VkOyB9XG4gICY6aG92ZXI6bm90KDpkaXNhYmxlZCkgeyBvcGFjaXR5OiAuODU7IH1cbn1cblxuLy8gw6LClMKAw6LClMKAIFRhYmxlIGFydGljbGVzIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuLml0ZW1zLWNvdW50IHtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgY29sb3I6ICRncmV5O1xuICBmb250LXNpemU6IDEzcHg7XG59XG5cbi5pdGVtcy10YWJsZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICBmb250LXNpemU6IDE0cHg7XG5cbiAgdGgge1xuICAgIGJhY2tncm91bmQ6ICRkYXJrO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIHBhZGRpbmc6IDlweCAxMnB4O1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICB9XG5cbiAgdGQge1xuICAgIHBhZGRpbmc6IDlweCAxMnB4O1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAkYm9yZGVyO1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgY29sb3I6ICRkYXJrO1xuICB9XG5cbiAgdHI6bGFzdC1jaGlsZCB0ZCB7IGJvcmRlci1ib3R0b206IG5vbmU7IH1cbiAgdHIudW5wdWJsaXNoZWQtcm93IHRkIHsgYmFja2dyb3VuZDogI2ZhZmFmYTsgY29sb3I6ICRncmV5OyB9XG59XG5cbi5pbWctY2VsbCB7IHBhZGRpbmc6IDZweCAxMHB4ICFpbXBvcnRhbnQ7IH1cblxuLml0ZW0tdGh1bWIge1xuICB3aWR0aDogNDZweDtcbiAgaGVpZ2h0OiA0NnB4O1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBjdXJzb3I6IHpvb20taW47XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjE1cztcbiAgJjpob3ZlciB7IHRyYW5zZm9ybTogc2NhbGUoMS4wOCk7IH1cbn1cblxuLnJlZi1jZWxsIHsgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTsgZm9udC13ZWlnaHQ6IDYwMDsgfVxuXG4udGV4dC1jZW50ZXIgeyB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cblxuLy8gw4PCiWRpdGlvbiBpbmxpbmVcbi5maWVsZC12YWx1ZSB7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAkZ3JlZW47XG5cbiAgJi5zdG9jay16ZXJvIHtcbiAgICBjb2xvcjogI2U3NGMzYztcbiAgfVxufVxuXG4uYnRuLWZpZWxkLWVkaXQge1xuICBtYXJnaW4tbGVmdDogNnB4O1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogJGdyZXk7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBwYWRkaW5nOiAwO1xuICAmOmhvdmVyIHsgY29sb3I6ICRkYXJrOyB9XG59XG5cbi5idG4tcHJpY2UtZWRpdCB7IGNvbG9yOiAkcHVycGxlOyAmOmhvdmVyIHsgY29sb3I6ICM0YTI0NjA7IH0gfVxuXG4uZmllbGQtaW5wdXQge1xuICB3aWR0aDogNzBweDtcbiAgcGFkZGluZzogM3B4IDZweDtcbiAgYm9yZGVyOiAycHggc29saWQgJGdyZWVuO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uZmllbGQtaW5wdXQtbGcgeyB3aWR0aDogMTAwcHg7IH1cblxuLmJ0bi1maWVsZC1zYXZlIHtcbiAgbWFyZ2luLWxlZnQ6IDRweDtcbiAgcGFkZGluZzogM3B4IDEwcHg7XG4gIGJhY2tncm91bmQ6ICRncmVlbjtcbiAgY29sb3I6ICNmZmY7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDEycHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgJjpkaXNhYmxlZCB7IG9wYWNpdHk6IC42OyB9XG59XG5cbi5idG4tZmllbGQtY2FuY2VsIHtcbiAgbWFyZ2luLWxlZnQ6IDNweDtcbiAgcGFkZGluZzogM3B4IDhweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2JkYzNjNztcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICRncmV5O1xuICBmb250LXNpemU6IDEycHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLy8gUHVibGllciBpdGVtXG4uYnRuLXB1Ymxpc2gtaXRlbSB7XG4gIHBhZGRpbmc6IDRweCAxMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAkZ3JlZW47XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogJGdyZWVuO1xuICBmb250LXNpemU6IDExcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcblxuICAmLnB1Ymxpc2hlZCB7IGJhY2tncm91bmQ6ICRncmVlbjsgY29sb3I6ICNmZmY7IH1cbiAgJjpob3Zlcjpub3QoLnB1Ymxpc2hlZCkgeyBiYWNrZ3JvdW5kOiAjZThmOGY1OyB9XG59XG5cbi5hY3Rpb25zLWNlbGwgeyB0ZXh0LWFsaWduOiByaWdodDsgfVxuXG4uYnRuLWRlbGV0ZS1pdGVtIHtcbiAgcGFkZGluZzogNHB4IDlweDtcbiAgYm9yZGVyOiAxcHggc29saWQgJHJlZDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICRyZWQ7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICAmOmhvdmVyIHsgYmFja2dyb3VuZDogJHJlZDsgY29sb3I6ICNmZmY7IH1cbn1cblxuLy8gw6LClMKAw6LClMKAIMODwol0YXRzIHZpZGVzIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuLmVtcHR5LXN0YXRlIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiAzMnB4O1xuICBjb2xvcjogJGdyZXk7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuLy8gw6LClMKAw6LClMKAIExpZ2h0Ym94IMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuLmxpZ2h0Ym94LW92ZXJsYXkge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGluc2V0OiAwO1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLC44NSk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB6LWluZGV4OiA5OTk5O1xuICBjdXJzb3I6IHpvb20tb3V0O1xufVxuXG4ubGlnaHRib3gtaW1nIHtcbiAgbWF4LXdpZHRoOiA5MHZ3O1xuICBtYXgtaGVpZ2h0OiA5MHZoO1xuICBvYmplY3QtZml0OiBjb250YWluO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGN1cnNvcjogZGVmYXVsdDtcbiAgYm94LXNoYWRvdzogMCA4cHggMzJweCByZ2JhKDAsMCwwLC41KTtcbn1cblxuLmxpZ2h0Ym94LWNsb3NlIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDE2cHg7XG4gIHJpZ2h0OiAyMHB4O1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC1zaXplOiAyOHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIG9wYWNpdHk6IC44O1xuICAmOmhvdmVyIHsgb3BhY2l0eTogMTsgfVxufVxuXG4vLyDDosKUwoDDosKUwoAgT25nbGV0cyBsYW5ndWUgRlIvRU4gw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXG4ubGFuZy10YWJzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiA2cHg7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbn1cblxuLmxhbmctdGFiIHtcbiAgcGFkZGluZzogNHB4IDE0cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICRib3JkZXI7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICRncmV5O1xuICBmb250LXNpemU6IDEzcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAuMTVzLCBjb2xvciAuMTVzO1xuICAmLmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZDogJGdyZWVuO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIGJvcmRlci1jb2xvcjogJGdyZWVuO1xuICB9XG4gICY6aG92ZXI6bm90KC5hY3RpdmUpIHsgYmFja2dyb3VuZDogI2Y0ZjZmNzsgfVxufVxuXG4vLyDDosKUwoDDosKUwoAgU2VjdGlvbiBkZXNjcmlwdGlvbiBjYXTDg8KpZ29yaWUgKHZ1ZSBkw4PCqXRhaWwpIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuLmRlc2Mtc2VjdGlvbiB7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIHBhZGRpbmctYm90dG9tOiAxNnB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJGJvcmRlcjtcbn1cblxuLmRlc2MtaGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIC5zZWN0aW9uLXRpdGxlIHsgbWFyZ2luOiAwOyB9XG59XG5cbi5kZXNjLXByZXZpZXcge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOiAkZGFyaztcbiAgbWFyZ2luOiA0cHggMDtcbn1cblxuOjpuZy1kZWVwIC5kZXNjLXByZXZpZXcge1xuICBzdHJvbmcsIGIgeyBmb250LXdlaWdodDogNzAwICFpbXBvcnRhbnQ7IH1cbiAgZW0sIGkgICAgIHsgZm9udC1zdHlsZTogaXRhbGljOyB9XG4gIHUgICAgICAgICB7IHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyB9XG4gIHAgICAgICAgICB7IG1hcmdpbjogMCAwIDRweDsgfVxuICB1bCwgb2wgICAgeyBwYWRkaW5nLWxlZnQ6IDEuNWVtOyBtYXJnaW46IDAgMCA0cHg7IH1cbn1cblxuLmRlc2MtZW4ge1xuICBjb2xvcjogJGdyZXk7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbn1cblxuLmRlc2MtZW1wdHkge1xuICBmb250LXNpemU6IDEzcHg7XG4gIGNvbG9yOiAjYmRjM2M3O1xuICBtYXJnaW46IDJweCAwO1xufVxuXG4uZGVzYy1lZGl0LWxheW91dCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMTZweDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG5cbiAgQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxufVxuXG4uZGVzYy1lZGl0LWVkaXRvciB7XG4gIGZsZXg6IDE7XG4gIG1pbi13aWR0aDogMDtcbn1cblxuLmRlc2MtZWRpdC1wcmV2aWV3IHtcbiAgZmxleDogMTtcbiAgbWluLXdpZHRoOiAwO1xuICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIHBhZGRpbmc6IDEycHg7XG4gIGJhY2tncm91bmQ6ICNmYWZhZmE7XG4gIG1pbi1oZWlnaHQ6IDEyMHB4O1xufVxuXG4uZGVzYy1wcmV2aWV3LWxhYmVsIHtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBsZXR0ZXItc3BhY2luZzogMC4wNWVtO1xuICBjb2xvcjogJGdyZXk7XG4gIG1hcmdpbjogMCAwIDhweDtcbn1cblxuLmRlc2MtcHJldmlldy1jb250ZW50IHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogJGRhcms7XG4gIGxpbmUtaGVpZ2h0OiAxLjY7XG59XG5cbjo6bmctZGVlcCAuZGVzYy1wcmV2aWV3LWNvbnRlbnQge1xuICBwICAgICAgeyBtYXJnaW46IDAgMCA2cHg7IH1cbiAgc3Ryb25nLCBiIHsgZm9udC13ZWlnaHQ6IDcwMCAhaW1wb3J0YW50OyB9XG4gIGVtLCBpICB7IGZvbnQtc3R5bGU6IGl0YWxpYzsgfVxuICB1ICAgICAgeyB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgfVxuICB1bCwgb2wgeyBwYWRkaW5nLWxlZnQ6IDEuNWVtOyBtYXJnaW46IDAgMCA2cHg7IH1cbn1cblxuLy8gw6LClMKAw6LClMKAIFJlZ3JvdXBlbWVudCBkJ2ltYWdlcyDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcbi5ncm91cC10b29sYmFyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMHB4O1xuICBtYXJnaW4tdG9wOiAxNnB4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG59XG5cbi5idG4tc2VsZWN0aW9uLW1vZGUge1xuICBwYWRkaW5nOiA2cHggMTRweDtcbiAgYm9yZGVyOiAxcHggc29saWQgJGRhcms7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAkZGFyaztcbiAgZm9udC1zaXplOiAxM3B4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgLjE1cywgY29sb3IgLjE1cztcblxuICAmLmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZDogJGRhcms7XG4gICAgY29sb3I6ICNmZmY7XG4gIH1cbiAgJjpob3Zlcjpub3QoLmFjdGl2ZSkgeyBiYWNrZ3JvdW5kOiAjZjBmMGYwOyB9XG59XG5cbi5idG4tbWVyZ2Uge1xuICBwYWRkaW5nOiA2cHggMTZweDtcbiAgYmFja2dyb3VuZDogJHB1cnBsZTtcbiAgY29sb3I6ICNmZmY7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDEzcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgJjpob3ZlciB7IG9wYWNpdHk6IC44NTsgfVxufVxuXG4uc2VsZWN0aW9uLWhpbnQge1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiAkZ3JleTtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xufVxuXG4uaW1wb3J0LWdyb3VwLWNhcmQuaGFzLXNlbGVjdGlvbiB7XG4gIGJvcmRlci1jb2xvcjogI2IyYzJjZTtcbn1cblxuLmdyb3VwLWltZy13cmFwIHtcbiAgJi5pcy1zZWxlY3RlZCB7XG4gICAgYm9yZGVyLWNvbG9yOiAkcHVycGxlICFpbXBvcnRhbnQ7XG4gIH1cbn1cblxuLnNlbGVjdC1jaGVja2JveCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAycHg7XG4gIHJpZ2h0OiAycHg7XG4gIHdpZHRoOiAxOHB4O1xuICBoZWlnaHQ6IDE4cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXG4gIC5jaGVja2JveC1pbm5lciB7XG4gICAgd2lkdGg6IDE2cHg7XG4gICAgaGVpZ2h0OiAxNnB4O1xuICAgIGJvcmRlcjogMnB4IHNvbGlkICNmZmY7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMCwwLDAsLjM1KTtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAuMTJzO1xuXG4gICAgJi5jaGVja2VkIHtcbiAgICAgIGJhY2tncm91bmQ6ICRwdXJwbGU7XG4gICAgICBib3JkZXItY29sb3I6ICRwdXJwbGU7XG4gICAgfVxuICB9XG59XG5cbi8vIMOiwpTCgMOiwpTCgCBQYW5uZWF1IGNob2l4IGRlIGNvdXZlcnR1cmUgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXG4ubWVyZ2UtY292ZXItcGFuZWwge1xuICBtYXJnaW46IDEycHggMDtcbiAgcGFkZGluZzogMTZweDtcbiAgYmFja2dyb3VuZDogIzFhMWEyZTtcbiAgYm9yZGVyOiAxcHggc29saWQgJHB1cnBsZTtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcblxuICAubWVyZ2UtY292ZXItdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogLjg1cmVtO1xuICAgIGNvbG9yOiAjYzM5YmQzO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgbWFyZ2luOiAwIDAgMTJweDtcbiAgfVxuXG4gIC5tZXJnZS1jb3Zlci1pbWFnZXMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIGdhcDogMTBweDtcbiAgICBtYXJnaW4tYm90dG9tOiAxNHB4O1xuICB9XG5cbiAgLm1lcmdlLWNvdmVyLWltZy13cmFwIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICBib3JkZXI6IDJweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgLjE1cztcblxuICAgICYuaXMtY292ZXIge1xuICAgICAgYm9yZGVyLWNvbG9yOiAkcHVycGxlO1xuICAgIH1cblxuICAgIC5tZXJnZS1jb3Zlci10aHVtYiB7XG4gICAgICB3aWR0aDogODBweDtcbiAgICAgIGhlaWdodDogODBweDtcbiAgICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxuXG4gICAgLmNvdmVyLWJhZGdlIHtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGJvdHRvbTogM3B4O1xuICAgICAgbGVmdDogNTAlO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xuICAgICAgYmFja2dyb3VuZDogJHB1cnBsZTtcbiAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgZm9udC1zaXplOiAuNnJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBwYWRkaW5nOiAxcHggNXB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICB9XG4gIH1cblxuICAubWVyZ2UtY292ZXItYWN0aW9ucyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBnYXA6IDhweDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
      changeDetection: 0
    });
  }
}

/***/ }

}]);
//# sourceMappingURL=src_app_features_admin_admin_module_ts.js.map