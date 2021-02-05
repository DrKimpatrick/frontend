import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminMenu.scss';
import { SupervisorAccount, AddComment } from '@material-ui/icons';
import { Routes } from 'utils/routes';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';

enum ActiveMenu {
  Admin = 'Admin',
  HrAdmin = 'HrAdmin',
  Affiliate = 'Affiliate',
  Education = 'Education',
  Recruiter = 'Recruiter',
  Skills = 'Skills',
  Employment = 'Employment'
}

const menuList = [
  {
    name: 'Users',
    url: '#',
    icon: <SupervisorAccount />,
    active: '',
    child: [
      {
        name: 'Talent',
        url: Routes.SuperAdminDashboard,
        active: ActiveMenu.Admin
      },
      {
        name: 'Affiliates',
        url: Routes.Affiliate,
        active: ActiveMenu.Affiliate
      }
    ]
  },
  {
    name: 'Admins',
    url: '#',
    icon: <SupervisorAccount />,
    active: '',
    child: [
      {
        name: 'Recruiter',
        url: Routes.Recruiter,
        active: ActiveMenu.Recruiter
      },
      {
        name: 'Education',
        url: Routes.Education,
        active: ActiveMenu.Education
      }
    ]
  },
  {
    name: 'Create',
    url: '#',
    icon: <AddComment />,
    active: '',
    child: [
      {
        name: 'Skills',
        url: Routes.Skill,
        active: ActiveMenu.Skills
      },
      {
        name: 'Education',
        url: '#',
        active: '#'
      },
      {
        name: 'Employment',
        url: '#',
        active: ActiveMenu.Employment
      }
    ]
  }
];

const AdminMenu: FC = () => {
  const [active, setActive] = useState<string>();

  const reducer = useSelector((state: RootState) => {
    const { activePath } = state.users;

    return { activePath };
  });

  const { activePath } = reducer;

  useEffect(() => {
    switch (activePath) {
      case Routes.SuperAdminDashboard:
        setActive(ActiveMenu.Admin);
        break;

      case Routes.HrAdmin:
        setActive(ActiveMenu.HrAdmin);
        break;

      case Routes.Affiliate:
      case Routes.PendingCourse:
      case Routes.AcceptedCourse:
      case Routes.DeclinedCourse:
        setActive(ActiveMenu.Affiliate);
        break;

      case Routes.Education:
        setActive(ActiveMenu.Education);
        break;

      case Routes.Recruiter:
        setActive(ActiveMenu.Recruiter);
        break;

      case Routes.Skill:
        setActive(ActiveMenu.Skills);
        break;

      default:
        setActive(undefined);
    }
  }, [activePath]);

  return (
    <div className="adminMenu">
      <ul className="parent">
        {menuList &&
          menuList.length > 0 &&
          menuList.map((item, i) => (
            <li key={i}>
              <Link to={item.url} className="link">
                {item.icon}
                <h5>{item.name}</h5>
              </Link>
              {item.child && item.child.length > 0 && (
                <ul className="childMenu">
                  {item.child.map((child, index) => (
                    <li
                      className={
                        active && active === child.active ? 'active' : ''
                      }
                      key={index}
                    >
                      <Link to={child.url}>{child.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AdminMenu;
