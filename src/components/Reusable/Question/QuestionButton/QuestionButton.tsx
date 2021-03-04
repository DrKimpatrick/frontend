import React from 'react';
import { Loader } from 'components/Reusable';

export enum QuestionButtonBackgroundEnum {
  Green = '#02751d',
  Red = '#8a2b03',
  Blue = '#004e9c'
}

interface Props {
  name: string;
  background: QuestionButtonBackgroundEnum;
  onClick: () => void;
  loading?: boolean;
}

const QuestionButton = (props: Props) => {
  const { name, background, onClick, loading } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background,
        color: 'white',
        borderRadius: '4px',
        height: '42px',
        paddingLeft: '20px',
        paddingRight: '20px',
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
