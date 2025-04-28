# Algorithmus-Blueprint: Beet-Planungs-Modul

## 1. Übersicht

Dieses Dokument beschreibt einen logikbasierten Algorithmus für die "Beet planen"-Funktion der Urbago-Anwendung. Der Algorithmus ist als Blueprint für die spätere Softwareintegration konzipiert und kann vom Entwicklungsteam implementiert werden.

Der Algorithmus nimmt eine Auswahl von Pflanzen und die Maße eines Beetes entgegen und erzeugt einen optimierten Bepflanzungsplan unter Berücksichtigung von Pflanzenkompatibilität, Platzbedarf, Licht-/Wasserbedürfnissen und Wuchshöhe.

## 2. Algorithmus-Spezifikation

### 2.1 Eingabeparameter

```python
def plan_garden_bed(selected_plants, bed_length, bed_width, orientation="north-south"):
    """
    Erzeugt einen optimierten Bepflanzungsplan für ein Gartenbeet
    
    Args:
        selected_plants: Liste von Pflanzenobjekten aus der Datenbank
        bed_length: Länge des Beetes in Metern
        bed_width: Breite des Beetes in Metern
        orientation: Ausrichtung des Beetes ("north-south" oder "east-west")
    
    Returns:
        Dict: Bepflanzungsplan mit Pflanzenverteilung, Visualisierung und Empfehlungen
    """
```

### 2.2 Algorithmus-Ablauf

Der Algorithmus besteht aus folgenden Hauptschritten:

1. **Vorverarbeitung der Eingabedaten**
2. **Kompatibilitätsanalyse**
3. **Flächenberechnung und Pflanzenanzahl**
4. **Zonierung des Beetes**
5. **Pflanzenplatzierung**
6. **Nachbearbeitung und Optimierung**
7. **Generierung des Bepflanzungsplans**

### 2.3 Detaillierter Algorithmus in Pseudocode

```
FUNKTION plan_garden_bed(selected_plants, bed_length, bed_width, orientation):
    
    # 1. Vorverarbeitung der Eingabedaten
    bed_area = bed_length * bed_width
    validate_input_data(selected_plants, bed_length, bed_width)
    
    # 2. Kompatibilitätsanalyse
    compatibility_matrix = create_compatibility_matrix(selected_plants)
    plant_groups = identify_compatible_plant_groups(compatibility_matrix)
    
    # 3. Flächenberechnung und Pflanzenanzahl
    plant_counts = calculate_optimal_plant_counts(selected_plants, bed_area)
    
    # 4. Zonierung des Beetes
    zones = create_bed_zones(bed_length, bed_width, orientation)
    
    # 5. Pflanzenplatzierung
    placement_map = place_plants_in_zones(plant_groups, plant_counts, zones)
    
    # 6. Nachbearbeitung und Optimierung
    optimized_placement = optimize_placement(placement_map, compatibility_matrix)
    
    # 7. Generierung des Bepflanzungsplans
    planting_plan = generate_planting_plan(optimized_placement, selected_plants, bed_length, bed_width)
    
    RETURN planting_plan
```

## 3. Detaillierte Beschreibung der Algorithmus-Komponenten

### 3.1 Vorverarbeitung der Eingabedaten

```python
def validate_input_data(selected_plants, bed_length, bed_width):
    """
    Validiert die Eingabedaten und wirft Fehler bei ungültigen Werten
    """
    if not selected_plants:
        raise ValueError("Keine Pflanzen ausgewählt")
    
    if bed_length <= 0 or bed_width <= 0:
        raise ValueError("Ungültige Beetmaße")
    
    # Prüfe, ob alle erforderlichen Pflanzendaten vorhanden sind
    required_fields = ["plant_id", "name_de", "plant_spacing", "height", 
                      "water_needs", "light_needs", "companion_score"]
    
    for plant in selected_plants:
        missing_fields = [field for field in required_fields if field not in plant]
        if missing_fields:
            raise ValueError(f"Fehlende Daten für Pflanze {plant.get('name_de', 'Unbekannt')}: {missing_fields}")
```

