import React, { FC, Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import ArrowRightAltTwoToneIcon from '@material-ui/icons/ArrowRightAltTwoTone';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import NavBar from 'components/Layout/NavBar/NavBar';

type props = {};
const EmploymentHistoryList: FC<props> = (props: any) => {

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      props.history.push('/login');
    }
  });
  return (
    <Fragment>
      <NavBar />
      <section className="employment-history-list-section w-1/3 m-auto text-textGray">
        <div className="flex relative h-auto my-8">
          <div
            className="back-arrow cursor-pointer"
            onClick={() => props.history.push('/employment-history')}
          >
            <ArrowBackTwoToneIcon />
          </div>
          <h1 className="font-bold text-xl title">Employment History</h1>
        </div>

        <div className="text-textGray mt-8 border border-borderGray card">
          <div className=" text-white font-bold py-3 px-4 card-title">
            Google, VP of Engineering
          </div>
          <div className="py-3 px-4 card-content">March, 2020 - Current</div>
        </div>

        <div className="text-textGray mt-4 border border-borderGray card">
          <div className=" text-white font-bold py-3 px-4 card-title">
            Facebook, Director of Engineering
          </div>
          <div className="py-3 px-4 card-content">March, 2018 - March 2019</div>
        </div>

        <div className="text-textGray mt-4 border border-borderGray card">
          <div className=" text-white font-bold py-3 px-4 card-title">
            Twitter, Technical Lead
          </div>
          <div className="py-3 px-4 card-content">March, 2017 - March 2018</div>
        </div>

        <div className="text-textGray mt-4 border border-borderGray card">
          <div className=" text-white font-bold py-3 px-4 card-title">
            Snapchat, Senior Software Engineer
          </div>
          <div className="py-3 px-4 card-content">
            March, 2016 - March, 2017
          </div>
        </div>

        <div className="text-textGray mt-4 border border-borderGray card">
          <div className=" text-white font-bold py-3 px-4 card-title">
            AR Devs, Mid Level Software Engineer
          </div>
          <div className="py-3 px-4 card-content">March, 2015 - March 2016</div>
        </div>

        <div className="text-textGray mt-4 border border-borderGray card">
          <div className=" text-white font-bold py-3 px-4 card-title">
            Bank of America, Junior Software Engineer
          </div>
          <div className="py-3 px-4 card-content">
            March, 2014 - March, 2015
          </div>
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
            onClick={() => props.history.push('/user/dashboard')}
          >
            <span className="">Next</span> <ArrowRightAltTwoToneIcon />
          </button>
        </div>
      </section>
    </Fragment>
  );
};

export default withRouter(EmploymentHistoryList);
