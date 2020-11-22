import React, { FC, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminMenu.scss';
import { SupervisorAccount } from '@material-ui/icons';
import { RouteUrl } from 'utils/routes';

enum ActiveMenu {
  Admin = 'Admin',
  HrAdmin = 'HrAdmin',
  Affiliate = 'Affiliate',
  TrainingAffiliate = 'TrainingAffiliate',
  Company = 'Company',
  Recruiter = 'Recruiter'
}
const AdminMenu: FC = () => {
  const [active, setActive] = useState<string>();

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case RouteUrl.SuperAdminDashboard:
        setActive(ActiveMenu.Admin);
        break;

      case RouteUrl.HrAdmin:
        setActive(ActiveMenu.HrAdmin);
        break;

      case RouteUrl.Affiliate:
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

      default:
        setActive(undefined);
    }
  }, [location.pathname]);

  return (
    <div className="adminMenu">
      <ul className="parent">
        <li>
          <Link to="#" className="link">
            <SupervisorAccount />
            <h5>Users</h5>
          </Link>
          <ul className="childMenu">
            <li
              className={active && active === ActiveMenu.Admin ? 'active' : ''}
            >
              <Link to={RouteUrl.SuperAdminDashboard}>Talent</Link>
            </li>
            <li
              className={
                active && active === ActiveMenu.HrAdmin ? 'active' : ''
              }
            >
              <Link to={RouteUrl.HrAdmin}>HR Admin</Link>
            </li>
            <li
              className={
                active && active === ActiveMenu.Affiliate ? 'active' : ''
              }
            >
              <Link to={RouteUrl.Affiliate}>Affiliates</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="#" className="link">
            <SupervisorAccount />
            <h5>Admins</h5>
          </Link>
          <ul className="childMenu">
            <li
              className={
                active && active === ActiveMenu.Recruiter ? 'active' : ''
              }
            >
              <Link to={RouteUrl.Recruiter}>Recruiter</Link>
            </li>
            <li
              className={
                active && active === ActiveMenu.Company ? 'active' : ''
              }
            >
              <Link to={RouteUrl.Company}>Company</Link>
            </li>
            <li
              className={
                active && active === ActiveMenu.TrainingAffiliate
                  ? 'active'
                  : ''
              }
            >
              <Link to={RouteUrl.TrainingAffiliate}>Training</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
