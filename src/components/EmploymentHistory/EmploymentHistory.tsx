import React, { FC, Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './EmploymentHistory.scss';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import ArrowRightAltTwoToneIcon from '@material-ui/icons/ArrowRightAltTwoTone';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import NavBar from 'components/Layout/NavBar/NavBar';

type props = {};
const EmploymentHistory: FC<props> = (props: any) => {

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      props.history.push('/login');
    }
  });

  return (
    <Fragment>
      <NavBar />
      <section className="employment-history-section w-1/3 m-auto text-textGray">
        <div className="flex relative h-auto my-8">
          <div
            className="back-arrow cursor-pointer"
            onClick={() => props.history.push('/recent-employer')}
          >
            <ArrowBackTwoToneIcon />
          </div>
          <h1 className="font-bold text-xl title">Employment History</h1>
        </div>

        <div className="text-textGray mt-8 border border-borderGray card">
          <div className=" text-white font-bold py-3 px-4 card-title">
            Company
          </div>
          <div className="py-3 px-4 card-content">Google</div>
        </div>

        <div className="text-textGray mt-4 border border-borderGray card">
          <div className=" text-white font-bold py-3 px-4 card-title">
            Supervisor
          </div>
          <div className="py-3 px-4 card-content">Mr. Black Pather</div>
        </div>

        <div className="text-textGray mt-4 border border-borderGray card">
          <div className=" text-white font-bold py-3 px-4 card-title">
            Duration
          </div>
          <div className="py-3 px-4 card-content">Jan 8, 2019 - Current</div>
        </div>

        <div className="text-textGray mt-4 border border-borderGray card">
          <div className=" text-white font-bold py-3 px-4 card-title">
            Responsibilities
          </div>
          <div className="py-3 px-4 card-content">
            Lorem ipsum must be a head or manager lorem ipsum
          </div>
        </div>

        <div className="text-textGray mt-4 border border-borderGray card">
          <div className=" text-white font-bold py-3 px-4 card-title">
            Accomplishments
          </div>
          <div className="py-3 px-4 card-content">
            Lorem ipsum must be a head or manager lorem ipsum
          </div>
        </div>

        <div className="text-textGray mt-4 border border-borderGray card">
          <div className=" text-white font-bold py-3 px-4 card-title">
            Favorite Project
          </div>
          <div className="py-3 px-4 card-content">TTLCC, TTLCC</div>
        </div>
        <div className="text-textGray mt-4 border border-borderGray card">
          <div className=" text-white font-bold py-3 px-4 card-title">
            Skills Used
          </div>
          <div className="py-3 px-4 card-content h-32"></div>
        </div>

        <div className="flex justify-center mt-12">
          <button
            data-testid="next-button"
            className="add-employer-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-64 rounded-sm shadow flex justify-around"
          >
            <span className="">Add another employer</span>
            <AddCircleOutlineOutlinedIcon />
          </button>
        </div>
        <div className="flex justify-center mt-12">
          <button
            data-testid="next-button"
            className="next-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-32 rounded-sm shadow flex justify-around"
            onClick={() => props.history.push('/employment-history-list')}
          >
            <span className="">Next</span> <ArrowRightAltTwoToneIcon />
          </button>
        </div>
      </section>
    </Fragment>
  );
};

export default withRouter(EmploymentHistory);
