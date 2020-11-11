import React, { FC, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';

const Accordion = withStyles({
  root: {
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0
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
    marginBottom: -1,
    minHeight: 56,
    padding: 0,
    '&$expanded': {
      minHeight: 56
    }
  },
  content: {
    '&$expanded': {}
  },
  expanded: {}
})(MuiAccordionSummary);

const AccordionDetails = withStyles(theme => ({
  root: {}
}))(MuiAccordionDetails);

type elements = {
  components: any;
};

const AccordionMenu: FC<elements> = ({ components }) => {
  const [expanded, setExpanded] = useState<string | false>('panel1');

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <>
      <div>
        <ul className="flex flex-col items-center">
          {components.map((component: any) => (
            <li className="accordion-menu-custom" key={component.id}>
              <Accordion
                square
                expanded={expanded === `panel${component.id}`}
                onChange={handleChange(`panel${component.id}`)}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  expandIcon={
                    expanded === `panel${component.id}` ? (
                      <RemoveOutlinedIcon className="light-font" />
                    ) : (
                      <AddOutlinedIcon />
                    )
                  }
                >
                  {component.headline}
                </AccordionSummary>
                <AccordionDetails>
                  <div className="flex flex-col w-full">
                    {component.details}
                  </div>
                </AccordionDetails>
              </Accordion>
            </li>
          ))}
        </ul>
      </div>{' '}
    </>
  );
};

export default AccordionMenu;
