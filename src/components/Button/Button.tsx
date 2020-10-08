import React, { FC } from 'react';

const Button: FC<any> = ({ label }: any) => {
  return <div data-testid="button">{label}</div>;
};

export default Button;
