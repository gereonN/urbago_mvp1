# 🪴 Beet planen - GPT-kompatibler Prompt

## Übersicht

Dieses Dokument enthält den vollständigen GPT-kompatiblen Prompt für die neue "Beet planen"-Funktion der Urbago-Anwendung. Diese Funktion ermöglicht es Benutzern, basierend auf ihrer Pflanzenauswahl und den Beetmaßen einen optimierten Bepflanzungsvorschlag zu erhalten.

## 1. Funktionsbeschreibung

Die "Beet planen"-Funktion verarbeitet folgende Benutzereingaben:
- Auswahl mehrerer Pflanzen aus der Datenbank (Checkbox/Symbole)
- Eingabe einer Beetgröße in Länge × Breite (Meter)
- Klick auf Button: "Optimale Bepflanzung ermitteln"

Basierend auf diesen Eingaben generiert die Funktion einen strukturierten Vorschlag zur Beet-Bepflanzung unter Berücksichtigung von:
- Pflanzennachbarschaft (Companion Score)
- Platzbedarf (Spacing)
- Licht-/Wasserbedürfnissen
- Wuchshöhe (z.B. Schattenwirkung)

## 2. GPT-kompatibler Prompt

```
Du bist Urbago, ein freundlicher und hilfreicher Gartenassistent für urbane Gärtner. Deine Aufgabe ist es, einen optimalen Bepflanzungsplan für ein Gartenbeet zu erstellen.

### BENUTZEREINGABEN:

1. Ausgewählte Pflanzen:
{{SELECTED_PLANTS_JSON}}

2. Beetgröße:
- Länge: {{BED_LENGTH}} Meter
- Breite: {{BED_WIDTH}} Meter
- Gesamtfläche: {{BED_AREA}} Quadratmeter

### PFLANZENDATENBANK-AUSZUG:
{{PLANTS_DATA_JSON}}

### DEINE AUFGABE:

Erstelle einen optimalen Bepflanzungsplan für das angegebene Beet unter Berücksichtigung folgender Faktoren:

1. Pflanzenkompatibilität:
   - Platziere Pflanzen mit hohem Companion Score (gute Nachbarn) nebeneinander
   - Halte Pflanzen mit negativem Companion Score (schlechte Nachbarn) voneinander fern
   - Maximiere die Gesamtkompatibilität im Beet

2. Platzbedarf und Abstand:
   - Berücksichtige den benötigten Pflanzabstand jeder Pflanze
   - Stelle sicher, dass die Gesamtfläche des Beetes nicht überschritten wird
   - Berechne die optimale Anzahl jeder Pflanze basierend auf verfügbarem Platz

3. Licht- und Wasserbedürfnisse:
   - Gruppiere Pflanzen mit ähnlichen Wasserbedürfnissen
   - Berücksichtige Lichtbedürfnisse bei der Platzierung (z.B. höhere Pflanzen im Norden)
   - Schlage Bewässerungszonen vor, wenn nötig

4. Wuchshöhe und Schattenwirkung:
   - Platziere höhere Pflanzen so, dass sie kleinere nicht beschatten
   - Nutze Höhenunterschiede für vertikales Gärtnern
   - Berücksichtige den Sonnenverlauf (höhere Pflanzen idealerweise im Norden)

### ANTWORTFORMAT:

Deine Antwort muss folgende Abschnitte enthalten:

1. 📋 **Übersicht des Bepflanzungsplans**:
   - Kurze Zusammenfassung des Plans
   - Gesamtanzahl der Pflanzen
   - Besondere Merkmale des Plans

2. 🌱 **Pflanzenverteilung**:
   - Tabelle mit Pflanzenname, Anzahl und ungefährer Position im Beet
   - Begründung für die Platzierung jeder Pflanze
   - Optimale Pflanzzeit für jede Pflanze

3. 🗺️ **Visueller Beetplan**:
   - Textbasierte Darstellung des Beetplans (ASCII-Art oder ähnliches)
   - Legende zur Erklärung der Symbole
   - Nord-Süd-Ausrichtungsempfehlung

4. 💧 **Pflege- und Bewässerungshinweise**:
   - Gruppierung nach Wasserbedarf
   - Empfehlungen zur Bewässerungshäufigkeit
   - Hinweise zu besonderen Pflegeanforderungen

5. 🌞 **Saisonale Empfehlungen**:
   - Aussaat- und Pflanzkalender
   - Erntezeiten
   - Vorschläge für Nachpflanzungen/Fruchtwechsel

6. 💡 **Praktische Tipps für urbane Gärtner**:
   - 3-5 spezifische Tipps für die Umsetzung des Plans
   - Hinweise zur Optimierung auf begrenztem Raum
   - Mögliche Herausforderungen und Lösungen

Formatiere deine Antwort in HTML mit <h2>, <h3>, <p>, <ul>, <li>, <table>, <tr>, <td> Tags für optimale Darstellung in der App. Verwende passende Emojis für bessere Übersichtlichkeit.

### WICHTIGE HINWEISE:

- Falls die ausgewählten Pflanzen nicht kompatibel sind, schlage Alternativen vor oder teile das Beet in separate Zonen
- Falls zu viele Pflanzen für die Beetgröße ausgewählt wurden, priorisiere basierend auf Kompatibilität und optimaler Flächennutzung
- Falls zu wenige Pflanzen ausgewählt wurden, schlage ergänzende Pflanzen vor, die gut zu den ausgewählten passen
- Berücksichtige die besonderen Herausforderungen urbaner Gärten (begrenzter Platz, möglicherweise eingeschränkte Sonneneinstrahlung)
- Halte die Antwort praktisch, anfängerfreundlich und umsetzbar
```

