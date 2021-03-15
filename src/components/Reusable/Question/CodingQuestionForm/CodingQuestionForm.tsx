import React, { useEffect } from 'react';
import './CodingQuestionForm.scss';
import { useFormik } from 'formik';
import { Alert } from '@material-ui/lab';
import { CodingInitialValue } from 'redux/actions/question';
import {
  QuestionInput,
  QuestionLabel,
  CustomSelect,
  QuestionTextArea,
  QuestionButtonBackgroundEnum,
  QuestionButton,
  ApiValidationError
} from 'components/Reusable';
import {
  Language,
  Level,
  JsFramework,
  PythonFramework
} from 'redux/action-types/question';
import { CodePartQuestion } from './CodePartQuestion';
import { CodingSchema } from './Schema';

interface Props {
  initialValue: CodingInitialValue;
  submit: (value: CodingInitialValue) => void;
  loading?: boolean;
  apiError?: any;
  question?: boolean;
  message?: string;
}

export const CodingQuestionForm = (props: Props) => {
  const { initialValue, submit, loading, apiError, message, question } = props;

  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: values => submit(values),
    validateOnChange: false,
    validationSchema: CodingSchema
  });

  const { values, errors, resetForm } = formik;

  useEffect(() => {
    if (message && question) {
      resetForm();
    }
  }, [resetForm, message, question]);

  return (
    <div className="codingForm">
      {message && (
        <Alert severity="success" className="mb-2 w-3/4">
          {message}
        </Alert>
      )}
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className="formGroup flex items-center">
          <QuestionLabel name="Name" />
          <div className="inputGroup">
            <QuestionInput
              name="name"
              placeholder="name"
              onChange={val => formik.setFieldValue('name', val)}
              value={values.name}
            />
            {errors && errors.name && (
              <small className="inputError">{errors.name}</small>
            )}
            <ApiValidationError errors={apiError} fieldName="name" />
          </div>
        </div>
        <div className="formGroup flex items-center">
          <QuestionLabel name="Language" />
          <div className="inputGroup">
            <CustomSelect
              name="language"
              option={Object.values(Language).map(item => ({
                name: item,
                value: item
              }))}
              placeholder="Select language"
              value={values.language}
              onChange={value => formik.setFieldValue('language', value, false)}
              width="300px"
            />
            {errors && errors.language && (
              <small className="inputError">{errors.language}</small>
            )}
            <ApiValidationError errors={apiError} fieldName="language" />
          </div>
        </div>
        <div className="formGroup flex items-center">
          <QuestionLabel name="Library" />
          <div className="inputGroup">
            <CustomSelect
              name="library"
              option={
                values.language === Language.Javascript
                  ? Object.values(JsFramework).map(item => ({
                      name: item,
                      value: item
                    }))
                  : values.language === Language.Python
                  ? Object.values(PythonFramework).map(item => ({
                      name: item,
                      value: item
                    }))
                  : []
              }
              placeholder="Select library"
              value={values.library ? values.library : ''}
              onChange={value => formik.setFieldValue('library', value, false)}
              width="300px"
            />
            {errors && errors.library && (
              <small className="inputError">{errors.library}</small>
            )}
            <ApiValidationError errors={apiError} fieldName="library" />
          </div>
        </div>
        <div className="formGroup flex items-center">
          <QuestionLabel
            name="Text Question"
            shortDescription="be clear and specific"
          />
          <div className="inputGroup">
            <QuestionTextArea
              name="question"
              value={values.question}
              placeholder="text question"
              onChange={val => formik.setFieldValue('question', val)}
            />
            {errors && errors.question && (
              <small className="inputError">{errors.question}</small>
            )}
            <ApiValidationError errors={apiError} fieldName="question" />
          </div>
        </div>
        {values.language && values.language !== '' && (
          <CodePartQuestion formik={formik} apiError={apiError} />
        )}
        <div className="formGroup flex items-center">
          <QuestionLabel name="Level" />
          <div className="inputGroup">
            <CustomSelect
              name="level"
              option={Object.values(Level).map(item => ({
                name: item,
                value: item
              }))}
              placeholder="Select level"
              value={values.level}
              onChange={value => formik.setFieldValue('level', value, false)}
              width="300px"
            />
            {errors && errors.level && (
              <small className="inputError">{errors.level}</small>
            )}
            <ApiValidationError errors={apiError} fieldName="level" />
          </div>
        </div>
        <div className="formGroup flex items-center">
          <QuestionLabel name="Expected time" />
          <div className="inputGroup">
            <QuestionInput
              name="expectedTime"
              placeholder="expected time"
              onChange={val => formik.setFieldValue('expectedTime', val)}
              value={values.expectedTime}
              type="number"
            />
            {errors && errors.expectedTime && (
              <small className="inputError">{errors.expectedTime}</small>
            )}
            <ApiValidationError errors={apiError} fieldName="expectedTime" />
          </div>
        </div>
        <div className="formGroup flex">
          <div style={{ width: '150px' }} />
          <div className="flex buttons">
            <QuestionButton
              name="Save"
              background={QuestionButtonBackgroundEnum.Green}
              onClick={() => formik.submitForm()}
              loading={loading}
            />
            <QuestionButton
              name="Preview"
              background={QuestionButtonBackgroundEnum.Blue}
              onClick={() => ''}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CodingQuestionForm;
