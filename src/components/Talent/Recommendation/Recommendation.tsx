import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import {
  TalentLayout as Layout,
  SideLoading,
  NoItemFound,
  ViewRecommendedUser
} from 'components/Reusable';
import { RootState } from 'redux/store';
import { listRecommendation } from 'redux/actions/user';
import '../Training/Training.scss';

const Recommendation = () => {
  const [open = true, setOpen] = useState<boolean>();

  const [userId, setUserId] = useState<string>();

  const dispatch = useDispatch();

  const selector = useSelector((state: RootState) => {
    const { errors, recommendation, recommendationLoading } = state.users;

    return { apiError: errors, recommendation, loading: recommendationLoading };
  });

  const { apiError, recommendation, loading } = selector;

  useEffect(() => {
    listRecommendation()(dispatch);
  }, [dispatch]);

  if (loading) {
    return (
      <Layout>
        <div className="my-10">
          <SideLoading />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {userId && open && (
        <ViewRecommendedUser
          userId={userId}
          closeModal={() => {
            setUserId(undefined);
            setOpen(false);

            return undefined;
          }}
        />
      )}
      <div className="user-dashboard-container training">
        <div className="trainingContent">
          {apiError && apiError.message && (
            <Alert severity="error">{apiError.message}</Alert>
          )}
          {apiError && apiError.error && (
            <Alert severity="error">{apiError.error}</Alert>
          )}
          {recommendation && recommendation.length <= 0 && <NoItemFound />}
          {recommendation && recommendation.length > 0 && (
            <ul>
              {recommendation.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setOpen(true);
                    setUserId(item._id);

                    return undefined;
                  }}
                >
                  <div className="heading">{item.username}</div>
                  <div className="numberOfCourse">Paid out</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Recommendation);
