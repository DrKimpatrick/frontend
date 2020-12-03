import React, { FC, useEffect, useState } from 'react';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import ArrowRightAltTwoToneIcon from '@material-ui/icons/ArrowRightAltTwoTone';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { listEmployments } from 'redux/actions/employment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import './EmploymentHistory.scss';
import { TalentProcess } from 'redux/action-types/user';
import { Employment } from 'redux/action-types/employment';
import { setProfileProcess } from 'redux/actions/user';
import { SideLoading } from 'components/Reusable';

interface Props {
  setPreviousStep: (value: string) => void;
}

const EmploymentHistory: FC<Props> = props => {
  const [employment, setEmployment] = useState<Employment>();

  const dispatch = useDispatch();

  const { setPreviousStep } = props;

  const reducer = useSelector((state: RootState) => {
    const { loading, errors, employments, employment } = state.employments;
    const { message } = state.messages;
    const { user } = state.users;
    return { message, loading, errors, employments, user, employment };
  });

  const { employments, user, loading } = reducer;

  useEffect(() => {
    if (reducer.employment) {
      setEmployment(reducer.employment);
    } else {
      listEmployments()(dispatch);
    }
  }, [dispatch, reducer.employment]);

  useEffect(() => {
    if (employments && employments.length > 0) {
      setEmployment(employments[0]);
    }
  }, [employments]);

  if (loading) {
    return (
      <div style={{ marginTop: '200px' }}>
        <SideLoading />
      </div>
    );
  }

  if (!employment) {
    return null;
  }

  return (
    <>
      <section className="employment-history-section w-1/3 m-auto text-textGray">
        <div className="flex relative h-auto my-8">
          <div
            className="back-arrow cursor-pointer"
            onClick={() => setPreviousStep(TalentProcess.RecentEmployer)}
          >
            <ArrowBackTwoToneIcon />
          </div>
          <h1 className="font-bold text-xl title">Employment History Review</h1>
        </div>

        <div className="text-textGray mt-8 border border-borderGray card">
          <div className=" text-white font-bold py-3 px-4 card-title">
            Company
          </div>
          <div className="py-3 px-4 card-content">{employment.companyName}</div>
        </div>

        <div className="text-textGray mt-4 border border-borderGray card">
          <div className=" text-white font-bold py-3 px-4 card-title">
            Supervisor
          </div>
          <div className="py-3 px-4 card-content">{employment.supervisor}</div>
        </div>

        <div className="text-textGray mt-4 border border-borderGray card">
          <div className=" text-white font-bold py-3 px-4 card-title">
            Duration
          </div>
          <div className="py-3 px-4 card-content">
            {new Date(employment.startDate).toDateString()} to{' '}
            {employment.endDate && new Date(employment.endDate).toDateString()}
          </div>
        </div>

        <div className="text-textGray mt-4 border border-borderGray card">
          <div className=" text-white font-bold py-3 px-4 card-title">
            Responsibilities
          </div>
          <div className="py-3 px-4 card-content">
            {employment.responsibilities &&
              employment.responsibilities.length > 0 &&
              employment.responsibilities.map((resp, index) => (
                <p key={index}>- {resp}</p>
              ))}
          </div>
        </div>

        {employment.accomplishments && employment.accomplishments.length > 0 && (
          <div className="text-textGray mt-4 border border-borderGray card">
            <div className=" text-white font-bold py-3 px-4 card-title">
              Accomplishments
            </div>
            <div className="py-3 px-4 card-content">
              {employment.accomplishments.map((acc, index) => (
                <p key={index}>- {acc}</p>
              ))}
            </div>
          </div>
        )}

        {employment.favoriteProject && (
          <div className="text-textGray mt-4 border border-borderGray card">
            <div className=" text-white font-bold py-3 px-4 card-title">
              Favorite Project
            </div>
            <div className="py-3 px-4 card-content">
              {employment.favoriteProject}
            </div>
          </div>
        )}

        {employment.skillsUsed && employment.skillsUsed.length > 0 && (
          <div className="text-textGray mt-4 border border-borderGray card">
            <div className=" text-white font-bold py-3 px-4 card-title">
              Skills Used
            </div>
            <div className="py-3 px-4 card-content h-32">
              {employment.skillsUsed.map((skill, index) => (
                <p key={index}>- {skill}</p>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center mt-12">
          <button
            data-testid="next-button"
            className="add-employer-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-64 rounded-sm shadow flex justify-around"
            onClick={() => setPreviousStep(TalentProcess.RecentEmployer)}
            type="button"
          >
            <span className="">Add another employer</span>
            <AddCircleOutlineOutlinedIcon />
          </button>
        </div>
        <div className="flex justify-center mt-12">
          <button
            data-testid="next-button"
            className="next-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-32 rounded-sm shadow flex justify-around"
            onClick={() => {
              if (user) {
                setProfileProcess({
                  userId: user._id,
                  profileProcess: TalentProcess.ListEmployment
                })(dispatch);
              }
            }}
            type="button"
          >
            <span className="">Next</span> <ArrowRightAltTwoToneIcon />
          </button>
        </div>
      </section>
    </>
  );
};

export default EmploymentHistory;
