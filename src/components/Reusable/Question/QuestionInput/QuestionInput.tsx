import React from 'react';
import './QuestionInput.scss';

interface Props {
  onChange: (value: string) => void;
  name: string;
  placeholder?: string;
  value: string;
  type?: string;
  width?: string;
}

const QuestionInput = (props: Props) => {
  const { onChange, name, placeholder, value, type, width } = props;

  return (
    <input
      type={type || 'text'}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="questionInput"
      style={{ width: width || '300px' }}
    />
  );
};

export default QuestionInput;
