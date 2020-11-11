import { MessageActionType, MessageTypes } from '../../action-types/message';

interface InitialState {
  readonly message?: string;
  readonly error?: string;
}
const initialState: InitialState = {};

export const messageReducer = (
  state = initialState,
  action: MessageActionType
) => {
  switch (action.type) {
    case MessageTypes.Message:
      return { ...state, message: action.payload.message };

    case MessageTypes.Error:
      return { ...state, error: action.payload.error };

    default:
      return state;
  }
};
