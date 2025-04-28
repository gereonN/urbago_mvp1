import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './SearchBar.module.css';
import { fetchPlantDatabase, PlantData } from '../utils/plantDatabase'; // Corrected import

// --- Safety Filter --- 
const forbiddenKeywords = [
  'illegal', 'verboten', 'gefährlich', 'schädlich', 'hate', 'hass', 'gewalt', 
  // Add more keywords as needed for safety/appropriateness
  'politik', 'religion', // Example off-topic keywords
];

const isQuestionSafe = (question: string): boolean => {
  const lowerCaseQuestion = question.toLowerCase();
  for (const keyword of forbiddenKeywords) {
    if (lowerCaseQuestion.includes(keyword)) {
      console.warn(`Unsafe question detected due to keyword: ${keyword}`);
      return false; // Found a forbidden keyword
    }
  }
  // Basic length check (optional)
  if (question.length < 5 || question.length > 500) {
      console.warn(`Question length out of bounds: ${question.length}`);
      // Decide if length constitutes 'unsafe' or just invalid
      // return false; 
  }
  return true; // No forbidden keywords found
};
// --- End Safety Filter ---

const predefinedQuestions = [
  "Mit wem passe ich gut ins Beet?",
  "Wer sind schädliche Nachbarn im Beet?",
  "Was für Samen sollte ich kaufen?",
  // Add more predefined questions based on mockup/requirements
];

const SearchBar = () => {
  const [plants, setPlants] = useState<PlantData[]>([]); // Corrected type
  const [selectedPlant, setSelectedPlant] = useState<string>('');
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [safetyWarning, setSafetyWarning] = useState<string | null>(null); // State for safety warning

  useEffect(() => {
    const fetchPlants = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const plantData = await fetchPlantDatabase(); // Corrected function call
        setPlants(plantData);
      } catch (error) {
        console.error("Error loading plant database:", error);
        setError("Fehler beim Laden der Pflanzendatenbank.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlants();
  }, []);

  const handlePlantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlant(event.target.value);
    setSelectedQuestion(''); 
    setCustomQuestion('');
    setSafetyWarning(null); // Clear warning on change
  };

  const handleQuestionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedQuestion(event.target.value);
    setCustomQuestion('');
    setSafetyWarning(null); // Clear warning on change
  };

  const handleCustomQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomQuestion(event.target.value);
    setSelectedQuestion(''); // Should be 'custom' if input is active
    setSafetyWarning(null); // Clear warning on typing
  };

  const handleSubmit = () => {
    setSafetyWarning(null); // Clear previous warnings
    const isCustom = selectedQuestion === 'custom';
    const query = isCustom ? customQuestion : selectedQuestion;
    const plantDetails = plants.find(p => p.id === selectedPlant);
    
    if (!selectedPlant || !query) {
      alert("Bitte wählen Sie eine Pflanze und eine Frage aus oder geben Sie eine eigene Frage ein.");
      return;
    }

    // --- Apply Safety Filter for Custom Questions ---
    if (isCustom && !isQuestionSafe(query)) {
      setSafetyWarning("Ihre Frage scheint unangemessene Inhalte zu enthalten oder ist zu lang/kurz. Bitte formulieren Sie sie um.");
      return; // Stop processing if unsafe
    }
    // --- End Safety Filter ---

    console.log("Submitting query:", { 
      plantId: selectedPlant,
      plantName: plantDetails?.name, // Use 'name' as per PlantData type
      question: query 
    });
    
    // TODO: Step 6 - Integrate ChatGPT API call here
    // Pass plantDetails and query to the API function
    alert("Platzhalter: Anfrage wird verarbeitet..."); // Placeholder for API call
  };

  return (
    <div className={styles.searchContainer}>
      <h2 className={styles.searchTitle}>Wie kann ich Dir in Deinem Garten helfen?</h2>
      
      {error && <p className={styles.errorMessage}>{error}</p>}
      {safetyWarning && <p className={styles.warningMessage}>{safetyWarning}</p>} {/* Display safety warning */}
      
      <div className={styles.searchControls}>
        {/* Plant Selection */} 
        <div className={styles.selectWrapper}>
          <span className={styles.selectIcon}>🌱</span>
          <select 
            className={styles.plantSelect}
            value={selectedPlant}
            onChange={handlePlantChange}
            disabled={isLoading}
          >
            <option value="" disabled>{isLoading ? 'Lade Pflanzen...' : 'Pflanze wählen...'}</option>
            {plants.map((plant) => (
              <option key={plant.id} value={plant.id}>{plant.name}</option>
            ))}
          </select>
        </div>

        {/* Question Selection */} 
        <div className={styles.selectWrapper}>
           <span className={styles.selectIcon}>❓</span>
          <select 
            className={styles.questionSelect}
            value={selectedQuestion}
            onChange={handleQuestionChange}
            disabled={!selectedPlant || isLoading}
          >
            <option value="" disabled>Frage wählen...</option>
            {predefinedQuestions.map((q, index) => (
              <option key={index} value={q}>{q}</option>
            ))}
            <option value="custom">Eigene Frage stellen...</option>
          </select>
        </div>

        {/* Custom Question Input */} 
        {selectedQuestion === 'custom' && (
          <input 
            type="text" 
            className={styles.searchInput}
            placeholder="Deine Frage..." 
            value={customQuestion}
            onChange={handleCustomQuestionChange}
            disabled={!selectedPlant || isLoading}
          />
        )}

        {/* Submit Button */} 
        <button 
          className={styles.submitButton} 
          onClick={handleSubmit}
          disabled={isLoading || !selectedPlant || (selectedQuestion !== 'custom' && !selectedQuestion) || (selectedQuestion === 'custom' && !customQuestion)}
        >
          Fragen
        </button>
      </div>

      {/* Functional Area */} 
      <div className={styles.functionalArea}>
        <div className={styles.actionsContainer}>
          {/* Database Link */} 
          <div className={styles.databaseSection}>
            <Link href="/plants" className={styles.actionLink}>
              <span className={styles.actionIcon}>📚</span>
              <span>Pflanzendatenbank</span>
            </Link>
          </div>
          {/* Bed Planning Link */} 
          <div className={styles.planningSection}>
            <Link href="/bed-planning" className={styles.actionLink}>
              <span className={styles.actionIcon}>🏡</span>
              <span>Beet planen</span>
            </Link>
          </div>
          {/* Photo Upload Placeholder */} 
          <div className={styles.photoUploadSection}>
            <button 
              className={styles.actionLink}
              onClick={() => alert("Foto-Upload-Funktion kommt bald!")}
              title="Foto-Upload (Kommt bald)"
            >
              <span className={styles.actionIcon}>📷</span>
              <span>Pflanze identifizieren</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