## 3. Beispiel für Eingabedaten

### 3.1 Beispiel für ausgewählte Pflanzen (SELECTED_PLANTS_JSON)

```json
[
  {
    "plant_id": "tomato_01",
    "name_de": "Tomate",
    "name_en": "Tomato",
    "name_botanical": "Solanum lycopersicum"
  },
  {
    "plant_id": "basil_01",
    "name_de": "Basilikum",
    "name_en": "Basil",
    "name_botanical": "Ocimum basilicum"
  },
  {
    "plant_id": "carrot_01",
    "name_de": "Karotte",
    "name_en": "Carrot",
    "name_botanical": "Daucus carota"
  },
  {
    "plant_id": "lettuce_01",
    "name_de": "Salat",
    "name_en": "Lettuce",
    "name_botanical": "Lactuca sativa"
  }
]
```

### 3.2 Beispiel für Beetmaße

```
BED_LENGTH: 2.5
BED_WIDTH: 1.2
BED_AREA: 3.0
```

### 3.3 Beispiel für Pflanzendatenbank-Auszug (PLANTS_DATA_JSON)

```json
[
  {
    "plant_id": "tomato_01",
    "name_de": "Tomate",
    "name_en": "Tomato",
    "name_botanical": "Solanum lycopersicum",
    "category": "vegetable",
    "plant_spacing": 0.5,
    "height": 1.8,
    "water_needs": "medium",
    "light_needs": "full_sun",
    "companion_score": 8,
    "good_neighbors": [
      {
        "plant_id": "basil_01",
        "benefit": "Verbessert den Geschmack und hält Schädlinge fern",
        "compatibility_score": 9
      },
      {
        "plant_id": "carrot_01",
        "benefit": "Lockert den Boden für Tomatenwurzeln",
        "compatibility_score": 8
      },
      {
        "plant_id": "lettuce_01",
        "benefit": "Gute Bodendecker-Kombination",
        "compatibility_score": 7
      }
    ],
    "bad_neighbors": [
      {
        "plant_id": "potato_01",
        "reason": "Erhöht das Risiko von Kraut- und Knollenfäule",
        "compatibility_score": -8
      }
    ],
    "planting_time": "Apr-Mai",
    "harvest_time": "Jul-Okt"
  },
  {
    "plant_id": "basil_01",
    "name_de": "Basilikum",
    "name_en": "Basil",
    "name_botanical": "Ocimum basilicum",
    "category": "herb",
    "plant_spacing": 0.2,
    "height": 0.4,
    "water_needs": "medium",
    "light_needs": "full_sun",
    "companion_score": 7,
    "good_neighbors": [
      {
        "plant_id": "tomato_01",
        "benefit": "Verbessert den Geschmack und hält Schädlinge fern",
        "compatibility_score": 9
      }
    ],
    "bad_neighbors": [],
    "planting_time": "Mai-Jun",
    "harvest_time": "Jun-Sep"
  },
  {
    "plant_id": "carrot_01",
    "name_de": "Karotte",
    "name_en": "Carrot",
    "name_botanical": "Daucus carota",
    "category": "vegetable",
    "plant_spacing": 0.1,
    "height": 0.3,
    "water_needs": "medium",
    "light_needs": "full_sun",
    "companion_score": 6,
    "good_neighbors": [
      {
        "plant_id": "tomato_01",
        "benefit": "Tomaten schützen vor Möhrenfliege",
        "compatibility_score": 8
      },
      {
        "plant_id": "lettuce_01",
        "benefit": "Gute Platznutzung durch unterschiedliche Wurzeltiefen",
        "compatibility_score": 7
      }
    ],
    "bad_neighbors": [],
    "planting_time": "Mär-Jul",
    "harvest_time": "Jun-Okt"
  },
  {
    "plant_id": "lettuce_01",
    "name_de": "Salat",
    "name_en": "Lettuce",
    "name_botanical": "Lactuca sativa",
    "category": "vegetable",
    "plant_spacing": 0.25,
    "height": 0.2,
    "water_needs": "high",
    "light_needs": "partial_shade",
    "companion_score": 5,
    "good_neighbors": [
      {
        "plant_id": "carrot_01",
        "benefit": "Gute Platznutzung durch unterschiedliche Wurzeltiefen",
        "compatibility_score": 7
      },
      {
        "plant_id": "tomato_01",
        "benefit": "Tomaten bieten leichten Schatten für Salat",
        "compatibility_score": 7
      }
    ],
    "bad_neighbors": [],
    "planting_time": "Mär-Aug",
    "harvest_time": "Mai-Okt"
  }
]
```

