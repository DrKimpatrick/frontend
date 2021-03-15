import React, { FC } from 'react';

type Props = {
  headline: string;
  icon: any;
  className: string;
};
const Headline: FC<Props> = props => {
  const { headline, icon, className } = props;
  return (
    <>
      <div
        className={`${className} flex flex-no-wrap uppercase items-center mb-5`}
      >
        <span className="px-2 text-xs">{icon}</span>
        <span className="px-2">{headline}</span>
      </div>
    </>
  );
};

export default Headline;
