import React, { FC } from 'react';

type props = {
  headline: string;
  icon: any;
};
const Headline: FC<props> = ({ headline, icon }) => {
  return (
    <>
      <div className="flex flex-no-wrap uppercase font-thin items-center">
        <div className="light-fonts">{icon}</div>
        <span className="px-2">{headline}</span>
      </div>
    </>
  );
};

export default Headline;