### 3.2 Kompatibilitätsanalyse

```python
def create_compatibility_matrix(plants):
    """
    Erstellt eine Matrix mit Kompatibilitätswerten zwischen allen Pflanzenpaaren
    """
    n = len(plants)
    matrix = [[0 for _ in range(n)] for _ in range(n)]
    
    for i in range(n):
        for j in range(n):
            if i == j:
                matrix[i][j] = 10  # Maximale Kompatibilität mit sich selbst
            else:
                matrix[i][j] = calculate_compatibility_score(plants[i], plants[j])
    
    return matrix

def calculate_compatibility_score(plant1, plant2):
    """
    Berechnet den Kompatibilitätswert zwischen zwei Pflanzen
    """
    # Standardwert für neutrale Kompatibilität
    score = 5
    
    # Prüfe, ob plant2 in den guten Nachbarn von plant1 ist
    for neighbor in plant1.get("good_neighbors", []):
        if neighbor["plant_id"] == plant2["plant_id"]:
            return neighbor["compatibility_score"]
    
    # Prüfe, ob plant2 in den schlechten Nachbarn von plant1 ist
    for neighbor in plant1.get("bad_neighbors", []):
        if neighbor["plant_id"] == plant2["plant_id"]:
            return neighbor["compatibility_score"]  # Negativer Wert
    
    # Zusätzliche Kompatibilitätsfaktoren
    
    # Ähnliche Wasserbedürfnisse erhöhen die Kompatibilität
    if plant1["water_needs"] == plant2["water_needs"]:
        score += 1
    
    # Unterschiedliche Wuchshöhen können vorteilhaft sein (vertikale Schichtung)
    height_diff = abs(plant1["height"] - plant2["height"])
    if 0.3 <= height_diff <= 1.0:
        score += 1
    
    return score

def identify_compatible_plant_groups(compatibility_matrix):
    """
    Identifiziert Gruppen kompatibler Pflanzen basierend auf der Kompatibilitätsmatrix
    """
    n = len(compatibility_matrix)
    groups = []
    
    # Einfacher Clustering-Algorithmus
    threshold = 6  # Mindestwert für gute Kompatibilität
    
    # Initialisiere jede Pflanze als eigene Gruppe
    remaining = set(range(n))
    
    while remaining:
        # Wähle eine Pflanze als Startpunkt
        current = next(iter(remaining))
        group = {current}
        remaining.remove(current)
        
        # Füge kompatible Pflanzen zur Gruppe hinzu
        changed = True
        while changed:
            changed = False
            for plant in list(remaining):
                # Prüfe Kompatibilität mit allen Pflanzen in der aktuellen Gruppe
                compatible = all(compatibility_matrix[plant][member] >= threshold for member in group)
                if compatible:
                    group.add(plant)
                    remaining.remove(plant)
                    changed = True
        
        groups.append(group)
    
    return groups
```

### 3.3 Flächenberechnung und Pflanzenanzahl

