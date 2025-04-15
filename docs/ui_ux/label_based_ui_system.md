# Label-basiertes UI-Navigationssystem für Urbago

## Übersicht
Dieses Dokument beschreibt das Label-basierte Navigationssystem für die Urbago-Anwendung, das es Benutzern ermöglicht, Pflanzen aus einer vordefinierten Liste auszuwählen und über ein Breadcrumb-Menü spezifische Informationen abzurufen. Dieses System strukturiert die Benutzerinteraktion und optimiert die Prompt-Injection für präzise Antworten.

## 1. Konzept des Label-basierten Systems

### 1.1 Grundprinzip

Das UI-Navigationssystem basiert auf drei Hauptebenen:
1. **Pflanzenauswahl**: Benutzer wählen eine Pflanze aus der vordefinierten Liste
2. **Informationskategorie**: Benutzer wählen eine Fragekategorie (z.B. "Mit wem gehe ich ins Beet?")
3. **Spezifische Anfrage**: Optional können Benutzer ihre Anfrage weiter spezifizieren

Dieses System bietet mehrere Vorteile:
- Geführte Benutzerinteraktion mit klarem Pfad
- Strukturierte Datenabfrage
- Optimierte Prompt-Injection für präzise Antworten
- Reduzierte Fehleranfälligkeit

### 1.2 Visuelle Darstellung

```
[Tomate] > [Mit wem gehe ich ins Beet?] > [Für kleine Flächen]
   ^              ^                           ^
   |              |                           |
Pflanzenauswahl  Informationskategorie    Spezifische Anfrage
```

## 2. Pflanzenauswahl (Erste Ebene)

### 2.1 Kategorisierte Pflanzenliste

Die 50 Pflanzen werden in übersichtliche Kategorien eingeteilt:

| Kategorie | Beispiel-Labels |
|-----------|-----------------|
| Fruchtgemüse | 🍅 Tomate, 🥒 Gurke, 🫑 Paprika, 🍆 Aubergine |
| Blattgemüse | 🥬 Salat, 🥗 Spinat, 🥦 Brokkoli, 🥬 Grünkohl |
| Wurzelgemüse | 🥕 Karotte, 🧅 Zwiebel, 🥔 Kartoffel, 🍠 Süßkartoffel |
| Kräuter | 🌿 Basilikum, 🌱 Petersilie, 🌿 Minze, 🌱 Schnittlauch |
| Hülsenfrüchte | 🌱 Bohne, 🌱 Erbse, 🌱 Linse |
| Obst | 🍓 Erdbeere, 🍎 Apfel (Zwerg), 🍒 Kirsche (Zwerg) |

### 2.2 UI-Implementierung

Die Pflanzenauswahl kann auf verschiedene Arten implementiert werden:

1. **Grid-Ansicht mit Bildern**:
   - Visuelle Darstellung aller Pflanzen in einem Raster
   - Filterung nach Kategorien möglich
   - Jede Pflanze mit Bild und Namen dargestellt

2. **Suchfeld mit Autovervollständigung**:
   - Benutzer können Pflanzennamen eingeben
   - Dropdown zeigt passende Pflanzen aus der Liste
   - Verhindert Freitexteingabe nicht-gelisteter Pflanzen

3. **Kategorisierte Listen**:
   - Aufklappbare Kategorien
   - Pflanzen alphabetisch innerhalb jeder Kategorie sortiert

### 2.3 Technische Umsetzung

```javascript
// Beispiel für die Datenstruktur der Pflanzenauswahl
const plantLabels = [
  {
    category: "Fruchtgemüse",
    icon: "🍅",
    plants: [
      { id: "tomato_01", name: "Tomate", icon: "🍅", image: "tomato.jpg" },
      { id: "cucumber_01", name: "Gurke", icon: "🥒", image: "cucumber.jpg" },
      { id: "pepper_01", name: "Paprika", icon: "🫑", image: "pepper.jpg" },
      { id: "eggplant_01", name: "Aubergine", icon: "🍆", image: "eggplant.jpg" }
    ]
  },
  {
    category: "Blattgemüse",
    icon: "🥬",
    plants: [
      { id: "lettuce_01", name: "Salat", icon: "🥬", image: "lettuce.jpg" },
      { id: "spinach_01", name: "Spinat", icon: "🥗", image: "spinach.jpg" },
      { id: "broccoli_01", name: "Brokkoli", icon: "🥦", image: "broccoli.jpg" }
    ]
  },
  // Weitere Kategorien...
];

// Funktion zur Filterung der Pflanzen
function filterPlants(searchTerm) {
  const results = [];
  
  plantLabels.forEach(category => {
    const matchingPlants = category.plants.filter(plant => 
      plant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (matchingPlants.length > 0) {
      results.push({
        category: category.category,
        plants: matchingPlants
      });
    }
  });
  
  return results;
}
```

