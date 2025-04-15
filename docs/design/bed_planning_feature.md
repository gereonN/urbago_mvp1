# Beet-Planungs-Feature für Urbago

Dieses Dokument beschreibt das UI-Design für das Beet-Planungs-Feature der Urbago-Anwendung, basierend auf den Anforderungen aus dem Projektpaket.

## 1. Übersicht und Konzept

Das Beet-Planungs-Feature ermöglicht es Benutzern, basierend auf ihrer Pflanzenauswahl und den Beetmaßen einen optimierten Bepflanzungsvorschlag zu erhalten. Es ist kein separates Modul, sondern in das Chat-Interface integriert und erscheint nach Klick auf den "Beet planen"-Button unterhalb der Eingabeleiste.

## 2. "Beet planen"-Button im Chat-Interface

### Desktop-Design

![Beet-Planungs-Button Desktop Wireframe]

- **Position**: Unterhalb der Chat-Eingabeleiste
- **Stil**: Deutlich erkennbar, aber nicht dominierend
- **Elemente**:
  - Icon (z.B. 🌻 oder 🪴)
  - Text "Beet planen"
  - Hover-Effekt: Leichte Farbänderung

```html
<div class="chat-interface">
  <!-- Bestehende Chat-Elemente -->
  
  <form class="chat-form">
    <!-- Eingabefeld und Senden-Button -->
  </form>
  
  <div class="feature-buttons">
    <button class="feature-button bed-planning-button" id="bed-planning-trigger">
      <span class="feature-icon">🌻</span>
      <span class="feature-text">Beet planen</span>
    </button>
  </div>
</div>
```

```css
.feature-buttons {
  display: flex;
  gap: var(--space-s);
  margin-top: var(--space-m);
}

.feature-button {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  background-color: white;
  border: 1px solid var(--color-primary-light);
  border-radius: var(--radius-small);
  padding: var(--space-s) var(--space-m);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.feature-button:hover {
  background-color: rgba(140, 198, 63, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.bed-planning-button {
  color: var(--color-primary-dark);
}

.feature-icon {
  font-size: 1.25rem;
}
```

### Mobile-Design

- **Position**: Wie Desktop, aber mit angepasster Größe
- **Stil**: Größere Touch-Fläche für mobile Nutzung
- **Elemente**: Wie Desktop

```css
/* Mobile-spezifische Anpassungen */
@media (max-width: 767px) {
  .feature-button {
    padding: var(--space-s);
    min-height: 44px;
    flex: 1; /* Volle Breite auf mobilen Geräten */
    justify-content: center;
  }
}
```

## 3. Pflanzenauswahl-Interface für Beet-Planung

Nach Klick auf den "Beet planen"-Button öffnet sich das Pflanzenauswahl-Interface:

### Desktop-Design

![Pflanzenauswahl-Interface Desktop Wireframe]

- **Position**: Expandiert unterhalb des "Beet planen"-Buttons
- **Stil**: Konsistent mit dem restlichen UI-Design
- **Elemente**:
  - Überschrift "Wähle Pflanzen für dein Beet"
  - Mehrfachauswahl von Pflanzen (Checkboxen)
  - Kategorisierte Pflanzenauswahl
  - Suchfeld für schnelles Finden
  - Ausgewählte Pflanzen werden hervorgehoben
  - "Weiter"-Button

