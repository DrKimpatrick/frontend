export const CURRENT_ROLE_LOADING = 'CURRENT_ROLE_LOADING';
export const CURRENT_ROLE_FAIL = 'CURRENT_ROLE_FAIL';
export const CURRENT_ROLE_SUCCESS = 'FORGOT_SUCCESS';

export interface CurrentRole {
    email: string
}

export interface currentRoleLoading  {
    type: typeof CURRENT_ROLE_LOADING
}

export interface currentRoleFail  {
    type: typeof CURRENT_ROLE_FAIL,
    payload: string
}

export interface currentRoleSuccess  {
    type: typeof CURRENT_ROLE_SUCCESS,
    payload: any
}

export type CurrentRoleDispatchTypes = currentRoleLoading | currentRoleFail | currentRoleSuccess;
