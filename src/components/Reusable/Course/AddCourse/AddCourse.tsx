import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import {
  AddItemOnModal,
  ApiValidationError,
  CustomSelect,
  UploadProfilePicture,
  Loader,
  CustomInput
} from 'components/Reusable';
import { RootState } from 'redux/store';
import { CourseLevel, CourseTimeFormat } from 'redux/action-types/course';
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
  price: ''
};

export const AddCourse = (props: Props) => {
  const [validationError, setValidationError] = useState<any>();

  const [isUploaded = false, setIsUploaded] = useState<boolean>();

  const [openUpload = false, setOpenUpload] = useState<boolean>();

  const {
    initialValue,
    closeModal,
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
    }
  }, [closeModal, addCourse, message]);

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
                      formik.setFieldValue('coverImageLink', value, true);

                      setOpenUpload(false);

                      return undefined;
                    }}
                    title="Upload Cover Image"
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
                      placeholder="Course link"
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
                      onChange={value =>
                        formik.setFieldValue('price', value, true)
                      }
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
                  <div className="text-gray-texts mt-4">
                    <CustomSelect
                      placeholder="Select course level"
                      option={Object.values(CourseLevel).map(item => ({
                        name: item,
                        value: item
                      }))}
                      name="level"
                      value={values.level}
                      onChange={value =>
                        formik.setFieldValue('level', value, true)
                      }
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
                    <div className="grid grid-cols-2 gap-4">
                      <div>
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
                      </div>
                      <div>
                        <CustomSelect
                          placeholder="Select time format"
                          option={Object.values(CourseTimeFormat).map(item => ({
                            name: item,
                            value: item
                          }))}
                          name="format"
                          value={values.format}
                          onChange={value =>
                            formik.setFieldValue('format', value, true)
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
                      </div>
                    </div>
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
