import { Dispatch } from 'redux';
import ApiAction from 'helpers/apiAction';
import { ApiEndPoint } from 'utils/ApiEndpoints';
import { QuestionTypes } from '../../action-types/question';
import { setMessage } from '../message/message';

export const addMcqQuestion = (value: any) => (dispatchAction: Dispatch) => {
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