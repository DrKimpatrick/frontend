import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import LayersIcon from '@material-ui/icons/Layers';
import { useHistory } from 'react-router-dom';
import './BottomMenu.scss';

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
  useEffect(() => {
    switch (value) {
      case 0:
        history.push('/home');
        break;

      case 1:
        history.push('/account');
        break;

      case 2:
        history.push('/notification');
        break;

      default:
        break;
    }
  }, [value, history]);

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
        icon={<HomeIcon />}
        data-testid="home-navigation"
      />
      <BottomNavigationAction
        showLabel
        label="Account"
        icon={<LayersIcon />}
        data-testid="account-navigation"
      />
      <BottomNavigationAction
        showLabel
        label="Notifications"
        icon={<NotificationsOffIcon />}
        data-testid="notification-navigation"
      />
    </BottomNavigation>
  );
}
