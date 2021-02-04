import React, { useState, useEffect } from 'react';
import { Modal, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Close, AccountBalanceWallet, AcUnit } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { SideLoading } from 'components/Reusable';
import { RootState } from 'redux/store';
import { listSpecificUser } from 'redux/actions/user';
import Avatar from 'assets/images/avatar.jpg';
import './ViewRecommendedUser.scss';
import useWindowSize from 'utils/useWindowSize';
import { QuarterList } from './QuarterList';

interface Props {
  userId: string;
  closeModal: () => void;
}

export const ViewRecommendedUser = (props: Props) => {
  const [open = true, setOpen] = useState<boolean>();

  const { userId, closeModal } = props;

  const dispatch = useDispatch();

  const size = useWindowSize();

  const selector = useSelector((state: RootState) => {
    const { errors, specificUser, specificUserLoading } = state.users;

    return {
      apiError: errors,
      user: specificUser,
      loading: specificUserLoading
    };
  });

  const { apiError, user, loading } = selector;

  useEffect(() => {
    listSpecificUser(userId)(dispatch);
  }, [dispatch, userId]);

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
            <div className="paymentInfo w-full">
              <Grid
                container
                spacing={size?.width && size?.width > 768 ? 10 : 2}
              >
                <Grid item xs={12} sm={6}>
                  <div className="heading flex items-center justify-start">
                    <span>
                      <AccountBalanceWallet />
                    </span>
                    <span>Standard</span>
                  </div>
                  <ul className="my-3 bg-card-preview">
                    <QuarterList isPaid={false} name="Quarter 1" amount="$25" />
                    <QuarterList isPaid name="Quarter 1" amount="$25" />
                  </ul>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="heading flex items-center justify-start">
                    <span>
                      <AcUnit />
                    </span>
                    <span>Premium</span>
                  </div>
                  <ul className="my-3 bg-card-preview">
                    <QuarterList isPaid name="Quarter 1" amount="$25" />
                  </ul>
                </Grid>
              </Grid>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ViewRecommendedUser;
