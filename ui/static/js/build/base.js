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
/******/ 	return __webpack_require__(__webpack_require__.s = "./ui/static/js/base.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ui/static/js/base.js":
/*!******************************!*\
  !*** ./ui/static/js/base.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar baseUrl = 'https://gentle-sands-32555.herokuapp.com/api/v2';\n\nfunction viewEditUserRequest() {\n  // get table on page by htmltag, 0 gets obj of the first table in the page\n  var table = document.getElementsByTagName('table')[0];\n  // from table obj get tr rows list\n  var rows = table.getElementsByTagName('tr');\n  // loop through rows list\n  for (var i = 1; i < rows.length; i++) {\n    // row object\n    var row = rows[i];\n    // Track with onclick(a row with a clicked event will trigger this)\n    row.onclick = function () {\n      var rowId = this.rowIndex;\n      var rowClicked = rows[rowId];\n      var rowData = rowClicked.getElementsByTagName('td');\n\n      var editRequestForm = document.getElementById('edit-request');\n\n      document.getElementById('edit-title').value = rowData[1].innerText;\n      document.getElementById('edit-description').value = rowData[2].innerText;\n      document.getElementById('edit-id').value = rowData[0].innerText;\n\n      if (rowData[3].innerText === 'Maintenance') {\n        document.getElementById('Maintenance').checked = true;\n      } else if (rowData[3].innerText === 'Repair') {\n        document.getElementById('Repair').checked = true;\n      }\n\n      editRequestForm.classList.remove('hide-form');\n      editRequestForm.scrollIntoView(false);\n    };\n  }\n}\n\n// toggle navbar for small screen devices by adding responsive class to navbar\nfunction toggleNavbar() {\n  var navbar = document.getElementById('topnav');\n  if (navbar.className === 'topnav') {\n    navbar.classList.add('responsive');\n  } else {\n    navbar.classList.remove('responsive');\n  }\n}\n\nfunction toggleRequestDetails() {\n  // get table on page by htmltag, 0 gets obj of the first table in the page\n  var table = document.getElementsByTagName('table')[0];\n  // from table obj get tr rows list\n  var rows = table.getElementsByTagName('tr');\n  // loop through rows list\n  for (var i = 1; i < rows.length; i++) {\n    // row object\n    var row = rows[i];\n    // Track with onclick(a row with a clicked event will trigger this)\n    row.onclick = function () {\n      var rowIndex = this.rowIndex;\n      insertDescRow(table, rows, rowIndex);\n    };\n  }\n}\n\n// create row for request description\nfunction insertDescRow(table, rows, rowIndex) {\n  var row = rows[rowIndex];\n  console.log(rowIndex + 1 + ' ' + rows.length);\n  // if not last row, check if row should be added or deleted\n  if (rows.length !== rowIndex + 1) {\n    var nextRow = rows[rowIndex + 1];\n    if (nextRow.classList.contains('shown')) {\n      // delete that row\n      table.deleteRow(rowIndex + 1);\n      stop();\n    } else {\n      // create a details row\n      createRow(table, rowIndex, row);\n    }\n  } else {\n    createRow(table, rowIndex, row);\n  }\n}\n\nfunction createRow(table, rowIndex, row) {\n  // create new row below the row where button was clicked\n  var newRow = table.insertRow(rowIndex + 1);\n  // get data from the row whose details need to be viewwd\n  // this data can come from json obj for row given data is being\n  // retrieved from somewhere eg, a db\n  var rowData = row.getElementsByTagName('td');\n  newRow.classList.add('shown');\n  // insert td cells\n  var tdataIndex = newRow.insertCell(0);\n  var tdataDetails = newRow.insertCell(1);\n  // colspan cell with details\n  tdataDetails.colSpan = 8;\n  tdataIndex.innerText = '';\n\n  tdataDetails.innerHTML = '<p> Name: <strong>' + rowData[1].innerText + '</strong> </p>';\n  tdataDetails.innerHTML += '<p> Title: <strong>' + rowData[2].innerText + '</strong> </p>';\n  tdataDetails.innerHTML += '<p> Type: <strong>' + rowData[3].innerText + '</strong> </p>';\n  tdataDetails.innerHTML += '<p> Time requested: <strong>' + rowData[5].innerText + '</strong> </p>';\n  tdataDetails.innerHTML += '<p> Description: <strong>' + rowData[4].innerText + '</strong> </p>';\n  tdataDetails.innerHTML += '<p> Status: <strong>' + rowData[7].innerText + '</strong></p>';\n}\n\nfunction action(type) {\n  // get table on page by htmltag, 0 gets obj of the first table in the page\n  var table = document.getElementsByTagName('table')[0];\n  // from table obj get tr rows list\n  var rows = table.getElementsByTagName('tr');\n  // loop through rows list\n  for (var i = 1; i < rows.length; i++) {\n    // row object\n    var row = rows[i];\n    // Track with onclick(a row with a clicked event will trigger this)\n    row.onclick = function () {\n      var rowId = this.rowIndex;\n      var rowClicked = rows[rowId];\n      var rowData = rowClicked.getElementsByTagName('td');\n\n      var endpoint;\n\n      if (type === 'approve') {\n        endpoint = '/requests/' + rowData[0].innerText + '/approve';\n      } else if (type === 'disapprove') {\n        endpoint = '/requests/' + rowData[0].innerText + '/disapprove';\n      } else if (type === 'resolve') {\n        endpoint = '/requests/' + rowData[0].innerText + '/resolve';\n      }\n      // initialize request\n      var request = new Request(baseUrl + endpoint, {\n        method: 'PUT',\n        headers: {\n          'Content-Type': 'application/json',\n          'access-token': localStorage.getItem('access-token')\n        },\n        mode: 'cors'\n      });\n\n      fetch(request).then(function (response) {\n        response.json().then(function (responseBody) {\n          if (responseBody.message === 'Request disapproved successfully' || responseBody.message === 'Request approved successfully' || responseBody.message === 'Request resolved successfully') {\n            toast('success', responseBody.message);\n            document.location.reload(false);\n          } else {\n            toast('error', 'Session expired, login again to continue.');\n            window.location = 'signin.html';\n          }\n        });\n      });\n    };\n  }\n}\n\nfunction toast(type, message) {\n  var toastMessage = document.createElement('P');\n  if (type === 'error') {\n    toastMessage.classList.add('error');\n  } else if (type === 'success') {\n    toastMessage.classList.add('success');\n  } else {\n    toastMessage.classList.add('info');\n  }\n\n  var response = document.createTextNode(message);\n\n  toastMessage.appendChild(response);\n  document.body.appendChild(toastMessage);\n\n  // After 5 seconds, remove the show class from DIV\n  setTimeout(function () {\n    toastMessage.className = toastMessage.className.replace('error', 'hide');\n    toastMessage.className = toastMessage.className.replace('success', 'hide');\n    toastMessage.className = toastMessage.className.replace('info', 'hide');\n  }, 6000);\n}\n\nfunction logout() {\n  localStorage.removeItem('access-token');\n  location.href = 'index.html';\n}\n\n//# sourceURL=webpack:///./ui/static/js/base.js?");

/***/ })

/******/ });