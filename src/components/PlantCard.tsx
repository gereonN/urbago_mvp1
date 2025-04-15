import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PlantCardProps {
  id: string;
  name: string;
  emoji: string;
  imageSrc: string;
  onClick?: () => void;
}

const PlantCard: React.FC<PlantCardProps> = ({
  id,
  name,
  emoji,
  imageSrc,
  onClick
}) => {
  return (
    <div className="plant-card" onClick={onClick}>
      <Link href={`/plants/${id}`} className="plant-card-link">
        <div className="plant-image-container">
          <Image 
            src={imageSrc} 
            alt={name} 
            width={120} 
            height={120} 
            className="plant-image"
          />
        </div>
        <div className="plant-info">
          <span className="plant-emoji">{emoji}</span>
          <span className="plant-name">{name}</span>
        </div>
      </Link>
    </div>
  );
};

export default PlantCard;