```python
def calculate_optimal_plant_counts(plants, bed_area):
    """
    Berechnet die optimale Anzahl jeder Pflanze basierend auf Platzbedarf und Beetfläche
    """
    # Berechne den Platzbedarf jeder Pflanze
    plant_areas = {}
    for plant in plants:
        # Quadratischer Platzbedarf basierend auf Pflanzabstand
        spacing = plant["plant_spacing"]
        area_per_plant = spacing * spacing
        plant_areas[plant["plant_id"]] = area_per_plant
    
    # Berechne die maximale Anzahl jeder Pflanze, wenn das gesamte Beet nur mit dieser Pflanze bepflanzt würde
    max_counts = {}
    for plant_id, area in plant_areas.items():
        max_counts[plant_id] = int(bed_area / area)
    
    # Verteile den verfügbaren Platz basierend auf Pflanzenpriorität
    # Priorität basiert auf Companion Score und anderen Faktoren
    priorities = {}
    for plant in plants:
        # Höherer Companion Score = höhere Priorität
        priorities[plant["plant_id"]] = plant["companion_score"]
    
    # Normalisiere Prioritäten
    total_priority = sum(priorities.values())
    normalized_priorities = {k: v / total_priority for k, v in priorities.items()}
    
    # Berechne initiale Pflanzenanzahl basierend auf normalisierter Priorität
    initial_counts = {}
    remaining_area = bed_area
    
    for plant in plants:
        plant_id = plant["plant_id"]
        area_per_plant = plant_areas[plant_id]
        priority = normalized_priorities[plant_id]
        
        # Berechne Anzahl basierend auf Priorität und verfügbarer Fläche
        area_for_plant = bed_area * priority
        count = min(int(area_for_plant / area_per_plant), max_counts[plant_id])
        
        initial_counts[plant_id] = count
        remaining_area -= count * area_per_plant
    
    # Verteile verbleibende Fläche auf Pflanzen mit höchster Priorität
    sorted_plants = sorted(plants, key=lambda p: priorities[p["plant_id"]], reverse=True)
    
    for plant in sorted_plants:
        plant_id = plant["plant_id"]
        area_per_plant = plant_areas[plant_id]
        
        additional_count = int(remaining_area / area_per_plant)
        if additional_count > 0:
            initial_counts[plant_id] += additional_count
            remaining_area -= additional_count * area_per_plant
        
        if remaining_area < min(plant_areas.values()):
            break
    
    return initial_counts
```

### 3.4 Zonierung des Beetes

```python
def create_bed_zones(bed_length, bed_width, orientation):
    """
    Teilt das Beet in Zonen basierend auf Lichtbedingungen und anderen Faktoren
    """
    # Definiere Zonen basierend auf Ausrichtung
    if orientation == "north-south":
        # Nord-Süd-Ausrichtung: Höhere Pflanzen im Norden
        zones = [
            {"name": "north", "light": "full_sun", "height_preference": "tall", 
             "x_start": 0, "x_end": bed_length, "y_start": 0, "y_end": bed_width * 0.25},
            {"name": "middle", "light": "full_sun", "height_preference": "medium", 
             "x_start": 0, "x_end": bed_length, "y_start": bed_width * 0.25, "y_end": bed_width * 0.75},
            {"name": "south", "light": "full_sun", "height_preference": "short", 
             "x_start": 0, "x_end": bed_length, "y_start": bed_width * 0.75, "y_end": bed_width}
        ]
    else:  # "east-west"
        # Ost-West-Ausrichtung: Höhere Pflanzen im Westen
        zones = [
            {"name": "west", "light": "full_sun", "height_preference": "tall", 
             "x_start": 0, "x_end": bed_length * 0.25, "y_start": 0, "y_end": bed_width},
            {"name": "middle", "light": "full_sun", "height_preference": "medium", 
             "x_start": bed_length * 0.25, "x_end": bed_length * 0.75, "y_start": 0, "y_end": bed_width},
            {"name": "east", "light": "full_sun", "height_preference": "short", 
             "x_start": bed_length * 0.75, "x_end": bed_length, "y_start": 0, "y_end": bed_width}
        ]
    
    # Berechne Fläche jeder Zone
    for zone in zones:
        zone["area"] = (zone["x_end"] - zone["x_start"]) * (zone["y_end"] - zone["y_start"])
    
    return zones
```

### 3.5 Pflanzenplatzierung

