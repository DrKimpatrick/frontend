import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { RootState } from 'redux/store';
import { listEducation } from 'redux/actions/education';
import { Education } from 'redux/action-types/education';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import ArrowRightAltTwoToneIcon from '@material-ui/icons/ArrowRightAltTwoTone';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import './EducationHistory.scss';
import { TalentProcess } from 'redux/action-types/user';
import { setProfileProcess } from 'redux/actions/user';
import { SideLoading } from 'components/Reusable';

interface Props {
  setPreviousStep: (value: string) => void;
}

const EducationHistory: FC<Props> = props => {
  const [education, setEducation] = useState<Education>();

  const { setPreviousStep } = props;

  const dispatch = useDispatch();

  const getMonthAndYear = (value: string) => {
    const date = format(new Date(value), 'MMMM yyyy');

    return date;
  };

  const reducer = useSelector((state: RootState) => {
    const { loading, educations, education } = state.educations;

    const { user }: any = state.users;

    return { user, loading, educations, education };
  });

  const { user, loading } = reducer;

  useEffect(() => {
    if (reducer.education) {
      setEducation(reducer.education);
    } else {
      listEducation()(dispatch);
    }
  }, [reducer.education, dispatch]);

  useEffect(() => {
    if (reducer.educations && reducer.educations.length > 0) {
      setEducation(reducer.educations[0]);
    }
  }, [reducer.educations]);

  if (loading) {
    return (
      <div style={{ marginTop: 200 }}>
        <SideLoading />
      </div>
    );
  }

  if (!education) {
    return null;
  }

  return (
    <>
      <section className="education-history-section w-1/3 m-auto text-textGray">
        <div className="flex relative h-auto my-8">
          <div
            className="back-arrow cursor-pointer"
            onClick={() => setPreviousStep(TalentProcess.AddEducation)}
          >
            <ArrowBackTwoToneIcon />
          </div>
          <h1 className="font-bold text-xl title">Education History</h1>
        </div>

        <div className="text-textGray mt-8 card">
          <div className=" text-white font-bold py-3 px-4 card-title">
            School
          </div>
          <div className="py-3 px-4 card-content border border-borderGray">
            {education.schoolName}
          </div>
        </div>

        <div className="text-textGray mt-4 card">
          <div className=" text-white font-bold py-3 px-4 card-title">
            Level
          </div>
          <div className="py-3 px-4 card-content border border-borderGray">
            {education.level}
          </div>
        </div>
        <div className="text-textGray mt-4 card">
          <div className=" text-white font-bold py-3 px-4 card-title">
            Certification
          </div>
          <div className="py-3 px-4 card-content border border-borderGray">
            {education.degreeOrCertification}
          </div>
        </div>

        <div className="text-textGray mt-4 card">
          <div className=" text-white font-bold py-3 px-4 card-title">Date</div>
          <div className="py-3 px-4 card-content border border-borderGray">
            {getMonthAndYear(education.startDate)}
            {education.endDate && ` - ${getMonthAndYear(education.endDate)}`}
          </div>
        </div>

        {education.specializations && education.specializations.length > 0 && (
          <div className="text-textGray mt-4 card">
            <div className=" text-white font-bold py-3 px-4 card-title">
              Specialities
            </div>
            <div className="py-3 px-4 card-content border border-borderGray">
              {education.specializations.map((item, index) => (
                <p key={index}> - {item}</p>
              ))}
            </div>
          </div>
        )}

        {education.accomplishments && education.accomplishments.length > 0 && (
          <div className="text-textGray mt-4 card">
            <div className=" text-white font-bold py-3 px-4 card-title">
              Accomplishments
            </div>
            <div className="py-3 px-4 card-content border border-borderGray">
              {education.accomplishments.map((item, index) => (
                <p key={index}>- {item}</p>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center mt-12">
          <button
            data-testid="next-button"
            className="add-education-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-64 rounded-sm shadow flex justify-around"
            type="button"
            onClick={() => setPreviousStep(TalentProcess.AddEducation)}
          >
            <span className="">Add another school</span>
            <AddCircleOutlineOutlinedIcon />
          </button>
        </div>
        <div className="flex justify-center mt-12">
          <button
            data-testid="next-button"
            className="next-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-32 rounded-sm shadow flex justify-around"
            type="button"
            onClick={() => {
              if (user) {
                setProfileProcess({
                  userId: user._id,
                  profileProcess: TalentProcess.ListEducation
                })(dispatch);
              }
            }}
          >
            <span className="">Next</span> <ArrowRightAltTwoToneIcon />
          </button>
        </div>
      </section>
    </>
  );
};

export default EducationHistory;
