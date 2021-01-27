import React, { FC, useState, useEffect } from 'react';
import { useHistory, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { TalentProcess, UserRole } from 'redux/action-types/user';
import { Routes } from 'utils/routes';
import { CoverImage, NavBar, MainBackground } from 'components/Reusable';

const TalentLayout: FC = props => {
  const [activePath = Routes.UserDashboard, setActivePath] = useState<string>();

  const { children } = props;

  const history = useHistory();

  const location = useLocation();

  const selector = useSelector((state: RootState) => {
    const { user } = state.users;

    return { user };
  });

  const { user } = selector;

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  if (user && user.roles && user.roles.find(item => item !== UserRole.Talent)) {
    history.goBack();
    return <></>;
  }

  if (
    user &&
    user.profileProcess &&
    user.profileProcess !== TalentProcess.Completed
  ) {
    return <Redirect to={Routes.CompleteProfile} />;
  }

  if (
    user &&
    user.profileProcess === TalentProcess.Completed &&
    !user.stripeSubscriptionId
  ) {
    return <Redirect to={Routes.GetHired} />;
  }

  return (
    <>
      <CoverImage />
      <NavBar userDashboard activePath={activePath} />
      {children}

      <MainBackground allowImageColor />
    </>
  );
};

export default TalentLayout;
