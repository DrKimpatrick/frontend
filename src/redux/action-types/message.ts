export enum MessageTypes {
  Message = 'UserType/Message',
  Error = 'MessageType/Error'
}

export interface SetMessage {
  type: typeof MessageTypes.Message;
  payload: {
    message: string;
  };
}

export interface SetError {
  type: typeof MessageTypes.Error;
  payload: {
    error: string;
  };
}

export type MessageActionType = SetMessage | SetError;
