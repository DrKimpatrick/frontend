import React, { FC } from 'react';
import { useFormik } from 'formik';
import { ArrowRightAltTwoTone } from '@material-ui/icons';
import Loader from 'components/Reusable/Loader/Loader';
import { companyOrSchoolSchema } from './schema';
import './FormCompanySchool.scss';

type tError = {
  [key: string]: any;
};

export interface iValues {
  id?: string;
  name: string;
  address: string;
  website: string;
  accountManagerName: string;
  email: string;
  phone: string;
}

type Props = {
  validationErrors: any;
  showArrowOnSubmitButton?: boolean;
  labelButton?: string;
  initialValues?: iValues;
  loading?: boolean;
  onSubmitHandler: (values: iValues) => void;
  label?: string;
};

const FormCompanySchool: FC<Props> = ({
  showArrowOnSubmitButton = true,
  loading = false,
  labelButton = 'Next',
  initialValues,
  validationErrors,
  onSubmitHandler,
  label
}) => {
  let formattedErrors = null;

  if (validationErrors !== null && validationErrors.length !== 0) {
    formattedErrors = validationErrors.reduce((obj: object, error: tError) => {
      const key = Object.keys(error)[0];
      return {
        ...obj,
        [key]: error[key]
      };
    }, {});
  }

  let defaultValues = {
    name: '',
    address: '',
    website: '',
    accountManagerName: '',
    email: '',
    phone: ''
  };

  if (initialValues) {
    defaultValues = initialValues;
  }

  const formik = useFormik({
    initialValues: defaultValues,
    validateOnChange: false,
    validationSchema: companyOrSchoolSchema,
    onSubmit: values => {
      onSubmitHandler(values);
    }
  });

  if (formattedErrors) {
    formik.errors = { ...formik.errors, ...formattedErrors };
  }

  return (
    <form className="form-company-school" onSubmit={formik.handleSubmit}>
      <div className="text-gray-texts mt-8">
        <label>{label || 'Company'} Name *</label>
        <input
          type="text"
          className="border outline-none bg-transparent rounded-sm w-full px-3 text-gray-texts input-height mt-2"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.errors.name && (
          <div className="inputError">{formik.errors.name}</div>
        )}
      </div>
      <div className="text-gray-texts mt-4">
        <label>{label || 'Company'} Address *</label>
        <input
          type="text"
          className="border outline-none bg-transparent rounded-sm w-full px-3 text-gray-texts input-height mt-2"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
        />
        {formik.errors.address && (
          <div className="inputError">{formik.errors.address}</div>
        )}
      </div>
      <div className="text-gray-texts mt-4">
        <label>Website *</label>
        <input
          type="text"
          className="border outline-none bg-transparent rounded-sm w-full px-3 text-gray-texts input-height mt-2"
          name="website"
          value={formik.values.website}
          onChange={formik.handleChange}
        />
        {formik.errors.website && (
          <div className="inputError">{formik.errors.website}</div>
        )}
      </div>
      <div className="text-gray-texts mt-4">
        <label>Account Manager Name/Title *</label>
        <input
          type="text"
          className="border outline-none bg-transparent rounded-sm w-full px-3 text-gray-texts input-height mt-2"
          name="accountManagerName"
          value={formik.values.accountManagerName}
          onChange={formik.handleChange}
        />
        {formik.errors.accountManagerName && (
          <div className="inputError">{formik.errors.accountManagerName}</div>
        )}
      </div>
      <div className="text-gray-texts mt-4">
        <label>Email *</label>
        <input
          type="email"
          className="border outline-none bg-transparent rounded-sm w-full px-3 text-gray-texts input-height mt-2"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.errors.email && (
          <div className="inputError">{formik.errors.email}</div>
        )}
      </div>
      <div className="text-gray-texts mt-4">
        <label>Phone *</label>
        <input
          type="text"
          className="border outline-none bg-transparent rounded-sm w-full px-3 text-gray-texts input-height mt-2"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
        {formik.errors.phone && (
          <div className="inputError">{formik.errors.phone}</div>
        )}
      </div>
      <div className="flex justify-center mt-10 flex-col items-center">
        <button
          data-testid="next-button"
          className="next-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-32 rounded-sm shadow flex justify-around"
          type="submit"
        >
          <Loader
            loading={loading}
            command={
              <>
                <label className="">{labelButton}</label>
                {showArrowOnSubmitButton && <ArrowRightAltTwoTone />}
              </>
            }
          />
        </button>
      </div>
    </form>
  );
};

export default FormCompanySchool;
