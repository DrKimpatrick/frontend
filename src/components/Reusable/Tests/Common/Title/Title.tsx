import React from 'react';
import { Link } from 'react-router-dom';
import './Title.scss';

interface Props {
  languageFilter?: boolean;
}

const Titles = (props: Props) => {
  const { languageFilter } = props;
  return (
    <div className="linkTitles">
      <div className="leftHeader text-xs md:not-italic flex">
        <Link
          to="/test/create"
          className="md:row-span-2 md:flex-initial md:p-3"
        >
          Test settings
        </Link>

        <Link
          to="/test/questions"
          className="md:row-span-2 md:flex-initial md:p-3 md:pl-32"
        >
          Questions
        </Link>
        <Link to="#" className="md:row-span-2 md:flex-initial md:p-3 md:pl-32">
          Candindates
        </Link>
        {languageFilter && (
          <div className="selectLang flex-initial md:absolute md:right-0 mr-4">
            <select
              name=""
              id=""
              className="md:text-xs md:p-2 md:pr-32 border md:rounded bg-transparent"
            >
              <option value="" className="">
                Select Language
              </option>
              <option value="">JavaScript</option>
              <option value="">PHP</option>
              <option value="">Python</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default Titles;
