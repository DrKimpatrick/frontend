import { Dispatch } from 'redux';
import ApiAction from 'helpers/apiAction';
import { ApiEndPoint } from 'utils/ApiEndpoints';
import { QuestionTypes } from 'redux/action-types/question';
import { setMessage } from 'redux/actions/message/message';
import { CodingInitialValue } from './interface';

export const createCodingQuestion = (value: CodingInitialValue) => (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      url: ApiEndPoint.AddCodingQuestion,
      method: 'POST',
      data: value,
      onStart: () => (dispatch: Dispatch) => {
        dispatch({
          type: QuestionTypes.AddCodingQuestionLoading,
          payload: { loading: true }
        });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: QuestionTypes.AddCodingQuestionLoading,
          payload: { loading: false }
        });

        dispatch({
          type: QuestionTypes.AddCodingQuestionError,
          payload: { errors: error.response.data }
        });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: QuestionTypes.AddCodingQuestionLoading,
          payload: { loading: false }
        });

        dispatch({
          type: QuestionTypes.AddCodingQuestion,
          payload: { data: res.data }
        });

        setMessage(res.message || 'Question saved successfully')(dispatch);
      }
    })
  );
};
