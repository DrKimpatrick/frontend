import { combineReducers } from 'redux';
import { userReducer } from './users';
import { employmentReducer } from './employment';
import { messageReducer } from './message';
import { educationReducer } from './education';
import { courseReducer } from './course';
import { skillReducer } from './skill';
import { companyReducer } from './company';
import { schoolReducer } from './school';
import { hrAdminReducer } from './hrAdmin';
import { questionReducer } from './question';
import { testReducer } from './testsetup';

const rootReducer = combineReducers({
  users: userReducer,
  employments: employmentReducer,
  messages: messageReducer,
  educations: educationReducer,
  courses: courseReducer,
  skills: skillReducer,
  schools: schoolReducer,
  companies: companyReducer,
  hrAdmin: hrAdminReducer,
  questions: questionReducer,
  tests: testReducer
});

export default rootReducer;
