"use strict";
(self["webpackChunkconstantine"] = self["webpackChunkconstantine"] || []).push([["src_app_features_category_category_module_ts"],{

/***/ 11947
/*!******************************************************!*\
  !*** ./src/app/features/category/category.module.ts ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CategoryModule: () => (/* binding */ CategoryModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 79748);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 46264);
/* harmony import */ var _category_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./category.component */ 89084);
/* harmony import */ var _category_route_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./category.route.model */ 34801);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/shared.module */ 93887);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 36124);







class CategoryModule {
  static {
    this.ɵfac = function CategoryModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CategoryModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
      type: CategoryModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forChild(_category_route_model__WEBPACK_IMPORTED_MODULE_3__.categoryRoutes)]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](CategoryModule, {
    declarations: [_category_component__WEBPACK_IMPORTED_MODULE_2__.CategoryComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
  });
})();

/***/ },

/***/ 34801
/*!***********************************************************!*\
  !*** ./src/app/features/category/category.route.model.ts ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   categoryRoutes: () => (/* binding */ categoryRoutes)
/* harmony export */ });
/* harmony import */ var _category_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./category.component */ 89084);

const categoryRoutes = [{
  path: ':prefix',
  component: _category_component__WEBPACK_IMPORTED_MODULE_0__.CategoryComponent
}];

/***/ },

/***/ 89084
/*!*********************************************************!*\
  !*** ./src/app/features/category/category.component.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CategoryComponent: () => (/* binding */ CategoryComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 2510);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 19999);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 36647);
/* harmony import */ var _app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @app/features/store/items.actions */ 70671);
/* harmony import */ var _shared_interfaces__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shared/interfaces */ 40787);
/* harmony import */ var _app_auth_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @app/auth/store */ 83575);
/* harmony import */ var _app_features_store_catalog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @app/features/store/catalog */ 6098);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 83305);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngrx/store */ 81383);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 79748);
/* harmony import */ var _shared_components_portfolio_list_portfolio_list_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../shared/components/portfolio-list/portfolio-list.component */ 63029);











function CategoryComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "app-portfolio-list", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("onToogleSelect", function CategoryComponent_ng_container_0_Template_app_portfolio_list_onToogleSelect_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r1.onToogleSelect($event));
    })("updateBasketItem", function CategoryComponent_ng_container_0_Template_app_portfolio_list_updateBasketItem_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r1.updateBasketItem($event));
    })("navigateAway", function CategoryComponent_ng_container_0_Template_app_portfolio_list_navigateAway_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r1.gotoTarget($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const category_r3 = ctx.ngIf;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("category", category_r3)("categoryInfos", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 2, ctx_r1.categoryInfos$));
  }
}
function CategoryComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 3)(1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "Cat\u00E9gorie introuvable.");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
}
const EUR_TO_XAF = 655.96;
class CategoryComponent {
  constructor(route, store) {
    this.route = route;
    this.store = store;
    this.subs = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subscription();
  }
  ngOnInit() {
    // "VOIR AUSSI" : toutes les catégories publiées Firebase sauf la courante
    this.categoryInfos$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.combineLatest)([this.store.select(_app_features_store_catalog__WEBPACK_IMPORTED_MODULE_7__.selectPublishedCategories), this.route.params]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(([published, params]) => {
      const currentPrefix = params['prefix'];
      const result = {};
      published.filter(cat => cat.prefix !== currentPrefix).forEach(cat => {
        result[cat.prefix] = {
          name: cat.prefix,
          title: cat.title
        };
      });
      return result;
    }));
    this.category$ = this.route.params.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(params => {
      const prefix = params['prefix'];
      this.store.dispatch(new _app_features_store_catalog__WEBPACK_IMPORTED_MODULE_7__.CatalogLoadItemsForCategory({
        categoryId: prefix
      }));
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.combineLatest)([this.store.select(_app_features_store_catalog__WEBPACK_IMPORTED_MODULE_7__.selectPublishedCategories), this.store.select((0,_app_features_store_catalog__WEBPACK_IMPORTED_MODULE_7__.selectItemsByCategory)(prefix))]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(([categories, catalogItems]) => {
        const catMeta = categories.find(c => c.prefix === prefix);
        if (!catMeta) return null;
        return {
          // name = préfixe courant → utilisé par CategoryButtonsComponent pour s'exclure
          name: prefix,
          title: catMeta.title,
          summary: catMeta.description ?? '',
          summaryEn: catMeta.descriptionEn ?? '',
          items: catalogItems.map((item, index) => new _shared_interfaces__WEBPACK_IMPORTED_MODULE_5__.ItemInfos(item.coverUrl, false, item.reference, index, prefix, false, {
            selectedQuantity: 1,
            selectedSize: _shared_interfaces__WEBPACK_IMPORTED_MODULE_5__.ItemSizeEnum.M,
            selectedModel: 'MODEL_UNIQUE'
          }, item.images?.length ? item.images : [item.coverUrl], Math.round(item.priceXAF / EUR_TO_XAF * 100) / 100))
        };
      }));
    }));
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  onToogleSelect(item) {
    this.store.dispatch(new _app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_4__.ActionItemToogleSelect(item));
  }
  updateBasketItem(item) {
    this.store.dispatch(new _app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_4__.ActionUpdateBasketItem(item));
  }
  /** CategoryButtonsComponent émet le préfixe directement (clé de categoryInfos) */
  gotoTarget(prefix) {
    this.store.dispatch(new _app_auth_store__WEBPACK_IMPORTED_MODULE_6__.Go({
      path: ['/category', prefix]
    }));
  }
  static {
    this.ɵfac = function CategoryComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CategoryComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_11__.Store));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
      type: CategoryComponent,
      selectors: [["app-category"]],
      standalone: false,
      decls: 4,
      vars: 4,
      consts: [["notFound", ""], [4, "ngIf", "ngIfElse"], [3, "onToogleSelect", "updateBasketItem", "navigateAway", "category", "categoryInfos"], [1, "container", "mt-5", "text-center"]],
      template: function CategoryComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](0, CategoryComponent_ng_container_0_Template, 3, 4, "ng-container", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](1, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, CategoryComponent_ng_template_2_Template, 3, 0, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
        }
        if (rf & 2) {
          const notFound_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](1, 2, ctx.category$))("ngIfElse", notFound_r4);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _shared_components_portfolio_list_portfolio_list_component__WEBPACK_IMPORTED_MODULE_13__.PortfolioListComponent, _angular_common__WEBPACK_IMPORTED_MODULE_12__.AsyncPipe],
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }

}]);
//# sourceMappingURL=src_app_features_category_category_module_ts.js.map