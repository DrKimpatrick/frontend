import React from 'react';
import './CodeEditor.scss';
import Editor from '@monaco-editor/react';
import { SideLoading } from 'components/Reusable';

interface Props {
  language?: string;
  onChange: (value: string) => void;
  value: string;
  defaultValue?: string;
  width?: string;
  height?: string;
}

const CodeEditor = (props: Props) => {
  const { language, value, onChange, defaultValue, width, height } = props;
  return (
    <div
      className="codeEditor"
      style={{ width: width || '100%', height: height || '200px' }}
    >
      <Editor
        defaultLanguage={language || 'javascript'}
        language={language}
        onChange={val => onChange(val || '')}
        value={value}
        defaultValue={defaultValue}
        loading={<SideLoading />}
        className="editor"
      />
    </div>
  );
};

export default CodeEditor;
