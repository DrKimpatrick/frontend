import React, { ReactElement } from 'react';
import NavBar from './NavBar/NavBar';
import Footer from './Footer';
import useWindowSize from 'utils/useWindowSize';
import BottomMenu from './BottomMenu/index';

interface Props {
  children: ReactElement;
}

function Layout({ children }: Props): ReactElement {
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
