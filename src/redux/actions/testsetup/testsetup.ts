import { Dispatch } from 'redux';
import ApiAction from 'helpers/apiAction';
import { ApiEndPoint } from 'utils/ApiEndpoints';
import { setMessage } from 'redux/actions/message';
import { TestTypes } from 'redux/action-types/test';
import { AddTestParamType } from './interface';

export const clearTest = () => (dispatchAction: Dispatch) => {
  return dispatchAction({
    type: TestTypes.ClearTest,
    payload: { data: {} }
  });
};

export const getAllTests = () => (dispatchAction: Dispatch) => {
  return dispatchAction(
    ApiAction({
      method: 'GET',
      url: ApiEndPoint.test,
      onStart: () => (dispatch: Dispatch) => {
        dispatch({
          type: TestTypes.GetAllTestLoading,
          payload: { loading: true }
        });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: TestTypes.GetAllTestLoading,
          payload: { loading: false }
        });
        dispatch({
          type: TestTypes.GetAllTestErrors,
          payload: { errors: error.response.data }
        });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: TestTypes.GetAllTestLoading,
          payload: { loading: false }
        });
        dispatch({
          type: TestTypes.GetAllTest,
          payload: { data: res.data }
        });
      }
    })
  );
};

export const createTestAction = (value: AddTestParamType) => (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      method: 'POST',
      data: value,
      url: ApiEndPoint.test,
      onStart: () => (dispatch: Dispatch) => {
        dispatch({
          type: TestTypes.CreateTestLoading,
          payload: { loading: true }
        });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: TestTypes.CreateTestLoading,
          payload: { loading: false }
        });
        dispatch({
          type: TestTypes.CreateTestErrors,
          payload: { errors: error.response.data }
        });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: TestTypes.CreateTestLoading,
          payload: { loading: false }
        });
        dispatch({
          type: TestTypes.CreateTestSuccess,
          payload: { data: res.data }
        });
        setMessage(res.message)(dispatch);
      }
    })
  );
};

export const updateTestAction = (values: AddTestParamType, id: string) => (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      url: `/test/${id}`,
      method: 'PUT',
      data: {
        name: values.name,
        description: values.description,
        timePolicy: values.timePolicy,
        status: values.status
      },
      onStart: () => dispatch => {
        dispatch({
          type: TestTypes.UpdateTestLoading,
          payload: { loading: true }
        });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: TestTypes.UpdateTestErrors,
          payload: { loading: false }
        });
        dispatch({
          type: TestTypes.UpdateTestLoading,
          payload: { errors: error.response.data }
        });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: TestTypes.UpdateTestLoading,
          payload: { loading: false }
        });
        dispatch({
          type: TestTypes.UpdateTestSuccess,
          payload: { data: res.data }
        });
        setMessage(res.message)(dispatch);
      }
    })
  );
};

export const getSingleTestAction = (testId: string) => (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      method: 'GET',
      url: ApiEndPoint.singleTest(testId),
      onStart: () => (dispatch: Dispatch) => {
        dispatch({
          type: TestTypes.GetSingleTestLoading,
          payload: { loading: true }
        });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: TestTypes.GetSingleTestLoading,
          payload: { loading: false }
        });
        dispatch({
          type: TestTypes.GetSingleTestErrors,
          payload: { errors: error.response.data }
        });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: TestTypes.GetSingleTestLoading,
          payload: { loading: false }
        });
        dispatch({
          type: TestTypes.GetSingleTestSuccess,
          payload: { data: res.data }
        });

        setMessage(res.message)(dispatch);
      }
    })
  );
};
