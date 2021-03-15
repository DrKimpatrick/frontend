import React from 'react';
import './ChoicePreview.scss';
import { FormikProps, FieldArray } from 'formik';
import { get, filter } from 'lodash';

interface Props {
  formik: FormikProps<any>;
  choices: string[];
  solutions: string[];
}

const ChoicePreview = (props: Props) => {
  const { formik, choices, solutions } = props;

  const { errors } = formik;

  const getError = (index: number) => {
    return (
      <small className="inputError">{get(errors, `choice[${index}]`)}</small>
    );
  };

  const selected = (value: string) => {
    const check = solutions.find(item => item === value);

    return !!check;
  };

  const handleChoiceChange = (item: string) => {
    if (item !== '') {
      const check = solutions.find(sol => sol === item);

      if (check) {
        const fil = filter(solutions, it => it !== item);

        formik.setFieldValue('solution', fil, false);
      } else {
        const newSolution = [...solutions, item];

        formik.setFieldValue('solution', newSolution, false);
      }
    }

    return undefined;
  };

  return (
    <FieldArray name="choice">
      {() => (
        <div className="choices">
          <div className="title mb-4">Answers</div>
          {choices && choices.length > 0 && (
            <>
              {choices.map((item, index) => (
                <div key={index} className="solutions-list block">
                  <div className="flex space-x-4 items-center">
                    <input
                      type="checkBox"
                      onClick={() => handleChoiceChange(item)}
                      checked={!!selected(item)}
                    />
                    <div className="w-full space-y-3.5">{item}</div>
                  </div>
                  {errors && errors.choice && getError(index)}
                </div>
              ))}
            </>
          )}
          {errors && errors.solution && (
            <div className="w-full">
              <small className="inputError">{errors.solution}</small>
            </div>
          )}
        </div>
      )}
    </FieldArray>
  );
};

export default ChoicePreview;
