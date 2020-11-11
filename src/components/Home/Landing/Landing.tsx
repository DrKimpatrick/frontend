import React, { FC, useEffect } from 'react';
import NavBar from 'components/Reusable/Layout/NavBar/NavBar';
import useWindowSize from 'utils/useWindowSize';
import {
  frontData,
  steps,
  accounts,
  subscriptions,
  testmonials
} from 'utils/staticData';
import { withRouter } from 'react-router-dom';
import { Steps, Testmonials, FrontView, Talent, AccountType } from '..';
import './Landing.scss';

const Landing: FC<any> = props => {
  const size = useWindowSize();

  useEffect(() => {
    const data: any = new URLSearchParams(props.history.location.search).get(
      'data'
    );
    if (data) {
      localStorage.setItem('token', data);
      const token = localStorage.getItem('token');
      return props.history.push('/');
    }
    return props.history.push('/');
  }, [props.history]);
  return (
    <div>
      <NavBar />
      <div className="front-view">
        <FrontView
          title={frontData.title}
          description={frontData.description}
        />
      </div>
      <div>
        <h2
          data-testid="howItWorks"
          className="flex justify-center mt-16 text-gray-600 font-black text-2xl"
        >
          How it works
        </h2>
        <div className="flex justify-center pl-12 pr-12 mt-12 mb-32 display-grid">
          {steps.map(st => (
            <Steps
              key={Math.random()}
              step={st.step}
              details={st.stepDetails}
            />
          ))}
        </div>
      </div>
      <div className="w-full h-full mainColor mt-16 pb-16">
        <h2 className="flex justify-center pt-4 pb-12 text-gray-700 font-normal text-xl">
          Trusted by 20B+ Business
        </h2>
        <div className="flex justify-around">
          <div className="flex justify-center w-3/5 h-16">
            <img
              className="flex justify-center w-2/4 object-scale-down"
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-logos-vector-eps-cdr-svg-download-10.png"
              alt=""
            />
          </div>
          <div className="flex justify-center w-3/5 h-16">
            <img
              className="flex justify-center w-2/4 object-scale-down"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png"
              alt=""
            />
          </div>
          <div className="flex justify-center w-3/5 h-16">
            <img
              className="flex justify-center w-2/4 object-scale-down"
              src="https://www.carlogos.org/car-logos/tesla-logo-2200x2800.png"
              alt=""
            />
          </div>
          <div className="flex justify-center w-3/5 h-16">
            <img
              className="flex justify-center w-2/4 object-scale-down"
              src="https://pngimg.com/uploads/microsoft/microsoft_PNG10.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="w-full h-full pb-16">
        <h2 className="flex justify-center mt-8 text-gray-600 font-black text-2xl type-title">
          What type of account do you want?
        </h2>
        <div className="flex justify-center mr-4 ml-4 display-grid">
          {accounts.map(acc => (
            <AccountType
              key={Math.random()}
              title={acc.title}
              description={acc.description}
            />
          ))}
        </div>
      </div>
      <div className="w-full h-full pb-16 mainColor">
        <div className="flex justify-center pt-8">
          <div className="flex justify-center w-1/2">
            <div className="flex w-1/2 py-5 mr-8">
              <hr className="w-full flex justify-center border border-gray-500" />
            </div>
            <h2 className="flex justify-center text-gray-700 font-black text-2xl">
              TALENT
            </h2>
            <div className="flex w-1/2 py-5 ml-8">
              <hr className="w-full flex justify-center border border-gray-500" />
            </div>
          </div>
        </div>

        <div className="flex justify-around mt-8 display-grid">
          {subscriptions.map(sub => (
            <Talent
              key={Math.random()}
              title={sub.title}
              priceMonthly={sub.priceMonthly}
              priceAnnually={sub.priceAnnually}
              details={sub.values}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center mb-16">
        <Testmonials key={Math.random()} testData={testmonials} />
      </div>
      {size?.width && size?.width > 768 && <div className="main-background" />}
    </div>
  );
};

export default withRouter(Landing);