```html
<div class="bed-planning-interface" id="plant-selection-step">
  <div class="step-header">
    <h3 class="step-title">Wähle Pflanzen für dein Beet</h3>
    <p class="step-description">Wähle mindestens 2 Pflanzen aus, die du in deinem Beet anbauen möchtest.</p>
  </div>
  
  <div class="plant-search">
    <input type="text" class="search-input" placeholder="Pflanze suchen...">
    <button class="search-button">
      <span class="search-icon">🔍</span>
    </button>
  </div>
  
  <div class="plant-categories">
    <div class="category-tabs">
      <button class="category-tab active">Alle</button>
      <button class="category-tab">🍅 Fruchtgemüse</button>
      <button class="category-tab">🥬 Blattgemüse</button>
      <button class="category-tab">🥕 Wurzelgemüse</button>
      <button class="category-tab">🌿 Kräuter</button>
      <button class="category-tab">🌱 Hülsenfrüchte</button>
      <button class="category-tab">🍓 Obst</button>
    </div>
  </div>
  
  <div class="plants-grid">
    <!-- Beispiel für eine Pflanzenkarte mit Checkbox -->
    <label class="plant-card selectable">
      <input type="checkbox" class="plant-checkbox" value="tomato_01">
      <div class="plant-image-container">
        <img src="images/tomato.jpg" alt="Tomate" class="plant-image">
      </div>
      <div class="plant-info">
        <span class="plant-emoji">🍅</span>
        <span class="plant-name">Tomate</span>
      </div>
    </label>
    <!-- Weitere Pflanzenkarten -->
  </div>
  
  <div class="selected-plants">
    <h4 class="selected-title">Ausgewählte Pflanzen: <span class="selected-count">0</span></h4>
    <div class="selected-plants-list">
      <!-- Wird dynamisch gefüllt -->
    </div>
  </div>
  
  <div class="step-navigation">
    <button class="step-button secondary" id="cancel-button">Abbrechen</button>
    <button class="step-button primary" id="next-button" disabled>Weiter</button>
  </div>
</div>
```

```css
.bed-planning-interface {
  margin-top: var(--space-m);
  padding: var(--space-l);
  background-color: white;
  border: 1px solid rgba(140, 198, 63, 0.3);
  border-radius: var(--radius-standard);
  box-shadow: var(--shadow-level-2);
}

.step-header {
  margin-bottom: var(--space-m);
}

.step-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-primary-dark);
  margin-bottom: var(--space-xs);
}

.step-description {
  font-size: 1rem;
  color: var(--color-text);
  opacity: 0.8;
}

.plant-search {
  display: flex;
  gap: var(--space-s);
  margin-bottom: var(--space-m);
}

.search-input {
  flex: 1;
  padding: var(--space-s);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: var(--radius-small);
  font-size: 1rem;
}

.search-button {
  background-color: var(--color-primary-light);
  color: white;
  border: none;
  border-radius: var(--radius-small);
  padding: var(--space-s);
  cursor: pointer;
}

.category-tabs {
  display: flex;
  gap: var(--space-s);
  margin-bottom: var(--space-m);
  overflow-x: auto;
  padding-bottom: var(--space-xs);
}

.category-tab {
  padding: var(--space-s) var(--space-m);
  border: 1px solid rgba(140, 198, 63, 0.3);
  border-radius: var(--radius-small);
  background-color: white;
  cursor: pointer;
  white-space: nowrap;
}

.category-tab.active {
  background-color: var(--color-primary-light);
  color: white;
}

.plants-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-m);
  margin-bottom: var(--space-l);
}

.plant-card.selectable {
  position: relative;
  cursor: pointer;
  padding: var(--space-s);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--radius-standard);
  transition: all var(--transition-fast);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.plant-card.selectable:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-level-1);
}

.plant-checkbox {
  position: absolute;
  top: var(--space-s);
  right: var(--space-s);
  width: 20px;
  height: 20px;
}

.plant-card.selectable.selected {
  border-color: var(--color-primary-light);
  background-color: rgba(140, 198, 63, 0.1);
}

.plant-image-container {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: var(--radius-small);
  margin-bottom: var(--space-s);
}

.plant-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.plant-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.plant-emoji {
  font-size: 1.5rem;
  margin-bottom: var(--space-xs);
}

.plant-name {
  font-weight: 500;
}

.selected-plants {
  margin-bottom: var(--space-m);
}

.selected-title {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: var(--space-s);
}

.selected-plants-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-s);
}

.selected-plant-chip {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  background-color: var(--color-primary-light);
  color: white;
  padding: var(--space-xs) var(--space-s);
  border-radius: var(--radius-small);
  font-size: 0.875rem;
}

.remove-plant {
  cursor: pointer;
  font-size: 0.75rem;
}

.step-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-l);
}

.step-button {
  padding: var(--space-s) var(--space-l);
  border-radius: var(--radius-small);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.step-button.primary {
  background-color: var(--color-primary-light);
  color: white;
  border: none;
}

.step-button.primary:hover {
  background-color: var(--color-primary-dark);
}

.step-button.primary:disabled {
  background-color: rgba(0, 0, 0, 0.1);
  cursor: not-allowed;
}

.step-button.secondary {
  background-color: white;
  color: var(--color-text);
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.step-button.secondary:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
```

