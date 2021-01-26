import React from 'react';
import { School } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { Education } from 'redux/action-types/education';
import { SideLoading } from 'components/Reusable';
import { changeEducationStatus } from 'redux/actions/education';
import { ListItem } from '..';

interface Props {
  education: Education[];
  userEducationLoading?: boolean;
  hasModifyAccess?: boolean;
}

export const UserEducation = (props: Props) => {
  const { education, userEducationLoading, hasModifyAccess = true } = props;

  const dispatch = useDispatch();

  return (
    <div className="items educationItem">
      <div className="title">
        <School />
        <h1>Education</h1>
      </div>
      <div className="listItems">
        {userEducationLoading && (
          <div className="flex justify-center" style={{ width: 150 }}>
            <SideLoading />
          </div>
        )}
        {!userEducationLoading && education && education.length > 0 && (
          <ul className="p-0 m-2 bg-card-preview">
            {education.map((item, index) => (
              <ListItem
                listItem={{
                  id: item._id,
                  name: item.schoolName,
                  status: item.verificationStatus
                }}
                changeStatus={value => {
                  changeEducationStatus({ status: value, id: item._id })(
                    dispatch
                  );
                }}
                key={index}
                hasModifyAccess={hasModifyAccess}
              />
            ))}
          </ul>
        )}
      </div>
      {education && education.length <= 0 && (
        <div className="notFound">
          <h5>There are no education</h5>
        </div>
      )}
    </div>
  );
};

export default UserEducation;
