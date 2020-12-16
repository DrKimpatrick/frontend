import React from 'react';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import NavBar from '../Layout/NavBar/NavBar';
import MainBackground from '../Layout/MainBackground/MainBackground';
import './styles.scss';

const PremiumBilling = () => {
  const {
    state: { plans: productPlans, features }
  } = useLocation<{ plans: any[]; features: any[] }>();
  const history = useHistory();

  return (
    <>
      <NavBar />
      <section className="premium-billing-section w-1/3 m-auto text-gray-texts">
        <div className="flex relative h-auto my-8">
          <div className="back-arrow cursor-pointer">
            <ArrowBackTwoToneIcon onClick={() => history.goBack()} />
          </div>
          <h1 className="font-bold text-xl title">Premium Billing Options</h1>
        </div>

        {features.map((feature: any, i: number) => (
          <div key={i} className="text-gray-texts mt-8 card py-1">
            <div className="font-bold py-3 px-16 check-icon">
              {feature.available ? (
                <CheckIcon className="text-green-700" />
              ) : (
                <CloseIcon className="text-red-700" />
              )}
            </div>
            <div className="py-3 card-content">
              <h3
                className={`-ml-1 font-bold ${
                  feature.available ? 'text-green-700' : 'text-red-700'
                } card-title`}
              >
                {feature.name}
              </h3>
              <div className="text-gray-texts mt-1 card-description">
                <InfoOutlinedIcon className="-ml-8 mr-2" fontSize="small" />
                {feature.detail}
              </div>
            </div>
          </div>
        ))}

        <div className="w-3/4 mx-auto my-8 bottom-card">
          <div className="flex justify-between w-full">
            <div className="pricing ">
              <span>Monthly</span>
              <button
                className="monthly w-full text-white py-2 mt-1 flex justify-center"
                type="button"
                onClick={() =>
                  history.push({
                    pathname: '/payment',
                    state: {
                      plan: productPlans[1],
                      featureChoice: 'premium'
                    }
                  })
                }
              >
                <span>{productPlans[1].amount}</span>
              </button>
            </div>
            <div className="pricing ">
              <span>Annual 15% Discount</span>
              <button
                className="annually w-full text-white py-2 mt-1 flex justify-center"
                type="button"
                onClick={() =>
                  history.push({
                    pathname: '/payment',
                    state: {
                      plan: productPlans[0],
                      featureChoice: 'premium'
                    }
                  })
                }
              >
                <span>{productPlans[0].amount}</span>
              </button>
            </div>
          </div>

          <input
            type="text"
            placeholder="Promo Code"
            className="w-full py-2 mt-3 flex justify-center promo-code"
          />
        </div>
      </section>
      <MainBackground />
    </>
  );
};

export default withRouter(PremiumBilling);
