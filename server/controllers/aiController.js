const { GoogleGenerativeAI } = require("@google/generative-ai");

// Hna kan-3ayto l-Gemini b l-Key dyalk
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.optimizeText = async (req, res) => {
  const { text, field } = req.body; // field y9der ykoun 'experience' wlla 'aboutMe'

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // L-Prompt li ghadi n-sifto l-IA (m-9add bach y-rj3 text pro)
    const prompt = `As a professional career coach, rewrite the following ${field} for a CV to be more professional, impactful, and ATS-friendly. Keep it concise and use action verbs. Text: ${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const optimizedText = response.text();

    res.json({ optimizedText });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to optimize text with AI" });
  }
};