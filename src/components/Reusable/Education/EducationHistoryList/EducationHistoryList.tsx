import React, { FC, useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { format } from 'date-fns';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import ArrowRightAltTwoToneIcon from '@material-ui/icons/ArrowRightAltTwoTone';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import NavBar from 'components/Reusable/Layout/NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { listEducation } from 'redux/actions/education';
import { RootState } from 'redux/store';
import { MainBackground } from '../../Layout/MainBackground';
import './EducationHistoryList.scss';

const EducationHistory: FC = () => {
  const dispatch = useDispatch();

  const getMonthAndYear = (value: string) => {
    const date = format(new Date(value), 'MMMM yyyy');

    return date;
  };

  const history = useHistory();

  useEffect(() => {
    listEducation()(dispatch);
  }, [dispatch]);

  const reducer = useSelector((state: RootState) => {
    const { loading, errors, educations } = state.educations;
    const { message } = state.messages;
    return { message, loading, errors, educations };
  });

  const { loading, educations } = reducer;

  if (loading && loading === true) {
    return null;
  }
  return (
    <>
      <NavBar />
      <section className="education-history-list-section w-1/3 m-auto text-textGray">
        <div className="flex relative h-auto my-8">
          <div className="back-arrow cursor-pointer">
            <ArrowBackTwoToneIcon />
          </div>
          <h1 className="font-bold text-xl title">Education History</h1>
        </div>

        {educations &&
          educations.map((item, i) => (
            <div
              className="text-textGray mt-4 border border-borderGray card"
              key={i}
            >
              <div className=" text-white font-bold py-3 px-4 card-title">
                {item.schoolName}
              </div>
              <div className="py-3 px-4 card-content">
                {getMonthAndYear(item.startDate)}{' '}
                {item.endDate && ` to ${getMonthAndYear(item.endDate)}`}
              </div>
            </div>
          ))}

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
            onClick={() => history.push('/user/dashboard')}
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
