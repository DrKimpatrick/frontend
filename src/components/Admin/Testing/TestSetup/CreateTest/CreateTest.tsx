import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { Alert } from '@material-ui/lab';
import { RootState } from 'redux/store';
import { createTestAction } from 'redux/actions/testsetup';
import {
  AdminLayout,
  QuestionButton,
  QuestionButtonBackgroundEnum,
  QuestionInput as TestInput,
  QuestionLabel as TestLabel,
  QuestionTextArea as TestTextArea,
  ApiValidationError,
  TestTitle
} from 'components/Reusable';
import { TestSchema } from './Schema';
import './CreateTest.scss';

interface MyFormValues {
  name: string;
  description: string;
  timePolicy: string;
}
const initialValues: MyFormValues = {
  name: '',
  description: '',
  timePolicy: ''
};

const CreateTest = () => {
  const [apiError, setApiError] = useState<any>();

  const reducer = useSelector((state: RootState) => {
    const { createTestLoading, createTest, createTestErrors } = state.tests;

    const { message } = state.messages;

    return {
      loading: createTestLoading,
      createTest,
      createTestErrors,
      message
    };
  });

  const dispatch = useDispatch();

  const { loading, createTest, createTestErrors, message } = reducer;

  useEffect(() => {
    if (createTestErrors && createTestErrors.errors) {
      setApiError(createTestErrors.errors);
    }
  }, [createTestErrors]);

  return (
    <AdminLayout>
      <div className="createTest md:p-5 md:px-12">
        <TestTitle />
        {message && createTest && (
          <div className="w-2/4 mt-4">
            <Alert severity="success">{message}</Alert>
          </div>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={TestSchema}
          onSubmit={values => {
            createTestAction({
              ...values
            })(dispatch);
          }}
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
                        <small className="inputError">
                          {errors.description}
                        </small>
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
                        value="Strict"
                        type="radio"
                        width="4%"
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
                        value="Normal"
                        type="radio"
                        width="16px"
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
                        value="Relaxed"
                        type="radio"
                        width="16px"
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
                          name="Save"
                          background={QuestionButtonBackgroundEnum.Green}
                          onClick={() => formik.submitForm()}
                          loading={loading}
                        />
                      </div>
                      <div className="deleteButton md:flex-initial md:ml-5">
                        <QuestionButton
                          name="Cancel"
                          background={QuestionButtonBackgroundEnum.Blue}
                          onClick={() => ''}
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
    </AdminLayout>
  );
};

export default CreateTest;
