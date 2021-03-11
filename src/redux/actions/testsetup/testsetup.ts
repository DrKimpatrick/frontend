import { Dispatch } from 'redux';
import ApiAction from 'helpers/apiAction';
import { ApiEndPoint } from 'utils/ApiEndpoints';
import { setMessage } from 'redux/actions/message';
import { TestTypes } from 'redux/action-types/test';
import { AddTestParamType } from './interface';

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