### Mobile-Design

- **Position**: Vollbildansicht für bessere Nutzbarkeit
- **Stil**: Vereinfachte Darstellung mit weniger Pflanzen pro Reihe
- **Elemente**: Wie Desktop, aber mit angepasstem Layout

```css
/* Mobile-spezifische Anpassungen */
@media (max-width: 767px) {
  .bed-planning-interface {
    padding: var(--space-s);
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    border: none;
  }
  
  .plants-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-s);
  }
  
  .step-navigation {
    position: sticky;
    bottom: 0;
    background-color: white;
    padding: var(--space-s);
    margin: 0 calc(-1 * var(--space-s));
    margin-top: var(--space-m);
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  }
}
```

## 4. Eingabeformular für Beetmaße

Nach der Pflanzenauswahl folgt das Eingabeformular für die Beetmaße:

### Desktop-Design

![Beetmaße-Formular Desktop Wireframe]

- **Position**: Ersetzt das Pflanzenauswahl-Interface
- **Stil**: Klares, einfaches Formular
- **Elemente**:
  - Überschrift "Gib die Maße deines Beetes ein"
  - Eingabefelder für Länge und Breite (in Metern)
  - Visuelle Darstellung des Beetes mit dynamischer Anpassung
  - "Zurück"- und "Bepflanzung berechnen"-Buttons

```html
<div class="bed-planning-interface" id="bed-size-step">
  <div class="step-header">
    <h3 class="step-title">Gib die Maße deines Beetes ein</h3>
    <p class="step-description">Trage die Länge und Breite deines Beetes in Metern ein.</p>
  </div>
  
  <div class="bed-size-form">
    <div class="form-row">
      <div class="form-group">
        <label for="bed-length" class="form-label">Länge (m)</label>
        <input type="number" id="bed-length" class="form-input" min="0.5" max="10" step="0.1" value="2.0">
      </div>
      
      <div class="form-group">
        <label for="bed-width" class="form-label">Breite (m)</label>
        <input type="number" id="bed-width" class="form-input" min="0.5" max="10" step="0.1" value="1.0">
      </div>
    </div>
    
    <div class="bed-visualization">
      <div class="bed-visual" id="bed-visual">
        <div class="bed-dimension bed-length">2.0 m</div>
        <div class="bed-dimension bed-width">1.0 m</div>
        <div class="bed-area">Fläche: 2.0 m²</div>
      </div>
    </div>
    
    <div class="selected-plants-summary">
      <h4 class="summary-title">Ausgewählte Pflanzen</h4>
      <ul class="plants-summary-list">
        <li class="plant-summary-item">
          <span class="plant-emoji">🍅</span>
          <span class="plant-name">Tomate</span>
        </li>
        <li class="plant-summary-item">
          <span class="plant-emoji">🌿</span>
          <span class="plant-name">Basilikum</span>
        </li>
        <!-- Weitere ausgewählte Pflanzen -->
      </ul>
    </div>
  </div>
  
  <div class="step-navigation">
    <button class="step-button secondary" id="back-button">Zurück</button>
    <button class="step-button primary" id="calculate-button">Bepflanzung berechnen</button>
  </div>
</div>
```

