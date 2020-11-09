"use strict";
exports.__esModule = true;
exports.decodeToken = exports.validateForm = exports.passwordRegex = exports.validEmailRegex = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
exports.validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
exports.passwordRegex = RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/);
exports.validateForm = function (errors) {
    var valid = true;
    Object.values(errors).forEach(function (val) { return val.length > 0 && (valid = false); });
    return valid;
};
exports.decodeToken = function (token) {
    var decodedToken = jsonwebtoken_1["default"].decode(token);
    return decodedToken;
};