## 3. Informationskategorien (Zweite Ebene)

### 3.1 Standardkategorien

Nach der Pflanzenauswahl werden dem Benutzer standardisierte Informationskategorien angeboten:

| Kategorie | Beschreibung | Beispiel-Prompt |
|-----------|--------------|-----------------|
| Mit wem gehe ich ins Beet? | Kompatibilität mit anderen Pflanzen | "Zeige mir gute und schlechte Nachbarn für Tomaten" |
| Wieviel Wasser brauche ich? | Wasserbedarf und Gießanleitung | "Erkläre den Wasserbedarf von Tomaten und gib Gießtipps" |
| Wann pflanze ich? | Aussaat- und Pflanzzeiten | "Wann ist die beste Zeit, um Tomaten zu säen und zu pflanzen?" |
| Wie pflege ich? | Pflegehinweise | "Wie pflege ich Tomatenpflanzen richtig?" |
| Was sind häufige Probleme? | Krankheiten und Schädlinge | "Welche häufigen Probleme können bei Tomaten auftreten?" |
| Wie ernte ich? | Erntehinweise | "Wann und wie ernte ich Tomaten richtig?" |

### 3.2 UI-Implementierung

Die Informationskategorien können als:
- Horizontale Tabs
- Vertikale Menüpunkte
- Karten mit Icons
- Dropdown-Menü

dargestellt werden.

### 3.3 Technische Umsetzung

```javascript
// Beispiel für die Datenstruktur der Informationskategorien
const infoCategories = [
  {
    id: "companions",
    label: "Mit wem gehe ich ins Beet?",
    icon: "🌱",
    promptTemplate: "Zeige mir gute und schlechte Nachbarn für {plant_name}",
    subCategories: [
      { id: "small_space", label: "Für kleine Flächen", promptSuffix: " in einem kleinen Garten oder auf dem Balkon" },
      { id: "pest_control", label: "Für Schädlingsbekämpfung", promptSuffix: " mit Fokus auf natürliche Schädlingsbekämpfung" }
    ]
  },
  {
    id: "watering",
    label: "Wieviel Wasser brauche ich?",
    icon: "💧",
    promptTemplate: "Erkläre den Wasserbedarf von {plant_name} und gib Gießtipps",
    subCategories: [
      { id: "drought", label: "Bei Trockenheit", promptSuffix: " während Trockenperioden" },
      { id: "container", label: "Im Topf/Container", promptSuffix: " wenn sie in Töpfen oder Containern angebaut werden" }
    ]
  },
  // Weitere Kategorien...
];

// Funktion zur Generierung des Prompts
function generatePrompt(plantId, categoryId, subCategoryId = null) {
  const plant = findPlantById(plantId);
  const category = infoCategories.find(cat => cat.id === categoryId);
  
  if (!plant || !category) return null;
  
  let prompt = category.promptTemplate.replace("{plant_name}", plant.name);
  
  if (subCategoryId) {
    const subCategory = category.subCategories.find(sub => sub.id === subCategoryId);
    if (subCategory) {
      prompt += subCategory.promptSuffix;
    }
  }
  
  return prompt;
}
```

## 4. Spezifische Anfragen (Dritte Ebene)

### 4.1 Unterkategorien

Jede Informationskategorie kann optionale Unterkategorien haben, die die Anfrage weiter spezifizieren:

**Beispiel für "Mit wem gehe ich ins Beet?"**:
- Für kleine Flächen
- Für Schädlingsbekämpfung
- Für besseren Ertrag
- Für Mischkultur im Hochbeet

**Beispiel für "Wieviel Wasser brauche ich?"**:
- Bei Trockenheit
- Im Topf/Container
- Im Hochbeet
- Bei verschiedenen Wachstumsphasen

### 4.2 UI-Implementierung

Die spezifischen Anfragen können als:
- Sekundäre Auswahlmöglichkeiten
- Aufklappbare Unterpunkte
- Chips/Tags zur Auswahl
- Radio-Buttons

dargestellt werden.

