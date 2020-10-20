import {
  createStyles,
  makeStyles,
  createMuiTheme
} from '@material-ui/core/styles';

export const useTextFieldStyle = makeStyles(() =>
  createStyles({
    root: {
      color: '#747474 !important'
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    textField: {
      width: '49%',
      border: '1px solid #dadada',
      borderRadius: '2px',
      color: '#747474 !important',
      paddingLeft: '5px'
    },
    input: {
      color: 'white'
    },
    formControl: {
      color: '#747474 !important'
    }
  })
);

export const selectStyles = {
  control: (styles: any, state: any) => ({
    ...styles,
    backgroundColor: 'white',
    outline: 'none',
    border: '1px solid #dadada',
    borderRadius: '2px',
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid #dadada'
    }
  }),
  menu: (styles: any) => ({
    ...styles,
    borderRadius: '2px'
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#dadada' : null,
    color: state.isSelected ? 'black' : '#747474',
    borderRadius: '2px'
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition, color: '#747474' };
  }
};

export const multiSelectStyles = {
  control: (styles: any, state: any) => ({
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
  }),
  valueContainer: (styles: any) => ({
    ...styles,
    alignItems: null
  }),
  multiValue: (styles: any) => ({
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
  }),

  placeholder: (styles: any) => ({
    ...styles,
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '193px',
    color: '#dadada',
    fontSize: '14px'
  }),

  menu: (styles: any) => ({
    ...styles,
    borderRadius: '2px'
  }),
  indicatorsContainer: () => ({ display: 'none' }),
  indicatorSeparator: () => ({ display: 'none' }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#dadada' : null,
    color: state.isSelected ? 'black' : '#747474',
    borderRadius: '2px'
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition, color: '#747474' };
  }
};

export const themeTextFields = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      root: {
        left: '15px !important',
        top: '3px !important',
        color: '#c9c9c9',
        fontSize: '12px',
        '&$focused': {
          color: '#747474'
        }
      }
    },
    MuiInput: {
      root: {
        color: '#747474',
        paddingLeft: '9px !important',
        paddingRight: '9px !important',
        fontSize: '14px',
        borderBottom: 'none !important',
        '&::before': {
          borderBottom: 'none !important',
          content: '*'
        },
        '&::after': {
          borderBottom: 'none !important',
          content: '*'
        },
        '&:focused': {
          color: '#747474'
        },
        '&:hover': {
          color: '#747474',
          borderBottom: 'none'
        }
      },
      input: {
        borderBottom: 'none'
      }
    }
  }
});

export default useTextFieldStyle;
