import { Dispatch } from 'redux';
import ApiAction from 'helpers/apiAction';
import { ApiEndPoint } from 'utils/ApiEndpoints';
import { QuestionTypes } from 'redux/action-types/question';
import { TestVerification } from 'redux/action-types/test';
import { setMessage } from 'redux/actions/message/message';
import { McQuestionParamType, PaginationValueType } from './interface';

export const addMcqQuestion = (value: McQuestionParamType) => (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      url: ApiEndPoint.addMcqQuestion,
      data: value,
      method: 'POST',
      onStart: () => (dispatch: Dispatch) => {
        dispatch({
          type: QuestionTypes.AddMcqQuestionLoading,
          payload: { loading: true }
        });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: QuestionTypes.AddMcqQuestionLoading,
          payload: { loading: false }
        });

        dispatch({
          type: QuestionTypes.AddMcqQuestionErrors,
          payload: { errors: error.response.data }
        });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: QuestionTypes.AddMcqQuestionLoading,
          payload: { loading: false }
        });

        dispatch({
          type: QuestionTypes.AddMcqQuestion,
          payload: { data: true }
        });

        setMessage(res.message)(dispatch);
      }
    })
  );
};

export const getVerifiedQuestions = (paginationValue?: PaginationValueType) => (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      method: 'GET',
      url: ApiEndPoint.filterQuestion(
        TestVerification.Verified,
        paginationValue
      ),
      onStart: () => (dispatch: Dispatch) => {
        dispatch({
          type: QuestionTypes.VerifiedQuestionsLoading,
          payload: { loading: true }
        });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: QuestionTypes.VerifiedQuestionsLoading,
          payload: { loading: false }
        });
        dispatch({
          type: QuestionTypes.VerifiedQuestionsError,
          payload: { errors: error.response.data }
        });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: QuestionTypes.VerifiedQuestionsLoading,
          payload: { loading: false }
        });
        dispatch({
          type: QuestionTypes.VerifiedQuestions,
          payload: { data: res }
        });
      }
    })
  );
};
