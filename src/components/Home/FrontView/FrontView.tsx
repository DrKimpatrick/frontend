import React, { FC } from 'react';
import frontStyles from './FrontView.style';

type frontProps = {
  title: string;
  description: string;
};

const FrontView: FC<frontProps> = ({ title, description }) => {
  return (
    <frontStyles.FrontContainer data-testid="frontView">
      <frontStyles.FrontText>
        <h2 className="pt-24 text-4xl text-white font-semibold">{title}</h2>
        <div className="mt-4 text-white w-3/4 front-mob">{description}</div>
        <div className="flex justify-between w-3/4 mt-8 pb-8 front-mob">
          <a
            href="/register"
            className="bg-green-500 w-40 text-white font-medium py-2 px-4 rounded"
          >
            Get Started
          </a>
          <button
            className="bg-white w-40 text-green font-medium py-2 px-4 rounded"
            style={{ color: 'green' }}
            type="button"
          >
            Watch Demo
          </button>
        </div>
      </frontStyles.FrontText>
    </frontStyles.FrontContainer>
  );
};

export default FrontView;
