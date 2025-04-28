# Urbago MVP AI Gardening Agent

*Developed in multiagent environment with different roles*

![Urbago Logo](/public/images/Urbago_logo_nebeneinander_schwarz.svg)

## 🌱 Was ist Urbago?

Urbago ist dein smarter Begleiter für urbanes Gärtnern! Unser MVP kombiniert einen intelligenten Chatbot mit einer umfangreichen Pflanzendatenbank und innovativer Beetplanung durch Prompt Injection. Wir helfen Stadtgärtnern mit begrenztem Platz, das Beste aus ihren grünen Oasen zu machen.

Der aktuelle MVP ist lokal voll funktionsfähig und bereit für den nächsten Entwicklungsschritt.

## 📋 Inhaltsverzeichnis

- [Installation](#installation)
- [Nutzung](#nutzung)
- [Key Features](#key-features)
- [Architektur](#architektur)
- [Bekannte Einschränkungen](#bekannte-einschränkungen)
- [Roadmap](#roadmap)
- [Team](#team)
- [Lizenz](#lizenz)

## 🛠️ Installation

### Voraussetzungen

- Node.js (v18 oder höher)
- npm/yarn
- Git

### Setup

```bash
# Repository klonen
git clone https://github.com/yourusername/urbago-mvp.git
cd urbago-mvp

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Die Anwendung ist dann unter [http://localhost:3000](http://localhost:3000) verfügbar.

### Umgebungsvariablen

Erstelle eine `.env.local` Datei im Hauptverzeichnis:

```
OPENAI_API_KEY=dein_openai_api_key
```

## 🚀 Nutzung

1. **Starte die Anwendung**: Nach dem Start siehst du die Hauptseite mit dem Urbago-Logo und dem zentralen Suchfeld.

2. **Chatbot-Interaktion**: 
   - Wähle eine Pflanze aus dem Dropdown (z.B. "Tomate")
   - Stelle eine spezifische Frage oder wähle aus den vorgeschlagenen Optionen
   - Der Chatbot antwortet mit strukturierten, hilfreichen Informationen

3. **Beetplanung**:
   - Klicke auf den "Beet planen" Button unten links
   - Folge den Anweisungen zur Erstellung deines Gartenbeetes
   - Erhalte personalisierte Empfehlungen für Pflanzenkombinationen

4. **Pflanzendatenbank**:
   - Zugriff auf die Datenbank über den entsprechenden Button unten links
   - Browse durch Kategorien oder suche nach spezifischen Pflanzen
   - Detaillierte Informationen zu jeder Pflanze abrufen

## ⭐ Key Features

### 1. KI-gesteuerter Chatbot mit Prompt-Injection
Unser Chatbot nutzt fortschrittliche Prompt-Injection-Techniken, um präzise und kontextbezogene Antworten zu liefern. Die Prompts werden dynamisch basierend auf Nutzeranfragen und ausgewählten Pflanzen generiert.

### 2. Label-basiertes Pflanzennavigationssystem
Drei-Ebenen-Navigation (Pflanze > Kategorie > Spezifische Anfrage) für intuitive und strukturierte Interaktion mit dem Chatbot.

### 3. Innovative Beetplanungsfunktion
Nutzer können virtuelle Beete planen und erhalten Empfehlungen für optimale Pflanzenkombinationen, basierend auf Platzanforderungen, Kompatibilität und Wachstumsbedingungen.

### 4. Responsive UI
Das Interface passt sich nahtlos an verschiedene Bildschirmgrößen an - vom Desktop bis zum Smartphone.

## 🏛️ Architektur

### Projektstruktur

```
urbago-mvp/
├── public/                  # Statische Assets
│   ├── data/                # Pflanzendatenbank (CSV)
│   └── images/              # Logos und Bilder
├── src/
│   ├── components/          # React-Komponenten
│   ├── context/             # React Context für globalen State
│   ├── pages/               # Next.js Seiten
│   ├── styles/              # CSS und Styling
│   ├── types/               # TypeScript Typdefinitionen
│   └── utils/               # Hilfsfunktionen
│       └── plantDatabase.ts # Datenbankzugriff
├── docs/                    # Dokumentation
│   ├── prompt_templates/    # Prompt-Templates
│   └── plant_database/      # Datenbankdokumentation
└── README.md                # Diese Datei
```

### Datenbankanbindung

Die Pflanzendatenbank liegt als CSV-Datei unter `/public/data/urbago_plant_database.csv` und wird beim Start der Anwendung geladen. Die Daten werden über den `PlantDatabaseContext` allen Komponenten zur Verfügung gestellt.

```typescript
// Beispiel aus src/utils/plantDatabase.ts
export async function loadPlantDatabase() {
  const response = await fetch('/data/urbago_plant_database.csv');
  const csvData = await response.text();
  // CSV parsing und Datenaufbereitung...
  return parsedData;
}
```

### Prompt Injection Workflow

1. **Template-Auswahl**: Basierend auf Nutzeraktion wird ein Template aus `/docs/prompt_templates/` ausgewählt
2. **Dynamische Anreicherung**: Das Template wird mit Kontextdaten (ausgewählte Pflanze, Kategorie, etc.) angereichert
3. **API-Anfrage**: Der fertige Prompt wird an die OpenAI API gesendet
4. **Antwortverarbeitung**: Die API-Antwort wird formatiert und dem Nutzer präsentiert

```typescript
// Vereinfachtes Beispiel
async function generateResponse(plant, category, question) {
  const template = getPromptTemplate(category);
  const filledPrompt = template
    .replace('{{PLANT}}', plant)
    .replace('{{QUESTION}}', question);
  
  const response = await openai.createCompletion({
    model: "gpt-4",
    prompt: filledPrompt,
    // weitere Parameter...
  });
  
  return response.choices[0].text;
}
```

### API-Integration

Die Kommunikation mit OpenAI erfolgt derzeit direkt über die OpenAI API. Die API-Aufrufe sind in separaten Utility-Funktionen gekapselt, was einen einfachen Austausch des LLM-Providers ermöglicht.

Für MVP 2.0 ist eine Abstraktion geplant, die es ermöglicht, verschiedene Modelle oder einen eigenen Urbago-Agenten einzubinden, ohne den Anwendungscode zu ändern.

## 🐞 Bekannte Einschränkungen

- **AGB**: Aktuell nur Dummy-Implementierung
- **Deployment**: Lokale Funktionalität bestätigt, Vercel-Deployment in Vorbereitung
- **Sicherheit**: Keine Validierung von Bildupload-Funktionen implementiert
- **Datenbank**: Statische CSV-Datei statt dynamischer API-Anbindung
- **Offline-Modus**: Keine Offline-Funktionalität verfügbar

## 🚧 Roadmap

### Entwicklungsstufen

#### Stufe 1: Aktueller MVP
- **Prompt-Injection Simulation** mit eigenem Interface
- **Eigene Testdatenbank** mit 50 Pflanzen
- **Vorgefertigte Prompts** für Antwortgenerierung und Rückgabeformat
- Fokus auf Benutzerfreundlichkeit und Kernfunktionalität

#### Stufe 2: Datenbankintegration
- Migration zu **SQL-Datenbanken** für verbesserte Datenstruktur und -zugriff
- **Selektive Prompt-Injection**: Nur spezifische, relevante Informationen werden den Prompts beigefügt
- Optimierung der Antwortgeschwindigkeit und Datengenauigkeit
- Erweiterte Pflanzendatenbank mit mehr Einträgen und detaillierteren Attributen

#### Stufe 3: Eigenes KI-Modell
- Entwicklung eines **eigenen Urbago-Agenten** oder spezialisierten Modells (z.B. CNN)
- **Spezialisiertes Training** auf Gartenwissen und Pflanzenkompatibilität
- Reduzierte Abhängigkeit von externen KI-Diensten
- Verbesserte Antwortqualität und domänenspezifische Expertise

### Kurzfristig (MVP 1.5)
- Deployment auf Produktivdomain
- Erweiterung der Pflanzendatenbank
- Verbesserung der Chatbot-Antworten

### Mittelfristig (MVP 2.0)
- Integration von Community, Shop und erweitertem Planer
- Sicherer Foto-Upload für Pflanzenidentifikation
- Anbindung an SQL-Datenbank für Echtzeitdaten

### Langfristig (Vision)
- **Eigener Urban Gardening Agent**: Speziell auf Gartenwissen trainiertes Modell
- **RAG-Integration**: Retrieval-Augmented Generation mit SQL-Datenbankanbindung
- **Unabhängigkeit**: Reduzierte Abhängigkeit von Drittanbieter-LLMs
- **Erweiterte Funktionen**: Krankheitserkennung, Ernteprognosen, Saisonkalender

## ✨ Team

Urbago ist das Ergebnis einer kollaborativen Entwicklung in einer Multi-Agenten-Umgebung mit klar definierten Rollen:

- **Projektleitung**: Marius
- **Prompt Engineering**: Elena
- **UX/UI Design**: Maya
- **Entwicklung**: Manus

## 📑 Lizenz

© 2025 Urbago - Alle Rechte vorbehalten

---

*Urbago - Bring deine urbane Oase zum Blühen! 🌱*
