"use strict";
(self["webpackChunkconstantine"] = self["webpackChunkconstantine"] || []).push([["src_app_features_order-history_order-history_module_ts"],{

/***/ 12882
/*!*******************************************************************!*\
  !*** ./src/app/features/order-history/order-history.component.ts ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrderHistoryComponent: () => (/* binding */ OrderHistoryComponent)
/* harmony export */ });
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/compat/app */ 3602);
/* harmony import */ var firebase_compat_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/compat/auth */ 12043);
/* harmony import */ var firebase_compat_database__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/compat/database */ 36994);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 36124);
/* harmony import */ var _shared_services_pricing_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/services/pricing.service */ 45212);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 79748);






function OrderHistoryComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Chargement\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function OrderHistoryComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Aucune commande exp\u00E9di\u00E9e pour le moment. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function OrderHistoryComponent_div_6_div_1_tr_11_td_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](item_r1.reference);
  }
}
function OrderHistoryComponent_div_6_div_1_tr_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr")(1, "td", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, OrderHistoryComponent_div_6_div_1_tr_11_td_3_Template, 2, 1, "td", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "td", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "td", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](item_r1.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", item_r1.reference);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\u00D7 ", (item_r1.basketInfos == null ? null : item_r1.basketInfos.selectedQuantity) ?? 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r1.pricing.format((item_r1.price ?? 0) * ((item_r1.basketInfos == null ? null : item_r1.basketInfos.selectedQuantity) ?? 1)));
  }
}
function OrderHistoryComponent_div_6_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 7)(1, "div", 8)(2, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](4, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](7, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "Exp\u00E9di\u00E9e");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "table", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, OrderHistoryComponent_div_6_div_1_tr_11_Template, 8, 4, "tr", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "div", 14)(13, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "Total :");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const order_r3 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("#", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind3"](4, 4, order_r3.id, 0, 8));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](7, 8, order_r3.createdAt, "dd/MM/yyyy \u00E0 HH:mm"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", order_r3.items);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r1.orderTotal(order_r3));
  }
}
function OrderHistoryComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, OrderHistoryComponent_div_6_div_1_Template, 17, 11, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r1.orders);
  }
}
class OrderHistoryComponent {
  constructor(pricing) {
    this.pricing = pricing;
    this.orders = [];
    this.loading = true;
  }
  ngOnInit() {
    firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__["default"].auth().onAuthStateChanged(user => {
      if (!user) {
        this.loading = false;
        return;
      }
      this.orderStatusRef = firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__["default"].database().ref(`users/${user.uid}/orderStatus`);
      this.orderStatusRef.on('value', snap => {
        this.loading = false;
        if (!snap.exists()) {
          this.orders = [];
          return;
        }
        const raw = snap.val();
        this.orders = Object.entries(raw).filter(([, data]) => data?.status === 'shipped').map(([id, data]) => ({
          id,
          createdAt: data.createdAt ?? 0,
          items: Array.isArray(data.items) ? data.items : []
        })).sort((a, b) => b.createdAt - a.createdAt);
      });
    });
  }
  ngOnDestroy() {
    this.orderStatusRef?.off();
  }
  orderTotal(order) {
    const total = order.items.reduce((sum, item) => {
      const qty = item.basketInfos?.selectedQuantity ?? 1;
      return sum + (item.price ?? 0) * qty;
    }, 0);
    return this.pricing.format(total);
  }
  static {
    this.ɵfac = function OrderHistoryComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || OrderHistoryComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_shared_services_pricing_service__WEBPACK_IMPORTED_MODULE_4__.PricingService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: OrderHistoryComponent,
      selectors: [["app-order-history"]],
      standalone: false,
      decls: 7,
      vars: 3,
      consts: [[1, "history-container"], [1, "history-header"], ["class", "history-empty", 4, "ngIf"], ["class", "orders-list", 4, "ngIf"], [1, "history-empty"], [1, "orders-list"], ["class", "order-card", 4, "ngFor", "ngForOf"], [1, "order-card"], [1, "order-header"], [1, "order-id"], [1, "order-date"], [1, "shipped-badge"], [1, "items-table"], [4, "ngFor", "ngForOf"], [1, "order-total"], [1, "item-title"], ["class", "item-ref", 4, "ngIf"], [1, "item-qty"], [1, "item-price"], [1, "item-ref"]],
      template: function OrderHistoryComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "header", 1)(2, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Mes commandes exp\u00E9di\u00E9es");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, OrderHistoryComponent_div_4_Template, 2, 0, "div", 2)(5, OrderHistoryComponent_div_5_Template, 2, 0, "div", 2)(6, OrderHistoryComponent_div_6_Template, 2, 1, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.loading);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.loading && ctx.orders.length === 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.loading && ctx.orders.length > 0);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.SlicePipe, _angular_common__WEBPACK_IMPORTED_MODULE_5__.DatePipe],
      styles: [".history-container[_ngcontent-%COMP%] {\n  max-width: 700px;\n  margin: 0 auto;\n  padding: 90px 16px 40px;\n  font-family: \"Work Sans\", sans-serif;\n}\n\n.history-header[_ngcontent-%COMP%] {\n  border-bottom: 2px solid #148f77;\n  padding-bottom: 12px;\n  margin-bottom: 24px;\n}\n.history-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 700;\n  color: #2c3e50;\n  margin: 0;\n}\n\n.history-empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #7f8c8d;\n  font-size: 15px;\n}\n\n.orders-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.order-card[_ngcontent-%COMP%] {\n  border: 1px solid #ecf0f1;\n  border-radius: 6px;\n  padding: 16px;\n  background: #fff;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);\n}\n\n.order-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 12px;\n  flex-wrap: wrap;\n}\n\n.order-id[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-weight: 600;\n  color: #2c3e50;\n  font-size: 14px;\n}\n\n.order-date[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #7f8c8d;\n  flex: 1;\n}\n\n.shipped-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 3px 10px;\n  border-radius: 12px;\n  background-color: #6c3483;\n  color: #fff;\n  font-size: 12px;\n  font-weight: 600;\n}\n\n.items-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 14px;\n  margin-bottom: 10px;\n}\n.items-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 6px 8px;\n  vertical-align: middle;\n}\n\n.item-title[_ngcontent-%COMP%] {\n  color: #2c3e50;\n  font-weight: 500;\n  flex: 1;\n}\n\n.item-ref[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-size: 12px;\n  color: #148f77;\n  background: #f0faf7;\n  padding: 2px 6px !important;\n  border-radius: 3px;\n}\n\n.item-qty[_ngcontent-%COMP%] {\n  color: #7f8c8d;\n  white-space: nowrap;\n}\n\n.item-price[_ngcontent-%COMP%] {\n  text-align: right;\n  font-weight: 600;\n  color: #2c3e50;\n  white-space: nowrap;\n}\n\n.order-total[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  padding-top: 8px;\n  border-top: 1px solid #ecf0f1;\n  font-size: 15px;\n  color: #2c3e50;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvb3JkZXItaGlzdG9yeS9vcmRlci1oaXN0b3J5LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsdUJBQUE7RUFDQSxvQ0FBQTtBQUNGOztBQUVBO0VBQ0UsZ0NBQUE7RUFDQSxvQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7QUFDRTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxTQUFBO0FBQ0o7O0FBR0E7RUFDRSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtBQUFGOztBQUdBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsU0FBQTtBQUFGOztBQUdBO0VBQ0UseUJBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLHlDQUFBO0FBQUY7O0FBR0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0FBQUY7O0FBR0E7RUFDRSxzQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7QUFBRjs7QUFHQTtFQUNFLGVBQUE7RUFDQSxjQUFBO0VBQ0EsT0FBQTtBQUFGOztBQUdBO0VBQ0UscUJBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FBQUY7O0FBR0E7RUFDRSxXQUFBO0VBQ0EseUJBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7QUFBRjtBQUVFO0VBQ0UsZ0JBQUE7RUFDQSxzQkFBQTtBQUFKOztBQUlBO0VBQ0UsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsT0FBQTtBQURGOztBQUlBO0VBQ0Usc0JBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0VBQ0EsMkJBQUE7RUFDQSxrQkFBQTtBQURGOztBQUlBO0VBQ0UsY0FBQTtFQUNBLG1CQUFBO0FBREY7O0FBSUE7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0FBREY7O0FBSUE7RUFDRSxhQUFBO0VBQ0EseUJBQUE7RUFDQSxRQUFBO0VBQ0EsZ0JBQUE7RUFDQSw2QkFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0FBREYiLCJzb3VyY2VzQ29udGVudCI6WyIuaGlzdG9yeS1jb250YWluZXIge1xuICBtYXgtd2lkdGg6IDcwMHB4O1xuICBtYXJnaW46IDAgYXV0bztcbiAgcGFkZGluZzogOTBweCAxNnB4IDQwcHg7XG4gIGZvbnQtZmFtaWx5OiAnV29yayBTYW5zJywgc2Fucy1zZXJpZjtcbn1cblxuLmhpc3RvcnktaGVhZGVyIHtcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICMxNDhmNzc7XG4gIHBhZGRpbmctYm90dG9tOiAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuXG4gIGgzIHtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICBjb2xvcjogIzJjM2U1MDtcbiAgICBtYXJnaW46IDA7XG4gIH1cbn1cblxuLmhpc3RvcnktZW1wdHkge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDQwcHg7XG4gIGNvbG9yOiAjN2Y4YzhkO1xuICBmb250LXNpemU6IDE1cHg7XG59XG5cbi5vcmRlcnMtbGlzdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMTZweDtcbn1cblxuLm9yZGVyLWNhcmQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZWNmMGYxO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIHBhZGRpbmc6IDE2cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDRweCByZ2JhKDAsMCwwLC4wNik7XG59XG5cbi5vcmRlci1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLm9yZGVyLWlkIHtcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICMyYzNlNTA7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuLm9yZGVyLWRhdGUge1xuICBmb250LXNpemU6IDEzcHg7XG4gIGNvbG9yOiAjN2Y4YzhkO1xuICBmbGV4OiAxO1xufVxuXG4uc2hpcHBlZC1iYWRnZSB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcGFkZGluZzogM3B4IDEwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICM2YzM0ODM7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXNpemU6IDEycHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5pdGVtcy10YWJsZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICBmb250LXNpemU6IDE0cHg7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG5cbiAgdGQge1xuICAgIHBhZGRpbmc6IDZweCA4cHg7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgfVxufVxuXG4uaXRlbS10aXRsZSB7XG4gIGNvbG9yOiAjMmMzZTUwO1xuICBmb250LXdlaWdodDogNTAwO1xuICBmbGV4OiAxO1xufVxuXG4uaXRlbS1yZWYge1xuICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiAjMTQ4Zjc3O1xuICBiYWNrZ3JvdW5kOiAjZjBmYWY3O1xuICBwYWRkaW5nOiAycHggNnB4ICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbn1cblxuLml0ZW0tcXR5IHtcbiAgY29sb3I6ICM3ZjhjOGQ7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5cbi5pdGVtLXByaWNlIHtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjMmMzZTUwO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4ub3JkZXItdG90YWwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICBnYXA6IDhweDtcbiAgcGFkZGluZy10b3A6IDhweDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlY2YwZjE7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgY29sb3I6ICMyYzNlNTA7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ },

/***/ 27611
/*!*********************************************************************!*\
  !*** ./src/app/features/order-history/order-history.route.model.ts ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   orderHistoryRoutes: () => (/* binding */ orderHistoryRoutes)
/* harmony export */ });
/* harmony import */ var _order_history_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./order-history.component */ 12882);

const orderHistoryRoutes = [{
  path: '',
  component: _order_history_component__WEBPACK_IMPORTED_MODULE_0__.OrderHistoryComponent
}];

/***/ },

/***/ 57973
/*!****************************************************************!*\
  !*** ./src/app/features/order-history/order-history.module.ts ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrderHistoryModule: () => (/* binding */ OrderHistoryModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 79748);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 46264);
/* harmony import */ var _order_history_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./order-history.component */ 12882);
/* harmony import */ var _order_history_route_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./order-history.route.model */ 27611);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/shared.module */ 93887);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 11817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 36124);







class OrderHistoryModule {
  static {
    this.ɵfac = function OrderHistoryModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || OrderHistoryModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
      type: OrderHistoryModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forChild(_order_history_route_model__WEBPACK_IMPORTED_MODULE_3__.orderHistoryRoutes)]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](OrderHistoryModule, {
    declarations: [_order_history_component__WEBPACK_IMPORTED_MODULE_2__.OrderHistoryComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
  });
})();

/***/ }

}]);
//# sourceMappingURL=src_app_features_order-history_order-history_module_ts.js.map