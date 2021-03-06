import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Landing } from 'components/Home';
import {
  Login,
  CreateAccount,
  ForgotPassword,
  ResetPassword,
  AccountTypes
} from 'components/Auth';
import { Dashboard, Training, TalentRecommendation } from 'components/Talent';
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
  Education,
  Recruiter,
  Skill
} from 'components/Admin';
import { Routes } from 'utils/routes';
import { ProcessPayments } from 'components/ProcessPayments';
import FeatureChoice from 'components/FeatureChoice/FeatureChoice';
import {
  PotentialCandidate,
  HrAdminCode,
  HrRecommendation
} from 'components/HrAdmin';
import { SubsidyStudent } from 'components/School';
import { AffiliateAdmin } from 'components/AffiliateAdmin';
import PaymentsSuccess from 'components/ProcessPayments/PaymentsSuccess';

const AppRouter: FC = () => {
  const authorizedRoutes = [
    { path: Routes.Account, exact: true, component: <AccountTypes /> },
    { path: Routes.Notification, exact: true, component: <Dashboard /> },
    { path: Routes.UserDashboard, exact: true, component: <Dashboard /> },
    { path: Routes.Training, exact: true, component: <Training /> },
    {
      path: Routes.TalentRecommendation,
      exact: true,
      component: <TalentRecommendation />
    },
    {
      path: Routes.PremiumBilling,
      exact: true,
      component: <PremiumBilling />
    },
    {
      path: Routes.StandardBilling,
      exact: true,
      component: <StandardBilling />
    },
    { path: Routes.GetHired, exact: true, component: <GetHired /> },
    {
      path: Routes.SuperAdminDashboard,
      exact: true,
      component: <AdminDashboard />
    },
    { path: Routes.HrAdmin, exact: true, component: <HrAdmin /> },
    {
      path: Routes.AdminViewUserProfile,
      exact: true,
      component: <UserProfile />
    },
    { path: Routes.Affiliate, exact: true, component: <Affiliate /> },
    {
      path: Routes.AcceptedCourse,
      exact: true,
      component: <AcceptedCourse />
    },
    { path: Routes.PendingCourse, exact: true, component: <PendingCourse /> },
    {
      path: Routes.DeclinedCourse,
      exact: true,
      component: <DeclinedCourse />
    },
    { path: Routes.Education, exact: true, component: <Education /> },
    { path: Routes.Recruiter, exact: true, component: <Recruiter /> },
    {
      path: Routes.CompleteProfile,
      exact: true,
      component: <AccountProcess />
    },
    {
      path: Routes.Skill,
      exact: true,
      component: <Skill />
    },
    {
      path: Routes.payment,
      exact: true,
      component: <ProcessPayments />
    },
    {
      path: Routes.SubsidySuccessPayment,
      exact: true,
      component: <PaymentsSuccess />
    },
    {
      path: Routes.FeatureChoice,
      exact: true,
      component: <FeatureChoice />
    },

    // Hr Admin
    {
      path: Routes.HrAdminDashboard,
      component: <PotentialCandidate />,
      exact: true
    },
    {
      path: Routes.PotentialCandidate,
      component: <PotentialCandidate />,
      exact: true
    },
    {
      path: Routes.Code,
      component: <HrAdminCode />,
      exact: true
    },
    {
      path: Routes.HrAdminRecommendation,
      component: <HrRecommendation />,
      exact: true
    },

    // School or Education
    {
      path: Routes.SchoolDashboard,
      component: <SubsidyStudent />,
      exact: true
    },

    // Affiliate Admin
    {
      path: Routes.AffiliateDashboard,
      component: <AffiliateAdmin />,
      exact: true
    }
  ];

  const unauthorizedRoutes = [
    // { path: Routes.Auth, exact: true, component: <Auth /> },
    { path: Routes.Login, exact: true, component: <Login /> },
    { path: Routes.Register, exact: true, component: <CreateAccount /> },
    {
      path: Routes.ForgotPassword,
      exact: true,
      component: <ForgotPassword />
    },
    { path: Routes.ResetPassword, exact: true, component: <ResetPassword /> },
    { path: Routes.VerifyAccount, exact: true, component: <MessagePage /> },
    { path: Routes.Home, exact: true, component: <Landing /> }
  ];

  return (
    <Router>
      <Switch>
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
