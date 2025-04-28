import React, { useState } from 'react';
import { PlantData } from '@/types/plant';
import Layout from '@/components/Layout';
import Container from '@/components/Container';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Grid from '@/components/Grid';
import PlantCard from '@/components/PlantCard';

interface BedPlanningProps {
  plants: PlantData[];
}

const BedPlanning: React.FC<BedPlanningProps> = ({ plants }) => {
  const [selectedPlants, setSelectedPlants] = useState<string[]>([]);
  const [bedLength, setBedLength] = useState<number>(2.5);
  const [bedWidth, setBedWidth] = useState<number>(1.2);
  const [bedArea, setBedArea] = useState<number>(3.0);
  const [planResult, setPlanResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<'select' | 'dimensions' | 'result'>('select');

  // Update bed area when length or width changes
  const updateBedArea = (length: number, width: number) => {
    const area = length * width;
    setBedArea(parseFloat(area.toFixed(2)));
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setBedLength(value);
      updateBedArea(value, bedWidth);
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setBedWidth(value);
      updateBedArea(bedLength, value);
    }
  };

  const togglePlantSelection = (plantId: string) => {
    setSelectedPlants(prev => 
      prev.includes(plantId) 
        ? prev.filter(id => id !== plantId) 
        : [...prev, plantId]
    );
  };

  const handleNextStep = () => {
    if (step === 'select' && selectedPlants.length > 0) {
      setStep('dimensions');
    } else if (step === 'dimensions') {
      generateBedPlan();
    }
  };

  const handleBackStep = () => {
    if (step === 'dimensions') {
      setStep('select');
    } else if (step === 'result') {
      setStep('dimensions');
      setPlanResult(null);
    }
  };

  const generateBedPlan = async () => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call the OpenAI API
      // For now, we'll simulate a response with a timeout
      
      // Prepare the selected plants data
      const selectedPlantsData = plants
        .filter(plant => selectedPlants.includes(plant.id))
        .map(plant => ({
          plant_id: plant.id,
          name_de: plant.name,
          name_en: plant.name,
          name_botanical: plant.botanicalName
        }));
      
      // Simulate API call
      setTimeout(() => {
        // This is a mock response - in a real implementation, this would come from the API
        const mockResponse = generateMockBedPlanResponse(selectedPlantsData, bedLength, bedWidth, bedArea);
        setPlanResult(mockResponse);
        setStep('result');
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error generating bed plan:', error);
      setIsLoading(false);
    }
  };

  const generateMockBedPlanResponse = (
    selectedPlantsData: any[], 
    length: number, 
    width: number, 
    area: number
  ) => {
    // This is a simplified mock response
    return `
      <div class="bed-plan">
        <h2>📋 Übersicht des Bepflanzungsplans</h2>
        <p>Hier ist dein optimierter Bepflanzungsplan für ein Beet mit ${length}m × ${width}m (${area}m²). Der Plan kombiniert ${selectedPlantsData.length} Pflanzenarten in einer harmonischen Anordnung, die Pflanzenkompatibilität, Platzbedarf und Wachstumsbedingungen berücksichtigt.</p>
        
        <h2>🌱 Pflanzenverteilung</h2>
        <table class="plants-table">
          <tr>
            <th>Pflanze</th>
            <th>Anzahl</th>
            <th>Position</th>
          </tr>
          ${selectedPlantsData.map((plant, index) => `
            <tr>
              <td>${plant.name_de}</td>
              <td>${Math.floor(Math.random() * 10) + 1}</td>
              <td>${index % 2 === 0 ? 'Norden' : 'Süden'}</td>
            </tr>
          `).join('')}
        </table>
        
        <h2>🗺️ Visueller Beetplan</h2>
        <pre class="bed-visual">
┌─────────────────────────────────────────┐
│                  NORDEN                  │
├─────────────────────────────────────────┤
${selectedPlantsData.map((plant, i) => `│ ${plant.name_de.charAt(0).toUpperCase().repeat(Math.floor(20/selectedPlantsData.length)).split('').join('   ')}   │\n│                                         │\n`).join('')}├─────────────────────────────────────────┤
│                  SÜDEN                   │
└─────────────────────────────────────────┘

Legende:
${selectedPlantsData.map(plant => `${plant.name_de.charAt(0).toUpperCase()} = ${plant.name_de}`).join('\n')}
        </pre>
        
        <h2>💧 Pflege- und Bewässerungshinweise</h2>
        <p>Die Pflanzen in deinem Beet haben ähnliche Wasserbedürfnisse, was die Bewässerung vereinfacht. Gieße regelmäßig, besonders in Trockenperioden.</p>
        
        <h2>🌞 Saisonale Empfehlungen</h2>
        <p>Pflanze im Frühjahr (April-Mai) und erwarte Ernten von Sommer bis Herbst.</p>
        
        <h2>💡 Praktische Tipps für urbane Gärtner</h2>
        <ul>
          <li>Nutze Mulch, um Feuchtigkeit zu speichern</li>
          <li>Installiere ein einfaches Tropfbewässerungssystem für gleichmäßige Bewässerung</li>
          <li>Verwende vertikale Stützen für höhere Pflanzen, um Platz zu sparen</li>
        </ul>
      </div>
    `;
  };

  return (
    <Layout>
      <Container>
        <h1 className="page-title">Beet planen</h1>
        
        {step === 'select' && (
          <div className="plant-selection-step">
            <Card>
              <h2>1. Pflanzen auswählen</h2>
              <p>Wähle die Pflanzen aus, die du in deinem Beet anbauen möchtest.</p>
              
              <div className="selected-count mt-m mb-m">
                <strong>Ausgewählte Pflanzen: {selectedPlants.length}</strong>
              </div>
              
              <Grid 
                columns={{
                  mobile: 2,
                  tablet: 3,
                  desktop: 4
                }}
                gap="m"
              >
                {plants.map(plant => (
                  <div 
                    key={plant.id} 
                    className={`selectable-plant-card ${selectedPlants.includes(plant.id) ? 'selected' : ''}`}
                    onClick={() => togglePlantSelection(plant.id)}
                  >
                    <PlantCard 
                      id={plant.id}
                      name={plant.name}
                      emoji={plant.emoji}
                      imageSrc={plant.imageSrc}
                    />
                    <div className="selection-indicator">
                      {selectedPlants.includes(plant.id) ? '✓' : '+'}
                    </div>
                  </div>
                ))}
              </Grid>
              
              <div className="action-buttons mt-l">
                <Button 
                  variant="primary" 
                  disabled={selectedPlants.length === 0}
                  onClick={handleNextStep}
                >
                  Weiter zu Beetmaßen
                </Button>
              </div>
            </Card>
          </div>
        )}
        
        {step === 'dimensions' && (
          <div className="bed-dimensions-step">
            <Card>
              <h2>2. Beetmaße eingeben</h2>
              <p>Gib die Maße deines Beetes ein.</p>
              
              <div className="form-group mt-m">
                <label htmlFor="bed-length" className="form-label">Länge (Meter):</label>
                <input 
                  type="number" 
                  id="bed-length" 
                  className="form-input" 
                  value={bedLength}
                  min="0.1"
                  step="0.1"
                  onChange={handleLengthChange}
                />
              </div>
              
              <div className="form-group mt-m">
                <label htmlFor="bed-width" className="form-label">Breite (Meter):</label>
                <input 
                  type="number" 
                  id="bed-width" 
                  className="form-input" 
                  value={bedWidth}
                  min="0.1"
                  step="0.1"
                  onChange={handleWidthChange}
                />
              </div>
              
              <div className="bed-area mt-m">
                <strong>Beetfläche: {bedArea} m²</strong>
              </div>
              
              <div className="bed-preview mt-l">
                <div 
                  className="bed-rectangle" 
                  style={{ 
                    width: `${Math.min(100, bedLength * 40)}px`, 
                    height: `${Math.min(100, bedWidth * 40)}px` 
                  }}
                >
                  {bedLength}m × {bedWidth}m
                </div>
              </div>
              
              <div className="action-buttons mt-l">
                <Button 
                  variant="secondary" 
                  onClick={handleBackStep}
                >
                  Zurück zur Pflanzenauswahl
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleNextStep}
                  disabled={bedLength <= 0 || bedWidth <= 0}
                >
                  Optimale Bepflanzung ermitteln
                </Button>
              </div>
            </Card>
          </div>
        )}
        
        {step === 'result' && planResult && (
          <div className="bed-plan-result-step">
            <Card>
              <h2>3. Dein optimaler Bepflanzungsplan</h2>
              
              {isLoading ? (
                <div className="loading-indicator">
                  Erstelle Bepflanzungsplan...
                </div>
              ) : (
                <>
                  <div 
                    className="plan-content" 
                    dangerouslySetInnerHTML={{ __html: planResult }} 
                  />
                  
                  <div className="action-buttons mt-l">
                    <Button 
                      variant="secondary" 
                      onClick={handleBackStep}
                    >
                      Beetmaße anpassen
                    </Button>
                    <Button 
                      variant="primary" 
                      onClick={() => {
                        setSelectedPlants([]);
                        setBedLength(2.5);
                        setBedWidth(1.2);
                        setBedArea(3.0);
                        setPlanResult(null);
                        setStep('select');
                      }}
                    >
                      Neuen Plan erstellen
                    </Button>
                  </div>
                </>
              )}
            </Card>
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default BedPlanning;
