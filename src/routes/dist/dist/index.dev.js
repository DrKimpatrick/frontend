"use strict";

exports.__esModule = true;

var react_1 = require("react");

var react_router_dom_1 = require("react-router-dom");

var Layout_1 = require("components/Layout");

var Landing_1 = require("containers/Landing/Landing");

var Authentication_1 = require("components/authentication/Authentication");

var GetStarted_1 = require("components/getStarted/GetStarted");

var CurrentRole_1 = require("components/CurrentRole/CurrentRole");

var SkillRanking_1 = require("components/SkillRanking/SkillRanking");

var RecentEmployer_1 = require("components/RecentEmployer/RecentEmployer");

var EmploymentHistory_1 = require("components/EmploymentHistory/EmploymentHistory");

var EmploymentHistoryList_1 = require("components/EmploymentHistoryList/EmploymentHistoryList");

var AddEducation_1 = require("components/AddEducation/AddEducation");

var UserDashboard_1 = require("components/UserDashboard/UserDashboard");

var MessagePage_1 = require("components/messagePage/MessagePage");

var ForgotPass_1 = require("components/forgotPassword/ForgotPass");

var ResetPass_1 = require("components/resetPassword/ResetPass");

var PremiumBilling_1 = require("components/PremiumBilling/PremiumBilling");

var StandardBilling_1 = require("components/StandardBilling/StandardBilling");

var GetHired_1 = require("components/GetHired/GetHired");

var EducationHistory_1 = require("components/EducationHistory/EducationHistory");

var EducationHistoryList_1 = require("components/EducationHistoryList/EducationHistoryList");

var RoutesComponent = function RoutesComponent() {
  var authRoutes = [{
    path: '/',
    exact: true,
    component: react_1["default"].createElement(Landing_1["default"], null)
  }, {
    path: '/login',
    exact: true,
    component: react_1["default"].createElement(Authentication_1["default"], null)
  }, {
    path: '/register',
    exact: true,
    component: react_1["default"].createElement(GetStarted_1["default"], null)
  }, {
    path: '/home',
    exact: true,
    component: react_1["default"].createElement(Landing_1["default"], null)
  }, {
    path: '/account',
    exact: true,
    component: react_1["default"].createElement(Authentication_1["default"], null)
  }, {
    path: '/notification',
    exact: true,
    component: react_1["default"].createElement(GetStarted_1["default"], null)
  }, {
    path: '/current-role',
    exact: true,
    component: react_1["default"].createElement(CurrentRole_1["default"], null)
  }, {
    path: '/skill-ranking',
    exact: true,
    component: react_1["default"].createElement(SkillRanking_1["default"], null)
  }, {
    path: '/recent-employer',
    exact: true,
    component: react_1["default"].createElement(RecentEmployer_1["default"], null)
  }, {
    path: '/employment-history',
    exact: true,
    component: react_1["default"].createElement(EmploymentHistory_1["default"], null)
  }, {
    path: '/employment-history-list',
    exact: true,
    component: react_1["default"].createElement(EmploymentHistoryList_1["default"], null)
  }, {
    path: '/add-education',
    exact: true,
    component: react_1["default"].createElement(AddEducation_1["default"], null)
  }, {
    path: '/user/dashboard',
    exact: true,
    component: react_1["default"].createElement(UserDashboard_1["default"], null)
  }, {
    path: '/verify-account',
    exact: true,
    component: react_1["default"].createElement(MessagePage_1["default"], null)
  }, {
    path: '/forgot-password',
    exact: true,
    component: react_1["default"].createElement(ForgotPass_1["default"], null)
  }, {
    path: '/reset-password',
    exact: true,
    component: react_1["default"].createElement(ResetPass_1["default"], null)
  }, {
    path: '/premium-billing',
    exact: true,
    component: react_1["default"].createElement(PremiumBilling_1["default"], null)
  }, {
    path: '/standard-billing',
    exact: true,
    component: react_1["default"].createElement(StandardBilling_1["default"], null)
  }, {
    path: '/get-hired',
    exact: true,
    component: react_1["default"].createElement(GetHired_1["default"], null)
  }, {
    path: '/education-history',
    exact: true,
    component: react_1["default"].createElement(EducationHistory_1["default"], null)
  }, {
    path: '/education-history-list',
    exact: true,
    component: react_1["default"].createElement(EducationHistoryList_1["default"], null)
  }];
  return react_1["default"].createElement(react_router_dom_1.BrowserRouter, null, react_1["default"].createElement(react_router_dom_1.Switch, null, react_1["default"].createElement(Layout_1["default"], null, react_1["default"].createElement(react_1["default"].Fragment, null, authRoutes.map(function (route, index) {
    return react_1["default"].createElement(react_router_dom_1.Route, {
      path: route.path,
      exact: route.exact,
      key: index
    }, route.component);
  })))));
};

exports["default"] = RoutesComponent;