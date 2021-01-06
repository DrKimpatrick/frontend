import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useSWR from 'swr';
import { accounts, testmonials } from 'utils/staticData';
import useWindowSize from 'utils/useWindowSize';
import { NavBar, BottomMenu, MainBackground } from 'components/Reusable';
import { RootState } from 'redux/store';
import IsLoggedIn from '../../Reusable/Layout/NavBar/IsLoggedIn';
import { Testmonials, FrontView, Talent, HowItWork, AccountType } from '..';
import './Landing.scss';

const Landing: FC = () => {
  const reducer = useSelector((state: RootState) => {
    const { user } = state.users;
    return { user };
  });

  const [stepName, setStepName] = useState<string>();
  const size = useWindowSize();
  const { data: productResponse } = useSWR('/stripe/products');
  const history = useHistory();

  useEffect(() => {
    const data = new URLSearchParams(history.location.search).get('data');

    if (data) {
      localStorage.setItem('token', data);
      return history.push('/');
    }

    return history.push('/');
  }, [history]);

  return (
    <>
      <div>
        {(size?.width && size?.width > 768) || reducer.user ? (
          <NavBar />
        ) : (
          <div className="flex justify-between items-center">
            <NavBar />
            <div className="flex flex-col mr-4 auth-container">
              <IsLoggedIn />
            </div>
          </div>
        )}
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
          {productResponse && (
            <div className="mt-8 px-20 flex flex-col items-center md:justify-between lg:items-start lg:flex-row">
              {productResponse.products.map((product: any) => (
                <Talent
                  key={product.id}
                  productDetails={product.productDetails}
                  plans={product.plans}
                  action="/register"
                />
              ))}
            </div>
          )}
        </div>
        <div className="w-full flex justify-center mb-16">
          <Testmonials key={Math.random()} testData={testmonials} />
        </div>
        {size?.width && size?.width > 768 && <MainBackground />}
        {size?.width && size?.width < 768 && reducer.user && <BottomMenu />}
      </div>
    </>
  );
};

export default Landing;
