/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import NavBar from 'components/Reusable/Layout/NavBar/NavBar';
import EmailIcon from '@material-ui/icons/Email';
import { VerifyAccAction } from 'redux/actions/verifyAcc';
import { MainBackground, Loader } from 'components/Reusable';

const MessagePage: FC<any> = (props: any) => {
  const state: any = useSelector((appState: any) => appState.users);

  const dispatch = useDispatch();

  useEffect(() => {
    const { token } = queryString.parse(props.history.location.search);

    if (token) {
      VerifyAccAction({ token })(dispatch);
    }
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex justify-center">
        <div
          className={
            state.errorVerify
              ? 'mt-8 py-48 px-24 verify-back-error text-white rounded mobile-verify'
              : 'mt-8 py-48 px-24 verify-background text-white rounded mobile-verify'
          }
        >
          <div>
            <div className="flex items-center">
              <EmailIcon className="icon-fonts mr-4" />
              <h2 className="text-3xl font-black mr-2">Verify account</h2>
              <Loader loading={state.loading} />
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
                  {state.message &&
                    !state.loading &&
                    'Your Account was verified, Proceed to Login'}
                  {!state.message &&
                    !state.loading &&
                    'Please check Email sent to your link to verify'}
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
