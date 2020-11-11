import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import logo from 'assets/images/logo-image.png';
import './coverImage.scss';

const CoverImage = () => {
  return (
    <>
      <div className="flex flex-col min-w-0 bg-clip-border relative cover-image w-full">
        <img
          className="uploaded-image"
          src="https://www.qualitylogic.com/wp-content/uploads/2018/09/learning.svg"
          alt=""
        />
        <div className="absolute inset-0">
          <img
            className="bg-white w-16 h-16 rounded-full object-contain my-8 mx-12 shadow"
            src={logo}
            alt=""
          />
          <div className="w-full text-center edit-upload-icon">
            <button
              type="submit"
              className="outline-none border-none m-auto px-2 py-2 bg-transparent border-solid border-gray-500 shadow-lg rounded-sm text-center text-white"
            >
              <EditIcon /> Edit cover image
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoverImage;
