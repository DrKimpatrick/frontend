import React, { InputHTMLAttributes } from 'react';

import './styles.scss';

interface FieldPropTypes extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (value: any) => void;
  value: any;
  onBlur?: (event: any) => void;
  error?: any;
  touched?: any;
  classes?: string;
}

const Field: React.FC<FieldPropTypes> = ({
  onChange,
  onBlur,
  value,
  error,
  touched,
  classes,
  ...rest
}) => {
  return (
    <div className={`flex flex-col w-full ${classes}`}>
      <input
        {...rest}
        className="input"
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
      />
      {error && touched && (
        <span className="inter text-danger text-sm flex items-center">
          {error}
        </span>
      )}
    </div>
  );
};

export default Field;
