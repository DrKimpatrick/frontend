import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './Headline.scss';

const Headlines: FC = () => {
  return (
    <div className="headlines text-xs flex flex-row">
      <div className="ExportDiv">
        <span className="export">Export</span>
      </div>

      <div className="statuses">
        <span className="accepted p-2">
          Accepted: <span className="acceptedNumber tracking-widest">99+</span>
        </span>
        <span className="pendingReviews px-12">
          Pending Reviews: <span className="pendingNumber">2</span>
        </span>
        <span className="declined p-2">
          Declined: <span className="declinedNumber">4</span>
        </span>
      </div>

      <div className="headlineButtons text-white flex flex-row">
        <div className="affliateButton">
          <Link to="#" className="createAffilate md:p-2 md:px-4">
            Create Affiliate
          </Link>
        </div>
        <div className="createTestButton ml-4">
          <Link to="/test/create" className="createButton md:p-2 md:px-4">
            Create Test
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Headlines;
