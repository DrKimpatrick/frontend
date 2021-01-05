import { HrAdmin } from 'redux/actions/hrAdmin';

export enum HrAdminType {
  Loading = 'HrAdminType/Loading',
  ListUsedCode = 'HrAdminType/ListUsedCode',
  Errors = 'HrAdminType/Errors'
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

export type HrAdminActionType = Loading | ListUsedCode | Errors;
