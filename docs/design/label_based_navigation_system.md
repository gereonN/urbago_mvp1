# Label-basiertes Navigationssystem für Urbago

Dieses Dokument beschreibt das UI-Design für das label-basierte Navigationssystem der Urbago-Anwendung, basierend auf den Anforderungen aus dem Projektpaket.

## 1. Übersicht und Konzept

Das Navigationssystem basiert auf drei Hauptebenen:
1. **Pflanzenauswahl** (erste Ebene)
2. **Informationskategorie** (zweite Ebene)
3. **Spezifische Anfrage** (dritte Ebene, optional)

Diese Struktur wird durch eine Breadcrumb-Navigation unterstützt, die dem Benutzer jederzeit seinen aktuellen Pfad anzeigt und die Navigation zu vorherigen Ebenen ermöglicht.

## 2. Pflanzenauswahl (Erste Ebene)

### Desktop-Design

![Pflanzenauswahl Desktop Wireframe]

- **Layout**: Grid-Ansicht mit 3-4 Pflanzen pro Reihe
- **Kategorien**: Horizontale Tabs am oberen Rand
- **Suchfeld**: Prominent platziert über dem Grid
- **Elemente pro Pflanze**:
  - Bild der Pflanze (quadratisch, 120x120px)
  - Emoji-Icon (z.B. 🍅)
  - Name der Pflanze
  - Hover-Effekt: Leichte Skalierung (1.05) und Schatten-Verstärkung

```html
<div class="plant-selection">
  <div class="search-container">
    <input type="text" placeholder="Pflanze suchen..." class="search-input">
    <button class="search-button">
      <span class="search-icon">🔍</span>
    </button>
  </div>
  
  <div class="categories-tabs">
    <button class="category-tab active">Alle</button>
    <button class="category-tab">🍅 Fruchtgemüse</button>
    <button class="category-tab">🥬 Blattgemüse</button>
    <button class="category-tab">🥕 Wurzelgemüse</button>
    <button class="category-tab">🌿 Kräuter</button>
    <button class="category-tab">🌱 Hülsenfrüchte</button>
    <button class="category-tab">🍓 Obst</button>
  </div>
  
  <div class="plants-grid">
    <!-- Beispiel für eine Pflanzenkarte -->
    <div class="plant-card">
      <div class="plant-image-container">
        <img src="images/tomato.jpg" alt="Tomate" class="plant-image">
      </div>
      <div class="plant-info">
        <span class="plant-emoji">🍅</span>
        <span class="plant-name">Tomate</span>
      </div>
    </div>
    <!-- Weitere Pflanzenkarten -->
  </div>
</div>
```

### Mobile-Design

- **Layout**: 2 Pflanzen pro Reihe
- **Kategorien**: Horizontales Scrollmenü
- **Suchfeld**: Sticky am oberen Rand
- **Elemente pro Pflanze**: Wie Desktop, aber kompakter

```css
/* Mobile-spezifische Anpassungen */
@media (max-width: 767px) {
  .plants-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-s);
  }
  
  .categories-tabs {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: var(--space-s);
  }
  
  .plant-image {
    width: 100%;
    height: auto;
  }
}
```

## 3. Informationskategorien (Zweite Ebene)

### Desktop-Design

![Informationskategorien Desktop Wireframe]

- **Layout**: Horizontale Karten-Ansicht
- **Ausgewählte Pflanze**: Prominente Anzeige am oberen Rand
- **Kategorien**: 6 Hauptkategorien als visuelle Karten
- **Elemente pro Kategorie**:
  - Icon (z.B. 🌱 für "Mit wem gehe ich ins Beet?")
  - Titel der Kategorie
  - Kurze Beschreibung (optional)
  - Hover-Effekt: Leichte Erhöhung und Farbänderung

```html
<div class="info-categories">
  <div class="selected-plant">
    <img src="images/tomato.jpg" alt="Tomate" class="selected-plant-image">
    <div class="selected-plant-info">
      <span class="selected-plant-emoji">🍅</span>
      <h2 class="selected-plant-name">Tomate</h2>
      <span class="selected-plant-botanical">Solanum lycopersicum</span>
    </div>
  </div>
  
  <h3 class="categories-heading">Was möchtest du über Tomaten wissen?</h3>
  
  <div class="categories-grid">
    <!-- Beispiel für eine Kategorie-Karte -->
    <div class="category-card">
      <div class="category-icon">🌱</div>
      <h4 class="category-title">Mit wem gehe ich ins Beet?</h4>
      <p class="category-description">Erfahre, welche Pflanzen gut neben Tomaten gedeihen.</p>
    </div>
    <!-- Weitere Kategorie-Karten -->
  </div>
</div>
```

### Mobile-Design

- **Layout**: Vertikale Liste
- **Ausgewählte Pflanze**: Kompakte Anzeige am oberen Rand
- **Kategorien**: Vollbreite Karten mit Touch-optimierter Größe

