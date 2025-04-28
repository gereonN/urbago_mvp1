# Chat-Interface mit freier Eingabe für Urbago

Dieses Dokument beschreibt das UI-Design für das Chat-Interface mit freier Eingabe der Urbago-Anwendung, basierend auf den Anforderungen aus dem Projektpaket.

## 1. Übersicht und Konzept

Das Chat-Interface ermöglicht es Benutzern, freie Fragen zu Gartenthemen zu stellen, die nicht durch das strukturierte label-basierte Navigationssystem abgedeckt werden. Es bietet eine flexible Alternative zur strukturierten Navigation und ermöglicht eine natürlichere Interaktion mit dem System.

## 2. Allgemeines Design

### Positionierung
- Am unteren Rand der Anwendung
- Deutlich vom strukturierten Navigationssystem abgegrenzt
- Auf mobilen Geräten als sticky Element am unteren Bildschirmrand

### Visuelle Gestaltung
- Klare visuelle Abgrenzung durch Rahmen oder Hintergrundfarbe
- Konsistente Verwendung der Urbago-Farbpalette
- Freundliche, einladende Gestaltung

## 3. Desktop-Design

![Chat-Interface Desktop Wireframe]

- **Höhe**: Variabel, abhängig vom Inhalt
- **Breite**: Volle Inhaltsbreite (max. 800px)
- **Hintergrund**: Leicht abgesetzt vom Seitenhintergrund (z.B. sehr helles Grün)
- **Elemente**:
  - Überschrift: "Freie Frage stellen"
  - Eingabefeld: Vollbreite, mehrere Zeilen möglich
  - Senden-Button: Primärfarbe mit Icon
  - Vorschläge: Horizontale Chips mit häufigen Fragen
  - Hinweistext: Kurze Erklärung zur Funktion

```html
<div class="chat-interface">
  <div class="chat-header">
    <h3 class="chat-title">Freie Frage stellen</h3>
    <p class="chat-description">Du kannst hier jede Frage zu Gartenbau und Pflanzen stellen.</p>
  </div>
  
  <div class="chat-suggestions">
    <h4 class="suggestions-title">Häufige Fragen:</h4>
    <div class="suggestions-container">
      <button class="suggestion-chip">Wie starte ich einen Balkongarten?</button>
      <button class="suggestion-chip">Welche Pflanzen sind pflegeleicht?</button>
      <button class="suggestion-chip">Was kann ich im Schatten anbauen?</button>
      <button class="suggestion-chip">Wie oft sollte ich gießen?</button>
    </div>
  </div>
  
  <form class="chat-form">
    <div class="input-container">
      <textarea 
        class="chat-input" 
        placeholder="Stelle deine Frage zum Thema Garten..." 
        rows="2"
        aria-label="Deine Frage"
      ></textarea>
      <button type="submit" class="send-button" aria-label="Frage senden">
        <span class="send-icon">➤</span>
        <span class="send-text">Senden</span>
      </button>
    </div>
  </form>
</div>
```

```css
.chat-interface {
  width: 100%;
  max-width: 800px;
  margin: var(--space-xl) auto;
  padding: var(--space-l);
  background-color: rgba(140, 198, 63, 0.1); /* Sehr helles Grün */
  border-radius: var(--radius-standard);
  border: 1px solid rgba(140, 198, 63, 0.3);
}

.chat-header {
  margin-bottom: var(--space-m);
}

.chat-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-primary-dark);
  margin-bottom: var(--space-xs);
}

.chat-description {
  font-size: 1rem;
  color: var(--color-text);
  opacity: 0.8;
}

.chat-suggestions {
  margin-bottom: var(--space-m);
}

.suggestions-title {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: var(--space-xs);
}

.suggestions-container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-s);
}

.suggestion-chip {
  background-color: white;
  border: 1px solid var(--color-primary-light);
  border-radius: var(--radius-small);
  padding: var(--space-xs) var(--space-s);
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.suggestion-chip:hover {
  background-color: rgba(140, 198, 63, 0.1);
}

.input-container {
  display: flex;
  gap: var(--space-s);
}

.chat-input {
  flex: 1;
  padding: var(--space-s);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: var(--radius-small);
  font-family: var(--font-family);
  font-size: 1rem;
  resize: vertical;
  min-height: 60px;
}

.chat-input:focus {
  outline: none;
  border-color: var(--color-primary-dark);
}

.send-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  background-color: var(--color-primary-light);
  color: white;
  border: none;
  border-radius: var(--radius-small);
  padding: var(--space-s) var(--space-m);
  font-weight: 500;
  cursor: pointer;
  transition: background-color var(--transition-fast);
  align-self: flex-end;
  height: 44px;
}

.send-button:hover {
  background-color: var(--color-primary-dark);
}

.send-icon {
  font-size: 0.875rem;
}
```

