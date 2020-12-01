import { Dispatch } from 'redux';
import { SkillTypes } from 'redux/action-types/skill';
import { UserTypes } from 'redux/action-types/user';
import { setMessage } from 'redux/actions/message';
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

export const changeSkillStatus = (values: { status: string; id: string }) => (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      url: `/skills/status/${values.id}`,
      method: 'PUT',
      data: { verificationStatus: values.status },
      onStart: () => dispatch => {
        dispatch({
          type: UserTypes.UserSkillLoading,
          payload: { loading: true }
        });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: SkillTypes.Errors,
          payload: {
            errors: error.response.data
          }
        });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: SkillTypes.ChangeSkillStatus,
          payload: { data: res.data }
        });

        setMessage(res.message)(dispatch);
      }
    })
  );
};
