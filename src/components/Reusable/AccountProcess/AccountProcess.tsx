import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { listCurrentUser } from 'redux/actions/user';
import { RootState } from 'redux/store';
import { UserRole } from 'redux/action-types/user';
import { SplashScreen } from 'components/Reusable';
import { Routes } from 'utils/routes';
import { TalentProcess, AdminsProcess } from '.';

export const AccountProcess = () => {
  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { user, loading } = state.users;

    return { user, loading };
  });

  const { user, loading } = reducer;

  useEffect(() => {
    listCurrentUser()(dispatch);
  }, [dispatch]);

  const accountType = useMemo(() => {
    if (user && user.roles && user.roles.length > 0) {
      for (let i = 0; i < user.roles.length; i++) {
        switch (user.roles[i]) {
          case UserRole.Talent:
            return <TalentProcess />;
          case UserRole.RecruitmentAdmin:
          case UserRole.CompanyAdmin:
          case UserRole.HrAdmin:
          case UserRole.TrainingAdmin:
            return <AdminsProcess />;
          default:
            return null;
        }
      }
    }
    return null;
  }, [user]);

  if (loading) {
    return <SplashScreen />;
  }

  if (user && user.roles.length <= 0) {
    return <Redirect to={Routes.Account} />;
  }

  return <>{accountType}</>;
};

export default AccountProcess;
