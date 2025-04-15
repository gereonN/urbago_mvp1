import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PlantData } from '@/types/plant';
import { fetchPlantDatabase, getInformationCategories, getSubcategoriesByCategory } from '@/utils/plantDatabase';
import Layout from '@/components/Layout';
import Container from '@/components/Container';
import NavigationBreadcrumb from '@/components/NavigationBreadcrumb';
import PlantSelectionHeader from '@/components/PlantSelectionHeader';
import SubcategoryChip from '@/components/SubcategoryChip';
import ChatInterface from '@/components/ChatInterface';

export default function CategoryDetailPage() {
  const router = useRouter();
  const { id, categoryId } = router.query;
  
  const [plant, setPlant] = useState<PlantData | null>(null);
  const [category, setCategory] = useState<any | null>(null);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!id || !categoryId) return;
      
      try {
        setLoading(true);
        
        // Load plant data
        const plants = await fetchPlantDatabase();
        const foundPlant = plants.find(p => p.id === id);
        
        if (!foundPlant) {
          setError('Plant not found');
          setLoading(false);
          return;
        }
        
        setPlant(foundPlant);
        
        // Load category data
        const categories = getInformationCategories();
        const foundCategory = categories.find(c => c.id === categoryId);
        
        if (!foundCategory) {
          setError('Category not found');
          setLoading(false);
          return;
        }
        
        setCategory(foundCategory);
        
        // Load subcategories
        const foundSubcategories = getSubcategoriesByCategory(categoryId as string);
        setSubcategories(foundSubcategories);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
        console.error('Error loading data:', err);
      }
    };

    loadData();
  }, [id, categoryId]);

  const handleSubcategoryClick = (subcategoryId: string) => {
    if (!plant || !category) return;
    router.push(`/plants/${plant.id}/categories/${category.id}/subcategories/${subcategoryId}`);
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
          <div className="loading-indicator">Lade Daten...</div>
        </Container>
      </Layout>
    );
  }

  if (error || !plant || !category) {
    return (
      <Layout>
        <Container>
          <div className="error-message">{error || 'Daten nicht gefunden'}</div>
        </Container>
      </Layout>
    );
  }

  const breadcrumbItems = [
    {
      label: plant.name,
      emoji: plant.emoji,
      href: `/plants/${plant.id}`
    },
    {
      label: category.title,
      emoji: category.icon,
      href: `/plants/${plant.id}/categories/${category.id}`
    }
  ];

  return (
    <Layout>
      <Container>
        <NavigationBreadcrumb items={breadcrumbItems} />
        
        <div className="context-display">
          <PlantSelectionHeader plant={plant} />
          
          <div className="selected-category mt-l">
            <div className="category-icon-large">{category.icon}</div>
            <h2 className="category-title-large">{category.title}</h2>
            <p className="category-description-large">{category.description}</p>
          </div>
        </div>
        
        {subcategories.length > 0 && (
          <div className="subcategories-container mt-xl">
            <h4 className="subcategories-heading mb-m">Wähle eine spezifische Anfrage:</h4>
            
            <div className="subcategories-chips">
              {subcategories.map(subcategory => (
                <SubcategoryChip
                  key={subcategory.id}
                  id={subcategory.id}
                  label={subcategory.label}
                  onClick={() => handleSubcategoryClick(subcategory.id)}
                />
              ))}
            </div>
          </div>
        )}
        
        <div className="category-content mt-xl">
          {/* This would be populated with the GPT-generated content */}
          <div className="placeholder-content">
            <h3>Informationen zu {category.title} für {plant.name}</h3>
            <p>Hier würden die vom GPT-generierten Informationen angezeigt werden.</p>
          </div>
        </div>
      </Container>
      
      <div className="chat-container">
        <Container>
          <ChatInterface 
            onSendMessage={handleSendMessage}
            suggestions={[
              `Mehr Details zu ${category.title} für ${plant.name}`,
              `Tipps für ${plant.name} auf kleinen Flächen`,
              `Probleme mit ${plant.name} lösen`
            ]}
          />
        </Container>
      </div>
    </Layout>
  );
}