## 4. Mobile-Design

![Chat-Interface Mobile Wireframe]

- **Position**: Sticky am unteren Bildschirmrand
- **Höhe**: Kompakter als Desktop-Version
- **Elemente**:
  - Reduzierte Anzahl an Vorschlägen
  - Horizontales Scrollen für Vorschläge
  - Kompakteres Eingabefeld
  - Größerer Senden-Button für Touch-Interaktion

```html
<!-- HTML-Struktur bleibt gleich wie beim Desktop-Design -->
```

```css
/* Mobile-spezifische Anpassungen */
@media (max-width: 767px) {
  .chat-interface {
    position: sticky;
    bottom: 0;
    margin: 0;
    padding: var(--space-s);
    border-radius: var(--radius-standard) var(--radius-standard) 0 0;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }
  
  .chat-header {
    margin-bottom: var(--space-s);
  }
  
  .chat-title {
    font-size: 1.25rem;
  }
  
  .chat-description {
    font-size: 0.875rem;
  }
  
  .suggestions-container {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: var(--space-xs);
    -webkit-overflow-scrolling: touch;
  }
  
  .suggestion-chip {
    white-space: nowrap;
    flex-shrink: 0;
  }
  
  .send-button {
    min-width: 44px;
    min-height: 44px;
  }
  
  .send-text {
    display: none; /* Nur Icon auf mobilen Geräten */
  }
  
  .send-icon {
    font-size: 1.25rem;
  }
}
```

## 5. Interaktives Verhalten

### Eingabefeld
- Automatische Größenanpassung bei mehrzeiligen Eingaben
- Fokus-Zustand mit deutlicher visueller Hervorhebung
- Placeholder-Text verschwindet bei Eingabe

### Vorschläge
- Klick auf Vorschlag füllt das Eingabefeld mit dem Vorschlagstext
- Horizontales Scrollen auf mobilen Geräten
- Dynamische Aktualisierung basierend auf Kontext (z.B. ausgewählte Pflanze)

### Senden-Button
- Deaktiviert, wenn das Eingabefeld leer ist
- Hover- und Active-Zustände für Feedback
- Kurze Animation beim Absenden

```javascript
// Beispiel für interaktives Verhalten
document.addEventListener('DOMContentLoaded', function() {
  const chatForm = document.querySelector('.chat-form');
  const chatInput = document.querySelector('.chat-input');
  const sendButton = document.querySelector('.send-button');
  const suggestionChips = document.querySelectorAll('.suggestion-chip');
  
  // Automatische Größenanpassung des Textfelds
  chatInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
    
    // Button-Status aktualisieren
    sendButton.disabled = this.value.trim() === '';
  });
  
  // Vorschläge in das Eingabefeld einfügen
  suggestionChips.forEach(chip => {
    chip.addEventListener('click', function() {
      chatInput.value = this.textContent;
      chatInput.focus();
      
      // Größe des Textfelds aktualisieren
      chatInput.dispatchEvent(new Event('input'));
    });
  });
  
  // Formular absenden
  chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (chatInput.value.trim() !== '') {
      // Hier würde die Logik zum Senden der Frage implementiert
      console.log('Frage gesendet:', chatInput.value);
      
      // Eingabefeld zurücksetzen
      chatInput.value = '';
      chatInput.style.height = 'auto';
      
      // Button deaktivieren
      sendButton.disabled = true;
    }
  });
  
  // Initial Button-Status setzen
  sendButton.disabled = true;
});
```

## 6. Antwortdarstellung

Nach dem Absenden einer Frage wird die Antwort in einem Chat-ähnlichen Format angezeigt:

