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
  const authRoutes = [
    // { path: '/', exact: true, component: <Landing /> },
    { path: RouteUrl.Login, exact: true, component: <Login /> },
    { path: RouteUrl.Register, exact: true, component: <CreateAccount /> },
    { path: RouteUrl.Home, exact: true, component: <Landing /> },
    { path: RouteUrl.Account, exact: true, component: <Login /> },
    { path: RouteUrl.Notification, exact: true, component: <Dashboard /> },
    { path: RouteUrl.CurrentRole, exact: true, component: <CurrentRole /> },
    { path: RouteUrl.SkillRanking, exact: true, component: <SkillRanking /> },
    {
      path: RouteUrl.RecentEmployer,
      exact: true,
      component: <RecentEmployer />
    },
    {
      path: RouteUrl.EmploymentHistoryById,
      exact: true,
      component: <EmploymentHistory />
    },
    {
      path: RouteUrl.EmploymentHistoryList,
      exact: true,
      component: <EmploymentHistoryList />
    },
    { path: RouteUrl.AddEducation, exact: true, component: <AddEducation /> },
    { path: RouteUrl.UserDashboard, exact: true, component: <Dashboard /> },
    { path: RouteUrl.VerifyAccount, exact: true, component: <MessagePage /> },
    {
      path: RouteUrl.ForgotPassword,
      exact: true,
      component: <ForgotPassword />
    },
    { path: RouteUrl.ResetPassword, exact: true, component: <ResetPassword /> },
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
      path: RouteUrl.EducationHistory,
      exact: true,
      component: <EducationHistory />
    },
    {
      path: RouteUrl.EducationHistoryList,
      exact: true,
      component: <EducationHistoryList />
    },
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
    { path: RouteUrl.Recruiter, exact: true, component: <Recruiter /> }
  ];

  return (
    <Router>
      <Switch>
        <Route component={Landing} path='/' exact = {true}/>
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
