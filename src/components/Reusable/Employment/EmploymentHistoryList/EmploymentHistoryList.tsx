/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FC, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import ArrowRightAltTwoToneIcon from '@material-ui/icons/ArrowRightAltTwoTone';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import NavBar from 'components/Reusable/Layout/NavBar/NavBar';
import { RootState } from 'redux/store';
import { listEmployments } from 'redux/actions/employment';
import { MainBackground } from 'components/Reusable/Layout/MainBackground';
import './EmploymentHistoryList.scss';

const EmploymentHistoryList: FC = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    listEmployments()(dispatch);
  }, [dispatch]);

  const reducer = useSelector((state: RootState) => {
    const { loading, errors, employments } = state.employments;
    const { message } = state.messages;
    return { message, loading, errors, employments };
  });

  const { employments } = reducer;

  if (!employments) {
    return null;
  }
  return (
    <>
      <NavBar />
      <section className="employment-history-list-section w-1/3 m-auto text-textGray">
        <div className="flex relative h-auto my-8">
          <div
            className="back-arrow cursor-pointer"
            onClick={() => history.push('/employment-history')}
          >
            <ArrowBackTwoToneIcon />
          </div>
          <h1 className="font-bold text-xl title">Employment History List</h1>
        </div>

        {employments &&
          employments.map((item, i) => (
            <div
              className="text-textGray mt-4 border border-borderGray card"
              key={i}
            >
              <div className=" text-white font-bold py-3 px-4 card-title">
                {item.companyName} , {item.title}
              </div>
              <div className="py-3 px-4 card-content">
                {new Date(item.startDate).toDateString()}{' '}
                {item.endDate && ` to ${new Date(item.endDate).toDateString()}`}
              </div>
            </div>
          ))}

        <div className="flex justify-center mt-12">
          <button
            data-testid="next-button"
            className="add-employer-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-64 rounded-sm shadow flex justify-around"
            onClick={() => history.push('/recent-employer')}
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
            onClick={() => history.push('/add-education')}
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

export default withRouter(EmploymentHistoryList);
