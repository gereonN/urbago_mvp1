import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PlantData } from '@/types/plant';
import { fetchPlantDatabase, getInformationCategories, getSubcategoriesByCategory } from '@/utils/plantDatabase';
import Layout from '@/components/Layout';
import Container from '@/components/Container';
import NavigationBreadcrumb from '@/components/NavigationBreadcrumb';
import PlantSelectionHeader from '@/components/PlantSelectionHeader';
import ChatInterface from '@/components/ChatInterface';

export default function SubcategoryDetailPage() {
  const router = useRouter();
  const { id, categoryId, subcategoryId } = router.query;
  
  const [plant, setPlant] = useState<PlantData | null>(null);
  const [category, setCategory] = useState<any | null>(null);
  const [subcategory, setSubcategory] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!id || !categoryId || !subcategoryId) return;
      
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
        
        // Load subcategory
        const subcategories = getSubcategoriesByCategory(categoryId as string);
        const foundSubcategory = subcategories.find(s => s.id === subcategoryId);
        
        if (!foundSubcategory) {
          setError('Subcategory not found');
          setLoading(false);
          return;
        }
        
        setSubcategory(foundSubcategory);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
        console.error('Error loading data:', err);
      }
    };

    loadData();
  }, [id, categoryId, subcategoryId]);

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

  if (error || !plant || !category || !subcategory) {
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
    },
    {
      label: subcategory.label,
      href: `/plants/${plant.id}/categories/${category.id}/subcategories/${subcategory.id}`
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
            <h3 className="subcategory-title-large">{subcategory.label}</h3>
          </div>
        </div>
        
        <div className="subcategory-content mt-xl">
          {/* This would be populated with the GPT-generated content */}
          <div className="placeholder-content">
            <h3>{subcategory.label} für {plant.name}</h3>
            <p>Hier würden die vom GPT-generierten spezifischen Informationen zu {subcategory.label} für {plant.name} angezeigt werden.</p>
            
            {category.id === 'companions' && subcategory.id === 'small_spaces' && (
              <div className="example-content">
                <h4>🏡 Optimale Begleiter für {plant.name} auf kleinen Flächen</h4>
                <p>Auf begrenztem Raum ist es besonders wichtig, Pflanzen zu kombinieren, die:</p>
                <ul>
                  <li>Wenig Platz benötigen</li>
                  <li>Sich gegenseitig unterstützen</li>
                  <li>Unterschiedliche Wuchshöhen haben (für vertikales Gärtnern)</li>
                </ul>
                
                <h4>✅ Top-Begleiter für kleine Flächen:</h4>
                <ul>
                  {plant.goodNeighbors.slice(0, 3).map(neighbor => (
                    <li key={neighbor.id}>
                      <strong>{neighbor.name}</strong> - Benötigt wenig Platz und harmoniert gut mit {plant.name}
                    </li>
                  ))}
                </ul>
                
                <h4>📐 Platzsparende Anbaumethoden:</h4>
                <p>Nutze vertikale Strukturen wie Rankgitter oder Töpfe in verschiedenen Höhen, um den verfügbaren Platz optimal zu nutzen.</p>
              </div>
            )}
          </div>
        </div>
      </Container>
      
      <div className="chat-container">
        <Container>
          <ChatInterface 
            onSendMessage={handleSendMessage}
            suggestions={[
              `Mehr Details zu ${subcategory.label} für ${plant.name}`,
              `Alternative Methoden für ${subcategory.label}`,
              `Tipps für Anfänger zu ${subcategory.label}`
            ]}
          />
        </Container>
      </div>
    </Layout>
  );
}
