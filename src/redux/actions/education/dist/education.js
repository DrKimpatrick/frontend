"use strict";
exports.__esModule = true;
exports.deleteEducation = exports.updateEducation = exports.listSpecificEducation = exports.listEducation = exports.addEducation = exports.EducationTypes = void 0;
var apiAction_1 = require("../../../helpers/apiAction");
var message_1 = require("../message");
var EducationTypes;
(function (EducationTypes) {
    EducationTypes["AddEducation"] = "Education/AddEducation";
    EducationTypes["DeleteEducation"] = "Education/DeleteEducation";
    EducationTypes["UpdateEducation"] = "Education/UpdateEducation";
    EducationTypes["ListEducation"] = "Education/ListEducation";
    EducationTypes["ListSpecificEducation"] = "Education/ListSpecificEducation";
    EducationTypes["Errors"] = "Education/Errors";
    EducationTypes["Loading"] = "Education/Loading";
})(EducationTypes = exports.EducationTypes || (exports.EducationTypes = {}));
exports.addEducation = function (data) { return function (dispatchAction) {
    return dispatchAction(apiAction_1["default"]({
        url: '/education',
        method: 'POST',
        data: data,
        onStart: function () { return function (dispatch) {
            return dispatch({ type: EducationTypes.Loading, payload: { loading: true } });
        }; },
        onFailure: function (error) { return function (dispatch) {
            dispatch({
                type: EducationTypes.Errors,
                payload: {
                    errors: error.response.data
                }
            });
        }; },
        onSuccess: function (res) { return function (dispatch) {
            dispatch({
                type: EducationTypes.AddEducation,
                payload: { data: res.data }
            });
            message_1.setMessage('education saved successfully')(dispatch);
        }; }
    }));
}; };
exports.listEducation = function () { return function (dispatchAction) {
    return dispatchAction(apiAction_1["default"]({
        url: '/education',
        method: 'GET',
        onStart: function () { return function (dispatch) {
            dispatch({ type: EducationTypes.Loading, payload: { loading: true } });
        }; },
        onFailure: function (error) { return function (dispatch) {
            dispatch({
                type: EducationTypes.Errors,
                payload: {
                    errors: error.response.data
                }
            });
        }; },
        onSuccess: function (res) { return function (dispatch) {
            if (res.data) {
                dispatch({
                    type: EducationTypes.ListEducation,
                    payload: {
                        data: res.data
                    }
                });
            }
        }; }
    }));
}; };
exports.listSpecificEducation = function (userId, educationId) { return function (dispatchAction) {
    return dispatchAction(apiAction_1["default"]({
        url: "/education/" + userId + "/" + educationId,
        method: 'GET',
        onStart: function () { return function (dispatch) {
            return dispatch({ type: EducationTypes.Loading, payload: { loading: true } });
        }; },
        onFailure: function (error) { return function (dispatch) {
            dispatch({
                type: EducationTypes.Errors,
                payload: {
                    errors: error.response.data
                }
            });
        }; },
        onSuccess: function (res) { return function (dispatch) {
            dispatch({
                type: EducationTypes.ListSpecificEducation,
                payload: { data: res.data }
            });
        }; }
    }));
}; };
exports.updateEducation = function (data, userId, educationId) { return function (dispatchAction) {
    return dispatchAction(apiAction_1["default"]({
        url: "/education/" + userId + "/" + educationId,
        method: 'PATCH',
        data: data,
        onStart: function () { return function (dispatch) {
            return dispatch({ type: EducationTypes.Loading, payload: { loading: true } });
        }; },
        onFailure: function (error) { return function (dispatch) {
            dispatch({
                type: EducationTypes.Errors,
                payload: {
                    errors: error.response.data
                }
            });
        }; },
        onSuccess: function (res) { return function (dispatch) {
            dispatch({
                type: EducationTypes.UpdateEducation,
                payload: { data: res.data }
            });
            message_1.setMessage('education updated successfully')(dispatch);
        }; }
    }));
}; };
exports.deleteEducation = function (educationId) { return function (dispatchAction) {
    return dispatchAction(apiAction_1["default"]({
        url: "/education/" + educationId,
        method: 'Delete',
        onStart: function () { return function (dispatch) {
            return dispatch({ type: EducationTypes.Loading, payload: { loading: true } });
        }; },
        onFailure: function (error) { return function (dispatch) {
            dispatch({
                type: EducationTypes.Errors,
                payload: {
                    errors: error.response.data
                }
            });
        }; },
        onSuccess: function () { return function (dispatch) {
            dispatch({
                type: EducationTypes.DeleteEducation,
                payload: { id: educationId }
            });
            message_1.setMessage('education deleted successfully')(dispatch);
        }; }
    }));
}; };
