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
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var icons_1 = require("@material-ui/icons");
var UserDashboard_1 = require("components/UserDashboard");
var education_1 = require("redux/actions/education");
var date_fns_1 = require("date-fns");
var NavBar_1 = require("components/Layout/NavBar/NavBar");
var AddEducation = function (props) {
    var dispatch = react_redux_1.useDispatch();
    var history = react_router_dom_1.useHistory();
    var reducer = react_redux_1.useSelector(function (state) {
        var _a = state.educations, loading = _a.loading, errors = _a.errors, education = _a.education;
        var message = state.messages.message;
        return { message: message, loading: loading, errors: errors, education: education };
    });
    react_1.useEffect(function () {
        if (reducer.message && reducer.education) {
            history.push({
                pathname: '/education-history',
                state: { educationId: reducer.education._id }
            });
        }
    }, [reducer.message, reducer.education]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(NavBar_1["default"], null),
        react_1["default"].createElement("div", { className: "containers" },
            react_1["default"].createElement("div", { className: "recent-employer-section w-1/3 m-auto text-textGray" },
                react_1["default"].createElement("div", { className: "flex relative h-auto my-8" },
                    react_1["default"].createElement("button", { className: "back-arrow cursor-pointer", type: "button" },
                        react_1["default"].createElement(icons_1.ArrowBackTwoTone, null)),
                    react_1["default"].createElement("h1", { className: "font-bold text-base title" }, "What was the last school you attended?")),
                react_1["default"].createElement(UserDashboard_1.EducationInput, { initialValue: {
                        schoolName: '',
                        level: '',
                        degreeOrCertification: '',
                        isCurrentEducation: false,
                        specializations: [],
                        specialization: '',
                        accomplishments: [],
                        accomplishment: '',
                        startDate: '',
                        endDate: ''
                    }, submit: function (values) {
                        var startDate = values.startDate, endDate = values.endDate;
                        education_1.addEducation(__assign(__assign({}, values), { startDate: date_fns_1.format(new Date(startDate), 'yyyy-MM-dd'), endDate: date_fns_1.format(new Date(String(endDate)), 'yyyy-MM-dd') }))(dispatch);
                    }, backendErrors: reducer.errors && reducer.errors.errors && reducer.errors.errors, loading: !!reducer.loading, buttonName: "Next" })))));
};
exports["default"] = react_router_dom_1.withRouter(AddEducation);
