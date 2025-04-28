# Urbago Design-System-Grundlagen

Dieses Dokument definiert die grundlegenden Design-Elemente für das Urbago UI/UX-System, die konsistent in der gesamten Anwendung verwendet werden sollen.

## Abstände und Größen

### Basis-Einheit
- **Basis**: 8px
- **Begründung**: Ein 8px-Raster ermöglicht konsistente Abstände und sorgt für Harmonie im gesamten Design.

### Abstände (Spacing)
- **XS**: 4px (0.5x Basis)
- **S**: 8px (1x Basis)
- **M**: 16px (2x Basis)
- **L**: 24px (3x Basis)
- **XL**: 32px (4x Basis)
- **XXL**: 48px (6x Basis)
- **XXXL**: 64px (8x Basis)

### Anwendung der Abstände
- **Innenabstand (Padding)**: 
  - Buttons: S (horizontal) und XS (vertikal)
  - Karten/Container: M
  - Formularelemente: S
- **Außenabstand (Margin)**:
  - Zwischen Abschnitten: L oder XL
  - Zwischen verwandten Elementen: S oder M
  - Seitenränder: M (Mobile), L (Tablet), XL (Desktop)

### Container-Größen
- **Max-Breite**: 1200px (Desktop)
- **Seitenränder**: 
  - Mobile: 16px (M)
  - Tablet: 24px (L)
  - Desktop: 32px (XL)

## Raster-System

### Desktop (>1024px)
- **Spalten**: 12
- **Spaltenbreite**: Fluid
- **Rinne (Gutter)**: 24px (L)

### Tablet (768px-1024px)
- **Spalten**: 8
- **Spaltenbreite**: Fluid
- **Rinne (Gutter)**: 16px (M)

### Mobile (<768px)
- **Spalten**: 4
- **Spaltenbreite**: Fluid
- **Rinne (Gutter)**: 16px (M)

## Komponenten-Größen

### Buttons
- **Höhe**: 
  - Standard: 40px (5x Basis)
  - Klein: 32px (4x Basis)
  - Groß: 48px (6x Basis)
- **Breite**: Abhängig vom Inhalt, mindestens 120px für primäre Aktionen
- **Border-Radius**: 4px (0.5x Basis)

### Eingabefelder
- **Höhe**: 40px (5x Basis)
- **Border-Radius**: 4px (0.5x Basis)
- **Border-Stärke**: 1px

### Karten/Container
- **Border-Radius**: 8px (1x Basis)
- **Schatten**: 
  - Leicht: 0 2px 4px rgba(0,0,0,0.1)
  - Mittel: 0 4px 8px rgba(0,0,0,0.1)
  - Stark: 0 8px 16px rgba(0,0,0,0.1)

### Icons
- **Standard**: 24px (3x Basis)
- **Klein**: 16px (2x Basis)
- **Groß**: 32px (4x Basis)

## Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1440px

## Animationen und Übergänge

### Dauer
- **Schnell**: 150ms
- **Standard**: 300ms
- **Langsam**: 500ms

### Timing-Funktionen
- **Standard**: ease-in-out
- **Eintritt**: ease-out
- **Austritt**: ease-in

### Anwendungsbeispiele
- **Hover-Effekte**: Schnell (150ms)
- **Seitenwechsel**: Standard (300ms)
- **Komplexe Animationen**: Langsam (500ms)

## Schatten und Tiefe

### Schatten-Stufen
- **Stufe 1** (subtil): 0 2px 4px rgba(0,0,0,0.1)
- **Stufe 2** (mittel): 0 4px 8px rgba(0,0,0,0.1)
- **Stufe 3** (deutlich): 0 8px 16px rgba(0,0,0,0.15)
- **Stufe 4** (stark): 0 16px 24px rgba(0,0,0,0.15)

### Anwendung
- **Karten/Container**: Stufe 1
- **Dropdown-Menüs**: Stufe 2
- **Modals/Dialoge**: Stufe 3
- **Offscreen-Menüs**: Stufe 4

## Formen und Linien

### Border-Radien
- **Klein**: 4px (0.5x Basis)
- **Standard**: 8px (1x Basis)
- **Groß**: 16px (2x Basis)
- **Rund**: 50% (für kreisförmige Elemente)

### Linien
- **Dünn**: 1px
- **Standard**: 2px
- **Dick**: 3px

### Anwendung
- **Buttons**: Klein (4px)
- **Karten/Container**: Standard (8px)
- **Profilbilder/Avatare**: Rund (50%)
- **Trennlinien**: Dünn (1px)

## Zielgruppen-spezifische Anpassungen

### Für Menschen mit Garten (Teilen/Gemeinschaftlich bewirtschaften)
- Größere Schaltflächen für einfache Interaktion
- Klare visuelle Hierarchie für wichtige Aktionen
- Beruhigende Farbpalette mit Fokus auf Grüntöne

### Für junge Erwachsene ohne eigenen Garten
- Moderne, frische Ästhetik
- Spielerische Elemente und Feedback
- Optimierung für mobile Nutzung
- Einfacher Einstieg mit klaren Anleitungen

## Barrierefreiheit

### Kontraste
- Text auf Hintergrund: Mindestens 4.5:1 (WCAG AA)
- Große Texte und UI-Elemente: Mindestens 3:1 (WCAG AA)

### Fokus-Zustände
- Deutlich sichtbarer Fokus-Indikator
- Konsistente Fokus-Reihenfolge

### Touch-Ziele
- Mindestgröße: 44px × 44px
- Mindestabstand zwischen Touch-Zielen: 8px (1x Basis)

## CSS-Variablen (Beispiel)

```css
:root {
  /* Farben */
  --color-primary-light: #8CC63F;
  --color-primary-dark: #006838;
  --color-secondary-light: #FBB040;
  --color-secondary-dark: #F7941D;
  --color-accent-light: #ED1C24;
  --color-accent-dark: #BE1E2D;
  --color-text: #000000;
  --color-background: #FFFFFF;
  
  /* Abstände */
  --space-xs: 4px;
  --space-s: 8px;
  --space-m: 16px;
  --space-l: 24px;
  --space-xl: 32px;
  --space-xxl: 48px;
  --space-xxxl: 64px;
  
  /* Border-Radien */
  --radius-small: 4px;
  --radius-standard: 8px;
  --radius-large: 16px;
  
  /* Schatten */
  --shadow-level-1: 0 2px 4px rgba(0,0,0,0.1);
  --shadow-level-2: 0 4px 8px rgba(0,0,0,0.1);
  --shadow-level-3: 0 8px 16px rgba(0,0,0,0.15);
  --shadow-level-4: 0 16px 24px rgba(0,0,0,0.15);
  
  /* Animationen */
  --transition-fast: 150ms ease-in-out;
  --transition-standard: 300ms ease-in-out;
  --transition-slow: 500ms ease-in-out;
}
```
