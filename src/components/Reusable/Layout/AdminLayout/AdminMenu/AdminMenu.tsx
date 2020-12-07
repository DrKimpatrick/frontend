import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminMenu.scss';
import { SupervisorAccount, AddComment } from '@material-ui/icons';
import { RouteUrl } from 'utils/routes';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';

enum ActiveMenu {
  Admin = 'Admin',
  HrAdmin = 'HrAdmin',
  Affiliate = 'Affiliate',
  TrainingAffiliate = 'TrainingAffiliate',
  Company = 'Company',
  Recruiter = 'Recruiter',
  Skills = 'Skills',
  Education = 'Education',
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
        url: RouteUrl.SuperAdminDashboard,
        active: ActiveMenu.Admin
      },
      {
        name: 'Hr Admin',
        url: RouteUrl.HrAdmin,
        active: ActiveMenu.HrAdmin
      },
      {
        name: 'Affiliates',
        url: RouteUrl.Affiliate,
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
        url: RouteUrl.Recruiter,
        active: ActiveMenu.Recruiter
      },
      {
        name: 'Company',
        url: RouteUrl.Company,
        active: ActiveMenu.Company
      },
      {
        name: 'Training',
        url: RouteUrl.TrainingAffiliate,
        active: ActiveMenu.TrainingAffiliate
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
        url: RouteUrl.Skill,
        active: ActiveMenu.Skills
      },
      {
        name: 'Education',
        url: '#',
        active: ActiveMenu.Education
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
      case RouteUrl.SuperAdminDashboard:
        setActive(ActiveMenu.Admin);
        break;

      case RouteUrl.HrAdmin:
        setActive(ActiveMenu.HrAdmin);
        break;

      case RouteUrl.Affiliate:
      case RouteUrl.PendingCourse:
      case RouteUrl.AcceptedCourse:
      case RouteUrl.DeclinedCourse:
        setActive(ActiveMenu.Affiliate);
        break;
      case RouteUrl.TrainingAffiliate:
        setActive(ActiveMenu.TrainingAffiliate);
        break;

      case RouteUrl.Company:
        setActive(ActiveMenu.Company);
        break;

      case RouteUrl.Recruiter:
        setActive(ActiveMenu.Recruiter);
        break;

      case RouteUrl.Skill:
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
