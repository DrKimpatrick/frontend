import React from 'react';
import { SplashScreen } from 'components/Reusable';

const SplashScreenMobile = () => {
  return (
    <div>
      <div className="half-background half-background-top" />
      <SplashScreen classes="background-transparent" />
      <div className="half-background half-background-bottom" />
    </div>
  );
};

export default SplashScreenMobile;
