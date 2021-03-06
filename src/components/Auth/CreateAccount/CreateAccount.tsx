import React, { FC, useEffect, useState } from 'react';
import { Link, withRouter, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { validEmailRegex, validateForm, passwordRegex } from 'utils/index';
import useWindowSize from 'utils/useWindowSize';
import logo from 'assets/images/logo-image.png';
import { GetStartedAction } from 'redux/actions/getStarted';
import NavBar from 'components/Reusable/Layout/NavBar/NavBar';
import Loader from 'components/Reusable/Loader/Loader';
import { MainBackground } from 'components/Reusable/Layout/MainBackground';
import { ReactComponent as GoogleIcon } from '../../../assets/images/google-plus-square.svg';
import { ReactComponent as GitHubIcon } from '../../../assets/images/github-square.svg';
import { ReactComponent as LinkedInIcon } from '../../../assets/images/linkedIn.svg';

type props = {};
const GetStarted: FC<props> = (props: any) => {
  const size = useWindowSize();

  const [hidden, setHidden] = useState(true);

  const [submitted, setSubmitted] = useState(false);

  const [data, setData] = useState({
    email: '',
    username: '',
    password: ''
  });

  const [dataError, setDataError] = useState({
    email: '',
    username: '',
    password: ''
  });

  const dispatch = useDispatch();

  const location = useLocation();

  const user: any = useSelector((state: any) => state.users);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });

    const { name, value } = event.target;
    const errors = dataError;
    switch (name) {
      case 'email':
        errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid';
        break;

      case 'username':
        errors.username =
          value.length < 5
            ? 'Full Name must be at least 5 characters long!'
            : '';
        break;

      case 'password':
        errors.password = passwordRegex.test(value)
          ? ''
          : 'Password is not valid';
        break;

      default:
        break;
    }

    setDataError(errors);
  };

  useEffect(() => {
    if (submitted && !user.errorSignup) {
      props.history.push('/verify-account');
    }
  });
  const signup = async () => {
    const errors = dataError;
    if (data.email.length < 1) {
      errors.email = 'The email field should not be empty';
    }
    if (data.username.length < 1) {
      errors.username = 'The username should not be empty';
    }
    if (data.password.length < 1) {
      errors.password = 'The password should not be empty';
    }
    setDataError(errors);
    if (validateForm(dataError)) {
      const reference =
        new URLSearchParams(location.search).get('reference') || undefined;
      await GetStartedAction(data, reference)(dispatch);
      setSubmitted(true);
    }
  };

  const toggleShow = () => {
    setHidden(!hidden);
  };

  const githubSocialAuth = () => {
    window.location.assign(`${process.env.REACT_APP_BACKEND_API}/auth/github`);
  };
  const googleSocialAuth = () => {
    window.location.assign(`${process.env.REACT_APP_BACKEND_API}/auth/google`);
  };
  const linkedInSocialAuth = () => {
    window.location.assign(
      `${process.env.REACT_APP_BACKEND_API}/auth/linkedin`
    );
  };

  const sortErrors = (errors: any, type: string) => {
    return errors?.map((error: any) => error[type]);
  };

  return (
    <>
      {size?.width && size?.width < 768 ? (
        <>
          <div className="half-background md-screen-40 half-background-top" />
          <div className="md-half-screen md-screen-40 flex items-center justify-center">
            <img src={logo} alt="logo" className="logo" />
          </div>
        </>
      ) : (
        <NavBar />
      )}
      <section className="flex authentication-custom justify-between md-half-screen md-screen-60 md-half-screen-bottom">
        <section className="flex flex-col w-2/5 px-6 auth-bg px-6 items-center rounded-sm">
          <div className="w-1/2 front-mob mb-8 auth-social-wrap">
            <h3 className="text-gray-200 font-bold text-3xl font-extrabold pt-8">
              Sign up
            </h3>
            <div className="flex flex-no-wrap justify-between mt-8">
              <button onClick={linkedInSocialAuth} type="button">
                <LinkedInIcon className="auth-icon" />
              </button>
              <button onClick={githubSocialAuth} type="button">
                <GitHubIcon className="auth-icon" />
              </button>
              <button onClick={googleSocialAuth} type="button">
                <GoogleIcon className="auth-icon" />
              </button>
            </div>
          </div>

          <div className="w-2/4 my-3 front-mob">
            <div className="mb-8 auth-input-wrap">
              <input
                type="email"
                name="email"
                className="border-0 bg-transparent text-white border-b-2 border-gray-600 w-full outline-none h-10 px-3 placeholder-gray-100 placeholder-opacity-50 auth-input"
                placeholder="Email address *"
                onChange={onChangeInput}
              />
              <p className="text-red-600 text-xs">
                {user?.errorSignup
                  ? sortErrors(user?.errorSignup, 'email')
                  : dataError?.email}
              </p>
            </div>

            <div className="mb-8 auth-input-wrap">
              <input
                type="text"
                name="username"
                className="border-0 bg-transparent text-white border-b-2 border-gray-600 w-full outline-none h-10 px-3 placeholder-gray-100 placeholder-opacity-50 auth-input"
                placeholder="Username *"
                onChange={onChangeInput}
              />
              <p className="text-red-600 text-xs">
                {user?.errorSignup
                  ? sortErrors(user?.errorSignup, 'username')
                  : dataError?.username}
              </p>
            </div>
            <div className="mb-8 auth-input-wrap">
              <div className="flex">
                <input
                  type={hidden ? 'password' : 'text'}
                  name="password"
                  className="border-0 bg-transparent text-white border-b-2 border-gray-600 w-full outline-none  h-10 px-3 placeholder-gray-100 placeholder-opacity-50 auth-input"
                  placeholder="Password *"
                  onChange={onChangeInput}
                />
                {hidden ? (
                  <VisibilityIcon
                    className="mt-2 -ml-6 text-gray-800 auth-visibility-icon"
                    onClick={toggleShow}
                  />
                ) : (
                  <VisibilityOffIcon
                    className="mt-2 -ml-6 text-gray-800 auth-visibility-icon"
                    onClick={toggleShow}
                  />
                )}
              </div>
              {dataError.password.length > 1 ? (
                <div className="text-xs mt-2 text-blue-500">
                  <p>* Password must contain one uppercase</p>
                  <p>* Password must contain one lowercase</p>
                  <p>* Password must contain one special character</p>
                  <p>* Password must contain one number</p>
                  <p>* Password must be over 8 digits</p>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="w-2/4 flex flex-col my-3 front-mob">
            <button
              className="auth-btn text-white hover:bg-gray-100 font-semibold h-12 py-1 px-1 rounded-sm shadow"
              onClick={signup}
              type="button"
            >
              <Loader loading={user?.loading} command="Sign up" />
            </button>
            <small className="mt-4 text-white text-sm font-bold account-label">
              <span>Got an account?</span>{' '}
              <Link className="text-blue-700 font-bold" to="/Login">
                Sign In
              </Link>
            </small>
            <small className="mt-4 text-white text-xs font-medium pb-12 md-display-none">
              By signing up you agree to all{' '}
              <span className="text-blue-700">terms </span> and
              <span className="text-blue-700 ml-2 mr-2">condition</span>
              of this platform
            </small>
          </div>
        </section>
        <section className="font-semibold mx-20 flex flex-col justify-center md-display-none">
          <img
            className="auth-image"
            src="https://www.pinclipart.com/picdir/big/449-4493955_use-your-7-day-free-trial-to-build.png"
            alt=""
          />
          <div className="flex justify-center mt-8 text-gray-600">
            <span className="mr-2 text-blue-400">Learn more</span>about TTLC,
            2020
          </div>
        </section>
      </section>
      <MainBackground />
    </>
  );
};

export default withRouter(GetStarted);
