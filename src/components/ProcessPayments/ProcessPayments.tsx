/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import useSWR from 'swr';
import { StripeCardElement, PaymentMethod } from '@stripe/stripe-js';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLocation, useHistory } from 'react-router-dom';
import { Formik } from 'formik';

import axiosInstance from 'utils/axiosInstance';
import {
  Alert,
  AlertLevel,
  Field,
  MainBackground,
  NavBar,
  SplashScreen
} from 'components/Reusable';
import { ErrorMessageDialog } from 'components/Reusable/ErrorMessageDialog';

import './styles.scss';
import { PaymentSchema } from './PaymentSchema';
import { AdminsProcess, TalentProcess } from '../../redux/action-types/user';
import { Routes } from '../../utils/routes';

const ProcessPayments = () => {
  const elements = useElements();
  const stripe = useStripe();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [cardError, setCardError] = useState<string | undefined>('');
  const [pageAlert, setPageAlert] = useState<{
    message: string | undefined;
    show: boolean;
    level?: AlertLevel;
  }>({ message: '', show: false, level: AlertLevel.ERROR });
  const { data: userData } = useSWR('/users/me');
  const {
    state: { plan: productPlan, featureChoice, coupon, subsidy, successPage }
  } = useLocation<any>();
  const history = useHistory();

  const handleAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setPageAlert(prev => ({ ...prev, show: false, level: AlertLevel.ERROR }));
  };

  const createSubscription = async (
    paymentMethod: PaymentMethod,
    customerName: string
  ) => {
    const subscriptionPayload = {
      customerInfo: {
        name: customerName,
        email: userData.profile.email,
        planId: productPlan.id
      },
      paymentMethodId: paymentMethod.id,
      featureChoice,
      profileProcess: subsidy
        ? AdminsProcess.Completed
        : TalentProcess.Completed,
      coupon,
      subsidy
    };

    const { data } = await axiosInstance.post(
      '/stripe/subscription',
      subscriptionPayload
    );

    manageSubscriptionStatus(data.subscription);
  };

  const manageSubscriptionStatus = async (subscription: any) => {
    const { latest_invoice } = subscription;
    const { payment_intent } = latest_invoice;

    if (stripe && payment_intent) {
      const { client_secret, status } = payment_intent;
      if (
        status === 'requires_action' ||
        status === 'requires_payment_method'
      ) {
        stripe
          .confirmCardPayment(client_secret)
          .then(result => {
            if (result.error) {
              setPageAlert({
                message: result.error.message,
                show: true,
                level: AlertLevel.ERROR
              });
            } else {
              setPageAlert({
                message: 'Your payment was succesful',
                show: true,
                level: AlertLevel.SUCCESS
              });
              if (successPage) {
                return (window.location.href = successPage);
                // return history.replace(successPage);
              }
              window.location.href = Routes.UserDashboard;
              // history.replace(Routes.UserDashboard);
            }
          })
          .catch((confirmationError: any) => {
            setPaymentFailed(true);
            setPageAlert({
              message:
                confirmationError.message ?? 'Payment confirmation failed',
              show: true,
              level: AlertLevel.ERROR
            });
          })
          .finally(() => {
            setPaymentLoading(false);
          });
      } else {
        setPageAlert({
          message: 'Your payment was succesful',
          show: true,
          level: AlertLevel.SUCCESS
        });
        if (successPage) {
          return (window.location.href = successPage);
          // return history.replace(successPage);
        }
        window.location.href = Routes.UserDashboard;
        // history.replace(Routes.UserDashboard);
      }
    } else {
      setPageAlert({
        message: 'Your payment was succesful',
        show: true,
        level: AlertLevel.SUCCESS
      });
      if (successPage) {
        return (window.location.href = successPage);
        // return history.replace(successPage);
      }
      window.location.href = Routes.UserDashboard;
      // history.replace(Routes.UserDashboard);
    }
  };

  const handlePayment = async (values: {
    billingAddress: string;
    cardHolder: string;
  }) => {
    setPaymentLoading(true);

    if (!stripe || !elements) {
      // eslint-disable-next-line no-useless-return
      return;
    }

    const cardElement = elements.getElement(CardElement) as StripeCardElement;
    const {
      error: paymentError,
      paymentMethod
    } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        email: userData.profile.email,
        address: {
          line1: values.billingAddress
        }
      }
    });

    if (paymentError || !paymentMethod) {
      setPaymentLoading(false);
    } else {
      createSubscription(paymentMethod, values.cardHolder);
    }
  };

  if (!stripe || !userData) {
    return <SplashScreen />;
  }

  return (
    <>
      <NavBar />
      <section className="process-payments-section mx-auto text-gray-texts">
        <Alert
          message={pageAlert.message}
          show={pageAlert.show}
          severity={pageAlert.level}
          onClose={handleAlertClose}
        />
        <div className="flex flex-col">
          <div className="text-2xl flex items-center">
            <ArrowBackTwoToneIcon
              className="-ml-12 mr-6 cursor-pointer back-arrow"
              onClick={() => history.goBack()}
            />
            <h1 className="font-bold title">
              Please provide your payment details
            </h1>
          </div>
          {paymentFailed ? (
            <ErrorMessageDialog
              title="Sorry, it looks like we are unable to process your payment"
              message="Please contact us or try again"
            />
          ) : (
            <Formik
              initialValues={{ billingAddress: '', cardHolder: '' }}
              validationSchema={PaymentSchema}
              onSubmit={handlePayment}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit
              }) => (
                <form
                  className="mt-4 w-full flex flex-col"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-4">
                    <label className="mb-2 text-gray-600 text-sm">
                      Cardholder Name
                    </label>
                    <Field
                      type="text"
                      classes="mt-2"
                      value={values.cardHolder}
                      onChange={handleChange('cardHolder')}
                      onBlur={handleBlur('cardHolder')}
                      touched={touched.cardHolder}
                      error={errors.cardHolder}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="mb-2 text-gray-600 text-sm">
                      Billing Address
                    </label>
                    <Field
                      type="text"
                      classes="mt-2"
                      value={values.billingAddress}
                      onChange={handleChange('billingAddress')}
                      onBlur={handleBlur('billingAddress')}
                      touched={touched.billingAddress}
                      error={errors.billingAddress}
                    />
                  </div>

                  <div>
                    <label className="mb-2 text-gray-600 text-sm">
                      Billing Details
                    </label>
                    <CardElement
                      className="stripe-input"
                      onChange={e => setCardError(e.error?.message)}
                    />
                    <span>{cardError}</span>
                  </div>

                  <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-green-700 text-white text-center self-center rounded-sm"
                    disabled={paymentLoading}
                  >
                    Process Payment{' '}
                    {paymentLoading && (
                      <span className="ml-2">
                        <CircularProgress color="inherit" size={20} />
                      </span>
                    )}
                  </button>
                </form>
              )}
            </Formik>
          )}
        </div>
      </section>
      <MainBackground />
    </>
  );
};

export default ProcessPayments;
