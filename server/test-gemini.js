const { GoogleGenerativeAI } = require("@google/generative-ai");

// 🔴 7TT L-KEY JDIDA HNA NICHAN
const API_KEY = "AIzaSyAGbqHDYs-NgIjiIxjaAe0RwWGyrGiddBw"; 

const genAI = new GoogleGenerativeAI(API_KEY);

async function runTest() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Say hello!");
    const response = await result.response;
    console.log("✅ SUCCESS! Gemini says:", response.text());
  } catch (error) {
    console.error("❌ FAILED:", error.message);
  }
}

runTest();