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
var RoutesComponent = function () {
    var routes = [
        { path: '/', exact: true, component: react_1["default"].createElement(Landing_1["default"], null) },
        { path: '/login', exact: true, component: react_1["default"].createElement(Authentication_1["default"], null) },
        { path: '/register', exact: true, component: react_1["default"].createElement(GetStarted_1["default"], null) },
        { path: '/home', exact: true, component: react_1["default"].createElement(Landing_1["default"], null) },
        { path: '/account', exact: true, component: react_1["default"].createElement(Authentication_1["default"], null) },
        { path: '/notification', exact: true, component: react_1["default"].createElement(GetStarted_1["default"], null) },
        { path: '/current-role', exact: true, component: react_1["default"].createElement(CurrentRole_1["default"], null) },
        { path: '/skill-ranking', exact: true, component: react_1["default"].createElement(SkillRanking_1["default"], null) },
        { path: '/recent-employer', exact: true, component: react_1["default"].createElement(RecentEmployer_1["default"], null) }
    ];
    return (react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
        react_1["default"].createElement(react_router_dom_1.Switch, null,
            react_1["default"].createElement(Layout_1["default"], null,
                react_1["default"].createElement(react_1["default"].Fragment, null, routes.map(function (route, index) { return (react_1["default"].createElement(react_router_dom_1.Route, { path: route.path, exact: route.exact, key: index }, route.component)); }))))));
};
exports["default"] = RoutesComponent;
