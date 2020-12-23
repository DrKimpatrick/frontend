import styled from 'styled-components';
import frontImage from 'assets/images/front.png';

const frontStyles = {
  FrontContainer: styled.div`
    background-image: url(${frontImage});
    background-repeat: no-repeat, repeat;
    background-size: cover;

    @media screen and (max-width: 480px) {
      display: flex;
      justify-content: center;
    }
  `,

  FrontText: styled.div`
    width: 40%;
    margin-left: 4rem;

    @media screen and (max-width: 480px) {
      width: 93% !important;
      margin-left: 0 !important;
    }

    @media (min-width: 480px) and (max-width: 768px) {
      width: 84% !important;
    }

    @media (min-width: 768px) and (max-width: 1200px) {
      width: 65% !important;
    }
  `,
  TopHeading: styled.h1`
    @media screen and (max-width: 768px) {
      margin-left: 0px;
    }
  `,
  FrontViewList: styled.ul`
    list-style: decimal;
    margin-left: 20px;

    @media screen and (max-width: 768px) {
      margin-left: 20px;
    }
  `,
  H5Title: styled.h5`
    @media screen and (max-width: 768px) {
      margin-left: 0px;
    }
  `,
  ButtonDiv: styled.div`
    @media screen and (max-width: 768px) {
      display: flex;
      justify-content: start;
      width: 100%;
    }
  `
};

export default frontStyles;
