import React from 'react';
import { Loader } from 'components/Reusable';

export enum QuestionButtonBackgroundEnum {
  Green = '#02751d',
  Red = '#8a2b03',
  Blue = '#004e9c',
  white = '#FFFFFF'
}

interface Props {
  name: string;
  background: QuestionButtonBackgroundEnum;
  onClick: () => void;
  loading?: boolean;
  color: string;
  width?: string;
  paddingLeft?: string;
  paddingTop?: string;
  paddingRight?: string;
}

const QuestionButton = (props: Props) => {
  const {
    name,
    background,
    onClick,
    loading,
    color,
    width,
    paddingLeft,
    paddingTop,
    paddingRight
  } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background,
        width: `${width}`,
        color: `${color}`,
        borderRadius: '4px',
        height: '42px',
        paddingLeft: paddingLeft || '20px',
        paddingRight: paddingRight || '20px',
        paddingTop: `${paddingTop}`,
        outline: 'none',
        boxShadow: 'none',
        fontSize: '14px'
      }}
      disabled={loading}
    >
      <Loader loading={loading} command={name} />
    </button>
  );
};

export default QuestionButton;
