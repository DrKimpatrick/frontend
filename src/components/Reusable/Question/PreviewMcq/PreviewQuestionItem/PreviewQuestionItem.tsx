import React, { useState } from 'react';
import './PreviewQuestionItem.scss';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import { CustomSelect, ApiValidationError } from 'components/Reusable';
import { Level } from 'redux/action-types/question';
import { FormikProps } from 'formik';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  icon: {
    fontSize: '13px',
    marginLeft: '10px',
    marginTop: '-3px'
  }
}));

interface Props {
  name: string;
  formik: FormikProps<any>;
  question: string;
  width?: string;
  language: string;
  initialLevel: string;
  apiError?: any;
  expectedTime: string;
  owner: string;
}

const QuestionName = (props: Props) => {
  const [editLevel = false, setEditLevel] = useState<boolean>();

  const {
    name,
    question,
    language,
    initialLevel,
    formik,
    apiError,
    expectedTime,
    owner
  } = props;

  const { errors, values } = formik;

  const styles = useStyles();

  return (
    <div className="prevQuestionItem">
      <div className="name">{name}</div>
      <div className="language flex item">
        <span className="font-bold">Language:</span>
        <span>{language}</span>
      </div>
      <div className="prevLevel flex item">
        {!editLevel ? (
          <div>
            <span className="font-bold">Level:</span>
            <span>{initialLevel}</span>
            <EditIcon
              className={styles.icon}
              onClick={() => setEditLevel(true)}
            />
          </div>
        ) : (
          <div className="flex">
            Level:
            <div className="inputGroup">
              <CustomSelect
                option={Object.values(Level).map(item => ({
                  name: item,
                  value: item
                }))}
                name="level"
                onChange={value => formik.setFieldValue('level', value, false)}
                value={values.level}
                placeholder="Level"
                width="300px"
              />
            </div>
            <DoneIcon onClick={() => setEditLevel(false)} />
          </div>
        )}
        <br />
        {errors && errors.level && (
          <small className="inputError">{errors.level}</small>
        )}
        <ApiValidationError fieldName="level" errors={apiError} />
      </div>
      <div className="prevDescription">
        <span className="font-bold">Text Question</span>
        {question}
        <div className="time float-right">
          <div className="name">{expectedTime}&nbsp; Min</div>
          <div className="description">By {owner}</div>
        </div>
      </div>
    </div>
  );
};

export default QuestionName;
