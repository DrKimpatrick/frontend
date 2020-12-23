import React, { FC } from 'react';
import cx from 'classnames';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DoneIcon from '@material-ui/icons/Done';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import { useHistory } from 'react-router-dom';

type TalentProps = {
  productDetails: any;
  plans: any;
  action: string;
};

const Talent: FC<TalentProps> = ({ plans, productDetails, action }) => {
  const history = useHistory();
  const planTitle =
    productDetails && productDetails.name
      ? productDetails.name.split(' ')[1]
      : '';
  const planBgColor = cx({
    'bg-blue-600': planTitle === 'Standard',
    'bg-green-600': planTitle === 'Premium',
    'bg-black': planTitle === 'Basic'
  });
  let buttonText: JSX.Element;
  if (planTitle === 'Standard') {
    buttonText = (
      <span className="flex flex-no-wrap">
        I WANT TO BE SEEN <DoneAllIcon className="ml-4" />
      </span>
    );
  } else if (planTitle === 'Premium') {
    buttonText = (
      <span className="flex flex-no-wrap">
        I WANT TO BE HIRED <DoneAllIcon className="ml-4" />
      </span>
    );
  } else {
    buttonText = (
      <span className="flex flex-no-wrap">
        GET STARTED <DoneIcon className="ml-4" />
      </span>
    );
  }

  const parsePlans = () => {
    return plans.map((planDataItem: any) => {
      if (+planDataItem.amount_decimal === 0) {
        planDataItem.price = 'Free';
        return planDataItem;
      }

      planDataItem.price = `${
        planDataItem.interval.charAt(0).toUpperCase() +
        planDataItem.interval.slice(1)
      }ly ${planDataItem.amount}`;
      return planDataItem;
    });
  };

  if (!productDetails) {
    return null;
  }

  return (
    <div className="w-full mb-8 md:mb-0 p-4 feature-min-w md:feature-max-w">
      <div
        className={`py-1 flex items-center justify-center rounded ${planBgColor} text-white`}
      >
        <h2 className="font-medium text-xl">{planTitle.toUpperCase()}</h2>
      </div>
      <div className="mt-4">
        {productDetails.features.map((feature: any) => (
          <div key={feature.name} className="flex flex-col mt-4">
            <div className="flex">
              {feature.available ? (
                <CheckIcon className="text-green-700 customFont" />
              ) : (
                <CloseIcon className="text-red-600 customFont" />
              )}
              <p className="text-gray-800 ml-4">{feature.name}</p>
            </div>
            {feature.detail && (
              <div className="ml-8 mt-2 flex font-thin text-gray-texts">
                <InfoOutlinedIcon fontSize="small" />
                <span className="ml-2 text-xs">{feature.detail}</span>
              </div>
            )}
          </div>
        ))}

        <div className="feature">
          <div className="mb-1 flex flex-col">
            <button
              type="button"
              className={`text-white text-lg font-normal p-2 rounded ${planBgColor} order-2`}
              onClick={() =>
                history.push({
                  pathname: action,
                  state: { plans, features: productDetails.features }
                })
              }
            >
              {buttonText}
            </button>
            {parsePlans()
              .reverse()
              .map((p: any, i: number) => (
                <p
                  key={p.id}
                  className={`ml-2 text-gray-600 font-thin text-base order-${
                    i % 2 === 0 ? i + 1 : i + 2
                  }`}
                >
                  <span className="flex">
                    {(p.price !== 'Free' && p.price) || 'Free'}{' '}
                    {p.interval === 'year' && (
                      <span className="ml-1 text-sm text-success flex">
                        15%
                        <TrendingDownIcon color="inherit" fontSize="inherit" />
                      </span>
                    )}
                  </span>
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Talent;
