export const generateGeminiContentApi = async (apiKey, type, rawData) => {
  const prompt = type === 'crm' 
    ? `You are an expert car salesman assistant. Convert the following raw lead data into a professional, bulleted CRM note. Make it concise and easy to read for a manager or BDC agent. Do not use markdown, just plain text spacing. Raw data: ${JSON.stringify(rawData)}`
    : `You are Tyler, an expert car salesman at Giles Volvo. Write a short, friendly, and engaging follow-up SMS text message to this customer based on their details. Do NOT use placeholders, invent natural details if needed to bridge gaps but stick to the provided context. Keep it under 3 sentences. Raw data: ${JSON.stringify(rawData)}`;

  try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              systemInstruction: { parts: [{ text: "You are a helpful assistant for a car dealership." }] }
          })
      });
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Error generating content. Please check API settings.";
  } catch (error) {
      console.error(error);
      return "Failed to reach Gemini API. Ensure API key is configured.";
  }
};