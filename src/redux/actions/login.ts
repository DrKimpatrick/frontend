import apiAction from 'helpers/apiAction';
import {
  Login,
  LOGIN_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS
} from 'redux/action-types/login';
import { Dispatch } from 'redux';

export const LoginAction = (userData: Login) => {
  return (dispatchAction: Dispatch) =>
    dispatchAction(
      apiAction({
        method: 'POST',
        url: '/auth/login',
        data: userData,
        onStart: () => (dispatch: Dispatch) => {
          dispatch({ type: LOGIN_LOADING });
        },
        onSuccess: data => (dispatch: Dispatch) => {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: Array.isArray(data)
              ? { ...data[0], isLoggedIn: true }
              : { ...data, isLoggedIn: true }
          });
        },
        onFailure: err => (dispatch: Dispatch) => {
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
