import { combineReducers } from 'redux';
import { userReducer } from './users';
import { employmentReducer } from './employment';
import { messageReducer } from './message';
import { educationReducer } from './education';
import { courseReducer } from './course';
import { skillReducer } from './skill';
import { companyReducer } from './company';
import { schoolReducer } from './school';

const rootReducer = combineReducers({
  users: userReducer,
  employments: employmentReducer,
  messages: messageReducer,
  educations: educationReducer,
  courses: courseReducer,
  skills: skillReducer,
  schools: schoolReducer,
  companies: companyReducer
});

export default rootReducer;
