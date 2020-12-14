import React from 'react';
import { map } from 'lodash';

interface Props {
  fieldName: string;
  errors: any;
}

export const ApiValidationError = (props: Props) => {
  const { fieldName, errors } = props;

  const getError = () => {
    if (errors && Array.isArray(errors) && errors.length > 0) {
      return (
        <>
          {map(map(errors, fieldName), (item, i) => (
            <div key={i} className="inputError">
              {item}
            </div>
          ))}
        </>
      );
    }
    return <></>;
  };
  return <>{getError()}</>;
};

export default ApiValidationError;
