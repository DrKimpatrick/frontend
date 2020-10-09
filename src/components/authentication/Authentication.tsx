import React, { FC, Fragment, useState } from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import loginImage from 'assets/images/work_images-two.png';

type props = {};
const Authentication: FC<props> = () => {
  const [hidden, setHidden] = useState(true)


  const toggleShow = () => {
    setHidden(!hidden)
  }
  return (
    <Fragment>
      <section className="flex authentication-custom my-20 justify-between ">
        <section className="flex flex-col w-2/5 px-6 auth-bg px-6 items-center rounded-sm">
          <div className="w-1/2">
            <h3 className="text-gray-200 ont-bold text-3xl font-extrabold pt-8">
              Sign In
            </h3>
            <div className="flex flex-no-wrap justify-between mt-10">
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-1 rounded shadow">
                <LinkedInIcon className="auth-icon" />
              </button>
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 rounded shadow">
                <GitHubIcon />
              </button>
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 rounded shadow">
                <TwitterIcon />
              </button>
            </div>
          </div>
          <div className="w-3/5 my-3">
            <input
              type="email"
              className="border-0 bg-transparent text-white border-b-2 border-gray-600 w-full my-8 outline-none h-10 px-3 placeholder-gray-100 placeholder-opacity-50"
              placeholder="Email address"
            />

            <div className="flex">
              <input
                type={hidden ? 'password' : 'text'}
                className="border-0 bg-transparent text-white border-b-2 border-gray-600 w-full my-8 outline-none  h-10 px-3 placeholder-gray-100 placeholder-opacity-50"
                placeholder="Password"
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
          <div className="w-3/5 flex flex-col my-3">
            <button className="auth-btn text-white hover:bg-gray-100 font-semibold h-12 py-1 px-1 rounded-sm shadow">
              Sign In
            </button>
            <small className="mt-4 text-white text-sm font-bold">
              <span>No account?</span>{' '}
              <span className="text-blue-700 font-bold">Sign Up</span>
            </small>
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
    </Fragment>
  );
};

export default Authentication;
