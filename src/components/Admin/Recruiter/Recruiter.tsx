import React, { FC, useState, useEffect } from 'react';
import { withRouter, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listUserByRole, setActivePath } from 'redux/actions/user';
import {
  AdminLayout,
  UserItem,
  OnPageChangeCallback,
  SideLoading
} from 'components/Reusable';
import { UserRole } from 'redux/action-types/user';
import { RootState } from 'redux/store';

const Recruiter: FC = () => {
  const itemPerPage = 5;

  const [page = 0, setPage] = useState<number>();

  const history = useHistory();

  const dispatch = useDispatch();

  const location = useLocation();

  const reducer = useSelector((state: RootState) => {
    const { loading, usersByRole } = state.users;

    return { loading, usersByRole };
  });

  const { usersByRole, loading } = reducer;

  const pageChange: OnPageChangeCallback = value => {
    const selectedPage = value.selected;

    setPage(selectedPage);
  };

  useEffect(() => {
    const pages = Math.ceil(page + 1);

    listUserByRole({
      page: pages,
      limit: itemPerPage,
      role: UserRole.RecruitmentAdmin
    })(dispatch);
  }, [dispatch, page]);

  useEffect(() => {
    setActivePath(location.pathname)(dispatch);
  }, [dispatch, location.pathname]);

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ marginTop: 200 }}>
          <SideLoading />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        {usersByRole && (
          <UserItem
            items={usersByRole.users}
            view={value => history.push(`/profile/${value.username}`)}
            pageChange={pageChange}
            currentPage={page}
            totalItems={usersByRole.totalDocs ? usersByRole.totalDocs : 0}
            itemPerPage={itemPerPage}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default withRouter(Recruiter);
