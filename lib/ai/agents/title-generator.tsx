import { streamText } from "ai";
import { getModel } from "@/lib/utils/getModel";

const SYSTEM_PROMPT = `As an AI specializing in generating catchy and relevant titles, your task is to create a fitting, good-sounding title based on the given query or conversation context. 
Follow these guidelines:
1. Keep the title concise, ideally under 60 characters.
2. Make it descriptive and relevant to the main topic.
3. Use engaging language to capture interest.
4. Avoid using special characters or excessive punctuation.
5. Capitalize the first letter of each major word.

e.g. "Interactive Pricing Calculator", "SaaS Hero Section", "Contact Form with Validation"

If the query is not related to generating react components, respond with a short I cannot help with that.

Respond with only the generated title, without any additional explanation or formatting.`;

export async function generateTitle(query: string): Promise<string> {
  let title = "";

  await streamText({
    model: getModel(),
    messages: [
      {
        role: "user",
        content: `Generate a title for the following query: ${query}`,
      },
    ],
    system: SYSTEM_PROMPT,
    onFinish: (event) => {
      title = event.text;
    },
  }).then(async (result) => {
    for await (const text of result.textStream) {
      if (text) {
        title = text;
      }
    }
  });

  return title;
}
