import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Router } from './components/Router';
import { RootState } from './redux/store';
import { setMessage } from './redux/actions/message/message';
import { listCurrentUser, listAllSkill } from './redux/actions/user';

const App = () => {
  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { message, error } = state.messages;

    const { user, currentUser } = state.users;

    return { message, error, user, currentUser };
  });

  useEffect(() => {
    if (reducer.message) {
      setTimeout(() => {
        setMessage()(dispatch);
      }, 1000);
    }
  }, [dispatch, reducer.message]);

  useEffect(() => {
    if (reducer.currentUser.isLoggedIn) {
      listCurrentUser()(dispatch);
      listAllSkill()(dispatch);
    }
  }, [dispatch, reducer.currentUser.isLoggedIn]);

  return <Router />;
};

export default App;
