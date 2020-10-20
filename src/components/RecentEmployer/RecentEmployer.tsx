import React, { FC } from 'react';
import { withRouter } from 'react-router-dom';
import './RecentEmployer.scss';
import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import ArrowRightAltTwoToneIcon from '@material-ui/icons/ArrowRightAltTwoTone';
import Select from 'components/SelectOption/SelectOption';
import DatePicker from 'components/DatePicker/DatePicker';

type props = {};
const RecentEmployer: FC<props> = (props: any) => {
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
    <section className="recent-employer-section w-1/3 m-auto text-textGray">
      <div className="flex relative h-auto my-8">
        <div className="back-arrow cursor-pointer">
          <ArrowBackTwoToneIcon />
        </div>
        <h1 className="font-bold text-base title">
          Who was your most recent employer?
        </h1>
      </div>
      <div className="text-textGray mt-8">
        <input
          type="text"
          className="border outline-none bg-transparent rounded-sm w-full px-3 text-textGray input-height"
          placeholder="Company Name"
        />
      </div>

      <div className="text-textGray mt-4">
        <Select
          options={[
            { value: 'Staffing', label: 'Staffing' },
            { value: 'Employee', label: 'Employee' },
            { value: 'HR', label: 'HR' }
          ]}
          placeholder="Select your supervisor"
        />
      </div>
      <div className="text-textGray mt-4">
        <input
          type="text"
          className="border outline-none bg-transparent rounded w-full px-3 text-textGray input-height"
          placeholder="Your Title"
        />
      </div>

      <div className="flex justify-between text-textGray mt-4">
        <DatePicker label="Start Date" defaultValue="2017-05-24" />
        <DatePicker label="Send Date" defaultValue="22017-05-24" />
      </div>

      <div className="text-textGray mt-4">
        <input
          type="text"
          className="border outline-none bg-transparent rounded w-full px-3 text-textGray input-height"
          placeholder="Company phone"
        />
      </div>

      <div className="text-textGray mt-4">
        <Select isMulti options={options} placeholder="Select skills used" />
      </div>

      <div className="text-textGray mt-4">
        <input
          type="text"
          className="border outline-none bg-transparent rounded w-full px-3 text-textGray input-height"
          placeholder="Responsibilities"
        />
      </div>

      <div className="text-textGray mt-4">
        <input
          type="text"
          className="border outline-none bg-transparent rounded w-full px-3 text-textGray input-height"
          placeholder="Accomplishments"
        />
      </div>

      <div className="text-textGray mt-4">
        <input
          type="text"
          className="border outline-none bg-transparent rounded w-full px-3 text-textGray input-height"
          placeholder="Favorite project you built or contributed to?"
        />
      </div>

      <div className="flex justify-center mt-12">
        <button
          data-testid="next-button"
          className="next-btn text-white hover:bg-gray-800 font-semibold py-1 px-3 w-32 rounded-sm shadow flex justify-around"
        >
          <span className="">Next</span> <ArrowRightAltTwoToneIcon />
        </button>
      </div>
    </section>
  );
};

export default withRouter(RecentEmployer);
