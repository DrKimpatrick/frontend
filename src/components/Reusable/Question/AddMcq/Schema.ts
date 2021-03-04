import { object, string, array } from 'yup';

export const AddMcqSchema = object().shape({
  name: string()
    .required('Name is required')
    .min(3, 'Name must be more than 3 characters')
    .trim(),
  choice: array()
    .of(string().required('Choice is required').trim())
    .required('Choice must be list of item'),
  language: string().required('Language is required').trim(),
  level: string().required('Level is required').trim(),
  solution: array()
    .of(string().required('Solution is required').trim())
    .required(
      'Please select at least one or more correct answer(s) for this question'
    ),
  expectedTime: string().required('Expected time is required'),
  testId: string().required('Test is required'),
  question: string()
    .required('Text question is required')
    .min(3, 'Text question must be more than 3 characters')
    .trim()
});