## 5. Breadcrumb-Navigation

### 5.1 Konzept

Die Breadcrumb-Navigation zeigt dem Benutzer seinen aktuellen Pfad und ermöglicht die Navigation zurück zu vorherigen Auswahlschritten:

```
Startseite > Tomate > Mit wem gehe ich ins Beet? > Für kleine Flächen
```

### 5.2 UI-Implementierung

- Horizontale Leiste am oberen Bildschirmrand
- Klickbare Elemente für jeden Schritt
- Visuelle Trennung (z.B. durch ">" oder "/")
- Farbliche Hervorhebung des aktuellen Schritts

### 5.3 Technische Umsetzung

```javascript
// Beispiel für die Breadcrumb-Datenstruktur
const breadcrumbPath = [
  { level: "home", label: "Startseite", id: null },
  { level: "plant", label: "Tomate", id: "tomato_01" },
  { level: "category", label: "Mit wem gehe ich ins Beet?", id: "companions" },
  { level: "subcategory", label: "Für kleine Flächen", id: "small_space" }
];

// Funktion zum Aktualisieren des Breadcrumb-Pfads
function updateBreadcrumb(level, label, id) {
  // Finde Index des Levels
  const levelIndex = breadcrumbPath.findIndex(item => item.level === level);
  
  if (levelIndex >= 0) {
    // Wenn Level existiert, aktualisiere es und entferne alle nachfolgenden Levels
    breadcrumbPath[levelIndex] = { level, label, id };
    breadcrumbPath.splice(levelIndex + 1);
  } else {
    // Wenn Level nicht existiert, füge es hinzu
    breadcrumbPath.push({ level, label, id });
  }
  
  // Aktualisiere UI
  renderBreadcrumb();
}

// Funktion zum Navigieren durch Klick auf Breadcrumb
function navigateToBreadcrumb(levelIndex) {
  // Behalte alle Elemente bis zum geklickten Level
  breadcrumbPath.splice(levelIndex + 1);
  
  // Navigiere zur entsprechenden Ansicht basierend auf dem aktuellen Pfad
  const currentLevel = breadcrumbPath[breadcrumbPath.length - 1];
  navigateToView(currentLevel.level, currentLevel.id);
  
  // Aktualisiere UI
  renderBreadcrumb();
}
```

## 6. Direkte Chat-Funktion

### 6.1 Konzept

Neben der strukturierten Navigation bietet die Anwendung auch eine direkte Chat-Funktion für freie Fragen:

- Deutlich von der strukturierten Navigation getrennt
- Mit Hinweis, dass hier freie Fragen gestellt werden können
- Verwendet eine allgemeinere Prompt-Injection

### 6.2 UI-Implementierung

- Separater Bereich oder Tab
- Texteingabefeld mit Send-Button
- Optionale Vorschläge für mögliche Fragen
- Klare Kennzeichnung als "Freie Frage stellen"

### 6.3 Technische Umsetzung

```javascript
// Beispiel für die Prompt-Injection bei freien Fragen
function generateFreeChatPrompt(userQuestion) {
  return `
Du bist Urbago, ein freundlicher und hilfreicher Gartenassistent für urbane Gärtner. 
Der Benutzer hat folgende Frage gestellt: "${userQuestion}"

Beantworte diese Frage basierend auf deinem Wissen über Gartenbau, mit besonderem Fokus auf urbane Gärten, Balkone und kleine Flächen.

Deine Antwort sollte:
1. Präzise und auf den Punkt sein
2. Anfängerfreundlich erklärt werden
3. Praktische Tipps für urbane Gärtner enthalten
4. Wenn möglich, auf spezifische Pflanzen aus unserer Datenbank verweisen

Wenn die Frage nicht gartenbezogen ist, leite höflich zurück zu Gartenthemen.
Strukturiere deine Antwort klar mit Überschriften und kurzen Absätzen.
Verwende Emojis für bessere Übersichtlichkeit.
  `;
}
```

## 7. Prompt-Injection-Logik

### 7.1 Strukturierte Anfragen

Für strukturierte Anfragen über das Label-System wird ein präziser, kontextspezifischer Prompt generiert:

```javascript
function generateStructuredPrompt(plantId, categoryId, subCategoryId = null) {
  // Hole Pflanzendaten aus der Datenbank
  const plantData = getPlantDataById(plantId);
  
  // Finde die passende Kategorie und Unterkategorie
  const category = infoCategories.find(cat => cat.id === categoryId);
  const subCategory = subCategoryId ? 
    category.subCategories.find(sub => sub.id === subCategoryId) : null;
  
  // Basis-Prompt
  let prompt = `
