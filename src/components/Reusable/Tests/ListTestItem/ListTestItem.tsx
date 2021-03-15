import React, { useState } from 'react';
import './ListTestItem.scss';
import { Link } from 'react-router-dom';
import { QuestionTypeEnum, Language } from 'redux/action-types/question';
import { TestVerification } from 'redux/action-types/test';
import { CustomSelect, SkillsButton, Warning } from 'components/Reusable';
import { Create } from '@material-ui/icons/';
import { makeStyles } from '@material-ui/core/styles';

export interface ListTestItemProps {
  name: string;
  id: string;
  status: string;
  time?: string;
  owner: string;
  type?: string;
  level?: string;
  key: number;
  timePolicy?: string;
  candidates?: string[];
  verificationStatus?: string;
  programmingLanguage?: string;
  editTest?: boolean;
}

interface Props {
  item: ListTestItemProps;
  onFilter?: (val: string, id?: string) => void;
}

const useStyles = makeStyles(() => ({
  editIcon: {
    width: '17px',
    color: '#8c8989'
  }
}));

const ListTestItem = (props: Props) => {
  const [openWarning = false, setOpenWarning] = useState<boolean>();

  const [verificationStatus, setVerificationStatus] = useState<string>();

  const [showEditIcon = false, setShowEditIcon] = useState<boolean>();

  const [itemId, setItemId] = useState<string>();

  const { item, onFilter } = props;

  const styles = useStyles();

  return (
    <>
      {openWarning && verificationStatus && (
        <Warning
          cancel={() => {
            setOpenWarning(false);
            setVerificationStatus(undefined);

            return undefined;
          }}
          accept={() => {
            if (onFilter) {
              onFilter(verificationStatus, item.id);
            }

            setOpenWarning(false);

            return undefined;
          }}
        />
      )}
      <li
        key={item.key}
        className="listTestItem flex border-b py-5 px-2"
        onMouseOver={() => {
          setShowEditIcon(true);

          setItemId(item.id);

          return undefined;
        }}
        onMouseLeave={() => {
          setShowEditIcon(false);

          setItemId(undefined);

          return undefined;
        }}
      >
        <div className="leftItems flex-1 ml-12">
          <div className="testTitle flex">
            <h1 className="tracking-wide felx-1 text-xl">{item.name}</h1>
            {showEditIcon && itemId === item.id && item.editTest && (
              <div className="editIcon flex-1 md:ml-12">
                <Link to={`/test/update/${item.id}`}>
                  <Create className={styles.editIcon} />
                </Link>
              </div>
            )}
          </div>
          <div className="testInfo text-xs">
            <div>
              <span className="testStatus">
                Status:{' '}
                <span className="statusDesc font-bold">{item.status}</span>
              </span>
            </div>
            <div>
              {item.timePolicy && (
                <span className="testStatus">
                  Time Policy:{' '}
                  <span className="statusDesc font-bold">
                    {item.timePolicy}
                  </span>
                </span>
              )}
              {item.time && (
                <span className="testStatus">
                  Time:{' '}
                  <span className="statusDesc font-bold">
                    {item.time}&nbsp; min
                  </span>
                </span>
              )}
            </div>
            {item.type && (
              <div>
                <span className="questionType">
                  Type:{' '}
                  <span className="statusDesc font-bold">
                    {item.type === QuestionTypeEnum.MultipleChoice
                      ? 'MCQ'
                      : item.type === QuestionTypeEnum.Video
                      ? 'VBQ'
                      : 'Live Coding'}
                  </span>
                </span>
              </div>
            )}
            {item.level && (
              <div>
                <span className="questionLevel">
                  Level:{' '}
                  <span className="statusDesc font-bold capitalize">
                    {item.level}
                  </span>
                </span>
              </div>
            )}
            <div>
              <span className="testStatus">
                By: <span className="statusDesc font-bold">{item.owner}</span>
              </span>
            </div>
          </div>
          <div className="statusAction">
            <div className="reviewButton flex space-x-3 place-items-center">
              <Link to={`/test/${item.id}`}>
                <button type="button">Review</button>
              </Link>
              {item.candidates && (
                <div className="flex">
                  <span className="flex -space-x-4 overflow-hidden">
                    {item.candidates.length > 0 &&
                      item.candidates.map((img, indexKey) => (
                        <img
                          className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                          src={img}
                          alt={img}
                          key={indexKey}
                        />
                      ))}
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
          {item.verificationStatus && (
            <div style={{ width: '200px' }}>
              <CustomSelect
                value={item.verificationStatus}
                option={
                  item.verificationStatus === TestVerification.Verified
                    ? [
                        {
                          name: TestVerification.Verified,
                          value: TestVerification.Verified
                        }
                      ]
                    : Object.values(TestVerification).map(ver => ({
                        name: ver,
                        value: ver
                      }))
                }
                onChange={val => {
                  if (item.verificationStatus !== TestVerification.Verified) {
                    setOpenWarning(true);

                    setVerificationStatus(val);
                  }

                  return undefined;
                }}
                name="verificationStatus"
                disabled={item.verificationStatus === TestVerification.Verified}
              />
            </div>
          )}
          {item.programmingLanguage && (
            <SkillsButton
              javascript={
                item.programmingLanguage === Language.Javascript
                  ? Language.Javascript
                  : undefined
              }
              python={
                item.programmingLanguage === Language.Python
                  ? Language.Python
                  : undefined
              }
            />
          )}
        </div>
      </li>
    </>
  );
};

export default ListTestItem;
