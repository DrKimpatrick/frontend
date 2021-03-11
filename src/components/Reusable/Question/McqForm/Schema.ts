import { object, string, array } from 'yup';

export const QuestionSchema = ({
  isVideoQuestion
}: {
  isVideoQuestion?: boolean;
}) => {
  const name = string()
    .required('Name is required')
    .min(3, 'Name must be more than 3 characters')
    .trim();

  const level = string().required('Level is required').trim();

  const question = string()
    .required('Text question is required')
    .min(3, 'Text question must be more than 3 characters')
    .trim();

  const expectedTime = string().required('Expected time is required');

  if (!isVideoQuestion) {
    return object().shape({
      name,
      choice: array()
        .of(string().required('Choice is required').trim())
        .required('Choice must be list of item'),
      language: string().required('Language is required').trim(),
      level,
      solution: array()
        .of(string().required('Solution is required').trim())
        .required(
          'Please select at least one or more correct answer(s) for this question'
        ),
      expectedTime,
      question
    });
  }

  return object().shape({
    name,
    question,
    level,
    expectedTime,
    solution: array()
      .of(string().required('Video solution is required').trim())
      .required('Video solution is required')
  });
};
