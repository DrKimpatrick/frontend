"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var date_fns_1 = require("date-fns");
var ArrowBackTwoTone_1 = require("@material-ui/icons/ArrowBackTwoTone");
var ArrowRightAltTwoTone_1 = require("@material-ui/icons/ArrowRightAltTwoTone");
var AddCircleOutlineOutlined_1 = require("@material-ui/icons/AddCircleOutlineOutlined");
var NavBar_1 = require("components/Layout/NavBar/NavBar");
var MainBackground_1 = require("../Layout/MainBackground/MainBackground");
var react_redux_1 = require("react-redux");
var education_1 = require("redux/actions/education");
var EducationHistory = function () {
    var dispatch = react_redux_1.useDispatch();
    var getMonthAndYear = function (value) {
        var date = date_fns_1.format(new Date(value), 'MMMM yyyy');
        return date;
    };
    react_1.useEffect(function () {
        education_1.listEducation()(dispatch);
    }, [dispatch]);
    var reducer = react_redux_1.useSelector(function (state) {
        var _a = state.educations, loading = _a.loading, errors = _a.errors, educations = _a.educations;
        var message = state.messages.message;
        return { message: message, loading: loading, errors: errors, educations: educations };
    });
    var loading = reducer.loading, educations = reducer.educations;
    if (loading && loading === true) {
        return null;
    }
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(NavBar_1["default"], null),
        react_1["default"].createElement("section", { className: "education-history-list-section w-1/3 m-auto text-textGray" },
            react_1["default"].createElement("div", { className: "flex relative h-auto my-8" },
                react_1["default"].createElement("div", { className: "back-arrow cursor-pointer" },
                    react_1["default"].createElement(ArrowBackTwoTone_1["default"], null)),
                react_1["default"].createElement("h1", { className: "font-bold text-xl title" }, "Education History")),
            educations &&
                educations.map(function (item, i) { return (react_1["default"].createElement("div", { className: "text-textGray mt-4 border border-borderGray card", key: i },
                    react_1["default"].createElement("div", { className: " text-white font-bold py-3 px-4 card-title" }, item.schoolName),
                    react_1["default"].createElement("div", { className: "py-3 px-4 card-content" },
                        getMonthAndYear(item.startDate),
                        ' ',
                        item.endDate && " to " + getMonthAndYear(item.endDate)))); }),
            react_1["default"].createElement("div", { className: "flex justify-center mt-12" },
                react_1["default"].createElement("button", { "data-testid": "next-button", className: "add-education-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-64 rounded-sm shadow flex justify-around", type: "button" },
                    react_1["default"].createElement("span", { className: "" }, "Add another school"),
                    react_1["default"].createElement(AddCircleOutlineOutlined_1["default"], null))),
            react_1["default"].createElement("div", { className: "flex justify-center mt-12" },
                react_1["default"].createElement("button", { "data-testid": "next-button", className: "next-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-32 rounded-sm shadow flex justify-around", type: "button" },
                    react_1["default"].createElement("span", { className: "" }, "Next"),
                    " ",
                    react_1["default"].createElement(ArrowRightAltTwoTone_1["default"], null)))),
        react_1["default"].createElement(MainBackground_1["default"], null)));
};
exports["default"] = react_router_dom_1.withRouter(EducationHistory);