## 4. Implementierung der dynamischen Prompt-Generierung

Die folgende Python-Funktion zeigt, wie der Prompt dynamisch mit Daten aus der Datenbank und den Benutzereingaben gefüllt werden kann:

```python
def generate_bed_planning_prompt(selected_plant_ids, bed_length, bed_width):
    """
    Generiert einen optimierten Prompt für die Beet-Planungsfunktion
    
    Args:
        selected_plant_ids: Liste der IDs der ausgewählten Pflanzen
        bed_length: Länge des Beetes in Metern
        bed_width: Breite des Beetes in Metern
    
    Returns:
        String: Vollständiger Prompt für die ChatGPT-API
    """
    # Berechne Beetfläche
    bed_area = round(bed_length * bed_width, 2)
    
    # Hole Daten der ausgewählten Pflanzen
    selected_plants = []
    plants_data = []
    
    for plant_id in selected_plant_ids:
        plant_data = get_plant_data(plant_id)
        
        # Kurzversion für die Auswahlliste
        selected_plants.append({
            "plant_id": plant_id,
            "name_de": plant_data["name_de"],
            "name_en": plant_data["name_en"],
            "name_botanical": plant_data["name_botanical"]
        })
        
        # Vollständige Daten für die Planung
        plants_data.append(plant_data)
    
    # Lade Basis-Prompt-Template
    with open("templates/bed_planning_prompt.txt", "r") as f:
        prompt_template = f.read()
    
    # Fülle Template mit Daten
    prompt = prompt_template.replace("{{SELECTED_PLANTS_JSON}}", json.dumps(selected_plants, ensure_ascii=False, indent=2))
    prompt = prompt.replace("{{BED_LENGTH}}", str(bed_length))
    prompt = prompt.replace("{{BED_WIDTH}}", str(bed_width))
    prompt = prompt.replace("{{BED_AREA}}", str(bed_area))
    prompt = prompt.replace("{{PLANTS_DATA_JSON}}", json.dumps(plants_data, ensure_ascii=False, indent=2))
    
    return prompt
```

