import React, { FC, useEffect, useState } from 'react';
import './TestQuestion.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from 'redux/store';
import {
  AdminLayout,
  SideLoading,
  NoItemFound,
  ListTestItem,
  CustomQuestion,
  TestTitle
} from 'components/Reusable';
import { setActivePath } from 'redux/actions/user';
import { getAllTests } from 'redux/actions/testsetup';
import { getVerifiedQuestions } from 'redux/actions/question';
import { SkillFilter } from '.';

const TestQuestion: FC = () => {
  const [open = false, setOpen] = useState<boolean>();

  const dispatch = useDispatch();

  const location = useLocation();

  const reducer = useSelector((state: RootState) => {
    const { tests, createTest } = state.tests;

    const { verifiedQuestionsLoading, verifiedQuestions } = state.questions;

    return {
      loading: verifiedQuestionsLoading,
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

  if (!verifiedQuestions) {
    return null;
  }
  return (
    <AdminLayout>
      {open && <CustomQuestion open={open} setOpen={setOpen} />}
      <div className="testQuestion">
        <div className="reviewPage">
          {verifiedQuestions &&
            verifiedQuestions.data &&
            verifiedQuestions.data.length > 0 && (
              <div className="review">
                <div className="p-5 md:px-12">
                  <TestTitle languageFilter />
                </div>
                <div className="filter">
                  <div className="skillsFilter md:px-12">
                    <SkillFilter />
                  </div>
                  <div className="customQuestion">
                    <div className="customQuestionButton">
                      <button type="button" onClick={() => setOpen(true)}>
                        Add custom question
                      </button>
                    </div>
                  </div>
                </div>
                <ul>
                  {verifiedQuestions.data.map((item, index) => (
                    <ListTestItem
                      item={{
                        key: index,
                        name: item.name,
                        status: 'question url is on',
                        type: item.questionType,
                        id: item._id,
                        owner: 'admin',
                        level: item.level,
                        programmingLanguage: item.language,
                        time: item.expectedTime
                      }}
                    />
                  ))}
                </ul>
              </div>
            )}
          {verifiedQuestions &&
            verifiedQuestions.data &&
            verifiedQuestions.data.length <= 0 && <NoItemFound />}
        </div>
      </div>
    </AdminLayout>
  );
};

export default TestQuestion;
