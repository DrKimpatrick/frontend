"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.employmentReducer = void 0;
var lodash_1 = require("lodash");
var employment_1 = require("../../actions/employment");
var message_1 = require("../../actions/message");
var initialState = {};
exports.employmentReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case employment_1.EmploymentTypes.AddEmployment:
            return __assign(__assign({}, state), { loading: false, employments: state.employments
                    ? __spreadArrays([action.payload.data], state.employments) : [action.payload.data], employment: action.payload.data });
        case employment_1.EmploymentTypes.ListEmployments:
            return __assign(__assign({}, state), { employments: action.payload.data, loading: false });
        case employment_1.EmploymentTypes.ListSpecificEmployment:
            return __assign(__assign({}, state), { employment: action.payload.data, loading: false });
        case employment_1.EmploymentTypes.Success:
            return __assign(__assign({}, state), { message: action.payload.message });
        case employment_1.EmploymentTypes.DeleteEmployment:
            return __assign(__assign({}, state), { employments: state.employments &&
                    state.employments.filter(function (item) { return item._id !== action.payload.id; }), loading: false });
        case employment_1.EmploymentTypes.UpdateEmployment:
            var update = lodash_1.map(state.employments, function (item) {
                if (item._id === action.payload.data._id) {
                    item = action.payload.data;
                }
                return item;
            });
            return __assign(__assign({}, state), { loading: false, employments: state.employments && update });
        case employment_1.EmploymentTypes.Loading:
            return __assign(__assign({}, state), { loading: action.payload.loading ? action.payload.loading : true });
        case employment_1.EmploymentTypes.Errors:
            return __assign(__assign({}, state), { errors: action.payload.errors, loading: false });
        case message_1.MessageTypes.Message:
            return __assign(__assign({}, state), { loading: false, errors: undefined });
        case message_1.MessageTypes.Error:
            return __assign(__assign({}, state), { loading: false });
        default:
            return state;
    }
};
