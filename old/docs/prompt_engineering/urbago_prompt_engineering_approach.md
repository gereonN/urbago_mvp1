# Urbago Prompt Engineering Approach

## Project Overview
Urbago ist ein Gardening-MVP mit GPT-gestütztem Chatbot, der Menschen im urbanen Raum bei Selbstversorgung und nachhaltigem Lebensstil unterstützt. Der Chatbot beantwortet Fragen zu Garten, Pflanzen und Pflanzensynergien, mit besonderem Fokus auf Bildanalyse und Pflanzenkompatibilität.

## Kernfunktionen

1. **Bildanalyse mit verpflichtender Labelauswahl**
   - Nutzer können Pflanzenbilder hochladen
   - Verpflichtende Auswahl eines Labels (z.B. "Was ist das für eine Pflanze?")
   - Keine Weiterleitung ohne Label-Auswahl

2. **Pflanzenkompatibilitätstabelle**
   - Wird bei jeder Anfrage automatisch als Prompt Injection mitgesendet
   - Dient als Wissensbasis für Kompatibilitätsfragen

3. **Strukturierte Nutzerführung**
   - Buttons, Icons und Textblöcke erzeugen automatisch strukturierte Prompts
   - Vereinfacht die Interaktion für Gartenneulinge

4. **Sicherheitsmechanismen**
   - Filterung anstößiger Inhalte
   - Beschränkung auf gartenbezogene Themen

## Prompt-Engineering-Strategie

### 1. Systemrolle und Kontext
- GPT übernimmt die Rolle eines Gartenexperten mit Fokus auf urbanes Gärtnern
- Kontextuelle Einbettung der Urbago-Mission
- Klare Abgrenzung des Themenbereichs

### 2. Bildanalyse-Prompts
- Spezifische Prompts für verschiedene Bildanalyse-Szenarien
- Integration von Bildkontext und Label in die Anfrage
- Strukturierte Antwortformate für verschiedene Fragetypen

### 3. Pflanzenkompatibilitäts-Prompts
- Integration der Kompatibilitätstabelle in jeden Prompt
- Spezifische Abfragestruktur für Kompatibilitätsfragen
- Visuelle Darstellung von Kompatibilitätsinformationen

### 4. Sicherheitsfilterung
- Mehrschichtige Filterung für Text- und Bildinhalte
- Erkennung und Ablehnung nicht-gartenbezogener Anfragen
- Umgang mit Prompt-Injection-Versuchen

### 5. Antwortstrukturierung
- Konsistente, leicht verständliche Antwortformate
- Visuelle Elemente zur Verbesserung der Informationsvermittlung
- Handlungsempfehlungen für Nutzer
