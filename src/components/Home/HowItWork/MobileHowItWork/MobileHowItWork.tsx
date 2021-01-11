import React from 'react';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { ExpandMore } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { steps } from '../HowItWork';
import { Step } from '../Step';
import './MobileHowItWork.scss';

const Accordion = withStyles({
  root: {
    border: 'none',
    boxShadow: 'none',
    background: 'white',
    '&:not(:last-child)': {
      border: 'none'
    },
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: 'auto'
    }
  },
  expanded: {}
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'white',
    border: '1px solid #f8f8f8',
    borderRadius: 3,
    marginBottom: -1,
    marginTop: 10,
    minHeight: 56,
    fontSize: 14,
    '&$expanded': {
      minHeight: 56
    }
  },
  content: {
    '&$expanded': {
      margin: '12px 0'
    }
  },
  expanded: {}
})(MuiAccordionSummary);

const AccordionDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    fontSize: 14
  }
}))(MuiAccordionDetails);

interface Props {
  activeStep: string;
  setActiveStep: (value: string) => void;
}

const MobileHowItWork = (props: Props) => {
  const { activeStep, setActiveStep } = props;

  return (
    <div className="mobHowItWork">
      {steps.map((item, index) => (
        <Accordion
          key={index}
          expanded={activeStep === item.name}
          onChange={() => setActiveStep(item.name)}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMore
                style={{
                  color: activeStep === item.name ? 'white' : undefined
                }}
              />
            }
            style={{
              background: activeStep === item.name ? '#4d9b62' : undefined
            }}
          >
            <div
              className="heading flex items-center"
              style={{
                color: activeStep === item.name ? 'white' : undefined
              }}
            >
              {item.icon}
              <h5>{item.name}</h5>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="detail">
              <Step activeStep={activeStep} />
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default MobileHowItWork;
