import React, { FC, useEffect, useState } from 'react';
import useWindowSize from 'utils/useWindowSize';
import { accounts, subscriptions, testmonials } from 'utils/staticData';
import { withRouter, useHistory } from 'react-router-dom';
import {
  Footer,
  NavBar,
  BottomMenu,
  MainBackground
} from 'components/Reusable';
import { Testmonials, FrontView, Talent, AccountType, HowItWork } from '..';
import './Landing.scss';

const Landing: FC = () => {
  const [stepName, setStepName] = useState<string>();

  const size = useWindowSize();

  const history = useHistory();

  useEffect(() => {
    const data: any = new URLSearchParams(history.location.search).get('data');
    if (data) {
      localStorage.setItem('token', data);
      return history.push('/');
    }
    return history.push('/');
  }, [history]);

  return (
    <div>
      <NavBar />
      <div className="front-view">
        <FrontView />
      </div>
      <HowItWork setStepName={setStepName} />
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
        <div className="flex flex-wrap justify-center mr-4 ml-4">
          {accounts.map(acc => (
            <div key={acc.id} className="account-type-wrap mt-12 ml-4 mr-4">
              <AccountType
                title={acc.title}
                description={acc.description}
                setStepName={setStepName}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-full pb-16 mainColor">
        <div className="flex justify-center pt-8">
          <div className="flex justify-center w-1/2">
            <div className="flex w-1/3 py-5 mr-8">
              <hr className="w-full flex justify-center border border-gray-500" />
            </div>
            <h2 className="flex justify-center text-gray-700 font-black text-2xl uppercase">
              {stepName}
            </h2>
            <div className="flex w-1/3 py-5 ml-8">
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
      {size?.width && size?.width > 768 && <MainBackground />}
      {size?.width && size?.width > 768 ? <Footer /> : <BottomMenu />}
    </div>
  );
};

export default withRouter(Landing);
