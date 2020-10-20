"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./AddEducation.scss");
var ArrowBackTwoTone_1 = require("@material-ui/icons/ArrowBackTwoTone");
var ArrowRightAltTwoTone_1 = require("@material-ui/icons/ArrowRightAltTwoTone");
var DatePicker_1 = require("components/DatePicker/DatePicker");
var AddEducation = function (props) {
    var options = [
        { value: 'Software Engineer', label: 'Software Engineer' },
        { value: 'Product Manager', label: 'Product Manager' },
        { value: 'Product Designer', label: 'Product Designer' },
        { value: 'Software Engineer1', label: 'Software Engineer1' },
        { value: 'Product Manager1', label: 'Product Manager1' },
        { value: 'Product Designer1', label: 'Product Designer1' },
        { value: 'Software Engineer2', label: 'Software Engineer2' },
        { value: 'Product Manager2', label: 'Product Manager2' },
        { value: 'Product Designer2', label: 'Product Designer2' }
    ];
    return (react_1["default"].createElement("section", { className: "add-education-section w-1/3 m-auto text-textGray" },
        react_1["default"].createElement("div", { className: "flex relative h-auto my-8" },
            react_1["default"].createElement("div", { className: "back-arrow cursor-pointer" },
                react_1["default"].createElement(ArrowBackTwoTone_1["default"], null)),
            react_1["default"].createElement("h1", { className: "font-bold text-xl title" }, "What was the last school you attended?")),
        react_1["default"].createElement("div", { className: "text-textGray mt-8" },
            react_1["default"].createElement("input", { type: "text", className: "border outline-none bg-transparent rounded-sm w-full px-3 text-textGray input-height", placeholder: "School Name" })),
        react_1["default"].createElement("div", { className: "text-textGray mt-4" },
            react_1["default"].createElement("input", { type: "text", className: "border outline-none bg-transparent rounded-sm w-full px-3 text-textGray input-height", placeholder: "Level" })),
        react_1["default"].createElement("div", { className: "text-textGray mt-4" },
            react_1["default"].createElement("input", { type: "text", className: "border outline-none bg-transparent rounded w-full px-3 text-textGray input-height", placeholder: "Specializations" })),
        react_1["default"].createElement("div", { className: "text-textGray mt-4" },
            react_1["default"].createElement("input", { type: "text", className: "border outline-none bg-transparent rounded w-full px-3 text-textGray input-height", placeholder: "Degree or Certification Received" })),
        react_1["default"].createElement("div", { className: "flex justify-between text-textGray mt-4" },
            react_1["default"].createElement(DatePicker_1["default"], { label: "Start Date", defaultValue: "2017-05-24" }),
            react_1["default"].createElement(DatePicker_1["default"], { label: "Send Date", defaultValue: "22017-05-24" })),
        react_1["default"].createElement("div", { className: "text-textGray mt-4" },
            react_1["default"].createElement("textarea", { name: "accomplishments", placeholder: "Accomplishments", className: "border outline-none bg-transparent rounded w-full p-3 text-textGray h-48", cols: 30, rows: 7 })),
        react_1["default"].createElement("div", { className: "flex justify-center mt-12" },
            react_1["default"].createElement("button", { "data-testid": "next-button", className: "next-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-32 rounded-sm shadow flex justify-around" },
                react_1["default"].createElement("span", { className: "" }, "Next"),
                " ",
                react_1["default"].createElement(ArrowRightAltTwoTone_1["default"], null)))));
};
exports["default"] = react_router_dom_1.withRouter(AddEducation);
