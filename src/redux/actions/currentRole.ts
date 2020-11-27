import apiAction from 'helpers/apiAction';
import {
  CURRENT_ROLE_LOADING,
  CURRENT_ROLE_FAIL,
  CURRENT_ROLE_SUCCESS
} from 'redux/action-types/currentRole';

export const CurrentRoleAction = (data: any) => {
  return (dispatchAction: any) =>
    dispatchAction(
      apiAction({
        method: 'POST',
        url: '/auth/register',
        data,
        onStart: () => (dispatch: any) => {
          dispatch({ type: CURRENT_ROLE_LOADING });
        },
        onSuccess: (data: any) => (dispatch: any) => {
          dispatch({
            type: CURRENT_ROLE_SUCCESS,
            payload: Array.isArray(data) ? data[0] : data
          });
        },
        onFailure: (err: any) => (dispatch: any) => {
          const error = Array.isArray(err) ? err[0] : err;
          const { response } = error;

          dispatch({
            type: CURRENT_ROLE_FAIL,
            payload: response ? response.data.errors : 'Please try again'
          });
        }
      })
    );
};
