import React from 'react';
import useSWR from 'swr';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import { useHistory } from 'react-router-dom';
import { MainBackground, NavBar, SplashScreen } from 'components/Reusable';
import { Talent } from 'components/Home';
import './FeatureChoice.scss';

const FeatureChoice = () => {
  const { data: productResponse } = useSWR('/stripe/products');
  const history = useHistory();

  if (!productResponse) {
    return <SplashScreen />;
  }

  return (
    <>
      <NavBar />
      <section className="container mx-auto flex flex-col items-center justify-center feature-choice-section">
        <div className="text-2xl flex items-center text-gray-texts">
          <ArrowBackTwoToneIcon
            className="back-arrow cursor-pointer"
            onClick={() => history.goBack()}
          />
          <h1 className="ml-4 font-bold title">
            What features would you like to have?
          </h1>
        </div>

        <div className="mt-8 w-full">
          {productResponse && (
            <div className="flex flex-col items-center md:justify-between lg:items-start lg:flex-row">
              {productResponse.products.map((product: any) => {
                let productAction = '/notification';
                if (product.name.includes('Standard')) {
                  productAction = '/standard-billing';
                } else if (product.name.includes('Premium')) {
                  productAction = '/premium-billing';
                }
                return (
                  <Talent
                    key={product.id}
                    productDetails={product.productDetails}
                    plans={product.plans}
                    action={productAction}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>
      <MainBackground />
    </>
  );
};

export default FeatureChoice;
