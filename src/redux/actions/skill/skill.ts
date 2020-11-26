import { Dispatch } from 'redux';
import { SkillTypes } from 'redux/action-types/skill';
import ApiAction from '../../../helpers/apiAction';

export const listUserSkill = () => (dispatchAction: Dispatch) => {
  return dispatchAction(
    ApiAction({
      url: '/skills/me',
      method: 'GET',
      onStart: () => (dispatch: Dispatch) => {
        dispatch({ type: SkillTypes.Loading, payload: { loading: true } });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: SkillTypes.ListUserSkill,
          payload: { data: res.data }
        });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: SkillTypes.Errors,
          payload: { errors: error.response.data }
        });
      }
    })
  );
};