- **Frage**: Oben, in einer Sprechblase mit Benutzer-Indikator
- **Antwort**: Darunter, in einer Sprechblase mit Urbago-Indikator
- **Formatierung**: Strukturierte Antwort mit Überschriften, Absätzen und Emojis
- **Aktionen**: Möglichkeit, Folgefragen zu stellen oder zur strukturierten Navigation zurückzukehren

```html
<div class="chat-conversation">
  <div class="chat-message user-message">
    <div class="message-avatar user-avatar">👤</div>
    <div class="message-bubble user-bubble">
      <p class="message-text">Wie starte ich einen Balkongarten?</p>
    </div>
  </div>
  
  <div class="chat-message urbago-message">
    <div class="message-avatar urbago-avatar">🌱</div>
    <div class="message-bubble urbago-bubble">
      <h4 class="message-title">Balkongarten für Anfänger</h4>
      <div class="message-content">
        <p>Hier sind die wichtigsten Schritte, um deinen eigenen Balkongarten zu starten:</p>
        
        <h5>1. Standortanalyse 🔍</h5>
        <p>Beobachte, wie viel Sonne dein Balkon bekommt. Ist es ein Süd-, Nord-, Ost- oder Westbalkon? Das bestimmt, welche Pflanzen gedeihen werden.</p>
        
        <h5>2. Geeignete Behälter wählen 🪴</h5>
        <p>Wähle Töpfe mit Abflusslöchern und Untersetzer. Für Anfänger eignen sich größere Töpfe besser, da sie nicht so schnell austrocknen.</p>
        
        <!-- Weitere Inhalte -->
      </div>
    </div>
  </div>
</div>
```

## 7. Integration mit dem "Beet planen"-Feature

Das Chat-Interface dient auch als Einstiegspunkt für das "Beet planen"-Feature:

- **Button**: "Beet planen" erscheint unterhalb der Eingabeleiste nach Klick
- **Übergang**: Klick auf den Button öffnet das Beet-Planungs-Interface
- **Kontext**: Das Beet-Planungs-Feature ist kein separates Modul, sondern Teil des Chat-Interfaces

```html
<div class="feature-buttons">
  <button class="feature-button bed-planning-button">
    <span class="feature-icon">🌻</span>
    <span class="feature-text">Beet planen</span>
  </button>
  <!-- Weitere Feature-Buttons könnten hier hinzugefügt werden -->
</div>
```

```css
.feature-buttons {
  display: flex;
  gap: var(--space-s);
  margin-top: var(--space-s);
}

.feature-button {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  background-color: white;
  border: 1px solid var(--color-primary-light);
  border-radius: var(--radius-small);
  padding: var(--space-xs) var(--space-s);
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.feature-button:hover {
  background-color: rgba(140, 198, 63, 0.1);
}

.bed-planning-button {
  color: var(--color-primary-dark);
  font-weight: 500;
}
```

## 8. Barrierefreiheit

- **ARIA-Attribute**: Korrekte Verwendung von `aria-label` und anderen ARIA-Attributen
- **Farbkontrast**: Ausreichender Kontrast zwischen Text und Hintergrund
- **Tastaturnavigation**: Vollständige Unterstützung der Tastaturnavigation
- **Screenreader**: Semantisch korrekte Struktur für Screenreader
- **Touch-Ziele**: Ausreichend große Touch-Flächen (min. 44x44px)

## 9. Zielgruppenspezifische Anpassungen

### Für Menschen mit Garten (Teilen/Gemeinschaftlich bewirtschaften)
- Vorschläge zu gemeinschaftlichen Gartenprojekten
- Fragen zur optimalen Flächennutzung
- Hinweise auf saisonale Aktivitäten

### Für junge Erwachsene ohne eigenen Garten
- Einsteigerfreundliche Vorschläge
- Fragen zu platzsparenden Lösungen
- Moderne, spielerische Gestaltung

## 10. Zusammenfassung

Das Chat-Interface mit freier Eingabe für Urbago bietet:
- Eine flexible Alternative zum strukturierten Navigationssystem
- Intuitive Benutzerführung durch Vorschläge
- Nahtlose Integration mit dem "Beet planen"-Feature
- Responsive Gestaltung für alle Geräte
- Barrierefreie Implementierung

Diese Komponente ermöglicht eine natürlichere Interaktion mit dem System und bietet Benutzern die Freiheit, spezifische Fragen zu stellen, die nicht durch die strukturierte Navigation abgedeckt werden.
