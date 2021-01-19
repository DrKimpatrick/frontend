import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { ArrowForward } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { object, string } from 'yup';
import {
  AddItemOnModal,
  UploadProfilePicture,
  Loader,
  ApiValidationError
} from 'components/Reusable';
import './AddAffiliate.scss';
import { RootState } from 'redux/store';
import { addAffiliateUser } from 'redux/actions/user';

const AddAffiliateSchema = object().shape({
  username: string()
    .required('username is required')
    .lowercase('username must be in lowercase letter')
    .min(5, 'username must at least be 5 characters'),

  email: string().required('email is required').email('email must be valid'),

  paypalEmail: string()
    .required('paypal email is required')
    .email('paypal email must be valid'),

  password: string().required('password is required'),

  profilePicture: string()
    .required('profile picture is required')
    .url('profile picture must be valid')
});
interface Props {
  closeModal: () => void;
}

const AddAffiliate = (props: Props) => {
  const [isUploaded = false, setIsUploaded] = useState<boolean>();

  const [openUpload = false, setOpenUpload] = useState<boolean>();

  const [validationError, setValidationError] = useState<any>();

  const { closeModal } = props;

  const dispatch = useDispatch();

  const selector = useSelector((state: RootState) => {
    const { addAffiliate, addAffiliateLoading, errors } = state.users;

    const { message } = state.messages;

    return { addAffiliate, addAffiliateLoading, message, reducerError: errors };
  });

  const { addAffiliate, addAffiliateLoading, message, reducerError } = selector;

  useEffect(() => {
    if (addAffiliate && message) {
      closeModal();
    }
  }, [addAffiliate, closeModal, message]);

  useEffect(() => {
    if (reducerError && reducerError.errors) {
      setValidationError(reducerError.errors);
    }
  }, [reducerError]);

  return (
    <AddItemOnModal closeModal={closeModal} title="Create affiliate user">
      <div className="addAffiliate">
        {reducerError && reducerError.message && (
          <div className="inputError">{reducerError.message}</div>
        )}
        <Formik
          initialValues={{
            email: '',
            password: '',
            paypalEmail: '',
            profilePicture: '',
            bio: '',
            username: '',
            linkToPlatform: ''
          }}
          onSubmit={values => {
            addAffiliateUser(values)(dispatch);

            return undefined;
          }}
          validationSchema={AddAffiliateSchema}
          validateOnChange={false}
        >
          {formik => {
            const { values, errors } = formik;

            return (
              <>
                {openUpload && (
                  <UploadProfilePicture
                    setIsUploaded={setIsUploaded}
                    closeModal={() => setOpenUpload(false)}
                    setUploadedImage={(value: string) =>
                      formik.setFieldValue('profilePicture', value, true)
                    }
                  />
                )}
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                  <div className="text-gray-texts mt-4">
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={values.username}
                      onChange={formik.handleChange}
                    />
                    {errors && errors.username && (
                      <small className="inputError text-sm">
                        {errors.username}
                      </small>
                    )}
                    {validationError && (
                      <ApiValidationError
                        fieldName="username"
                        errors={validationError}
                      />
                    )}
                  </div>
                  <div className="text-gray-texts mt-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={formik.handleChange}
                    />
                    {errors && errors.email && (
                      <small className="inputError text-sm">
                        {errors.email}
                      </small>
                    )}
                    {validationError && (
                      <ApiValidationError
                        fieldName="email"
                        errors={validationError}
                      />
                    )}
                  </div>
                  <div className="text-gray-texts mt-4">
                    <input
                      type="email"
                      name="paypalEmail"
                      placeholder="Paypal email"
                      value={values.paypalEmail}
                      onChange={formik.handleChange}
                    />
                    {errors && errors.paypalEmail && (
                      <small className="inputError text-sm">
                        {errors.paypalEmail}
                      </small>
                    )}
                    {validationError && (
                      <ApiValidationError
                        fieldName="paypalEmail"
                        errors={validationError}
                      />
                    )}
                  </div>
                  <div className="text-gray-texts mt-4">
                    <input
                      type="text"
                      name="linkToPlatform"
                      placeholder="Website"
                      value={values.linkToPlatform}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="text-gray-texts mt-4">
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      value={values.password}
                      onChange={formik.handleChange}
                    />
                    {errors && errors.password && (
                      <small className="inputError text-sm">
                        {errors.password}
                      </small>
                    )}

                    {validationError && (
                      <ApiValidationError
                        fieldName="password"
                        errors={validationError}
                      />
                    )}
                  </div>
                  <div className="text-gray-texts mt-4">
                    <textarea
                      name="bio"
                      onChange={formik.handleChange}
                      placeholder="Bio"
                      value={values.bio}
                    >
                      {values.bio}
                    </textarea>
                    {errors && errors.bio && (
                      <small className="inputError text-sm">{errors.bio}</small>
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
                        {isUploaded ? 'Image uploaded' : 'Add profile picture'}
                      </button>
                      {errors && errors.profilePicture && (
                        <small className="inputError text-sm">
                          {errors.profilePicture}
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
                      disabled={addAffiliateLoading}
                    >
                      <Loader
                        loading={addAffiliateLoading}
                        command={
                          <>
                            <span>Save</span>
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

export default AddAffiliate;
