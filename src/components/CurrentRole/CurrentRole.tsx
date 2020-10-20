import React, { FC } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import ArrowRightAltTwoToneIcon from '@material-ui/icons/ArrowRightAltTwoTone';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import DatePicker from 'components/DatePicker/DatePicker';
import Select from 'components/SelectOption/SelectOption';
import { createStyles } from '@material-ui/core/styles';

const styles: any = createStyles({
  formControlLabel: {
    '& label': { color: '#747474', fontSize: '14px' }
  }
});

type props = {};
const CurrentRole: FC<props> = (props: any) => {
  const history = useHistory();

  const options = [
    { value: 'Software Engineer', label: 'Software Engineer' },
    { value: 'Product Manager', label: 'Product Manager' },
    { value: 'Product Designer', label: 'Product Designer' },
    { value: 'Software Engineer1', label: 'Software Engineer1' },
    { value: 'Product Manager1', label: 'Product Manager1' },
    { value: 'Product Designer1', label: 'Product Designer1' },
    { value: 'Software Engineer2', label: 'Software Engineer2' },
    { value: 'Product Manager2', label: 'Product Manager2' },
    { value: 'Product Designer2', label: 'Product Designer2' }
  ];

  return (
    <section className="current-role-section w-1/3 m-auto text-textGray">
      <div className="flex relative h-auto my-8">
        <div className="back-arrow cursor-pointer">
          <ArrowBackTwoToneIcon />
        </div>
        <h1 className="font-bold text-xl title">
          Tell us how awesome you are!
        </h1>
      </div>
      <div className="mt-6">
        <span>What is your current role?</span>
        <div className="text-textGray mt-2">
          <Select placeholder="Select role" options={options} />
        </div>
      </div>
      <div className="mt-6">
        <span>How long have you been at your current role?</span>
        <div className="flex justify-between text-textGray mt-2">
          <DatePicker label="Start Date" defaultValue="2017-05-24" />
          <DatePicker label="End Date" defaultValue="22017-05-24" />
        </div>

        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              color="default"
              inputProps={{ 'aria-label': 'checkbox with default color' }}
              style={{
                width: '0.7em !important'
              }}
            />
          }
          label={
            <Typography style={styles.formControlLabel}>
              Currently working here
            </Typography>
          }
        />
      </div>
      <div className="mt-6">
        <span>List all of your amazing skills</span>
        <div className="text-textGray mt-2">
          <Select
            placeholder="Select your amazing skills"
            options={options}
            isMulti
          />
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <button
          onClick={() => history.push('/skill-ranking')}
          data-testid="next-button"
          className="next-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-32 rounded-sm shadow flex justify-around"
        >
          <span className="">Next</span> <ArrowRightAltTwoToneIcon />
        </button>
      </div>
    </section>
  );
};

export default withRouter(CurrentRole);
