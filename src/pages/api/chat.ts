import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

// Initialize OpenAI client
// IMPORTANT: Ensure OPENAI_API_KEY is set in your environment variables!
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Placeholder for fetching plant data based on ID
// In a real app, this might fetch from a database or cache
import { fetchPlantDatabase, PlantData } from '@/utils/plantDatabase';
let plantCache: PlantData[] | null = null;
async function getPlantById(id: string): Promise<PlantData | null> {
  if (!plantCache) {
    plantCache = await fetchPlantDatabase();
  }
  return plantCache.find(p => p.id === id) || null;
}

// Placeholder for prompt templates (load from file or define here)
const promptTemplates = {
  plantInfo: (plantName: string, question: string, plantDetails: string) => 
    `Du bist ein freundlicher Gartenexperte für Urbango. Beantworte die folgende Frage über die Pflanze '${plantName}' kurz und prägnant im Markdown-Format. Nutze dabei die folgenden Detailinformationen:

    Pflanzen-Details:
    ${plantDetails}

    Frage des Nutzers: ${question}

    Deine Antwort (Markdown):`,
  
  bedPlanning: (plantNames: string[], dimensions: string, compatibilityInfo: string, spaceInfo: string) =>
    `Du bist ein Beetplanungsexperte für Urbango. Erstelle einen detaillierten, visuellen Bepflanzungsplan im Markdown-Format für ein Beet mit den Maßen ${dimensions}. Berücksichtige die folgenden Pflanzen: ${plantNames.join(', ')}. Beachte die Kompatibilitätshinweise: ${compatibilityInfo}. Beachte die Platzinformation: ${spaceInfo}. Gib konkrete Anordnungsvorschläge und Pflegetipps.

    Dein Plan (Markdown):`,
  
  generalGardening: (question: string) => 
    `Du bist ein freundlicher Gartenexperte für Urbango. Beantworte die folgende allgemeine Gartenfrage kurz und prägnant im Markdown-Format:

    Frage: ${question}

    Deine Antwort (Markdown):`,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("OpenAI API key not configured.");
    return res.status(500).json({ message: 'Internal Server Error: API key missing' });
  }

  const { queryType, plantId, question, selectedPlants, bedDimensions } = req.body;

  try {
    let systemPrompt = "Du bist ein hilfreicher Gartenassistent."; // Default
    let userQuery = "";

    // 1. Determine Prompt Type and Construct Query
    if (queryType === 'plantInfo' && plantId && question) {
      const plant = await getPlantById(plantId);
      if (!plant) {
        return res.status(404).json({ message: 'Plant not found' });
      }
      // Prepare plant details string (customize as needed)
      const plantDetailsString = `Botanischer Name: ${plant.botanicalName}, Kategorie: ${plant.category}, Wasserbedarf: ${plant.waterNeeds}, Lichtbedarf: ${plant.lightNeeds}, Gute Nachbarn: ${plant.goodNeighbors?.map(n=>n.name).join(', ') || 'Keine'}, Schlechte Nachbarn: ${plant.badNeighbors?.map(n=>n.name).join(', ') || 'Keine'}`;
      userQuery = promptTemplates.plantInfo(plant.name, question, plantDetailsString);
      systemPrompt = "Du bist ein Experte für spezifische Pflanzeninformationen.";

    } else if (queryType === 'bedPlanning' && selectedPlants && bedDimensions) {
      // Fetch details for selected plants
      const plantsData = await Promise.all(selectedPlants.map((id: string) => getPlantById(id)));
      const validPlantsData = plantsData.filter(p => p !== null) as PlantData[];
      const plantNames = validPlantsData.map(p => p.name);
      // TODO: Get compatibility and space info from request body or recalculate
      const compatibilityInfo = req.body.compatibilityInfo || "Keine besonderen Hinweise.";
      const spaceInfo = req.body.spaceInfo || "Platz scheint ausreichend.";
      const dimensionsString = `${bedDimensions.length}m x ${bedDimensions.width}m`;
      userQuery = promptTemplates.bedPlanning(plantNames, dimensionsString, compatibilityInfo, spaceInfo);
      systemPrompt = "Du bist ein Experte für Beetplanung und Pflanzenkompatibilität.";

    } else if (queryType === 'general' && question) {
      // Basic safety check again on backend (optional but recommended)
      // if (!isBackendQuestionSafe(question)) { return res.status(400).json({ message: 'Inappropriate question' }); }
      userQuery = promptTemplates.generalGardening(question);
      systemPrompt = "Du bist ein allgemeiner Gartenexperte.";

    } else {
      return res.status(400).json({ message: 'Invalid request parameters' });
    }

    // 2. Call OpenAI API
    console.log(`Calling OpenAI with system prompt: ${systemPrompt}`);
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Or your preferred model
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userQuery },
      ],
      temperature: 0.7, // Adjust as needed
      max_tokens: 500, // Adjust as needed
    });

    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response from OpenAI");
    }

    // 3. Send Response
    res.status(200).json({ response: aiResponse });

  } catch (error: any) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({ message: 'Error processing request', error: error.message });
  }
}

