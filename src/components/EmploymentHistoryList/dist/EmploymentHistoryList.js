"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
require("./EmploymentHistoryList.scss");
var ArrowBackTwoTone_1 = require("@material-ui/icons/ArrowBackTwoTone");
var ArrowRightAltTwoTone_1 = require("@material-ui/icons/ArrowRightAltTwoTone");
var AddCircleOutlineOutlined_1 = require("@material-ui/icons/AddCircleOutlineOutlined");
var NavBar_1 = require("components/Layout/NavBar/NavBar");
var employment_1 = require("redux/actions/employment");
var EmploymentHistoryList = function (props) {
    var dispatch = react_redux_1.useDispatch();
    react_1.useEffect(function () {
        employment_1.listEmployments()(dispatch);
    }, [dispatch]);
    var reducer = react_redux_1.useSelector(function (state) {
        var _a = state.employments, loading = _a.loading, errors = _a.errors, employments = _a.employments;
        var message = state.messages.message;
        return { message: message, loading: loading, errors: errors, employments: employments };
    });
    var employments = reducer.employments;
    if (!employments) {
        return null;
    }
    return (react_1["default"].createElement(react_1.Fragment, null,
        react_1["default"].createElement(NavBar_1["default"], null),
        react_1["default"].createElement("section", { className: "employment-history-list-section w-1/3 m-auto text-textGray" },
            react_1["default"].createElement("div", { className: "flex relative h-auto my-8" },
                react_1["default"].createElement("div", { className: "back-arrow cursor-pointer", onClick: function () { return props.history.push('/employment-history'); } },
                    react_1["default"].createElement(ArrowBackTwoTone_1["default"], null)),
                react_1["default"].createElement("h1", { className: "font-bold text-xl title" }, "Employment History List")),
            employments && employments.map(function (empl) { return (react_1["default"].createElement("div", { className: "text-textGray mt-4 border border-borderGray card" },
                react_1["default"].createElement("div", { className: " text-white font-bold py-3 px-4 card-title" },
                    empl.companyName,
                    " , ",
                    empl.title),
                react_1["default"].createElement("div", { className: "py-3 px-4 card-content" },
                    new Date(empl.startDate).toDateString(),
                    " to ",
                    '',
                    new Date(empl.endDate).toDateString()))); }),
            react_1["default"].createElement("div", { className: "flex justify-center mt-12" },
                react_1["default"].createElement("button", { "data-testid": "next-button", className: "add-employer-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-64 rounded-sm shadow flex justify-around", onClick: function () { return props.history.push('/recent-employer'); } },
                    react_1["default"].createElement("span", { className: "" }, "Add another employer"),
                    react_1["default"].createElement(AddCircleOutlineOutlined_1["default"], null))),
            react_1["default"].createElement("div", { className: "flex justify-center mt-12" },
                react_1["default"].createElement("button", { "data-testid": "next-button", className: "next-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-32 rounded-sm shadow flex justify-around", onClick: function () { return props.history.push('/user/dashboard'); } },
                    react_1["default"].createElement("span", { className: "" }, "Next"),
                    " ",
                    react_1["default"].createElement(ArrowRightAltTwoTone_1["default"], null))))));
};
exports["default"] = react_router_dom_1.withRouter(EmploymentHistoryList);
