import React from 'react';
import './QuestionLabel.scss';

interface Props {
  name: string;
  shortDescription?: string;
  width?: string;
}

const QuestionLabel = (props: Props) => {
  const { name, shortDescription, width } = props;
  return (
    <div
      className="questionLabel flex flex-col"
      style={{ width: width || '150px' }}
    >
      <label htmlFor={name}>{name}</label>
      {shortDescription && <small>{shortDescription}</small>}
    </div>
  );
};

export default QuestionLabel;
