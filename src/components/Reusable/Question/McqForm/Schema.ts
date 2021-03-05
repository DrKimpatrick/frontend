import { object, string, array } from 'yup';

export const QuestionSchema = ({
  isVideoQuestion
}: {
  isVideoQuestion?: boolean;
}) => {
  const schema = object().shape({
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
    question: isVideoQuestion
      ? string().required('Video question is required')
      : string()
          .required('Text question is required')
          .min(3, 'Text question must be more than 3 characters')
          .trim()
  });

  return schema;
};
