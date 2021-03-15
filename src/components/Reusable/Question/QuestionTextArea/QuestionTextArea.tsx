import React from 'react';
import './QuestionTextArea.scss';

interface Props {
  name: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
  width?: string;
}

const QuestionTextArea = (props: Props) => {
  const { name, onChange, placeholder, value, width } = props;
  return (
    <textarea
      name={name}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder || 'text question'}
      className="questionTextArea"
      style={{ width: width || '75%' }}
      value={value}
    >
      {value}
    </textarea>
  );
};

export default QuestionTextArea;
