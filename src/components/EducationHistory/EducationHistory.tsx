import React, { FC } from 'react';
import { withRouter } from 'react-router-dom';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import ArrowRightAltTwoToneIcon from '@material-ui/icons/ArrowRightAltTwoTone';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import NavBar from '../Layout/NavBar/NavBar';
import MainBackground from '../Layout/MainBackground/MainBackground';

type props = {};
const EducationHistory: FC<props> = () => {
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
            hack Reactor
          </div>
        </div>

        <div className="text-textGray mt-4 card">
          <div className=" text-white font-bold py-3 px-4 card-title">
            Level
          </div>
          <div className="py-3 px-4 card-content border border-borderGray">
            Technical Bootcamp
          </div>
        </div>
        <div className="text-textGray mt-4 card">
          <div className=" text-white font-bold py-3 px-4 card-title">
            Certification
          </div>
          <div className="py-3 px-4 card-content border border-borderGray">
            Full-stack Developer
          </div>
        </div>

        <div className="text-textGray mt-4 card">
          <div className=" text-white font-bold py-3 px-4 card-title">Date</div>
          <div className="py-3 px-4 card-content border border-borderGray">
            July, 2015 - September, 2015
          </div>
        </div>

        <div className="text-textGray mt-4 card">
          <div className=" text-white font-bold py-3 px-4 card-title">
            Specialities
          </div>
          <div className="py-3 px-4 card-content border border-borderGray">
            Backend infrastructure
          </div>
        </div>

        <div className="text-textGray mt-4 card">
          <div className=" text-white font-bold py-3 px-4 card-title">
            Accomplishments
          </div>
          <div className="py-3 px-4 card-content border border-borderGray">
            Graduated Top of class
          </div>
        </div>

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
