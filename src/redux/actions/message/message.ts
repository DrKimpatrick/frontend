import { Dispatch } from 'redux';
import { MessageTypes } from 'redux/action-types/message';

export const setMessage = (message?: string) => (dispatch: Dispatch) => {
  dispatch({ type: MessageTypes.Message, payload: { message } });
};

export const setError = (message: string) => (dispatch: Dispatch) => {
  dispatch({ type: MessageTypes.Error, payload: { message } });
};
