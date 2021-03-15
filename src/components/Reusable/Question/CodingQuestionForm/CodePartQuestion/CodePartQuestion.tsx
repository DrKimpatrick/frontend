import React from 'react';
import { FormikProps } from 'formik';
import {
  QuestionLabel,
  CodeEditor,
  ApiValidationError,
  QuestionButton,
  QuestionButtonBackgroundEnum,
  CodingQuestionRunner
} from 'components/Reusable';
import { Language } from 'redux/action-types/question';

interface Props {
  formik: FormikProps<any>;
  apiError?: any;
}

export const CodePartQuestion = (props: Props) => {
  const { formik, apiError } = props;

  const { errors, values } = formik;

  return (
    <>
      <div className="formGroup flex items-center">
        <QuestionLabel
          name="Template"
          shortDescription="The candidate sees this in the coding box, provide starting code"
        />
        <div className="inputGroup">
          <CodeEditor
            value={values.template}
            onChange={val => formik.setFieldValue('template', val, false)}
            language={
              values.language === Language.Javascript
                ? Language.Javascript
                : values.language === Language.Python
                ? Language.Python
                : undefined
            }
            width="75%"
          />
          {errors && errors.template && (
            <small className="inputError">{errors.template}</small>
          )}
          <ApiValidationError errors={apiError} fieldName="template" />
        </div>
      </div>
      <div className="formGroup flex items-center">
        <QuestionLabel
          name="Test case"
          shortDescription="For each test case you want to test. provide one test method"
        />
        <div className="inputGroup">
          <CodeEditor
            value={values.testCase}
            onChange={val => formik.setFieldValue('testCase', val, false)}
            language={
              values.language === Language.Javascript
                ? Language.Javascript
                : values.language === Language.Python
                ? Language.Python
                : undefined
            }
            width="75%"
          />
          <div className="mt-2 w-30">
            <QuestionButton
              name="Run solution"
              onClick={() => 'run'}
              background={QuestionButtonBackgroundEnum.Green}
              color="white"
            />
          </div>
          <div className="w75">
            <CodingQuestionRunner />
          </div>
          {errors && errors.testCase && (
            <small className="inputError">{errors.testCase}</small>
          )}
          <ApiValidationError errors={apiError} fieldName="testCase" />
        </div>
      </div>
      <div className="formGroup flex items-center">
        <QuestionLabel
          name="Solution"
          shortDescription="Provide a solution that passes all test cases, so we can check there is actually solution that 
          satisfies all test cases"
        />
        <div className="inputGroup">
          <CodeEditor
            value={values.solution[0]}
            onChange={val => formik.setFieldValue('solution', [val], false)}
            language={
              values.language === Language.Javascript
                ? Language.Javascript
                : values.language === Language.Python
                ? Language.Python
                : undefined
            }
            width="75%"
          />
          <div className="mt-2 w-30">
            <QuestionButton
              name="Run solution"
              onClick={() => 'run'}
              background={QuestionButtonBackgroundEnum.Green}
              color="white"
            />
          </div>
          {errors && errors.testCase && (
            <small className="inputError">{errors.solution}</small>
          )}
          <ApiValidationError errors={apiError} fieldName="solution" />
        </div>
      </div>
    </>
  );
};

export default CodePartQuestion;
