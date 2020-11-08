import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import apiMiddleware from 'middleware/apiMiddleware';
import rootReducer from './reducers/rootReducer';
import initialState from './initialState';

const middleware = [apiMiddleware];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
