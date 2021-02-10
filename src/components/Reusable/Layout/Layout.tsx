import React, { ReactElement, useEffect } from 'react';
import useWindowSize from 'utils/useWindowSize';
import { useHistory, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import './Layout.scss';
import { listAllSkill, listCurrentUser } from 'redux/actions/user';
import { BottomMenu, Footer } from '.';

interface Props {
  children: ReactElement;
}

function Layout({ children }: Props): ReactElement {
  const userState: any = useSelector((state: any) => state.users);
  const history = useHistory();

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const data = new URLSearchParams(location.search).get('data') || null;
    const getCurrentUser = async () => {
      if (data) {
        const { token, refresh } = JSON.parse(atob(data));
        if (token && refresh) {
          await localStorage.setItem('token', token);
          await localStorage.setItem('ttlnt.refresh', refresh);
        }
      }

      await listCurrentUser()(dispatch);
      await listAllSkill()(dispatch);

      if (!userState.currentUser.isLoggedIn && !data) {
        history.push('/login');
      }
    };
    getCurrentUser();
  }, [location.search, dispatch, userState.currentUser.isLoggedIn, history]);

  const size = useWindowSize();

  return (
    <div className="dashboard_layout">
      <div className="grid-container">
        <div className="main">
          <main>{children}</main>
        </div>
        {size?.width && size?.width > 768 ? <Footer /> : <BottomMenu />}
      </div>
    </div>
  );
}

export default Layout;
