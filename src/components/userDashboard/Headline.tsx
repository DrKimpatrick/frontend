import React, { Fragment, FC } from 'react';

type props = {
  headline: string;
  icon: any;
};
const Headline: FC<props> = ({ headline, icon }) => {
  return (
    <Fragment>
      <div className=" flex flex-no-wrap uppercase font-thin">
        <div className="light-fonts">{icon}</div>
        <span className="px-2">{headline}</span>
      </div>
    </Fragment>
  );
};

export default Headline;
