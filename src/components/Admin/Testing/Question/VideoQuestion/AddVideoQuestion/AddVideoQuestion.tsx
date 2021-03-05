import React, { useEffect } from 'react';
import { RootState } from 'redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AdminLayout, McqForm } from 'components/Reusable';
import { addVideoQuestionAction } from 'redux/actions/question/videoQuestion';
import { Alert } from '@material-ui/lab';
import { QuestionTypeEnum } from 'redux/action-types/question';

export const AddVideoQuestion = () => {
  const params = useParams<{ testId: string }>();

  const dispatch = useDispatch();

  const selector = useSelector((state: RootState) => {
    const {
      addVideoQuestion,
      addVideoQuestionError,
      addVideoQuestionLoading
    } = state.questions;

    const { message } = state.messages;

    return {
      addVideoQuestion,
      loading: addVideoQuestionLoading,
      apiError: addVideoQuestionError,
      message
    };
  });
  const { apiError, loading, message, addVideoQuestion } = selector;

  useEffect(() => {
    if (message && addVideoQuestion) {
      setTimeout(() => window.location.reload(), 3000);
    }
  }, [message, addVideoQuestion]);

  return (
    <AdminLayout>
      <span className="font-bold" style={{ color: '#858585' }}>
        Video Based Question
      </span>
      <div style={{ width: '50%' }} className="mt-3 mb-3">
        {apiError && apiError.message && (
          <Alert severity="error">{apiError.message}</Alert>
        )}
        {message && <Alert severity="success">{message}</Alert>}
      </div>

      <div className="addQuestion relative" style={{ marginTop: '40px' }}>
        <McqForm
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
            addVideoQuestionAction({
              ...values,
              questionType: QuestionTypeEnum.Video
            })(dispatch)
          }
          loading={loading}
          apiError={apiError && apiError.errors ? apiError.errors : undefined}
          isVideoQuestion
        />
      </div>
    </AdminLayout>
  );
};

export default AddVideoQuestion;
