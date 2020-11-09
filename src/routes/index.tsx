import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import LandingPage from 'containers/Landing/Landing';
import Authentication from 'components/authentication/Authentication';
import GetStarted from 'components/getStarted/GetStarted';
import CurrentRole from 'components/CurrentRole/CurrentRole';
import SkillRanking from 'components/SkillRanking/SkillRanking';
import RecentEmployer from 'components/RecentEmployer/RecentEmployer';
import EmploymentHistory from 'components/EmploymentHistory/EmploymentHistory';
import EmploymentHistoryList from 'components/EmploymentHistoryList/EmploymentHistoryList';
import AddEducation from 'components/AddEducation/AddEducation';
import UserDashboard from 'components/UserDashboard/UserDashboard';
import MessagePage from 'components/messagePage/MessagePage';
import ForgotPass from 'components/forgotPassword/ForgotPass';
import ResetPass from 'components/resetPassword/ResetPass';
import PremiumBilling from 'components/PremiumBilling/PremiumBilling';
import StandardBilling from 'components/StandardBilling/StandardBilling';
import GetHired from 'components/GetHired/GetHired';
import EducationHistory from 'components/EducationHistory/EducationHistory';
import EducationHistoryList from 'components/EducationHistoryList/EducationHistoryList';

const RoutesComponent: React.FC = () => {
  const authRoutes = [
    { path: '/', exact: true, component: <LandingPage /> },
    { path: '/login', exact: true, component: <Authentication /> },
    { path: '/register', exact: true, component: <GetStarted /> },
    { path: '/home', exact: true, component: <LandingPage /> },
    { path: '/account', exact: true, component: <Authentication /> },
    { path: '/notification', exact: true, component: <UserDashboard /> },
    { path: '/current-role', exact: true, component: <CurrentRole /> },
    { path: '/skill-ranking', exact: true, component: <SkillRanking /> },
    { path: '/recent-employer', exact: true, component: <RecentEmployer /> },
    {
      path: '/employment-history/:id',
      exact: true,
      component: <EmploymentHistory />
    },
    {
      path: '/employment-history-list',
      exact: true,
      component: <EmploymentHistoryList />
    },
    { path: '/add-education', exact: true, component: <AddEducation /> },
    { path: '/user/dashboard', exact: true, component: <UserDashboard /> },
    { path: '/verify-account', exact: true, component: <MessagePage /> },
    { path: '/forgot-password', exact: true, component: <ForgotPass /> },
    { path: '/reset-password', exact: true, component: <ResetPass /> },
    { path: '/premium-billing', exact: true, component: <PremiumBilling /> },
    { path: '/standard-billing', exact: true, component: <StandardBilling /> },
    { path: '/get-hired', exact: true, component: <GetHired /> },
    {
      path: '/education-history',
      exact: true,
      component: <EducationHistory />
    },
    {
      path: '/education-history-list',
      exact: true,
      component: <EducationHistoryList />
    }
  ];

  return (
    <Router>
      <Switch>
        <Layout>
          <>
            {authRoutes.map((route, index) => (
              <Route path={route.path} exact={route.exact} key={index}>
                {route.component}
              </Route>
            ))}
          </>
        </Layout>
        {/* <Route component={NotFoundPageComponent} /> */}
      </Switch>
    </Router>
  );
};

export default RoutesComponent;
