((typeof self !== 'undefined' ? self : this)["webpackJsonpa"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpa"] || []).push([[0],{

/***/ "2428":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalProgressBar0_vue_vue_type_style_index_0_id_c252b48e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7bef");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalProgressBar0_vue_vue_type_style_index_0_id_c252b48e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalProgressBar0_vue_vue_type_style_index_0_id_c252b48e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalProgressBar0_vue_vue_type_style_index_0_id_c252b48e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "2877":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "456d":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("4bf8");
var $keys = __webpack_require__("0d58");

__webpack_require__("5eda")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "5eda":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("5ca1");
var core = __webpack_require__("8378");
var fails = __webpack_require__("79e5");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "7bef":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "ef43":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules//.cache//vue-loader","cacheIdentifier":"545da000-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/GlobalProgressBar0.vue?vue&type=template&id=c252b48e&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"simple-progress",style:({ 'height': this.height + 'px' })},[_c('div',{staticClass:"simple-progress__bar",style:(_vm.progressBarStyle)})])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/GlobalProgressBar0.vue?vue&type=template&id=c252b48e&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/objectSpread.js

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.promise.js
var es6_promise = __webpack_require__("551c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.promise.finally.js
var es7_promise_finally = __webpack_require__("097d");

// EXTERNAL MODULE: ./src/common.js
var common = __webpack_require__("69d9");

// EXTERNAL MODULE: ./src/GlobalProgressBar.config.js
var GlobalProgressBar_config = __webpack_require__("cd28");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/GlobalProgressBar0.vue?vue&type=script&lang=js&






//
//
//
//
//
//
//
//
//


/* harmony default export */ var GlobalProgressBar0vue_type_script_lang_js_ = ({
  name: 'progress-bar0',
  data: function data() {
    return {
      mode: GlobalProgressBar_config["default"].mode,
      theme: GlobalProgressBar_config["default"].theme,
      decoration: GlobalProgressBar_config["default"].decoration,
      height: GlobalProgressBar_config["default"].height,
      currProgress: 0,
      color: GlobalProgressBar_config["default"].theme.primary,
      transitionAttr: {
        transitionDuration: '800ms, 1500ms, 200ms, 200ms',
        transitionTimingFunction: 'ease, ease, ease, ease'
      }
    };
  },
  computed: {
    progressBarStyle: function progressBarStyle() {
      return _objectSpread({
        backgroundColor: this.color,
        boxShadow: "0px 0px 10px ".concat(this.color),
        width: this.currProgress + '%',
        opacity: this.currProgress >= 100 || this.currProgress == 0 ? 0 : 1
      }, this.transitionAttr);
    }
  },
  methods: {
    registerEventListener: function registerEventListener() {
      var _this = this;

      this.$componentListeners = {
        // 进度条控制类
        'start': this.onStart,
        'finish': this.onFinish,
        'successFinish': this.onSuccessFinish,
        'warningFinish': this.onWarningFinish,
        'errorFinish': this.onErrorFinish
      };
      Object.keys(this.$componentListeners).forEach(function (i) {
        _this.$on(i, _this.$componentListeners[i]);
      });
    },
    onStart: function onStart() {
      var _this2 = this;

      var initProgress = common["b" /* randomFrom */](20, 80);

      this.currProgress = initProgress;
      this.transitionAttr = _objectSpread({}, this.transitionAttr, {
        transitionDuration: '400ms, 0ms, 200ms, 200ms'
      });
      this.$timerId = setInterval(function () {
        if (_this2.currProgress >= 98) clearInterval(_this2.$timerId);
        _this2.currProgress += (100 - _this2.currProgress) / common["b" /* randomFrom */](10, 50);
      }, 600);
    },
    onFinish: function onFinish() {
      var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.theme.primary;
      clearInterval(this.$timerId);
      this.transitionAttr = _objectSpread({}, this.transitionAttr, {
        transitionDuration: '300ms, 1500ms, 200ms, 200ms'
      });
      this.color = color;
      this.currProgress = 100;
    },
    onSuccessFinish: function onSuccessFinish() {
      this.onFinish(this.theme.success);
    },
    onErrorFinish: function onErrorFinish() {
      this.onFinish(this.theme.error);
    },
    onWarningFinish: function onWarningFinish() {
      this.onFinish(this.theme.warn);
    },
    deleteEventListener: function deleteEventListener() {
      var _this3 = this;

      Object.keys(this.$componentListeners).forEach(function (i) {
        _this3.$off(i, _this3.$componentListeners[i]);
      });
    }
  },
  created: function created() {
    this.registerEventListener();
  },
  beforeDestroy: function beforeDestroy() {
    this.deleteEventListener();
  }
});
// CONCATENATED MODULE: ./src/GlobalProgressBar0.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_GlobalProgressBar0vue_type_script_lang_js_ = (GlobalProgressBar0vue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/GlobalProgressBar0.vue?vue&type=style&index=0&id=c252b48e&scoped=true&lang=css&
var GlobalProgressBar0vue_type_style_index_0_id_c252b48e_scoped_true_lang_css_ = __webpack_require__("2428");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/GlobalProgressBar0.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_GlobalProgressBar0vue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "c252b48e",
  null
  
)

component.options.__file = "GlobalProgressBar0.vue"
/* harmony default export */ var GlobalProgressBar0 = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=a.common.0.js.map