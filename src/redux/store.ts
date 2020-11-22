import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import apiMiddleware from 'middleware/apiMiddleware';
import rootReducer from './reducers/rootReducer';

const middleware = [apiMiddleware];

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
