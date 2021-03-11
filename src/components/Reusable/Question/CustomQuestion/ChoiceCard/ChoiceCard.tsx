import React from 'react';
import './ChoiceCard.scss';

interface Props {
  title: string;
  image: any;
  description: string;
}

const ChoiceCard = (props: Props) => {
  const { title, image, description } = props;
  return (
    <div className="perfomaceBased p-5">
      <h1 className="text">{title}</h1>
      <span className="image flex items-center justify-center">{image}</span>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default ChoiceCard;
