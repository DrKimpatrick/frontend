import { Dispatch } from 'redux';
import ApiAction from '../../../helpers/apiAction';
import { EmploymentParam } from '../../action-types/employment';
import { setMessage } from '../message';

export enum EmploymentTypes {
  AddEmployment = 'employment/AddEmployment',
  DeleteEmployment = 'employment/DeleteEmployment',
  ListEmployments = 'employment/ListEmployments',
  ListSpecificEmployment = 'employment/ListSpecificEmployment',
  UpdateEmployment = 'employment/UpdateEmployment',
  Errors = 'employment/Errors',
  Loading = 'employment/Loading',
  Success = 'employment/Success'
}

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