```css
.bed-size-form {
  margin-bottom: var(--space-l);
}

.form-row {
  display: flex;
  gap: var(--space-l);
  margin-bottom: var(--space-l);
}

.form-group {
  flex: 1;
}

.form-label {
  display: block;
  font-weight: 500;
  margin-bottom: var(--space-xs);
}

.form-input {
  width: 100%;
  padding: var(--space-s);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: var(--radius-small);
  font-size: 1rem;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary-dark);
}

.bed-visualization {
  display: flex;
  justify-content: center;
  margin: var(--space-l) 0;
}

.bed-visual {
  position: relative;
  background-color: rgba(140, 198, 63, 0.2);
  border: 2px solid var(--color-primary-light);
  border-radius: var(--radius-small);
  min-width: 200px;
  min-height: 100px;
  max-width: 400px;
  aspect-ratio: 2 / 1; /* Standardverhältnis, wird dynamisch angepasst */
  display: flex;
  align-items: center;
  justify-content: center;
}

.bed-dimension {
  position: absolute;
  background-color: white;
  padding: var(--space-xs);
  border-radius: var(--radius-small);
  font-size: 0.875rem;
  font-weight: 500;
}

.bed-length {
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
}

.bed-width {
  right: -12px;
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
}

.bed-area {
  font-weight: 500;
  color: var(--color-primary-dark);
}

.selected-plants-summary {
  margin-top: var(--space-l);
}

.summary-title {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: var(--space-s);
}

.plants-summary-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-s);
  list-style: none;
  padding: 0;
}

.plant-summary-item {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  background-color: rgba(140, 198, 63, 0.1);
  padding: var(--space-xs) var(--space-s);
  border-radius: var(--radius-small);
  font-size: 0.875rem;
}
```

### Mobile-Design

- **Position**: Wie Desktop, aber mit angepasstem Layout
- **Stil**: Vereinfachte Darstellung mit vertikaler Anordnung
- **Elemente**: Wie Desktop

```css
/* Mobile-spezifische Anpassungen */
@media (max-width: 767px) {
  .form-row {
    flex-direction: column;
    gap: var(--space-m);
  }
  
  .bed-visual {
    width: 100%;
    max-width: none;
  }
}
```

## 5. Ergebnisdarstellung für Beet-Planungsvorschläge

Nach Eingabe der Beetmaße und Klick auf "Bepflanzung berechnen" wird der optimierte Bepflanzungsvorschlag angezeigt:

### Desktop-Design

![Beet-Planungsvorschlag Desktop Wireframe]

- **Position**: Ersetzt das Beetmaße-Formular
- **Stil**: Übersichtliche Darstellung mit klarer Struktur
- **Elemente**:
  - Überschrift "Dein optimaler Bepflanzungsplan"
  - Tabs für verschiedene Abschnitte:
    - Übersicht des Bepflanzungsplans
    - Pflanzenverteilung
    - Visueller Beetplan
    - Pflege- und Bewässerungshinweise
    - Saisonale Empfehlungen
    - Praktische Tipps
  - "Neuen Plan erstellen"- und "Als PDF speichern"-Buttons

