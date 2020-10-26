export const RESET_LOADING = 'RESET_LOADING';
export const RESET_FAIL = 'RESET_FAIL';
export const RESET_SUCCESS = 'RESET_SUCCESS';

export interface ResetPass {
    password: string,
    "confirm-password": string,
    token: any

}

export interface ResetLoading  {
    type: typeof RESET_LOADING
}

export interface ResetFail  {
    type: typeof RESET_FAIL,
    payload: string
}

export interface ResetSuccess  {
    type: typeof RESET_SUCCESS,
    payload: any
}

export type ResetDispatchTypes = ResetLoading | ResetFail | ResetSuccess;
