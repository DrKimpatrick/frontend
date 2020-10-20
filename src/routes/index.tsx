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

const RoutesComponent: React.FC = () => {
  const routes = [
    { path: '/', exact: true, component: <LandingPage /> },
    { path: '/login', exact: true, component: <Authentication /> },
    { path: '/register', exact: true, component: <GetStarted /> },
    { path: '/home', exact: true, component: <LandingPage /> },
    { path: '/account', exact: true, component: <Authentication /> },
    { path: '/notification', exact: true, component: <GetStarted /> },
    { path: '/current-role', exact: true, component: <CurrentRole /> },
    { path: '/skill-ranking', exact: true, component: <SkillRanking /> },
    { path: '/recent-employer', exact: true, component: <RecentEmployer /> },
    {
      path: '/employment-history',
      exact: true,
      component: <EmploymentHistory />
    },
    {
      path: '/employment-history-list',
      exact: true,
      component: <EmploymentHistoryList />
    }
  ];
  return (
    <Router>
      <Switch>
        <Layout>
          <>
            {routes.map((route, index) => (
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
