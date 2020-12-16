/* eslint-disable @typescript-eslint/camelcase */
import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import NavBar from 'components/Reusable/Layout/NavBar/NavBar';
import { MainBackground } from 'components/Reusable/Layout/MainBackground';
import { ArrowRightAltTwoTone } from '@material-ui/icons';
import Loader from 'components/Reusable/Loader/Loader';
import { accounts, pageTexts } from 'utils/staticData';
import { Routes } from 'utils/routes';
import './AccountTypes.scss';
import { updateUser } from 'redux/actions/user';
import { RootState } from 'redux/store';
import { AccountType } from '../../Home/AccountType';

type tAccountType = {
  [key: string]: boolean;
};

const AccountTypes: FC = () => {
  const initialAccountTypeState = {
    // keys match with ids in accounts static data
    talent: false,
    education: false,
    training_admin: false,
    recruitment_admin: false
  };
  const [itemClicked, setItemClickedType] = useState<tAccountType>({
    ...initialAccountTypeState
  });
  const [selectedAccount, setSelectedAccount] = useState('');

  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { loading, user, errors } = state.users;
    return { loading, user, errors };
  });

  const history = useHistory();

  useEffect(() => {
    if (reducer.user?.roles && reducer.user?.roles.length > 0) {
      history.push(Routes.CompleteProfile);
    }
  });

  const onClickAccountTypeHandler = (accType: string) => {
    setItemClickedType({
      ...initialAccountTypeState,
      [accType]: true
    });
    setSelectedAccount(accType);
  };

  const onSubmitAccountTypeHandler = () => {
    if (reducer.user) {
      updateUser({ roles: [selectedAccount] }, reducer.user._id)(dispatch);
    }
  };

  return (
    <>
      <NavBar />
      <section className="account-types-section pt-12">
        <div className="flex flex-col items-center">
          <div className="title-container flex flex-col items-center">
            <h1 className="font-bold text-xl title text-center">
              {pageTexts.account.title}
            </h1>
            <p className="subtitle mt-1.5">{pageTexts.account.subTitle}</p>
          </div>
          <div className="account-types mt-12 flex flex-wrap md:items-center">
            {accounts.map(account => (
              <div
                key={account.id}
                className="account-types-item"
                onClick={() => onClickAccountTypeHandler(account.id)}
              >
                <AccountType
                  title={account.title}
                  description={account.description}
                  clicked={itemClicked[account.id]}
                />
              </div>
            ))}
          </div>
          {reducer.errors && (
            <div className="text-red-500 my-3">
              Please refresh the page before trying again!
            </div>
          )}
          {selectedAccount && (
            <button
              data-testid="next-button"
              className="next-btn text-white hover:bg-gray-800 font-semibold disabled:opacity-50 py-1 px-3 w-32 mt-3 rounded-sm shadow flex justify-around"
              disabled={selectedAccount === ''}
              onClick={() => onSubmitAccountTypeHandler()}
              type="button"
            >
              <Loader
                loading={reducer.loading}
                command={
                  <>
                    <label className="">Next</label> <ArrowRightAltTwoTone />
                  </>
                }
              />
            </button>
          )}
        </div>
      </section>
      <MainBackground />
    </>
  );
};
export default withRouter(AccountTypes);
