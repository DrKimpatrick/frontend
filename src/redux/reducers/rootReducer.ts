import { combineReducers } from 'redux';
// import InitialStateInterface from 'types/initialState';
import userReducers from './users';

const rootReducer = combineReducers<any>({
  users: userReducers
});

export default rootReducer;