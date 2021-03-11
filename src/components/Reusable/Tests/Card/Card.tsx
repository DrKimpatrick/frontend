import React, { useState } from 'react';
import './Card.scss';
import { SkillsButton, TestTitle, CustomQuestion } from 'components/Reusable';
import { SkillFilter } from 'components/Admin';
import { Test } from 'redux/actions/testsetup';

interface Props {
  data?: Test[];
  type?: string;
  level?: string;
  language?: string;
  verificationStatus?: boolean;
  inviteCandidates?: boolean;
  titles?: boolean;
  skillsFilter?: boolean;
  expectedTime?: string;
  questionOwner?: string;
}

const Card = (props: Props) => {
  const [open = false, setOpen] = useState<boolean>();

  const {
    data,
    type,
    level,
    language,
    verificationStatus,
    inviteCandidates,
    titles,
    skillsFilter,
    expectedTime,
    questionOwner
  } = props;

  return (
    <div>
      {open && <CustomQuestion open={open} setOpen={setOpen} />}
      {data && data.length > 0 && (
        <div className="testsDiv">
          {titles && (
            <div className="p-5 md:px-12">
              <TestTitle languageFilter />
            </div>
          )}
          {skillsFilter && (
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
          )}
          {data.map(test => (
            <div className="testSection flex border-b py-5 px-2">
              <div className="leftItems flex-1 ml-12">
                <div className="testTitle">
                  <h1 className="tracking-wide text-xl">
                    {test.name[0].toUpperCase() + test.name.slice(1)}
                  </h1>
                </div>
                <div className="testInfo text-xs">
                  <div>
                    <span className="testStatus">
                      Status:{' '}
                      <span className="statusDesc font-bold">
                        test url is on
                      </span>
                    </span>
                  </div>

                  <div>
                    {test.timePolicy && (
                      <span className="testStatus">
                        Time Policy:{' '}
                        <span className="statusDesc font-bold">
                          {test.timePolicy}
                        </span>
                      </span>
                    )}
                    {expectedTime && (
                      <span className="testStatus">
                        Time:{' '}
                        <span className="statusDesc font-bold">
                          {expectedTime}
                        </span>
                      </span>
                    )}
                  </div>

                  {type && (
                    <div>
                      <span className="questionType">
                        Type:{' '}
                        <span className="statusDesc font-bold">
                          {type === 'MultipleChoice'
                            ? 'MCQ'
                            : type === 'Video'
                            ? 'VBQ'
                            : 'Live Coding'}
                        </span>
                      </span>
                    </div>
                  )}

                  {level && (
                    <div>
                      <span className="questionLevel">
                        Level:{' '}
                        <span className="statusDesc font-bold">{level}</span>
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="testStatus">
                      By:{' '}
                      <span className="statusDesc font-bold">
                        {questionOwner && questionOwner}
                        {typeof test.owner !== 'string'
                          ? test.owner.username
                          : ''}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="statusAction">
                  <div className="reviewButton flex space-x-3 place-items-center">
                    <button type="button">Review</button>
                    {inviteCandidates && (
                      <div className="flex">
                        <span className="flex -space-x-4 overflow-hidden">
                          <img
                            className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                          <img
                            className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                          <img
                            className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                            alt=""
                          />
                        </span>
                        <span className="numbers font-bold flex-initial m-3">
                          +2{' '}
                          <span className="candidates font-normal">
                            Invite Candidates
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="rightItems flex-2 mt-16 mr-6">
                {verificationStatus && (
                  <select
                    name=""
                    id=""
                    className="pr-32 bg-transparent outline-none focus:outline-none rounded p-2"
                  >
                    <option value="verified">verified</option>
                    <option value="verified">pending</option>
                  </select>
                )}
                {language && (
                  <SkillsButton
                    javascript={language === 'javascript' ? language : null}
                    python={language === 'python' ? language : null}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
