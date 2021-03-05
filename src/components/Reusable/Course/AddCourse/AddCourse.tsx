import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import {
  AddItemOnModal,
  ApiValidationError,
  CustomSelect,
  UploadProfilePicture,
  Loader,
  CustomInput
} from 'components/Reusable';
import { RootState } from 'redux/store';
import {
  CourseBillingOptions,
  CourseLevel,
  CourseTimeFormat
} from 'redux/action-types/course';
import {
  CourseInitialValue,
  createCourse,
  updateCourse
} from 'redux/actions/course';
import { ArrowForward, AttachMoney } from '@material-ui/icons';
import { AddCourseSchema } from './Schema';
import './AddCourse.scss';

interface Props {
  initialValue?: CourseInitialValue;
  closeModal: () => void;
  downLoad: () => void;
  title: string;
  add: boolean;
  courseId?: string;
  isCoverImageUploaded?: boolean;
}

const defaultValue = {
  name: '',
  currentLangSpecsUpdated: false,
  instructor: '',
  languageTaught: '',
  existingCourseLink: '',
  coverImageLink: '',
  level: '',
  duration: '',
  format: '',
  description: '',
  price: '',
  billing: ''
};

export const AddCourse = (props: Props) => {
  const [validationError, setValidationError] = useState<any>();

  const [isUploaded = false, setIsUploaded] = useState<boolean>();

  const [openUpload = false, setOpenUpload] = useState<boolean>();

  const {
    initialValue,
    closeModal,
    downLoad,
    add,
    title,
    courseId,
    isCoverImageUploaded
  } = props;

  const dispatch = useDispatch();

  const selector = useSelector((state: RootState) => {
    const { errors, submitLoading, addCourse } = state.courses;

    const { message } = state.messages;

    return { apiError: errors, submitLoading, addCourse, message };
  });

  const { apiError, submitLoading, addCourse, message } = selector;

  useEffect(() => {
    if (apiError && apiError.errors) {
      setValidationError(apiError.errors);
    }
  }, [apiError]);

  useEffect(() => {
    if (addCourse && message) {
      closeModal();

      downLoad();
    }
  }, [closeModal, addCourse, message, downLoad]);

  return (
    <AddItemOnModal closeModal={closeModal} title={title}>
      <div className="addCourse">
        <Formik
          onSubmit={values => {
            if (add) {
              createCourse(values)(dispatch);
            }

            if (courseId && !add) {
              updateCourse(values, courseId)(dispatch);
            }

            return undefined;
          }}
          initialValues={initialValue || defaultValue}
          validationSchema={AddCourseSchema}
          validateOnChange={false}
        >
          {formik => {
            const { errors, values } = formik;
            return (
              <>
                {openUpload && (
                  <UploadProfilePicture
                    setIsUploaded={setIsUploaded}
                    closeModal={() => setOpenUpload(false)}
                    setUploadedImage={(value: string) => {
                      formik.setFieldValue('coverImageLink', value);

                      setOpenUpload(false);

                      return undefined;
                    }}
                    title="Upload Cover Image"
                    isOpen={openUpload}
                    setIsOpen={setOpenUpload}
                  />
                )}
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                  <div className="text-gray-texts mt-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Course name"
                      value={values.name}
                      onChange={formik.handleChange}
                    />
                    {errors && errors.name && (
                      <small className="inputError text-sm">
                        {errors.name}
                      </small>
                    )}
                    {validationError && (
                      <ApiValidationError
                        fieldName="name"
                        errors={validationError}
                      />
                    )}
                  </div>
                  <div className="text-gray-texts mt-4">
                    <input
                      type="text"
                      name="instructor"
                      placeholder="Instructor"
                      value={values.instructor}
                      onChange={formik.handleChange}
                    />
                    {errors && errors.instructor && (
                      <small className="inputError text-sm">
                        {errors.instructor}
                      </small>
                    )}
                    {validationError && (
                      <ApiValidationError
                        fieldName="instructor"
                        errors={validationError}
                      />
                    )}
                  </div>
                  <div className="text-gray-texts mt-4">
                    <input
                      type="text"
                      name="languageTaught"
                      placeholder="Language taught"
                      value={values.languageTaught}
                      onChange={formik.handleChange}
                    />
                    {errors && errors.languageTaught && (
                      <small className="inputError text-sm">
                        {errors.languageTaught}
                      </small>
                    )}
                    {validationError && (
                      <ApiValidationError
                        fieldName="languageTaught"
                        errors={validationError}
                      />
                    )}
                  </div>
                  <div className="text-gray-texts mt-4">
                    <input
                      type="url"
                      name="existingCourseLink"
                      placeholder="Course link(https://example.com)"
                      value={values.existingCourseLink}
                      onChange={formik.handleChange}
                    />
                    {errors && errors.existingCourseLink && (
                      <small className="inputError text-sm">
                        {errors.existingCourseLink}
                      </small>
                    )}
                    {validationError && (
                      <ApiValidationError
                        fieldName="existingCourseLink"
                        errors={validationError}
                      />
                    )}
                  </div>
                  <div className="text-gray-texts mt-4">
                    <CustomInput
                      name="price"
                      value={String(values.price)}
                      onChange={value => formik.setFieldValue('price', value)}
                      placeholder="Price"
                      icon={<AttachMoney />}
                    />
                    {errors && errors.price && (
                      <small className="inputError text-sm">
                        {errors.price}
                      </small>
                    )}
                    {validationError && (
                      <ApiValidationError
                        fieldName="price"
                        errors={validationError}
                      />
                    )}
                  </div>
                  {add && (
                    <div className="text-gray-texts mt-4">
                      <CustomSelect
                        placeholder="Pay per ..."
                        option={Object.values(CourseBillingOptions).map(
                          item => ({
                            name: item,
                            value: item
                          })
                        )}
                        name="billing"
                        value={values.billing}
                        onChange={value =>
                          formik.setFieldValue('billing', value)
                        }
                      />
                      {errors && errors.billing && (
                        <small className="inputError text-sm">
                          {errors.billing}
                        </small>
                      )}
                      {validationError && (
                        <ApiValidationError
                          fieldName="billing"
                          errors={validationError}
                        />
                      )}
                    </div>
                  )}
                  <div className="text-gray-texts mt-4">
                    <CustomSelect
                      placeholder="Select course level"
                      option={Object.values(CourseLevel).map(item => ({
                        name: item,
                        value: item
                      }))}
                      name="level"
                      value={values.level}
                      onChange={value => formik.setFieldValue('level', value)}
                    />
                    {errors && errors.level && (
                      <small className="inputError text-sm">
                        {errors.level}
                      </small>
                    )}
                    {validationError && (
                      <ApiValidationError
                        fieldName="level"
                        errors={validationError}
                      />
                    )}
                  </div>
                  <div className="text-gray-texts mt-4">
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <input
                          type="number"
                          name="duration"
                          placeholder="Duration"
                          value={values.duration}
                          onChange={formik.handleChange}
                        />
                        {errors && errors.duration && (
                          <small className="inputError text-sm">
                            {errors.duration}
                          </small>
                        )}
                        {validationError && (
                          <ApiValidationError
                            fieldName="duration"
                            errors={validationError}
                          />
                        )}
                      </Grid>
                      <Grid item xs>
                        <CustomSelect
                          placeholder="Format"
                          option={Object.values(CourseTimeFormat).map(item => ({
                            name: item,
                            value: item
                          }))}
                          name="format"
                          value={values.format}
                          onChange={value =>
                            formik.setFieldValue('format', value)
                          }
                        />
                        {errors && errors.format && (
                          <small className="inputError text-sm">
                            {errors.format}
                          </small>
                        )}
                        {validationError && (
                          <ApiValidationError
                            fieldName="format"
                            errors={validationError}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </div>
                  <div className="text-gray-texts mt-4">
                    <textarea
                      name="description"
                      onChange={formik.handleChange}
                      placeholder="Description"
                    >
                      {values.description}
                    </textarea>
                    {errors && errors.description && (
                      <small className="inputError text-sm">
                        {errors.description}
                      </small>
                    )}
                    {validationError && (
                      <ApiValidationError
                        fieldName="description"
                        errors={validationError}
                      />
                    )}
                  </div>
                  <div className="text-gray-texts mt-4 flex flex-col items-center justify-center">
                    <div className="uploadProfilePicture mt-4">
                      <input type="file" />
                      <button
                        type="button"
                        onClick={() => {
                          setOpenUpload(true);
                          setIsUploaded(false);

                          return undefined;
                        }}
                      >
                        <>
                          {isUploaded || isCoverImageUploaded
                            ? 'Cover Image uploaded'
                            : 'Add cover image'}
                        </>
                      </button>
                      {errors && errors.coverImageLink && (
                        <small className="inputError text-sm">
                          {errors.coverImageLink}
                        </small>
                      )}
                      {validationError && (
                        <ApiValidationError
                          fieldName="profilePicture"
                          errors={validationError}
                        />
                      )}
                    </div>
                    <button
                      type="submit"
                      className="mt-4 submitButton"
                      disabled={submitLoading}
                    >
                      <Loader
                        loading={submitLoading}
                        command={
                          <>
                            <span>{add ? 'Save' : 'Update'}</span>
                            <ArrowForward />
                          </>
                        }
                      />
                    </button>
                  </div>
                </form>
              </>
            );
          }}
        </Formik>
      </div>
    </AddItemOnModal>
  );
};

export default AddCourse;
