export const FORGOT_LOADING = 'FORGOT_LOADING';
export const FORGOT_FAIL = 'FORGOT_FAIL';
export const FORGOT_SUCCESS = 'FORGOT_SUCCESS';

export interface ForgotPass {
    email: string
}

export interface ForgotLoading  {
    type: typeof FORGOT_LOADING
}

export interface ForgotFail  {
    type: typeof FORGOT_FAIL,
    payload: string
}

export interface ForgotSuccess  {
    type: typeof FORGOT_SUCCESS,
    payload: any
}

export type ForgotDispatchTypes = ForgotLoading | ForgotFail | ForgotSuccess;
