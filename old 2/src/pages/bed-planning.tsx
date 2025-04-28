import React, { useState, useEffect } from 'react';
import { fetchPlantDatabase } from '@/utils/plantDatabase';
import BedPlanning from '@/components/BedPlanning';
import { PlantData } from '@/types/plant';

export default function BedPlanningPage() {
  const [plants, setPlants] = useState<PlantData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlants = async () => {
      try {
        setLoading(true);
        const plantData = await fetchPlantDatabase();
        setPlants(plantData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load plant database');
        setLoading(false);
        console.error('Error loading plant database:', err);
      }
    };

    loadPlants();
  }, []);

  if (loading) {
    return <div className="loading-indicator">Lade Pflanzendaten...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return <BedPlanning plants={plants} />;
}
