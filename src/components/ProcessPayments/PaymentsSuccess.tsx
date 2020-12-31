import React from 'react';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import { useHistory } from 'react-router-dom';
import { MainBackground, NavBar } from 'components/Reusable';
import successCheck from 'assets/images/2-check.png';
import { Image, TrendingFlat } from '@material-ui/icons';

import './styles.scss';
import {Routes} from "../../utils/routes";

const PaymentsSuccess = () => {
  const history = useHistory();

  const saveAndReviewProfile = () => {
    // TODO: not sure what is supposed to be saved(the mockups have different ideas)
    history.replace(Routes.UserDashboard);
  };

  const reviewAndPublishProfile = () => {
    // TODO: not sure what is supposed to be saved(the mockups have different ideas)
    history.replace(Routes.UserDashboard);
  };

  return (
    <>
      <NavBar />
      <section className="w-1/3 mx-auto text-gray-texts">
        <div className="flex flex-col">
          <div className="text-2xl flex items-center">
            <ArrowBackTwoToneIcon
              className="-ml-12 mr-6 cursor-pointer"
              onClick={() => history.goBack()}
            />
            <h1 className="font-bold">Payment Successful</h1>
          </div>

          <div className="flex items-center justify-center flex-col mt-4 mb-4">
            <img src={successCheck} alt="Success Check" />
            <p className="text-center mt-2">
              <strong className="text-green-500">Congratulations</strong> you
              are a <b>premium</b> <br /> Tech Talent Member
            </p>
          </div>

          <div className="flex items-center justify-center flex-col mt-4 mb-4">
            <button
              disabled
              type="button"
              className="bg-gray-200 py-3 w-2/3 flex flex-row rounded justify-center"
            >
              <Image /> Upload Photo
            </button>
          </div>

          <div className="flex items-center justify-center flex-col mt-4 mb-4">
            <h4 className="font-bold mb-2">Profile Tagline</h4>
            <span>
              <strong>
                I engineer efficient solutions to complicated problems
              </strong>
            </span>
          </div>

          <div className="flex items-center justify-center flex-col mt-4 mb-4 space-y-5">
            <button
              type="button"
              className="bg-green-600 text-white py-3 w-2/3 flex flex-row rounded justify-around py-3"
              onClick={reviewAndPublishProfile}
            >
              Review & Publish Profile <TrendingFlat />
            </button>

            <button
              type="button"
              className="bg-green-600 text-white py-3 w-2/3 flex flex-row rounded justify-around py-3"
              onClick={saveAndReviewProfile}
            >
              Save & Review later <TrendingFlat />
            </button>
          </div>
        </div>
      </section>
      <MainBackground />
    </>
  );
};

export default PaymentsSuccess;
