import React from 'react';
import './QuestionChoice.scss';
import { FormikProps, FieldArray } from 'formik';
import {
  QuestionButton,
  QuestionButtonBackgroundEnum
} from 'components/Reusable';
import { get, filter } from 'lodash';
import CheckIcon from '@material-ui/icons/Check';

interface Props {
  formik: FormikProps<any>;
  choice: string[];
  solution: string[];
}

const QuestionChoice = (props: Props) => {
  const { formik, choice, solution } = props;

  const { errors } = formik;

  const getError = (index: number) => {
    return (
      <small className="inputError">{get(errors, `choice[${index}]`)}</small>
    );
  };

  const selected = (value: string) => {
    const check = solution.find(item => item === value);

    return !!check;
  };

  return (
    <FieldArray name="choice">
      {arrayHelper => (
        <div className="questionChoice">
          {choice &&
            choice.length > 0 &&
            choice.map((item, index) => (
              <div key={index} className="d-flex flex-col mt-2 mb-2">
                <div className="singleChoice flex">
                  <div
                    className="checkBox"
                    onClick={() => {
                      if (item !== '') {
                        const check = solution.find(sol => sol === item);

                        if (check) {
                          const fil = filter(solution, it => it !== item);

                          formik.setFieldValue('solution', fil, false);
                        } else {
                          const newSolution = [...solution, item];

                          formik.setFieldValue('solution', newSolution, false);
                        }
                      }
                      return undefined;
                    }}
                  >
                    {selected(item) ? (
                      <div className="selected">
                        <CheckIcon />
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                  <div className="choiceInput">
                    <input
                      type="text"
                      name={`choice.${index}`}
                      onChange={formik.handleChange}
                      value={item}
                      placeholder="type choice"
                    />
                  </div>
                  <button
                    type="button"
                    className="removeChoice"
                    onClick={() => {
                      if (item !== '' && solution.length !== 0) {
                        const fil = filter(solution, it => it !== item);

                        formik.setFieldValue('solution', fil, false);
                      }
                      arrayHelper.remove(index);

                      return undefined;
                    }}
                  >
                    x
                  </button>
                </div>
                {errors && errors.choice && getError(index)}
              </div>
            ))}
          {errors && errors.solution && (
            <div className="w-full">
              <small className="inputError">{errors.solution}</small>
            </div>
          )}
          <QuestionButton
            name="Add new"
            background={QuestionButtonBackgroundEnum.Blue}
            onClick={() => arrayHelper.push('')}
          />
        </div>
      )}
    </FieldArray>
  );
};

export default QuestionChoice;
