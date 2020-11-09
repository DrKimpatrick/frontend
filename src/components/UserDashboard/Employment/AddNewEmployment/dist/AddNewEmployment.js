"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var icons_1 = require("@material-ui/icons");
var core_1 = require("@material-ui/core");
require("./style.scss");
var employment_1 = require("../../../../redux/actions/employment");
var __1 = require("..");
var AddNewEmployment = function (props) {
    var _a = react_1.useState(), _b = _a[0], open = _b === void 0 ? true : _b, setOpen = _a[1];
    var close = props.close;
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
    return (react_1["default"].createElement(core_1.Modal, { open: open, onClose: function () {
            setOpen(false);
            close();
        }, className: "addNewEmployment", tabIndex: 0, style: { zIndex: 100 } },
        react_1["default"].createElement("div", { className: "containers" },
            react_1["default"].createElement("div", { className: "recent-employer-section" },
                react_1["default"].createElement("div", { className: "flex relative h-auto my-8" },
                    react_1["default"].createElement("button", { className: "back-arrow cursor-pointer", onClick: function () { return close(); }, type: "button" },
                        react_1["default"].createElement(icons_1.ArrowBackTwoTone, null)),
                    react_1["default"].createElement("h1", { className: "font-bold text-base title" }, "Who else did you work for?")),
                react_1["default"].createElement(__1.EmploymentInput, { initialValue: {
                        companyName: '',
                        title: '',
                        supervisor: '',
                        isCurrentPosition: false,
                        responsibilities: [],
                        skillsUsed: [],
                        favoriteProject: '',
                        accomplishments: [],
                        responsibility: '',
                        accomplishment: '',
                        startDate: '',
                        endDate: ''
                    }, submit: function (values) { return employment_1.addEmployment(values)(dispatch); }, backendErrors: reducer.errors && reducer.errors.errors && reducer.errors.errors, loading: !!reducer.loading, buttonName: "Save" })))));
};
exports["default"] = AddNewEmployment;
