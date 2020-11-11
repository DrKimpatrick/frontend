import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Landing } from 'components/Home';
import {
  Login,
  CreateAccount,
  ForgotPassword,
  ResetPassword
} from 'components/Auth';
import { Dashboard } from 'components/Talent';
import {
  EducationHistory,
  EducationHistoryList,
  StandardBilling,
  SkillRanking,
  PremiumBilling,
  EmploymentHistory,
  EmploymentHistoryList,
  CurrentRole,
  RecentEmployer,
  AddEducation,
  MessagePage,
  GetHired,
  Layout
} from 'components/Reusable';

const AppRouter: React.FC = () => {
  const authRoutes = [
    { path: '/', exact: true, component: <Landing /> },
    { path: '/login', exact: true, component: <Login /> },
    { path: '/register', exact: true, component: <CreateAccount /> },
    { path: '/home', exact: true, component: <Landing /> },
    { path: '/account', exact: true, component: <Login /> },
    { path: '/notification', exact: true, component: <Dashboard /> },
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
    { path: '/user/dashboard', exact: true, component: <Dashboard /> },
    { path: '/verify-account', exact: true, component: <MessagePage /> },
    { path: '/forgot-password', exact: true, component: <ForgotPassword /> },
    { path: '/reset-password', exact: true, component: <ResetPassword /> },
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

export default AppRouter;