Du bist Urbago, ein freundlicher und hilfreicher Gartenassistent für urbane Gärtner.
Der Benutzer möchte Informationen zu ${plantData.name.de} (${plantData.name.botanical}) 
mit Fokus auf "${category.label}"`;
  
  // Füge Unterkategorie hinzu, falls vorhanden
  if (subCategory) {
    prompt += ` und spezifisch "${subCategory.label}"`;
  }
  
  prompt += `.

Hier sind die relevanten Daten zu dieser Pflanze:
${JSON.stringify(plantData, null, 2)}

Beantworte die Anfrage basierend auf diesen Daten. Deine Antwort sollte:
1. Spezifisch auf die Frage nach "${category.label}" eingehen
2. Anfängerfreundlich erklärt werden
3. Praktische Tipps für urbane Gärtner enthalten
4. Klar strukturiert sein mit Überschriften und kurzen Absätzen
5. Emojis für bessere Übersichtlichkeit verwenden

Halte dich an die Daten aus der Datenbank und ergänze nur, wo nötig.`;

  return prompt;
}
```

### 7.2 Freie Anfragen

Für freie Anfragen über die Chat-Funktion wird ein allgemeinerer Prompt verwendet, der dennoch auf Gartenfragen fokussiert:

```javascript
function generateFreeChatPrompt(userQuestion) {
  return `
Du bist Urbago, ein freundlicher und hilfreicher Gartenassistent für urbane Gärtner.
Der Benutzer hat folgende Frage gestellt: "${userQuestion}"

Beantworte diese Frage basierend auf deinem Wissen über Gartenbau, mit besonderem Fokus auf urbane Gärten, Balkone und kleine Flächen.

Wenn du in der Frage spezifische Pflanzen erkennst, die in unserer Datenbank sein könnten, beziehe dich auf diese.
Bekannte Pflanzen in unserer Datenbank sind: Tomate, Gurke, Salat, Karotte, Basilikum, etc.

Deine Antwort sollte:
1. Präzise und auf den Punkt sein
2. Anfängerfreundlich erklärt werden
3. Praktische Tipps für urbane Gärtner enthalten
4. Klar strukturiert sein mit Überschriften und kurzen Absätzen
5. Emojis für bessere Übersichtlichkeit verwenden

Wenn die Frage nicht gartenbezogen ist, leite höflich zurück zu Gartenthemen.`;

  return prompt;
}
```

## 8. Antwortformatierung

### 8.1 Standardisiertes Antwortformat

Um konsistente Antworten zu gewährleisten, wird ein standardisiertes Antwortformat definiert:

```javascript
function formatResponse(response) {
  // Extrahiere strukturierte Daten aus der GPT-Antwort
  const structuredResponse = {
    title: extractTitle(response),
    sections: extractSections(response),
    tips: extractTips(response),
    relatedPlants: extractRelatedPlants(response)
  };
  
  // Formatiere für die UI
  return {
    html: generateHtmlResponse(structuredResponse),
    plainText: generatePlainTextResponse(structuredResponse),
    structuredData: structuredResponse
  };
}
```

### 8.2 UI-Darstellung

Die Antworten werden in der UI klar strukturiert dargestellt:
- Überschrift mit Emoji und Pflanzenname
- Abschnitte mit Zwischenüberschriften
- Hervorgehobene Tipps
- Verweise auf verwandte Pflanzen als klickbare Links

## 9. Implementierungsbeispiel

### 9.1 Frontend-Komponenten (React)

