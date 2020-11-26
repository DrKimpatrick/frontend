import React, { ReactElement, useEffect } from 'react';
import useWindowSize from 'utils/useWindowSize';
import { useHistory } from 'react-router-dom';
import { BottomMenu, Footer } from '.';
import { useDispatch, useSelector } from 'react-redux';
import './Layout.scss';
import { listAllSkill, listCurrentUser } from 'redux/actions/user';

interface Props {
  children: ReactElement;
}

function Layout({ children }: Props): ReactElement {

  const userState: any = useSelector((state: any) => state.users);
  const history = useHistory();

  const dispatch = useDispatch()

  useEffect(() => {
    if(!userState.currentUser.isLoggedIn){
      history.push('/login')
    }
    const fetchInit = async () => {
      await listCurrentUser()(dispatch);
      await listAllSkill()(dispatch);
    }

    fetchInit()
  }, [userState.currentUser.isLoggedIn, history])
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
