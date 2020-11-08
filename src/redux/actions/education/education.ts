import { Dispatch } from 'redux';
import { InitialValue } from 'components/userDashboard/Education';
import ApiAction from '../../../helpers/apiAction';
import { setMessage } from '../message';

export enum EducationTypes {
  AddEducation = 'Education/AddEducation',
  DeleteEducation = 'Education/DeleteEducation',
  UpdateEducation = 'Education/UpdateEducation',
  ListEducation = 'Education/ListEducation',
  ListSpecificEducation = 'Education/ListSpecificEducation',
  Errors = 'Education/Errors',
  Loading = 'Education/Loading'
}

export const addEducation = (data: InitialValue) => (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      url: '/education',
      method: 'POST',
      data,
      onStart: () => (dispatch: Dispatch) =>
        dispatch({ type: EducationTypes.Loading, payload: { loading: true } }),
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: EducationTypes.Errors,
          payload: {
            errors: error.response.data
          }
        });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: EducationTypes.AddEducation,
          payload: { data: res.data }
        });
        setMessage('education saved successfully')(dispatch);
      }
    })
  );
};

export const listEducation = () => (dispatchAction: Dispatch) => {
  return dispatchAction(
    ApiAction({
      url: '/education',
      method: 'GET',
      onStart: () => (dispatch: Dispatch) => {
        dispatch({ type: EducationTypes.Loading, payload: { loading: true } });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: EducationTypes.Errors,
          payload: {
            errors: error.response.data
          }
        });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        if (res.data) {
          dispatch({
            type: EducationTypes.ListEducation,
            payload: {
              data: res.data
            }
          });
        }
      }
    })
  );
};

export const listSpecificEducation = (userId: string, educationId: string) => (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      url: `/education/${userId}/${educationId}`,
      method: 'GET',
      onStart: () => (dispatch: Dispatch) =>
        dispatch({ type: EducationTypes.Loading, payload: { loading: true } }),
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: EducationTypes.Errors,
          payload: {
            errors: error.response.data
          }
        });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: EducationTypes.ListSpecificEducation,
          payload: { data: res.data }
        });
      }
    })
  );
};

export const updateEducation = (
  data: InitialValue,
  userId: string,
  educationId: string
) => (dispatchAction: Dispatch) => {
  return dispatchAction(
    ApiAction({
      url: `/education/${userId}/${educationId}`,
      method: 'PATCH',
      data,
      onStart: () => (dispatch: Dispatch) =>
        dispatch({ type: EducationTypes.Loading, payload: { loading: true } }),
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: EducationTypes.Errors,
          payload: {
            errors: error.response.data
          }
        });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: EducationTypes.UpdateEducation,
          payload: { data: res.data }
        });
        setMessage('education updated successfully')(dispatch);
      }
    })
  );
};

export const deleteEducation = (educationId: string) => (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      url: `/education/${educationId}`,
      method: 'Delete',
      onStart: () => (dispatch: Dispatch) =>
        dispatch({ type: EducationTypes.Loading, payload: { loading: true } }),
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: EducationTypes.Errors,
          payload: {
            errors: error.response.data
          }
        });
      },
      onSuccess: () => (dispatch: Dispatch) => {
        dispatch({
          type: EducationTypes.DeleteEducation,
          payload: { id: educationId }
        });
        setMessage('education deleted successfully')(dispatch);
      }
    })
  );
};
