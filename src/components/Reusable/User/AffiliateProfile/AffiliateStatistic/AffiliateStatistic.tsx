import React from 'react';
import './AffiliateStatistic.scss';

export interface StatisticItem {
  name: string;
  rate: number | string;
  icon: any;
}
interface Props {
  item: StatisticItem[];
}

export const AffiliateStatistic = (props: Props) => {
  const { item } = props;

  return (
    <ul className="listOfStatistic">
      {item.map((data, index) => (
        <li key={index}>
          <div className="flex items-center">
            {data.icon}
            <span className="name">{data.name}</span>
          </div>
          <div className="rate">
            <span>{data.rate}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AffiliateStatistic;
