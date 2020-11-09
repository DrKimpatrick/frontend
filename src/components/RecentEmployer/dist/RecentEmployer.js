"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
require("./RecentEmployer.scss");
var ArrowBackTwoTone_1 = require("@material-ui/icons/ArrowBackTwoTone");
var NavBar_1 = require("components/Layout/NavBar/NavBar");
var employment_1 = require("redux/actions/employment");
var UserDashboard_1 = require("components/UserDashboard");
var RecentEmployer = function (props) {
    var dispatch = react_redux_1.useDispatch();
    var dateNow = new Date();
    var history = react_router_dom_1.useHistory();
    var reducer = react_redux_1.useSelector(function (state) {
        var _a = state.employments, loading = _a.loading, errors = _a.errors, employment = _a.employment;
        var message = state.messages.message;
        return { message: message, loading: loading, errors: errors, employment: employment };
    });
    react_1.useEffect(function () {
        if (reducer.message && reducer.employment) {
            history.push("/employment-history/" + reducer.employment._id);
        }
    }, [reducer.message, reducer.employment]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(NavBar_1["default"], null),
        react_1["default"].createElement("div", { className: "containers" },
            react_1["default"].createElement("div", { className: "recent-employer-section w-1/3 m-auto text-textGray" },
                react_1["default"].createElement("div", { className: "flex relative h-auto my-8", style: { flexDirection: 'column' } },
                    react_1["default"].createElement("div", { style: { display: 'flex' } },
                        react_1["default"].createElement("div", { className: "back-arrow cursor-pointer", onClick: function () { return history.push('/skill-ranking'); } },
                            react_1["default"].createElement(ArrowBackTwoTone_1["default"], null)),
                        react_1["default"].createElement("h1", { className: "font-bold text-base title" }, "Who was your most recent employer?")),
                    react_1["default"].createElement(UserDashboard_1.EmploymentInput, { initialValue: {
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
                        }, submit: function (values) { return employment_1.addEmployment(values)(dispatch); }, backendErrors: reducer.errors && reducer.errors.errors && reducer.errors.errors, loading: !!reducer.loading, buttonName: "Next" }))))));
};
exports["default"] = react_router_dom_1.withRouter(RecentEmployer);
