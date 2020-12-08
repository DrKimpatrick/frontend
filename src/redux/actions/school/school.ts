import { Dispatch } from 'redux';
import { setProfileProcess } from 'redux/actions/user';
import { CompanyOrSchool as ISchool } from '../../action-types/company';
import { SchoolTypes } from '../../action-types/school';
import ApiAction from '../../../helpers/apiAction';
import { setMessage } from '../message';

export const addSchool = (
  data: ISchool,
  userInfo?: { userId: string; profileProcess: string }
) => (dispatchAction: Dispatch) => {
  return dispatchAction(
    ApiAction({
      url: '/school',
      method: 'POST',
      data,
      onStart: () => (dispatch: Dispatch) =>
        dispatch({ type: SchoolTypes.Loading, payload: { loading: true } }),
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: SchoolTypes.Errors,
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
          type: SchoolTypes.AddSchool,
          payload: { data: res.data }
        });
        setMessage('School created successfully')(dispatch);
      }
    })
  );
};
