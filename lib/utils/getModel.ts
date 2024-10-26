import { LanguageModel } from "ai";
import { LLMSelection } from "@/lib/types";
import { anthropic, createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";

/**
 * Returns a new OpenAI model instance.
 *
 * @param llmSelection - The LLM selection to use.
 * @returns openai - OpenAI model instance
 */
export function getModel(llmSelection?: LLMSelection): LanguageModel {
  switch (llmSelection) {
    // case "synth-ui-v1":
    //   // TODO: implement synth-ui-v1
    //   throw new Error("synth-ui-v1 is not implemented");
    // case "claude-3.5-sonnet":
    //   const anthropicApiBase = process.env.ANTHROPIC_API_BASE;
    //   const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

    //   if (!anthropicApiKey) {
    //     throw new Error("Missing environment variable ANTHROPIC_API_KEY");
    //   }

    //   const anthropic = createAnthropic({
    //     baseURL: anthropicApiBase,
    //     apiKey: anthropicApiKey,
    //   });

    //   return anthropic("claude-3-5-sonnet-20240620");
    case "claude-3.5-sonnet":
    case "gpt-4o":
    case "gpt-4o-mini":
    case "synth-ui-v1": // TODO: implement synth-ui-v1
    default:
      const openAIApiBase = process.env.OPENAI_API_BASE;
      const openAIApiKey = process.env.OPENAI_API_KEY;

      let openAIModel = llmSelection?.toString() || "gpt-4o-mini";

      if (
        llmSelection === "synth-ui-v1" ||
        llmSelection === "claude-3.5-sonnet"
      ) {
        openAIModel = "gpt-4o";
      }

      if (!openAIApiKey) {
        throw new Error("Missing environment variable OPENAI_API_KEY");
      }

      const openai = createOpenAI({
        baseURL: openAIApiBase,
        apiKey: openAIApiKey,
        organization: "", // optional
      });

      return openai.chat(openAIModel);
  }
}
