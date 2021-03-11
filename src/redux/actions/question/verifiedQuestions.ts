import { Dispatch } from 'redux';
import ApiAction from 'helpers/apiAction';
import { ApiEndPoint } from 'utils/ApiEndpoints';
// import { setMessage, setError } from 'redux/actions/message';
import { QuestionTypes } from '../../action-types/question';

export const getVerifiedQuestions = () => (dispatchAction: Dispatch) => {
  return dispatchAction(
    ApiAction({
      method: 'GET',
      url: ApiEndPoint.verifiedQuestions,
      onStart: () => (dispatch: Dispatch) => {
        dispatch({
          type: QuestionTypes.VerifiedQuestions,
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
          payload: { data: res.data }
        });
      }
    })
  );
};
