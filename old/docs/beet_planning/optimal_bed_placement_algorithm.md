# Optimaler Beetplatzierungs-Algorithmus für Urbago

## Übersicht
Dieser Algorithmus ermöglicht die Berechnung optimaler Pflanzenpositionen in einem Gartenbeet basierend auf Pflanzenkompatibilität, räumlichen Anforderungen und Umweltfaktoren. Er ist speziell für urbane Gärten konzipiert, wo der Platz begrenzt ist und die Effizienz maximiert werden muss.

## Algorithmus-Design

### 1. Eingabeparameter

```json
{
  "bed": {
    "dimensions": {
      "width_cm": 120,
      "length_cm": 240,
      "orientation": "north_south" // oder "east_west"
    },
    "type": "raised_bed", // oder "ground_bed", "container", "balcony_box"
    "soil_type": "loamy", // oder "sandy", "clay", "mixed"
    "sun_exposure": "full_sun" // oder "partial_shade", "shade"
  },
  "selected_plants": [
    {
      "plant_id": "tomato_01",
      "quantity": 2
    },
    {
      "plant_id": "basil_01",
      "quantity": 4
    },
    {
      "plant_id": "carrot_01",
      "quantity": 20
    }
    // weitere gewünschte Pflanzen
  ],
  "constraints": {
    "fixed_positions": [
      {
        "plant_id": "tomato_01",
        "position": {
          "x": 60,
          "y": 30
        }
      }
    ],
    "excluded_areas": [
      {
        "x1": 0,
        "y1": 0,
        "x2": 30,
        "y2": 30
      }
    ]
  }
}
```

### 2. Kompatibilitätsmatrix-Berechnung

Der Algorithmus erstellt zunächst eine Kompatibilitätsmatrix für alle ausgewählten Pflanzen:

```python
def create_compatibility_matrix(selected_plants, plant_database):
    plant_ids = [p["plant_id"] for p in selected_plants]
    matrix = {}
    
    for plant_id in plant_ids:
        matrix[plant_id] = {}
        plant_data = get_plant_from_database(plant_id, plant_database)
        
        for other_id in plant_ids:
            if plant_id == other_id:
                matrix[plant_id][other_id] = 0  # Neutrale Selbstkompatibilität
                continue
                
            # Prüfe, ob die andere Pflanze ein guter Nachbar ist
            score = 0
            for neighbor in plant_data["companion_planting"]["good_neighbors"]:
                if neighbor["plant_id"] == other_id:
                    score = neighbor["compatibility_score"]
                    break
            
            # Prüfe, ob die andere Pflanze ein schlechter Nachbar ist
            for neighbor in plant_data["companion_planting"]["bad_neighbors"]:
                if neighbor["plant_id"] == other_id:
                    score = neighbor["compatibility_score"]  # Negative Werte für schlechte Nachbarn
                    break
            
            matrix[plant_id][other_id] = score
    
    return matrix
```

### 3. Räumliche Anforderungen

Für jede Pflanze werden die räumlichen Anforderungen aus der Datenbank extrahiert:

```python
def get_spatial_requirements(plant_id, plant_database):
    plant_data = get_plant_from_database(plant_id, plant_database)
    return {
        "optimal_distance_cm": plant_data["companion_planting"]["spatial_arrangement"]["optimal_distance_cm"],
        "pattern": plant_data["companion_planting"]["spatial_arrangement"]["recommended_pattern"],
        "plants_per_sqm": plant_data["companion_planting"]["spatial_arrangement"]["plants_per_sqm"],
        "height_max": plant_data["growing_properties"]["height_cm"]["max"]
    }
```

### 4. Positionsoptimierung

Der Kern des Algorithmus verwendet eine Kombination aus Rasterbasierter Platzierung und Optimierungstechniken:

#### 4.1 Rastererzeugung

```python
def create_grid(bed_dimensions, grid_size=10):
    """Erzeugt ein Raster mit Zellen der Größe grid_size x grid_size cm"""
    width_cells = bed_dimensions["width_cm"] // grid_size
    length_cells = bed_dimensions["length_cm"] // grid_size
    
    grid = []
    for y in range(length_cells):
        row = []
        for x in range(width_cells):
            row.append({
                "position": {"x": x * grid_size, "y": y * grid_size},
                "occupied": False,
                "plant_id": None,
                "compatibility_score": 0
            })
        grid.append(row)
    
    return grid
```

#### 4.2 Höhenbasierte Sortierung

```python
def sort_plants_by_height(selected_plants, plant_database):
    """Sortiert Pflanzen nach Höhe, höchste zuerst"""
    plants_with_height = []
    
    for plant_selection in selected_plants:
        plant_id = plant_selection["plant_id"]
        plant_data = get_plant_from_database(plant_id, plant_database)
        max_height = plant_data["growing_properties"]["height_cm"]["max"]
        
        plants_with_height.append({
            "plant_id": plant_id,
            "quantity": plant_selection["quantity"],
            "height": max_height
        })
    
    return sorted(plants_with_height, key=lambda p: p["height"], reverse=True)
```

