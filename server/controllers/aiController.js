

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Had l-stira khassha t-koun t-t-9ra men .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash-002" 
}, { apiVersion: "v1" });

exports.optimizeText = async (req, res) => {
  const { text, field } = req.body;

  try {
    const prompt = `You are a professional career coach. Rewrite the following text for a CV to be professional, impactful, and ATS-friendly. Keep it concise.\n\nField: ${field}. Text: ${text}`;
    const result = await model.generateContent(prompt);
    const optimizedText = result.response.text().trim();
    
    console.log("✅ Gemini Success!");
    res.json({ optimizedText });

  } catch (error) {
    console.error("❌ Gemini Error:", error.message);
    res.status(500).json({ error: "Gemini failed to respond." });
  }
};