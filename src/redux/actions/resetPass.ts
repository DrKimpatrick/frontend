import apiAction from 'helpers/apiAction';
import {
  RESET_FAIL,
  RESET_LOADING,
  RESET_SUCCESS,
  ResetPass
} from 'redux/action-types/resetPass';

export const ResetPassAction = (data: ResetPass) => {
  return (dispatchAction: any) =>
    dispatchAction(
      apiAction({
        method: 'POST',
        url: '/auth/reset-password',
        data,
        onStart: () => (dispatch: any) => {
          dispatch({ type: RESET_LOADING });
        },
        // eslint-disable-next-line no-shadow
        onSuccess: (data: any) => (dispatch: any) => {
          dispatch({
            type: RESET_SUCCESS,
            payload: Array.isArray(data) ? data[0] : data
          });
        },
        onFailure: (err: any) => (dispatch: any) => {
          const error = Array.isArray(err) ? err[0] : err;
          const { response } = error;

          dispatch({
            type: RESET_FAIL,
            payload: response ? response.data.error : 'Please try again'
          });
        }
      })
    );
};
