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
