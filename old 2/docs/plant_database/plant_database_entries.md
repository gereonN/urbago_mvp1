# Pflanzendatenbank für Urbago - Beispieleinträge

## Übersicht
Dieses Dokument enthält die ersten 5 Beispieleinträge für die Urbago-Pflanzendatenbank im JSON-Format. Die Struktur ist optimiert für:
1. Prompt-Injection in GPT-Modelle
2. Visuelle Darstellung im Frontend
3. Berechnung optimaler Beetplatzierungen
4. Kompatibilitätsanalyse mit Nachbarpflanzen

## JSON-Datenbank (Beispieleinträge)

```json
{
  "plants": [
    {
      "id": "tomato_01",
      "name": {
        "de": "Tomate",
        "en": "Tomato",
        "botanical": "Solanum lycopersicum"
      },
      "category": {
        "primary": "fruit_vegetables",
        "secondary": "nightshade",
        "tags": ["beginner_friendly", "container_suitable", "balcony_favorite"]
      },
      "plant_family": "Solanaceae",
      "description": {
        "de": "Die Tomate ist eine der beliebtesten Gemüsesorten für den Anbau in deutschen Stadtgärten. Sie bietet vielfältige Sorten mit unterschiedlichen Größen, Farben und Geschmacksrichtungen.",
        "en": "The tomato is one of the most popular vegetables for cultivation in German urban gardens. It offers diverse varieties with different sizes, colors, and flavors."
      },
      "growing_properties": {
        "water_needs": "medium",
        "light_needs": "full_sun",
        "soil_type": "loamy",
        "ph_preference": {
          "min": 6.0,
          "max": 7.0
        },
        "height_cm": {
          "min": 60,
          "max": 200
        },
        "spacing_cm": 50,
        "container_suitable": true,
        "indoor_suitable": false,
        "difficulty_level": 3
      },
      "seasonal_info": {
        "sowing_time": [
          {
            "month": 2,
            "method": "indoor"
          },
          {
            "month": 3,
            "method": "indoor"
          },
          {
            "month": 4,
            "method": "indoor"
          }
        ],
        "planting_time": [5, 6],
        "harvest_time": [7, 8, 9, 10],
        "perennial": false,
        "days_to_germination": {
          "min": 6,
          "max": 14
        },
        "days_to_harvest": {
          "min": 60,
          "max": 100
        }
      },
      "companion_planting": {
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
            "plant_id": "onion_01",
            "benefit": "Hält Schädlinge fern und wirkt fungizid",
            "compatibility_score": 7
          },
          {
            "plant_id": "parsley_01",
            "benefit": "Lockt nützliche Insekten an",
            "compatibility_score": 7
          },
          {
            "plant_id": "spinach_01",
            "benefit": "Gute Bodendecker-Kombination",
            "compatibility_score": 6
          },
          {
            "plant_id": "celery_01",
            "benefit": "Gute Nachbarschaft",
            "compatibility_score": 6
          },
          {
            "plant_id": "lettuce_01",
            "benefit": "Gute Bodendecker-Kombination",
            "compatibility_score": 5
          }
        ],
        "bad_neighbors": [
          {
            "plant_id": "potato_01",
            "reason": "Erhöht das Risiko von Kraut- und Knollenfäule",
            "compatibility_score": -8
          },
          {
            "plant_id": "fennel_01",
            "reason": "Hemmt das Wachstum der Tomate",
            "compatibility_score": -7
          },
          {
            "plant_id": "cabbage_01",
            "reason": "Konkurrenz um Nährstoffe",
            "compatibility_score": -6
          },
          {
            "plant_id": "beetroot_01",
            "reason": "Ungünstige Kombination laut Mischkulturtabelle",
            "compatibility_score": -5
          },
          {
            "plant_id": "cucumber_01",
            "reason": "Ungünstige Kombination laut Mischkulturtabelle",
            "compatibility_score": -4
          }
        ],
        "companion_score": 8,
        "spatial_arrangement": {
          "optimal_distance_cm": 60,
          "recommended_pattern": "row",
          "plants_per_sqm": 4
        }
      },
      "care_instructions": {
        "watering": "Regelmäßig gießen, aber Staunässe vermeiden. Besonders in Trockenperioden auf gleichmäßige Feuchtigkeit achten.",
        "fertilizing": "Alle 2-3 Wochen mit Tomatendünger versorgen, beginnend wenn die ersten Früchte ansetzen.",
        "pruning": "Regelmäßig ausgeizen (Seitentriebe entfernen) und bei Bedarf aufbinden.",
        "pest_control": "Auf Blattläuse und Weiße Fliege achten. Vorbeugend mit Brennnesseljauche behandeln.",
        "special_care": "Eine Mulchschicht aus Stroh oder Grasschnitt hält den Boden feucht und verhindert, dass Erde auf die unteren Blätter spritzt."
      },
      "harvesting": {
        "instructions": "Tomaten ernten, wenn sie voll ausgefärbt sind. Leicht am Stiel drehen und ziehen.",
        "storage": "Bei Zimmertemperatur lagern, nicht im Kühlschrank. Haltbarkeit ca. 1-2 Wochen.",
        "yield_info": "Eine gesunde Pflanze kann 3-5 kg Tomaten produzieren."
      },
      "culinary_use": {
        "edible_parts": ["Früchte"],
        "cooking_methods": ["Roh", "Kochen", "Braten", "Grillen"],
        "flavor_profile": "Süß-säuerlich mit umami Noten",
        "nutritional_highlights": ["Reich an Vitamin C", "Gute Quelle für Lycopin", "Enthält Antioxidantien"]
      },
      "visual_attributes": {
        "color_category": "red",
        "icon_url": "https://example.com/icons/tomato.svg",
        "image_url": "https://example.com/images/tomato.jpg"
      },
      "sources": [
        {
          "name": "Permapeople",
          "url": "https://permapeople.org/plants/solanum-lycopersicum-tomato"
        },
        {
          "name": "Gartengemüsekiosk",
          "url": "https://www.gartengemuesekiosk.de"
        },
        {
          "name": "Mischkulturtabelle",
          "url": "Bildschirmfoto 2025-04-14 um 16.58.33.png"
        }
      ]
    },
    {
      "id": "basil_01",
      "name": {
        "de": "Basilikum",
        "en": "Basil",
        "botanical": "Ocimum basilicum"
      },
      "category": {
        "primary": "herbs",
        "secondary": "annual_herbs",
        "tags": ["beginner_friendly", "container_suitable", "kitchen_herb", "mediterranean"]
      },
      "plant_family": "Lamiaceae",
      "description": {
        "de": "Basilikum ist ein aromatisches Kraut mit süßlich-würzigem Geschmack, das besonders gut zu Tomaten passt. Es ist ein Muss für jeden Küchengarten und gedeiht auch auf Balkonen und Fensterbänken.",
        "en": "Basil is an aromatic herb with a sweet and spicy flavor that pairs particularly well with tomatoes. It's a must-have for any kitchen garden and thrives on balconies and windowsills."
      },
      "growing_properties": {
        "water_needs": "medium",
        "light_needs": "full_sun",
        "soil_type": "well-draining",
        "ph_preference": {
          "min": 6.0,
          "max": 7.5
        },
        "height_cm": {
          "min": 20,
          "max": 60
        },
        "spacing_cm": 20,
        "container_suitable": true,
        "indoor_suitable": true,
        "difficulty_level": 2
      },
      "seasonal_info": {
        "sowing_time": [
          {
            "month": 3,
            "method": "indoor"
          },
          {
            "month": 4,
            "method": "indoor"
          },
          {
            "month": 5,
            "method": "both"
          }
        ],
        "planting_time": [5, 6],
        "harvest_time": [6, 7, 8, 9],
        "perennial": false,
        "days_to_germination": {
          "min": 5,
          "max": 10
        },
        "days_to_harvest": {
          "min": 30,
          "max": 60
        }
      },
      "companion_planting": {
        "good_neighbors": [
          {
            "plant_id": "tomato_01",
            "benefit": "Verbessert den Geschmack der Tomaten und hält Schädlinge fern",
            "compatibility_score": 9
          },
          {
            "plant_id": "pepper_01",
            "benefit": "Gute Nachbarschaft, ähnliche Wachstumsbedingungen",
            "compatibility_score": 7
          },
          {
            "plant_id": "parsley_01",
            "benefit": "Gute Kräuterkombination",
            "compatibility_score": 6
          }
        ],
        "bad_neighbors": [
          {
            "plant_id": "rue_01",
            "reason": "Wachstumshemmung",
            "compatibility_score": -6
          }
        ],
        "companion_score": 8,
        "spatial_arrangement": {
          "optimal_distance_cm": 20,
          "recommended_pattern": "cluster",
          "plants_per_sqm": 16
        }
      },
      "care_instructions": {
        "watering": "Regelmäßig gießen, aber Staunässe vermeiden. Basilikum mag es feucht, aber nicht nass.",
        "fertilizing": "Sparsam düngen, alle 4-6 Wochen mit Kräuterdünger.",
        "pruning": "Regelmäßig ernten, um buschiges Wachstum zu fördern. Blütenstände entfernen.",
        "pest_control": "Auf Blattläuse und Spinnmilben achten. Bei Befall mit Seifenlauge behandeln.",
        "special_care": "Vor Kälte und Zugluft schützen. Basilikum ist sehr kälteempfindlich."
      },
      "harvesting": {
        "instructions": "Junge Blätter und Triebspitzen ernten. Am besten morgens ernten, wenn die ätherischen Öle am konzentriertesten sind.",
        "storage": "Frisch verwenden oder einfrieren. Getrocknet verliert es viel Aroma.",
        "yield_info": "Eine gesunde Pflanze kann über die Saison mehrfach beerntet werden."
      },
      "culinary_use": {
        "edible_parts": ["Blätter", "Blüten"],
        "cooking_methods": ["Roh", "Kurz mitgekocht"],
        "flavor_profile": "Süßlich-würzig mit Anklängen von Anis und Nelke",
        "nutritional_highlights": ["Reich an ätherischen Ölen", "Enthält Vitamin K", "Antioxidative Eigenschaften"]
      },
      "visual_attributes": {
        "color_category": "green",
        "icon_url": "https://example.com/icons/basil.svg",
        "image_url": "https://example.com/images/basil.jpg"
      },
      "sources": [
        {
          "name": "Permapeople",
          "url": "https://permapeople.org"
        },
        {
          "name": "Mischkulturtabelle",
          "url": "Bildschirmfoto 2025-04-14 um 16.58.33.png"
        }
      ]
    },
    {
      "id": "carrot_01",
      "name": {
        "de": "Karotte",
        "en": "Carrot",
        "botanical": "Daucus carota subsp. sativus"
      },
      "category": {
        "primary": "root_vegetables",
        "secondary": "umbellifers",
        "tags": ["beginner_friendly", "container_suitable", "children_friendly"]
      },
      "plant_family": "Apiaceae",
      "description": {
        "de": "Karotten sind beliebte Wurzelgemüse, die in verschiedenen Größen und Farben erhältlich sind. Sie sind relativ einfach anzubauen und eignen sich gut für den urbanen Gartenbau, auch in tieferen Töpfen oder Hochbeeten.",
        "en": "Carrots are popular root vegetables available in various sizes and colors. They are relatively easy to grow and well-suited for urban gardening, including in deeper pots or raised beds."
      },
      "growing_properties": {
        "water_needs": "medium",
        "light_needs": "full_sun",
        "soil_type": "sandy_loam",
        "ph_preference": {
          "min": 6.0,
          "max": 7.0
        },
        "height_cm": {
          "min": 20,
          "max": 40
        },
        "spacing_cm": 5,
        "container_suitable": true,
        "indoor_suitable": false,
        "difficulty_level": 3
      },
      "seasonal_info": {
        "sowing_time": [
          {
            "month": 3,
            "method": "outdoor"
          },
          {
            "month": 4,
            "method": "outdoor"
          },
          {
            "month": 5,
            "method": "outdoor"
          },
          {
            "month": 6,
            "method": "outdoor"
          },
          {
            "month": 7,
            "method": "outdoor"
          }
        ],
        "planting_time": [],
        "harvest_time": [5, 6, 7, 8, 9, 10, 11],
        "perennial": false,
        "days_to_germination": {
          "min": 7,
          "max": 21
        },
        "days_to_harvest": {
          "min": 60,
          "max": 80
        }
      },
      "companion_planting": {
        "good_neighbors": [
          {
            "plant_id": "onion_01",
            "benefit": "Zwiebeln halten die Möhrenfliege fern",
            "compatibility_score": 9
          },
          {
            "plant_id": "leek_01",
            "benefit": "Lauch hält die Möhrenfliege fern",
            "compatibility_score": 8
          },
          {
            "plant_id": "tomato_01",
            "benefit": "Gute Nachbarschaft",
            "compatibility_score": 7
          },
          {
            "plant_id": "pea_01",
            "benefit": "Erbsen lockern den Boden",
            "compatibility_score": 7
          },
          {
            "plant_id": "bean_01",
            "benefit": "Bohnen lockern den Boden",
            "compatibility_score": 7
          },
          {
            "plant_id": "lettuce_01",
            "benefit": "Gute Bodendecker-Kombination",
            "compatibility_score": 6
          },
          {
            "plant_id": "radish_01",
            "benefit": "Radieschen lockern den Boden für Karotten",
            "compatibility_score": 6
          },
          {
            "plant_id": "cabbage_01",
            "benefit": "Gute Nachbarschaft laut Mischkulturtabelle",
            "compatibility_score": 5
          },
          {
            "plant_id": "dill_01",
            "benefit": "Dill zieht nützliche Insekten an",
            "compatibility_score": 5
          },
          {
            "plant_id": "garlic_01",
            "benefit": "Knoblauch hält Schädlinge fern",
            "compatibility_score": 5
          }
        ],
        "bad_neighbors": [
          {
            "plant_id": "mint_01",
            "reason": "Minze hemmt das Wachstum der Karotten",
            "compatibility_score": -7
          },
          {
            "plant_id": "spinach_01",
            "reason": "Ungünstige Kombination laut Mischkulturtabelle",
            "compatibility_score": -5
          }
        ],
        "companion_score": 7,
        "spatial_arrangement": {
          "optimal_distance_cm": 5,
          "recommended_pattern": "row",
          "plants_per_sqm": 400
        }
      },
      "care_instructions": {
        "watering": "Gleichmäßig feucht halten, besonders während der Keimung. Später mäßig gießen, um Rissbildung zu vermeiden.",
        "fertilizing": "Mäßig düngen. Zu viel Stickstoff führt zu üppigem Blattwuchs auf Kosten der Wurzel.",
        "pruning": "Bei Bedarf ausdünnen, um ausreichend Platz für die Wurzelentwicklung zu gewährleisten.",
        "pest_control": "Auf Möhrenfliege achten. Durch Kulturschutznetze oder Mischkultur mit Zwiebeln und Lauch vorbeugen.",
        "special_care": "Boden vor der Aussaat tief lockern und von Steinen befreien. Karotten mögen keine frische Düngung."
      },
      "harvesting": {
        "instructions": "Karotten ernten, wenn sie die gewünschte Größe erreicht haben. Boden leicht anfeuchten, um die Ernte zu erleichtern.",
        "storage": "In Sand eingeschlagen oder in Plastiktüten im Kühlschrank. Haltbarkeit mehrere Wochen bis Monate.",
        "yield_info": "Pro Quadratmeter können 2-4 kg Karotten geerntet werden."
      },
      "culinary_use": {
        "edible_parts": ["Wurzel", "Blätter (in Maßen)"],
        "cooking_methods": ["Roh", "Kochen", "Dünsten", "Backen"],
        "flavor_profile": "Süßlich mit erdigen Noten",
        "nutritional_highlights": ["Reich an Beta-Carotin", "Vitamin A", "Ballaststoffe"]
      },
      "visual_attributes": {
        "color_category": "orange",
        "icon_url": "https://example.com/icons/carrot.svg",
        "image_url": "https://example.com/images/carrot.jpg"
      },
      "sources": [
        {
          "name": "Permapeople",
          "url": "https://permapeople.org"
        },
        {
          "name": "Gartengemüsekiosk",
          "url": "https://www.gartengemuesekiosk.de"
        },
        {
          "name": "Mischkulturtabelle",
          "url": "Bildschirmfoto 2025-04-14 um 16.58.33.png"
        }
      ]
    },
    {
      "id": "cucumber_01",
      "name": {
        "de": "Gurke",
        "en": "Cucumber",
        "botanical": "Cucumis sativus"
      },
      "category": {
        "primary": "fruit_vegetables",
        "secondary": "cucurbits",
        "tags": ["summer_vegetable", "container_suitable", "trellis_growing"]
      },
      "plant_family": "Cucurbitaceae",
      "description": {
        "de": "Gurken sind erfrischende Sommergemüse, die sowohl im Freiland als auch im Gewächshaus angebaut werden können. Es gibt verschiedene Sorten für Salat, Einlegen oder direkt zum Snacken.",
        "en": "Cucumbers are refreshing summer vegetables that can be grown both outdoors and in greenhouses. There are various varieties for salads, pickling, or direct snacking."
      },
      "growing_properties": {
        "water_needs": "high",
        "light_needs": "full_sun",
        "soil_type": "rich_loamy",
        "ph_preference": {
          "min": 6.0,
          "max": 7.0
        },
        "height_cm": {
          "min": 30,
          "max": 200
        },
        "spacing_cm": 40,
        "container_suitable": true,
        "indoor_suitable": false,
        "difficulty_level": 4
      },
      "seasonal_info": {
        "sowing_time": [
          {
            "month": 4,
            "method": "indoor"
          },
          {
            "month": 5,
            "method": "both"
          }
        ],
        "planting_time": [5, 6],
        "harvest_time": [7, 8, 9],
        "perennial": false,
        "days_to_germination": {
          "min": 3,
          "max": 10
        },
        "days_to_harvest": {
          "min": 50,
          "max": 70
        }
      },
      "companion_planting": {
        "good_neighbors": [
          {
            "plant_id": "bean_01",
            "benefit": "Bohnen fixieren Stickstoff im Boden",
            "compatibility_score": 8
          },
          {
            "plant_id": "pea_01",
            "benefit": "Erbsen fixieren Stickstoff im Boden",
            "compatibility_score": 7
          },
          {
            "plant_id": "celery_01",
            "benefit": "Sellerie verbessert das Wachstum",
            "compatibility_score": 7
          },
          {
            "plant_id": "dill_01",
            "benefit": "Dill verbessert den Geschmack",
            "compatibility_score": 6
          },
          {
            "plant_id": "cabbage_01",
            "benefit": "Gute Nachbarschaft laut Mischkulturtabelle",
            "compatibility_score": 6
          },
          {
            "plant_id": "lettuce_01",
            "benefit": "Salat als Bodendecker",
            "compatibility_score": 6
          },
          {
            "plant_id": "onion_01",
            "benefit": "Zwiebeln halten Schädlinge fern",
            "compatibility_score": 5
          },
          {
            "plant_id": "leek_01",
            "benefit": "Lauch hält Schädlinge fern",
            "compatibility_score": 5
          }
        ],
        "bad_neighbors": [
          {
            "plant_id": "potato_01",
            "reason": "Kartoffeln und Gurken konkurrieren um Nährstoffe",
            "compatibility_score": -7
          },
          {
            "plant_id": "tomato_01",
            "reason": "Ungünstige Kombination laut Mischkulturtabelle",
            "compatibility_score": -6
          }
        ],
        "companion_score": 6,
        "spatial_arrangement": {
          "optimal_distance_cm": 40,
          "recommended_pattern": "row_with_trellis",
          "plants_per_sqm": 3
        }
      },
      "care_instructions": {
        "watering": "Regelmäßig und reichlich gießen, besonders während Trockenperioden. Staunässe vermeiden.",
        "fertilizing": "Vor der Pflanzung gut mit Kompost versorgen. Während der Wachstumsphase alle 2-3 Wochen mit organischem Dünger nachdüngen.",
        "pruning": "Haupttrieb über das dritte Blatt hinaus kappen, um Verzweigung zu fördern. Rankhilfe anbieten.",
        "pest_control": "Auf Mehltau und Gurkenkäfer achten. Vorbeugend mit Schachtelhalmbrühe spritzen.",
        "special_care": "Gurken mögen warme, geschützte Standorte. Bei Freilandanbau eventuell Vlies zur Wärmespeicherung verwenden."
      },
      "harvesting": {
        "instructions": "Regelmäßig ernten, sobald die Früchte die gewünschte Größe erreicht haben. Nicht zu lange an der Pflanze lassen.",
        "storage": "Im Kühlschrank bis zu einer Woche haltbar. Am besten frisch verwenden.",
        "yield_info": "Eine gesunde Pflanze kann 5-10 Gurken produzieren."
      },
      "culinary_use": {
        "edible_parts": ["Früchte"],
        "cooking_methods": ["Roh", "Einlegen", "Fermentieren"],
        "flavor_profile": "Mild, erfrischend und leicht süßlich",
        "nutritional_highlights": ["Wasserreich", "Vitamin K", "Kalium"]
      },
      "visual_attributes": {
        "color_category": "green",
        "icon_url": "https://example.com/icons/cucumber.svg",
        "image_url": "https://example.com/images/cucumber.jpg"
      },
      "sources": [
        {
          "name": "Permapeople",
          "url": "https://permapeople.org/plants/cucumis-sativus-cucumber"
        },
        {
          "name": "Gartengemüsekiosk",
          "url": "https://www.gartengemuesekiosk.de"
        },
        {
          "name": "Mischkulturtabelle",
          "url": "Bildschirmfoto 2025-04-14 um 16.58.33.png"
        }
      ]
    },
    {
      "id": "zucchini_01",
      "name": {
        "de": "Zucchini",
        "en": "Zucchini",
        "botanical": "Cucurbita pepo var. cylindrica"
      },
      "category": {
        "primary": "fruit_vegetables",
        "secondary": "cucurbits",
        "tags": ["beginner_friendly", "high_yield", "summer_vegetable"]
      },
      "plant_family": "Cucurbitaceae",
      "description": {
        "de": "Zucchini sind ertragreiches Sommergemüse mit buschigem Wuchs. Sie sind ideal für Anfänger, da sie pflegeleicht sind und reichlich Ernte liefern. Perfekt für kleine Gärten und Hochbeete.",
        "en": "Zucchini are high-yielding summer vegetables with bushy growth. They are ideal for beginners as they are easy to care for and provide abundant harvests. Perfect for small gardens and raised beds."
      },
      "growing_properties": {
        "water_needs": "high",
        "light_needs": "full_sun",
        "soil_type": "rich_loamy",
        "ph_preference": {
          "min": 6.0,
          "max": 7.5
        },
        "height_cm": {
          "min": 40,
          "max": 100
        },
        "spacing_cm": 80,
        "container_suitable": true,
        "indoor_suitable": false,
        "difficulty_level": 2
      },
      "seasonal_info": {
        "sowing_time": [
          {
            "month": 4,
            "method": "indoor"
          },
          {
            "month": 5,
            "method": "both"
          }
        ],
        "planting_time": [5, 6],
        "harvest_time": [7, 8, 9, 10],
        "perennial": false,
        "days_to_germination": {
          "min": 5,
          "max": 10
        },
        "days_to_harvest": {
          "min": 40,
          "max": 60
        }
      },
      "companion_planting": {
        "good_neighbors": [
          {
            "plant_id": "bean_01",
            "benefit": "Bohnen fixieren Stickstoff im Boden",
            "compatibility_score": 8
          },
          {
            "plant_id": "pea_01",
            "benefit": "Erbsen fixieren Stickstoff im Boden",
            "compatibility_score": 7
          },
          {
            "plant_id": "lettuce_01",
            "benefit": "Salat als Bodendecker",
            "compatibility_score": 7
          },
          {
            "plant_id": "sugar_pea_01",
            "benefit": "Gute Nachbarschaft laut Mischkulturtabelle",
            "compatibility_score": 6
          }
        ],
        "bad_neighbors": [
          {
            "plant_id": "potato_01",
            "reason": "Kartoffeln und Zucchini konkurrieren um Nährstoffe",
            "compatibility_score": -7
          },
          {
            "plant_id": "carrot_01",
            "reason": "Ungünstige Kombination laut Mischkulturtabelle",
            "compatibility_score": -6
          }
        ],
        "companion_score": 6,
        "spatial_arrangement": {
          "optimal_distance_cm": 80,
          "recommended_pattern": "single_plants",
          "plants_per_sqm": 1
        }
      },
      "care_instructions": {
        "watering": "Regelmäßig und reichlich gießen, besonders während der Fruchtbildung. Staunässe vermeiden.",
        "fertilizing": "Vor der Pflanzung gut mit Kompost versorgen. Während der Wachstumsphase alle 3-4 Wochen mit organischem Dünger nachdüngen.",
        "pruning": "Bei Platzmangel können überzählige Seitentriebe entfernt werden. Alte oder kranke Blätter regelmäßig entfernen.",
        "pest_control": "Auf Mehltau und Blattläuse achten. Vorbeugend mit Schachtelhalmbrühe spritzen.",
        "special_care": "Früchte regelmäßig ernten, auch kleine, um weitere Fruchtbildung anzuregen."
      },
      "harvesting": {
        "instructions": "Zucchini ernten, wenn sie 15-20 cm lang sind. Regelmäßiges Ernten fördert Neubildung.",
        "storage": "Im Kühlschrank bis zu einer Woche haltbar. Am besten frisch verwenden.",
        "yield_info": "Eine gesunde Pflanze kann 5-10 kg Zucchini produzieren."
      },
      "culinary_use": {
        "edible_parts": ["Früchte", "Blüten"],
        "cooking_methods": ["Braten", "Grillen", "Backen", "Dünsten", "Roh"],
        "flavor_profile": "Mild und leicht nussig",
        "nutritional_highlights": ["Kalorienarm", "Reich an Vitamin C", "Kalium"]
      },
      "visual_attributes": {
        "color_category": "green",
        "icon_url": "https://example.com/icons/zucchini.svg",
        "image_url": "https://example.com/images/zucchini.jpg"
      },
      "sources": [
        {
          "name": "Permapeople",
          "url": "https://permapeople.org"
        },
        {
          "name": "Gartengemüsekiosk",
          "url": "https://www.gartengemuesekiosk.de"
        },
        {
          "name": "Mischkulturtabelle",
          "url": "Bildschirmfoto 2025-04-14 um 16.58.33.png"
        }
      ]
    }
  ]
}
```

