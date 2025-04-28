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
    setPlanResult(null); // Clear previous results
    setStep("result"); // Move to result step to show loading

    try {
      // 1. Get full data for selected plants
      const selectedPlantsData = plants.filter(plant => selectedPlants.includes(plant.id));

      // 2. Basic Compatibility Check (Example)
      let compatibilityIssues: string[] = [];
      for (let i = 0; i < selectedPlantsData.length; i++) {
        for (let j = i + 1; j < selectedPlantsData.length; j++) {
          const plantA = selectedPlantsData[i];
          const plantB = selectedPlantsData[j];
          // Check if B is a bad neighbor for A
          if (plantA.badNeighbors?.some(neighbor => neighbor.id === plantB.id)) {
            compatibilityIssues.push(`${plantA.name} und ${plantB.name} sind keine guten Nachbarn.`);
          }
          // Check if A is a bad neighbor for B
          if (plantB.badNeighbors?.some(neighbor => neighbor.id === plantA.id)) {
            // Avoid duplicate messages
            if (!compatibilityIssues.includes(`${plantB.name} und ${plantA.name} sind keine guten Nachbarn.`)) {
                 compatibilityIssues.push(`${plantB.name} und ${plantA.name} sind keine guten Nachbarn.`);
            }
          }
        }
      }

      // 3. Basic Space Check (Example)
      // Use plant.spacing which seems to be diameter or side length
      const totalSpaceNeeded = selectedPlantsData.reduce((sum, plant) => {
        // Simple square area per plant based on spacing
        const plantArea = plant.spacing * plant.spacing; 
        return sum + plantArea;
      }, 0);
      const spaceAvailable = bedArea;
      const spaceSufficient = totalSpaceNeeded <= spaceAvailable;

      // 4. Prepare data for API (or generate simple local plan for now)
      const planInput = {
        bedDimensions: { length: bedLength, width: bedWidth, area: bedArea },
        plants: selectedPlantsData.map(p => ({ 
          id: p.id, 
          name: p.name, 
          spacing: p.spacing, 
          goodNeighbors: p.goodNeighbors?.map(n => n.name), // Pass names for easier processing in mock/API
          badNeighbors: p.badNeighbors?.map(n => n.name)   // Pass names
        })),
        compatibilityIssues: compatibilityIssues,
        spaceSufficient: spaceSufficient,
        totalSpaceNeeded: parseFloat(totalSpaceNeeded.toFixed(2)) // Add total space needed
      };

      // TODO: Step 6 - Integrate ChatGPT API call here
      // Replace the mock generation below with an API call
      // const apiResponse = await callChatGptBedPlanApi(planInput);
      // setPlanResult(apiResponse);

      // --- Mock Plan Generation (Replace with API call in Step 6) ---
      console.log("Generating mock plan with input:", planInput);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      const mockResponse = generateMockBedPlanResponse(planInput);
      setPlanResult(mockResponse);
      // --- End Mock Plan Generation ---

    } catch (error) {
      console.error("Error generating bed plan:", error);
      setPlanResult("<p style=\"color: red;\">Fehler beim Erstellen des Bepflanzungsplans.</p>");
    } finally {
      setIsLoading(false);
    }
  };

  // Updated Mock function to accept planInput
  const generateMockBedPlanResponse = (planInput: any) => {
    const { bedDimensions, plants, compatibilityIssues, spaceSufficient, totalSpaceNeeded } = planInput;
    
    let responseHTML = `
      <div class="bed-plan">
        <h2>📋 Übersicht des Bepflanzungsplans</h2>
        <p>Dein Plan für ein Beet mit ${bedDimensions.length}m × ${bedDimensions.width}m (${bedDimensions.area}m²), basierend auf ${plants.length} ausgewählten Pflanzenarten.</p>
    `;

    // Add Compatibility Info
    if (compatibilityIssues.length > 0) {
      responseHTML += `
        <h3>⚠️ Kompatibilitätshinweise</h3>
        <ul>
          ${compatibilityIssues.map((issue: string) => `<li>${issue}</li>`).join("")}
        </ul>
      `;
    } else {
      responseHTML += `
        <h3>✅ Kompatibilität</h3>
        <p>Die ausgewählten Pflanzen scheinen gut miteinander auszukommen!</p>
      `;
    }

    // Add Space Info
    responseHTML += `
      <h3>📐 Platzbedarf</h3>
      <p>Geschätzter Gesamtplatzbedarf: ${totalSpaceNeeded} m².</p>
      <p>${spaceSufficient ? "Der verfügbare Platz von " + bedDimensions.area + " m² scheint für die ausgewählten Pflanzen auszureichen." : "Achtung: Der verfügbare Platz von " + bedDimensions.area + " m² könnte für die ausgewählten Pflanzen etwas eng werden. Berücksichtige die empfohlenen Pflanzabstände."}</p>
    `;

    // Add Simple Plant List (Placeholder for detailed layout)
    responseHTML += `
      <h3>🌱 Ausgewählte Pflanzen</h3>
      <ul>
        ${plants.map((plant: any) => `<li>${plant.name} (Empf. Abstand: ${plant.spacing}m)</li>`).join("")}
      </ul>
    `;

    // Add Placeholder for detailed plan (to be generated by API)
    responseHTML += `
      <h3>🗺️ Detaillierter Plan (Beispiel)</h3>
      <p>Ein detaillierter visueller Plan und spezifische Anordnungsempfehlungen werden im nächsten Schritt durch unsere KI generiert.</p>
      <pre class="bed-visual">
[ Visueller Plan wird hier von der KI generiert ]
      </pre>
    `;

    responseHTML += `
      </div>
    `;
    return responseHTML;
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
