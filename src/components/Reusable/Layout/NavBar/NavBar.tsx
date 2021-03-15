import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from 'assets/images/logo-image.png';
import useWindowSize from 'utils/useWindowSize';
import {
  Dashboard as DashboardIcon,
  Work as WorkIcon,
  RecordVoiceOver,
  Assignment
} from '@material-ui/icons';
import { RootState } from 'redux/store';
import Avatar from 'assets/images/avatar.webp';
import { Routes } from 'utils/routes';
import IsLoggedIn from './IsLoggedIn';
import './NavBar.scss';

const dashboardItems = [
  {
    id: 1,
    item: 'Dashboard',
    icon: <DashboardIcon className="dashboard-list-icons" />,
    link: Routes.UserDashboard
  },
  // {
  //   id: 2,
  //   item: 'Applied Jobs',
  //   icon: <WorkIcon className="dashboard-list-icons" />,
  //   link: '#'
  // },
  {
    id: 3,
    item: 'Trainings',
    icon: <WorkIcon className="dashboard-list-icons" />,
    link: Routes.Training
  },
  {
    id: 4,
    item: 'Recommendation',
    icon: <RecordVoiceOver className="dashboard-list-icons" />,
    link: Routes.TalentRecommendation
  },
  {
    id: 5,
    item: 'Assessments',
    icon: <Assignment className="dashboard-list-icons" />,
    link: Routes.TalentAssessment
  }
];

interface Props {
  userDashboard?: boolean;
  activePath?: string;
}

const NavBar: FC<Props> = props => {
  const size = useWindowSize();

  const { userDashboard, activePath } = props;

  const reducer = useSelector((state: RootState) => {
    const { user } = state.users;

    return { user };
  });

  return size?.width && size?.width > 768 ? (
    <nav
      className={`flex items-center bg-white-800 px-20 ${
        !userDashboard && 'py-5'
      } flex-wrap`}
      style={{ background: 'white' }}
    >
      {userDashboard ? (
        <div className="mt-24 mb w-3/5 flex-nowrap">
          <ul className="flex flex-nowrap justify-between dashboard-items-ul">
            {dashboardItems.map((item: any, i) => (
              <li
                className={
                  activePath === item.link ? 'user-dashboard-active' : ''
                }
                key={i}
              >
                <Link to={item.link}>
                  <div className="flex flex-nowrap text-sm text-gray-600">
                    <span className="px-2 text-xs">{item.icon}</span>{' '}
                    <span className="px-2">{item.item}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Link className="text-gray-800" to="/">
          <img src={logo} alt="logo" className="logo w-24" />
        </Link>
      )}
      <div
        className="hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto"
        id="navigation"
      >
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
          {!userDashboard && (
            <div>
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
            </div>
          )}
          <IsLoggedIn userDashboard={userDashboard} user={reducer.user} />
        </div>
      </div>
    </nav>
  ) : (
    <div className="header-container">
      <div className="header-background" />
      {userDashboard ? (
        <>
          <div className="talentUserDetail flex justify-end">
            <div />
            {reducer.user && (
              <div className="user">
                <div className="mr-2" style={{ marginTop: '5px' }}>
                  {reducer.user.username}
                </div>
                <div className="userImage">
                  {reducer.user.profilePicture ? (
                    <img src={reducer.user.profilePicture} alt="" />
                  ) : (
                    <img src={Avatar} alt="" />
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="mt-2 w-full">
            <ul className="flex flex-nowrap justify-between dashboard-items-ul">
              {dashboardItems.map((item: any, i) => (
                <li
                  className={
                    activePath === item.link ? 'user-dashboard-active' : ''
                  }
                  key={i}
                >
                  <Link to={item.link}>
                    <div
                      className="flex flex-nowrap text-gray-600"
                      style={{ fontSize: '12px' }}
                    >
                      <span className="text-xs">{item.icon}</span>{' '}
                      <span className="px-2">{item.item}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <nav className="flex items-center justify-center">
          <img src={logo} alt="logo" className="logo w-32" />
        </nav>
      )}
    </div>
  );
};

export default NavBar;