```html
<div class="bed-planning-interface" id="result-step">
  <div class="step-header">
    <h3 class="step-title">Dein optimaler Bepflanzungsplan</h3>
    <p class="step-description">Basierend auf deiner Auswahl und den Beetmaßen (2.0 m × 1.0 m).</p>
  </div>
  
  <div class="result-tabs">
    <button class="result-tab active" data-tab="overview">Übersicht</button>
    <button class="result-tab" data-tab="distribution">Pflanzenverteilung</button>
    <button class="result-tab" data-tab="visual-plan">Visueller Plan</button>
    <button class="result-tab" data-tab="care">Pflege & Bewässerung</button>
    <button class="result-tab" data-tab="seasonal">Saisonale Tipps</button>
    <button class="result-tab" data-tab="tips">Praktische Tipps</button>
  </div>
  
  <div class="result-content">
    <!-- Übersicht Tab -->
    <div class="result-tab-content active" id="overview-content">
      <div class="result-section">
        <h4 class="result-section-title">📋 Übersicht des Bepflanzungsplans</h4>
        <div class="result-section-content">
          <p>Dein Beet mit 2.0 m² Fläche bietet optimalen Platz für die ausgewählten Pflanzen. Der Plan berücksichtigt die Kompatibilität der Pflanzen, ihren Platzbedarf und ihre Wachstumsbedingungen.</p>
          
          <div class="result-summary">
            <div class="summary-item">
              <div class="summary-value">4</div>
              <div class="summary-label">Pflanzenarten</div>
            </div>
            <div class="summary-item">
              <div class="summary-value">12</div>
              <div class="summary-label">Pflanzen gesamt</div>
            </div>
            <div class="summary-item">
              <div class="summary-value">8/10</div>
              <div class="summary-label">Kompatibilitätswert</div>
            </div>
          </div>
          
          <p>Besondere Merkmale dieses Plans:</p>
          <ul class="feature-list">
            <li>Optimale Mischkultur mit gegenseitigem Nutzen</li>
            <li>Effiziente Raumnutzung durch verschiedene Wuchshöhen</li>
            <li>Natürliche Schädlingsabwehr durch Kräuter</li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- Weitere Tab-Inhalte würden hier folgen -->
  </div>
  
  <div class="step-navigation">
    <button class="step-button secondary" id="new-plan-button">Neuen Plan erstellen</button>
    <button class="step-button primary" id="save-pdf-button">Als PDF speichern</button>
  </div>
</div>
```

```css
.result-tabs {
  display: flex;
  gap: var(--space-xs);
  margin-bottom: var(--space-m);
  overflow-x: auto;
  padding-bottom: var(--space-xs);
}

.result-tab {
  padding: var(--space-s) var(--space-m);
  border: 1px solid rgba(140, 198, 63, 0.3);
  border-radius: var(--radius-small);
  background-color: white;
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--transition-fast);
}

.result-tab.active {
  background-color: var(--color-primary-light);
  color: white;
}

.result-tab:hover:not(.active) {
  background-color: rgba(140, 198, 63, 0.1);
}

.result-tab-content {
  display: none;
}

.result-tab-content.active {
  display: block;
}

.result-section {
  margin-bottom: var(--space-l);
}

.result-section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary-dark);
  margin-bottom: var(--space-s);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.result-section-content {
  line-height: 1.5;
}

.result-summary {
  display: flex;
  justify-content: space-around;
  margin: var(--space-m) 0;
  text-align: center;
}

.summary-item {
  padding: var(--space-m);
  background-color: rgba(140, 198, 63, 0.1);
  border-radius: var(--radius-standard);
  min-width: 100px;
}

.summary-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary-dark);
  margin-bottom: var(--space-xs);
}

.summary-label {
  font-size: 0.875rem;
}

.feature-list {
  padding-left: var(--space-l);
  margin-top: var(--space-s);
}

.feature-list li {
  margin-bottom: var(--space-xs);
}
```

### Mobile-Design

- **Position**: Wie Desktop, aber mit angepasstem Layout
- **Stil**: Vereinfachte Darstellung mit vertikaler Anordnung
- **Elemente**: Wie Desktop, aber mit horizontalem Scrollen für Tabs

```css
/* Mobile-spezifische Anpassungen */
@media (max-width: 767px) {
  .result-tabs {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: var(--space-xs);
  }
  
  .result-tab {
    flex-shrink: 0;
  }
  
  .result-summary {
    flex-direction: column;
    gap: var(--space-s);
  }
  
  .summary-item {
    width: 100%;
  }
}
```

## 6. Visueller Beetplan

Ein besonders wichtiger Teil der Ergebnisdarstellung ist der visuelle Beetplan:

### Desktop-Design

![Visueller Beetplan Desktop Wireframe]

- **Position**: Als Tab-Inhalt in der Ergebnisdarstellung
- **Stil**: Klare, schematische Darstellung des Beetes
- **Elemente**:
  - Schematische Darstellung des Beetes mit Pflanzenplatzierung
  - Legende zur Erklärung der Symbole
  - Nord-Süd-Ausrichtungsempfehlung
  - Zoom-Funktion für Details

