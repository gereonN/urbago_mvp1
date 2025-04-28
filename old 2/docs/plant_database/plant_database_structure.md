# Plant Database Structure for Urbago

## Overview
This document outlines the comprehensive JSON structure for the plant database that will be used in the Urbago gardening application. The structure is designed to:

1. Support prompt injection into GPT models
2. Enable visual representation in the frontend
3. Be exportable and expandable for future database integration
4. Include all required plant attributes for urban gardening

## JSON Schema

```json
{
  "plants": [
    {
      "id": "string",                      // Unique identifier (e.g., "tomato_01")
      "name": {
        "de": "string",                    // German name (e.g., "Tomate")
        "en": "string",                    // English name (e.g., "Tomato")
        "botanical": "string"              // Botanical name (e.g., "Solanum lycopersicum")
      },
      "category": {
        "primary": "string",               // Primary category (e.g., "fruit_vegetables")
        "secondary": "string",             // Secondary category if applicable (e.g., "nightshade")
        "tags": ["string"]                 // Additional tags for filtering (e.g., ["beginner_friendly", "container_suitable"])
      },
      "plant_family": "string",            // Botanical family (e.g., "Solanaceae")
      "description": {
        "de": "string",                    // Brief description in German
        "en": "string"                     // Brief description in English
      },
      "growing_properties": {
        "water_needs": "string",           // "low", "medium", or "high"
        "light_needs": "string",           // "full_sun", "partial_shade", or "shade"
        "soil_type": "string",             // Preferred soil type (e.g., "loamy", "sandy", "clay")
        "ph_preference": {
          "min": number,                   // Minimum pH value (e.g., 6.0)
          "max": number                    // Maximum pH value (e.g., 7.0)
        },
        "height_cm": {
          "min": number,                   // Minimum height in cm
          "max": number                    // Maximum height in cm
        },
        "spacing_cm": number,              // Recommended spacing between plants in cm
        "container_suitable": boolean,     // Whether suitable for container growing
        "indoor_suitable": boolean,        // Whether suitable for indoor growing
        "difficulty_level": number         // Scale 1-10 (1 = very easy, 10 = very difficult)
      },
      "seasonal_info": {
        "sowing_time": [                   // Array of months suitable for sowing (1-12)
          {
            "month": number,               // Month number (1-12)
            "method": "string"             // "indoor", "outdoor", or "both"
          }
        ],
        "planting_time": [                 // Array of months suitable for planting (1-12)
          number
        ],
        "harvest_time": [                  // Array of months suitable for harvesting (1-12)
          number
        ],
        "perennial": boolean,              // Whether the plant is perennial
        "days_to_germination": {
          "min": number,                   // Minimum days to germination
          "max": number                    // Maximum days to germination
        },
        "days_to_harvest": {
          "min": number,                   // Minimum days from planting to harvest
          "max": number                    // Maximum days from planting to harvest
        }
      },
      "companion_planting": {
        "good_neighbors": [                // Plants that grow well with this plant
          {
            "plant_id": "string",          // ID reference to another plant
            "benefit": "string"            // Description of the benefit (e.g., "Deters pests")
          }
        ],
        "bad_neighbors": [                 // Plants that should not be grown with this plant
          {
            "plant_id": "string",          // ID reference to another plant
            "reason": "string"             // Reason for incompatibility (e.g., "Competes for nutrients")
          }
        ],
        "companion_score": number          // Overall companion planting score (1-10)
      },
      "care_instructions": {
        "watering": "string",              // Watering instructions
        "fertilizing": "string",           // Fertilizing instructions
        "pruning": "string",               // Pruning instructions
        "pest_control": "string",          // Pest control instructions
        "special_care": "string"           // Any special care instructions
      },
      "harvesting": {
        "instructions": "string",          // How to harvest
        "storage": "string",               // Storage recommendations
        "yield_info": "string"             // Expected yield information
      },
      "culinary_use": {
        "edible_parts": ["string"],        // Parts of the plant that are edible
        "cooking_methods": ["string"],     // Recommended cooking methods
        "flavor_profile": "string",        // Description of flavor
        "nutritional_highlights": ["string"] // Key nutritional benefits
      },
      "visual_attributes": {
        "color_category": "string",        // Primary color category for UI (e.g., "green", "red")
        "icon_url": "string",              // URL to plant icon (optional)
        "image_url": "string"              // URL to plant image (optional)
      },
      "sources": [                         // References for the information
        {
          "name": "string",                // Source name
          "url": "string"                  // Source URL
        }
      ]
    }
  ]
}
```

## Example Entry

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
            "benefit": "Verbessert den Geschmack und hält Schädlinge fern"
          },
          {
            "plant_id": "carrot_01",
            "benefit": "Lockert den Boden für Tomatenwurzeln"
          },
          {
            "plant_id": "onion_01",
            "benefit": "Hält Schädlinge fern und wirkt fungizid"
          }
        ],
        "bad_neighbors": [
          {
            "plant_id": "potato_01",
            "reason": "Erhöht das Risiko von Kraut- und Knollenfäule"
          },
          {
            "plant_id": "fennel_01",
            "reason": "Hemmt das Wachstum der Tomate"
          }
        ],
        "companion_score": 8
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
        }
      ]
    }
  ]
}
```

## Implementation Notes

### 1. Database Size Considerations
- The complete database with 50 plants will be substantial in size
- For prompt injection, consider:
  - Using a condensed version with essential fields only
  - Dynamically injecting only relevant plants based on user query
  - Splitting the database into logical chunks (e.g., by category)

### 2. Relationship Handling
- Plant relationships (companion planting) use ID references
- When implementing, ensure proper resolution of these references
- Consider adding a validation step to verify all referenced IDs exist

### 3. Localization
- The structure supports both German and English content
- Additional languages can be added by extending the language fields

### 4. Extensibility
- The schema can be extended with additional fields as needed
- Consider versioning the schema to track changes over time

### 5. Frontend Considerations
- Color categories and tags support visual filtering in the UI
- Icon and image URLs can be populated once assets are available
- Consider adding a "display_priority" field for featured plants

### 6. Data Validation
- Implement validation for:
  - Required fields
  - Value ranges (e.g., pH between 0-14)
  - Enumerated values (e.g., water_needs must be "low", "medium", or "high")
  - Reference integrity (all plant_ids must exist)

## Next Steps
1. Review and finalize this structure with the development team
2. Begin populating the database with the top 50 plants
3. Develop the prompt injection strategy based on this structure
4. Create test cases to validate the database functionality
