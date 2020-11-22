import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { NavBar, MainBackground } from '..';
import { AdminMenu } from '.';
import './AdminLayout.scss';

interface Props {
  title?: string;
  topMenu?: { url: string; name: string }[];
}

export const AdminLayout: FC<Props & WithStyles> = props => {
  const { children, classes, topMenu } = props;
  return (
    <div className="adminLayout">
      <NavBar />
      <div
        className="px-20"
        style={{
          paddingLeft: '6rem',
          paddingRight: '6rem',
          position: 'relative',
          paddingTop: '2rem'
        }}
      >
        {topMenu && (
          <div className="pageDirection">
            <Button type="button" className={classes.backButton}>
              <ArrowBack />
            </Button>
            <ul>
              {topMenu.length > 0 &&
                topMenu.map((item, index) => (
                  <li key={index}>
                    <Link to={`${item.url}`}>{item.name}</Link>
                  </li>
                ))}
            </ul>
          </div>
        )}
        <div className="layoutContainer">
          <AdminMenu />

          <div
            style={{ flexGrow: 1, position: 'relative', marginLeft: '20px' }}
          >
            {children}
          </div>
        </div>
      </div>
      <div className="customBackground">
        <MainBackground />
      </div>
    </div>
  );
};

const styles = {
  backButton: {
    padding: 0,
    outline: 'none',
    boxShadow: 'none',
    background: 'none !important'
  }
};

export default withStyles(styles)(AdminLayout);
