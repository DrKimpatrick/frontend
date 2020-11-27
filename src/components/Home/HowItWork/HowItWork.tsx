import React, { useState, useEffect } from 'react';
import {
  LaptopMac,
  School as SchoolIcon,
  Work,
  Airplay,
  ImportContacts
} from '@material-ui/icons';
import './HotItWork.scss';
import {
  talentStep,
  companyStep,
  humanResourceStep,
  schoolStep,
  trainingStep
} from 'utils/staticData';

enum HowItWorkStep {
  Talent = 'Talent',
  School = 'School',
  Company = 'Companies',
  HumanResource = 'Human Resource',
  Training = 'Training'
}
const steps = [
  {
    name: HowItWorkStep.Talent,
    icon: <LaptopMac />
  },
  {
    name: HowItWorkStep.School,
    icon: <SchoolIcon />
  },
  {
    name: HowItWorkStep.Training,
    icon: <ImportContacts />
  },
  {
    name: HowItWorkStep.HumanResource,
    icon: <Airplay />
  },
  {
    name: HowItWorkStep.Company,
    icon: <Work />
  }
];
interface Props {
  setStepName: (value: string) => void;
}
const HowItWork = (props: Props) => {
  const [activeStep = HowItWorkStep.Talent, setActiveStep] = useState<string>();

  const { setStepName } = props;

  useEffect(() => {
    setStepName(activeStep);
  }, [activeStep, setStepName]);

  return (
    <div className="howItWorkSection">
      <h2
        data-testid="howItWorks"
        className="flex justify-center mt-16 text-gray-600 font-black text-2xl"
      >
        How it works
      </h2>
      <div className="my-10">
        <ul className="flex flex-wrap list-none items-center justify-center">
          {steps.map((item, i) => (
            <li
              className="w-full md:w-1/5 flex items-center justify-center"
              key={i}
            >
              <button
                type="button"
                className={`flex items-center buttons ${
                  activeStep === item.name ? 'active' : ''
                }`}
                onClick={() => setActiveStep(item.name)}
              >
                {item.icon}
                <h5 className="mx-1">{item.name}</h5>
              </button>
            </li>
          ))}
        </ul>
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
      </div>
    </div>
  );
};

export default HowItWork;
