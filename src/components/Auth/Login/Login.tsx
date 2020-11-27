import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import NavBar from 'components/Reusable/Layout/NavBar/NavBar';
import { LoginAction } from 'redux/actions/login';
import { validateForm } from 'utils/index';
import Loader from 'components/Reusable/Loader/Loader';
import { MainBackground } from 'components/Reusable/Layout/MainBackground';
import { RouteUrl } from 'utils/routes';

type Props = {};

const Login: FC<Props> = (props: any) => {
  const [hidden, setHidden] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({
    username: '',
    password: ''
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dataError, setDataError] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const user: any = useSelector((state: any) => state.users);
  useEffect(() => {
    if (submitted && !user.errorLogin && user.currentUser.token) {
      localStorage.setItem('token', user.currentUser.token);
      if (user.currentUser.profile.roles.length !== 0) {
        props.history.push(RouteUrl.CurrentRole);
      } else {
        props.history.push(RouteUrl.Account);
      }
    }
  });

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const login = () => {
    if (validateForm(dataError)) {
      LoginAction(data)(dispatch);
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

  return (
    <>
      <NavBar />
      <section className="flex authentication-custom justify-between ">
        <section className="flex flex-col w-2/5 px-6 auth-bg px-6 items-center rounded-sm">
          {' '}
          {user.resetSuccess && (
            <small className="text-center text-sm text-indigo-800 bg-white px-2 py-4 rounded-t-none rounded">
              Your password has been reset successfully, please login with your
              new password
            </small>
          )}
          <div className="w-1/2 front-mob">
            <h3 className="text-gray-200 font-bold text-3xl font-extrabold pt-8">
              Sign In
            </h3>
            <div className="flex flex-no-wrap justify-between mt-10">
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
            {user.errorLogin ? (
              <div className="my-8 text-red-800 text-sm">
                <p>{user.errorLogin}</p>
              </div>
            ) : (
              ''
            )}

            <input
              type="email"
              name="username"
              className="border-0 bg-transparent text-white border-b-2 border-gray-600 w-full my-8 outline-none h-10 px-3 placeholder-gray-100 placeholder-opacity-50"
              placeholder="Email address"
              onChange={onChangeInput}
              value={data.username}
            />

            <div className="flex">
              <input
                type={hidden ? 'password' : 'text'}
                name="password"
                className="border-0 bg-transparent text-white border-b-2 border-gray-600 w-full my-8 outline-none  h-10 px-3 placeholder-gray-100 placeholder-opacity-50"
                placeholder="Password"
                onChange={onChangeInput}
                value={data.password}
              />
              {hidden ? (
                <VisibilityIcon
                  className="mt-10 -ml-6 text-gray-800"
                  onClick={toggleShow}
                />
              ) : (
                <VisibilityOffIcon
                  className="mt-10 -ml-6 text-gray-800"
                  onClick={toggleShow}
                />
              )}
            </div>
          </div>
          <div className="w-2/4 flex flex-col my-3 front-mob">
            <button
              className="auth-btn text-white hover:bg-gray-100 font-semibold h-12 py-1 px-1 rounded-sm shadow"
              onClick={login}
              type="button"
            >
              <Loader loading={user?.loading} command="Sign In" />
            </button>
            <div className="flex justify-between">
              <small className="mt-4 text-white text-xs font-bold">
                <span>No account?</span>{' '}
                <Link className="text-blue-700 font-bold" to="/register">
                  Sign Up
                </Link>
              </small>
              <Link
                className="mt-4 text-blue-700 text-xs font-bold"
                to="/forgot-password"
              >
                Forgot Password
              </Link>
            </div>
            <small className="mt-4 text-white text-xs font-medium pb-12">
              By signing in you agree to all{' '}
              <span className="text-blue-700">terms </span> and
              <span className="text-blue-700 ml-2 mr-2">condition</span>
              of this platform
            </small>
          </div>
        </section>
        <section className="font-bold mx-20 flex flex-col justify-center">
          <img
            className="auth-image"
            src="https://www.pngkey.com/png/full/356-3562278_coworking-illustration-co-working-space-flyer.png"
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

export default withRouter(Login);
