export const REGISTER_LOADING = 'REGISTER_LOADING';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export interface Register {
  username: string;
  email: string;
  password: string;
}

export interface RegisterLoading {
  type: typeof REGISTER_LOADING;
}

export interface RegisterFail {
  type: typeof REGISTER_FAIL;
  payload: any;
}

export interface RegisterSuccess {
  type: typeof REGISTER_SUCCESS;
  payload: any;
}

export type RegisterDispatchTypes =
  | RegisterLoading
  | RegisterFail
  | RegisterSuccess;
