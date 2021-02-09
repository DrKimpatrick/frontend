import React, { useState, useRef, MouseEvent, useEffect } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Dashboard, PowerSettingsNew } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import InitialStateInterface from 'types/initialState';
import { Routes } from 'utils/routes';
import UserAvatar from 'assets/images/avatar.jpg';
import { redirect } from 'utils/Redirect';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      overflowWrap: 'normal',
      whiteSpace: 'normal',
      paddingRight: '2.5rem'
    }
  })
);

const typedUseSelector: TypedUseSelectorHook<InitialStateInterface> = useSelector;
const IsLoggedIn = (props: any) => {
  const [open, setOpen] = useState(false);

  // const [notificationOpen, setNotificationOpen] = useState(false);

  const { currentUser } = typedUseSelector(({ users }) => users);

  const [dashboardLink, setDashboardLink] = useState<string>();

  const { isLoggedIn, data } = currentUser;

  const classes = useStyles();

  const history = useHistory();

  const { userDashboard, user } = props;

  const anchorRef = useRef<HTMLDivElement>(null);

  // const anchorNotificationRef = useRef<HTMLDivElement>(null);

  const userState: any = useSelector((state: any) => state.users);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const signup = () => {
    props.history.push(Routes.Register);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('ttlnt.refresh');

    window.location.href = '/';

    return undefined;
  };

  const handleClose = (event: MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  // const handleNotificationClose = (event: MouseEvent<EventTarget>) => {
  //   if (
  //     anchorNotificationRef.current &&
  //     anchorNotificationRef.current.contains(event.target as HTMLElement)
  //   ) {
  //     return;
  //   }

  //   setNotificationOpen(false);
  // };

  // const handleToggleNotification = () => {
  //   setNotificationOpen(prevOpen => !prevOpen);
  // };

  useEffect(() => {
    if (user && user.roles) {
      if (user.roles) {
        const link = redirect(user.roles);

        setDashboardLink(link);
      } else {
        setDashboardLink(Routes.Account);
      }
    }
  }, [user]);

  if (isLoggedIn || userState?.isLoggedIn) {
    return (
      <div
        className={`lg:inline-flex items-center ${userDashboard && '-mt-24'}`}
      >
        {/* <div className="px-8 lg:inline-flex items-center">
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
                      <Notifications
                        style={{ color: '#ff0000' }}
                        className="cursor-pointer"
                      />
                    </div>
                  ) : (
                    <div
                      className="text-gray-600 relative notification-icon"
                      onClick={handleToggleNotification}
                    >
                      <NotificationsOff className="cursor-pointer" />
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

          <div className="text-gray-600 relative">
            <Layers />
          </div>
        </div> */}
        {user && (
          <div className="text-gray-600">
            <span>{user.username}</span>
          </div>
        )}

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
                    className={`inline-block ml-2 ${
                      (userDashboard && 'h-24 w-24') || 'h-12 w-12'
                    } rounded-full text-white shadow-solid cursor-pointer`}
                    src={
                      data && data.profilePicture
                        ? data.profilePicture
                        : UserAvatar
                    }
                    alt="avatar"
                  />
                </div>

                <div
                  className={`header-popup tri-left border right-top ${
                    open ? 'show' : 'hide'
                  }`}
                >
                  <MenuList>
                    {dashboardLink && (
                      <MenuItem
                        onClick={() => history.push(dashboardLink)}
                        className="text-gray-600"
                      >
                        <div className="text-gray-600 w-56 space-x-3 text-sm py-2">
                          <Dashboard />
                          <span>Dashboard</span>
                        </div>
                      </MenuItem>
                    )}
                    {/* <MenuItem onClick={handleClose} className="text-gray-600">
                      <div className="text-gray-600 w-56 space-x-3 text-sm py-2">
                        <Settings />
                        <span>Settings</span>
                      </div>
                    </MenuItem> */}
                    <MenuItem onClick={handleClose} className="text-gray-600">
                      <div
                        className="text-gray-600 w-56 space-x-3 text-sm py-2"
                        onClick={logout}
                      >
                        <PowerSettingsNew />
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
        to={Routes.Login}
        className="lg:inline-flex lg:w-auto w-full px-8 py-2 rounded text-gray-600 items-center justify-center hover:text-gray-700"
      >
        <span>Login</span>
      </Link>

      <button
        className="lg:inline-flex lg:w-auto w-full px-8 py-2 rounded items-center justify-center bg-blue-700 hover:bg-blue-800 text-white"
        onClick={signup}
        type="button"
      >
        <span>Get started</span>
      </button>
    </>
  );
};

export default withRouter(IsLoggedIn);
