import React, { useState } from 'react';
import './McqForm.scss';
import { Formik } from 'formik';
import {
  QuestionInput,
  QuestionTextArea,
  CustomSelect,
  QuestionLabel,
  QuestionChoice,
  QuestionButton,
  QuestionButtonBackgroundEnum,
  ApiValidationError,
  UploadProfilePicture,
  PreviewMcq
} from 'components/Reusable';
import { Language, Level } from 'redux/action-types/question';
import { QuestionSchema } from './Schema';

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
  isVideoQuestion?: boolean;
  buttonName?: string;
}

const McqForm = (props: Props) => {
  const [videoUpload = false, setVideoUpload] = useState<boolean>();

  const [isUploaded = false, setIsUploaded] = useState<boolean>();

  const {
    initialValue,
    onSubmit,
    apiError,
    loading,
    isVideoQuestion,
    buttonName
  } = props;

  const [preview, SetPreview] = useState<boolean>(false);

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={QuestionSchema({ isVideoQuestion })}
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
            {preview ? (
              <div className="mt-5">
                <PreviewMcq
                  initialValue={values}
                  formik={formik}
                  loading={loading}
                  apiError={
                    apiError && apiError.errors ? apiError.errors : undefined
                  }
                />
              </div>
            ) : (
              <>
                {videoUpload && (
                  <UploadProfilePicture
                    video
                    title="Upload video solution"
                    setIsUploaded={() => ''}
                    closeModal={() => setVideoUpload(false)}
                    setUploadedImage={value => {
                      formik.setFieldValue('solution', [value], false);

                      setIsUploaded(true);

                      return undefined;
                    }}
                    isOpen={videoUpload}
                    setIsOpen={setVideoUpload}
                  />
                )}
                <div className="formGroup flex items-center pt-8">
                  <QuestionLabel name="Name" />
                  <div className="inputGroup">
                    <QuestionInput
                      onChange={value =>
                        formik.setFieldValue('name', value, false)
                      }
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
                {!isVideoQuestion && (
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
                      <ApiValidationError
                        fieldName="language"
                        errors={apiError}
                      />
                    </div>
                  </div>
                )}
                <div className="formGroup flex items-center">
                  <QuestionLabel
                    name="Text Questions"
                    shortDescription="The text of the question, 
                be clear and specific."
                  />
                  <div className="inputGroup">
                    <QuestionTextArea
                      name="questions"
                      onChange={value =>
                        formik.setFieldValue('question', value, false)
                      }
                      placeholder="Text Questions"
                      value={values.question}
                    />
                    {errors && errors.question && (
                      <small className="inputError">{errors.question}</small>
                    )}
                    <ApiValidationError
                      fieldName="question"
                      errors={apiError}
                    />
                  </div>
                </div>
                <div className="formGroup flex">
                  <div>
                    <QuestionLabel
                      name={`${
                        (isVideoQuestion && 'Video Solution') || 'choice'
                      }`}
                      shortDescription={`${
                        (isVideoQuestion &&
                          'The video solution should be clear and specific.') ||
                        ''
                      }`}
                    />
                  </div>
                  <div className="inputGroup">
                    {(isVideoQuestion && (
                      <div className="videoInput">
                        <button
                          type="button"
                          className={`uploadVideoButton ${
                            isUploaded ? 'uploadSuccess' : ''
                          }`}
                          onClick={() => setVideoUpload(true)}
                        >
                          {isUploaded ? ' Uploaded' : 'Upload your solution'}
                        </button>
                      </div>
                    )) || (
                      <QuestionChoice
                        formik={formik}
                        choice={values.choice}
                        solution={values.solution}
                      />
                    )}
                    {isVideoQuestion && errors && errors.solution && (
                      <small className="inputError">{errors.solution}</small>
                    )}
                    <ApiValidationError
                      fieldName={(isVideoQuestion && 'solution') || 'choice'}
                      errors={apiError}
                    />
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
                      <small className="inputError">
                        {errors.expectedTime}
                      </small>
                    )}
                    <ApiValidationError
                      fieldName="expectedTime"
                      errors={apiError}
                    />
                  </div>
                </div>
              </>
            )}
            <div className="formGroup flex">
              {!preview && <div style={{ width: '150px' }} />}
              <div className="flex buttons">
                <QuestionButton
                  name={buttonName || 'Save'}
                  background={QuestionButtonBackgroundEnum.Green}
                  onClick={() => formik.submitForm()}
                  loading={loading}
                  color="white"
                />
                {!preview && (
                  <QuestionButton
                    name="Preview"
                    background={QuestionButtonBackgroundEnum.Blue}
                    onClick={async () => {
                      try {
                        const validate = await formik.validateForm();

                        if (Object.keys(validate).length <= 0) {
                          SetPreview(true);
                        }
                      } catch (error) {
                        SetPreview(false);
                      }
                      return undefined;
                    }}
                    color="white"
                  />
                )}
                {preview && (
                  <QuestionButton
                    name="Back to Questions"
                    background={QuestionButtonBackgroundEnum.white}
                    onClick={() => SetPreview(false)}
                    color="#828282"
                    width="169px"
                    paddingLeft="38px"
                    paddingRight="0px"
                  />
                )}
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default McqForm;
