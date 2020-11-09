"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var date_fns_1 = require("date-fns");
var react_router_dom_1 = require("react-router-dom");
var education_1 = require("redux/actions/education");
var ArrowBackTwoTone_1 = require("@material-ui/icons/ArrowBackTwoTone");
var ArrowRightAltTwoTone_1 = require("@material-ui/icons/ArrowRightAltTwoTone");
var AddCircleOutlineOutlined_1 = require("@material-ui/icons/AddCircleOutlineOutlined");
var NavBar_1 = require("../Layout/NavBar/NavBar");
var MainBackground_1 = require("../Layout/MainBackground/MainBackground");
var EducationHistory = function () {
    var dispatch = react_redux_1.useDispatch();
    var location = react_router_dom_1.useLocation();
    var getMonthAndYear = function (value) {
        var date = date_fns_1.format(new Date(value), 'MMMM yyyy');
        return date;
    };
    var reducer = react_redux_1.useSelector(function (state) {
        var _a = state.educations, education = _a.education, loading = _a.loading;
        var user = state.users.user;
        return { user: user, loading: loading, education: education };
    });
    var education = reducer.education, loading = reducer.loading;
    console.log(location.state.educationId);
    react_1.useEffect(function () {
        if (reducer.user && location.state && location.state.educationId) {
            education_1.listSpecificEducation(reducer.user._id, location.state.educationId)(dispatch);
        }
    }, [reducer.user, location.state.educationId, dispatch]);
    if (!education || !location.state.educationId || loading) {
        return null;
    }
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(NavBar_1["default"], null),
        react_1["default"].createElement("section", { className: "education-history-section w-1/3 m-auto text-textGray" },
            react_1["default"].createElement("div", { className: "flex relative h-auto my-8" },
                react_1["default"].createElement("div", { className: "back-arrow cursor-pointer" },
                    react_1["default"].createElement(ArrowBackTwoTone_1["default"], null)),
                react_1["default"].createElement("h1", { className: "font-bold text-xl title" }, "Education History")),
            react_1["default"].createElement("div", { className: "text-textGray mt-8 card" },
                react_1["default"].createElement("div", { className: " text-white font-bold py-3 px-4 card-title" }, "School"),
                react_1["default"].createElement("div", { className: "py-3 px-4 card-content border border-borderGray" }, education.schoolName)),
            react_1["default"].createElement("div", { className: "text-textGray mt-4 card" },
                react_1["default"].createElement("div", { className: " text-white font-bold py-3 px-4 card-title" }, "Level"),
                react_1["default"].createElement("div", { className: "py-3 px-4 card-content border border-borderGray" }, education.level)),
            react_1["default"].createElement("div", { className: "text-textGray mt-4 card" },
                react_1["default"].createElement("div", { className: " text-white font-bold py-3 px-4 card-title" }, "Certification"),
                react_1["default"].createElement("div", { className: "py-3 px-4 card-content border border-borderGray" }, education.degreeOrCertification)),
            react_1["default"].createElement("div", { className: "text-textGray mt-4 card" },
                react_1["default"].createElement("div", { className: " text-white font-bold py-3 px-4 card-title" }, "Date"),
                react_1["default"].createElement("div", { className: "py-3 px-4 card-content border border-borderGray" },
                    getMonthAndYear(education.startDate),
                    education.endDate && " - " + getMonthAndYear(education.endDate))),
            education.specializations && education.specializations.length > 0 && (react_1["default"].createElement("div", { className: "text-textGray mt-4 card" },
                react_1["default"].createElement("div", { className: " text-white font-bold py-3 px-4 card-title" }, "Specialities"),
                react_1["default"].createElement("div", { className: "py-3 px-4 card-content border border-borderGray" }, education.specializations.map(function (item, index) { return (react_1["default"].createElement("p", { key: index },
                    " - ",
                    item)); })))),
            education.accomplishments && education.accomplishments.length > 0 && (react_1["default"].createElement("div", { className: "text-textGray mt-4 card" },
                react_1["default"].createElement("div", { className: " text-white font-bold py-3 px-4 card-title" }, "Accomplishments"),
                react_1["default"].createElement("div", { className: "py-3 px-4 card-content border border-borderGray" }, education.accomplishments.map(function (item, index) { return (react_1["default"].createElement("p", { key: index },
                    "- ",
                    item)); })))),
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
