import { object, string } from 'yup';

export const TestSchema = () => {
  const schema = object().shape({
    name: string()
      .required('Test name is required')
      .min(3, 'Test name must be more than 3 characters')
      .trim(),
    description: string()
      .required('Test description is required')
      .min(3, 'Test description must be more than 3 characters long')
      .trim(),
    timePolicy: string()
      .required('Please Select the time policy for this test')
      .trim()
  });

  return schema;
};
