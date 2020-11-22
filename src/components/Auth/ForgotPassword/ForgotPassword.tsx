import React, { FC, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from 'components/Reusable/Layout/NavBar/NavBar';
import LockIcon from '@material-ui/icons/Lock';
import { validEmailRegex } from 'utils/index';
import { ForgotPassAction } from 'redux/actions/forgotPass';
import Loader from 'components/Reusable/Loader/Loader';
import { MainBackground } from 'components/Reusable/Layout/MainBackground';

const ForgotPassword: FC<any> = (props: any) => {
  const [emailValue, setEmailValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [emailError, setEmailError] = useState({
    email: ''
  });

  const dispatch = useDispatch();

  const state: any = useSelector((appState: any) => appState.users);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };

  useEffect(() => {
    if (submitted && !state.errorForgot) {
      props.history.push('/verify-account');
    }
  });

  const requestForgot = async () => {
    if (!validEmailRegex.test(emailValue)) {
      setEmailError({ email: 'Email is not Valid' });
    }

    await ForgotPassAction(emailValue)(dispatch);
    setSubmitted(true);
  };
  return (
    <>
      <NavBar />
      <div className="flex justify-center mt-16">
        <div className="flex justify-center w-2/4 back-for rounded text-white front-mob">
          <div className="w-2/4 front-mob-reset">
            <div>
              <div className="flex mt-24">
                <LockIcon className="icon-fonts mt-2 mr-4" />
                <h2 className="text-3xl font-black">Reset Password</h2>
              </div>

              <div className="mt-8">
                <p className="text-sm">
                  Enter your email and we will send you a link to reset your
                  password.
                </p>
              </div>
            </div>
            <div className="mt-8">
              <input
                type="email"
                name="email"
                className="border-0 bg-transparent text-white border-b-2 border-gray-600 w-full outline-none h-10 px-3 placeholder-gray-100 placeholder-opacity-50"
                placeholder="Email address*"
                onChange={onChangeInput}
              />
              {state.errorForgot ? (
                <div className="text-red-600 text-sm">
                  <p>{state.errorForgot}</p>
                </div>
              ) : (
                ''
              )}
            </div>

            <div className="mt-12 mb-24">
              <button
                className="back-btn text-white font-semibold h-12 py-1 px-1 rounded-sm shadow w-full"
                onClick={requestForgot}
                type="button"
              >
                <Loader loading={state.loading} command="Reset Password" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <MainBackground />
    </>
  );
};

export default withRouter(ForgotPassword);
