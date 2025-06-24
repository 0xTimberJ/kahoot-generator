import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  console.log(prompt);

  const { text } = await generateText({
    model: google("gemini-2.5-flash-preview-04-17"),
    system: `You are an expert in creating educational quizzes. You generate quiz questions in the exact JSON format requested.
    
    Important rules:
    - Respond ONLY with valid JSON array, no additional text
    - Respect character limits
    - Do not include any other text than the JSON
    - Do not include triple backticks ('''json) before or after the JSON
    - Give me only a Array of questions starting with [ and ending with ]
    - Respect exactly the requested format
    - Questions must be relevant and educational
    - Only one correct answer per question except if in the question the user ask for multiple answers
    - Vary response times according to difficulty
    - Incorrect answers must be plausible
    
    Required JSON format:
    [
      {
        "Question": "max 120 chars",
        "Answer 1": "max 75 chars", 
        "Answer 2": "max 75 chars",
        "Answer 3": "max 75 chars", 
        "Answer 4": "max 75 chars",
        "Time limit (sec)": 5|10|20|30|60|90|120|240,
        "Correct answer(s)": 1|2|3|4
      }
    ]
    `,
    prompt,
  });

  console.log("result", text);

  // Clean the response - remove markdown code blocks if present
  let cleanedText = text.trim();
  if (cleanedText.startsWith("```json")) {
    cleanedText = cleanedText.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (cleanedText.startsWith("```")) {
    cleanedText = cleanedText.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  try {
    // Validate that it's valid JSON
    const parsedJson = JSON.parse(cleanedText);
    return Response.json({ questions: parsedJson });
  } catch (error) {
    console.error("Invalid JSON response:", error);
    return Response.json(
      { error: "Invalid JSON response from AI" },
      { status: 500 }
    );
  }
}
