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
/******/ 	return __webpack_require__(__webpack_require__.s = "./ui/static/js/admin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ui/static/js/admin.js":
/*!*******************************!*\
  !*** ./ui/static/js/admin.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _helpers = __webpack_require__(/*! ./helpers */ \"./ui/static/js/helpers.js\");\n\nfunction getRequests() {\n  // the endoint for this request\n  var endpoint = '/requests';\n\n  // initialize request\n  var request = new Request(_helpers.baseUrl + endpoint, {\n    method: 'GET',\n    headers: {\n      'Content-Type': 'application/json',\n      'access-token': localStorage.getItem('access-token')\n    }\n  });\n\n  fetch(request).then(function (response) {\n    response.json().then(function (responseBody) {\n      if (responseBody.message === 'There are no requests yet!') {\n        (0, _helpers.toast)('info', responseBody.message);\n      } else if (!responseBody.message) {\n        populateReqTable(responseBody);\n      } else {\n        // token invalid or authorization failed\n        (0, _helpers.toast)('error', responseBody.message);\n        window.location = 'signin.html';\n      }\n    });\n  });\n}\n\nfunction populateReqTable(allRequests) {\n  Object.values(allRequests).map(insertRequest);\n}\n\nfunction insertRequest(request) {\n  var table = document.getElementsByTagName('tbody')[0];\n  var newRow = table.insertRow(0);\n\n  // insert td cells\n  var id = newRow.insertCell(0);\n  var userId = newRow.insertCell(1);\n  var title = newRow.insertCell(2);\n  var type = newRow.insertCell(3);\n  var description = newRow.insertCell(4);\n  var dateRequested = newRow.insertCell(5);\n  var status = newRow.insertCell(6);\n  var actions = newRow.insertCell(7);\n\n  id.innerHTML = request.request_id;\n  userId.innerHTML = request.created_by;\n  title.innerHTML = request.title;\n  description.innerHTML = request.description;\n  type.innerHTML = request.type;\n  dateRequested.innerHTML = request.created_at;\n  status.innerHTML = request.status;\n  actions.innerHTML = requestActions(request.status, request.request_id);\n}\n\nfunction requestActions(status, id) {\n  if (status === 'open') {\n    return '<button class=\"fa fa-check\" onclick=\"action(\\'approve\\')\"> Approve</button>\\n    <button class=\"fa fa-times\" onclick=\"action(\\'disapprove\\')\"> Disapprove</button>\\n    <button class=\"fa fa-eye\" onclick=\"toggleRequestDetails()\"> View</button>';\n  } else if (status === 'pending') {\n    return '<button class=\"fa fa-check\" onclick=\"action(\\'resolve\\')\">Resolve</button>\\n    <button class=\"fa fa-eye\" onclick=\"toggleRequestDetails()\">View</button>';\n  } else {\n    return '<button class=\"fa fa-eye\" onclick=\"toggleRequestDetails()\">View</button>';\n  }\n}\n\nfunction search() {\n  var input = document.getElementById('search').value.toUpperCase();\n  var tbody = document.getElementsByTagName('table')[0].tBodies[0];\n  var trows = tbody.getElementsByTagName('tr');\n  for (var index = 0; index < trows.length; index++) {\n    var tr = trows[index].getElementsByTagName('td');\n    for (var i = 0; i < tr.length; i++) {\n      var td = tr[i];\n      if (td) {\n        if (td.innerHTML.toUpperCase().indexOf(input) === -1) {\n          trows[index].style.display = 'none';\n        } else {\n          trows[index].style.display = '';\n          break;\n        }\n      }\n    }\n  }\n}\ngetRequests();\n\ndocument.getElementById('search').addEventListener('keyup', search);\n\n//# sourceURL=webpack:///./ui/static/js/admin.js?");

/***/ }),

/***/ "./ui/static/js/helpers.js":
/*!*********************************!*\
  !*** ./ui/static/js/helpers.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.toast = toast;\n// export const baseUrl = 'https://gentle-sands-32555.herokuapp.com/api/v2'\nvar baseUrl = exports.baseUrl = 'http://127.0.0.1:5000/api/v2';\n\nfunction toast(type, message) {\n  var toastMessage = document.createElement('P');\n  if (type === 'error') {\n    toastMessage.classList.add('error');\n  } else if (type === 'success') {\n    toastMessage.classList.add('success');\n  } else {\n    toastMessage.classList.add('info');\n  }\n\n  var response = document.createTextNode(message);\n\n  toastMessage.appendChild(response);\n  document.body.appendChild(toastMessage);\n\n  // After 5 seconds, remove the show class from DIV\n  setTimeout(function () {\n    toastMessage.className = toastMessage.className.replace('error', 'hide');\n    toastMessage.className = toastMessage.className.replace('success', 'hide');\n    toastMessage.className = toastMessage.className.replace('info', 'hide');\n  }, 6000);\n}\n\n//# sourceURL=webpack:///./ui/static/js/helpers.js?");

/***/ })

/******/ });