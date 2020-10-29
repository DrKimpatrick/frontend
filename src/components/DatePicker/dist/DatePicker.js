exports.__esModule = true;
const react_1 = require('react');
const TextField_1 = require('@material-ui/core/TextField');
const styles_1 = require('@material-ui/styles');
const DatePicker_style_1 = require('./DatePicker.style');

const DatePicker = function (_a) {
  const { label } = _a;
  const { defaultValue } = _a;
  const classes = DatePicker_style_1.useTextFieldStyle();
  return react_1.default.createElement(
    styles_1.ThemeProvider,
    { theme: DatePicker_style_1.themeTextFields },
    react_1.default.createElement(TextField_1.default, {
      id: 'date',
      label,
      type: 'date',
      defaultValue,
      className: classes.textField,
      InputLabelProps: {
        shrink: true
      }
    })
  );
};
exports.default = DatePicker;
