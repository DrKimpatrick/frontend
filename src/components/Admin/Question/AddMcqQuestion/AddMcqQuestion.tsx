import React, { useEffect } from 'react';
import { RootState } from 'redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AdminLayout, AddMcq } from 'components/Reusable';
import { addMcqQuestion as addMcqQuestionAction } from 'redux/actions/question/mcq';
import { Alert } from '@material-ui/lab';
import { QuestionTypeEnum } from 'redux/action-types/question';

export const AddMcqQuestion = () => {
  const params = useParams<{ testId: string }>();

  const dispatch = useDispatch();

  const selector = useSelector((state: RootState) => {
    const {
      addMcqQuestion,
      addMcqQuestionLoading,
      addMcqQuestionErrors
    } = state.questions;

    const { message } = state.messages;

    return {
      addMcqQuestion,
      loading: addMcqQuestionLoading,
      apiError: addMcqQuestionErrors,
      message
    };
  });
  const { apiError, loading, message, addMcqQuestion } = selector;

  useEffect(() => {
    if (message && addMcqQuestion) {
      setTimeout(() => window.location.reload(), 3000);
    }
  }, [message, addMcqQuestion]);

  return (
    <AdminLayout>
      <span className="font-bold" style={{ color: '#858585' }}>
        Multiple Choice Question
      </span>
      <div style={{ width: '50%' }} className="mt-3 mb-3">
        {apiError && apiError.message && (
          <Alert severity="error">{apiError.message}</Alert>
        )}
        {message && <Alert severity="success">{message}</Alert>}
      </div>

      <div className="addQuestion relative" style={{ marginTop: '40px' }}>
        <AddMcq
          initialValue={{
            name: '',
            language: '',
            library: '',
            solution: [],
            choice: [''],
            level: '',
            testId: params.testId || '',
            expectedTime: '',
            question: ''
          }}
          onSubmit={values =>
            addMcqQuestionAction({
              ...values,
              questionType: QuestionTypeEnum.MultipleChoice
            })(dispatch)
          }
          loading={loading}
          apiError={apiError && apiError.errors ? apiError.errors : undefined}
        />
      </div>
    </AdminLayout>
  );
};

export default AddMcqQuestion;
