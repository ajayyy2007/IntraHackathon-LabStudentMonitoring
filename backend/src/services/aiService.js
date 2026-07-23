const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function analyzeTelemetry(data) {

    const prompt = `
You are an AI Classroom Monitoring Assistant.

Analyze this telemetry.

Active Window:
${data.activeWindow}

CPU:
${data.cpu}

Memory:
${data.memory}

Processes:
${JSON.stringify(data.processes)}

Respond ONLY in JSON.

{
  "category":"",
  "risk":"",
  "confidence":0,
  "reason":"",
  "recommendation":""
}
`;

    try {

        const response = await ai.models.generateContent({

            model: "gemini-2.0-flash",

            contents: prompt

        });

        let text = response.text;

        // Remove markdown if Gemini returns ```json
        text = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        console.log("===== GEMINI RESPONSE =====");
        console.log(text);
        console.log("===========================");

        return JSON.parse(text);

    } catch (error) {

        console.error("Gemini Error:", error.message);

        // Return default values so MongoDB validation won't fail
        return {

            category: "Safe",

            risk: "Low",

            confidence: 0,

            reason: "AI analysis unavailable.",

            recommendation: "Continue monitoring."

        };

    }

}

module.exports = {
    analyzeTelemetry
};