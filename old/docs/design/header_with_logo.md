# Header mit Logo für Urbago

Dieses Dokument beschreibt das UI-Design für den Header mit Logo der Urbago-Anwendung, basierend auf den Anforderungen aus dem Projektpaket und dem Urbago-Logo.

## 1. Übersicht und Konzept

Der Header ist ein zentrales Element der Urbago-Anwendung und erscheint auf allen Seiten. Er enthält das Urbago-Logo und dient als visueller Ankerpunkt für die Benutzer. Der Header sollte die Markenidentität von Urbago widerspiegeln und gleichzeitig funktional und responsiv sein.

## 2. Allgemeines Design

### Positionierung
- Am oberen Rand jeder Seite
- Sticky-Position beim Scrollen (bleibt sichtbar)
- Volle Breite mit konsistenten Seitenrändern

### Visuelle Gestaltung
- Klare, minimalistische Gestaltung
- Weißer Hintergrund für optimalen Kontrast zum Logo
- Subtile Schatten zur Abgrenzung vom Inhalt
- Konsistente Verwendung der Urbago-Farbpalette

## 3. Desktop-Design

![Header Desktop Wireframe]

- **Höhe**: 80px
- **Padding**: Horizontal 32px (XL), Vertikal 16px (M)
- **Logo-Größe**: Höhe 48px, proportionale Breite
- **Elemente**:
  - Urbago-Logo (SVG) links ausgerichtet
  - Optional: Navigation oder weitere Elemente rechts ausgerichtet

```html
<header class="urbago-header">
  <div class="header-container">
    <div class="logo-container">
      <a href="/" class="logo-link">
        <img src="images/Urbago_logo.svg" alt="Urbago" class="logo-image">
      </a>
    </div>
    
    <!-- Optional: Weitere Header-Elemente -->
    <div class="header-actions">
      <!-- Hier könnten weitere Elemente wie Navigation, Buttons etc. eingefügt werden -->
    </div>
  </div>
</header>
```

```css
.urbago-header {
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  background-color: var(--color-background);
  box-shadow: var(--shadow-level-1);
  z-index: 1000;
}

.header-container {
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: var(--space-m) var(--space-xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-container {
  height: 100%;
  display: flex;
  align-items: center;
}

.logo-link {
  display: block;
  height: 48px;
}

.logo-image {
  height: 100%;
  width: auto;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-m);
}
```

## 4. Mobile-Design

![Header Mobile Wireframe]

- **Höhe**: 64px
- **Padding**: Horizontal 16px (M), Vertikal 12px (S+XS)
- **Logo-Größe**: Höhe 40px, proportionale Breite
- **Elemente**: Wie Desktop, aber mit kompakterem Layout

```html
<!-- HTML-Struktur bleibt gleich wie beim Desktop-Design -->
```

```css
/* Mobile-spezifische Anpassungen */
@media (max-width: 767px) {
  .urbago-header {
    height: 64px;
  }
  
  .header-container {
    padding: var(--space-xs) var(--space-m);
  }
  
  .logo-link {
    height: 40px;
  }
}
```

## 5. Logo-Integration

Das Urbago-Logo besteht aus einem Wortmarken-Element "urbago" und einem Symbol aus drei stilisierten Früchten/Pflanzen in Rot, Grün und Gelb/Orange.

### Vollständiges Logo
- Für Desktop und größere Bildschirme
- Enthält sowohl Symbol als auch Wortmarke
- Ausreichend Freiraum um das Logo

### Kompaktes Logo (optional)
- Für sehr kleine mobile Bildschirme oder bei Platzmangel
- Nur das Symbol ohne Wortmarke
- Behält die Erkennbarkeit der Marke bei

```html
<!-- Vollständiges Logo (Standard) -->
<img src="images/Urbago_logo.svg" alt="Urbago" class="logo-image">

<!-- Kompaktes Logo (optional für sehr kleine Bildschirme) -->
<img src="images/Urbago_Favicon.svg" alt="Urbago" class="logo-image logo-compact">
```

```css
/* Optionale Implementierung für kompaktes Logo */
.logo-compact {
  display: none;
}

@media (max-width: 360px) {
  .logo-image {
    display: none;
  }
  
  .logo-compact {
    display: block;
  }
}
```

