import React from 'react';
import { useImage } from 'react-image';

interface Props {
  src: string;
}

const Image = (props: Props) => {
  const { src: srcImage } = props;
  const { src } = useImage({ srcList: srcImage, useSuspense: true });

  if (!src) {
    return <></>;
  }
  return <img src={src} alt={src} style={{ width: '100%', height: '100%' }} />;
};

export default Image;
