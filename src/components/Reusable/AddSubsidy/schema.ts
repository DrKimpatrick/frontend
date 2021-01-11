import { object, string } from 'yup';

export const subsidySchema = object().shape({
  plan: string().required('Term is required'),
  tier: string().required('Number is required')
});
