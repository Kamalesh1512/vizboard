"use server";
import OpenAI from "openai";
export const generateCreativePrompt = async (userPrompt: string) => {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_OPENAI_API_KEY,
  });

  const finalPrompt = `Create a structured and relevant outline for the following prompt: "${userPrompt}".  
- The outline should contain **exactly 6 points**, each as a **concise, single sentence**.
- Ensure the outline is **logically ordered** and directly related to the topic.
- Return only **valid JSON output** with this exact format:

json
{
  "outlines": [
    "Point 1",
    "Point 2",
    "Point 3",
    "Point 4",
    "Point 5",
    "Point 6"
  ]
}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI that generates outlines for presentations.",
        },
        {
          role: "user",
          content: finalPrompt,
        },
      ],
      max_tokens:1000,
      temperature:0.0,
    });
    const responseContent = completion.choices[0].message?.content
    if (responseContent) {
        try {
            const jsonResponse = JSON.parse(responseContent)
            return {status:200,data:jsonResponse}
        } catch (error) {
            console.error('Invalid JSON received:',responseContent,error)
            return {status:500, error:'Invalid JSON format received from AI'}

        }
    }
    return {status:400,error:'No content generated'}
    
  } catch (error) {
    console.log("⚠️ ERROR ", error);
    return { status: 500, error: "Internal Server Error" };
  }
};
