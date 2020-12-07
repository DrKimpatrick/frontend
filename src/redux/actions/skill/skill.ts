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

export const setSkillAction = (value: boolean) => (dispatch: Dispatch) => {
  dispatch({ type: SkillTypes.SetActionModal, payload: { data: value } });
};

export const listSkill = () => async (dispatchAction: Dispatch) => {
  return dispatchAction(
    ApiAction({
      url: '/skills',
      method: 'GET',
      onStart: () => dispatch => {
        dispatch({
          type: SkillTypes.Loading,
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
          type: SkillTypes.ListSkill,
          payload: { data: res.data }
        });
      }
    })
  );
};

export const listSingleSkill = (skillId: string) => async (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      url: `/skills/${skillId}`,
      method: 'GET',
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
          type: SkillTypes.ListSingleSkill,
          payload: { data: res.data }
        });
      }
    })
  );
};

export const deleteSkill = (skillId: string) => async (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      url: `/skills/${skillId}`,
      method: 'DELETE',
      onStart: () => dispatch => {
        dispatch({
          type: UserTypes.UserSkillLoading,
          payload: { loading: true }
        });
        setSkillAction(true)(dispatch);
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: SkillTypes.Errors,
          payload: {
            errors: error.response.data
          }
        });
      },
      onSuccess: () => (dispatch: Dispatch) => {
        dispatch({
          type: SkillTypes.DeleteSkill,
          payload: { data: skillId }
        });
        setSkillAction(false)(dispatch);
      }
    })
  );
};

export const updateSkill = ({
  skillId,
  skill
}: {
  skillId: string;
  skill: string;
}) => async (dispatchAction: Dispatch) => {
  return dispatchAction(
    ApiAction({
      url: `/skills/${skillId}`,
      method: 'PUT',
      data: {
        skill
      },
      onStart: () => dispatch => {
        dispatch({
          type: UserTypes.UserSkillLoading,
          payload: { loading: true }
        });
        setSkillAction(true)(dispatch);
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
          type: SkillTypes.UpdateSkill,
          payload: { data: res.data }
        });

        setSkillAction(false)(dispatch);
      }
    })
  );
};

export const addSkill = (data: { skill: string }[]) => async (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      url: '/skills',
      method: 'POST',
      data,
      onStart: () => dispatch => {
        dispatch({
          type: UserTypes.UserSkillLoading,
          payload: { loading: true }
        });
        setSkillAction(true)(dispatch);
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
          type: SkillTypes.AddSkill,
          payload: { data: res.data }
        });

        setSkillAction(false)(dispatch);
      }
    })
  );
};
