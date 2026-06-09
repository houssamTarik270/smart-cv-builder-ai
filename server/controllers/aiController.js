const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize API client directly
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.optimizeText = async (req, res) => {
  
  const { text } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    
    const prompt = `You are a professional career coach and expert resume writer. 
    Correct all spelling mistakes, improve the grammar, and rewrite the following text to be professional, impactful, and ready for an ATS-friendly CV. 
    Keep it concise and professional.
    
    Text to rewrite: ${text}`;
    
    const result = await model.generateContent(prompt);
    const optimizedText = result.response.text().trim();
    
    console.log("✅ Gemini Success!");
    res.json({ optimizedText });

  } catch (error) {
    console.error("❌ Gemini Error:", error.message);
    res.status(500).json({ error: "Gemini failed to respond." });
  }
};