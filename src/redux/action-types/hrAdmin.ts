import { HrAdmin } from 'redux/actions/hrAdmin';
import { User } from 'redux/action-types/user';

export enum HrAdminType {
  Loading = 'HrAdminType/Loading',
  ListUsedCode = 'HrAdminType/ListUsedCode',
  Errors = 'HrAdminType/Errors',
  GetSearchedTalents = 'HrAdminType/GetSearchedTalents',
  ClearSearchedResults = 'HrAdminType/ClearSearchedResults'
}

interface Loading {
  type: typeof HrAdminType.Loading;
  payload: {
    loading: boolean;
  };
}

interface Errors {
  type: typeof HrAdminType.Errors;
  payload: {
    errors: any;
  };
}

interface ListUsedCode {
  type: typeof HrAdminType.ListUsedCode;
  payload: {
    data: HrAdmin[];
  };
}

interface GetSearchedTalents {
  type: typeof HrAdminType.GetSearchedTalents;
  payload: {
    data: User[];
  };
}

interface ClearSearchedResults {
  type: typeof HrAdminType.ClearSearchedResults;
}

export type HrAdminActionType =
  | Loading
  | ListUsedCode
  | Errors
  | GetSearchedTalents
  | ClearSearchedResults;