```css
/* Mobile-spezifische Anpassungen */
@media (max-width: 767px) {
  .categories-grid {
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
  }
  
  .category-card {
    width: 100%;
    min-height: 80px;
    padding: var(--space-m);
  }
  
  .selected-plant {
    flex-direction: row;
    align-items: center;
  }
  
  .selected-plant-image {
    width: 60px;
    height: 60px;
    margin-right: var(--space-m);
  }
}
```

## 4. Spezifische Anfragen (Dritte Ebene)

### Desktop-Design

![Spezifische Anfragen Desktop Wireframe]

- **Layout**: Horizontale Chips/Tags
- **Kontext**: Anzeige der ausgewählten Pflanze und Kategorie
- **Unterkategorien**: Als auswählbare Chips dargestellt
- **Elemente pro Unterkategorie**:
  - Text der Unterkategorie
  - Auswahlzustand (aktiv/inaktiv)
  - Hover-Effekt: Leichte Farbänderung

```html
<div class="specific-requests">
  <div class="context-display">
    <div class="selected-plant-mini">
      <span class="selected-plant-emoji-mini">🍅</span>
      <span class="selected-plant-name-mini">Tomate</span>
    </div>
    <span class="context-separator">></span>
    <div class="selected-category-mini">
      <span class="selected-category-icon-mini">🌱</span>
      <span class="selected-category-name-mini">Mit wem gehe ich ins Beet?</span>
    </div>
  </div>
  
  <div class="subcategories-container">
    <h4 class="subcategories-heading">Wähle eine spezifische Anfrage:</h4>
    
    <div class="subcategories-chips">
      <button class="subcategory-chip">Für kleine Flächen</button>
      <button class="subcategory-chip">Für Schädlingsbekämpfung</button>
      <button class="subcategory-chip">Für besseren Ertrag</button>
      <button class="subcategory-chip">Für Mischkultur im Hochbeet</button>
    </div>
  </div>
</div>
```

### Mobile-Design

- **Layout**: Vertikale Liste oder Grid mit 2 Chips pro Reihe
- **Kontext**: Kompakte Anzeige oder durch Breadcrumb ersetzt
- **Unterkategorien**: Größere Touch-Flächen

```css
/* Mobile-spezifische Anpassungen */
@media (max-width: 767px) {
  .subcategories-chips {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-s);
  }
  
  .subcategory-chip {
    width: 100%;
    height: 44px;
    padding: var(--space-s);
  }
  
  .context-display {
    font-size: 0.875rem;
  }
}
```

## 5. Breadcrumb-Navigation

### Desktop-Design

![Breadcrumb Desktop Wireframe]

- **Position**: Horizontal am oberen Rand unter dem Header
- **Stil**: Leicht hervorgehoben mit Hintergrundfarbe
- **Elemente**:
  - Startseite-Link
  - Trennzeichen (>)
  - Pflanzenname mit Emoji
  - Trennzeichen (>)
  - Kategoriename mit Icon
  - Trennzeichen (>) (wenn Unterkategorie ausgewählt)
  - Unterkategoriename (wenn ausgewählt)

```html
<nav class="breadcrumb-navigation">
  <ul class="breadcrumb-list">
    <li class="breadcrumb-item">
      <a href="/" class="breadcrumb-link">Startseite</a>
    </li>
    <li class="breadcrumb-separator">></li>
    <li class="breadcrumb-item">
      <a href="/plants/tomato" class="breadcrumb-link">
        <span class="breadcrumb-emoji">🍅</span>
        <span class="breadcrumb-text">Tomate</span>
      </a>
    </li>
    <li class="breadcrumb-separator">></li>
    <li class="breadcrumb-item">
      <a href="/plants/tomato/companions" class="breadcrumb-link">
        <span class="breadcrumb-emoji">🌱</span>
        <span class="breadcrumb-text">Mit wem gehe ich ins Beet?</span>
      </a>
    </li>
    <li class="breadcrumb-separator">></li>
    <li class="breadcrumb-item active">
      <span class="breadcrumb-text">Für kleine Flächen</span>
    </li>
  </ul>
</nav>
```

### Mobile-Design

- **Position**: Horizontal, mit horizontalem Scrollen
- **Stil**: Kompakter, mit kleinerer Schrift
- **Elemente**: Wie Desktop, aber mit abgekürzten Texten bei Bedarf

```css
/* Mobile-spezifische Anpassungen */
@media (max-width: 767px) {
  .breadcrumb-navigation {
    overflow-x: auto;
    white-space: nowrap;
    padding: var(--space-xs) var(--space-s);
  }
  
  .breadcrumb-list {
    display: inline-flex;
  }
  
  .breadcrumb-text {
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
```

## 6. Direkte Chat-Funktion

