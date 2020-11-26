import { Dispatch } from 'redux';
import { UserTypes } from 'redux/action-types/user';
import { AddSkill, addSkillTypes } from 'redux/action-types/skill';
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
        dispatch({ type: addSkillTypes.GetSkillsLoading, payload: { loading: true } });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: addSkillTypes.GetSkillsSuccess,
          payload: res.data
        });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: addSkillTypes.GetSkillsFail,
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

export const addedSkillsUser = (dataValues: AddSkill[]) => (dispatchAction: Dispatch) => {
  console.log('data values', dataValues)
    return dispatchAction(
      ApiAction({
        url: '/skills/me',
        method: 'POST',
        data: dataValues,
        onStart: () => (dispatch: Dispatch) => {
          dispatch({ type: addSkillTypes.SkillLoading, payload: { loading: true } });
        },
        onSuccess: res => (dispatch: Dispatch) => {
          dispatch({
            type: addSkillTypes.SkillSuccess,
            payload: { data: res }
          });
        },
        onFailure: error => (dispatch: Dispatch) => {
          dispatch({
            type: addSkillTypes.SkillFail,
            payload: { errors: error.response.data }
          });
        }
      })
    );
    };
