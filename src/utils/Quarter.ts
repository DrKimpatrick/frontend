import { SubscriptionRecommendation } from 'redux/actions/user';

interface Quarter {
  q: number;
  amount: number;
}
export interface QuarterCommissionType {
  year?: number;
  quarters?: Quarter[];
}

const groupInQuarter = (values: Quarter[]) => {
  let totalQ1 = 0;

  let totalQ2 = 0;

  let totalQ3 = 0;

  let totalQ4 = 0;

  const result = [];

  const percentage = 10;

  for (let i = 0; values.length > i; i++) {
    const { q } = values[i];
    if (q === 1) {
      totalQ1 += values[i].amount;
    }

    if (q === 2) {
      totalQ2 += values[i].amount;
    }

    if (q === 3) {
      totalQ3 += values[i].amount;
    }

    if (q === 4) {
      totalQ4 += values[i].amount;
    }
  }

  // verify if total amount is not equal to 0

  if (totalQ1 !== 0) {
    result.push({
      q: 1,
      amount: (totalQ1 * percentage) / 100
    });
  }

  if (totalQ2 !== 0) {
    result.push({
      q: 2,
      amount: (totalQ2 * percentage) / 100
    });
  }

  if (totalQ3 !== 0) {
    result.push({
      q: 3,
      amount: (totalQ3 * percentage) / 100
    });
  }

  if (totalQ4 !== 0) {
    result.push({
      q: 4,
      amount: (totalQ4 * percentage) / 100
    });
  }

  return result;
};

export const QuarterCommission = (values: SubscriptionRecommendation[]) => {
  const result = [];

  for (let i = 0; values.length > i; i++) {
    const { payment, year } = values[i];

    const yearQuarter: QuarterCommissionType = {};

    const quarters: Quarter[] = [];

    for (let j = 0; payment.length > j; j++) {
      yearQuarter.year = year;

      const date = new Date(payment[j].paidOn);

      const month = date.getMonth();

      // eslint-disable-next-line radix
      const q = parseInt(String(month / 3)) + 1;

      quarters.push({ q, amount: payment[j].amount });

      yearQuarter.quarters = quarters;
    }

    const groupQuarter = groupInQuarter(yearQuarter.quarters as Quarter[]);

    delete yearQuarter.quarters;

    yearQuarter.quarters = groupQuarter;

    result.push(yearQuarter);
  }

  return result;
};
