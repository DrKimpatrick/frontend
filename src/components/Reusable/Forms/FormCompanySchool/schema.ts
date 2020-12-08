import { object, string } from 'yup';

const phoneRegExp = /^\+(?:[0-9] ?){6,14}[0-​9]$/;

export const companyOrSchoolSchema = object().shape({
  name: string().required('Name is required'),
  address: string().required('Address is required'),
  website: string().required('Website is required'),
  accountManagerName: string().required(
    'Account manager name or title is required'
  ),
  email: string().email('Email is not valid').required('Email is required'),
  phone: string()
    .required('Phone number is required')
    .matches(phoneRegExp, 'Phone number is not valid')
});