```html
<div class="result-tab-content" id="visual-plan-content">
  <div class="result-section">
    <h4 class="result-section-title">🗺️ Visueller Beetplan</h4>
    <div class="result-section-content">
      <p>So könnte dein Beet optimal bepflanzt aussehen:</p>
      
      <div class="visual-plan-container">
        <div class="compass-indicator">
          <div class="north-indicator">N</div>
          <div class="south-indicator">S</div>
        </div>
        
        <div class="bed-plan">
          <pre class="ascii-plan">
┌─────────────────────────────────────────┐
│                  NORDEN                  │
├─────────────────────────────────────────┤
│ T     T     T     T     T     T     T   │
│                                         │
│ B  C  B  C  B  C  B  C  B  C  B  C  B   │
│                                         │
│ L     L     L     L     L     L     L   │
├─────────────────────────────────────────┤
│                  SÜDEN                   │
└─────────────────────────────────────────┘
          </pre>
        </div>
        
        <div class="plan-legend">
          <h5 class="legend-title">Legende:</h5>
          <ul class="legend-list">
            <li class="legend-item">
              <span class="legend-symbol">T</span>
              <span class="legend-emoji">🍅</span>
              <span class="legend-name">Tomate</span>
            </li>
            <li class="legend-item">
              <span class="legend-symbol">B</span>
              <span class="legend-emoji">🌿</span>
              <span class="legend-name">Basilikum</span>
            </li>
            <li class="legend-item">
              <span class="legend-symbol">C</span>
              <span class="legend-emoji">🥕</span>
              <span class="legend-name">Karotte</span>
            </li>
            <li class="legend-item">
              <span class="legend-symbol">L</span>
              <span class="legend-emoji">🥬</span>
              <span class="legend-name">Salat</span>
            </li>
          </ul>
        </div>
        
        <div class="orientation-tip">
          <p><strong>Tipp zur Ausrichtung:</strong> Platziere dein Beet idealerweise so, dass die längere Seite von Ost nach West verläuft. So erhalten alle Pflanzen optimales Sonnenlicht.</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

```css
.visual-plan-container {
  margin: var(--space-m) 0;
}

.compass-indicator {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-xs);
  font-weight: 600;
}

.bed-plan {
  background-color: rgba(140, 198, 63, 0.1);
  border: 1px solid var(--color-primary-light);
  border-radius: var(--radius-small);
  padding: var(--space-m);
  overflow-x: auto;
}

.ascii-plan {
  font-family: monospace;
  font-size: 1rem;
  line-height: 1.2;
  white-space: pre;
  text-align: center;
}

.plan-legend {
  margin-top: var(--space-m);
}

.legend-title {
  font-weight: 600;
  margin-bottom: var(--space-s);
}

.legend-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-m);
  list-style: none;
  padding: 0;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.legend-symbol {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: rgba(140, 198, 63, 0.2);
  border: 1px solid var(--color-primary-light);
  border-radius: var(--radius-small);
  font-weight: 600;
}

