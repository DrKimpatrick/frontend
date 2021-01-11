import React, { useState, useEffect } from 'react';
import {
  LaptopMac,
  School as SchoolIcon,
  Work,
  Airplay,
  ImportContacts
} from '@material-ui/icons';
import './HotItWork.scss';
import useWindowSize from 'utils/useWindowSize';
import { MobileHowItWork } from './MobileHowItWork';
import { Step } from './Step';

export enum HowItWorkStep {
  Talent = 'Talent',
  School = 'School',
  Company = 'Companies',
  HumanResource = 'Human Resource',
  Training = 'Training'
}
export const steps = [
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

  const size = useWindowSize();

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
      {size && size.width && size.width > 768 ? (
        <div className="my-10">
          <ul className="flex flex-wrap list-none items-center justify-center">
            {steps.map((item, i) => (
              <li
                className="w-full md:w-1/5 flex items-center justify-center"
                key={i}
              >
                <div
                  className={`flex items-center buttons ${
                    activeStep === item.name ? 'active' : ''
                  }`}
                  onClick={() => setActiveStep(item.name)}
                >
                  {item.icon}
                  <h5 className="mx-1">{item.name}</h5>
                </div>
              </li>
            ))}
          </ul>
          <Step activeStep={activeStep} />
        </div>
      ) : (
        <MobileHowItWork
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}
    </div>
  );
};

export default HowItWork;
