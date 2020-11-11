import React, { ReactElement } from 'react';
import useWindowSize from 'utils/useWindowSize';
import { BottomMenu, Footer } from '.';
import './styles.scss';

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
