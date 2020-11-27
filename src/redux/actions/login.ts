import apiAction from 'helpers/apiAction';
import {
  Login,
  LOGIN_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS
} from 'redux/action-types/login';

export const LoginAction = (userData: Login) => {
  return (dispatchAction: any) =>
    dispatchAction(
      apiAction({
        method: 'POST',
        url: '/auth/login',
        data: userData,
        onStart: () => (dispatch: any) => {
          dispatch({ type: LOGIN_LOADING });
        },
        onSuccess: (data: any) => (dispatch: any) => {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: Array.isArray(data)
              ? { ...data[0], isLoggedIn: true }
              : { ...data, isLoggedIn: true }
          });
        },
        onFailure: (err: any) => (dispatch: any) => {
          const error = Array.isArray(err) ? err[0] : err;
          const { response } = error;

          dispatch({
            type: LOGIN_FAIL,
            payload: response
              ? response.data.message || response.data.error
              : 'Please try again'
          });
        }
      })
    );
};