### Desktop-Design

![Chat-Funktion Desktop Wireframe]

- **Position**: Am unteren Rand der Seite
- **Stil**: Deutlich vom strukturierten Navigationssystem getrennt
- **Elemente**:
  - Texteingabefeld (Vollbreite)
  - Senden-Button
  - Optionale Vorschläge für mögliche Fragen
  - Hinweis "Freie Frage stellen"

```html
<div class="chat-function">
  <div class="chat-suggestions">
    <h4 class="suggestions-heading">Vorschläge:</h4>
    <div class="suggestions-chips">
      <button class="suggestion-chip">Wie oft gieße ich Tomaten?</button>
      <button class="suggestion-chip">Wann kann ich ernten?</button>
      <button class="suggestion-chip">Welche Krankheiten sind häufig?</button>
    </div>
  </div>
  
  <form class="chat-input-form">
    <div class="chat-input-container">
      <input type="text" placeholder="Stelle eine freie Frage..." class="chat-input">
      <button type="submit" class="chat-send-button">
        <span class="send-icon">➤</span>
      </button>
    </div>
    <p class="chat-hint">Du kannst hier jede Frage zu Gartenbau stellen</p>
  </form>
</div>
```

### Mobile-Design

- **Position**: Sticky am unteren Rand
- **Stil**: Kompakter, mit Fokus auf das Eingabefeld
- **Elemente**: Wie Desktop, aber mit reduzierter Anzahl an Vorschlägen

```css
/* Mobile-spezifische Anpassungen */
@media (max-width: 767px) {
  .chat-function {
    position: sticky;
    bottom: 0;
    background-color: var(--color-background);
    padding: var(--space-s);
    box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  }
  
  .suggestions-chips {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: var(--space-xs);
  }
  
  .suggestion-chip {
    display: inline-block;
    margin-right: var(--space-xs);
  }
}
```

## 7. Interaktionsfluss

1. **Startseite**: Benutzer sieht die Pflanzenauswahl (erste Ebene)
2. **Pflanzenauswahl**: Benutzer wählt eine Pflanze aus
   - Breadcrumb aktualisiert sich: "Startseite > [Pflanze]"
   - Ansicht wechselt zu Informationskategorien (zweite Ebene)
3. **Kategorie-Auswahl**: Benutzer wählt eine Informationskategorie
   - Breadcrumb aktualisiert sich: "Startseite > [Pflanze] > [Kategorie]"
   - Wenn Unterkategorien verfügbar: Ansicht wechselt zu spezifischen Anfragen (dritte Ebene)
   - Wenn keine Unterkategorien: Direkte Anzeige der Antwort
4. **Unterkategorie-Auswahl** (optional): Benutzer wählt eine spezifische Anfrage
   - Breadcrumb aktualisiert sich: "Startseite > [Pflanze] > [Kategorie] > [Unterkategorie]"
   - Anzeige der spezifischen Antwort
5. **Navigation über Breadcrumb**: Benutzer kann jederzeit zu vorherigen Ebenen zurückkehren
6. **Freie Frage**: Benutzer kann jederzeit eine freie Frage über das Chat-Eingabefeld stellen

## 8. Visuelle Hierarchie und Farbcodierung

- **Pflanzenauswahl**: Verwendung der Primärfarbe (Grün) für aktive Kategorien
- **Informationskategorien**: Jede Kategorie mit eigenem Icon und Akzentfarbe
- **Breadcrumb**: Aktuelle Position hervorgehoben, vorherige Positionen als Links
- **Chat-Funktion**: Visuell abgesetzt durch andere Hintergrundfarbe oder Rahmen

## 9. Barrierefreiheit

- Alle interaktiven Elemente haben ausreichende Größe (min. 44x44px für Touch)
- Farbkontraste erfüllen WCAG 2.1 AA-Standards
- Alle Bilder haben Alt-Texte
- Tastaturnavigation wird vollständig unterstützt
- ARIA-Attribute für verbesserte Screenreader-Unterstützung

## 10. Responsive Verhalten

Das Design passt sich nahtlos an verschiedene Bildschirmgrößen an:
- **Desktop**: Fokus auf Effizienz und Übersicht
- **Tablet**: Angepasstes Layout mit weniger Elementen pro Reihe
- **Mobile**: Vertikale Layouts, größere Touch-Ziele, optimierte Textlängen

## 11. Zielgruppenspezifische Anpassungen

### Für Menschen mit Garten (Teilen/Gemeinschaftlich bewirtschaften)
- Klare, gut lesbare Beschriftungen
- Deutliche visuelle Hierarchie
- Fokus auf praktische Informationen

### Für junge Erwachsene ohne eigenen Garten
- Moderne, ansprechende Ästhetik
- Spielerische Elemente (Emojis, Animationen)
- Einfacher Einstieg mit Vorschlägen und Hilfestellungen
