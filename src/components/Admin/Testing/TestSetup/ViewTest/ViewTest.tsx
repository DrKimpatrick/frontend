import React, { FC, useEffect } from 'react';
import './ViewTest.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from 'redux/store';
import {
  AdminLayout,
  SideLoading,
  TestHeadline,
  NoItemFound,
  ListTestItem
} from 'components/Reusable';
import { setActivePath } from 'redux/actions/user';
import { getAllTests, updateTestAction } from 'redux/actions/testsetup';

const image1 =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80';

const image2 =
  'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

const image3 =
  'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

const ViewTests: FC = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const reducer = useSelector((state: RootState) => {
    const { getAllTestLoading, tests, updateTest } = state.tests;

    const { message } = state.messages;

    return { loading: getAllTestLoading, tests, updateTest, message };
  });

  const { loading, tests, updateTest, message } = reducer;

  useEffect(() => {
    getAllTests()(dispatch);
    setActivePath(location.pathname)(dispatch);
  }, [dispatch, location]);

  useEffect(() => {
    if (updateTest && message) {
      getAllTests()(dispatch);
    }
  }, [updateTest, message, dispatch]);

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
      <div className="viewTest">
        <div className="reviewPage">
          <TestHeadline />
          {tests && tests.length > 0 && (
            <ul>
              {tests.map((item, index) => (
                <ListTestItem
                  key={index}
                  item={{
                    key: index,
                    name: item.name,
                    owner:
                      typeof item.owner !== 'string' ? item.owner.username : '',
                    timePolicy: item.timePolicy,
                    id: item._id || '',
                    status: 'test url is on',
                    candidates: [image1, image2, image3],
                    verificationStatus: item.status,
                    editTest: true
                  }}
                  onFilter={val =>
                    updateTestAction(
                      { ...item, status: val },
                      String(item._id)
                    )(dispatch)
                  }
                />
              ))}
            </ul>
          )}
          {tests && tests.length <= 0 && <NoItemFound />}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ViewTests;
