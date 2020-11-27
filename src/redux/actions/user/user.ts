import { Dispatch } from 'redux';
import { UserTypes } from 'redux/action-types/user';
import { AddSkill, SkillTypes } from 'redux/action-types/skill';
import ApiAction from '../../../helpers/apiAction';

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

export const listSpecificUser = (userId: string) => (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      url: `/users/${userId}`,
      method: 'GET',
      onStart: () => (dispatch: Dispatch) => {
        dispatch({ type: UserTypes.Loading, payload: { loading: true } });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: UserTypes.ListSpecificUser,
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

export const listUserSkill = (userId: string) => (dispatchAction: Dispatch) => {
  return dispatchAction(
    ApiAction({
      url: `/users/${userId}/skills`,
      method: 'GET',
      onStart: () => (dispatch: Dispatch) => {
        dispatch({ type: UserTypes.Loading, payload: { loading: true } });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: UserTypes.ListUserSkill,
          payload: { data: res.data }
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

export const listAllSkill = () => (dispatchAction: Dispatch) => {
  return dispatchAction(
    ApiAction({
      url: `/skills`,
      method: 'GET',
      onStart: () => (dispatch: Dispatch) => {
        dispatch({
          type: SkillTypes.GetSkillsLoading,
          payload: { loading: true }
        });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: SkillTypes.GetSkillsSuccess,
          payload: res.data
        });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: SkillTypes.GetSkillsFail,
          payload: { errors: error.response.data }
        });
      }
    })
  );
};

export const listUserByRole = (data: {
  page: number;
  limit: number;
  role: string;
}) => (dispatchAction: Dispatch) => {
  const { page, limit, role } = data;
  return dispatchAction(
    ApiAction({
      url: `/users/?roles=${role}&limit=${limit}&page=${page}`,
      method: 'GET',
      onStart: () => (dispatch: Dispatch) => {
        dispatch({ type: UserTypes.Loading, payload: { loading: true } });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: UserTypes.ListUserByRole,
          payload: { data: res }
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

export const addedSkillsUser = (dataValues: AddSkill[]) => (
  dispatchAction: Dispatch
) => {
  console.log('data values', dataValues);
  return dispatchAction(
    ApiAction({
      url: '/skills/me',
      method: 'POST',
      data: dataValues,
      onStart: () => (dispatch: Dispatch) => {
        dispatch({
          type: SkillTypes.SkillLoading,
          payload: { loading: true }
        });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: SkillTypes.SkillSuccess,
          payload: { data: res }
        });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: SkillTypes.SkillFail,
          payload: { errors: error.response.data }
        });
      }
    })
  );
};

export const setActivePath = (pathname: string) => (dispatch: Dispatch) => {
  dispatch({ type: UserTypes.ActivePath, payload: { data: pathname } });
};

export const updateUser = (data: any, userId: string) => (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      url: `/users/${userId}`,
      method: 'PATCH',
      data,
      onStart: () => (dispatch: Dispatch) => {
        dispatch({ type: UserTypes.Loading, payload: { loading: true } });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        delete res.profile.__v;
        setTimeout(() => {
          dispatch({
            type: UserTypes.UpdateUser,
            payload: { data: res.profile }
          });
        }, [1000]);
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
