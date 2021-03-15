import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TalentLayout as Layout, SideLoading } from 'components/Reusable';
import {
  Wc as Persons,
  ArtTrack,
  AddCircle,
  DataUsage,
  AssignmentTurnedInOutlined
} from '@material-ui/icons';
import { RootState } from 'redux/store';
import { listRecommendation } from 'redux/actions/user';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AssessmentTab } from './AssessmentTab';
import { NewAssessment } from './NewAssessment';

import { AssessmentPassed } from './AssessmentPassed';

import { AssessmentStatus } from './AssessmentStatus';

import Headline from './Headline';
import { AssessmentAccordion } from '../../Reusable/Accordion';
import { AssessmentResult } from './AssessmentResult';
import './Assessment.scss';

const useStyles = makeStyles(() => ({
  overalMark: {
    fontSize: 12
  },
  title: {
    fontSize: 18,
    fontWeight: 900
  }
}));

const assessmentItems = [
  {
    id: 1,
    item: 'Recommends',
    icon: <Persons className="assessment-list-icons" />
  },
  {
    id: 1,
    item: 'Results',
    icon: <ArtTrack className="assessment-list-icons" />
  }
];

enum headlineClasses {
  'NEW_ASSESSMENT' = 'new-assessment',
  'STATUS' = 'status',
  'PASSED' = 'passed'
}

const accordionComponents = [
  {
    id: 1,
    headline: (
      <h4 className="text-gray-700 ml-3">
        <span>1.</span>
        <span className="ml-5 mb-0">User and Groups</span>
      </h4>
    ),
    details: <AssessmentResult />
  },
  {
    id: 2,
    headline: (
      <h4 className="text-gray-700 ml-3">
        <span>2.</span>
        <span className="ml-5">Lamp/Lemp Troubleshooting</span>
      </h4>
    ),
    details: <AssessmentResult />
  },
  {
    id: 3,
    headline: (
      <h4 className="text-gray-700 ml-3">
        <span>3.</span>
        <span className="ml-5">Word Press installation</span>
      </h4>
    ),
    details: <AssessmentResult />
  }
];

const Assessment = () => {
  const styles = useStyles();

  const [activeTab, setActiveTab] = useState(assessmentItems[0].item);
  const dispatch = useDispatch();

  const selector = useSelector((state: RootState) => {
    const { loading } = state.users;

    return { loading };
  });

  const { loading } = selector;

  useEffect(() => {
    listRecommendation()(dispatch);
  }, [dispatch]);

  const updateActiveTab = (item: string) => {
    setActiveTab(item);
  };

  if (loading) {
    return (
      <Layout>
        <div className="my-10">
          <SideLoading />
        </div>
      </Layout>
    );
  }

  const assessments = ['Introduction to javascript', 'Python'];

  const assessment = [
    {
      item: 'Introduction to javascript',
      status: 'failed',
      marks: 30
    },
    { item: 'Python', status: 'rejected' },
    {
      item: 'Introduction to javascript',
      status: 'inprogress'
    },
    {
      item: 'Python',
      status: 'incomplete'
    }
  ];

  return (
    <Layout>
      <div className="assessment-container mx-auto">
        <Container>
          <div className="tabs mt-10 mb w-3/5 flex-nowrap">
            <AssessmentTab
              assessmentItems={assessmentItems}
              activeTab={activeTab}
              updateActiveTab={updateActiveTab}
            />
          </div>
        </Container>

        {activeTab === 'Recommends' ? (
          <Container>
            <div className="mt-5 grid grid-cols-3 gap-12 md:grid-cols-4 lg:grid-cols-3">
              <div className="col-span-3 md:col-span-2 lg:col-span-1">
                <Headline
                  headline="New assessment"
                  icon={<AddCircle />}
                  className={headlineClasses.NEW_ASSESSMENT}
                />
                <NewAssessment assessments={assessments} />
              </div>
              <div className="col-span-3 md:col-span-2 lg:col-span-1">
                <Headline
                  headline="Status"
                  icon={<DataUsage />}
                  className={headlineClasses.STATUS}
                />
                <AssessmentStatus assessments={assessment} />
              </div>
              <div className="col-span-3 md:col-span-2 lg:col-span-1">
                <Headline
                  headline="Passed"
                  icon={<AssignmentTurnedInOutlined />}
                  className={headlineClasses.PASSED}
                />
                <AssessmentPassed assessments={assessments} marks={80} />
              </div>
            </div>
          </Container>
        ) : null}

        {activeTab === 'Results' ? (
          <Container>
            <div className="w-full">
              <div className="w-full px-16">
                <p className={`text-gray-700 ${styles.title}`}>Grading</p>
                <p className={`text-gray-700 ${styles.overalMark}`}>
                  Overal: 90.34%
                </p>
                <AssessmentAccordion components={accordionComponents} />
              </div>
            </div>
          </Container>
        ) : null}
      </div>
    </Layout>
  );
};

export default withRouter(Assessment);
