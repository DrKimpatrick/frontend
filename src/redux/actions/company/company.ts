import { Dispatch } from 'redux';
import { setProfileProcess } from 'redux/actions/user';
import {
  CompanyOrSchool as ICompany,
  CompanyTypes
} from '../../action-types/company';
import ApiAction from '../../../helpers/apiAction';
import { setMessage } from '../message';

export const addCompany = (
  data: ICompany,
  userInfo?: { userId: string; profileProcess: string }
) => (dispatchAction: Dispatch) => {
  return dispatchAction(
    ApiAction({
      url: '/company',
      method: 'POST',
      data,
      onStart: () => (dispatch: Dispatch) =>
        dispatch({ type: CompanyTypes.Loading }),
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: CompanyTypes.Errors,
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
          type: CompanyTypes.AddCompany,
          payload: { data: res.data }
        });
        setMessage('Company created successfully')(dispatch);
      }
    })
  );
};