#### 4.3 Platzierungsalgorithmus

```python
def place_plants(sorted_plants, grid, compatibility_matrix, plant_database, bed_dimensions):
    """Platziert Pflanzen optimal im Raster"""
    placements = []
    
    # Platziere zuerst die höchsten Pflanzen im Norden (bei Nord-Süd-Ausrichtung)
    # oder im Osten (bei Ost-West-Ausrichtung)
    for plant in sorted_plants:
        plant_id = plant["plant_id"]
        quantity = plant["quantity"]
        spatial_req = get_spatial_requirements(plant_id, plant_database)
        
        for i in range(quantity):
            best_position = find_best_position(plant_id, grid, compatibility_matrix, 
                                              spatial_req, placements, bed_dimensions)
            
            if best_position:
                mark_as_occupied(grid, best_position, plant_id, spatial_req)
                placements.append({
                    "plant_id": plant_id,
                    "position": best_position
                })
    
    return placements
```

#### 4.4 Bewertungsfunktion für Positionen

```python
def evaluate_position(position, plant_id, grid, compatibility_matrix, spatial_req, placements):
    """Bewertet eine potenzielle Position für eine Pflanze"""
    score = 0
    
    # Prüfe Kompatibilität mit bereits platzierten Pflanzen
    for placement in placements:
        other_id = placement["plant_id"]
        other_pos = placement["position"]
        
        # Berechne Abstand
        distance = calculate_distance(position, other_pos)
        
        # Wenn Pflanzen zu nah aneinander sind, reduziere den Score
        min_distance = spatial_req["optimal_distance_cm"]
        if distance < min_distance:
            score -= 100  # Starke Abwertung für zu geringen Abstand
        else:
            # Bewerte basierend auf Kompatibilität
            compatibility = compatibility_matrix[plant_id][other_id]
            
            # Gewichte Kompatibilität basierend auf Abstand
            distance_factor = min(1.0, min_distance / distance) if distance > 0 else 0
            weighted_compatibility = compatibility * distance_factor
            
            score += weighted_compatibility
    
    # Berücksichtige Beetrand (Pflanzen sollten nicht zu nah am Rand sein)
    edge_distance = min(
        position["x"], 
        position["y"], 
        bed_dimensions["width_cm"] - position["x"],
        bed_dimensions["length_cm"] - position["y"]
    )
    
    if edge_distance < 10:  # 10 cm Mindestabstand zum Rand
        score -= 50
    
    # Berücksichtige Sonneneinstrahlung (Norden/Süden)
    if bed_dimensions["orientation"] == "north_south":
        # Höhere Pflanzen sollten im Norden stehen
        if spatial_req["height_max"] > 100:  # Hohe Pflanzen
            north_preference = position["y"] / bed_dimensions["length_cm"]  # 0 im Süden, 1 im Norden
            score += north_preference * 30
    
    return score
```

### 5. Ausgabeformat

```json
{
  "bed_layout": {
    "dimensions": {
      "width_cm": 120,
      "length_cm": 240
    },
    "placements": [
      {
        "plant_id": "tomato_01",
        "position": {
          "x": 60,
          "y": 30
        }
      },
      {
        "plant_id": "basil_01",
        "position": {
          "x": 40,
          "y": 30
        }
      },
      // weitere Platzierungen
    ]
  },
  "compatibility_summary": {
    "overall_score": 85,
    "potential_issues": [
      {
        "plants": ["tomato_01", "potato_01"],
        "issue": "Schlechte Nachbarn: Erhöht das Risiko von Kraut- und Knollenfäule",
        "severity": "high"
      }
    ],
    "positive_combinations": [
      {
        "plants": ["tomato_01", "basil_01"],
        "benefit": "Basilikum verbessert den Geschmack der Tomaten und hält Schädlinge fern"
      }
    ]
  },
  "planting_instructions": [
    {
      "plant_id": "tomato_01",
      "spacing": "50 cm",
      "special_notes": "Stütze oder Rankhilfe anbringen"
    }
    // weitere Anweisungen
  ]
}
```

## Implementierung für GPT-Prompt-Injection

Für die Verwendung in GPT-Prompts kann der Algorithmus vereinfacht werden:

```
Wenn der Benutzer nach einer optimalen Beetbepflanzung fragt:

1. Identifiziere die gewünschten Pflanzen und die Beetgröße
2. Prüfe die Kompatibilitätstabelle für gute und schlechte Nachbarn
3. Berücksichtige diese Grundregeln:
   - Hohe Pflanzen (Tomaten, Mais) im Norden, niedrige im Süden
   - Pflanzen mit ähnlichem Wasserbedarf gruppieren
   - Starke Nährstoffzehrer nicht neben andere starke Zehrer setzen
   - Mindestabstände zwischen Pflanzen einhalten
   - Gute Nachbarn nebeneinander platzieren
   - Schlechte Nachbarn weit voneinander entfernt halten
4. Erstelle einen visuellen Plan mit Symbolen oder ASCII-Art
5. Gib Pflanztipps und Hinweise zu besonderen Kombinationen

Beispiel für ein kleines Beet (1m x 2m):
```

