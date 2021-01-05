import React, { ReactElement } from 'react';
import useWindowSize from 'utils/useWindowSize';
import { useHistory, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../Layout.scss';
import { RootState } from 'redux/store';
import { redirect } from 'utils/Redirect';
import { BottomMenu, Footer } from '..';

interface Props {
  children: ReactElement;
}

const AuthLayout = ({ children }: Props): ReactElement => {
  const userState = useSelector((state: RootState) => state.users);

  const history = useHistory();

  const size = useWindowSize();

  const redirectBack = () => {
    if (userState.user && redirect(userState.user.roles)) {
      const redirectRoute = redirect(userState.user.roles);

      if (redirectRoute) {
        return <Redirect to={redirectRoute} />;
      }
    }
    history.goBack();

    return undefined;
  };

  return (
    <>
      {!userState.user ? (
        <div className="dashboard_layout">
          <div className="grid-container">
            <div className="main">
              <main>{children}</main>
            </div>
            {size?.width && size?.width > 768 ? <Footer /> : <BottomMenu />}
          </div>
        </div>
      ) : (
        <>{redirectBack()}</>
      )}
    </>
  );
};

export default AuthLayout;
