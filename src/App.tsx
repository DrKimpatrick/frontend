import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Router } from './components/Router';
import { RootState } from './redux/store';
import { setMessage } from './redux/actions/message/message';
import { listCurrentUser, listAllSkill } from './redux/actions/user';

axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
  'token'
)}`;

const App = () => {
  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { message, error } = state.messages;

    const { user } = state.users;

    return { message, error, user };
  });

  useEffect(() => {
    if (reducer.message) {
      setTimeout(() => {
        setMessage()(dispatch);
      }, 1000);
    }
  }, [dispatch, reducer.message]);

  useEffect(() => {
    listCurrentUser()(dispatch);
    listAllSkill()(dispatch);
  }, [dispatch]);

  return <Router />;
};

export default App;
