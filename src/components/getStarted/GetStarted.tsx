import React, { FC, Fragment, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import loginImage from 'assets/images/work_images-two.png';
import { validEmailRegex, validateForm, passwordRegex } from 'utils/index';
import { Register } from 'redux/action-types/getStarted';
import { GetStartedAction } from 'redux/actions/getStarted';
import NavBar from 'components/Layout/NavBar/NavBar';
import Loader from 'components/loader/Loader';
import { MainBackground } from 'components/Layout/MainBackground';

type props = {};
const GetStarted: FC<props> = (props: any) => {
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
  const user: any = useSelector((state: any) => state.users);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });

    const { name, value } = event.target;
    let errors = dataError;
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
    if (validateForm(dataError)) {
      await GetStartedAction(data)(dispatch);
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
      <NavBar />
      <section className="flex authentication-custom justify-between ">
        <section className="flex flex-col w-2/5 px-6 auth-bg px-6 items-center rounded-sm">
          <div className="w-1/2 front-mob mb-8">
            <h3 className="text-gray-200 font-bold text-3xl font-extrabold pt-8">
              Sign up
            </h3>
            <div className="flex flex-no-wrap justify-between mt-8">
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-1 rounded shadow"
                onClick={linkedInSocialAuth}
                type="button"
              >
                <LinkedInIcon className="auth-icon" />
              </button>
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 rounded shadow"
                onClick={githubSocialAuth}
                type="button"
              >
                <GitHubIcon />
              </button>
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 w-12 rounded shadow"
                onClick={googleSocialAuth}
                type="button"
              >
                <img
                  src="https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/2659939281579738432-512.png"
                  alt=""
                />
              </button>
            </div>
          </div>

          <div className="w-2/4 my-3 front-mob">
            <div>
              <input
                type="email"
                name="email"
                className="border-0 bg-transparent text-white border-b-2 border-gray-600 w-full outline-none h-10 px-3 placeholder-gray-100 placeholder-opacity-50"
                placeholder="Email address"
                onChange={onChangeInput}
              />
              <p className="text-red-600 text-xs">
                {user?.errorSignup
                  ? sortErrors(user?.errorSignup, 'email')
                  : dataError?.email}
              </p>
            </div>

            <div className="my-8">
              <input
                type="text"
                name="username"
                className="border-0 bg-transparent text-white border-b-2 border-gray-600 w-full outline-none  h-10 px-3 placeholder-gray-100 placeholder-opacity-50"
                placeholder="Username"
                onChange={onChangeInput}
              />
              <p className="text-red-600 text-xs">
                {user?.errorSignup
                  ? sortErrors(user?.errorSignup, 'username')
                  : dataError?.username}
              </p>
            </div>
            <div className="my-8">
              <div className="flex">
                <input
                  type={hidden ? 'password' : 'text'}
                  name="password"
                  className="border-0 bg-transparent text-white border-b-2 border-gray-600 w-full outline-none  h-10 px-3 placeholder-gray-100 placeholder-opacity-50"
                  placeholder="Password"
                  onChange={onChangeInput}
                />
                {hidden ? (
                  <VisibilityIcon
                    className="mt-2 -ml-6 text-gray-800"
                    onClick={toggleShow}
                  />
                ) : (
                  <VisibilityOffIcon
                    className="mt-2 -ml-6 text-gray-800"
                    onClick={toggleShow}
                  />
                )}
              </div>
              {dataError.password.length > 1 ||
              (user.errorSignup &&
                sortErrors(user?.errorSignup, 'password')[0] !== undefined) ? (
                <div
                  className={
                    user.error && sortErrors(user?.errorSignup, 'password')
                      ? 'text-xs text-red-600 mt-2'
                      : 'text-xs text-white mt-2'
                  }
                >
                  <p>* Password must contain one uppercase</p>
                  <p>* Password must contain one lowercase</p>
                  <p>* Password must contain one special carracter</p>
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
            <small className="mt-4 text-white text-sm font-bold">
              <span>Got an account?</span>{' '}
              <Link className="text-blue-700 font-bold" to="/Login">
                Sign In
              </Link>
            </small>
            <small className="mt-4 text-white text-xs font-medium pb-12">
              By signing up you agree to all{' '}
              <span className="text-blue-700">terms </span> and
              <span className="text-blue-700 ml-2 mr-2">condition</span>
              of this platform
            </small>
          </div>
        </section>
        <section className="font-semibold mx-20 flex flex-col justify-center">
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