```python
def place_plants_in_zones(plant_groups, plant_counts, zones):
    """
    Platziert Pflanzen in den definierten Zonen basierend auf Kompatibilität und Zoneneigenschaften
    """
    # Kategorisiere Pflanzen nach Höhe
    height_categories = categorize_plants_by_height(plants)
    
    # Initialisiere Platzierungskarte
    placement_map = {zone["name"]: [] for zone in zones}
    
    # Platziere Pflanzen in Zonen basierend auf Höhenpräferenz
    for zone in zones:
        height_pref = zone["height_preference"]
        suitable_plants = height_categories[height_pref]
        
        # Berechne verfügbare Fläche in dieser Zone
        zone_area = zone["area"]
        
        # Platziere Pflanzen aus kompatiblen Gruppen
        for group in plant_groups:
            group_plants = [plants[i] for i in group]
            group_plants = [p for p in group_plants if p in suitable_plants]
            
            if not group_plants:
                continue
            
            # Berechne Anzahl der Pflanzen, die in diese Zone passen
            plants_for_zone = allocate_plants_to_zone(group_plants, plant_counts, zone_area)
            
            # Füge Pflanzen zur Platzierungskarte hinzu
            for plant_id, count in plants_for_zone.items():
                placement_map[zone["name"]].append({
                    "plant_id": plant_id,
                    "count": count
                })
    
    return placement_map

def categorize_plants_by_height(plants):
    """
    Kategorisiert Pflanzen in Höhenkategorien (niedrig, mittel, hoch)
    """
    categories = {
        "short": [],
        "medium": [],
        "tall": []
    }
    
    for plant in plants:
        height = plant["height"]
        
        if height < 0.3:
            categories["short"].append(plant)
        elif height < 1.0:
            categories["medium"].append(plant)
        else:
            categories["tall"].append(plant)
    
    return categories

def allocate_plants_to_zone(plants, plant_counts, zone_area):
    """
    Verteilt Pflanzen auf eine Zone basierend auf verfügbarer Fläche
    """
    allocation = {}
    remaining_area = zone_area
    
    # Sortiere Pflanzen nach Priorität (z.B. Companion Score)
    sorted_plants = sorted(plants, key=lambda p: p["companion_score"], reverse=True)
    
    for plant in sorted_plants:
        plant_id = plant["plant_id"]
        spacing = plant["plant_spacing"]
        area_per_plant = spacing * spacing
        
        # Maximale Anzahl basierend auf verfügbarer Fläche
        max_in_zone = int(remaining_area / area_per_plant)
        
        # Tatsächliche Anzahl ist das Minimum aus max_in_zone und verbleibender Anzahl
        count = min(max_in_zone, plant_counts[plant_id])
        
        if count > 0:
            allocation[plant_id] = count
            plant_counts[plant_id] -= count
            remaining_area -= count * area_per_plant
    
    return allocation
```

### 3.6 Nachbearbeitung und Optimierung

```python
def optimize_placement(placement_map, compatibility_matrix):
    """
    Optimiert die Pflanzenplatzierung basierend auf Kompatibilität und anderen Faktoren
    """
    # Implementiere hier Optimierungsalgorithmen
    # Beispiel: Simulated Annealing, Genetischer Algorithmus, etc.
    
    # Für diesen Blueprint verwenden wir eine vereinfachte Optimierung
    optimized_placement = placement_map.copy()
    
    # Prüfe auf stark inkompatible Pflanzen in benachbarten Zonen
    # und versuche, diese umzuordnen
    
    # Beispiel: Prüfe Pflanzen in benachbarten Zonen
    zone_pairs = [("north", "middle"), ("middle", "south")]
    
    for zone1, zone2 in zone_pairs:
        plants_zone1 = [p["plant_id"] for p in placement_map[zone1]]
        plants_zone2 = [p["plant_id"] for p in placement_map[zone2]]
        
        # Prüfe auf stark inkompatible Pflanzen
        for i, plant1_id in enumerate(plants_zone1):
            for j, plant2_id in enumerate(plants_zone2):
                plant1_idx = next(idx for idx, p in enumerate(plants) if p["plant_id"] == plant1_id)
                plant2_idx = next(idx for idx, p in enumerate(plants) if p["plant_id"] == plant2_id)
                
                compatibility = compatibility_matrix[plant1_idx][plant2_idx]
                
                # Wenn stark inkompatibel, versuche umzuordnen
                if compatibility < 3:
                    # Implementiere Umordnungslogik hier
                    pass
    
    return optimized_placement
```

