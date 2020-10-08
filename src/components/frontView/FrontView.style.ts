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
  `
};

export default frontStyles;
