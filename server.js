// server.js
/*import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import OpenAI from "openai";

config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route: Generate meal recommendations
app.post("/api/getMealPlan", async (req, res) => {
  try {
    const { age, gender, height, weight, allergies, fitnessGoal, healthIssues, mealType } = req.body;

    const prompt = `
You are a smart nutritionist. Based on the following details:
- Age: ${age}
- Gender: ${gender}
- Height: ${height} cm
- Weight: ${weight} kg
- Allergies: ${allergies || "None"}
- Fitness Goal: ${fitnessGoal}
- Health Issues: ${healthIssues || "None"}

Suggest a healthy ${mealType} with:
1. Meal Name
2. Ingredients
3. Recipe (short steps)
4. Approx Calories & Protein content
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // or gpt-4.1 if available in your account
      messages: [{ role: "user", content: prompt }],
    });

    const suggestion = response.choices[0].message.content;
    res.json({ success: true, mealPlan: suggestion });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to fetch meal plan" });
  }
});

// Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));*/


import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // ✅ Make sure .env file has OPENAI_API_KEY=your_key
});

// Route: Generate meal recommendations
app.post("/api/getMealPlan", async (req, res) => {
  try {
    const { age, gender, height, weight, allergies, fitnessGoal, healthIssues, mealType } = req.body;

    if (!age || !gender || !height || !weight || !fitnessGoal || !mealType) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const prompt = `
You are a smart nutritionist. Based on the following details:
- Age: ${age}
- Gender: ${gender}
- Height: ${height} cm
- Weight: ${weight} kg
- Allergies: ${allergies || "None"}
- Fitness Goal: ${fitnessGoal}
- Health Issues: ${healthIssues || "None"}

Suggest a healthy ${mealType} with:
1. Meal Name
2. Ingredients
3. Recipe (short steps)
4. Approx Calories & Protein content
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const suggestion = response.choices[0].message.content;
    res.json({ success: true, mealPlan: suggestion });
  } catch (error) {
    console.error("Error generating meal plan:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch meal plan" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
