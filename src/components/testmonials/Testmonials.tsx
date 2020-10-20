import React, { FC } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type testmonialProps = {
  testData: {
    title: string;
    description: string;
    userInfo: { userImage: string; name: string; position: string };
  }[];
};

const Testmonials: FC<testmonialProps> = ({ testData }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
    // dotsClass: 'cutomDots'
  };

  return (
    <div className="w-1/2 width-testm mb-12">
      <Slider {...settings}>
        {testData.map(test => (
          <div key={Math.random()}>
            <h2 className="flex justify-center mt-24 text-gray-700 font-black text-4xl font-width">
              {test.title}
            </h2>
            <div className="flex justify-center">
              <p className="w-4/5 text-gray-700 mt-4">{test.description}</p>
            </div>
            <div className="flex justify-center mt-4">
              <div className="flex w-64">
                <img className="w-1/4" src={test.userInfo.userImage} alt="" />
                <div className="text-xs ml-4 font-normal text-gray-700">
                  <p className="w-48 pt-4">{test.userInfo.position}</p>
                  <p>{test.userInfo.name}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testmonials;
