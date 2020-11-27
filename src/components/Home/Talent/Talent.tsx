import React, { FC } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import DoneAllIcon from '@material-ui/icons/DoneAll';

type talentProps = {
  title: string;
  priceMonthly: any;
  priceAnnually: any;
  details: { status: boolean; name: string }[];
};

const Talent: FC<talentProps> = ({
  title,
  details,
  priceMonthly,
  priceAnnually
}: any) => {
  return (
    <div className="margin-grid-1 ">
      <h2
        className={
          title === 'Standard'
            ? 'text-blue-600 font-medium text-2xl'
            : title === 'Premium'
            ? 'text-green-600 font-medium text-2xl'
            : 'text-black font-medium text-2xl'
        }
      >
        {title.toUpperCase()}
      </h2>
      <div className="mt-4">
        {details.map((value: any) => (
          <div key={Math.random()} className="flex mt-4">
            {value.status ? (
              <CloseIcon className="text-red-600 customFont" />
            ) : (
              <CheckIcon className="text-green-700 customFont" />
            )}
            <p className="text-gray-800 ml-4">{value.name}</p>
          </div>
        ))}
        <div className="mt-8">
          <p className="ml-2 text-gray-600 text-sm">
            {!priceMonthly ? 'Free' : `Monthly $ ${priceMonthly}`}
          </p>
          <div className="flex">
            <button
              className={
                title === 'Standard'
                  ? 'flex bg-blue-600 text-white text-sm font-normal py-2 px-2 rounded ml-2'
                  : title === 'Premium'
                  ? ' flex bg-green-600 text-white text-sm font-normal py-2 px-2 rounded ml-2'
                  : 'flex bg-black text-white text-sm font-normal py-2 px-2 rounded ml-2'
              }
            >
              I WANT TO BE SEEN <DoneAllIcon className="ml-4" />
            </button>
          </div>
          <div className="flex">
            <p className="ml-2 text-gray-600 text-sm">
              {!priceAnnually ? '' : `Annually $ ${priceAnnually}`}
            </p>
            <p className="text-green-600 text-xs">
              {!priceAnnually ? '' : '15%'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Talent;
