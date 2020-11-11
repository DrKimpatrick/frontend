import React, { FC } from 'react';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from '@material-ui/styles';
import { useTextFieldStyle, themeTextFields } from './DatePicker.style';

type props = {
  label: string;
  defaultValue?: string;
  onChangeValue: any;
  name: string;
};
const DatePicker: FC<props> = ({ label, defaultValue, onChangeValue , name }: any) => {
  const classes = useTextFieldStyle();

  return (
    <ThemeProvider theme={themeTextFields}>
      <TextField
        id="date"
        name={name}
        label={label}
        type="date"
        defaultValue={defaultValue}
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        onChange={onChangeValue}
      />
    </ThemeProvider>
  );
};

export default DatePicker;