## Visuelle Darstellung

Für die Frontend-Implementierung empfehlen wir:

1. **Interaktive Drag-and-Drop-Oberfläche**
   - Benutzer können Pflanzen auswählen und ins Beet ziehen
   - Echtzeit-Feedback zur Kompatibilität

2. **Farbcodierung**
   - Grün: Gute Nachbarn
   - Rot: Schlechte Nachbarn
   - Gelb: Neutrale Beziehung

3. **Automatische Optimierung**
   - Button "Optimieren" berechnet die beste Anordnung
   - Benutzer kann manuelle Anpassungen vornehmen

4. **Exportfunktionen**
   - PDF-Export des Beetplans
   - Einkaufsliste mit Pflanzenmengen
   - Pflegekalender basierend auf den gewählten Pflanzen

## Beispiel: Optimiertes 2m x 1m Hochbeet

```
NORDEN
|----------------------------------|
|    🍅     🍅     🌿     🌿      |
|  Tomate  Tomate  Basilikum Basil.|
|                                  |
|    🥕     🥕     🥕     🥕      |
|  Karotte Karotte Karotte Karotte |
|                                  |
|    🥒           🥬     🥬      |
|  Gurke         Salat   Salat    |
|----------------------------------|
SÜDEN

Legende:
🍅 = Tomate (Abstand: 50cm)
🌿 = Basilikum (Abstand: 20cm)
🥕 = Karotte (Abstand: 5cm, in Reihen)
🥒 = Gurke (Abstand: 40cm)
🥬 = Salat (Abstand: 25cm)

Kompatibilitätshinweise:
✅ Tomate + Basilikum: Perfekte Kombination
✅ Karotte + Zwiebel: Hält Schädlinge fern
❌ Tomate + Kartoffel: Nicht zusammen pflanzen!
```

## Erweiterungsmöglichkeiten

1. **Saisonale Rotation**
   - Berücksichtigung von Vor- und Nachkultur
   - Mehrjährige Beetplanung

2. **Mikroklima-Faktoren**
   - Einbeziehung von Schatten durch Gebäude/Mauern
   - Windrichtung und -schutz

3. **Wassermanagement**
   - Gruppierung nach Wasserbedarf
   - Optimierung der Bewässerungszonen

4. **3D-Visualisierung**
   - Darstellung des Beetes im Wachstumsverlauf
   - Vorschau der erwarteten Ernte

## Technische Implementierung

Der Algorithmus kann in verschiedenen Programmiersprachen implementiert werden:

1. **Python** für Backend-Berechnungen und Datenverarbeitung
2. **JavaScript** für Frontend-Visualisierung und Benutzerinteraktion
3. **GPT-Prompt-Engineering** für die natürlichsprachliche Interaktion

### Python-Implementierungsbeispiel (Pseudocode)

```python
class BedOptimizer:
    def __init__(self, plant_database):
        self.plant_database = plant_database
    
    def optimize(self, bed_config, selected_plants, constraints=None):
        # 1. Erstelle Kompatibilitätsmatrix
        matrix = self._create_compatibility_matrix(selected_plants)
        
        # 2. Sortiere Pflanzen nach Höhe
        sorted_plants = self._sort_plants_by_height(selected_plants)
        
        # 3. Erstelle Raster
        grid = self._create_grid(bed_config["dimensions"])
        
        # 4. Wende Constraints an (fixierte Positionen, ausgeschlossene Bereiche)
        if constraints:
            self._apply_constraints(grid, constraints)
        
        # 5. Platziere Pflanzen
        placements = self._place_plants(sorted_plants, grid, matrix, bed_config)
        
        # 6. Erstelle Zusammenfassung und Anweisungen
        summary = self._create_summary(placements, matrix)
        instructions = self._create_planting_instructions(placements)
        
        # 7. Erstelle Ausgabe
        return {
            "bed_layout": {
                "dimensions": bed_config["dimensions"],
                "placements": placements
            },
            "compatibility_summary": summary,
            "planting_instructions": instructions
        }
    
    # Hilfsmethoden hier implementieren...
```

## Fazit

Der vorgestellte Algorithmus zur optimalen Beetplatzierung bietet eine umfassende Lösung für urbane Gärtner, die den begrenzten Platz optimal nutzen möchten. Durch die Berücksichtigung von Pflanzenkompatibilität, räumlichen Anforderungen und Umweltfaktoren ermöglicht er eine wissenschaftlich fundierte Gartenplanung, die zu gesünderen Pflanzen und höheren Erträgen führt.

Die modulare Struktur erlaubt eine einfache Integration in die Urbago-Anwendung, sowohl als Backend-Berechnungstool als auch als Grundlage für GPT-Prompt-Injections zur natürlichsprachlichen Interaktion mit Benutzern.
