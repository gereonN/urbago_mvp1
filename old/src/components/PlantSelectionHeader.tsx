import React from 'react';
import Image from 'next/image';

interface PlantSelectionHeaderProps {
  plant: {
    id: string;
    name: string;
    botanicalName: string;
    emoji: string;
    imageSrc: string;
  };
}

const PlantSelectionHeader: React.FC<PlantSelectionHeaderProps> = ({
  plant
}) => {
  return (
    <div className="selected-plant">
      <div className="selected-plant-image-container">
        <Image 
          src={plant.imageSrc} 
          alt={plant.name} 
          width={80} 
          height={80} 
          className="selected-plant-image"
        />
      </div>
      <div className="selected-plant-info">
        <span className="selected-plant-emoji">{plant.emoji}</span>
        <h2 className="selected-plant-name">{plant.name}</h2>
        <span className="selected-plant-botanical">{plant.botanicalName}</span>
      </div>
    </div>
  );
};

export default PlantSelectionHeader;
