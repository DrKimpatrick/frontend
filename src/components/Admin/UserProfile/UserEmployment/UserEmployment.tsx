import React from 'react';
import { Computer } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { Employment } from 'redux/action-types/employment';
import { SideLoading } from 'components/Reusable';
import { changeEmploymentStatus } from 'redux/actions/employment';
import { ListItem } from '..';

interface Props {
  employment: Employment[];
  userEmploymentLoading?: boolean;
}

const UserEmployment = (props: Props) => {
  const { employment, userEmploymentLoading } = props;

  const dispatch = useDispatch();

  return (
    <div className="items educationItem">
      <div className="title">
        <Computer />
        <h1>Employment</h1>
      </div>
      <div className="listItems">
        {userEmploymentLoading && (
          <div className="flex justify-center" style={{ width: 150 }}>
            <SideLoading />
          </div>
        )}
        {!userEmploymentLoading && employment && employment.length > 0 && (
          <ul className="p-0 m-2 bg-card-preview">
            {employment.map((item, index) => (
              <ListItem
                listItem={{
                  id: item._id,
                  name: item.companyName,
                  status: item.verificationStatus
                }}
                key={index}
                changeStatus={value => {
                  changeEmploymentStatus({ status: value, id: item._id })(
                    dispatch
                  );
                }}
              />
            ))}
          </ul>
        )}
      </div>
      {employment && employment.length <= 0 && (
        <div className="notFound">
          <h5>There are no employment</h5>
        </div>
      )}
    </div>
  );
};

export default UserEmployment;
