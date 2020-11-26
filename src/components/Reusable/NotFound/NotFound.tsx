import React, { FC } from 'react';
import './NotFound.scss';
import { useHistory } from 'react-router-dom';
import { Block, ArrowBack } from '@material-ui/icons';

interface Props {
  message?: string;
  serverError?: boolean;
  back?: boolean;
}

const NotFound: FC<Props> = props => {
  const { message, serverError, back } = props;

  const history = useHistory();

  return (
    <div className="pageNotFound">
      <div className="items">
        <ul>
          <li>
            <h1 className="status">{serverError ? 505 : 404}</h1>
          </li>
          <li>
            <div className="flex justify-center items-center">
              <Block
                style={{ width: '50px', height: '50px', color: '#d10000' }}
              />
              <div className="mx-2">
                {serverError ? 'Server Error' : 'Not Found'}
              </div>
            </div>
          </li>
          <li>
            {message ? (
              <div style={{ fontSize: 15 }}>{message}</div>
            ) : (
              <div style={{ fontSize: 15 }}>
                Page not found, please click on the button below to go back
              </div>
            )}
          </li>
          <li>
            <div
              className="flex justify-center items-center"
              style={{ fontSize: 15 }}
            >
              <button
                type="button"
                onClick={() => (back ? history.goBack() : history.push('/'))}
              >
                <ArrowBack style={{ width: '25px', height: '25px' }} />
              </button>
              <div className="mx-2">go back</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NotFound;
