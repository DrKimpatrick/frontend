var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (const p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
exports.__esModule = true;
exports.multiSelectStyles = exports.selectStyles = void 0;
exports.selectStyles = {
  control(styles, state) {
    return {
      ...styles,
      backgroundColor: 'white',
      outline: 'none',
      border: '1px solid #dadada',
      borderRadius: '2px',
      boxShadow: 'none',
      height: '47px',
      '&:hover': {
        border: '1px solid #dadada'
      }
    };
  },
  menu(styles) {
    return { ...styles, borderRadius: '2px' };
  },
  placeholder(styles) {
    return { ...styles, color: '#c9c9c9' };
  },
  indicatorSeparator() {
    return { display: 'none' };
  },
  option(provided, state) {
    return {
      ...provided,
      backgroundColor: state.isSelected ? '#dadada' : null,
      color: state.isSelected ? 'black' : '#747474',
      borderRadius: '2px'
    };
  },
  singleValue(provided, state) {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition, color: '#747474' };
  }
};
exports.multiSelectStyles = {
  control(styles, state) {
    return {
      ...styles,
      height: '97px',
      alignItems: null,
      backgroundColor: 'white',
      outline: 'none',
      border: '1px solid #dadada',
      borderRadius: '2px',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid #dadada'
      }
    };
  },
  valueContainer(styles) {
    return { ...styles, alignItems: null };
  },
  multiValue(styles) {
    return {
      ...styles,
      height: '25px',
      color: '#747474',
      div: {
        color: '#747474'
      },
      'div:nth-of-type(2n):hover': {
        backgroundColor: '#dadada',
        color: '#747474'
      }
    };
  },
  placeholder(styles) {
    return {
      ...styles,
      left: 0,
      right: 0,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '193px',
      color: '#dadada',
      fontSize: '14px'
    };
  },
  menu(styles) {
    return { ...styles, borderRadius: '2px' };
  },
  indicatorsContainer() {
    return { display: 'none' };
  },
  indicatorSeparator() {
    return { display: 'none' };
  },
  option(provided, state) {
    return {
      ...provided,
      backgroundColor: state.isSelected ? '#dadada' : null,
      color: state.isSelected ? 'black' : '#747474',
      borderRadius: '2px'
    };
  },
  singleValue(provided, state) {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition, color: '#747474' };
  }
};
exports.default = exports.selectStyles;
