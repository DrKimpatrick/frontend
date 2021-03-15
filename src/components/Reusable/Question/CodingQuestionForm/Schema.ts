import { object, string, array } from 'yup';

export const CodingSchema = object().shape({
  name: string()
    .required('name is required')
    .min(4, 'name must be or more than 4 characters'),
  question: string()
    .required('question is required')
    .min(4, 'question must be or more than 4 characters'),
  language: string().required('language is required'),
  level: string().required('level is required'),
  template: string().required('template is required'),
  testCase: string().required('test case is required'),
  expectedTime: string().required('expected time is required'),
  solution: array()
    .of(string().required('solution is required'))
    .required('solution is required')
});
