import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/supabase-server";
import { callOpenAI, callHuggingFace, type LlmResult } from "@/lib/llm";

const noCacheHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
};

interface RunBody {
  promptContent?: string;
  input?: string;
  model?: string;
  temperature?: number;
  max_tokens?: number;
  userApiKey?: string;
  userHfKey?: string;
}

// Executes a single prompt so Run & Compare can run two versions on the same
// input and show the outputs side by side. Bring-your-own-key, like /api/chat.
export async function POST(req: Request) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: noCacheHeaders }
      );
    }

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Expected application/json body" },
        { status: 400, headers: noCacheHeaders }
      );
    }

    const body = (await req.json()) as RunBody;
    const {
      promptContent = "",
      input = "",
      model = "gpt-4o-mini",
      temperature = 0.7,
      max_tokens = 1000,
      userApiKey = "",
      userHfKey = "",
    } = body;

    if (!promptContent.trim()) {
      return NextResponse.json(
        { error: "Empty 'promptContent' field" },
        { status: 400, headers: noCacheHeaders }
      );
    }

    // With a test input, the prompt acts as the system instruction and the
    // input is the user message (fits "Summarize: {input}" style prompts).
    // Without an input, run the prompt itself as the user message so a
    // standalone prompt ("Write a haiku about the ocean") still executes.
    const hasInput = input.trim().length > 0;
    const instruction = hasInput ? promptContent : "You are a helpful assistant.";
    const userMessage = hasInput ? input : promptContent;

    const start = Date.now();
    let result: LlmResult;
    let providerModel: string;

    if (userApiKey.trim()) {
      result = await callOpenAI(
        userApiKey.trim(),
        instruction,
        userMessage,
        model,
        max_tokens,
        temperature
      );
      providerModel = model;
    } else if (userHfKey.trim()) {
      result = await callHuggingFace(userHfKey.trim(), instruction, userMessage, max_tokens);
      providerModel = "zephyr-7b-beta";
    } else {
      return NextResponse.json(
        { error: "Connect your OpenAI or HuggingFace key in Settings to run prompts." },
        { status: 400, headers: noCacheHeaders }
      );
    }

    const latencyMs = Date.now() - start;

    return NextResponse.json(
      {
        output: result.text,
        model: providerModel,
        promptTokens: result.usage?.promptTokens ?? null,
        completionTokens: result.usage?.completionTokens ?? null,
        latencyMs,
      },
      { headers: noCacheHeaders }
    );
  } catch (err) {
    console.error("/api/run error:", err);
    const isQuota =
      err instanceof Error &&
      (err.message.includes("quota") || err.message.includes("429"));
    if (isQuota) {
      return NextResponse.json(
        { error: "OpenAI quota exceeded. Check billing at platform.openai.com." },
        { status: 429, headers: noCacheHeaders }
      );
    }
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: message },
      { status: 500, headers: noCacheHeaders }
    );
  }
}
