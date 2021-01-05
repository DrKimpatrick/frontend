import React from 'react';
import { useSelector } from 'react-redux';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import { useHistory } from 'react-router-dom';
import { MainBackground, NavBar } from 'components/Reusable';
import successCheck from 'assets/images/2-check.png';
import { Image, TrendingFlat } from '@material-ui/icons';
import { RootState } from 'redux/store';

import './styles.scss';
import { redirect } from 'utils/Redirect';

const PaymentsSuccess = () => {
  const history = useHistory();

  const reducer = useSelector((state: RootState) => {
    const { user } = state.users;

    return { user };
  });

  const { user } = reducer;

  const saveAndReviewProfile = () => {
    if (user) {
      window.location.href = String(redirect(user.roles));
    }

    return undefined;
  };

  const reviewAndPublishProfile = () => {
    if (user) {
      window.location.href = String(redirect(user.roles));
    }
    return undefined;
  };

  return (
    <>
      <NavBar />
      <section className="process-payments-section mx-auto text-gray-texts">
        <div className="flex flex-col">
          <div className="text-2xl flex items-center">
            <ArrowBackTwoToneIcon
              className="back-arrow -ml-12 mr-6 cursor-pointer"
              onClick={() => history.goBack()}
            />
            <h1 className="font-bold title">Payment Successful</h1>
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
