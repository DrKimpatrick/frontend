import React, { useEffect, useState } from 'react';
import { ArrowRightAltTwoTone } from '@material-ui/icons';
import './AddSubsidy.scss';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import useSWR from 'swr';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../../redux/store';
import { FormTitle } from '../Forms/FormTitle';
import Loader from '../Loader/Loader';
import { Routes } from '../../../utils/routes';

interface ProductResponse {
  adminProducts: any[];
  products: any[];
}

const AddSubsidy: React.FC = () => {
  const defaultValues = { plan: '{}', tier: '{}' };

  const [plans, setPlans] = useState<Record<string, any>[]>([]);
  const [tiers, setTiers] = useState<Record<string, any>[]>([]);
  const history = useHistory();
  const reducer = useSelector((state: RootState) => {
    const { loading, user, errors } = state.users;
    return { loading, user, errors };
  });

  const { data: productsData }: { data: ProductResponse } & any = useSWR(
    '/stripe/products'
  );

  useEffect(() => {
    if (productsData) {
      const { adminProducts } = productsData;
      const plansX = adminProducts[0]?.plans || [];

      setPlans(plansX);
      setTiers([]);
    }
  }, [productsData]);

  const onSubmitHandler = (values: { plan: string; tier: string }) => {
    const plan: Record<string, unknown> = JSON.parse(values.plan);
    const tier: Record<string, unknown> = JSON.parse(values.tier);

    let subsidy;

    if (plan && plan.id) {
      subsidy = {
        planId: plan.id,
        quantity: tier.up_to,
        tier
      };
    }

    if (reducer.user) {
      history.push({
        pathname: '/payment',
        state: {
          subsidy,
          plan,
          successPage: Routes.SubsidySuccessPayment,
          featureChoice: 'premium'
        }
      });
    }
  };

  return (
    <section className="add-company-section w-1/3 m-auto text-gray-texts mb-8">
      <FormTitle
        title="How many students do you want to enroll?"
        showBackArrow
      />
      <Formik
        enableReinitialize={false}
        initialValues={defaultValues}
        validateOnChange
        onSubmit={onSubmitHandler}
      >
        {formik => (
          <form className="form-company-school" onSubmit={formik.handleSubmit}>
            <div className="text-gray-texts flex flex-col">
              <label htmlFor="plan" className="mt-4 mb-2">
                Subsidy Term
              </label>
              <select
                className="w-full border border-gray-400 p-2 focus:outline-none focus:border-gray-500 rounded input-height"
                onChange={event => {
                  formik.handleChange(event);
                  const value = JSON.parse(event.target.value);
                  setTiers(value.tiers);
                }}
                onBlur={formik.handleBlur}
                id="plan"
                defaultValue="UNDEFINED"
              >
                <option value="UNDEFINED" disabled>
                  Select Term
                </option>
                {plans.map((plan, i) => {
                  return (
                    <option key={i} value={JSON.stringify(plan)}>
                      {plan.interval}
                    </option>
                  );
                })}
              </select>
              {formik.errors.plan && (
                <div className="inputError">{formik.errors.plan}</div>
              )}
            </div>

            <div className="text-gray-texts flex flex-col">
              <label htmlFor="tier" className="mt-4 mb-2">
                Number of subsidized students
              </label>
              <select
                className="w-full border border-gray-400 p-2 focus:outline-none focus:border-gray-500 rounded input-height"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="tier"
                defaultValue="NONE"
              >
                <option disabled value="NONE">
                  Select Number
                </option>
                {tiers.map((tier, i) => (
                  <option key={i} value={JSON.stringify(tier)}>
                    {tier.up_to}
                  </option>
                ))}
              </select>
              {formik.errors.tier && (
                <div className="inputError">{formik.errors.tier}</div>
              )}
            </div>
            <div className="flex justify-center mt-10 flex-col items-center">
              <button
                data-testid="next-button"
                className="next-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-32 rounded-sm shadow"
                type="submit"
              >
                <Loader
                  loading={reducer.loading}
                  command={
                    <>
                      <label className="">Next</label>
                      <ArrowRightAltTwoTone />
                    </>
                  }
                />
              </button>
            </div>
          </form>
        )}
      </Formik>
    </section>
  );
};

export default AddSubsidy;
