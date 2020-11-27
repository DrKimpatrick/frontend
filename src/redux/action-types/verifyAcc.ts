export const VERIFY_LOADING = 'VERIFY_LOADING';
export const VERIFY_FAIL = 'VERIFY_FAIL';
export const VERIFY_SUCCESS = 'VERIFY_SUCCESS';

export interface VerifyPass {
  token: any;
}

export interface VerifyLoading {
  type: typeof VERIFY_LOADING;
}

export interface VerifyFail {
  type: typeof VERIFY_FAIL;
  payload: string;
}

export interface VerifySuccess {
  type: typeof VERIFY_SUCCESS;
  payload: any;
}

export type VerifyDispatchTypes = VerifyLoading | VerifyFail | VerifySuccess;
