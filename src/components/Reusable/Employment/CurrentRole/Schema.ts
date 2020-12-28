import { object, string } from 'yup';

export const currentRoleSchema = object().shape({
  companyName: string().required('company name is required'),
  title: string().required('title is required'),
  startDate: string().required('start date is required'),
  employmentType: string().required('employment type is required')
});
