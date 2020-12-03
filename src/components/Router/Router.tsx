import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Landing } from 'components/Home';
import {
  Login,
  CreateAccount,
  ForgotPassword,
  ResetPassword,
  AccountTypes
} from 'components/Auth';
import { Dashboard } from 'components/Talent';
import {
  StandardBilling,
  PremiumBilling,
  MessagePage,
  GetHired,
  Layout,
  NotFound,
  AccountProcess,
  AuthLayout
} from 'components/Reusable';
import {
  AdminDashboard,
  HrAdmin,
  UserProfile,
  Affiliate,
  AcceptedCourse,
  PendingCourse,
  DeclinedCourse,
  TrainingAffiliate,
  Company,
  Recruiter
} from 'components/Admin';
import { RouteUrl } from 'utils/routes';

const AppRouter: React.FC = () => {
  const authorizedRoutes = [
    { path: RouteUrl.Account, exact: true, component: <AccountTypes /> },
    { path: RouteUrl.Notification, exact: true, component: <Dashboard /> },
    { path: RouteUrl.UserDashboard, exact: true, component: <Dashboard /> },
    {
      path: RouteUrl.PremiumBilling,
      exact: true,
      component: <PremiumBilling />
    },
    {
      path: RouteUrl.StandardBilling,
      exact: true,
      component: <StandardBilling />
    },
    { path: RouteUrl.GetHired, exact: true, component: <GetHired /> },
    {
      path: RouteUrl.SuperAdminDashboard,
      exact: true,
      component: <AdminDashboard />
    },
    { path: RouteUrl.HrAdmin, exact: true, component: <HrAdmin /> },
    {
      path: RouteUrl.AdminViewUserProfile,
      exact: true,
      component: <UserProfile />
    },
    { path: RouteUrl.Affiliate, exact: true, component: <Affiliate /> },
    {
      path: RouteUrl.AcceptedCourse,
      exact: true,
      component: <AcceptedCourse />
    },
    { path: RouteUrl.PendingCourse, exact: true, component: <PendingCourse /> },
    {
      path: RouteUrl.DeclinedCourse,
      exact: true,
      component: <DeclinedCourse />
    },
    {
      path: RouteUrl.TrainingAffiliate,
      exact: true,
      component: <TrainingAffiliate />
    },
    { path: RouteUrl.Company, exact: true, component: <Company /> },
    { path: RouteUrl.Recruiter, exact: true, component: <Recruiter /> },
    {
      path: RouteUrl.CompleteProfile,
      exact: true,
      component: <AccountProcess />
    }
  ];

  const unauthorizedRoutes = [
    { path: RouteUrl.Login, exact: true, component: <Login /> },
    { path: RouteUrl.Register, exact: true, component: <CreateAccount /> },
    {
      path: RouteUrl.ForgotPassword,
      exact: true,
      component: <ForgotPassword />
    },
    { path: RouteUrl.ResetPassword, exact: true, component: <ResetPassword /> },
    { path: RouteUrl.VerifyAccount, exact: true, component: <MessagePage /> }
  ];

  return (
    <Router>
      <Switch>
        <Route component={Landing} path={RouteUrl.Home} exact />
        {unauthorizedRoutes.map((route, index) => (
          <Route path={route.path} exact={route.exact} key={index}>
            <AuthLayout>{route.component}</AuthLayout>
          </Route>
        ))}
        {authorizedRoutes.map((route, index) => (
          <Route path={route.path} exact={route.exact} key={index}>
            <Layout>{route.component}</Layout>
          </Route>
        ))}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
