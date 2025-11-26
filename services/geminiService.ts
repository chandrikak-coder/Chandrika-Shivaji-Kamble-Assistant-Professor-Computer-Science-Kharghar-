import { GoogleGenAI, Type } from "@google/genai";
import { Answer, PersonalityReport, Tone } from "../types";

// Initialize the client. 
// Note: We create the instance inside the function to ensure we capture the latest key if needed,
// though typically process.env is static.
const getAiClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePersonalityReport = async (
  answers: Answer[],
  tone: Tone
): Promise<PersonalityReport> => {
  const ai = getAiClient();

  const answerSummary = answers
    .map((a) => `- Q: ${a.questionText}\n  A: ${a.answerText}`)
    .join("\n");

  const prompt = `
    Analyze the following user quiz responses and generate a personality report.
    
    USER RESPONSES:
    ${answerSummary}

    TONE REQUIREMENT:
    The user has selected the "${tone}" tone.
    ${getToneInstruction(tone)}
    
    OUTPUT REQUIREMENT:
    Return strictly JSON matching the schema provided.
  `;

  let report: PersonalityReport;

  // 1. Generate Text Report
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert psychologist and personality profiler with a talent for creative writing. You analyze quiz answers deeply to find hidden traits.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "A creative, catchy title for their personality type.",
            },
            summary: {
              type: Type.STRING,
              description: "A 3-4 line summary of who they are.",
            },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Top 3-4 strengths.",
            },
            weaknesses: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Top 3-4 weaknesses/blind spots.",
            },
            careerSuggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 unconventional but fitting career paths.",
            },
            fictionalCharacter: {
              type: Type.STRING,
              description: "A specific fictional character they resemble.",
            },
          },
          required: [
            "title",
            "summary",
            "strengths",
            "weaknesses",
            "careerSuggestions",
            "fictionalCharacter",
          ],
        },
      },
    });

    if (response.text) {
      report = JSON.parse(response.text) as PersonalityReport;
    } else {
      throw new Error("No text returned from Gemini");
    }
  } catch (error) {
    console.error("Gemini API Error (Text):", error);
    throw error;
  }

  // 2. Generate Character Image
  try {
    const imageStyle = getImageStyle(tone);
    const imagePrompt = `A high-quality, artistic digital illustration of ${report.fictionalCharacter}. Style: ${imageStyle}. The character should be the central focus.`;

    const imageResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: imagePrompt }],
      },
    });

    for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        report.imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        break;
      }
    }
  } catch (error) {
    console.warn("Gemini API Error (Image):", error);
    // We swallow the image error so the user still gets the text report
  }

  return report;
};

function getToneInstruction(tone: Tone): string {
  switch (tone) {
    case Tone.SARCASTIC:
      return "Be roast-heavy. Use dry humor. Point out their flaws comedically. Don't be too nice.";
    case Tone.POETIC:
      return "Use metaphors, abstract concepts, and beautiful, flowing language. Be mystical.";
    case Tone.GEN_Z:
      return "Use internet slang (slay, no cap, cringe, main character energy). Use lowercase aesthetic where appropriate. Be dramatic.";
    case Tone.FORMAL:
    default:
      return "Be empathetic, professional, clear, and scientifically grounded.";
  }
}

function getImageStyle(tone: Tone): string {
  switch (tone) {
    case Tone.SARCASTIC:
      return "Satirical caricature, exaggerated features, witty comic book style";
    case Tone.POETIC:
      return "Surrealist oil painting, dreamlike, abstract, ethereal lighting";
    case Tone.GEN_Z:
      return "Vaporwave, 3D render, cyberpunk, neon aesthetic, trending on artstation";
    case Tone.FORMAL:
    default:
      return "Photorealistic, cinematic lighting, professional portrait, dignified";
  }
}