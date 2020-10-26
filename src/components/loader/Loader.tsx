import React, { Fragment } from 'react';
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
    <Fragment>
      {(loading && (
        <BeatLoader css={override} size={5} color={'#ffff'} loading={loading} />
      )) ||
        command}
    </Fragment>
  );
};

export default Loader;
