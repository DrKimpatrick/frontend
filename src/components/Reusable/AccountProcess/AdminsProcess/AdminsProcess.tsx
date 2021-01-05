import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AdminsProcess, UserRole } from 'redux/action-types/user';
import { RootState } from 'redux/store';
import {
  NavBar,
  MainBackground,
  AddCompany,
  AddSchool
} from 'components/Reusable';
import { AddSubsidy } from 'components/Reusable/AddSubsidy';
import { Routes } from 'utils/routes';

export const AdminsProcessFlow = () => {
  const [step, setStep] = useState<string>();

  const reducer = useSelector((state: RootState) => {
    const { user, loading, errors } = state.users;

    return { user, loading, errors };
  });

  const { user } = reducer;

  useEffect(() => {
    if (user && user.profileProcess) {
      setStep(user.profileProcess);
    }

    if (user && !user.profileProcess) {
      if (user.roles.includes(UserRole.TrainingAdmin)) {
        setStep(AdminsProcess.AddSchool);
      }
      if (
        [
          UserRole.CompanyAdmin,
          UserRole.HrAdmin,
          UserRole.RecruitmentAdmin
        ].some(role => user.roles.includes(role))
      ) {
        setStep(AdminsProcess.AddCompany);
      }
    }
  }, [user]);

  if (
    user &&
    user.profileProcess &&
    user.profileProcess === AdminsProcess.Completed
  ) {
    if (user.roles.includes(UserRole.TrainingAdmin)) {
      // This is supposed to go to the training admin dashboard
      return <Redirect to="/training-dashboard" />;
    }
    if (user.roles.includes(UserRole.HrAdmin)) {
      // This is supposed to go to the HR admin dashboard
      return <Redirect to={Routes.HrAdminDashboard} />;
    }
    if (user.roles.includes(UserRole.RecruitmentAdmin)) {
      // This is supposed to go to the recruitment admin dashboard
      return <Redirect to={Routes.HrAdminDashboard} />;
    }
    if (user.roles.includes(UserRole.CompanyAdmin)) {
      // This is supposed to go to the company admin dashboard
      return <Redirect to="/company-dashboard" />;
    }
  }

  return (
    <>
      <NavBar />
      {step === AdminsProcess.AddCompany && <AddCompany />}
      {step === AdminsProcess.AddSchool && <AddSchool />}
      {step === AdminsProcess.AddPlan && <AddSubsidy />}
      <MainBackground />
    </>
  );
};

export default AdminsProcessFlow;
