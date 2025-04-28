import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PlantData } from '@/types/plant';
import { fetchPlantDatabase, getInformationCategories } from '@/utils/plantDatabase';
import Layout from '@/components/Layout';
import Container from '@/components/Container';
import NavigationBreadcrumb from '@/components/NavigationBreadcrumb';
import PlantSelectionHeader from '@/components/PlantSelectionHeader';
import CategoryCard from '@/components/CategoryCard';
import Grid from '@/components/Grid';
import ChatInterface from '@/components/ChatInterface';

export default function PlantDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [plant, setPlant] = useState<PlantData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [informationCategories] = useState(getInformationCategories());

  useEffect(() => {
    const loadPlant = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const plants = await fetchPlantDatabase();
        const foundPlant = plants.find(p => p.id === id);
        
        if (foundPlant) {
          setPlant(foundPlant);
        } else {
          setError('Plant not found');
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load plant data');
        setLoading(false);
        console.error('Error loading plant data:', err);
      }
    };

    loadPlant();
  }, [id]);

  const handleCategoryClick = (categoryId: string) => {
    if (!plant) return;
    router.push(`/plants/${plant.id}/categories/${categoryId}`);
  };

  const handleSendMessage = (message: string) => {
    console.log('Message sent:', message);
    // In a real implementation, this would send the message to the ChatGPT API
    // and display the response
  };

  if (loading) {
    return (
      <Layout>
        <Container>
          <div className="loading-indicator">Lade Pflanzendaten...</div>
        </Container>
      </Layout>
    );
  }

  if (error || !plant) {
    return (
      <Layout>
        <Container>
          <div className="error-message">{error || 'Pflanze nicht gefunden'}</div>
        </Container>
      </Layout>
    );
  }

  const breadcrumbItems = [
    {
      label: plant.name,
      emoji: plant.emoji,
      href: `/plants/${plant.id}`
    }
  ];

  return (
    <Layout>
      <Container>
        <NavigationBreadcrumb items={breadcrumbItems} />
        
        <PlantSelectionHeader plant={plant} />
        
        <h3 className="categories-heading mt-xl mb-m">Was möchtest du über {plant.name} wissen?</h3>
        
        <Grid 
          columns={{
            mobile: 1,
            tablet: 2,
            desktop: 3
          }}
          gap="m"
          className="categories-grid"
        >
          {informationCategories.map(category => (
            <CategoryCard 
              key={category.id}
              id={category.id}
              title={category.title}
              icon={category.icon}
              description={category.description}
              onClick={() => handleCategoryClick(category.id)}
            />
          ))}
        </Grid>
      </Container>
      
      <div className="chat-container">
        <Container>
          <ChatInterface 
            onSendMessage={handleSendMessage}
            suggestions={[
              `Wie pflanze ich ${plant.name}?`,
              `Wann kann ich ${plant.name} ernten?`,
              `Welche Krankheiten befallen ${plant.name}?`
            ]}
          />
        </Container>
      </div>
    </Layout>
  );
}
