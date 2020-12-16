import React, { FC } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import ArrowRightAltTwoToneIcon from '@material-ui/icons/ArrowRightAltTwoTone';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Routes } from 'utils/routes';
import { MainBackground, NavBar } from 'components/Reusable';
import './GetHired.scss';

const GetHired: FC = () => {
  const history = useHistory();

  return (
    <>
      <NavBar />
      <section className="get-hired-section w-1/3 m-auto text-gray-texts">
        <div className="flex relative h-auto my-8">
          <div className="back-arrow cursor-pointer">
            <ArrowBackTwoToneIcon onClick={() => history.goBack()} />
          </div>
          <div className="font-bold text-xl text-white title">
            <h2>Get Hired</h2>
          </div>
        </div>

        <div className="flex justify-center items-center flex-col mt-16">
          <div className="text-white percent-card flex justify-center items-center ">
            <div>
              <span>86</span>
              <span>%</span>
            </div>
            <VerifiedUserIcon fontSize="large" className="check-icon" />
          </div>
          <div className="w-3/5 text-center mt-5 font-bold">
            Employers are 86% more likely to hire certified and verified talent.
          </div>

          <div className="w-full mt-8 px-12 py-3 verified-checks">
            <div className="flex justify-between items-center my-3">
              <span>Skill Certifications</span>
              <CheckCircleIcon fontSize="small" className="check-circle-icon" />
            </div>
            <div className="flex justify-between items-center my-3">
              <span>Employment Verification</span>
              <CheckCircleIcon fontSize="small" className="check-circle-icon" />
            </div>
            <div className="flex justify-between items-center my-3">
              <span>Education Verification</span>
              <CheckCircleIcon fontSize="small" className="check-circle-icon" />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button
            data-testid="next-button"
            className="next-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-32 rounded-sm shadow flex justify-around"
            type="button"
            onClick={() => history.push(Routes.FeatureChoice)}
          >
            <span className="">Next</span> <ArrowRightAltTwoToneIcon />
          </button>
        </div>
      </section>
      <MainBackground />
    </>
  );
};

export default withRouter(GetHired);
