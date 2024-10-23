import { LanguageModel } from "ai";
import { LLMSelection } from "@/lib/types";
import { createAnthropic } from "@ai-sdk/anthropic";
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
    case "claude-3.5-sonnet":
      const anthropicApiBase = process.env.ANTHROPIC_API_BASE;
      const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

      if (!anthropicApiKey) {
        throw new Error("Missing environment variable ANTHROPIC_API_KEY");
      }

      const anthropic = createAnthropic({
        baseURL: anthropicApiBase,
        apiKey: anthropicApiKey,
      });

      // use haiku for now, will be enough for testing purposes
      return anthropic("claude-3-haiku-20240307") as LanguageModel;
    case "gpt-4o":
    case "gpt-4o-mini":
    case "synth-ui-v1": // TODO: implement synth-ui-v1
    default:
      const openaiApiBase = process.env.OPENAI_API_BASE;
      const openaiApiKey = process.env.OPENAI_API_KEY;
      let openaiApiModel =
        llmSelection !== "synth-ui-v1"
          ? llmSelection?.toString() || "gpt-4o-mini"
          : "gpt-4o";

      if (!openaiApiKey) {
        throw new Error("Missing environment variable OPENAI_API_KEY");
      }

      const openai = createOpenAI({
        baseURL: openaiApiBase,
        apiKey: openaiApiKey,
        organization: "", // optional
      });

      return openai.chat(openaiApiModel);
  }
}
