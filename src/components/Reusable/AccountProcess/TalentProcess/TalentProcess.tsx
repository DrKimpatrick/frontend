import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, MobileStepper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TalentProcess } from 'redux/action-types/user';
import { RootState } from 'redux/store';
import {
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
import './TalentProcess.scss';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    flexGrow: 1,
    background: 'none'
  }
});

export const TalentProcessFlow = () => {
  const [step, setStep] = useState<string>();

  const [stepNumber = 1, setStepNumber] = useState<number>();

  const classes = useStyles();

  const reducer = useSelector((state: RootState) => {
    const { user, loading, errors } = state.users;

    return { user, loading, errors };
  });

  const { user } = reducer;

  useEffect(() => {
    if (user && user.profileProcess) {
      switch (user.profileProcess) {
        case TalentProcess.SkillRanking:
          setStep(TalentProcess.SkillRanking);

          setStepNumber(1);
          break;

        case TalentProcess.RecentEmployer:
          setStep(TalentProcess.RecentEmployer);

          setStepNumber(2);
          break;

        case TalentProcess.AddEducation:
          setStep(TalentProcess.AddEducation);

          setStepNumber(5);
          break;

        case TalentProcess.SingleEducation:
          setStep(TalentProcess.SingleEducation);

          setStepNumber(6);
          break;

        case TalentProcess.ListEducation:
          setStep(TalentProcess.ListEducation);

          setStepNumber(7);
          break;

        case TalentProcess.SingleEmployment:
          setStep(TalentProcess.SingleEmployment);

          setStepNumber(3);
          break;

        case TalentProcess.ListEmployment:
          setStep(TalentProcess.ListEmployment);

          setStepNumber(4);
          break;
        default:
          setStep(TalentProcess.SkillRanking);

          setStepNumber(1);
      }
    }

    if (user && !user.profileProcess) {
      setStep(TalentProcess.SkillRanking);
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
      <Container>
        <div className="steppers">
          <MobileStepper
            variant="progress"
            steps={Object.values(TalentProcess).length}
            position="static"
            activeStep={stepNumber}
            nextButton={
              <button type="button" style={{ display: 'none' }}>
                next
              </button>
            }
            backButton={
              <button type="button" style={{ display: 'none' }}>
                prev
              </button>
            }
            className={classes.root}
          />
        </div>
      </Container>
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