## Optimale Beetplatzierung - Algorithmus-Konzept

Die Datenbank ist so strukturiert, dass sie die Berechnung optimaler Pflanzenpositionen in einem Beet ermöglicht. Der Algorithmus würde wie folgt funktionieren:

### 1. Kompatibilitätsmatrix
- Für jedes Pflanzenpaar wird ein Kompatibilitätswert berechnet
- Positive Werte (1-10) für gute Nachbarn
- Negative Werte (-1 bis -10) für schlechte Nachbarn
- Wert 0 für neutrale oder unbekannte Beziehungen

### 2. Räumliche Anforderungen
- Jede Pflanze hat definierte Abstands- und Platzanforderungen
- `optimal_distance_cm` gibt den idealen Abstand zu anderen Pflanzen an
- `recommended_pattern` definiert das Pflanzschema (Reihe, Cluster, Einzelpflanzen)
- `plants_per_sqm` gibt die empfohlene Dichte an

### 3. Beetoptimierung
Der Algorithmus würde folgende Schritte durchführen:
1. Erfassung der Beetgröße und -form
2. Auswahl der gewünschten Pflanzen
3. Berechnung der optimalen Positionen basierend auf:
   - Maximierung der positiven Nachbarschaftsbeziehungen
   - Minimierung der negativen Nachbarschaftsbeziehungen
   - Einhaltung der räumlichen Anforderungen jeder Pflanze
   - Berücksichtigung von Licht- und Schattenwurf (größere Pflanzen im Norden)

### 4. Visualisierung
- Ausgabe eines visuellen Beetplans mit optimalen Pflanzpositionen
- Farbcodierung zur Darstellung der Kompatibilitätsbeziehungen
- Legende mit Pflanzabständen und Pflegehinweisen

## Implementierungshinweise

1. Die `compatibility_score` Werte in der Datenbank sind entscheidend für die Berechnung
2. Die räumlichen Informationen unter `spatial_arrangement` ermöglichen die Positionierung
3. Für die GPT-Prompt-Injection kann ein vereinfachtes Format verwendet werden
4. Für die visuelle Darstellung im Frontend werden die vollständigen Daten benötigt

## Nächste Schritte
1. Vervollständigung der Datenbank mit allen 50 Pflanzen
2. Implementierung des Beetplatzierungs-Algorithmus
3. Entwicklung einer visuellen Darstellung für das Frontend
4. Erstellung von Beispiel-Prompt-Injections für verschiedene Gartenszenarien
