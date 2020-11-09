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
exports.educationReducer = void 0;
var lodash_1 = require("lodash");
var education_1 = require("../../actions/education");
var message_1 = require("../../actions/message");
var initialState = {};
exports.educationReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case education_1.EducationTypes.AddEducation:
            return __assign(__assign({}, state), { educations: state.educations && __spreadArrays(state.educations, [
                    action.payload.data
                ]), loading: false, education: action.payload.data });
        case education_1.EducationTypes.DeleteEducation:
            return __assign(__assign({}, state), { loading: false, educations: state.educations &&
                    state.educations.filter(function (item) { return item._id !== action.payload.id; }) });
        case education_1.EducationTypes.ListEducation:
            return __assign(__assign({}, state), { loading: false, educations: action.payload.data });
        case education_1.EducationTypes.ListSpecificEducation:
            return __assign(__assign({}, state), { loading: false, education: action.payload.data });
        case education_1.EducationTypes.UpdateEducation:
            var update = lodash_1.map(state.educations, function (item) {
                if (item._id === action.payload.data._id) {
                    item = action.payload.data;
                }
                return item;
            });
            return __assign(__assign({}, state), { loading: false, educations: state.educations && update });
        case education_1.EducationTypes.Errors:
            return __assign(__assign({}, state), { loading: false, errors: action.payload.errors });
        case education_1.EducationTypes.Loading:
            return __assign(__assign({}, state), { loading: action.payload.loading ? action.payload.loading : true });
        case message_1.MessageTypes.Error:
        case message_1.MessageTypes.Message:
            return __assign(__assign({}, state), { loading: false });
        default:
            return state;
    }
};
