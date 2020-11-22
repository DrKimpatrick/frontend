import apiAction from 'helpers/apiAction';
import {
  FORGOT_LOADING,
  FORGOT_FAIL,
  FORGOT_SUCCESS
} from 'redux/action-types/forgotPass';

export const ForgotPassAction = (email: any) => {
  return (dispatchAction: any) =>
    dispatchAction(
      apiAction({
        method: 'POST',
        url: '/auth/forget-password',
        data: { email },
        onStart: () => (dispatch: any) => {
          dispatch({ type: FORGOT_LOADING });
        },
        onSuccess: (data: any) => (dispatch: any) => {
          dispatch({
            type: FORGOT_SUCCESS,
            payload: Array.isArray(data) ? data[0] : data
          });
        },
        onFailure: (err: any) => (dispatch: any) => {
          const error = Array.isArray(err) ? err[0] : err;
          const { response } = error;
          dispatch({
            type: FORGOT_FAIL,
            payload: response ? response.data.message : 'Please try again'
          });
        }
      })
    );
};
