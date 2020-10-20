"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.multiSelectStyles = exports.selectStyles = void 0;
exports.selectStyles = {
    control: function (styles, state) { return (__assign(__assign({}, styles), { backgroundColor: 'white', outline: 'none', border: '1px solid #dadada', borderRadius: '2px', boxShadow: 'none', height: '47px', '&:hover': {
            border: '1px solid #dadada'
        } })); },
    menu: function (styles) { return (__assign(__assign({}, styles), { borderRadius: '2px' })); },
    placeholder: function (styles) { return (__assign(__assign({}, styles), { color: '#c9c9c9' })); },
    indicatorSeparator: function () { return ({ display: 'none' }); },
    option: function (provided, state) { return (__assign(__assign({}, provided), { backgroundColor: state.isSelected ? '#dadada' : null, color: state.isSelected ? 'black' : '#747474', borderRadius: '2px' })); },
    singleValue: function (provided, state) {
        var opacity = state.isDisabled ? 0.5 : 1;
        var transition = 'opacity 300ms';
        return __assign(__assign({}, provided), { opacity: opacity, transition: transition, color: '#747474' });
    }
};
exports.multiSelectStyles = {
    control: function (styles, state) { return (__assign(__assign({}, styles), { height: '97px', alignItems: null, backgroundColor: 'white', outline: 'none', border: '1px solid #dadada', borderRadius: '2px', boxShadow: 'none', '&:hover': {
            border: '1px solid #dadada'
        } })); },
    valueContainer: function (styles) { return (__assign(__assign({}, styles), { alignItems: null })); },
    multiValue: function (styles) { return (__assign(__assign({}, styles), { height: '25px', color: '#747474', div: {
            color: '#747474'
        }, 'div:nth-of-type(2n):hover': {
            backgroundColor: '#dadada',
            color: '#747474'
        } })); },
    placeholder: function (styles) { return (__assign(__assign({}, styles), { left: 0, right: 0, marginLeft: 'auto', marginRight: 'auto', width: '193px', color: '#dadada', fontSize: '14px' })); },
    menu: function (styles) { return (__assign(__assign({}, styles), { borderRadius: '2px' })); },
    indicatorsContainer: function () { return ({ display: 'none' }); },
    indicatorSeparator: function () { return ({ display: 'none' }); },
    option: function (provided, state) { return (__assign(__assign({}, provided), { backgroundColor: state.isSelected ? '#dadada' : null, color: state.isSelected ? 'black' : '#747474', borderRadius: '2px' })); },
    singleValue: function (provided, state) {
        var opacity = state.isDisabled ? 0.5 : 1;
        var transition = 'opacity 300ms';
        return __assign(__assign({}, provided), { opacity: opacity, transition: transition, color: '#747474' });
    }
};
exports["default"] = exports.selectStyles;
