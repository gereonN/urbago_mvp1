export interface PlantData {
  id: string;
  name: string;
  botanicalName: string;
  category: string;
  emoji: string;
  imageSrc: string;
  tags: string[];
  difficulty: number;
  spacing: number;
  height: number;
  waterNeeds: string;
  lightNeeds: string;
  soilType: string;
  phPreference: string;
  companionScore: number;
  goodNeighbors: {
    id: string;
    name: string;
    score: number;
  }[];
  badNeighbors: {
    id: string;
    name: string;
    score: number;
  }[];
  plantingTime: string;
  harvestTime: string;
}

export interface PlantCategory {
  id: string;
  name: string;
  emoji: string;
}

export interface InformationCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export interface Subcategory {
  id: string;
  label: string;
  categoryId: string;
}
