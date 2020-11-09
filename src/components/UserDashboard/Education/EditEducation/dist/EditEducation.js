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
exports.__esModule = true;
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var react_redux_1 = require("react-redux");
var icons_1 = require("@material-ui/icons");
var date_fns_1 = require("date-fns");
var __1 = require("..");
var education_1 = require("../../../../redux/actions/education");
var EditEducation = function (props) {
    var _a = react_1.useState(true), open = _a[0], setOpen = _a[1];
    var close = props.close, education = props.education;
    var dispatch = react_redux_1.useDispatch();
    var reducer = react_redux_1.useSelector(function (state) {
        var _a = state.educations, loading = _a.loading, errors = _a.errors;
        var user = state.users.user;
        var message = state.messages.message;
        return { message: message, loading: loading, errors: errors, user: user };
    });
    react_1.useEffect(function () {
        if (reducer.message) {
            close();
        }
    }, [reducer.message, close]);
    if (!reducer.user) {
        return null;
    }
    return (react_1["default"].createElement(core_1.Modal, { open: open, onClose: function () {
            setOpen(false);
            close();
        }, tabIndex: 0, style: { zIndex: 100 } },
        react_1["default"].createElement("div", { className: "containers" },
            react_1["default"].createElement("div", { className: "recent-employer-section" },
                react_1["default"].createElement("div", { className: "flex relative h-auto my-8" },
                    react_1["default"].createElement("button", { className: "back-arrow cursor-pointer", onClick: function () { return close(); }, type: "button" },
                        react_1["default"].createElement(icons_1.ArrowBackTwoTone, null)),
                    react_1["default"].createElement("h1", { className: "font-bold text-base title" }, "Edit Education")),
                react_1["default"].createElement(__1.EducationInput, { initialValue: __assign(__assign({}, education), { specialization: '', accomplishment: '', startDate: date_fns_1.format(new Date(education.startDate), 'yyyy-MM-dd'), endDate: date_fns_1.format(new Date(String(education.endDate)), 'yyyy-MM-dd') }), submit: function (values) {
                        var startDate = values.startDate, endDate = values.endDate;
                        if (!reducer.user) {
                            return null;
                        }
                        return education_1.updateEducation(__assign(__assign({}, values), { startDate: date_fns_1.format(new Date(startDate), 'yyyy-MM-dd'), endDate: date_fns_1.format(new Date(String(endDate)), 'yyyy-MM-dd') }), String(reducer.user._id), education._id)(dispatch);
                    }, backendErrors: reducer.errors && reducer.errors.errors && reducer.errors.errors, loading: !!reducer.loading, buttonName: "Update" })))));
};
exports["default"] = EditEducation;
