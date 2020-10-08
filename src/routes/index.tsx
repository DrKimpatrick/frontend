import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import LandingPage from 'containers/Landing/Landing';
import Home from 'containers/Home';

const RoutesComponent: React.FC = () => {
  const routes = [
    { path: '/', exact: true, component: <LandingPage /> },
    { path: '/home', exact: true, component: <LandingPage /> },
    { path: '/account', exact: true, component: <Home label="/home" /> },
    { path: '/notification', exact: true, component: <Home label="/home" /> }
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
