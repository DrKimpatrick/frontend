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
var icons_1 = require("@material-ui/icons");
var core_1 = require("@material-ui/core");
var date_fns_1 = require("date-fns");
require("../AddNewEmployment/style.scss");
var employment_1 = require("../../../../redux/actions/employment");
var __1 = require("..");
var EditEmployment = function (props) {
    var _a = react_1.useState(), _b = _a[0], open = _b === void 0 ? true : _b, setOpen = _a[1];
    var close = props.close, employment = props.employment;
    var responsibilities = employment.responsibilities, accomplishments = employment.accomplishments, skillsUsed = employment.skillsUsed, favoriteProject = employment.favoriteProject, startDate = employment.startDate, endDate = employment.endDate;
    var dispatch = react_redux_1.useDispatch();
    var reducer = react_redux_1.useSelector(function (state) {
        var _a = state.employments, loading = _a.loading, errors = _a.errors;
        var message = state.messages.message;
        return { message: message, loading: loading, errors: errors };
    });
    react_1.useEffect(function () {
        if (reducer.message) {
            close();
        }
    }, [reducer.message, close]);
    if (!employment) {
        return null;
    }
    return (react_1["default"].createElement(core_1.Modal, { open: open, onClose: function () {
            setOpen(false);
            close();
        }, className: "addNewEmployment", tabIndex: 0, style: { zIndex: 100 } },
        react_1["default"].createElement("div", { className: "containers" },
            react_1["default"].createElement("div", { className: "recent-employer-section w-1/3 m-auto text-textGray" },
                react_1["default"].createElement("div", { className: "flex relative h-auto my-8" },
                    react_1["default"].createElement("button", { className: "back-arrow cursor-pointer", onClick: function () { return close(); }, type: "button" },
                        react_1["default"].createElement(icons_1.ArrowBackTwoTone, null)),
                    react_1["default"].createElement("h1", { className: "font-bold text-base title" }, "Edit Employment")),
                react_1["default"].createElement(__1.EmploymentInput, { initialValue: __assign(__assign({}, employment), { responsibility: '', accomplishment: '', accomplishments: accomplishments && accomplishments.length > 0
                            ? accomplishments
                            : [], responsibilities: responsibilities && responsibilities.length > 0
                            ? responsibilities
                            : [], skillsUsed: skillsUsed && skillsUsed.length > 0 ? skillsUsed : [], favoriteProject: favoriteProject || '', startDate: startDate
                            ? date_fns_1.format(new Date(startDate), 'yyyy-MM-dd')
                            : '', endDate: endDate ? date_fns_1.format(new Date(endDate), 'yyyy-MM-dd') : '', supervisor: employment.supervisor }), submit: function (values) {
                        return employment_1.updateEmployment(values, employment._id)(dispatch);
                    }, backendErrors: reducer.errors && reducer.errors.errors && reducer.errors.errors, loading: !!reducer.loading, buttonName: "Update" })))));
};
exports["default"] = EditEmployment;
