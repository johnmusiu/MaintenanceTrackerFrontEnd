/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/ui/static/js/build";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./ui/static/js/super_admin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ui/static/js/helpers.js":
/*!*********************************!*\
  !*** ./ui/static/js/helpers.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.toast = toast;\nvar baseUrl = exports.baseUrl = 'https://gentle-sands-32555.herokuapp.com/api/v2';\n\nfunction toast(type, message) {\n  var toastMessage = document.createElement('P');\n  if (type === 'error') {\n    toastMessage.classList.add('error');\n  } else if (type === 'success') {\n    toastMessage.classList.add('success');\n  } else {\n    toastMessage.classList.add('info');\n  }\n\n  var response = document.createTextNode(message);\n\n  toastMessage.appendChild(response);\n  document.body.appendChild(toastMessage);\n\n  // After 5 seconds, remove the show class from DIV\n  setTimeout(function () {\n    toastMessage.className = toastMessage.className.replace('error', 'hide');\n    toastMessage.className = toastMessage.className.replace('success', 'hide');\n    toastMessage.className = toastMessage.className.replace('info', 'hide');\n  }, 6000);\n}\n\n//# sourceURL=webpack:///./ui/static/js/helpers.js?");

/***/ }),

/***/ "./ui/static/js/super_admin.js":
/*!*************************************!*\
  !*** ./ui/static/js/super_admin.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _helpers = __webpack_require__(/*! ./helpers */ \"./ui/static/js/helpers.js\");\n\n// funtion to signup user\nfunction signup(e) {\n  e.preventDefault();\n  var endpoint = '/admin';\n\n  fetch(_helpers.baseUrl + endpoint, {\n    headers: {\n      'content-type': 'application/json',\n      'access-token': localStorage.getItem('access-token')\n    },\n    mode: 'cors',\n    method: 'POST',\n    body: JSON.stringify({\n      first_name: document.getElementById('fname').value,\n      last_name: document.getElementById('lname').value,\n      email: document.getElementById('email').value,\n      password: document.getElementById('password').value,\n      confirm_password: document.getElementById('confirm_password').value\n    })\n  }).then(function (response) {\n    return response.json();\n  }).then(function (res) {\n    console.log(res.message);\n    if (res.message === 'Admin created successfully') {\n      (0, _helpers.toast)('success', res.message);\n      // location.reload()\n    } else if (res.message === 'Token is missing! Login to get token.' || res.message === 'Token is invalid!') {\n      localStorage.setItem('message', res['message']);\n      location.href = 'signin.html';\n    } else {\n      (0, _helpers.toast)('error', res.message);\n    }\n  });\n}\n\n// onclick listenerss for signup request\ndocument.getElementById('btn-signup-admin').addEventListener('click', signup);\n\n//# sourceURL=webpack:///./ui/static/js/super_admin.js?");

/***/ })

/******/ });