### 3.7 Generierung des Bepflanzungsplans

```python
def generate_planting_plan(placement_map, plants, bed_length, bed_width):
    """
    Generiert einen detaillierten Bepflanzungsplan basierend auf der optimierten Platzierung
    """
    # Erstelle ein Raster für die visuelle Darstellung
    grid_resolution = 0.1  # 10 cm Auflösung
    grid_length = int(bed_length / grid_resolution)
    grid_width = int(bed_width / grid_resolution)
    
    grid = [[None for _ in range(grid_width)] for _ in range(grid_length)]
    
    # Platziere Pflanzen im Raster
    for zone_name, zone_plants in placement_map.items():
        # Bestimme Zonengrenzen
        zone = next(z for z in zones if z["name"] == zone_name)
        
        x_start = int(zone["x_start"] / grid_resolution)
        x_end = int(zone["x_end"] / grid_resolution)
        y_start = int(zone["y_start"] / grid_resolution)
        y_end = int(zone["y_end"] / grid_resolution)
        
        # Platziere jede Pflanze in der Zone
        for plant_entry in zone_plants:
            plant_id = plant_entry["plant_id"]
            count = plant_entry["count"]
            
            plant = next(p for p in plants if p["plant_id"] == plant_id)
            spacing = plant["plant_spacing"]
            grid_spacing = int(spacing / grid_resolution)
            
            # Berechne mögliche Positionen in der Zone
            positions = []
            for x in range(x_start, x_end, grid_spacing):
                for y in range(y_start, y_end, grid_spacing):
                    if x + grid_spacing <= x_end and y + grid_spacing <= y_end:
                        positions.append((x, y))
            
            # Wähle zufällige Positionen für die Pflanzen
            import random
            random.shuffle(positions)
            
            # Platziere Pflanzen
            for i in range(min(count, len(positions))):
                x, y = positions[i]
                
                # Markiere Bereich um die Pflanze als belegt
                for dx in range(grid_spacing):
                    for dy in range(grid_spacing):
                        if x + dx < grid_length and y + dy < grid_width:
                            grid[x + dx][y + dy] = plant_id
    
    # Erstelle ASCII-Darstellung des Beets
    ascii_grid = create_ascii_grid(grid, plants)
    
    # Erstelle Pflanzenverteilungstabelle
    plant_distribution = []
    for zone_name, zone_plants in placement_map.items():
        for plant_entry in zone_plants:
            plant_id = plant_entry["plant_id"]
            count = plant_entry["count"]
            
            plant = next(p for p in plants if p["plant_id"] == plant_id)
            
            plant_distribution.append({
                "plant_id": plant_id,
                "name": plant["name_de"],
                "count": count,
                "zone": zone_name
            })
    
    # Erstelle Pflege- und Bewässerungshinweise
    care_instructions = create_care_instructions(plants, placement_map)
    
    # Erstelle saisonale Empfehlungen
    seasonal_recommendations = create_seasonal_recommendations(plants)
    
    # Erstelle praktische Tipps
    practical_tips = create_practical_tips(plants, bed_length, bed_width)
    
    # Erstelle den vollständigen Bepflanzungsplan
    planting_plan = {
        "overview": {
            "bed_dimensions": {
                "length": bed_length,
                "width": bed_width,
                "area": bed_length * bed_width
            },
            "total_plants": sum(entry["count"] for zone in placement_map.values() for entry in zone),
            "plant_types": len(set(plant["plant_id"] for plant in plants))
        },
        "plant_distribution": plant_distribution,
        "visual_plan": {
            "ascii_grid": ascii_grid,
            "legend": {plant["plant_id"]: plant["name_de"][0].upper() for plant in plants}
        },
        "care_instructions": care_instructions,
        "seasonal_recommendations": seasonal_recommendations,
        "practical_tips": practical_tips
    }
    
    return planting_plan

def create_ascii_grid(grid, plants):
    """
    Erstellt eine ASCII-Darstellung des Beetplans
    """
    # Erstelle Legende
    legend = {}
    for plant in plants:
        legend[plant["plant_id"]] = plant["name_de"][0].upper()
    
    # Erstelle ASCII-Grid
    ascii_grid = []
    
    # Obere Grenze
    ascii_grid.append("┌" + "─" * (len(grid[0]) * 2 - 1) + "┐")
    
    # Norden-Label
    north_label = "NORDEN"
    padding = (len(grid[0]) * 2 - 1 - len(north_label)) // 2
    ascii_grid.append("│" + " " * padding + north_label + " " * (len(grid[0]) * 2 - 1 - len(north_label) - padding) + "│")
    
    # Trennlinie
    ascii_grid.append("├" + "─" * (len(grid[0]) * 2 - 1) + "┤")
    
    # Hauptraster
    for row in grid:
        line = "│"
        for cell in row:
            if cell is None:
                line += " "
            else:
                line += legend.get(cell, "?")
            line += " "
        line = line[:-1] + "│"  # Entferne letztes Leerzeichen und füge rechte Grenze hinzu
        ascii_grid.append(line)
    
    # Trennlinie
    ascii_grid.append("├" + "─" * (len(grid[0]) * 2 - 1) + "┤")
    
    # Süden-Label
    south_label = "SÜDEN"
    padding = (len(grid[0]) * 2 - 1 - len(south_label)) // 2
    ascii_grid.append("│" + " " * padding + south_label + " " * (len(grid[0]) * 2 - 1 - len(south_label) - padding) + "│")
    
    # Untere Grenze
    ascii_grid.append("└" + "─" * (len(grid[0]) * 2 - 1) + "┘")
    
    return "\n".join(ascii_grid)
```

