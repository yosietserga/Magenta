"use strict";
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./components/image.js":
/*!*****************************!*\
  !*** ./components/image.js ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Img; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_repos_ganasafiweb_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _public_img_logo_logo_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../public/img/logo/logo.png */ "./public/img/logo/logo.png");
/* module decorator */ module = __webpack_require__.hmd(module);



var _jsxFileName = "C:\\repos\\ganasafiweb\\components\\image.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0,C_repos_ganasafiweb_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//walk through all images into public folder
function importAll(r) {
  var images = {};
  r.keys().map(function (item) {
    console.log(item);
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

 //get images array

console.log(__webpack_require__("./public/img sync \\.(png|jpe?g|svg)$"));
function Img(_ref) {
  var _c2;

  var s = _ref.s,
      a = _ref.a,
      c = _ref.c;
  var subfolders = s.split('/');
  var basedir = "../public/img/";

  if (subfolders.length > 0) {
    var f = subfolders.pop();
    basedir += subfolders.join('/') + "/";
  }

  console.log({
    basedir: basedir
  }); //not chached? let's get it

  if (!cacheImages[s]) {
    var images = importAll(__webpack_require__("./components sync recursive").context("".concat(basedir), false, /\.(png|jpe?g|svg)$/));
    cacheImages = _objectSpread(_objectSpread({}, cacheImages), {}, {
      images: images
    });
  }

  console.log({
    cacheImages: cacheImages
  });
  c = (_c2 = c) !== null && _c2 !== void 0 ? _c2 : "";
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [!!cacheImages[s] && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("img", {
      className: "ui-image" + (c ? " " : "") + c,
      src: cacheImages[s]["default"],
      layout: "fill",
      alt: a !== null && a !== void 0 ? a : ""
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 9
    }, this), !cacheImages[s] && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("small", {
      children: ["Image not found: ", s]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 27
    }, this)]
  }, void 0, true);
}
_c = Img;

var _c;

$RefreshReg$(_c, "Img");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvaW5kZXguODE3Mzg0M2ViNGY3YTY0NjdmYWEuaG90LXVwZGF0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLFNBQVNBLFNBQVQsQ0FBbUJDLENBQW5CLEVBQXNCO0FBQ3BCLE1BQUlDLE1BQU0sR0FBRyxFQUFiO0FBQ0FELEVBQUFBLENBQUMsQ0FBQ0UsSUFBRixHQUFTQyxHQUFULENBQWEsVUFBQ0MsSUFBRCxFQUFVO0FBQ3JCQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsSUFBWjtBQUNBSCxJQUFBQSxNQUFNLENBQUNHLElBQUksQ0FBQ0csT0FBTCxDQUFhLElBQWIsRUFBbUIsRUFBbkIsQ0FBRCxDQUFOLEdBQWlDUCxDQUFDLENBQUNJLElBQUQsQ0FBbEM7QUFDRCxHQUhEO0FBSUEsU0FBT0gsTUFBUDtBQUNEOztDQUlEOztBQUNBSSxPQUFPLENBQUNDLEdBQVIsQ0FBYUcsNERBQWI7QUFDZSxTQUFTSyxHQUFULE9BQTBCO0FBQUE7O0FBQUEsTUFBWEMsQ0FBVyxRQUFYQSxDQUFXO0FBQUEsTUFBUkMsQ0FBUSxRQUFSQSxDQUFRO0FBQUEsTUFBTEMsQ0FBSyxRQUFMQSxDQUFLO0FBQ3ZDLE1BQUlDLFVBQVUsR0FBR0gsQ0FBQyxDQUFDSSxLQUFGLENBQVEsR0FBUixDQUFqQjtBQUNBLE1BQUlDLE9BQU8sR0FBR1QsZ0JBQWQ7O0FBRUEsTUFBSU8sVUFBVSxDQUFDRyxNQUFYLEdBQWtCLENBQXRCLEVBQXlCO0FBQ3ZCLFFBQUlDLENBQUMsR0FBR0osVUFBVSxDQUFDSyxHQUFYLEVBQVI7QUFDQUgsSUFBQUEsT0FBTyxJQUFJRixVQUFVLENBQUNNLElBQVgsQ0FBZ0IsR0FBaEIsSUFBc0IsR0FBakM7QUFDRDs7QUFFRG5CLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFhO0FBQUNjLElBQUFBLE9BQU8sRUFBUEE7QUFBRCxHQUFiLEVBVHVDLENBV3ZDOztBQUNBLE1BQUksQ0FBQ0ssV0FBVyxDQUFDVixDQUFELENBQWhCLEVBQXFCO0FBQ25CLFFBQUlkLE1BQU0sR0FBR0YsU0FBUyxDQUNwQlUsa0RBQU8sQ0FBQ0MsT0FBUixXQUFtQlUsT0FBbkIsR0FBOEIsS0FBOUIsRUFBcUMsb0JBQXJDLENBRG9CLENBQXRCO0FBSUFLLElBQUFBLFdBQVcsbUNBQVFBLFdBQVI7QUFBcUJ4QixNQUFBQSxNQUFNLEVBQU5BO0FBQXJCLE1BQVg7QUFDRDs7QUFDQ0ksRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVk7QUFBRW1CLElBQUFBLFdBQVcsRUFBWEE7QUFBRixHQUFaO0FBQ0ZSLEVBQUFBLENBQUMsVUFBR0EsQ0FBSCxxQ0FBUSxFQUFUO0FBQ0Esc0JBQ0U7QUFBQSxlQUNHLENBQUMsQ0FBQ1EsV0FBVyxDQUFDVixDQUFELENBQWIsaUJBQ0M7QUFDRSxlQUFTLEVBQUUsY0FBY0UsQ0FBQyxHQUFHLEdBQUgsR0FBUyxFQUF4QixJQUE4QkEsQ0FEM0M7QUFFRSxTQUFHLEVBQUVRLFdBQVcsQ0FBQ1YsQ0FBRCxDQUFYLFdBRlA7QUFHRSxZQUFNLEVBQUMsTUFIVDtBQUlFLFNBQUcsRUFBRUMsQ0FBRixhQUFFQSxDQUFGLGNBQUVBLENBQUYsR0FBTztBQUpaO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFGSixFQW9CRyxDQUFDUyxXQUFXLENBQUNWLENBQUQsQ0FBWixpQkFBbUI7QUFBQSxzQ0FBeUJBLENBQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQXBCdEI7QUFBQSxrQkFERjtBQXdCRDtLQTdDdUJEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvaW1hZ2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy93YWxrIHRocm91Z2ggYWxsIGltYWdlcyBpbnRvIHB1YmxpYyBmb2xkZXJcclxuZnVuY3Rpb24gaW1wb3J0QWxsKHIpIHtcclxuICBsZXQgaW1hZ2VzID0ge307XHJcbiAgci5rZXlzKCkubWFwKChpdGVtKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhpdGVtKTtcclxuICAgIGltYWdlc1tpdGVtLnJlcGxhY2UoXCIuL1wiLCBcIlwiKV0gPSByKGl0ZW0pO1xyXG4gIH0pO1xyXG4gIHJldHVybiBpbWFnZXM7XHJcbn1cclxuXHJcbmltcG9ydCBsb2dvIGZyb20gXCIuLi9wdWJsaWMvaW1nL2xvZ28vbG9nby5wbmdcIjtcclxuXHJcbi8vZ2V0IGltYWdlcyBhcnJheVxyXG5jb25zb2xlLmxvZyggcmVxdWlyZS5jb250ZXh0KHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0lNQUdFX1BBVEgsIGZhbHNlLCAvXFwuKHBuZ3xqcGU/Z3xzdmcpJC8pICk7XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEltZyh7IHMsIGEsIGMgfSkge1xyXG4gIGxldCBzdWJmb2xkZXJzID0gcy5zcGxpdCgnLycpO1xyXG4gIGxldCBiYXNlZGlyID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfSU1BR0VfUEFUSDtcclxuXHJcbiAgaWYgKHN1YmZvbGRlcnMubGVuZ3RoPjApIHtcclxuICAgIGxldCBmID0gc3ViZm9sZGVycy5wb3AoKTtcclxuICAgIGJhc2VkaXIgKz0gc3ViZm9sZGVycy5qb2luKCcvJykgK1wiL1wiO1xyXG4gIH1cclxuXHJcbiAgY29uc29sZS5sb2coIHtiYXNlZGlyfSApO1xyXG5cclxuICAvL25vdCBjaGFjaGVkPyBsZXQncyBnZXQgaXRcclxuICBpZiAoIWNhY2hlSW1hZ2VzW3NdKSB7XHJcbiAgICBsZXQgaW1hZ2VzID0gaW1wb3J0QWxsKFxyXG4gICAgICByZXF1aXJlLmNvbnRleHQoYCR7YmFzZWRpcn1gLCBmYWxzZSwgL1xcLihwbmd8anBlP2d8c3ZnKSQvKVxyXG4gICAgKTtcclxuXHJcbiAgICBjYWNoZUltYWdlcyA9IHsgLi4uY2FjaGVJbWFnZXMsIGltYWdlcyB9O1xyXG4gIH1cclxuICAgIGNvbnNvbGUubG9nKHsgY2FjaGVJbWFnZXMgfSk7XHJcbiAgYyA9IGMgPz8gXCJcIjtcclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgeyEhY2FjaGVJbWFnZXNbc10gJiYgKFxyXG4gICAgICAgIDxpbWdcclxuICAgICAgICAgIGNsYXNzTmFtZT17XCJ1aS1pbWFnZVwiICsgKGMgPyBcIiBcIiA6IFwiXCIpICsgY31cclxuICAgICAgICAgIHNyYz17Y2FjaGVJbWFnZXNbc10uZGVmYXVsdH1cclxuICAgICAgICAgIGxheW91dD1cImZpbGxcIlxyXG4gICAgICAgICAgYWx0PXthID8/IFwiXCJ9XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIHsvKlxyXG4gICAgICB7ISFjYWNoZUltYWdlc1tzXSAmJiAoXHJcbiAgICAgICAgPEltYWdlXHJcbiAgICAgICAgY2xhc3NOYW1lPXtjK1wiIHVpLWltYWdlXCJ9XHJcbiAgICAgICAgICBzcmM9e2NhY2hlSW1hZ2VzW3NdLmRlZmF1bHR9XHJcbiAgICAgICAgICBsYXlvdXQ9XCJmaWxsXCJcclxuICAgICAgICAgIGFsdD17YSA/PyBcIlwifVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcbiAgICAgICovfVxyXG4gICAgICB7IWNhY2hlSW1hZ2VzW3NdICYmIDxzbWFsbD5JbWFnZSBub3QgZm91bmQ6IHtzfTwvc21hbGw+fVxyXG4gICAgPC8+XHJcbiAgKTtcclxufSJdLCJuYW1lcyI6WyJpbXBvcnRBbGwiLCJyIiwiaW1hZ2VzIiwia2V5cyIsIm1hcCIsIml0ZW0iLCJjb25zb2xlIiwibG9nIiwicmVwbGFjZSIsImxvZ28iLCJyZXF1aXJlIiwiY29udGV4dCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19JTUFHRV9QQVRIIiwiSW1nIiwicyIsImEiLCJjIiwic3ViZm9sZGVycyIsInNwbGl0IiwiYmFzZWRpciIsImxlbmd0aCIsImYiLCJwb3AiLCJqb2luIiwiY2FjaGVJbWFnZXMiXSwic291cmNlUm9vdCI6IiJ9