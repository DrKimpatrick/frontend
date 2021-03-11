import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from 'redux/store';
import { AdminLayout, SideLoading, Card } from 'components/Reusable';
import { setActivePath } from 'redux/actions/user';
import { getAllTests } from 'redux/actions/testsetup';
import { getVerifiedQuestions } from 'redux/actions/question/verifiedQuestions';

const TestQuestion: FC = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const reducer = useSelector((state: RootState) => {
    const { createTestLoading, tests, createTest } = state.tests;

    const { verifiedQuestionsLoading, verifiedQuestions } = state.questions;

    return {
      loading: createTestLoading,
      tests,
      createTest,
      verifiedQuestionsLoading,
      verifiedQuestions
    };
  });

  useEffect(() => {
    getAllTests()(dispatch);
    getVerifiedQuestions()(dispatch);
    setActivePath(location.pathname)(dispatch);
  }, [dispatch, location]);

  const { loading, verifiedQuestions } = reducer;

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
      <div className="">
        <div className="reviewPage">
          {verifiedQuestions && (
            <Card
              titles
              skillsFilter
              data={verifiedQuestions}
              type={verifiedQuestions[0].questionType}
              level={verifiedQuestions[0].level}
              language={verifiedQuestions[0].language.toLowerCase()}
              expectedTime={`${verifiedQuestions[0].expectedTime} min`}
              questionOwner={verifiedQuestions[0].owner.username || 'User'}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default TestQuestion;
