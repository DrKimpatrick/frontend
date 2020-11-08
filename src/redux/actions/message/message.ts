import { Dispatch } from 'redux';

export enum MessageTypes {
  Message = 'UserType/Message',
  Error = 'MessageType/Error'
}

export const setMessage = (message?: string) => (dispatch: Dispatch) => {
  dispatch({ type: MessageTypes.Message, payload: { message } });
};

export const setError = (message: string) => (dispatch: Dispatch) => {
  dispatch({ type: MessageTypes.Error, payload: { message } });
};
