import { Dispatch } from 'redux';
import ApiAction from '../../../helpers/apiAction';

export enum UserTypes {
  CurrentUser = 'User/CurrentUser',
  Errors = 'User/Errors'
}

export const listCurrentUser = () => (dispatchAction: Dispatch) => {
  return dispatchAction(
    ApiAction({
      url: '/users/me',
      method: 'GET',
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: UserTypes.CurrentUser,
          payload: { data: res.profile }
        });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: UserTypes.Errors,
          payload: { errors: error.response.data }
        });
      }
    })
  );
};
