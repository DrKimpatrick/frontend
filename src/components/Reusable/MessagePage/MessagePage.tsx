import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import NavBar from 'components/Reusable/Layout/NavBar/NavBar';
import EmailIcon from '@material-ui/icons/Email';
import { VerifyAccAction } from 'redux/actions/verifyAcc';
import { MainBackground } from 'components/Reusable/Layout/MainBackground';

const MessagePage: FC<any> = (props: any) => {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const state: any = useSelector((state: any) => state.users);

  const verifyRequest = () => {
    const tokenValue = queryString.parse(props.history.location.search);

    if (tokenValue.token) {
      VerifyAccAction({ token: tokenValue.token })(dispatch);
    }
  };

  useEffect(() => {
    if (state.error) {
      setError(state.errorVerify);
    }

    verifyRequest();
  }, [state.error, state.errorVerify, verifyRequest]);

  return (
    <>
      <NavBar />
      <div className="flex justify-center">
        <div
          className={
            state.errorVerify
              ? 'mt-8 pt-48 pb-48 pl-24 pr-24 verify-back-error text-white rounded mobile-verify'
              : 'mt-8 pt-48 pb-48 pl-24 pr-24 verify-background text-white rounded mobile-verify'
          }
        >
          <div>
            <div className="flex">
              <EmailIcon className="icon-fonts mt-2 mr-4" />
              <h2 className="text-3xl font-black">Verify account</h2>
            </div>
            <div className="mt-8">
              {state.errorVerify ? (
                <p className="text-sm text-white">
                  {state.errorVerify === 'User not found'
                    ? 'The user of this email is not found'
                    : state.errorVerify === 'Token is invalid or expired'
                    ? 'Your Link has expired, Please request for a new one.'
                    : state.errorVerify}
                </p>
              ) : (
                <p className="text-sm">
                  {state.message
                    ? 'Your Account was verified, Procced to Login'
                    : 'Please check Email sent to your link to verify'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <MainBackground />
    </>
  );
};

export default withRouter(MessagePage);
