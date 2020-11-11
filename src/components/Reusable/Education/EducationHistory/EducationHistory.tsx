import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { withRouter, useLocation } from 'react-router-dom';
import { RootState } from 'redux/store';
import { listSpecificEducation } from 'redux/actions/education';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import ArrowRightAltTwoToneIcon from '@material-ui/icons/ArrowRightAltTwoTone';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import NavBar from '../../Layout/NavBar/NavBar';
import { MainBackground } from '../../Layout/MainBackground';
import './EducationHistory.scss';

const EducationHistory: FC = () => {
  const dispatch = useDispatch();

  const location = useLocation<{ educationId: string }>();

  const getMonthAndYear = (value: string) => {
    const date = format(new Date(value), 'MMMM yyyy');

    return date;
  };

  const reducer = useSelector((state: RootState) => {
    const { education, loading } = state.educations;

    const { user } = state.users;

    return { user, loading, education };
  });

  const { education, loading } = reducer;

  useEffect(() => {
    if (reducer.user && location.state && location.state.educationId) {
      listSpecificEducation(
        reducer.user._id,
        location.state.educationId
      )(dispatch);
    }
  }, [reducer.user, location.state.educationId, dispatch, location.state]);

  if (!education || !location.state.educationId || loading) {
    return null;
  }

  return (
    <>
      <NavBar />
      <section className="education-history-section w-1/3 m-auto text-textGray">
        <div className="flex relative h-auto my-8">
          <div className="back-arrow cursor-pointer">
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
          >
            <span className="">Next</span> <ArrowRightAltTwoToneIcon />
          </button>
        </div>
      </section>
      <MainBackground />
    </>
  );
};

export default withRouter(EducationHistory);
