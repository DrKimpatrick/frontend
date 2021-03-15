import React from 'react';
import './PreviewMcq.scss';
import { FormikProps } from 'formik';
import { PreviewQuestionItem, ChoicePreview } from 'components/Reusable';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

export interface InitialValues {
  name: string;
  language: string;
  library?: string;
  solution: string[];
  choice: string[];
  testId: string;
  level: string;
  expectedTime: string;
  question: string;
}
interface Props {
  initialValue: InitialValues;
  formik: FormikProps<any>;
  loading?: boolean;
  apiError?: any;
}

export const PreviewMcq = (props: Props) => {
  const { initialValue, apiError, formik } = props;

  const reducer = useSelector((state: RootState) => {
    const { user, errors } = state.users;
    return { user, apiError: errors };
  });

  const { user } = reducer;

  if (!user) {
    return null;
  }

  return (
    <div className="previewMcqQuestion">
      <PreviewQuestionItem
        name={initialValue.name}
        question={initialValue.question}
        language={initialValue.language}
        initialLevel={initialValue.level}
        formik={formik}
        apiError={apiError}
        owner={user.username}
        expectedTime={initialValue.expectedTime}
      />
      <div className="pt-12">
        <ChoicePreview
          choices={initialValue.choice}
          solutions={initialValue.solution}
          formik={formik}
        />
      </div>
    </div>
  );
};

export default PreviewMcq;
