import { combineReducers } from 'redux';
import userReducers from './users';
import { employmentReducer } from './employment';
import { messageReducer } from './message';
import { educationReducer } from './education';

const rootReducer = combineReducers({
  users: userReducers,
  employments: employmentReducer,
  messages: messageReducer,
  educations: educationReducer
});

export default rootReducer;
