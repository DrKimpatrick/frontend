import React from 'react';
import './AddCodingQuestion.scss';
import { AdminLayout, CodingQuestionForm } from 'components/Reusable';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { createCodingQuestion } from 'redux/actions/question';

const AddCodingQuestion = () => {
  const dispatch = useDispatch();

  const selector = useSelector((state: RootState) => ({
    apiError: state.questions.addCodingQuestionError,
    loading: state.questions.addCodingQuestionLoading,
    addCodingQuestion: state.questions.addCodingQuestion,
    message: state.messages.message
  }));

  const { apiError, loading, addCodingQuestion, message } = selector;

  return (
    <AdminLayout>
      <span className="font-bold" style={{ color: '#858585' }}>
        Live Coding Question
      </span>
      <div className="addCodingQuestion">
        <CodingQuestionForm
          initialValue={{
            name: '',
            language: '',
            library: '',
            template: '',
            testCase: '',
            solution: [],
            expectedTime: '',
            question: '',
            level: ''
          }}
          submit={values => createCodingQuestion(values)(dispatch)}
          apiError={apiError && apiError.errors ? apiError.errors : undefined}
          loading={loading}
          question={!!addCodingQuestion}
          message={message}
        />
      </div>
    </AdminLayout>
  );
};

export default AddCodingQuestion;