## 4. Implementierungsbeispiel in Python

Hier ist ein vereinfachtes Implementierungsbeispiel des Algorithmus in Python:

```python
import json
import random
from datetime import datetime

class BedPlanner:
    def __init__(self, plant_database_path):
        """
        Initialisiert den BedPlanner mit einer Pflanzendatenbank
        
        Args:
            plant_database_path: Pfad zur JSON-Datei mit der Pflanzendatenbank
        """
        with open(plant_database_path, 'r', encoding='utf-8') as f:
            self.plant_database = json.load(f)
        
        # Erstelle Index für schnellen Zugriff
        self.plant_index = {plant["plant_id"]: plant for plant in self.plant_database}
    
    def plan_garden_bed(self, selected_plant_ids, bed_length, bed_width, orientation="north-south"):
        """
        Erzeugt einen optimierten Bepflanzungsplan für ein Gartenbeet
        
        Args:
            selected_plant_ids: Liste von Pflanzen-IDs aus der Datenbank
            bed_length: Länge des Beetes in Metern
            bed_width: Breite des Beetes in Metern
            orientation: Ausrichtung des Beetes ("north-south" oder "east-west")
        
        Returns:
            Dict: Bepflanzungsplan mit Pflanzenverteilung, Visualisierung und Empfehlungen
        """
        # 1. Vorverarbeitung der Eingabedaten
        selected_plants = [self.plant_index[pid] for pid in selected_plant_ids if pid in self.plant_index]
        bed_area = bed_length * bed_width
        
        if not selected_plants:
            raise ValueError("Keine gültigen Pflanzen ausgewählt")
        
        # 2. Kompatibilitätsanalyse
        compatibility_matrix = self._create_compatibility_matrix(selected_plants)
        plant_groups = self._identify_compatible_plant_groups(compatibility_matrix, selected_plants)
        
        # 3. Flächenberechnung und Pflanzenanzahl
        plant_counts = self._calculate_optimal_plant_counts(selected_plants, bed_area)
        
        # 4. Zonierung des Beetes
        zones = self._create_bed_zones(bed_length, bed_width, orientation)
        
        # 5. Pflanzenplatzierung
        placement_map = self._place_plants_in_zones(plant_groups, plant_counts, zones, selected_plants)
        
        # 6. Nachbearbeitung und Optimierung
        optimized_placement = self._optimize_placement(placement_map, compatibility_matrix, selected_plants)
        
        # 7. Generierung des Bepflanzungsplans
        planting_plan = self._generate_planting_plan(optimized_placement, selected_plants, bed_length, bed_width, zones)
        
        return planting_plan
    
    def _create_compatibility_matrix(self, plants):
        """
        Erstellt eine Matrix mit Kompatibilitätswerten zwischen allen Pflanzenpaaren
        """
        n = len(plants)
        matrix = [[0 for _ in range(n)] for _ in range(n)]
        
        for i in range(n):
            for j in range(n):
                if i == j:
                    matrix[i][j] = 10  # Maximale Kompatibilität mit sich selbst
                else:
                    matrix[i][j] = self._calculate_compatibility_score(plants[i], plants[j])
        
        return matrix
    
    def _calculate_compatibility_score(self, plant1, plant2):
        """
        Berechnet den Kompatibilitätswert zwischen zwei Pflanzen
        """
        # Implementierung wie im Pseudocode beschrieben
        # ...
        
        return 5  # Standardwert für neutrale Kompatibilität
    
    # Weitere Methoden wie im Pseudocode beschrieben
    # ...
```

