import React, { useState, useEffect } from 'react';
import { Modal } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Close, AccountBalanceWallet } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { SideLoading, NoItemFound } from 'components/Reusable';
import { RootState } from 'redux/store';
import {
  listSpecificUser,
  listSubscriptionOfRecommendedUser
} from 'redux/actions/user';
import Avatar from 'assets/images/avatar.jpg';
import './ViewRecommendedUser.scss';
import { QuarterCommission, QuarterCommissionType } from 'utils/Quarter';
import { QuarterList } from './QuarterList';

interface Props {
  userId: string;
  closeModal: () => void;
}

export const ViewRecommendedUser = (props: Props) => {
  const [open = true, setOpen] = useState<boolean>();

  const [commission, setCommission] = useState<QuarterCommissionType[]>();

  const { userId, closeModal } = props;

  const dispatch = useDispatch();

  const selector = useSelector((state: RootState) => {
    const {
      errors,
      specificUser,
      specificUserLoading,
      subscriptionOfRecommendedUser,
      subscriptionOfRecommendedUserLoading
    } = state.users;

    return {
      apiError: errors,
      user: specificUser,
      loading: specificUserLoading,
      subscription: subscriptionOfRecommendedUser,
      subscriptionLoading: subscriptionOfRecommendedUserLoading
    };
  });

  const {
    apiError,
    user,
    loading,
    subscription,
    subscriptionLoading
  } = selector;

  useEffect(() => {
    listSpecificUser(userId)(dispatch);
    listSubscriptionOfRecommendedUser(userId)(dispatch);
  }, [dispatch, userId]);

  useEffect(() => {
    if (subscription && subscription.length > 0) {
      const f = QuarterCommission(subscription);

      setCommission(f);
    }
  }, [subscription]);

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        closeModal();

        return undefined;
      }}
      className="recommendedUserModal"
    >
      <div className="recommendedUser">
        {loading && (
          <div className="my-5">
            <SideLoading />
          </div>
        )}
        <div
          className="closeModal"
          onClick={() => {
            setOpen(false);
            closeModal();
            return undefined;
          }}
        >
          <Close />
        </div>
        {apiError && apiError.message && (
          <Alert severity="error">{apiError.message}</Alert>
        )}
        {apiError && apiError.error && (
          <Alert severity="error">{apiError.error}</Alert>
        )}
        {!loading && user && (
          <>
            <div
              className="userImageBio flex items-start"
              style={{ position: 'relative' }}
            >
              <div className="image">
                <img src={user.profilePicture || Avatar} alt="" />
              </div>
              <div className={`detail ${!user.bio ? 'addFlex' : ''}`}>
                <span className="title">{user.username}</span>
                {user.bio && (
                  <span
                    className={`description ${
                      user.bio.length <= 48 ? 'textCenterDescription' : ''
                    }`}
                  >
                    {user.bio}
                  </span>
                )}
              </div>
            </div>
            {subscription && !subscriptionLoading && (
              <div className="paymentInfo w-full">
                <div className="heading flex items-center justify-start">
                  <span>
                    <AccountBalanceWallet />
                  </span>
                  <span>Quarter & Commission</span>
                </div>
                {subscription.length <= 0 && <NoItemFound />}
                {commission && commission.length > 0 && (
                  <ul className="my-3 flex flex-wrap items-center w-full">
                    {commission.map((item, index) => (
                      <li key={index}>
                        <div className="year flex justify-end">{item.year}</div>
                        {item.quarters && item.quarters.length > 0 && (
                          <ul className="bg-card-preview flex flex-wrap items-center w-full">
                            {item.quarters.map((it, i) => (
                              <QuarterList
                                isPaid
                                name={`Quarter ${it.q}`}
                                amount={`$ ${it.amount.toFixed(2)}`}
                                key={i}
                              />
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default ViewRecommendedUser;
