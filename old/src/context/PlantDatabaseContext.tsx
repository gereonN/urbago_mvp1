import React, { useState, useEffect } from 'react';
import { PlantData } from '@/types/plant';

interface PlantDatabaseContextType {
  plants: PlantData[];
  categories: { id: string; name: string; emoji: string }[];
  loading: boolean;
  error: string | null;
  getPlantById: (id: string) => PlantData | undefined;
  getPlantsByCategory: (categoryId: string) => PlantData[];
  getPlantCategories: () => { id: string; name: string; emoji: string }[];
  getPlantInformationCategories: () => { id: string; title: string; icon: string; description: string }[];
  getCompatiblePlants: (plantId: string) => { good: PlantData[], bad: PlantData[] };
}

const defaultContextValue: PlantDatabaseContextType = {
  plants: [],
  categories: [],
  loading: true,
  error: null,
  getPlantById: () => undefined,
  getPlantsByCategory: () => [],
  getPlantCategories: () => [],
  getPlantInformationCategories: () => [],
  getCompatiblePlants: () => ({ good: [], bad: [] }),
};

export const PlantDatabaseContext = React.createContext<PlantDatabaseContextType>(defaultContextValue);

export const PlantDatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [plants, setPlants] = useState<PlantData[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string; emoji: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlantData = async () => {
      try {
        // In a real implementation, this would fetch from an API
        const response = await fetch('/data/urbago_plant_database.csv');
        const csvText = await response.text();
        
        // Parse CSV data
        const parsedData = parseCSV(csvText);
        setPlants(parsedData.plants);
        setCategories(parsedData.categories);
        setLoading(false);
      } catch (err) {
        setError('Failed to load plant database');
        setLoading(false);
        console.error('Error loading plant database:', err);
      }
    };

    loadPlantData();
  }, []);

  const parseCSV = (csvText: string) => {
    // This is a simplified CSV parser for demonstration
    // In a real implementation, you would use a proper CSV parsing library
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    
    const plants: PlantData[] = [];
    const categoriesMap = new Map<string, { id: string; name: string; emoji: string }>();
    
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      const values = lines[i].split(',');
      const plant: any = {};
      
      for (let j = 0; j < headers.length; j++) {
        plant[headers[j].trim()] = values[j]?.trim() || '';
      }
      
      // Convert to PlantData format
      const plantData: PlantData = {
        id: plant.plant_id || `plant_${i}`,
        name: plant.name_de || 'Unknown Plant',
        botanicalName: plant.name_botanical || '',
        category: plant.category || 'other',
        emoji: getEmojiForCategory(plant.category) || '🌱',
        imageSrc: `/images/plants/${plant.plant_id || `plant_${i}`}.jpg`,
        tags: plant.tags?.split('|') || [],
        difficulty: parseInt(plant.difficulty) || 1,
        spacing: parseFloat(plant.plant_spacing) || 0.3,
        height: parseFloat(plant.height) || 0.5,
        waterNeeds: plant.water_needs || 'medium',
        lightNeeds: plant.light_needs || 'full_sun',
        soilType: plant.soil_type || 'loamy',
        phPreference: plant.ph_preference || 'neutral',
        companionScore: parseInt(plant.companion_score) || 5,
        goodNeighbors: parseNeighbors(plant.good_neighbors),
        badNeighbors: parseNeighbors(plant.bad_neighbors),
        plantingTime: plant.planting_time || 'Spring',
        harvestTime: plant.harvest_time || 'Summer',
      };
      
      plants.push(plantData);
      
      // Extract categories
      if (plant.category && !categoriesMap.has(plant.category)) {
        categoriesMap.set(plant.category, {
          id: plant.category,
          name: getCategoryName(plant.category),
          emoji: getEmojiForCategory(plant.category),
        });
      }
    }
    
    return {
      plants,
      categories: Array.from(categoriesMap.values()),
    };
  };

  const parseNeighbors = (neighborsStr: string): { id: string; name: string; score: number }[] => {
    if (!neighborsStr) return [];
    
    try {
      // This is a simplified parser for demonstration
      // In a real implementation, you would parse the actual format from your CSV
      return neighborsStr.split('|').map(neighbor => {
        const [id, name, score] = neighbor.split(':');
        return {
          id: id || '',
          name: name || '',
          score: parseInt(score) || 0,
        };
      });
    } catch (err) {
      console.error('Error parsing neighbors:', err);
      return [];
    }
  };

  const getCategoryName = (categoryId: string): string => {
    const categoryNames: Record<string, string> = {
      'vegetable': 'Gemüse',
      'fruit': 'Obst',
      'herb': 'Kräuter',
      'flower': 'Blumen',
      'other': 'Sonstiges',
    };
    
    return categoryNames[categoryId] || categoryId;
  };

  const getEmojiForCategory = (categoryId: string): string => {
    const categoryEmojis: Record<string, string> = {
      'vegetable': '🥬',
      'fruit': '🍓',
      'herb': '🌿',
      'flower': '🌸',
      'other': '🌱',
    };
    
    return categoryEmojis[categoryId] || '🌱';
  };

  const getPlantById = (id: string): PlantData | undefined => {
    return plants.find(plant => plant.id === id);
  };

  const getPlantsByCategory = (categoryId: string): PlantData[] => {
    if (categoryId === 'all') return plants;
    return plants.filter(plant => plant.category === categoryId);
  };

  const getPlantCategories = () => {
    return categories;
  };

  const getPlantInformationCategories = () => {
    return [
      {
        id: 'companions',
        title: 'Mit wem gehe ich ins Beet?',
        icon: '🌱',
        description: 'Erfahre, welche Pflanzen gut zusammen gedeihen.'
      },
      {
        id: 'water',
        title: 'Wieviel Wasser brauche ich?',
        icon: '💧',
        description: 'Informationen zum Wasserbedarf und zur richtigen Bewässerung.'
      },
      {
        id: 'planting',
        title: 'Wann pflanze ich?',
        icon: '🌿',
        description: 'Aussaat- und Pflanzzeiten im Überblick.'
      },
      {
        id: 'care',
        title: 'Wie pflege ich?',
        icon: '✂️',
        description: 'Pflegehinweise für optimales Wachstum.'
      },
      {
        id: 'problems',
        title: 'Was sind häufige Probleme?',
        icon: '🐛',
        description: 'Schädlinge, Krankheiten und deren Bekämpfung.'
      },
      {
        id: 'harvest',
        title: 'Wie ernte ich?',
        icon: '🍽️',
        description: 'Erntehinweise und Lagerung.'
      }
    ];
  };

  const getCompatiblePlants = (plantId: string) => {
    const plant = getPlantById(plantId);
    if (!plant) return { good: [], bad: [] };
    
    const goodPlants = plant.goodNeighbors
      .map(neighbor => getPlantById(neighbor.id))
      .filter((p): p is PlantData => p !== undefined);
      
    const badPlants = plant.badNeighbors
      .map(neighbor => getPlantById(neighbor.id))
      .filter((p): p is PlantData => p !== undefined);
    
    return { good: goodPlants, bad: badPlants };
  };

  const value = {
    plants,
    categories,
    loading,
    error,
    getPlantById,
    getPlantsByCategory,
    getPlantCategories,
    getPlantInformationCategories,
    getCompatiblePlants,
  };

  return (
    <PlantDatabaseContext.Provider value={value}>
      {children}
    </PlantDatabaseContext.Provider>
  );
};

export const usePlantDatabase = () => {
  const context = React.useContext(PlantDatabaseContext);
  if (context === undefined) {
    throw new Error('usePlantDatabase must be used within a PlantDatabaseProvider');
  }
  return context;
};
