import React from 'react';
import './AddMcq.scss';
import { Formik } from 'formik';
import {
  QuestionInput,
  QuestionTextArea,
  CustomSelect,
  QuestionLabel,
  QuestionChoice,
  QuestionButton,
  QuestionButtonBackgroundEnum,
  ApiValidationError
} from 'components/Reusable';
import { Language, Level } from 'redux/action-types/question';
import { AddMcqSchema } from './Schema';

interface InitialValue {
  name: string;
  language: string;
  library?: string;
  solution: string[];
  choice: string[];
  testId: string;
  level: string;
  expectedTime: string;
  question: string;
}
interface Props {
  initialValue: InitialValue;
  onSubmit: (value: InitialValue) => void;
  loading?: boolean;
  apiError?: any;
}

export const AddMcq = (props: Props) => {
  const { initialValue, onSubmit, apiError, loading } = props;

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={AddMcqSchema}
      onSubmit={values => onSubmit(values)}
      validateOnChange={false}
    >
      {formik => {
        const { errors, values } = formik;

        return (
          <form
            onSubmit={formik.handleSubmit}
            autoComplete="off"
            className="questionForm"
          >
            <div className="formGroup flex items-center">
              <QuestionLabel name="Name" />
              <div className="inputGroup">
                <h2>
                  <ApiValidationError fieldName="testId" errors={apiError} />
                </h2>
                <QuestionInput
                  onChange={value => formik.setFieldValue('name', value, false)}
                  name="name"
                  value={values.name}
                  placeholder="Problem"
                />
                {errors && errors.name && (
                  <small className="inputError">{errors.name}</small>
                )}
                <ApiValidationError fieldName="name" errors={apiError} />
                <ApiValidationError
                  fieldName="questionType"
                  errors={apiError}
                />
              </div>
            </div>
            <div className="formGroup flex items-center">
              <QuestionLabel name="Language" />
              <div className="inputGroup">
                <CustomSelect
                  option={Object.values(Language).map(item => ({
                    name: item,
                    value: item
                  }))}
                  name="language"
                  onChange={value =>
                    formik.setFieldValue('language', value, false)
                  }
                  value={values.language}
                  placeholder="Language"
                  width="300px"
                />
                {errors && errors.language && (
                  <small className="inputError">{errors.language}</small>
                )}
                <ApiValidationError fieldName="language" errors={apiError} />
              </div>
            </div>
            <div className="formGroup flex items-center">
              <QuestionLabel
                name="Text Questions"
                shortDescription="Please be clear and specific"
              />
              <div className="inputGroup">
                <QuestionTextArea
                  name="question"
                  onChange={value =>
                    formik.setFieldValue('question', value, false)
                  }
                  placeholder="Text Questions"
                  value={values.question}
                />
                {errors && errors.question && (
                  <small className="inputError">{errors.question}</small>
                )}
                <ApiValidationError fieldName="question" errors={apiError} />
              </div>
            </div>
            <div className="formGroup flex">
              <div style={{ marginTop: '20px' }}>
                <QuestionLabel name="Choices" />
              </div>
              <div className="inputGroup">
                <QuestionChoice
                  formik={formik}
                  choice={values.choice}
                  solution={values.solution}
                />

                <ApiValidationError fieldName="choice" errors={apiError} />
              </div>
            </div>
            <div className="formGroup flex items-center">
              <QuestionLabel name="Level" />
              <div className="inputGroup">
                <CustomSelect
                  option={Object.values(Level).map(item => ({
                    name: item,
                    value: item
                  }))}
                  name="level"
                  onChange={value =>
                    formik.setFieldValue('level', value, false)
                  }
                  value={values.level}
                  placeholder="Level"
                  width="300px"
                />
                {errors && errors.level && (
                  <small className="inputError">{errors.level}</small>
                )}
                <ApiValidationError fieldName="level" errors={apiError} />
              </div>
            </div>
            <div className="formGroup flex items-center">
              <QuestionLabel name="Expected time" />
              <div className="inputGroup">
                <QuestionInput
                  onChange={value =>
                    formik.setFieldValue('expectedTime', value, false)
                  }
                  name="expectedTime"
                  value={values.expectedTime}
                  placeholder="Expected time (minutes)"
                  type="number"
                />
                {errors && errors.expectedTime && (
                  <small className="inputError">{errors.expectedTime}</small>
                )}
                <ApiValidationError
                  fieldName="expectedTime"
                  errors={apiError}
                />
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
        );
      }}
    </Formik>
  );
};

export default AddMcq;
