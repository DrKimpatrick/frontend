exports.__esModule = true;
var react_1 = require('react');
var TextField_1 = require('@material-ui/core/TextField');
var styles_1 = require('@material-ui/styles');
var DatePicker_style_1 = require('./DatePicker.style');
var DatePicker = function (_a) {
  var label = _a.label,
    defaultValue = _a.defaultValue,
    onChangeValue = _a.onChangeValue,
    name = _a.name;
  var classes = DatePicker_style_1.useTextFieldStyle();
  return react_1['default'].createElement(
    styles_1.ThemeProvider,
    { theme: DatePicker_style_1.themeTextFields },
    react_1['default'].createElement(TextField_1['default'], {
      id: 'date',
      name: name,
      label: label,
      type: 'date',
      defaultValue: defaultValue,
      className: classes.textField,
      InputLabelProps: {
        shrink: true
      },
      onChange: onChangeValue
    })
  );
};
exports.default = DatePicker;
