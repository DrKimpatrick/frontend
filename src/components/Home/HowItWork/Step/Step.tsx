import React from 'react';
import {
  talentStep,
  companyStep,
  humanResourceStep,
  schoolStep,
  trainingStep
} from 'utils/staticData';
import { HowItWorkStep } from '../HowItWork';

interface Props {
  activeStep: string;
}
const Step = (props: Props) => {
  const { activeStep } = props;

  return (
    <>
      {activeStep === HowItWorkStep.School && (
        <ul className="flex flex-wrap list-none items-center justify-center my-8 stepDetail">
          {schoolStep.map((item, i) => (
            <li
              className="w-full md:w-1/5 flex items-center justify-center flex-col text-center"
              key={i}
            >
              <div className="font-bold stepNumber">{item.number}</div>
              <div className="description">{item.description}</div>
            </li>
          ))}
        </ul>
      )}
      {activeStep === HowItWorkStep.Talent && (
        <ul className="flex flex-wrap list-none items-center justify-center my-8 stepDetail">
          {talentStep.map((item, i) => (
            <li
              className="w-full md:w-1/5 flex items-center justify-center flex-col text-center"
              key={i}
            >
              <div className="font-bold stepNumber">{item.number}</div>
              <div className="description">{item.description}</div>
            </li>
          ))}
        </ul>
      )}
      {activeStep === HowItWorkStep.Company && (
        <ul className="flex flex-wrap list-none items-center justify-center my-8 stepDetail">
          {companyStep.map((item, i) => (
            <li
              className="w-full md:w-1/5 flex items-center justify-center flex-col text-center"
              key={i}
            >
              <div className="font-bold stepNumber">{item.number}</div>
              <div className="description">{item.description}</div>
            </li>
          ))}
        </ul>
      )}
      {activeStep === HowItWorkStep.Training && (
        <ul className="flex flex-wrap list-none items-center justify-center my-8 stepDetail">
          {trainingStep.map((item, i) => (
            <li
              className="w-full md:w-1/5 flex items-center justify-center flex-col text-center"
              key={i}
            >
              <div className="font-bold stepNumber">{item.number}</div>
              <div className="description">{item.description}</div>
            </li>
          ))}
        </ul>
      )}
      {activeStep === HowItWorkStep.HumanResource && (
        <ul className="flex flex-wrap list-none items-center justify-center my-8 stepDetail">
          {humanResourceStep.map((item, i) => (
            <li
              className="w-full md:w-1/5 flex items-center justify-center flex-col text-center"
              key={i}
            >
              <div className="font-bold stepNumber">{item.number}</div>
              <div className="description">{item.description}</div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Step;
