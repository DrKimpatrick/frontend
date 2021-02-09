import React, { useState, useEffect, ChangeEvent } from 'react';
import './UploadProfilePicture.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AddItemOnModal, Loader } from 'components/Reusable';
import { RootState } from 'redux/store';
import { uploadProfilePicture } from 'redux/actions/user';

interface Props {
  setIsUploaded: (value: boolean) => void;
  closeModal: () => void;
  setUploadedImage: (value: string) => void;
  title?: string;
}

export const UploadProfilePicture = (props: Props) => {
  const [file, setFile] = useState<any>();

  const [fileResult, setFileResult] = useState<any>();

  const [fileName, setFileName] = useState<string>();

  const { closeModal, setIsUploaded, setUploadedImage, title } = props;

  const dispatch = useDispatch();

  const selector = useSelector((state: RootState) => {
    const { uploadedImage, uploadProfilePictureLoading, errors } = state.users;

    const { message, error } = state.messages;

    return {
      uploadedImage,
      uploadProfilePictureLoading,
      message,
      error,
      errors
    };
  });

  const {
    uploadedImage,
    uploadProfilePictureLoading,
    message,
    error,
    errors
  } = selector;

  const browseFile = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        setFileName(files[0].name);

        setFile(files[0]);

        setFileResult(fileReader.result);
      };

      fileReader.readAsDataURL(files[0]);
    }

    return undefined;
  };

  useEffect(() => {
    if (uploadedImage && message && uploadedImage.length > 0) {
      setIsUploaded(true);

      setUploadedImage(uploadedImage[0].path);
    }
  }, [message, setIsUploaded, setUploadedImage, uploadedImage]);

  return (
    <AddItemOnModal
      title={title || 'Upload profile picture'}
      closeModal={() => {
        if (setIsUploaded) {
          setIsUploaded(false);
        } else {
          closeModal();
        }

        return undefined;
      }}
    >
      <div className="uploadProfilePictureSection mt-4">
        {error && <div className="inputError">{error}</div>}
        {errors && errors.message && (
          <div className="inputError">{errors.message}</div>
        )}
        <div className="file flex items-center">
          <div className="fileName flex items-center p-2">
            <span style={{ color: '#747474', fontSize: 13 }}>
              {fileName ? fileName.substr(0, 70) : ''}
            </span>
          </div>
          <div className="browse">
            <input type="file" onChange={browseFile} />
            <button type="button">browse file</button>
          </div>
        </div>
        {file && fileResult && (
          <div className="previewImage">
            <div className="img">
              <img src={fileResult} alt="" />
            </div>
            <div className="upload">
              <button
                type="button"
                disabled={uploadProfilePictureLoading}
                onClick={() => {
                  if (file) {
                    uploadProfilePicture(file)(dispatch);
                  }
                  return undefined;
                }}
              >
                <Loader
                  loading={uploadProfilePictureLoading}
                  command="Upload"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </AddItemOnModal>
  );
};

export default UploadProfilePicture;
