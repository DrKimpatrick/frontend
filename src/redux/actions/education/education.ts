import { Dispatch } from 'redux';
import { InitialEducationValue as InitialValue } from 'components/Talent/Dashboard/Education';
import { EducationTypes } from 'redux/action-types/education';
import { UserTypes } from 'redux/action-types/user';
import { setProfileProcess } from 'redux/actions/user';
import ApiAction from '../../../helpers/apiAction';
import { setMessage } from '../message';

export const addEducation = (
  data: InitialValue,
  userInfo?: { userId: string; profileProcess: string }
) => (dispatchAction: Dispatch) => {
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
        if (userInfo && userInfo.profileProcess && userInfo.userId) {
          setProfileProcess({
            userId: userInfo.userId,
            profileProcess: userInfo.profileProcess
          })(dispatch);
        }
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
        dispatch({ type: EducationTypes.Loading, payload: { loading: false } });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({ type: EducationTypes.Loading, payload: { loading: false } });
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

export const changeEducationStatus = (values: {
  status: string;
  id: string;
}) => (dispatchAction: Dispatch) => {
  return dispatchAction(
    ApiAction({
      url: `/education/status/${values.id}`,
      method: 'Put',
      data: { verificationStatus: values.status },
      onStart: () => dispatch => {
        dispatch({
          type: UserTypes.UserEducationLoading,
          payload: { loading: true }
        });
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
        dispatch({
          type: EducationTypes.ChangeEducationStatus,
          payload: { data: res.data }
        });
        setMessage(res.message)(dispatch);
      }
    })
  );
};
