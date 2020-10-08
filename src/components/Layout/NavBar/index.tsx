import React from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import LayersIcon from '@material-ui/icons/Layers';
import logo from 'assets/images/logo-image.png';
import InitialStateInterface from 'types/initialState';
import useWindowSize from 'utils/useWindowSize';
import './NavBar.scss';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      overflowWrap: 'normal',
      whiteSpace: 'normal'
    }
  })
);

const typedUseSelector: TypedUseSelectorHook<InitialStateInterface> = useSelector;

interface Props {}

const NavBar = (props: Props) => {
  const { currentUser } = typedUseSelector(({ users }) => users);
  const size = useWindowSize();

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const anchorNotificationRef = React.useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleNotificationClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorNotificationRef.current &&
      anchorNotificationRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setNotificationOpen(false);
  };

  const handleToggleNotification = () => {
    setNotificationOpen(prevOpen => !prevOpen);
  };

  const renderUser = () => {
    const { isLoggedIn, data } = currentUser;
    if (isLoggedIn) {
      return (
        <div className="user-info lg:inline-flex items-center">
          <div className="px-8 lg:inline-flex items-center space-x-6">
            <div className={classes.root}>
              <div>
                <ClickAwayListener onClickAway={handleNotificationClose}>
                  <div
                    ref={anchorNotificationRef}
                    aria-controls={
                      notificationOpen ? 'menu-list-grow' : undefined
                    }
                    aria-haspopup="true"
                    className="notification-container"
                  >
                    {!notificationOpen ? (
                      <div
                        className="text-gray-600 relative notification-icon"
                        onClick={handleToggleNotification}
                      >
                        <div
                          style={{ fontSize: '6px' }}
                          className="bg-white text-red-600 h-3 w-3 rounded-full absolute right-0 top-0 flex items-center justify-center border-red-600 border border-solid"
                        >
                          <span>9+</span>
                        </div>
                        <NotificationsIcon
                          style={{ color: '#ff0000' }}
                          className="cursor-pointer"
                        />
                      </div>
                    ) : (
                      <div
                        className="text-gray-600 relative notification-icon"
                        onClick={handleToggleNotification}
                      >
                        <NotificationsOffIcon className="cursor-pointer" />
                      </div>
                    )}

                    <div
                      className={`header-popup tri-right border right-top ${
                        notificationOpen ? 'show' : 'hide'
                      }`}
                    >
                      <div className="text-gray-600 w-56 space-x-2 text-sm py-2 flex ">
                        <span className="text-red-600 font-bold">1</span>
                        <div className="flex flex-col w-full flex-wrap">
                          <span className="text-red-600 font-bold">
                            You have been verified
                          </span>
                          <p className="break-normal">
                            Check your email for the link verification
                          </p>
                        </div>
                      </div>
                      <div className="text-gray-600 w-56 space-x-2 text-sm py-2 flex ">
                        <span className="text-red-600 font-bold">1</span>
                        <div className="flex flex-col w-full flex-wrap">
                          <span className="text-red-600 font-bold">
                            You have been verified
                          </span>
                          <p className="break-normal">
                            Check your email for the link verification
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ClickAwayListener>
              </div>
            </div>

            <div className="text-gray-600 relative ">
              <LayersIcon />
            </div>
          </div>
          <div className="text-gray-600">
            <span>{data.firstName}</span>&nbsp;<span>{data.lastName}</span>
          </div>

          <div className={classes.root}>
            <div>
              <ClickAwayListener onClickAway={handleClose}>
                <div
                  ref={anchorRef}
                  aria-controls={open ? 'menu-list-grow' : undefined}
                  aria-haspopup="true"
                  className="profile-container"
                >
                  <div
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                  >
                    <img
                      className="inline-block ml-2 h-12 w-12 rounded-full text-white shadow-solid cursor-pointer"
                      src={data.profilePicture}
                      alt="avatar"
                    />
                  </div>

                  <div
                    className={`header-popup tri-left border right-top ${
                      open ? 'show' : 'hide'
                    }`}
                  >
                    <MenuList>
                      <MenuItem onClick={handleClose} className="text-gray-600">
                        <div className="text-gray-600 w-56 space-x-3 text-sm py-2">
                          <SettingsIcon />
                          <span>Settings</span>
                        </div>
                      </MenuItem>
                      <MenuItem onClick={handleClose} className="text-gray-600">
                        <div className="text-gray-600 w-56 space-x-3 text-sm py-2">
                          <PowerSettingsNewIcon />
                          <span>Logout</span>
                        </div>
                      </MenuItem>
                    </MenuList>
                  </div>
                </div>
              </ClickAwayListener>
            </div>
          </div>
        </div>
      );
    }
    return (
      <>
        <Link
          to="#"
          className="lg:inline-flex lg:w-auto w-full px-8 py-2 rounded text-gray-600 items-center justify-center hover:text-gray-700"
        >
          <span>Login</span>
        </Link>

        <Link
          to="#"
          className="lg:inline-flex lg:w-auto w-full px-8 py-2 rounded items-center justify-center bg-getstartColor hover:bg-blue-800 text-white"
        >
          <span>Get started</span>
        </Link>
      </>
    );
  };

  return size?.width && size?.width > 768 ? (
    <nav className="flex items-center bg-white-800 px-20 py-5 flex-wrap">
      <Link className="text-gray-800" to="/">
        <img src={logo} alt="logo" className="logo w-24" />
      </Link>
      <div
        className="hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto"
        id="navigation"
      >
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
          <Link
            to="#"
            className="lg:inline-flex lg:w-auto w-full px-8 py-2 rounded text-gray-600 items-center justify-center hover:text-gray-700"
          >
            <span>How it works</span>
          </Link>
          <Link
            to="#"
            className="lg:inline-flex lg:w-auto w-full px-8 py-2 rounded text-gray-600 items-center justify-center hover:text-gray-700"
          >
            <span>About us</span>
          </Link>

          {renderUser()}
        </div>
      </div>
    </nav>
  ) : (
    <div className="header-container">
      <div className="header-background" />
      <nav className="flex items-center justify-center">
        <img src={logo} alt="logo" className="logo w-32 py-3" />
      </nav>
    </div>
  );
};

export default NavBar;
