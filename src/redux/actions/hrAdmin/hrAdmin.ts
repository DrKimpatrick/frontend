import { Dispatch } from 'redux';
import { HrAdminType } from 'redux/action-types/hrAdmin';
import ApiAction from 'helpers/apiAction';

export const listUsedCode = () => (dispatchAction: Dispatch) => {
  return dispatchAction(
    ApiAction({
      url: '/stripe/coupons/issued',
      method: 'GET',
      onStart: () => (dispatch: Dispatch) => {
        dispatch({ type: HrAdminType.Loading, payload: { loading: true } });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: HrAdminType.ListUsedCode,
          payload: { data: res.coupons }
        });

        dispatch({ type: HrAdminType.Loading, payload: { loading: false } });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: HrAdminType.Errors,
          payload: { errors: error?.response?.data }
        });

        dispatch({ type: HrAdminType.Loading, payload: { loading: false } });
      }
    })
  );
};

export const getSearchedTalents = (query?: string, cancelToken?: any) => (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      url: `/users/talent${query}`,
      method: 'GET',
      httpOptions: { cancelToken },
      onStart: () => (dispatch: Dispatch) => {
        dispatch({ type: HrAdminType.Loading, payload: { loading: true } });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: HrAdminType.GetSearchedTalents,
          payload: { data: res.data }
        });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: HrAdminType.Errors,
          payload: { errors: error?.response?.data.message }
        });

        dispatch({ type: HrAdminType.Loading, payload: { loading: false } });
      }
    })
  );
};

export const clearSearchedResults = () => (dispatchAction: Dispatch) => {
  dispatchAction({
    type: HrAdminType.ClearSearchedResults
  });
};
