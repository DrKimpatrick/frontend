import React, { useEffect, useState } from 'react';
import '../HrAdmin.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/store';
import { listRecommendation } from 'redux/actions/user';
import {
  HrAdminLayout,
  SideLoading,
  NoItemFound,
  HrListItem,
  ViewRecommendedUser
} from 'components/Reusable';
import { UserRole } from 'redux/action-types/user';

export const HrRecommendation = () => {
  const [open = false, setOpen] = useState<boolean>();

  const [userId, setUserId] = useState<string>();

  const dispatch = useDispatch();

  const selector = useSelector((state: RootState) => {
    const { recommendation, recommendationLoading, user } = state.users;

    return { recommendation, loading: recommendationLoading, user };
  });

  const { recommendation, loading, user } = selector;

  useEffect(() => {
    listRecommendation()(dispatch);
  }, [dispatch]);

  if (loading) {
    return (
      <HrAdminLayout
        role={
          user && user.roles && user.roles.includes(UserRole.RecruitmentAdmin)
            ? UserRole.RecruitmentAdmin
            : UserRole.EducationUser
        }
      >
        <div style={{ marginTop: '30px' }}>
          <SideLoading />
        </div>
      </HrAdminLayout>
    );
  }

  if (!recommendation) {
    return null;
  }
  return (
    <HrAdminLayout
      role={
        user && user.roles && user.roles.includes(UserRole.RecruitmentAdmin)
          ? UserRole.RecruitmentAdmin
          : UserRole.EducationUser
      }
    >
      {userId && open && (
        <ViewRecommendedUser
          userId={userId}
          closeModal={() => {
            setOpen(false);
            setUserId(undefined);

            return undefined;
          }}
        />
      )}
      <div className="hrAdminDashboard">
        {recommendation.length <= 0 && <NoItemFound />}
        {recommendation.length > 0 && (
          <ul className="ulList w-full flex flex-column bg-card-preview">
            {recommendation.map((item, index) => (
              <HrListItem
                name={item.username}
                key={index}
                onclickHandler={() => {
                  setUserId(item._id);
                  setOpen(true);

                  return undefined;
                }}
              />
            ))}
          </ul>
        )}
      </div>
    </HrAdminLayout>
  );
};

export default HrRecommendation;
