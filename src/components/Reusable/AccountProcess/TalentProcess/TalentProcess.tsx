import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { TalentProcess } from 'redux/action-types/user';
import { RootState } from 'redux/store';
import {
  CurrentRole,
  AddEducation,
  RecentEmployer,
  EmploymentHistory,
  EmploymentHistoryList,
  EducationHistory,
  EducationHistoryList,
  SkillRanking,
  NavBar,
  MainBackground
} from 'components/Reusable';
import { Routes } from 'utils/routes';

export const TalentProcessFlow = () => {
  const [step, setStep] = useState<string>();

  const reducer = useSelector((state: RootState) => {
    const { user, loading, errors } = state.users;

    return { user, loading, errors };
  });

  const { user } = reducer;

  useEffect(() => {
    if (user && user.profileProcess) {
      switch (user.profileProcess) {
        case TalentProcess.CurrentRole:
          setStep(TalentProcess.CurrentRole);
          break;

        case TalentProcess.SkillRanking:
          setStep(TalentProcess.SkillRanking);
          break;

        case TalentProcess.RecentEmployer:
          setStep(TalentProcess.RecentEmployer);
          break;

        case TalentProcess.AddEducation:
          setStep(TalentProcess.AddEducation);
          break;

        case TalentProcess.SingleEducation:
          setStep(TalentProcess.SingleEducation);
          break;

        case TalentProcess.ListEducation:
          setStep(TalentProcess.ListEducation);
          break;

        case TalentProcess.SingleEmployment:
          setStep(TalentProcess.SingleEmployment);
          break;

        case TalentProcess.ListEmployment:
          setStep(TalentProcess.ListEmployment);
          break;
        default:
          setStep(TalentProcess.CurrentRole);
      }
    }

    if (user && !user.profileProcess) {
      setStep(TalentProcess.CurrentRole);
    }
  }, [user]);

  if (!step) {
    return null;
  }

  if (
    user &&
    user.profileProcess &&
    user.profileProcess === TalentProcess.Completed
  ) {
    return <Redirect to={Routes.UserDashboard} />;
  }

  return (
    <>
      <NavBar />
      {step === TalentProcess.CurrentRole && (
        <CurrentRole setPreviousStep={setStep} />
      )}
      {step === TalentProcess.SkillRanking && (
        <SkillRanking setPreviousStep={setStep} />
      )}
      {step === TalentProcess.RecentEmployer && (
        <RecentEmployer setPreviousStep={setStep} />
      )}
      {step === TalentProcess.AddEducation && (
        <AddEducation setPreviousStep={setStep} />
      )}
      {step === TalentProcess.SingleEmployment && (
        <EmploymentHistory setPreviousStep={setStep} />
      )}
      {step === TalentProcess.ListEmployment && (
        <EmploymentHistoryList setPreviousStep={setStep} />
      )}
      {step === TalentProcess.SingleEducation && (
        <EducationHistory setPreviousStep={setStep} />
      )}
      {step === TalentProcess.ListEducation && (
        <EducationHistoryList setPreviousStep={setStep} />
      )}
      <MainBackground />
    </>
  );
};

export default TalentProcessFlow;
