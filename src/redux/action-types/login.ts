export const LOGIN_LOADING = 'LOGIN_LOADING';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export interface Login {
  username: string;
  password: string;
}

export interface LoginLoading {
  type: typeof LOGIN_LOADING;
}

export interface LoginFail {
  type: typeof LOGIN_FAIL;
  payload: string;
}

export interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: any;
}

export type LoginDispatchTypes = LoginLoading | LoginFail | LoginSuccess;