.orientation-tip {
  margin-top: var(--space-m);
  padding: var(--space-s);
  background-color: rgba(251, 176, 64, 0.1);
  border-left: 4px solid var(--color-secondary-light);
  border-radius: var(--radius-small);
}
```

### Mobile-Design

- **Position**: Wie Desktop, aber mit angepasstem Layout
- **Stil**: Horizontales Scrollen für den ASCII-Plan
- **Elemente**: Wie Desktop

```css
/* Mobile-spezifische Anpassungen */
@media (max-width: 767px) {
  .legend-list {
    flex-direction: column;
    gap: var(--space-s);
  }
}
```

## 7. Interaktives Verhalten

### Schrittweiser Prozess
- Klick auf "Beet planen"-Button öffnet Pflanzenauswahl
- Nach Pflanzenauswahl und Klick auf "Weiter" erscheint das Beetmaße-Formular
- Nach Eingabe der Maße und Klick auf "Bepflanzung berechnen" wird das Ergebnis angezeigt
- Jederzeit Möglichkeit, zurückzugehen oder abzubrechen

### Dynamische Anpassungen
- Beetvisualisierung passt sich dynamisch an eingegebene Maße an
- Tabs in der Ergebnisdarstellung wechseln den angezeigten Inhalt
- "Als PDF speichern"-Button generiert ein PDF mit allen Informationen

```javascript
// Beispiel für interaktives Verhalten
document.addEventListener('DOMContentLoaded', function() {
  // Beet planen Button
  const bedPlanningTrigger = document.getElementById('bed-planning-trigger');
  const plantSelectionStep = document.getElementById('plant-selection-step');
  const bedSizeStep = document.getElementById('bed-size-step');
  const resultStep = document.getElementById('result-step');
  
  // Pflanzenauswahl
  const plantCheckboxes = document.querySelectorAll('.plant-checkbox');
  const nextButton = document.getElementById('next-button');
  const selectedCount = document.querySelector('.selected-count');
  const selectedPlantsList = document.querySelector('.selected-plants-list');
  
  // Beetmaße
  const bedLengthInput = document.getElementById('bed-length');
  const bedWidthInput = document.getElementById('bed-width');
  const bedVisual = document.getElementById('bed-visual');
  const bedLengthDisplay = document.querySelector('.bed-length');
  const bedWidthDisplay = document.querySelector('.bed-width');
  const bedAreaDisplay = document.querySelector('.bed-area');
  const calculateButton = document.getElementById('calculate-button');
  const backButton = document.getElementById('back-button');
  
  // Ergebnisse
  const resultTabs = document.querySelectorAll('.result-tab');
  const newPlanButton = document.getElementById('new-plan-button');
  const savePdfButton = document.getElementById('save-pdf-button');
  
  // Beet planen Button Klick
  bedPlanningTrigger.addEventListener('click', function() {
    plantSelectionStep.style.display = 'block';
    bedPlanningTrigger.style.display = 'none';
  });
  
  // Pflanzenauswahl
  plantCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const selectedPlants = document.querySelectorAll('.plant-checkbox:checked');
      selectedCount.textContent = selectedPlants.length;
      
      // Aktualisiere ausgewählte Pflanzen Liste
      updateSelectedPlantsList(selectedPlants);
      
      // Aktiviere/Deaktiviere Weiter-Button
      nextButton.disabled = selectedPlants.length < 2;
      
      // Markiere ausgewählte Pflanzenkarten
      const card = this.closest('.plant-card');
      if (this.checked) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });
  });
  
  // Weiter-Button Klick
  nextButton.addEventListener('click', function() {
    plantSelectionStep.style.display = 'none';
    bedSizeStep.style.display = 'block';
  });
  
  // Beetmaße Änderung
  function updateBedVisualization() {
    const length = parseFloat(bedLengthInput.value);
    const width = parseFloat(bedWidthInput.value);
    const area = (length * width).toFixed(1);
    
    // Aktualisiere Anzeigen
    bedLengthDisplay.textContent = length.toFixed(1) + ' m';
    bedWidthDisplay.textContent = width.toFixed(1) + ' m';
    bedAreaDisplay.textContent = 'Fläche: ' + area + ' m²';
    
    // Aktualisiere Visualisierung
    bedVisual.style.width = (length * 50) + 'px';
    bedVisual.style.height = (width * 50) + 'px';
  }
  
  bedLengthInput.addEventListener('input', updateBedVisualization);
  bedWidthInput.addEventListener('input', updateBedVisualization);
  
  // Zurück-Button Klick
  backButton.addEventListener('click', function() {
    bedSizeStep.style.display = 'none';
    plantSelectionStep.style.display = 'block';
  });
  
  // Bepflanzung berechnen Button Klick
  calculateButton.addEventListener('click', function() {
    bedSizeStep.style.display = 'none';
    resultStep.style.display = 'block';
  });
  
  // Ergebnis-Tabs Klick
  resultTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Deaktiviere alle Tabs
      resultTabs.forEach(t => t.classList.remove('active'));
      
      // Aktiviere geklickten Tab
      this.classList.add('active');
      
      // Verstecke alle Tab-Inhalte
      document.querySelectorAll('.result-tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // Zeige entsprechenden Tab-Inhalt
      const tabId = this.dataset.tab;
      document.getElementById(tabId + '-content').classList.add('active');
    });
  });
  
  // Neuen Plan erstellen Button Klick
  newPlanButton.addEventListener('click', function() {
    resultStep.style.display = 'none';
    plantSelectionStep.style.display = 'block';
    
    // Zurücksetzen der Auswahl
    plantCheckboxes.forEach(checkbox => {
      checkbox.checked = false;
      checkbox.closest('.plant-card').classList.remove('selected');
    });
    selectedCount.textContent = '0';
    selectedPlantsList.innerHTML = '';
    nextButton.disabled = true;
  });
  
  // Hilfsfunktion: Aktualisiere ausgewählte Pflanzen Liste
  function updateSelectedPlantsList(selectedPlants) {
    selectedPlantsList.innerHTML = '';
    
    selectedPlants.forEach(plant => {
      const card = plant.closest('.plant-card');
      const emoji = card.querySelector('.plant-emoji').textContent;
      const name = card.querySelector('.plant-name').textContent;
      
      const chip = document.createElement('div');
      chip.className = 'selected-plant-chip';
      chip.innerHTML = `
        <span class="plant-emoji">${emoji}</span>
        <span class="plant-name">${name}</span>
        <span class="remove-plant" data-id="${plant.value}">✕</span>
      `;
      
      selectedPlantsList.appendChild(chip);
    });
    
    // Event-Listener für Entfernen-Buttons
    document.querySelectorAll('.remove-plant').forEach(button => {
      button.addEventListener('click', function() {
        const plantId = this.dataset.id;
        const checkbox = document.querySelector(`.plant-checkbox[value="${plantId}"]`);
        
        if (checkbox) {
          checkbox.checked = false;
          checkbox.dispatchEvent(new Event('change'));
        }
      });
    });
  }
  
  // Initial verstecken der Schritte
  plantSelectionStep.style.display = 'none';
  bedSizeStep.style.display = 'none';
  resultStep.style.display = 'none';
});
```

## 8. Barrierefreiheit

- **ARIA-Attribute**: Korrekte Verwendung von ARIA-Attributen für verbesserte Zugänglichkeit
- **Farbkontrast**: Ausreichender Kontrast zwischen Text und Hintergrund
- **Tastaturnavigation**: Vollständige Unterstützung der Tastaturnavigation
- **Screenreader**: Semantisch korrekte Struktur für Screenreader
- **Touch-Ziele**: Ausreichend große Touch-Flächen (min. 44x44px)

## 9. Zielgruppenspezifische Anpassungen

### Für Menschen mit Garten (Teilen/Gemeinschaftlich bewirtschaften)
- Detaillierte Informationen zur Pflanzenkompatibilität
- Tipps zur effizienten Flächennutzung
- Hinweise zur gemeinschaftlichen Bewirtschaftung

### Für junge Erwachsene ohne eigenen Garten
- Fokus auf platzsparende Lösungen
- Einfache, verständliche Erklärungen
- Moderne, ansprechende Gestaltung

## 10. Zusammenfassung

Das Beet-Planungs-Feature für Urbago bietet:
- Einfache Integration in das bestehende Chat-Interface
- Schrittweisen Prozess von der Pflanzenauswahl bis zum Bepflanzungsvorschlag
- Klare visuelle Darstellung des Beetplans
- Umfassende Informationen zu Pflege, Bewässerung und saisonalen Aspekten
- Responsive Gestaltung für alle Geräte
- Barrierefreie Implementierung

Diese Komponente ermöglicht es Benutzern, basierend auf ihrer Pflanzenauswahl und den Beetmaßen einen optimierten Bepflanzungsvorschlag zu erhalten, der die Pflanzenkompatibilität, den Platzbedarf und die Wachstumsbedingungen berücksichtigt.
