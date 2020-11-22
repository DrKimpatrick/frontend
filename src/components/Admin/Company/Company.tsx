import React, { FC, useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listUserByRole } from 'redux/actions/user';
import {
  AdminLayout,
  SplashScreen,
  UserItem,
  OnPageChangeCallback
} from 'components/Reusable';
import { UserRole } from 'redux/action-types/user';
import { RootState } from 'redux/store';

const Company: FC = () => {
  const itemPerPage = 5;

  const [page = 0, setPage] = useState<number>();

  const history = useHistory();

  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { loading, usersByRole } = state.users;

    return { loading, usersByRole };
  });

  const { loading, usersByRole } = reducer;

  const pageChange: OnPageChangeCallback = value => {
    const selectedPage = value.selected;

    setPage(selectedPage);
  };

  useEffect(() => {
    const pages = Math.ceil(page + 1);

    listUserByRole({
      page: pages,
      limit: itemPerPage,
      role: UserRole.CompanyAdmin
    })(dispatch);
  }, [dispatch, page]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <AdminLayout>
      <div>
        {usersByRole && usersByRole.totalDocs && (
          <UserItem
            items={usersByRole.users}
            view={value =>
              history.push({
                pathname: `/profile/${value.username}`,
                state: { userId: value.userId }
              })
            }
            pageChange={pageChange}
            currentPage={page}
            totalItems={usersByRole.totalDocs}
            itemPerPage={itemPerPage}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default withRouter(Company);