## 6. Farbvarianten

Der Header kann in verschiedenen Farbvarianten implementiert werden:

### Standard (Weiß)
- Weißer Hintergrund
- Logo in Originalfarben
- Optimale Sichtbarkeit und Kontrast

### Invertiert (optional)
- Dunkelgrüner Hintergrund (Primärfarbe Dunkel)
- Logo mit weißer Wortmarke
- Für spezielle Bereiche oder Aktionen

```css
/* Standard Header */
.urbago-header {
  background-color: var(--color-background);
  color: var(--color-text);
}

/* Invertierter Header (optional) */
.urbago-header.inverted {
  background-color: var(--color-primary-dark);
  color: white;
}

.urbago-header.inverted .logo-image {
  filter: brightness(0) invert(1); /* Macht das Logo weiß */
}
```

## 7. Interaktives Verhalten

### Logo-Link
- Klick auf das Logo führt zur Startseite
- Hover-Effekt: Subtile Skalierung oder Farbänderung

### Sticky-Verhalten
- Header bleibt beim Scrollen am oberen Bildschirmrand sichtbar
- Optionale Animation beim Scrollen (z.B. leichte Höhenreduktion)

```javascript
// Beispiel für interaktives Verhalten
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('.urbago-header');
  const logoLink = document.querySelector('.logo-link');
  
  // Scroll-Verhalten
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Kompakter Header beim Scrollen nach unten
    if (scrollTop > 100) {
      header.classList.add('compact');
    } else {
      header.classList.remove('compact');
    }
    
    lastScrollTop = scrollTop;
  });
  
  // Logo-Link Hover-Effekt
  logoLink.addEventListener('mouseenter', function() {
    this.classList.add('hover');
  });
  
  logoLink.addEventListener('mouseleave', function() {
    this.classList.remove('hover');
  });
});
```

```css
/* Interaktive Stile */
.logo-link {
  transition: transform var(--transition-fast);
}

.logo-link.hover {
  transform: scale(1.05);
}

.urbago-header.compact {
  height: 60px;
  box-shadow: var(--shadow-level-2);
}

@media (max-width: 767px) {
  .urbago-header.compact {
    height: 50px;
  }
}
```

## 8. Barrierefreiheit

- **Alt-Text**: Logo-Bild hat aussagekräftigen Alt-Text
- **Farbkontrast**: Ausreichender Kontrast zwischen Header und Inhalt
- **Tastaturnavigation**: Logo-Link ist per Tastatur fokussierbar
- **Screenreader**: Semantisch korrekte Struktur für Screenreader

```html
<!-- Barrierefreie Implementierung -->
<header class="urbago-header" role="banner">
  <div class="header-container">
    <div class="logo-container">
      <a href="/" class="logo-link" aria-label="Urbago Startseite">
        <img src="images/Urbago_logo.svg" alt="Urbago Logo" class="logo-image">
      </a>
    </div>
  </div>
</header>
```

## 9. Integration mit anderen Komponenten

### Breadcrumb-Navigation
- Erscheint direkt unter dem Header
- Visuell vom Header abgegrenzt, aber als zusammengehörig erkennbar

### Hauptnavigation (falls implementiert)
- Kann im Header integriert oder darunter platziert werden
- Konsistentes Design mit dem Header

## 10. Zielgruppenspezifische Anpassungen

### Für Menschen mit Garten (Teilen/Gemeinschaftlich bewirtschaften)
- Klare, professionelle Darstellung
- Fokus auf Vertrauenswürdigkeit und Stabilität

### Für junge Erwachsene ohne eigenen Garten
- Moderne, frische Ästhetik
- Ansprechende visuelle Elemente

## 11. Zusammenfassung

Der Header mit Logo für Urbago bietet:
- Klare Markenidentität durch prominente Platzierung des Logos
- Responsive Gestaltung für alle Geräte
- Konsistente visuelle Präsenz auf allen Seiten
- Barrierefreie Implementierung
- Funktionale Integration mit anderen UI-Komponenten

Diese Komponente dient als visueller Ankerpunkt für die Benutzer und stärkt die Markenidentität von Urbago in der gesamten Anwendung.
