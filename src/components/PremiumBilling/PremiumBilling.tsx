import React, { FC } from 'react';
import { withRouter } from 'react-router-dom';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import ArrowRightAltTwoToneIcon from '@material-ui/icons/ArrowRightAltTwoTone';
import CheckIcon from '@material-ui/icons/Check';
import NavBar from '../Layout/NavBar/NavBar';
import MainBackground from '../Layout/MainBackground/MainBackground';

type props = {};
const PremiumBilling: FC<props> = () => {
  return (
    <>
      <NavBar />
      <section className="premium-billing-section w-1/3 m-auto text-textGray">
        <div className="flex relative h-auto my-8">
          <div className="back-arrow cursor-pointer">
            <ArrowBackTwoToneIcon />
          </div>
          <h1 className="font-bold text-xl title">Premium Billing Options</h1>
        </div>

        <div className="text-textGray mt-8  card py-1">
          <div className="font-bold py-3 px-16 check-icon">
            <CheckIcon />
          </div>
          <div className="py-3 card-content">
            <h3 className="font-bold text-textGray card-title">
              Top Talent Listing
            </h3>
            <div className="text-textGray mt-1 card-description">
              Employers will see your profile before standard & basic members.
            </div>
          </div>
        </div>

        <div className="text-textGray mt-3 card py-1">
          <div className="font-bold py-3 px-16 check-icon">
            <CheckIcon />
          </div>
          <div className="py-3 card-content">
            <h3 className="font-bold text-textGray card-title">
              Employment Verification
            </h3>
            <div className="text-textGray mt-1 card-description">
              Your employment records will be pre verified expediting the hiring
              process.
            </div>
          </div>
        </div>

        <div className="text-textGray mt-3 card py-1">
          <div className="font-bold py-3 px-16 check-icon">
            <CheckIcon />
          </div>
          <div className="py-3 card-content">
            <h3 className="font-bold text-textGray card-title">
              Education Verification
            </h3>
            <div className="text-textGray mt-1 card-description">
              Your education records will be pre verified expediting the hiring
              process.
            </div>
          </div>
        </div>

        <div className="text-textGray mt-3 card py-1">
          <div className="font-bold py-3 px-16 check-icon">
            <CheckIcon />
          </div>
          <div className="py-3 card-content">
            <h3 className="font-bold text-textGray card-title">
              3 Skill Certifications Vouchers
            </h3>
            <div className="text-textGray mt-1 card-description">
              3 Vouchers for any tech talent skill certification test.
            </div>
          </div>
        </div>

        <div className="text-textGray mt-3 card py-1">
          <div className="font-bold py-3 px-16 check-icon">
            <CheckIcon />
          </div>
          <div className="py-3 card-content">
            <h3 className="font-bold text-textGray card-title">
              15% off Certification & Training
            </h3>
            <div className="text-textGray mt-1 card-description">
              15% off all tech talent certifications & training.
            </div>
          </div>
        </div>

        <div className="w-3/4 mx-auto my-8 bottom-card">
          <div className="flex justify-between w-full">
            <div className="pricing ">
              <span>Monthly</span>
              <button
                className="monthly w-full text-white py-2 mt-1 flex justify-center"
                type="button"
              >
                <span>$19.99</span>
              </button>
            </div>
            <div className="pricing ">
              <span>Annual 15% Discount</span>
              <button
                className="annually w-full text-white py-2 mt-1 flex justify-center"
                type="button"
              >
                <span>$203.90</span>
              </button>
            </div>
          </div>

          <input
            type="text"
            placeholder="Promo Code"
            className="w-full py-2 mt-3 flex justify-center promo-code"
          />
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

export default withRouter(PremiumBilling);