```jsx
// Pflanzenauswahl-Komponente
function PlantSelector({ onSelectPlant }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlants, setFilteredPlants] = useState(plantLabels);
  
  useEffect(() => {
    if (searchTerm) {
      setFilteredPlants(filterPlants(searchTerm));
    } else {
      setFilteredPlants(plantLabels);
    }
  }, [searchTerm]);
  
  return (
    <div className="plant-selector">
      <h2>Wähle eine Pflanze</h2>
      
      <input
        type="text"
        placeholder="Pflanze suchen..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div className="plant-categories">
        {filteredPlants.map(category => (
          <div key={category.category} className="plant-category">
            <h3>{category.icon} {category.category}</h3>
            <div className="plant-grid">
              {category.plants.map(plant => (
                <div
                  key={plant.id}
                  className="plant-card"
                  onClick={() => onSelectPlant(plant)}
                >
                  <img src={plant.image} alt={plant.name} />
                  <span>{plant.icon} {plant.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Informationskategorie-Komponente
function CategorySelector({ selectedPlant, onSelectCategory }) {
  return (
    <div className="category-selector">
      <h2>Was möchtest du über {selectedPlant.name} wissen?</h2>
      
      <div className="category-grid">
        {infoCategories.map(category => (
          <div
            key={category.id}
            className="category-card"
            onClick={() => onSelectCategory(category)}
          >
            <div className="category-icon">{category.icon}</div>
            <h3>{category.label}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

// Breadcrumb-Komponente
function Breadcrumb({ path, onNavigate }) {
  return (
    <div className="breadcrumb">
      {path.map((item, index) => (
        <React.Fragment key={item.level}>
          {index > 0 && <span className="separator">&gt;</span>}
          <span
            className={`breadcrumb-item ${index === path.length - 1 ? 'active' : ''}`}
            onClick={() => onNavigate(index)}
          >
            {item.label}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}
```

### 9.2 Backend-Integration

```javascript
// API-Endpunkt für strukturierte Anfragen
app.post('/api/query', async (req, res) => {
  try {
    const { plantId, categoryId, subCategoryId } = req.body;
    
    // Validiere Eingaben
    if (!plantId || !categoryId) {
      return res.status(400).json({ error: 'Pflanze und Kategorie sind erforderlich' });
    }
    
    // Generiere strukturierten Prompt
    const prompt = generateStructuredPrompt(plantId, categoryId, subCategoryId);
    
    // Rufe ChatGPT API auf
    const gptResponse = await callChatGPT(prompt);
    
    // Formatiere die Antwort
    const formattedResponse = formatResponse(gptResponse);
    
    // Sende Antwort zurück
    res.json({ response: formattedResponse });
  } catch (error) {
    console.error('Fehler bei der Anfrage:', error);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
});

// API-Endpunkt für freie Chat-Anfragen
app.post('/api/chat', async (req, res) => {
  try {
    const { question } = req.body;
    
    // Validiere Eingabe
    if (!question) {
      return res.status(400).json({ error: 'Frage ist erforderlich' });
    }
    
    // Generiere Chat-Prompt
    const prompt = generateFreeChatPrompt(question);
    
    // Rufe ChatGPT API auf
    const gptResponse = await callChatGPT(prompt);
    
    // Formatiere die Antwort
    const formattedResponse = formatResponse(gptResponse);
    
    // Sende Antwort zurück
    res.json({ response: formattedResponse });
  } catch (error) {
    console.error('Fehler bei der Chat-Anfrage:', error);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
});
```

## 10. Vorteile des Label-basierten Systems

1. **Benutzerfreundlichkeit**:
   - Geführte Navigation reduziert Verwirrung
   - Klare Struktur macht die App intuitiv bedienbar
   - Breadcrumb-Navigation ermöglicht einfache Rücknavigation

2. **Optimierte Antworten**:
   - Präzise Prompt-Injection durch strukturierte Anfragen
   - Konsistente Antwortformate
   - Relevante Informationen ohne Umschweife

3. **Sicherheit**:
   - Reduzierte Anfälligkeit für Prompt-Injection-Angriffe
   - Kontrollierte Eingaben durch vordefinierte Auswahlen
   - Separate Behandlung von freien Fragen

4. **Erweiterbarkeit**:
   - Einfaches Hinzufügen neuer Pflanzen zur Datenbank
   - Flexible Erweiterung der Informationskategorien
   - Modulare Struktur für zukünftige Funktionen

## 11. Nächste Schritte

1. **Datenbank-Vervollständigung**:
   - Fertigstellung der 50 Pflanzeneinträge in Excel
   - Sicherstellung der Vollständigkeit aller erforderlichen Attribute

2. **UI-Design**:
   - Erstellung von Mockups für das Label-basierte System
   - Entwicklung eines konsistenten Farbschemas und Icons

3. **Prompt-Template-Entwicklung**:
   - Finalisierung aller Prompt-Templates für die verschiedenen Kategorien
   - Optimierung für präzise und nützliche Antworten

4. **Implementierung**:
   - Entwicklung der Frontend-Komponenten
   - Integration mit der ChatGPT API
   - Entwicklung der Backend-Logik für die Prompt-Injection
