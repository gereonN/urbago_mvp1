# Urbago Typografie-System

Basierend auf der Urbago-Website und den Designanforderungen habe ich folgendes Typografie-System definiert:

## Schriftarten

### Primäre Schriftart
- **Familie**: Inter (Sans-Serif)
- **Alternativen**: SF Pro Display, Helvetica Neue, Arial, sans-serif
- **Begründung**: Inter ist eine moderne, klare Sans-Serif-Schrift mit hervorragender Lesbarkeit auf allen Bildschirmgrößen. Sie passt perfekt zum minimalistischen, modernen Design von Urbago.

### Sekundäre Schriftart (optional)
- **Familie**: Montserrat (Sans-Serif)
- **Alternativen**: Roboto, Helvetica Neue, Arial, sans-serif
- **Verwendung**: Kann für Überschriften verwendet werden, um visuelle Hierarchie zu verstärken

## Schriftgrößen

### Desktop (>1024px)
- **H1 (Hauptüberschrift)**: 2.5rem (40px)
- **H2 (Abschnittsüberschrift)**: 2rem (32px)
- **H3 (Unterabschnittsüberschrift)**: 1.5rem (24px)
- **Body (Fließtext)**: 1rem (16px)
- **Small (Kleingedrucktes)**: 0.875rem (14px)
- **XS (sehr klein)**: 0.75rem (12px)

### Tablet (768px-1024px)
- **H1 (Hauptüberschrift)**: 2.25rem (36px)
- **H2 (Abschnittsüberschrift)**: 1.75rem (28px)
- **H3 (Unterabschnittsüberschrift)**: 1.375rem (22px)
- **Body (Fließtext)**: 1rem (16px)
- **Small (Kleingedrucktes)**: 0.875rem (14px)
- **XS (sehr klein)**: 0.75rem (12px)

### Mobile (<768px)
- **H1 (Hauptüberschrift)**: 2rem (32px)
- **H2 (Abschnittsüberschrift)**: 1.5rem (24px)
- **H3 (Unterabschnittsüberschrift)**: 1.25rem (20px)
- **Body (Fließtext)**: 1rem (16px)
- **Small (Kleingedrucktes)**: 0.875rem (14px)
- **XS (sehr klein)**: 0.75rem (12px)

## Schriftstärken

- **Regular**: 400 (Fließtext, UI-Elemente)
- **Medium**: 500 (Hervorhebungen, Buttons)
- **Semi-Bold**: 600 (Unterüberschriften)
- **Bold**: 700 (Überschriften, wichtige Elemente)

## Zeilenabstände

- **Überschriften**: 1.2 (kompakt für Überschriften)
- **Fließtext**: 1.5 (optimal für Lesbarkeit)
- **Listenelemente**: 1.4 (etwas kompakter als Fließtext)
- **Buttons/Labels**: 1.2 (kompakt für UI-Elemente)

## Buchstabenabstände

- **Überschriften**: -0.02em (leicht reduziert für besseres Erscheinungsbild)
- **Fließtext**: 0 (Standard)
- **Buttons/Labels**: 0.02em (leicht erhöht für bessere Lesbarkeit)
- **ALL CAPS**: 0.05em (erhöht für bessere Lesbarkeit bei Großbuchstaben)

## Textausrichtung

- **Überschriften**: Links ausgerichtet (Desktop), Zentriert (Mobile)
- **Fließtext**: Links ausgerichtet
- **Buttons/Labels**: Zentriert
- **Navigation**: Links ausgerichtet (Desktop), Zentriert (Mobile)

## Typografische Hierarchie

### Beispiel für Pflanzendetailseite
1. **Pflanzenname (H1)**: 2.5rem, Bold (700), Primärfarbe
2. **Kategorie (Label)**: 0.875rem, Medium (500), ALL CAPS, Sekundärfarbe
3. **Abschnittsüberschriften (H2)**: 2rem, Bold (700), Primärfarbe
4. **Unterabschnittsüberschriften (H3)**: 1.5rem, Semi-Bold (600), Primärfarbe
5. **Beschreibungstext (Body)**: 1rem, Regular (400), Textfarbe
6. **Hinweise (Small)**: 0.875rem, Regular (400), Sekundäre Textfarbe

## Responsive Typografie

Für eine optimale Lesbarkeit auf allen Geräten verwenden wir Fluid Typography mit CSS clamp():

```css
:root {
  --font-size-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --font-size-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --font-size-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --font-size-lg: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --font-size-xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
  --font-size-2xl: clamp(2rem, 1.8rem + 1vw, 2.5rem);
}
```

## Barrierefreiheit

- Minimale Textgröße von 16px (1rem) für Fließtext
- Ausreichender Kontrast zwischen Text und Hintergrund (WCAG 2.1 AA)
- Keine Textinhalte als Bilder (außer Logo)
- Skalierbare Texte (keine festen Pixelgrößen in der Implementierung)

## Anwendungsbeispiele

### Navigation
- **Hauptnavigation**: 1rem, Medium (500)
- **Breadcrumb**: 0.875rem, Regular (400)
- **Aktives Element**: 1rem, Bold (700), Primärfarbe

### Buttons
- **Primär-Button**: 1rem, Medium (500), Großbuchstaben für kurze Labels
- **Sekundär-Button**: 1rem, Regular (400)
- **Tertiär-Button/Link**: 1rem, Regular (400), Unterstreichung

### Formulare
- **Labels**: 0.875rem, Medium (500)
- **Input-Text**: 1rem, Regular (400)
- **Hilfetexte**: 0.75rem, Regular (400)
- **Fehlermeldungen**: 0.75rem, Medium (500), Fehlerfarbe
