import { Dispatch } from 'redux';
import {
  EmploymentTypes,
  EmploymentParam
} from 'redux/action-types/employment';

import { UserTypes } from 'redux/action-types/user';
import { setMessage } from 'redux/actions/message/message';
import { setProfileProcess } from 'redux/actions/user';
import ApiAction from '../../../helpers/apiAction';

export const addEmployment = (data: EmploymentParam) => async (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      url: '/employment',
      method: 'POST',
      data,
      onStart: () => (dispatch: Dispatch) => {
        dispatch({ type: EmploymentTypes.Loading, payload: { loading: true } });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: EmploymentTypes.Errors,
          payload: {
            errors: error.response.data
          }
        });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        if (data.user && data.profileProcess) {
          setProfileProcess({
            profileProcess: data.profileProcess,
            userId: data.user._id
          })(dispatch);
        }
        dispatch({
          type: EmploymentTypes.AddEmployment,
          payload: {
            data: res.data
          }
        });
        setMessage(res.message)(dispatch);
      }
    })
  );
};

export const listEmployments = () => (dispatchAction: Dispatch) => {
  return dispatchAction(
    ApiAction({
      url: '/employment',
      method: 'GET',
      onStart: () => (dispatch: Dispatch) => {
        dispatch({ type: EmploymentTypes.Loading, payload: { loading: true } });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: EmploymentTypes.Errors,
          payload: {
            errors: error.response.data
          }
        });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        if (res.data) {
          dispatch({
            type: EmploymentTypes.ListEmployments,
            payload: {
              data: res.data
            }
          });
        }
      }
    })
  );
};

export const deleteEmployment = (id: string) => async (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      url: `/employment/${id}`,
      method: 'DELETE',
      onStart: () => (dispatch: Dispatch) => {
        dispatch({ type: EmploymentTypes.Loading, payload: { loading: true } });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: EmploymentTypes.Errors,
          payload: {
            errors: error.response.data
          }
        });
      },
      onSuccess: () => (dispatch: Dispatch) => {
        dispatch({
          type: EmploymentTypes.DeleteEmployment,
          payload: {
            id
          }
        });
      }
    })
  );
};

export const listSpecificEmployment = (id: string) => async (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      url: `/employment/${id}`,
      method: 'GET',
      onStart: () => (dispatch: Dispatch) => {
        dispatch({ type: EmploymentTypes.Loading, payload: { loading: true } });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: EmploymentTypes.Errors,
          payload: {
            errors: error.response.data
          }
        });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: EmploymentTypes.ListSpecificEmployment,
          payload: {
            data: res.data
          }
        });
      }
    })
  );
};

export const updateEmployment = (data: EmploymentParam, id: string) => async (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      url: `/employment/${id}`,
      method: 'PUT',
      data,
      onStart: () => (dispatch: Dispatch) => {
        dispatch({ type: EmploymentTypes.Loading, payload: { loading: true } });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: EmploymentTypes.Errors,
          payload: {
            errors: error.response.data
          }
        });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: EmploymentTypes.UpdateEmployment,
          payload: {
            data: res.data
          }
        });

        setMessage(res.message)(dispatch);
      }
    })
  );
};

export const changeEmploymentStatus = (values: {
  status: string;
  id: string;
}) => (dispatchAction: Dispatch) => {
  return dispatchAction(
    ApiAction({
      url: `/employment/status/${values.id}`,
      method: 'Put',
      data: { verificationStatus: values.status },
      onStart: () => dispatch => {
        dispatch({
          type: UserTypes.UserEmploymentLoading,
          payload: { loading: true }
        });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: EmploymentTypes.Errors,
          payload: {
            errors: error.response.data
          }
        });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: EmploymentTypes.ChangeEmploymentStatus,
          payload: { data: res.data }
        });
        setMessage(res.message)(dispatch);
      }
    })
  );
};
