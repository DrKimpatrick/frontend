import React, { useState } from 'react';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CallMissedIcon from '@material-ui/icons/CallMissed';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Alert } from '@material-ui/lab';
import { object, string } from 'yup';
import { MainBackground, NavBar } from 'components/Reusable';
import { Routes } from 'utils/routes';
import './StandardBilling.scss';

export const standardSchema = object().shape({
  productPlan: string().required('select payment option (Monthly or Annual)')
});

const StandardBilling = () => {
  const location = useLocation<{ plans: any[]; features: any[] }>();

  const history = useHistory();

  const [coupon, setCoupon] = useState<string>();

  const [productPlan, setProductPlan] = useState<string>();

  const [validationError, setValidationError] = useState<string>();

  const onNext = async () => {
    if (!location.state || typeof location.state.plans === 'undefined') {
      return undefined;
    }

    try {
      const res = await standardSchema.validate({ productPlan });

      const {
        state: { plans }
      } = location;

      if (res && res.productPlan) {
        if (Number(res.productPlan) === 1) {
          history.push({
            pathname: '/payment',
            state: {
              plan: plans[1],
              featureChoice: 'standard',
              coupon
            }
          });
        } else {
          history.push({
            pathname: '/payment',
            state: {
              plan: plans[0],
              featureChoice: 'standard',
              coupon
            }
          });
        }
      }
    } catch (error) {
      setValidationError(error.message ? error.message : undefined);
    }

    return undefined;
  };

  if (!location.state || !location.state.plans) {
    return <Redirect to={Routes.FeatureChoice} />;
  }
  return (
    <>
      <NavBar />
      <section className="standard-billing-section m-auto text-gray-texts">
        <div className="flex relative h-auto my-8">
          <div className="back-arrow cursor-pointer">
            <ArrowBackTwoToneIcon onClick={() => history.goBack()} />
          </div>
          <h1 className="font-bold text-xl title">Standard Billing Options</h1>
        </div>

        {location.state.features.map((feature: any, i: any) => (
          <div key={i} className="text-gray-texts mt-8 py-1 card">
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
            <div className="pricing">
              <div className="flex justify-start items-center">
                <span>
                  {`${location.state.plans[1].interval
                    .charAt(0)
                    .toUpperCase()}${location.state.plans[1].interval.slice(
                    1
                  )}ly`}
                </span>
                {productPlan && productPlan === String(1) && (
                  <span className="mx-1" style={{ color: '#1437b1' }}>
                    <CheckCircleIcon />
                  </span>
                )}
              </div>
              <button
                className="monthly w-full text-white py-2 mt-1 flex justify-center"
                type="button"
                onClick={() => setProductPlan(String(1))}
              >
                <span>{location.state.plans[1].amount}</span>
              </button>
            </div>
            <div className="pricing">
              <div className="flex justify-start items-center">
                <span>Annual 15% Discount</span>
                {productPlan && productPlan === String(0) && (
                  <span className="mx-1" style={{ color: '#4d9b62' }}>
                    <CheckCircleIcon />
                  </span>
                )}
              </div>

              <button
                className="annually w-full text-white py-2 mt-1 flex justify-center relative"
                type="button"
                onClick={() => setProductPlan(String(0))}
              >
                <span>{location.state.plans[0].amount}</span>
                <CallMissedIcon
                  fontSize="large"
                  className="absolute top-0 right-0"
                />
              </button>
            </div>
          </div>

          <input
            type="text"
            placeholder="Promo Code"
            onChange={e => {
              setCoupon(e.target.value as any);
            }}
            className="w-full py-2 mt-3 flex justify-center promo-code"
          />
          <button
            type="button"
            className="w-full border-none outline-none rounded-sm mt-4 font-bold"
            style={{ background: '#545454', color: 'white', height: '50px' }}
            onClick={onNext}
          >
            Next
          </button>
          {validationError && (
            <div className="mt-2">
              <Alert severity="error">{validationError}</Alert>
            </div>
          )}
        </div>
      </section>
      <MainBackground />
    </>
  );
};

export default StandardBilling;
