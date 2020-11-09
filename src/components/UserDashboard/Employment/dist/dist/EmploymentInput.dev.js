"use strict";

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

exports.__esModule = true;
exports.options = void 0;

var react_1 = require("react");

var formik_1 = require("formik");

var core_1 = require("@material-ui/core");

var icons_1 = require("@material-ui/icons");

var react_select_1 = require("react-select");

var lodash_1 = require("lodash");

var _1 = require("../dist");

exports.options = [{
  value: 'Software Engineer',
  label: 'Software Engineer'
}, {
  value: 'Product Manager',
  label: 'Product Manager'
}, {
  value: 'Product Designer',
  label: 'Product Designer'
}, {
  value: 'Software Engineer1',
  label: 'Software Engineer1'
}, {
  value: 'Product Manager1',
  label: 'Product Manager1'
}, {
  value: 'Product Designer1',
  label: 'Product Designer1'
}, {
  value: 'Software Engineer2',
  label: 'Software Engineer2'
}, {
  value: 'Product Manager2',
  label: 'Product Manager2'
}, {
  value: 'Product Designer2',
  label: 'Product Designer2'
}];

var EmploymentInput = function EmploymentInput(props) {
  var submit = props.submit,
      initialValue = props.initialValue,
      backendErrors = props.backendErrors,
      loading = props.loading,
      buttonName = props.buttonName;

  var getErrors = function getErrors(field) {
    if (backendErrors && Array.isArray(backendErrors) && backendErrors.length > 0 && lodash_1.map(backendErrors, field)) {
      return react_1["default"].createElement(react_1["default"].Fragment, null, lodash_1.map(lodash_1.map(backendErrors, field), function (item, i) {
        return react_1["default"].createElement("div", {
          key: i,
          className: "inputError"
        }, item);
      }));
    }

    return null;
  };

  var setDefaultSkills = function setDefaultSkills(skills) {
    var data = lodash_1.map(skills, function (item) {
      return {
        label: item,
        value: item
      };
    });
    return data;
  };

  return react_1["default"].createElement(formik_1.Formik, {
    initialValues: __assign(__assign({}, initialValue), {
      skillsUsed: initialValue.skillsUsed.length > 0 ? setDefaultSkills(initialValue.skillsUsed) : []
    }),
    validationSchema: _1.employmentSchema,
    validateOnChange: false,
    onSubmit: function onSubmit(values) {
      var skillsUsed = lodash_1.map(values.skillsUsed, 'value');
      return submit(__assign(__assign({}, values), {
        skillsUsed: skillsUsed
      }));
    }
  }, function (formik) {
    var values = formik.values,
        errors = formik.errors;
    return react_1["default"].createElement("form", {
      autoComplete: "off",
      onSubmit: formik.handleSubmit
    }, react_1["default"].createElement("div", {
      className: "text-textGray mt-8"
    }, react_1["default"].createElement("input", {
      type: "text",
      className: "border outline-none bg-transparent rounded-sm w-full px-3 text-textGray input-height",
      placeholder: "Company Name",
      name: "companyName",
      value: values.companyName,
      onChange: formik.handleChange
    }), errors && errors.companyName && react_1["default"].createElement("div", {
      className: "inputError"
    }, errors.companyName), !errors || !errors.companyName && getErrors('companyName')), react_1["default"].createElement("div", {
      className: "text-textGray mt-4"
    }, react_1["default"].createElement(react_select_1["default"], {
      options: [{
        value: 'Staffing',
        label: 'Staffing'
      }, {
        value: 'Employee',
        label: 'Employee'
      }, {
        value: 'HR',
        label: 'HR'
      }],
      placeholder: "Select your supervisor",
      name: "supervisor",
      onChange: function onChange(v) {
        return formik.setFieldValue('supervisor', v.value, true);
      },
      values: values.supervisor !== '' ? {
        value: values.supervisor,
        label: values.supervisor
      } : null,
      isMulti: false,
      styles: {
        control: function control(base) {
          return __assign(__assign({}, base), {
            border: 0,
            boxShadow: 'none'
          });
        }
      },
      className: "select",
      defaultValue: values.supervisor !== '' ? {
        value: values.supervisor,
        label: values.supervisor
      } : null
    }), errors && errors.supervisor && react_1["default"].createElement("div", {
      className: "inputError"
    }, errors.supervisor), !errors || !errors.supervisor && getErrors('supervisor')), react_1["default"].createElement("div", {
      className: "text-textGray mt-4"
    }, react_1["default"].createElement("input", {
      type: "text",
      className: "border outline-none bg-transparent rounded w-full px-3 text-textGray input-height",
      placeholder: "Your Title",
      value: values.title,
      onChange: formik.handleChange,
      name: "title"
    }), errors && errors.title && react_1["default"].createElement("div", {
      className: "inputError"
    }, errors.title), !errors || !errors.title && getErrors('title')), react_1["default"].createElement("div", {
      className: "flex justify-between text-textGray mt-4 dateContainer"
    }, react_1["default"].createElement("div", {
      className: "item"
    }, react_1["default"].createElement("label", {
      htmlFor: "start date"
    }, "Start date"), react_1["default"].createElement("input", {
      id: "date",
      type: "date",
      name: "startDate",
      onChange: formik.handleChange,
      value: values.startDate
    })), values.isCurrentPosition === false && react_1["default"].createElement("div", {
      className: "item"
    }, react_1["default"].createElement("label", {
      htmlFor: "end date"
    }, "End date"), react_1["default"].createElement("input", {
      id: "date",
      type: "date",
      name: "endDate",
      onChange: formik.handleChange,
      value: values.endDate
    }))), react_1["default"].createElement("div", {
      className: "text-textGray flex",
      style: {
        alignItems: 'center'
      }
    }, react_1["default"].createElement("div", {
      style: {
        flexGrow: 1,
        width: '50%'
      }
    }, errors && errors.startDate && react_1["default"].createElement("div", {
      className: "inputError"
    }, errors.startDate), !errors || !errors.startDate && getErrors('startDate')), react_1["default"].createElement("div", {
      style: {
        flexGrow: 1,
        width: '50%'
      }
    }, errors && errors.endDate && react_1["default"].createElement("div", {
      className: "inputError"
    }, errors.endDate), !errors || !errors.endDate && getErrors('endDate'))), react_1["default"].createElement("div", {
      className: "text-textGray flex",
      style: {
        alignItems: 'center'
      }
    }, react_1["default"].createElement(core_1.Checkbox, {
      inputProps: {
        'aria-label': 'uncontrolled-checkbox'
      },
      name: "isCurrentPosition",
      onChange: formik.handleChange,
      checked: values.isCurrentPosition
    }), react_1["default"].createElement("label", {
      htmlFor: ""
    }, "I am currently working here")), react_1["default"].createElement("div", {
      className: "text-textGray mt-4"
    }, react_1["default"].createElement(react_select_1["default"], {
      isMulti: true,
      options: exports.options,
      placeholder: "Select skills used",
      name: "skillsUsed",
      onChange: function onChange(e) {
        formik.setFieldValue('skillsUsed', e, false);
      },
      value: values.skillsUsed,
      styles: {
        control: function control(base) {
          return __assign(__assign({}, base), {
            border: 0,
            boxShadow: 'none'
          });
        }
      },
      className: "select"
    }), !errors || !errors.skillsUsed && getErrors('skillsUsed')), react_1["default"].createElement(formik_1.FieldArray, {
      name: "responsibilities",
      render: function render(arrayHelper) {
        var responsibilities = values.responsibilities,
            responsibility = values.responsibility;
        return react_1["default"].createElement("div", {
          className: "text-textGray mt-4 divider",
          style: responsibilities && responsibilities.length > 0 ? {
            border: '1px solid #dadada',
            padding: 5
          } : {
            border: 'none'
          }
        }, responsibilities && responsibilities.length > 0 && responsibilities.map(function (item, index) {
          return react_1["default"].createElement("div", {
            className: "responsibilities",
            key: index
          }, react_1["default"].createElement("div", {
            className: "item"
          }, item), react_1["default"].createElement(core_1.Button, {
            type: "button",
            onClick: function onClick() {
              return arrayHelper.remove(index);
            }
          }, react_1["default"].createElement(icons_1.Close, null)));
        }), react_1["default"].createElement("div", {
          className: "responsibilities addBorder"
        }, react_1["default"].createElement("input", {
          type: "text",
          placeholder: "Responsibilities",
          className: "outline-none bg-transparent rounded w-full px-3 text-textGray input-height",
          name: "responsibility",
          value: values.responsibility,
          onChange: formik.handleChange
        }), react_1["default"].createElement(core_1.Button, {
          type: "button",
          className: "add",
          onClick: function onClick() {
            if (responsibility.length !== 0 && typeof responsibility === 'string') {
              arrayHelper.push(values.responsibility);
              formik.setFieldValue('responsibility', '', false);
            }
          }
        }, react_1["default"].createElement(icons_1.AddOutlined, null))), getErrors('responsibilities'));
      }
    }), react_1["default"].createElement(formik_1.FieldArray, {
      name: "accomplishments",
      render: function render(arrayHelper) {
        var accomplishments = values.accomplishments,
            accomplishment = values.accomplishment;
        return react_1["default"].createElement("div", {
          className: "text-textGray mt-4 divider",
          style: accomplishments && accomplishments.length > 0 ? {
            border: '1px solid #dadada',
            padding: 5
          } : {
            border: 'none'
          }
        }, accomplishments && accomplishments.length > 0 && accomplishments.map(function (item, index) {
          return react_1["default"].createElement("div", {
            className: "responsibilities",
            key: index
          }, react_1["default"].createElement("div", {
            className: "item"
          }, item), react_1["default"].createElement(core_1.Button, {
            type: "button",
            onClick: function onClick() {
              return arrayHelper.remove(index);
            }
          }, react_1["default"].createElement(icons_1.Close, null)));
        }), react_1["default"].createElement("div", {
          className: "responsibilities addBorder"
        }, react_1["default"].createElement("input", {
          type: "text",
          placeholder: "Accomplishments",
          className: "outline-none bg-transparent rounded w-full px-3 text-textGray input-height",
          name: "accomplishment",
          value: values.accomplishment,
          onChange: formik.handleChange
        }), react_1["default"].createElement(core_1.Button, {
          type: "button",
          className: "add",
          onClick: function onClick() {
            if (accomplishment.length !== 0 && typeof accomplishment === 'string') {
              arrayHelper.push(values.accomplishment);
              formik.setFieldValue('accomplishment', '', false);
            }
          }
        }, react_1["default"].createElement(icons_1.AddOutlined, null))), getErrors('accomplishments'));
      }
    }), react_1["default"].createElement("div", {
      className: "text-textGray mt-4"
    }, react_1["default"].createElement("input", {
      type: "text",
      className: "border outline-none bg-transparent rounded w-full px-3 text-textGray input-height",
      placeholder: "Favorite project you built or contributed to?",
      name: "favoriteProject",
      value: values.favoriteProject,
      onChange: formik.handleChange
    })), react_1["default"].createElement("div", {
      className: "flex justify-center mt-12"
    }, react_1["default"].createElement("button", {
      "data-testid": "next-button",
      className: "next-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-32 rounded-sm shadow flex justify-around",
      type: "submit",
      disabled: loading
    }, react_1["default"].createElement("span", {
      className: ""
    }, buttonName), " ", react_1["default"].createElement(icons_1.ArrowRightAltTwoTone, null))));
  });
};

exports["default"] = EmploymentInput;