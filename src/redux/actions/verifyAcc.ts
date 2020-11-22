import apiAction from 'helpers/apiAction';
import {
  VerifyPass,
  VERIFY_FAIL,
  VERIFY_LOADING,
  VERIFY_SUCCESS
} from 'redux/action-types/verifyAcc';

export const VerifyAccAction = (data: VerifyPass) => {
  return (dispatchAction: any) =>
    dispatchAction(
      apiAction({
        method: 'POST',
        url: '/auth/verify-account',
        data,
        onStart: () => (dispatch: any) => {
          dispatch({ type: VERIFY_LOADING });
        },
        // eslint-disable-next-line no-shadow
        onSuccess: (data: any) => (dispatch: any) => {
          dispatch({
            type: VERIFY_SUCCESS,
            payload: Array.isArray(data) ? data[0] : data
          });
        },
        onFailure: (err: any) => (dispatch: any) => {
          const error = Array.isArray(err) ? err[0] : err;
          const { response } = error;

          dispatch({
            type: VERIFY_FAIL,
            payload: response
              ? response.data.message || response.data.error
              : 'Please try again'
          });
        }
      })
    );
};
