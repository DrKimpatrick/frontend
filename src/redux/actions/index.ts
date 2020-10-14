// This is where we will add our action creators

import {
  REGISTER_USER_START,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE
} from 'redux/action-types/index';
import apiAction from 'helpers/apiAction';

const registerAction = (formData: any) => {
  return (dispatchAction: any) =>
    dispatchAction(
      apiAction({
        method: 'POST',
        url: '/register',
        data: formData,
        onStart: () => (dispatch: any) => {
          dispatch({ type: REGISTER_USER_START });
        },
        onSuccess: (data: any) => (dispatch: any) => {
          dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: Array.isArray(data) ? data[0] : data
          });
        },
        onFailure: (err: any) => (dispatch: any) => {
          const error = Array.isArray(err) ? err[0] : err;
          dispatch({
            type: REGISTER_USER_FAILURE,
            payload: error
          });
        }
      })
    );
};

export default registerAction;
