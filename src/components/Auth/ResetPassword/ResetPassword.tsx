import React, { FC, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from 'components/Reusable/Layout/NavBar/NavBar';
import { passwordRegex } from 'utils/index';
import Rotate90DegreesCcwIcon from '@material-ui/icons/Rotate90DegreesCcw';
import { ResetPassAction } from 'redux/actions/resetPass';
import queryString from 'query-string';
import Loader from 'components/Reusable/Loader/Loader';

const RestPassword: FC<any> = (props: any) => {
  const [data, setData] = useState({
    password: '',
    comfirmPassword: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const [dataErrors, setDataErrors] = useState({
    password: '',
    comfirmPassword: ''
  });

  const dispatch = useDispatch();

  const state: any = useSelector((appState: any) => appState.users);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });

    const { name, value } = event.target;
    const errors = dataErrors;
    switch (name) {
      case 'comfirmPassword':
        errors.comfirmPassword =
          data.password === data.comfirmPassword
            ? 'Password are not matching'
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

    setDataErrors(errors);
  };

  useEffect(() => {
    if (submitted && !state.errorReset && state.resetSuccess) {
      props.history.push('/login');
    }
  });

  const requestReset = () => {
    const tokenValue = queryString.parse(props.history.location.search);
    ResetPassAction({
      password: data.password,
      'confirm-password': data.comfirmPassword,
      token: tokenValue.token
    })(dispatch);

    setSubmitted(true);
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center mt-16">
        <div className="flex justify-center w-2/4 back-for rounded text-white front-mob-reset">
          <div className="w-2/4 front-mob-reset">
            <div>
              <div className="flex mt-24">
                <Rotate90DegreesCcwIcon className="icon-fonts mt-2 mr-4" />
                <h2 className="text-3xl font-black">Change Password</h2>
              </div>
            </div>

            {state.errorReset ? (
              <div className="my-8 text-red-800 text-sm">
                <p>
                  {state.errorReset === 'Token is invalid or expired'
                    ? 'Link has expired! Please Request for another link'
                    : state.errorReset}
                </p>
              </div>
            ) : (
              ''
            )}

            <div className="mt-8">
              <div>
                <input
                  type="password"
                  name="password"
                  className="border-0 bg-transparent text-white border-b-2 border-gray-600 w-full mt-8 outline-none h-10 px-3 placeholder-gray-100 placeholder-opacity-50"
                  placeholder="New Password*"
                  onChange={onChangeInput}
                />
                <p className="text-red-800 text-xs">{dataErrors.password}</p>
              </div>
              <div>
                <input
                  type="password"
                  name="comfirmPassword"
                  className="border-0 bg-transparent text-white border-b-2 border-gray-600 w-full mt-8 outline-none h-10 px-3 placeholder-gray-100 placeholder-opacity-50"
                  placeholder="Comfirm Password*"
                  onChange={onChangeInput}
                />
                <p className="text-red-800 text-xs">
                  {dataErrors.comfirmPassword}
                </p>
              </div>
            </div>

            <div className="mt-12 mb-24">
              <button
                className="back-btn text-white font-semibold h-12 py-1 px-1 rounded-sm shadow w-full"
                onClick={requestReset}
                type="button"
              >
                <Loader loading={state.loading} command="Change Password" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(RestPassword);
