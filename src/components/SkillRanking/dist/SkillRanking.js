"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var ArrowBackTwoTone_1 = require("@material-ui/icons/ArrowBackTwoTone");
var ArrowRightAltTwoTone_1 = require("@material-ui/icons/ArrowRightAltTwoTone");
var SkillComponent_1 = require("./SkillComponent");
var DraggableArea_1 = require("./DraggableArea");
var draggable_types_1 = require("constants/draggable-types");
var NavBar_1 = require("components/Layout/NavBar/NavBar");
var rawSkills = [
    { id: 5, label: 'BDD' },
    { id: 5, label: 'SQL' },
    { id: 5, label: 'HTML' },
    { id: 5, label: 'BDD' },
    { id: 5, label: 'SQL' },
    { id: 5, label: 'HTML' },
    { id: 5, label: 'BDD' },
    { id: 5, label: 'SQL' },
    { id: 5, label: 'HTML' },
    { id: 5, label: 'React' }
];
var SkillRanking = function (props) {
    var history = react_router_dom_1.useHistory();
    var _a = react_1.useState(rawSkills), skills = _a[0], setSkills = _a[1];
    var _b = react_1.useState([]), beginnerskills = _b[0], setBeginnerskills = _b[1];
    var _c = react_1.useState([]), intermediateskills = _c[0], setIntermediateskills = _c[1];
    var _d = react_1.useState([]), advancedskills = _d[0], setAdvancedskills = _d[1];
    react_1.useEffect(function () {
        var token = localStorage.getItem('token');
        if (!token) {
            props.history.push('/login');
        }
    });
    console.log('greeeeeeee', beginnerskills, intermediateskills, advancedskills);
    var onDropSkill = function (_a, droppedOn) {
        var skill = _a.skill, index = _a.index, area = _a.area;
        if (area === droppedOn) {
            return;
        }
        switch (area) {
            case 'skills': {
                var newSkills = skills.filter(function (_, i) { return i !== index; });
                setSkills(newSkills);
                switch (droppedOn) {
                    case 'beginner':
                        setBeginnerskills(__spreadArrays(beginnerskills, [skill]));
                        break;
                    case 'intermediate':
                        setIntermediateskills(__spreadArrays(intermediateskills, [skill]));
                        break;
                    case 'advanced':
                        setAdvancedskills(__spreadArrays(advancedskills, [skill]));
                        break;
                    default:
                        break;
                }
                break;
            }
            case 'beginner': {
                var newSkills = beginnerskills.filter(function (_, i) { return i !== index; });
                setBeginnerskills(newSkills);
                switch (droppedOn) {
                    case 'skills':
                        setSkills(__spreadArrays(skills, [skill]));
                        break;
                    case 'intermediate':
                        setIntermediateskills(__spreadArrays(intermediateskills, [skill]));
                        break;
                    case 'advanced':
                        setAdvancedskills(__spreadArrays(advancedskills, [skill]));
                        break;
                    default:
                        break;
                }
                break;
            }
            case 'intermediate': {
                var newSkills = intermediateskills.filter(function (_, i) { return i !== index; });
                setIntermediateskills(newSkills);
                switch (droppedOn) {
                    case 'skills':
                        setSkills(__spreadArrays(skills, [skill]));
                        break;
                    case 'beginner':
                        setBeginnerskills(__spreadArrays(beginnerskills, [skill]));
                        break;
                    case 'advanced':
                        setAdvancedskills(__spreadArrays(advancedskills, [skill]));
                        break;
                    default:
                        break;
                }
                break;
            }
            case 'advanced': {
                var newSkills = advancedskills.filter(function (_, i) { return i !== index; });
                setAdvancedskills(newSkills);
                switch (droppedOn) {
                    case 'skills':
                        setSkills(__spreadArrays(skills, [skill]));
                        break;
                    case 'beginner':
                        setBeginnerskills(__spreadArrays(beginnerskills, [skill]));
                        break;
                    case 'intermediate':
                        setIntermediateskills(__spreadArrays(intermediateskills, [skill]));
                        break;
                    default:
                        break;
                }
                break;
            }
            default:
                break;
        }
    };
    var onRemove = function (_a) {
        var index = _a.index, area = _a.area;
        switch (area) {
            case 'skills': {
                var newSkills = skills.filter(function (_, i) { return i !== index; });
                setSkills(newSkills);
                break;
            }
            case 'beginner': {
                var newSkills = beginnerskills.filter(function (_, i) { return i !== index; });
                setBeginnerskills(newSkills);
                break;
            }
            case 'intermediate': {
                var newSkills = intermediateskills.filter(function (_, i) { return i !== index; });
                setIntermediateskills(newSkills);
                break;
            }
            case 'advanced': {
                var newSkills = advancedskills.filter(function (_, i) { return i !== index; });
                setAdvancedskills(newSkills);
                break;
            }
            default:
                break;
        }
    };
    return (react_1["default"].createElement(react_1.Fragment, null,
        react_1["default"].createElement(NavBar_1["default"], null),
        react_1["default"].createElement("section", { className: "skill-ranking-section w-1/3 m-auto text-textGray" },
            react_1["default"].createElement("div", { className: "flex relative h-auto my-8" },
                react_1["default"].createElement("div", { className: "back-arrow cursor-pointer", onClick: function () { return history.push('/current-role'); } },
                    react_1["default"].createElement(ArrowBackTwoTone_1["default"], null)),
                react_1["default"].createElement("h1", { className: "font-bold text-xl title" }, "Rank your skillset!")),
            react_1["default"].createElement("div", { className: "mt-6" },
                react_1["default"].createElement(DraggableArea_1["default"], { types: draggable_types_1.SKILL_RANKING, onDrop: function (e) { return onDropSkill(e, 'skills'); }, title: "My Skills" }, skills.map(function (skill, index) { return (react_1["default"].createElement(SkillComponent_1["default"], { area: "skills", key: Math.random(), index: index, skill: skill, onRemove: onRemove, moveSkill: onDropSkill })); }))),
            react_1["default"].createElement("div", { className: "mt-6" },
                react_1["default"].createElement(DraggableArea_1["default"], { types: draggable_types_1.SKILL_RANKING, onDrop: function (e) { return onDropSkill(e, 'beginner'); }, title: "Beginner", titleClass: "text-green-700" }, beginnerskills.map(function (skill, index) { return (react_1["default"].createElement(SkillComponent_1["default"], { area: "beginner", key: Math.random(), index: index, skill: skill, onRemove: onRemove, moveSkill: onDropSkill })); }))),
            react_1["default"].createElement("div", { className: "mt-6" },
                react_1["default"].createElement(DraggableArea_1["default"], { types: draggable_types_1.SKILL_RANKING, onDrop: function (e) { return onDropSkill(e, 'intermediate'); }, title: "Intermediate", titleClass: "text-blue-700" }, intermediateskills.map(function (skill, index) { return (react_1["default"].createElement(SkillComponent_1["default"], { area: "intermediate", key: Math.random(), index: index, skill: skill, onRemove: onRemove, moveSkill: onDropSkill })); }))),
            react_1["default"].createElement("div", { className: "mt-6" },
                react_1["default"].createElement("span", { className: "" }),
                react_1["default"].createElement(DraggableArea_1["default"], { types: draggable_types_1.SKILL_RANKING, onDrop: function (e) { return onDropSkill(e, 'advanced'); }, title: "Advanced", titleClass: "text-black" }, advancedskills.map(function (skill, index) { return (react_1["default"].createElement(SkillComponent_1["default"], { area: "advanced", key: Math.random(), index: index, skill: skill, onRemove: onRemove, moveSkill: onDropSkill })); }))),
            react_1["default"].createElement("div", { className: "flex justify-center mt-12" },
                react_1["default"].createElement("button", { className: "next-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-32 rounded-sm shadow flex justify-around", onClick: function () { return history.push('/recent-employer'); } },
                    react_1["default"].createElement("span", { className: "" }, "Next"),
                    " ",
                    react_1["default"].createElement(ArrowRightAltTwoTone_1["default"], null))))));
};
exports["default"] = react_router_dom_1.withRouter(SkillRanking);