## 5. Erweiterungsmöglichkeiten

Der Algorithmus kann in zukünftigen Versionen um folgende Funktionen erweitert werden:

1. **Berücksichtigung von Bodenbedingungen**: Integration von Bodentyp, pH-Wert und Nährstoffbedarf
2. **Saisonale Rotation**: Planung von Fruchtwechsel und Nachpflanzungen über die Saison hinweg
3. **Mikroklima-Analyse**: Berücksichtigung von lokalen Bedingungen wie Schatten durch Gebäude oder Windschutz
4. **3D-Visualisierung**: Erweiterung der visuellen Darstellung um eine 3D-Ansicht des Beetes
5. **Ertragsoptimierung**: Maximierung des Ertrags basierend auf historischen Daten und Nutzerpräferenzen

## 6. Technische Anforderungen

Für die Implementierung des Algorithmus werden folgende technische Komponenten benötigt:

1. **Datenbank-Integration**: Zugriff auf die Pflanzendatenbank mit allen erforderlichen Attributen
2. **Berechnungsmodul**: Implementierung der Algorithmus-Logik in einer serverseitigen Sprache (z.B. Python, Node.js)
3. **API-Endpunkt**: REST-API für die Kommunikation zwischen Frontend und Algorithmus
4. **Visualisierungskomponente**: Frontend-Komponente zur Darstellung des Bepflanzungsplans
5. **Caching-Mechanismus**: Speicherung von Berechnungsergebnissen für häufig verwendete Konfigurationen

## 7. Fazit

Der vorgestellte Algorithmus-Blueprint bietet eine solide Grundlage für die Implementierung der "Beet planen"-Funktion in der Urbago-Anwendung. Er berücksichtigt alle wichtigen Faktoren wie Pflanzenkompatibilität, Platzbedarf, Licht-/Wasserbedürfnisse und Wuchshöhe, um einen optimierten Bepflanzungsplan zu erstellen.

Der modulare Aufbau des Algorithmus ermöglicht eine schrittweise Implementierung und einfache Erweiterung um zusätzliche Funktionen. Die detaillierte Dokumentation und der Pseudocode bieten dem Entwicklungsteam eine klare Anleitung für die Umsetzung.

Mit diesem Algorithmus kann die Urbago-Anwendung urbanen Gärtnern helfen, ihre Beete optimal zu bepflanzen und den Ertrag zu maximieren, während gleichzeitig die Pflanzengesundheit durch Berücksichtigung von Kompatibilitäten gefördert wird.
