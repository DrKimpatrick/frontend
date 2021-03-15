import React, { useEffect } from 'react';
import { RootState } from 'redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AdminLayout, McqForm, SideLoading } from 'components/Reusable';
import {
  editVideoQuestionAction,
  getQuestionAction
} from 'redux/actions/question/video';
import { Alert } from '@material-ui/lab';
import { get } from 'lodash';
import { QuestionTypeEnum } from 'redux/action-types/question';

export const EditVideoQuestion = () => {
  const params = useParams<{ questionId: string }>();

  const dispatch = useDispatch();

  const selector = useSelector((state: RootState) => {
    const {
      editVideoQuestion,
      editVideoQuestionError,
      editVideoQuestionLoading,
      getQuestion,
      getQuestionLoading,
      getQuestionError
    } = state.questions;

    const { message } = state.messages;

    return {
      editVideoQuestion,
      loading: editVideoQuestionLoading,
      apiError: editVideoQuestionError,
      message,
      question: getQuestion,
      getQuestionLoading,
      getQuestionError
    };
  });
  const {
    apiError,
    loading,
    message,
    editVideoQuestion,
    getQuestionLoading,
    getQuestionError,
    question
  } = selector;

  useEffect(() => {
    getQuestionAction(params.questionId)(dispatch);
  }, [dispatch, params.questionId]);

  if (getQuestionLoading) {
    return (
      <AdminLayout>
        <div style={{ marginTop: 200 }}>
          <SideLoading />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <span className="font-bold" style={{ color: '#858585' }}>
        Edit video based question
      </span>
      <div style={{ width: '50%' }} className="mt-3 mb-3">
        {apiError && apiError.message && (
          <Alert severity="error">{apiError.message}</Alert>
        )}
        {message && editVideoQuestion && (
          <Alert severity="success">{message}</Alert>
        )}
        {getQuestionError && getQuestionError.message && (
          <Alert severity="error">{getQuestionError.message}</Alert>
        )}
        {getQuestionError && getQuestionError.error && (
          <Alert severity="error">{getQuestionError.error}</Alert>
        )}
        {question && question.questionType !== QuestionTypeEnum.Video && (
          <Alert severity="error">Question is not video base</Alert>
        )}
      </div>

      {question && question.questionType === QuestionTypeEnum.Video && (
        <div className="addQuestion relative" style={{ marginTop: '40px' }}>
          <McqForm
            initialValue={{
              name: get(question, 'name', ''),
              language: get(question, 'language', ''),
              library: get(question, 'library', ''),
              solution: get(question, 'solution', []),
              choice: get(question, 'choice', []),
              level: get(question, 'level', ''),
              testId: '',
              expectedTime: get(question, 'expectedTime', ''),
              question: get(question, 'question', '')
            }}
            onSubmit={values => {
              editVideoQuestionAction({
                ...values,
                questionId: params.questionId
              })(dispatch);
            }}
            loading={loading}
            apiError={apiError && apiError.errors ? apiError.errors : undefined}
            isVideoQuestion
            buttonName="Update"
          />
        </div>
      )}
    </AdminLayout>
  );
};

export default EditVideoQuestion;
