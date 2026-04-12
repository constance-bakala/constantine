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
/* harmony import */ var _item_page_item_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./item-page/item-page.component */ 37439);
/* harmony import */ var _category_route_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./category.route.model */ 34801);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shared/shared.module */ 93887);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 36124);








class CategoryModule {
  static {
    this.ɵfac = function CategoryModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CategoryModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({
      type: CategoryModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forChild(_category_route_model__WEBPACK_IMPORTED_MODULE_4__.categoryRoutes)]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](CategoryModule, {
    declarations: [_category_component__WEBPACK_IMPORTED_MODULE_2__.CategoryComponent, _item_page_item_page_component__WEBPACK_IMPORTED_MODULE_3__.ItemPageComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
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
/* harmony import */ var _item_page_item_page_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./item-page/item-page.component */ 37439);


const categoryRoutes = [{
  path: ':prefix',
  component: _category_component__WEBPACK_IMPORTED_MODULE_0__.CategoryComponent
}, {
  path: ':prefix/items/:reference',
  component: _item_page_item_page_component__WEBPACK_IMPORTED_MODULE_1__.ItemPageComponent
}];

/***/ },

/***/ 37439
/*!********************************************************************!*\
  !*** ./src/app/features/category/item-page/item-page.component.ts ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ItemPageComponent: () => (/* binding */ ItemPageComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 2510);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 19999);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 36647);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 52575);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 91817);
/* harmony import */ var _shared_interfaces__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/interfaces */ 40787);
/* harmony import */ var _app_features_store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @app/features/store */ 85730);
/* harmony import */ var _app_features_store_catalog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @app/features/store/catalog */ 6098);
/* harmony import */ var _app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @app/features/store/items.actions */ 70671);
/* harmony import */ var _shared_components_snack_alert_snack_alert_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @shared/components/snack-alert/snack-alert.component */ 22785);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 83305);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ngrx/store */ 81383);
/* harmony import */ var _shared_services_pricing_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @shared/services/pricing.service */ 45212);
/* harmony import */ var _shared_services_stock_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @shared/services/stock.service */ 81676);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/snack-bar */ 3347);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ngx-translate/core */ 48503);
/* harmony import */ var _app_core_firebase_catalog_repository__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @app/core/firebase/catalog.repository */ 53521);
/* harmony import */ var _app_core_firebase_app_config_repository__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @app/core/firebase/app-config.repository */ 190);
/* harmony import */ var _shared_services_shop_config_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @shared/services/shop-config.service */ 89995);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/common */ 79748);





















function ItemPageComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](1, "span", 5)(2, "span", 5)(3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}
function ItemPageComponent_Conditional_7_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function ItemPageComponent_Conditional_7_Conditional_8_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r1.prevImage());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1, "\u2039");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function ItemPageComponent_Conditional_7_Conditional_8_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r1.nextImage());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](3, "\u203A");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}
function ItemPageComponent_Conditional_7_Conditional_9_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "img", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function ItemPageComponent_Conditional_7_Conditional_9_For_2_Template_img_click_0_listener() {
      const ɵ$index_47_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r4).$index;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r1.selectImage(ɵ$index_47_r5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const img_r6 = ctx.$implicit;
    const ɵ$index_47_r5 = ctx.$index;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵclassProp"]("gallery-thumb--active", ɵ$index_47_r5 === ctx_r1.selectedImageIndex);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("src", img_r6, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsanitizeUrl"])("alt", "Vue " + (ɵ$index_47_r5 + 1));
  }
}
function ItemPageComponent_Conditional_7_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrepeaterCreate"](1, ItemPageComponent_Conditional_7_Conditional_9_For_2_Template, 1, 4, "img", 38, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrepeaterTrackByIdentity"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrepeater"](ctx_r1.images);
  }
}
function ItemPageComponent_Conditional_7_p_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "p", 40)(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](3, 2, "PRODUCTS.CATEGORY"), ":");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"]("\u00A0", (tmp_3_0 = ctx_r1.itemGroup.get("category")) == null ? null : tmp_3_0.value, " ");
  }
}
function ItemPageComponent_Conditional_7_For_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function ItemPageComponent_Conditional_7_For_35_Template_button_click_0_listener() {
      const s_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r1.itemGroup.get("basketInfos.selectedSize").setValue(s_r8.value));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    let tmp_11_0;
    const s_r8 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵclassProp"]("item-detail-size-pill--active", ((tmp_11_0 = ctx_r1.itemGroup.get("basketInfos.selectedSize")) == null ? null : tmp_11_0.value) === s_r8.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](s_r8.label);
  }
}
function ItemPageComponent_Conditional_7_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "i", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](3, 1, "REMOVE_FROM_CART"));
  }
}
function ItemPageComponent_Conditional_7_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "i", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](3, 1, "OUT_OF_STOCK"));
  }
}
function ItemPageComponent_Conditional_7_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "i", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](3, 1, "ADD_TO_CART"));
  }
}
function ItemPageComponent_Conditional_7_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "small", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"]("", ctx_r1.pricing.format(ctx_r1.data.price), " / unit\u00E9");
  }
}
function ItemPageComponent_Conditional_7_p_53_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "p", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](ctx_r1.description);
  }
}
function ItemPageComponent_Conditional_7_div_54_div_6_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "span", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](1, "i", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}
function ItemPageComponent_Conditional_7_div_54_div_6_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "button", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function ItemPageComponent_Conditional_7_div_54_div_6_button_9_Template_button_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r11);
      const comp_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r1.addCompToCart(comp_r10, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](1, "i", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const comp_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵclassProp"]("complementary-look__cart-btn--oos", ctx_r1.stock.isOutOfStock(comp_r10.reference));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", ctx_r1.stock.isOutOfStock(comp_r10.reference))("title", ctx_r1.stock.isOutOfStock(comp_r10.reference) ? "Rupture de stock" : "Ajouter au panier");
  }
}
function ItemPageComponent_Conditional_7_div_54_div_6_span_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "span", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](1, "i", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}
function ItemPageComponent_Conditional_7_div_54_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 52)(1, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function ItemPageComponent_Conditional_7_div_54_div_6_Template_div_click_1_listener() {
      const comp_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r9).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r1.openLightbox(comp_r10.coverUrl));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](2, "img", 54)(3, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](4, ItemPageComponent_Conditional_7_div_54_div_6_span_4_Template, 2, 0, "span", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "div", 57)(6, "div", 58)(7, "span", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function ItemPageComponent_Conditional_7_div_54_div_6_Template_span_click_7_listener() {
      const comp_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r9).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r1.goToComplementaryCategory(comp_r10));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](9, ItemPageComponent_Conditional_7_div_54_div_6_button_9_Template, 2, 4, "button", 60)(10, ItemPageComponent_Conditional_7_div_54_div_6_span_10_Template, 2, 0, "span", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](11, "span", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const comp_r10 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵclassProp"]("complementary-look__card--in-cart", ctx_r1.isCompInCart(comp_r10.reference));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("src", comp_r10.coverUrl, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsanitizeUrl"])("alt", comp_r10.reference);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.isCompInCart(comp_r10.reference));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](comp_r10.reference);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !ctx_r1.isCompInCart(comp_r10.reference));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.isCompInCart(comp_r10.reference));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](ctx_r1.pricing.format(comp_r10.priceXAF / 655.96));
  }
}
function ItemPageComponent_Conditional_7_div_54_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 46)(1, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](2, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](3, "h5", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](6, ItemPageComponent_Conditional_7_div_54_div_6_Template, 13, 9, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](ctx_r1.complementaryLookTitle);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngForOf", ctx_r1.complementaryItems);
  }
}
function ItemPageComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "main")(1, "div", 6)(2, "section")(3, "div", 7)(4, "div", 8)(5, "div", 9)(6, "div", 10)(7, "img", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function ItemPageComponent_Conditional_7_Template_img_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r1.openLightbox());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵconditionalCreate"](8, ItemPageComponent_Conditional_7_Conditional_8_Template, 4, 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵconditionalCreate"](9, ItemPageComponent_Conditional_7_Conditional_9_Template, 3, 0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](10, "div", 13)(11, "div")(12, "div", 14)(13, "h5", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](15, "div", 16)(16, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function ItemPageComponent_Conditional_7_Template_button_click_16_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r1.stepDown());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](17, "\u2212");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](18, "input", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](19, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function ItemPageComponent_Conditional_7_Template_button_click_19_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r1.stepUp());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](20, "+");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](21, ItemPageComponent_Conditional_7_p_21_Template, 5, 4, "p", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](22, "div", 20)(23, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](25, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](26, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](28, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](29, "div", 23)(30, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](31);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](32, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](33, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrepeaterCreate"](34, ItemPageComponent_Conditional_7_For_35_Template, 2, 3, "button", 25, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrepeaterTrackByIdentity"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](36, "div", 26)(37, "div", 27)(38, "button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function ItemPageComponent_Conditional_7_Template_button_click_38_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](!ctx_r1.isOutOfStock || ctx_r1.selected ? ctx_r1.toogleSelect() : null);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵconditionalCreate"](39, ItemPageComponent_Conditional_7_Conditional_39_Template, 4, 3)(40, ItemPageComponent_Conditional_7_Conditional_40_Template, 4, 3)(41, ItemPageComponent_Conditional_7_Conditional_41_Template, 4, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](42, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function ItemPageComponent_Conditional_7_Template_button_click_42_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r1.shareOnWhatsApp());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](43, "i", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](44, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](45);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](46, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](47, "div", 31)(48, "p", 15)(49, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](50);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵconditionalCreate"](51, ItemPageComponent_Conditional_7_Conditional_51_Template, 2, 1, "small", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](52, "hr", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](53, ItemPageComponent_Conditional_7_p_53_Template, 2, 1, "p", 34)(54, ItemPageComponent_Conditional_7_div_54_Template, 7, 2, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()()()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_17_0;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("formGroup", ctx_r1.itemGroup);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("src", ctx_r1.currentImage, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsanitizeUrl"])("alt", (tmp_3_0 = ctx_r1.itemGroup.get("reference")) == null ? null : tmp_3_0.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵconditional"](ctx_r1.images.length > 1 ? 8 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵconditional"](ctx_r1.images.length > 1 ? 9 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"]((tmp_6_0 = ctx_r1.itemGroup.get("reference")) == null ? null : tmp_6_0.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ((tmp_7_0 = ctx_r1.itemGroup.get("category")) == null ? null : tmp_7_0.value) !== "UNKNOWN");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](25, 19, "PRODUCTS.MODEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](28, 21, "PRODUCTS.UNIQUE_MODEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](32, 23, "PRODUCTS.SIZES"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrepeater"](ctx_r1.sizes);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵclassMap"](ctx_r1.selected ? "item-detail-btn item-detail-btn--remove" : ctx_r1.isOutOfStock ? "item-detail-btn item-detail-btn--disabled" : "item-detail-btn item-detail-btn--add");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", ctx_r1.isOutOfStock && !ctx_r1.selected);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵconditional"](ctx_r1.selected ? 39 : ctx_r1.isOutOfStock ? 40 : 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](46, 25, "SHARE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](ctx_r1.totalPrice);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵconditional"]((((tmp_17_0 = ctx_r1.itemGroup.get("basketInfos.selectedQuantity")) == null ? null : tmp_17_0.value) || 1) > 1 ? 51 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.complementaryItems.length > 0);
  }
}
function ItemPageComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function ItemPageComponent_Conditional_8_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r12);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r1.closeLightbox());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "img", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function ItemPageComponent_Conditional_8_Template_img_click_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r12);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "button", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function ItemPageComponent_Conditional_8_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r12);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r1.closeLightbox());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](3, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("src", ctx_r1.lightboxSrc, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsanitizeUrl"]);
  }
}
const EUR_TO_XAF = 655.96;
class ItemPageComponent {
  get isOutOfStock() {
    return this.data ? this.stock.isOutOfStock(this.data.reference) : false;
  }
  get currentImage() {
    return this.images[this.selectedImageIndex] ?? '';
  }
  get totalPrice() {
    if (!this.data) return '';
    const qty = this.itemGroup?.get('basketInfos.selectedQuantity')?.value || 1;
    return this.pricing.format(this.data.price * qty);
  }
  get description() {
    if (!this.data) return '';
    const lang = this.translate.getCurrentLang();
    return (lang === 'en' ? this.data.descriptionEn : this.data.descriptionFr) ?? '';
  }
  constructor(route, router, store, fb, pricing, stock, snackBar, translate, catalogRepo, appConfig, shopConfig) {
    this.route = route;
    this.router = router;
    this.store = store;
    this.fb = fb;
    this.pricing = pricing;
    this.stock = stock;
    this.snackBar = snackBar;
    this.translate = translate;
    this.catalogRepo = catalogRepo;
    this.appConfig = appConfig;
    this.shopConfig = shopConfig;
    this.data = null;
    this.sizes = _shared_interfaces__WEBPACK_IMPORTED_MODULE_7__.ITEM_SIZES;
    this.images = [];
    this.selectedImageIndex = 0;
    this.lightboxSrc = null;
    this.complementaryItems = [];
    this.complementaryLookTitle = 'Vos suggestions';
    this.cartRefs = new Set();
    this.selected = false;
    this.prefix = '';
    this.subs = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subscription();
  }
  ngOnInit() {
    this.subs.add(this.route.params.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(params => {
      this.prefix = params['prefix'];
      const reference = params['reference'];
      this.store.dispatch(new _app_features_store_catalog__WEBPACK_IMPORTED_MODULE_9__.CatalogLoadItemsForCategory({
        categoryId: this.prefix
      }));
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.combineLatest)([this.store.select((0,_app_features_store_catalog__WEBPACK_IMPORTED_MODULE_9__.selectItemsByCategory)(this.prefix)), this.store.select(_app_features_store__WEBPACK_IMPORTED_MODULE_8__.selectChosenItems)]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(([catalogItems, chosenItems]) => {
        this.cartRefs = new Set(chosenItems.map(i => i.reference));
        const catalogItem = catalogItems.find(i => i.reference === reference);
        if (!catalogItem) return null;
        return {
          catalogItem,
          reference
        };
      }));
    })).subscribe(result => {
      if (!result) return;
      const {
        catalogItem,
        reference
      } = result;
      this.cartRefs = new Set([...this.cartRefs]);
      const isSelected = this.cartRefs.has(reference);
      if (!this.data) {
        this.data = new _shared_interfaces__WEBPACK_IMPORTED_MODULE_7__.ItemInfos(catalogItem.coverUrl, isSelected, catalogItem.reference, 0, this.prefix, false, {
          selectedQuantity: 1,
          selectedSize: _shared_interfaces__WEBPACK_IMPORTED_MODULE_7__.ItemSizeEnum.M,
          selectedModel: 'MODEL_UNIQUE'
        }, catalogItem.images?.length ? catalogItem.images : [catalogItem.coverUrl], Math.round(catalogItem.priceXAF / EUR_TO_XAF * 100) / 100, catalogItem.descriptionFr, catalogItem.descriptionEn, catalogItem.tryonUrl, catalogItem.complementaryItemRefs);
        this.selected = isSelected;
        this.images = (this.data.images?.length ?? 0) > 0 ? this.data.images : [this.data.path];
        this.initForm(this.data);
        if (catalogItem.complementaryItemRefs?.length) {
          this.catalogRepo.getItemsById(catalogItem.complementaryItemRefs).then(items => {
            this.complementaryItems = items.filter(i => i.published);
          });
        }
        const lang = this.translate.getCurrentLang() ?? 'fr';
        this.subs.add(this.appConfig.watchComplementaryLookTitle().subscribe(title => {
          this.complementaryLookTitle = lang === 'en' && title.en ? title.en : title.fr;
        }));
      } else {
        this.selected = isSelected;
      }
    }));
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  initForm(infos) {
    this.itemGroup = this.fb.group({
      path: [infos.path],
      selected: [infos.selected],
      reference: [infos.reference],
      index: [infos.index],
      category: [infos.category],
      loading: [false],
      basketInfos: this.fb.group({
        selectedQuantity: [infos.basketInfos?.selectedQuantity ?? 1, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required],
        selectedSize: [infos.basketInfos?.selectedSize ?? _shared_interfaces__WEBPACK_IMPORTED_MODULE_7__.ItemSizeEnum.M, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required],
        selectedModel: [infos.basketInfos?.selectedModel ?? 'MODEL_UNIQUE', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required]
      })
    });
    this.itemGroup.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.debounceTime)(200), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.distinctUntilChanged)((a, b) => JSON.stringify(a) === JSON.stringify(b))).subscribe(() => {
      this.selected = false;
    });
  }
  isCompInCart(ref) {
    return this.cartRefs.has(ref);
  }
  stepUp() {
    this.stock.fetchAvailable(this.data.reference).subscribe(available => {
      const currentQty = this.itemGroup.get('basketInfos.selectedQuantity')?.value || 0;
      if (available > currentQty) {
        this.itemGroup.get('basketInfos.selectedQuantity').setValue(currentQty + 1);
      } else {
        this.snackBar.openFromComponent(_shared_components_snack_alert_snack_alert_component__WEBPACK_IMPORTED_MODULE_11__.SnackAlertComponent, {
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
    const item = this.selected ? {
      ...this.itemGroup.getRawValue(),
      selected: true
    } : {
      ...this.data,
      selected: false
    };
    this.store.dispatch(new _app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_10__.ActionItemToogleSelect(item));
    this.store.dispatch(new _app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_10__.ActionUpdateBasketItem(item));
  }
  addCompToCart(item, event) {
    event.stopPropagation();
    const itemInfos = new _shared_interfaces__WEBPACK_IMPORTED_MODULE_7__.ItemInfos(item.coverUrl, true, item.reference, 0, item.categoryId ?? '', false, {
      selectedQuantity: 1,
      selectedSize: _shared_interfaces__WEBPACK_IMPORTED_MODULE_7__.ItemSizeEnum.M,
      selectedModel: 'MODEL_UNIQUE'
    }, item.images?.length ? item.images : [item.coverUrl], Math.round(item.priceXAF / EUR_TO_XAF * 100) / 100, item.descriptionFr, item.descriptionEn, item.tryonUrl, item.complementaryItemRefs);
    this.store.dispatch(new _app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_10__.ActionUpdateBasketItem(itemInfos));
    this.snackBar.openFromComponent(_shared_components_snack_alert_snack_alert_component__WEBPACK_IMPORTED_MODULE_11__.SnackAlertComponent, {
      duration: 2500,
      data: {
        message: `${item.reference} ajouté au panier.`,
        type: 'success'
      },
      politeness: 'polite'
    });
  }
  goToComplementaryCategory(item) {
    this.router.navigate(['/category', item.categoryId]);
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
  openLightbox(src) {
    this.lightboxSrc = src ?? this.currentImage;
  }
  closeLightbox() {
    this.lightboxSrc = null;
  }
  shareOnWhatsApp() {
    const lang = this.translate.getCurrentLang();
    const reference = this.itemGroup.get('reference')?.value ?? '';
    const price = this.pricing.format(this.data.price);
    const desc = this.description;
    const shopUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const brand = (this.shopConfig.current.name || 'Boutique').trim();
    const wa = this.shopConfig.whatsappWaPath(this.shopConfig.current.whatsapp);
    const text = lang === 'en' ? `🛍️ *${brand}*\n\n*REF: ${reference}*\n💰 ${price}${desc ? '\n\n' + desc : ''}\n\n👉 ${shopUrl}` : `🛍️ *${brand}*\n\n*REF: ${reference}*\n💰 ${price}${desc ? '\n\n' + desc : ''}\n\n👉 ${shopUrl}`;
    const q = encodeURIComponent(text);
    const url = wa ? `https://wa.me/${wa}?text=${q}` : `https://wa.me/?text=${q}`;
    window.open(url, '_blank');
  }
  goBack() {
    this.router.navigate(['/category', this.prefix]);
  }
  static {
    this.ɵfac = function ItemPageComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ItemPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_14__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_14__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_15__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_shared_services_pricing_service__WEBPACK_IMPORTED_MODULE_16__.PricingService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_shared_services_stock_service__WEBPACK_IMPORTED_MODULE_17__.StockService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_18__.MatSnackBar), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_app_core_firebase_catalog_repository__WEBPACK_IMPORTED_MODULE_20__.CatalogRepository), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_app_core_firebase_app_config_repository__WEBPACK_IMPORTED_MODULE_21__.AppConfigRepository), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_shared_services_shop_config_service__WEBPACK_IMPORTED_MODULE_22__.ShopConfigService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({
      type: ItemPageComponent,
      selectors: [["app-item-page"]],
      standalone: false,
      decls: 9,
      vars: 6,
      consts: [[1, "item-page-header"], ["type", "button", 1, "item-page-back", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "item-page-loading"], [1, "lightbox-overlay"], [1, "item-page-loading__dot"], [1, "container"], [1, "card-body", 3, "formGroup"], [1, "row", "mb-lg-12"], [1, "col-md-7", "col-lg-5", "col-xl-5"], [1, "view", "zoom", "overlay", "z-depth-1", "rounded", "mb-2", "position-relative"], [1, "img-fluid", "w-100", 2, "cursor", "zoom-in", 3, "click", "src", "alt"], [1, "gallery-thumbnails"], ["formGroupName", "basketInfos", 1, "col-md-5", "col-lg-7", "col-xl-7"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-1"], [1, "mb-0"], [1, "item-detail-qty"], ["type", "button", 1, "item-detail-qty-btn", 3, "click"], ["type", "number", "name", "selectedQuantity", "value", "1", "formControlName", "selectedQuantity", 1, "item-detail-qty-input"], ["class", "mb-3 text-muted text-uppercase small", 4, "ngIf"], [1, "item-detail-field"], [1, "item-detail-field-label"], [1, "item-detail-model-tag"], [1, "item-detail-field", "mb-3"], [1, "item-detail-size-pills"], ["type", "button", 1, "item-detail-size-pill", 3, "item-detail-size-pill--active"], [1, "d-flex", "justify-content-between", "align-items-center"], [1, "item-detail-actions"], ["type", "button", 3, "click", "disabled"], ["type", "button", 1, "item-detail-btn", "item-detail-btn--whatsapp", 3, "click"], [1, "fab", "fa-whatsapp"], [1, "text-right"], [1, "text-muted"], [1, "mb-4"], ["class", "item-description", 4, "ngIf"], ["class", "complementary-look", 4, "ngIf"], ["type", "button", 1, "gallery-nav", "gallery-nav--prev", 3, "click"], ["type", "button", 1, "gallery-nav", "gallery-nav--next", 3, "click"], ["loading", "lazy", 1, "gallery-thumb", 3, "gallery-thumb--active", "src", "alt"], ["loading", "lazy", 1, "gallery-thumb", 3, "click", "src", "alt"], [1, "mb-3", "text-muted", "text-uppercase", "small"], ["type", "button", 1, "item-detail-size-pill", 3, "click"], [1, "fas", "fa-trash-alt"], [1, "fas", "fa-ban"], [1, "fas", "fa-shopping-cart"], [1, "item-description"], [1, "complementary-look"], [1, "complementary-look__header"], [1, "complementary-look__accent"], [1, "complementary-look__title"], [1, "complementary-look__grid"], ["class", "complementary-look__card", 3, "complementary-look__card--in-cart", 4, "ngFor", "ngForOf"], [1, "complementary-look__card"], [1, "complementary-look__img-wrap", "view", "zoom", "overlay", "z-depth-1", "rounded", 3, "click"], ["loading", "lazy", 1, "img-fluid", "w-100", 3, "src", "alt"], [1, "mask", "rgba-black-slight"], ["class", "complementary-look__badge", 4, "ngIf"], [1, "complementary-look__info"], [1, "complementary-look__info-row"], [1, "complementary-look__ref", 3, "click"], ["class", "complementary-look__cart-btn", 3, "complementary-look__cart-btn--oos", "disabled", "title", "click", 4, "ngIf"], ["class", "complementary-look__cart-check", "title", "Dans votre panier", 4, "ngIf"], [1, "complementary-look__price"], [1, "complementary-look__badge"], [1, "fas", "fa-check"], [1, "complementary-look__cart-btn", 3, "click", "disabled", "title"], [1, "fas", "fa-cart-plus"], ["title", "Dans votre panier", 1, "complementary-look__cart-check"], [1, "fas", "fa-check-circle"], [1, "lightbox-overlay", 3, "click"], [1, "lightbox-img", 3, "click", "src"], [1, "lightbox-close", 3, "click"]],
      template: function ItemPageComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 0)(1, "button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function ItemPageComponent_Template_button_click_1_listener() {
            return ctx.goBack();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](2, "i", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](3, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](5, "translate");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵconditionalCreate"](6, ItemPageComponent_Conditional_6_Template, 4, 0, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵconditionalCreate"](7, ItemPageComponent_Conditional_7_Template, 55, 27, "main");
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵconditionalCreate"](8, ItemPageComponent_Conditional_8_Template, 4, 1, "div", 4);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](5, 4, "PRODUCTS.BACK_TO_CATEGORY"));
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵconditional"](!ctx.data ? 6 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵconditional"](ctx.data && ctx.itemGroup ? 7 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵconditional"](ctx.lightboxSrc ? 8 : -1);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_23__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_23__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupName, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__.TranslatePipe],
      styles: [".complementary-look[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  padding-top: 16px;\n  border-top: 1px solid #ececec;\n}\n.complementary-look__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 12px;\n}\n.complementary-look__accent[_ngcontent-%COMP%] {\n  width: 3px;\n  height: 20px;\n  border-radius: 2px;\n  background: #c9a84c;\n  flex-shrink: 0;\n}\n.complementary-look__title[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--color-secondary);\n  margin: 0;\n}\n.complementary-look__grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 8px;\n}\n@media (max-width: 480px) {\n  .complementary-look__grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n.complementary-look__card[_ngcontent-%COMP%] {\n  transition: transform 0.2s;\n  position: relative;\n}\n.complementary-look__card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-3px);\n}\n.complementary-look__card--in-cart[_ngcontent-%COMP%]   .complementary-look__img-wrap[_ngcontent-%COMP%] {\n  outline: 2px solid var(--color-primary-dark);\n  outline-offset: 1px;\n}\n.complementary-look__card--in-cart[_ngcontent-%COMP%]   .complementary-look__price[_ngcontent-%COMP%] {\n  color: var(--color-primary-dark);\n}\n.complementary-look__img-wrap[_ngcontent-%COMP%] {\n  margin-bottom: 5px;\n  background: #f5f5f5;\n  cursor: zoom-in;\n  position: relative;\n}\n.complementary-look__img-wrap[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  height: 80px;\n  width: 100%;\n  object-fit: contain;\n  object-position: center;\n  display: block;\n}\n.complementary-look__badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 4px;\n  right: 4px;\n  background: var(--color-primary-dark);\n  color: #fff;\n  border-radius: 50%;\n  width: 18px;\n  height: 18px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 9px;\n  pointer-events: none;\n}\n.complementary-look__info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding: 4px 6px 5px;\n  gap: 1px;\n}\n.complementary-look__info-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 4px;\n}\n.complementary-look__ref[_ngcontent-%COMP%] {\n  font-size: 9px;\n  color: #aaa;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  cursor: pointer;\n}\n.complementary-look__ref[_ngcontent-%COMP%]:hover {\n  color: #555;\n}\n.complementary-look__cart-btn[_ngcontent-%COMP%] {\n  background: #c9a84c;\n  border: none;\n  border-radius: 50%;\n  width: 20px;\n  height: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  flex-shrink: 0;\n  transition: background 0.15s, transform 0.1s;\n}\n.complementary-look__cart-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 9px;\n  color: #fff;\n}\n.complementary-look__cart-btn[_ngcontent-%COMP%]:hover {\n  background: #b08c35;\n  transform: scale(1.1);\n}\n.complementary-look__cart-btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.95);\n}\n.complementary-look__cart-btn--oos[_ngcontent-%COMP%] {\n  background: #ccc;\n  cursor: not-allowed;\n}\n.complementary-look__cart-btn--oos[_ngcontent-%COMP%]:hover {\n  background: #ccc;\n  transform: none;\n}\n.complementary-look__cart-check[_ngcontent-%COMP%] {\n  color: var(--color-primary-dark);\n  font-size: 14px;\n  flex-shrink: 0;\n}\n.complementary-look__price[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: #c9a84c;\n}\n\n.gallery-thumbnails[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n  margin-bottom: 12px;\n}\n\n.gallery-thumb[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  object-fit: cover;\n  border-radius: 4px;\n  cursor: pointer;\n  border: 2px solid transparent;\n  opacity: 0.7;\n  transition: opacity 0.2s, border-color 0.2s;\n}\n.gallery-thumb[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n.gallery-thumb--active[_ngcontent-%COMP%] {\n  border-color: #c8a96e;\n  opacity: 1;\n}\n\n.gallery-nav[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  background: rgba(0, 0, 0, 0.45);\n  color: #fff;\n  border: none;\n  border-radius: 50%;\n  width: 32px;\n  height: 32px;\n  font-size: 1.4rem;\n  line-height: 1;\n  cursor: pointer;\n  z-index: 10;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.gallery-nav--prev[_ngcontent-%COMP%] {\n  left: 6px;\n}\n.gallery-nav--next[_ngcontent-%COMP%] {\n  right: 6px;\n}\n.gallery-nav[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 0, 0, 0.7);\n}\n\n.item-detail-field[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 8px;\n}\n\n.item-detail-field-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: #8a9ab0;\n  flex-shrink: 0;\n  min-width: 52px;\n}\n\n.item-detail-model-tag[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--color-secondary);\n  background: #f0f4f8;\n  border-radius: 12px;\n  padding: 3px 10px;\n  letter-spacing: 0.03em;\n}\n\n.item-detail-size-pills[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 5px;\n  flex-wrap: wrap;\n}\n\n.item-detail-size-pill[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 50%;\n  border: 1.5px solid #dde3ea;\n  background: #fff;\n  color: var(--color-secondary);\n  font-size: 12px;\n  font-weight: 700;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: border-color 0.15s, background 0.15s, color 0.15s;\n}\n.item-detail-size-pill[_ngcontent-%COMP%]:hover:not(.item-detail-size-pill--active) {\n  border-color: #c9a84c;\n  color: #c9a84c;\n}\n.item-detail-size-pill--active[_ngcontent-%COMP%] {\n  background: var(--color-secondary);\n  border-color: var(--color-secondary);\n  color: #fff;\n}\n\n.item-detail-qty[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  border: 1px solid #dde3ea;\n  border-radius: 20px;\n  overflow: hidden;\n  background: #f8f9fa;\n}\n\n.item-detail-qty-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  width: 32px;\n  height: 32px;\n  font-size: 18px;\n  font-weight: 300;\n  color: var(--color-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: background 0.15s, color 0.15s;\n}\n.item-detail-qty-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary-dark);\n  color: #fff;\n}\n\n.item-detail-qty-input[_ngcontent-%COMP%] {\n  width: 40px;\n  text-align: center;\n  border: none;\n  border-left: 1px solid #dde3ea;\n  border-right: 1px solid #dde3ea;\n  background: transparent;\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--color-secondary);\n  outline: none;\n  -moz-appearance: textfield;\n}\n.item-detail-qty-input[_ngcontent-%COMP%]::-webkit-outer-spin-button, .item-detail-qty-input[_ngcontent-%COMP%]::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n}\n\n.text-right[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--color-primary-dark);\n}\n\n.item-detail-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\n.item-detail-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  border-radius: 20px;\n  padding: 7px 16px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  border: none;\n  transition: background 0.15s, color 0.15s, transform 0.1s;\n}\n.item-detail-btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.item-detail-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.item-detail-btn--add[_ngcontent-%COMP%] {\n  background: #f5c400;\n  color: var(--color-secondary);\n}\n.item-detail-btn--add[_ngcontent-%COMP%]:hover {\n  background: #e0b300;\n}\n.item-detail-btn--remove[_ngcontent-%COMP%] {\n  background: #fff0f0;\n  color: #c0392b;\n  border: 1px solid #f5c6c6;\n}\n.item-detail-btn--remove[_ngcontent-%COMP%]:hover {\n  background: #fde8e8;\n}\n.item-detail-btn--whatsapp[_ngcontent-%COMP%] {\n  background: #25d366;\n  color: #fff;\n  border: none;\n}\n.item-detail-btn--whatsapp[_ngcontent-%COMP%]:hover {\n  background: #1ebe5d;\n}\n.item-detail-btn--whatsapp[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.item-detail-btn--close[_ngcontent-%COMP%] {\n  background: none;\n  border: 1px solid #e0e6ed;\n  color: #8a9ab0;\n}\n.item-detail-btn--close[_ngcontent-%COMP%]:hover {\n  border-color: #adb5bd;\n  color: #555;\n  background: #f8f9fa;\n}\n.item-detail-btn--disabled[_ngcontent-%COMP%] {\n  background: #f0f0f0;\n  color: #aaa;\n  cursor: not-allowed;\n  opacity: 0.7;\n}\n\n.item-description[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #4a5568;\n  line-height: 1.65;\n  font-style: italic;\n  margin-top: 4px;\n  margin-bottom: 0;\n}\n\n.container[_ngcontent-%COMP%] {\n  min-width: 320px;\n}\n\n@media (max-width: 690px) {\n  .container[_ngcontent-%COMP%] {\n    max-width: 520px;\n    padding-left: 0;\n    padding-right: 0;\n  }\n  .col-md-7[_ngcontent-%COMP%] {\n    padding-left: 0 !important;\n    padding-right: 0 !important;\n  }\n  .view[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    width: 100% !important;\n    max-width: 100% !important;\n    height: auto;\n    display: block;\n    object-fit: contain;\n  }\n  .item-detail-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n@media (min-width: 691px) {\n  .container[_ngcontent-%COMP%] {\n    min-width: 832px;\n  }\n}\n.lightbox-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.88);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n  cursor: zoom-out;\n}\n\n.lightbox-img[_ngcontent-%COMP%] {\n  max-width: 90vw;\n  max-height: 90vh;\n  object-fit: contain;\n  border-radius: 4px;\n  cursor: default;\n}\n\n.lightbox-close[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 16px;\n  right: 20px;\n  background: transparent;\n  border: none;\n  color: #fff;\n  font-size: 2rem;\n  cursor: pointer;\n  line-height: 1;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvaXRlbS1kZXRhaWxzL2l0ZW0tZGV0YWlscy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNFLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSw2QkFBQTtBQURGO0FBR0U7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsbUJBQUE7QUFESjtBQUlFO0VBQ0UsVUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtBQUZKO0FBS0U7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsNkJBQUE7RUFDQSxTQUFBO0FBSEo7QUFNRTtFQUNFLGFBQUE7RUFDQSxxQ0FBQTtFQUNBLFFBQUE7QUFKSjtBQU1JO0VBTEY7SUFNSSxxQ0FBQTtFQUhKO0FBQ0Y7QUFNRTtFQUNFLDBCQUFBO0VBQ0Esa0JBQUE7QUFKSjtBQU1JO0VBQVUsMkJBQUE7QUFIZDtBQU1NO0VBQ0UsNENBQUE7RUFDQSxtQkFBQTtBQUpSO0FBTU07RUFBNkIsZ0NBQUE7QUFIbkM7QUFPRTtFQUNFLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUFMSjtBQU9JO0VBQ0UsWUFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsY0FBQTtBQUxOO0FBU0U7RUFDRSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxVQUFBO0VBQ0EscUNBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsY0FBQTtFQUNBLG9CQUFBO0FBUEo7QUFVRTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG9CQUFBO0VBQ0EsUUFBQTtBQVJKO0FBV0U7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLFFBQUE7QUFUSjtBQVlFO0VBQ0UsY0FBQTtFQUNBLFdBQUE7RUFDQSx5QkFBQTtFQUNBLHNCQUFBO0VBQ0EsZUFBQTtBQVZKO0FBV0k7RUFBVSxXQUFBO0FBUmQ7QUFXRTtFQUNFLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0VBQ0EsNENBQUE7QUFUSjtBQVdJO0VBQUksY0FBQTtFQUFnQixXQUFBO0FBUHhCO0FBU0k7RUFBVSxtQkFBQTtFQUFxQixxQkFBQTtBQUxuQztBQU1JO0VBQVcsc0JBQUE7QUFIZjtBQUtJO0VBQ0UsZ0JBQUE7RUFDQSxtQkFBQTtBQUhOO0FBSU07RUFBVSxnQkFBQTtFQUFrQixlQUFBO0FBQWxDO0FBSUU7RUFDRSxnQ0FBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0FBRko7QUFLRTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFISjs7QUFVQTtFQUNFLGFBQUE7RUFDQSxRQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0FBUEY7O0FBVUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsNkJBQUE7RUFDQSxZQUFBO0VBQ0EsMkNBQUE7QUFQRjtBQVNFO0VBQVUsVUFBQTtBQU5aO0FBUUU7RUFDRSxxQkFBQTtFQUNBLFVBQUE7QUFOSjs7QUFVQTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLDJCQUFBO0VBQ0EsK0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBUEY7QUFTRTtFQUFVLFNBQUE7QUFOWjtBQU9FO0VBQVUsVUFBQTtBQUpaO0FBTUU7RUFBVSw4QkFBQTtBQUhaOztBQVFBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGtCQUFBO0FBTEY7O0FBUUE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtFQUNBLHNCQUFBO0VBQ0EsY0FBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0FBTEY7O0FBUUE7RUFDRSxxQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDZCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0Esc0JBQUE7QUFMRjs7QUFRQTtFQUNFLGFBQUE7RUFDQSxRQUFBO0VBQ0EsZUFBQTtBQUxGOztBQVFBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLDJCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw2QkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLDZEQUFBO0FBTEY7QUFPRTtFQUNFLHFCQUFBO0VBQ0EsY0FBQTtBQUxKO0FBUUU7RUFDRSxrQ0FBQTtFQUNBLG9DQUFBO0VBQ0EsV0FBQTtBQU5KOztBQVlBO0VBQ0Usb0JBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FBVEY7O0FBWUE7RUFDRSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDZCQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EseUNBQUE7QUFURjtBQVdFO0VBQ0UscUNBQUE7RUFDQSxXQUFBO0FBVEo7O0FBYUE7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsOEJBQUE7RUFDQSwrQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsNkJBQUE7RUFDQSxhQUFBO0VBQ0EsMEJBQUE7QUFWRjtBQVlFO0VBQytCLHdCQUFBO0FBVmpDOztBQWVBO0VBQ0UsZ0NBQUE7QUFaRjs7QUFpQkE7RUFDRSxhQUFBO0VBQ0EsU0FBQTtFQUNBLGVBQUE7QUFkRjs7QUFpQkE7RUFDRSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLHlEQUFBO0FBZEY7QUFnQkU7RUFBVyxzQkFBQTtBQWJiO0FBZUU7RUFBSSxlQUFBO0FBWk47QUFjRTtFQUNFLG1CQUFBO0VBQ0EsNkJBQUE7QUFaSjtBQWNJO0VBQVUsbUJBQUE7QUFYZDtBQWNFO0VBQ0UsbUJBQUE7RUFDQSxjQUFBO0VBQ0EseUJBQUE7QUFaSjtBQWNJO0VBQVUsbUJBQUE7QUFYZDtBQWNFO0VBQ0UsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQVpKO0FBY0k7RUFBVSxtQkFBQTtBQVhkO0FBYUk7RUFBSSxlQUFBO0FBVlI7QUFhRTtFQUNFLGdCQUFBO0VBQ0EseUJBQUE7RUFDQSxjQUFBO0FBWEo7QUFhSTtFQUNFLHFCQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0FBWE47QUFlRTtFQUNFLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtBQWJKOztBQWlCQTtFQUNFLGVBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQWRGOztBQWlCQTtFQUNFLGdCQUFBO0FBZEY7O0FBaUJBO0VBQ0U7SUFDRSxnQkFBQTtJQUNBLGVBQUE7SUFDQSxnQkFBQTtFQWRGO0VBZ0JBO0lBQ0UsMEJBQUE7SUFDQSwyQkFBQTtFQWRGO0VBZ0JBO0lBQ0Usc0JBQUE7SUFDQSwwQkFBQTtJQUNBLFlBQUE7SUFDQSxjQUFBO0lBQ0EsbUJBQUE7RUFkRjtFQWdCQTtJQUNFLHNCQUFBO0VBZEY7QUFDRjtBQWlCQTtFQUNFO0lBQ0UsZ0JBQUE7RUFmRjtBQUNGO0FBa0JBO0VBQ0UsZUFBQTtFQUNBLFFBQUE7RUFDQSwrQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0FBaEJGOztBQW1CQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FBaEJGOztBQW1CQTtFQUNFLGVBQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtFQUNBLHVCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7QUFoQkYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDDosKUwoDDosKUwoAgVm9zIHN1Z2dlc3Rpb25zIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuXG4uY29tcGxlbWVudGFyeS1sb29rIHtcbiAgbWFyZ2luLXRvcDogMjBweDtcbiAgcGFkZGluZy10b3A6IDE2cHg7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZWNlY2VjO1xuXG4gICZfX2hlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogOHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gIH1cblxuICAmX19hY2NlbnQge1xuICAgIHdpZHRoOiAzcHg7XG4gICAgaGVpZ2h0OiAyMHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICBiYWNrZ3JvdW5kOiAjYzlhODRjO1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICB9XG5cbiAgJl9fdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMC45NXJlbTtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIGNvbG9yOiB2YXIoLS1jb2xvci1zZWNvbmRhcnkpO1xuICAgIG1hcmdpbjogMDtcbiAgfVxuXG4gICZfX2dyaWQge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgMWZyKTtcbiAgICBnYXA6IDhweDtcblxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0ODBweCkge1xuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcbiAgICB9XG4gIH1cblxuICAmX19jYXJkIHtcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycztcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgICAmOmhvdmVyIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zcHgpOyB9XG5cbiAgICAmLS1pbi1jYXJ0IHtcbiAgICAgIC5jb21wbGVtZW50YXJ5LWxvb2tfX2ltZy13cmFwIHtcbiAgICAgICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLWNvbG9yLXByaW1hcnktZGFyayk7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAxcHg7XG4gICAgICB9XG4gICAgICAuY29tcGxlbWVudGFyeS1sb29rX19wcmljZSB7IGNvbG9yOiB2YXIoLS1jb2xvci1wcmltYXJ5LWRhcmspOyB9XG4gICAgfVxuICB9XG5cbiAgJl9faW1nLXdyYXAge1xuICAgIG1hcmdpbi1ib3R0b206IDVweDtcbiAgICBiYWNrZ3JvdW5kOiAjZjVmNWY1O1xuICAgIGN1cnNvcjogem9vbS1pbjtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgICBpbWcge1xuICAgICAgaGVpZ2h0OiA4MHB4O1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBvYmplY3QtZml0OiBjb250YWluO1xuICAgICAgb2JqZWN0LXBvc2l0aW9uOiBjZW50ZXI7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICB9XG4gIH1cblxuICAmX19iYWRnZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNHB4O1xuICAgIHJpZ2h0OiA0cHg7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tY29sb3ItcHJpbWFyeS1kYXJrKTtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgd2lkdGg6IDE4cHg7XG4gICAgaGVpZ2h0OiAxOHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBmb250LXNpemU6IDlweDtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgfVxuXG4gICZfX2luZm8ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBwYWRkaW5nOiA0cHggNnB4IDVweDtcbiAgICBnYXA6IDFweDtcbiAgfVxuXG4gICZfX2luZm8tcm93IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGdhcDogNHB4O1xuICB9XG5cbiAgJl9fcmVmIHtcbiAgICBmb250LXNpemU6IDlweDtcbiAgICBjb2xvcjogI2FhYTtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIGxldHRlci1zcGFjaW5nOiAwLjA0ZW07XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICY6aG92ZXIgeyBjb2xvcjogIzU1NTsgfVxuICB9XG5cbiAgJl9fY2FydC1idG4ge1xuICAgIGJhY2tncm91bmQ6ICNjOWE4NGM7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICB3aWR0aDogMjBweDtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBmbGV4LXNocmluazogMDtcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMTVzLCB0cmFuc2Zvcm0gMC4xcztcblxuICAgIGkgeyBmb250LXNpemU6IDlweDsgY29sb3I6ICNmZmY7IH1cblxuICAgICY6aG92ZXIgeyBiYWNrZ3JvdW5kOiAjYjA4YzM1OyB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7IH1cbiAgICAmOmFjdGl2ZSB7IHRyYW5zZm9ybTogc2NhbGUoMC45NSk7IH1cblxuICAgICYtLW9vcyB7XG4gICAgICBiYWNrZ3JvdW5kOiAjY2NjO1xuICAgICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgICAgICY6aG92ZXIgeyBiYWNrZ3JvdW5kOiAjY2NjOyB0cmFuc2Zvcm06IG5vbmU7IH1cbiAgICB9XG4gIH1cblxuICAmX19jYXJ0LWNoZWNrIHtcbiAgICBjb2xvcjogdmFyKC0tY29sb3ItcHJpbWFyeS1kYXJrKTtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gIH1cblxuICAmX19wcmljZSB7XG4gICAgZm9udC1zaXplOiAxMXB4O1xuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgY29sb3I6ICNjOWE4NGM7XG4gIH1cbn1cblxuXG4vLyDDosKUwoDDosKUwoAgR2FsZXJpZSBtaW5pYXR1cmVzIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuXG4uZ2FsbGVyeS10aHVtYm5haWxzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiA2cHg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbn1cblxuLmdhbGxlcnktdGh1bWIge1xuICB3aWR0aDogNTZweDtcbiAgaGVpZ2h0OiA1NnB4O1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJvcmRlcjogMnB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICBvcGFjaXR5OiAwLjc7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycywgYm9yZGVyLWNvbG9yIDAuMnM7XG5cbiAgJjpob3ZlciB7IG9wYWNpdHk6IDE7IH1cblxuICAmLS1hY3RpdmUge1xuICAgIGJvcmRlci1jb2xvcjogI2M4YTk2ZTtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG59XG5cbi5nYWxsZXJ5LW5hdiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjQ1KTtcbiAgY29sb3I6ICNmZmY7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICB3aWR0aDogMzJweDtcbiAgaGVpZ2h0OiAzMnB4O1xuICBmb250LXNpemU6IDEuNHJlbTtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgei1pbmRleDogMTA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXG4gICYtLXByZXYgeyBsZWZ0OiA2cHg7IH1cbiAgJi0tbmV4dCB7IHJpZ2h0OiA2cHg7IH1cblxuICAmOmhvdmVyIHsgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjcpOyB9XG59XG5cbi8vIMOiwpTCgMOiwpTCgCBNb2TDg8KobGUgLyBUYWlsbGUgw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXG5cbi5pdGVtLWRldGFpbC1maWVsZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG59XG5cbi5pdGVtLWRldGFpbC1maWVsZC1sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDRlbTtcbiAgY29sb3I6ICM4YTlhYjA7XG4gIGZsZXgtc2hyaW5rOiAwO1xuICBtaW4td2lkdGg6IDUycHg7XG59XG5cbi5pdGVtLWRldGFpbC1tb2RlbC10YWcge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLWNvbG9yLXNlY29uZGFyeSk7XG4gIGJhY2tncm91bmQ6ICNmMGY0Zjg7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIHBhZGRpbmc6IDNweCAxMHB4O1xuICBsZXR0ZXItc3BhY2luZzogMC4wM2VtO1xufVxuXG4uaXRlbS1kZXRhaWwtc2l6ZS1waWxscyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogNXB4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG59XG5cbi5pdGVtLWRldGFpbC1zaXplLXBpbGwge1xuICB3aWR0aDogMzRweDtcbiAgaGVpZ2h0OiAzNHB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJvcmRlcjogMS41cHggc29saWQgI2RkZTNlYTtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6IHZhcigtLWNvbG9yLXNlY29uZGFyeSk7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMTVzLCBiYWNrZ3JvdW5kIDAuMTVzLCBjb2xvciAwLjE1cztcblxuICAmOmhvdmVyOm5vdCguaXRlbS1kZXRhaWwtc2l6ZS1waWxsLS1hY3RpdmUpIHtcbiAgICBib3JkZXItY29sb3I6ICNjOWE4NGM7XG4gICAgY29sb3I6ICNjOWE4NGM7XG4gIH1cblxuICAmLS1hY3RpdmUge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yLXNlY29uZGFyeSk7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1jb2xvci1zZWNvbmRhcnkpO1xuICAgIGNvbG9yOiAjZmZmO1xuICB9XG59XG5cbi8vIMOiwpTCgMOiwpTCgCBTdGVwcGVyIHF1YW50aXTDg8KpIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgFxuXG4uaXRlbS1kZXRhaWwtcXR5IHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGUzZWE7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJhY2tncm91bmQ6ICNmOGY5ZmE7XG59XG5cbi5pdGVtLWRldGFpbC1xdHktYnRuIHtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgYm9yZGVyOiBub25lO1xuICB3aWR0aDogMzJweDtcbiAgaGVpZ2h0OiAzMnB4O1xuICBmb250LXNpemU6IDE4cHg7XG4gIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIGNvbG9yOiB2YXIoLS1jb2xvci1zZWNvbmRhcnkpO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMTVzLCBjb2xvciAwLjE1cztcblxuICAmOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1jb2xvci1wcmltYXJ5LWRhcmspO1xuICAgIGNvbG9yOiAjZmZmO1xuICB9XG59XG5cbi5pdGVtLWRldGFpbC1xdHktaW5wdXQge1xuICB3aWR0aDogNDBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2RkZTNlYTtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2RkZTNlYTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLWNvbG9yLXNlY29uZGFyeSk7XG4gIG91dGxpbmU6IG5vbmU7XG4gIC1tb3otYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xuXG4gICY6Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24sXG4gICY6Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24geyAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7IH1cbn1cblxuLy8gw6LClMKAw6LClMKAIFByaXggw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAw6LClMKAXG5cbi50ZXh0LXJpZ2h0IHN0cm9uZyB7XG4gIGNvbG9yOiB2YXIoLS1jb2xvci1wcmltYXJ5LWRhcmspO1xufVxuXG4vLyDDosKUwoDDosKUwoAgQm91dG9ucyBkJ2FjdGlvbiDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcblxuLml0ZW0tZGV0YWlsLWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDEwcHg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLml0ZW0tZGV0YWlsLWJ0biB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDZweDtcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcbiAgcGFkZGluZzogN3B4IDE2cHg7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBib3JkZXI6IG5vbmU7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4xNXMsIGNvbG9yIDAuMTVzLCB0cmFuc2Zvcm0gMC4xcztcblxuICAmOmFjdGl2ZSB7IHRyYW5zZm9ybTogc2NhbGUoMC45Nyk7IH1cblxuICBpIHsgZm9udC1zaXplOiAxMnB4OyB9XG5cbiAgJi0tYWRkIHtcbiAgICBiYWNrZ3JvdW5kOiAjZjVjNDAwO1xuICAgIGNvbG9yOiB2YXIoLS1jb2xvci1zZWNvbmRhcnkpO1xuXG4gICAgJjpob3ZlciB7IGJhY2tncm91bmQ6ICNlMGIzMDA7IH1cbiAgfVxuXG4gICYtLXJlbW92ZSB7XG4gICAgYmFja2dyb3VuZDogI2ZmZjBmMDtcbiAgICBjb2xvcjogI2MwMzkyYjtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZjVjNmM2O1xuXG4gICAgJjpob3ZlciB7IGJhY2tncm91bmQ6ICNmZGU4ZTg7IH1cbiAgfVxuXG4gICYtLXdoYXRzYXBwIHtcbiAgICBiYWNrZ3JvdW5kOiAjMjVkMzY2O1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIGJvcmRlcjogbm9uZTtcblxuICAgICY6aG92ZXIgeyBiYWNrZ3JvdW5kOiAjMWViZTVkOyB9XG5cbiAgICBpIHsgZm9udC1zaXplOiAxNHB4OyB9XG4gIH1cblxuICAmLS1jbG9zZSB7XG4gICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZTBlNmVkO1xuICAgIGNvbG9yOiAjOGE5YWIwO1xuXG4gICAgJjpob3ZlciB7XG4gICAgICBib3JkZXItY29sb3I6ICNhZGI1YmQ7XG4gICAgICBjb2xvcjogIzU1NTtcbiAgICAgIGJhY2tncm91bmQ6ICNmOGY5ZmE7XG4gICAgfVxuICB9XG5cbiAgJi0tZGlzYWJsZWQge1xuICAgIGJhY2tncm91bmQ6ICNmMGYwZjA7XG4gICAgY29sb3I6ICNhYWE7XG4gICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgICBvcGFjaXR5OiAwLjc7XG4gIH1cbn1cblxuLml0ZW0tZGVzY3JpcHRpb24ge1xuICBmb250LXNpemU6IDEzcHg7XG4gIGNvbG9yOiAjNGE1NTY4O1xuICBsaW5lLWhlaWdodDogMS42NTtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xuICBtYXJnaW4tdG9wOiA0cHg7XG4gIG1hcmdpbi1ib3R0b206IDA7XG59XG5cbi5jb250YWluZXIge1xuICBtaW4td2lkdGg6IDMyMHB4O1xufVxuXG5AbWVkaWEobWF4LXdpZHRoOiA2OTBweCkge1xuICAuY29udGFpbmVyIHtcbiAgICBtYXgtd2lkdGg6IDUyMHB4O1xuICAgIHBhZGRpbmctbGVmdDogMDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAwO1xuICB9XG4gIC5jb2wtbWQtNyB7XG4gICAgcGFkZGluZy1sZWZ0OiAwICFpbXBvcnRhbnQ7XG4gICAgcGFkZGluZy1yaWdodDogMCAhaW1wb3J0YW50O1xuICB9XG4gIC52aWV3IGltZyB7XG4gICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbiAgICBtYXgtd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbiAgICBoZWlnaHQ6IGF1dG87XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgb2JqZWN0LWZpdDogY29udGFpbjtcbiAgfVxuICAuaXRlbS1kZXRhaWwtYWN0aW9ucyB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxufVxuXG5AbWVkaWEobWluLXdpZHRoOiA2OTFweCkge1xuICAuY29udGFpbmVyIHtcbiAgICBtaW4td2lkdGg6IDgzMnB4O1xuICB9XG59XG5cbi5saWdodGJveC1vdmVybGF5IHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBpbnNldDogMDtcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjg4KTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHotaW5kZXg6IDk5OTk7XG4gIGN1cnNvcjogem9vbS1vdXQ7XG59XG5cbi5saWdodGJveC1pbWcge1xuICBtYXgtd2lkdGg6IDkwdnc7XG4gIG1heC1oZWlnaHQ6IDkwdmg7XG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgY3Vyc29yOiBkZWZhdWx0O1xufVxuXG4ubGlnaHRib3gtY2xvc2Uge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMTZweDtcbiAgcmlnaHQ6IDIwcHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXNpemU6IDJyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgbGluZS1oZWlnaHQ6IDE7XG59XG5cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9 */", ".item-page-header[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  padding-top: 74px;\n  border-bottom: 1px solid #e0e6ed;\n  background: #f8f9fa;\n}\n\n.item-page-back[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  background: #fff;\n  border: 1px solid #dde3ea;\n  color: var(--color-secondary);\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 7px 14px;\n  border-radius: 20px;\n  transition: background 0.15s, border-color 0.15s;\n}\n.item-page-back[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #c9a84c;\n}\n.item-page-back[_ngcontent-%COMP%]:hover {\n  background: #f0f4f8;\n  border-color: #c9a84c;\n}\n\n.item-page-loading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 6px;\n  padding: 60px 0;\n}\n\n.item-page-loading__dot[_ngcontent-%COMP%] {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background: #c9a84c;\n  animation: _ngcontent-%COMP%_ip-bounce 1.2s infinite ease-in-out both;\n}\n.item-page-loading__dot[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 0.2s;\n}\n.item-page-loading__dot[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 0.4s;\n}\n\n@keyframes _ngcontent-%COMP%_ip-bounce {\n  0%, 80%, 100% {\n    transform: scale(0);\n    opacity: 0.4;\n  }\n  40% {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvY2F0ZWdvcnkvaXRlbS1wYWdlL2l0ZW0tcGFnZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQ0FBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7RUFDQSw2QkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0RBQUE7QUFDRjtBQUNFO0VBQUksZUFBQTtFQUFpQixjQUFBO0FBR3ZCO0FBRkU7RUFDRSxtQkFBQTtFQUNBLHFCQUFBO0FBSUo7O0FBQUE7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxlQUFBO0FBR0Y7O0FBQUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtREFBQTtBQUdGO0FBREU7RUFBaUIscUJBQUE7QUFJbkI7QUFIRTtFQUFpQixxQkFBQTtBQU1uQjs7QUFIQTtFQUNFO0lBQWdCLG1CQUFBO0lBQXFCLFlBQUE7RUFRckM7RUFQQTtJQUFpQixtQkFBQTtJQUFxQixVQUFBO0VBV3RDO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuaXRlbS1wYWdlLWhlYWRlciB7XG4gIHBhZGRpbmc6IDEwcHggMTZweDtcbiAgcGFkZGluZy10b3A6IDc0cHg7IC8vIDY0cHggbmF2YmFyIGZpeGVkLXRvcCArIDEwcHhcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlMGU2ZWQ7XG4gIGJhY2tncm91bmQ6ICNmOGY5ZmE7XG59XG5cbi5pdGVtLXBhZ2UtYmFjayB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZTNlYTtcbiAgY29sb3I6IHZhcigtLWNvbG9yLXNlY29uZGFyeSk7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nOiA3cHggMTRweDtcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjE1cywgYm9yZGVyLWNvbG9yIDAuMTVzO1xuXG4gIGkgeyBmb250LXNpemU6IDEycHg7IGNvbG9yOiAjYzlhODRjOyB9XG4gICY6aG92ZXIge1xuICAgIGJhY2tncm91bmQ6ICNmMGY0Zjg7XG4gICAgYm9yZGVyLWNvbG9yOiAjYzlhODRjO1xuICB9XG59XG5cbi5pdGVtLXBhZ2UtbG9hZGluZyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDZweDtcbiAgcGFkZGluZzogNjBweCAwO1xufVxuXG4uaXRlbS1wYWdlLWxvYWRpbmdfX2RvdCB7XG4gIHdpZHRoOiAxMHB4O1xuICBoZWlnaHQ6IDEwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZDogI2M5YTg0YztcbiAgYW5pbWF0aW9uOiBpcC1ib3VuY2UgMS4ycyBpbmZpbml0ZSBlYXNlLWluLW91dCBib3RoO1xuXG4gICY6bnRoLWNoaWxkKDIpIHsgYW5pbWF0aW9uLWRlbGF5OiAwLjJzOyB9XG4gICY6bnRoLWNoaWxkKDMpIHsgYW5pbWF0aW9uLWRlbGF5OiAwLjRzOyB9XG59XG5cbkBrZXlmcmFtZXMgaXAtYm91bmNlIHtcbiAgMCUsIDgwJSwgMTAwJSB7IHRyYW5zZm9ybTogc2NhbGUoMCk7IG9wYWNpdHk6IDAuNDsgfVxuICA0MCUgICAgICAgICAgICB7IHRyYW5zZm9ybTogc2NhbGUoMSk7IG9wYWNpdHk6IDE7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

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
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 19999);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 36647);
/* harmony import */ var _app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @app/features/store/items.actions */ 70671);
/* harmony import */ var _shared_interfaces__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/interfaces */ 40787);
/* harmony import */ var _app_auth_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @app/auth/store */ 83575);
/* harmony import */ var _app_features_store_catalog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @app/features/store/catalog */ 6098);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 83305);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngrx/store */ 81383);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 79748);
/* harmony import */ var _shared_components_portfolio_list_portfolio_list_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../shared/components/portfolio-list/portfolio-list.component */ 63029);











function CategoryComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "app-portfolio-list", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("onToogleSelect", function CategoryComponent_ng_container_0_Template_app_portfolio_list_onToogleSelect_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.onToogleSelect($event));
    })("updateBasketItem", function CategoryComponent_ng_container_0_Template_app_portfolio_list_updateBasketItem_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.updateBasketItem($event));
    })("navigateAway", function CategoryComponent_ng_container_0_Template_app_portfolio_list_navigateAway_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.gotoTarget($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const category_r3 = ctx.ngIf;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("category", category_r3)("categoryInfos", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 2, ctx_r1.categoryInfos$));
  }
}
function CategoryComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 3)(1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "Cat\u00E9gorie introuvable.");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
}
const EUR_TO_XAF = 655.96;
class CategoryComponent {
  constructor(route, store) {
    this.route = route;
    this.store = store;
  }
  ngOnInit() {
    this.categoryInfos$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.combineLatest)([this.store.select(_app_features_store_catalog__WEBPACK_IMPORTED_MODULE_6__.selectPublishedCategories), this.route.params]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(([published, params]) => {
      const currentPrefix = params['prefix'];
      const currentCat = published.find(c => c.prefix === currentPrefix);
      const related = currentCat?.relatedCategories;
      const result = {};
      published.filter(cat => cat.prefix !== currentPrefix).filter(cat => !related?.length || related.includes(cat.prefix)).forEach(cat => {
        result[cat.prefix] = {
          name: cat.prefix,
          title: cat.title
        };
      });
      return result;
    }));
    this.category$ = this.route.params.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(params => {
      const prefix = params['prefix'];
      this.store.dispatch(new _app_features_store_catalog__WEBPACK_IMPORTED_MODULE_6__.CatalogLoadItemsForCategory({
        categoryId: prefix
      }));
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.combineLatest)([this.store.select(_app_features_store_catalog__WEBPACK_IMPORTED_MODULE_6__.selectPublishedCategories), this.store.select((0,_app_features_store_catalog__WEBPACK_IMPORTED_MODULE_6__.selectItemsByCategory)(prefix))]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(([categories, catalogItems]) => {
        const catMeta = categories.find(c => c.prefix === prefix);
        if (!catMeta) return null;
        return {
          name: prefix,
          title: catMeta.title,
          summary: catMeta.description ?? '',
          summaryEn: catMeta.descriptionEn ?? '',
          items: catalogItems.map((item, index) => new _shared_interfaces__WEBPACK_IMPORTED_MODULE_4__.ItemInfos(item.coverUrl, false, item.reference, index, prefix, false, {
            selectedQuantity: 1,
            selectedSize: _shared_interfaces__WEBPACK_IMPORTED_MODULE_4__.ItemSizeEnum.M,
            selectedModel: 'MODEL_UNIQUE'
          }, item.images?.length ? item.images : [item.coverUrl], Math.round(item.priceXAF / EUR_TO_XAF * 100) / 100, item.descriptionFr, item.descriptionEn, item.tryonUrl, item.complementaryItemRefs))
        };
      }));
    }));
  }
  onToogleSelect(item) {
    this.store.dispatch(new _app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_3__.ActionItemToogleSelect(item));
  }
  updateBasketItem(item) {
    this.store.dispatch(new _app_features_store_items_actions__WEBPACK_IMPORTED_MODULE_3__.ActionUpdateBasketItem(item));
  }
  gotoTarget(prefix) {
    this.store.dispatch(new _app_auth_store__WEBPACK_IMPORTED_MODULE_5__.Go({
      path: ['/category', prefix]
    }));
  }
  static {
    this.ɵfac = function CategoryComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CategoryComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_10__.Store));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
      type: CategoryComponent,
      selectors: [["app-category"]],
      standalone: false,
      decls: 4,
      vars: 4,
      consts: [["notFound", ""], [4, "ngIf", "ngIfElse"], [3, "onToogleSelect", "updateBasketItem", "navigateAway", "category", "categoryInfos"], [1, "container", "mt-5", "text-center"]],
      template: function CategoryComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](0, CategoryComponent_ng_container_0_Template, 3, 4, "ng-container", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](1, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, CategoryComponent_ng_template_2_Template, 3, 0, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplateRefExtractor"]);
        }
        if (rf & 2) {
          const notFound_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](1, 2, ctx.category$))("ngIfElse", notFound_r4);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _shared_components_portfolio_list_portfolio_list_component__WEBPACK_IMPORTED_MODULE_12__.PortfolioListComponent, _angular_common__WEBPACK_IMPORTED_MODULE_11__.AsyncPipe],
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }

}]);
//# sourceMappingURL=src_app_features_category_category_module_ts.js.map