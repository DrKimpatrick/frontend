"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.updateEmployment = exports.listSpecificEmployment = exports.deleteEmployment = exports.listEmployments = exports.addEmployment = exports.EmploymentTypes = void 0;
var apiAction_1 = require("../../../helpers/apiAction");
var message_1 = require("../message");
var EmploymentTypes;
(function (EmploymentTypes) {
    EmploymentTypes["AddEmployment"] = "employment/AddEmployment";
    EmploymentTypes["DeleteEmployment"] = "employment/DeleteEmployment";
    EmploymentTypes["ListEmployments"] = "employment/ListEmployments";
    EmploymentTypes["ListSpecificEmployment"] = "employment/ListSpecificEmployment";
    EmploymentTypes["UpdateEmployment"] = "employment/UpdateEmployment";
    EmploymentTypes["Errors"] = "employment/Errors";
    EmploymentTypes["Loading"] = "employment/Loading";
    EmploymentTypes["Success"] = "employment/Success";
})(EmploymentTypes = exports.EmploymentTypes || (exports.EmploymentTypes = {}));
exports.addEmployment = function (data) { return function (dispatchAction) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dispatchAction(apiAction_1["default"]({
                url: '/employment',
                method: 'POST',
                data: data,
                onStart: function () { return function (dispatch) {
                    dispatch({ type: EmploymentTypes.Loading, payload: { loading: true } });
                }; },
                onFailure: function (error) { return function (dispatch) {
                    dispatch({
                        type: EmploymentTypes.Errors,
                        payload: {
                            errors: error.response.data
                        }
                    });
                }; },
                onSuccess: function (res) { return function (dispatch) {
                    dispatch({
                        type: EmploymentTypes.AddEmployment,
                        payload: {
                            data: res.data
                        }
                    });
                    message_1.setMessage(res.message)(dispatch);
                }; }
            }))];
    });
}); }; };
exports.listEmployments = function () { return function (dispatchAction) {
    return dispatchAction(apiAction_1["default"]({
        url: '/employment',
        method: 'GET',
        onStart: function () { return function (dispatch) {
            dispatch({ type: EmploymentTypes.Loading, payload: { loading: true } });
        }; },
        onFailure: function (error) { return function (dispatch) {
            dispatch({
                type: EmploymentTypes.Errors,
                payload: {
                    errors: error.response.data
                }
            });
        }; },
        onSuccess: function (res) { return function (dispatch) {
            if (res.data) {
                dispatch({
                    type: EmploymentTypes.ListEmployments,
                    payload: {
                        data: res.data
                    }
                });
            }
        }; }
    }));
}; };
exports.deleteEmployment = function (id) { return function (dispatchAction) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dispatchAction(apiAction_1["default"]({
                url: "/employment/" + id,
                method: 'DELETE',
                onStart: function () { return function (dispatch) {
                    dispatch({ type: EmploymentTypes.Loading, payload: { loading: true } });
                }; },
                onFailure: function (error) { return function (dispatch) {
                    dispatch({
                        type: EmploymentTypes.Errors,
                        payload: {
                            errors: error.response.data
                        }
                    });
                }; },
                onSuccess: function () { return function (dispatch) {
                    dispatch({
                        type: EmploymentTypes.DeleteEmployment,
                        payload: {
                            id: id
                        }
                    });
                }; }
            }))];
    });
}); }; };
exports.listSpecificEmployment = function (id) { return function (dispatchAction) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dispatchAction(apiAction_1["default"]({
                url: "/employment/" + id,
                method: 'GET',
                onStart: function () { return function (dispatch) {
                    dispatch({ type: EmploymentTypes.Loading, payload: { loading: true } });
                }; },
                onFailure: function (error) { return function (dispatch) {
                    dispatch({
                        type: EmploymentTypes.Errors,
                        payload: {
                            errors: error.response.data
                        }
                    });
                }; },
                onSuccess: function (res) { return function (dispatch) {
                    dispatch({
                        type: EmploymentTypes.ListSpecificEmployment,
                        payload: {
                            data: res.data
                        }
                    });
                }; }
            }))];
    });
}); }; };
exports.updateEmployment = function (data, id) { return function (dispatchAction) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dispatchAction(apiAction_1["default"]({
                url: "/employment/" + id,
                method: 'PUT',
                data: data,
                onStart: function () { return function (dispatch) {
                    dispatch({ type: EmploymentTypes.Loading, payload: { loading: true } });
                }; },
                onFailure: function (error) { return function (dispatch) {
                    dispatch({
                        type: EmploymentTypes.Errors,
                        payload: {
                            errors: error.response.data
                        }
                    });
                }; },
                onSuccess: function (res) { return function (dispatch) {
                    dispatch({
                        type: EmploymentTypes.UpdateEmployment,
                        payload: {
                            data: res.data
                        }
                    });
                    message_1.setMessage(res.message)(dispatch);
                }; }
            }))];
    });
}); }; };
