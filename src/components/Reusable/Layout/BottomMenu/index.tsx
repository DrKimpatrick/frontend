import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {
  Home,
  Layers,
  NotificationsOff,
  PowerSettingsNew,
  VpnKey,
  AccountCircle
} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { RootState } from 'redux/store';
import './BottomMenu.scss';
import { Routes } from 'utils/routes';

const useStyles = makeStyles({
  root: {
    color: '#616161',
    backgroundColor: '#dadada',
    position: 'fixed',
    width: '100%',
    bottom: 0
  }
});

export default function BottomMenu() {
  const history = useHistory();

  const classes = useStyles();

  const [value, setValue] = React.useState<number>(0);

  const reducer = useSelector((state: RootState) => {
    const { user } = state.users;

    return { user };
  });

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('ttlnt.refresh');

    window.location.href = '/';

    return undefined;
  };

  useEffect(() => {
    switch (value) {
      case 1:
        history.push(Routes.Account);
        break;

      case 2:
        history.push(Routes.Notification);
        break;

      default:
        break;
    }
  }, [value, history]);

  if (!reducer.user) {
    return (
      <BottomNavigation
        value={value}
        onChange={(_: any, newValue: React.SetStateAction<number>) => {
          setValue(newValue);
        }}
        showLabels
        classes={classes}
      >
        <BottomNavigationAction
          showLabel
          label="Home"
          icon={<Home />}
          data-testid="home-navigation"
          onClick={() => history.push(Routes.Home)}
        />
        <BottomNavigationAction
          showLabel
          label="Login"
          icon={<VpnKey />}
          data-testid="login"
          onClick={() => history.push(Routes.Login)}
        />
        <BottomNavigationAction
          showLabel
          label="Get Started"
          icon={<AccountCircle />}
          data-testid="signup"
          onClick={() => history.push(Routes.Register)}
        />
      </BottomNavigation>
    );
  }

  return (
    <BottomNavigation
      value={value}
      onChange={(_: any, newValue: React.SetStateAction<number>) => {
        setValue(newValue);
      }}
      showLabels
      classes={classes}
    >
      <BottomNavigationAction
        showLabel
        label="Account"
        icon={<Layers />}
        data-testid="account-navigation"
      />
      <BottomNavigationAction
        showLabel
        label="Notifications"
        icon={<NotificationsOff />}
        data-testid="notification-navigation"
      />
      <BottomNavigationAction
        showLabel
        label="Logout"
        icon={<PowerSettingsNew />}
        data-testid="logout"
        onClick={logout}
      />
    </BottomNavigation>
  );
}
