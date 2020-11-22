import { combineReducers } from 'redux';
import { userReducer } from './users';
import { employmentReducer } from './employment';
import { messageReducer } from './message';
import { educationReducer } from './education';
import { courseReducer } from './course';

const rootReducer = combineReducers({
  users: userReducer,
  employments: employmentReducer,
  messages: messageReducer,
  educations: educationReducer,
  courses: courseReducer
});

export default rootReducer;
