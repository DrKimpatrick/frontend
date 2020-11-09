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
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var formik_1 = require("formik");
var react_select_1 = require("react-select");
var ArrowBackTwoTone_1 = require("@material-ui/icons/ArrowBackTwoTone");
var NavBar_1 = require("components/Layout/NavBar/NavBar");
var Schema_1 = require("./Schema");
var icons_1 = require("@material-ui/icons");
var MainBackground_1 = require("../Layout/MainBackground/MainBackground");
var employment_1 = require("redux/actions/employment");
var CurrentRole = function (props) {
    var history = react_router_dom_1.useHistory();
    var getErrors = function (field) {
        return null;
    };
    var dispatch = react_redux_1.useDispatch();
    var reducer = react_redux_1.useSelector(function (state) {
        var _a = state.employments, loading = _a.loading, errors = _a.errors, employment = _a.employment;
        var message = state.messages.message;
        return { message: message, loading: loading, errors: errors, employment: employment };
    });
    react_1.useEffect(function () {
        if (reducer.message && reducer.employment) {
            history.push('/skill-ranking');
        }
    }, [reducer.message, reducer.employment]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(NavBar_1["default"], null),
        react_1["default"].createElement("section", { className: "current-role-section w-1/3 m-auto text-textGray" },
            react_1["default"].createElement("div", { className: "containers" },
                react_1["default"].createElement("div", { className: "recent-employer-section" },
                    react_1["default"].createElement("div", { className: "flex relative h-auto my-8" },
                        react_1["default"].createElement("div", { className: "back-arrow cursor-pointer" },
                            react_1["default"].createElement(ArrowBackTwoTone_1["default"], null)),
                        react_1["default"].createElement("h1", { className: "font-bold text-xl title" }, "Tell us how awesome you are!")),
                    react_1["default"].createElement(formik_1.Formik, { validateOnChange: false, validationSchema: Schema_1.currentRoleSchema, initialValues: {
                            companyName: '',
                            supervisor: '',
                            title: '',
                            startDate: '',
                            isCurrentPosition: true
                        }, onSubmit: function (values) { return employment_1.addEmployment(values)(dispatch); } }, function (formik) {
                        var errors = formik.errors, values = formik.values;
                        return (react_1["default"].createElement("form", { onSubmit: formik.handleSubmit, autoComplete: "off" },
                            react_1["default"].createElement("div", { className: "text-textGray mt-8" },
                                react_1["default"].createElement("label", null, "What is your company name ? "),
                                react_1["default"].createElement("input", { type: "text", className: "border outline-none bg-transparent rounded-sm w-full px-3 text-textGray input-height", placeholder: "Company Name", name: "companyName", value: values.companyName, onChange: formik.handleChange }),
                                errors && errors.companyName && (react_1["default"].createElement("div", { className: "inputError" }, errors.companyName)),
                                !errors ||
                                    (!errors.companyName && getErrors('companyName'))),
                            react_1["default"].createElement("div", { className: "text-textGray mt-4" },
                                react_1["default"].createElement("label", null, "What is your current role?"),
                                react_1["default"].createElement("input", { type: "text", className: "border outline-none bg-transparent rounded w-full px-3 text-textGray input-height", placeholder: "Your Title", value: values.title, onChange: formik.handleChange, name: "title" }),
                                errors && errors.title && (react_1["default"].createElement("div", { className: "inputError" }, errors.title)),
                                !errors || (!errors.title && getErrors('title'))),
                            react_1["default"].createElement("div", { className: "text-textGray mt-4" },
                                react_1["default"].createElement("label", null, "Your supervisor "),
                                react_1["default"].createElement(react_select_1["default"], { options: [
                                        { value: 'Staffing', label: 'Staffing' },
                                        { value: 'Employee', label: 'Employee' },
                                        { value: 'HR', label: 'HR' }
                                    ], placeholder: "Select your supervisor", name: "supervisor", onChange: function (v) {
                                        return formik.setFieldValue('supervisor', v.value, true);
                                    }, values: values.supervisor !== ''
                                        ? {
                                            value: values.supervisor,
                                            label: values.supervisor
                                        }
                                        : null, isMulti: false, styles: {
                                        control: function (base) { return (__assign(__assign({}, base), { border: 0, boxShadow: 'none' })); }
                                    }, className: "select", defaultValue: values.supervisor !== ''
                                        ? {
                                            value: values.supervisor,
                                            label: values.supervisor
                                        }
                                        : null }),
                                errors && errors.supervisor && (react_1["default"].createElement("div", { className: "inputError" }, errors.supervisor)),
                                !errors ||
                                    (!errors.supervisor && getErrors('supervisor'))),
                            react_1["default"].createElement("div", { className: "flex justify-between text-textGray mt-4 dateContainer" },
                                react_1["default"].createElement("div", { className: "item" },
                                    react_1["default"].createElement("label", null, "Start Date"),
                                    react_1["default"].createElement("input", { id: "date", type: "date", name: "startDate", onChange: formik.handleChange, value: values.startDate }),
                                    errors && errors.startDate && (react_1["default"].createElement("div", { className: "inputError" }, errors.startDate)))),
                            react_1["default"].createElement("div", { className: "flex justify-center mt-4" },
                                react_1["default"].createElement("button", { "data-testid": "next-button", className: "next-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-32 rounded-sm shadow flex justify-around", type: "submit" },
                                    react_1["default"].createElement("label", { className: "" }, "Next"),
                                    ' ',
                                    react_1["default"].createElement(icons_1.ArrowRightAltTwoTone, null)))));
                    })))),
        react_1["default"].createElement(MainBackground_1["default"], null)));
};
exports["default"] = react_router_dom_1.withRouter(CurrentRole);
