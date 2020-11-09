"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./EmploymentHistory.scss");
var ArrowBackTwoTone_1 = require("@material-ui/icons/ArrowBackTwoTone");
var ArrowRightAltTwoTone_1 = require("@material-ui/icons/ArrowRightAltTwoTone");
var AddCircleOutlineOutlined_1 = require("@material-ui/icons/AddCircleOutlineOutlined");
var NavBar_1 = require("components/Layout/NavBar/NavBar");
var employment_1 = require("redux/actions/employment");
var react_redux_1 = require("react-redux");
var EmploymentHistory = function (props) {
    var dispatch = react_redux_1.useDispatch();
    react_1.useEffect(function () {
        employment_1.listSpecificEmployment(props.match.params.id)(dispatch);
    }, [dispatch]);
    var reducer = react_redux_1.useSelector(function (state) {
        var _a = state.employments, loading = _a.loading, errors = _a.errors, employment = _a.employment;
        var message = state.messages.message;
        return { message: message, loading: loading, errors: errors, employment: employment };
    });
    var employment = reducer.employment;
    if (!employment) {
        return null;
    }
    return (react_1["default"].createElement(react_1.Fragment, null,
        react_1["default"].createElement(NavBar_1["default"], null),
        react_1["default"].createElement("section", { className: "employment-history-section w-1/3 m-auto text-textGray" },
            react_1["default"].createElement("div", { className: "flex relative h-auto my-8" },
                react_1["default"].createElement("div", { className: "back-arrow cursor-pointer", onClick: function () { return props.history.push('/recent-employer'); } },
                    react_1["default"].createElement(ArrowBackTwoTone_1["default"], null)),
                react_1["default"].createElement("h1", { className: "font-bold text-xl title" }, "Employment History Review")),
            react_1["default"].createElement("div", { className: "text-textGray mt-8 border border-borderGray card" },
                react_1["default"].createElement("div", { className: " text-white font-bold py-3 px-4 card-title" }, "Company"),
                react_1["default"].createElement("div", { className: "py-3 px-4 card-content" }, employment.companyName)),
            react_1["default"].createElement("div", { className: "text-textGray mt-4 border border-borderGray card" },
                react_1["default"].createElement("div", { className: " text-white font-bold py-3 px-4 card-title" }, "Supervisor"),
                react_1["default"].createElement("div", { className: "py-3 px-4 card-content" }, employment.supervisor)),
            react_1["default"].createElement("div", { className: "text-textGray mt-4 border border-borderGray card" },
                react_1["default"].createElement("div", { className: " text-white font-bold py-3 px-4 card-title" }, "Duration"),
                react_1["default"].createElement("div", { className: "py-3 px-4 card-content" },
                    new Date(employment.startDate).toDateString(),
                    " to",
                    ' ',
                    employment.endDate && new Date(employment.endDate).toDateString())),
            react_1["default"].createElement("div", { className: "text-textGray mt-4 border border-borderGray card" },
                react_1["default"].createElement("div", { className: " text-white font-bold py-3 px-4 card-title" }, "Responsibilities"),
                react_1["default"].createElement("div", { className: "py-3 px-4 card-content" }, employment.responsibilities &&
                    employment.responsibilities.length > 0 &&
                    employment.responsibilities.map(function (resp, index) { return react_1["default"].createElement("p", { key: index },
                        "- ",
                        resp); }))),
            employment.accomplishments && employment.accomplishments.length > 0 && (react_1["default"].createElement("div", { className: "text-textGray mt-4 border border-borderGray card" },
                react_1["default"].createElement("div", { className: " text-white font-bold py-3 px-4 card-title" }, "Accomplishments"),
                react_1["default"].createElement("div", { className: "py-3 px-4 card-content" }, employment.accomplishments.map(function (acc, index) { return (react_1["default"].createElement("p", { key: index },
                    "- ",
                    acc)); })))),
            employment.favoriteProject && (react_1["default"].createElement("div", { className: "text-textGray mt-4 border border-borderGray card" },
                react_1["default"].createElement("div", { className: " text-white font-bold py-3 px-4 card-title" }, "Favorite Project"),
                react_1["default"].createElement("div", { className: "py-3 px-4 card-content" }, employment.favoriteProject))),
            employment.skillsUsed && employment.skillsUsed.length > 0 && (react_1["default"].createElement("div", { className: "text-textGray mt-4 border border-borderGray card" },
                react_1["default"].createElement("div", { className: " text-white font-bold py-3 px-4 card-title" }, "Skills Used"),
                react_1["default"].createElement("div", { className: "py-3 px-4 card-content h-32" }, employment.skillsUsed.map(function (skill, index) { return (react_1["default"].createElement("p", { key: index },
                    "- ",
                    skill)); })))),
            react_1["default"].createElement("div", { className: "flex justify-center mt-12" },
                react_1["default"].createElement("button", { "data-testid": "next-button", className: "add-employer-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-64 rounded-sm shadow flex justify-around", onClick: function () { return props.history.push('/recent-employer'); } },
                    react_1["default"].createElement("span", { className: "" }, "Add another employer"),
                    react_1["default"].createElement(AddCircleOutlineOutlined_1["default"], null))),
            react_1["default"].createElement("div", { className: "flex justify-center mt-12" },
                react_1["default"].createElement("button", { "data-testid": "next-button", className: "next-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-32 rounded-sm shadow flex justify-around", onClick: function () { return props.history.push('/employment-history-list'); } },
                    react_1["default"].createElement("span", { className: "" }, "Next"),
                    " ",
                    react_1["default"].createElement(ArrowRightAltTwoTone_1["default"], null))))));
};
exports["default"] = react_router_dom_1.withRouter(EmploymentHistory);
