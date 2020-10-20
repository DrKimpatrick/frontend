"use strict";
exports.__esModule = true;
var react_1 = require("react");
var NavBar_1 = require("./NavBar");
require("./Layout.scss");
var useWindowSize_1 = require("utils/useWindowSize");
function Layout(_a) {
    var children = _a.children;
    var size = useWindowSize_1["default"]();
    return (react_1["default"].createElement("div", { className: "dashboard_layout" },
        react_1["default"].createElement("div", { className: "grid-container" },
            react_1["default"].createElement(NavBar_1["default"], null),
            react_1["default"].createElement("div", { className: "main" },
                react_1["default"].createElement("main", null, children),
                (size === null || size === void 0 ? void 0 : size.width) && (size === null || size === void 0 ? void 0 : size.width) > 768 && (react_1["default"].createElement("div", { className: "main-background" }))))));
}
exports["default"] = Layout;
