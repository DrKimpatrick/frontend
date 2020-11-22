import apiAction from 'helpers/apiAction';
import {
  Register,
  REGISTER_LOADING,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from 'redux/action-types/getStarted';

export const GetStartedAction = (newUser: Register) => {
  return (dispatchAction: any) =>
    dispatchAction(
      apiAction({
        method: 'POST',
        url: '/auth/register',
        data: newUser,
        onStart: () => (dispatch: any) => {
          dispatch({ type: REGISTER_LOADING });
        },
        onSuccess: (data: any) => (dispatch: any) => {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: Array.isArray(data) ? data[0] : data
          });
        },
        onFailure: (err: any) => (dispatch: any) => {
          const error = Array.isArray(err) ? err[0] : err;
          const { response } = error;

          dispatch({
            type: REGISTER_FAIL,
            payload: response ? response.data.errors : 'Please try again'
          });
        }
      })
    );
};