## 5. Beispiel für eine API-Anfrage

```python
import openai

def get_bed_planning_recommendation(selected_plant_ids, bed_length, bed_width):
    """
    Sendet eine Anfrage an die ChatGPT-API für einen Beet-Planungsvorschlag
    
    Args:
        selected_plant_ids: Liste der IDs der ausgewählten Pflanzen
        bed_length: Länge des Beetes in Metern
        bed_width: Breite des Beetes in Metern
    
    Returns:
        String: Formatierte HTML-Antwort mit dem Bepflanzungsvorschlag
    """
    # Generiere den Prompt
    prompt = generate_bed_planning_prompt(selected_plant_ids, bed_length, bed_width)
    
    # Sende Anfrage an die API
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": "Erstelle einen optimalen Bepflanzungsplan für mein Beet."}
        ],
        temperature=0.7,
        max_tokens=2000
    )
    
    # Extrahiere und validiere die Antwort
    bed_plan_html = response.choices[0].message.content
    
    # Optional: HTML-Validierung und -Korrektur
    validated_html = validate_and_correct_html(bed_plan_html)
    
    return validated_html
```

## 6. Erwartetes Antwortformat

Die Antwort von ChatGPT wird in HTML formatiert sein und folgende Abschnitte enthalten:

1. **Übersicht des Bepflanzungsplans**
2. **Pflanzenverteilung**
3. **Visueller Beetplan**
4. **Pflege- und Bewässerungshinweise**
5. **Saisonale Empfehlungen**
6. **Praktische Tipps für urbane Gärtner**

Beispiel für den visuellen Beetplan (ASCII-Art):

```
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

Legende:
T = Tomate
B = Basilikum
C = Karotte
L = Salat
```

## 7. Fehlerbehandlung und Fallbacks

Der Prompt enthält Anweisungen für verschiedene Szenarien:

1. **Inkompatible Pflanzen**: Vorschlag von Alternativen oder Aufteilung des Beetes in separate Zonen
2. **Zu viele Pflanzen**: Priorisierung basierend auf Kompatibilität und optimaler Flächennutzung
3. **Zu wenige Pflanzen**: Vorschlag ergänzender Pflanzen, die gut zu den ausgewählten passen
4. **Besondere Herausforderungen urbaner Gärten**: Berücksichtigung von begrenztem Platz und möglicherweise eingeschränkter Sonneneinstrahlung

## 8. Fazit

Der entwickelte GPT-kompatible Prompt für die "Beet planen"-Funktion ermöglicht es Benutzern, basierend auf ihrer Pflanzenauswahl und den Beetmaßen einen optimierten Bepflanzungsvorschlag zu erhalten. Der Prompt berücksichtigt Pflanzenkompatibilität, Platzbedarf, Licht-/Wasserbedürfnisse und Wuchshöhe, um einen praktischen und anfängerfreundlichen Bepflanzungsplan zu erstellen.

Die Antwort wird in einem strukturierten HTML-Format mit klaren Abschnitten und visuellen Elementen präsentiert, was die Benutzerfreundlichkeit erhöht und die Umsetzung des Plans erleichtert.

Der Prompt ist flexibel und kann mit verschiedenen Pflanzen und Beetgrößen verwendet werden, was ihn zu einem wertvollen Werkzeug für urbane Gärtner macht.
