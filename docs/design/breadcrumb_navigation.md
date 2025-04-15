# Breadcrumb-Navigation für Urbago

Dieses Dokument beschreibt das UI-Design für die Breadcrumb-Navigation der Urbago-Anwendung, basierend auf den Anforderungen aus dem Projektpaket.

## 1. Übersicht und Konzept

Die Breadcrumb-Navigation ist ein wesentlicher Bestandteil des label-basierten Navigationssystems und zeigt dem Benutzer seinen aktuellen Pfad durch die Anwendung. Sie ermöglicht eine einfache Navigation zurück zu vorherigen Auswahlschritten und bietet Kontext für die aktuelle Ansicht.

## 2. Allgemeines Design

### Positionierung
- Horizontal am oberen Rand der Anwendung, unterhalb des Headers
- Volle Breite mit konsistenten Seitenrändern
- Leicht hervorgehoben durch subtilen Hintergrund oder Rahmen

### Visuelle Gestaltung
- Klare visuelle Hierarchie mit Hervorhebung des aktuellen Schritts
- Konsistente Verwendung von Icons/Emojis für visuelle Unterstützung
- Trennzeichen (>) zwischen den Navigationselementen
- Farbliche Kodierung entsprechend der Urbago-Farbpalette

## 3. Desktop-Design

![Breadcrumb Desktop Wireframe]

- **Höhe**: 48px (6x Basis-Einheit)
- **Hintergrund**: Leicht abgesetzt vom Seitenhintergrund (z.B. sehr helles Grün)
- **Schriftgröße**: 1rem (16px)
- **Elemente**:
  - Startseite-Link: "Startseite" oder Haus-Icon
  - Pflanzenname mit Emoji (z.B. "🍅 Tomate")
  - Kategoriename mit Icon (z.B. "🌱 Mit wem gehe ich ins Beet?")
  - Unterkategoriename (wenn ausgewählt, z.B. "Für kleine Flächen")
  - Aktuelle Position: Hervorgehoben durch Fettdruck und/oder Farbe

```html
<nav class="breadcrumb-navigation" aria-label="Breadcrumb">
  <div class="breadcrumb-container">
    <ol class="breadcrumb-list">
      <li class="breadcrumb-item">
        <a href="/" class="breadcrumb-link">
          <span class="breadcrumb-icon">🏠</span>
          <span class="breadcrumb-text">Startseite</span>
        </a>
      </li>
      <li class="breadcrumb-separator" aria-hidden="true">></li>
      <li class="breadcrumb-item">
        <a href="/plants/tomato" class="breadcrumb-link">
          <span class="breadcrumb-icon">🍅</span>
          <span class="breadcrumb-text">Tomate</span>
        </a>
      </li>
      <li class="breadcrumb-separator" aria-hidden="true">></li>
      <li class="breadcrumb-item">
        <a href="/plants/tomato/companions" class="breadcrumb-link">
          <span class="breadcrumb-icon">🌱</span>
          <span class="breadcrumb-text">Mit wem gehe ich ins Beet?</span>
        </a>
      </li>
      <li class="breadcrumb-separator" aria-hidden="true">></li>
      <li class="breadcrumb-item current" aria-current="page">
        <span class="breadcrumb-text">Für kleine Flächen</span>
      </li>
    </ol>
  </div>
</nav>
```

```css
.breadcrumb-navigation {
  width: 100%;
  background-color: rgba(140, 198, 63, 0.1); /* Sehr helles Grün */
  border-bottom: 1px solid rgba(140, 198, 63, 0.2);
  padding: var(--space-s) var(--space-xl);
  margin-bottom: var(--space-l);
}

.breadcrumb-container {
  max-width: 1200px;
  margin: 0 auto;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  color: var(--color-primary-dark);
  text-decoration: none;
  padding: var(--space-xs) var(--space-s);
  border-radius: var(--radius-small);
  transition: background-color var(--transition-fast);
}

.breadcrumb-link:hover {
  background-color: rgba(140, 198, 63, 0.2);
}

.breadcrumb-icon {
  margin-right: var(--space-xs);
}

.breadcrumb-separator {
  margin: 0 var(--space-xs);
  color: var(--color-text);
  opacity: 0.5;
}

.breadcrumb-item.current {
  font-weight: 600;
  color: var(--color-primary-dark);
}
```

## 4. Mobile-Design

![Breadcrumb Mobile Wireframe]

- **Höhe**: 40px (5x Basis-Einheit)
- **Schriftgröße**: 0.875rem (14px)
- **Scrollbar**: Horizontales Scrollen bei Bedarf
- **Kompaktheit**: Abkürzung langer Texte mit Ellipsis
- **Touch-Optimierung**: Ausreichend große Touch-Flächen

```html
<!-- HTML-Struktur bleibt gleich wie beim Desktop-Design -->
```

```css
/* Mobile-spezifische Anpassungen */
@media (max-width: 767px) {
  .breadcrumb-navigation {
    padding: var(--space-xs) var(--space-s);
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch; /* Für glattes Scrollen auf iOS */
  }
  
  .breadcrumb-list {
    display: inline-flex; /* Verhindert Umbruch */
  }
  
  .breadcrumb-text {
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .breadcrumb-link {
    padding: var(--space-xs);
    min-height: 40px; /* Touch-freundliche Höhe */
  }
}
```

## 5. Interaktives Verhalten

