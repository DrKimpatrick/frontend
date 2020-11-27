/* eslint-disable @typescript-eslint/no-unused-vars */
export const selectStyles = {
  control: (styles: any, _state: any) => ({
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
  }),
  menu: (styles: any) => ({
    ...styles,
    borderRadius: '2px'
  }),
  placeholder: (styles: any) => ({
    ...styles,
    color: '#c9c9c9'
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
  control: (styles: any, _state: any) => ({
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

export default selectStyles;
