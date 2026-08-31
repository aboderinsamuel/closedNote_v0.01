import OpenAI from "openai";

// Shared LLM provider calls used by both /api/chat (prompt refinement) and
// /api/run (executing a prompt for the Run & Compare feature). Keeping the
// provider logic in one place avoids drift between the two routes.

export interface LlmUsage {
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
}

export interface LlmResult {
  text: string;
  usage?: LlmUsage;
}

export async function callOpenAI(
  apiKey: string,
  instruction: string,
  prompt: string,
  model: string,
  max_tokens: number,
  temperature: number
): Promise<LlmResult> {
  const openai = new OpenAI({ apiKey });
  const completion = await openai.chat.completions.create({
    model,
    messages: [
      { role: "system", content: instruction },
      { role: "user", content: prompt },
    ],
    max_tokens: Math.min(max_tokens, 2000),
    temperature,
  });

  return {
    text: completion.choices[0]?.message?.content?.trim() || "",
    usage: completion.usage
      ? {
          promptTokens: completion.usage.prompt_tokens,
          completionTokens: completion.usage.completion_tokens,
          totalTokens: completion.usage.total_tokens,
        }
      : undefined,
  };
}

export async function callHuggingFace(
  hfKey: string,
  instruction: string,
  prompt: string,
  max_tokens: number
): Promise<LlmResult> {
  const res = await fetch("https://router.huggingface.co/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${hfKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "HuggingFaceH4/zephyr-7b-beta",
      messages: [
        { role: "system", content: instruction },
        { role: "user", content: prompt },
      ],
      max_tokens: Math.min(max_tokens, 1500),
    }),
  });

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as {
      error?: { message?: string };
    };
    throw new Error(err.error?.message || `HuggingFace error ${res.status}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
    usage?: {
      prompt_tokens?: number;
      completion_tokens?: number;
      total_tokens?: number;
    };
  };

  return {
    text: data.choices?.[0]?.message?.content?.trim() || "",
    usage: data.usage
      ? {
          promptTokens: data.usage.prompt_tokens,
          completionTokens: data.usage.completion_tokens,
          totalTokens: data.usage.total_tokens,
        }
      : undefined,
  };
}