### Klickbare Elemente
- Alle Breadcrumb-Elemente außer dem aktuellen sind klickbar
- Hover-Effekt: Leichte Hintergrundfarbe zur Verdeutlichung der Klickbarkeit
- Aktives Element: Nicht klickbar, visuell hervorgehoben

### Aktualisierung
- Die Breadcrumb-Navigation aktualisiert sich automatisch bei jeder Navigationsänderung
- Neue Elemente werden mit einer subtilen Animation hinzugefügt (Fade-in)

### Trunkierung
- Bei langen Pfaden werden Elemente in der Mitte trunkiert
- Auf mobilen Geräten werden lange Texte mit Ellipsis abgekürzt

```javascript
// Beispiel für die Aktualisierung der Breadcrumb-Navigation
function updateBreadcrumb(path) {
  const breadcrumbList = document.querySelector('.breadcrumb-list');
  
  // Bestehende Elemente löschen
  breadcrumbList.innerHTML = '';
  
  // Startseite hinzufügen
  const homeItem = createBreadcrumbItem('🏠', 'Startseite', '/');
  breadcrumbList.appendChild(homeItem);
  
  // Pfad-Elemente hinzufügen
  path.forEach((item, index) => {
    // Trennzeichen hinzufügen
    const separator = document.createElement('li');
    separator.className = 'breadcrumb-separator';
    separator.setAttribute('aria-hidden', 'true');
    separator.textContent = '>';
    breadcrumbList.appendChild(separator);
    
    // Breadcrumb-Element hinzufügen
    const isLast = index === path.length - 1;
    const breadcrumbItem = createBreadcrumbItem(
      item.icon,
      item.label,
      isLast ? null : item.url,
      isLast
    );
    breadcrumbList.appendChild(breadcrumbItem);
  });
}

function createBreadcrumbItem(icon, text, url, isCurrent = false) {
  const item = document.createElement('li');
  item.className = `breadcrumb-item${isCurrent ? ' current' : ''}`;
  
  if (isCurrent) {
    item.setAttribute('aria-current', 'page');
    
    const textSpan = document.createElement('span');
    textSpan.className = 'breadcrumb-text';
    textSpan.textContent = text;
    
    if (icon) {
      const iconSpan = document.createElement('span');
      iconSpan.className = 'breadcrumb-icon';
      iconSpan.textContent = icon;
      item.appendChild(iconSpan);
    }
    
    item.appendChild(textSpan);
  } else {
    const link = document.createElement('a');
    link.className = 'breadcrumb-link';
    link.href = url;
    
    if (icon) {
      const iconSpan = document.createElement('span');
      iconSpan.className = 'breadcrumb-icon';
      iconSpan.textContent = icon;
      link.appendChild(iconSpan);
    }
    
    const textSpan = document.createElement('span');
    textSpan.className = 'breadcrumb-text';
    textSpan.textContent = text;
    link.appendChild(textSpan);
    
    item.appendChild(link);
  }
  
  return item;
}
```

## 6. Barrierefreiheit

- **ARIA-Attribute**: Korrekte Verwendung von `aria-label`, `aria-current` und `aria-hidden`
- **Farbkontrast**: Ausreichender Kontrast zwischen Text und Hintergrund
- **Tastaturnavigation**: Vollständige Unterstützung der Tastaturnavigation
- **Screenreader**: Semantisch korrekte Struktur für Screenreader

```html
<!-- Beispiel für barrierefreie Breadcrumb-Navigation -->
<nav class="breadcrumb-navigation" aria-label="Breadcrumb">
  <div class="breadcrumb-container">
    <ol class="breadcrumb-list">
      <!-- ... Breadcrumb-Elemente ... -->
    </ol>
  </div>
</nav>
```

## 7. Integration mit dem Label-basierten Navigationssystem

Die Breadcrumb-Navigation ist eng mit dem label-basierten Navigationssystem verknüpft:

1. **Pflanzenauswahl**: Nach Auswahl einer Pflanze wird diese zur Breadcrumb hinzugefügt
2. **Informationskategorie**: Nach Auswahl einer Kategorie wird diese zur Breadcrumb hinzugefügt
3. **Spezifische Anfrage**: Nach Auswahl einer Unterkategorie wird diese zur Breadcrumb hinzugefügt

Die Breadcrumb-Navigation ermöglicht es dem Benutzer, jederzeit zu vorherigen Schritten zurückzukehren, ohne den gesamten Navigationspfad neu durchlaufen zu müssen.

## 8. Zielgruppenspezifische Anpassungen

### Für Menschen mit Garten (Teilen/Gemeinschaftlich bewirtschaften)
- Klare, gut lesbare Beschriftungen
- Deutliche visuelle Hierarchie
- Konsistente Verwendung von Icons für schnelle Wiedererkennung

### Für junge Erwachsene ohne eigenen Garten
- Moderne, ansprechende Ästhetik
- Intuitive Navigation
- Spielerische Elemente (Emojis)

## 9. Zusammenfassung

Die Breadcrumb-Navigation für Urbago bietet:
- Klare Orientierung innerhalb der Anwendung
- Einfache Navigation zu vorherigen Schritten
- Konsistente visuelle Darstellung auf allen Geräten
- Barrierefreie Implementierung
- Nahtlose Integration mit dem label-basierten Navigationssystem

Diese Komponente ist ein wesentlicher Bestandteil der Benutzerführung und trägt maßgeblich zur positiven Nutzererfahrung bei.
