import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormTitle, Loader, ApiValidationError } from 'components/Reusable';
import { RootState } from 'redux/store';
import { ArrowRightAltTwoTone } from '@material-ui/icons';
import './AffiliateInfo.scss';
import { updateUser } from 'redux/actions/user';
import { Formik } from 'formik';
import { AffiliateProcess } from 'redux/action-types/user';
import { AffiliateInfoSchema } from './schema';

const AddMoreInfo: FC = () => {
  const [loading = false, setLoading] = useState<boolean>();

  const reducer = useSelector((state: RootState) => {
    const { user, errors } = state.users;

    return { errors, user };
  });

  const { errors } = reducer;

  const dispatch = useDispatch();

  const defaultValues = {
    paypalEmail: '',
    linkToPlatform: '',
    bio: ''
  };

  useEffect(() => {
    if (errors) {
      setLoading(false);
    }
  }, [errors]);

  return (
    <Formik
      initialValues={defaultValues}
      validateOnChange={false}
      validationSchema={AffiliateInfoSchema}
      onSubmit={values => {
        if (reducer.user) {
          setLoading(true);

          updateUser(
            { ...values, profileProcess: AffiliateProcess.Completed },
            reducer.user._id
          )(dispatch);
        }
        return undefined;
      }}
    >
      {formik => {
        return (
          <form
            className="add-company-section m-auto text-gray-texts mb-8"
            onSubmit={formik.handleSubmit}
          >
            <div className="containers">
              <FormTitle title="Add more Info" />
              {errors && errors.error && (
                <div className="inputError">{errors.error}</div>
              )}
              {errors && errors.errors && (
                <ApiValidationError
                  fieldName="profileProcess"
                  errors={errors.errors}
                />
              )}
              <div className="text-gray-texts">
                <label>PayPal Email*</label>
                <input
                  type="text"
                  className="border outline-none bg-transparent rounded-sm w-full px-3 text-gray-texts input-height mt-2"
                  name="paypalEmail"
                  value={formik.values.paypalEmail}
                  onChange={formik.handleChange}
                />
                {formik.errors.paypalEmail && (
                  <div className="inputError">{formik.errors.paypalEmail}</div>
                )}
                {errors && errors.errors && (
                  <ApiValidationError
                    fieldName="paypalEmail"
                    errors={errors.errors}
                  />
                )}
              </div>

              <div className="text-gray-texts mt-4">
                <label>Link to Platform*</label>
                <input
                  type="url"
                  className="border outline-none bg-transparent rounded-sm w-full px-3 text-gray-texts input-height mt-2"
                  name="linkToPlatform"
                  value={formik.values.linkToPlatform}
                  onChange={formik.handleChange}
                />
                {formik.errors.linkToPlatform && (
                  <div className="inputError">
                    {formik.errors.linkToPlatform}
                  </div>
                )}
                {errors && errors.errors && (
                  <ApiValidationError
                    fieldName="linkToPlatform"
                    errors={errors.errors}
                  />
                )}
              </div>

              <div className="text-gray-texts mt-4">
                <label>Bio*</label>
                <textarea
                  className="border outline-none bg-transparent rounded-sm w-full px-3 text-gray-texts textarea-height mt-2"
                  name="bio"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                />
                {formik.errors.bio && (
                  <div className="inputError">{formik.errors.bio}</div>
                )}
              </div>

              <div className="flex justify-center mt-10 flex-col items-center mb-16">
                <button
                  data-testid="next-button"
                  className="next-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-32 rounded-sm shadow flex justify-around"
                  type="submit"
                >
                  <Loader
                    loading={loading}
                    command={
                      <>
                        <label className="">Next</label>
                        <ArrowRightAltTwoTone />
                      </>
                    }
                  />
                </button>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default AddMoreInfo;
