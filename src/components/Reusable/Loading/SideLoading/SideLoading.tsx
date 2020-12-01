import React from 'react';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import './SideLoading.scss';

const override = css`
  display: block;
`;

interface Props {
  size?: number;
}
const SideLoading = (props: Props) => {
  const { size } = props;

  return (
    <div className="sideLoading">
      {size ? (
        <ClipLoader color="#010a26" css={override} size={size} />
      ) : (
        <ClipLoader color="#010a26" css={override} />
      )}
    </div>
  );
};

export default SideLoading;
