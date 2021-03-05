import React, { useState, useEffect, ChangeEvent } from 'react';
import './UploadProfilePicture.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AddItemOnModal, Loader } from 'components/Reusable';
import { RootState } from 'redux/store';
import { uploadProfilePicture } from 'redux/actions/user';
import { uploadVideoAction } from 'redux/actions/question/videoQuestion';
import ReactPlayer from 'react-player';

interface Props {
  setIsUploaded: (value: boolean) => void;
  closeModal: () => void;
  setUploadedImage: (value: string) => void;
  title?: string;
  video?: boolean;
}

export const UploadProfilePicture = (props: Props) => {
  const [file, setFile] = useState<any>();

  const [fileResult, setFileResult] = useState<any>();

  const [fileName, setFileName] = useState<string>();

  const [videoPath, setVideoPath] = useState<string>();

  const { closeModal, setIsUploaded, setUploadedImage, title, video } = props;

  const dispatch = useDispatch();

  const selector = useSelector((state: RootState) => {
    const { uploadedImage, uploadProfilePictureLoading, errors } = state.users;

    const {
      uploadVideoError,
      uploadVideoLoading,
      uploadedVideo
    } = state.questions;

    const { message, error } = state.messages;

    return {
      uploadedImage,
      uploadProfilePictureLoading,
      message,
      error,
      errors,
      uploadVideoError,
      uploadVideoLoading,
      uploadedVideo
    };
  });

  const {
    uploadedImage,
    uploadProfilePictureLoading,
    message,
    error,
    errors,
    uploadVideoError,
    uploadVideoLoading,
    uploadedVideo
  } = selector;

  const browseFile = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        setFileName(files[0].name);

        setFile(files[0]);

        if (video) {
          setVideoPath(URL.createObjectURL(files[0]));
        }

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

  useEffect(() => {
    if (uploadedVideo && message) {
      setIsUploaded(true);

      setUploadedImage(uploadedVideo[0].location);

      closeModal();
    }

    if (uploadVideoError && !message) {
      setIsUploaded(false);
    }
  }, [
    uploadedVideo,
    message,
    setIsUploaded,
    setUploadedImage,
    uploadVideoError,
    closeModal
  ]);

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
        {uploadVideoError && uploadVideoError.message && (
          <div className="inputError">{uploadVideoError.message}</div>
        )}
        <div className="file flex items-center">
          <div className="fileName flex items-center p-2">
            <span style={{ color: '#747474', fontSize: 13 }}>
              {fileName ? fileName.substr(0, 70) : ''}
            </span>
          </div>
          <div className="browse">
            <input
              type="file"
              onChange={browseFile}
              accept={video ? 'video/*' : 'image/*'}
            />
            <button type="button">browse file</button>
          </div>
        </div>
        {file && fileResult && (
          <div className="preview">
            {video ? (
              <div className="selectedVideo">
                <ReactPlayer url={videoPath} controls />
              </div>
            ) : (
              <div className="img">
                {' '}
                <img src={fileResult} alt="" />
              </div>
            )}
            <div className="upload">
              <button
                type="button"
                disabled={
                  video ? uploadVideoLoading : uploadProfilePictureLoading
                }
                onClick={() => {
                  if (file && !video) {
                    uploadProfilePicture(file)(dispatch);
                  }
                  if (file && video) {
                    uploadVideoAction(file)(dispatch);
                  }
                  return undefined;
                }}
              >
                <Loader
                  loading={
                    video ? uploadVideoLoading : uploadProfilePictureLoading
                  }
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
