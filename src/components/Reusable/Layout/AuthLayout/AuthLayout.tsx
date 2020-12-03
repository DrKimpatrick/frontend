import React, { ReactElement } from 'react';
import useWindowSize from 'utils/useWindowSize';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../Layout.scss';
import { BottomMenu, Footer } from '..';

interface Props {
  children: ReactElement;
}

const AuthLayout = ({ children }: Props): ReactElement => {
  const userState: any = useSelector((state: any) => state.users);

  const history = useHistory();

  const size = useWindowSize();

  if (userState.user) {
    history.goBack();
    return <></>;
  }

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
};

export default AuthLayout;
