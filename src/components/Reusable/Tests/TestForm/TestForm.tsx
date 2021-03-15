import React, { useState, useEffect } from 'react';
import './TestForm.scss';
import { Formik, Form } from 'formik';
import { Alert } from '@material-ui/lab';
import {
  QuestionButton,
  QuestionButtonBackgroundEnum,
  QuestionInput as TestInput,
  QuestionLabel as TestLabel,
  QuestionTextArea as TestTextArea,
  ApiValidationError,
  TestTitle
} from 'components/Reusable';
import { TimePolicy } from 'redux/action-types/test';
import { AddTestParamType } from 'redux/actions/testsetup';
import { TestSchema } from './Schema';

interface Props {
  initialValues: AddTestParamType;
  saveButtonName: string;
  cancelButtonName: string;
  message?: string;
  onSubmit: (value: AddTestParamType) => void;
  loading?: boolean;
  successData: any;
  errorData: any;
}

const TestForm = (props: Props) => {
  const {
    saveButtonName,
    cancelButtonName,
    initialValues,
    onSubmit,
    message,
    loading,
    successData,
    errorData
  } = props;

  const [apiError, setApiError] = useState<any>();

  useEffect(() => {
    if (errorData && errorData.errors) {
      setApiError(errorData.errors);
    }
  }, [errorData]);

  return (
    <div className="createTest md:p-5 md:px-12">
      <TestTitle />
      {message && successData && (
        <div className="w-2/4 mt-4">
          <Alert severity="success">{message}</Alert>
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={TestSchema}
        onSubmit={onSubmit}
        validateOnChange={false}
      >
        {formik => {
          const { errors, values } = formik;
          return (
            <Form
              onSubmit={formik.handleSubmit}
              autoComplete="off"
              className="questionForm"
            >
              <div className="testForm md:text-xs md:m-10">
                <div className="formGroup flex items-center">
                  <TestLabel name="Test Name" />
                  <div className="inputGroup">
                    <TestInput
                      onChange={value =>
                        formik.setFieldValue('name', value, false)
                      }
                      name="name"
                      value={values.name as string}
                      placeholder="Test name"
                      width="80%"
                    />
                    {errors && errors.name && (
                      <small className="inputError">{errors.name}</small>
                    )}
                    <ApiValidationError fieldName="name" errors={apiError} />
                    <ApiValidationError
                      fieldName="testType"
                      errors={apiError}
                    />
                  </div>
                </div>
                <div className="formGroup flex items-center">
                  <TestLabel name="Description" />
                  <div className="inputGroup">
                    <TestTextArea
                      name="description"
                      onChange={value =>
                        formik.setFieldValue('description', value, false)
                      }
                      placeholder="Description of the test..."
                      value={values.description as string}
                      width="80%"
                    />

                    {errors && errors.description && (
                      <small className="inputError">{errors.description}</small>
                    )}
                    <ApiValidationError
                      fieldName="description"
                      errors={apiError}
                    />
                  </div>
                </div>
              </div>

              <div className="timePolicy  flex m-10 mt-20">
                <TestLabel name="Time Policy" />
                <div className="radioButtons flex-initial -mt-2">
                  <div className="strictButtonDiv flex">
                    <TestInput
                      onChange={value =>
                        formik.setFieldValue('timePolicy', value, false)
                      }
                      name="timePolicy"
                      value={TimePolicy.Strict}
                      type="radio"
                      width="4%"
                      checked={values.timePolicy === TimePolicy.Strict}
                    />
                    <label className="m-3 block text-sm font-semibold text-gray-700 md:flex-initial">
                      Strict:{' '}
                      <span className="policyDesc font-normal text-gray-700 flex-initial">
                        For all questions, enforce the expected time limit
                      </span>
                    </label>
                  </div>

                  <div className="normalButtonDiv flex">
                    <TestInput
                      onChange={value =>
                        formik.setFieldValue('timePolicy', value, false)
                      }
                      name="timePolicy"
                      value={TimePolicy.Normal}
                      type="radio"
                      width="16px"
                      checked={values.timePolicy === TimePolicy.Normal}
                    />
                    <label className="m-3 block text-sm font-semibold text-gray-700 md:flex-initial">
                      Normal:{' '}
                      <span className="policyDesc font-normal text-gray-700 flex-initial">
                        For all questions, add an extra 50% time buffer.
                      </span>
                    </label>
                  </div>

                  <div className="relaxedButtonDiv flex">
                    <TestInput
                      onChange={value =>
                        formik.setFieldValue('timePolicy', value, false)
                      }
                      name="timePolicy"
                      value={TimePolicy.Relaxed}
                      type="radio"
                      width="16px"
                      checked={values.timePolicy === TimePolicy.Relaxed}
                    />
                    <label className="m-3 block text-sm font-semibold text-gray-700 md:flex-initial">
                      Relaxed:{' '}
                      <span className="policyDesc font-normal text-gray-700 flex-initial">
                        For all questions, add an extra 200% time buffer.
                      </span>
                    </label>
                  </div>
                  {errors && errors.timePolicy && (
                    <small className="inputError">{errors.timePolicy}</small>
                  )}
                  <ApiValidationError
                    fieldName="timePolicy"
                    errors={apiError}
                  />
                </div>
              </div>

              <div className="submitButtons flex">
                <div className="">
                  <div style={{ width: '200px' }} />
                  <div className="flex buttons">
                    <div className="saveButton md:flex-initial ml-60">
                      <QuestionButton
                        name={saveButtonName}
                        background={QuestionButtonBackgroundEnum.Green}
                        onClick={() => formik.submitForm()}
                        loading={loading}
                        color="white"
                      />
                    </div>
                    <div className="deleteButton md:flex-initial md:ml-5">
                      <QuestionButton
                        name={cancelButtonName}
                        background={QuestionButtonBackgroundEnum.Blue}
                        onClick={() => ''}
                        color="white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default TestForm;
