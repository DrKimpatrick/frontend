import React from 'react';
import { css } from '@emotion/core';
import BeatLoader from 'react-spinners/BeatLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loader = (props: any) => {
  const { command, loading } = props;
  return (
    <>
      {(loading && (
        <BeatLoader css={override} size={5} color="#ffff" loading={loading} />
      )) ||
        command}
    </>
  );
};

export default Loader;
