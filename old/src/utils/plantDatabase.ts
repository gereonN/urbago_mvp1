import { PlantData } from '@/types/plant';

export async function fetchPlantDatabase(): Promise<PlantData[]> {
  try {
    const response = await fetch('/data/urbago_plant_database.csv');
    if (!response.ok) {
      throw new Error(`Failed to fetch plant database: ${response.status} ${response.statusText}`);
    }
    
    const csvText = await response.text();
    return parseCSVToPlantData(csvText);
  } catch (error) {
    console.error('Error fetching plant database:', error);
    throw error;
  }
}

function parseCSVToPlantData(csvText: string): PlantData[] {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  
  const plants: PlantData[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const values = lines[i].split(',');
    const plant: Record<string, string> = {};
    
    for (let j = 0; j < headers.length; j++) {
      plant[headers[j]] = values[j]?.trim() || '';
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
  }
  
  return plants;
}

function parseNeighbors(neighborsStr: string): { id: string; name: string; score: number }[] {
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
}

function getEmojiForCategory(categoryId: string | undefined): string {
  if (!categoryId) return '🌱';
  
  const categoryEmojis: Record<string, string> = {
    'vegetable': '🥬',
    'fruit': '🍓',
    'herb': '🌿',
    'flower': '🌸',
    'other': '🌱',
  };
  
  return categoryEmojis[categoryId] || '🌱';
}

export function getPlantCategories() {
  return [
    { id: 'vegetable', name: 'Gemüse', emoji: '🥬' },
    { id: 'fruit', name: 'Obst', emoji: '🍓' },
    { id: 'herb', name: 'Kräuter', emoji: '🌿' },
    { id: 'flower', name: 'Blumen', emoji: '🌸' },
    { id: 'other', name: 'Sonstiges', emoji: '🌱' },
  ];
}

export function getInformationCategories() {
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
}

export function getSubcategories() {
  return [
    { id: 'small_spaces', label: 'Für kleine Flächen', categoryId: 'companions' },
    { id: 'pest_control', label: 'Für Schädlingsbekämpfung', categoryId: 'companions' },
    { id: 'better_yield', label: 'Für besseren Ertrag', categoryId: 'companions' },
    { id: 'raised_bed', label: 'Für Mischkultur im Hochbeet', categoryId: 'companions' },
    
    { id: 'drought', label: 'Bei Trockenheit', categoryId: 'water' },
    { id: 'container', label: 'In Töpfen und Kübeln', categoryId: 'water' },
    { id: 'vacation', label: 'Bei Abwesenheit', categoryId: 'water' },
    
    { id: 'early_planting', label: 'Frühe Aussaat', categoryId: 'planting' },
    { id: 'succession', label: 'Staffelanbau', categoryId: 'planting' },
    { id: 'winter', label: 'Überwinterung', categoryId: 'planting' },
    
    { id: 'pruning', label: 'Schnitt und Formung', categoryId: 'care' },
    { id: 'fertilizing', label: 'Düngung', categoryId: 'care' },
    { id: 'support', label: 'Stützen und Rankhilfen', categoryId: 'care' },
    
    { id: 'organic_solutions', label: 'Biologische Lösungen', categoryId: 'problems' },
    { id: 'prevention', label: 'Vorbeugung', categoryId: 'problems' },
    { id: 'diagnosis', label: 'Symptome erkennen', categoryId: 'problems' },
    
    { id: 'storage', label: 'Lagerung und Haltbarkeit', categoryId: 'harvest' },
    { id: 'continuous', label: 'Fortlaufende Ernte', categoryId: 'harvest' },
    { id: 'ripeness', label: 'Reife erkennen', categoryId: 'harvest' },
  ];
}

export function getSubcategoriesByCategory(categoryId: string) {
  return getSubcategories().filter(subcategory => subcategory.categoryId === categoryId);
}
